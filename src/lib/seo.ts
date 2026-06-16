import type {Metadata} from 'next';

import type {Locale} from '@/i18n/routing';
import {routing} from '@/i18n/routing';
import {getLocalizedPath, siteConfig} from '@/content/site';

type MetadataInput = {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
};

export function createPageMetadata({
  locale,
  path = '',
  title,
  description
}: MetadataInput): Metadata {
  const canonicalPath = getLocalizedPath(locale, path);
  const canonical = new URL(canonicalPath, siteConfig.url);
  const languages = Object.fromEntries(
    routing.locales.map((item) => [
      item,
      new URL(getLocalizedPath(item, path), siteConfig.url).toString()
    ])
  );

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical: canonical.toString(),
      languages
    },
    openGraph: {
      title,
      description,
      url: canonical.toString(),
      siteName: siteConfig.name,
      locale: locale === 'de' ? 'de_AT' : 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    },
    robots: {
      index: true,
      follow: true
    },
    verification: {
      google: siteConfig.googleSiteVerification
    }
  };
}
