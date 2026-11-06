import type {Metadata} from 'next';
import {notFound} from 'next/navigation';

import {WegiSite} from '@/components/client-sites/weg-i/site';
import {getCachedClientSiteContent, isBannerActive, isClientSiteSlug} from '@/lib/client-sites/store';

type Props = {params: Promise<{slug: string}>};

export const revalidate = 600;

export function generateStaticParams() {
  return [{slug: 'weg-i'}];
}

export const metadata: Metadata = {
  title: 'Vorschau: Wegscheider Installationen – Redesign-Entwurf von TreeTech',
  description: 'Unverbindlicher Website-Entwurf von TreeTech für die Peter Wegscheider GmbH, Installateur in Wien-Penzing.',
  robots: {index: false, follow: false}
};

export default async function ClientSitePage({params}: Props) {
  const {slug} = await params;
  if (!isClientSiteSlug(slug)) notFound();
  const {content} = await getCachedClientSiteContent(slug);
  return <WegiSite content={content} showBanner={isBannerActive(content.banner)} preview />;
}
