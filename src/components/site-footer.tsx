'use client';

import {useTranslations} from 'next-intl';

import {LogoMark} from '@/components/logo-mark';
import {siteConfig} from '@/content/site';
import {Link, usePathname} from '@/i18n/navigation';
import {isDemoSitePath} from '@/lib/demo-routes';

export function SiteFooter() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const pathname = usePathname();

  if (isDemoSitePath(pathname)) {
    return null;
  }

  return (
    <footer className="border-t border-white/10 bg-[#07110f] text-white">
      <div className="dark-grid mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <LogoMark className="h-10 w-10" />
            <span className="text-lg font-semibold">{siteConfig.name}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/68">{t('tagline')}</p>
          <p className="mt-8 text-sm text-white/60">
            &copy; {new Date().getFullYear()} TreeTech. {t('copyright')}
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-[1rem] border border-white/10 bg-white/[0.06] p-5">
            <p className="text-sm font-semibold text-white">{t('cta')}</p>
            <a className="mt-3 block text-sm font-semibold text-accent" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </div>
          <div className="grid gap-2 rounded-[1rem] border border-white/10 bg-white/[0.04] p-5 text-sm text-white/70">
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
