import {CheckCircle2, MousePointerClick, ShieldCheck, TrendingUp, Zap} from 'lucide-react';

import type {Locale} from '@/i18n/routing';

type ConversionShowcaseProps = {
  locale: Locale;
};

const showcaseCopy = {
  de: {
    label: 'Website-System',
    score: 'Conversion Score',
    scoreValue: '94%',
    flow: ['Klarer Einstieg', 'Vertrauen', 'Anfrage'],
    cards: [
      {label: 'Mobile First', value: '1.2s', icon: Zap},
      {label: 'Lead-Pfad', value: '+38%', icon: TrendingUp},
      {label: 'Trust Layer', value: 'aktiv', icon: ShieldCheck}
    ],
    checklist: ['Angebot sofort verständlich', 'CTAs auf allen Kernseiten', 'Mehrsprachig vorbereitet']
  },
  en: {
    label: 'Website system',
    score: 'Conversion score',
    scoreValue: '94%',
    flow: ['Clear entry', 'Trust', 'Inquiry'],
    cards: [
      {label: 'Mobile first', value: '1.2s', icon: Zap},
      {label: 'Lead path', value: '+38%', icon: TrendingUp},
      {label: 'Trust layer', value: 'active', icon: ShieldCheck}
    ],
    checklist: ['Offer understood fast', 'CTAs on every key page', 'Multilingual structure ready']
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
    <div className="software-panel relative overflow-hidden rounded-[8px] p-4 text-white sm:p-5">
      <div className="dark-grid absolute inset-0 opacity-35" />
      <div className="relative rounded-[8px] border border-white/12 bg-[#0c1815]/78 p-4 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{copy.label}</p>
            <p className="mt-2 text-2xl font-semibold">{copy.scoreValue}</p>
            <p className="text-sm text-white/58">{copy.score}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-accent text-[#0a1210]">
            <MousePointerClick className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {copy.cards.map((card) => (
            <div key={card.label} className="rounded-[8px] border border-white/10 bg-white/[0.07] p-3">
              <card.icon className="h-4 w-4 text-accent" aria-hidden="true" />
              <p className="mt-4 text-xl font-semibold">{card.value}</p>
              <p className="mt-1 text-xs text-white/58">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[8px] border border-white/10 bg-white/[0.06] p-4">
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
