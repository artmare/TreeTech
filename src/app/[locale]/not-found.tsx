'use client';

import {useLocale} from 'next-intl';

import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {phoneHref} from '@/content/contact-links';
import type {Locale} from '@/i18n/routing';

const copy: Record<Locale, {title: string; lead: string; home: string; call: string}> = {
  de: {
    title: 'Diese Seite gibt es nicht.',
    lead: 'Vielleicht hat sich die Adresse geändert. Auf der Startseite finden Sie alles, oder Sie rufen uns einfach an.',
    home: 'Zur Startseite',
    call: 'Anrufen'
  },
  en: {
    title: 'This page does not exist.',
    lead: 'Maybe the address has changed. You will find everything on the home page, or just give us a call.',
    home: 'Go to home page',
    call: 'Call'
  },
  ru: {
    title: 'Такой страницы нет.',
    lead: 'Возможно, адрес изменился. Всё есть на главной, или просто позвоните нам.',
    home: 'На главную',
    call: 'Позвонить'
  }
};

export default function NotFound() {
  const locale = useLocale() as Locale;
  const text = copy[locale] ?? copy.de;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <p className="text-base font-bold text-accent">404</p>
        <h1 className="mt-2 max-w-3xl text-balance text-[42px] leading-[1.02] text-foreground sm:text-6xl">{text.title}</h1>
        <p className="mt-4 max-w-[36em] text-lg leading-relaxed text-muted">{text.lead}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" variant="accent">
            {text.home}
          </ButtonLink>
          <ButtonLink href={phoneHref} variant="secondary">
            {text.call}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
