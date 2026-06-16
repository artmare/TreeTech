import type {MetadataRoute} from 'next';

import {demoSites} from '@/content/demo-sites';
import {portfolioProjects, siteConfig} from '@/content/site';
import type {Locale} from '@/i18n/routing';
import {routing} from '@/i18n/routing';

const staticPaths = ['', '/about', '/services', '/portfolio', '/contact'];

const sitemapPaths = [
  ...staticPaths,
  ...portfolioProjects.map((project) => `/portfolio/${project.slug}`),
  ...demoSites.map((site) => `/portfolio/${site.slug}/site`)
];

export function buildLocaleSitemap(locale: Locale): MetadataRoute.Sitemap {
  const now = new Date();

  return sitemapPaths.map((path) => ({
    url: `${siteConfig.url}/${locale}${path}`,
    lastModified: now,
    changeFrequency: path.includes('/portfolio/') ? 'monthly' : 'weekly',
    priority: path === '' ? 1 : path.includes('/portfolio/') ? 0.7 : 0.85
  }));
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

      return [
        '<url>',
        `<loc>${escapeXml(entry.url)}</loc>`,
        `<lastmod>${lastModified}</lastmod>`,
        changeFrequency,
        priority,
        '</url>'
      ].filter(Boolean).join('');
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
