import {Check} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {
  formatPackagePrice,
  founderOffer,
  formatEur,
  hourlyRate,
  packages,
  paymentTerms,
  vatNote,
  type PackageCategory
} from '@/content/pricing';
import {phoneHref} from '@/content/contact-links';
import {siteContent} from '@/content/site';
import {Link} from '@/i18n/navigation';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string}>;
};

type ServicesCopy = {
  title: string;
  lead: string;
  categories: Record<PackageCategory, {title: string; lead: string}>;
  founder: string;
  minTerm: string;
  months: string;
  tradesTitle: string;
  trades: Array<{href: string; label: string}>;
  extrasTitle: string;
  hourly: string;
  ctaTitle: string;
  ctaLead: string;
  cta: string;
  call: string;
};

const copy: Record<Locale, ServicesCopy> = {
  de: {
    title: 'Leistungen und Preise',
    lead: 'Alle Pakete mit Fixpreis. Sie wissen vorher, was es kostet, und zahlen für die Website erst, wenn Ihnen die Vorschau gefällt.',
    categories: {
      websites: {title: 'Websites', lead: 'Für Betriebe, die gefunden und angerufen werden wollen.'},
      care: {title: 'Pflege', lead: 'Wir halten Ihre Seite aktuell, sicher und schnell. Änderungen schicken Sie per WhatsApp.'},
      automation: {title: 'Anfragen und Automatisierung', lead: 'Damit keine Anfrage liegen bleibt, auch wenn Sie auf der Baustelle sind.'},
      software: {title: 'Eigene Software', lead: 'Wenn Standardlösungen nicht passen.'}
    },
    founder: 'Für die ersten {slots} Betriebe: {price}',
    minTerm: 'Mindestlaufzeit',
    months: 'Monate',
    tradesTitle: 'Für Ihr Gewerk',
    trades: [
      {href: '/websites-fuer-handwerker', label: 'Websites für Handwerker'},
      {href: '/websites-fuer-kfz-werkstaetten', label: 'Websites für Kfz-Werkstätten'}
    ],
    extrasTitle: 'Gut zu wissen',
    hourly: 'Arbeiten außerhalb der Pakete nur nach Absprache, {hourly} pro Stunde.',
    ctaTitle: 'Nicht sicher, welches Paket passt?',
    ctaLead: 'Fordern Sie die kostenlose Vorschau an. Im Gespräch danach sagen wir Ihnen ehrlich, was Sie brauchen und was nicht.',
    cta: 'Kostenlose Vorschau anfordern',
    call: 'Anrufen'
  },
  en: {
    title: 'Services and prices',
    lead: 'Every package has a fixed price. You know the cost upfront and only pay for the website once you like the preview.',
    categories: {
      websites: {title: 'Websites', lead: 'For businesses that want to be found and called.'},
      care: {title: 'Care', lead: 'We keep your site up to date, secure and fast. Send changes via WhatsApp.'},
      automation: {title: 'Inquiries and automation', lead: 'So no inquiry gets lost, even when you are on site.'},
      software: {title: 'Custom software', lead: 'When off-the-shelf tools do not fit.'}
    },
    founder: 'First {slots} businesses: {price}',
    minTerm: 'minimum term',
    months: 'months',
    tradesTitle: 'For your trade',
    trades: [
      {href: '/websites-fuer-handwerker', label: 'Websites for tradespeople'},
      {href: '/websites-fuer-kfz-werkstaetten', label: 'Websites for car workshops'}
    ],
    extrasTitle: 'Good to know',
    hourly: 'Work outside the packages only after agreement, {hourly} per hour.',
    ctaTitle: 'Not sure which package fits?',
    ctaLead: 'Request the free preview. In the call afterwards we tell you honestly what you need and what you do not.',
    cta: 'Get my free preview',
    call: 'Call'
  },
  ru: {
    title: 'Услуги и цены',
    lead: 'У каждого пакета фиксированная цена. Вы заранее знаете стоимость и платите за сайт, только если понравилось превью.',
    categories: {
      websites: {title: 'Сайты', lead: 'Для бизнеса, которому нужно, чтобы его находили и звонили.'},
      care: {title: 'Поддержка', lead: 'Держим сайт актуальным, защищённым и быстрым. Правки присылаете в WhatsApp.'},
      automation: {title: 'Заявки и автоматизация', lead: 'Чтобы ни одна заявка не потерялась, даже когда вы на объекте.'},
      software: {title: 'Собственное ПО', lead: 'Когда готовые решения не подходят.'}
    },
    founder: 'Первым {slots} бизнесам: {price}',
    minTerm: 'минимальный срок',
    months: 'мес.',
    tradesTitle: 'Для вашей сферы',
    trades: [
      {href: '/websites-fuer-handwerker', label: 'Сайты для мастеров'},
      {href: '/websites-fuer-kfz-werkstaetten', label: 'Сайты для автосервисов'}
    ],
    extrasTitle: 'Полезно знать',
    hourly: 'Работы вне пакетов только по договорённости, {hourly} в час.',
    ctaTitle: 'Не уверены, какой пакет подходит?',
    ctaLead: 'Запросите бесплатное превью. На разговоре после этого честно скажем, что вам нужно, а что нет.',
    cta: 'Получить бесплатное превью',
    call: 'Позвонить'
  }
};

const categoryOrder: PackageCategory[] = ['websites', 'care', 'automation', 'software'];

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const rawLocale = (await params).locale;

  if (!hasLocale(routing.locales, rawLocale)) {
    return {};
  }

  const content = siteContent[rawLocale];

  return createPageMetadata({
    locale: rawLocale,
    path: '/services',
    title: content.metadata.servicesTitle,
    description: content.metadata.servicesDescription
  });
}

export default async function ServicesPage({params}: PageProps) {
  const rawLocale = (await params).locale;

  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  setRequestLocale(locale);
  const text = copy[locale];

  return (
    <>
      <section className="border-b-2 border-foreground py-12 sm:py-16">
        <Container>
          <h1 className="max-w-4xl text-balance text-[42px] leading-[1.02] text-foreground sm:text-6xl">{text.title}</h1>
          <p className="mt-4 max-w-[38em] text-pretty text-lg leading-relaxed text-muted">{text.lead}</p>
          <div className="mt-6 flex flex-wrap gap-2" aria-label={text.tradesTitle}>
            {text.trades.map((trade) => (
              <Link
                key={trade.href}
                href={trade.href}
                className="inline-flex min-h-11 items-center rounded-full border-2 border-foreground bg-surface px-4 text-[15px] font-bold text-foreground transition hover:bg-background"
              >
                {trade.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {categoryOrder.map((category, sectionIndex) => {
        const items = packages.filter((pkg) => pkg.category === category);

        return (
          <section
            key={category}
            id={category}
            className={sectionIndex % 2 === 0 ? 'bg-surface py-12 sm:py-16' : 'py-12 sm:py-16'}
          >
            <Container>
              <h2 className="text-[30px] leading-[1.08] text-foreground sm:text-[44px]">{text.categories[category].title}</h2>
              <p className="mt-2 max-w-[38em] text-[17px] text-muted">{text.categories[category].lead}</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((pkg) => {
                  const featured = pkg.id === founderOffer.packageId;

                  return (
                    <article
                      key={pkg.id}
                      className={
                        featured
                          ? 'flex flex-col rounded-[14px] border-2 border-accent bg-accent p-6 text-white'
                          : 'flex flex-col rounded-[14px] border-2 border-foreground bg-surface p-6 text-foreground'
                      }
                    >
                      <h3 className="text-lg font-bold">{pkg.name}</h3>
                      <p className="mt-2 text-[28px] font-extrabold leading-tight [font-stretch:115%]">
                        {formatPackagePrice(pkg, locale)}
                      </p>
                      <p className={featured ? 'mt-1 text-sm text-white/80' : 'mt-1 text-sm text-muted'}>
                        {[
                          pkg.delivery?.[locale],
                          pkg.minTermMonths ? `${text.minTerm} ${pkg.minTermMonths} ${text.months}` : ''
                        ]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                      <p className={featured ? 'mt-3 text-[15px] text-white/90' : 'mt-3 text-[15px] text-muted'}>
                        {pkg.tagline[locale]}
                      </p>
                      <ul className="mt-4 grid flex-1 content-start gap-2">
                        {pkg.includes[locale].map((item) => (
                          <li key={item} className="grid grid-cols-[20px_1fr] gap-2 text-[15px] leading-snug">
                            <Check
                              className={featured ? 'mt-0.5 h-4 w-4 text-white' : 'mt-0.5 h-4 w-4 text-accent'}
                              strokeWidth={2.6}
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                      {featured ? (
                        <span className="mt-5 self-start rounded-[6px] bg-[var(--signal)] px-2.5 py-1.5 text-sm font-bold text-foreground">
                          {text.founder
                            .replace('{slots}', String(founderOffer.slots))
                            .replace('{price}', formatEur(founderOffer.price, locale))}
                        </span>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </Container>
          </section>
        );
      })}

      <section className="border-t-2 border-foreground bg-[var(--signal)] py-10">
        <Container>
          <h2 className="text-2xl text-foreground">{text.extrasTitle}</h2>
          <ul className="mt-4 grid gap-2 text-[16px] text-foreground md:grid-cols-3 md:gap-6">
            <li>{vatNote[locale]}</li>
            <li>{paymentTerms[locale]}</li>
            <li>{text.hourly.replace('{hourly}', formatEur(hourlyRate, locale))}</li>
          </ul>
        </Container>
      </section>

      <section className="border-t-2 border-foreground bg-accent py-14 text-white">
        <Container>
          <h2 className="max-w-3xl text-balance text-[30px] leading-[1.08] sm:text-[44px]">{text.ctaTitle}</h2>
          <p className="mt-3 max-w-[38em] text-[17px] text-white/85">{text.ctaLead}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href="/contact#audit-call"
              variant="signal"
              trackingEvent="cta_preview_services"
            >
              {text.cta}
            </ButtonLink>
            <ButtonLink
              href={phoneHref}
              variant="onDark"
              trackingEvent="phone_click"
            >
              {text.call}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
