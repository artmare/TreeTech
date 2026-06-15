import {Check} from 'lucide-react';

import type {Locale} from '@/i18n/routing';
import {Link} from '@/i18n/navigation';
import {cn} from '@/lib/utils';

type OfferCardProps = {
  offer: {
    name: Record<Locale, string>;
    price: string;
    description: Record<Locale, string>;
    features: Record<Locale, string[]>;
    highlighted?: boolean;
  };
  locale: Locale;
  includedLabel: string;
  fromLabel: string;
  ctaLabel: string;
  recommendedLabel: string;
};

export function OfferCard({
  offer,
  locale,
  includedLabel,
  fromLabel,
  ctaLabel,
  recommendedLabel
}: OfferCardProps) {
  return (
    <article
      className={cn(
        'group lift-card relative flex h-full flex-col overflow-hidden rounded-[8px] border bg-white p-6 shadow-sm',
        offer.highlighted
          ? 'border-primary shadow-[0_26px_70px_rgba(13,107,79,0.17)]'
          : 'border-border'
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0d6b4f,#c8ff5f,#0ea5e9)] opacity-0 transition group-hover:opacity-100" />
      {offer.highlighted ? (
        <div className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase text-[#16200b]">
          {recommendedLabel}
        </div>
      ) : null}
      <div className="flex min-h-36 flex-col justify-between">
        <div className="pr-20">
          <h3 className="text-2xl font-semibold text-foreground">{offer.name[locale]}</h3>
          <p className="mt-4 text-sm leading-7 text-muted">{offer.description[locale]}</p>
        </div>
        <div className="mt-6">
          <p
            className={cn(
              'text-xs font-bold uppercase tracking-[0.14em]',
              offer.highlighted ? 'text-primary' : 'text-muted'
            )}
          >
            {fromLabel}
          </p>
          <p className="mt-1 text-4xl font-semibold tracking-normal text-foreground">
            {offer.price}
          </p>
        </div>
      </div>
      <div className="mt-6 border-t border-border pt-5">
        <p className="text-sm font-semibold text-foreground">{includedLabel}</p>
        <ul className="mt-4 space-y-3">
          {offer.features[locale].map((feature) => (
            <li key={feature} className="flex gap-3 text-sm leading-6 text-muted">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link
        href="/contact"
        className={cn(
          'mt-6 inline-flex min-h-12 items-center justify-center rounded-[8px] px-4 py-3 text-sm font-semibold transition',
          offer.highlighted
            ? 'bg-[#0a1210] !text-white hover:bg-primary'
            : 'border border-border bg-white text-foreground hover:border-primary hover:bg-[#f6f8f4] hover:text-primary'
        )}
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
