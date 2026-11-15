'use client';

import {ArrowUpRight, Clock} from 'lucide-react';
import {useMemo, useState} from 'react';

import {BlogCover} from '@/components/blog/blog-cover';
import type {CoverVariant} from '@/content/blog-types';
import {Link} from '@/i18n/navigation';
import {cn} from '@/lib/utils';

export type BlogCardData = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  cover: CoverVariant;
};

export function BlogCard({post, className}: {post: BlogCardData; className?: string}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-[14px] border-2 border-foreground bg-surface transition duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--foreground)]',
        className
      )}
    >
      <div className="relative aspect-[1200/630] overflow-hidden border-b-2 border-foreground">
        <BlogCover variant={post.cover} className="transition duration-500 group-hover:scale-[1.04]" />
        <span className="absolute left-3 top-3 rounded-full border-2 border-foreground bg-surface px-3 py-1 text-[12px] font-bold text-foreground">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-balance text-[20px] font-bold leading-snug text-foreground">{post.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4 text-[13px] font-semibold text-muted">
          <span>{post.date}</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {post.readingTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedCard({post, label, readLabel}: {post: BlogCardData; label: string; readLabel: string}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-[18px] border-2 border-foreground bg-surface transition duration-200 hover:shadow-[8px_8px_0_var(--foreground)] lg:grid-cols-[1.15fr_1fr]"
    >
      <div className="relative aspect-[1200/630] overflow-hidden border-b-2 border-foreground lg:aspect-auto lg:min-h-[380px] lg:border-b-0 lg:border-r-2">
        <BlogCover variant={post.cover} className="absolute inset-0 transition duration-700 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[var(--signal)] px-3 py-1 text-[13px] font-bold text-foreground">{label}</span>
            <span className="rounded-full border-2 border-foreground px-3 py-0.5 text-[13px] font-bold text-foreground">{post.category}</span>
          </div>
          <h2 className="mt-4 text-balance text-[28px] leading-[1.08] text-foreground sm:text-[38px]">{post.title}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">{post.excerpt}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 text-[15px] font-semibold text-muted">
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
            {post.readingTime} · {post.date}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-[12px] bg-accent px-4 py-2.5 font-bold text-white">
            {readLabel}
            <ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Article grid with category chips. Works without JS: all posts are rendered by default. */
export function BlogList({posts, allLabel, title}: {posts: BlogCardData[]; allLabel: string; title: string}) {
  const categories = useMemo(() => Array.from(new Set(posts.map((post) => post.category))), [posts]);
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? posts.filter((post) => post.category === active) : posts;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-2xl text-foreground sm:text-3xl">{title}</h2>
        <div className="flex flex-wrap gap-2" role="group" aria-label={title}>
          {[null, ...categories].map((category) => {
            const selected = active === category;
            const count = category ? posts.filter((post) => post.category === category).length : posts.length;
            return (
              <button
                key={category ?? 'all'}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(category)}
                className={cn(
                  'inline-flex min-h-10 items-center gap-2 rounded-full border-2 px-4 text-[14px] font-bold transition',
                  selected ? 'border-foreground bg-foreground text-white' : 'border-border bg-surface text-foreground hover:border-foreground'
                )}
              >
                {category ?? allLabel}
                <span className={cn('text-[12px]', selected ? 'text-white/70' : 'text-muted')}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
