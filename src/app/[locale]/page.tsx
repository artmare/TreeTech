import {CheckCircle2} from 'lucide-react';
import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';

import {FadeIn, SoftScaleIn} from '@/components/motion/fade-in';
import {OfferCard} from '@/components/offer-card';
import {PortfolioCard} from '@/components/portfolio-card';
import {ProjectPreview} from '@/components/project-preview';
import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {offers, portfolioProjects, processSteps, siteContent} from '@/content/site';
import type {Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const content = siteContent[locale];

  return createPageMetadata({
    locale,
    title: content.metadata.homeTitle,
    description: content.metadata.homeDescription
  });
}

export default async function HomePage({params}: PageProps) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const content = siteContent[locale];
  const heroProject = portfolioProjects[2];

  return (
    <>
      <section className="relative min-h-[calc(100svh-136px)] overflow-hidden bg-[#111815] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(17,24,21,0.98)_0%,rgba(17,24,21,0.88)_42%,rgba(15,95,69,0.48)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(0deg,#f7f8f4_0%,rgba(247,248,244,0)_100%)]" />
        <div className="absolute -right-28 top-16 hidden w-[48rem] rotate-2 opacity-60 lg:block">
          <ProjectPreview project={heroProject} size="large" />
        </div>
        <div className="absolute bottom-10 right-10 hidden w-80 -rotate-3 opacity-75 xl:block">
          <ProjectPreview project={portfolioProjects[0]} />
        </div>
        <Container className="relative z-10 flex min-h-[calc(100svh-136px)] items-center py-16">
          <FadeIn className="max-w-3xl">
            <p className="inline-flex rounded-[8px] border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white">
              {content.home.heroBadge}
            </p>
            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              {content.home.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/75 sm:text-xl">
              {content.home.heroLead}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {content.home.heroTrust.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-[8px] border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white/80"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#f2b84b]" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">{content.common.primaryCta}</ButtonLink>
              <ButtonLink href="/portfolio" variant="secondary" className="border-white/25 bg-white/10 text-white hover:bg-white hover:text-foreground">
                {content.common.secondaryCta}
              </ButtonLink>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-6">
              {[
                [content.home.metricOne, content.home.metricOneLabel],
                [content.home.metricTwo, content.home.metricTwoLabel],
                [content.home.metricThree, content.home.metricThreeLabel]
              ].map(([value, label]) => (
                <div key={value}>
                  <p className="text-xl font-semibold text-white sm:text-2xl">{value}</p>
                  <p className="mt-1 text-xs leading-5 text-white/60 sm:text-sm">{label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <SoftScaleIn className="grid gap-6 rounded-[8px] border border-border bg-white p-6 shadow-sm md:grid-cols-[0.8fr_1.2fr] md:p-8">
            <h2 className="text-2xl font-semibold text-foreground">
              {content.home.proofTitle}
            </h2>
            <div>
              <p className="text-base leading-8 text-muted">{content.home.proofCopy}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {content.home.heroTrust.map((item) => (
                  <div
                    key={item}
                    className="rounded-[8px] border border-border bg-[#f7f8f4] px-3 py-3 text-sm font-semibold text-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </SoftScaleIn>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow={content.common.eyebrow}
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

      <section className="bg-white py-16">
        <Container>
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
                <article className="h-full rounded-[8px] border border-border bg-white p-5 shadow-sm">
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
