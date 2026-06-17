'use client';

import type {CSSProperties, ReactNode} from 'react';

import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Building2,
  CalendarCheck,
  ChevronRight,
  Dumbbell,
  Globe2,
  Home,
  Quote,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope
} from 'lucide-react';
import {motion} from 'framer-motion';

import type {DemoSite, DemoSiteCopy} from '@/content/demo-sites';
import {demoSiteLabels} from '@/content/demo-sites';
import type {Locale} from '@/i18n/routing';
import {Link} from '@/i18n/navigation';
import {cn} from '@/lib/utils';

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

type DemoRendererProps = {
  site: DemoSite;
  locale: Locale;
  copy: DemoSiteCopy;
};

const reveal = {
  hidden: {opacity: 0, y: 24},
  visible: {opacity: 1, y: 0}
};

const navTargets = ['services', 'about', 'process', 'contact'];

export function DemoSitePage({site, locale}: DemoSitePageProps) {
  const copy = site.copy[locale];
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
      <DemoHeader site={site} locale={locale} copy={copy} />
      <main>{renderDemo(site.slug, {site, locale, copy})}</main>
      <DemoFooter site={site} locale={locale} />
    </div>
  );
}

function renderDemo(slug: string, props: DemoRendererProps) {
  switch (slug) {
    case 'alpendent':
      return <DentalDemo {...props} />;
    case 'vienna-legal':
      return <LegalDemo {...props} />;
    case 'bergblick-hotel':
      return <HotelDemo {...props} />;
    case 'greenhaus-immobilien':
      return <RealEstateDemo {...props} />;
    case 'kraftwerk-fitness':
      return <FitnessDemo {...props} />;
    default:
      return <DentalDemo {...props} />;
  }
}

function DemoHeader({site, locale, copy}: DemoRendererProps) {
  const nextLocale = locale === 'de' ? 'en' : 'de';
  const isDark = site.slug === 'vienna-legal' || site.slug === 'kraftwerk-fitness';

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-[var(--demo-border)] backdrop-blur-xl',
        isDark ? 'bg-[var(--demo-background)]/90' : 'bg-[var(--demo-surface)]/88'
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <a href="#" className="flex min-w-0 items-center gap-3" aria-label={site.brand}>
          <LogoBadge site={site} />
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
            className="hidden min-h-10 items-center justify-center rounded-full bg-[var(--demo-primary)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 sm:inline-flex"
          >
            {copy.primaryCta}
          </a>
        </div>
      </div>
    </header>
  );
}

function LogoBadge({site}: {site: DemoSite}) {
  const iconClass = 'h-5 w-5';

  if (site.slug === 'alpendent') {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--demo-primary)] text-white shadow-[0_14px_34px_rgba(0,0,0,0.16)]">
        <Stethoscope className={iconClass} aria-hidden="true" />
      </span>
    );
  }

  if (site.slug === 'vienna-legal') {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[var(--demo-primary)] text-[var(--demo-accent)] shadow-[0_14px_34px_rgba(0,0,0,0.22)]">
        <Scale className={iconClass} aria-hidden="true" />
      </span>
    );
  }

  if (site.slug === 'bergblick-hotel') {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--demo-primary)] font-serif text-lg font-semibold text-white shadow-[0_14px_34px_rgba(0,0,0,0.18)]">
        B
      </span>
    );
  }

  if (site.slug === 'greenhaus-immobilien') {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.9rem] bg-[var(--demo-primary)] text-white shadow-[0_14px_34px_rgba(0,0,0,0.16)]">
        <Home className={iconClass} aria-hidden="true" />
      </span>
    );
  }

  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.55rem] bg-[var(--demo-primary)] text-sm font-black uppercase text-white shadow-[0_14px_34px_rgba(0,0,0,0.28)]">
      KW
    </span>
  );
}

function DemoFooter({site, locale}: {site: DemoSite; locale: Locale}) {
  const labels = demoSiteLabels[locale];

  return (
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
  );
}

function SectionIntro({
  eyebrow,
  title,
  lead,
  align = 'left'
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--demo-primary)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight text-[var(--demo-text)] sm:text-5xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-5 text-pretty text-base leading-8 text-[var(--demo-muted)] sm:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

function PrimaryLink({href, children, className}: {href: string; children: ReactNode; className?: string}) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--demo-primary)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5',
        className
      )}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function SecondaryLink({href, children, className}: {href: string; children: ReactNode; className?: string}) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--demo-border)] bg-[var(--demo-surface)] px-5 py-3 text-sm font-semibold text-[var(--demo-text)] transition hover:-translate-y-0.5',
        className
      )}
    >
      {children}
    </a>
  );
}

function DentalDemo({site, copy}: DemoRendererProps) {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_8%,rgba(155,231,221,0.36),transparent_26rem)]" />
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:py-20">
          <motion.div variants={reveal} initial="hidden" animate="visible" transition={{duration: 0.7}}>
            <p className="inline-flex rounded-full bg-[var(--demo-primary)] px-3 py-2 text-sm font-semibold text-white">
              {copy.eyebrow}
            </p>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] text-[var(--demo-text)] sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[var(--demo-muted)]">
              {copy.lead}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="#contact">{copy.primaryCta}</PrimaryLink>
              <SecondaryLink href="#services">{copy.secondaryCta}</SecondaryLink>
            </div>
          </motion.div>

          <motion.aside
            initial={{opacity: 0, scale: 0.96, y: 24}}
            animate={{opacity: 1, scale: 1, y: 0}}
            transition={{duration: 0.72, delay: 0.1}}
            className="rounded-[2rem] border border-[var(--demo-border)] bg-[var(--demo-surface)] p-5 shadow-[0_28px_90px_rgba(13,118,111,0.16)]"
          >
            <div className="grid gap-5 sm:grid-cols-[1fr_0.82fr]">
              <div className="min-h-80 rounded-[1.5rem] p-6 text-white" style={{background: site.theme.hero}}>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  <span>{copy.introTitle}</span>
                </div>
                <div className="mt-20 rounded-[1.25rem] bg-white/84 p-5 text-[var(--demo-text)] backdrop-blur">
                  <p className="text-sm font-semibold text-[var(--demo-primary)]">{copy.primaryCta}</p>
                  <p className="mt-3 text-3xl font-semibold">08:30</p>
                  <p className="mt-1 text-sm text-[var(--demo-muted)]">{copy.stats[0].label}</p>
                </div>
              </div>
              <div className="grid content-between gap-4">
                {copy.stats.map((stat) => (
                  <div key={stat.label} className="border-b border-[var(--demo-border)] pb-4 last:border-b-0">
                    <p className="text-3xl font-semibold text-[var(--demo-primary)]">{stat.value}</p>
                    <p className="mt-1 text-sm leading-5 text-[var(--demo-muted)]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="about" className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <SectionIntro eyebrow={copy.eyebrow} title={copy.introTitle} />
          <p className="text-pretty text-lg leading-9 text-[var(--demo-muted)]">{copy.introText}</p>
        </div>
      </section>

      <section id="services" className="border-y border-[var(--demo-border)] bg-[var(--demo-surface)] py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionIntro title={copy.servicesTitle} />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {copy.services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{opacity: 0, y: 22}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.25}}
                transition={{duration: 0.55, delay: index * 0.08}}
                className="rounded-[1.4rem] border border-[var(--demo-border)] bg-[var(--demo-background)] p-6"
              >
                <Stethoscope className="h-5 w-5 text-[var(--demo-primary)]" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold text-[var(--demo-text)]">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--demo-muted)]">{service.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <ProcessAndCta copy={copy} icon={<CalendarCheck className="h-5 w-5" aria-hidden="true" />} />
    </>
  );
}

function LegalDemo({copy}: DemoRendererProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#111827] text-white">
        <div className="absolute inset-0 opacity-30" style={{background: 'radial-gradient(circle at 76% 12%, var(--demo-accent), transparent 24rem)'}} />
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:px-8 lg:py-24">
          <motion.div variants={reveal} initial="hidden" animate="visible" transition={{duration: 0.72}}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--demo-accent)]">
              {copy.eyebrow}
            </p>
            <h1 className="mt-8 max-w-5xl font-serif text-5xl font-semibold leading-[1.02] text-white sm:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">{copy.lead}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="#contact" className="rounded-none bg-[var(--demo-accent)] text-[#111827]">
                {copy.primaryCta}
              </PrimaryLink>
              <SecondaryLink href="#services" className="rounded-none border-white/20 bg-white/5 text-white">
                {copy.secondaryCta}
              </SecondaryLink>
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 26}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.72, delay: 0.1}}
            className="border border-white/15 bg-white/[0.055] p-6"
          >
            <Scale className="h-8 w-8 text-[var(--demo-accent)]" aria-hidden="true" />
            <p className="mt-8 font-serif text-3xl leading-tight text-white">{copy.introTitle}</p>
            <div className="mt-8 grid gap-4">
              {copy.stats.map((stat) => (
                <div key={stat.label} className="flex items-baseline justify-between gap-4 border-t border-white/12 pt-4">
                  <p className="text-sm text-white/60">{stat.label}</p>
                  <p className="font-serif text-3xl text-[var(--demo-accent)]">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="bg-[#f6f4ef] py-16 text-[#15171f] sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <SectionIntro eyebrow={copy.eyebrow} title={copy.introTitle} />
          <p className="text-pretty text-lg leading-9 text-[var(--demo-muted)]">{copy.introText}</p>
        </div>
      </section>

      <section id="services" className="bg-white py-16 text-[#15171f] sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-semibold text-[#15171f] sm:text-6xl">{copy.servicesTitle}</h2>
          <div className="mt-10 divide-y divide-[#15171f]/12 border-y border-[#15171f]/12">
            {copy.services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{opacity: 0, x: -18}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true, amount: 0.25}}
                transition={{duration: 0.52, delay: index * 0.08}}
                className="grid gap-4 py-7 md:grid-cols-[10rem_1fr_auto] md:items-center"
              >
                <p className="font-serif text-3xl text-[var(--demo-accent)]">0{index + 1}</p>
                <div>
                  <h3 className="text-xl font-semibold text-[#15171f]">{service.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--demo-muted)]">{service.text}</p>
                </div>
                <ChevronRight className="hidden h-5 w-5 text-[var(--demo-accent)] md:block" aria-hidden="true" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <ProcessAndCta copy={copy} icon={<Scale className="h-5 w-5" aria-hidden="true" />} square />
    </>
  );
}

function HotelDemo({site, copy}: DemoRendererProps) {
  return (
    <>
      <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden text-white">
        <div className="absolute inset-0" style={{background: site.theme.hero}} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,32,24,0.82),rgba(18,32,24,0.35),rgba(18,32,24,0.1))]" />
        <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-7xl flex-col justify-end px-5 py-12 sm:px-6 lg:px-8">
          <motion.div variants={reveal} initial="hidden" animate="visible" transition={{duration: 0.72}} className="max-w-4xl">
            <p className="font-serif text-lg text-white/80">{copy.eyebrow}</p>
            <h1 className="mt-5 text-balance font-serif text-5xl font-semibold leading-[1.02] sm:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">{copy.lead}</p>
          </motion.div>
          <motion.div
            initial={{opacity: 0, y: 24}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.62, delay: 0.12}}
            className="mt-10 grid gap-3 rounded-[1.5rem] bg-white p-4 text-[var(--demo-text)] shadow-[0_28px_90px_rgba(0,0,0,0.2)] md:grid-cols-[1fr_1fr_1fr_auto]"
          >
            {copy.stats.map((stat) => (
              <div key={stat.label} className="rounded-[1rem] bg-[var(--demo-background)] p-4">
                <p className="text-2xl font-semibold text-[var(--demo-primary)]">{stat.value}</p>
                <p className="mt-1 text-sm text-[var(--demo-muted)]">{stat.label}</p>
              </div>
            ))}
            <PrimaryLink href="#contact" className="h-full rounded-[1rem]">
              {copy.primaryCta}
            </PrimaryLink>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <SectionIntro eyebrow={copy.eyebrow} title={copy.introTitle} />
          <div className="grid gap-4 sm:grid-cols-2">
            <p className="text-lg leading-9 text-[var(--demo-muted)] sm:col-span-2">{copy.introText}</p>
            <div className="min-h-48 rounded-[1.5rem]" style={{background: site.theme.hero}} />
            <div className="min-h-48 rounded-[1.5rem] bg-[var(--demo-surface)] p-6">
              <BedDouble className="h-7 w-7 text-[var(--demo-primary)]" aria-hidden="true" />
              <p className="mt-8 text-2xl font-semibold text-[var(--demo-text)]">{copy.secondaryCta}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[var(--demo-surface)] py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionIntro title={copy.servicesTitle} align="center" />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {copy.services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{opacity: 0, y: 22}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.25}}
                transition={{duration: 0.55, delay: index * 0.08}}
                className="overflow-hidden rounded-[1.5rem] bg-[var(--demo-background)] shadow-sm"
              >
                <div className="h-44" style={{background: site.theme.hero}} />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[var(--demo-text)]">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--demo-muted)]">{service.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <ProcessAndCta copy={copy} icon={<BedDouble className="h-5 w-5" aria-hidden="true" />} />
    </>
  );
}

function RealEstateDemo({site, copy}: DemoRendererProps) {
  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-8">
          <motion.div variants={reveal} initial="hidden" animate="visible" transition={{duration: 0.72}}>
            <p className="inline-flex rounded-full bg-[var(--demo-primary)] px-3 py-2 text-sm font-semibold text-white">
              {copy.eyebrow}
            </p>
            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.03] text-[var(--demo-text)] sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--demo-muted)]">{copy.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="#contact">{copy.primaryCta}</PrimaryLink>
              <SecondaryLink href="#services">{copy.secondaryCta}</SecondaryLink>
            </div>
          </motion.div>

          <motion.aside
            initial={{opacity: 0, y: 24}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.72, delay: 0.1}}
            className="rounded-[1.75rem] border border-[var(--demo-border)] bg-[var(--demo-surface)] p-4 shadow-[0_26px_80px_rgba(58,125,68,0.14)]"
          >
            <div className="flex items-center gap-3 rounded-[1.2rem] border border-[var(--demo-border)] px-4 py-3">
              <Search className="h-5 w-5 text-[var(--demo-primary)]" aria-hidden="true" />
              <span className="text-sm font-semibold text-[var(--demo-muted)]">{copy.secondaryCta}</span>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {copy.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    'rounded-[1.25rem] p-5',
                    index === 0 ? 'sm:col-span-2' : ''
                  )}
                  style={{background: index === 0 ? site.theme.hero : site.theme.background}}
                >
                  <Building2 className="h-5 w-5 text-[var(--demo-primary)]" aria-hidden="true" />
                  <p className="mt-8 text-3xl font-semibold text-[var(--demo-text)]">{stat.value}</p>
                  <p className="mt-1 text-sm text-[var(--demo-muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="about" className="border-y border-[var(--demo-border)] bg-[var(--demo-surface)] py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <SectionIntro eyebrow={copy.eyebrow} title={copy.introTitle} />
          <p className="text-lg leading-9 text-[var(--demo-muted)]">{copy.introText}</p>
        </div>
      </section>

      <section id="services" className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionIntro title={copy.servicesTitle} />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {copy.services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{opacity: 0, y: 22}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.25}}
                transition={{duration: 0.55, delay: index * 0.08}}
                className="rounded-[1.25rem] border border-[var(--demo-border)] bg-[var(--demo-surface)] p-5"
              >
                <div className="mb-6 aspect-[4/3] rounded-[1rem]" style={{background: site.theme.hero}} />
                <h3 className="text-xl font-semibold text-[var(--demo-text)]">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--demo-muted)]">{service.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <ProcessAndCta copy={copy} icon={<Building2 className="h-5 w-5" aria-hidden="true" />} />
    </>
  );
}

function FitnessDemo({site, copy}: DemoRendererProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-0" style={{background: site.theme.hero}} />
        <div className="absolute -right-28 top-0 h-full w-2/3 skew-x-[-14deg] bg-black/38" />
        <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1fr_0.88fr] lg:items-center lg:px-8">
          <motion.div variants={reveal} initial="hidden" animate="visible" transition={{duration: 0.7}}>
            <p className="inline-flex rounded-full bg-[var(--demo-accent)] px-3 py-2 text-sm font-black uppercase tracking-[0.08em] text-[#111111]">
              {copy.eyebrow}
            </p>
            <h1 className="mt-6 max-w-5xl text-balance text-5xl font-black uppercase leading-[0.96] tracking-normal text-white sm:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{copy.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="#contact" className="bg-[var(--demo-accent)] text-[#111111]">
                {copy.primaryCta}
              </PrimaryLink>
              <SecondaryLink href="#services" className="border-white/20 bg-white/10 text-white">
                {copy.secondaryCta}
              </SecondaryLink>
            </div>
          </motion.div>

          <motion.aside
            initial={{opacity: 0, rotate: -2, y: 24}}
            animate={{opacity: 1, rotate: 0, y: 0}}
            transition={{duration: 0.72, delay: 0.1}}
            className="border border-white/12 bg-white/[0.075] p-5 backdrop-blur"
          >
            <Dumbbell className="h-8 w-8 text-[var(--demo-accent)]" aria-hidden="true" />
            <p className="mt-8 text-3xl font-black uppercase text-white">{copy.introTitle}</p>
            <div className="mt-8 grid gap-3">
              {copy.stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between border-t border-white/12 pt-4">
                  <p className="text-sm text-white/60">{stat.label}</p>
                  <p className="text-3xl font-black text-[var(--demo-accent)]">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="about" className="bg-[#111111] py-16 text-white sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <h2 className="text-4xl font-black uppercase leading-tight text-white sm:text-6xl">{copy.introTitle}</h2>
          <p className="text-lg leading-9 text-white/70">{copy.introText}</p>
        </div>
      </section>

      <section id="services" className="bg-[#171717] py-16 text-white sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionIntro title={copy.servicesTitle} />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {copy.services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{opacity: 0, y: 22}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.25}}
                transition={{duration: 0.55, delay: index * 0.08}}
                className="border border-white/10 bg-white/[0.055] p-6"
              >
                <p className="text-5xl font-black text-[var(--demo-primary)]">0{index + 1}</p>
                <h3 className="mt-8 text-2xl font-black uppercase text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/68">{service.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <ProcessAndCta copy={copy} icon={<Dumbbell className="h-5 w-5" aria-hidden="true" />} square />
    </>
  );
}

function ProcessAndCta({
  copy,
  icon,
  square = false
}: {
  copy: DemoSiteCopy;
  icon: ReactNode;
  square?: boolean;
}) {
  return (
    <>
      <section id="process" className="py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.25}} transition={{duration: 0.62}}>
            <SectionIntro title={copy.processTitle} />
            <blockquote
              className={cn(
                'mt-8 border border-[var(--demo-border)] bg-[var(--demo-surface)] p-6 shadow-sm',
                square ? 'rounded-none' : 'rounded-[1.25rem]'
              )}
            >
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
                className={cn(
                  'grid gap-4 border border-[var(--demo-border)] bg-[var(--demo-surface)] p-5 shadow-sm sm:grid-cols-[3rem_1fr]',
                  square ? 'rounded-none' : 'rounded-[1.25rem]'
                )}
              >
                <div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center bg-[var(--demo-primary)] text-white',
                    square ? 'rounded-none' : 'rounded-full'
                  )}
                >
                  {icon}
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
            className={cn(
              'relative overflow-hidden bg-[var(--demo-primary)] p-6 text-white shadow-xl sm:p-8 lg:p-10',
              square ? 'rounded-none' : 'rounded-[1.75rem]'
            )}
          >
            <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
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
                className={cn(
                  'inline-flex min-h-12 items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-[var(--demo-primary)] transition hover:-translate-y-0.5',
                  square ? 'rounded-none' : 'rounded-full'
                )}
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>{copy.contactButton}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
