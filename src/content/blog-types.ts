import type {Locale} from '@/i18n/routing';

/**
 * Building blocks for blog articles.
 *
 * A plain string is a paragraph. Inside any text you can use **bold** and
 * [link text](https://example.com) or [internal link](/blog/slug).
 */
export type IllustrationName =
  | 'remarketing-journey'
  | 'intent-ladder'
  | 'consent-audience'
  | 'channel-priority'
  | 'partnership-split';

export type CoverVariant = 'costs' | 'google' | 'checklist' | 'remarketing' | 'partnership';

export type BlogBlock =
  | string
  | {type: 'lead'; text: string}
  | {type: 'list'; style?: 'bullet' | 'check' | 'number'; items: string[]}
  | {type: 'callout'; tone: 'info' | 'tip' | 'warn'; title?: string; text: string}
  | {type: 'quote'; text: string; cite?: string}
  | {type: 'table'; head: string[]; rows: string[][]}
  | {type: 'illustration'; name: IllustrationName; caption?: string}
  | {type: 'image'; src: string; alt: string; width: number; height: number; caption?: string}
  | {type: 'gallery'; items: Array<{src: string; alt: string; width: number; height: number}>; caption?: string}
  | {type: 'stats'; items: Array<{value: string; label: string}>; note?: string}
  | {type: 'steps'; items: Array<{title: string; text: string}>}
  | {type: 'flow'; items: string[]}
  | {type: 'qa'; items: Array<{q: string; a: string}>}
  | {type: 'sources'; groups: Array<{title: string; items: Array<{label: string; href: string; note?: string}>}>};

export type BlogSection = {
  heading: Record<Locale, string>;
  body: Record<Locale, BlogBlock[]>;
};

export type BlogPost = {
  slug: string;
  publishedAt: string;
  category: Record<Locale, string>;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  seoTitle: Record<Locale, string>;
  seoDescription: Record<Locale, string>;
  readingTime: Record<Locale, string>;
  tags: Record<Locale, string[]>;
  sections: BlogSection[];
  /** Illustration shown on the blog cards and at the top of the article. */
  cover: CoverVariant;
  /** Shown as the big card at the top of /blog. The newest featured post wins. */
  featured?: boolean;
  /** Languages the post is written in. Missing means all. */
  locales?: Locale[];
};
