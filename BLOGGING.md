# TreeTech Blog Publishing

Blog posts are file-based and live in `src/content/blog.ts`.

## Add A New Post

1. Open `src/content/blog.ts`.
2. Copy one object inside `blogPosts`.
3. Change these fields:
   - `slug`: URL part, for example `crm-automation-checklist`
   - `publishedAt`: date in `YYYY-MM-DD`
   - `category`: category label for German and English
   - `title`: article title for German and English
   - `excerpt`: short summary shown on the blog page
   - `seoTitle` and `seoDescription`: metadata for Google
   - `readingTime`: visible reading time
   - `tags`: search topics and article labels
   - `sections`: article body, grouped by headings and paragraphs
4. Save the file.
5. Visit `/de/blog` and `/en/blog` to confirm the post appears.

## Content Rules

- Keep one idea per article.
- Write for Austrian business owners, not developers.
- Use practical language: time saved, fewer manual steps, faster inquiries, better customer experience.
- Use keywords naturally in headings, excerpts, and body text.
- Do not publish a post until both German and English fields are filled.

## URL Rules

- Use lowercase slugs.
- Use hyphens instead of spaces.
- Do not change a slug after publishing unless you also add a redirect.

Example:

```ts
{
  slug: 'crm-automation-checklist',
  publishedAt: '2026-06-19',
  category: {de: 'CRM Automation', en: 'CRM Automation'},
  title: {
    de: 'CRM Automation Checkliste für kleine Unternehmen',
    en: 'CRM automation checklist for small businesses'
  },
  ...
}
```
