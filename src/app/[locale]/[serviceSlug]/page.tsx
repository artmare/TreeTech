import {ArrowLeft, CheckCircle2, ChevronDown, Phone, Target, UsersRound, Wrench} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {getServicePageBySlug, servicePageContent, servicePages} from '@/content/service-pages';
import {faqItems, phoneHref} from '@/content/site';
import {Link} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';
import {softHyphens} from '@/lib/utils';

type PageProps = {
  params: Promise<{locale: string; serviceSlug: string}>;
};

const serviceDetailLabels = {
  de: {
    viewExamples: 'Beispielprojekte ansehen',
    allPrices: 'Alle Pakete und Preise',
    faqTitle: 'Häufige Fragen',
    faqLead: 'Antworten auf typische Fragen zu Kosten, Ablauf, bestehenden Tools und Support.'
  },
  en: {
    viewExamples: 'View example projects',
    allPrices: 'All packages and prices',
    faqTitle: 'Frequently asked questions',
    faqLead: 'Answers to common questions about cost, process, existing tools, and support.'
  },
  ru: {
    viewExamples: 'Посмотреть примеры проектов',
    allPrices: 'Все пакеты и цены',
    faqTitle: 'Частые вопросы',
    faqLead: 'Ответы на типичные вопросы о стоимости, процессе, существующих инструментах и поддержке.'
  }
} satisfies Record<Locale, {viewExamples: string; allPrices: string; faqTitle: string; faqLead: string}>;

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
  const labels = serviceDetailLabels[locale];
  const cards = [
    {label: content.forWhom, text: page.audience[locale], icon: UsersRound},
    {label: content.problem, text: page.problem[locale], icon: Target},
    {label: content.solution, text: page.solution[locale], icon: Wrench},
    {label: content.result, text: page.result[locale], icon: CheckCircle2}
  ];

  const faq = page.faq?.[locale] ?? faqItems.slice(0, 6).map((item) => ({q: item.question[locale], a: item.answer[locale]}));
  const primary = Boolean(page.primary);
  const ctaHref = primary ? '/contact#audit-call' : '/contact';
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({'@type': 'Question', name: item.q, acceptedAnswer: {'@type': 'Answer', text: item.a}}))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd)}} />
      <section className="border-b-2 border-foreground py-10 sm:py-14">
        <Container>
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center gap-2 text-[15px] font-bold text-muted transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{content.back}</span>
          </Link>
          <h1 className="mt-4 max-w-5xl text-balance text-[42px] leading-[1.02] text-foreground sm:text-6xl">
            {softHyphens(page.title[locale])}
          </h1>
          <p className="mt-4 max-w-[38em] text-pretty text-lg leading-relaxed text-muted">{page.description[locale]}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={ctaHref} variant="accent" trackingEvent="cta_preview_service">
              {primary ? content.cta : content.assessmentCta}
            </ButtonLink>
            {primary ? (
              <ButtonLink href={phoneHref} variant="secondary" icon={Phone} trackingEvent="phone_click">
                {content.call}
              </ButtonLink>
            ) : (
              <ButtonLink href="/portfolio" variant="secondary">
                {labels.viewExamples}
              </ButtonLink>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-12 sm:py-16">
        <Container>
          <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {cards.map((card) => (
              <article key={card.label} className="border-t-2 border-foreground pt-5">
                <card.icon className="h-6 w-6 text-accent" aria-hidden="true" />
                <h2 className="mt-3 text-2xl text-foreground">{card.label}</h2>
                <p className="mt-2 text-[17px] leading-relaxed text-muted">{card.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div>
              <p className="text-base font-bold text-accent">{content.example}</p>
              <p className="mt-2 text-pretty text-2xl font-bold leading-snug text-foreground sm:text-[28px]">{page.example[locale]}</p>
            </div>
            <div className="grid gap-4">
              <article className="rounded-[14px] border-2 border-foreground bg-surface p-6">
                <h2 className="text-lg text-foreground">{content.price}</h2>
                <p className="mt-2 text-xl font-bold leading-snug text-accent">{page.price[locale]}</p>
                <Link href="/services" className="mt-3 inline-flex min-h-11 items-center text-[15px] font-bold text-accent hover:underline">
                  {labels.allPrices}
                </Link>
              </article>
              <article className="rounded-[14px] border-2 border-foreground bg-surface p-6">
                <h2 className="text-lg text-foreground">{content.deliverables}</h2>
                <ul className="mt-3 grid gap-2.5">
                  {page.deliverables[locale].map((item) => (
                    <li key={item} className="grid grid-cols-[22px_1fr] gap-2 text-[16px] leading-snug text-foreground">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t-2 border-foreground bg-surface py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <h2 className="text-balance text-[30px] leading-[1.08] text-foreground sm:text-[44px]">{labels.faqTitle}</h2>
            <div className="border-t border-border">
              {faq.map((item, index) => (
                <details key={item.q} className="group border-b border-border" open={index === 0}>
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-bold text-foreground [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ChevronDown className="h-5 w-5 shrink-0 transition group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="pb-5 text-[16px] leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-accent py-14 text-white">
        <Container>
          <h2 className="max-w-3xl text-balance text-[30px] leading-[1.08] sm:text-[44px]">
            {primary ? content.ctaTitle : content.assessmentTitle}
          </h2>
          <p className="mt-3 max-w-[38em] text-[17px] text-white/85">{primary ? content.ctaLead : content.assessmentLead}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={ctaHref} variant="signal" trackingEvent="cta_preview_service_final">
              {primary ? content.cta : content.assessmentCta}
            </ButtonLink>
            <ButtonLink href={phoneHref} variant="onDark" icon={Phone} trackingEvent="phone_click">
              {content.call}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
