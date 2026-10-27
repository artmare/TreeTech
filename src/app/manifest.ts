import type {MetadataRoute} from 'next';

import {siteConfig} from '@/content/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TreeTech',
    short_name: 'TreeTech',
    description: 'AI automation, websites, CRM workflows and business process automation for Austrian companies.',
    start_url: '/de',
    scope: '/',
    display: 'standalone',
    background_color: '#070806',
    theme_color: '#070806',
    categories: ['business', 'productivity', 'technology'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    id: siteConfig.url
  };
}
