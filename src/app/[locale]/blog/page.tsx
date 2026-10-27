import {ArrowUpRight, Clock} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {blogContent, getFormattedPostDate, getPostsForLocale} from '@/content/blog';
import {siteConfig} from '@/content/site';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const rawLocale = (await params).locale;

  if (!hasLocale(routing.locales, rawLocale)) {
    return {};
  }

  const locale = rawLocale;
  const content = blogContent[locale];

  return createPageMetadata({
    locale,
    path: '/blog',
    title: content.metadata.title,
    description: content.metadata.description
  });
}

export default async function BlogPage({params}: PageProps) {
  const rawLocale = (await params).locale;

  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  setRequestLocale(locale);
  const content = blogContent[locale];
  const schemaLanguages = {
    de: 'de-AT',
    en: 'en',
    ru: 'ru-RU'
  } satisfies Record<typeof locale, string>;
  const localePosts = getPostsForLocale(locale);
  const [featuredPost, ...posts] = localePosts;
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: content.metadata.title,
    description: content.metadata.description,
    inLanguage: schemaLanguages[locale],
    blogPost: localePosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title[locale],
      datePublished: post.publishedAt,
      url: `${siteConfig.url}/${locale}/blog/${post.slug}`
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(blogJsonLd)}} />

      <section className="border-b-2 border-foreground py-12 sm:py-16">
        <Container>
          <h1 className="max-w-4xl text-balance text-[42px] leading-[1.02] text-foreground sm:text-6xl">{content.heroTitle}</h1>
          <p className="mt-4 max-w-[38em] text-pretty text-lg leading-relaxed text-muted">{content.heroLead}</p>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group grid gap-6 rounded-[14px] border-2 border-foreground bg-surface p-6 transition hover:shadow-[4px_4px_0_var(--foreground)] sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
          >
            <div>
              <p className="text-base font-bold text-accent">{content.featured}</p>
              <h2 className="mt-2 text-balance text-[30px] leading-[1.08] text-foreground sm:text-[40px]">
                {featuredPost.title[locale]}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted">{featuredPost.excerpt[locale]}</p>
            </div>
            <div className="flex items-center justify-between gap-4 text-[15px] font-semibold text-muted lg:justify-end lg:gap-6">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
                {featuredPost.readingTime[locale]}
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-accent">
                {content.readArticle}
                <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </div>
          </Link>

          <h2 className="mt-14 text-2xl text-foreground sm:text-3xl">{content.allArticles}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-[14px] border-2 border-border bg-surface p-5 transition hover:border-foreground"
              >
                <p className="text-sm font-bold text-accent">{post.category[locale]}</p>
                <h3 className="mt-2 text-balance text-xl font-bold leading-snug text-foreground">{post.title[locale]}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{post.excerpt[locale]}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4 text-sm font-semibold text-muted">
                  <span>{getFormattedPostDate(post, locale)}</span>
                  <span>{post.readingTime[locale]}</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-accent py-14 text-white">
        <Container>
          <h2 className="max-w-3xl text-balance text-[30px] leading-[1.08] sm:text-[44px]">{content.relatedCtaTitle}</h2>
          <p className="mt-3 max-w-[38em] text-[17px] text-white/85">{content.relatedCtaLead}</p>
          <div className="mt-7">
            <ButtonLink href="/contact#audit-call" variant="signal" trackingEvent="cta_preview_blog">
              {content.relatedCta}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
