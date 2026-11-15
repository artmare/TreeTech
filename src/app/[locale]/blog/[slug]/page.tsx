import {ArrowLeft, Calendar, ChevronDown, Clock, MessageCircle, Phone} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {BlogBlocks} from '@/components/blog/blog-blocks';
import {BlogCover} from '@/components/blog/blog-cover';
import {BlogCard} from '@/components/blog/blog-list';
import {BlogToc, ReadingProgress} from '@/components/blog/blog-reading';
import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {blogContent, blogPosts, getBlogPostBySlug, getFormattedPostDate, getRelatedPosts, isPostInLocale} from '@/content/blog';
import {phoneHref, siteConfig, whatsappHref} from '@/content/site';
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
    inLanguage: schemaLanguages[locale],
    keywords: post.tags[locale].join(', ')
  };
  const tocItems = post.sections.map((section, index) => ({id: `section-${index + 1}`, label: section.heading[locale]}));
  const related = getRelatedPosts(post, locale).map((item) => ({
    slug: item.slug,
    title: item.title[locale],
    excerpt: item.excerpt[locale],
    category: item.category[locale],
    date: getFormattedPostDate(item, locale),
    readingTime: item.readingTime[locale],
    cover: item.cover
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(articleJsonLd)}} />

      <ReadingProgress targetId="article-body" />

      <article>
        <header className="pb-10 pt-8 sm:pb-12 sm:pt-12">
          <Container>
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center gap-2 text-[15px] font-bold text-muted transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>{content.backToBlog}</span>
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-accent px-3 py-1 text-[13px] font-bold text-white">{post.category[locale]}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-border bg-surface px-3 py-0.5 text-[13px] font-semibold text-muted">
                <Clock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                {post.readingTime[locale]}
              </span>
            </div>
            <h1 className="mt-4 max-w-4xl text-balance text-[36px] leading-[1.05] text-foreground sm:text-[54px]">
              {softHyphens(post.title[locale])}
            </h1>
            <p className="mt-4 max-w-[40em] text-pretty text-lg leading-relaxed text-muted sm:text-xl">{post.excerpt[locale]}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] font-semibold text-muted">
              <span className="inline-flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground" aria-hidden="true">
                  <span className="h-4 w-2 rounded-[2px] bg-[var(--signal)]" />
                </span>
                <span className="text-foreground">{siteConfig.name}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" aria-hidden="true" />
                {content.published}: {getFormattedPostDate(post, locale)}
              </span>
            </div>
          </Container>
        </header>

        <Container>
          <div className="relative aspect-[1200/630] overflow-hidden rounded-[18px] border-2 border-foreground shadow-[6px_6px_0_var(--foreground)]">
            <BlogCover variant={post.cover} className="absolute inset-0" />
          </div>
        </Container>

        <div id="article-body" className="py-12 sm:py-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
              <div className="mx-auto w-full max-w-[46rem] min-w-0 lg:mx-0">
                <details className="group mb-10 rounded-[14px] border-2 border-foreground bg-surface lg:hidden">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 text-[15px] font-bold text-foreground">
                    {content.tocTitle}
                    <ChevronDown className="h-5 w-5 transition group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <ol className="grid gap-1 border-t-2 border-border px-4 py-3">
                    {tocItems.map((item, index) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} className="flex gap-2 py-1 text-[15px] text-muted hover:text-foreground">
                          <span className="w-5 shrink-0 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>

                <div className="grid gap-14">
                  {post.sections.map((section, index) => (
                    <section key={section.heading[locale]} id={`section-${index + 1}`} className="scroll-mt-28">
                      <h2 className="flex items-start gap-3 text-balance text-[23px] leading-tight text-foreground sm:text-[32px]">
                        <span
                          className="mt-1 shrink-0 rounded-[8px] bg-[var(--signal)] px-2 py-0.5 text-[14px] font-extrabold tabular-nums text-foreground sm:mt-1.5 sm:text-[15px]"
                          aria-hidden="true"
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span>{softHyphens(section.heading[locale])}</span>
                      </h2>
                      <BlogBlocks blocks={section.body[locale]} locale={locale} />
                    </section>
                  ))}
                </div>

                <div className="mt-14 border-t-2 border-foreground pt-6">
                  <p className="text-[13px] font-bold uppercase tracking-wide text-muted">{content.tagsLabel}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {post.tags[locale].map((tag) => (
                      <li key={tag} className="rounded-full border-2 border-border bg-surface px-3 py-1 text-[14px] font-semibold text-foreground">
                        #{tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <aside className="hidden lg:block">
                <div className="sticky top-28 grid gap-6">
                  <BlogToc items={tocItems} title={content.tocTitle} />
                  <div className="rounded-[14px] border-2 border-foreground bg-[var(--signal)] p-5">
                    <p className="text-[18px] font-extrabold leading-tight text-foreground" style={{fontStretch: '110%'}}>
                      {content.relatedCtaTitle}
                    </p>
                    <p className="mt-2 text-[14px] leading-snug text-foreground/80">{content.relatedCtaLead}</p>
                    <a
                      href={whatsappHref(post.title[locale])}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="whatsapp_click_blog_sidebar"
                      className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-foreground px-4 text-[14px] font-bold text-white transition hover:bg-accent"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </div>
      </article>

      {related.length ? (
        <section className="border-t-2 border-foreground bg-surface py-12 sm:py-16">
          <Container>
            <h2 className="text-2xl text-foreground sm:text-3xl">{content.relatedTitle}</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

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
