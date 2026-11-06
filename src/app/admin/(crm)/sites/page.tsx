import Link from 'next/link';

import {AdminHeading} from '@/components/admin/crm-ui';
import {clientSites} from '@/lib/client-sites/store';

export default function ClientSitesPage() {
  const sites = Object.entries(clientSites);
  return (
    <div className="max-w-4xl">
      <AdminHeading eyebrow="Kunden" title="Kunden-Websites" lead="Websites, deren Inhalte hier gepflegt werden: Banner, Bürozeiten, Leistungen, Referenzen, Team." />
      <div className="mt-7 grid gap-3">
        {sites.map(([slug, site]) => (
          <div key={slug} className="flex flex-wrap items-center justify-between gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5">
            <div>
              <p className="font-semibold">{site.name}</p>
              <a href={`https://${site.host}`} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-white">
                {site.host} ↗
              </a>
            </div>
            <Link href={`/admin/sites/${slug}`} className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-[#070806]">
              Inhalte bearbeiten
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
