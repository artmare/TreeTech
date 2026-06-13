import {ArrowRight} from 'lucide-react';
import type {ComponentProps, ReactNode} from 'react';

import {Link} from '@/i18n/navigation';
import {cn} from '@/lib/utils';

type ButtonLinkProps = {
  href: ComponentProps<typeof Link>['href'];
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
};

const variants = {
  primary:
    'bg-primary text-primary-foreground shadow-[0_14px_32px_rgba(15,95,69,0.2)] hover:bg-[#0a4f38]',
  secondary:
    'border border-border bg-white text-foreground hover:border-primary hover:text-primary',
  ghost: 'text-foreground hover:bg-white/70'
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
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] px-5 py-3 text-sm font-semibold transition',
        variants[variant],
        className
      )}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
