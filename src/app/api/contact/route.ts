import {NextResponse} from 'next/server';
import {Resend} from 'resend';

import {serverContactSchema} from '@/lib/contact';
import {createLeadFromContact, LeadStorageError, markLeadEmailSent} from '@/lib/crm/lead-service';

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

  // A lead must never get lost: if the CRM is down, we still send the notification email.
  let storedRequestId: string | null = null;
  let storageError: unknown = null;

  try {
    const storedRequest = await createLeadFromContact(data, request);
    storedRequestId = storedRequest.id;
  } catch (error) {
    storageError = error;
    console.error('Contact request storage failed:', error instanceof Error ? error.message : error);
  }

  const resend = getResend();
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || 'TreeTech <office@treetech.at>';

  let notified = false;

  if (resend && to) {
    const result = await resend.emails.send({
      from,
      to,
      ...(data.email ? {replyTo: data.email} : {}),
      subject: `${storedRequestId ? '' : '[NICHT IM CRM] '}TreeTech Anfrage: ${data.company || data.name}`,
      text: [
        `Name: ${data.name}`,
        `Telefon: ${data.phone || '-'}`,
        `E-Mail: ${data.email || '-'}`,
        `Unternehmen: ${data.company || '-'}`,
        `Projektart: ${data.budget}`,
        '',
        data.message || ''
      ].join('\n'),
      html: `
        <h2>Neue TreeTech Anfrage</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(data.phone || '-')}</p>
        <p><strong>E-Mail:</strong> ${escapeHtml(data.email || '-')}</p>
        <p><strong>Unternehmen:</strong> ${escapeHtml(data.company || '-')}</p>
        <p><strong>Projektart:</strong> ${escapeHtml(data.budget)}</p>
        <p>${escapeHtml(data.message || '').replaceAll('\n', '<br />')}</p>
      `
    }).catch((error: unknown) => {
      console.error('contact_notification_failed', error instanceof Error ? error.message : 'unknown');
      return {data: null};
    });

    notified = Boolean(result.data?.id);

    if (result.data?.id && storedRequestId) {
      await markLeadEmailSent(storedRequestId, result.data.id).catch((error) => {
        console.error('crm_email_activity_failed', error instanceof Error ? error.message : 'unknown');
      });
    }
  }

  if (!storedRequestId && !notified) {
    return NextResponse.json(
      {ok: false, message: 'Contact request could not be saved.'},
      {status: storageError instanceof LeadStorageError ? 503 : 500}
    );
  }

  if (resend && data.email) {
    const confirmation = getConfirmationCopy(data.metadata?.locale || getLocaleFromReferer(request));

    await resend.emails.send({
      from,
      to: data.email,
      subject: confirmation.subject,
      text: [
        confirmation.greeting,
        '',
        confirmation.body,
        '',
        confirmation.responseTime,
        '',
        'TreeTech',
        'office@treetech.at'
      ].join('\n'),
      html: `
        <p>${escapeHtml(confirmation.greeting)}</p>
        <p>${escapeHtml(confirmation.body)}</p>
        <p><strong>${escapeHtml(confirmation.responseTime)}</strong></p>
        <p>TreeTech<br /><a href="mailto:office@treetech.at">office@treetech.at</a></p>
      `
    }).catch((error: unknown) => {
      // The lead is already saved; a failed confirmation must not fail the request.
      console.error('contact_confirmation_failed', error instanceof Error ? error.message : 'unknown');
    });
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

function getLocaleFromReferer(request: Request): 'de' | 'en' | 'ru' {
  const referer = request.headers.get('referer') || '';

  if (referer.includes('/en/')) {
    return 'en';
  }

  if (referer.includes('/ru/')) {
    return 'ru';
  }

  return 'de';
}

function getConfirmationCopy(locale: 'de' | 'en' | 'ru' = 'de') {
  const copy = {
    de: {
      subject: 'TreeTech: Ihre Anfrage ist angekommen',
      greeting: 'Danke, Ihre Anfrage ist angekommen.',
      body: 'Wir sehen uns Ihren Betrieb an und melden uns persönlich bei Ihnen. Ihre kostenlose Vorschau bekommen Sie innerhalb von 3 Werktagen.',
      responseTime: 'Fragen? Rufen Sie uns an: +43 660 9557357'
    },
    en: {
      subject: 'TreeTech: your inquiry has arrived',
      greeting: 'Thank you, your inquiry has arrived.',
      body: 'We will look at your business and get back to you personally. Your free preview arrives within 3 working days.',
      responseTime: 'Questions? Call us: +43 660 9557357'
    },
    ru: {
      subject: 'TreeTech: заявка получена',
      greeting: 'Спасибо, ваша заявка получена.',
      body: 'Мы посмотрим на ваш бизнес и лично свяжемся с вами. Бесплатное превью вы получите в течение 3 рабочих дней.',
      responseTime: 'Вопросы? Звоните: +43 660 9557357'
    }
  } satisfies Record<'de' | 'en' | 'ru', Record<string, string>>;

  return copy[locale];
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
