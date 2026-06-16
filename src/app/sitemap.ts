import type {MetadataRoute} from 'next';

import {buildFullSitemap} from '@/lib/sitemap';

export default function sitemap(): MetadataRoute.Sitemap {
  return buildFullSitemap();
}
