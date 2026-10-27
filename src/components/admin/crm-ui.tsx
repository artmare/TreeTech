import type {LeadPriority, LeadStatus} from '@/lib/crm/types';

export function AdminHeading({eyebrow, title, lead, action}: {eyebrow: string; title: string; lead?: string; action?: React.ReactNode}) {
  return <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{eyebrow}</p><h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h1>{lead ? <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{lead}</p> : null}</div>{action}</header>;
}

export function StatusBadge({status}: {status: LeadStatus}) {
  const labels: Record<LeadStatus, string> = {new: 'Neu', contacted: 'Kontaktiert', qualified: 'Qualifiziert', proposal: 'Angebot', won: 'Gewonnen', lost: 'Verloren'};
  return <span className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs font-semibold text-foreground">{labels[status]}</span>;
}

export function PriorityBadge({priority}: {priority: LeadPriority}) {
  const labels = {low: 'Niedrig', medium: 'Mittel', high: 'Hoch'};
  const colors = {low: 'text-muted', medium: 'text-amber-200', high: 'text-red-300'};
  return <span className={`text-xs font-semibold ${colors[priority]}`}>{labels[priority]}</span>;
}

export function EmptyState({children}: {children: React.ReactNode}) {
  return <div className="mt-6 rounded-[1.25rem] border border-dashed border-white/15 p-8 text-center text-sm text-muted">{children}</div>;
}

export function ErrorState({action}: {action?: React.ReactNode}) {
  return <div className="mt-6 rounded-[1.25rem] border border-amber-400/25 bg-amber-400/10 p-5 text-sm leading-6 text-amber-100"><p>CRM-Daten konnten nicht geladen werden. Prüfen Sie Google-Credentials, Spreadsheet-ID, Freigabe und Tabellenblätter.</p>{action}</div>;
}
