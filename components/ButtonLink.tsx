import Link from 'next/link';
import type { ReactNode } from 'react';

export function ButtonLink({ href, children, variant = 'primary' }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' }) {
  const styles = variant === 'primary'
    ? 'bg-white text-slate-950 shadow-glow hover:bg-cyan-100'
    : 'border border-white/15 bg-white/5 text-white hover:border-cyan-300/60 hover:bg-white/10';

  return (
    <Link href={href} className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition ${styles}`}>
      {children}
    </Link>
  );
}
