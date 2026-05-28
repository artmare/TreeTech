import Link from 'next/link';
import { navItems, services } from '@/data/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <div className="mb-4 flex items-center gap-3 font-semibold text-white"><span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200">T</span>TreeTech</div>
          <p className="max-w-sm text-sm leading-7 text-slate-400">AI automation and web development studio building premium digital systems for modern businesses.</p>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold text-white">Navigation</p>
          <div className="grid gap-3">{navItems.map((item) => <Link className="text-sm text-slate-400 transition hover:text-white" href={item.href} key={item.href}>{item.label}</Link>)}</div>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold text-white">Services</p>
          <div className="grid gap-3">{services.slice(0, 4).map((item) => <span className="text-sm text-slate-400" key={item.title}>{item.title}</span>)}</div>
        </div>
        <div>
          <p className="mb-4 text-sm font-semibold text-white">Social</p>
          <div className="grid gap-3 text-sm text-slate-400"><span>LinkedIn</span><span>Instagram</span><span>Dribbble</span></div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-slate-500">© 2026 TreeTech. All rights reserved.</div>
    </footer>
  );
}
