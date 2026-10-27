'use client';

import {useTranslations} from 'next-intl';

import {phoneHref, siteConfig} from '@/content/site';
import {Link, usePathname} from '@/i18n/navigation';
import {isDemoSitePath} from '@/lib/demo-routes';

const footerLinks = [
  {href: '/services', key: 'services'},
  {href: '/portfolio', key: 'portfolio'},
  {href: '/about', key: 'about'},
  {href: '/blog', key: 'blog'},
  {href: '/contact', key: 'contact'}
] as const;

export function SiteFooter() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const pathname = usePathname();

  // The home page renders its own light header and footer.
  if (isDemoSitePath(pathname) || pathname === '/') {
    return null;
  }

  return (
    <footer className="border-t-2 border-foreground bg-background text-foreground">
      <div className="mx-auto grid w-full max-w-[1160px] gap-8 px-6 py-12 md:grid-cols-[1fr_auto] md:px-12">
        <div className="min-w-0">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[22px] font-extrabold text-foreground [font-stretch:118%]"
            aria-label={siteConfig.name}
          >
            <i className="inline-block h-[22px] w-3 rounded-[2px] bg-accent" aria-hidden="true" />
            TreeTech
          </Link>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{t('tagline')}</p>
          <p className="mt-4 grid gap-1 text-[15px] font-bold">
            <a className="w-fit text-accent hover:underline" href={phoneHref} data-track="phone_click">
              {siteConfig.phone}
            </a>
            <a className="w-fit break-all text-accent hover:underline" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </p>
          <p className="mt-6 text-sm text-muted">
            &copy; {new Date().getFullYear()} TreeTech. {t('copyright')}
          </p>
        </div>
        <nav className="grid content-start gap-x-8 sm:grid-cols-2" aria-label="Footer">
          {footerLinks.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="flex min-h-11 items-center text-[15px] font-semibold text-foreground transition hover:text-accent"
            >
              {nav(item.key)}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
