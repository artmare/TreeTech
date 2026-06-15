import {CheckCircle2, Compass, Layers3, ShieldCheck, Sparkles} from 'lucide-react';
import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';

import {ConversionShowcase} from '@/components/conversion-showcase';
import {FadeIn, SoftScaleIn} from '@/components/motion/fade-in';
import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {processSteps, siteContent} from '@/content/site';
import type {Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string}>;
};

const studioSignals = {
  de: ['Schlankes Studio', 'B2B-fokussiert', 'Mehrsprachig gedacht'],
  en: ['Lean studio', 'B2B-focused', 'Multilingual by design']
} satisfies Record<Locale, string[]>;

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const content = siteContent[locale];

  return createPageMetadata({
    locale,
    path: '/about',
    title: content.metadata.aboutTitle,
    description: content.metadata.aboutDescription
  });
}

export default async function AboutPage({params}: PageProps) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const content = siteContent[locale];
  const valueIcons = [Compass, Layers3, ShieldCheck, CheckCircle2];

  return (
    <>
      <section className="dark-band relative isolate overflow-hidden py-20 text-white sm:py-24">
        <div className="dark-grid absolute inset-0 opacity-35" />
        <Container className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <FadeIn>
            <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-accent">
              {content.common.eyebrow}
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.04] text-white sm:text-7xl">
              {content.about.title}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-white/72 sm:text-xl">
              {content.about.lead}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {studioSignals[locale].map((item) => (
                <div key={item} className="rounded-[8px] border border-white/10 bg-white/[0.07] p-4 text-sm font-semibold text-white">
                  {item}
                </div>
              ))}
            </div>
          </FadeIn>
          <SoftScaleIn>
            <ConversionShowcase locale={locale} />
          </SoftScaleIn>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <FadeIn>
              <div className="h-full rounded-[8px] border border-border bg-white p-6 shadow-sm sm:p-8">
                <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="mt-5 text-4xl font-semibold leading-tight text-foreground">
                  {content.about.storyTitle}
                </h2>
                <p className="mt-5 text-base leading-8 text-muted">{content.about.story}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                {content.about.values.map((value, index) => {
                  const Icon = valueIcons[index] ?? CheckCircle2;
                  return (
                    <article key={value} className="lift-card h-full rounded-[8px] border border-border bg-white p-5 shadow-sm">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      <p className="mt-4 text-sm font-semibold leading-7 text-foreground">{value}</p>
                    </article>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeading
            title={content.services.processTitle}
            lead={content.about.promise}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <FadeIn key={step.title[locale]} delay={index * 0.08}>
                <article className="lift-card h-full rounded-[8px] border border-border bg-background p-5 shadow-sm">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#0a1210] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title[locale]}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{step.description[locale]}</p>
                </article>
              </FadeIn>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href="/contact">{content.common.primaryCta}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
