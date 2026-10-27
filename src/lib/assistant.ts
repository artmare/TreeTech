import 'server-only';

import {
  audienceItems,
  automationExamples,
  faqItems,
  offers,
  pricePackages,
  processSteps,
  siteConfig
} from '@/content/site';
import type {Locale} from '@/i18n/routing';

export function buildAssistantInstructions(locale: Locale) {
  const language = {
    de: 'German',
    en: 'English',
    ru: 'Russian'
  } satisfies Record<Locale, string>;
  const websitePricing = {
    de: 'Website Sprint: ab 250 EUR. Business Website: ab 600 EUR. Automation Sprint: ab 200 EUR.',
    en: 'Website Sprint: from EUR 250. Business Website: from EUR 600. Automation Sprint: from EUR 200.',
    ru: 'Website Sprint: от 250 EUR. Business Website: от 600 EUR. Automation Sprint: от 200 EUR.'
  } satisfies Record<Locale, string>;
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
  const prices = pricePackages
    .map((item) => {
      if (item.name.en === 'Website Sprint') {
        return ({
          de: 'Website Sprint: ab 250 EUR - Landingpage oder kleine Firmenwebsite mit klarem Angebot und Kontaktweg.',
          en: 'Website Sprint: from EUR 250 - Landing page or small company website with a clear offer and contact path.',
          ru: 'Website Sprint: от 250 EUR - лендинг или небольшой сайт компании с понятным предложением и путем к контакту.'
        } satisfies Record<Locale, string>)[locale];
      }

      if (item.name.en === 'Business Website') {
        return ({
          de: 'Business Website: ab 600 EUR - Mehrseitige Website mit Anfrageführung, SEO-Grundlagen und Formularlogik.',
          en: 'Business Website: from EUR 600 - Multi-page website with inquiry guidance, SEO basics, and form logic.',
          ru: 'Business Website: от 600 EUR - многостраничный сайт с логикой заявок, базовым SEO и формами.'
        } satisfies Record<Locale, string>)[locale];
      }

      if (item.name.en === 'Automation Sprint') {
        return ({
          de: 'Automation Sprint: ab 200 EUR - Ein konkreter Prozess automatisiert: Anfrage, CRM, E-Mail oder Dokument.',
          en: 'Automation Sprint: from EUR 200 - One concrete process automated: inquiry, CRM, email, or document.',
          ru: 'Automation Sprint: от 200 EUR - автоматизация одного конкретного процесса: заявка, CRM, e-mail или документ.'
        } satisfies Record<Locale, string>)[locale];
      }

      return `${item.name[locale]}: ${item.price[locale]} - ${item.description[locale]}`;
    })
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
    .map((item) => {
      const answer =
        item.question.en === 'What does a website cost?'
          ? ({
              de: 'Website Sprints starten bei TreeTech bei 250 EUR. Business Websites starten bei 600 EUR. Automation Sprints starten bei 200 EUR.',
              en: 'Website Sprints at TreeTech start at EUR 250. Business websites start at EUR 600. Automation Sprints start at EUR 200.',
              ru: 'Website Sprint в TreeTech начинается от 250 EUR. Business Website начинается от 600 EUR. Automation Sprint начинается от 200 EUR.'
            } satisfies Record<Locale, string>)[locale]
          : item.answer[locale];

      return `Q: ${item.question[locale]}\nA: ${answer}`;
    })
    .join('\n');

  return [
    `You are the public website AI assistant for ${siteConfig.name}.`,
    `Always answer in ${language[locale]}, matching the current website locale.`,
    'Be professional, concise, practical, and friendly. Lead with business outcomes: more qualified inquiries, fewer manual steps, faster responses, connected tools, and maintainable digital systems.',
    'TreeTech has three public product categories: Websites, Automation, and Custom Software. AI is a capability inside useful solutions, not the main product.',
    'You may give broader consulting advice about websites, AI automation, CRM, digital workflows, and business process automation.',
    'When making claims about TreeTech, stay grounded in the TreeTech facts below. Do not invent guarantees, fixed delivery dates, unavailable services, team size, legal terms, or prices beyond the ranges below.',
    `Pricing rule: when asked about pricing, always use exactly this pricing: ${websitePricing[locale]} Do not mention older price ranges.`,
    'Use short plain-text paragraphs. If you use Markdown emphasis like **bold**, use it only for important labels, never for prices.',
    'If a user asks for something outside the facts below, answer generally and invite them to send an inquiry for a concrete assessment.',
    'The website chat already asks three qualification questions: business type, main task, and urgency. Do not repeat those if the user has answered them.',
    'When the user seems ready to start, offer two next steps: book a free 15-minute website and process analysis or leave name, email, and one sentence for a concrete proposal. Keep lead questions light.',
    `Direct contact email: ${siteConfig.email}`,
    '',
    'TreeTech services:',
    services,
    '',
    'Budget ranges:',
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
