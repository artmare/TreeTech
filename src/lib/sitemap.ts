import type {MetadataRoute} from 'next';

import {blogPosts, isPostInLocale} from '@/content/blog';
import {demoSites} from '@/content/demo-sites';
import {servicePages} from '@/content/service-pages';
import {portfolioProjects, siteConfig} from '@/content/site';
import type {Locale} from '@/i18n/routing';
import {routing} from '@/i18n/routing';

const staticPaths = ['', '/about', '/services', '/blog', '/portfolio', '/contact'];

const sitemapPaths = [
  ...staticPaths,
  ...servicePages.map((page) => `/${page.slug}`),
  ...portfolioProjects.map((project) => `/portfolio/${project.slug}`),
  ...demoSites.map((site) => `/portfolio/${site.slug}/site`)
];

export function buildLocaleSitemap(locale: Locale): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = sitemapPaths.map((path) => ({
    url: `${siteConfig.url}/${locale}${path}`,
    lastModified: now,
    changeFrequency: path.includes('/portfolio/') ? ('monthly' as const) : ('weekly' as const),
    priority: path === '' ? 1 : path.includes('/portfolio/') ? 0.7 : 0.85,
    alternates: {
      languages: buildAlternateLanguages(path)
    }
  }));
  // Blog posts only exist in the languages they were written in.
  const posts = blogPosts
    .filter((post) => isPostInLocale(post, locale))
    .map((post) => {
      const path = `/blog/${post.slug}`;
      const locales = routing.locales.filter((item) => isPostInLocale(post, item));
      return {
        url: `${siteConfig.url}/${locale}${path}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.75,
        alternates: {
          languages: buildAlternateLanguages(path, locales)
        }
      };
    });

  return [...pages, ...posts];
}

export function buildFullSitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) => buildLocaleSitemap(locale));
}

export function serializeSitemap(entries: MetadataRoute.Sitemap) {
  const urls = entries
    .map((entry) => {
      const lastModified = entry.lastModified
        ? new Date(entry.lastModified).toISOString()
        : new Date().toISOString();
      const changeFrequency = entry.changeFrequency
        ? `<changefreq>${entry.changeFrequency}</changefreq>`
        : '';
      const priority = typeof entry.priority === 'number'
        ? `<priority>${entry.priority}</priority>`
        : '';
      const alternates = entry.alternates?.languages
        ? Object.entries(entry.alternates.languages)
            .filter((entry): entry is [string, string] => typeof entry[1] === 'string')
            .map(([language, href]) => (
              `<xhtml:link rel="alternate" hreflang="${escapeXml(language)}" href="${escapeXml(href)}" />`
            ))
            .join('')
        : '';

      return [
        '<url>',
        `<loc>${escapeXml(entry.url)}</loc>`,
        `<lastmod>${lastModified}</lastmod>`,
        alternates,
        changeFrequency,
        priority,
        '</url>'
      ].filter(Boolean).join('');
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;
}

function buildAlternateLanguages(path: string, locales: readonly Locale[] = routing.locales) {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((locale) => [
      locale,
      `${siteConfig.url}/${locale}${path}`
    ])
  );
  languages['x-default'] = `${siteConfig.url}/${routing.defaultLocale}${path}`;

  return languages;
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
