import {ArrowUpRight, CheckCircle2, ChevronDown} from 'lucide-react';

import type {PrimaryServiceOffer} from '@/content/site';
import {Link} from '@/i18n/navigation';
import type {Locale} from '@/i18n/routing';
import {cn} from '@/lib/utils';

type PrimaryServiceCardProps = {
  offer: PrimaryServiceOffer;
  locale: Locale;
  ctaLabel: string;
  detailLabel: string;
};

export function PrimaryServiceCard({
  offer,
  locale,
  ctaLabel,
  detailLabel
}: PrimaryServiceCardProps) {
  const offerNumber = {websites: '01', automation: '02', 'custom-software': '03'}[offer.id];
  return (
    <article
      className={cn(
        'terminal-card group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] p-5 sm:p-6',
        offer.highlighted && 'border-accent/45 bg-accent/[0.08]'
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hidden opacity-80" />
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-xs text-accent">
          offer // {offerNumber}
        </p>
        <span className="h-2 w-2 rounded-full bg-accent" />
      </div>

      <h3 className="mt-5 text-balance text-2xl font-semibold leading-tight text-foreground">
        {offer.name[locale]}
      </h3>
      <p className="mt-4 text-sm leading-7 text-muted">{offer.description[locale]}</p>

      <ul className="mt-6 grid gap-3">
        {offer.outcomes[locale].map((outcome) => (
          <li key={outcome} className="flex gap-3 text-sm leading-6 text-muted">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <span>{outcome}</span>
          </li>
        ))}
      </ul>

      <details className="group/details mt-6 rounded-[1rem] border border-border bg-surface p-4">
        <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-foreground marker:hidden">
          <span>{detailLabel}</span>
          <ChevronDown
            className="h-4 w-4 shrink-0 text-accent transition group-open/details:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="mt-4 border-t border-border pt-4">
          <p className="font-mono text-[0.68rem] text-accent">
            {offer.detailTitle[locale]}
          </p>
          <p className="mt-2 text-sm leading-7 text-muted">{offer.detail[locale]}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {offer.detailLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-9 items-center rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold text-muted transition hover:border-accent/35 hover:text-accent"
              >
                {link.label[locale]}
              </Link>
            ))}
          </div>
        </div>
      </details>

      <Link
        href="/contact#audit-call"
        className="mt-6 inline-flex min-h-14 w-fit items-center gap-2 rounded-[12px] bg-accent px-6 py-3.5 text-base font-bold text-white transition hover:bg-[var(--accent-strong)]"
      >
        <span>{ctaLabel}</span>
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
