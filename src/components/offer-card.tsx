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
        'relative flex h-full flex-col overflow-hidden rounded-[8px] border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl',
        offer.highlighted
          ? 'border-primary shadow-[0_18px_48px_rgba(15,95,69,0.14)]'
          : 'border-border'
      )}
    >
      {offer.highlighted ? (
        <div className="absolute right-4 top-4 rounded-[8px] bg-[#f2b84b] px-3 py-1 text-xs font-bold uppercase text-[#1f1704]">
          {recommendedLabel}
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{offer.name[locale]}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{offer.description[locale]}</p>
        </div>
        <div
          className={cn(
            'rounded-[8px] px-3 py-2 text-right',
            offer.highlighted ? 'bg-[#0f5f45] text-white' : 'bg-[#eef7f1] text-foreground'
          )}
        >
          <p
            className={cn(
              'text-xs font-semibold uppercase',
              offer.highlighted ? 'text-white/70' : 'text-primary'
            )}
          >
            {fromLabel}
          </p>
          <p
            className={cn(
              'text-xl font-semibold',
              offer.highlighted ? 'text-white' : 'text-foreground'
            )}
          >
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
          'mt-6 inline-flex min-h-11 items-center justify-center rounded-[8px] px-4 py-3 text-sm font-semibold transition',
          offer.highlighted
            ? 'bg-primary !text-white hover:bg-[#0a4f38]'
            : 'border border-border bg-white text-foreground hover:border-primary hover:text-primary'
        )}
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
