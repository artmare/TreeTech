import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {LegalPage, type LegalSection} from '@/components/legal-page';
import {legalAddress, legalEntity as e} from '@/content/legal';
import {formatEur, hourlyRate} from '@/content/pricing';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {params: Promise<{locale: string}>};

const frame: Record<Locale, {title: string; note?: string; updated: string; description: string}> = {
  de: {
    title: 'Allgemeine Geschäftsbedingungen',
    updated: 'Stand',
    description: 'AGB von TreeTech für Websites, Pflege und IT-Dienstleistungen.'
  },
  en: {
    title: 'Terms and conditions',
    note: 'These terms are provided in German. The German version is the legally binding one.',
    updated: 'Last updated',
    description: 'TreeTech terms and conditions for websites, care plans and IT services.'
  },
  ru: {
    title: 'AGB',
    note: 'Условия приведены на немецком языке. Юридическую силу имеет немецкая версия.',
    updated: 'Актуально на',
    description: 'Общие условия TreeTech для сайтов, поддержки и IT-услуг.'
  }
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return createPageMetadata({locale, path: '/agb', title: `${frame[locale].title} | TreeTech`, description: frame[locale].description});
}

export default async function AgbPage({params}: PageProps) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const f = frame[locale];

  const sections: LegalSection[] = [
    {
      heading: '1. Geltungsbereich',
      body: [
        `Diese Bedingungen gelten für alle Verträge zwischen ${e.owner}, handelnd unter der Bezeichnung ${e.brand}, ${legalAddress} („TreeTech“), und seinen Kundinnen und Kunden über Websites, Pflege und IT-Dienstleistungen.`,
        'Ist die Kundin oder der Kunde Verbraucher im Sinne des Konsumentenschutzgesetzes (KSchG), gehen dessen zwingende Bestimmungen diesen Bedingungen vor.'
      ]
    },
    {
      heading: '2. Kostenlose Vorschau',
      body: [
        'Auf Anfrage erstellt TreeTech eine kostenlose und unverbindliche Vorschau der Website. Gefällt die Vorschau nicht, entstehen keine Kosten. Bis zum Abschluss eines Auftrags bleiben alle Rechte an der Vorschau bei TreeTech.'
      ]
    },
    {
      heading: '3. Vertragsschluss und Leistungsumfang',
      body: [
        'Ein Vertrag kommt zustande, wenn die Kundin oder der Kunde ein schriftliches Angebot von TreeTech annimmt, auch per E-Mail. Der Leistungsumfang ergibt sich aus dem Angebot und der Paketbeschreibung auf treetech.at/de/services zum Zeitpunkt des Auftrags.'
      ]
    },
    {
      heading: '4. Mitwirkung',
      body: [
        'Die Kundin oder der Kunde stellt die für die Website nötigen Angaben rechtzeitig zur Verfügung, insbesondere Leistungen, Einsatzgebiet, Fotos und die Daten für Impressum und Datenschutzerklärung, und steht für ein Gespräch von etwa 30 Minuten zur Verfügung. Für die Richtigkeit dieser Angaben und für die Rechte an gelieferten Fotos und Texten ist die Kundin oder der Kunde verantwortlich. Verzögert sich die Mitwirkung, verschieben sich die Termine entsprechend.'
      ]
    },
    {
      heading: '5. Fertigstellung in 7 Tagen',
      body: [
        'Bei den Paketen Website Start und Website-Abo geht die Website innerhalb von 7 Tagen online. Die Frist beginnt mit dem Gespräch, sobald alle nötigen Angaben vorliegen. Bei den anderen Paketen gilt die Frist laut Angebot.',
        'Liegt eine Verzögerung allein bei TreeTech, erhält die Kundin oder der Kunde drei Monate Pflege kostenlos. Weitergehende Ansprüche wegen der Verzögerung bestehen nicht, soweit gesetzlich zulässig.'
      ]
    },
    {
      heading: '6. Preise und Zahlung',
      body: [
        'Es gelten die Preise laut Angebot. Sie sind Endpreise. Leistungen außerhalb des vereinbarten Umfangs werden nur nach vorheriger Absprache erbracht und mit ' +
          `${formatEur(hourlyRate, 'de')} pro Stunde abgerechnet.`,
        'Einmalige Leistungen sind zu 50 % bei Auftrag und zu 50 % beim Online-Gang fällig, auf Wunsch auch in zwei vereinbarten Raten. Rechnungen sind innerhalb von 14 Tagen ohne Abzug zu bezahlen. Monatliche Leistungen (Pflege, Website-Abo) werden monatlich im Voraus verrechnet.'
      ]
    },
    {
      heading: '7. Korrekturen und Abnahme',
      body: [
        'Die Anzahl der Korrekturrunden richtet sich nach dem Paket. Die Website gilt als abgenommen, wenn sie auf Wunsch der Kundin oder des Kunden online geht oder wenn innerhalb von 7 Tagen nach Fertigmeldung keine wesentlichen Mängel gemeldet werden.'
      ]
    },
    {
      heading: '8. Rechte an der Website',
      body: [
        'Mit vollständiger Bezahlung erhält die Kundin oder der Kunde das zeitlich und räumlich unbeschränkte Recht, die für sie oder ihn erstellten Texte, Gestaltung und den Programmcode zu nutzen und zu ändern. Die Domain wird auf den Namen der Kundin oder des Kunden registriert. Beim Website-Abo gehen diese Rechte nach 24 Monaten Laufzeit über.',
        'TreeTech darf die Website als Referenz nennen und zeigen, sofern die Kundin oder der Kunde nicht widerspricht. Beim Gründerpreis ist die Nennung als Referenz Teil der Vereinbarung.'
      ]
    },
    {
      heading: '9. Pflege, Website-Abo und Kündigung',
      body: [
        'Pflege-Pakete können monatlich zum Monatsende gekündigt werden. Das Website-Abo hat eine Mindestlaufzeit von 12 Monaten und ist danach monatlich zum Monatsende kündbar. Kündigungen sind schriftlich möglich, auch per E-Mail.'
      ]
    },
    {
      heading: '10. Gewährleistung und Haftung',
      body: [
        'Es gilt die gesetzliche Gewährleistung. Mängel behebt TreeTech in angemessener Frist.',
        'TreeTech haftet nicht für leichte Fahrlässigkeit, ausgenommen bei Personenschäden und gegenüber Verbrauchern, soweit das KSchG dies vorsieht. TreeTech schuldet eine fachgerecht erstellte Website, aber keinen bestimmten Erfolg, insbesondere keine Platzierung bei Google und keine bestimmte Anzahl an Anfragen. Für Ausfälle von Diensten Dritter (etwa Hosting-Anbieter, Google) haftet TreeTech nicht.'
      ]
    },
    {
      heading: '11. Datenschutz',
      body: [
        'Wie TreeTech personenbezogene Daten verarbeitet, steht in der Datenschutzerklärung. Soweit TreeTech im Auftrag der Kundin oder des Kunden personenbezogene Daten verarbeitet, etwa Anfragen über deren Website, schließen die Parteien eine Vereinbarung zur Auftragsverarbeitung nach Art. 28 DSGVO.'
      ]
    },
    {
      heading: '12. Schlussbestimmungen',
      body: [
        'Es gilt österreichisches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand für Unternehmer ist Wien. Für Verbraucher gelten die gesetzlichen Gerichtsstände. Sollte eine Bestimmung unwirksam sein, bleiben die übrigen Bestimmungen gültig.'
      ]
    }
  ];

  return <LegalPage title={f.title} note={f.note} updated={e.updated} updatedLabel={f.updated} sections={sections} />;
}
