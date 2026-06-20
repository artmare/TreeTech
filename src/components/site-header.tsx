'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {Globe2, Menu, X} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {useState} from 'react';

import {LogoMark} from '@/components/logo-mark';
import type {Locale} from '@/i18n/routing';
import {Link, usePathname} from '@/i18n/navigation';
import {isDemoSitePath} from '@/lib/demo-routes';
import {cn} from '@/lib/utils';

const navItems = [
  {href: '/', key: 'home'},
  {href: '/about', key: 'about'},
  {href: '/services', key: 'services'},
  {href: '/blog', key: 'blog'},
  {href: '/portfolio', key: 'portfolio'},
  {href: '/contact', key: 'contact'}
] as const;

type SiteHeaderProps = {
  locale: Locale;
};

export function SiteHeader({locale}: SiteHeaderProps) {
  const t = useTranslations('nav');
  const activeLocale = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const nextLocale = activeLocale === 'de' ? 'en' : 'de';

  if (isDemoSitePath(pathname)) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070806]/78 backdrop-blur-2xl">
      <div className="mx-auto flex h-[78px] w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="TreeTech">
          <LogoMark
            priority
            className="h-14 w-40 drop-shadow-[0_0_22px_rgba(55,255,208,0.18)] sm:w-48"
          />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.055] p-1 shadow-sm lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm font-semibold transition',
                  active
                    ? 'bg-accent !text-[#070806] shadow-sm hover:bg-accent hover:!text-[#070806]'
                    : 'text-muted hover:bg-white/10 hover:text-white'
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={pathname}
            locale={nextLocale}
            className="hidden min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:border-accent/40 hover:text-accent sm:inline-flex"
            aria-label={t('language')}
          >
            <Globe2 className="h-4 w-4" aria-hidden="true" />
            <span>{locale === 'de' ? 'EN' : 'DE'}</span>
          </Link>
          <Link
            href="/contact"
            className="hidden min-h-11 items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold !text-[#070806] shadow-[0_14px_32px_rgba(214,255,99,0.14)] transition hover:-translate-y-0.5 hover:bg-white sm:inline-flex"
          >
            {t('contact')}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-foreground shadow-sm lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? t('close') : t('menu')}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{height: 0, opacity: 0}}
            animate={{height: 'auto', opacity: 1}}
            exit={{height: 0, opacity: 0}}
            className="overflow-hidden border-t border-white/10 bg-[#070806] lg:hidden"
          >
            <nav className="mx-auto grid max-w-7xl gap-2 px-5 py-4 sm:px-6" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-[1rem] border border-white/10 bg-white/[0.055] px-4 py-3 text-base font-semibold text-foreground shadow-sm"
                >
                  {t(item.key)}
                </Link>
              ))}
              <Link
                href={pathname}
                locale={nextLocale}
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-[1rem] border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-semibold text-foreground"
                aria-label={t('language')}
              >
                <Globe2 className="h-4 w-4" aria-hidden="true" />
                <span>{locale === 'de' ? 'English' : 'Deutsch'}</span>
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
