import {ArrowLeft, CheckCircle2, ExternalLink, Target, TrendingUp, Wrench} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {FadeIn} from '@/components/motion/fade-in';
import {ProjectPreview} from '@/components/project-preview';
import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {demoSiteLabels} from '@/content/demo-sites';
import {getProjectBySlug, portfolioProjects, siteContent} from '@/content/site';
import {Link} from '@/i18n/navigation';
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
  const project = getProjectBySlug(slug);

  if (!hasLocale(routing.locales, rawLocale) || !project) {
    return {};
  }

  const locale = rawLocale;

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
  const demoLabels = demoSiteLabels[locale];
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const storyCards = [
    {label: content.portfolio.problem, text: project.problem[locale], icon: Target},
    {label: content.portfolio.solution, text: project.solution[locale], icon: Wrench},
    {label: content.portfolio.result, text: project.metric[locale], icon: TrendingUp}
  ];

  return (
    <>
      <section className="dark-band relative overflow-hidden py-10 text-white sm:py-14">
        <div className="dark-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{content.common.backToPortfolio}</span>
          </Link>
        </Container>
      </section>

      <section className="dark-band relative overflow-hidden pb-16 text-white">
        <div className="dark-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <FadeIn>
              <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-accent">
                {project.industry[locale]}
              </p>
              <h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.03] text-white sm:text-7xl">
                {project.name}
              </h1>
              <p className="mt-6 text-pretty text-lg leading-8 text-white/72 sm:text-xl">
                {project.description[locale]}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={`/portfolio/${project.slug}/site`} variant="accent">
                  {demoLabels.viewDemo}
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary" className="!border-white/20 !bg-white/10 !text-white hover:!bg-accent hover:!text-[#070806]">
                  {content.common.primaryCta}
                </ButtonLink>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/12 pt-6">
                <div>
                  <p className="text-sm text-white/55">{content.portfolio.location}</p>
                  <p className="mt-1 font-semibold text-white">{project.location}</p>
                </div>
                <div>
                  <p className="text-sm text-white/55">{content.portfolio.year}</p>
                  <p className="mt-1 font-semibold text-white">{project.year}</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <ProjectPreview project={project} locale={locale} size="large" />
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {storyCards.map((card, index) => (
              <FadeIn key={card.label} delay={index * 0.08}>
                <article className="terminal-card h-full rounded-[1.25rem] p-6">
                  <card.icon className="h-6 w-6 text-accent" aria-hidden="true" />
                  <p className="mt-5 font-mono text-sm uppercase tracking-[0.14em] text-accent">
                    {card.label}
                  </p>
                  <p className="mt-4 text-base leading-8 text-muted">{card.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="warm-band py-16">
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
                    <div className="terminal-card flex h-full gap-3 rounded-[1rem] p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                      <p className="text-sm leading-6 text-muted">{feature}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <FadeIn className="dark-band relative overflow-hidden rounded-[1.5rem] p-6 text-white shadow-[0_24px_80px_rgba(16,21,18,0.2)] sm:p-8 lg:p-10">
            <div className="dark-grid absolute inset-0 opacity-30" />
            <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent">
                  {content.portfolio.ctaTitle}
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold">
                  {project.cta[locale]}
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={`/portfolio/${project.slug}/site`} variant="accent">
                  {demoLabels.viewDemo}
                </ButtonLink>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent hover:text-[#070806]"
                >
                  <span>{content.common.primaryCta}</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
