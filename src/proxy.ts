import {NextResponse, type NextRequest} from 'next/server';
import createMiddleware from 'next-intl/middleware';

import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Client website previews, served as static files from public/previews/<slug>/
// on their own subdomain, e.g. wegscheider.treetech.at → /previews/wegscheider/index.html.
// Add a slug here after creating its folder.
const PREVIEW_SLUGS = new Set(['wegscheider']);
const PREVIEW_HOST = /^([a-z0-9-]+)\.treetech\.at$/;

function previewSlug(request: NextRequest): string | null {
  const host = (request.headers.get('host') ?? '').toLowerCase().split(':')[0];
  const match = PREVIEW_HOST.exec(host);
  if (!match || !PREVIEW_SLUGS.has(match[1])) return null;
  return match[1];
}

export default function proxy(request: NextRequest) {
  const slug = previewSlug(request);
  if (slug) {
    const url = request.nextUrl.clone();
    url.pathname = `/previews/${slug}/index.html`;
    const response = NextResponse.rewrite(url);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!admin|api|trpc|_next|_vercel|.*\\..*).*)'
};
