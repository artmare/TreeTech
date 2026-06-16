import type {MetadataRoute} from 'next';

import {siteConfig} from '@/content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: [
      `${siteConfig.url}/sitemap.xml`,
      `${siteConfig.url}/de/sitemap.xml`,
      `${siteConfig.url}/en/sitemap.xml`
    ]
  };
}
