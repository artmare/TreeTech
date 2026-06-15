import {BarChart3, Gauge, LayoutDashboard, MonitorSmartphone, ShieldCheck, Sparkles} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

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
      icon: LayoutDashboard,
      title: 'Klarer Angebots-Funnel',
      text: 'Besucher erkennen sofort, was Sie anbieten, für wen es passt und welchen nächsten Schritt sie setzen sollen.'
    },
    {
      icon: Gauge,
      title: 'Premium-Speedgefühl',
      text: 'Schnelle Seiten, ruhige Animationen und saubere Responsive-Layouts sorgen für Vertrauen auf jedem Gerät.'
    },
    {
      icon: BarChart3,
      title: 'Mehr Anfragequalität',
      text: 'Struktur, Copy und CTAs sind so aufgebaut, dass bessere Anfragen statt nur mehr Klicks entstehen.'
    }
  ],
  en: [
    {
      icon: LayoutDashboard,
      title: 'Clear offer funnel',
      text: 'Visitors understand what you offer, who it is for, and what next step they should take.'
    },
    {
      icon: Gauge,
      title: 'Premium speed feel',
      text: 'Fast pages, calm animation, and clean responsive layouts create trust on every device.'
    },
    {
      icon: BarChart3,
      title: 'Better inquiry quality',
      text: 'Structure, copy, and CTAs are designed to create better inquiries, not just more clicks.'
    }
  ]
} satisfies Record<Locale, Array<{icon: typeof LayoutDashboard; title: string; text: string}>>;

const workflowLabels = {
  de: ['Positionierung', 'Struktur', 'Designsystem', 'Launch'],
  en: ['Positioning', 'Structure', 'Design system', 'Launch']
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
  const salesStats = [
    [content.home.metricOne, content.home.metricOneLabel],
    [content.home.metricTwo, content.home.metricTwoLabel],
    [content.home.metricThree, content.home.metricThreeLabel]
  ];
  const proofCards = [
    {icon: ShieldCheck, text: content.home.heroTrust[0]},
    {icon: MonitorSmartphone, text: content.home.heroTrust[1]},
    {icon: Sparkles, text: content.home.heroTrust[2]}
  ];

  return (
    <>
      <section className="dark-band relative isolate overflow-hidden text-white">
        <div className="dark-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <Container className="relative min-h-[calc(100svh-76px)] py-16 lg:py-20">
          <FadeIn className="max-w-5xl">
            <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-accent">
              {content.home.heroBadge}
            </p>
            <h1 className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              {content.home.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/72 sm:text-xl">
              {content.home.heroLead}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="accent">
                {content.common.primaryCta}
              </ButtonLink>
              <ButtonLink
                href="/portfolio"
                variant="secondary"
                className="!border-white !bg-white !text-[#0a1210] hover:!bg-accent [&_svg]:!text-[#0a1210]"
              >
                {content.common.secondaryCta}
              </ButtonLink>
            </div>
            <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
              {salesStats.map(([value, label]) => (
                <div key={value} className="rounded-[8px] border border-white/10 bg-white/[0.07] p-4">
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-sm leading-5 text-white/58">{label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="relative z-10 py-14">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {proofCards.map((card, index) => (
              <FadeIn key={card.text} delay={index * 0.08}>
                <article className="lift-card h-full rounded-[8px] border border-border bg-white p-5 shadow-sm">
                  <card.icon className="h-5 w-5 text-primary" aria-hidden="true" />
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
                  <article className="lift-card h-full rounded-[8px] border border-border bg-white p-5 shadow-sm">
                    <card.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-semibold text-foreground">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{card.text}</p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeading
            eyebrow={content.common.nextStep}
            title={content.home.servicesTitle}
            lead={content.home.servicesLead}
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {offers.map((offer, index) => (
              <FadeIn key={offer.price} delay={index * 0.08}>
                <OfferCard
                  offer={offer}
                  locale={locale}
                  includedLabel={content.common.included}
                  fromLabel={content.common.from}
                  ctaLabel={content.common.requestPackage}
                  recommendedLabel={content.common.recommended}
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
              className="[&_h2]:text-white [&_p]:text-white/70"
            />
            <ButtonLink href="/portfolio" variant="secondary" className="!border-white !bg-white !text-[#0a1210] hover:!bg-accent md:mb-1 [&_svg]:!text-[#0a1210]">
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
                <article className="lift-card h-full rounded-[8px] border border-border bg-white p-5 shadow-sm">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#0a1210] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title[locale]}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{step.description[locale]}</p>
                </article>
              </FadeIn>
            ))}
          </div>
          <div className="mt-10 grid gap-3 rounded-[8px] border border-border bg-white p-4 shadow-sm md:grid-cols-4">
            {workflowLabels[locale].map((label, index) => (
              <div key={label} className="flex items-center gap-3 text-sm font-semibold text-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/[0.1] text-primary">
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
