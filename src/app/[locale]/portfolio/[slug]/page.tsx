import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {ArrowLeft, CheckCircle2} from 'lucide-react';
import {notFound} from 'next/navigation';

import {FadeIn} from '@/components/motion/fade-in';
import {ProjectPreview} from '@/components/project-preview';
import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {Link} from '@/i18n/navigation';
import {
  getProjectBySlug,
  portfolioProjects,
  siteContent
} from '@/content/site';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    portfolioProjects.map((project) => ({locale, slug: project.slug}))
  );
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale: rawLocale, slug} = await params;
  const locale = rawLocale as Locale;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return createPageMetadata({
    locale,
    path: `/portfolio/${project.slug}`,
    title: `${project.name} | TreeTech Portfolio`,
    description: project.description[locale]
  });
}

export default async function PortfolioDetailPage({params}: PageProps) {
  const {locale: rawLocale, slug} = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const content = siteContent[locale];
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="py-10 sm:py-14">
        <Container>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{content.common.backToPortfolio}</span>
          </Link>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <FadeIn>
              <p className="text-sm font-semibold uppercase text-primary">
                {project.industry[locale]}
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
                {project.name}
              </h1>
              <p className="mt-6 text-pretty text-lg leading-8 text-muted">
                {project.description[locale]}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                <div>
                  <p className="text-sm text-muted">{content.portfolio.location}</p>
                  <p className="mt-1 font-semibold text-foreground">{project.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">{content.portfolio.year}</p>
                  <p className="mt-1 font-semibold text-foreground">{project.year}</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <ProjectPreview project={project} size="large" />
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            <FadeIn>
              <article className="h-full rounded-[8px] border border-border bg-background p-6">
                <p className="text-sm font-semibold uppercase text-primary">
                  {content.portfolio.problem}
                </p>
                <p className="mt-4 text-base leading-8 text-muted">{project.problem[locale]}</p>
              </article>
            </FadeIn>
            <FadeIn delay={0.08}>
              <article className="h-full rounded-[8px] border border-border bg-background p-6">
                <p className="text-sm font-semibold uppercase text-primary">
                  {content.portfolio.solution}
                </p>
                <p className="mt-4 text-base leading-8 text-muted">{project.solution[locale]}</p>
              </article>
            </FadeIn>
            <FadeIn delay={0.16}>
              <article className="h-full rounded-[8px] border border-border bg-background p-6">
                <p className="text-sm font-semibold uppercase text-primary">
                  {content.portfolio.result}
                </p>
                <p className="mt-4 text-base leading-8 text-muted">{project.metric[locale]}</p>
              </article>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <FadeIn>
              <h2 className="text-3xl font-semibold text-foreground">
                {content.portfolio.visualStyle}
              </h2>
              <p className="mt-5 text-base leading-8 text-muted">
                {project.visualStyle[locale]}
              </p>
            </FadeIn>
            <div>
              <h2 className="mb-4 text-3xl font-semibold text-foreground">
                {content.portfolio.features}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.features[locale].map((feature, index) => (
                  <FadeIn key={feature} delay={index * 0.06}>
                    <div className="flex h-full gap-3 rounded-[8px] border border-border bg-white p-4 shadow-sm">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                      <p className="text-sm leading-6 text-muted">{feature}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <FadeIn className="rounded-[8px] bg-[#111815] p-6 text-white sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase text-white/60">
                  {content.portfolio.ctaTitle}
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold">
                  {project.cta[locale]}
                </h2>
              </div>
              <ButtonLink href="/contact">{content.common.primaryCta}</ButtonLink>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
