import {CalendarCheck, ChevronDown, Mail, MessageCircle, Phone} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {ContactForm} from '@/components/contact-form';
import {Container} from '@/components/ui/container';
import {homeHandwerk} from '@/content/home-handwerk';
import {phoneHref, siteConfig, siteContent, whatsappHref} from '@/content/site';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string}>;
};

type ContactCopy = {
  title: string;
  lead: string;
  formTitle: string;
  directTitle: string;
  call: string;
  whatsapp: string;
  email: string;
  nextTitle: string;
  next: string[];
  calendarTitle: string;
  calendarLead: string;
  calendarFrameTitle: string;
  calendarExternal: string;
};

const copy: Record<Locale, ContactCopy> = {
  de: {
    title: 'Ihre kostenlose Vorschau.',
    lead: 'Name Ihres Betriebs und Ort genügen. In 3 Werktagen sehen Sie, wie Ihre Website aussehen kann. Sie zahlen nur, wenn sie Ihnen gefällt.',
    formTitle: 'Vorschau anfordern',
    directTitle: 'Lieber direkt?',
    call: 'Anrufen',
    whatsapp: 'WhatsApp schreiben',
    email: 'E-Mail schreiben',
    nextTitle: 'So geht es weiter',
    next: [
      'Wir melden uns persönlich bei Ihnen.',
      'Innerhalb von 3 Werktagen bekommen Sie Ihre Vorschau per WhatsApp oder E-Mail.',
      'Gefällt sie Ihnen, besprechen wir den Rest in 30 Minuten.'
    ],
    calendarTitle: 'Gleich einen Termin ausmachen',
    calendarLead: 'Wählen Sie eine Zeit für das Gespräch. Am Telefon oder bei Ihnen im Betrieb.',
    calendarFrameTitle: 'Termin mit TreeTech wählen',
    calendarExternal: 'Kalender in neuem Fenster öffnen'
  },
  en: {
    title: 'Your free preview.',
    lead: 'Your business name and town are enough. Within 3 working days you see what your website could look like. You only pay if you like it.',
    formTitle: 'Request your preview',
    directTitle: 'Prefer to talk?',
    call: 'Call',
    whatsapp: 'Message on WhatsApp',
    email: 'Send an email',
    nextTitle: 'What happens next',
    next: [
      'We get back to you personally.',
      'Within 3 working days you receive your preview via WhatsApp or email.',
      'If you like it, we go through the rest in 30 minutes.'
    ],
    calendarTitle: 'Book a call right away',
    calendarLead: 'Pick a time for the call. By phone or at your business.',
    calendarFrameTitle: 'Book a time with TreeTech',
    calendarExternal: 'Open calendar in a new window'
  },
  ru: {
    title: 'Ваше бесплатное превью.',
    lead: 'Достаточно названия бизнеса и города. Через 3 рабочих дня вы увидите, каким может быть ваш сайт. Платите, только если понравится.',
    formTitle: 'Запросить превью',
    directTitle: 'Удобнее напрямую?',
    call: 'Позвонить',
    whatsapp: 'Написать в WhatsApp',
    email: 'Написать на e-mail',
    nextTitle: 'Что будет дальше',
    next: [
      'Мы лично свяжемся с вами.',
      'В течение 3 рабочих дней вы получите превью в WhatsApp или на e-mail.',
      'Если понравится, обсудим остальное за 30 минут.'
    ],
    calendarTitle: 'Сразу записаться на разговор',
    calendarLead: 'Выберите время для разговора. По телефону или у вас на месте.',
    calendarFrameTitle: 'Выбрать время с TreeTech',
    calendarExternal: 'Открыть календарь в новом окне'
  }
};

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
  const rawLocale = (await params).locale;

  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  setRequestLocale(locale);
  const text = copy[locale];
  const calUrl = process.env.NEXT_PUBLIC_CAL_URL || siteConfig.calUrl;
  const calEmbed = `${calUrl}?embed=true&theme=light&layout=month_view`;
  const direct = 'flex min-h-14 items-center gap-3 rounded-[12px] border-2 border-foreground bg-surface px-4 py-3 text-base font-bold text-foreground transition-colors hover:bg-background';

  return (
    <section className="py-10 sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <h1 className="text-balance text-[42px] leading-[1.02] text-foreground sm:text-6xl">{text.title}</h1>
            <p className="mt-4 max-w-[34em] text-pretty text-lg leading-relaxed text-muted">{text.lead}</p>

            <h2 className="mt-10 text-xl text-foreground">{text.directTitle}</h2>
            <div className="mt-4 grid gap-3">
              <a className={direct} href={phoneHref} data-track="phone_click">
                <Phone className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  {text.call}
                  <span className="block text-sm font-semibold text-muted">{siteConfig.phone}</span>
                </span>
              </a>
              <a
                className={direct}
                href={whatsappHref(homeHandwerk[locale].whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
              >
                <MessageCircle className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                {text.whatsapp}
              </a>
              <a className={direct} href={`mailto:${siteConfig.email}`} data-track="email_click">
                <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span className="min-w-0">
                  {text.email}
                  <span className="block break-all text-sm font-semibold text-muted">{siteConfig.email}</span>
                </span>
              </a>
            </div>

            <h2 className="mt-10 text-xl text-foreground">{text.nextTitle}</h2>
            <ol className="mt-4 grid gap-4">
              {text.next.map((item, index) => (
                <li key={item} className="grid grid-cols-[40px_1fr] items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-base font-extrabold text-white">
                    {index + 1}
                  </span>
                  <span className="pt-2 text-base text-foreground">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <section id="audit-call" className="scroll-mt-28">
              <h2 className="mb-4 text-2xl text-foreground sm:text-3xl">{text.formTitle}</h2>
              <ContactForm />
            </section>

            <details className="group mt-6 rounded-[14px] border-2 border-border bg-surface open:border-foreground">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                <span className="flex items-start gap-3">
                  <CalendarCheck className="mt-0.5 h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
                  <span>
                    <span className="block text-lg font-bold text-foreground">{text.calendarTitle}</span>
                    <span className="mt-1 block text-[15px] text-muted">{text.calendarLead}</span>
                  </span>
                </span>
                <ChevronDown className="h-6 w-6 shrink-0 transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="border-t border-border p-2 sm:p-3">
                <iframe
                  src={calEmbed}
                  title={text.calendarFrameTitle}
                  loading="lazy"
                  className="h-[640px] w-full rounded-[10px] bg-white"
                />
                <a
                  href={calUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="calendar_open"
                  className="mt-2 inline-flex min-h-11 items-center px-3 text-[15px] font-bold text-accent hover:underline"
                >
                  {text.calendarExternal}
                </a>
              </div>
            </details>
          </div>
        </div>
      </Container>
    </section>
  );
}
