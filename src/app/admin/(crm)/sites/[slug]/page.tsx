import Link from 'next/link';
import {notFound} from 'next/navigation';

import {saveClientSiteAction} from '@/app/admin/site-actions';
import {ClientSiteEditor} from '@/components/admin/client-site-editor';
import {AdminHeading} from '@/components/admin/crm-ui';
import {clientSites, getClientSiteContent, isClientSiteSlug, isClientSiteStorageConfigured} from '@/lib/client-sites/store';

export const dynamic = 'force-dynamic';

type Props = {params: Promise<{slug: string}>; searchParams: Promise<{saved?: string; error?: string; tab?: string}>};

export default async function ClientSiteEditorPage({params, searchParams}: Props) {
  const {slug} = await params;
  if (!isClientSiteSlug(slug)) notFound();
  const {saved, error, tab} = await searchParams;
  const site = clientSites[slug];
  const {content, source} = await getClientSiteContent(slug);
  const storage = isClientSiteStorageConfigured();

  return (
    <div className="max-w-6xl">
      <Link href="/admin/sites" className="text-sm text-muted hover:text-white">
        ← Kunden-Websites
      </Link>
      <AdminHeading
        eyebrow="Kunden-Website"
        title={site.name}
        lead={`Inhalte von ${site.host} bearbeiten. ${content.updatedAt ? `Zuletzt veröffentlicht: ${new Date(content.updatedAt).toLocaleString('de-AT', {timeZone: 'Europe/Vienna'})}.` : 'Noch nie gespeichert – es werden die Standardinhalte angezeigt.'}`}
      />
      {saved ? <p className="mt-5 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm">Veröffentlicht – die Website zeigt die neuen Inhalte.</p> : null}
      {error ? <p className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-100">Nicht gespeichert: {error}</p> : null}
      {!storage ? (
        <p className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          Google Sheets ist nicht konfiguriert. Die Website zeigt die Standardinhalte; Speichern ist erst mit Google-Zugang möglich.
        </p>
      ) : source === 'error' ? (
        <p className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          Gespeicherte Inhalte konnten nicht geladen werden – angezeigt werden die Standardinhalte.
        </p>
      ) : null}
      <ClientSiteEditor slug={slug} content={content} action={saveClientSiteAction} siteUrl={`https://${site.host}`} initialTab={tab} />
    </div>
  );
}
