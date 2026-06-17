import {CheckCircle2} from 'lucide-react';
import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';

import {FadeIn} from '@/components/motion/fade-in';
import {PortfolioCard} from '@/components/portfolio-card';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {portfolioProjects, siteContent} from '@/content/site';
import type {Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string}>;
};

const portfolioBrief = {
  de: {
    title: 'Was Sie in den Projekten sehen',
    items: [
      'Welche Ausgangslage ein Betrieb hatte und wie die Website darauf antwortet.',
      'Wie Struktur, Texte und Handlungsaufforderungen Besucher zur Anfrage führen.',
      'Wie die fertige Demo-Seite für eine ähnliche Branche wirken könnte.'
    ]
  },
  en: {
    title: 'What to look for in each project',
    items: [
      'The business situation behind the project and how the website responds to it.',
      'How structure, copy, and calls to action guide visitors toward inquiry.',
      'How the finished demo page could feel for a similar industry.'
    ]
  }
} satisfies Record<Locale, {title: string; items: string[]}>;

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const locale = (await params).locale as Locale;
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
      <section className="dark-band relative overflow-hidden py-20 text-white sm:py-24">
        <div className="dark-grid absolute inset-0 opacity-35" />
        <Container className="relative">
          <SectionHeading
            eyebrow={content.common.eyebrow}
            title={content.portfolio.title}
            lead={content.portfolio.lead}
            className="[&_h2]:text-white [&_p]:text-white/72 [&_p:first-child]:border-white/15 [&_p:first-child]:bg-white/10 [&_p:first-child]:text-accent"
          />
          <FadeIn delay={0.1}>
            <div className="mt-10 max-w-3xl rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur sm:p-6">
              <p className="text-base font-semibold text-white">{portfolioBrief[locale].title}</p>
              <ul className="mt-4 grid gap-3">
                {portfolioBrief[locale].items.map((item) => (
                  <li key={item} className="flex gap-3 border-t border-white/10 pt-3 text-sm leading-6 text-white/72 first:border-t-0 first:pt-0">
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
        </Container>
      </section>
    </>
  );
}
