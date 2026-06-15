import type {PortfolioProject} from '@/content/site';
import {cn} from '@/lib/utils';

type ProjectPreviewProps = {
  project: PortfolioProject;
  size?: 'card' | 'large';
};

export function ProjectPreview({project, size = 'card'}: ProjectPreviewProps) {
  if (size === 'card') {
    return (
      <div
        className={cn(
          'group relative min-h-[220px] overflow-hidden rounded-[8px] border border-white/70 bg-gradient-to-br p-3 shadow-[0_24px_70px_rgba(13,23,19,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(13,23,19,0.18)]',
          project.gradient
        )}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.42),rgba(255,255,255,0.04))]" />
        <div className="absolute inset-0 saas-grid opacity-25" />
        <div className="relative grid h-full gap-3">
          <div className="rounded-[8px] border border-white/75 bg-white/88 p-3 shadow-xl shadow-black/10 backdrop-blur transition duration-300 group-hover:scale-[1.01]">
            <div className="mb-4 flex items-center justify-between border-b border-black/10 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
              <span className="h-2 w-20 rounded-full bg-black/10" />
            </div>
            <span className={cn('block h-2.5 w-16 rounded-full', project.accent)} />
            <span className="mt-4 block h-6 w-11/12 rounded-full bg-[#101815]" />
            <span className="mt-2 block h-6 w-2/3 rounded-full bg-[#101815]" />
            <div className="mt-4 space-y-2">
              <span className="block h-2 w-full rounded-full bg-black/14" />
              <span className="block h-2 w-4/5 rounded-full bg-black/14" />
            </div>
            <div className="mt-4 flex gap-2">
              <span className={cn('block h-9 w-28 rounded-[8px]', project.accent)} />
              <span className="block h-9 w-20 rounded-[8px] border border-black/10 bg-white" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="h-12 rounded-[8px] border border-white/60 bg-white/62 shadow-sm" />
            <span className="h-12 rounded-[8px] border border-white/50 bg-white/42 shadow-sm" />
            <span className="h-12 rounded-[8px] border border-white/60 bg-white/62 shadow-sm" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-[8px] border border-white/70 bg-gradient-to-br shadow-[0_24px_70px_rgba(13,23,19,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(13,23,19,0.18)]',
        project.gradient,
        'min-h-[420px] p-5 sm:p-8'
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.42),rgba(255,255,255,0.04))]" />
      <div className="absolute inset-0 saas-grid opacity-25" />
      <div className="relative grid min-h-full gap-4">
        <div className="rounded-[8px] border border-white/75 bg-white/88 p-4 shadow-2xl shadow-black/12 backdrop-blur transition duration-300 group-hover:scale-[1.01]">
          <div className="mb-5 flex items-center justify-between border-b border-black/10 pb-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="h-2 w-24 rounded-full bg-black/10" />
          </div>
          <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr] xl:items-stretch">
            <div className="space-y-4">
              <span className={cn('block h-2.5 w-20 rounded-full', project.accent)} />
              <span className="block h-7 w-11/12 rounded-full bg-[#101815]" />
              <span className="block h-7 w-2/3 rounded-full bg-[#101815]" />
              <div className="space-y-2 pt-1">
                <span className="block h-2 w-full rounded-full bg-black/14" />
                <span className="block h-2 w-5/6 rounded-full bg-black/14" />
                <span className="block h-2 w-2/3 rounded-full bg-black/14" />
              </div>
              <div className="flex gap-2 pt-2">
                <span className={cn('block h-10 w-32 rounded-[8px]', project.accent)} />
                <span className="block h-10 w-24 rounded-[8px] border border-black/10 bg-white" />
              </div>
            </div>
            <div className="grid gap-2">
              <span className="relative min-h-28 overflow-hidden rounded-[8px] bg-black/10 shadow-inner">
                <span className={cn('absolute bottom-0 left-0 h-2/5 w-full opacity-80', project.accent)} />
                <span className="absolute left-4 top-4 h-3 w-16 rounded-full bg-white/80" />
              </span>
              <div className="grid grid-cols-2 gap-2">
                <span className="min-h-20 rounded-[8px] bg-white/80 shadow-inner" />
                <span className="min-h-20 rounded-[8px] bg-black/12 shadow-inner" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative grid grid-cols-3 gap-2">
          <span className="h-16 rounded-[8px] border border-white/60 bg-white/62 shadow-sm" />
          <span className="h-16 rounded-[8px] border border-white/50 bg-white/42 shadow-sm" />
          <span className="h-16 rounded-[8px] border border-white/60 bg-white/62 shadow-sm" />
        </div>
      </div>
    </div>
  );
}
