import {buildLocaleSitemap, serializeSitemap} from '@/lib/sitemap';
import {routing, type Locale} from '@/i18n/routing';

type RouteContext = {
  params: Promise<{locale: string}>;
};

export async function GET(_request: Request, {params}: RouteContext) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as Locale)) {
    return new Response('Not found', {status: 404});
  }

  const xml = serializeSitemap(buildLocaleSitemap(locale as Locale));

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600'
    }
  });
}
