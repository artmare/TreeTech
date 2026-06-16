import {Building2, Globe2, MousePointerClick} from 'lucide-react';
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

const portfolioStats = {
  de: [
    {icon: Building2, value: '5', label: 'Branchen-Cases'},
    {icon: Globe2, value: 'DE/EN', label: 'zweisprachig'},
    {icon: MousePointerClick, value: 'CTA', label: 'anfrageorientiert'}
  ],
  en: [
    {icon: Building2, value: '5', label: 'industry cases'},
    {icon: Globe2, value: 'DE/EN', label: 'bilingual'},
    {icon: MousePointerClick, value: 'CTA', label: 'inquiry-focused'}
  ]
} satisfies Record<Locale, Array<{icon: typeof Building2; value: string; label: string}>>;

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
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {portfolioStats[locale].map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 0.08}>
                <article className="terminal-card rounded-[1.25rem] p-5 backdrop-blur">
                  <stat.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <p className="mt-4 text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                </article>
              </FadeIn>
            ))}
          </div>
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
