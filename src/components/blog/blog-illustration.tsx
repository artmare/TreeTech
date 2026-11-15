import type {ReactElement} from 'react';
import {ArrowDown, ArrowRight, Ban, Globe, LogOut, Megaphone, PhoneCall, Search} from 'lucide-react';

import type {IllustrationName} from '@/content/blog-types';
import type {Locale} from '@/i18n/routing';
import {cn} from '@/lib/utils';

/** Diagrams inside articles. Built with HTML so they stay readable on phones. */
export function BlogIllustration({name, locale}: {name: IllustrationName; locale: Locale}) {
  const Diagram = diagrams[name];
  return <Diagram locale={locale} />;
}

type DiagramProps = {locale: Locale};

const journeyText = {
  de: {
    steps: ['Sucht bei Google', 'Besucht Ihre Website', 'Geht ohne Anfrage', 'Sieht Ihre Anzeige', 'Ruft an'],
    notes: ['„Dachreparatur Preis“', 'Leistungen, Preise', 'Ablenkung, Vergleich', 'Passende Botschaft', 'Anfrage, Auftrag'],
    loop: 'Hier wirkt Remarketing'
  },
  en: {
    steps: ['Searches Google', 'Visits your website', 'Leaves, no inquiry', 'Sees your ad', 'Calls you'],
    notes: ['“roof repair price”', 'Services, prices', 'Distraction, comparing', 'The right message', 'Inquiry, job'],
    loop: 'This is where remarketing works'
  },
  ru: {
    steps: ['Ищет в Google', 'Заходит на сайт', 'Уходит без заявки', 'Видит вашу рекламу', 'Звонит вам'],
    notes: ['«ремонт крыши цена»', 'Услуги, цены', 'Отвлёкся, сравнивает', 'Нужное сообщение', 'Заявка, заказ'],
    loop: 'Здесь работает ремаркетинг'
  }
} satisfies Record<Locale, unknown>;

function RemarketingJourney({locale}: DiagramProps) {
  const t = journeyText[locale];
  const icons = [Search, Globe, LogOut, Megaphone, PhoneCall];
  return (
    <div className="rounded-[14px] border-2 border-foreground bg-background p-4 sm:p-6">
      <ol className="grid gap-3 md:grid-cols-5 md:gap-2">
        {t.steps.map((step, index) => {
          const Icon = icons[index];
          const isLeave = index === 2;
          const isWin = index === 4;
          return (
            <li key={step} className="relative flex items-center gap-3 md:flex-col md:items-stretch md:gap-0">
              <div
                className={cn(
                  'flex flex-1 items-center gap-3 rounded-[12px] border-2 p-3 md:flex-col md:items-start md:gap-2 md:p-4',
                  isLeave && 'border-dashed border-muted bg-surface',
                  isWin && 'border-foreground bg-accent text-white',
                  !isLeave && !isWin && 'border-foreground bg-surface'
                )}
              >
                <span
                  className={cn(
                    'grid h-10 w-10 shrink-0 place-items-center rounded-full border-2',
                    isWin ? 'border-white bg-[var(--signal)] text-foreground' : 'border-foreground bg-[var(--signal)] text-foreground',
                    isLeave && 'border-muted bg-background text-muted'
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className={cn('block text-[15px] font-bold leading-snug', isLeave && 'text-muted')}>{step}</span>
                  <span className={cn('mt-0.5 block text-[13px] leading-snug', isWin ? 'text-white/80' : 'text-muted')}>
                    {t.notes[index]}
                  </span>
                </span>
              </div>
              {index < t.steps.length - 1 ? (
                <>
                  <ArrowDown className="absolute -bottom-3 left-7 z-10 h-4 w-4 text-foreground md:hidden" aria-hidden="true" />
                  <ArrowRight className="absolute -right-2.5 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-foreground md:block" aria-hidden="true" />
                </>
              ) : null}
            </li>
          );
        })}
      </ol>
      <div className="mt-4 grid md:grid-cols-5 md:gap-2">
        <div className="md:col-span-3 md:col-start-3">
          <div className="rounded-full border-2 border-dashed border-accent px-4 py-1.5 text-center text-[13px] font-bold text-accent">
            ↻ {t.loop}
          </div>
        </div>
      </div>
    </div>
  );
}

const ladderText = {
  de: {
    bid: 'Gebot',
    rows: [
      {name: '„Heiß“', rule: 'Formular geöffnet, nicht abgeschickt', time: '7–14 Tage', level: 100},
      {name: 'Preise und Leistungen', rule: 'Preis- oder Leistungsseite angesehen', time: '30 Tage', level: 70},
      {name: 'Allgemeines Interesse', rule: 'Besuch ohne Zielaktion', time: '30–90 Tage', level: 35}
    ],
    excluded: 'Schon angefragt oder Kunde',
    excludedNote: 'ausschließen'
  },
  en: {
    bid: 'Bid',
    rows: [
      {name: '“Hot”', rule: 'Opened the form, did not submit', time: '7–14 days', level: 100},
      {name: 'Pricing and services', rule: 'Viewed pricing or a service page', time: '30 days', level: 70},
      {name: 'General interest', rule: 'Visit without a goal action', time: '30–90 days', level: 35}
    ],
    excluded: 'Already inquired or customer',
    excludedNote: 'exclude'
  },
  ru: {
    bid: 'Ставка',
    rows: [
      {name: '«Горячие»', rule: 'Открыли форму, но не отправили', time: '7–14 дней', level: 100},
      {name: 'Цены и услуги', rule: 'Смотрели цены или страницу услуги', time: '30 дней', level: 70},
      {name: 'Общий интерес', rule: 'Визит без целевого действия', time: '30–90 дней', level: 35}
    ],
    excluded: 'Уже обратились или клиенты',
    excludedNote: 'исключить'
  }
} satisfies Record<Locale, unknown>;

function IntentLadder({locale}: DiagramProps) {
  const t = ladderText[locale];
  const colors = ['bg-[var(--signal)]', 'bg-accent', 'bg-[#8fa89a]'];
  return (
    <div className="grid gap-3 rounded-[14px] border-2 border-foreground bg-background p-4 sm:p-6">
      {t.rows.map((row, index) => (
        <div key={row.name} className="rounded-[12px] border-2 border-foreground bg-surface p-3 sm:p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="text-[16px] font-bold text-foreground">{row.name}</p>
            <p className="text-[13px] font-bold text-muted">{row.time}</p>
          </div>
          <p className="mt-0.5 text-[14px] text-muted">{row.rule}</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="w-14 shrink-0 text-[12px] font-bold uppercase tracking-wide text-muted">{t.bid}</span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-background">
              <div className={cn('h-full rounded-full', colors[index])} style={{width: `${row.level}%`}} />
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between gap-3 rounded-[12px] border-2 border-dashed border-muted px-3 py-3 sm:px-4">
        <p className="text-[15px] font-bold text-muted line-through decoration-2">{t.excluded}</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1 text-[12px] font-bold text-white">
          <Ban className="h-3.5 w-3.5" aria-hidden="true" />
          {t.excludedNote}
        </span>
      </div>
    </div>
  );
}

const consentText = {
  de: {title: '1.000 Besucher, Beispiel mit 60 % Zustimmung', yes: 'Zugestimmt: im Remarketing', no: 'Abgelehnt: nicht erreichbar', dot: '1 Punkt = 10 Besucher'},
  en: {title: '1,000 visitors, example with 60% consent', yes: 'Consented: in remarketing', no: 'Declined: not reachable', dot: '1 dot = 10 visitors'},
  ru: {title: '1 000 посетителей, пример при 60% согласия', yes: 'Согласились: попадают в ремаркетинг', no: 'Отказались: недоступны', dot: '1 точка = 10 посетителей'}
} satisfies Record<Locale, unknown>;

function ConsentAudience({locale}: DiagramProps) {
  const t = consentText[locale];
  return (
    <div className="rounded-[14px] border-2 border-foreground bg-background p-4 sm:p-6">
      <p className="text-[15px] font-bold text-foreground">{t.title}</p>
      <div className="mt-4 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1 sm:gap-1.5" aria-hidden="true">
        {Array.from({length: 100}, (_, i) => (
          <span key={i} className={cn('aspect-square rounded-full', i < 60 ? 'bg-accent' : 'border-2 border-border bg-surface')} />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-accent" /> {t.yes}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border-2 border-border bg-surface" /> {t.no}
        </span>
        <span className="ml-auto text-[13px]">{t.dot}</span>
      </div>
    </div>
  );
}

const channelText = {
  de: {
    title: 'Priorität für Dienstleister',
    items: [
      {name: 'Such-Remarketing', role: 'Der Kunde sucht erneut: stärkster Moment', level: 5},
      {name: 'YouTube und Demand Gen', role: 'Vertrauen durch Video, Lookalikes', level: 4},
      {name: 'Displaynetzwerk', role: 'Erinnern, mit Frequenz-Limit', level: 3},
      {name: 'Customer Match', role: 'Vor allem Ausschlüsse und Signale', level: 3},
      {name: 'Performance Max', role: 'Listen nur als Signal, kein reines Remarketing', level: 2}
    ]
  },
  en: {
    title: 'Priority for service businesses',
    items: [
      {name: 'Search remarketing', role: 'The customer searches again: the strongest moment', level: 5},
      {name: 'YouTube and Demand Gen', role: 'Trust through video, lookalikes', level: 4},
      {name: 'Display Network', role: 'Reminders, with a frequency cap', level: 3},
      {name: 'Customer Match', role: 'Mainly exclusions and signals', level: 3},
      {name: 'Performance Max', role: 'Lists only as signals, not pure remarketing', level: 2}
    ]
  },
  ru: {
    title: 'Приоритет для бизнеса услуг',
    items: [
      {name: 'Поисковый ремаркетинг', role: 'Клиент снова ищет: самый сильный момент', level: 5},
      {name: 'YouTube и Demand Gen', role: 'Доверие через видео, lookalike', level: 4},
      {name: 'КМС', role: 'Напоминание, с ограничением частоты', level: 3},
      {name: 'Customer Match', role: 'В основном исключения и сигналы', level: 3},
      {name: 'Performance Max', role: 'Списки только как сигнал, не чистый ремаркетинг', level: 2}
    ]
  }
} satisfies Record<Locale, unknown>;

function ChannelPriority({locale}: DiagramProps) {
  const t = channelText[locale];
  return (
    <div className="rounded-[14px] border-2 border-foreground bg-background p-4 sm:p-6">
      <p className="text-[13px] font-bold uppercase tracking-wide text-muted">{t.title}</p>
      <ol className="mt-3 grid gap-2">
        {t.items.map((item, index) => (
          <li key={item.name} className="flex items-center gap-3 rounded-[12px] border-2 border-foreground bg-surface p-3">
            <span
              className={cn(
                'grid h-9 w-9 shrink-0 place-items-center rounded-full text-[15px] font-extrabold',
                index === 0 ? 'bg-[var(--signal)] text-foreground' : 'bg-foreground text-white'
              )}
            >
              {index + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-bold leading-snug text-foreground">{item.name}</span>
              <span className="block text-[13px] leading-snug text-muted">{item.role}</span>
            </span>
            <span className="hidden shrink-0 gap-1 sm:flex" aria-hidden="true">
              {Array.from({length: 5}, (_, i) => (
                <span key={i} className={cn('h-2.5 w-5 rounded-full', i < item.level ? 'bg-accent' : 'bg-border')} />
              ))}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const partnershipText = {
  de: {
    you: 'Ihr Betrieb',
    youNote: 'Ein Ansprechpartner in Wien',
    tt: ['Website', 'Hosting und Pflege', 'Tag, Conversions, Consent', 'Automatisierung'],
    iw: ['Google Ads', 'Remarketing', 'SEO', 'Analytics und Berichte']
  },
  en: {
    you: 'Your business',
    youNote: 'One contact in Vienna',
    tt: ['Website', 'Hosting and care', 'Tag, conversions, consent', 'Automation'],
    iw: ['Google Ads', 'Remarketing', 'SEO', 'Analytics and reports']
  },
  ru: {
    you: 'Ваш бизнес',
    youNote: 'Один контакт в Вене',
    tt: ['Сайт', 'Хостинг и поддержка', 'Тег, конверсии, согласие', 'Автоматизация'],
    iw: ['Google Ads', 'Ремаркетинг', 'SEO', 'Аналитика и отчёты']
  }
} satisfies Record<Locale, unknown>;

function PartnerCard({title, items, tone}: {title: string; items: string[]; tone: 'light' | 'green'}) {
  return (
    <div
      className={cn(
        'rounded-[14px] border-2 border-foreground p-4 shadow-[4px_4px_0_var(--foreground)]',
        tone === 'light' ? 'bg-surface text-foreground' : 'bg-accent text-white'
      )}
    >
      <p className="text-[20px] font-extrabold">{title}</p>
      <ul className="mt-3 grid gap-1.5 text-[14px]">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className={cn('h-2 w-2 shrink-0 rounded-full', tone === 'light' ? 'bg-accent' : 'bg-[var(--signal)]')} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PartnershipSplit({locale}: DiagramProps) {
  const t = partnershipText[locale];
  return (
    <div className="grid items-center gap-4 rounded-[14px] border-2 border-foreground bg-background p-4 sm:p-6 md:grid-cols-[1fr_auto_1fr]">
      <PartnerCard title="TreeTech" items={t.tt} tone="light" />
      <div className="mx-auto grid place-items-center gap-1 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full border-2 border-foreground bg-[var(--signal)] text-[13px] font-extrabold leading-tight text-foreground">
          {t.you}
        </span>
        <span className="max-w-[9rem] text-[12px] font-bold text-muted">{t.youNote}</span>
      </div>
      <PartnerCard title="iWeb" items={t.iw} tone="green" />
    </div>
  );
}

const diagrams: Record<IllustrationName, (props: DiagramProps) => ReactElement> = {
  'remarketing-journey': RemarketingJourney,
  'intent-ladder': IntentLadder,
  'consent-audience': ConsentAudience,
  'channel-priority': ChannelPriority,
  'partnership-split': PartnershipSplit
};
