import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  localeDetection: false,
  localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];
