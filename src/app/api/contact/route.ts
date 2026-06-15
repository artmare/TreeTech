import {NextResponse} from 'next/server';
import {Resend} from 'resend';

import {serverContactSchema} from '@/lib/contact';
import {
  ContactStorageError,
  markContactRequestEmailSent,
  saveContactRequest
} from '@/lib/contact-storage';

let resendClient: Resend | null = null;

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
  const json = await request.json().catch(() => null);
  const parsed = serverContactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {ok: false, errors: parsed.error.flatten().fieldErrors},
      {status: 400}
    );
  }

  const data = parsed.data;

  if (data.websiteUrl) {
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
        `Budget: ${data.budget}`,
        '',
        data.message
      ].join('\n'),
      html: `
        <h2>Neue TreeTech Anfrage</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>E-Mail:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Unternehmen:</strong> ${escapeHtml(data.company || '-')}</p>
        <p><strong>Budget:</strong> ${escapeHtml(data.budget)}</p>
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
