'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {Globe2, Menu, X} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {useState} from 'react';

import type {Locale} from '@/i18n/routing';
import {Link, usePathname} from '@/i18n/navigation';
import {cn} from '@/lib/utils';

const navItems = [
  {href: '/', key: 'home'},
  {href: '/about', key: 'about'},
  {href: '/services', key: 'services'},
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

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="TreeTech">
          <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-primary text-base font-bold text-white">
            TT
          </span>
          <span className="grid leading-tight">
            <span className="text-lg font-semibold text-foreground">TreeTech</span>
            <span className="hidden text-[11px] font-semibold uppercase text-muted sm:block">
              Webstudio AT
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'rounded-[8px] px-3 py-2 text-sm font-medium text-muted transition hover:bg-white hover:text-foreground',
                  active && 'bg-white text-foreground shadow-sm'
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
            className="hidden min-h-10 items-center gap-2 rounded-[8px] border border-border bg-white px-3 py-2 text-sm font-semibold text-foreground transition hover:border-primary sm:inline-flex"
            aria-label={t('language')}
          >
            <Globe2 className="h-4 w-4" aria-hidden="true" />
            <span>{locale === 'de' ? 'EN' : 'DE'}</span>
          </Link>
          <Link
            href="/contact"
            className="hidden min-h-10 items-center justify-center rounded-[8px] bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0a4f38] sm:inline-flex"
          >
            {t('contact')}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-border bg-white text-foreground lg:hidden"
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
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <nav className="mx-auto grid max-w-7xl gap-2 px-5 py-4 sm:px-6" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-[8px] bg-white px-4 py-3 text-base font-semibold text-foreground shadow-sm"
                >
                  {t(item.key)}
                </Link>
              ))}
              <Link
                href={pathname}
                locale={nextLocale}
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-[8px] border border-border bg-white px-4 py-3 text-sm font-semibold text-foreground"
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
