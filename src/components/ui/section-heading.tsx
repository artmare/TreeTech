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
        <p className="mb-3 text-base font-bold text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-[30px] leading-[1.08] text-foreground sm:text-[44px]">
        {title}
      </h2>
      {lead ? (
        <p className="mt-3 max-w-[38em] text-pretty text-[17px] leading-relaxed text-muted">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
