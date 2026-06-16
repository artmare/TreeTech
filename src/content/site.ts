import type {Locale} from '@/i18n/routing';

export const siteConfig = {
  name: 'TreeTech',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://treetech.at',
  email: 'karnaukhovartem02@gmail.com',
  googleSiteVerification: 't71POC8XUpAOQfOQ7hv6y83UIMxijMKSZ_KSlEO3MPM'
};

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

type Offer = {
  chapter: string;
  name: LocalizedText;
  description: LocalizedText;
  features: LocalizedList;
  highlighted?: boolean;
};

type ProcessStep = {
  title: LocalizedText;
  description: LocalizedText;
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

export const offers: Offer[] = [
  {
    chapter: '01',
    name: {
      de: 'AI Automation & Business Process Automation',
      en: 'AI Automation & Business Process Automation'
    },
    description: {
      de: 'Wir automatisieren wiederkehrende Abläufe mit künstlicher Intelligenz, damit Teams weniger manuell abarbeiten und schneller reagieren können.',
      en: 'We automate recurring business processes with AI so teams spend less time on manual work and react faster.'
    },
    features: {
      de: ['Automatische E-Mail-Verarbeitung', 'Rechnungs- und Dokumentengenerierung', 'CRM-Automatisierung', 'Chatbots und AI-Assistenten', 'Integration verschiedener Services'],
      en: ['Automatic email processing', 'Invoice and document generation', 'CRM automation', 'Chatbots and AI assistants', 'Integration of different services']
    },
    highlighted: true
  },
  {
    chapter: '02',
    name: {
      de: 'Web Development',
      en: 'Web Development'
    },
    description: {
      de: 'Wir entwickeln Websites, die seriös wirken, sauber performen und Besucher klar zu Anfrage, Buchung oder Kauf führen.',
      en: 'We develop websites that feel credible, perform cleanly, and guide visitors toward inquiry, booking, or purchase.'
    },
    features: {
      de: ['Landingpages', 'Corporate Websites', 'Mehrseitige Websites', 'Online-Shops', 'Restaurantseiten mit Online-Reservierung', 'Individuelle Weblösungen'],
      en: ['Landing pages', 'Corporate websites', 'Multi-page websites', 'Online shops', 'Restaurant websites with online booking', 'Custom web solutions']
    }
  },
  {
    chapter: '03',
    name: {
      de: 'Custom Web Applications',
      en: 'Custom Web Applications'
    },
    description: {
      de: 'Wir bauen Web-Software, die echte operative Arbeit abbildet: übersichtlich, sicher und passend zu bestehenden Prozessen.',
      en: 'We build web software for real operational work: clear, secure, and shaped around existing business processes.'
    },
    features: {
      de: ['CRM-Systeme', 'ERP-Systeme', 'Kundenportale', 'Interne Unternehmenssysteme', 'SaaS-Plattformen', 'Individuelle Business-Tools'],
      en: ['CRM systems', 'ERP systems', 'Customer portals', 'Internal company systems', 'SaaS platforms', 'Custom business tools']
    }
  },
  {
    chapter: '04',
    name: {
      de: 'AI Integration for Business',
      en: 'AI Integration for Business'
    },
    description: {
      de: 'Wir integrieren AI dort, wo sie im Alltag wirklich Nutzen bringt: Beratung, Support, Datenanalyse, Vertrieb und operative Entscheidungen.',
      en: 'We integrate AI where it creates real daily value: consulting, support, data analysis, sales, marketing, and operations.'
    },
    features: {
      de: ['AI-Berater', 'AI-Kundensupport', 'AI-Datenanalyse', 'AI für Vertrieb und Marketing', 'AI zur Optimierung operativer Abläufe'],
      en: ['AI consultants', 'AI customer support', 'AI data analysis', 'AI for sales and marketing', 'AI for operational optimization']
    }
  },
  {
    chapter: '05',
    name: {
      de: 'Business Digitalization & Workflow Optimization',
      en: 'Business Digitalization & Workflow Optimization'
    },
    description: {
      de: 'Wir übersetzen analoge und unklare Prozesse in digitale Workflows, die nachvollziehbar, messbar und für Teams leichter steuerbar sind.',
      en: 'We turn analog and unclear processes into digital workflows that are easier to manage, measure, and scale.'
    },
    features: {
      de: ['Prozesse digitalisieren', 'Manuelle Arbeit reduzieren', 'Team-Effizienz erhöhen', 'CRM, ERP und andere Systeme verbinden', 'Workflows sauber dokumentieren'],
      en: ['Digitalize processes', 'Reduce manual work', 'Improve team efficiency', 'Connect CRM, ERP, and other systems', 'Document workflows clearly']
    }
  }
];

export const processSteps: ProcessStep[] = [
  {
    title: {
      de: '1. Analyse',
      en: '1. Audit'
    },
    description: {
      de: 'Wir verstehen Abläufe, Tools, manuelle Arbeit, Zielgruppen und die Stellen, an denen Automatisierung wirklich Sinn macht.',
      en: 'We understand workflows, tools, manual work, audiences, and the places where automation actually makes sense.'
    }
  },
  {
    title: {
      de: '2. Systemplan',
      en: '2. System plan'
    },
    description: {
      de: 'Aus Anforderungen, Datenflüssen und Interface-Ideen entsteht ein klarer Plan für Website, App, AI-Flow oder Integration.',
      en: 'Requirements, data flows, and interface ideas become a clear plan for the website, app, AI flow, or integration.'
    }
  },
  {
    title: {
      de: '3. Umsetzung',
      en: '3. Build'
    },
    description: {
      de: 'Wir entwickeln responsiv, performant und so, dass Inhalte, Automationen und Schnittstellen nachvollziehbar wartbar bleiben.',
      en: 'We build responsively and performantly, keeping content, automations, and integrations maintainable.'
    }
  },
  {
    title: {
      de: '4. Launch',
      en: '4. Launch'
    },
    description: {
      de: 'Vor dem Go-live prüfen wir Formulare, Daten, Schnittstellen, Berechtigungen, Metadaten und die wichtigsten Nutzerwege.',
      en: 'Before launch, we check forms, data, integrations, permissions, metadata, and the most important user journeys.'
    }
  }
];

export const siteContent = {
  de: {
    metadata: {
      homeTitle: 'TreeTech | AI-Automation, Webentwicklung und Business-Software',
      homeDescription:
        'TreeTech baut AI-Automatisierungen, Websites, Web-Apps und digitale Workflows für österreichische Unternehmen.',
      aboutTitle: 'Über TreeTech | Digitalstudio für österreichische Betriebe',
      aboutDescription:
        'TreeTech ist ein modernes Digitalstudio für Betriebe, die Prozesse automatisieren, Web-Software bauen und digital besser arbeiten möchten.',
      servicesTitle: 'Leistungen | TreeTech',
      servicesDescription:
        'AI-Automation, Webentwicklung, Custom Web Applications, AI-Integration und Workflow-Optimierung für österreichische Unternehmen.',
      portfolioTitle: 'Portfolio | TreeTech Webstudio',
      portfolioDescription:
        'Beispielprojekte für österreichische Branchen: Ordination, Kanzlei, Hotel, Immobilien und Fitnessstudio.',
      contactTitle: 'Kontakt | TreeTech',
      contactDescription:
        'Starten Sie Ihr Digitalprojekt mit TreeTech. Wir melden uns mit einer klaren Einschätzung und einem passenden nächsten Schritt.'
    },
    common: {
      eyebrow: 'AI · Web · Automatisierung',
      primaryCta: 'Projekt anfragen',
      secondaryCta: 'Referenzen ansehen',
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
      heroTitle: 'AI-Automation, Websites und Business-Software für Unternehmen, die schneller arbeiten wollen.',
      heroLead:
        'TreeTech verbindet Webentwicklung, künstliche Intelligenz und Prozessverständnis. Wir bauen digitale Systeme, die Anfragen bringen, Arbeit reduzieren und bestehende Tools sauber verbinden.',
      heroBadge: '> booting TreeTech systems',
      heroTrust: [
        'AI-Automation für wiederkehrende Aufgaben',
        'Websites und Web-Apps mit klarer Business-Logik',
        'CRM-, ERP- und Service-Integrationen'
      ],
      metricOne: '5 Bereiche',
      metricOneLabel: 'AI, Web, Apps, Integration, Workflows',
      metricTwo: 'DE/EN',
      metricTwoLabel: 'mehrsprachig gedacht',
      metricThree: 'B2B',
      metricThreeLabel: 'für österreichische Betriebe',
      proofTitle: 'Für Betriebe, die weniger manuell arbeiten und digital professioneller verkaufen möchten.',
      proofCopy:
        'Wir denken nicht nur in schönen Screens. Jede Lösung bekommt einen Zweck: schneller reagieren, Prozesse entlasten, Kundinnen und Kunden besser führen und Daten sauberer nutzen.',
      servicesTitle: 'Was wir bauen.',
      servicesLead:
        'Von AI-Automation bis Custom Web Applications: TreeTech baut digitale Systeme, die im Alltag eines Unternehmens wirklich verwendet werden.',
      portfolioTitle: 'Demo-Cases, die wie echte Kundengewinne wirken.',
      portfolioLead:
        'Fünf realistische Branchen-Cases zeigen, wie ein professioneller Auftritt für österreichische Unternehmen wirken kann.',
      processTitle: 'Ein Prozess wie ein sauberer System-Launch.',
      processLead:
        'Wir starten mit Abläufen, Zielen und Daten. Danach entstehen Struktur, Interface, Automatisierung und Launch in klaren Schritten.'
    },
    about: {
      title: 'Ein schlankes Digitalstudio für Automatisierung, Web und Business-Software.',
      lead:
        'TreeTech unterstützt österreichische Unternehmen dabei, digitale Abläufe zu bauen, AI sinnvoll einzusetzen und Websysteme zu entwickeln, die im Alltag wirklich helfen.',
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
        'Eine Zusammenarbeit ohne Fachchinesisch: klare Entscheidungen, ehrliche Einschätzungen und ein System, das zu Ihrem Betrieb, Ihren Tools und Ihrem Team passt.'
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
      title: 'Digitale Auftritte für Branchen, die Vertrauen verkaufen.',
      lead:
        'Die Beispielprojekte zeigen, wie TreeTech unterschiedliche österreichische Branchen positioniert: klar, hochwertig und auf Anfragen ausgerichtet.',
      detailIntro: 'Projektüberblick',
      problem: 'Ausgangslage',
      solution: 'Lösung',
      features: 'Umfang',
      visualStyle: 'Visuelle Richtung',
      result: 'Wirkung',
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
      responseTime: 'Antwort in der Regel innerhalb eines Werktags.',
      formTitle: 'Projektanfrage'
    }
  },
  en: {
    metadata: {
      homeTitle: 'TreeTech | AI automation, web development, and business software',
      homeDescription:
        'TreeTech builds AI automations, websites, web apps, and digital workflows for Austrian businesses.',
      aboutTitle: 'About TreeTech | Digital studio for Austrian businesses',
      aboutDescription:
        'TreeTech is a modern digital studio for businesses that want to automate processes, build web software, and work better digitally.',
      servicesTitle: 'Services | TreeTech',
      servicesDescription:
        'AI automation, web development, custom web applications, AI integration, and workflow optimization for Austrian businesses.',
      portfolioTitle: 'Portfolio | TreeTech web studio',
      portfolioDescription:
        'Sample projects for Austrian industries: dental clinic, law firm, hotel, real estate, and fitness studio.',
      contactTitle: 'Contact | TreeTech',
      contactDescription:
        'Start your digital project with TreeTech. We will reply with a clear assessment and the right next step.'
    },
    common: {
      eyebrow: 'AI · Web · Automation',
      primaryCta: 'Request a project',
      secondaryCta: 'View work',
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
      heroTitle: 'AI automation, websites, and business software for companies that want to move faster.',
      heroLead:
        'TreeTech combines web development, artificial intelligence, and process thinking. We build digital systems that generate inquiries, reduce manual work, and connect existing tools cleanly.',
      heroBadge: '> booting TreeTech systems',
      heroTrust: [
        'AI automation for recurring work',
        'Websites and web apps with clear business logic',
        'CRM, ERP, and service integrations'
      ],
      metricOne: '5 areas',
      metricOneLabel: 'AI, web, apps, integration, workflows',
      metricTwo: 'DE/EN',
      metricTwoLabel: 'multilingual by design',
      metricThree: 'B2B',
      metricThreeLabel: 'for Austrian businesses',
      proofTitle: 'For businesses that want less manual work and a more professional digital sales flow.',
      proofCopy:
        'We do not think only in good-looking screens. Every solution has a purpose: respond faster, remove process friction, guide customers better, and use data more cleanly.',
      servicesTitle: 'What we build.',
      servicesLead:
        'From AI automation to custom web applications: TreeTech builds digital systems that companies actually use in daily operations.',
      portfolioTitle: 'Demo cases that feel like real client wins.',
      portfolioLead:
        'Five realistic industry cases show how a professional website can work for Austrian businesses.',
      processTitle: 'A process shaped like a clean system launch.',
      processLead:
        'We start with workflows, goals, and data. Then structure, interface, automation, and launch follow in clear steps.'
    },
    about: {
      title: 'A lean digital studio for automation, web, and business software.',
      lead:
        'TreeTech helps Austrian businesses build digital workflows, use AI sensibly, and develop web systems that are useful in daily operations.',
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
        'A collaboration without jargon: clear decisions, honest recommendations, and a system that fits your business, tools, and team.'
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
      title: 'Digital presences for industries where trust matters.',
      lead:
        'These sample projects show how TreeTech positions different Austrian industries: clearly, professionally, and with inquiries in mind.',
      detailIntro: 'Project overview',
      problem: 'Starting point',
      solution: 'Solution',
      features: 'Scope',
      visualStyle: 'Visual direction',
      result: 'Impact',
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
      responseTime: 'Replies usually within one business day.',
      formTitle: 'Project inquiry'
    }
  }
} satisfies Record<Locale, Record<string, unknown>>;

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'alpendent',
    name: 'AlpenDent',
    year: '2026',
    location: 'Innsbruck',
    industry: {
      de: 'Zahnordination in Tirol',
      en: 'Dental clinic in Tyrol'
    },
    description: {
      de: 'Ein ruhiger, vertrauenswürdiger Webauftritt für eine moderne Ordination mit klarer Terminführung und verständlichen Leistungsseiten.',
      en: 'A calm, trustworthy website for a modern dental clinic with clear appointment guidance and easy-to-understand service pages.'
    },
    problem: {
      de: 'Die Ordination wirkte online zu austauschbar. Leistungen waren nicht schnell erfassbar, und neue Patientinnen und Patienten fanden den Weg zur Terminvereinbarung nicht klar genug.',
      en: 'The clinic looked too generic online. Services were not easy to scan, and new patients did not have a clear path to booking an appointment.'
    },
    solution: {
      de: 'TreeTech entwickelte eine übersichtliche Struktur mit Behandlungsbereichen, Vertrauenselementen, ruhiger Bildsprache und wiederkehrenden Termin-CTAs.',
      en: 'TreeTech created a clear structure with treatment areas, trust elements, calm visuals, and recurring appointment CTAs.'
    },
    features: {
      de: ['Leistungsseiten für Behandlungen', 'Team- und Ordinationsbereich', 'Termin-CTA auf allen Kernseiten', 'FAQ für neue Patientinnen und Patienten', 'Lokale SEO-Struktur für Innsbruck'],
      en: ['Treatment service pages', 'Team and clinic section', 'Appointment CTA on key pages', 'FAQ for new patients', 'Local SEO structure for Innsbruck']
    },
    visualStyle: {
      de: 'Helle Flächen, sanfte Mint- und Blautöne, großzügiger Weißraum und eine medizinische Typografie, die sauber, ruhig und hochwertig wirkt.',
      en: 'Bright surfaces, soft mint and blue tones, generous whitespace, and medical typography that feels clean, calm, and premium.'
    },
    cta: {
      de: 'Mehr Vertrauen vor dem ersten Termin und ein klarer Weg zur Anfrage.',
      en: 'More trust before the first appointment and a clearer path to inquiry.'
    },
    metric: {
      de: 'Klarerer Weg vom ersten Besuch zur Terminvereinbarung.',
      en: 'Clearer journey from first visit to appointment request.'
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
      en: 'Law firm in Vienna'
    },
    description: {
      de: 'Ein seriöser Kanzlei-Auftritt, der Fachgebiete klar erklärt, Vertrauen schafft und den Erstkontakt diskret erleichtert.',
      en: 'A composed law firm website that explains practice areas clearly, builds trust, and makes first contact discreet and simple.'
    },
    problem: {
      de: 'Die Kanzlei hatte starke Spezialisierungen, aber online fehlten klare Positionierung, nachvollziehbare Fachbereiche und ein sicher wirkender Weg zur Kontaktaufnahme.',
      en: 'The firm had strong specializations, but the website lacked clear positioning, understandable practice areas, and a reassuring contact path.'
    },
    solution: {
      de: 'Wir ordneten Fachgebiete, Anwaltsporträts und Kontaktwege so, dass Mandantinnen und Mandanten rasch erkennen, ob die Kanzlei zur eigenen Situation passt.',
      en: 'We structured practice areas, attorney profiles, and contact routes so potential clients quickly understand whether the firm fits their situation.'
    },
    features: {
      de: ['Fachgebietsseiten', 'Anwaltsporträts', 'Diskrete Kontaktführung', 'Mehrsprachige Struktur', 'Vertrauensmodule für Erstbesucher'],
      en: ['Practice area pages', 'Attorney profiles', 'Discreet contact flow', 'Multilingual structure', 'Trust modules for first-time visitors']
    },
    visualStyle: {
      de: 'Dunkles Tintenblau, warme Goldakzente, feine Linien und eine ruhige Layoutsprache, die Kompetenz ohne Übertreibung vermittelt.',
      en: 'Deep ink blue, warm gold accents, fine lines, and a calm layout language that communicates authority without overstatement.'
    },
    cta: {
      de: 'Mehr Sicherheit vor dem ersten Beratungsgespräch.',
      en: 'More confidence before the first consultation.'
    },
    metric: {
      de: 'Schnelleres Verständnis der passenden Rechtsgebiete.',
      en: 'Faster understanding of the right legal areas.'
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
      en: 'Alpine hotel'
    },
    description: {
      de: 'Eine atmosphärische Hotelwebsite, die Zimmer, Region und Erlebnisse emotional zeigt und Gäste konsequent zur Direktanfrage führt.',
      en: 'An atmospheric hotel website that presents rooms, region, and experiences emotionally while guiding guests toward direct inquiry.'
    },
    problem: {
      de: 'Schöne Bilder waren vorhanden, aber Angebote, Zimmer und Buchungsargumente wirkten verstreut. Gäste fanden keinen klaren Weg von Inspiration zur Anfrage.',
      en: 'Beautiful imagery existed, but offers, rooms, and booking arguments felt scattered. Guests had no clear path from inspiration to inquiry.'
    },
    solution: {
      de: 'TreeTech baute eine emotionale Startseite, modulare Zimmerbereiche, saisonale Angebote und einen durchgängigen Anfragefluss für Direktbuchungen.',
      en: 'TreeTech built an emotional homepage, modular room sections, seasonal offers, and a consistent inquiry flow for direct bookings.'
    },
    features: {
      de: ['Zimmer- und Suite-Karten', 'Erlebnisbereiche für Sommer und Winter', 'Saisonale Angebotsflächen', 'Direktanfrage-CTA', 'Regionale SEO-Module'],
      en: ['Room and suite cards', 'Experience areas for summer and winter', 'Seasonal offer sections', 'Direct inquiry CTA', 'Regional SEO modules']
    },
    visualStyle: {
      de: 'Alpines Grün, helle Himmelstöne, großzügige Bildflächen und magazinartige Sektionen, die Urlaubswertigkeit vermitteln.',
      en: 'Alpine green, bright sky tones, generous image areas, and magazine-like sections that communicate the value of a stay.'
    },
    cta: {
      de: 'Mehr Direktanfragen durch einen emotionalen, klaren Buchungsweg.',
      en: 'More direct inquiries through an emotional, clear booking path.'
    },
    metric: {
      de: 'Stärkere Verbindung aus Urlaubslust und Buchungsabsicht.',
      en: 'Stronger connection between travel desire and booking intent.'
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
      en: 'Real estate agency in Graz'
    },
    description: {
      de: 'Eine hochwertige Immobilienwebsite, die Objekte sauber präsentiert und Eigentümerinnen und Eigentümer zur Bewertung anfragt.',
      en: 'A premium real estate website that presents properties clearly and encourages owners to request a valuation.'
    },
    problem: {
      de: 'Die Agentur wollte hochwertiger wahrgenommen werden, hatte aber keine konsistente Objektpräsentation und zu wenig gezielte Anfragen von Verkäuferinnen und Verkäufern.',
      en: 'The agency wanted to be perceived as more premium, but had inconsistent property presentation and too few targeted seller inquiries.'
    },
    solution: {
      de: 'Wir entwickelten Objektkarten, Bewertungs-CTAs, Maklerprofile und Vertrauensbereiche, die Käufer und Eigentümer getrennt, aber stimmig abholen.',
      en: 'We developed listing cards, valuation CTAs, agent profiles, and trust sections that speak to buyers and owners separately but coherently.'
    },
    features: {
      de: ['Objektübersicht', 'Immobilienbewertung als CTA', 'Maklerprofil', 'Vertrauensmodule', 'Lead-Formular für Eigentümer'],
      en: ['Listing overview', 'Property valuation CTA', 'Agent profile', 'Trust modules', 'Owner lead form']
    },
    visualStyle: {
      de: 'Natürliche Grüntöne, warme neutrale Flächen, präzise Kartenlayouts und eine Bildsprache, die Wertigkeit statt Lautstärke vermittelt.',
      en: 'Natural greens, warm neutral surfaces, precise card layouts, and visuals that communicate value rather than noise.'
    },
    cta: {
      de: 'Mehr qualifizierte Objekt- und Bewertungsanfragen.',
      en: 'More qualified listing and valuation inquiries.'
    },
    metric: {
      de: 'Höherwertige Wahrnehmung bei Eigentümern und Käufern.',
      en: 'More premium perception among owners and buyers.'
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
      en: 'Fitness studio in Linz'
    },
    description: {
      de: 'Eine dynamische Studio-Website mit klarem Probetraining-Fokus, Kursübersicht und Angeboten für neue Mitglieder.',
      en: 'A dynamic studio website with a clear trial-session focus, class overview, and offers for new members.'
    },
    problem: {
      de: 'Vor Ort hatte das Studio starke Energie, online fehlten aber klare Einstiegspunkte, eine verständliche Kursübersicht und ein motivierender Weg zum Probetraining.',
      en: 'The studio had strong energy on site, but online it lacked clear entry points, an understandable class overview, and a motivating path to a trial session.'
    },
    solution: {
      de: 'TreeTech gestaltete eine kontrastreiche Seite mit Kursmodulen, Trainerbereichen, Preisankern und einem prominenten Probetraining-Flow.',
      en: 'TreeTech designed a high-contrast site with class modules, trainer sections, membership decision points, and a prominent trial-session flow.'
    },
    features: {
      de: ['Probetraining-CTA', 'Kursplan-Sektion', 'Trainerkarten', 'Preisanker für Mitgliedschaften', 'Mobile-first Navigation'],
      en: ['Trial session CTA', 'Class schedule section', 'Trainer cards', 'Membership decision points', 'Mobile-first navigation']
    },
    visualStyle: {
      de: 'Starke Kontraste, elektrische Akzente, kompakte Module und sportliche Bewegungsflächen, ohne unseriös zu wirken.',
      en: 'Strong contrast, electric accents, compact modules, and athletic motion surfaces without feeling gimmicky.'
    },
    cta: {
      de: 'Mehr Probetrainings durch einen schnellen, motivierenden Einstieg.',
      en: 'More trial sessions through a fast, motivating entry point.'
    },
    metric: {
      de: 'Stärkerer Fokus auf Probetraining und Mitgliedschaften.',
      en: 'Stronger focus on trial sessions and memberships.'
    },
    gradient: 'from-zinc-950 via-red-500 to-yellow-300',
    accent: 'bg-red-500'
  }
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getLocalizedPath(locale: Locale, path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}
