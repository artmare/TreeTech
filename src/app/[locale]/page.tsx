import {
  Camera,
  CheckCircle2,
  Clock,
  Euro,
  Eye,
  HelpCircle,
  KeyRound,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Phone,
  PhoneMissed,
  Search,
  SearchX,
  ShieldCheck
} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import Image from 'next/image';
import {notFound} from 'next/navigation';

import {AgencyDashboardLazy} from '@/components/agency-dashboard-lazy';
import {FadeIn} from '@/components/motion/fade-in';
import {PortfolioCard} from '@/components/portfolio-card';
import {PrimaryServiceCard} from '@/components/primary-service-card';
import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {homeHandwerk} from '@/content/home-handwerk';
import {formatEur, getPackage} from '@/content/pricing';
import {
  faqItems,
  phoneHref,
  portfolioProjects,
  pricePackages,
  primaryServiceOffers,
  siteConfig,
  siteContent,
  whatsappHref
} from '@/content/site';
import {teamMembers} from '@/content/team';
import {routing} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string}>;
};

const painIcons = [SearchX, PhoneMissed, MonitorSmartphone];
const featureIcons = [Phone, Camera, MapPin, Search];
const guaranteeIcons = [Eye, Clock, KeyRound];

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
  const copy = homeHandwerk[locale];
  const startPrice = formatEur(getPackage('websiteStart').oneTime ?? 0, locale);
  const whatsapp = whatsappHref(copy.whatsappMessage);

  return (
    <>
      {/* 1. Hero: niche, promise, price, direct contact */}
      <section className="dark-band scanline relative isolate overflow-hidden text-white">
        <div className="dark-grid absolute inset-0 opacity-45" />
        <Container className="relative grid min-h-[calc(88svh-78px)] gap-10 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-16">
          <FadeIn className="max-w-3xl">
            <p className="inline-flex rounded-full border border-accent/20 bg-accent/[0.08] px-3 py-2 font-mono text-xs text-accent sm:text-sm">
              {copy.hero.badge}
            </p>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] text-white sm:text-6xl">
              {copy.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/74 sm:text-xl">
              {copy.hero.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact#audit-call" variant="accent" trackingEvent="cta_preview_hero">
                {copy.hero.primaryCta}
              </ButtonLink>
              <ButtonLink href={phoneHref} variant="secondary" icon={Phone} trackingEvent="phone_click">
                {copy.hero.call}
              </ButtonLink>
              <ButtonLink href={whatsapp} variant="secondary" icon={MessageCircle} trackingEvent="whatsapp_click">
                {copy.hero.whatsapp}
              </ButtonLink>
            </div>
            <ul className="mt-7 grid max-w-2xl gap-x-6 gap-y-2 sm:grid-cols-2">
              {copy.hero.facts.map((fact) => (
                <li key={fact} className="flex items-center gap-2 text-sm font-semibold text-white/80">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{fact.replace('{price}', startPrice)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/60">
              <a href={phoneHref} className="font-semibold text-white/80 underline-offset-4 hover:underline">
                {siteConfig.phone}
              </a>
              {' · '}
              {siteConfig.region[locale]}
            </p>
          </FadeIn>
          <FadeIn delay={0.12} className="hidden lg:block lg:self-center">
            <AgencyDashboardLazy locale={locale} />
          </FadeIn>
        </Container>
      </section>

      {/* 2. Pains */}
      <section className="py-16">
        <Container>
          <SectionHeading eyebrow={copy.pains.eyebrow} title={copy.pains.title} lead={copy.pains.lead} />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {copy.pains.items.map((item, index) => {
              const Icon = painIcons[index % painIcons.length];
              return (
                <FadeIn key={item.title} delay={index * 0.08}>
                  <article className="terminal-card h-full rounded-[1.25rem] p-5">
                    <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. How it works */}
      <section className="warm-band py-16">
        <Container>
          <SectionHeading eyebrow={copy.steps.eyebrow} title={copy.steps.title} lead={copy.steps.lead} />
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {copy.steps.items.map((step, index) => (
              <FadeIn key={step.title} delay={index * 0.08}>
                <li className="terminal-card h-full list-none rounded-[1.25rem] p-5">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-accent font-mono text-sm font-semibold text-[#070806]">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{step.text}</p>
                </li>
              </FadeIn>
            ))}
          </ol>
          <div className="mt-10">
            <ButtonLink href="/contact#audit-call" trackingEvent="cta_preview_steps">
              {copy.steps.cta}
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* 4. What the website does + trades */}
      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <SectionHeading eyebrow={copy.features.eyebrow} title={copy.features.title} lead={copy.features.lead} />
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-accent">{copy.features.tradesLabel}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {copy.features.trades.map((trade) => (
                  <li
                    key={trade}
                    className="rounded-full border border-white/12 bg-white/[0.045] px-3 py-1.5 text-sm font-medium text-foreground"
                  >
                    {trade}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {copy.features.items.map((item, index) => {
                const Icon = featureIcons[index % featureIcons.length];
                return (
                  <FadeIn key={item.title} delay={index * 0.06}>
                    <article className="terminal-card h-full rounded-[1.25rem] p-5">
                      <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                      <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted">{item.text}</p>
                    </article>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Prices + guarantee */}
      <section className="dark-band relative overflow-hidden py-16 text-white">
        <div className="dark-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <SectionHeading eyebrow={copy.pricing.eyebrow} title={copy.pricing.title} lead={copy.pricing.lead} />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pricePackages.map((item, index) => (
              <FadeIn key={item.name[locale]} delay={index * 0.06}>
                <article className="terminal-card h-full rounded-[1.25rem] p-5">
                  <Euro className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{item.name[locale]}</h3>
                  <p className="mt-3 text-2xl font-semibold text-accent">{item.price[locale]}</p>
                  <p className="mt-4 text-sm leading-7 text-muted">{item.description[locale]}</p>
                </article>
              </FadeIn>
            ))}
          </div>
          <div className="mt-6">
            <ButtonLink href="/services" variant="secondary">
              {copy.pricing.allPrices}
            </ButtonLink>
          </div>

          <div className="mt-14 rounded-[1.5rem] border border-accent/25 bg-accent/[0.06] p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{copy.guarantee.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{copy.guarantee.title}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {copy.guarantee.items.map((item, index) => {
                const Icon = guaranteeIcons[index % guaranteeIcons.length];
                return (
                  <div key={item.title}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-[#070806]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-white/72">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Team (hidden until real photos and bios exist) */}
      {teamMembers.length > 0 ? (
        <section className="py-16">
          <Container>
            <SectionHeading eyebrow={copy.team.eyebrow} title={copy.team.title} lead={copy.team.lead} />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {teamMembers.map((member, index) => (
                <FadeIn key={member.name} delay={index * 0.08}>
                  <article className="terminal-card flex h-full gap-5 rounded-[1.25rem] p-5">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={112}
                      height={112}
                      className="h-24 w-24 shrink-0 rounded-full object-cover sm:h-28 sm:w-28"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-accent">{member.role[locale]}</p>
                      <p className="mt-3 text-sm leading-7 text-muted">{member.bio[locale]}</p>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* 7. Examples */}
      <section className="warm-band py-16">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading title={copy.portfolio.title} lead={copy.portfolio.lead} />
            <ButtonLink href="/portfolio" variant="secondary" className="md:mb-1">
              {content.common.secondaryCta}
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {portfolioProjects.slice(0, 3).map((project, index) => (
              <FadeIn key={project.slug} delay={index * 0.08}>
                <PortfolioCard project={project} locale={locale} cta={content.common.viewProject} />
              </FadeIn>
            ))}
          </div>
          <p className="mt-8 max-w-3xl rounded-[1rem] border border-white/10 bg-white/[0.06] px-4 py-3 text-sm leading-7 text-white/68">
            {content.portfolio.disclaimer}
          </p>
        </Container>
      </section>

      {/* 8. More than a website */}
      <section className="py-16">
        <Container>
          <SectionHeading eyebrow={copy.more.eyebrow} title={copy.more.title} lead={copy.more.lead} />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {primaryServiceOffers.map((offer, index) => (
              <FadeIn key={offer.id} delay={index * 0.08}>
                <PrimaryServiceCard
                  offer={offer}
                  locale={locale}
                  ctaLabel={content.common.requestPackage}
                  detailLabel={content.common.learnMore}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* 9. FAQ + final call to action */}
      <section className="warm-band py-16">
        <Container>
          <SectionHeading eyebrow="faq" title={copy.faq.title} lead={copy.faq.lead} />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {faqItems.map((item, index) => (
              <FadeIn key={item.question[locale]} delay={index * 0.04}>
                <article className="terminal-card h-full rounded-[1.25rem] p-5">
                  <HelpCircle className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{item.question[locale]}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.answer[locale]}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="dark-band relative overflow-hidden py-16 text-white">
        <div className="dark-grid absolute inset-0 opacity-35" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <ShieldCheck className="mx-auto h-8 w-8 text-accent" aria-hidden="true" />
            <h2 className="mt-5 text-balance text-3xl font-semibold text-white sm:text-5xl">{copy.final.title}</h2>
            <p className="mt-5 text-lg leading-8 text-white/72">{copy.final.lead}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact#audit-call" variant="accent" trackingEvent="cta_preview_final">
                {copy.final.cta}
              </ButtonLink>
              <ButtonLink href={phoneHref} variant="secondary" icon={Phone} trackingEvent="phone_click">
                {siteConfig.phone}
              </ButtonLink>
              <ButtonLink href={whatsapp} variant="secondary" icon={MessageCircle} trackingEvent="whatsapp_click">
                {copy.hero.whatsapp}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
