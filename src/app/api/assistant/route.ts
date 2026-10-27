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
let openaiClient: OpenAI | null = null;

function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
  }

  return openaiClient;
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

  const openai = getOpenAI();

  if (!openai) {
    return NextResponse.json(
      {ok: false, message: 'Assistant is not configured.'},
      {status: 503}
    );
  }

  const {locale} = parsed.data;
  const input = parsed.data.messages.slice(-maxHistoryMessages).map((message) => ({
    role: message.role,
    content: message.content,
    type: 'message' as const
  }));

  try {
    const stream = await openai.responses.create({
      model: 'gpt-5.5',
      instructions: buildAssistantInstructions(locale),
      input,
      stream: true,
      store: false,
      reasoning: {effort: 'low'},
      text: {verbosity: 'low'},
      prompt_cache_key: `treetech-assistant-${locale}`
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'response.output_text.delta') {
              controller.enqueue(encoder.encode(event.delta));
            }

            if (event.type === 'response.failed') {
              throw new Error(event.response.error?.message || 'Assistant response failed.');
            }
          }

          controller.close();
        } catch (error) {
          console.error(
            'Assistant stream failed:',
            error instanceof Error ? error.message : error
          );
          controller.error(error);
        }
      }
    });

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
