import {getTranslations} from 'next-intl/server';

import {siteConfig} from '@/content/site';
import type {Locale} from '@/i18n/routing';
import {Link} from '@/i18n/navigation';

type SiteFooterProps = {
  locale: Locale;
};

export async function SiteFooter({locale}: SiteFooterProps) {
  const t = await getTranslations({locale, namespace: 'footer'});
  const nav = await getTranslations({locale, namespace: 'nav'});

  return (
    <footer className="border-t border-border bg-[#101815] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-white text-base font-bold text-primary">
              TT
            </span>
            <span className="text-lg font-semibold">{siteConfig.name}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/70">{t('tagline')}</p>
          <p className="mt-8 text-sm text-white/60">
            © {new Date().getFullYear()} TreeTech. {t('copyright')}
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-white">{t('cta')}</p>
            <a className="mt-3 block text-sm text-white/70" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </div>
          <div className="grid gap-2 text-sm text-white/70">
            <Link href="/services" className="transition hover:text-white">
              {nav('services')}
            </Link>
            <Link href="/portfolio" className="transition hover:text-white">
              {nav('portfolio')}
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              {nav('contact')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
