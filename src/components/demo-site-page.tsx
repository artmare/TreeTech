import type {DemoSite} from '@/content/demo-sites';
import {BusinessDemo} from '@/components/demo-business';
import {HandwerkDemo} from '@/components/demo-handwerk';
import type {Locale} from '@/i18n/routing';

type DemoSitePageProps = {
  site: DemoSite;
  locale: Locale;
  /** Sub page of a Business demo, e.g. ['leistungen', 'thermenservice']. */
  path?: string[];
};

export function DemoSitePage({site, locale, path = []}: DemoSitePageProps) {
  if (site.business) {
    return <BusinessDemo site={site} locale={locale} path={path} />;
  }
  return <HandwerkDemo site={site} locale={locale} />;
}

/** All sub pages of a Business demo: one per service and one per location. */
export function demoSubPaths(site: DemoSite): string[][] {
  if (!site.business) return [];
  const copy = site.business.copy.de;
  return [
    ...copy.servicePages.map((page) => ['leistungen', page.slug]),
    ...copy.locations.map((place) => ['orte', place.slug])
  ];
}
