import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {type BlogCardData, BlogList, FeaturedCard} from '@/components/blog/blog-list';
import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {blogContent, getFormattedPostDate, getPostsForLocale} from '@/content/blog';
import {siteConfig} from '@/content/site';
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
  const featuredPost = localePosts.find((post) => post.featured) ?? localePosts[0];
  const toCard = (post: (typeof localePosts)[number]): BlogCardData => ({
    slug: post.slug,
    title: post.title[locale],
    excerpt: post.excerpt[locale],
    category: post.category[locale],
    date: getFormattedPostDate(post, locale),
    readingTime: post.readingTime[locale],
    cover: post.cover
  });
  const posts = localePosts.filter((post) => post.slug !== featuredPost.slug).map(toCard);
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

      <section className="relative overflow-hidden border-b-2 border-foreground py-12 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to bottom, black, transparent 85%)'
          }}
          aria-hidden="true"
        />
        <Container className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-surface px-3 py-1 text-[13px] font-bold text-foreground">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            {content.heroEyebrow} · {localePosts.length}
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-[42px] leading-[1.02] text-foreground sm:text-6xl">{content.heroTitle}</h1>
          <p className="mt-4 max-w-[38em] text-pretty text-lg leading-relaxed text-muted">{content.heroLead}</p>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <FeaturedCard post={toCard(featuredPost)} label={content.featured} readLabel={content.readArticle} />
          <div className="mt-14">
            <BlogList posts={posts} allLabel={content.allArticles} title={content.introTitle} />
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
