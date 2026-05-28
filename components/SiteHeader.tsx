import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { navItems } from '@/data/site';

export function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/72 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main navigation">
        <Link href="#top" className="flex items-center gap-3 font-semibold tracking-tight text-white">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-200">T</span>
          <span>TreeTech</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-300 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
        <Link href="#contact" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white transition hover:border-cyan-300/50 hover:bg-white/15">
          Book a Call <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
