# TreeTech

Production Next.js website and private lead CRM for TreeTech, an Austrian studio focused on websites, automation, and custom software.

## Product architecture

```text
Public website / AI assistant
            ↓
        Lead Service
            ↓
Repository interfaces (Lead, Activity, Task)
            ↓
Google Sheets CRM storage

/admin CRM → the same repositories
Google Drive → qualified lead/client documents
Resend → notifications and confirmations
OpenAI → public assistant (optional for lead persistence)
```

Google-specific objects stay inside `src/lib/google` and the Google Sheets repository. Public forms, the AI assistant, and the CRM depend on the domain/repository layer, allowing a later PostgreSQL repository without rebuilding the UI.

## Public routes

The public website is localized in German, English, and Russian under `/de`, `/en`, and `/ru`. It includes the homepage, services and SEO landing pages, portfolio demos, blog, About, contact flow, sitemap, robots, manifest, analytics consent, and AI assistant.

## Private CRM

The non-localized `/admin` area provides:

- secure single-admin login with a signed, HTTP-only session cookie;
- overview metrics calculated from stored leads/tasks;
- searchable/filterable lead list;
- accessible pipeline status management;
- lead details with original message, qualification summary, notes, activities, tasks, follow-ups, value, and Drive folder;
- manual lead creation for outbound work;
- archive and restore;
- safe configuration-status screen.

There is no public registration. `/admin` is excluded from locale middleware, search indexing, and the sitemap.

## Requirements

- Node.js `>=20.9.0`
- npm
- Google Cloud service account
- Google Sheet shared with that service account
- optional Google Drive root folder shared with the service account
- Resend and OpenAI credentials for their respective features

## Local setup

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000/de`. The CRM is at `http://localhost:3000/admin`.

## Google Sheets setup

1. Create a Google Cloud project and enable Google Sheets API and Google Drive API.
2. Create a dedicated service account and generate a JSON key.
3. Create a spreadsheet named `TreeTech CRM`.
4. Create worksheets named exactly `Leads`, `Activities`, `Tasks`, and `Settings`.
5. Share the spreadsheet with the service-account email as Editor.
6. Optionally create a Drive folder for qualified clients and share it with the same service account.
7. Configure:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CRM_SPREADSHEET_ID=spreadsheet-id
GOOGLE_DRIVE_ROOT_FOLDER_ID=folder-id
```

The repository writes and validates stable headers automatically when a worksheet is empty. It refuses a mismatched schema instead of silently corrupting existing data. Stable UUIDs, rather than row numbers, identify records.

## Admin authentication

Generate a password hash:

```bash
npm run admin:password -- "a-long-unique-password"
```

Then configure:

```env
ADMIN_EMAIL=owner@example.com
ADMIN_PASSWORD_HASH=scrypt$...
ADMIN_SESSION_SECRET=a-long-random-secret
```

The password itself is never stored. Sessions use a signed, HTTP-only, secure-in-production cookie with a 12-hour lifetime.

## Contact and AI lead flow

`POST /api/contact` keeps the existing content-type, body-size, Zod, honeypot, timing, and IP rate-limit checks. A valid submission is saved through `LeadService` before email is attempted. AI and email failure cannot delete a saved lead; storage failure never returns a fake success.

Assistant leads include compact qualification data and a bounded transcript. Original user text is preserved.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL |
| `OPENAI_API_KEY` | Server-only website assistant |
| `NEXT_PUBLIC_CALENDLY_URL` | Optional booking embed |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Optional consent-gated Clarity |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Server-side Google identity |
| `GOOGLE_PRIVATE_KEY` | Server-side service-account private key |
| `GOOGLE_CRM_SPREADSHEET_ID` | CRM spreadsheet |
| `GOOGLE_DRIVE_ROOT_FOLDER_ID` | Optional document root |
| `ADMIN_EMAIL` | Single CRM administrator |
| `ADMIN_PASSWORD_HASH` | Scrypt password hash |
| `ADMIN_SESSION_SECRET` | Session signing secret |
| `RESEND_API_KEY` | Transactional email |
| `CONTACT_TO_EMAIL` | Internal notification recipient |
| `CONTACT_FROM_EMAIL` | Verified sender |

Never use a `NEXT_PUBLIC_` prefix for Google, admin, OpenAI, or Resend secrets.

## Existing Supabase data migration

Supabase has been removed from the runtime lead flow. Before removing an existing production project, export `public.contact_requests` as CSV and import/match it to the `Leads` headers. This repository cannot verify remote production rows from local code alone, so production data must not be deleted until the export is confirmed.

Recommended mapping: `id`, `created_at → createdAt`, `name`, `company`, `email`, `budget`, `message`, `source_url → sourceUrl`; set `status=new`, `priority=medium`, `source=website_form`, `archived=FALSE`, and retain metadata in `notes` if needed.

## Privacy

The storage provider for contact/CRM data changes from Supabase to Google services. Review the live Datenschutz/Privacy text and processor agreements before production launch. Do not send names, emails, phone numbers, messages, or assistant transcripts to analytics.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
```

External integration checks require valid Google, Resend, and OpenAI credentials. Test the full path after configuration: contact form → Google Sheets → `/admin/leads` → pipeline update → task/activity → optional Drive folder.

