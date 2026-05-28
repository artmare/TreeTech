import { NextResponse } from 'next/server';
import { getSupabaseAdmin, type LeadInsert } from '@/lib/supabase';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const requiredFields = ['name', 'email', 'projectType', 'budget', 'message'] as const;

type LeadRequest = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  company?: string;
};

export async function POST(request: Request) {
  let body: LeadRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const missing = requiredFields.find((field) => !body[field]?.trim());
  if (missing) {
    return NextResponse.json({ error: `Missing field: ${missing}.` }, { status: 400 });
  }

  const name = body.name!.trim();
  const email = body.email!.trim().toLowerCase();
  const projectType = body.projectType!.trim();
  const budget = body.budget!.trim();
  const message = body.message!.trim();

  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  if (message.length < 12) {
    return NextResponse.json({ error: 'Please add a little more context about the project.' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: 'Lead storage is not configured yet.' }, { status: 503 });
  }

  const lead: LeadInsert = {
    name,
    email,
    project_type: projectType,
    budget,
    message,
    source: 'website',
    user_agent: request.headers.get('user-agent') || undefined,
    referrer: request.headers.get('referer') || undefined
  };

  const { error } = await supabase.from('leads').insert(lead);

  if (error) {
    return NextResponse.json({ error: 'Could not save the request. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
