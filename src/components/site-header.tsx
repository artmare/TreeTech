'use client';

import {Globe2, Menu, Phone, X} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useState} from 'react';

import {localizedSwitchPath} from '@/content/blog-locales';
import {contactPhone, phoneHref} from '@/content/contact-links';
import {localeLabels, localeShortLabels, routing, type Locale} from '@/i18n/routing';
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
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const languageOptions = routing.locales.filter((item) => item !== locale);

  // The home page renders its own light header and footer.
  if (isDemoSitePath(pathname) || pathname === '/') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b-2 border-foreground bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] w-full max-w-[1160px] items-center justify-between gap-4 px-6 md:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[22px] font-extrabold text-foreground [font-stretch:118%]"
          aria-label="TreeTech"
        >
          <i className="inline-block h-[22px] w-3 rounded-[2px] bg-accent" aria-hidden="true" />
          TreeTech
        </Link>

        <nav className="hidden items-center gap-7 text-base font-semibold lg:flex" aria-label="Main navigation">
          {navItems
            .filter((item) => item.href !== '/')
            .map((item) => {
              const active = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'py-2 transition-colors hover:text-accent',
                    active ? 'text-accent underline decoration-2 underline-offset-8' : 'text-foreground'
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center text-sm font-bold sm:flex" aria-label={t('language')}>
            {languageOptions.map((item) => (
              <Link
                key={item}
                href={localizedSwitchPath(pathname, item)}
                locale={item}
                className="inline-flex min-h-11 min-w-9 items-center justify-center rounded-[8px] text-muted transition hover:bg-surface hover:text-foreground"
                aria-label={`${t('language')}: ${localeLabels[item]}`}
              >
                {localeShortLabels[item]}
              </Link>
            ))}
          </div>
          <a
            href={phoneHref}
            data-track="phone_click"
            className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border-2 border-foreground px-3 py-2 text-[15px] font-bold text-foreground transition hover:bg-surface md:px-4"
            aria-label={`${t('call')}: ${contactPhone.display}`}
          >
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
            <span className="hidden md:inline">{t('call')}</span>
            <span className="hidden xl:inline">{contactPhone.display}</span>
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border-2 border-foreground text-foreground lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? t('close') : t('menu')}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto grid max-w-[1160px] gap-1 px-6 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-border text-lg font-bold text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-3 flex gap-2" aria-label={t('language')}>
              {languageOptions.map((item) => (
                <Link
                  key={item}
                  href={localizedSwitchPath(pathname, item)}
                  locale={item}
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border-2 border-foreground bg-surface px-4 text-sm font-bold text-foreground"
                  aria-label={`${t('language')}: ${localeLabels[item]}`}
                >
                  <Globe2 className="h-4 w-4" aria-hidden="true" />
                  <span>{localeLabels[item]}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
