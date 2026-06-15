'use client';

import type {CSSProperties} from 'react';

import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Globe2,
  MapPin,
  Quote,
  Sparkles,
  Star
} from 'lucide-react';
import {motion} from 'framer-motion';

import type {DemoSite} from '@/content/demo-sites';
import {demoSiteLabels} from '@/content/demo-sites';
import type {Locale} from '@/i18n/routing';
import {Link} from '@/i18n/navigation';

type DemoSitePageProps = {
  site: DemoSite;
  locale: Locale;
};

type DemoStyle = CSSProperties & {
  '--demo-background': string;
  '--demo-surface': string;
  '--demo-text': string;
  '--demo-muted': string;
  '--demo-primary': string;
  '--demo-accent': string;
  '--demo-border': string;
};

const reveal = {
  hidden: {opacity: 0, y: 24},
  visible: {opacity: 1, y: 0}
};

export function DemoSitePage({site, locale}: DemoSitePageProps) {
  const copy = site.copy[locale];
  const labels = demoSiteLabels[locale];
  const nextLocale = locale === 'de' ? 'en' : 'de';
  const navTargets = ['services', 'about', 'process', 'contact'];
  const style = {
    '--demo-background': site.theme.background,
    '--demo-surface': site.theme.surface,
    '--demo-text': site.theme.text,
    '--demo-muted': site.theme.muted,
    '--demo-primary': site.theme.primary,
    '--demo-accent': site.theme.accent,
    '--demo-border': `${site.theme.text}22`,
    color: site.theme.text,
    background: site.theme.background
  } satisfies DemoStyle;

  return (
    <div style={style} className="min-h-screen bg-[var(--demo-background)] text-[var(--demo-text)]">
      <header className="sticky top-0 z-50 border-b border-[var(--demo-border)] bg-[var(--demo-background)]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
          <a href="#" className="flex min-w-0 items-center gap-3" aria-label={site.brand}>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-[var(--demo-primary)] text-sm font-bold text-white shadow-[0_14px_36px_rgba(0,0,0,0.2)]">
              {site.brand.slice(0, 2)}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-lg font-semibold text-[var(--demo-text)]">
                {site.brand}
              </span>
              <span className="block truncate text-xs font-semibold uppercase tracking-[0.12em] text-[var(--demo-muted)]">
                {site.industry[locale]} - {site.location}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label={`${site.brand} navigation`}>
            {copy.nav.map((item, index) => (
              <a
                key={item}
                href={`#${navTargets[index]}`}
                className="rounded-full px-3 py-2 text-sm font-semibold text-[var(--demo-muted)] transition hover:bg-[var(--demo-surface)] hover:text-[var(--demo-text)]"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={`/portfolio/${site.slug}/site`}
              locale={nextLocale}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--demo-border)] bg-[var(--demo-surface)] px-3 py-2 text-sm font-semibold text-[var(--demo-text)]"
              aria-label={locale === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}
            >
              <Globe2 className="h-4 w-4" aria-hidden="true" />
              <span>{locale === 'de' ? 'EN' : 'DE'}</span>
            </Link>
            <a
              href="#contact"
              className="hidden min-h-10 items-center justify-center rounded-[8px] bg-[var(--demo-primary)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 sm:inline-flex"
            >
              {copy.primaryCta}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden border-b border-[var(--demo-border)]">
          <div className="absolute inset-x-0 top-0 h-72 opacity-50" style={{background: site.theme.hero}} />
          <div className="absolute inset-0 saas-grid opacity-20" />
          <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8 lg:py-24">
            <motion.div
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{duration: 0.7, ease: [0.22, 1, 0.36, 1]}}
            >
              <p className="inline-flex rounded-full bg-[var(--demo-primary)] px-3 py-2 text-sm font-semibold text-white">
                {copy.eyebrow}
              </p>
              <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] text-[var(--demo-text)] sm:text-6xl lg:text-7xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[var(--demo-muted)] sm:text-xl">
                {copy.lead}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-[var(--demo-primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5"
                >
                  <span>{copy.primaryCta}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#services"
                  className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--demo-border)] bg-[var(--demo-surface)] px-5 py-3 text-sm font-semibold text-[var(--demo-text)] transition hover:-translate-y-0.5"
                >
                  {copy.secondaryCta}
                </a>
              </div>
            </motion.div>

            <motion.aside
              initial={{opacity: 0, scale: 0.96, y: 22}}
              animate={{opacity: 1, scale: 1, y: 0}}
              transition={{duration: 0.76, ease: [0.22, 1, 0.36, 1], delay: 0.1}}
              className="relative"
              aria-label={`${site.brand} highlights`}
            >
              <div className="relative overflow-hidden rounded-[8px] border border-[var(--demo-border)] bg-[var(--demo-surface)] shadow-[0_34px_100px_rgba(0,0,0,0.18)]">
                <div className="absolute inset-x-0 top-0 h-56" style={{background: site.theme.hero}} />
                <div className="relative grid gap-8 p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--demo-muted)]">
                        {site.location}
                      </p>
                      <p className="mt-3 max-w-md text-3xl font-semibold leading-tight text-[var(--demo-text)]">
                        {copy.introTitle}
                      </p>
                    </div>
                    <span className="rounded-full bg-[var(--demo-accent)] px-3 py-2 text-sm font-bold text-[var(--demo-text)]">
                      {locale.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {copy.stats.map((stat, index) => (
                      <motion.div
                        key={`${stat.value}-${stat.label}`}
                        initial={{opacity: 0, y: 16}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.22 + index * 0.08}}
                        className="rounded-[8px] border border-[var(--demo-border)] bg-[var(--demo-background)] p-4"
                      >
                        <p className="text-4xl font-semibold text-[var(--demo-primary)]">
                          {stat.value}
                        </p>
                        <p className="mt-2 text-sm leading-5 text-[var(--demo-muted)]">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="rounded-[8px] border border-[var(--demo-border)] bg-[var(--demo-background)] p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--demo-primary)]">
                      <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                      <span>{copy.primaryCta}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[var(--demo-muted)]">
                      {copy.contactText}
                    </p>
                    <div className="mt-5 flex gap-2">
                      {[1, 2, 3].map((item) => (
                        <span key={item} className="h-2 flex-1 rounded-full bg-[var(--demo-primary)] opacity-80" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        <section id="about" className="py-16 sm:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.3}} transition={{duration: 0.62}}>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--demo-primary)]">
                {copy.eyebrow}
              </p>
              <h2 className="mt-3 text-balance text-3xl font-semibold text-[var(--demo-text)] sm:text-5xl">
                {copy.introTitle}
              </h2>
            </motion.div>
            <motion.p
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{once: true, amount: 0.3}}
              transition={{duration: 0.62, delay: 0.08}}
              className="text-pretty text-base leading-8 text-[var(--demo-muted)] sm:text-xl sm:leading-9"
            >
              {copy.introText}
            </motion.p>
          </div>
        </section>

        <section id="services" className="border-y border-[var(--demo-border)] bg-[var(--demo-surface)] py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold text-[var(--demo-text)] sm:text-5xl">
                {copy.servicesTitle}
              </h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {copy.services.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial={{opacity: 0, y: 22}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, amount: 0.25}}
                  transition={{duration: 0.58, delay: index * 0.08}}
                  whileHover={{y: -6}}
                  className="h-full rounded-[8px] border border-[var(--demo-border)] bg-[var(--demo-background)] p-6 shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5 text-[var(--demo-primary)]" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold text-[var(--demo-text)]">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--demo-muted)]">{service.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="py-16 sm:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.25}} transition={{duration: 0.62}}>
              <h2 className="text-3xl font-semibold text-[var(--demo-text)] sm:text-5xl">
                {copy.processTitle}
              </h2>
              <blockquote className="mt-8 rounded-[8px] border border-[var(--demo-border)] bg-[var(--demo-surface)] p-6 shadow-sm">
                <Quote className="h-6 w-6 text-[var(--demo-primary)]" aria-hidden="true" />
                <p className="mt-5 text-lg leading-8 text-[var(--demo-text)]">&quot;{copy.testimonial}&quot;</p>
                <footer className="mt-4 text-sm font-semibold text-[var(--demo-primary)]">
                  {copy.testimonialAuthor}
                </footer>
              </blockquote>
            </motion.div>
            <div className="grid gap-3">
              {copy.process.map((step, index) => (
                <motion.article
                  key={step.title}
                  initial={{opacity: 0, x: 24}}
                  whileInView={{opacity: 1, x: 0}}
                  viewport={{once: true, amount: 0.25}}
                  transition={{duration: 0.58, delay: index * 0.08}}
                  className="grid gap-4 rounded-[8px] border border-[var(--demo-border)] bg-[var(--demo-surface)] p-5 shadow-sm sm:grid-cols-[3rem_1fr]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[var(--demo-primary)] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--demo-text)]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--demo-muted)]">{step.text}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-[var(--demo-border)] py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
            <motion.div
              initial={{opacity: 0, y: 24}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.25}}
              transition={{duration: 0.62}}
              className="relative overflow-hidden rounded-[8px] bg-[var(--demo-primary)] p-6 text-white shadow-xl sm:p-8 lg:p-10"
            >
              <div className="absolute inset-0 opacity-20" style={{background: site.theme.hero}} />
              <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-2 text-sm font-semibold text-white">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span>{site.location}</span>
                  </div>
                  <div className="mb-5 flex gap-1 text-[var(--demo-accent)]">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Star key={item} className="h-4 w-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <h2 className="text-balance text-3xl font-semibold sm:text-5xl">{copy.contactTitle}</h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-white/78">
                    {copy.contactText}
                  </p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-white px-5 py-3 text-sm font-semibold text-[var(--demo-primary)] transition hover:-translate-y-0.5"
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  <span>{copy.contactButton}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--demo-border)] bg-[var(--demo-surface)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-8 text-sm text-[var(--demo-muted)] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-base font-semibold text-[var(--demo-text)]">{site.brand}</p>
            <p className="mt-1">
              {site.industry[locale]} - {site.location}
            </p>
          </div>
          <Link
            href={`/portfolio/${site.slug}`}
            className="inline-flex items-center gap-2 font-semibold text-[var(--demo-primary)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{labels.backToCase}</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
