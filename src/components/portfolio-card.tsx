import {ArrowUpRight} from 'lucide-react';

import type {Locale} from '@/i18n/routing';
import {Link} from '@/i18n/navigation';
import type {PortfolioProject} from '@/content/site';

import {ProjectPreview} from './project-preview';

type PortfolioCardProps = {
  project: PortfolioProject;
  locale: Locale;
  cta: string;
};

export function PortfolioCard({project, locale, cta}: PortfolioCardProps) {
  return (
    <article className="group grid h-full gap-4 rounded-[8px] border border-border bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl hover:shadow-black/10 md:grid-cols-[0.72fr_1fr] md:items-stretch lg:block lg:p-3">
      <ProjectPreview project={project} />
      <div className="flex flex-col p-0 lg:p-4">
        <div className="flex items-center justify-between gap-4 lg:mt-2">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
            {project.industry[locale]}
          </p>
          <span className="text-sm text-muted">{project.location}</span>
        </div>
        <h3 className="mt-3 text-2xl font-semibold text-foreground">{project.name}</h3>
        <p className="mt-3 text-sm leading-6 text-muted">
          {project.description[locale]}
        </p>
        <div className="mt-3 rounded-[8px] border border-border bg-[#f6f8f4] px-3 py-3 text-sm font-semibold leading-6 text-foreground lg:mt-4">
          {project.metric[locale]}
        </div>
        <Link
          href={`/portfolio/${project.slug}`}
          className="mt-4 inline-flex min-h-11 w-fit items-center gap-2 rounded-[8px] bg-[#0a1210] px-4 py-3 text-sm font-semibold text-white transition group-hover:bg-primary lg:mt-5"
        >
          <span>{cta}</span>
          <ArrowUpRight
            className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
