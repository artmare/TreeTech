import type {PortfolioProject} from '@/content/site';
import {cn} from '@/lib/utils';

type ProjectPreviewProps = {
  project: PortfolioProject;
  size?: 'card' | 'large';
};

export function ProjectPreview({project, size = 'card'}: ProjectPreviewProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[8px] border border-white/60 bg-gradient-to-br shadow-sm',
        project.gradient,
        size === 'large' ? 'min-h-[360px] p-5 sm:p-8' : 'min-h-[230px] p-4'
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.08))]" />
      <div className="relative rounded-[8px] border border-white/70 bg-white/80 p-3 shadow-2xl shadow-black/10 backdrop-blur">
        <div className="mb-4 flex items-center gap-1.5 border-b border-black/10 pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 h-2 w-24 rounded-full bg-black/10" />
        </div>
        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <span className={cn('block h-2.5 w-16 rounded-full', project.accent)} />
            <span className="block h-6 w-4/5 rounded-full bg-black/80" />
            <span className="block h-6 w-3/5 rounded-full bg-black/80" />
            <div className="space-y-2 pt-2">
              <span className="block h-2 w-full rounded-full bg-black/15" />
              <span className="block h-2 w-5/6 rounded-full bg-black/15" />
              <span className="block h-2 w-2/3 rounded-full bg-black/15" />
            </div>
            <span className={cn('mt-4 block h-9 w-32 rounded-[8px]', project.accent)} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <span className="min-h-20 rounded-[8px] bg-white/70 shadow-inner" />
            <span className="min-h-20 rounded-[8px] bg-black/10 shadow-inner" />
            <span className="min-h-20 rounded-[8px] bg-black/10 shadow-inner" />
            <span className="min-h-20 rounded-[8px] bg-white/70 shadow-inner" />
          </div>
        </div>
      </div>
      <div className="relative mt-4 grid grid-cols-3 gap-2">
        <span className="h-16 rounded-[8px] bg-white/50" />
        <span className="h-16 rounded-[8px] bg-white/35" />
        <span className="h-16 rounded-[8px] bg-white/50" />
      </div>
    </div>
  );
}
