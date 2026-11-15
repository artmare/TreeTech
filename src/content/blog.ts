import type {Locale} from '@/i18n/routing';
import {handwerkPosts} from '@/content/blog-handwerk';
import {iwebPartnershipPost} from '@/content/blog-iweb';
import {remarketingPost} from '@/content/blog-remarketing';
import type {BlogPost, CoverVariant} from '@/content/blog-types';
import {limitedBlogPosts} from '@/content/blog-locales';
import {withLocaleFallbacks} from '@/i18n/localized';

export type {BlogBlock, BlogPost, BlogSection} from '@/content/blog-types';

export const blogContent = withLocaleFallbacks({
  de: {
    metadata: {
      title: 'Ratgeber für Handwerk und Dienstleister | TreeTech',
      description:
        'Praktische Artikel für Handwerksbetriebe und Dienstleister in Wien und Niederösterreich: Website-Kosten, Google-Unternehmensprofil, Google Ads, Checklisten und mehr Anfragen.'
    },
    heroEyebrow: 'Ratgeber',
    heroTitle: 'Ratgeber für Handwerk und Dienstleister.',
    heroLead:
      'Ehrliche Antworten auf die Fragen, die uns Betriebe stellen: was eine Website kostet, wie Sie bei Google gefunden werden und wie aus Besuchern Anfragen werden.',
    introTitle: 'Themen',
    introLead: 'Ohne Fachchinesisch. Jeder Artikel ist in wenigen Minuten gelesen.',
    allArticles: 'Alle Artikel',
    featured: 'Empfohlener Einstieg',
    readArticle: 'Artikel lesen',
    backToBlog: 'Zurück zum Blog',
    published: 'Veröffentlicht',
    readingTimeLabel: 'Lesezeit',
    systemTitle: 'So veröffentlichen Sie neue Beiträge',
    systemLead:
      'Neue Blogposts werden als strukturierte Einträge in einem Content-File gepflegt. Dadurch bleiben Blog, SEO-Daten, Sitemap und Artikelseiten sauber versioniert.',
    systemSteps: [
      'Öffnen Sie src/content/blog.ts.',
      'Kopieren Sie einen bestehenden Eintrag in blogPosts.',
      'Ändern Sie slug, Datum, Titel, SEO-Beschreibung, Tags und Abschnitte.',
      'Nach dem Speichern erscheint der Beitrag automatisch auf /de/blog und /en/blog sowie als eigene Artikelseite.'
    ],
    relatedCtaTitle: 'Sehen Sie Ihre Website, bevor Sie sich entscheiden.',
    relatedCtaLead: 'Name Ihres Betriebs und Ort genügen. Die Vorschau haben Sie in 3 Werktagen, kostenlos.',
    relatedCta: 'Kostenlose Vorschau anfordern',
    tocTitle: 'Inhalt',
    relatedTitle: 'Weiterlesen',
    tagsLabel: 'Themen',
    newBadge: 'Neu'
  },
  en: {
    metadata: {
      title: 'Guides for trades and service businesses | TreeTech',
      description:
        'Practical articles for trade businesses in Vienna and Lower Austria: website costs, Google Business Profile, checklists and more inquiries.'
    },
    heroEyebrow: 'Guides',
    heroTitle: 'Guides for trades and service businesses.',
    heroLead:
      'Honest answers to the questions businesses ask us: what a website costs, how to get found on Google and how to turn visitors into inquiries.',
    introTitle: 'Topics',
    introLead: 'No jargon. Every article takes a few minutes to read.',
    allArticles: 'All articles',
    featured: 'Recommended start',
    readArticle: 'Read article',
    backToBlog: 'Back to blog',
    published: 'Published',
    readingTimeLabel: 'Reading time',
    systemTitle: 'How to publish new posts',
    systemLead:
      'New blog posts are maintained as structured entries in one content file. Blog pages, SEO data, sitemap entries, and article pages stay versioned together.',
    systemSteps: [
      'Open src/content/blog.ts.',
      'Copy an existing entry in blogPosts.',
      'Change the slug, date, title, SEO description, tags, and sections.',
      'After saving, the post appears automatically on /de/blog and /en/blog and gets its own article page.'
    ],
    relatedCtaTitle: 'See your website before you decide.',
    relatedCtaLead: 'Your business name and town are enough. You get the preview within 3 working days, free of charge.',
    relatedCta: 'Get my free preview',
    tocTitle: 'Contents',
    relatedTitle: 'Keep reading',
    tagsLabel: 'Topics',
    newBadge: 'New'
  },
  ru: {
    metadata: {
      title: 'Советы для мастеров и бизнеса услуг | TreeTech',
      description:
        'Практичные статьи для мастеров в Вене и Нижней Австрии: сколько стоит сайт, профиль в Google, чек-листы и больше заявок.'
    },
    heroEyebrow: 'Советы',
    heroTitle: 'Советы для мастеров и бизнеса услуг.',
    heroLead:
      'Честные ответы на вопросы, которые нам задают: сколько стоит сайт, как вас найдут в Google и как превратить посетителей в заявки.',
    introTitle: 'Темы',
    introLead: 'Без умных слов. Каждая статья читается за несколько минут.',
    allArticles: 'Все статьи',
    featured: 'Рекомендуемый старт',
    readArticle: 'Читать статью',
    backToBlog: 'Назад к блогу',
    published: 'Опубликовано',
    readingTimeLabel: 'Время чтения',
    systemTitle: 'Как публиковать новые статьи',
    systemLead:
      'Новые статьи ведутся как структурированные записи в одном content-файле. Так блог, SEO-данные, sitemap и страницы статей остаются версионированными вместе.',
    systemSteps: [
      'Откройте src/content/blog.ts.',
      'Скопируйте существующую запись в blogPosts.',
      'Измените slug, дату, заголовок, SEO-описание, теги и разделы.',
      'После сохранения статья автоматически появится на /de/blog, /en/blog и /ru/blog, а также получит отдельную страницу.'
    ],
    relatedCtaTitle: 'Посмотрите на свой сайт, прежде чем решать.',
    relatedCtaLead: 'Достаточно названия бизнеса и города. Превью будет у вас через 3 рабочих дня, бесплатно.',
    relatedCta: 'Получить бесплатное превью',
    tocTitle: 'Содержание',
    relatedTitle: 'Читайте также',
    tagsLabel: 'Темы',
    newBadge: 'Новое'
  }
}) satisfies Record<Locale, Record<string, unknown>>;

const handwerkCovers: Record<string, CoverVariant> = {
  'website-kosten-handwerker': 'costs',
  'google-unternehmensprofil-handwerker': 'google',
  'handwerker-website-checkliste': 'checklist'
};

/** All posts, newest first. */
export const blogPosts: BlogPost[] = [
  remarketingPost,
  iwebPartnershipPost,
  ...handwerkPosts.map((post) => ({...post, cover: handwerkCovers[post.slug] ?? 'checklist'}))
]
  .map((post) => ({...post, locales: limitedBlogPosts[post.slug]}))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

/** Posts that share a category or tags with `post`, best matches first. */
export function getRelatedPosts(post: BlogPost, locale: Locale, limit = 3) {
  const tags = new Set(post.tags.de.map((tag) => tag.toLowerCase()));
  return getPostsForLocale(locale)
    .filter((item) => item.slug !== post.slug)
    .map((item) => ({
      item,
      score:
        (item.category.de === post.category.de ? 2 : 0) +
        item.tags.de.filter((tag) => tags.has(tag.toLowerCase())).length
    }))
    .sort((a, b) => b.score - a.score || b.item.publishedAt.localeCompare(a.item.publishedAt))
    .slice(0, limit)
    .map(({item}) => item);
}

export function isPostInLocale(post: BlogPost, locale: Locale) {
  return !post.locales || post.locales.includes(locale);
}

export function getPostsForLocale(locale: Locale) {
  return blogPosts.filter((post) => isPostInLocale(post, locale));
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFormattedPostDate(post: BlogPost, locale: Locale) {
  const dateLocales = {
    de: 'de-AT',
    en: 'en-US',
    ru: 'ru-RU'
  } satisfies Record<Locale, string>;

  return new Intl.DateTimeFormat(dateLocales[locale], {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(`${post.publishedAt}T00:00:00.000Z`));
}
