import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import type {ReactNode} from 'react';

import {homeHandwerk} from '@/content/home-handwerk';
import {formatEur, founderOffer, getPackage, hourlyRate, type PackageId} from '@/content/pricing';
import {phoneHref, siteConfig, siteContent, whatsappHref} from '@/content/site';
import {teamMembers} from '@/content/team';
import {Link} from '@/i18n/navigation';
import {localeLabels, localeShortLabels, routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

import s from './home.module.css';

type PageProps = {
  params: Promise<{locale: string}>;
};

const icon = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true
};

const phonePath =
  'M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z';

const PhoneIcon = () => (
  <svg {...icon}>
    <path d={phonePath} />
  </svg>
);
const ChatIcon = () => (
  <svg {...icon}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);
const CheckIcon = () => (
  <svg {...icon} strokeWidth={2.4}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const ChevronIcon = () => (
  <svg {...icon}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const painIcons: ReactNode[] = [
  <svg key="star" {...icon}>
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
  </svg>,
  <svg key="missed" {...icon}>
    <path d={phonePath} />
    <path d="M16 2l6 6M22 2l-6 6" />
  </svg>,
  <svg key="old" {...icon}>
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M9 7l6 6M15 7l-6 6M11 18h2" />
  </svg>
];

const priceCards: PackageId[] = ['websiteStart', 'websiteBusiness', 'websiteAbo', 'pflege'];

const footerCopy: Record<Locale, {tagline: string}> = {
  de: {
    tagline: 'TreeTech, Websites für Handwerk und Werkstätten in Wien und Niederösterreich'
  },
  en: {
    tagline: 'TreeTech, websites for trades and workshops in Vienna and Lower Austria'
  },
  ru: {
    tagline: 'TreeTech, сайты для мастеров и автосервисов в Вене и Нижней Австрии'
  }
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const rawLocale = (await params).locale;

  if (!hasLocale(routing.locales, rawLocale)) {
    return {};
  }

  const locale = rawLocale;
  const content = siteContent[locale];

  return createPageMetadata({
    locale,
    title: content.metadata.homeTitle,
    description: content.metadata.homeDescription
  });
}

export default async function HomePage({params}: PageProps) {
  const rawLocale = (await params).locale;

  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  setRequestLocale(locale);
  const nav = await getTranslations('nav');
  const copy = homeHandwerk[locale];
  const eur = (amount: number) => formatEur(amount, locale);
  const fill = (text: string) =>
    text
      .replace('{start}', eur(getPackage('websiteStart').oneTime ?? 0))
      .replace('{care}', `${eur(getPackage('pflege').monthly ?? 0)} ${copy.prices.perMonth}`)
      .replace('{hourly}', eur(hourlyRate))
      .replace('{founder}', eur(founderOffer.price))
      .replace('{setup}', eur(getPackage('websiteAbo').oneTime ?? 0));
  const whatsapp = whatsappHref(copy.whatsappMessage);
  const otherLocales = routing.locales.filter((item) => item !== locale);
  const previewHref = '/contact#audit-call';

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {'@type': 'Answer', text: fill(item.a)}
    }))
  };

  const contactButtons = (withIcons: boolean) => (
    <div className={s.ctas2}>
      <a className={`${s.btn} ${s.btnLine}`} href={phoneHref} data-track="phone_click">
        {withIcons ? <PhoneIcon /> : null}
        {copy.hero.call}
      </a>
      <a
        className={`${s.btn} ${s.btnLine}`}
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        data-track="whatsapp_click"
      >
        {withIcons ? <ChatIcon /> : null}
        {copy.hero.whatsapp}
      </a>
    </div>
  );

  return (
    <div className={s.tt}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd)}} />

      <header className={`${s.wrap} ${s.top}`}>
        <Link className={s.logo} href="/">
          <i aria-hidden="true" />
          TreeTech
        </Link>
        <nav className={s.nav} aria-label="Main navigation">
          <a href="#ablauf">{copy.nav.process}</a>
          <a href="#preise">{copy.nav.prices}</a>
          <Link href="/portfolio">{copy.nav.examples}</Link>
          <a href="#fragen">{copy.nav.faq}</a>
        </nav>
        <div className={s.topRight}>
          <div className={s.langs} aria-label={nav('language')}>
            {otherLocales.map((item) => (
              <Link key={item} href="/" locale={item} aria-label={`${nav('language')}: ${localeLabels[item]}`}>
                {localeShortLabels[item]}
              </Link>
            ))}
          </div>
          <a
            className={s.callchip}
            href={phoneHref}
            data-track="phone_click"
            aria-label={`${copy.hero.call}: ${siteConfig.phone}`}
          >
            <PhoneIcon />
            <span className={s.label}>{copy.hero.call}</span>
            <span className={s.num}>&nbsp;{siteConfig.phone}</span>
          </a>
        </div>
      </header>

      <section className={`${s.wrap} ${s.hero}`}>
        <div>
          <h1 className={s.display}>{copy.hero.title}</h1>
          <p className={s.sub}>{fill(copy.hero.sub)}</p>
          <div className={s.ctas}>
            <Link className={`${s.btn} ${s.btnMain}`} href={previewHref} data-track="cta_preview_hero">
              {copy.hero.cta}
            </Link>
            {contactButtons(true)}
          </div>
          <p className={s.micro}>{copy.hero.micro}</p>
        </div>

        <figure className={s.stage} aria-label={copy.preview.label} style={{margin: 0}}>
          <div className={s.phonewrap}>
            {/* Invented example business, labelled as an example below. */}
            <div className={s.phone} aria-hidden="true">
              <div className={s.phBar}>
                <span className={s.phLogo}>ELEKTRO HUBER</span>
                <span className={s.phCall}>Anrufen</span>
              </div>
              <div className={s.phHero}>
                <b>Ihr Elektriker in Mödling und Umgebung</b>
                <span>Störungen, Umbau, E-Check und Photovoltaik. Meisterbetrieb seit 1998.</span>
                <span className={s.phBtn}>Anfrage mit Foto senden</span>
              </div>
              <div className={s.phList}>
                <div className={s.phItem}>Störungsdienst <em>heute noch</em></div>
                <div className={s.phItem}>E-Check für Vermieter <em>ab 1 Tag</em></div>
                <div className={s.phItem}>Wallbox und PV <em>Beratung</em></div>
                <div className={s.phItem}>Einsatzgebiet <em>Mödling, Baden</em></div>
              </div>
            </div>
            <div className={s.stamp} aria-hidden="true">
              <b>
                {copy.preview.stampLine1}
                <br />
                {copy.preview.stampLine2}
              </b>
              <small>{copy.preview.stampSmall}</small>
            </div>
          </div>
          <figcaption className={s.caption}>{copy.preview.caption}</figcaption>
        </figure>
      </section>

      <section className={`${s.white} ${s.sec} ${s.rule}`}>
        <div className={`${s.wrap} ${s.two}`}>
          <div>
            <h2 className={s.h2}>{copy.pains.title}</h2>
            <p className={s.lead}>{copy.pains.lead}</p>
          </div>
          <div className={s.pains}>
            {copy.pains.items.map((item, index) => (
              <div className={s.pain} key={item.title}>
                {painIcons[index]}
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.sec} id="ablauf">
        <div className={s.wrap}>
          <h2 className={s.h2}>{copy.steps.title}</h2>
          <p className={s.lead}>{copy.steps.lead}</p>
          <ol className={s.steps}>
            {copy.steps.items.map((item, index) => (
              <li className={s.step} key={item.title}>
                <span className={s.n}>{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${s.white} ${s.sec} ${s.rule}`}>
        <div className={`${s.wrap} ${s.two}`}>
          <div>
            <h2 className={s.h2}>{copy.features.title}</h2>
            <p className={s.trades}>
              {copy.features.tradesPrefix} <b>{copy.features.trades}</b>
            </p>
          </div>
          <ul className={s.checks}>
            {copy.features.items.map((item) => (
              <li key={item}>
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={s.sec} id="preise">
        <div className={s.wrap}>
          <h2 className={s.h2}>{copy.prices.title}</h2>
          <div className={s.prices}>
            {priceCards.map((id) => {
              const pkg = getPackage(id);
              const monthlyOnly = pkg.monthly !== undefined;
              const amount = monthlyOnly ? pkg.monthly ?? 0 : pkg.oneTime ?? 0;
              const featured = id === founderOffer.packageId;

              return (
                <article key={id} className={`${s.price} ${featured ? s.priceTop : ''}`}>
                  <h3>{pkg.name}</h3>
                  <p className={s.amt}>
                    {eur(amount)}
                    {monthlyOnly ? <span className={s.per}> {copy.prices.perMonth}</span> : null}
                  </p>
                  <p className={s.desc}>{fill(copy.prices.cards[id as keyof typeof copy.prices.cards])}</p>
                  {featured ? <span className={s.tag}>{fill(copy.prices.founderTag)}</span> : null}
                </article>
              );
            })}
          </div>
          <p className={s.swipe}>{copy.prices.swipe}</p>
          <p className={s.pnote}>{fill(copy.prices.note)}</p>
          <Link className={s.textLink} href="/services">
            {copy.prices.all}
          </Link>
        </div>
      </section>

      <section className={`${s.promise} ${s.sec}`}>
        <div className={s.wrap}>
          <h2 className={s.h2}>{copy.promise.title}</h2>
          <div className={s.promises}>
            {copy.promise.items.map((item) => (
              <div className={s.prom} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shown only once real names and photos are in src/content/team.ts. */}
      {teamMembers.length > 0 ? (
        <section className={`${s.white} ${s.sec}`}>
          <div className={s.wrap}>
            <h2 className={s.h2}>{copy.team.title}</h2>
            <p className={s.lead}>{copy.team.lead}</p>
            <div className={s.team}>
              {teamMembers.map((member) => (
                <article className={s.member} key={member.name}>
                  <Image className={s.avatar} src={member.photo} alt={member.name} width={144} height={144} />
                  <div>
                    <h3>{member.name}</h3>
                    <p className={s.role}>{member.role[locale]}</p>
                    <p className={s.bio}>{member.bio[locale]}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className={`${s.sec} ${teamMembers.length > 0 ? '' : s.rule}`} id="fragen">
        <div className={`${s.wrap} ${s.two}`}>
          <h2 className={s.h2}>{copy.faq.title}</h2>
          <div className={s.faq}>
            {copy.faq.items.map((item, index) => (
              <details key={item.q} open={index === 0}>
                <summary>
                  {item.q}
                  <ChevronIcon />
                </summary>
                <p>{fill(item.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.final} ${s.sec}`} id="vorschau">
        <div className={s.wrap}>
          <h2 className={s.h2}>{copy.final.title}</h2>
          <p>{copy.final.lead}</p>
          <div className={s.ctas}>
            <Link className={`${s.btn} ${s.btnMain}`} href={previewHref} data-track="cta_preview_final">
              {copy.hero.cta}
            </Link>
            {contactButtons(false)}
          </div>
          <p className={s.micro}>{copy.final.micro}</p>
        </div>
      </section>

      <footer className={`${s.wrap} ${s.foot}`}>
        <div>
          <span>{footerCopy[locale].tagline}</span>
          <br />
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
        <nav aria-label="Footer">
          <Link href="/services">{nav('services')}</Link>
          <Link href="/portfolio">{nav('portfolio')}</Link>
          <Link href="/about">{nav('about')}</Link>
          <Link href="/contact">{nav('contact')}</Link>
          <Link href="/impressum">{nav('imprint')}</Link>
          <Link href="/datenschutz">{nav('privacy')}</Link>
          <Link href="/agb">{nav('terms')}</Link>
        </nav>
      </footer>
    </div>
  );
}
