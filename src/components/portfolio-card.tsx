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
  const conceptLabel = {de: 'Demo-Konzept', en: 'Demo concept', ru: 'Демо-концепт'}[locale];
  const goalLabel = {de: 'Ziel', en: 'Goal', ru: 'Цель'}[locale];
  return (
    <article className="group terminal-card grid h-full gap-4 rounded-[1.25rem] p-3 transition duration-300 md:grid-cols-[0.72fr_1fr] md:items-stretch lg:block [&>*]:min-w-0">
      <ProjectPreview project={project} locale={locale} />
      <div className="flex flex-col p-2 lg:p-4">
        <div className="flex items-center justify-between gap-4 lg:mt-2">
          <p className="text-sm font-bold text-accent">
            {conceptLabel} · {project.industry[locale]}
          </p>
          <span className="text-sm text-muted">{project.location}</span>
        </div>
        <h3 className="mt-3 text-2xl font-semibold text-foreground">{project.name}</h3>
        <p className="mt-3 text-sm leading-6 text-muted">
          {project.description[locale]}
        </p>
        <div className="mt-4 rounded-[1rem] border border-border bg-surface px-3 py-3 text-sm font-semibold leading-6 text-foreground">
          <span className="text-accent">{goalLabel}:</span> {project.metric[locale]}
        </div>
        <Link
          href={`/portfolio/${project.slug}`}
          className="mt-4 inline-flex min-h-14 w-fit items-center gap-2 rounded-[12px] bg-accent px-6 py-3.5 text-base font-bold text-white transition hover:bg-[var(--accent-strong)] lg:mt-5"
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
