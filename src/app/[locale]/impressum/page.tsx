import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {LegalPage, type LegalSection} from '@/components/legal-page';
import {phoneHref} from '@/content/contact-links';
import {legalEntity as e} from '@/content/legal';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {params: Promise<{locale: string}>};

const labels: Record<Locale, {
  title: string;
  owner: string;
  address: string;
  contact: string;
  phone: string;
  email: string;
  trade: string;
  gisa: string;
  authority: string;
  chamber: string;
  rules: string;
  uid: string;
  purpose: string;
  purposeText: string;
  media: string;
  mediaText: string;
  updated: string;
  description: string;
}> = {
  de: {
    title: 'Impressum',
    owner: 'Unternehmen',
    address: 'Anschrift',
    contact: 'Kontakt',
    phone: 'Telefon',
    email: 'E-Mail',
    trade: 'Gewerbe',
    gisa: 'GISA-Zahl',
    authority: 'Gewerbebehörde',
    chamber: 'Kammer',
    rules: 'Anwendbare Rechtsvorschriften',
    uid: 'UID-Nummer',
    purpose: 'Unternehmensgegenstand',
    purposeText: 'Gestaltung, Programmierung und Betreuung von Websites sowie IT-Dienstleistungen.',
    media: 'Offenlegung nach § 25 Mediengesetz',
    mediaText: 'Medieninhaber und Herausgeber dieser Website ist der oben genannte Unternehmer. Die Website informiert über die Leistungen von TreeTech.',
    updated: 'Stand',
    description: 'Impressum von TreeTech: Unternehmer, Anschrift, Kontakt, Gewerbe und Gewerbebehörde.'
  },
  en: {
    title: 'Legal notice',
    owner: 'Business',
    address: 'Address',
    contact: 'Contact',
    phone: 'Phone',
    email: 'Email',
    trade: 'Trade licence',
    gisa: 'GISA number',
    authority: 'Trade authority',
    chamber: 'Chamber',
    rules: 'Applicable regulations',
    uid: 'VAT number',
    purpose: 'Business purpose',
    purposeText: 'Design, development and maintenance of websites and IT services.',
    media: 'Disclosure under § 25 Austrian Media Act',
    mediaText: 'The business named above owns and publishes this website. The website provides information about TreeTech services.',
    updated: 'Last updated',
    description: 'Legal notice of TreeTech: owner, address, contact, trade licence and authority.'
  },
  ru: {
    title: 'Impressum',
    owner: 'Предприниматель',
    address: 'Адрес',
    contact: 'Контакт',
    phone: 'Телефон',
    email: 'E-mail',
    trade: 'Вид деятельности (Gewerbe)',
    gisa: 'Номер GISA',
    authority: 'Надзорный орган',
    chamber: 'Палата',
    rules: 'Применимые правила',
    uid: 'UID-номер',
    purpose: 'Предмет деятельности',
    purposeText: 'Разработка, программирование и поддержка сайтов, IT-услуги.',
    media: 'Раскрытие по § 25 Закона о СМИ Австрии',
    mediaText: 'Владелец и издатель сайта: предприниматель, указанный выше. Сайт рассказывает об услугах TreeTech.',
    updated: 'Актуально на',
    description: 'Impressum TreeTech: предприниматель, адрес, контакт, Gewerbe и надзорный орган.'
  }
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return createPageMetadata({locale, path: '/impressum', title: `${labels[locale].title} | TreeTech`, description: labels[locale].description});
}

export default async function ImpressumPage({params}: PageProps) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = labels[locale];

  const sections: LegalSection[] = [
    {
      heading: t.owner,
      body: [
        <>
          {e.owner}
          <br />
          {e.brand}
        </>
      ]
    },
    {
      heading: t.address,
      body: [
        <>
          {e.street}
          <br />
          {e.postalCode} {e.city}, {e.country}
        </>
      ]
    },
    {
      heading: t.contact,
      body: [
        <>
          {t.phone}: <a href={phoneHref}>{e.phone}</a>
          <br />
          {t.email}: <a href={`mailto:${e.email}`}>{e.email}</a>
        </>
      ]
    },
    {heading: t.purpose, body: [t.purposeText]},
    {
      heading: t.trade,
      body: [
        <>
          {e.gewerbe}
          <br />
          {t.gisa}: {e.gisaNumber}
          {e.uid ? (
            <>
              <br />
              {t.uid}: {e.uid}
            </>
          ) : null}
        </>
      ]
    },
    {heading: t.authority, body: [e.authority]},
    {heading: t.chamber, body: [e.chamber]},
    {
      heading: t.rules,
      body: [
        <>
          Gewerbeordnung (GewO):{' '}
          <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer">
            www.ris.bka.gv.at
          </a>
        </>
      ]
    },
    {heading: t.media, body: [t.mediaText]}
  ];

  return <LegalPage title={t.title} updated={e.updated} updatedLabel={t.updated} sections={sections} />;
}
