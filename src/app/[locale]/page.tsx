import {Bot, Code2, DatabaseZap, Euro, HelpCircle, MonitorSmartphone, PlugZap, UsersRound} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {AgencyDashboardLazy} from '@/components/agency-dashboard-lazy';
import {FadeIn} from '@/components/motion/fade-in';
import {PortfolioCard} from '@/components/portfolio-card';
import {PrimaryServiceCard} from '@/components/primary-service-card';
import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {audienceItems, automationExamples, faqItems, portfolioProjects, pricePackages, primaryServiceOffers, processSteps, siteContent} from '@/content/site';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string}>;
};

const outcomeCards = {
  de: [
    {
      icon: MonitorSmartphone,
      title: 'Ihre Website bringt kaum Anfragen',
      text: 'Das Angebot ist nicht schnell genug verständlich oder der Weg zum Kontakt bleibt unklar.'
    },
    {
      icon: Bot,
      title: 'Kunden warten zu lange',
      text: 'Wiederkehrende Fragen und Anfragen bleiben im Postfach liegen oder hängen an einzelnen Personen.'
    },
    {
      icon: PlugZap,
      title: 'Ihre Tools arbeiten getrennt',
      text: 'Informationen werden zwischen E-Mail, Excel, CRM und Kalender immer wieder manuell übertragen.'
    }
  ],
  en: [
    {
      icon: Bot,
      title: 'Your website brings too few inquiries',
      text: 'The offer is not clear quickly enough or the path to contact remains confusing.'
    },
    {
      icon: Code2,
      title: 'Customers wait too long',
      text: 'Recurring questions and inquiries remain in inboxes or depend on individual people.'
    },
    {
      icon: PlugZap,
      title: 'Your tools work separately',
      text: 'Information is repeatedly copied by hand between email, spreadsheets, CRM, and calendars.'
    }
  ],
  ru: [
    {
      icon: Bot,
      title: 'Сайт приносит слишком мало заявок',
      text: 'Предложение сложно понять быстро, а путь к контакту остаётся неясным.'
    },
    {
      icon: Code2,
      title: 'Клиенты слишком долго ждут',
      text: 'Повторяющиеся вопросы и заявки остаются в почте или зависят от отдельных сотрудников.'
    },
    {
      icon: PlugZap,
      title: 'Инструменты работают раздельно',
      text: 'Информацию постоянно переносят вручную между e-mail, таблицами, CRM и календарём.'
    }
  ]
} satisfies Record<Locale, Array<{icon: typeof Bot; title: string; text: string}>>;

const workflowLabels = {
  de: ['Workflow audit', 'System map', 'Interface', 'Automation', 'Launch'],
  en: ['Workflow audit', 'System map', 'Interface', 'Automation', 'Launch'],
  ru: ['Аудит процесса', 'Карта системы', 'Интерфейс', 'Автоматизация', 'Запуск']
} satisfies Record<Locale, string[]>;

const heroOutcomes = {
  de: [
    'Wir automatisieren manuelle Abläufe',
    'Wir bauen Websites und Web-Apps',
    'Wir verbinden Formulare, CRM, AI und interne Tools'
  ],
  en: [
    'We automate manual business workflows',
    'We build websites and web applications',
    'We connect forms, CRM, AI, and internal tools'
  ],
  ru: [
    'Автоматизируем ручные бизнес-процессы',
    'Создаем сайты и веб-приложения',
    'Связываем формы, CRM, AI и внутренние инструменты'
  ]
} satisfies Record<Locale, string[]>;

const heroLabels = {
  de: {
    cta: 'Kostenlose Analyse',
    micro: 'Ohne Verpflichtung. Antwort innerhalb von 2 Stunden.',
    terminal1: 'website -> anfrage -> CRM -> termin',
    terminal2: '2–3 konkrete Verbesserungsmöglichkeiten'
  },
  en: {
    cta: 'Free analysis',
    micro: 'No obligation. Reply within 2 hours.',
    terminal1: 'audit funnel: website -> chat -> CRM',
    terminal2: '2–3 concrete improvement opportunities'
  },
  ru: {
    cta: 'Бесплатный анализ',
    micro: 'Без обязательств. Ответ в течение 2 часов.',
    terminal1: 'audit funnel: website -> chat -> CRM',
    terminal2: '2–3 конкретные возможности улучшения'
  }
} satisfies Record<Locale, Record<string, string>>;

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
  const content = siteContent[locale];
  const automationLabels = {
    de: {process: 'Prozess', benefit: 'Business-Nutzen'},
    en: {process: 'Process', benefit: 'Business benefit'},
    ru: {process: 'Процесс', benefit: 'Польза для бизнеса'}
  } satisfies Record<Locale, {process: string; benefit: string}>;
  const homeLabels = {
    de: {
      automationExamples: 'automation examples',
      fit: 'fit',
      budgetTitle: 'Startangebote und Budgetrahmen.',
      budgetLead:
        'Orientierungen für den Einstieg. Nach einer kurzen Ersteinschätzung empfehlen wir ehrlich, ob ein Sprint reicht oder ein größerer Aufbau sinnvoll ist.',
      seo: 'seo',
      faqTitle: 'Häufige Fragen',
      faqLead:
        'Antworten auf typische Fragen zu Websites, AI-Automation, CRM-Verbindungen und Zusammenarbeit.',
      serviceDetails: 'Details öffnen'
    },
    en: {
      automationExamples: 'automation examples',
      fit: 'fit',
      budgetTitle: 'Starting offers and budget ranges.',
      budgetLead:
        'Orientation ranges for getting started. After a short first assessment, we honestly recommend whether a sprint is enough or a larger setup makes sense.',
      seo: 'seo',
      faqTitle: 'Frequently asked questions',
      faqLead:
        'Answers to common questions about websites, AI automation, CRM connections, and collaboration.',
      serviceDetails: 'Open details'
    },
    ru: {
      automationExamples: 'примеры автоматизации',
      fit: 'для кого',
      budgetTitle: 'Стартовые предложения и бюджетные рамки.',
      budgetLead:
        'Ориентиры для начала. После короткой первичной оценки мы честно скажем, хватит ли спринта или нужен более крупный запуск.',
      seo: 'seo',
      faqTitle: 'Частые вопросы',
      faqLead:
        'Ответы на типичные вопросы о сайтах, AI-автоматизации, CRM-интеграциях и сотрудничестве.',
      serviceDetails: 'Открыть детали'
    }
  } satisfies Record<Locale, Record<string, string>>;
  const proofCards = [
    {icon: Bot, text: content.home.heroTrust[0]},
    {icon: MonitorSmartphone, text: content.home.heroTrust[1]},
    {icon: DatabaseZap, text: content.home.heroTrust[2]}
  ];

  return (
    <>
      <section className="dark-band scanline relative isolate overflow-hidden text-white">
        <div className="dark-grid absolute inset-0 opacity-45" />
        <Container className="relative grid min-h-[calc(88svh-78px)] gap-10 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-16">
          <FadeIn className="max-w-4xl">
            <p className="inline-flex rounded-full border border-accent/20 bg-accent/[0.08] px-3 py-2 font-mono text-sm text-accent">
              {content.home.heroBadge}
            </p>
            <h1 className="mt-6 max-w-5xl text-balance text-4xl font-semibold leading-[1.03] text-white sm:text-6xl lg:text-7xl">
              {content.home.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/74 sm:text-xl">
              {content.home.heroLead}
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact#audit-call" variant="accent">
                {heroLabels[locale].cta}
              </ButtonLink>
              <p className="mt-3 text-sm font-medium leading-6 text-white/62">
                {heroLabels[locale].micro}
              </p>
            </div>
            <ul className="mt-7 grid max-w-2xl gap-3">
              {heroOutcomes[locale].map((item) => (
                <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-white/76">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 max-w-md rounded-[0.9rem] border border-white/10 bg-white/[0.035] p-3 font-mono text-xs leading-6 text-white/58">
              <p><span className="text-accent">&gt;</span> {heroLabels[locale].terminal1}</p>
              <p><span className="text-accent">&gt;</span> {heroLabels[locale].terminal2}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.12} className="lg:self-center">
            <AgencyDashboardLazy locale={locale} />
          </FadeIn>
        </Container>
      </section>

      <section className="relative z-10 py-12">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {proofCards.map((card, index) => (
              <FadeIn key={card.text} delay={index * 0.08}>
                <article className="terminal-card h-full rounded-[1.25rem] p-5">
                  <card.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <p className="mt-4 text-sm font-semibold leading-6 text-foreground">{card.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeading
              eyebrow={content.common.eyebrow}
              title={content.home.proofTitle}
              lead={content.home.proofCopy}
            />
            <div className="grid gap-4 md:grid-cols-3">
              {outcomeCards[locale].map((card, index) => (
                <FadeIn key={card.title} delay={index * 0.08}>
                  <article className="terminal-card h-full rounded-[1.25rem] p-5">
                    <card.icon className="h-6 w-6 text-accent" aria-hidden="true" />
                    <h3 className="mt-5 text-lg font-semibold text-foreground">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{card.text}</p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="warm-band py-16">
        <Container>
          <SectionHeading
            eyebrow={homeLabels[locale].automationExamples}
            title={content.home.automationTitle}
            lead={content.home.automationLead}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {automationExamples.map((example, index) => (
              <FadeIn key={example.title[locale]} delay={index * 0.06}>
                <article className="terminal-card h-full rounded-[1.25rem] p-5">
                  <DatabaseZap className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-semibold leading-tight text-foreground">
                    {example.title[locale]}
                  </h3>
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                    {automationLabels[locale].process}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted">{example.process[locale]}</p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                    {automationLabels[locale].benefit}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted">{example.benefit[locale]}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionHeading
              eyebrow={homeLabels[locale].fit}
              title={content.home.audienceTitle}
              lead={content.home.audienceLead}
            />
            <div className="grid gap-4">
              {audienceItems.map((item, index) => (
                <FadeIn key={item.title[locale]} delay={index * 0.08}>
                  <article className="terminal-card flex gap-4 rounded-[1.25rem] p-5">
                    <UsersRound className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{item.title[locale]}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted">{item.description[locale]}</p>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="warm-band py-16">
        <Container>
          <SectionHeading
            eyebrow={content.common.nextStep}
            title={content.home.servicesTitle}
            lead={content.home.servicesLead}
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {primaryServiceOffers.map((offer, index) => (
              <FadeIn key={offer.id} delay={index * 0.08}>
                <PrimaryServiceCard
                  offer={offer}
                  locale={locale}
                  ctaLabel={content.common.requestPackage}
                  detailLabel={homeLabels[locale].serviceDetails}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="dark-band relative overflow-hidden py-16 text-white">
        <div className="dark-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <SectionHeading
            eyebrow="budget"
            title={homeLabels[locale].budgetTitle}
            lead={homeLabels[locale].budgetLead}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pricePackages.map((item, index) => (
              <FadeIn key={item.name[locale]} delay={index * 0.06}>
                <article className="terminal-card h-full rounded-[1.25rem] p-5">
                  <Euro className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{item.name[locale]}</h3>
                  <p className="mt-3 text-2xl font-semibold text-accent">{item.price[locale]}</p>
                  <p className="mt-4 text-sm leading-7 text-muted">{item.description[locale]}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="dark-band relative overflow-hidden py-16 text-white">
        <div className="dark-grid absolute inset-0 opacity-35" />
        <Container className="relative">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              title={content.home.portfolioTitle}
              lead={content.home.portfolioLead}
            />
            <ButtonLink href="/portfolio" variant="secondary" className="md:mb-1">
              {content.common.secondaryCta}
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {portfolioProjects.slice(0, 3).map((project, index) => (
              <FadeIn key={project.slug} delay={index * 0.08}>
                <PortfolioCard
                  project={project}
                  locale={locale}
                  cta={content.common.viewProject}
                />
              </FadeIn>
            ))}
          </div>
          <p className="mt-8 max-w-3xl rounded-[1rem] border border-white/10 bg-white/[0.06] px-4 py-3 text-sm leading-7 text-white/68">
            {content.portfolio.disclaimer}
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            align="center"
            title={content.home.processTitle}
            lead={content.home.processLead}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <FadeIn key={step.title[locale]} delay={index * 0.08}>
                <article className="terminal-card h-full rounded-[1.25rem] p-5">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-accent/[0.08] font-mono text-sm text-accent">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title[locale]}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{step.description[locale]}</p>
                </article>
              </FadeIn>
            ))}
          </div>
          <div className="terminal-window mt-10 grid gap-3 rounded-[1.25rem] p-4 md:grid-cols-5">
            {workflowLabels[locale].map((label, index) => (
              <div key={label} className="flex items-center gap-3 font-mono text-xs text-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[#070806]">
                  {index + 1}
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/contact">{content.common.startProject}</ButtonLink>
          </div>
        </Container>
      </section>

      <section className="warm-band py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              eyebrow={homeLabels[locale].seo}
              title={content.home.seoTitle}
              lead={content.home.seoLead}
            />
            <div className="terminal-card rounded-[1.25rem] p-6">
              <div className="grid gap-5">
                {content.home.seoParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8 border-t border-white/10 pt-6">
                <ButtonLink href="/blog" variant="secondary">
                  {content.home.blogLink}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="faq"
            title={homeLabels[locale].faqTitle}
            lead={homeLabels[locale].faqLead}
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {faqItems.map((item, index) => (
              <FadeIn key={item.question[locale]} delay={index * 0.04}>
                <article className="terminal-card h-full rounded-[1.25rem] p-5">
                  <HelpCircle className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{item.question[locale]}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.answer[locale]}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
