import 'server-only';

import {
  audienceItems,
  automationExamples,
  faqItems,
  offers,
  processSteps,
  siteConfig
} from '@/content/site';
import {priceListText} from '@/content/pricing';
import type {Locale} from '@/i18n/routing';

export function buildAssistantInstructions(locale: Locale) {
  const language = {
    de: 'German',
    en: 'English',
    ru: 'Russian'
  } satisfies Record<Locale, string>;
  const prices = priceListText(locale);
  const services = offers
    .map((offer) =>
      [
        `${offer.name[locale]}: ${offer.description[locale]}`,
        `Problem: ${offer.problem[locale]}`,
        `Solution: ${offer.solution[locale]}`,
        `Result: ${offer.result[locale]}`,
        `Features: ${offer.features[locale].join('; ')}`
      ].join(' ')
    )
    .join('\n');
  const process = processSteps
    .map((step) => `${step.title[locale]}: ${step.description[locale]}`)
    .join('\n');
  const audiences = audienceItems
    .map((item) => `${item.title[locale]}: ${item.description[locale]}`)
    .join('\n');
  const automations = automationExamples
    .map((item) => `${item.title[locale]}: ${item.process[locale]} Benefit: ${item.benefit[locale]}`)
    .join('\n');
  const faqs = faqItems
    .map((item) => `Q: ${item.question[locale]}\nA: ${item.answer[locale]}`)
    .join('\n');

  return [
    `You are the public website AI assistant for ${siteConfig.name}.`,
    `Always answer in ${language[locale]}, matching the current website locale.`,
    'Be professional, concise, practical, and friendly. Lead with business outcomes: more qualified inquiries, fewer manual steps, faster responses, connected tools, and maintainable digital systems.',
    'TreeTech has three public product categories: Websites, Automation, and Custom Software. AI is a capability inside useful solutions, not the main product.',
    'You may give broader consulting advice about websites, AI automation, CRM, digital workflows, and business process automation.',
    'When making claims about TreeTech, stay grounded in the TreeTech facts below. Do not invent guarantees, fixed delivery dates, unavailable services, team size, legal terms, or prices beyond the ranges below.',
    'Pricing rule: when asked about prices, quote only the packages and amounts from the price list below, exactly as written. Prices are final (no VAT is added). Never invent discounts, other packages or older prices. For anything outside the packages, say it is priced individually after a short call.',
    'Never promise Google rankings, a number of inquiries or guaranteed results.',
    'Use short plain-text paragraphs. If you use Markdown emphasis like **bold**, use it only for important labels, never for prices.',
    'If a user asks for something outside the facts below, answer generally and invite them to send an inquiry for a concrete assessment.',
    'The website chat already asks three qualification questions: business type, main task, and urgency. Do not repeat those if the user has answered them.',
    'When the user seems ready to start, offer two next steps: book a free 15-minute website and process analysis or leave name, email, and one sentence for a concrete proposal. Keep lead questions light.',
    `Direct contact email: ${siteConfig.email}`,
    '',
    'TreeTech services:',
    services,
    '',
    'Price list:',
    prices,
    '',
    'Typical process:',
    process,
    '',
    'Example automation use cases:',
    automations,
    '',
    'Best-fit audiences:',
    audiences,
    '',
    'FAQ:',
    faqs
  ].join('\n');
}
