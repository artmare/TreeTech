'use client';

import '@fontsource-variable/fraunces';
import '@fontsource-variable/manrope';
import '@fontsource-variable/oswald';

import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  Clock,
  MapPin,
  Menu,
  Phone,
  Quote,
  Siren,
  Star
} from 'lucide-react';
import {type CSSProperties, type ReactNode, useState} from 'react';

import {handwerkIcons} from '@/components/demo-handwerk';
import {illustrations} from '@/components/demo-illustrations';
import type {BusinessConfig, BusinessCopy, DemoSite, DemoSiteCopy, HandwerkCopy} from '@/content/demo-sites';
import {demoSiteLabels} from '@/content/demo-sites';
import {Link} from '@/i18n/navigation';
import {localeLabels, localeShortLabels, routing, type Locale} from '@/i18n/routing';
import {cn} from '@/lib/utils';

type Variant = BusinessConfig['variant'];

const variants: Record<Variant, Record<`--bz-${string}`, string>> = {
  // Installateur: friendly and round, like a modern service company.
  friendly: {
    '--bz-body': "'Manrope Variable', system-ui, sans-serif",
    '--bz-heading': "'Manrope Variable', system-ui, sans-serif",
    '--bz-heading-weight': '800',
    '--bz-tracking': '-0.025em',
    '--bz-case': 'none',
    '--bz-radius': '22px',
    '--bz-btn-radius': '999px'
  },
  // Tischlerei: editorial, serif, calm, like a furniture catalogue.
  editorial: {
    '--bz-body': "'Manrope Variable', system-ui, sans-serif",
    '--bz-heading': "'Fraunces Variable', Georgia, serif",
    '--bz-heading-weight': '560',
    '--bz-tracking': '-0.015em',
    '--bz-case': 'none',
    '--bz-radius': '6px',
    '--bz-btn-radius': '4px'
  },
  // Dachdecker: bold, condensed and square, like site signage.
  bold: {
    '--bz-body': "'Manrope Variable', system-ui, sans-serif",
    '--bz-heading': "'Oswald Variable', 'Arial Narrow', sans-serif",
    '--bz-heading-weight': '600',
    '--bz-tracking': '0.005em',
    '--bz-case': 'uppercase',
    '--bz-radius': '0px',
    '--bz-btn-radius': '0px'
  }
};

const chromeDe = {
  services: 'Leistungen',
  references: 'Referenzen',
  about: 'Über uns',
  area: 'Einsatzgebiet',
  contact: 'Kontakt',
  call: 'Anrufen',
  request: 'Anfrage',
  more: 'Mehr erfahren',
  home: 'Start',
  menu: 'Menü',
  includes: 'Das ist dabei',
  priceLabel: 'Richtpreis',
  otherServices: 'Weitere Leistungen',
  servicesHere: 'Unsere Leistungen vor Ort',
  travel: 'Anfahrt',
  before: 'Vorher',
  after: 'Nachher',
  drag: 'Regler ziehen',
  reviewsTitle: 'Was Kundinnen und Kunden sagen',
  reviewsNote: 'Beispiel-Bewertungen. Auf Ihrer Website stehen hier Ihre echten Google-Bewertungen.',
  faqTitle: 'Häufige Fragen',
  formTitle: 'Anfrage in drei Schritten',
  formLead: 'Dauert eine Minute. Wir melden uns am selben Werktag.',
  step: 'Schritt',
  of: 'von',
  next: 'Weiter',
  back: 'Zurück',
  name: 'Name',
  phone: 'Telefon',
  address: 'Adresse',
  message: 'Was sollen wir wissen?',
  photo: 'Fotos hinzufügen',
  send: 'Anfrage senden',
  sent: 'Das ist eine Beispiel-Website. Auf Ihrer Seite landet diese Anfrage mit allen Angaben und Fotos direkt bei Ihnen.',
  hours: 'Öffnungszeiten',
  imprint: 'Impressum',
  privacy: 'Datenschutz',
  in: 'in'
};

const chrome = {
  de: chromeDe,
  en: {
    services: 'Services',
    references: 'References',
    about: 'About us',
    area: 'Service area',
    contact: 'Contact',
    call: 'Call',
    request: 'Request',
    more: 'Learn more',
    home: 'Home',
    menu: 'Menu',
    includes: 'What is included',
    priceLabel: 'Guide price',
    otherServices: 'Other services',
    servicesHere: 'Our services here',
    travel: 'Travel time',
    before: 'Before',
    after: 'After',
    drag: 'Drag the slider',
    reviewsTitle: 'What customers say',
    reviewsNote: 'Example reviews. On your website your real Google reviews appear here.',
    faqTitle: 'Frequently asked questions',
    formTitle: 'Request in three steps',
    formLead: 'Takes a minute. We get back to you the same working day.',
    step: 'Step',
    of: 'of',
    next: 'Next',
    back: 'Back',
    name: 'Name',
    phone: 'Phone',
    address: 'Address',
    message: 'What should we know?',
    photo: 'Add photos',
    send: 'Send request',
    sent: 'This is an example website. On your site this request arrives with all details and photos straight to you.',
    hours: 'Opening hours',
    imprint: 'Legal notice',
    privacy: 'Privacy',
    in: 'in'
  },
  ru: chromeDe
} satisfies Record<Locale, typeof chromeDe>;

type Ui = typeof chromeDe;

type Ctx = {
  site: DemoSite;
  config: BusinessConfig;
  copy: DemoSiteCopy;
  hw: HandwerkCopy;
  bz: BusinessCopy;
  ui: Ui;
  lang: Locale;
  locale: Locale;
  base: string;
  variant: Variant;
};

export function BusinessDemo({site, locale, path}: {site: DemoSite; locale: Locale; path: string[]}) {
  const config = site.business as BusinessConfig;
  const lang: Locale = locale === 'ru' ? 'de' : locale;
  const theme = site.handwerk.theme;
  const ctx: Ctx = {
    site,
    config,
    copy: site.copy[lang],
    hw: site.handwerk.copy[lang],
    bz: config.copy[lang],
    ui: chrome[lang],
    lang,
    locale,
    base: `/portfolio/${site.slug}/site`,
    variant: config.variant
  };

  const style = {
    ...variants[config.variant],
    '--hw-primary': theme.primary,
    '--hw-accent': theme.accent,
    '--hw-accent-strong': theme.accentStrong,
    '--hw-on-dark': theme.onDark,
    '--hw-footer': theme.footer,
    '--hw-bg': theme.background,
    '--hw-text': theme.text,
    '--hw-muted': theme.muted,
    '--hw-border': theme.border,
    '--hw-chip': theme.chip,
    fontFamily: 'var(--bz-body)'
  } as CSSProperties;

  const [section, slug] = path;
  const service = section === 'leistungen' ? ctx.bz.servicePages.findIndex((item) => item.slug === slug) : -1;
  const place = section === 'orte' ? ctx.bz.locations.find((item) => item.slug === slug) : undefined;

  return (
    <div style={style} className="demo-business min-h-screen bg-[var(--hw-bg)] pb-[84px] text-[var(--hw-text)] md:pb-0">
      <Banner locale={locale} />
      <UtilityBar ctx={ctx} />
      <Header ctx={ctx} />
      {service >= 0 ? (
        <ServicePage ctx={ctx} index={service} />
      ) : place ? (
        <LocationPage ctx={ctx} place={place} />
      ) : (
        <HomePage ctx={ctx} />
      )}
      <InquiryForm ctx={ctx} />
      <Footer ctx={ctx} />
      <MobileBar ctx={ctx} />
      <StructuredData ctx={ctx} />
    </div>
  );
}

/* ------------------------------------------------------------------ frame */

function Banner({locale}: {locale: Locale}) {
  const labels = demoSiteLabels[locale];
  return (
    <div className="bg-[#1c2220] text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-2.5 text-sm">
        <span>{labels.banner}</span>
        <Link href="/contact#audit-call" className="font-bold text-[#f3c431] underline-offset-4 hover:underline">
          {labels.bannerCta}
        </Link>
      </div>
    </div>
  );
}

function UtilityBar({ctx}: {ctx: Ctx}) {
  const urgent = ctx.hw.emergency;
  return (
    <div className={cn('text-sm', ctx.variant === 'bold' ? 'bg-[var(--hw-accent)] text-white' : 'bg-[var(--hw-primary)] text-white/90')}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2">
        <span className="flex items-center gap-2">
          {urgent ? <Siren className="h-4 w-4" aria-hidden="true" /> : <Clock className="h-4 w-4" aria-hidden="true" />}
          {ctx.bz.utility}
        </span>
        <span className="hidden items-center gap-1.5 sm:flex">
          <Star className="h-4 w-4 fill-current" aria-hidden="true" />
          <strong>{ctx.config.rating}</strong> Google
        </span>
      </div>
    </div>
  );
}

function Header({ctx}: {ctx: Ctx}) {
  const {site, ui, base, bz, copy} = ctx;
  const BrandIcon = handwerkIcons[site.handwerk.icon];
  const otherLocales = routing.locales.filter((item) => item !== ctx.locale);
  const linkClass = 'rounded-[8px] px-3 py-2 hover:bg-[var(--hw-chip)]';

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--hw-border)] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-3 px-5">
        <Link href={base} className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--hw-primary)] text-white',
              ctx.variant === 'friendly' ? 'rounded-full' : ctx.variant === 'editorial' ? 'rounded-[4px]' : ''
            )}
          >
            <BrandIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="bz-heading block truncate text-lg text-[var(--hw-primary)]">{site.brand}</span>
            <span className="block truncate text-xs font-semibold text-[var(--hw-muted)]">
              {site.industry[ctx.lang]} · {site.location}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center text-[15px] font-semibold lg:flex">
          <Dropdown label={ui.services}>
            {copy.services.map((service, index) => (
              <Link key={service.title} href={`${base}/leistungen/${bz.servicePages[index].slug}`} className="block rounded-[8px] px-3 py-2 hover:bg-[var(--hw-chip)]">
                {service.title}
              </Link>
            ))}
          </Dropdown>
          <Link href={`${base}#referenzen`} className={linkClass}>{ui.references}</Link>
          <Link href={`${base}#ueber-uns`} className={linkClass}>{ui.about}</Link>
          <Dropdown label={ui.area}>
            {bz.locations.map((place) => (
              <Link key={place.slug} href={`${base}/orte/${place.slug}`} className="block rounded-[8px] px-3 py-2 hover:bg-[var(--hw-chip)]">
                {place.name}
              </Link>
            ))}
          </Dropdown>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          {otherLocales.map((item) => (
            <Link
              key={item}
              href={base}
              locale={item}
              aria-label={localeLabels[item]}
              className="hidden min-h-10 min-w-9 items-center justify-center rounded-[6px] text-sm font-bold text-[var(--hw-muted)] hover:bg-[var(--hw-chip)] sm:inline-flex"
            >
              {localeShortLabels[item]}
            </Link>
          ))}
          <a href="#anfrage" className="bz-btn hidden min-h-11 items-center gap-2 bg-[var(--hw-accent)] px-5 text-[15px] font-bold text-white hover:bg-[var(--hw-accent-strong)] sm:inline-flex">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.handwerk.phone}
          </a>
          <details className="relative lg:hidden">
            <summary className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-[8px] border border-[var(--hw-border)]" aria-label={ui.menu}>
              <Menu className="h-5 w-5" aria-hidden="true" />
            </summary>
            <div className="absolute right-0 mt-2 grid w-72 gap-1 rounded-[12px] border border-[var(--hw-border)] bg-white p-3 text-[15px] font-semibold shadow-xl">
              <p className="px-3 pt-1 text-xs uppercase tracking-wider text-[var(--hw-muted)]">{ui.services}</p>
              {copy.services.map((service, index) => (
                <Link key={service.title} href={`${base}/leistungen/${bz.servicePages[index].slug}`} className="rounded-[8px] px-3 py-2 hover:bg-[var(--hw-chip)]">
                  {service.title}
                </Link>
              ))}
              <p className="px-3 pt-2 text-xs uppercase tracking-wider text-[var(--hw-muted)]">{ui.area}</p>
              {bz.locations.map((place) => (
                <Link key={place.slug} href={`${base}/orte/${place.slug}`} className="rounded-[8px] px-3 py-2 hover:bg-[var(--hw-chip)]">
                  {place.name}
                </Link>
              ))}
              <Link href={`${base}#referenzen`} className="rounded-[8px] px-3 py-2 hover:bg-[var(--hw-chip)]">{ui.references}</Link>
              <Link href={`${base}#ueber-uns`} className="rounded-[8px] px-3 py-2 hover:bg-[var(--hw-chip)]">{ui.about}</Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

function Dropdown({label, children}: {label: string; children: ReactNode}) {
  return (
    <div className="group relative">
      <button type="button" className="flex items-center gap-1 rounded-[8px] px-3 py-2 hover:bg-[var(--hw-chip)]">
        {label}
        <ChevronDown className="h-4 w-4 transition group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 w-64 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="grid gap-0.5 rounded-[12px] border border-[var(--hw-border)] bg-white p-2 shadow-xl">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ home */

function HomePage({ctx}: {ctx: Ctx}) {
  return (
    <main>
      <Hero ctx={ctx} />
      <StatStrip ctx={ctx} />
      <Services ctx={ctx} />
      <References ctx={ctx} />
      <About ctx={ctx} />
      <Reviews ctx={ctx} />
      <Locations ctx={ctx} />
      <Faq ctx={ctx} />
    </main>
  );
}

function Illustration({ctx, damaged, className, cover}: {ctx: Ctx; damaged?: boolean; className?: string; cover?: boolean}) {
  const Art = illustrations[ctx.config.illustration];
  const theme = ctx.site.handwerk.theme;
  return <Art primary={theme.primary} accent={theme.accent} light={theme.chip} damaged={damaged} cover={cover} className={className} />;
}

function HeroButtons({ctx, dark, stack}: {ctx: Ctx; dark?: boolean; stack?: boolean}) {
  const Secondary = Camera;
  return (
    <div className={cn('mt-8 grid gap-3', !stack && 'sm:flex')}>
      <a href="#anfrage" className="bz-btn inline-flex min-h-14 items-center justify-center gap-2 bg-[var(--hw-accent)] px-7 text-lg font-bold text-white hover:bg-[var(--hw-accent-strong)]">
        <Phone className="h-5 w-5" aria-hidden="true" />
        {ctx.copy.primaryCta}
      </a>
      <a
        href="#anfrage"
        className={cn(
          'bz-btn inline-flex min-h-14 items-center justify-center gap-2 border-2 px-7 text-lg font-bold',
          dark ? 'border-white/70 text-white hover:bg-white/10' : 'border-[var(--hw-primary)] text-[var(--hw-primary)] hover:bg-white'
        )}
      >
        <Secondary className="h-5 w-5" aria-hidden="true" />
        {ctx.copy.secondaryCta}
      </a>
    </div>
  );
}

function Hero({ctx}: {ctx: Ctx}) {
  const {copy, hw, bz, variant, config} = ctx;

  if (variant === 'editorial') {
    return (
      <section className="border-b border-[var(--hw-border)]">
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-14 md:pt-20">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--hw-accent)]">{copy.eyebrow}</p>
          <h1 className="bz-heading mt-5 max-w-4xl text-balance text-[44px] leading-[1.02] text-[var(--hw-primary)] sm:text-7xl">
            {copy.title}
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-[1.45fr_1fr] md:items-end">
            <figure>
              <div className="overflow-hidden rounded-[var(--bz-radius)] border border-[var(--hw-border)]">
                <Illustration ctx={ctx} className="block h-auto w-full" />
              </div>
              <figcaption className="mt-3 text-sm italic text-[var(--hw-muted)]">{bz.heroBadges[0]}</figcaption>
            </figure>
            <div>
              <p className="text-xl leading-relaxed text-[var(--hw-muted)]">{copy.lead}</p>
              <HeroButtons ctx={ctx} stack />
              {hw.trust ? (
                <ul className="mt-8 grid gap-2 border-t border-[var(--hw-border)] pt-6 text-[15px]">
                  {hw.trust.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[var(--hw-accent)]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'bold') {
    return (
      <section className="relative overflow-hidden bg-[var(--hw-primary)] text-white">
        <div className="absolute inset-y-0 right-0 hidden w-[52%] md:block [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]">
          <Illustration ctx={ctx} cover className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--hw-primary)]/40 to-transparent" />
        </div>
        <div className="relative mx-auto grid max-w-6xl px-5 py-14 md:min-h-[560px] md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="inline-block bg-[var(--hw-accent)] px-3 py-1 text-sm font-bold uppercase tracking-wider">{copy.eyebrow}</p>
            <h1 className="bz-heading mt-5 text-balance text-[46px] leading-[0.98] sm:text-7xl">{copy.title}</h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/85">{copy.lead}</p>
            <HeroButtons ctx={ctx} dark />
            <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-white/80">
              <Star className="h-4 w-4 fill-[var(--hw-on-dark)] text-[var(--hw-on-dark)]" aria-hidden="true" />
              {config.rating} · {bz.heroBadges[1]}
            </p>
          </div>
          <div className="mt-10 overflow-hidden md:hidden">
            <Illustration ctx={ctx} className="block h-auto w-full" />
          </div>
        </div>
        <div className="h-2 bg-[var(--hw-accent)]" />
      </section>
    );
  }

  return (
    <section className="bg-[var(--hw-chip)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.05fr_1fr] md:items-center md:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[var(--hw-primary)]">
            <MapPin className="h-4 w-4 text-[var(--hw-accent)]" aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h1 className="bz-heading mt-5 text-balance text-[42px] leading-[1.04] text-[var(--hw-primary)] sm:text-6xl">{copy.title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--hw-muted)]">{copy.lead}</p>
          <HeroButtons ctx={ctx} />
          {hw.trust ? (
            <ul className="mt-7 flex flex-wrap gap-2 text-sm font-semibold">
              {hw.trust.map((item) => (
                <li key={item} className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5">
                  <Check className="h-4 w-4 text-[var(--hw-accent)]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[var(--bz-radius)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]">
            <Illustration ctx={ctx} className="block h-auto w-full" />
          </div>
          <div className="absolute -left-3 top-6 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg sm:-left-8">
            <span className="flex text-[#f5a623]" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((item) => (
                <Star key={item} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span className="text-sm font-bold">{config.rating} Google</span>
          </div>
          <div className="absolute -bottom-5 right-4 flex items-center gap-2 rounded-2xl bg-[var(--hw-primary)] px-4 py-3 text-sm font-bold text-white shadow-lg">
            <Clock className="h-4 w-4 text-[var(--hw-on-dark)]" aria-hidden="true" />
            {bz.heroBadges[1]}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatStrip({ctx}: {ctx: Ctx}) {
  const {copy, variant} = ctx;
  return (
    <section className={cn(variant === 'bold' ? 'bg-[var(--hw-footer)] text-white' : 'border-b border-[var(--hw-border)] bg-white')}>
      <ul className="mx-auto grid max-w-6xl gap-px px-5 sm:grid-cols-3">
        {copy.stats.map((stat) => (
          <li key={stat.label} className="py-7 sm:px-6 sm:first:pl-0">
            <p className={cn('bz-heading text-3xl', variant === 'bold' ? 'text-[var(--hw-on-dark)]' : 'text-[var(--hw-primary)]')}>{stat.value}</p>
            <p className={cn('mt-1 text-[15px]', variant === 'bold' ? 'text-white/75' : 'text-[var(--hw-muted)]')}>{stat.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SectionHead({ctx, eyebrow, title, text}: {ctx: Ctx; eyebrow?: string; title: string; text?: string}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className={cn('text-sm font-bold uppercase tracking-[0.16em] text-[var(--hw-accent)]', ctx.variant === 'editorial' && 'tracking-[0.22em]')}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className="bz-heading mt-2 text-balance text-[32px] leading-tight text-[var(--hw-primary)] sm:text-[44px]">{title}</h2>
      {text ? <p className="mt-3 text-lg leading-relaxed text-[var(--hw-muted)]">{text}</p> : null}
    </div>
  );
}

function Services({ctx}: {ctx: Ctx}) {
  const {copy, bz, base, ui, variant, site} = ctx;

  return (
    <section id="leistungen" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead ctx={ctx} eyebrow={ui.services} title={copy.servicesTitle} />
        {variant === 'editorial' ? (
          <ol className="mt-10 border-t border-[var(--hw-border)]">
            {copy.services.map((service, index) => (
              <li key={service.title} className="border-b border-[var(--hw-border)]">
                <Link
                  href={`${base}/leistungen/${bz.servicePages[index].slug}`}
                  className="group grid gap-2 py-7 sm:grid-cols-[80px_1fr_1.3fr_40px] sm:items-baseline"
                >
                  <span className="bz-heading text-2xl italic text-[var(--hw-accent)]">0{index + 1}</span>
                  <span className="bz-heading text-2xl text-[var(--hw-primary)] sm:text-3xl">{service.title}</span>
                  <span className="text-[16px] leading-relaxed text-[var(--hw-muted)]">{service.text}</span>
                  <ArrowRight className="hidden h-6 w-6 text-[var(--hw-accent)] transition group-hover:translate-x-1 sm:block" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <div className={cn('mt-10 grid gap-4 sm:grid-cols-2', variant === 'friendly' && 'lg:grid-cols-4')}>
            {copy.services.map((service, index) => {
              const Icon = handwerkIcons[site.handwerk.serviceIcons[index % site.handwerk.serviceIcons.length]];
              return (
                <Link
                  key={service.title}
                  href={`${base}/leistungen/${bz.servicePages[index].slug}`}
                  className={cn(
                    'group flex flex-col border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg',
                    variant === 'friendly' ? 'rounded-[var(--bz-radius)] border-[var(--hw-border)]' : 'border-[var(--hw-primary)] border-l-[6px] border-l-[var(--hw-accent)]'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-12 w-12 items-center justify-center',
                      variant === 'friendly' ? 'rounded-full bg-[var(--hw-chip)] text-[var(--hw-accent)]' : 'bg-[var(--hw-primary)] text-[var(--hw-on-dark)]'
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className={cn('mt-4 text-xl font-bold', variant === 'bold' && 'bz-heading text-2xl')}>{service.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[var(--hw-muted)]">{service.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-bold text-[var(--hw-accent)]">
                    {ui.more}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function References({ctx}: {ctx: Ctx}) {
  const {hw, bz, ui, variant} = ctx;
  const [split, setSplit] = useState(50);
  const gallery = hw.gallery;

  return (
    <section id="referenzen" className={cn('py-16 md:py-20', variant === 'bold' ? 'bg-white' : 'bg-[var(--hw-chip)]')}>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_1.35fr] md:items-center">
        <div>
          <SectionHead ctx={ctx} eyebrow={ui.references} title={bz.beforeAfter.title} text={bz.beforeAfter.text} />
          {gallery ? (
            <ul className="mt-8 grid gap-3">
              {gallery.items.map((item) => (
                <li key={item.title} className="flex gap-3 border-l-4 border-[var(--hw-accent)] bg-white px-4 py-3">
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-[var(--hw-muted)]">{item.meta}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div>
          <div className="relative overflow-hidden rounded-[var(--bz-radius)] border border-[var(--hw-border)] bg-white select-none">
            <Illustration ctx={ctx} className="block h-auto w-full" />
            <div className="absolute inset-0" style={{clipPath: `inset(0 ${100 - split}% 0 0)`}}>
              <Illustration ctx={ctx} damaged className="block h-full w-full grayscale-[60%]" />
            </div>
            <div className="pointer-events-none absolute inset-y-0" style={{left: `${split}%`}}>
              <div className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow" />
              <div className="absolute top-1/2 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--hw-primary)] shadow-lg">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </div>
            </div>
            <span className="absolute left-3 top-3 bg-black/70 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">{ui.before}</span>
            <span className="absolute right-3 top-3 bg-[var(--hw-accent)] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">{ui.after}</span>
          </div>
          <label className="mt-3 block text-center text-sm font-semibold text-[var(--hw-muted)]">
            {ui.drag}
            <input
              type="range"
              min={5}
              max={95}
              value={split}
              onChange={(event) => setSplit(Number(event.target.value))}
              className="mt-2 w-full accent-[var(--hw-accent)]"
            />
          </label>
        </div>
      </div>
    </section>
  );
}

function About({ctx}: {ctx: Ctx}) {
  const {bz, ui, variant} = ctx;
  const initials = bz.about.name
    .split(' ')
    .map((part) => part[0])
    .join('');

  return (
    <section id="ueber-uns" className="py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:items-center">
        <SectionHead ctx={ctx} eyebrow={ui.about} title={bz.about.title} text={bz.about.text} />
        <figure
          className={cn(
            'relative p-8',
            variant === 'bold' ? 'bg-[var(--hw-primary)] text-white' : 'rounded-[var(--bz-radius)] border border-[var(--hw-border)] bg-white'
          )}
        >
          <Quote className="h-8 w-8 text-[var(--hw-accent)]" aria-hidden="true" />
          <blockquote className={cn('mt-4 text-xl leading-relaxed', variant === 'editorial' && 'bz-heading text-2xl italic')}>
            {bz.about.quote}
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span
              className={cn(
                'flex h-14 w-14 items-center justify-center text-lg font-extrabold',
                variant === 'bold' ? 'bg-[var(--hw-accent)] text-white' : 'rounded-full bg-[var(--hw-chip)] text-[var(--hw-primary)]'
              )}
              aria-hidden="true"
            >
              {initials}
            </span>
            <span>
              <span className="block font-bold">{bz.about.name}</span>
              <span className={cn('block text-sm', variant === 'bold' ? 'text-white/70' : 'text-[var(--hw-muted)]')}>{bz.about.role}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Reviews({ctx}: {ctx: Ctx}) {
  const {bz, ui, config, variant} = ctx;
  return (
    <section className={cn('py-16 md:py-20', variant === 'bold' ? 'bg-[var(--hw-chip)]' : 'border-y border-[var(--hw-border)] bg-white')}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead ctx={ctx} title={ui.reviewsTitle} />
          <p className="flex items-center gap-2 text-lg font-bold">
            <span className="flex text-[#f5a623]" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((item) => (
                <Star key={item} className="h-5 w-5 fill-current" />
              ))}
            </span>
            {config.rating}
          </p>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {bz.reviews.map((review) => (
            <li key={review.name} className="flex flex-col rounded-[var(--bz-radius)] border border-[var(--hw-border)] bg-white p-6">
              <span className="flex text-[#f5a623]" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((item) => (
                  <Star key={item} className="h-4 w-4 fill-current" />
                ))}
              </span>
              <p className="mt-3 flex-1 text-[16px] leading-relaxed">„{review.text}“</p>
              <p className="mt-4 text-sm font-bold">
                {review.name} <span className="font-normal text-[var(--hw-muted)]">· {review.place}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-[var(--hw-muted)]">{ui.reviewsNote}</p>
      </div>
    </section>
  );
}

function Locations({ctx}: {ctx: Ctx}) {
  const {bz, base, ui, hw, site, lang} = ctx;
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead ctx={ctx} eyebrow={ui.area} title={bz.locationsTitle} text={bz.locationsText} />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {bz.locations.map((place) => (
            <Link
              key={place.slug}
              href={`${base}/orte/${place.slug}`}
              className="group rounded-[var(--bz-radius)] border border-[var(--hw-border)] bg-white p-6 transition hover:border-[var(--hw-accent)]"
            >
              <MapPin className="h-6 w-6 text-[var(--hw-accent)]" aria-hidden="true" />
              <p className="mt-3 text-sm text-[var(--hw-muted)]">
                {site.industry[lang]} {ui.in}
              </p>
              <p className="bz-heading text-2xl text-[var(--hw-primary)]">{place.name}</p>
              <p className="mt-2 text-[15px] text-[var(--hw-muted)]">
                {ui.travel}: {place.travel}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-bold text-[var(--hw-accent)]">
                {ui.more}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
        <ul className="mt-6 flex flex-wrap gap-2">
          {hw.towns.map((town) => (
            <li key={town} className="rounded-full bg-[var(--hw-chip)] px-3 py-1.5 text-sm font-semibold">
              {town}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Faq({ctx}: {ctx: Ctx}) {
  const {bz, ui} = ctx;
  return (
    <section className="border-t border-[var(--hw-border)] bg-white py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.8fr_1.2fr]">
        <SectionHead ctx={ctx} title={ui.faqTitle} />
        <div className="divide-y divide-[var(--hw-border)] border-y border-[var(--hw-border)]">
          {bz.faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
                {item.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-[var(--hw-accent)] transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-[16px] leading-relaxed text-[var(--hw-muted)]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ sub pages */

function Breadcrumb({ctx, items}: {ctx: Ctx; items: string[]}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[var(--hw-muted)]">
      <Link href={ctx.base} className="font-semibold hover:text-[var(--hw-accent)]">
        {ctx.ui.home}
      </Link>
      {items.map((item) => (
        <span key={item}>
          {' / '}
          {item}
        </span>
      ))}
    </nav>
  );
}

function SubHero({ctx, crumbs, title, text}: {ctx: Ctx; crumbs: string[]; title: string; text: string}) {
  const dark = ctx.variant === 'bold';
  return (
    <section className={cn(dark ? 'bg-[var(--hw-primary)] text-white' : 'border-b border-[var(--hw-border)] bg-[var(--hw-chip)]')}>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[1.3fr_1fr] md:items-center md:py-16">
        <div className={dark ? '[&_nav]:text-white/70' : ''}>
          <Breadcrumb ctx={ctx} items={crumbs} />
          <h1 className={cn('bz-heading mt-4 text-balance text-[40px] leading-[1.05] sm:text-6xl', !dark && 'text-[var(--hw-primary)]')}>{title}</h1>
          <p className={cn('mt-4 max-w-xl text-lg leading-relaxed', dark ? 'text-white/85' : 'text-[var(--hw-muted)]')}>{text}</p>
          <HeroButtons ctx={ctx} dark={dark} />
        </div>
        <div className="hidden overflow-hidden rounded-[var(--bz-radius)] md:block">
          <Illustration ctx={ctx} className="block h-auto w-full" />
        </div>
      </div>
    </section>
  );
}

function ServicePage({ctx, index}: {ctx: Ctx; index: number}) {
  const {copy, bz, ui, base} = ctx;
  const service = copy.services[index];
  const detail = bz.servicePages[index];

  return (
    <main>
      <SubHero ctx={ctx} crumbs={[ui.services, service.title]} title={service.title} text={detail.intro} />
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="bz-heading text-3xl text-[var(--hw-primary)]">{ui.includes}</h2>
            <ul className="mt-6 grid gap-3">
              {detail.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 rounded-[var(--bz-radius)] border border-[var(--hw-border)] bg-white p-4 text-[16px]">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--hw-accent)]" aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
          <aside className="h-fit rounded-[var(--bz-radius)] bg-[var(--hw-primary)] p-6 text-white">
            <p className="text-sm font-bold uppercase tracking-wider text-[var(--hw-on-dark)]">{ui.priceLabel}</p>
            <p className="bz-heading mt-2 text-3xl">{detail.price}</p>
            <a href="#anfrage" className="bz-btn mt-6 flex min-h-12 items-center justify-center gap-2 bg-[var(--hw-accent)] font-bold hover:bg-[var(--hw-accent-strong)]">
              {copy.contactButton}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="mt-6 text-sm font-bold uppercase tracking-wider text-white/60">{ui.otherServices}</p>
            <ul className="mt-2 grid gap-1">
              {copy.services.map((item, itemIndex) =>
                itemIndex === index ? null : (
                  <li key={item.title}>
                    <Link href={`${base}/leistungen/${bz.servicePages[itemIndex].slug}`} className="flex items-center justify-between py-1.5 hover:text-[var(--hw-on-dark)]">
                      {item.title}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </li>
                )
              )}
            </ul>
          </aside>
        </div>
      </section>
      <Reviews ctx={ctx} />
    </main>
  );
}

function LocationPage({ctx, place}: {ctx: Ctx; place: BusinessCopy['locations'][number]}) {
  const {copy, bz, ui, base, site, lang} = ctx;
  return (
    <main>
      <SubHero ctx={ctx} crumbs={[ui.area, place.name]} title={`${site.industry[lang]} ${ui.in} ${place.name}`} text={place.text} />
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="bz-heading text-3xl text-[var(--hw-primary)]">{ui.servicesHere}</h2>
            <p className="flex items-center gap-2 text-[16px] font-semibold">
              <Clock className="h-5 w-5 text-[var(--hw-accent)]" aria-hidden="true" />
              {ui.travel}: {place.travel}
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {copy.services.map((service, index) => (
              <Link
                key={service.title}
                href={`${base}/leistungen/${bz.servicePages[index].slug}`}
                className="group flex items-center justify-between gap-4 rounded-[var(--bz-radius)] border border-[var(--hw-border)] bg-white p-5 hover:border-[var(--hw-accent)]"
              >
                <span>
                  <span className="block text-lg font-bold">
                    {service.title} {ui.in} {place.name}
                  </span>
                  <span className="mt-1 block text-[15px] text-[var(--hw-muted)]">{service.text}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-[var(--hw-accent)] transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-[var(--hw-muted)]">
            {bz.locations
              .filter((item) => item.slug !== place.slug)
              .map((item, index) => (
                <span key={item.slug}>
                  {index > 0 ? ' · ' : ''}
                  <Link href={`${base}/orte/${item.slug}`} className="font-semibold text-[var(--hw-accent)] hover:underline">
                    {site.industry[lang]} {ui.in} {item.name}
                  </Link>
                </span>
              ))}
          </p>
        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ form + footer */

function InquiryForm({ctx}: {ctx: Ctx}) {
  const {bz, ui, copy, site, hw, variant} = ctx;
  const [step, setStep] = useState(0);
  const [topic, setTopic] = useState('');
  const [when, setWhen] = useState('');
  const [sent, setSent] = useState(false);
  const input =
    'h-12 w-full rounded-[min(var(--bz-radius),10px)] border border-[var(--hw-border)] bg-white px-3 text-base text-[var(--hw-text)] outline-none focus:border-[var(--hw-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--hw-primary)_20%,transparent)]';
  const choice = (active: boolean) =>
    cn(
      'min-h-12 rounded-[min(var(--bz-radius),10px)] border-2 px-4 py-2 text-left text-[15px] font-bold transition',
      active ? 'border-[var(--hw-accent)] bg-[color-mix(in_srgb,var(--hw-accent)_10%,white)]' : 'border-[var(--hw-border)] hover:border-[var(--hw-primary)]'
    );

  return (
    <section id="anfrage" className={cn('py-16 md:py-20', variant === 'editorial' ? 'bg-[var(--hw-chip)]' : 'bg-[var(--hw-primary)] text-white')}>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className={cn('bz-heading text-balance text-[34px] leading-tight sm:text-5xl', variant === 'editorial' && 'text-[var(--hw-primary)]')}>
            {copy.contactTitle}
          </h2>
          <p className={cn('mt-3 text-lg', variant === 'editorial' ? 'text-[var(--hw-muted)]' : 'text-white/85')}>{copy.contactText}</p>
          <p className="mt-8 flex items-center gap-2 text-2xl font-extrabold">
            <Phone className="h-6 w-6 text-[var(--hw-accent)]" aria-hidden="true" />
            {site.handwerk.phone}
          </p>
          <p className={cn('mt-2 flex items-center gap-2', variant === 'editorial' ? 'text-[var(--hw-muted)]' : 'text-white/80')}>
            <Clock className="h-5 w-5" aria-hidden="true" />
            {hw.hours}
          </p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
          className="rounded-[var(--bz-radius)] bg-white p-6 text-[var(--hw-text)] shadow-xl"
        >
          <p className="text-lg font-extrabold">{ui.formTitle}</p>
          <p className="text-sm text-[var(--hw-muted)]">{ui.formLead}</p>
          <div className="mt-4 flex items-center gap-2" aria-hidden="true">
            {[0, 1, 2].map((item) => (
              <span key={item} className={cn('h-1.5 flex-1 rounded-full', item <= step ? 'bg-[var(--hw-accent)]' : 'bg-[var(--hw-border)]')} />
            ))}
          </div>
          <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[var(--hw-muted)]">
            {ui.step} {step + 1} {ui.of} 3
          </p>

          {step === 0 ? (
            <fieldset className="mt-4">
              <legend className="font-bold">{bz.steps.topic}</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {bz.steps.topics.map((item) => (
                  <button key={item} type="button" className={choice(topic === item)} onClick={() => setTopic(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          {step === 1 ? (
            <fieldset className="mt-4">
              <legend className="font-bold">{bz.steps.when}</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {bz.steps.whens.map((item) => (
                  <button key={item} type="button" className={choice(when === item)} onClick={() => setWhen(item)}>
                    {item}
                  </button>
                ))}
              </div>
              <label className="mt-4 flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-[min(var(--bz-radius),10px)] border-2 border-dashed border-[var(--hw-border)] text-[15px] font-bold text-[var(--hw-primary)]">
                <Camera className="h-5 w-5" aria-hidden="true" />
                {ui.photo}
                <input type="file" accept="image/*" multiple className="sr-only" />
              </label>
            </fieldset>
          ) : null}

          {step === 2 ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-bold">
                {ui.name}
                <input className={input} autoComplete="off" />
              </label>
              <label className="grid gap-1.5 text-sm font-bold">
                {ui.phone}
                <input className={input} inputMode="tel" autoComplete="off" />
              </label>
              <label className="grid gap-1.5 text-sm font-bold sm:col-span-2">
                {ui.address}
                <input className={input} autoComplete="off" />
              </label>
              <label className="grid gap-1.5 text-sm font-bold sm:col-span-2">
                {ui.message}
                <textarea rows={3} className={`${input} h-auto py-3`} />
              </label>
            </div>
          ) : null}

          <div className="mt-6 flex gap-3">
            {step > 0 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="bz-btn min-h-12 border-2 border-[var(--hw-border)] px-5 font-bold">
                {ui.back}
              </button>
            ) : null}
            {step < 2 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="bz-btn flex min-h-12 flex-1 items-center justify-center gap-2 bg-[var(--hw-accent)] font-bold text-white hover:bg-[var(--hw-accent-strong)]"
              >
                {ui.next}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <button type="submit" className="bz-btn min-h-12 flex-1 bg-[var(--hw-accent)] font-bold text-white hover:bg-[var(--hw-accent-strong)]">
                {ui.send}
              </button>
            )}
          </div>
          {sent ? (
            <p role="status" className="mt-4 flex gap-2 rounded-[8px] bg-[#eef6f1] p-3 text-[15px] font-semibold text-[#1f5a42]">
              <Check className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              {ui.sent}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function Footer({ctx}: {ctx: Ctx}) {
  const {site, bz, ui, base, copy, lang} = ctx;
  const labels = demoSiteLabels[ctx.locale];
  return (
    <footer className="bg-[var(--hw-footer)] pt-14 text-white/75">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="bz-heading text-xl text-white">{site.brand}</p>
          <p className="mt-2 text-sm">
            {site.industry[lang]} · {site.location}
          </p>
          <p className="mt-4 flex items-center gap-2 font-bold text-white">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.handwerk.phone}
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">{ui.hours}</p>
          <table className="mt-3 w-full text-sm">
            <tbody>
              {bz.hours.map(([day, time]) => (
                <tr key={day}>
                  <td className="py-1 pr-3">{day}</td>
                  <td className="py-1 text-right text-white">{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">{ui.services}</p>
          <ul className="mt-3 grid gap-1.5 text-sm">
            {copy.services.map((service, index) => (
              <li key={service.title}>
                <Link href={`${base}/leistungen/${bz.servicePages[index].slug}`} className="hover:text-white">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-white">{ui.area}</p>
          <ul className="mt-3 grid gap-1.5 text-sm">
            {bz.locations.map((place) => (
              <li key={place.slug}>
                <Link href={`${base}/orte/${place.slug}`} className="hover:text-white">
                  {site.industry[lang]} {ui.in} {place.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {site.brand}
          </span>
          <span className="flex gap-4">
            <span>{ui.imprint}</span>
            <span>{ui.privacy}</span>
            <Link href={`/portfolio/${site.slug}`} className="font-bold text-white hover:underline">
              {labels.backToCase}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

function MobileBar({ctx}: {ctx: Ctx}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[var(--hw-border)] bg-white p-3 md:hidden">
      <a href="#anfrage" className="bz-btn flex min-h-14 items-center justify-center gap-2 bg-[var(--hw-accent)] text-base font-bold text-white">
        <Phone className="h-5 w-5" aria-hidden="true" />
        {ctx.ui.call}
      </a>
      <a href="#anfrage" className="bz-btn flex min-h-14 items-center justify-center gap-2 border-2 border-[var(--hw-primary)] text-base font-bold text-[var(--hw-primary)]">
        <Camera className="h-5 w-5" aria-hidden="true" />
        {ctx.ui.request}
      </a>
    </nav>
  );
}

/** LocalBusiness data, as Website Business includes it for Google. */
function StructuredData({ctx}: {ctx: Ctx}) {
  const {site, bz, copy, lang} = ctx;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.brand,
    description: copy.lead,
    telephone: site.handwerk.phone,
    address: {'@type': 'PostalAddress', addressLocality: site.location, addressCountry: 'AT'},
    areaServed: bz.locations.map((place) => place.name),
    knowsAbout: copy.services.map((service) => service.title),
    inLanguage: lang
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />;
}
