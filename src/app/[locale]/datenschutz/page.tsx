import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {ConsentReset} from '@/components/consent-reset';
import {LegalPage, type LegalSection} from '@/components/legal-page';
import {legalAddress, legalEntity as e} from '@/content/legal';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {params: Promise<{locale: string}>};

const frame: Record<Locale, {title: string; note?: string; updated: string; description: string; reset: string}> = {
  de: {
    title: 'Datenschutzerklärung',
    updated: 'Stand',
    description: 'Wie TreeTech personenbezogene Daten verarbeitet: Kontaktformular, Chat-Assistent, Terminbuchung, Analyse und Ihre Rechte.',
    reset: 'Analyse-Einstellung zurücksetzen'
  },
  en: {
    title: 'Privacy policy',
    note: 'This privacy policy is provided in German. The German version is the legally binding one.',
    updated: 'Last updated',
    description: 'How TreeTech processes personal data: contact form, chat assistant, booking, analytics and your rights.',
    reset: 'Reset analytics choice'
  },
  ru: {
    title: 'Datenschutz',
    note: 'Политика конфиденциальности приведена на немецком языке. Юридическую силу имеет немецкая версия.',
    updated: 'Актуально на',
    description: 'Как TreeTech обрабатывает персональные данные: форма, чат-ассистент, запись, аналитика и ваши права.',
    reset: 'Сбросить выбор аналитики'
  }
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return createPageMetadata({locale, path: '/datenschutz', title: `${frame[locale].title} | TreeTech`, description: frame[locale].description});
}

export default async function DatenschutzPage({params}: PageProps) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const f = frame[locale];

  const sections: LegalSection[] = [
    {
      heading: '1. Verantwortlicher',
      body: [
        <>
          {e.owner} ({e.brand}), {legalAddress}
          <br />
          Telefon: {e.phone}, E-Mail: <a href={`mailto:${e.email}`}>{e.email}</a>
        </>,
        'Wir verarbeiten personenbezogene Daten nur im Rahmen der Datenschutz-Grundverordnung (DSGVO) und des österreichischen Datenschutzgesetzes (DSG). Ein Datenschutzbeauftragter ist nicht bestellt, weil keine gesetzliche Pflicht dazu besteht.'
      ]
    },
    {
      heading: '2. Hosting und Server-Protokolle',
      body: [
        'Die Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, betrieben. Beim Aufruf werden technisch notwendige Daten verarbeitet: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser und Betriebssystem. Das dient dem sicheren und stabilen Betrieb (Art. 6 Abs. 1 lit. f DSGVO).',
        'Eine Übermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework bzw. von Standardvertragsklauseln der EU-Kommission.'
      ]
    },
    {
      heading: '3. Kontaktformular, E-Mail, Telefon und WhatsApp',
      body: [
        'Wenn Sie uns kontaktieren, verarbeiten wir die Angaben, die Sie uns geben: Name, Betrieb und Ort, Telefonnummer oder E-Mail-Adresse, Website und Ihre Nachricht. Wir nutzen sie, um Ihre Anfrage zu beantworten, Ihre kostenlose Vorschau zu erstellen und ein Angebot vorzubereiten (Art. 6 Abs. 1 lit. b und f DSGVO).',
        'Anfragen speichern wir in einer Tabelle bei Google (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Benachrichtigungen und Bestätigungen per E-Mail versenden wir über Resend (Resend, Inc., USA). Für Übermittlungen in die USA gelten das EU-US Data Privacy Framework bzw. Standardvertragsklauseln.',
        'Wir löschen Anfragen, wenn sie nicht mehr gebraucht werden, spätestens drei Jahre nach dem letzten Kontakt. Wird ein Auftrag erteilt, bewahren wir die dafür nötigen Unterlagen sieben Jahre auf, wie es die Bundesabgabenordnung vorschreibt.',
        'Wenn Sie uns über WhatsApp schreiben, gelten zusätzlich die Datenschutzbestimmungen von WhatsApp (WhatsApp Ireland Limited). Die Links zu WhatsApp öffnen die App erst, wenn Sie darauf tippen.'
      ]
    },
    {
      heading: '4. KI-Chat-Assistent',
      body: [
        'Auf der Website gibt es einen Chat-Assistenten, der automatisch Fragen beantwortet. Ihre Nachrichten werden dafür an OpenRouter, Inc. (USA) übermittelt und von dort an einen Anbieter eines KI-Sprachmodells weitergeleitet. Bei kostenlosen Modellen können diese Anbieter Eingaben speichern und zur Verbesserung ihrer Modelle verwenden. Bitte geben Sie im Chat daher keine sensiblen Daten ein.',
        'Rechtsgrundlage ist unser berechtigtes Interesse, Fragen schnell und rund um die Uhr zu beantworten (Art. 6 Abs. 1 lit. f DSGVO). Der Chatverlauf wird nur in Ihrem Browser gespeichert (Local Storage) und lässt sich jederzeit über das Papierkorb-Symbol im Chat löschen. Wenn Sie im Chat eine Vorschau anfordern, gilt Punkt 3.'
      ]
    },
    {
      heading: '5. Terminbuchung',
      body: [
        'Auf der Kontaktseite können Sie über Cal.com (Cal.com, Inc., USA) einen Termin buchen. Der Kalender wird erst geladen, wenn Sie ihn öffnen. Die Angaben, die Sie dort machen, verarbeitet Cal.com für uns, um den Termin zu vereinbaren (Art. 6 Abs. 1 lit. b DSGVO). Für die Übermittlung in die USA gelten das EU-US Data Privacy Framework bzw. Standardvertragsklauseln.'
      ]
    },
    {
      heading: '6. Analyse nur mit Ihrer Einwilligung',
      body: [
        'Nur wenn Sie im Hinweis auf der Website zustimmen, nutzen wir Google Analytics 4 (Google Ireland Limited) und Microsoft Clarity (Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Irland). Damit sehen wir, wie die Website genutzt wird, etwa welche Seiten aufgerufen und welche Knöpfe angetippt werden. Clarity zeichnet dabei auch Mausbewegungen und Klicks auf; Eingaben in Formularfelder werden dabei maskiert.',
        'Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 165 Abs. 3 TKG 2021). Sie können sie jederzeit mit Wirkung für die Zukunft widerrufen:',
        <ConsentReset key="reset" label={f.reset} />
      ]
    },
    {
      heading: '7. Speicherung im Browser',
      body: [
        'Wir speichern im Local Storage Ihres Browsers Ihre Entscheidung zur Analyse und, falls Sie den Chat nutzen, den Chatverlauf. Diese Daten verlassen Ihr Gerät nicht. Ohne Ihre Einwilligung setzen wir keine Analyse-Cookies.'
      ]
    },
    {
      heading: '8. Schriftarten',
      body: ['Die Schriftarten liegen auf unserem eigenen Server. Beim Laden der Website wird keine Verbindung zu Google Fonts oder anderen Schriftanbietern aufgebaut.']
    },
    {
      heading: '9. Ihre Rechte',
      body: [
        <>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht, eine Einwilligung jederzeit zu widerrufen. Schreiben Sie dazu einfach an{' '}
          <a href={`mailto:${e.email}`}>{e.email}</a>.
        </>,
        <>
          Wenn Sie meinen, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, können Sie sich bei der Österreichischen Datenschutzbehörde beschweren: Barichgasse 40–42, 1030 Wien,{' '}
          <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer">
            www.dsb.gv.at
          </a>
          .
        </>
      ]
    }
  ];

  return <LegalPage title={f.title} note={f.note} updated={e.updated} updatedLabel={f.updated} sections={sections} />;
}
