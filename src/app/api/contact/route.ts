import {NextResponse} from 'next/server';
import {Resend} from 'resend';

import {serverContactSchema} from '@/lib/contact';
import {
  ContactStorageError,
  markContactRequestEmailSent,
  saveContactRequest
} from '@/lib/contact-storage';

const maxBodySizeBytes = 16 * 1024;
const minimumFormAgeMs = 2000;
const maximumFormAgeMs = 24 * 60 * 60 * 1000;
const rateLimitWindowMs = 15 * 60 * 1000;
const maxRequestsPerWindow = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

let resendClient: Resend | null = null;
const rateLimit = new Map<string, RateLimitEntry>();

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }

  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }

  return resendClient;
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

  const json = await request.json().catch(() => null);
  const parsed = serverContactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {ok: false, errors: parsed.error.flatten().fieldErrors},
      {status: 400}
    );
  }

  const data = parsed.data;

  if (data.websiteUrl || !hasHumanTiming(data.startedAt)) {
    return NextResponse.json({ok: true});
  }

  let storedRequestId: string;

  try {
    const storedRequest = await saveContactRequest(data, request);
    storedRequestId = storedRequest.id;
  } catch (error) {
    console.error(
      'Contact request storage failed:',
      error instanceof Error ? error.message : error
    );

    return NextResponse.json(
      {ok: false, message: 'Contact request could not be saved.'},
      {status: error instanceof ContactStorageError ? 503 : 500}
    );
  }

  const resend = getResend();
  const to = process.env.CONTACT_TO_EMAIL;

  if (resend && to) {
    const result = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'TreeTech <karnaukhovartem02@gmail.com>',
      to,
      replyTo: data.email,
      subject: `TreeTech Anfrage: ${data.budget}`,
      text: [
        `Name: ${data.name}`,
        `E-Mail: ${data.email}`,
        `Unternehmen: ${data.company || '-'}`,
        `Projektart: ${data.budget}`,
        '',
        data.message
      ].join('\n'),
      html: `
        <h2>Neue TreeTech Anfrage</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>E-Mail:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Unternehmen:</strong> ${escapeHtml(data.company || '-')}</p>
        <p><strong>Projektart:</strong> ${escapeHtml(data.budget)}</p>
        <p>${escapeHtml(data.message).replaceAll('\n', '<br />')}</p>
      `
    });

    if (result.data?.id) {
      await markContactRequestEmailSent(storedRequestId, result.data.id);
    }
  }

  return NextResponse.json({ok: true, id: storedRequestId});
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function hasHumanTiming(startedAt: number | undefined) {
  if (!startedAt) {
    return false;
  }

  const age = Date.now() - startedAt;
  return age >= minimumFormAgeMs && age <= maximumFormAgeMs;
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
