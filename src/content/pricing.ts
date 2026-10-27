import type {Locale} from '@/i18n/routing';

/**
 * Single source of truth for TreeTech prices.
 *
 * Every price shown on the website (home page cards, FAQ, service pages)
 * and every price the AI assistant quotes is generated from this file.
 * Change a number here and it changes everywhere.
 *
 * Prices are final prices. TreeTech plans to use the Austrian small-business
 * VAT exemption (Kleinunternehmerregelung), so no VAT is added on top.
 */

type Text = Record<Locale, string>;

export type PackageId =
  | 'websiteStart'
  | 'websiteBusiness'
  | 'websiteAbo'
  | 'relaunch'
  | 'pflege'
  | 'pflegePlus'
  | 'anfrageAutomation'
  | 'kiAssistent'
  | 'automationSprint'
  | 'analyseWorkshop'
  | 'webApp';

export type PackageCategory = 'websites' | 'care' | 'automation' | 'software';

export type PricePackageDefinition = {
  id: PackageId;
  category: PackageCategory;
  name: string;
  /** One-time price in EUR. */
  oneTime?: number;
  /** Monthly price in EUR. */
  monthly?: number;
  /** Prices are starting prices ("ab"). */
  from?: boolean;
  /** Minimum contract term in months for subscriptions. */
  minTermMonths?: number;
  delivery?: Text;
  tagline: Text;
  includes: Record<Locale, string[]>;
};

export const founderOffer = {
  packageId: 'websiteStart' as PackageId,
  price: 590,
  slots: 3,
  condition: {
    de: 'für die ersten 3 Betriebe, im Austausch gegen eine ehrliche Google-Bewertung und die Erlaubnis, das Projekt als Referenz zu zeigen',
    en: 'for the first 3 businesses, in exchange for an honest Google review and permission to show the project as a reference',
    ru: 'для первых 3 бизнесов в обмен на честный отзыв в Google и разрешение показывать проект как кейс'
  } satisfies Text
};

export const hourlyRate = 65;

export const paymentTerms: Text = {
  de: '50 % bei Auftrag, 50 % beim Launch. Auf Wunsch in 2 Raten. Pflege-Pakete monatlich kündbar.',
  en: '50% on order, 50% at launch. Two instalments on request. Care plans can be cancelled monthly.',
  ru: '50 % при заказе, 50 % при запуске. По запросу можно в 2 платежа. Пакеты Pflege расторгаются помесячно.'
};

// TODO(legal): once the Gewerbe is registered, add the Kleinunternehmerregelung
// wording here ("umsatzsteuerbefreit gemäß Kleinunternehmerregelung").
export const vatNote: Text = {
  de: 'Alle Preise sind Endpreise, ohne versteckte Kosten.',
  en: 'All prices are final prices, with no hidden costs.',
  ru: 'Все цены конечные, без скрытых доплат.'
};

export const packages: PricePackageDefinition[] = [
  {
    id: 'websiteStart',
    category: 'websites',
    name: 'Website Start',
    oneTime: 990,
    delivery: {de: 'online in 7 Tagen', en: 'live in 7 days', ru: 'онлайн за 7 дней'},
    tagline: {
      de: 'Für Betriebe, die endlich professionell gefunden werden wollen.',
      en: 'For businesses that finally want to be found professionally online.',
      ru: 'Для бизнеса, который хочет, чтобы его наконец нормально находили в интернете.'
    },
    includes: {
      de: ['Bis zu 5 Seiten inkl. Impressum und Datenschutz', 'Texte schreiben wir nach einem 30-Minuten-Gespräch', 'Anruf- und WhatsApp-Button, Anfrageformular, Karte', 'Einrichtung Ihres Google-Unternehmensprofils', 'Lokale SEO-Grundlagen, schnell und mobiloptimiert', '2 Korrekturrunden'],
      en: ['Up to 5 pages incl. legal notice and privacy policy', 'We write the copy after a 30-minute call', 'Call and WhatsApp buttons, inquiry form, map', 'Google Business Profile setup', 'Local SEO basics, fast and mobile-first', '2 rounds of revisions'],
      ru: ['До 5 страниц, включая Impressum и Datenschutz', 'Тексты пишем мы по итогам 30-минутного разговора', 'Кнопки звонка и WhatsApp, форма заявки, карта', 'Настройка профиля в Google', 'Базовое локальное SEO, быстрая мобильная версия', '2 раунда правок']
    }
  },
  {
    id: 'websiteBusiness',
    category: 'websites',
    name: 'Website Business',
    oneTime: 1890,
    delivery: {de: 'online in 14 Tagen', en: 'live in 14 days', ru: 'онлайн за 14 дней'},
    tagline: {
      de: 'Für Betriebe mit mehreren Leistungen oder Einsatzorten, die mehr Anfragen aus Google wollen.',
      en: 'For businesses with several services or service areas that want more inquiries from Google.',
      ru: 'Для бизнеса с несколькими услугами или районами работы, которому нужно больше заявок из Google.'
    },
    includes: {
      de: ['Alles aus Website Start, bis zu 10 Seiten', 'Eigene Seite pro Leistung und bis zu 3 Orts-Seiten', 'Anfrage mit Foto-Upload und Dringlichkeit, Referenzgalerie, Bewertungen', 'Strukturierte Daten (LocalBusiness) für Google', '3 Korrekturrunden', 'Zweite Sprache optional (+390 €)'],
      en: ['Everything in Website Start, up to 10 pages', 'One page per service and up to 3 location pages', 'Inquiry with photo upload and urgency, project gallery, reviews', 'Structured data (LocalBusiness) for Google', '3 rounds of revisions', 'Second language optional (+€390)'],
      ru: ['Всё из Website Start, до 10 страниц', 'Отдельная страница на каждую услугу и до 3 страниц под города', 'Заявка с фото и срочностью, галерея работ, отзывы', 'Структурированные данные (LocalBusiness) для Google', '3 раунда правок', 'Второй язык по желанию (+390 €)']
    }
  },
  {
    id: 'websiteAbo',
    category: 'websites',
    name: 'Website-Abo',
    oneTime: 199,
    monthly: 59,
    minTermMonths: 12,
    delivery: {de: 'online in 7 Tagen', en: 'live in 7 days', ru: 'онлайн за 7 дней'},
    tagline: {
      de: 'Website ohne große Anfangsinvestition.',
      en: 'A website without a large upfront investment.',
      ru: 'Сайт без крупной оплаты на старте.'
    },
    includes: {
      de: ['Website im Umfang von Website Start', 'Pflege inklusive', 'Mindestlaufzeit 12 Monate, danach monatlich kündbar', 'Nach 24 Monaten gehört die Website Ihnen'],
      en: ['Website in the scope of Website Start', 'Care plan included', '12-month minimum term, then cancel monthly', 'After 24 months the website is yours'],
      ru: ['Сайт в объёме Website Start', 'Pflege включена', 'Минимальный срок 12 месяцев, дальше помесячно', 'Через 24 месяца сайт переходит в вашу собственность']
    }
  },
  {
    id: 'relaunch',
    category: 'websites',
    name: 'Relaunch',
    oneTime: 790,
    from: true,
    delivery: {de: 'online in 7–10 Tagen', en: 'live in 7–10 days', ru: 'онлайн за 7–10 дней'},
    tagline: {
      de: 'Ihre Website ist veraltet oder am Handy kaum lesbar? Wir machen sie neu und übernehmen Ihre Inhalte.',
      en: 'Outdated website or hard to read on a phone? We rebuild it and move your content over.',
      ru: 'Сайт устарел или плохо читается с телефона? Сделаем заново и перенесём содержимое.'
    },
    includes: {
      de: ['Übernahme bestehender Inhalte', 'Neues Design, mobiloptimiert', 'Umzug ohne Google-Rankingverlust (Weiterleitungen)'],
      en: ['Content migration', 'New mobile-first design', 'Migration without losing Google rankings (redirects)'],
      ru: ['Перенос текущего контента', 'Новый дизайн под телефон', 'Переезд без потери позиций в Google (редиректы)']
    }
  },
  {
    id: 'pflege',
    category: 'care',
    name: 'Pflege',
    monthly: 39,
    tagline: {
      de: 'Technik, Sicherheit und kleine Änderungen, ohne dass Sie sich darum kümmern müssen.',
      en: 'Hosting, security and small changes, without you having to think about it.',
      ru: 'Техника, безопасность и мелкие правки без вашего участия.'
    },
    includes: {
      de: ['Hosting, .at-Domain, SSL, tägliche Backups', 'Überwachung: Fällt die Seite aus, wissen wir es zuerst', 'Bis zu 30 Min. Änderungen pro Monat per WhatsApp, in 2 Werktagen', 'Monatlicher Kurzbericht: Besucher, Anfragen, Anruf-Klicks', 'Monatlich kündbar'],
      en: ['Hosting, .at domain, SSL, daily backups', 'Monitoring: if the site goes down, we know first', 'Up to 30 min of changes per month via WhatsApp, within 2 business days', 'Monthly report: visitors, inquiries, call clicks', 'Cancel monthly'],
      ru: ['Хостинг, домен .at, SSL, ежедневные бэкапы', 'Мониторинг: если сайт упал, мы узнаём первыми', 'До 30 мин правок в месяц через WhatsApp, за 2 рабочих дня', 'Ежемесячный отчёт: посетители, заявки, нажатия «позвонить»', 'Расторжение помесячно']
    }
  },
  {
    id: 'pflegePlus',
    category: 'care',
    name: 'Pflege Plus',
    monthly: 79,
    tagline: {
      de: 'Mehr Sichtbarkeit bei Google. Wir pflegen Ihr Google-Profil und Ihre Bewertungen jeden Monat.',
      en: 'More visibility on Google. We look after your Google profile and reviews every month.',
      ru: 'Больше видимости в Google. Каждый месяц ведём ваш профиль и отзывы.'
    },
    includes: {
      de: ['Alles aus Pflege', 'Bis zu 60 Min. Änderungen pro Monat, in 1 Werktag', '2 Beiträge pro Monat im Google-Profil', 'Antwortentwürfe auf Google-Bewertungen', 'Quartalsweise Ranking-Check mit einer Verbesserung'],
      en: ['Everything in Pflege', 'Up to 60 min of changes per month, within 1 business day', '2 Google Business Profile posts per month', 'Draft replies to Google reviews', 'Quarterly ranking check with one improvement'],
      ru: ['Всё из Pflege', 'До 60 мин правок в месяц, за 1 рабочий день', '2 публикации в месяц в Google-профиле', 'Черновики ответов на отзывы в Google', 'Раз в квартал проверка позиций и одно улучшение']
    }
  },
  {
    id: 'anfrageAutomation',
    category: 'automation',
    name: 'Anfrage-Automation',
    oneTime: 390,
    delivery: {de: 'in 3–5 Tagen', en: 'in 3–5 days', ru: 'за 3–5 дней'},
    tagline: {
      de: 'Keine Anfrage geht mehr verloren.',
      en: 'No inquiry gets lost again.',
      ru: 'Ни одна заявка больше не потеряется.'
    },
    includes: {
      de: ['Anfragen landen sofort per WhatsApp und E-Mail bei Ihnen', 'Automatische Bestätigung an den Kunden', 'Bitte um Google-Bewertung nach erledigtem Auftrag', 'Alle Anfragen in einer Liste mit Status'],
      en: ['Inquiries reach you instantly via WhatsApp and email', 'Automatic confirmation to the customer', 'Google review request after the job is done', 'All inquiries in one list with status'],
      ru: ['Заявки сразу приходят вам в WhatsApp и на e-mail', 'Автоматическое подтверждение клиенту', 'Просьба об отзыве в Google после выполненной работы', 'Все заявки в одном списке со статусами']
    }
  },
  {
    id: 'kiAssistent',
    category: 'automation',
    name: 'KI-Assistent für die Website',
    oneTime: 690,
    monthly: 29,
    delivery: {de: 'in 7 Tagen', en: 'in 7 days', ru: 'за 7 дней'},
    tagline: {
      de: 'Beantwortet Fragen rund um die Uhr und sammelt Anfragen, auch am Wochenende.',
      en: 'Answers questions around the clock and collects inquiries, weekends included.',
      ru: 'Отвечает на вопросы круглосуточно и собирает заявки, даже в выходные.'
    },
    includes: {
      de: ['Chat auf Ihrer Website mit Ihren Leistungen, Preisen und Einsatzgebiet', 'Sammelt Kontaktdaten und leitet Anfragen weiter', 'Monatlicher Betrag deckt die KI-Kosten bis zu einem festen Limit'],
      en: ['Chat on your website trained on your services, prices and service area', 'Collects contact details and forwards inquiries', 'Monthly fee covers AI costs up to a fixed limit'],
      ru: ['Чат на вашем сайте с вашими услугами, ценами и зоной выезда', 'Собирает контакты и передаёт заявки', 'Ежемесячная оплата покрывает расходы на AI в пределах лимита']
    }
  },
  {
    id: 'automationSprint',
    category: 'automation',
    name: 'Automation Sprint',
    oneTime: 890,
    monthly: 19,
    from: true,
    delivery: {de: 'in 1–2 Wochen', en: 'in 1–2 weeks', ru: 'за 1–2 недели'},
    tagline: {
      de: 'Ein Ablauf, der Sie jede Woche Stunden kostet, läuft automatisch.',
      en: 'One process that costs you hours every week, now automated.',
      ru: 'Один процесс, который каждую неделю отнимает у вас часы, теперь идёт автоматически.'
    },
    includes: {
      de: ['Ein konkreter Prozess, z. B. Angebot als PDF, Terminbestätigung und Erinnerung, Rechnung nach Auftrag, E-Mail-Sortierung', 'Fixpreis nach einem 15-Minuten-Gespräch', 'Monatlich: Betrieb, Überwachung, kleine Anpassungen'],
      en: ['One concrete process, e.g. quote PDF, appointment confirmation and reminder, invoice after the job, email sorting', 'Fixed price after a 15-minute call', 'Monthly: hosting, monitoring, small adjustments'],
      ru: ['Один конкретный процесс: смета в PDF, подтверждение и напоминание о встрече, счёт после работы, сортировка почты', 'Фиксированная цена после 15-минутного разговора', 'Ежемесячно: работа сценария, мониторинг, мелкие правки']
    }
  },
  {
    id: 'analyseWorkshop',
    category: 'software',
    name: 'Analyse-Workshop',
    oneTime: 290,
    delivery: {de: '1 Tag', en: '1 day', ru: '1 день'},
    tagline: {
      de: 'Klarheit vor der Investition: was sich lohnt, was es kostet, wie lange es dauert.',
      en: 'Clarity before investing: what is worth building, what it costs, how long it takes.',
      ru: 'Ясность до инвестиций: что стоит делать, сколько стоит и сколько займёт.'
    },
    includes: {
      de: ['2–3 Stunden gemeinsame Analyse Ihrer Abläufe', 'Kurzes Konzept mit Fixpreis und Zeitplan', 'Wird bei Auftrag voll angerechnet'],
      en: ['2–3 hour joint analysis of your workflows', 'Short concept with fixed price and timeline', 'Fully credited if you order the project'],
      ru: ['2–3 часа совместного разбора ваших процессов', 'Короткое ТЗ с фиксированной ценой и сроком', 'Полностью засчитывается при заказе проекта']
    }
  },
  {
    id: 'webApp',
    category: 'software',
    name: 'Individuelle Web-App',
    oneTime: 3900,
    from: true,
    delivery: {de: '4–8 Wochen', en: '4–8 weeks', ru: '4–8 недель'},
    tagline: {
      de: 'Wenn Excel und E-Mail nicht mehr reichen: ein Werkzeug, das genau zu Ihrem Betrieb passt.',
      en: 'When spreadsheets and email are no longer enough: a tool built exactly for your business.',
      ru: 'Когда Excel и почты уже не хватает: инструмент точно под ваш бизнес.'
    },
    includes: {
      de: ['Kundenportale, interne CRM-Systeme, Auftrags- und Einsatzplanung, Dashboards', 'Fixpreis nach dem Analyse-Workshop, Zahlung 40/40/20 % nach Etappen', 'Wartung nach dem Launch ab 99 €/Monat'],
      en: ['Customer portals, internal CRM, job and dispatch planning, dashboards', 'Fixed price after the analysis workshop, paid 40/40/20% by milestone', 'Maintenance after launch from €99/month'],
      ru: ['Клиентские порталы, внутренние CRM, учёт заказов и выездов, дашборды', 'Фикс-цена после воркшопа, оплата 40/40/20 % по этапам', 'Поддержка после запуска от 99 €/мес']
    }
  }
];

export function getPackage(id: PackageId): PricePackageDefinition {
  const found = packages.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown price package: ${id}`);
  return found;
}

// Deterministic grouping (no Intl), so server and browser render identical strings.
const groupSeparator: Record<Locale, string> = {de: '.', en: ',', ru: ' '};

/** Formats an amount in EUR, e.g. "1.890 €" (de), "€1,890" (en), "1 890 €" (ru). */
export function formatEur(amount: number, locale: Locale): string {
  const value = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator[locale]);
  return locale === 'en' ? `€${value}` : `${value} €`;
}

const words = {
  from: {de: 'ab', en: 'from', ru: 'от'},
  perMonth: {de: '/Monat', en: '/month', ru: '/мес'},
  minTerm: {de: 'Mindestlaufzeit', en: 'minimum term', ru: 'минимальный срок'},
  months: {de: 'Monate', en: 'months', ru: 'мес.'},
  founder: {de: 'Gründerpreis', en: 'Founding price', ru: 'Цена основателя'}
} satisfies Record<string, Text>;

/** Human-readable price of one package, e.g. "ab 890 € + ab 19 €/Monat". */
export function formatPackagePrice(pkg: PricePackageDefinition, locale: Locale): string {
  const prefix = pkg.from ? `${words.from[locale]} ` : '';
  const parts: string[] = [];
  if (pkg.oneTime !== undefined) parts.push(`${prefix}${formatEur(pkg.oneTime, locale)}`);
  if (pkg.monthly !== undefined) parts.push(`${prefix}${formatEur(pkg.monthly, locale)}${words.perMonth[locale]}`);
  return parts.join(' + ');
}

/** "Website Start 990 €, Website Business 1.890 €" for the given packages in every locale. */
export function priceLine(...ids: PackageId[]): Text {
  const build = (locale: Locale) =>
    ids.map((id) => {
      const pkg = getPackage(id);
      return `${pkg.name} ${formatPackagePrice(pkg, locale)}`;
    }).join(', ');
  return {de: build('de'), en: build('en'), ru: build('ru')};
}

/** Founder price note, e.g. "Gründerpreis 590 € für die ersten 3 Betriebe …". */
export function founderNote(locale: Locale): string {
  return `${words.founder[locale]} ${formatEur(founderOffer.price, locale)} ${founderOffer.condition[locale]}.`;
}

/** Full plain-text price list, used by the AI assistant. */
export function priceListText(locale: Locale): string {
  const lines = packages.map((pkg) => {
    const term = pkg.minTermMonths ? `, ${words.minTerm[locale]} ${pkg.minTermMonths} ${words.months[locale]}` : '';
    const delivery = pkg.delivery ? ` (${pkg.delivery[locale]})` : '';
    return `- ${pkg.name}: ${formatPackagePrice(pkg, locale)}${term}${delivery}. ${pkg.tagline[locale]} ${pkg.includes[locale].join('; ')}.`;
  });
  const hourly = {de: 'Stundensatz für Leistungen außerhalb der Pakete', en: 'Hourly rate for work outside the packages', ru: 'Почасовая ставка для работ вне пакетов'}[locale];
  return [
    ...lines,
    `- ${founderNote(locale)}`,
    `- ${hourly}: ${formatEur(hourlyRate, locale)}.`,
    `- ${paymentTerms[locale]}`,
    `- ${vatNote[locale]}`
  ].join('\n');
}
