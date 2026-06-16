import {CheckCircle2, MousePointerClick, ShieldCheck, TrendingUp, Zap} from 'lucide-react';

import type {Locale} from '@/i18n/routing';

type ConversionShowcaseProps = {
  locale: Locale;
};

const showcaseCopy = {
  de: {
    label: 'Workflow-System',
    score: 'Prozessstatus',
    scoreValue: 'live',
    flow: ['Trigger', 'AI-Schritt', 'CRM-Update'],
    cards: [
      {label: 'Antwortzeit', value: 'schnell', icon: Zap},
      {label: 'Datenfluss', value: 'klar', icon: TrendingUp},
      {label: 'Berechtigung', value: 'sauber', icon: ShieldCheck}
    ],
    checklist: ['E-Mail wird erkannt', 'Dokument wird vorbereitet', 'CRM wird aktualisiert']
  },
  en: {
    label: 'Workflow system',
    score: 'Process status',
    scoreValue: 'live',
    flow: ['Trigger', 'AI step', 'CRM update'],
    cards: [
      {label: 'Response time', value: 'fast', icon: Zap},
      {label: 'Data flow', value: 'clear', icon: TrendingUp},
      {label: 'Permissions', value: 'clean', icon: ShieldCheck}
    ],
    checklist: ['Email gets classified', 'Document gets prepared', 'CRM gets updated']
  }
} satisfies Record<Locale, {
  label: string;
  score: string;
  scoreValue: string;
  flow: string[];
  cards: Array<{label: string; value: string; icon: typeof Zap}>;
  checklist: string[];
}>;

export function ConversionShowcase({locale}: ConversionShowcaseProps) {
  const copy = showcaseCopy[locale];

  return (
    <div className="software-panel relative overflow-hidden rounded-[1.25rem] p-4 text-white sm:p-5">
      <div className="dark-grid absolute inset-0 opacity-35" />
      <div className="relative rounded-[1rem] border border-white/12 bg-[#0c1815]/78 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{copy.label}</p>
            <p className="mt-2 text-2xl font-semibold">{copy.scoreValue}</p>
            <p className="text-sm text-white/58">{copy.score}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-[#101512]">
            <MousePointerClick className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {copy.cards.map((card) => (
            <div key={card.label} className="rounded-[1rem] border border-white/10 bg-white/[0.07] p-3">
              <card.icon className="h-4 w-4 text-accent" aria-hidden="true" />
              <p className="mt-4 text-xl font-semibold">{card.value}</p>
              <p className="mt-1 text-xs text-white/58">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[1rem] border border-white/10 bg-white/[0.06] p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {copy.flow.map((item, index) => (
              <div key={item}>
                <div className="relative mb-3 h-1 overflow-hidden rounded-full bg-white/10">
                  <span className="flow-line absolute inset-0" />
                </div>
                <p className="text-sm font-semibold text-white">{index + 1}. {item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {copy.checklist.map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-white/72">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
