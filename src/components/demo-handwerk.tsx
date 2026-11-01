'use client';

import {
  Bath,
  Calculator,
  CalendarCheck,
  Camera,
  Car,
  ChefHat,
  Check,
  CircleDot,
  Clock,
  CloudLightning,
  Droplets,
  Flame,
  Gauge,
  Hammer,
  House,
  Layers,
  type LucideIcon,
  MapPin,
  PaintRoller,
  Paintbrush,
  Phone,
  Ruler,
  ShieldCheck,
  Siren,
  Sofa,
  Star,
  Thermometer,
  Wrench,
  Zap
} from 'lucide-react';
import {type CSSProperties, type FormEvent, useState} from 'react';

import type {DemoSite, HandwerkAside, HandwerkIcon} from '@/content/demo-sites';
import {demoSiteLabels} from '@/content/demo-sites';
import {formatEur} from '@/content/pricing';
import {Link} from '@/i18n/navigation';
import {localeLabels, localeShortLabels, routing, type Locale} from '@/i18n/routing';

export const handwerkIcons: Record<HandwerkIcon, LucideIcon> = {
  zap: Zap,
  wrench: Wrench,
  shield: ShieldCheck,
  star: Star,
  droplets: Droplets,
  flame: Flame,
  bath: Bath,
  thermometer: Thermometer,
  car: Car,
  gauge: Gauge,
  tire: CircleDot,
  hammer: Hammer,
  ruler: Ruler,
  sofa: Sofa,
  kitchen: ChefHat,
  roller: PaintRoller,
  brush: Paintbrush,
  layers: Layers,
  house: House,
  storm: CloudLightning
};

/** Frame strings of the example site itself (not of TreeTech). */
const chrome = {
  de: {
    area: 'Einsatzgebiet',
    reviews: 'Bewertungen',
    demoSent: 'Das ist eine Beispiel-Website. Auf Ihrer Seite landet diese Anfrage direkt bei Ihnen per E-Mail oder WhatsApp.',
    call: 'Anrufen',
    request: 'Anfrage',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    from: 'ab'
  },
  en: {
    area: 'Service area',
    reviews: 'Reviews',
    demoSent: 'This is an example website. On your site this request goes straight to you by email or WhatsApp.',
    call: 'Call',
    request: 'Request',
    imprint: 'Legal notice',
    privacy: 'Privacy',
    from: 'from'
  },
  ru: {
    area: 'Район выезда',
    reviews: 'Отзывы',
    demoSent: 'Это пример сайта. На вашем сайте такая заявка сразу придёт вам на e-mail или в WhatsApp.',
    call: 'Позвонить',
    request: 'Заявка',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    from: 'от'
  }
} satisfies Record<Locale, Record<string, string>>;

type HandwerkStyle = CSSProperties & Record<`--hw-${string}`, string>;


const euro = (value: number, lang: Locale) => formatEur(value, lang);

/**
 * One template for every trade demo. The trade-specific parts (colours, icons, form fields,
 * price list, calculator, references) come from the site's `handwerk` config, so the demos
 * stay consistent with what we actually deliver as "Website Start" and "Website Business".
 */
export function HandwerkDemo({site, locale}: {site: DemoSite; locale: Locale}) {
  const config = site.handwerk;
  // Demos without their own Russian text show the German version on /ru, as an Austrian
  // business would have it. Only the TreeTech banner stays Russian.
  const lang: Locale = locale === 'ru' && !config.russian ? 'de' : locale;
  const copy = site.copy[lang];
  const text = config.copy[lang];
  const ui = chrome[lang];
  const labels = demoSiteLabels[locale];
  const theme = config.theme;
  const [sent, setSent] = useState(false);
  const otherLocales = routing.locales.filter((item) => item !== locale);
  const BrandIcon = handwerkIcons[config.icon];
  const SecondaryIcon = config.secondaryIcon === 'calendar' ? CalendarCheck : Camera;

  const style = {
    '--hw-primary': theme.primary,
    '--hw-accent': theme.accent,
    '--hw-accent-strong': theme.accentStrong,
    '--hw-on-dark': theme.onDark,
    '--hw-footer': theme.footer,
    '--hw-bg': theme.background,
    '--hw-text': theme.text,
    '--hw-muted': theme.muted,
    '--hw-border': theme.border,
    '--hw-chip': theme.chip
  } as HandwerkStyle;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  const input =
    'h-12 w-full rounded-[8px] border border-[var(--hw-border)] bg-white px-3 text-base text-[var(--hw-text)] outline-none focus:border-[var(--hw-primary)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--hw-primary)_20%,transparent)]';

  return (
    <div style={style} className="min-h-screen bg-[var(--hw-bg)] pb-[84px] text-[var(--hw-text)] md:pb-0">
      <div className="bg-[#1c2220] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-2.5 text-sm">
          <span>{labels.banner}</span>
          <Link href="/contact#audit-call" className="font-bold text-[#f3c431] underline-offset-4 hover:underline">
            {labels.bannerCta}
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[var(--hw-border)] bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5">
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[var(--hw-primary)] text-white">
              <BrandIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="truncate text-base font-extrabold uppercase tracking-wide text-[var(--hw-primary)] [font-stretch:105%] sm:text-lg">
              {site.brand}
            </span>
          </a>
          <nav className="hidden gap-6 text-[15px] font-semibold md:flex">
            <a href="#leistungen" className="hover:text-[var(--hw-accent)]">{copy.nav[0]}</a>
            {text.gallery ? (
              <a href="#referenzen" className="hover:text-[var(--hw-accent)]">{copy.nav[1]}</a>
            ) : null}
            <a href="#ablauf" className="hover:text-[var(--hw-accent)]">{copy.nav[2]}</a>
            <a href="#anfrage" className="hover:text-[var(--hw-accent)]">{copy.nav[3]}</a>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            {otherLocales.map((item) => (
              <Link
                key={item}
                href={`/portfolio/${site.slug}/site`}
                locale={item}
                aria-label={localeLabels[item]}
                className="hidden min-h-10 min-w-9 items-center justify-center rounded-[6px] text-sm font-bold text-[var(--hw-muted)] hover:bg-[var(--hw-bg)] sm:inline-flex"
              >
                {localeShortLabels[item]}
              </Link>
            ))}
            <a
              href="#anfrage"
              className="inline-flex min-h-11 items-center gap-2 rounded-[8px] bg-[var(--hw-accent)] px-4 text-[15px] font-bold text-white hover:bg-[var(--hw-accent-strong)]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden whitespace-nowrap sm:inline">{config.phone}</span>
              <span className="sm:hidden">{ui.call}</span>
            </a>
          </div>
        </div>
      </header>

      {text.emergency ? (
        <div className="border-b border-[var(--hw-border)] bg-[var(--hw-chip)]">
          <div className="mx-auto flex max-w-6xl items-start gap-3 px-5 py-3 text-[15px] sm:items-center">
            <Siren className="mt-0.5 h-5 w-5 shrink-0 text-[var(--hw-accent)] sm:mt-0" aria-hidden="true" />
            <p>
              <strong className="font-extrabold">{text.emergency.title}</strong>{' '}
              <span className="text-[var(--hw-muted)]">{text.emergency.text}</span>
            </p>
          </div>
        </div>
      ) : null}

      <section id="top" className="bg-[var(--hw-primary)] text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-20">
          <div>
            <p className="text-base font-bold text-[var(--hw-on-dark)]">{copy.eyebrow}</p>
            <h1 className="mt-3 text-balance text-[40px] leading-[1.05] sm:text-6xl">{copy.title}</h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">{copy.lead}</p>
            <div className="mt-7 grid gap-3 sm:flex">
              <a
                href="#anfrage"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[10px] bg-[var(--hw-accent)] px-6 text-lg font-bold text-white hover:bg-[var(--hw-accent-strong)]"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                {copy.primaryCta}
              </a>
              <a
                href="#anfrage"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[10px] border-2 border-white/70 px-6 text-lg font-bold text-white hover:bg-white/10"
              >
                <SecondaryIcon className="h-5 w-5" aria-hidden="true" />
                {copy.secondaryCta}
              </a>
            </div>
            {text.trust ? (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-semibold text-white/85">
                {text.trust.map((item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-[var(--hw-on-dark)]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <HeroAside aside={text.aside} stats={copy.stats} lang={lang} from={ui.from} />
        </div>
      </section>

      <section id="leistungen" className="py-14">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-[30px] leading-tight sm:text-4xl">{copy.servicesTitle}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {copy.services.map((service, index) => {
              const Icon = handwerkIcons[config.serviceIcons[index % config.serviceIcons.length]];
              return (
                <article key={service.title} className="rounded-[12px] border border-[var(--hw-border)] bg-white p-6">
                  <Icon className="h-7 w-7 text-[var(--hw-accent)]" aria-hidden="true" />
                  <h3 className="mt-3 text-xl font-bold">{service.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-[var(--hw-muted)]">{service.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {text.gallery ? (
        <section id="referenzen" className="pb-14">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="text-[30px] leading-tight sm:text-4xl">{text.gallery.title}</h2>
            <p className="mt-2 max-w-2xl text-lg text-[var(--hw-muted)]">{text.gallery.text}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {text.gallery.items.map((item, index) => (
                <li key={item.title} className="overflow-hidden rounded-[12px] border border-[var(--hw-border)] bg-white">
                  {/* Placeholder until the business sends its own photos. */}
                  <div
                    className="relative flex aspect-[4/3] flex-col items-center justify-center gap-3 border-b border-dashed border-[var(--hw-border)] bg-[var(--hw-chip)]"
                    aria-hidden="true"
                  >
                    {(() => {
                      const Icon = handwerkIcons[config.serviceIcons[index % config.serviceIcons.length]];
                      return <Icon className="h-12 w-12 text-[var(--hw-primary)] opacity-40" strokeWidth={1.5} />;
                    })()}
                    <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-[var(--hw-primary)]">
                      <Camera className="h-3.5 w-3.5" />
                      {text.gallery?.photoLabel}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-1 text-[15px] text-[var(--hw-muted)]">{item.meta}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="border-y border-[var(--hw-border)] bg-white py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2">
          <div>
            <h2 className="text-[30px] leading-tight sm:text-4xl">{copy.introTitle}</h2>
            <p className="mt-3 text-lg leading-relaxed text-[var(--hw-muted)]">{copy.introText}</p>
          </div>
          <div>
            <h2 className="flex items-center gap-2 text-2xl">
              <MapPin className="h-6 w-6 text-[var(--hw-accent)]" aria-hidden="true" />
              {ui.area}
            </h2>
            <p className="mt-2 text-[16px] text-[var(--hw-muted)]">{text.areaText}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {text.towns.map((town) => (
                <li key={town} className="rounded-full bg-[var(--hw-chip)] px-3 py-1.5 text-[15px] font-semibold">
                  {town}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="ablauf" className="py-14">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-[30px] leading-tight sm:text-4xl">{copy.processTitle}</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {copy.process.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[44px_1fr] gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--hw-primary)] text-lg font-extrabold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="pt-2 text-lg font-bold">{step.title}</h3>
                  <p className="mt-1 text-[16px] leading-relaxed text-[var(--hw-muted)]">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 rounded-[12px] border-2 border-dashed border-[var(--hw-border)] bg-white p-6">
            <p className="flex items-center gap-1 text-[var(--hw-accent)]" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((item) => (
                <Star key={item} className="h-5 w-5 fill-current" />
              ))}
            </p>
            <h2 className="mt-2 text-xl">{ui.reviews}</h2>
            <p className="mt-1 text-[16px] text-[var(--hw-muted)]">{copy.testimonial}</p>
          </div>
        </div>
      </section>

      <section id="anfrage" className="bg-[var(--hw-primary)] py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-[34px] leading-tight sm:text-5xl">{copy.contactTitle}</h2>
            <p className="mt-3 text-lg text-white/85">{copy.contactText}</p>
            <p className="mt-6 flex items-center gap-2 text-lg font-bold">
              <Phone className="h-5 w-5 text-[var(--hw-on-dark)]" aria-hidden="true" />
              {config.phone}
            </p>
            <p className="mt-2 flex items-center gap-2 text-white/80">
              <Clock className="h-5 w-5 text-[var(--hw-on-dark)]" aria-hidden="true" />
              {text.hours}
            </p>
          </div>
          <form onSubmit={onSubmit} className="grid gap-3 rounded-[14px] bg-white p-5 text-[var(--hw-text)] sm:grid-cols-2">
            {text.form.fields.map((field) => (
              <label key={field.label} className={`grid gap-1.5 text-sm font-bold ${field.wide ? 'sm:col-span-2' : ''}`}>
                {field.label}
                {field.type === 'textarea' ? (
                  <textarea rows={3} placeholder={field.placeholder} className={`${input} h-auto py-3`} />
                ) : field.type === 'select' ? (
                  <select className={input} defaultValue="">
                    <option value="" disabled>
                      {field.placeholder}
                    </option>
                    {field.options?.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    className={input}
                    type={field.type === 'date' ? 'date' : 'text'}
                    inputMode={field.type === 'tel' ? 'tel' : undefined}
                    placeholder={field.placeholder}
                    autoComplete="off"
                  />
                )}
              </label>
            ))}
            {text.form.photo ? (
              <label className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-[8px] border-2 border-dashed border-[var(--hw-border)] text-[15px] font-bold text-[var(--hw-primary)] sm:col-span-2">
                <Camera className="h-5 w-5" aria-hidden="true" />
                {text.form.photo}
                <input type="file" accept="image/*" className="sr-only" />
              </label>
            ) : null}
            <button
              type="submit"
              className="min-h-14 rounded-[10px] bg-[var(--hw-accent)] text-lg font-bold text-white hover:bg-[var(--hw-accent-strong)] sm:col-span-2"
            >
              {copy.contactButton}
            </button>
            {sent ? (
              <p role="status" className="flex gap-2 rounded-[8px] bg-[#eef6f1] p-3 text-[15px] font-semibold text-[#1f5a42] sm:col-span-2">
                <Check className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                {ui.demoSent}
              </p>
            ) : null}
          </form>
        </div>
      </section>

      <footer className="bg-[var(--hw-footer)] py-8 text-sm text-white/75">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between">
          <span>
            {site.brand}, {site.location}
          </span>
          <span className="flex gap-4">
            <span>{ui.imprint}</span>
            <span>{ui.privacy}</span>
            <Link href={`/portfolio/${site.slug}`} className="font-bold text-white hover:underline">
              {labels.backToCase}
            </Link>
          </span>
        </div>
      </footer>

      {/* The phone bar is the key feature we sell: always one tap to call. */}
      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[var(--hw-border)] bg-white p-3 md:hidden">
        <a href="#anfrage" className="flex min-h-14 items-center justify-center gap-2 rounded-[10px] bg-[var(--hw-accent)] text-base font-bold text-white">
          <Phone className="h-5 w-5" aria-hidden="true" />
          {ui.call}
        </a>
        <a
          href="#anfrage"
          className="flex min-h-14 items-center justify-center gap-2 rounded-[10px] border-2 border-[var(--hw-primary)] text-base font-bold text-[var(--hw-primary)]"
        >
          <SecondaryIcon className="h-5 w-5" aria-hidden="true" />
          {ui.request}
        </a>
      </nav>
    </div>
  );
}

function HeroAside({
  aside,
  stats,
  lang,
  from
}: {
  aside?: HandwerkAside;
  stats: {value: string; label: string}[];
  lang: Locale;
  from: string;
}) {
  if (aside?.type === 'prices') {
    return (
      <div className="rounded-[14px] bg-white/10 p-5">
        <p className="text-lg font-extrabold">{aside.title}</p>
        <ul className="mt-3 grid gap-3">
          {aside.items.map((item) => (
            <li key={item.label} className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-3 last:border-0 last:pb-0">
              <span className="text-[16px] text-white/85">{item.label}</span>
              <span className="whitespace-nowrap text-xl font-extrabold">
                {from} {euro(item.price, lang)}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-white/70">{aside.note}</p>
      </div>
    );
  }

  if (aside?.type === 'calculator') {
    return <CalculatorAside aside={aside} lang={lang} />;
  }

  return (
    <ul className="grid gap-3 rounded-[14px] bg-white/10 p-5">
      {stats.map((stat) => (
        <li key={stat.label} className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-3 last:border-0 last:pb-0">
          <span className="text-2xl font-extrabold">{stat.value}</span>
          <span className="text-right text-[15px] text-white/80">{stat.label}</span>
        </li>
      ))}
    </ul>
  );
}

function CalculatorAside({aside, lang}: {aside: Extract<HandwerkAside, {type: 'calculator'}>; lang: Locale}) {
  const [area, setArea] = useState(aside.defaultValue);
  const low = Math.round((area * aside.rateLow) / 10) * 10;
  const high = Math.round((area * aside.rateHigh) / 10) * 10;

  return (
    <div className="rounded-[14px] bg-white p-5 text-[var(--hw-text)]">
      <p className="flex items-center gap-2 text-lg font-extrabold">
        <Calculator className="h-5 w-5 text-[var(--hw-accent)]" aria-hidden="true" />
        {aside.title}
      </p>
      <label className="mt-4 grid gap-2 text-[15px] font-bold">
        <span className="flex justify-between">
          {aside.label}
          <span className="text-[var(--hw-primary)]">
            {area} {aside.unit}
          </span>
        </span>
        <input
          type="range"
          min={aside.min}
          max={aside.max}
          step={aside.step}
          value={area}
          onChange={(event) => setArea(Number(event.target.value))}
          className="w-full accent-[var(--hw-accent)]"
        />
      </label>
      <div className="mt-4 rounded-[10px] bg-[var(--hw-chip)] p-4">
        <p className="text-sm font-semibold text-[var(--hw-muted)]">{aside.resultLabel}</p>
        <p className="mt-1 text-2xl font-extrabold text-[var(--hw-primary)]" aria-live="polite">
          {euro(low, lang)} – {euro(high, lang)}
        </p>
      </div>
      <p className="mt-3 text-sm text-[var(--hw-muted)]">{aside.note}</p>
    </div>
  );
}
