'use client';

import {MessageCircle, Phone} from 'lucide-react';

import {homeHandwerk} from '@/content/home-handwerk';
import {phoneHref, whatsappHref} from '@/content/contact-links';
import {Link, usePathname} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {isDemoSitePath} from '@/lib/demo-routes';

type Props = {locale: Locale};

const item =
  'flex min-h-14 flex-col items-center justify-center gap-1 rounded-[12px] border-2 border-[#1C2220] px-2.5 py-2 text-center text-[13px] font-bold leading-[1.15] text-[#1C2220] no-underline';

/** Phone-only contact bar: call, WhatsApp and the main call to action are always one tap away. */
export function MobileContactBar({locale}: Props) {
  const pathname = usePathname();

  if (isDemoSitePath(pathname)) {
    return null;
  }

  const copy = homeHandwerk[locale];

  return (
    <>
      {/* Keeps page content from ending up underneath the bar. */}
      <div className="h-[88px] bg-white md:hidden" aria-hidden="true" />
      <nav
        aria-label={copy.bar.preview}
        className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-[1fr_1fr_1.5fr] gap-2 border-t-2 border-[#1C2220] bg-white px-4 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] font-[family-name:var(--font-archivo)] md:hidden"
      >
        <a href={phoneHref} className={item}>
          <Phone className="h-5 w-5" aria-hidden="true" />
          {copy.bar.call}
        </a>
        <a href={whatsappHref(copy.whatsappMessage)} target="_blank" rel="noopener noreferrer" className={item}>
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          {copy.bar.whatsapp}
        </a>
        <Link
          href="/contact#audit-call"
          data-track="cta_click"
          className="flex min-h-14 items-center justify-center rounded-[12px] border-2 border-[#1F5A42] bg-[#1F5A42] px-3.5 py-2 text-center text-[15px] font-bold leading-[1.15] !text-white no-underline"
        >
          {copy.bar.preview}
        </Link>
      </nav>
    </>
  );
}
