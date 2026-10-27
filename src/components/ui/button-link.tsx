import {ArrowRight} from 'lucide-react';
import type {ComponentProps, ComponentType, ReactNode, SVGProps} from 'react';

import {Link} from '@/i18n/navigation';
import {cn} from '@/lib/utils';

type ButtonLinkProps = {
  href: ComponentProps<typeof Link>['href'];
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  className?: string;
  /** Icon shown before the label; replaces the trailing arrow. */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Optional analytics event name, sent via the `treetech:analytics` event. */
  trackingEvent?: string;
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

const baseClass =
  'group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent/70';

function isExternal(href: ButtonLinkProps['href']): href is string {
  return typeof href === 'string' && /^(tel:|mailto:|https?:\/\/)/.test(href);
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
  icon: Icon,
  trackingEvent
}: ButtonLinkProps) {
  const content = (
    <>
      {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
      <span>{children}</span>
      {Icon ? null : (
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
      )}
    </>
  );
  const classes = cn(baseClass, variants[variant], className);

  if (isExternal(href)) {
    const opensNewTab = href.startsWith('http');
    return (
      <a
        href={href}
        className={classes}
        data-track={trackingEvent}
        {...(opensNewTab ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} data-track={trackingEvent}>
      {content}
    </Link>
  );
}
