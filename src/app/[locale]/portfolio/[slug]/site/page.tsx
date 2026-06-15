import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {DemoSitePage} from '@/components/demo-site-page';
import {demoSites, getDemoSiteBySlug} from '@/content/demo-sites';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    demoSites.map((site) => ({locale, slug: site.slug}))
  );
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale: rawLocale, slug} = await params;
  const locale = rawLocale as Locale;
  const site = getDemoSiteBySlug(slug);

  if (!site) {
    return {};
  }

  return createPageMetadata({
    locale,
    path: `/portfolio/${site.slug}/site`,
    title: site.metaTitle[locale],
    description: site.metaDescription[locale]
  });
}

export default async function PortfolioDemoSitePage({params}: PageProps) {
  const {locale: rawLocale, slug} = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const site = getDemoSiteBySlug(slug);

  if (!site) {
    notFound();
  }

  return <DemoSitePage site={site} locale={locale} />;
}
