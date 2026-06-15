# TreeTech

Production-ready multilingual website for TreeTech, a modern web studio for Austrian businesses.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- next-intl
- Framer Motion
- React Hook Form
- Zod
- Resend-ready contact API route
- Supabase/Postgres contact request storage

## Routes

German is the default language and all public pages are locale-prefixed.

- `/de` and `/en`
- `/de/about` and `/en/about`
- `/de/services` and `/en/services`
- `/de/portfolio` and `/en/portfolio`
- `/de/portfolio/[slug]` and `/en/portfolio/[slug]`
- `/de/portfolio/[slug]/site` and `/en/portfolio/[slug]/site`
- `/de/contact` and `/en/contact`

## Portfolio Demo Site Storage

The five demo websites are stored as typed content in `src/content/demo-sites.ts`
and rendered through one reusable route at `/[locale]/portfolio/[slug]/site`.
This is the best fit for portfolio demo sites because it keeps German and English
copy versioned together, avoids duplicated page code, needs no database or CMS,
and lets Vercel statically generate every demo page.

For real client websites, keep each client site in its own GitHub repository and
Vercel project, then store only the portfolio metadata and live URL in TreeTech.

## Requirements

- Node.js `>=20.9.0`
- npm

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000/de`.

For production checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Environment Variables

Copy `.env.example` to `.env.local` for local development and configure the same variables in Vercel Project Settings.

| Variable | Required | Scope | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public | Canonical production URL used for SEO metadata, sitemap, and alternate links. Example: `https://treetech.at`. |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes for contact storage | Public | Supabase project URL, for example `https://your-project-ref.supabase.co`. Used by `/api/contact` when `SUPABASE_URL` is not set. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes for publishable-key contact storage | Public | Supabase publishable key. The SQL grants `INSERT` only, with no public read access to contact requests. |
| `SUPABASE_URL` | Optional | Server | Server-only Supabase URL override. |
| `SUPABASE_PUBLISHABLE_KEY` | Optional | Server | Server-only publishable key override. |
| `SUPABASE_SECRET_KEY` | Recommended for private server writes | Server | Supabase secret API key used only by `/api/contact`. Prefer this for production if available. |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional fallback | Server | Legacy Supabase service role key. Used only if `SUPABASE_SECRET_KEY` is not set. |
| `RESEND_API_KEY` | Required for email delivery | Server | Resend API key used by `/api/contact`. If omitted, form submissions validate and return success but no email is sent. |
| `CONTACT_TO_EMAIL` | Required for email delivery | Server | Recipient address for project inquiries. |
| `CONTACT_FROM_EMAIL` | Required for email delivery | Server | Verified sender address in Resend. Example: `TreeTech <karnaukhovartem02@gmail.com>`. |

Never expose `SUPABASE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, or `RESEND_API_KEY` with a `NEXT_PUBLIC_` prefix.

## Contact Request Storage

The contact form stores every real inquiry in Supabase before attempting email delivery.
This keeps inquiries persistent on Vercel and other serverless hosts where local files are not durable.

Create the table once in Supabase:

1. Open your Supabase project.
2. Go to SQL Editor.
3. Run the SQL in `supabase/contact_requests.sql`.
4. Add these variables to `.env.local` and to Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - optionally `SUPABASE_SECRET_KEY` for private server writes

The table is named `public.contact_requests`. Row Level Security is enabled. The SQL allows public `INSERT` only so the contact form can create rows with a publishable key, but it does not create public `SELECT`, `UPDATE`, or `DELETE` policies.

If Supabase storage is not configured or the table insert fails, `/api/contact` returns an error instead of silently accepting the form. Resend remains optional. If email delivery is configured and a secret/service key is available, the saved row is updated with `resend_email_id`.

## Vercel Deployment

### Recommended Git Deployment

1. Push the repository to GitHub.
2. Create a new Vercel project and import the repository.
3. Keep the framework preset as `Next.js`.
4. Use the defaults:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `.next` managed automatically by Vercel
5. Add the environment variables from `.env.example` in Vercel:
   - Production
   - Preview
   - Development, if you use `vercel env pull`
6. Run `supabase/contact_requests.sql` in the Supabase SQL Editor before accepting real contact requests.
7. Deploy.

Vercel automatically creates preview deployments for non-production branches and production deployments from the production branch.

### CLI Deployment

Install and link the Vercel CLI:

```bash
npm install -g vercel
vercel link
```

Pull environment variables for local development:

```bash
vercel env pull .env.local --yes
```

Create a preview deployment:

```bash
vercel deploy
```

Deploy to production:

```bash
vercel deploy --prod
```

## Resend Contact Form

The contact form posts to `src/app/api/contact/route.ts`.

The endpoint first stores the inquiry in `public.contact_requests`, then sends email through Resend if configured.

For real email delivery:

1. Verify the sending domain or sender address in Resend.
2. Add `RESEND_API_KEY` to Vercel as a server-side environment variable.
3. Set `CONTACT_TO_EMAIL` to the recipient inbox.
4. Set `CONTACT_FROM_EMAIL` to a verified Resend sender.

Without Resend configuration, the endpoint still stores the inquiry and returns success. Supabase storage must be configured for real submissions.

## SEO Notes

- `NEXT_PUBLIC_SITE_URL` should match the final production domain.
- `src/app/sitemap.ts` uses `NEXT_PUBLIC_SITE_URL`.
- `src/lib/seo.ts` generates canonical and alternate language URLs.
- Update `NEXT_PUBLIC_SITE_URL` after adding a custom domain on Vercel.

## Deployment Checklist

Before deploying:

```bash
npm run typecheck
npm run lint
npm run build
```

After deploying:

- Visit `/de` and `/en`.
- Submit a contact form test with a safe internal email address.
- Confirm the row appears in Supabase table `contact_requests`.
- Check Vercel Function logs for `/api/contact`.
- Confirm canonical URLs use the production domain.
- Confirm Resend receives or sends the contact email.
