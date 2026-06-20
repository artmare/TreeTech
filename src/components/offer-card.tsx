import {ArrowUpRight, Check} from 'lucide-react';

import type {Locale} from '@/i18n/routing';
import {Link} from '@/i18n/navigation';
import {cn} from '@/lib/utils';

type OfferCardProps = {
  offer: {
    chapter: string;
    name: Record<Locale, string>;
    description: Record<Locale, string>;
    problem: Record<Locale, string>;
    solution: Record<Locale, string>;
    result: Record<Locale, string>;
    features: Record<Locale, string[]>;
    highlighted?: boolean;
  };
  locale: Locale;
  ctaLabel: string;
};

export function OfferCard({offer, locale, ctaLabel}: OfferCardProps) {
  const detailLabels = {
    problem: locale === 'de' ? 'Problem' : 'Problem',
    solution: locale === 'de' ? 'Lösung' : 'Solution',
    result: locale === 'de' ? 'Ergebnis' : 'Result'
  };

  return (
    <article
      className={cn(
        'group terminal-card relative flex h-full flex-col overflow-hidden rounded-[1.25rem] p-5 sm:p-6',
        offer.highlighted && 'border-accent/45 bg-accent/[0.08]'
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(214,255,99,0.88),transparent)] opacity-80" />
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs uppercase text-muted">
          CHAPTER // {offer.chapter}
        </div>
        <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_rgba(214,255,99,0.8)]" />
      </div>

      <div className="mt-6">
        <p className="font-mono text-xs text-accent">~/treetech/services/{offer.chapter}</p>
        <h3 className="mt-3 text-balance text-2xl font-semibold leading-tight text-foreground">
          {offer.name[locale]}
        </h3>
        <p className="mt-4 text-sm leading-7 text-muted">{offer.description[locale]}</p>
      </div>

      <div className="mt-6 grid gap-3 border-t border-white/10 pt-5">
        {[
          [detailLabels.problem, offer.problem[locale]],
          [detailLabels.solution, offer.solution[locale]],
          [detailLabels.result, offer.result[locale]]
        ].map(([label, text]) => (
          <div key={label} className="rounded-[0.9rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">{label}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-white/10 pt-5">
        <ul className="grid gap-3">
          {offer.features[locale].map((feature) => (
            <li key={feature} className="flex gap-3 text-sm leading-6 text-muted">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/contact"
        className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-accent/25 bg-accent px-4 py-3 text-sm font-semibold text-[#070806] transition hover:-translate-y-0.5 hover:bg-white"
      >
        <span>{ctaLabel}</span>
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
