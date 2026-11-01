import {CheckCircle2} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';

import {FadeIn} from '@/components/motion/fade-in';
import {PortfolioCard} from '@/components/portfolio-card';
import {Container} from '@/components/ui/container';
import {formatPackagePrice, getPackage, type PackageId} from '@/content/pricing';
import {portfolioProjects, siteContent} from '@/content/site';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string}>;
};

const portfolioBrief = {
  de: {
    title: 'Gut zu wissen',
    items: [
      'Das sind Beispiel-Websites, die wir als Muster gebaut haben. Die Betriebe sind erfunden.',
      'Jede Seite funktioniert wie eine echte: Knöpfe, Formulare und Handy-Ansicht.',
      'Ihre eigene Vorschau bauen wir kostenlos, mit Ihrem Namen, Ihren Leistungen und Ihrem Ort.'
    ]
  },
  en: {
    title: 'Good to know',
    items: [
      'These are example websites we built as samples. The businesses are made up.',
      'Every site works like a real one: buttons, forms and mobile view.',
      'We build your own preview for free, with your name, your services and your town.'
    ]
  },
  ru: {
    title: 'Полезно знать',
    items: [
      'Это примеры сайтов, которые мы сделали как образцы. Фирмы вымышленные.',
      'Каждый сайт работает как настоящий: кнопки, формы и мобильная версия.',
      'Ваше собственное превью мы делаем бесплатно, с вашим названием, услугами и городом.'
    ]
  }
} satisfies Record<Locale, {title: string; items: string[]}>;

const tiers = {
  de: [
    {
      ids: ['websiteBusiness'],
      title: 'Website Business',
      lead: 'Eigenes Design für Ihren Betrieb, bis zu 10 Seiten: eine Seite pro Leistung und pro Ort, Vorher-nachher-Galerie, Bewertungen, Fragen und Antworten, Anfrage in drei Schritten. Klicken Sie sich durch die Unterseiten.'
    },
    {
      ids: ['websiteStart', 'websiteAbo'],
      title: 'Website Start und Website-Abo',
      lead: 'Eine klare Seite im bewährten Aufbau für Handwerk: Anruf-Knopf, Leistungen, Einsatzgebiet, Anfrage mit Foto. Schnell online, Farben und Inhalte für Ihren Betrieb.'
    }
  ],
  en: [
    {
      ids: ['websiteBusiness'],
      title: 'Website Business',
      lead: 'A design of its own for your business, up to 10 pages: one page per service and per town, before/after gallery, reviews, FAQ and a three-step inquiry. Click through the sub pages.'
    },
    {
      ids: ['websiteStart', 'websiteAbo'],
      title: 'Website Start and website subscription',
      lead: 'One clear page in a proven layout for trades: call button, services, service area, inquiry with photo. Live fast, with colours and content for your business.'
    }
  ],
  ru: [
    {
      ids: ['websiteBusiness'],
      title: 'Website Business',
      lead: 'Собственный дизайн под ваш бизнес, до 10 страниц: страница на каждую услугу и каждый район, галерея «до и после», отзывы, вопросы и ответы, заявка в три шага. Пощёлкайте по подстраницам.'
    },
    {
      ids: ['websiteStart', 'websiteAbo'],
      title: 'Website Start и Website-Abo',
      lead: 'Одна понятная страница в проверенной структуре для ремесленников: кнопка звонка, услуги, район выезда, заявка с фото. Быстрый запуск, цвета и тексты под ваш бизнес.'
    }
  ]
} satisfies Record<Locale, {ids: PackageId[]; title: string; lead: string}[]>;

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const rawLocale = (await params).locale;

  if (!hasLocale(routing.locales, rawLocale)) {
    return {};
  }

  const locale = rawLocale;
  const content = siteContent[locale];

  return createPageMetadata({
    locale,
    path: '/portfolio',
    title: content.metadata.portfolioTitle,
    description: content.metadata.portfolioDescription
  });
}

export default async function PortfolioPage({params}: PageProps) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const content = siteContent[locale];

  return (
    <>
      <section className="border-b-2 border-foreground py-12 sm:py-16">
        <Container>
          <h1 className="max-w-4xl text-balance text-[42px] leading-[1.02] text-foreground sm:text-6xl">
            {content.portfolio.title}
          </h1>
          <p className="mt-4 max-w-[38em] text-pretty text-lg leading-relaxed text-muted">{content.portfolio.lead}</p>
          <FadeIn delay={0.1}>
            <div className="mt-10 max-w-3xl rounded-[1.25rem] border border-border bg-surface p-5 backdrop-blur sm:p-6">
              <p className="text-base font-semibold text-foreground">{portfolioBrief[locale].title}</p>
              <ul className="mt-4 grid gap-3">
                {portfolioBrief[locale].items.map((item) => (
                  <li key={item} className="flex gap-3 border-t border-border pt-3 text-sm leading-6 text-muted first:border-t-0 first:pt-0">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </Container>
      </section>

      {tiers[locale].map((tier, tierIndex) => {
        const projects = portfolioProjects.filter((project) => (tier.ids as PackageId[]).includes(project.packageId));
        const price = (tier.ids as PackageId[]).map((id) => formatPackagePrice(getPackage(id), locale)).join(' · ');
        return (
          <section key={tier.title} className={tierIndex === 0 ? 'pt-16' : 'pt-20'}>
            <Container>
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
                <div className="max-w-3xl">
                  <h2 className="text-3xl text-foreground sm:text-4xl">{tier.title}</h2>
                  <p className="mt-3 text-base leading-7 text-muted">{tier.lead}</p>
                </div>
                <p className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-bold text-foreground">{price}</p>
              </div>
              <div className="mt-8 grid gap-5 lg:grid-cols-2 [&>*]:min-w-0">
                {projects.map((project, index) => (
                  <FadeIn key={project.slug} delay={index * 0.06}>
                    <PortfolioCard project={project} locale={locale} cta={content.common.viewProject} />
                  </FadeIn>
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <section className="pb-16">
        <Container>
          <p className="mt-8 max-w-3xl rounded-[1rem] border border-border bg-surface px-4 py-3 text-sm leading-7 text-muted">
            {content.portfolio.disclaimer}
          </p>
        </Container>
      </section>
    </>
  );
}
