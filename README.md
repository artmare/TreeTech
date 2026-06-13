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

## Routes

German is the default language and all public pages are locale-prefixed.

- `/de` and `/en`
- `/de/about` and `/en/about`
- `/de/services` and `/en/services`
- `/de/portfolio` and `/en/portfolio`
- `/de/portfolio/[slug]` and `/en/portfolio/[slug]`
- `/de/contact` and `/en/contact`

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
| `RESEND_API_KEY` | Required for email delivery | Server | Resend API key used by `/api/contact`. If omitted, form submissions validate and return success but no email is sent. |
| `CONTACT_TO_EMAIL` | Required for email delivery | Server | Recipient address for project inquiries. |
| `CONTACT_FROM_EMAIL` | Required for email delivery | Server | Verified sender address in Resend. Example: `TreeTech <kontakt@treetech.at>`. |

Never expose `RESEND_API_KEY` with a `NEXT_PUBLIC_` prefix.

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
6. Deploy.

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

For real email delivery:

1. Verify the sending domain or sender address in Resend.
2. Add `RESEND_API_KEY` to Vercel as a server-side environment variable.
3. Set `CONTACT_TO_EMAIL` to the recipient inbox.
4. Set `CONTACT_FROM_EMAIL` to a verified Resend sender.

Without Resend configuration, the endpoint still validates payloads and returns success. This keeps preview deployments usable before email is connected.

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
- Check Vercel Function logs for `/api/contact`.
- Confirm canonical URLs use the production domain.
- Confirm Resend receives or sends the contact email.
