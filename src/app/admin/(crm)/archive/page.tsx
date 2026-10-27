import Link from 'next/link';

import {AdminHeading, EmptyState, StatusBadge} from '@/components/admin/crm-ui';
import {getCrmRepositories} from '@/lib/crm/factory';

import {archiveLeadAction} from '../../actions';

export const dynamic = 'force-dynamic';

export default async function ArchivePage() {
  const leads = (await getCrmRepositories().leads.findAll()).filter((lead) => lead.archived);

  return <div><AdminHeading eyebrow="Aufbewahrung" title="Archiv" lead="Archivierte Leads bleiben erhalten und können wiederhergestellt werden." />{leads.length ? <div className="mt-7 grid gap-3">{leads.map((lead) => <article key={lead.id} className="flex flex-col gap-3 rounded-[1rem] border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between"><div><Link href={`/admin/leads/${lead.id}`} className="font-semibold hover:text-accent">{lead.company || lead.name}</Link><div className="mt-2"><StatusBadge status={lead.status} /></div></div><form action={archiveLeadAction}><input type="hidden" name="id" value={lead.id} /><input type="hidden" name="archived" value="false" /><button className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold">Wiederherstellen</button></form></article>)}</div> : <EmptyState>Das Archiv ist leer.</EmptyState>}</div>;
}
