import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en', 'ru'],
  defaultLocale: 'de',
  localeDetection: false,
  localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];

export const localeLabels = {
  de: 'Deutsch',
  en: 'English',
  ru: 'Русский'
} satisfies Record<Locale, string>;

export const localeShortLabels = {
  de: 'DE',
  en: 'EN',
  ru: 'RU'
} satisfies Record<Locale, string>;
