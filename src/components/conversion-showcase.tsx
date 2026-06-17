import {ArrowRight, CheckCircle2, FileText, Mail, PanelsTopLeft} from 'lucide-react';

import type {Locale} from '@/i18n/routing';

type ConversionShowcaseProps = {
  locale: Locale;
};

const showcaseCopy = {
  de: {
    eyebrow: 'Projektbild',
    title: 'Aus verstreuter Arbeit wird ein klarer digitaler Ablauf.',
    incoming: 'Typische Ausgangslage',
    system: 'Was TreeTech daraus baut',
    result: 'Was danach besser läuft',
    painPoints: ['Anfragen bleiben in E-Mails liegen', 'Daten werden mehrfach kopiert', 'Website, CRM und Team arbeiten getrennt'],
    builds: ['Website oder Web-App mit klarer Nutzerführung', 'AI-Assistent für wiederkehrende Fragen und Aufgaben', 'Automatisierung für CRM, Dokumente und interne Übergaben'],
    outcomes: ['Weniger manuelle Schritte', 'Schnellere Reaktion auf neue Leads', 'Ein System, das im Alltag verständlich bleibt']
  },
  en: {
    eyebrow: 'Project picture',
    title: 'Scattered work becomes one clear digital flow.',
    incoming: 'Typical starting point',
    system: 'What TreeTech builds from it',
    result: 'What improves after launch',
    painPoints: ['Inquiries sit in email inboxes', 'Data gets copied more than once', 'Website, CRM, and team work separately'],
    builds: ['Website or web app with clear user journeys', 'AI assistant for recurring questions and tasks', 'Automation for CRM, documents, and internal handovers'],
    outcomes: ['Fewer manual steps', 'Faster response to new leads', 'A system the team can actually understand']
  }
} satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  incoming: string;
  system: string;
  result: string;
  painPoints: string[];
  builds: string[];
  outcomes: string[];
}>;

export function ConversionShowcase({locale}: ConversionShowcaseProps) {
  const copy = showcaseCopy[locale];

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#f4f1e8] p-4 text-[#11160f] shadow-[0_28px_90px_rgba(0,0,0,0.28)] sm:p-5">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(7,8,6,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(7,8,6,0.06)_1px,transparent_1px)] bg-[size:34px_34px]" />
      <div className="relative">
        <div className="flex items-start justify-between gap-5 border-b border-[#11160f]/10 pb-5">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#0b7b60]">
              {copy.eyebrow}
            </p>
            <h2 className="mt-3 max-w-md text-2xl font-semibold leading-tight sm:text-3xl">
              {copy.title}
            </h2>
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d6ff63] text-[#11160f]">
            <PanelsTopLeft className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>

        <div className="grid gap-4 py-5">
          <BriefColumn title={copy.incoming} icon={Mail} items={copy.painPoints} muted />
          <div className="flex justify-center text-[#0b7b60]" aria-hidden="true">
            <ArrowRight className="h-5 w-5 rotate-90" />
          </div>
          <BriefColumn title={copy.system} icon={FileText} items={copy.builds} />
        </div>

        <div className="rounded-[1.1rem] bg-[#11160f] p-4 text-white">
          <p className="text-sm font-semibold">{copy.result}</p>
          <div className="mt-4 grid gap-3">
            {copy.outcomes.map((item) => (
              <div key={item} className="flex gap-3 text-sm leading-6 text-white/76">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d6ff63]" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type BriefColumnProps = {
  title: string;
  icon: typeof Mail;
  items: string[];
  muted?: boolean;
};

function BriefColumn({title, icon: Icon, items, muted}: BriefColumnProps) {
  return (
    <div className="rounded-[1.1rem] border border-[#11160f]/10 bg-white/64 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className={muted ? 'text-[#6f7669]' : 'text-[#0b7b60]'}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="text-sm font-semibold">{title}</p>
      </div>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <p key={item} className="border-t border-[#11160f]/10 pt-3 text-sm leading-6 text-[#4b5248] first:border-t-0 first:pt-0">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
