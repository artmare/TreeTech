import type {MetadataRoute} from 'next';

import {siteConfig} from '@/content/site';
import {routing} from '@/i18n/routing';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin'
    },
    sitemap: [
      `${siteConfig.url}/sitemap.xml`,
      ...routing.locales.map((locale) => `${siteConfig.url}/${locale}/sitemap.xml`)
    ],
    host: siteConfig.url
  };
}
