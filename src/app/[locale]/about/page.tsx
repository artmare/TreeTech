import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {CheckCircle2} from 'lucide-react';

import {FadeIn} from '@/components/motion/fade-in';
import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {processSteps, siteContent} from '@/content/site';
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
    path: '/about',
    title: content.metadata.aboutTitle,
    description: content.metadata.aboutDescription
  });
}

export default async function AboutPage({params}: PageProps) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const content = siteContent[locale];

  return (
    <>
      <section className="py-20 sm:py-24">
        <Container>
          <FadeIn className="max-w-4xl">
            <p className="text-sm font-semibold uppercase text-primary">
              {content.common.eyebrow}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
              {content.about.title}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-muted">
              {content.about.lead}
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <FadeIn>
              <div className="rounded-[8px] border border-border bg-[#111815] p-6 text-white shadow-sm sm:p-8">
                <p className="text-sm font-semibold uppercase text-white/60">TreeTech</p>
                <h2 className="mt-3 text-3xl font-semibold">{content.about.storyTitle}</h2>
                <p className="mt-5 text-base leading-8 text-white/70">{content.about.story}</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="rounded-[8px] border border-border bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-3xl font-semibold text-foreground">
                  {content.about.valuesTitle}
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {content.about.values.map((value) => (
                    <li key={value} className="flex gap-3 text-sm leading-6 text-muted">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
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
                <article className="h-full rounded-[8px] border border-border bg-background p-5">
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
