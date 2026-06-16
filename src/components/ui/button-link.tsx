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
    'bg-accent text-[#070806] shadow-[0_18px_42px_rgba(214,255,99,0.14)] hover:bg-white [&_svg]:text-[#070806]',
  secondary:
    'border border-white/15 bg-white/[0.055] text-foreground shadow-sm hover:border-accent/40 hover:bg-accent hover:text-[#070806] [&_svg]:text-current',
  ghost: 'text-foreground hover:bg-white/10 hover:text-accent',
  accent:
    'bg-accent text-[#070806] shadow-[0_18px_42px_rgba(214,255,99,0.18)] hover:bg-white [&_svg]:text-[#070806]'
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
        'group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent/70',
        variants[variant],
        className
      )}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}
