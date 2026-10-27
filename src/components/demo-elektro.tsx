'use client';

import {Camera, Check, Clock, MapPin, Phone, ShieldCheck, Star, Wrench, Zap} from 'lucide-react';
import {type FormEvent, useState} from 'react';

import type {DemoSite} from '@/content/demo-sites';
import {demoSiteLabels} from '@/content/demo-sites';
import {Link} from '@/i18n/navigation';
import {localeLabels, localeShortLabels, routing, type Locale} from '@/i18n/routing';

/** Fictional phone number used only inside the example site. */
const demoPhone = '02236 000 000';

const extra = {
  de: {
    area: 'Einsatzgebiet',
    areaText: 'Wir sind schnell bei Ihnen in',
    towns: ['Mödling', 'Brunn am Gebirge', 'Maria Enzersdorf', 'Perchtoldsdorf', 'Guntramsdorf', 'Baden', 'Wien Liesing'],
    reviews: 'Bewertungen',
    form: {name: 'Name', phone: 'Telefon', address: 'Adresse', problem: 'Was ist los?', photo: 'Foto hinzufügen', placeholder: 'z. B. Sicherung fliegt im Bad immer raus'},
    demoSent: 'Das ist eine Beispiel-Website. Auf Ihrer Seite landet diese Anfrage direkt bei Ihnen per E-Mail oder WhatsApp.',
    call: 'Anrufen',
    request: 'Anfrage',
    hours: 'Mo bis Fr 7 bis 19 Uhr',
    imprint: 'Impressum',
    privacy: 'Datenschutz'
  },
  en: {
    area: 'Service area',
    areaText: 'We are with you quickly in',
    towns: ['Mödling', 'Brunn am Gebirge', 'Maria Enzersdorf', 'Perchtoldsdorf', 'Guntramsdorf', 'Baden', 'Vienna Liesing'],
    reviews: 'Reviews',
    form: {name: 'Name', phone: 'Phone', address: 'Address', problem: 'What is wrong?', photo: 'Add photo', placeholder: 'e.g. the fuse in the bathroom keeps tripping'},
    demoSent: 'This is an example website. On your site this request goes straight to you by email or WhatsApp.',
    call: 'Call',
    request: 'Request',
    hours: 'Mon to Fri 7am to 7pm',
    imprint: 'Legal notice',
    privacy: 'Privacy'
  },
  ru: {
    area: 'Район выезда',
    areaText: 'Быстро приедем в',
    towns: ['Мёдлинг', 'Брунн-ам-Гебирге', 'Мария-Энцерсдорф', 'Перхтольдсдорф', 'Гунтрамсдорф', 'Баден', 'Вена-Лизинг'],
    reviews: 'Отзывы',
    form: {name: 'Имя', phone: 'Телефон', address: 'Адрес', problem: 'Что случилось?', photo: 'Добавить фото', placeholder: 'например, в ванной всё время выбивает автомат'},
    demoSent: 'Это пример сайта. На вашем сайте такая заявка сразу придёт вам на e-mail или в WhatsApp.',
    call: 'Позвонить',
    request: 'Заявка',
    hours: 'пн–пт 7:00–19:00',
    imprint: 'Impressum',
    privacy: 'Datenschutz'
  }
} satisfies Record<Locale, unknown>;

const serviceIcons = [Zap, Wrench, ShieldCheck, Star];

export function ElektroDemo({site, locale}: {site: DemoSite; locale: Locale}) {
  const copy = site.copy[locale];
  const text = extra[locale];
  const labels = demoSiteLabels[locale];
  const [sent, setSent] = useState(false);
  const otherLocales = routing.locales.filter((item) => item !== locale);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  const input =
    'h-12 w-full rounded-[8px] border border-[#cfd5dd] bg-white px-3 text-base text-[#14202e] outline-none focus:border-[#14324f] focus:ring-2 focus:ring-[#14324f]/20';

  return (
    <div className="min-h-screen bg-[#f5f6f8] pb-[84px] text-[#14202e] md:pb-0">
      <div className="bg-[#1c2220] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-2.5 text-sm">
          <span>{labels.banner}</span>
          <Link href="/contact#audit-call" className="font-bold text-[#f3c431] underline-offset-4 hover:underline">
            {labels.bannerCta}
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#e3e7ec] bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#14324f] text-white">
              <Zap className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="whitespace-nowrap text-base font-extrabold uppercase tracking-wide text-[#14324f] [font-stretch:105%] sm:text-lg">{site.brand}</span>
          </a>
          <nav className="hidden gap-6 text-[15px] font-semibold md:flex">
            <a href="#leistungen" className="hover:text-[#e8590c]">{copy.nav[0]}</a>
            <a href="#ablauf" className="hover:text-[#e8590c]">{copy.nav[2]}</a>
            <a href="#anfrage" className="hover:text-[#e8590c]">{copy.nav[3]}</a>
          </nav>
          <div className="flex items-center gap-2">
            {otherLocales.map((item) => (
              <Link
                key={item}
                href={`/portfolio/${site.slug}/site`}
                locale={item}
                aria-label={localeLabels[item]}
                className="hidden min-h-10 min-w-9 items-center justify-center rounded-[6px] text-sm font-bold text-[#556170] hover:bg-[#f5f6f8] sm:inline-flex"
              >
                {localeShortLabels[item]}
              </Link>
            ))}
            <a
              href="#anfrage"
              className="inline-flex min-h-11 items-center gap-2 rounded-[8px] bg-[#e8590c] px-4 text-[15px] font-bold text-white hover:bg-[#cf4f0a]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{demoPhone}</span>
              <span className="sm:hidden">{text.call}</span>
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="bg-[#14324f] text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-20">
          <div>
            <p className="text-base font-bold text-[#ffb37a]">{copy.eyebrow}</p>
            <h1 className="mt-3 text-balance text-[40px] leading-[1.05] sm:text-6xl">{copy.title}</h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">{copy.lead}</p>
            <div className="mt-7 grid gap-3 sm:flex">
              <a
                href="#anfrage"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[10px] bg-[#e8590c] px-6 text-lg font-bold text-white hover:bg-[#cf4f0a]"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                {copy.primaryCta}
              </a>
              <a
                href="#anfrage"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[10px] border-2 border-white/70 px-6 text-lg font-bold text-white hover:bg-white/10"
              >
                <Camera className="h-5 w-5" aria-hidden="true" />
                {copy.secondaryCta}
              </a>
            </div>
          </div>
          <ul className="grid gap-3 rounded-[14px] bg-white/10 p-5">
            {copy.stats.map((stat) => (
              <li key={stat.label} className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-3 last:border-0 last:pb-0">
                <span className="text-2xl font-extrabold">{stat.value}</span>
                <span className="text-right text-[15px] text-white/80">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="leistungen" className="py-14">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-[30px] leading-tight sm:text-4xl">{copy.servicesTitle}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {copy.services.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              return (
                <article key={service.title} className="rounded-[12px] border border-[#e3e7ec] bg-white p-6">
                  <Icon className="h-7 w-7 text-[#e8590c]" aria-hidden="true" />
                  <h3 className="mt-3 text-xl font-bold">{service.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-[#556170]">{service.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e3e7ec] bg-white py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2">
          <div>
            <h2 className="text-[30px] leading-tight sm:text-4xl">{copy.introTitle}</h2>
            <p className="mt-3 text-lg leading-relaxed text-[#556170]">{copy.introText}</p>
          </div>
          <div>
            <h2 className="flex items-center gap-2 text-2xl">
              <MapPin className="h-6 w-6 text-[#e8590c]" aria-hidden="true" />
              {text.area}
            </h2>
            <p className="mt-2 text-[16px] text-[#556170]">{text.areaText}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {text.towns.map((town) => (
                <li key={town} className="rounded-full bg-[#eef1f5] px-3 py-1.5 text-[15px] font-semibold">
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
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#14324f] text-lg font-extrabold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="pt-2 text-lg font-bold">{step.title}</h3>
                  <p className="mt-1 text-[16px] leading-relaxed text-[#556170]">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 rounded-[12px] border-2 border-dashed border-[#cfd5dd] bg-white p-6">
            <p className="flex items-center gap-1 text-[#e8590c]" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((item) => (
                <Star key={item} className="h-5 w-5 fill-current" />
              ))}
            </p>
            <h2 className="mt-2 text-xl">{text.reviews}</h2>
            <p className="mt-1 text-[16px] text-[#556170]">{copy.testimonial}</p>
          </div>
        </div>
      </section>

      <section id="anfrage" className="bg-[#14324f] py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-[34px] leading-tight sm:text-5xl">{copy.contactTitle}</h2>
            <p className="mt-3 text-lg text-white/85">{copy.contactText}</p>
            <p className="mt-6 flex items-center gap-2 text-lg font-bold">
              <Phone className="h-5 w-5 text-[#ffb37a]" aria-hidden="true" />
              {demoPhone}
            </p>
            <p className="mt-2 flex items-center gap-2 text-white/80">
              <Clock className="h-5 w-5 text-[#ffb37a]" aria-hidden="true" />
              {text.hours}
            </p>
          </div>
          <form onSubmit={onSubmit} className="grid gap-3 rounded-[14px] bg-white p-5 text-[#14202e]">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-bold">
                {text.form.name}
                <input className={input} autoComplete="off" />
              </label>
              <label className="grid gap-1.5 text-sm font-bold">
                {text.form.phone}
                <input className={input} inputMode="tel" autoComplete="off" />
              </label>
            </div>
            <label className="grid gap-1.5 text-sm font-bold">
              {text.form.address}
              <input className={input} autoComplete="off" />
            </label>
            <label className="grid gap-1.5 text-sm font-bold">
              {text.form.problem}
              <textarea rows={3} placeholder={text.form.placeholder} className={`${input} h-auto py-3`} />
            </label>
            <label className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-[8px] border-2 border-dashed border-[#cfd5dd] text-[15px] font-bold text-[#14324f]">
              <Camera className="h-5 w-5" aria-hidden="true" />
              {text.form.photo}
              <input type="file" accept="image/*" className="sr-only" />
            </label>
            <button type="submit" className="min-h-14 rounded-[10px] bg-[#e8590c] text-lg font-bold text-white hover:bg-[#cf4f0a]">
              {copy.contactButton}
            </button>
            {sent ? (
              <p role="status" className="flex gap-2 rounded-[8px] bg-[#eef6f1] p-3 text-[15px] font-semibold text-[#1f5a42]">
                <Check className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                {text.demoSent}
              </p>
            ) : null}
          </form>
        </div>
      </section>

      <footer className="bg-[#0f2338] py-8 text-sm text-white/75">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between">
          <span>
            {site.brand}, {site.location}
          </span>
          <span className="flex gap-4">
            <span>{text.imprint}</span>
            <span>{text.privacy}</span>
            <Link href={`/portfolio/${site.slug}`} className="font-bold text-white hover:underline">
              {labels.backToCase}
            </Link>
          </span>
        </div>
      </footer>

      {/* The phone bar is the key feature we sell: always one tap to call. */}
      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-[#e3e7ec] bg-white p-3 md:hidden">
        <a href="#anfrage" className="flex min-h-14 items-center justify-center gap-2 rounded-[10px] bg-[#e8590c] text-base font-bold text-white">
          <Phone className="h-5 w-5" aria-hidden="true" />
          {text.call}
        </a>
        <a href="#anfrage" className="flex min-h-14 items-center justify-center gap-2 rounded-[10px] border-2 border-[#14324f] text-base font-bold text-[#14324f]">
          <Camera className="h-5 w-5" aria-hidden="true" />
          {text.request}
        </a>
      </nav>
    </div>
  );
}
