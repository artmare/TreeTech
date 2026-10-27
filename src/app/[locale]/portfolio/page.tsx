import {CheckCircle2} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';

import {FadeIn} from '@/components/motion/fade-in';
import {PortfolioCard} from '@/components/portfolio-card';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {portfolioProjects, siteContent} from '@/content/site';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string}>;
};

const portfolioBrief = {
  de: {
    title: 'Gut zu wissen',
    items: [
      'Das sind Beispiel-Websites, die wir als Muster gebaut haben. Die Betriebe sind erfunden.',
      'Jede Seite funktioniert wie eine echte: Knöpfe, Formulare und Handy-Ansicht.',
      'Ihre eigene Vorschau bauen wir kostenlos, mit Ihrem Namen, Ihren Leistungen und Ihrem Ort.'
    ]
  },
  en: {
    title: 'Good to know',
    items: [
      'These are example websites we built as samples. The businesses are made up.',
      'Every site works like a real one: buttons, forms and mobile view.',
      'We build your own preview for free, with your name, your services and your town.'
    ]
  },
  ru: {
    title: 'Полезно знать',
    items: [
      'Это примеры сайтов, которые мы сделали как образцы. Фирмы вымышленные.',
      'Каждый сайт работает как настоящий: кнопки, формы и мобильная версия.',
      'Ваше собственное превью мы делаем бесплатно, с вашим названием, услугами и городом.'
    ]
  }
} satisfies Record<Locale, {title: string; items: string[]}>;

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const rawLocale = (await params).locale;

  if (!hasLocale(routing.locales, rawLocale)) {
    return {};
  }

  const locale = rawLocale;
  const content = siteContent[locale];

  return createPageMetadata({
    locale,
    path: '/portfolio',
    title: content.metadata.portfolioTitle,
    description: content.metadata.portfolioDescription
  });
}

export default async function PortfolioPage({params}: PageProps) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const content = siteContent[locale];

  return (
    <>
      <section className="dark-band relative overflow-hidden py-20 text-foreground sm:py-24">
        <div className="dark-grid absolute inset-0 opacity-35" />
        <Container className="relative">
          <SectionHeading
            title={content.portfolio.title}
            lead={content.portfolio.lead}
            className="[&_h2]:text-foreground [&_p]:text-muted [&_p:first-child]:border-border [&_p:first-child]:bg-surface [&_p:first-child]:text-accent"
          />
          <FadeIn delay={0.1}>
            <div className="mt-10 max-w-3xl rounded-[1.25rem] border border-border bg-surface p-5 backdrop-blur sm:p-6">
              <p className="text-base font-semibold text-foreground">{portfolioBrief[locale].title}</p>
              <ul className="mt-4 grid gap-3">
                {portfolioBrief[locale].items.map((item) => (
                  <li key={item} className="flex gap-3 border-t border-border pt-3 text-sm leading-6 text-muted first:border-t-0 first:pt-0">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {portfolioProjects.map((project, index) => (
              <FadeIn key={project.slug} delay={index * 0.06}>
                <PortfolioCard
                  project={project}
                  locale={locale}
                  cta={content.common.viewProject}
                />
              </FadeIn>
            ))}
          </div>
          <p className="mt-8 max-w-3xl rounded-[1rem] border border-border bg-surface px-4 py-3 text-sm leading-7 text-muted">
            {content.portfolio.disclaimer}
          </p>
        </Container>
      </section>
    </>
  );
}
