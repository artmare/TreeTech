import Link from 'next/link';

import {AdminHeading, EmptyState} from '@/components/admin/crm-ui';
import {getCrmRepositories} from '@/lib/crm/factory';

import {toggleTaskAction} from '../../actions';

export const dynamic = 'force-dynamic';

export default async function TasksPage() {
  const repositories = getCrmRepositories();
  const [tasks, leads] = await Promise.all([repositories.tasks.findAll(), repositories.leads.findAll()]);
  const names = new Map(leads.map((lead) => [lead.id, lead.company || lead.name]));

  return <div><AdminHeading eyebrow="Follow-ups" title="Aufgaben" lead="Offene nächste Schritte über alle Leads." />{tasks.length ? <div className="mt-7 grid gap-3">{tasks.map((task) => <article key={task.id} className="flex flex-col gap-3 rounded-[1rem] border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className={task.status === 'completed' ? 'font-semibold text-muted line-through' : 'font-semibold'}>{task.title}</p><Link href={`/admin/leads/${task.leadId}`} className="mt-1 block text-sm text-accent">{names.get(task.leadId) || 'Lead öffnen'}</Link>{task.dueAt ? <p className="mt-1 text-xs text-muted">Fällig: {new Intl.DateTimeFormat('de-AT', {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(task.dueAt))}</p> : null}</div><form action={toggleTaskAction}><input type="hidden" name="id" value={task.id} /><input type="hidden" name="leadId" value={task.leadId} /><input type="hidden" name="complete" value={task.status === 'open' ? 'true' : 'false'} /><button className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold">{task.status === 'open' ? 'Erledigen' : 'Wieder öffnen'}</button></form></article>)}</div> : <EmptyState>Noch keine Aufgaben vorhanden.</EmptyState>}</div>;
}
