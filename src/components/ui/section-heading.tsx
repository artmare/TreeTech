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
        <p className="mb-3 text-sm font-semibold uppercase text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-pretty text-base leading-8 text-muted sm:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
