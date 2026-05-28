create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 160),
  email text not null check (position('@' in email) > 1 and char_length(email) <= 254),
  project_type text not null check (char_length(project_type) <= 120),
  budget text not null check (char_length(budget) <= 80),
  message text not null check (char_length(message) between 12 and 4000),
  source text not null default 'website' check (char_length(source) <= 80),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'archived')),
  user_agent text,
  referrer text
);

alter table public.leads enable row level security;

revoke all on table public.leads from anon;
revoke all on table public.leads from authenticated;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
