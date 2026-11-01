import type {DemoSite} from '@/content/demo-sites';
import {HandwerkDemo} from '@/components/demo-handwerk';
import type {Locale} from '@/i18n/routing';

type DemoSitePageProps = {
  site: DemoSite;
  locale: Locale;
};

export function DemoSitePage({site, locale}: DemoSitePageProps) {
  return <HandwerkDemo site={site} locale={locale} />;
}
