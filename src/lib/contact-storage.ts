import type {ContactFormValues} from '@/lib/contact';

export class ContactStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContactStorageError';
  }
}

type StoredContactRequest = {
  id: string;
};

function getSupabaseStorageConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const privilegedKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const publishableKey =
    process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const key = privilegedKey || publishableKey;

  if (!url || !key) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ''),
    key,
    canUpdate: Boolean(privilegedKey)
  };
}

export async function saveContactRequest(
  data: ContactFormValues,
  request: Request
): Promise<StoredContactRequest> {
  const config = getSupabaseStorageConfig();

  if (!config) {
    throw new ContactStorageError('Supabase contact request storage is not configured.');
  }

  const response = await fetch(`${config.url}/rest/v1/contact_requests`, {
    method: 'POST',
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      company: data.company || null,
      budget: data.budget,
      message: data.message,
      source_url: request.headers.get('referer'),
      user_agent: request.headers.get('user-agent')
    })
  });

  if (!response.ok) {
    const details = await response.text().catch(() => response.statusText);
    throw new ContactStorageError(`Supabase contact request insert failed: ${details}`);
  }

  const rows = (await response.json().catch(() => [])) as Array<{id?: string}>;
  const id = rows[0]?.id;

  if (!id) {
    throw new ContactStorageError('Supabase contact request insert did not return an id.');
  }

  return {id};
}

export async function markContactRequestEmailSent(id: string, resendEmailId: string) {
  const config = getSupabaseStorageConfig();

  if (!config || !config.canUpdate) {
    return;
  }

  await fetch(`${config.url}/rest/v1/contact_requests?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      resend_email_id: resendEmailId
    })
  });
}
