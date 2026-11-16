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
  | 'onepager'
  | 'firmenwebsite'
  | 'weitereSeite'
  | 'weitereSprache'
  | 'googleProfil'
  | 'relaunch'
  | 'pflege'
  | 'pflegePlus'
  | 'anfrageAutomation'
  | 'kiAssistent'
  | 'automationSprint'
  | 'analyseWorkshop'
  | 'webApp';

export type PackageCategory = 'websites' | 'extras' | 'care' | 'automation' | 'software';

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
  /** Optional payment in equal monthly instalments, without surcharge. */
  installments?: {count: number; amount: number};
  delivery?: Text;
  tagline: Text;
  includes: Record<Locale, string[]>;
};

/** Package highlighted on the home and services pages. */
export const featuredPackageId: PackageId = 'firmenwebsite';

export const hourlyRate = 65;

export const paymentTerms: Text = {
  de: '50 % bei Auftrag, 50 % beim Launch. Die Firmenwebsite auch in 12 Monatsraten ohne Aufpreis. Pflege-Pakete monatlich kündbar.',
  en: '50% on order, 50% at launch. The Firmenwebsite is also available in 12 monthly instalments at no extra cost. Care plans can be cancelled monthly.',
  ru: '50 % при заказе, 50 % при запуске. Сайт компании можно оплатить в рассрочку на 12 месяцев без переплаты. Пакеты Pflege расторгаются помесячно.'
};

// TODO(legal): once it is clear whether the owner uses the Kleinunternehmerregelung
// (see legalEntity.kleinunternehmer in legal.ts), add the matching VAT wording here.
export const vatNote: Text = {
  de: 'Alle Preise sind Endpreise, ohne versteckte Kosten.',
  en: 'All prices are final prices, with no hidden costs.',
  ru: 'Все цены конечные, без скрытых доплат.'
};

export const packages: PricePackageDefinition[] = [
  {
    id: 'onepager',
    category: 'websites',
    name: 'Onepager',
    oneTime: 200,
    delivery: {de: 'online in 7 Tagen', en: 'live in 7 days', ru: 'онлайн за 7 дней'},
    tagline: {
      de: 'Für Selbstständige, die schnell und günstig online sein wollen.',
      en: 'For sole traders who want to be online quickly and affordably.',
      ru: 'Для предпринимателей, которым нужно быстро и недорого появиться в интернете.'
    },
    includes: {
      de: ['1 Seite mit allen Leistungen', 'Texte inklusive, nach einem 30-Minuten-Gespräch', 'Anruf- und WhatsApp-Button, Anfrageformular mit Foto und Adresse', 'Verknüpfung mit Ihrem Google-Unternehmensprofil', 'Für Handys optimiert, schnell, sichere Verbindung (HTTPS)', 'Impressum und Datenschutz'],
      en: ['1 page with all your services', 'Copy included, written after a 30-minute call', 'Call and WhatsApp buttons, inquiry form with photo and address', 'Linked to your Google Business Profile', 'Mobile-first, fast, secure connection (HTTPS)', 'Legal notice and privacy policy'],
      ru: ['1 страница со всеми услугами', 'Тексты включены, пишем по итогам 30-минутного разговора', 'Кнопки звонка и WhatsApp, форма заявки с фото и адресом', 'Связка с профилем компании в Google', 'Удобен на телефоне, быстрый, защищённое соединение (HTTPS)', 'Impressum и Datenschutz']
    }
  },
  {
    id: 'firmenwebsite',
    category: 'websites',
    name: 'Firmenwebsite',
    oneTime: 450,
    installments: {count: 12, amount: 37.5},
    delivery: {de: 'online in 7 Tagen', en: 'live in 7 days', ru: 'онлайн за 7 дней'},
    tagline: {
      de: 'Für Unternehmen mit mehreren Leistungen, die bei Google besser gefunden werden wollen.',
      en: 'For businesses with several services that want to be found better on Google.',
      ru: 'Для компаний с несколькими услугами, которым важно, чтобы их находили в Google.'
    },
    includes: {
      de: ['Bis zu 5 Seiten, z. B. Start, Leistungen, Über uns, Referenzen, Kontakt', 'Texte inklusive', 'Eigene Seite für Ihre Leistungen, klare Struktur für Google', 'Anruf- und WhatsApp-Button auf jeder Seite, Anfrageformular mit Foto', 'Verknüpfung mit Ihrem Google-Unternehmensprofil', 'Impressum und Datenschutz'],
      en: ['Up to 5 pages, e.g. home, services, about, references, contact', 'Copy included', 'A page for your services, clear structure for Google', 'Call and WhatsApp buttons on every page, inquiry form with photo', 'Linked to your Google Business Profile', 'Legal notice and privacy policy'],
      ru: ['До 5 страниц: например, главная, услуги, о нас, работы, контакты', 'Тексты включены', 'Отдельная страница для ваших услуг, понятная структура для Google', 'Кнопки звонка и WhatsApp на каждой странице, форма заявки с фото', 'Связка с профилем компании в Google', 'Impressum и Datenschutz']
    }
  },
  {
    id: 'weitereSeite',
    category: 'extras',
    name: 'Weitere Seite',
    oneTime: 50,
    tagline: {
      de: 'Zum Beispiel für eine weitere Leistung.',
      en: 'For example, for another service.',
      ru: 'Например, под ещё одну услугу.'
    },
    includes: {de: [], en: [], ru: []}
  },
  {
    id: 'weitereSprache',
    category: 'extras',
    name: 'Weitere Sprache',
    oneTime: 90,
    tagline: {
      de: 'Ihre Website zusätzlich auf Englisch oder Russisch.',
      en: 'Your website additionally in German, English or Russian.',
      ru: 'Ваш сайт дополнительно на немецком, английском или русском.'
    },
    includes: {de: [], en: [], ru: []}
  },
  {
    id: 'googleProfil',
    category: 'extras',
    name: 'Google-Profil',
    oneTime: 79,
    tagline: {
      de: 'Einrichtung und Optimierung Ihres Google-Unternehmensprofils.',
      en: 'Setup and optimisation of your Google Business Profile.',
      ru: 'Создание и оформление профиля компании в Google.'
    },
    includes: {de: [], en: [], ru: []}
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

/** Formats an amount with cents when needed, e.g. "37,50 €" (de), "€37.50" (en). */
export function formatEurCents(amount: number, locale: Locale): string {
  if (Number.isInteger(amount)) return formatEur(amount, locale);
  const [whole, cents] = amount.toFixed(2).split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator[locale]);
  const value = locale === 'en' ? `${grouped}.${cents}` : `${grouped},${cents}`;
  return locale === 'en' ? `€${value}` : `${value} €`;
}

const words = {
  from: {de: 'ab', en: 'from', ru: 'от'},
  perMonth: {de: '/Monat', en: '/month', ru: '/мес'},
  minTerm: {de: 'Mindestlaufzeit', en: 'minimum term', ru: 'минимальный срок'},
  months: {de: 'Monate', en: 'months', ru: 'мес.'},
  or: {de: 'oder', en: 'or', ru: 'или'},
  noSurcharge: {de: 'ohne Aufpreis', en: 'at no extra cost', ru: 'без переплаты'}
} satisfies Record<string, Text>;

/** "oder 12 × 37,50 € ohne Aufpreis", or an empty string. */
export function formatInstallments(pkg: PricePackageDefinition, locale: Locale): string {
  if (!pkg.installments) return '';
  return `${words.or[locale]} ${pkg.installments.count} × ${formatEurCents(pkg.installments.amount, locale)} ${words.noSurcharge[locale]}`;
}

/** Human-readable price of one package, e.g. "ab 890 € + ab 19 €/Monat". */
export function formatPackagePrice(pkg: PricePackageDefinition, locale: Locale): string {
  const prefix = pkg.from ? `${words.from[locale]} ` : '';
  const parts: string[] = [];
  if (pkg.oneTime !== undefined) parts.push(`${prefix}${formatEur(pkg.oneTime, locale)}`);
  if (pkg.monthly !== undefined) parts.push(`${prefix}${formatEur(pkg.monthly, locale)}${words.perMonth[locale]}`);
  return parts.join(' + ');
}

/** "Onepager 200 €, Firmenwebsite 450 €" for the given packages in every locale. */
export function priceLine(...ids: PackageId[]): Text {
  const build = (locale: Locale) =>
    ids.map((id) => {
      const pkg = getPackage(id);
      return `${pkg.name} ${formatPackagePrice(pkg, locale)}`;
    }).join(', ');
  return {de: build('de'), en: build('en'), ru: build('ru')};
}

/** Full plain-text price list, used by the AI assistant. */
export function priceListText(locale: Locale): string {
  const lines = packages.map((pkg) => {
    const term = pkg.minTermMonths ? `, ${words.minTerm[locale]} ${pkg.minTermMonths} ${words.months[locale]}` : '';
    const delivery = pkg.delivery ? ` (${pkg.delivery[locale]})` : '';
    const rates = pkg.installments ? `, ${formatInstallments(pkg, locale)}` : '';
    const includes = pkg.includes[locale].length ? ` ${pkg.includes[locale].join('; ')}.` : '';
    return `- ${pkg.name}: ${formatPackagePrice(pkg, locale)}${rates}${term}${delivery}. ${pkg.tagline[locale]}${includes}`;
  });
  const hourly = {de: 'Stundensatz für Leistungen außerhalb der Pakete', en: 'Hourly rate for work outside the packages', ru: 'Почасовая ставка для работ вне пакетов'}[locale];
  return [
    ...lines,
    `- ${hourly}: ${formatEur(hourlyRate, locale)}.`,
    `- ${paymentTerms[locale]}`,
    `- ${vatNote[locale]}`
  ].join('\n');
}
