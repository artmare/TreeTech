import type {MetadataRoute} from 'next';

import {portfolioProjects, siteConfig} from '@/content/site';
import {routing} from '@/i18n/routing';

const staticPaths = ['', '/about', '/services', '/portfolio', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...portfolioProjects.map((project) => `/portfolio/${project.slug}`)
  ];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path.includes('/portfolio/') ? 'monthly' : 'weekly',
      priority: path === '' ? 1 : path.includes('/portfolio/') ? 0.7 : 0.85
    }))
  );
}
