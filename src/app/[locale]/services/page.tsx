import {Check, CheckCircle2, Layers3, Rocket, ShieldCheck} from 'lucide-react';
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
    {icon: Layers3, title: 'Struktur vor Design', text: 'Jede Seite bekommt eine klare Rolle im Anfrageweg.'},
    {icon: ShieldCheck, title: 'Trust by default', text: 'Referenzen, Nutzenargumente und lokale Glaubwürdigkeit sind fest eingeplant.'},
    {icon: Rocket, title: 'Launch-fähig', text: 'Responsiv, performant und vorbereitet für Kontaktformular und SEO.'}
  ],
  en: [
    {icon: Layers3, title: 'Structure before design', text: 'Every page gets a clear role in the inquiry journey.'},
    {icon: ShieldCheck, title: 'Trust by default', text: 'References, value arguments, and local credibility are built in.'},
    {icon: Rocket, title: 'Launch-ready', text: 'Responsive, performant, and prepared for contact forms and SEO.'}
  ]
} satisfies Record<Locale, Array<{icon: typeof Layers3; title: string; text: string}>>;

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
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="saas-grid absolute inset-0 opacity-45" />
        <Container className="relative">
          <FadeIn className="max-w-5xl">
            <p className="inline-flex rounded-full border border-primary/[0.15] bg-primary/[0.08] px-3 py-2 text-sm font-semibold text-primary">
              {content.common.eyebrow}
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.04] text-foreground sm:text-7xl">
              {content.services.title}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-muted sm:text-xl">
              {content.services.lead}
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {servicePillars[locale].map((pillar, index) => (
              <FadeIn key={pillar.title} delay={index * 0.08}>
                <article className="lift-card h-full rounded-[8px] border border-border bg-white p-5 shadow-sm">
                  <pillar.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h2 className="mt-4 text-lg font-semibold text-foreground">{pillar.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{pillar.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeading title={content.services.packageTitle} lead={content.home.servicesLead} />
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
        <div className="dark-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <FadeIn>
              <SectionHeading
                title={content.services.addOnsTitle}
                lead={content.services.lead}
                className="[&_h2]:text-white [&_p]:text-white/70"
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
                  <div className="flex h-full gap-3 rounded-[8px] border border-white/12 bg-white/[0.07] p-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <p className="text-sm leading-6 text-white/75">{item}</p>
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
                <article className="lift-card h-full rounded-[8px] border border-border bg-white p-5 shadow-sm">
                  <CheckCircle2 className="mb-5 h-6 w-6 text-primary" aria-hidden="true" />
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
