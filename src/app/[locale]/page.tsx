import {Bot, Code2, DatabaseZap, MonitorSmartphone, PlugZap} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {AgencyDashboard} from '@/components/agency-dashboard';
import {FadeIn} from '@/components/motion/fade-in';
import {OfferCard} from '@/components/offer-card';
import {PortfolioCard} from '@/components/portfolio-card';
import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {offers, portfolioProjects, processSteps, siteContent} from '@/content/site';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string}>;
};

const outcomeCards = {
  de: [
    {
      icon: Bot,
      title: 'AI dort, wo sie Arbeit spart',
      text: 'Automatische Antworten, Dokumente, interne Assistenten und Datenanalysen werden direkt an reale Abläufe gekoppelt.'
    },
    {
      icon: Code2,
      title: 'Websysteme statt Einzelseiten',
      text: 'Websites, Apps und Portale bekommen klare Rollen: verkaufen, erfassen, steuern, verbinden oder automatisieren.'
    },
    {
      icon: PlugZap,
      title: 'Tools sauber verbunden',
      text: 'Formulare, CRM, E-Mail, ERP und externe Services fließen in eine nachvollziehbare digitale Prozesskette.'
    }
  ],
  en: [
    {
      icon: Bot,
      title: 'AI where it saves work',
      text: 'Automated replies, documents, internal assistants, and data analysis connect directly to real workflows.'
    },
    {
      icon: Code2,
      title: 'Web systems, not isolated pages',
      text: 'Websites, apps, and portals get clear jobs: sell, capture, manage, connect, or automate.'
    },
    {
      icon: PlugZap,
      title: 'Tools connected cleanly',
      text: 'Forms, CRM, email, ERP, and external services flow into one understandable digital process chain.'
    }
  ]
} satisfies Record<Locale, Array<{icon: typeof Bot; title: string; text: string}>>;

const workflowLabels = {
  de: ['Workflow audit', 'System map', 'Interface', 'Automation', 'Launch'],
  en: ['Workflow audit', 'System map', 'Interface', 'Automation', 'Launch']
} satisfies Record<Locale, string[]>;

const heroOutcomes = {
  de: [
    'Wir automatisieren manuelle Abläufe',
    'Wir bauen Websites und Web-Apps',
    'Wir verbinden Formulare, CRM, AI und interne Tools'
  ],
  en: [
    'We automate manual business workflows',
    'We build websites and web applications',
    'We connect forms, CRM, AI, and internal tools'
  ]
} satisfies Record<Locale, string[]>;

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const rawLocale = (await params).locale;

  if (!hasLocale(routing.locales, rawLocale)) {
    return {};
  }

  const locale = rawLocale;
  const content = siteContent[locale];

  return createPageMetadata({
    locale,
    title: content.metadata.homeTitle,
    description: content.metadata.homeDescription
  });
}

export default async function HomePage({params}: PageProps) {
  const rawLocale = (await params).locale;

  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  setRequestLocale(locale);
  const content = siteContent[locale];
  const proofCards = [
    {icon: Bot, text: content.home.heroTrust[0]},
    {icon: MonitorSmartphone, text: content.home.heroTrust[1]},
    {icon: DatabaseZap, text: content.home.heroTrust[2]}
  ];

  return (
    <>
      <section className="dark-band scanline relative isolate overflow-hidden text-white">
        <div className="dark-grid absolute inset-0 opacity-45" />
        <Container className="relative grid min-h-[calc(100svh-78px)] gap-12 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-20">
          <FadeIn className="max-w-5xl">
            <p className="inline-flex rounded-full border border-accent/20 bg-accent/[0.08] px-3 py-2 font-mono text-sm text-accent">
              {content.home.heroBadge}
            </p>
            <div className="mt-6 rounded-[1rem] border border-white/10 bg-white/[0.04] p-3 font-mono text-xs text-white/62 sm:max-w-xl">
              <p><span className="text-accent">&gt;</span> load services: ai_automation web_development custom_apps</p>
              <p className="mt-1"><span className="text-accent">&gt;</span> target: austrian_business_clients</p>
            </div>
            <h1 className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-[1.01] text-white sm:text-6xl lg:text-7xl">
              {content.home.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/72 sm:text-xl">
              {content.home.heroLead}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="accent">
                {content.common.primaryCta}
              </ButtonLink>
              <ButtonLink href="/portfolio" variant="secondary">
                {content.common.secondaryCta}
              </ButtonLink>
            </div>
            <ul className="mt-8 grid max-w-2xl gap-3">
              {heroOutcomes[locale].map((item) => (
                <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-white/76">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.12} className="lg:self-start lg:pt-10">
            <AgencyDashboard locale={locale} />
          </FadeIn>
        </Container>
      </section>

      <section className="relative z-10 py-12">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {proofCards.map((card, index) => (
              <FadeIn key={card.text} delay={index * 0.08}>
                <article className="terminal-card h-full rounded-[1.25rem] p-5">
                  <card.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <p className="mt-4 text-sm font-semibold leading-6 text-foreground">{card.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading
              eyebrow={content.common.eyebrow}
              title={content.home.proofTitle}
              lead={content.home.proofCopy}
            />
            <div className="grid gap-4 md:grid-cols-3">
              {outcomeCards[locale].map((card, index) => (
                <FadeIn key={card.title} delay={index * 0.08}>
                  <article className="terminal-card h-full rounded-[1.25rem] p-5">
                    <card.icon className="h-6 w-6 text-accent" aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-semibold text-foreground">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{card.text}</p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="warm-band py-16">
        <Container>
          <SectionHeading
            eyebrow={content.common.nextStep}
            title={content.home.servicesTitle}
            lead={content.home.servicesLead}
          />
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
        <div className="dark-grid absolute inset-0 opacity-35" />
        <Container className="relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              title={content.home.portfolioTitle}
              lead={content.home.portfolioLead}
            />
            <ButtonLink href="/portfolio" variant="secondary" className="md:mb-1">
              {content.common.secondaryCta}
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {portfolioProjects.slice(0, 3).map((project, index) => (
              <FadeIn key={project.slug} delay={index * 0.08}>
                <PortfolioCard
                  project={project}
                  locale={locale}
                  cta={content.common.viewProject}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            align="center"
            title={content.home.processTitle}
            lead={content.home.processLead}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <FadeIn key={step.title[locale]} delay={index * 0.08}>
                <article className="terminal-card h-full rounded-[1.25rem] p-5">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-accent/[0.08] font-mono text-sm text-accent">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title[locale]}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{step.description[locale]}</p>
                </article>
              </FadeIn>
            ))}
          </div>
          <div className="terminal-window mt-10 grid gap-3 rounded-[1.25rem] p-4 md:grid-cols-5">
            {workflowLabels[locale].map((label, index) => (
              <div key={label} className="flex items-center gap-3 font-mono text-xs text-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[#070806]">
                  {index + 1}
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/contact">{content.common.startProject}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
