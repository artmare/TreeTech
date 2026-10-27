import Link from 'next/link';

import {AdminHeading, EmptyState, PriorityBadge, StatusBadge} from '@/components/admin/crm-ui';
import {getCrmRepositories} from '@/lib/crm/factory';
import {leadPriorities, leadSources, leadStatuses, serviceTypes} from '@/lib/crm/types';

export const dynamic = 'force-dynamic';

export default async function LeadsPage({searchParams}: {searchParams: Promise<Record<string, string | undefined>>}) {
  const query = await searchParams;
  let leads = (await getCrmRepositories().leads.findAll()).filter((lead) => !lead.archived);
  const search = (query.q || '').toLowerCase();

  if (search) leads = leads.filter((lead) => [lead.name, lead.company, lead.email, lead.message].some((value) => value.toLowerCase().includes(search)));
  if (query.status) leads = leads.filter((lead) => lead.status === query.status);
  if (query.priority) leads = leads.filter((lead) => lead.priority === query.priority);
  if (query.source) leads = leads.filter((lead) => lead.source === query.source);
  if (query.service) leads = leads.filter((lead) => lead.service === query.service);

  return (
    <div>
      <AdminHeading eyebrow="Kontakte" title="Leads" lead="Inbound- und Outbound-Chancen durchsuchen, filtern und bearbeiten." action={<Link href="/admin/leads/new" className="rounded-full bg-accent px-4 py-3 text-sm font-semibold text-[#070806]">Lead anlegen</Link>} />
      <form className="mt-7 grid gap-3 rounded-[1.15rem] border border-white/10 bg-white/[0.035] p-4 sm:grid-cols-2 xl:grid-cols-5">
        <input name="q" defaultValue={query.q} placeholder="Name, Firma oder E-Mail" className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-sm" />
        <Filter name="status" value={query.status} options={leadStatuses} />
        <Filter name="priority" value={query.priority} options={leadPriorities} />
        <Filter name="source" value={query.source} options={leadSources} />
        <div className="flex gap-2"><Filter name="service" value={query.service} options={serviceTypes} /><button className="rounded-xl bg-white/10 px-4 text-sm font-semibold hover:bg-white/15">Filtern</button></div>
      </form>
      {leads.length ? (
        <div className="mt-5 overflow-x-auto rounded-[1.15rem] border border-white/10">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-white/[0.04] text-muted"><tr><th className="p-3">Kontakt</th><th className="p-3">Leistung</th><th className="p-3">Status</th><th className="p-3">Priorität</th><th className="p-3">Quelle</th><th className="p-3">Nächste Aktion</th></tr></thead>
            <tbody>{leads.map((lead) => <tr key={lead.id} className="border-t border-white/10 hover:bg-white/[0.025]"><td className="p-3"><Link href={`/admin/leads/${lead.id}`} className="font-semibold hover:text-accent">{lead.company || lead.name}</Link><p className="mt-1 text-xs text-muted">{lead.name} · {lead.email}</p></td><td className="p-3">{lead.service}</td><td className="p-3"><StatusBadge status={lead.status} /></td><td className="p-3"><PriorityBadge priority={lead.priority} /></td><td className="p-3 text-muted">{lead.source}</td><td className="p-3 text-muted">{lead.nextAction || '—'}</td></tr>)}</tbody>
          </table>
        </div>
      ) : <EmptyState>Keine Leads entsprechen dem Filter.</EmptyState>}
    </div>
  );
}

function Filter({name, value, options}: {name: string; value?: string; options: readonly string[]}) {
  return <select name={name} defaultValue={value || ''} className="h-11 min-w-0 rounded-xl border border-white/10 bg-[#101310] px-3 text-sm"><option value="">Alle</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>;
}
