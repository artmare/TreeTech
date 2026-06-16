import {cn} from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 inline-flex rounded-full border border-accent/20 bg-accent/[0.08] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-accent shadow-sm">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold leading-[1.04] text-foreground sm:text-5xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-5 text-pretty text-base leading-8 text-muted sm:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
