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
    <article className="group rounded-[8px] border border-border bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <ProjectPreview project={project} />
      <div className="p-3">
        <div className="mt-2 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase text-primary">
            {project.industry[locale]}
          </p>
          <span className="text-sm text-muted">{project.location}</span>
        </div>
        <h3 className="mt-3 text-2xl font-semibold text-foreground">{project.name}</h3>
        <p className="mt-3 min-h-20 text-sm leading-6 text-muted">
          {project.description[locale]}
        </p>
        <div className="mt-4 rounded-[8px] border border-border bg-[#f7f8f4] px-3 py-3 text-sm font-semibold leading-6 text-foreground">
          {project.metric[locale]}
        </div>
        <Link
          href={`/portfolio/${project.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
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
