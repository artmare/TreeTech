import type {Viewport} from 'next';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

// Self-hosted variable font (weight and width axes), used by the home page and contact bar.
import '@fontsource-variable/archivo/wdth.css';
import '@/app/globals.css';
import {AnalyticsLoader} from '@/components/analytics-loader';
import {AssistantWidgetLoader} from '@/components/assistant-widget-loader';
import {MobileContactBar} from '@/components/mobile-contact-bar';
import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import {formatEur, getPackage} from '@/content/pricing';
import {siteConfig, siteContent} from '@/content/site';
import {routing, type Locale} from '@/i18n/routing';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export const viewport: Viewport = {
  themeColor: '#F2F3EF',
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
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    logo: `${siteConfig.url}/icon-512.png`,
    image: `${siteConfig.url}/og-image.png`,
    description: siteContent[locale as Locale].metadata.homeDescription,
    priceRange: `ab ${formatEur(getPackage('websiteStart').oneTime ?? 0, 'de')}`,
    areaServed: [
      {'@type': 'City', name: 'Wien'},
      {'@type': 'State', name: 'Niederösterreich'}
    ],
    knowsLanguage: ['de', 'en', 'ru'],
    serviceType: ['Webdesign', 'Website für Handwerker', 'Website-Pflege', 'Google-Unternehmensprofil'],
    makesOffer: ['websiteStart', 'websiteBusiness', 'pflege'].map((id) => {
      const pkg = getPackage(id as 'websiteStart' | 'websiteBusiness' | 'pflege');
      return {
        '@type': 'Offer',
        name: pkg.name,
        price: pkg.monthly ?? pkg.oneTime,
        priceCurrency: 'EUR'
      };
    })
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
          <MobileContactBar locale={locale as Locale} />
          <AnalyticsLoader />
          <AssistantWidgetLoader locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
