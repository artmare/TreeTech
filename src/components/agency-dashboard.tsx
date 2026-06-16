import {Bot, Cable, CheckCircle2, Code2, DatabaseZap, Workflow} from 'lucide-react';

import {ProjectPreview} from '@/components/project-preview';
import {portfolioProjects} from '@/content/site';
import type {Locale} from '@/i18n/routing';

type AgencyDashboardProps = {
  locale: Locale;
};

const copy = {
  de: {
    eyebrow: 'TreeTech Control Plane',
    title: 'Digital systems online',
    subtitle: 'AI-Flow, Website, CRM und interne Abläufe werden als ein System gedacht.',
    status: 'system ready',
    metrics: [
      ['AI', 'Automation'],
      ['WEB', 'Development'],
      ['OPS', 'Workflow']
    ],
    tasks: ['AI-Assistent verbunden', 'CRM-Trigger aktiv', 'Formulare leiten Daten weiter'],
    command: '> deploy business_workflow --region austria'
  },
  en: {
    eyebrow: 'TreeTech Control Plane',
    title: 'Digital systems online',
    subtitle: 'AI flow, website, CRM, and internal operations are planned as one system.',
    status: 'system ready',
    metrics: [
      ['AI', 'Automation'],
      ['WEB', 'Development'],
      ['OPS', 'Workflow']
    ],
    tasks: ['AI assistant connected', 'CRM trigger active', 'Forms route data forward'],
    command: '> deploy business_workflow --region austria'
  }
} satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  status: string;
  metrics: string[][];
  tasks: string[];
  command: string;
}>;

export function AgencyDashboard({locale}: AgencyDashboardProps) {
  const content = copy[locale];
  const heroProject = portfolioProjects[2];
  const icons = [Bot, Code2, Workflow];

  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2rem] bg-accent/10 blur-3xl" aria-hidden="true" />
      <div className="terminal-window relative overflow-hidden rounded-[1.25rem] p-3">
        <div className="rounded-[1rem] border border-white/10 bg-[#070806]/92 p-3 text-white shadow-[0_24px_90px_rgba(0,0,0,0.38)]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.08] px-3 py-1.5 font-mono text-xs text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {content.status}
            </div>
          </div>

          <div className="grid gap-4 pt-4 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="grid content-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                  {content.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-white">
                  {content.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/62">{content.subtitle}</p>
              </div>

              <div className="rounded-[0.9rem] border border-white/10 bg-white/[0.04] p-3 font-mono text-xs text-white/68">
                <span className="text-accent">{content.command}</span>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <span className="flow-line block h-full w-2/3 rounded-full bg-accent" />
                </div>
              </div>

              <div className="grid gap-2">
                {content.tasks.map((task) => (
                  <div key={task} className="flex items-center gap-3 rounded-[0.75rem] border border-white/10 bg-white/[0.055] px-3 py-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-sm font-semibold text-white/78">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            <ProjectPreview project={heroProject} />
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {content.metrics.map(([value, label], index) => {
              const Icon = icons[index] ?? DatabaseZap;

              return (
                <div key={label} className="rounded-[0.75rem] border border-white/10 bg-white/[0.055] p-3">
                  <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                  <p className="mt-4 font-mono text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-xs leading-5 text-white/58">{label}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center gap-3 rounded-[0.75rem] border border-accent/20 bg-accent/[0.08] px-3 py-3">
            <Cable className="h-5 w-5 text-accent" aria-hidden="true" />
            <span className="text-sm font-semibold text-white/78">API · CRM · AI · Web</span>
          </div>
        </div>
      </div>
    </div>
  );
}
