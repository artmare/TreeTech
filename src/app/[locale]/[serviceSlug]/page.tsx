import {ArrowLeft, CheckCircle2, Euro, Lightbulb, Target, UsersRound, Wrench} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {FadeIn} from '@/components/motion/fade-in';
import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {getServicePageBySlug, servicePageContent, servicePages} from '@/content/service-pages';
import {faqItems} from '@/content/site';
import {Link} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string; serviceSlug: string}>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    servicePages.map((page) => ({locale, serviceSlug: page.slug}))
  );
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale: rawLocale, serviceSlug} = await params;
  const page = getServicePageBySlug(serviceSlug);

  if (!hasLocale(routing.locales, rawLocale) || !page) {
    return {};
  }

  const locale = rawLocale;

  return createPageMetadata({
    locale,
    path: `/${page.slug}`,
    title: `${page.title[locale]} | TreeTech`,
    description: page.description[locale]
  });
}

export default async function ServiceLandingPage({params}: PageProps) {
  const {locale: rawLocale, serviceSlug} = await params;

  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const page = getServicePageBySlug(serviceSlug);

  if (!page) {
    notFound();
  }

  setRequestLocale(locale);
  const content = servicePageContent[locale];
  const cards = [
    {label: content.forWhom, text: page.audience[locale], icon: UsersRound},
    {label: content.problem, text: page.problem[locale], icon: Target},
    {label: content.solution, text: page.solution[locale], icon: Wrench},
    {label: content.result, text: page.result[locale], icon: CheckCircle2}
  ];

  return (
    <>
      <section className="dark-band relative overflow-hidden py-10 text-white sm:py-14">
        <div className="dark-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{content.back}</span>
          </Link>
        </Container>
      </section>

      <section className="dark-band scanline relative overflow-hidden pb-16 text-white">
        <div className="dark-grid absolute inset-0 opacity-35" />
        <Container className="relative">
          <FadeIn className="max-w-5xl">
            <p className="inline-flex rounded-full border border-accent/20 bg-accent/[0.08] px-3 py-2 text-sm font-semibold text-accent">
              TreeTech Service
            </p>
            <h1 className="mt-6 break-words text-balance text-5xl font-semibold leading-[1.03] text-white sm:text-7xl">
              {page.title[locale]}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-white/72 sm:text-xl">
              {page.description[locale]}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="accent">
                {content.cta}
              </ButtonLink>
              <ButtonLink href="/portfolio" variant="secondary">
                {locale === 'de' ? 'Beispielprojekte ansehen' : 'View example projects'}
              </ButtonLink>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {cards.map((card, index) => (
              <FadeIn key={card.label} delay={index * 0.06}>
                <article className="terminal-card h-full rounded-[1.25rem] p-5">
                  <card.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h2 className="mt-4 text-xl font-semibold text-foreground">{card.label}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{card.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="warm-band py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeading
              eyebrow={content.example}
              title={page.example[locale]}
              lead={page.description[locale]}
            />
            <div className="grid gap-5">
              <article className="terminal-card rounded-[1.25rem] p-5">
                <Euro className="h-5 w-5 text-accent" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-semibold text-foreground">{content.price}</h2>
                <p className="mt-3 text-2xl font-semibold text-accent">{page.price[locale]}</p>
              </article>
              <article className="terminal-card rounded-[1.25rem] p-5">
                <Lightbulb className="h-5 w-5 text-accent" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-semibold text-foreground">{content.deliverables}</h2>
                <ul className="mt-4 grid gap-3">
                  {page.deliverables[locale].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="faq"
            title={locale === 'de' ? 'Häufige Fragen' : 'Frequently asked questions'}
            lead={locale === 'de'
              ? 'Antworten auf typische Fragen zu Kosten, Ablauf, bestehenden Tools und Support.'
              : 'Answers to common questions about cost, process, existing tools, and support.'}
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {faqItems.slice(0, 6).map((item, index) => (
              <FadeIn key={item.question[locale]} delay={index * 0.04}>
                <article className="terminal-card h-full rounded-[1.25rem] p-5">
                  <h2 className="text-lg font-semibold text-foreground">{item.question[locale]}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.answer[locale]}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="warm-band py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <SectionHeading title={content.ctaTitle} lead={content.ctaLead} />
            <ButtonLink href="/contact" variant="accent">
              {content.cta}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
