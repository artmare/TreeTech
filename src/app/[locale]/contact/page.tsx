import {Mail, MapPin, MessageSquareText, ShieldCheck, Timer} from 'lucide-react';
import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';

import {ContactForm} from '@/components/contact-form';
import {FadeIn} from '@/components/motion/fade-in';
import {Container} from '@/components/ui/container';
import {siteConfig, siteContent} from '@/content/site';
import type {Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string}>;
};

const contactSignals = {
  de: [
    {icon: ShieldCheck, text: 'Ehrliche Einschätzung statt Verkaufsdruck'},
    {icon: MessageSquareText, text: 'Klarer Vorschlag für Paket und Umfang'},
    {icon: Timer, text: 'Antwort in der Regel innerhalb eines Werktags'}
  ],
  en: [
    {icon: ShieldCheck, text: 'Honest assessment without sales pressure'},
    {icon: MessageSquareText, text: 'Clear suggestion for package and scope'},
    {icon: Timer, text: 'Replies usually within one business day'}
  ]
} satisfies Record<Locale, Array<{icon: typeof ShieldCheck; text: string}>>;

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const locale = (await params).locale as Locale;
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

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="saas-grid absolute inset-0 opacity-45" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <FadeIn>
            <p className="inline-flex rounded-full border border-primary/[0.15] bg-primary/[0.08] px-3 py-2 text-sm font-semibold text-primary">
              {content.common.nextStep}
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.04] text-foreground sm:text-7xl">
              {content.contact.title}
            </h1>
            <p className="mt-6 text-pretty text-lg leading-8 text-muted sm:text-xl">
              {content.contact.lead}
            </p>

            <div className="mt-8 grid gap-3">
              <div className="flex gap-3 rounded-[8px] border border-border bg-white p-4 shadow-sm">
                <Mail className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="text-sm font-semibold text-foreground">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex gap-3 rounded-[8px] border border-border bg-white p-4 shadow-sm">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                <p className="text-sm leading-6 text-muted">{content.contact.details}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              {contactSignals[locale].map((signal, index) => (
                <FadeIn key={signal.text} delay={index * 0.06}>
                  <div className="flex gap-3 rounded-[8px] border border-border bg-white/78 p-4 shadow-sm backdrop-blur">
                    <signal.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <p className="text-sm font-semibold leading-6 text-foreground">{signal.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
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
