create extension if not exists pgcrypto with schema extensions;

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 160),
  company text check (company is null or char_length(company) <= 160),
  budget text not null check (budget in ('automation', 'web', 'app', 'integration', 'workflow')),
  message text not null check (char_length(message) between 20 and 2000),
  source_url text,
  user_agent text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed', 'spam')),
  resend_email_id text,
  metadata jsonb not null default '{}'::jsonb
);

alter table public.contact_requests enable row level security;

grant insert, select, update on table public.contact_requests to service_role;
grant insert on table public.contact_requests to anon, authenticated;

drop policy if exists "Public contact request inserts are allowed." on public.contact_requests;

create policy "Public contact request inserts are allowed."
  on public.contact_requests
  for insert
  to public
  with check (true);

create index if not exists contact_requests_created_at_idx
  on public.contact_requests (created_at desc);

create index if not exists contact_requests_status_idx
  on public.contact_requests (status);
