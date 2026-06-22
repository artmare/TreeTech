import type {Viewport} from 'next';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Analytics} from '@vercel/analytics/next';

import '@/app/globals.css';
import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import {siteConfig} from '@/content/site';
import {routing, type Locale} from '@/i18n/routing';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export const viewport: Viewport = {
  themeColor: '#070806',
  width: 'device-width',
  initialScale: 1
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    areaServed: 'AT',
    serviceType: [
      'AI automation',
      'Web development',
      'Business process automation',
      'Custom web applications'
    ],
    inLanguage: ['de-AT', 'en']
  };

  return (
    <html lang={locale}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(organizationJsonLd)}}
        />
        <NextIntlClientProvider messages={messages}>
          <SiteHeader locale={locale as Locale} />
          <main>{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
