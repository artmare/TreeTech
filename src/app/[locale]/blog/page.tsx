import {ArrowUpRight, BookOpen, Clock, FileText, Tags} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {FadeIn} from '@/components/motion/fade-in';
import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {SectionHeading} from '@/components/ui/section-heading';
import {blogContent, blogPosts, getFormattedPostDate} from '@/content/blog';
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
  const [featuredPost, ...posts] = blogPosts;
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: content.metadata.title,
    description: content.metadata.description,
    inLanguage: locale === 'de' ? 'de-AT' : 'en',
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title[locale],
      datePublished: post.publishedAt,
      url: `${siteConfig.url}/${locale}/blog/${post.slug}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(blogJsonLd)}}
      />

      <section className="dark-band scanline relative overflow-hidden py-20 text-white sm:py-24">
        <div className="dark-grid absolute inset-0 opacity-45" />
        <Container className="relative">
          <FadeIn className="max-w-5xl">
            <p className="inline-flex rounded-full border border-accent/20 bg-accent/[0.08] px-3 py-2 font-mono text-sm text-accent">
              {content.heroEyebrow}
            </p>
            <h1 className="mt-6 break-words text-balance text-5xl font-semibold leading-[1.03] text-white sm:text-7xl">
              {content.heroTitle}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-white/72 sm:text-xl">
              {content.heroLead}
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <SectionHeading
              eyebrow={content.featured}
              title={featuredPost.title[locale]}
              lead={featuredPost.excerpt[locale]}
            />
            <FadeIn>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="terminal-card group block rounded-[1.25rem] p-6 transition hover:-translate-y-1 hover:border-accent/45"
              >
                <div className="flex flex-wrap gap-3 text-sm text-muted">
                  <span className="inline-flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-accent" aria-hidden="true" />
                    {featuredPost.category[locale]}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
                    {featuredPost.readingTime[locale]}
                  </span>
                </div>
                <div className="mt-8 flex items-end justify-between gap-5">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                      {getFormattedPostDate(featuredPost, locale)}
                    </p>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
                      {featuredPost.sections[0].body[locale][0]}
                    </p>
                  </div>
                  <ArrowUpRight className="h-6 w-6 shrink-0 text-accent transition group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </div>
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="warm-band py-16">
        <Container>
          <SectionHeading
            eyebrow="topics"
            title={content.introTitle}
            lead={content.introLead}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {Array.from(new Set(blogPosts.flatMap((post) => post.tags[locale]))).map((tag) => (
              <span
                key={tag}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-muted"
              >
                <Tags className="h-4 w-4 text-accent" aria-hidden="true" />
                {tag}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading title={content.allArticles} />
            <ButtonLink href="/contact" variant="secondary">
              {content.relatedCta}
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <FadeIn key={post.slug} delay={index * 0.06}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="terminal-card group flex h-full flex-col rounded-[1.25rem] p-5 transition hover:-translate-y-1 hover:border-accent/45"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                      {post.category[locale]}
                    </p>
                    <FileText className="h-5 w-5 text-accent" aria-hidden="true" />
                  </div>
                    <h2 className="mt-5 break-words text-balance text-2xl font-semibold leading-tight text-foreground">
                    {post.title[locale]}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted">{post.excerpt[locale]}</p>
                  <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5 text-xs font-semibold text-muted">
                    <span>{getFormattedPostDate(post, locale)}</span>
                    <span>{post.readingTime[locale]}</span>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    {content.readArticle}
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
