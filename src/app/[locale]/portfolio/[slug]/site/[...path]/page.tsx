import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {DemoSitePage, demoSubPaths} from '@/components/demo-site-page';
import {demoSites, getDemoSiteBySlug} from '@/content/demo-sites';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string; slug: string; path: string[]}>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    demoSites.flatMap((site) => demoSubPaths(site).map((path) => ({locale, slug: site.slug, path})))
  );
}

function isKnownPath(slug: string, path: string[]) {
  const site = getDemoSiteBySlug(slug);
  if (!site) return undefined;
  const known = demoSubPaths(site).some((item) => item.join('/') === path.join('/'));
  return known ? site : undefined;
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale: rawLocale, slug, path} = await params;
  const site = isKnownPath(slug, path);

  if (!hasLocale(routing.locales, rawLocale) || !site) {
    return {};
  }

  const metadata = createPageMetadata({
    locale: rawLocale,
    path: `/portfolio/${site.slug}/site/${path.join('/')}`,
    title: site.metaTitle[rawLocale],
    description: site.metaDescription[rawLocale]
  });
  // Sub pages of an example site should not compete with real pages in search.
  return {...metadata, robots: {index: false, follow: true}};
}

export default async function PortfolioDemoSubPage({params}: PageProps) {
  const {locale: rawLocale, slug, path} = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const site = isKnownPath(slug, path);

  if (!site) {
    notFound();
  }

  return <DemoSitePage site={site} locale={locale} path={path} />;
}
