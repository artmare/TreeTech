import {CalendarCheck, Mail, MapPin, MessageSquareText, ShieldCheck, Timer} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';

import {ContactForm} from '@/components/contact-form';
import {FadeIn} from '@/components/motion/fade-in';
import {Container} from '@/components/ui/container';
import {siteConfig, siteContent} from '@/content/site';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string}>;
};

const contactSignals = {
  de: [
    {icon: ShieldCheck, text: 'Ehrliche Einschätzung statt Verkaufsdruck'},
    {icon: MessageSquareText, text: 'Klarer Vorschlag für Prozess, System und nächsten Schritt'},
    {icon: Timer, text: 'Antwort in der Regel innerhalb von 2 Stunden während der Geschäftszeit'}
  ],
  en: [
    {icon: ShieldCheck, text: 'Honest assessment without sales pressure'},
    {icon: MessageSquareText, text: 'Clear suggestion for process, system, and next step'},
    {icon: Timer, text: 'Replies usually within 2 hours during business hours'}
  ],
  ru: [
    {icon: ShieldCheck, text: 'Честная оценка без давления продаж'},
    {icon: MessageSquareText, text: 'Понятное предложение по процессу, системе и следующему шагу'},
    {icon: Timer, text: 'Обычно отвечаем в течение 2 часов в рабочее время'}
  ]
} satisfies Record<Locale, Array<{icon: typeof ShieldCheck; text: string}>>;

const bookingContent = {
  de: {
    eyebrow: 'Kostenlose 15-Minuten-Analyse',
    title: 'Website und Prozesse kurz gemeinsam prüfen.',
    lead:
      'Wir prüfen Ihre Website, Kundengewinnung oder internen Abläufe und zeigen 2–3 konkrete Verbesserungsmöglichkeiten.',
    calendarTitle: 'Termin für die kostenlose TreeTech Analyse wählen',
    fallback:
      'Senden Sie zwei passende Zeitfenster. Wir bestätigen den 15-minütigen Analyse-Termin direkt per E-Mail.',
    cta: 'Termin per E-Mail anfragen'
  },
  en: {
    eyebrow: 'Free 15-minute analysis',
    title: 'Review your website and processes together.',
    lead:
      'We review your website, customer acquisition, or internal workflows and show 2–3 concrete improvement opportunities.',
    calendarTitle: 'Choose a free TreeTech analysis slot',
    fallback: 'Send two suitable time slots. We will confirm the 15-minute analysis by email.',
    cta: 'Request a slot by email'
  },
  ru: {
    eyebrow: 'Бесплатный 15-минутный анализ',
    title: 'Коротко разберём ваш сайт и процессы.',
    lead:
      'Мы рассмотрим сайт, привлечение клиентов или внутренние процессы и покажем 2–3 конкретные возможности улучшения.',
    calendarTitle: 'Выбрать время для бесплатного анализа TreeTech',
    fallback: 'Отправьте два удобных окна. Мы подтвердим 15-минутный анализ по e-mail.',
    cta: 'Запросить время по e-mail'
  }
} satisfies Record<Locale, Record<string, string>>;

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const rawLocale = (await params).locale;

  if (!hasLocale(routing.locales, rawLocale)) {
    return {};
  }

  const locale = rawLocale;
  const content = siteContent[locale];

  return createPageMetadata({
    locale,
    path: '/contact',
    title: content.metadata.contactTitle,
    description: content.metadata.contactDescription
  });
}

export default async function ContactPage({params}: PageProps) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const content = siteContent[locale];
  const booking = bookingContent[locale];
  const calendarUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || process.env.NEXT_PUBLIC_CAL_URL;

  return (
    <section className="dark-band scanline relative overflow-hidden py-20 text-foreground sm:py-24">
      <div className="saas-grid absolute inset-0 opacity-45" />
      <div className="absolute inset-0 hidden" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <FadeIn>
            <p className="inline-flex rounded-full border border-accent/20 bg-accent/[0.08] px-3 py-2 font-bold text-sm text-accent">
              {content.common.nextStep}
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.04] text-foreground sm:text-7xl">
              {content.contact.title}
            </h1>
            <p className="mt-6 text-pretty text-lg leading-8 text-muted sm:text-xl">
              {content.contact.lead}
            </p>

            <div className="mt-8 grid gap-3">
              <div className="terminal-card flex gap-3 rounded-[1.25rem] p-4">
                <Mail className="mt-0.5 h-5 w-5 text-accent" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="text-sm font-semibold text-foreground">
                  {siteConfig.email}
                </a>
              </div>
              <div className="terminal-card flex gap-3 rounded-[1.25rem] p-4">
                <MapPin className="mt-0.5 h-5 w-5 text-accent" aria-hidden="true" />
                <p className="text-sm leading-6 text-muted">{content.contact.details}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              {contactSignals[locale].map((signal, index) => (
                <FadeIn key={signal.text} delay={index * 0.06}>
                  <div className="terminal-card flex gap-3 rounded-[1.25rem] p-4">
                    <signal.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <p className="text-sm font-semibold leading-6 text-foreground">{signal.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-accent/10 blur-2xl" aria-hidden="true" />
              <section
                id="audit-call"
                className="relative mb-6 scroll-mt-24 rounded-[1.25rem] border border-accent/25 bg-accent/[0.08] p-5"
              >
                <p className="inline-flex rounded-full border border-accent/25 bg-accent/[0.08] px-3 py-1.5 font-bold text-xs text-accent">
                  {booking.eyebrow}
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-foreground">{booking.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{booking.lead}</p>
                {calendarUrl ? (
                  <iframe
                    src={calendarUrl}
                    title={booking.calendarTitle}
                    loading="lazy"
                    className="mt-5 h-[520px] w-full rounded-[1rem] border border-border bg-white"
                    allow="camera; microphone; fullscreen"
                  />
                ) : (
                  <div className="mt-5 rounded-[1rem] border border-border bg-surface p-4">
                    <p className="text-sm leading-7 text-muted">{booking.fallback}</p>
                    <a
                      href={`mailto:${siteConfig.email}?subject=Kostenlose TreeTech Analyse`}
                      className="mt-4 inline-flex min-h-14 items-center justify-center gap-2 rounded-[12px] bg-accent px-6 py-3.5 text-base font-bold text-white transition hover:bg-[var(--accent-strong)]"
                    >
                      <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                      {booking.cta}
                    </a>
                  </div>
                )}
              </section>
              <h2 className="relative mb-4 text-2xl font-semibold text-foreground">
                {content.contact.formTitle}
              </h2>
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
