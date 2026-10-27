import Link from 'next/link';

import {AdminHeading, EmptyState, PriorityBadge, StatusBadge} from '@/components/admin/crm-ui';
import {getCrmRepositories} from '@/lib/crm/factory';

export const dynamic = 'force-dynamic';

export default async function AdminOverview() {
  const repositories = getCrmRepositories();
  const [leads, tasks] = await Promise.all([
    repositories.leads.findAll(),
    repositories.tasks.findAll()
  ]);
  const active = leads.filter((lead) => !lead.archived);
  const month = new Date().toISOString().slice(0, 7);
  const stats = [
    {label: 'Neue Leads', value: active.filter((lead) => lead.status === 'new').length},
    {label: 'Qualifiziert', value: active.filter((lead) => lead.status === 'qualified').length},
    {label: 'Offene Angebote', value: active.filter((lead) => lead.status === 'proposal').length},
    {label: 'Gewonnen im Monat', value: active.filter((lead) => lead.status === 'won' && lead.updatedAt.startsWith(month)).length},
    {
      label: 'Pipeline-Wert',
      value: `€${active
        .filter((lead) => !['won', 'lost'].includes(lead.status))
        .reduce((sum, lead) => sum + (lead.value || 0), 0)
        .toLocaleString('de-AT')}`
    },
    {label: 'Offene Aufgaben', value: tasks.filter((task) => task.status === 'open').length}
  ];

  return (
    <div>
      <AdminHeading
        eyebrow="Sales workspace"
        title="Übersicht"
        lead="Alle neuen Anfragen, nächsten Schritte und offenen Chancen an einem Ort."
        action={<Link href="/admin/leads/new" className="rounded-full bg-accent px-4 py-3 text-sm font-semibold text-[#070806]">Lead anlegen</Link>}
      />
      <section className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => (
          <article key={item.label} className="rounded-[1.15rem] border border-white/10 bg-white/[0.045] p-5">
            <p className="text-sm text-muted">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold">{item.value}</p>
          </article>
        ))}
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Neueste Leads</h2>
        {active.length ? (
          <div className="mt-4 overflow-x-auto rounded-[1.15rem] border border-white/10">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-white/[0.04] text-muted"><tr><th className="p-3">Kontakt</th><th className="p-3">Leistung</th><th className="p-3">Status</th><th className="p-3">Priorität</th><th className="p-3">Erstellt</th></tr></thead>
              <tbody>
                {active.slice(0, 8).map((lead) => (
                  <tr key={lead.id} className="border-t border-white/10">
                    <td className="p-3"><Link href={`/admin/leads/${lead.id}`} className="font-semibold hover:text-accent">{lead.company || lead.name}</Link><p className="mt-1 text-xs text-muted">{lead.email}</p></td>
                    <td className="p-3">{lead.service}</td>
                    <td className="p-3"><StatusBadge status={lead.status} /></td>
                    <td className="p-3"><PriorityBadge priority={lead.priority} /></td>
                    <td className="p-3 text-muted">{formatDate(lead.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <EmptyState>Noch keine Leads vorhanden.</EmptyState>}
      </section>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('de-AT', {dateStyle: 'medium'}).format(new Date(value));
}
