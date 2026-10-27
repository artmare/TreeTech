import type {ComponentProps, ComponentType, ReactNode, SVGProps} from 'react';

import {Link} from '@/i18n/navigation';
import {cn} from '@/lib/utils';

type ButtonLinkProps = {
  href: ComponentProps<typeof Link>['href'];
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  className?: string;
  /** Optional icon shown before the label. */
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Optional analytics event name, sent via the `treetech:analytics` event. */
  trackingEvent?: string;
};

const variants = {
  primary: 'bg-accent text-white hover:bg-[var(--accent-strong)] [&_svg]:text-white',
  secondary:
    'border-2 border-foreground bg-surface text-foreground hover:bg-background [&_svg]:text-current',
  ghost: 'text-foreground hover:bg-surface hover:text-accent',
  accent: 'bg-accent text-white hover:bg-[var(--accent-strong)] [&_svg]:text-white'
};

const baseClass =
  'group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-[12px] px-6 py-3.5 text-base font-bold leading-tight transition-colors duration-150';

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
      {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : null}
      <span>{children}</span>
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
