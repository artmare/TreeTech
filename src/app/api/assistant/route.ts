import {NextResponse} from 'next/server';
import OpenAI from 'openai';
import {z} from 'zod';

import {buildAssistantInstructions} from '@/lib/assistant';

export const runtime = 'nodejs';

const maxBodySizeBytes = 32 * 1024;
const maxMessageLength = 1600;
const maxHistoryMessages = 12;
const rateLimitWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 25;

const assistantRequestSchema = z.object({
  locale: z.enum(['de', 'en', 'ru']),
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().trim().min(1).max(maxMessageLength)
      })
    )
    .min(1)
    .max(maxHistoryMessages)
});

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimit = new Map<string, RateLimitEntry>();
let client: OpenAI | null = null;

/**
 * Free models on OpenRouter, tried in this order. The list of free models changes often:
 * set OPENROUTER_MODELS in Vercel (comma separated) to change it without a deploy of new code.
 * "openrouter/free" picks any available free model and is the last resort.
 */
const defaultFreeModels = [
  'google/gemma-4-31b-it:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
  'openrouter/free'
];

function getModels() {
  const fromEnv = (process.env.OPENROUTER_MODELS || '')
    .split(',')
    .map((model) => model.trim())
    .filter(Boolean);
  return fromEnv.length > 0 ? fromEnv : defaultFreeModels;
}

function getClient() {
  if (!process.env.OPENROUTER_API_KEY) {
    return null;
  }

  client ||= new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
    // No retries on the same model: if it is busy, we move on to the next free model instead.
    maxRetries: 0,
    timeout: 20_000,
    defaultHeaders: {
      'HTTP-Referer': 'https://treetech.at',
      'X-Title': 'TreeTech Website Assistant'
    }
  });

  return client;
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') || '';

  if (!contentType.toLowerCase().includes('application/json')) {
    return NextResponse.json(
      {ok: false, message: 'Unsupported content type.'},
      {status: 415}
    );
  }

  const contentLength = Number(request.headers.get('content-length') || 0);

  if (contentLength > maxBodySizeBytes) {
    return NextResponse.json(
      {ok: false, message: 'Request body is too large.'},
      {status: 413}
    );
  }

  const rateLimitResult = checkRateLimit(getRequestIp(request));

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {ok: false, message: 'Too many requests.'},
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(rateLimitResult.retryAfterMs / 1000))
        }
      }
    );
  }

  const body = await request.text().catch(() => null);

  if (!body) {
    return NextResponse.json(
      {ok: false, message: 'Request body is required.'},
      {status: 400}
    );
  }

  if (new TextEncoder().encode(body).length > maxBodySizeBytes) {
    return NextResponse.json(
      {ok: false, message: 'Request body is too large.'},
      {status: 413}
    );
  }

  let json: unknown = null;

  try {
    json = JSON.parse(body);
  } catch {
    json = null;
  }

  const parsed = assistantRequestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {ok: false, errors: parsed.error.flatten().fieldErrors},
      {status: 400}
    );
  }

  const openai = getClient();

  if (!openai) {
    return NextResponse.json(
      {ok: false, message: 'Assistant is not configured.'},
      {status: 503}
    );
  }

  const {locale} = parsed.data;
  const models = getModels();
  const messages = [
    {role: 'system' as const, content: buildAssistantInstructions(locale)},
    // The chat starts with a greeting from the assistant; models expect the user to speak first.
    ...dropLeadingAssistant(parsed.data.messages.slice(-maxHistoryMessages)).map((message) => ({
      role: message.role,
      content: message.content
    }))
  ];
  const encoder = new TextEncoder();
  // Some providers of Gemma models reject a system message, so it goes in front of the first question.
  const messagesFor = (model: string) => {
    if (!/gemma/i.test(model)) {
      return messages;
    }
    const [system, first, ...rest] = messages;
    return [{role: 'user' as const, content: `${system.content}\n\n---\n\n${first.content}`}, ...rest];
  };

  /**
   * Free models come and go, are sometimes overloaded, and reasoning models can use up the
   * whole budget on thinking. So we try the models one after another until one actually
   * produces answer text. Nothing is sent to the browser before a model has answered.
   */
  const readable = new ReadableStream({
    async start(controller) {
      for (const model of models) {
        let sent = 0;

        try {
          const stream = await openai.chat.completions.create({
            model,
            messages: messagesFor(model),
            stream: true,
            temperature: 0.3,
            max_tokens: 1200,
            // OpenRouter: think little, and never send the thinking text.
            reasoning: {effort: 'low', exclude: true}
          } as OpenAI.Chat.ChatCompletionCreateParamsStreaming);

          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) {
              sent += text.length;
              controller.enqueue(encoder.encode(text));
            }
          }

          if (sent > 0) {
            console.info('assistant_answered', {model});
            controller.close();
            return;
          }

          console.warn('assistant_empty_answer', {model});
        } catch (error) {
          console.warn('assistant_model_failed', {model, reason: error instanceof Error ? error.message : 'unknown'});

          if (sent > 0) {
            // Part of an answer is already on screen: end it there instead of mixing two models.
            controller.close();
            return;
          }
        }
      }

      // Every model failed: the widget shows its own message with the phone number.
      controller.close();
    }
  });

  try {
    return new Response(readable, {
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (error) {
    console.error(
      'Assistant request failed:',
      error instanceof Error ? error.message : error
    );

    return NextResponse.json(
      {ok: false, message: 'Assistant request failed.'},
      {status: 500}
    );
  }
}

function dropLeadingAssistant<T extends {role: string}>(items: T[]) {
  const firstUser = items.findIndex((item) => item.role === 'user');
  return firstUser === -1 ? [] : items.slice(firstUser);
}

function getRequestIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const forwardedIp = forwardedFor?.split(',')[0]?.trim();

  return (
    forwardedIp ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

function checkRateLimit(key: string) {
  const now = Date.now();

  for (const [entryKey, entry] of rateLimit.entries()) {
    if (entry.resetAt <= now) {
      rateLimit.delete(entryKey);
    }
  }

  const entry = rateLimit.get(key);

  if (!entry) {
    rateLimit.set(key, {
      count: 1,
      resetAt: now + rateLimitWindowMs
    });

    return {allowed: true, retryAfterMs: 0};
  }

  if (entry.count >= maxRequestsPerWindow) {
    return {
      allowed: false,
      retryAfterMs: Math.max(entry.resetAt - now, 1000)
    };
  }

  entry.count += 1;
  return {allowed: true, retryAfterMs: 0};
}
