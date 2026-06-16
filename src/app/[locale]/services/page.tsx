import {Bot, Check, CheckCircle2, GitBranch, Layers3, Rocket} from 'lucide-react';
import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';

import {FadeIn} from '@/components/motion/fade-in';
import {OfferCard} from '@/components/offer-card';
import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {offers, processSteps, siteContent} from '@/content/site';
import type {Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string}>;
};

const servicePillars = {
  de: [
    {icon: Bot, title: 'AI mit echtem Nutzen', text: 'Keine Spielerei: Automationen werden an reale Aufgaben, Daten und Entscheidungen gekoppelt.'},
    {icon: Layers3, title: 'Web als Betriebssystem', text: 'Website, Web-App, CRM-Flow und interne Tools werden als zusammenhängendes System geplant.'},
    {icon: Rocket, title: 'Launch-fähig', text: 'Responsive, performant, nachvollziehbar und vorbereitet für Betrieb, Monitoring und Erweiterung.'}
  ],
  en: [
    {icon: Bot, title: 'AI with real utility', text: 'No gimmicks: automations are tied to real tasks, data, and decisions.'},
    {icon: Layers3, title: 'Web as operating system', text: 'Website, web app, CRM flow, and internal tools are planned as one connected system.'},
    {icon: Rocket, title: 'Launch-ready', text: 'Responsive, performant, understandable, and prepared for operation, monitoring, and growth.'}
  ]
} satisfies Record<Locale, Array<{icon: typeof Bot; title: string; text: string}>>;

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const content = siteContent[locale];

  return createPageMetadata({
    locale,
    path: '/services',
    title: content.metadata.servicesTitle,
    description: content.metadata.servicesDescription
  });
}

export default async function ServicesPage({params}: PageProps) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const content = siteContent[locale];

  return (
    <>
      <section className="dark-band scanline relative overflow-hidden py-20 text-white sm:py-24">
        <div className="dark-grid absolute inset-0 opacity-45" />
        <Container className="relative">
          <FadeIn className="max-w-5xl">
            <p className="inline-flex rounded-full border border-accent/20 bg-accent/[0.08] px-3 py-2 font-mono text-sm text-accent">
              {content.common.eyebrow}
            </p>
            <div className="mt-6 rounded-[1rem] border border-white/10 bg-white/[0.04] p-3 font-mono text-xs text-white/62 sm:max-w-xl">
              <p><span className="text-accent">&gt;</span> read service_registry.json</p>
              <p className="mt-1"><span className="text-accent">&gt;</span> output: automation web apps workflows</p>
            </div>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.04] text-white sm:text-7xl">
              {content.services.title}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-white/72 sm:text-xl">
              {content.services.lead}
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {servicePillars[locale].map((pillar, index) => (
              <FadeIn key={pillar.title} delay={index * 0.08}>
                <article className="terminal-card h-full rounded-[1.25rem] p-5">
                  <pillar.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h2 className="mt-4 text-lg font-semibold text-foreground">{pillar.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{pillar.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="warm-band py-16">
        <Container>
          <SectionHeading title={content.services.serviceAreasTitle} lead={content.home.servicesLead} />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {offers.map((offer, index) => (
              <FadeIn key={offer.chapter} delay={index * 0.08}>
                <OfferCard
                  offer={offer}
                  locale={locale}
                  ctaLabel={content.common.requestPackage}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="dark-band relative overflow-hidden py-16 text-white">
        <div className="dark-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <FadeIn>
              <SectionHeading
                title={content.services.addOnsTitle}
                lead={content.services.lead}
              />
              <div className="mt-8">
                <ButtonLink href="/contact" variant="accent">
                  {content.common.startProject}
                </ButtonLink>
              </div>
            </FadeIn>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.services.addOns.map((item, index) => (
                <FadeIn key={item} delay={index * 0.06}>
                  <div className="terminal-card flex h-full gap-3 rounded-[1rem] p-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <p className="text-sm leading-6 text-muted">{item}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading title={content.services.processTitle} />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <FadeIn key={step.title[locale]} delay={index * 0.08}>
                <article className="terminal-card h-full rounded-[1.25rem] p-5">
                  {index % 2 === 0 ? (
                    <CheckCircle2 className="mb-5 h-6 w-6 text-accent" aria-hidden="true" />
                  ) : (
                    <GitBranch className="mb-5 h-6 w-6 text-accent" aria-hidden="true" />
                  )}
                  <h3 className="text-lg font-semibold text-foreground">{step.title[locale]}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{step.description[locale]}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
