import Image from 'next/image';

import type {PortfolioProject} from '@/content/site';
import type {Locale} from '@/i18n/routing';
import {cn} from '@/lib/utils';

type ProjectPreviewProps = {
  project: PortfolioProject;
  locale?: Locale;
  size?: 'card' | 'large';
};

const labels = {
  de: {
    demo: 'Demo-Website',
    preview: 'Echte Vorschau'
  },
  en: {
    demo: 'Demo website',
    preview: 'Real preview'
  }
} satisfies Record<Locale, {demo: string; preview: string}>;

export function ProjectPreview({project, locale = 'en', size = 'card'}: ProjectPreviewProps) {
  const large = size === 'large';
  const copy = labels[locale];

  return (
    <div
      className={cn(
        'group relative aspect-[16/10] overflow-hidden border border-white/12 bg-gradient-to-br shadow-[0_24px_70px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(0,0,0,0.32)]',
        project.gradient,
        large ? 'min-h-[420px] rounded-[1.25rem]' : 'min-h-[220px] rounded-[1.1rem]'
      )}
    >
      <Image
        src={`/portfolio-previews/${project.slug}.png`}
        alt={`${project.name} demo website preview`}
        fill
        sizes={large ? '(min-width: 1024px) 920px, 100vw' : '(min-width: 1024px) 560px, 100vw'}
        className="object-cover object-top transition duration-500 group-hover:scale-[1.025]"
      />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/12" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07110f]/82 via-[#07110f]/22 to-transparent" />
      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/25 bg-[#07110f]/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/82 backdrop-blur">
        <span className={cn('h-2 w-2 rounded-full', project.accent)} />
        <span>{copy.demo}</span>
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-[11px] font-semibold text-white/80 backdrop-blur">
        {copy.preview}
      </div>
    </div>
  );
}
