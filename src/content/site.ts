import {contactPhone, phoneHref, whatsappHref} from '@/content/contact-links';
import type {Locale} from '@/i18n/routing';
import {withLocaleFallbacks} from '@/i18n/localized';
import {formatEur, formatPackagePrice, founderOffer, getPackage, hourlyRate, type PackageId} from '@/content/pricing';

export const siteConfig = {
  name: 'TreeTech',
  url: 'https://treetech.at',
  email: 'office@treetech.at',
  /** Change the number in src/content/contact-links.ts and it changes everywhere. */
  phone: contactPhone.display,
  phoneDigits: contactPhone.digits,
  /** Public Cal.com booking page for the 30-minute call. NEXT_PUBLIC_CAL_URL overrides it. */
  calUrl: 'https://cal.com/artem-karnaukhov-rneqin/treetech-website-analyse',
  region: {de: 'Wien und Niederösterreich', en: 'Vienna and Lower Austria', ru: 'Вена и Нижняя Австрия'},
  googleSiteVerification: 'PdjQivxgyQpk4Qxzy2-3pMhBPW2pZreWQYBlrry2Gyw'
};

export {phoneHref, whatsappHref};

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

type Offer = {
  chapter: string;
  name: LocalizedText;
  description: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  result: LocalizedText;
  features: LocalizedList;
  highlighted?: boolean;
};

export type PrimaryServiceOffer = {
  id: 'websites' | 'automation' | 'custom-software';
  href: string;
  name: LocalizedText;
  description: LocalizedText;
  outcomes: LocalizedList;
  detailTitle: LocalizedText;
  detail: LocalizedText;
  detailLinks: Array<{
    href: string;
    label: LocalizedText;
  }>;
  highlighted?: boolean;
};

type ProcessStep = {
  title: LocalizedText;
  description: LocalizedText;
};

type AutomationExample = {
  title: LocalizedText;
  process: LocalizedText;
  benefit: LocalizedText;
};

type AudienceItem = {
  title: LocalizedText;
  description: LocalizedText;
};

type PricePackage = {
  name: LocalizedText;
  price: LocalizedText;
  description: LocalizedText;
};

type FaqItem = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type PortfolioProject = {
  slug: string;
  name: string;
  year: string;
  location: string;
  industry: LocalizedText;
  description: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  features: LocalizedList;
  visualStyle: LocalizedText;
  cta: LocalizedText;
  metric: LocalizedText;
  gradient: string;
  accent: string;
};

export type PortfolioCaseStudy = {
  clientName?: string;
  industry: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  resultMetric: LocalizedText;
  testimonialQuote?: LocalizedText;
  testimonialAuthor?: string;
};

export const offers: Offer[] = withLocaleFallbacks([
  {
    chapter: '01',
    name: {
      de: 'AI Automation & Business Process Automation',
      en: 'AI Automation & Business Process Automation',
      ru: 'AI-автоматизация и автоматизация бизнес-процессов'
    },
    description: {
      de: 'AI automation Austria für Betriebe, die Anfragen, E-Mails, Dokumente und interne Aufgaben schneller bearbeiten möchten.',
      en: 'AI automation Austria for businesses that need to process inquiries, emails, documents, and internal tasks faster.',
      ru: 'AI-автоматизация в Австрии для компаний, которым нужно быстрее обрабатывать заявки, письма, документы и внутренние задачи.'
    },
    problem: {
      de: 'Viele Schritte hängen an einzelnen Personen: kopieren, prüfen, antworten, nachfassen und Daten ins CRM übertragen.',
      en: 'Many steps depend on individual people: copying, checking, replying, following up, and moving data into the CRM.',
      ru: 'Многие шаги завязаны на отдельных людей: копирование, проверка, ответы, follow-up и перенос данных в CRM.'
    },
    solution: {
      de: 'Wir bauen Automationen, AI-Assistenten und klare Workflows, die wiederkehrende Aufgaben übernehmen und Menschen nur bei Entscheidungen einbeziehen.',
      en: 'We build automations, AI assistants, and clear workflows that handle repeatable tasks and involve people only for decisions.',
      ru: 'Мы строим автоматизации, AI-ассистентов и понятные workflow, которые забирают повторяющиеся задачи и подключают людей только к решениям.'
    },
    result: {
      de: 'Weniger manuelle Arbeit, schnellere Reaktionszeiten und mehr Zeit für Beratung, Verkauf und Service.',
      en: 'Less manual work, faster response times, and more time for consulting, sales, and service.',
      ru: 'Меньше ручной работы, быстрее ответы и больше времени на консультации, продажи и сервис.'
    },
    features: {
      de: ['Automatische E-Mail- und Anfrageverarbeitung', 'Rechnungs- und Dokumentengenerierung', 'CRM automation und Follow-ups', 'AI chatbot for business und interne Assistenten', 'Integration verschiedener Services'],
      en: ['Automatic email and inquiry processing', 'Invoice and document generation', 'CRM automation and follow-ups', 'AI chatbot for business and internal assistants', 'Integration of different services'],
      ru: ['Автоматическая обработка e-mail и заявок', 'Генерация счетов и документов', 'CRM-автоматизация и follow-up', 'AI-чатбот для бизнеса и внутренние ассистенты', 'Интеграция разных сервисов']
    },
    highlighted: true
  },
  {
    chapter: '02',
    name: {
      de: 'Web Development',
      en: 'Web Development',
      ru: 'Веб-разработка'
    },
    description: {
      de: 'Web development Austria für Unternehmen, die online verständlich erklären, Vertrauen aufbauen und mehr qualifizierte Anfragen erhalten möchten.',
      en: 'Web development Austria for companies that need to explain clearly, build trust, and receive more qualified inquiries online.',
      ru: 'Веб-разработка в Австрии для компаний, которым нужно понятно объяснять услуги, вызывать доверие и получать больше качественных заявок онлайн.'
    },
    problem: {
      de: 'Die Website sieht vielleicht ordentlich aus, bringt aber zu wenig Anfragen oder erklärt Leistungen nicht schnell genug.',
      en: 'The website may look acceptable, but it does not generate enough inquiries or explain services quickly enough.',
      ru: 'Сайт может выглядеть нормально, но давать слишком мало заявок или недостаточно быстро объяснять услуги.'
    },
    solution: {
      de: 'Wir strukturieren Inhalte, Nutzerwege, Formulare und website automation so, dass Besucher schneller verstehen und leichter Kontakt aufnehmen.',
      en: 'We structure content, user journeys, forms, and website automation so visitors understand faster and contact you more easily.',
      ru: 'Мы выстраиваем контент, путь пользователя, формы и автоматизацию сайта так, чтобы посетители быстрее понимали предложение и проще связывались с вами.'
    },
    result: {
      de: 'Ein professioneller Webauftritt, der Vertrauen schafft, Anfragen sauber erfasst und den Vertrieb entlastet.',
      en: 'A professional website that builds trust, captures inquiries cleanly, and supports the sales process.',
      ru: 'Профессиональный сайт, который вызывает доверие, аккуратно собирает заявки и помогает продажам.'
    },
    features: {
      de: ['Landingpages mit klarem Anfrageziel', 'Corporate Websites', 'Mehrseitige Websites', 'Online-Shops', 'Restaurantseiten mit Online-Reservierung', 'Individuelle Weblösungen'],
      en: ['Landing pages', 'Corporate websites', 'Multi-page websites', 'Online shops', 'Restaurant websites with online booking', 'Custom web solutions'],
      ru: ['Лендинги', 'Корпоративные сайты', 'Многостраничные сайты', 'Интернет-магазины', 'Сайты ресторанов с онлайн-бронированием', 'Индивидуальные веб-решения']
    }
  },
  {
    chapter: '03',
    name: {
      de: 'Custom Web Applications',
      en: 'Custom Web Applications',
      ru: 'Индивидуальные веб-приложения'
    },
    description: {
      de: 'Individuelle Web-Tools für Teams, die Angebote, Kunden, Aufgaben oder interne Freigaben zentral steuern möchten.',
      en: 'Custom web tools for teams that need to manage offers, customers, tasks, or internal approvals centrally.',
      ru: 'Индивидуальные веб-инструменты для команд, которым нужно централизованно управлять предложениями, клиентами, задачами или внутренними согласованиями.'
    },
    problem: {
      de: 'Excel, E-Mail und einzelne Tools reichen nicht mehr aus, weil Informationen verstreut sind und Aufgaben leicht liegen bleiben.',
      en: 'Spreadsheets, email, and isolated tools are no longer enough because information is scattered and tasks are easy to miss.',
      ru: 'Таблиц, почты и отдельных инструментов уже не хватает: информация разбросана, а задачи легко теряются.'
    },
    solution: {
      de: 'Wir entwickeln Web-Apps, Portale und Dashboards, die bestehende Prozesse abbilden und wichtige Daten an einem Ort bündeln.',
      en: 'We develop web apps, portals, and dashboards that reflect existing processes and bring important data into one place.',
      ru: 'Мы разрабатываем веб-приложения, порталы и dashboards, которые отражают реальные процессы и собирают важные данные в одном месте.'
    },
    result: {
      de: 'Mehr Übersicht, weniger Rückfragen und ein System, das tägliche Arbeit nachvollziehbar macht.',
      en: 'More overview, fewer clarification loops, and a system that makes daily work easier to track.',
      ru: 'Больше прозрачности, меньше уточнений и система, в которой ежедневную работу проще отслеживать.'
    },
    features: {
      de: ['CRM-Systeme', 'ERP-Systeme', 'Kundenportale', 'Interne Unternehmenssysteme', 'SaaS-Plattformen', 'Digitale Lösungen für kleine Unternehmen'],
      en: ['CRM systems', 'ERP systems', 'Customer portals', 'Internal company systems', 'SaaS platforms', 'Custom business tools'],
      ru: ['CRM-системы', 'ERP-системы', 'Клиентские порталы', 'Внутренние системы компании', 'SaaS-платформы', 'Индивидуальные бизнес-инструменты']
    }
  },
  {
    chapter: '04',
    name: {
      de: 'AI Integration for Business',
      en: 'AI Integration for Business',
      ru: 'AI-интеграции для бизнеса'
    },
    description: {
      de: 'AI tools for companies, die Support, Vertrieb, Wissensabfragen und interne Entscheidungen schneller machen sollen.',
      en: 'AI tools for companies that need faster support, sales work, knowledge retrieval, and internal decisions.',
      ru: 'AI-инструменты для компаний, которым нужно быстрее работать с поддержкой, продажами, поиском знаний и внутренними решениями.'
    },
    problem: {
      de: 'Wissen liegt in Dokumenten, Postfächern oder Köpfen. Kunden und Teams warten dadurch länger auf Antworten.',
      en: 'Knowledge lives in documents, inboxes, or people’s heads. Customers and teams wait longer for answers.',
      ru: 'Знания лежат в документах, почте или головах сотрудников. Клиенты и команда из-за этого дольше ждут ответы.'
    },
    solution: {
      de: 'Wir integrieren AI-Assistenten, Chatbots und Datenabfragen in bestehende Tools, mit klaren Grenzen und nachvollziehbaren Antworten.',
      en: 'We integrate AI assistants, chatbots, and data queries into existing tools, with clear limits and traceable answers.',
      ru: 'Мы интегрируем AI-ассистентов, чатботов и запросы к данным в существующие инструменты с понятными границами и проверяемыми ответами.'
    },
    result: {
      de: 'Bessere Kundenerfahrung, schnellere interne Auskünfte und weniger wiederholte Erklärarbeit.',
      en: 'A better customer experience, faster internal answers, and less repeated explanation work.',
      ru: 'Лучший клиентский опыт, более быстрые внутренние ответы и меньше повторяющихся объяснений.'
    },
    features: {
      de: ['AI-Berater für Website oder Team', 'AI-Kundensupport', 'AI-Datenanalyse', 'AI für Vertrieb und Marketing', 'AI zur Optimierung operativer Abläufe'],
      en: ['AI consultants', 'AI customer support', 'AI data analysis', 'AI for sales and marketing', 'AI for operational optimization'],
      ru: ['AI-консультанты', 'AI-поддержка клиентов', 'AI-анализ данных', 'AI для продаж и маркетинга', 'AI для оптимизации операционных процессов']
    }
  },
  {
    chapter: '05',
    name: {
      de: 'Business Digitalization & Workflow Optimization',
      en: 'Business Digitalization & Workflow Optimization',
      ru: 'Цифровизация бизнеса и оптимизация workflow'
    },
    description: {
      de: 'Workflow automation Austria für Betriebe, die Prozesse digitalisieren möchten, ohne sofort mehr Personal einzustellen.',
      en: 'Workflow automation Austria for businesses that want to digitalize processes without immediately hiring more staff.',
      ru: 'Workflow-автоматизация в Австрии для компаний, которые хотят цифровизировать процессы без немедленного расширения штата.'
    },
    problem: {
      de: 'Abläufe sind gewachsen, aber nicht dokumentiert: Zuständigkeiten, Status und Daten wechseln zwischen Telefon, E-Mail und Tabellen.',
      en: 'Processes have grown over time but are not documented: responsibilities, status, and data move between phone, email, and spreadsheets.',
      ru: 'Процессы выросли со временем, но не задокументированы: ответственность, статусы и данные прыгают между телефоном, почтой и таблицами.'
    },
    solution: {
      de: 'Wir analysieren Engpässe, verbinden Systeme und bauen business automation Vienna-taugliche Workflows für Alltag, CRM und interne Aufgaben.',
      en: 'We analyze bottlenecks, connect systems, and build business automation Vienna-ready workflows for daily operations, CRM, and internal tasks.',
      ru: 'Мы анализируем узкие места, связываем системы и строим workflow для ежедневной работы, CRM и внутренних задач.'
    },
    result: {
      de: 'Zentrale Prozesse, weniger doppelte Eingaben und ein Team, das mit gleicher Besetzung mehr schafft.',
      en: 'Centralized processes, fewer duplicate entries, and a team that can handle more work with the same headcount.',
      ru: 'Централизованные процессы, меньше двойного ввода и команда, которая успевает больше тем же составом.'
    },
    features: {
      de: ['Prozesse digitalisieren', 'Manuelle Arbeit reduzieren', 'Team-Effizienz erhöhen', 'CRM, ERP und andere Systeme verbinden', 'Workflows sauber dokumentieren'],
      en: ['Digitalize processes', 'Reduce manual work', 'Improve team efficiency', 'Connect CRM, ERP, and other systems', 'Document workflows clearly'],
      ru: ['Цифровизация процессов', 'Сокращение ручной работы', 'Рост эффективности команды', 'Связь CRM, ERP и других систем', 'Понятная документация workflow']
    }
  }
]);

export const primaryServiceOffers: PrimaryServiceOffer[] = withLocaleFallbacks([
  {
    id: 'websites',
    href: '/webentwicklung',
    name: {
      de: 'Websites',
      en: 'Websites',
      ru: 'Сайты'
    },
    description: {
      de: 'Moderne Websites, die Ihr Angebot verständlich erklären und Besucher zu Anfragen oder Terminen führen.',
      en: 'Modern websites that explain your offer clearly and guide visitors toward inquiries or appointments.',
      ru: 'Современные сайты, которые понятно объясняют предложение и ведут посетителей к заявке или записи.'
    },
    outcomes: {
      de: [
        'Besucher verstehen Ihr Angebot schneller',
        'Anfragen werden vorqualifiziert statt nur gesammelt',
        'Formulare und Kontaktwege passen zu Ihrem Verkaufsprozess',
        'SEO-Grundlagen und Analytics sind für den Start vorbereitet'
      ],
      en: [
        'Visitors understand your offer faster',
        'Inquiries are qualified instead of only collected',
        'Forms and contact paths match your sales process',
        'SEO basics and analytics are prepared for launch'
      ],
      ru: [
        'Посетители быстрее понимают ваше предложение',
        'Заявки квалифицируются, а не просто собираются',
        'Формы и контактные пути соответствуют вашему процессу продаж',
        'Базовое SEO и аналитика готовы к запуску'
      ]
    },
    detailTitle: {
      de: 'Was darunter fällt',
      en: 'What this includes',
      ru: 'Что входит'
    },
    detail: {
      de: 'Struktur, Texte, responsives Design, Kontaktlogik, SEO-Grundlagen, Analytics und auf Wunsch eine saubere Übergabe an E-Mail oder CRM.',
      en: 'Structure, copy, responsive design, contact logic, SEO basics, analytics, and an optional clean handover to email or CRM.',
      ru: 'Структура, тексты, адаптивный дизайн, логика контакта, базовое SEO, аналитика и при необходимости передача в e-mail или CRM.'
    },
    detailLinks: [
      {
        href: '/webentwicklung',
        label: {de: 'Webentwicklung', en: 'Web development', ru: 'Веб-разработка'}
      },
      {
        href: '/ki-chatbot-fuer-unternehmen',
        label: {de: 'KI-Chatbot', en: 'AI chatbot', ru: 'AI-чатбот'}
      }
    ],
    highlighted: true
  },
  {
    id: 'automation',
    href: '/ai-automation',
    name: {
      de: 'Automation',
      en: 'Automation',
      ru: 'Автоматизация'
    },
    description: {
      de: 'Wir verbinden Website, CRM, E-Mail, Kalender und interne Prozesse, damit wiederkehrende Arbeit automatisch erledigt wird.',
      en: 'We connect websites, CRM, email, calendars, and internal processes so recurring work happens automatically.',
      ru: 'Мы связываем сайт, CRM, e-mail, календарь и внутренние процессы, чтобы повторяющаяся работа выполнялась автоматически.'
    },
    outcomes: {
      de: [
        'Anfragen landen strukturiert im CRM oder in Ihrer Arbeitsliste',
        'Dokumente, E-Mails und Follow-ups werden vorbereitet',
        'Interne AI-Assistenten finden Informationen schneller',
        'Manuelle Übergaben werden nachvollziehbar und messbar'
      ],
      en: [
        'Inquiries arrive structured in your CRM or work queue',
        'Documents, emails, and follow-ups are prepared',
        'Internal AI assistants find information faster',
        'Manual handovers become traceable and measurable'
      ],
      ru: [
        'Заявки структурированно попадают в CRM или рабочий список',
        'Документы, e-mail и follow-up готовятся быстрее',
        'Внутренние AI-ассистенты быстрее находят информацию',
        'Ручные передачи становятся понятными и измеримыми'
      ]
    },
    detailTitle: {
      de: 'Typische Startpunkte',
      en: 'Typical starting points',
      ru: 'Типичные стартовые точки'
    },
    detail: {
      de: 'Wir starten nicht mit einem großen Umbau, sondern mit einem Engpass: Anfrageverarbeitung, CRM-Pflege, Dokumentenerstellung, Wissenssuche, Statusmails oder Übergaben zwischen Tools.',
      en: 'We do not start with a huge rebuild. We start with one bottleneck: inquiry handling, CRM upkeep, document creation, knowledge search, status emails, or handovers between tools.',
      ru: 'Мы начинаем не с большого перестроения, а с одного узкого места: обработка заявок, CRM, документы, поиск знаний, статусные письма или передача между инструментами.'
    },
    detailLinks: [
      {
        href: '/ai-automation',
        label: {de: 'AI-Automation', en: 'AI automation', ru: 'AI-автоматизация'}
      },
      {
        href: '/crm-automatisierung',
        label: {de: 'CRM-Automatisierung', en: 'CRM automation', ru: 'CRM-автоматизация'}
      },
      {
        href: '/workflow-automatisierung',
        label: {de: 'Workflow-Automatisierung', en: 'Workflow automation', ru: 'Workflow-автоматизация'}
      }
    ]
  },
  {
    id: 'custom-software',
    href: '/services',
    name: {de: 'Custom Software', en: 'Custom Software', ru: 'Индивидуальное ПО'},
    description: {
      de: 'Individuelle CRM-Systeme, Portale, Dashboards und interne Tools für Prozesse, die Standardsoftware nicht sinnvoll abbildet.',
      en: 'Custom CRM systems, portals, dashboards, and internal tools for workflows standard software cannot represent well.',
      ru: 'Индивидуальные CRM, порталы, панели и внутренние инструменты для процессов, которые стандартное ПО не отражает.'
    },
    outcomes: {
      de: ['Wichtige Daten liegen an einem Ort', 'Abläufe folgen Ihrem Betrieb statt einem starren Tool', 'Teams sehen Status, Aufgaben und Verantwortlichkeiten', 'Das System kann schrittweise erweitert werden'],
      en: ['Important data lives in one place', 'Workflows follow your business instead of a rigid tool', 'Teams see status, tasks, and responsibilities', 'The system can expand step by step'],
      ru: ['Важные данные находятся в одном месте', 'Процессы соответствуют бизнесу, а не жесткому инструменту', 'Команда видит статусы, задачи и ответственность', 'Систему можно расширять поэтапно']
    },
    detailTitle: {de: 'Wenn Standardsoftware nicht mehr reicht', en: 'When standard software no longer fits', ru: 'Когда стандартного ПО уже недостаточно'},
    detail: {
      de: 'Wir bauen schlanke interne Systeme für gewachsene Abläufe — ohne daraus unnötig ein großes ERP-Projekt zu machen.',
      en: 'We build lean internal systems for established workflows without turning every requirement into a large ERP project.',
      ru: 'Мы создаем компактные внутренние системы для сложившихся процессов, не превращая каждую задачу в огромный ERP-проект.'
    },
    detailLinks: [{href: '/services', label: {de: 'Softwarelösungen ansehen', en: 'Explore software solutions', ru: 'Посмотреть программные решения'}}]
  }
]);

export const processSteps: ProcessStep[] = withLocaleFallbacks([
  {
    title: {
      de: '1. Analyse',
      en: '1. Audit',
      ru: '1. Анализ'
    },
    description: {
      de: 'Wir verstehen Abläufe, Tools, manuelle Arbeit, Zielgruppen und die Stellen, an denen Automatisierung wirklich Sinn macht.',
      en: 'We understand workflows, tools, manual work, audiences, and the places where automation actually makes sense.',
      ru: 'Разбираемся в workflow, инструментах, ручной работе, аудиториях и местах, где автоматизация действительно имеет смысл.'
    }
  },
  {
    title: {
      de: '2. Systemplan',
      en: '2. System plan',
      ru: '2. План системы'
    },
    description: {
      de: 'Aus Anforderungen, Datenflüssen und Interface-Ideen entsteht ein klarer Plan für Website, App, AI-Flow oder Integration.',
      en: 'Requirements, data flows, and interface ideas become a clear plan for the website, app, AI flow, or integration.',
      ru: 'Требования, потоки данных и идеи интерфейса превращаются в понятный план сайта, приложения, AI-flow или интеграции.'
    }
  },
  {
    title: {
      de: '3. Umsetzung',
      en: '3. Build',
      ru: '3. Реализация'
    },
    description: {
      de: 'Wir entwickeln responsiv, performant und so, dass Inhalte, Automationen und Schnittstellen nachvollziehbar wartbar bleiben.',
      en: 'We build responsively and performantly, keeping content, automations, and integrations maintainable.',
      ru: 'Разрабатываем адаптивно и быстро, чтобы контент, автоматизации и интеграции оставались поддерживаемыми.'
    }
  },
  {
    title: {
      de: '4. Launch',
      en: '4. Launch',
      ru: '4. Запуск'
    },
    description: {
      de: 'Vor dem Go-live prüfen wir Formulare, Daten, Schnittstellen, Berechtigungen, Metadaten und die wichtigsten Nutzerwege.',
      en: 'Before launch, we check forms, data, integrations, permissions, metadata, and the most important user journeys.',
      ru: 'Перед запуском проверяем формы, данные, интеграции, права доступа, метаданные и ключевые пользовательские пути.'
    }
  }
]);

export const automationExamples: AutomationExample[] = withLocaleFallbacks([
  {
    title: {de: 'Anfragen automatisch vorqualifizieren', en: 'Automatically qualify inquiries', ru: 'Автоматически предквалифицировать заявки'},
    process: {
      de: 'Website-Formulare, E-Mails oder Buchungsanfragen werden erfasst, sortiert und mit den wichtigsten Informationen ins CRM übertragen.',
      en: 'Website forms, emails, or booking requests are captured, sorted, and transferred into the CRM with the most important information.',
      ru: 'Формы сайта, письма или запросы бронирования собираются, сортируются и передаются в CRM с важными данными.'
    },
    benefit: {
      de: 'Ihr Team reagiert schneller, verliert weniger Leads und muss Daten nicht doppelt eingeben.',
      en: 'Your team responds faster, loses fewer leads, and no longer enters the same data twice.',
      ru: 'Команда отвечает быстрее, теряет меньше лидов и не вводит одни и те же данные дважды.'
    }
  },
  {
    title: {de: 'Kundenkommunikation vorbereiten', en: 'Prepare customer communication', ru: 'Готовить коммуникацию с клиентами'},
    process: {
      de: 'AI erstellt Antwortentwürfe, Follow-ups, Terminbestätigungen oder Statusmeldungen passend zu Anfrage, Sprache und Kundentyp.',
      en: 'AI prepares reply drafts, follow-ups, appointment confirmations, or status updates based on inquiry, language, and customer type.',
      ru: 'AI готовит черновики ответов, follow-up, подтверждения встреч или статусные сообщения под заявку, язык и тип клиента.'
    },
    benefit: {
      de: 'Antworten werden konsistenter und schneller, ohne dass persönliche Betreuung verloren geht.',
      en: 'Replies become faster and more consistent without losing the human service layer.',
      ru: 'Ответы становятся быстрее и последовательнее, не убирая человеческий сервис.'
    }
  },
  {
    title: {de: 'CRM-Prozesse automatisieren', en: 'Automate CRM processes', ru: 'Автоматизировать CRM-процессы'},
    process: {
      de: 'Leads, Aufgaben, Pipeline-Status, Erinnerungen und interne Zuständigkeiten werden automatisch aktualisiert.',
      en: 'Leads, tasks, pipeline stages, reminders, and internal responsibilities are updated automatically.',
      ru: 'Лиды, задачи, этапы pipeline, напоминания и внутренние ответственности обновляются автоматически.'
    },
    benefit: {
      de: 'Vertrieb und Service sehen schneller, was offen ist, wer zuständig ist und welcher nächste Schritt ansteht.',
      en: 'Sales and service teams see faster what is open, who owns it, and which next step is due.',
      ru: 'Продажи и сервис быстрее видят, что открыто, кто отвечает и какой следующий шаг нужен.'
    }
  },
  {
    title: {de: 'Support und FAQs entlasten', en: 'Reduce support and FAQ workload', ru: 'Разгрузить поддержку и FAQ'},
    process: {
      de: 'Ein AI chatbot for business beantwortet häufige Fragen, sammelt Kontext und leitet komplexe Fälle an das Team weiter.',
      en: 'An AI chatbot for business answers common questions, collects context, and routes complex cases to the team.',
      ru: 'AI-чатбот для бизнеса отвечает на частые вопросы, собирает контекст и передает сложные случаи команде.'
    },
    benefit: {
      de: 'Kunden erhalten schneller Hilfe, während Ihr Team weniger Standardfragen manuell beantwortet.',
      en: 'Customers get help faster while your team handles fewer repetitive support questions manually.',
      ru: 'Клиенты получают помощь быстрее, а команда вручную обрабатывает меньше повторяющихся вопросов.'
    }
  },
  {
    title: {de: 'Interne Routineaufgaben reduzieren', en: 'Reduce internal routine tasks', ru: 'Сократить внутренние рутинные задачи'},
    process: {
      de: 'Berichte, Checklisten, Dokumente, Freigaben und wiederkehrende Erinnerungen werden aus bestehenden Daten erzeugt.',
      en: 'Reports, checklists, documents, approvals, and recurring reminders are generated from existing data.',
      ru: 'Отчеты, чек-листы, документы, согласования и повторяющиеся напоминания создаются из существующих данных.'
    },
    benefit: {
      de: 'Mitarbeitende verbringen weniger Zeit mit Verwaltung und mehr Zeit mit wertschöpfender Arbeit.',
      en: 'Employees spend less time on administration and more time on work that creates value.',
      ru: 'Сотрудники тратят меньше времени на администрирование и больше на работу, которая создает ценность.'
    }
  },
  {
    title: {de: 'Services miteinander verbinden', en: 'Connect services together', ru: 'Связать сервисы между собой'},
    process: {
      de: 'Website, CRM, E-Mail, Kalender, Buchungssysteme, Zahlungsanbieter und interne Tools werden zu einem Workflow verbunden.',
      en: 'Website, CRM, email, calendar, booking systems, payment providers, and internal tools are connected into one workflow.',
      ru: 'Сайт, CRM, e-mail, календарь, системы бронирования, платежные провайдеры и внутренние инструменты связываются в один workflow.'
    },
    benefit: {
      de: 'Informationen fließen automatisch durch den Betrieb, statt in einzelnen Tools stecken zu bleiben.',
      en: 'Information flows through the business automatically instead of getting stuck in separate tools.',
      ru: 'Информация автоматически проходит через бизнес, вместо того чтобы застревать в отдельных инструментах.'
    }
  }
]);

export const audienceItems: AudienceItem[] = withLocaleFallbacks([
  {
    title: {de: 'Hotels & Tourismusbetriebe', en: 'Hotels & tourism businesses', ru: 'Отели и туристический бизнес'},
    description: {
      de: 'Websites, Anfrageflows und Automationen für Direktanfragen, Gästekommunikation und saisonale Angebote.',
      en: 'Websites, inquiry flows, and automations for direct inquiries, guest communication, and seasonal offers.',
      ru: 'Сайты, процессы заявок и автоматизация для прямых запросов, коммуникации с гостями и сезонных предложений.'
    }
  },
  {
    title: {de: 'Arztpraxen & Ordinationen', en: 'Medical practices & clinics', ru: 'Медицинские практики и клиники'},
    description: {
      de: 'Klare Leistungsseiten, Terminführung, FAQ-Struktur und weniger manuelle Kommunikation.',
      en: 'Clear service pages, appointment guidance, FAQ structure, and less manual communication.',
      ru: 'Понятные страницы услуг, путь к записи, структура FAQ и меньше ручной коммуникации.'
    }
  },
  {
    title: {de: 'Rechtsanwälte & Beratungen', en: 'Law firms & consultants', ru: 'Юридические фирмы и консалтинг'},
    description: {
      de: 'Seriöse Websites, strukturierte Erstkontakte und digitale Abläufe für Anfragen und Follow-ups.',
      en: 'Credible websites, structured first contact, and digital workflows for inquiries and follow-ups.',
      ru: 'Серьезные сайты, структурированный первый контакт и цифровые workflow для заявок и follow-up.'
    }
  },
  {
    title: {de: 'Immobilienunternehmen', en: 'Real estate companies', ru: 'Компании недвижимости'},
    description: {
      de: 'Objektanfragen, Bewertungs-CTAs, Lead-Erfassung und CRM-Verbindung für Käufer und Eigentümer.',
      en: 'Property inquiries, valuation CTAs, lead capture, and CRM connection for buyers and owners.',
      ru: 'Заявки по объектам, CTA на оценку, сбор лидов и CRM-связка для покупателей и собственников.'
    }
  },
  {
    title: {de: 'Fitnessstudios & lokale Dienstleister', en: 'Fitness studios & local service providers', ru: 'Фитнес-студии и локальные сервисы'},
    description: {
      de: 'Mehr Probetrainings, Buchungen oder Erstgespräche durch klare Websites und einfache Anfrageautomatisierung.',
      en: 'More trial sessions, bookings, or consultations through clear websites and simple inquiry automation.',
      ru: 'Больше пробных тренировок, бронирований или консультаций через понятные сайты и простую автоматизацию заявок.'
    }
  },
  {
    title: {de: 'KMU mit manuellen Büroprozessen', en: 'SMEs with manual office processes', ru: 'Малый и средний бизнес с ручными офисными процессами'},
    description: {
      de: 'Für Teams, die E-Mail, CRM, Formulare, Dokumente und wiederkehrende Aufgaben besser verbinden möchten.',
      en: 'For teams that want to connect email, CRM, forms, documents, and recurring tasks more cleanly.',
      ru: 'Для команд, которые хотят лучше связать e-mail, CRM, формы, документы и повторяющиеся задачи.'
    }
  }
]);

// Generated from src/content/pricing.ts — change prices there, not here.
const homePricePackageIds: PackageId[] = ['websiteStart', 'websiteBusiness', 'pflege', 'anfrageAutomation'];
const allLocales: Locale[] = ['de', 'en', 'ru'];
const perLocale = (build: (locale: Locale) => string): LocalizedText =>
  Object.fromEntries(allLocales.map((locale) => [locale, build(locale)])) as LocalizedText;

export const pricePackages: PricePackage[] = homePricePackageIds.map((id) => {
  const pkg = getPackage(id);
  return {
    name: perLocale(() => pkg.name),
    price: perLocale((locale) => formatPackagePrice(pkg, locale)),
    description: perLocale((locale) => {
      const founder = id === founderOffer.packageId
        ? ({de: ` Gründerpreis ${formatEur(founderOffer.price, 'de')} für die ersten ${founderOffer.slots} Betriebe.`, en: ` Founding price ${formatEur(founderOffer.price, 'en')} for the first ${founderOffer.slots} businesses.`, ru: ` Цена основателя ${formatEur(founderOffer.price, 'ru')} для первых ${founderOffer.slots} бизнесов.`})[locale]
        : '';
      const delivery = pkg.delivery ? ` ${pkg.delivery[locale].charAt(0).toUpperCase()}${pkg.delivery[locale].slice(1)}.` : '';
      return `${pkg.tagline[locale]}${delivery}${founder}`;
    })
  };
});

function websitePriceAnswer(locale: Locale): string {
  const start = formatPackagePrice(getPackage('websiteStart'), locale);
  const business = formatPackagePrice(getPackage('websiteBusiness'), locale);
  const abo = formatPackagePrice(getPackage('websiteAbo'), locale);
  const care = formatPackagePrice(getPackage('pflege'), locale);
  const founder = formatEur(founderOffer.price, locale);
  const hourly = formatEur(hourlyRate, locale);
  return {
    de: `Website Start kostet ${start}, Website Business ${business} — Fixpreise inklusive Texten. Ohne große Anfangsinvestition: Website-Abo ${abo}. Pflege ab ${care}. Für die ersten ${founderOffer.slots} Betriebe gilt der Gründerpreis von ${founder}. Zusätzliche Arbeiten: ${hourly} pro Stunde, immer vorher abgesprochen.`,
    en: `Website Start costs ${start}, Website Business ${business} — fixed prices including copywriting. No large upfront cost: Website subscription ${abo}. Care plans from ${care}. The first ${founderOffer.slots} businesses get the founding price of ${founder}. Extra work: ${hourly} per hour, always agreed in advance.`,
    ru: `Website Start стоит ${start}, Website Business — ${business}; цены фиксированные, тексты включены. Без крупной оплаты на старте: Website-Abo ${abo}. Pflege — от ${care}. Для первых ${founderOffer.slots} бизнесов действует цена основателя ${founder}. Дополнительные работы — ${hourly} в час, всегда по предварительной договорённости.`
  }[locale];
}

export const faqItems: FaqItem[] = withLocaleFallbacks([
  {question: {de: 'Was kostet eine Website?', en: 'What does a website cost?', ru: 'Сколько стоит сайт?'}, answer: perLocale((locale) => websitePriceAnswer(locale))},
  {question: {de: 'Wie lange dauert ein Projekt?', en: 'How long does a project take?', ru: 'Сколько длится проект?'}, answer: {de: 'Website Start ist in 7 Tagen online, Website Business in 14 Tagen — gerechnet ab dem 30-Minuten-Gespräch, nicht ab dem Tag, an dem Sie uns Texte schicken. Automationen dauern 3 Tage bis 2 Wochen, individuelle Software 4–8 Wochen.', en: 'Website Start goes live in 7 days, Website Business in 14 days — counted from our 30-minute call, not from when you send us copy. Automations take 3 days to 2 weeks, custom software 4–8 weeks.', ru: 'Website Start запускается за 7 дней, Website Business — за 14, считая от 30-минутного разговора, а не от момента, когда вы пришлёте тексты. Автоматизации — от 3 дней до 2 недель, индивидуальное ПО — 4–8 недель.'}},
  {question: {de: 'Können bestehende Websites verbessert werden?', en: 'Can existing websites be improved?', ru: 'Можно улучшить существующий сайт?'}, answer: {de: 'Ja. Struktur, Texte, Anfrageführung und CRM-Anbindung können oft ohne kompletten Neustart verbessert werden.', en: 'Yes. Structure, copy, inquiry guidance, and CRM connection can often be improved without a full rebuild.', ru: 'Да. Структуру, тексты, путь заявки и CRM-подключение часто можно улучшить без полного перезапуска.'}},
  {question: {de: 'Können wir klein starten?', en: 'Can we start small?', ru: 'Можно начать с малого?'}, answer: {de: 'Ja. Website Start oder das Website-Abo ohne große Anfangsinvestition, später bei Bedarf eine Anfrage-Automation. Pflege-Pakete sind monatlich kündbar.', en: 'Yes. Start with Website Start or the Website subscription without a large upfront cost, and add inquiry automation later if needed. Care plans can be cancelled monthly.', ru: 'Да. Начните с Website Start или Website-Abo без крупной оплаты на старте, а автоматизацию заявок добавьте позже. Пакеты Pflege расторгаются помесячно.'}},
  {question: {de: 'Arbeitet TreeTech mit bestehenden Tools?', en: 'Does TreeTech work with existing tools?', ru: 'TreeTech работает с уже существующими инструментами?'}, answer: {de: 'Ja. Wenn möglich verbinden wir bestehende Website, Formulare, E-Mail, CRM und Kalender.', en: 'Yes. Where possible, we connect existing website, forms, email, CRM, and calendar.', ru: 'Да. Если возможно, мы связываем существующий сайт, формы, e-mail, CRM и календарь.'}},
  {question: {de: 'Ist AI-Automation DSGVO-konform?', en: 'Is AI automation GDPR-compliant?', ru: 'AI-автоматизация соответствует GDPR?'}, answer: {de: 'Das hängt vom Prozess ab. TreeTech plant AI-Flows DSGVO-bewusst mit Datenminimierung und menschlicher Kontrolle.', en: 'It depends on the process. TreeTech plans AI flows with GDPR awareness, data minimization, and human review.', ru: 'Это зависит от процесса. TreeTech проектирует AI-flow с учетом GDPR, минимизации данных и человеческого контроля.'}}
]);

export const siteContent = withLocaleFallbacks({
  de: {
    metadata: {
      homeTitle: 'Website für Handwerker & Werkstätten in Wien und NÖ | TreeTech',
      homeDescription:
        `Websites für Elektriker, Installateure, Dachdecker, Maler und Kfz-Werkstätten in Wien und Niederösterreich. Fixpreis ab ${formatEur(getPackage('websiteStart').oneTime ?? 0, 'de')}, Texte inklusive, online in 7 Tagen — Vorschau vor der Zahlung.`,
      aboutTitle: 'Über TreeTech | Digitalstudio für österreichische Betriebe',
      aboutDescription:
        'TreeTech ist ein modernes Digitalstudio für Betriebe, die Prozesse automatisieren, Web-Software bauen und digital besser arbeiten möchten.',
      servicesTitle: 'Leistungen und Preise | TreeTech',
      servicesDescription:
        `Alle Pakete mit Fixpreis: Websites ab ${formatEur(getPackage('websiteStart').oneTime ?? 0, 'de')}, Pflege ab ${formatEur(getPackage('pflege').monthly ?? 0, 'de')} im Monat, Anfrage-Automation und eigene Software. Für Handwerk und Werkstätten in Wien und Niederösterreich.`,
      portfolioTitle: 'Portfolio | TreeTech Webstudio',
      portfolioDescription:
        'Beispiel-Websites zum Anklicken: Elektriker, Ordination, Kanzlei, Hotel, Immobilien und Fitnessstudio. So sieht Ihre kostenlose Vorschau aus.',
      contactTitle: 'Kostenlose Website-Vorschau anfordern | TreeTech',
      contactDescription:
        'Name Ihres Betriebs und Ort genügen. Ihre kostenlose Website-Vorschau bekommen Sie in 3 Werktagen. Anrufen, WhatsApp oder Formular.'
    },
    common: {
      eyebrow: 'Websites · Automation · Software',
      primaryCta: 'Kostenlose Vorschau',
      secondaryCta: 'Beispielprojekte ansehen',
      viewProject: 'Case ansehen',
      startProject: 'Projekt starten',
      learnMore: 'Mehr erfahren',
      requestPackage: 'Projekt besprechen',
      recommended: 'Kernleistung',
      from: 'Kapitel',
      included: 'Was wir umsetzen',
      backToPortfolio: 'Zurück zum Portfolio',
      nextStep: 'Nächster Schritt'
    },
    home: {
      heroTitle: 'Mehr Kunden. Weniger manuelle Arbeit.',
      heroLead:
        'Websites, Automatisierungen und individuelle Software für österreichische Unternehmen.',
      heroBadge: 'Digital Solutions & Automation',
      heroTrust: [
        'Websites, die qualifizierte Anfragen gewinnen',
        'Automatisierung für wiederkehrende Arbeit',
        'Individuelle Software für komplexere Abläufe'
      ],
      proofTitle: 'Für Betriebe, die weniger manuell arbeiten und digital professioneller verkaufen möchten.',
      proofCopy:
        'Wir denken nicht nur in schönen Screens. Jede Lösung bekommt einen Zweck: schneller reagieren, Prozesse entlasten, Kundinnen und Kunden besser führen und Daten sauberer nutzen.',
      servicesTitle: 'Was wir bauen.',
      servicesLead:
        'Drei klare Wege zum Ergebnis: mehr qualifizierte Anfragen, weniger Routine und passende Systeme für gewachsene Prozesse.',
      portfolioTitle: 'Beispielprojekte für typische Branchen in Österreich.',
      portfolioLead:
        'Diese Demo-Projekte zeigen, wie TreeTech Struktur, Design und Anfrageführung für verschiedene Branchen umsetzt.',
      processTitle: 'Ein Prozess wie ein sauberer System-Launch.',
      processLead:
        'Wir starten mit Abläufen, Zielen und Daten. Danach entstehen Struktur, Interface, Automatisierung und Launch in klaren Schritten.',
      automationTitle: 'Was lässt sich im Betrieb automatisieren?',
      automationLead:
        'Viele kleine Aufgaben kosten jeden Tag Zeit. Mit AI automation, CRM automation und Integrationen zwischen bestehenden Services werden diese Schritte schneller, zuverlässiger und besser nachvollziehbar.',
      audienceTitle: 'Für wen TreeTech entwickelt.',
      audienceLead:
        'Unsere digitalen Lösungen richten sich an kleine und mittlere Unternehmen in Österreich, die moderner arbeiten möchten, ohne für jede neue Aufgabe sofort zusätzliche Mitarbeitende einzustellen.',
      seoTitle: 'Digitale Lösungen für Unternehmen in Österreich.',
      seoLead:
        'TreeTech entwickelt praktische Systeme für Betriebe, die Web, AI und Prozesse sinnvoll verbinden möchten.',
      seoParagraphs: [
        'AI Automation in Austria ist besonders wertvoll, wenn Unternehmen viele Anfragen, E-Mails, Dokumente oder wiederkehrende Aufgaben bearbeiten. Statt jeden Schritt manuell auszuführen, können AI Assistants Informationen vorbereiten, Kundenkommunikation beschleunigen und interne Workflows strukturieren.',
        'Web Development in Austria bedeutet für uns mehr als eine schöne Website. Eine moderne Unternehmenswebsite soll erklären, Vertrauen schaffen, Leads erfassen und Prozesse anstoßen. Mit website automation, Formularlogik und CRM Integration wird aus einem Webauftritt ein aktiver Teil des Vertriebs.',
        'Business Automation, Workflow Automation Austria und CRM automation helfen Teams, zentrale Informationen schneller zu finden und Aufgaben sauber zu verfolgen. So entstehen digitale Lösungen für kleine Unternehmen, die Zeit sparen, Fehler reduzieren und das Kundenerlebnis verbessern.'
      ],
      blogLink: 'Blog / Insights lesen'
    },
    about: {
      title: 'Technologie sollte Arbeit vereinfachen — nicht komplizierter machen.',
      lead:
        'TreeTech verbindet Websites, E-Mail, CRM, Kalender und Dokumente zu praktischen Systemen für österreichische Unternehmen.',
      storyTitle: 'Warum TreeTech',
      story:
        'Viele Betriebe arbeiten mit starken Teams, aber mit zu vielen manuellen Schritten, verstreuten Tools und Websites, die nicht mehr zur Realität des Unternehmens passen. TreeTech verbindet Strategie, Design und Entwicklung zu digitalen Systemen, die sichtbar entlasten.',
      valuesTitle: 'So arbeiten wir',
      values: [
        'Zuerst verstehen wir Prozesse, Engpässe und Ziele',
        'AI wird dort eingesetzt, wo sie messbar Zeit spart',
        'Interface, Text und Automatisierung greifen ineinander',
        'Technik bleibt nachvollziehbar, wartbar und erweiterbar'
      ],
      promiseTitle: 'Was Sie erwarten können',
      promise:
        'Direkter Kontakt, klare Entscheidungen und kleine sinnvolle Schritte: starten, Wirkung messen und erst danach erweitern.'
    },
    services: {
      title: 'Digitale Systeme für Betriebe, die wachsen, automatisieren und besser verkaufen wollen.',
      lead:
        'Wir bauen Websites, AI-Automationen, Web-Apps und Workflow-Systeme für Unternehmen, die weniger händisch erledigen und digital professioneller arbeiten möchten.',
      serviceAreasTitle: 'Leistungsbereiche',
      processTitle: 'So läuft die Zusammenarbeit',
      addOnsTitle: 'Was sich dadurch im Betrieb verbessert',
      addOns: [
        'Weniger manuelle E-Mail-, CRM- und Dokumentenarbeit',
        'Schnellere Reaktionszeiten gegenüber Kundinnen und Kunden',
        'Saubere Verbindung von Website, Formularen, CRM und internen Tools',
        'Bessere Übersicht über Leads, Prozesse und offene Aufgaben',
        'AI-Assistenten für Support, Vertrieb und interne Abläufe'
      ]
    },
    portfolio: {
      title: 'Beispiel-Websites zum Anklicken.',
      lead:
        'Öffnen Sie ein Beispiel und probieren Sie es am Handy aus. Genau so fühlt sich Ihre Vorschau an, nur mit Ihrem Betrieb.',
      disclaimer:
        'Die Beispiele zeigen mögliche Lösungen für typische Branchen. Reale Kundenfälle werden ergänzt, sobald abgeschlossene Projekte mit freigegebenen Ergebnissen vorliegen.',
      detailIntro: 'Projektüberblick',
      problem: 'Ausgangslage',
      solution: 'Lösung',
      features: 'Umfang',
      visualStyle: 'Visuelle Richtung',
      result: 'Ziel / geplanter Effekt',
      ctaTitle: 'Planen Sie ein ähnliches Projekt?',
      location: 'Standort',
      year: 'Jahr'
    },
    contact: {
      title: 'Bereit für digitale Systeme, die Ihrem Team Arbeit abnehmen?',
      lead:
        'Schreiben Sie kurz, welcher Prozess, welche Website oder welches Web-Tool verbessert werden soll. TreeTech meldet sich mit einer ehrlichen Einschätzung und einem klaren nächsten Schritt.',
      detailsTitle: 'Direkter Kontakt',
      details:
        'Passend für AI-Automation, Webentwicklung, Web-Apps, CRM/ERP-Integrationen und digitale Workflows für Betriebe in Österreich.',
      responseTime: 'Antwort in der Regel innerhalb von 2 Stunden während der Geschäftszeit.',
      formTitle: 'Projektanfrage'
    }
  },
  en: {
    metadata: {
      homeTitle: 'Websites for trades & workshops in Vienna and Lower Austria | TreeTech',
      homeDescription:
        `Websites for electricians, plumbers, roofers, painters and car workshops in Vienna and Lower Austria. Fixed price from ${formatEur(getPackage('websiteStart').oneTime ?? 0, 'en')}, copywriting included, live in 7 days — preview before you pay.`,
      aboutTitle: 'About TreeTech | Digital studio for Austrian businesses',
      aboutDescription:
        'TreeTech is a modern digital studio for businesses that want to automate processes, build web software, and work better digitally.',
      servicesTitle: 'Services and prices | TreeTech',
      servicesDescription:
        `Every package at a fixed price: websites from ${formatEur(getPackage('websiteStart').oneTime ?? 0, 'en')}, care from ${formatEur(getPackage('pflege').monthly ?? 0, 'en')} a month, inquiry automation and custom software. For trades and workshops in Vienna and Lower Austria.`,
      portfolioTitle: 'Portfolio | TreeTech web studio',
      portfolioDescription:
        'Example websites to click through: electrician, dental clinic, law firm, hotel, real estate and fitness studio. This is what your free preview looks like.',
      contactTitle: 'Get a free website preview | TreeTech',
      contactDescription:
        'Your business name and town are enough. You get your free website preview within 3 working days. Call, WhatsApp or use the form.'
    },
    common: {
      eyebrow: 'Websites · Automation · Software',
      primaryCta: 'Free preview',
      secondaryCta: 'View example projects',
      viewProject: 'View case',
      startProject: 'Start project',
      learnMore: 'Learn more',
      requestPackage: 'Discuss project',
      recommended: 'Core service',
      from: 'Chapter',
      included: 'What we build',
      backToPortfolio: 'Back to portfolio',
      nextStep: 'Next step'
    },
    home: {
      heroTitle: 'More customers. Less manual work.',
      heroLead:
        'Websites, automation, and custom software for Austrian businesses.',
      heroBadge: 'Digital Solutions & Automation',
      heroTrust: [
        'Websites that generate qualified inquiries',
        'Automation for recurring work',
        'Custom software for complex workflows'
      ],
      proofTitle: 'For businesses that want less manual work and a more professional digital sales flow.',
      proofCopy:
        'We do not think only in good-looking screens. Every solution has a purpose: respond faster, remove process friction, guide customers better, and use data more cleanly.',
      servicesTitle: 'What we build.',
      servicesLead:
        'Three clear paths to an outcome: more qualified inquiries, less routine work, and systems that fit established processes.',
      portfolioTitle: 'Example projects for typical Austrian industries.',
      portfolioLead:
        'These demo projects show how TreeTech handles structure, design, and inquiry guidance for different industries.',
      processTitle: 'A process shaped like a clean system launch.',
      processLead:
        'We start with workflows, goals, and data. Then structure, interface, automation, and launch follow in clear steps.',
      automationTitle: 'What can be automated inside the business?',
      automationLead:
        'Many small tasks cost time every day. With AI automation, CRM automation, and integrations between existing services, these steps become faster, more reliable, and easier to track.',
      audienceTitle: 'Who TreeTech is for.',
      audienceLead:
        'Our digital solutions are built for small and medium-sized businesses in Austria that want to modernize operations without hiring a new person for every new task.',
      seoTitle: 'Digital solutions for companies in Austria.',
      seoLead:
        'TreeTech develops practical systems for businesses that want to connect web, AI, and operations in a useful way.',
      seoParagraphs: [
        'AI Automation in Austria is especially valuable when companies handle many inquiries, emails, documents, or recurring tasks. Instead of completing every step manually, AI Assistants can prepare information, speed up customer communication, and structure internal workflows.',
        'Web Development in Austria means more to us than a good-looking website. A modern business website should explain, build trust, capture leads, and start processes. With website automation, form logic, and CRM Integration, a website becomes an active part of sales.',
        'Business Automation, Workflow Automation Austria, and CRM automation help teams find central information faster and track tasks cleanly. The result is digital solutions for small businesses that save time, reduce errors, and improve the customer experience.'
      ],
      blogLink: 'Read Blog / Insights'
    },
    about: {
      title: 'Technology should simplify work — not make it more complicated.',
      lead:
        'TreeTech connects websites, email, CRM, calendars, and documents into practical systems for Austrian businesses.',
      storyTitle: 'Why TreeTech',
      story:
        'Many companies have strong teams but too many manual steps, scattered tools, and websites that no longer match how the business actually works. TreeTech combines strategy, design, and development into digital systems that reduce friction.',
      valuesTitle: 'How we work',
      values: [
        'We first understand workflows, bottlenecks, and goals',
        'AI is used where it saves measurable time',
        'Interface, copy, and automation work together',
        'Technology stays understandable, maintainable, and extendable'
      ],
      promiseTitle: 'What to expect',
      promise:
        'Direct communication, clear decisions, and sensible small steps: start, measure impact, then expand.'
    },
    services: {
      title: 'Digital systems for businesses that want to grow, automate, and sell better.',
      lead:
        'We build websites, AI automations, web apps, and workflow systems for companies that want to reduce manual work and operate more professionally online.',
      serviceAreasTitle: 'Service areas',
      processTitle: 'How collaboration works',
      addOnsTitle: 'What improves inside the business',
      addOns: [
        'Less manual email, CRM, and document work',
        'Faster response times for customers and leads',
        'Clean connection between website, forms, CRM, and internal tools',
        'Better overview of leads, processes, and open tasks',
        'AI assistants for support, sales, and internal workflows'
      ]
    },
    portfolio: {
      title: 'Example websites to click through.',
      lead:
        'Open an example and try it on your phone. Your preview feels exactly like this, just with your business.',
      disclaimer:
        'The examples below show possible solutions for typical industries. Real client cases will be added here as completed projects and approved results become available.',
      detailIntro: 'Project overview',
      problem: 'Starting point',
      solution: 'Solution',
      features: 'Scope',
      visualStyle: 'Visual direction',
      result: 'Goal / intended effect',
      ctaTitle: 'Planning a similar project?',
      location: 'Location',
      year: 'Year'
    },
    contact: {
      title: 'Ready for digital systems that take work off your team?',
      lead:
        'Send a short note about the process, website, or web tool you want to improve. TreeTech will reply with an honest assessment and a clear next step.',
      detailsTitle: 'Direct contact',
      details:
        'Best suited for AI automation, web development, web apps, CRM/ERP integrations, and digital workflows for Austrian businesses.',
      responseTime: 'Replies usually within 2 hours during business hours.',
      formTitle: 'Project inquiry'
    }
  },
  ru: {
    metadata: {
      homeTitle: 'Сайты для мастерских и автосервисов в Вене и Нижней Австрии | TreeTech',
      homeDescription:
        `Сайты для электриков, сантехников, кровельщиков, маляров и автосервисов в Вене и Нижней Австрии. Фиксированная цена от ${formatEur(getPackage('websiteStart').oneTime ?? 0, 'ru')}, тексты включены, онлайн за 7 дней — превью до оплаты.`,
      aboutTitle: 'О TreeTech | Digital-студия для бизнеса в Австрии',
      aboutDescription:
        'TreeTech помогает компаниям автоматизировать процессы, создавать веб-софт и работать цифровыми инструментами эффективнее.',
      servicesTitle: 'Услуги и цены | TreeTech',
      servicesDescription:
        `Все пакеты с фиксированной ценой: сайты от ${formatEur(getPackage('websiteStart').oneTime ?? 0, 'ru')}, поддержка от ${formatEur(getPackage('pflege').monthly ?? 0, 'ru')} в месяц, автоматизация заявок и собственное ПО. Для мастеров и автосервисов в Вене и Нижней Австрии.`,
      portfolioTitle: 'Портфолио | Веб-студия TreeTech',
      portfolioDescription:
        'Примеры проектов для австрийских отраслей: клиника, юридическая фирма, отель, недвижимость и фитнес-студия.',
      contactTitle: 'Бесплатное превью сайта | TreeTech',
      contactDescription:
        'Достаточно названия бизнеса и города. Бесплатное превью сайта будет у вас через 3 рабочих дня. Звонок, WhatsApp или форма.'
    },
    common: {
      eyebrow: 'Сайты · Автоматизация · ПО',
      primaryCta: 'Бесплатное превью',
      secondaryCta: 'Посмотреть примеры проектов',
      viewProject: 'Посмотреть кейс',
      startProject: 'Начать проект',
      learnMore: 'Подробнее',
      requestPackage: 'Обсудить проект',
      recommended: 'Основная услуга',
      from: 'Глава',
      included: 'Что мы создаем',
      backToPortfolio: 'Назад к портфолио',
      nextStep: 'Следующий шаг'
    },
    home: {
      heroTitle: 'Больше клиентов. Меньше ручной работы.',
      heroLead:
        'Сайты, автоматизация и индивидуальное ПО для австрийского бизнеса.',
      heroBadge: 'Digital Solutions & Automation',
      heroTrust: [
        'Сайты, которые приводят качественные заявки',
        'Автоматизация повторяющейся работы',
        'Индивидуальное ПО для сложных процессов'
      ],
      proofTitle: 'Для компаний, которым нужно меньше ручной работы и более профессиональный цифровой путь продаж.',
      proofCopy:
        'Мы думаем не только о красивых экранах. У каждого решения есть задача: быстрее отвечать, убирать трение в процессах, лучше вести клиентов и аккуратнее использовать данные.',
      servicesTitle: 'Что мы создаем.',
      servicesLead:
        'Три понятных пути к результату: больше качественных заявок, меньше рутины и системы под сложившиеся процессы.',
      portfolioTitle: 'Примеры проектов для типичных отраслей в Австрии.',
      portfolioLead:
        'Эти demo-проекты показывают, как TreeTech работает со структурой, дизайном и маршрутом заявки в разных отраслях.',
      processTitle: 'Процесс как аккуратный запуск системы.',
      processLead:
        'Мы начинаем с workflow, целей и данных. Потом идут структура, интерфейс, автоматизация и запуск понятными этапами.',
      automationTitle: 'Что можно автоматизировать внутри бизнеса?',
      automationLead:
        'Маленькие ежедневные задачи незаметно забирают часы. С AI-автоматизацией, CRM-автоматизацией и интеграциями между сервисами эти шаги становятся быстрее, надежнее и прозрачнее.',
      audienceTitle: 'Для кого TreeTech.',
      audienceLead:
        'Наши цифровые решения подходят малому и среднему бизнесу в Австрии, который хочет модернизировать процессы без найма отдельного человека под каждую новую задачу.',
      seoTitle: 'Цифровые решения для компаний в Австрии.',
      seoLead:
        'TreeTech разрабатывает практичные системы для бизнеса, который хочет связать сайт, AI и операционные процессы в полезную рабочую систему.',
      seoParagraphs: [
        'AI-автоматизация в Австрии особенно полезна компаниям, которые обрабатывают много заявок, писем, документов или повторяющихся задач. Вместо ручного выполнения каждого шага AI-ассистенты могут готовить информацию, ускорять коммуникацию и структурировать внутренние процессы.',
        'Веб-разработка в Австрии для нас больше, чем красивый сайт. Современный сайт должен объяснять, вызывать доверие, собирать лиды и запускать процессы. С автоматизацией форм, логикой заявок и CRM-интеграцией сайт становится активной частью продаж.',
        'Business automation, workflow-автоматизация и CRM-автоматизация помогают командам быстрее находить информацию и понятнее отслеживать задачи. Результат — цифровые решения для малого бизнеса, которые экономят время, снижают ошибки и улучшают клиентский опыт.'
      ],
      blogLink: 'Читать блог / инсайты'
    },
    about: {
      title: 'Технологии должны упрощать работу, а не усложнять её.',
      lead:
        'TreeTech связывает сайты, e-mail, CRM, календари и документы в практичные системы для австрийского бизнеса.',
      storyTitle: 'Почему TreeTech',
      story:
        'У многих компаний сильные команды, но слишком много ручных шагов, разрозненных инструментов и сайтов, которые уже не отражают реальную работу бизнеса. TreeTech соединяет стратегию, дизайн и разработку в цифровые системы, которые уменьшают трение.',
      valuesTitle: 'Как мы работаем',
      values: [
        'Сначала разбираемся в процессах, узких местах и целях',
        'Используем AI там, где он экономит измеримое время',
        'Интерфейс, тексты и автоматизация работают вместе',
        'Технология остается понятной, поддерживаемой и расширяемой'
      ],
      promiseTitle: 'Чего ожидать',
      promise:
        'Прямой контакт, понятные решения и разумные небольшие шаги: начать, измерить эффект и только потом расширять.'
    },
    services: {
      title: 'Цифровые системы для бизнеса, который хочет расти, автоматизировать и продавать лучше.',
      lead:
        'Мы создаем сайты, AI-автоматизацию, веб-приложения и workflow-системы для компаний, которые хотят сократить ручную работу и выглядеть профессиональнее онлайн.',
      serviceAreasTitle: 'Направления услуг',
      processTitle: 'Как проходит сотрудничество',
      addOnsTitle: 'Что улучшается внутри бизнеса',
      addOns: [
        'Меньше ручной работы с e-mail, CRM и документами',
        'Быстрее реакция на клиентов и новые лиды',
        'Аккуратная связь между сайтом, формами, CRM и внутренними инструментами',
        'Лучший обзор лидов, процессов и открытых задач',
        'AI-ассистенты для поддержки, продаж и внутренних workflow'
      ]
    },
    portfolio: {
      title: 'Примеры сайтов, которые можно потрогать.',
      lead:
        'Откройте пример и попробуйте его с телефона. Ваше превью будет ощущаться так же, только с вашим бизнесом.',
      disclaimer:
        'Ниже показаны примеры возможных решений для типичных отраслей. Реальные кейсы клиентов появятся здесь по мере завершения проектов и согласования результатов.',
      detailIntro: 'Обзор проекта',
      problem: 'Исходная ситуация',
      solution: 'Решение',
      features: 'Объем работ',
      visualStyle: 'Визуальное направление',
      result: 'Цель / ожидаемый эффект',
      ctaTitle: 'Планируете похожий проект?',
      location: 'Локация',
      year: 'Год'
    },
    contact: {
      title: 'Готовы к цифровым системам, которые снимут работу с команды?',
      lead:
        'Напишите коротко, какой процесс, сайт или веб-инструмент нужно улучшить. TreeTech ответит с честной оценкой и понятным следующим шагом.',
      detailsTitle: 'Прямой контакт',
      details:
        'Подходит для AI-автоматизации, веб-разработки, веб-приложений, CRM/ERP-интеграций и цифровых workflow для бизнеса в Австрии.',
      responseTime: 'Обычно отвечаем в течение 2 часов в рабочее время.',
      formTitle: 'Проектная заявка'
    }
  }
}) satisfies Record<Locale, Record<string, unknown>>;

export const portfolioProjects: PortfolioProject[] = withLocaleFallbacks([
  {
    slug: 'elektro-huber',
    name: 'Elektro Huber',
    year: '2026',
    location: 'Mödling',
    industry: {
      de: 'Elektriker in Niederösterreich',
      en: 'Electrician in Lower Austria',
      ru: 'Электрик в Нижней Австрии'
    },
    description: {
      de: 'So sieht eine Website Start für einen Elektriker aus: Anruf-Knopf immer sichtbar, Anfrage mit Foto, Leistungen und Einsatzgebiet auf einen Blick.',
      en: 'This is what Website Start looks like for an electrician: call button always visible, inquiry with photo, services and service area at a glance.',
      ru: 'Так выглядит Website Start для электрика: кнопка звонка всегда на виду, заявка с фото, услуги и район выезда с первого взгляда.'
    },
    problem: {
      de: 'Typisch für viele Elektriker: gute Bewertungen bei Google, aber keine eigene Website. Wer am Handy nach einem Elektriker in Mödling sucht, ruft den Mitbewerber an.',
      en: 'Typical for many electricians: good Google reviews but no website. Anyone searching for an electrician in Mödling on their phone calls a competitor.',
      ru: 'Типично для многих электриков: хорошие отзывы в Google, но своего сайта нет. Кто ищет электрика в Мёдлинге с телефона, звонит конкуренту.'
    },
    solution: {
      de: 'Eine schnelle Seite mit klarer Botschaft, vier Leistungen, Einsatzgebiet, Ablauf in drei Schritten und einem Formular, über das Kunden ein Foto vom Schaden schicken.',
      en: 'A fast page with a clear message, four services, service area, a three-step process and a form where customers send a photo of the problem.',
      ru: 'Быстрая страница с понятным посылом, четыре услуги, район выезда, три шага и форма, через которую клиенты присылают фото поломки.'
    },
    features: {
      de: ['Anruf-Leiste am Handy', 'Anfrage mit Foto und Adresse', 'Leistungsseiten', 'Einsatzgebiet mit Orten', 'Platz für Google-Bewertungen'],
      en: ['Call bar on mobile', 'Inquiry with photo and address', 'Service pages', 'Service area with towns', 'Space for Google reviews'],
      ru: ['Панель звонка на телефоне', 'Заявка с фото и адресом', 'Страницы услуг', 'Район выезда с городами', 'Место для отзывов Google']
    },
    visualStyle: {
      de: 'Dunkelblau und Signalorange, große Schrift, große Knöpfe. Gut lesbar am Handy, auch mit Handschuhen.',
      en: 'Navy and signal orange, large type, large buttons. Easy to read on a phone, even with gloves on.',
      ru: 'Тёмно-синий и сигнальный оранжевый, крупный шрифт, большие кнопки. Удобно с телефона, даже в перчатках.'
    },
    cta: {
      de: 'So eine Seite für Ihren Betrieb, als kostenlose Vorschau.',
      en: 'A site like this for your business, as a free preview.',
      ru: 'Такой сайт для вашего бизнеса, бесплатным превью.'
    },
    metric: {
      de: 'Ein Tipp bis zum Anruf, von jeder Seite aus.',
      en: 'One tap to call, from every page.',
      ru: 'Один тап до звонка с любой страницы.'
    },
    gradient: 'from-sky-100 via-orange-100 to-white',
    accent: 'bg-orange-500'
  },
  {
    slug: 'alpendent',
    name: 'AlpenDent',
    year: '2026',
    location: 'Innsbruck',
    industry: {
      de: 'Zahnordination in Tirol',
      en: 'Dental clinic in Tyrol',
      ru: 'Стоматология в Тироле'
    },
    description: {
      de: 'Ein ruhiger, vertrauenswürdiger Webauftritt für eine moderne Ordination mit klarer Terminführung und verständlichen Leistungsseiten.',
      en: 'A calm, trustworthy website for a modern dental clinic with clear appointment guidance and easy-to-understand service pages.',
      ru: 'Спокойный сайт, вызывающий доверие, для современной стоматологии: понятная запись и простые страницы услуг.'
    },
    problem: {
      de: 'Die Ordination wirkte online zu austauschbar. Leistungen waren nicht schnell erfassbar, und neue Patientinnen und Patienten fanden den Weg zur Terminvereinbarung nicht klar genug.',
      en: 'The clinic looked too generic online. Services were not easy to scan, and new patients did not have a clear path to booking an appointment.',
      ru: 'Клиника выглядела в интернете слишком безлико. Услуги было трудно быстро понять, а новым пациентам не хватало понятного пути к записи.'
    },
    solution: {
      de: 'TreeTech entwickelte eine übersichtliche Struktur mit Behandlungsbereichen, Vertrauenselementen, ruhiger Bildsprache und wiederkehrenden Termin-CTAs.',
      en: 'TreeTech created a clear structure with treatment areas, trust elements, calm visuals, and recurring appointment CTAs.',
      ru: 'TreeTech сделал понятную структуру с направлениями лечения, элементами доверия, спокойными визуалами и повторяющимися кнопками записи.'
    },
    features: {
      de: ['Leistungsseiten für Behandlungen', 'Team- und Ordinationsbereich', 'Termin-CTA auf allen Kernseiten', 'FAQ für neue Patientinnen und Patienten', 'Lokale SEO-Struktur für Innsbruck'],
      en: ['Treatment service pages', 'Team and clinic section', 'Appointment CTA on key pages', 'FAQ for new patients', 'Local SEO structure for Innsbruck'],
      ru: ['Страницы услуг по видам лечения','Раздел о команде и клинике','Кнопка записи на ключевых страницах','FAQ для новых пациентов','Локальное SEO для Инсбрука']
    },
    visualStyle: {
      de: 'Helle Flächen, sanfte Mint- und Blautöne, großzügiger Weißraum und eine medizinische Typografie, die sauber, ruhig und hochwertig wirkt.',
      en: 'Bright surfaces, soft mint and blue tones, generous whitespace, and medical typography that feels clean, calm, and premium.',
      ru: 'Светлые поверхности, мягкие мятные и голубые тона, много воздуха и аккуратная типографика, которая выглядит чисто, спокойно и дорого.'
    },
    cta: {
      de: 'Mehr Vertrauen vor dem ersten Termin und ein klarer Weg zur Anfrage.',
      en: 'More trust before the first appointment and a clearer path to inquiry.',
      ru: 'Больше доверия до первого визита и понятный путь к заявке.'
    },
    metric: {
      de: 'Klarerer Weg vom ersten Besuch zur Terminvereinbarung.',
      en: 'Clearer journey from first visit to appointment request.',
      ru: 'Понятный путь от первого визита на сайт до записи.'
    },
    gradient: 'from-cyan-100 via-emerald-100 to-white',
    accent: 'bg-cyan-500'
  },
  {
    slug: 'vienna-legal',
    name: 'Vienna Legal',
    year: '2026',
    location: 'Wien',
    industry: {
      de: 'Rechtsanwaltskanzlei in Wien',
      en: 'Law firm in Vienna',
      ru: 'Адвокатская контора в Вене'
    },
    description: {
      de: 'Ein seriöser Kanzlei-Auftritt, der Fachgebiete klar erklärt, Vertrauen schafft und den Erstkontakt diskret erleichtert.',
      en: 'A composed law firm website that explains practice areas clearly, builds trust, and makes first contact discreet and simple.',
      ru: 'Сдержанный сайт адвокатской конторы: понятно объясняет направления, вызывает доверие и делает первый контакт простым и деликатным.'
    },
    problem: {
      de: 'Die Kanzlei hatte starke Spezialisierungen, aber online fehlten klare Positionierung, nachvollziehbare Fachbereiche und ein sicher wirkender Weg zur Kontaktaufnahme.',
      en: 'The firm had strong specializations, but the website lacked clear positioning, understandable practice areas, and a reassuring contact path.',
      ru: 'У конторы были сильные специализации, но сайту не хватало чёткого позиционирования, понятных направлений и спокойного пути к контакту.'
    },
    solution: {
      de: 'Wir ordneten Fachgebiete, Anwaltsporträts und Kontaktwege so, dass Mandantinnen und Mandanten rasch erkennen, ob die Kanzlei zur eigenen Situation passt.',
      en: 'We structured practice areas, attorney profiles, and contact routes so potential clients quickly understand whether the firm fits their situation.',
      ru: 'Мы выстроили направления практики, профили адвокатов и способы связи так, чтобы клиент быстро понял, подходит ли ему контора.'
    },
    features: {
      de: ['Fachgebietsseiten', 'Anwaltsporträts', 'Diskrete Kontaktführung', 'Mehrsprachige Struktur', 'Vertrauensmodule für Erstbesucher'],
      en: ['Practice area pages', 'Attorney profiles', 'Discreet contact flow', 'Multilingual structure', 'Trust modules for first-time visitors'],
      ru: ['Страницы направлений практики','Профили адвокатов','Деликатная форма связи','Многоязычная структура','Блоки доверия для новых посетителей']
    },
    visualStyle: {
      de: 'Dunkles Tintenblau, warme Goldakzente, feine Linien und eine ruhige Layoutsprache, die Kompetenz ohne Übertreibung vermittelt.',
      en: 'Deep ink blue, warm gold accents, fine lines, and a calm layout language that communicates authority without overstatement.',
      ru: 'Глубокий чернильно-синий, тёплые золотые акценты, тонкие линии и спокойная подача, которая передаёт авторитет без пафоса.'
    },
    cta: {
      de: 'Mehr Sicherheit vor dem ersten Beratungsgespräch.',
      en: 'More confidence before the first consultation.',
      ru: 'Больше уверенности до первой консультации.'
    },
    metric: {
      de: 'Schnelleres Verständnis der passenden Rechtsgebiete.',
      en: 'Faster understanding of the right legal areas.',
      ru: 'Быстрее понятно, какие правовые направления нужны.'
    },
    gradient: 'from-slate-900 via-blue-900 to-amber-200',
    accent: 'bg-amber-400'
  },
  {
    slug: 'bergblick-hotel',
    name: 'Bergblick Hotel',
    year: '2026',
    location: 'Salzkammergut',
    industry: {
      de: 'Alpines Hotel',
      en: 'Alpine hotel',
      ru: 'Альпийский отель'
    },
    description: {
      de: 'Eine atmosphärische Hotelwebsite, die Zimmer, Region und Erlebnisse emotional zeigt und Gäste konsequent zur Direktanfrage führt.',
      en: 'An atmospheric hotel website that presents rooms, region, and experiences emotionally while guiding guests toward direct inquiry.',
      ru: 'Атмосферный сайт отеля: эмоционально показывает номера, регион и впечатления и ведёт гостей к прямой заявке.'
    },
    problem: {
      de: 'Schöne Bilder waren vorhanden, aber Angebote, Zimmer und Buchungsargumente wirkten verstreut. Gäste fanden keinen klaren Weg von Inspiration zur Anfrage.',
      en: 'Beautiful imagery existed, but offers, rooms, and booking arguments felt scattered. Guests had no clear path from inspiration to inquiry.',
      ru: 'Красивые фото были, но предложения, номера и аргументы для бронирования были разбросаны. У гостей не было понятного пути от вдохновения к заявке.'
    },
    solution: {
      de: 'TreeTech baute eine emotionale Startseite, modulare Zimmerbereiche, saisonale Angebote und einen durchgängigen Anfragefluss für Direktbuchungen.',
      en: 'TreeTech built an emotional homepage, modular room sections, seasonal offers, and a consistent inquiry flow for direct bookings.',
      ru: 'TreeTech сделал эмоциональную главную, модульные блоки номеров, сезонные предложения и единый путь к прямому бронированию.'
    },
    features: {
      de: ['Zimmer- und Suite-Karten', 'Erlebnisbereiche für Sommer und Winter', 'Saisonale Angebotsflächen', 'Direktanfrage-CTA', 'Regionale SEO-Module'],
      en: ['Room and suite cards', 'Experience areas for summer and winter', 'Seasonal offer sections', 'Direct inquiry CTA', 'Regional SEO modules'],
      ru: ['Карточки номеров и люксов','Разделы впечатлений для лета и зимы','Блоки сезонных предложений','Кнопка прямой заявки','Региональные SEO-блоки']
    },
    visualStyle: {
      de: 'Alpines Grün, helle Himmelstöne, großzügige Bildflächen und magazinartige Sektionen, die Urlaubswertigkeit vermitteln.',
      en: 'Alpine green, bright sky tones, generous image areas, and magazine-like sections that communicate the value of a stay.',
      ru: 'Альпийский зелёный, светлые небесные тона, большие фото и журнальные разделы, которые передают ценность отдыха.'
    },
    cta: {
      de: 'Mehr Direktanfragen durch einen emotionalen, klaren Buchungsweg.',
      en: 'More direct inquiries through an emotional, clear booking path.',
      ru: 'Больше прямых заявок благодаря эмоциональному и понятному пути к бронированию.'
    },
    metric: {
      de: 'Stärkere Verbindung aus Urlaubslust und Buchungsabsicht.',
      en: 'Stronger connection between travel desire and booking intent.',
      ru: 'Сильнее связь между желанием поехать и намерением забронировать.'
    },
    gradient: 'from-emerald-800 via-sky-200 to-white',
    accent: 'bg-emerald-500'
  },
  {
    slug: 'greenhaus-immobilien',
    name: 'GreenHaus Immobilien',
    year: '2026',
    location: 'Graz',
    industry: {
      de: 'Immobilienagentur in Graz',
      en: 'Real estate agency in Graz',
      ru: 'Агентство недвижимости в Граце'
    },
    description: {
      de: 'Eine hochwertige Immobilienwebsite, die Objekte sauber präsentiert und Eigentümerinnen und Eigentümer zur Bewertung anfragt.',
      en: 'A premium real estate website that presents properties clearly and encourages owners to request a valuation.',
      ru: 'Премиальный сайт агентства недвижимости: понятно показывает объекты и побуждает владельцев заказать оценку.'
    },
    problem: {
      de: 'Die Agentur wollte hochwertiger wahrgenommen werden, hatte aber keine konsistente Objektpräsentation und zu wenig gezielte Anfragen von Verkäuferinnen und Verkäufern.',
      en: 'The agency wanted to be perceived as more premium, but had inconsistent property presentation and too few targeted seller inquiries.',
      ru: 'Агентство хотело выглядеть премиальнее, но объекты подавались непоследовательно, а целевых заявок от продавцов было мало.'
    },
    solution: {
      de: 'Wir entwickelten Objektkarten, Bewertungs-CTAs, Maklerprofile und Vertrauensbereiche, die Käufer und Eigentümer getrennt, aber stimmig abholen.',
      en: 'We developed listing cards, valuation CTAs, agent profiles, and trust sections that speak to buyers and owners separately but coherently.',
      ru: 'Мы сделали карточки объектов, кнопки оценки, профили агентов и блоки доверия, которые обращаются к покупателям и владельцам отдельно, но согласованно.'
    },
    features: {
      de: ['Objektübersicht', 'Immobilienbewertung als CTA', 'Maklerprofil', 'Vertrauensmodule', 'Lead-Formular für Eigentümer'],
      en: ['Listing overview', 'Property valuation CTA', 'Agent profile', 'Trust modules', 'Owner lead form'],
      ru: ['Обзор объектов','Кнопка оценки недвижимости','Профиль агента','Блоки доверия','Форма для владельцев']
    },
    visualStyle: {
      de: 'Natürliche Grüntöne, warme neutrale Flächen, präzise Kartenlayouts und eine Bildsprache, die Wertigkeit statt Lautstärke vermittelt.',
      en: 'Natural greens, warm neutral surfaces, precise card layouts, and visuals that communicate value rather than noise.',
      ru: 'Природные зелёные, тёплые нейтральные поверхности, точные карточки и визуалы, которые передают ценность, а не шум.'
    },
    cta: {
      de: 'Mehr qualifizierte Objekt- und Bewertungsanfragen.',
      en: 'More qualified listing and valuation inquiries.',
      ru: 'Больше качественных заявок на продажу и оценку.'
    },
    metric: {
      de: 'Höherwertige Wahrnehmung bei Eigentümern und Käufern.',
      en: 'More premium perception among owners and buyers.',
      ru: 'Более премиальное восприятие у владельцев и покупателей.'
    },
    gradient: 'from-lime-100 via-stone-100 to-emerald-200',
    accent: 'bg-lime-500'
  },
  {
    slug: 'kraftwerk-fitness',
    name: 'KraftWerk Fitness',
    year: '2026',
    location: 'Linz',
    industry: {
      de: 'Fitnessstudio in Linz',
      en: 'Fitness studio in Linz',
      ru: 'Фитнес-студия в Линце'
    },
    description: {
      de: 'Eine dynamische Studio-Website mit klarem Probetraining-Fokus, Kursübersicht und Angeboten für neue Mitglieder.',
      en: 'A dynamic studio website with a clear trial-session focus, class overview, and offers for new members.',
      ru: 'Динамичный сайт студии с упором на пробное занятие, обзором тренировок и предложениями для новых участников.'
    },
    problem: {
      de: 'Vor Ort hatte das Studio starke Energie, online fehlten aber klare Einstiegspunkte, eine verständliche Kursübersicht und ein motivierender Weg zum Probetraining.',
      en: 'The studio had strong energy on site, but online it lacked clear entry points, an understandable class overview, and a motivating path to a trial session.',
      ru: 'На месте у студии сильная энергия, но в интернете не хватало понятного входа, обзора тренировок и мотивирующего пути к пробному занятию.'
    },
    solution: {
      de: 'TreeTech gestaltete eine kontrastreiche Seite mit Kursmodulen, Trainerbereichen, Preisankern und einem prominenten Probetraining-Flow.',
      en: 'TreeTech designed a high-contrast site with class modules, trainer sections, membership decision points, and a prominent trial-session flow.',
      ru: 'TreeTech сделал контрастный сайт с блоками тренировок, разделом тренеров, выбором абонемента и заметной записью на пробное занятие.'
    },
    features: {
      de: ['Probetraining-CTA', 'Kursplan-Sektion', 'Trainerkarten', 'Preisanker für Mitgliedschaften', 'Mobile-first Navigation'],
      en: ['Trial session CTA', 'Class schedule section', 'Trainer cards', 'Membership decision points', 'Mobile-first navigation'],
      ru: ['Кнопка записи на пробное занятие','Расписание тренировок','Карточки тренеров','Выбор абонемента','Навигация для телефона']
    },
    visualStyle: {
      de: 'Starke Kontraste, elektrische Akzente, kompakte Module und sportliche Bewegungsflächen, ohne unseriös zu wirken.',
      en: 'Strong contrast, electric accents, compact modules, and athletic motion surfaces without feeling gimmicky.',
      ru: 'Сильный контраст, электрические акценты, компактные блоки и спортивная динамика без лишних эффектов.'
    },
    cta: {
      de: 'Mehr Probetrainings durch einen schnellen, motivierenden Einstieg.',
      en: 'More trial sessions through a fast, motivating entry point.',
      ru: 'Больше пробных занятий благодаря быстрому и мотивирующему входу.'
    },
    metric: {
      de: 'Stärkerer Fokus auf Probetraining und Mitgliedschaften.',
      en: 'Stronger focus on trial sessions and memberships.',
      ru: 'Больше внимания к пробным занятиям и абонементам.'
    },
    gradient: 'from-zinc-950 via-red-500 to-yellow-300',
    accent: 'bg-red-500'
  }
]);

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getPortfolioCaseStudy(project: PortfolioProject): PortfolioCaseStudy {
  return {
    clientName: undefined,
    industry: project.industry,
    problem: project.problem,
    solution: project.solution,
    resultMetric: project.metric,
    testimonialQuote: undefined,
    testimonialAuthor: undefined
  };
}

export function getLocalizedPath(locale: Locale, path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}
