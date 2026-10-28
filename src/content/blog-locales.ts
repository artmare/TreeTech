import type {Locale} from '@/i18n/routing';

/**
 * Blog posts that are not written in every language. Small on purpose, so the
 * language switcher in the header can use it without loading all articles.
 */
export const limitedBlogPosts: Record<string, Locale[]> = {
  'business-processes-to-automate-first': ['de', 'en'],
  'ai-tools-for-companies': ['de', 'en'],
  'crm-automation-for-small-businesses': ['de', 'en'],
  'modern-websites-for-austrian-businesses': ['de', 'en'],
  'save-time-with-ai-automation': ['de', 'en']
};

/** Where the language switcher should send someone on `pathname` who picks `target`. */
export function localizedSwitchPath(pathname: string, target: Locale) {
  const match = pathname.match(/^\/blog\/([^/]+)\/?$/);
  const locales = match ? limitedBlogPosts[match[1]] : undefined;
  return locales && !locales.includes(target) ? '/blog' : pathname;
}
