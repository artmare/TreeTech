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
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={content.common.eyebrow}
            title={content.portfolio.title}
            lead={content.portfolio.lead}
          />
        </Container>
      </section>

      <section className="pb-20">
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
