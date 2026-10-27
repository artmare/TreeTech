import Link from 'next/link';

import {AdminHeading, EmptyState, PriorityBadge} from '@/components/admin/crm-ui';
import {getCrmRepositories} from '@/lib/crm/factory';
import {leadStatuses} from '@/lib/crm/types';

import {updateLeadAction} from '../../actions';

export const dynamic = 'force-dynamic';
const labels = {new: 'Neu', contacted: 'Kontaktiert', qualified: 'Qualifiziert', proposal: 'Angebot', won: 'Gewonnen', lost: 'Verloren'} as const;

export default async function PipelinePage() {
  const leads = (await getCrmRepositories().leads.findAll()).filter((lead) => !lead.archived);

  return <div><AdminHeading eyebrow="Verkaufsprozess" title="Pipeline" lead="Statusänderungen sind auch ohne Drag-and-drop vollständig per Tastatur bedienbar." /><div className="mt-7 grid gap-4 overflow-x-auto pb-3 lg:grid-cols-3 2xl:grid-cols-6">{leadStatuses.map((status) => { const items = leads.filter((lead) => lead.status === status); return <section key={status} className="min-w-[260px] rounded-[1.15rem] border border-white/10 bg-white/[0.03] p-3"><div className="flex items-center justify-between px-1"><h2 className="font-semibold">{labels[status]}</h2><span className="rounded-full bg-white/10 px-2 py-1 text-xs">{items.length}</span></div><div className="mt-3 grid gap-3">{items.map((lead) => <article key={lead.id} className="rounded-xl border border-white/10 bg-[#101310] p-3"><Link href={`/admin/leads/${lead.id}`} className="font-semibold hover:text-accent">{lead.company || lead.name}</Link><p className="mt-2 text-xs text-muted">{lead.service}</p><div className="mt-3 flex items-center justify-between"><PriorityBadge priority={lead.priority} /><span className="text-xs text-muted">{lead.value ? `€${lead.value.toLocaleString('de-AT')}` : ''}</span></div>{lead.nextAction ? <p className="mt-3 border-t border-white/10 pt-3 text-xs text-muted">{lead.nextAction}</p> : null}<form action={updateLeadAction} className="mt-3"><input type="hidden" name="id" value={lead.id} /><input type="hidden" name="priority" value={lead.priority} /><input type="hidden" name="nextAction" value={lead.nextAction} /><input type="hidden" name="nextActionAt" value={lead.nextActionAt} /><input type="hidden" name="value" value={lead.value || ''} /><select aria-label="Status ändern" name="status" defaultValue={lead.status} className="h-9 w-full rounded-lg border border-white/10 bg-black/20 px-2 text-xs">{leadStatuses.map((nextStatus) => <option key={nextStatus} value={nextStatus}>{labels[nextStatus]}</option>)}</select><button className="mt-2 w-full rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/15">Speichern</button></form></article>)}{!items.length ? <EmptyState>Leer</EmptyState> : null}</div></section>; })}</div></div>;
}
