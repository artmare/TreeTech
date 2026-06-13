import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Check} from 'lucide-react';

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
      <section className="py-20 sm:py-24">
        <Container>
          <FadeIn className="max-w-4xl">
            <p className="text-sm font-semibold uppercase text-primary">
              {content.common.eyebrow}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
              {content.services.title}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-muted">
              {content.services.lead}
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <SectionHeading title={content.services.packageTitle} />
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
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <FadeIn>
              <SectionHeading
                title={content.services.addOnsTitle}
                lead={content.services.lead}
              />
              <div className="mt-8">
                <ButtonLink href="/contact">{content.common.startProject}</ButtonLink>
              </div>
            </FadeIn>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.services.addOns.map((item, index) => (
                <FadeIn key={item} delay={index * 0.06}>
                  <div className="flex h-full gap-3 rounded-[8px] border border-border bg-background p-4">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
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
