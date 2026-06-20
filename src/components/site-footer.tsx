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
      <div className="dark-grid mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(28rem,0.95fr)] lg:px-8">
        <div className="min-w-0">
          <Link href="/" className="inline-flex items-center gap-3" aria-label={siteConfig.name}>
            <LogoMark className="h-14 w-44" />
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/68">{t('tagline')}</p>
          <p className="mt-8 text-sm text-white/60">
            &copy; {new Date().getFullYear()} TreeTech. {t('copyright')}
          </p>
        </div>
        <div className="grid min-w-0 gap-5 sm:grid-cols-[minmax(0,1.2fr)_minmax(9rem,0.8fr)]">
          <div className="min-w-0 rounded-[1rem] border border-white/10 bg-white/[0.06] p-5">
            <p className="text-sm font-semibold text-white">{t('cta')}</p>
            <a
              className="mt-3 block max-w-full break-words text-sm font-semibold leading-6 text-accent [overflow-wrap:anywhere]"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>
          </div>
          <div className="grid gap-1 rounded-[1rem] border border-white/10 bg-white/[0.04] p-2 text-sm text-white/70">
            <Link
              href="/services"
              className="flex min-h-11 items-center rounded-[0.75rem] px-4 py-3 font-medium transition hover:bg-white/[0.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {nav('services')}
            </Link>
            <Link
              href="/portfolio"
              className="flex min-h-11 items-center rounded-[0.75rem] px-4 py-3 font-medium transition hover:bg-white/[0.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {nav('portfolio')}
            </Link>
            <Link
              href="/contact"
              className="flex min-h-11 items-center rounded-[0.75rem] px-4 py-3 font-medium transition hover:bg-white/[0.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {nav('contact')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
