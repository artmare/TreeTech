# TreeTech

Premium agency website for a fictional AI automation and web development studio.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase lead capture

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

`SUPABASE_SERVICE_ROLE_KEY` must stay server-only. Do not expose it with a `NEXT_PUBLIC_` prefix.

## Supabase schema

Apply `supabase/migrations/001_create_leads.sql` to create the lead capture table with RLS enabled. The website writes leads through `POST /api/leads` only.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```
