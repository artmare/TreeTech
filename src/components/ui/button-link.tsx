import {ArrowRight} from 'lucide-react';
import type {ComponentProps, ReactNode} from 'react';

import {Link} from '@/i18n/navigation';
import {cn} from '@/lib/utils';

type ButtonLinkProps = {
  href: ComponentProps<typeof Link>['href'];
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  className?: string;
};

const variants = {
  primary:
    'bg-[#0a1210] text-white shadow-[0_18px_42px_rgba(10,18,16,0.24)] hover:bg-primary',
  secondary:
    'border border-border bg-white/92 text-foreground shadow-sm hover:border-primary hover:bg-white hover:text-primary',
  ghost: 'text-foreground hover:bg-white/80 hover:text-primary',
  accent:
    'bg-accent text-[#0a1210] shadow-[0_18px_42px_rgba(200,255,95,0.18)] hover:bg-white [&_svg]:text-[#0a1210]'
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] px-5 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5',
        variants[variant],
        className
      )}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}
