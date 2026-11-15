import {ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, Target, TrendingUp, Wrench} from 'lucide-react';
import Image from 'next/image';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {FadeIn} from '@/components/motion/fade-in';
import {ProjectPreview} from '@/components/project-preview';
import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {demoSiteLabels, getDemoSiteBySlug} from '@/content/demo-sites';
import {formatPackagePrice, getPackage} from '@/content/pricing';
import {getPortfolioCaseStudy, getProjectBySlug, portfolioProjects, siteContent} from '@/content/site';
import {Link} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

const packageLabel = {de: 'Paket', en: 'Package', ru: 'Пакет'} satisfies Record<Locale, string>;
const caseLabels = {
  de: {openLive: 'Live-Demo öffnen', liveSoon: 'Die Live-Demo zeigen wir Ihnen gern im Gespräch.', screens: 'So sieht es aus', stack: 'Technik', testNote: 'Testmodus: Bezahlen mit der Testkarte 4242 4242 4242 4242, es wird nichts abgebucht.'},
  en: {openLive: 'Open live demo', liveSoon: 'We are happy to show you the live demo in a call.', screens: 'What it looks like', stack: 'Technology', testNote: 'Test mode: pay with the test card 4242 4242 4242 4242, nothing is charged.'},
  ru: {openLive: 'Открыть живое демо', liveSoon: 'Живое демо с удовольствием покажем на созвоне.', screens: 'Как это выглядит', stack: 'Технологии', testNote: 'Тестовый режим: оплата тестовой картой 4242 4242 4242 4242, деньги не списываются.'}
} satisfies Record<Locale, Record<string, string>>;

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

  const caseStudy = getPortfolioCaseStudy(project);
  const labels = caseLabels[locale];
  const hasDemoSite = Boolean(getDemoSiteBySlug(project.slug));
  const demoButton = project.liveUrl ? (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener"
      className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[12px] bg-accent px-6 py-3.5 text-base font-bold text-white transition hover:bg-[var(--accent-strong)]"
    >
      <span>{labels.openLive}</span>
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  ) : hasDemoSite ? (
    <ButtonLink href={`/portfolio/${project.slug}/site`} variant="accent">
      {demoLabels.viewDemo}
    </ButtonLink>
  ) : null;
  const projectPackage = getPackage(project.packageId);
  const storyCards = [
    {label: content.portfolio.problem, text: caseStudy.problem[locale], icon: Target},
    {label: content.portfolio.solution, text: caseStudy.solution[locale], icon: Wrench},
    {label: content.portfolio.result, text: caseStudy.resultMetric[locale], icon: TrendingUp}
  ];

  return (
    <>
      <section className="dark-band relative overflow-hidden py-10 text-foreground sm:py-14">
        <div className="dark-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{content.common.backToPortfolio}</span>
          </Link>
        </Container>
      </section>

      <section className="dark-band relative overflow-hidden pb-16 text-foreground">
        <div className="dark-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <FadeIn>
              <p className="inline-flex rounded-full border border-border bg-surface px-3 py-2 text-sm font-semibold text-accent">
                {project.industry[locale]}
              </p>
              <h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.03] text-foreground sm:text-7xl">
                {project.name}
              </h1>
              <p className="mt-6 text-pretty text-lg leading-8 text-muted sm:text-xl">
                {project.description[locale]}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {demoButton}
                <ButtonLink href="/contact" variant="secondary">
                  {content.common.primaryCta}
                </ButtonLink>
              </div>
              {project.liveUrl ? (
                <p className="mt-4 text-sm leading-6 text-muted">{labels.testNote}</p>
              ) : !hasDemoSite ? (
                <p className="mt-4 text-sm leading-6 text-muted">{labels.liveSoon}</p>
              ) : null}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                <div>
                  <p className="text-sm text-muted">{content.portfolio.location}</p>
                  <p className="mt-1 font-semibold text-foreground">{project.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">{packageLabel[locale]}</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {projectPackage.name} · {formatPackagePrice(projectPackage, locale)}
                  </p>
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
                  <p className="mt-5 font-bold text-sm text-accent">
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

      {project.gallery?.length ? (
        <section className="py-16">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
              <h2 className="text-3xl font-semibold text-foreground">{labels.screens}</h2>
              {project.stack?.length ? (
                <p className="text-sm text-muted">
                  <span className="font-semibold text-foreground">{labels.stack}:</span> {project.stack.join(', ')}
                </p>
              ) : null}
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {project.gallery.map((shot, index) => {
                const portrait = shot.height > shot.width;
                return (
                  <FadeIn key={shot.src} delay={(index % 2) * 0.06} className={portrait ? 'md:row-span-2' : undefined}>
                    <figure className="grid gap-3">
                      <div className="overflow-hidden rounded-[1rem] border border-border bg-surface shadow-[0_18px_50px_rgba(16,21,18,0.12)]">
                        <Image
                          src={shot.src}
                          alt={shot.caption[locale]}
                          width={shot.width}
                          height={shot.height}
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className={portrait ? 'mx-auto h-auto w-full max-w-[360px]' : 'h-auto w-full'}
                        />
                      </div>
                      <figcaption className="text-sm text-muted">{shot.caption[locale]}</figcaption>
                    </figure>
                  </FadeIn>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-20">
        <Container>
          <FadeIn className="dark-band relative overflow-hidden rounded-[1.5rem] p-6 text-foreground shadow-[0_24px_80px_rgba(16,21,18,0.2)] sm:p-8 lg:p-10">
            <div className="dark-grid absolute inset-0 opacity-30" />
            <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-bold text-accent">
                  {content.portfolio.ctaTitle}
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold">
                  {project.cta[locale]}
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                {demoButton}
                <Link
                  href="/contact"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[12px] border-2 border-foreground bg-surface px-6 py-3.5 text-base font-bold text-foreground transition-colors hover:bg-background"
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
