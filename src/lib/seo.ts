import type {Metadata} from 'next';

import type {Locale} from '@/i18n/routing';
import {routing} from '@/i18n/routing';
import {getLocalizedPath, siteConfig} from '@/content/site';

type MetadataInput = {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  /** Languages this page exists in, for hreflang. Defaults to all. */
  locales?: Locale[];
};

export function createPageMetadata({
  locale,
  path = '',
  title,
  description,
  locales = [...routing.locales]
}: MetadataInput): Metadata {
  const openGraphLocales = {
    de: 'de_AT',
    en: 'en_US',
    ru: 'ru_RU'
  } satisfies Record<Locale, string>;
  const canonicalPath = getLocalizedPath(locale, path);
  const canonical = new URL(canonicalPath, siteConfig.url);
  const openGraphImage = new URL('/og-image.png', siteConfig.url).toString();
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((item) => [
      item,
      new URL(getLocalizedPath(item, path), siteConfig.url).toString()
    ])
  );
  languages['x-default'] = new URL(
    getLocalizedPath(locales.includes(routing.defaultLocale) ? routing.defaultLocale : locales[0], path),
    siteConfig.url
  ).toString();

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    applicationName: siteConfig.name,
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        {url: '/icon.png', type: 'image/png'},
        {url: '/icon-192.png', sizes: '192x192', type: 'image/png'},
        {url: '/icon-512.png', sizes: '512x512', type: 'image/png'}
      ],
      apple: [{url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png'}]
    },
    alternates: {
      canonical: canonical.toString(),
      languages
    },
    openGraph: {
      title,
      description,
      url: canonical.toString(),
      siteName: siteConfig.name,
      locale: openGraphLocales[locale],
      type: 'website',
      images: [
        {
          url: openGraphImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name}: Websites für Handwerk und Werkstätten in Wien und Niederösterreich`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [openGraphImage]
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
