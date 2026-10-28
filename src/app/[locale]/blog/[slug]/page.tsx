import {ArrowLeft, Clock, Phone} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {blogContent, blogPosts, getBlogPostBySlug, getFormattedPostDate, isPostInLocale} from '@/content/blog';
import {phoneHref, siteConfig} from '@/content/site';
import {Link} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';
import {softHyphens} from '@/lib/utils';

type PageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.filter((post) => isPostInLocale(post, locale)).map((post) => ({locale, slug: post.slug}))
  );
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {locale: rawLocale, slug} = await params;
  const post = getBlogPostBySlug(slug);

  if (!hasLocale(routing.locales, rawLocale) || !post || !isPostInLocale(post, rawLocale)) {
    return {};
  }

  const locale = rawLocale;

  return createPageMetadata({
    locale,
    locales: routing.locales.filter((item) => isPostInLocale(post, item)),
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
  const schemaLanguages = {
    de: 'de-AT',
    en: 'en',
    ru: 'ru-RU'
  } satisfies Record<typeof locale, string>;

  if (!post || !isPostInLocale(post, locale)) {
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
    inLanguage: schemaLanguages[locale]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(articleJsonLd)}} />

      <article>
        <header className="border-b-2 border-foreground py-10 sm:py-14">
          <Container>
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center gap-2 text-[15px] font-bold text-muted transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>{content.backToBlog}</span>
            </Link>
            <p className="mt-4 text-base font-bold text-accent">{post.category[locale]}</p>
            <h1 className="mt-2 max-w-4xl text-balance text-[38px] leading-[1.05] text-foreground sm:text-[56px]">
              {softHyphens(post.title[locale])}
            </h1>
            <p className="mt-4 max-w-[38em] text-pretty text-lg leading-relaxed text-muted">{post.excerpt[locale]}</p>
            <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[15px] font-semibold text-muted">
              <span>
                {content.published}: {getFormattedPostDate(post, locale)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
                {content.readingTimeLabel}: {post.readingTime[locale]}
              </span>
            </p>
          </Container>
        </header>

        <div className="bg-surface py-12 sm:py-16">
          <Container>
            <div className="mx-auto grid max-w-[44rem] gap-10 [&>section]:min-w-0">
              {post.sections.map((section) => (
                <section key={section.heading[locale]}>
                  <h2 className="text-balance text-[26px] leading-tight text-foreground sm:text-[32px]">
                    {softHyphens(section.heading[locale])}
                  </h2>
                  <div className="mt-4 grid gap-4">
                    {section.body[locale].map((paragraph) => (
                      <p key={paragraph} className="text-pretty text-[18px] leading-[1.7] text-foreground/90">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </Container>
        </div>
      </article>

      <section className="bg-accent py-14 text-white">
        <Container>
          <h2 className="max-w-3xl text-balance text-[30px] leading-[1.08] sm:text-[44px]">{content.relatedCtaTitle}</h2>
          <p className="mt-3 max-w-[38em] text-[17px] text-white/85">{content.relatedCtaLead}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact#audit-call" variant="signal" trackingEvent="cta_preview_blog_post">
              {content.relatedCta}
            </ButtonLink>
            <ButtonLink href={phoneHref} variant="onDark" icon={Phone} trackingEvent="phone_click">
              {siteConfig.phone}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
