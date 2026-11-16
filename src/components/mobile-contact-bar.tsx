'use client';

import {MessageCircle, Phone} from 'lucide-react';
import {useEffect, useState} from 'react';

import {homeHandwerk} from '@/content/home-handwerk';
import {phoneHref, whatsappHref} from '@/content/contact-links';
import {Link, usePathname} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {isDemoSitePath} from '@/lib/demo-routes';

type Props = {locale: Locale};

const iconButton =
  'flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[12px] border-2 border-[#1C2220] bg-white text-[#1C2220] no-underline';

/** Height of the bar without the safe area. Other floating elements read it from --mobile-bar. */
const barHeight = 72;

/**
 * Phone-only contact bar. It stays out of the way on the first screen, where the hero already has
 * the same buttons, and slides in once the visitor scrolls. Its height is published as the CSS
 * variable --mobile-bar, so the chat button and the cookie notice can sit right above it.
 */
export function MobileContactBar({locale}: Props) {
  const pathname = usePathname();
  const hidden = isDemoSitePath(pathname);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hidden) {
      return;
    }

    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.55);

    update();
    window.addEventListener('scroll', update, {passive: true});

    const root = document.documentElement;
    const publish = () => root.style.setProperty('--mobile-bar', media.matches && visible ? `${barHeight}px` : '0px');
    publish();
    media.addEventListener('change', publish);

    return () => {
      window.removeEventListener('scroll', update);
      media.removeEventListener('change', publish);
    };
  }, [hidden, visible]);

  useEffect(
    () => () => {
      document.documentElement.style.removeProperty('--mobile-bar');
    },
    []
  );

  if (hidden) {
    return null;
  }

  const copy = homeHandwerk[locale];

  return (
    <>
      {/* Keeps the end of the page from ending up underneath the bar. */}
      <div className="h-[88px] md:hidden" aria-hidden="true" />
      <nav
        aria-label={copy.bar.preview}
        aria-hidden={!visible}
        inert={!visible}
        className={`fixed inset-x-0 bottom-0 z-[60] flex items-center gap-2 border-t-2 border-[#1C2220] bg-white px-4 pt-[10px] pb-[max(10px,env(safe-area-inset-bottom))] font-[family-name:var(--font-archivo)] transition-transform duration-200 ease-out motion-reduce:transition-none md:hidden ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <a href={phoneHref} className={iconButton} aria-label={copy.bar.call} data-track="phone_click">
          <Phone className="h-[22px] w-[22px]" aria-hidden="true" />
        </a>
        <a
          href={whatsappHref(copy.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[52px] shrink-0 items-center justify-center gap-1.5 rounded-[12px] border-2 border-[#1C2220] bg-white px-2.5 text-[14px] font-bold text-[#1C2220] no-underline"
          data-track="whatsapp_click"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          {copy.bar.whatsapp}
        </a>
        <Link
          href="/contact#audit-call"
          data-track="cta_click"
          className="flex h-[52px] min-w-0 flex-1 items-center justify-center rounded-[12px] bg-[#1F5A42] px-2 text-center text-[15px] font-bold leading-[1.15] !text-white no-underline"
        >
          {copy.bar.preview}
        </Link>
      </nav>
    </>
  );
}
