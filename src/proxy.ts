import {NextResponse, type NextRequest} from 'next/server';
import createMiddleware from 'next-intl/middleware';

import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Client websites on their own subdomain of treetech.at:
// - static previews: public/previews/<slug>/index.html
// - CMS-backed sites (editable under /admin/sites): src/app/sites/[slug]
const STATIC_PREVIEWS = new Set(['wegscheider']);
const CMS_SITES = new Set(['weg-i']);
const PREVIEW_HOST = /^([a-z0-9-]+)\.treetech\.at$/;

function subdomain(request: NextRequest): string | null {
  const host = (request.headers.get('host') ?? '').toLowerCase().split(':')[0];
  return PREVIEW_HOST.exec(host)?.[1] ?? null;
}

function noindex(response: NextResponse) {
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

export default function proxy(request: NextRequest) {
  const slug = subdomain(request);
  const url = request.nextUrl.clone();

  if (slug && STATIC_PREVIEWS.has(slug)) {
    url.pathname = `/previews/${slug}/index.html`;
    return noindex(NextResponse.rewrite(url));
  }
  if (slug && CMS_SITES.has(slug)) {
    url.pathname = `/sites/${slug}`;
    return noindex(NextResponse.rewrite(url));
  }
  // Direct access on the main domain (treetech.at/sites/weg-i) bypasses the locale routing.
  if (request.nextUrl.pathname.startsWith('/sites/')) {
    return noindex(NextResponse.next());
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!admin|api|trpc|_next|_vercel|.*\\..*).*)'
};
