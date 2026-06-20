import {ArrowLeft, Clock, Tags} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {FadeIn} from '@/components/motion/fade-in';
import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {blogContent, blogPosts, getBlogPostBySlug, getFormattedPostDate} from '@/content/blog';
import {siteConfig} from '@/content/site';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.map((post) => ({locale, slug: post.slug}))
  );
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale: rawLocale, slug} = await params;
  const post = getBlogPostBySlug(slug);

  if (!hasLocale(routing.locales, rawLocale) || !post) {
    return {};
  }

  const locale = rawLocale;

  return createPageMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title: post.seoTitle[locale],
    description: post.seoDescription[locale]
  });
}

export default async function BlogPostPage({params}: PageProps) {
  const {locale: rawLocale, slug} = await params;

  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  setRequestLocale(locale);
  const content = blogContent[locale];
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title[locale],
    description: post.excerpt[locale],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url
    },
    mainEntityOfPage: `${siteConfig.url}/${locale}/blog/${post.slug}`,
    inLanguage: locale === 'de' ? 'de-AT' : 'en'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(articleJsonLd)}}
      />

      <section className="dark-band relative overflow-hidden py-10 text-white sm:py-14">
        <div className="dark-grid absolute inset-0 opacity-30" />
        <Container className="relative">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{content.backToBlog}</span>
          </Link>
        </Container>
      </section>

      <article>
        <section className="dark-band scanline relative overflow-hidden pb-16 text-white">
          <div className="dark-grid absolute inset-0 opacity-35" />
          <Container className="relative">
            <FadeIn className="max-w-4xl">
              <p className="inline-flex rounded-full border border-accent/20 bg-accent/[0.08] px-3 py-2 font-mono text-sm text-accent">
                {post.category[locale]}
              </p>
              <h1 className="mt-6 break-words text-balance text-5xl font-semibold leading-[1.03] text-white sm:text-7xl">
                {post.title[locale]}
              </h1>
              <p className="mt-6 text-pretty text-lg leading-8 text-white/72 sm:text-xl">
                {post.excerpt[locale]}
              </p>
              <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-white/70">
                <span>{content.published}: {getFormattedPostDate(post, locale)}</span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
                  {content.readingTimeLabel}: {post.readingTime[locale]}
                </span>
              </div>
            </FadeIn>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="mx-auto grid max-w-4xl gap-12">
              {post.sections.map((section, index) => (
                <FadeIn key={section.heading[locale]} delay={index * 0.06}>
                  <section className="border-b border-white/10 pb-10 last:border-b-0 last:pb-0">
                    <h2 className="break-words text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                      {section.heading[locale]}
                    </h2>
                    <div className="mt-6 grid gap-5">
                      {section.body[locale].map((paragraph) => (
                        <p key={paragraph} className="text-pretty text-base leading-8 text-muted sm:text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                </FadeIn>
              ))}

              <div className="flex flex-wrap gap-3">
                {post.tags[locale].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-muted"
                  >
                    <Tags className="h-4 w-4 text-accent" aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </article>

      <section className="warm-band py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="break-words text-balance text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
                {content.relatedCtaTitle}
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">
                {content.relatedCtaLead}
              </p>
            </div>
            <ButtonLink href="/contact" variant="accent">
              {content.relatedCta}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
