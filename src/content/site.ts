import type {Locale} from '@/i18n/routing';

export const siteConfig = {
  name: 'TreeTech',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://treetech.at').replace(/\/$/, ''),
  email: 'office@treetech.at',
  googleSiteVerification: 'PdjQivxgyQpk4Qxzy2-3pMhBPW2pZreWQYBlrry2Gyw'
};

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

export const offers: Offer[] = [
  {
    chapter: '01',
    name: {
      de: 'AI Automation & Business Process Automation',
      en: 'AI Automation & Business Process Automation'
    },
    description: {
      de: 'AI automation Austria für Betriebe, die Anfragen, E-Mails, Dokumente und interne Aufgaben schneller bearbeiten möchten.',
      en: 'AI automation Austria for businesses that need to process inquiries, emails, documents, and internal tasks faster.'
    },
    problem: {
      de: 'Viele Schritte hängen an einzelnen Personen: kopieren, prüfen, antworten, nachfassen und Daten ins CRM übertragen.',
      en: 'Many steps depend on individual people: copying, checking, replying, following up, and moving data into the CRM.'
    },
    solution: {
      de: 'Wir bauen Automationen, AI-Assistenten und klare Workflows, die wiederkehrende Aufgaben übernehmen und Menschen nur bei Entscheidungen einbeziehen.',
      en: 'We build automations, AI assistants, and clear workflows that handle repeatable tasks and involve people only for decisions.'
    },
    result: {
      de: 'Weniger manuelle Arbeit, schnellere Reaktionszeiten und mehr Zeit für Beratung, Verkauf und Service.',
      en: 'Less manual work, faster response times, and more time for consulting, sales, and service.'
    },
    features: {
      de: ['Automatische E-Mail- und Anfrageverarbeitung', 'Rechnungs- und Dokumentengenerierung', 'CRM automation und Follow-ups', 'AI chatbot for business und interne Assistenten', 'Integration verschiedener Services'],
      en: ['Automatic email and inquiry processing', 'Invoice and document generation', 'CRM automation and follow-ups', 'AI chatbot for business and internal assistants', 'Integration of different services']
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
      de: 'Web development Austria für Unternehmen, die online verständlich erklären, Vertrauen aufbauen und mehr qualifizierte Anfragen erhalten möchten.',
      en: 'Web development Austria for companies that need to explain clearly, build trust, and receive more qualified inquiries online.'
    },
    problem: {
      de: 'Die Website sieht vielleicht ordentlich aus, bringt aber zu wenig Anfragen oder erklärt Leistungen nicht schnell genug.',
      en: 'The website may look acceptable, but it does not generate enough inquiries or explain services quickly enough.'
    },
    solution: {
      de: 'Wir strukturieren Inhalte, Nutzerwege, Formulare und website automation so, dass Besucher schneller verstehen und leichter Kontakt aufnehmen.',
      en: 'We structure content, user journeys, forms, and website automation so visitors understand faster and contact you more easily.'
    },
    result: {
      de: 'Ein professioneller Webauftritt, der Vertrauen schafft, Anfragen sauber erfasst und den Vertrieb entlastet.',
      en: 'A professional website that builds trust, captures inquiries cleanly, and supports the sales process.'
    },
    features: {
      de: ['Landingpages mit klarem Anfrageziel', 'Corporate Websites', 'Mehrseitige Websites', 'Online-Shops', 'Restaurantseiten mit Online-Reservierung', 'Individuelle Weblösungen'],
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
      de: 'Individuelle Web-Tools für Teams, die Angebote, Kunden, Aufgaben oder interne Freigaben zentral steuern möchten.',
      en: 'Custom web tools for teams that need to manage offers, customers, tasks, or internal approvals centrally.'
    },
    problem: {
      de: 'Excel, E-Mail und einzelne Tools reichen nicht mehr aus, weil Informationen verstreut sind und Aufgaben leicht liegen bleiben.',
      en: 'Spreadsheets, email, and isolated tools are no longer enough because information is scattered and tasks are easy to miss.'
    },
    solution: {
      de: 'Wir entwickeln Web-Apps, Portale und Dashboards, die bestehende Prozesse abbilden und wichtige Daten an einem Ort bündeln.',
      en: 'We develop web apps, portals, and dashboards that reflect existing processes and bring important data into one place.'
    },
    result: {
      de: 'Mehr Übersicht, weniger Rückfragen und ein System, das tägliche Arbeit nachvollziehbar macht.',
      en: 'More overview, fewer clarification loops, and a system that makes daily work easier to track.'
    },
    features: {
      de: ['CRM-Systeme', 'ERP-Systeme', 'Kundenportale', 'Interne Unternehmenssysteme', 'SaaS-Plattformen', 'Digitale Lösungen für kleine Unternehmen'],
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
      de: 'AI tools for companies, die Support, Vertrieb, Wissensabfragen und interne Entscheidungen schneller machen sollen.',
      en: 'AI tools for companies that need faster support, sales work, knowledge retrieval, and internal decisions.'
    },
    problem: {
      de: 'Wissen liegt in Dokumenten, Postfächern oder Köpfen. Kunden und Teams warten dadurch länger auf Antworten.',
      en: 'Knowledge lives in documents, inboxes, or people’s heads. Customers and teams wait longer for answers.'
    },
    solution: {
      de: 'Wir integrieren AI-Assistenten, Chatbots und Datenabfragen in bestehende Tools, mit klaren Grenzen und nachvollziehbaren Antworten.',
      en: 'We integrate AI assistants, chatbots, and data queries into existing tools, with clear limits and traceable answers.'
    },
    result: {
      de: 'Bessere Kundenerfahrung, schnellere interne Auskünfte und weniger wiederholte Erklärarbeit.',
      en: 'A better customer experience, faster internal answers, and less repeated explanation work.'
    },
    features: {
      de: ['AI-Berater für Website oder Team', 'AI-Kundensupport', 'AI-Datenanalyse', 'AI für Vertrieb und Marketing', 'AI zur Optimierung operativer Abläufe'],
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
      de: 'Workflow automation Austria für Betriebe, die Prozesse digitalisieren möchten, ohne sofort mehr Personal einzustellen.',
      en: 'Workflow automation Austria for businesses that want to digitalize processes without immediately hiring more staff.'
    },
    problem: {
      de: 'Abläufe sind gewachsen, aber nicht dokumentiert: Zuständigkeiten, Status und Daten wechseln zwischen Telefon, E-Mail und Tabellen.',
      en: 'Processes have grown over time but are not documented: responsibilities, status, and data move between phone, email, and spreadsheets.'
    },
    solution: {
      de: 'Wir analysieren Engpässe, verbinden Systeme und bauen business automation Vienna-taugliche Workflows für Alltag, CRM und interne Aufgaben.',
      en: 'We analyze bottlenecks, connect systems, and build business automation Vienna-ready workflows for daily operations, CRM, and internal tasks.'
    },
    result: {
      de: 'Zentrale Prozesse, weniger doppelte Eingaben und ein Team, das mit gleicher Besetzung mehr schafft.',
      en: 'Centralized processes, fewer duplicate entries, and a team that can handle more work with the same headcount.'
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

export const automationExamples: AutomationExample[] = [
  {
    title: {de: 'Anfragen automatisch vorqualifizieren', en: 'Automatically qualify inquiries'},
    process: {
      de: 'Website-Formulare, E-Mails oder Buchungsanfragen werden erfasst, sortiert und mit den wichtigsten Informationen ins CRM übertragen.',
      en: 'Website forms, emails, or booking requests are captured, sorted, and transferred into the CRM with the most important information.'
    },
    benefit: {
      de: 'Ihr Team reagiert schneller, verliert weniger Leads und muss Daten nicht doppelt eingeben.',
      en: 'Your team responds faster, loses fewer leads, and no longer enters the same data twice.'
    }
  },
  {
    title: {de: 'Kundenkommunikation vorbereiten', en: 'Prepare customer communication'},
    process: {
      de: 'AI erstellt Antwortentwürfe, Follow-ups, Terminbestätigungen oder Statusmeldungen passend zu Anfrage, Sprache und Kundentyp.',
      en: 'AI prepares reply drafts, follow-ups, appointment confirmations, or status updates based on inquiry, language, and customer type.'
    },
    benefit: {
      de: 'Antworten werden konsistenter und schneller, ohne dass persönliche Betreuung verloren geht.',
      en: 'Replies become faster and more consistent without losing the human service layer.'
    }
  },
  {
    title: {de: 'CRM-Prozesse automatisieren', en: 'Automate CRM processes'},
    process: {
      de: 'Leads, Aufgaben, Pipeline-Status, Erinnerungen und interne Zuständigkeiten werden automatisch aktualisiert.',
      en: 'Leads, tasks, pipeline stages, reminders, and internal responsibilities are updated automatically.'
    },
    benefit: {
      de: 'Vertrieb und Service sehen schneller, was offen ist, wer zuständig ist und welcher nächste Schritt ansteht.',
      en: 'Sales and service teams see faster what is open, who owns it, and which next step is due.'
    }
  },
  {
    title: {de: 'Support und FAQs entlasten', en: 'Reduce support and FAQ workload'},
    process: {
      de: 'Ein AI chatbot for business beantwortet häufige Fragen, sammelt Kontext und leitet komplexe Fälle an das Team weiter.',
      en: 'An AI chatbot for business answers common questions, collects context, and routes complex cases to the team.'
    },
    benefit: {
      de: 'Kunden erhalten schneller Hilfe, während Ihr Team weniger Standardfragen manuell beantwortet.',
      en: 'Customers get help faster while your team handles fewer repetitive support questions manually.'
    }
  },
  {
    title: {de: 'Interne Routineaufgaben reduzieren', en: 'Reduce internal routine tasks'},
    process: {
      de: 'Berichte, Checklisten, Dokumente, Freigaben und wiederkehrende Erinnerungen werden aus bestehenden Daten erzeugt.',
      en: 'Reports, checklists, documents, approvals, and recurring reminders are generated from existing data.'
    },
    benefit: {
      de: 'Mitarbeitende verbringen weniger Zeit mit Verwaltung und mehr Zeit mit wertschöpfender Arbeit.',
      en: 'Employees spend less time on administration and more time on work that creates value.'
    }
  },
  {
    title: {de: 'Services miteinander verbinden', en: 'Connect services together'},
    process: {
      de: 'Website, CRM, E-Mail, Kalender, Buchungssysteme, Zahlungsanbieter und interne Tools werden zu einem Workflow verbunden.',
      en: 'Website, CRM, email, calendar, booking systems, payment providers, and internal tools are connected into one workflow.'
    },
    benefit: {
      de: 'Informationen fließen automatisch durch den Betrieb, statt in einzelnen Tools stecken zu bleiben.',
      en: 'Information flows through the business automatically instead of getting stuck in separate tools.'
    }
  }
];

export const audienceItems: AudienceItem[] = [
  {
    title: {de: 'Hotels & Tourismusbetriebe', en: 'Hotels & tourism businesses'},
    description: {
      de: 'Websites, Anfrageflows und Automationen für Direktanfragen, Gästekommunikation und saisonale Angebote.',
      en: 'Websites, inquiry flows, and automations for direct inquiries, guest communication, and seasonal offers.'
    }
  },
  {
    title: {de: 'Arztpraxen & Ordinationen', en: 'Medical practices & clinics'},
    description: {
      de: 'Klare Leistungsseiten, Terminführung, FAQ-Struktur und weniger manuelle Kommunikation.',
      en: 'Clear service pages, appointment guidance, FAQ structure, and less manual communication.'
    }
  },
  {
    title: {de: 'Rechtsanwälte & Beratungen', en: 'Law firms & consultants'},
    description: {
      de: 'Seriöse Websites, strukturierte Erstkontakte und digitale Abläufe für Anfragen und Follow-ups.',
      en: 'Credible websites, structured first contact, and digital workflows for inquiries and follow-ups.'
    }
  },
  {
    title: {de: 'Immobilienunternehmen', en: 'Real estate companies'},
    description: {
      de: 'Objektanfragen, Bewertungs-CTAs, Lead-Erfassung und CRM-Verbindung für Käufer und Eigentümer.',
      en: 'Property inquiries, valuation CTAs, lead capture, and CRM connection for buyers and owners.'
    }
  },
  {
    title: {de: 'Fitnessstudios & lokale Dienstleister', en: 'Fitness studios & local service providers'},
    description: {
      de: 'Mehr Probetrainings, Buchungen oder Erstgespräche durch klare Websites und einfache Anfrageautomatisierung.',
      en: 'More trial sessions, bookings, or consultations through clear websites and simple inquiry automation.'
    }
  },
  {
    title: {de: 'KMU mit manuellen Büroprozessen', en: 'SMEs with manual office processes'},
    description: {
      de: 'Für Teams, die E-Mail, CRM, Formulare, Dokumente und wiederkehrende Aufgaben besser verbinden möchten.',
      en: 'For teams that want to connect email, CRM, forms, documents, and recurring tasks more cleanly.'
    }
  }
];

export const pricePackages: PricePackage[] = [
  {name: {de: 'Website Sprint', en: 'Website Sprint'}, price: {de: 'ab 1.500-3.000 EUR', en: 'from EUR 1,500-3,000'}, description: {de: 'Landingpage oder kleine Firmenwebsite mit klarem Angebot und Kontaktweg.', en: 'Landing page or small company website with a clear offer and contact path.'}},
  {name: {de: 'Business Website', en: 'Business Website'}, price: {de: 'ab 3.000-6.000 EUR', en: 'from EUR 3,000-6,000'}, description: {de: 'Mehrseitige Website mit Anfrageführung, SEO-Grundlagen und Formularlogik.', en: 'Multi-page website with inquiry guidance, SEO basics, and form logic.'}},
  {name: {de: 'Automation Sprint', en: 'Automation Sprint'}, price: {de: 'ab 900-2.500 EUR', en: 'from EUR 900-2,500'}, description: {de: 'Ein konkreter Prozess automatisiert: Anfrage, CRM, E-Mail oder Dokument.', en: 'One concrete process automated: inquiry, CRM, email, or document.'}},
  {name: {de: 'Custom Web App', en: 'Custom Web App'}, price: {de: 'nach Aufwand', en: 'custom estimate'}, description: {de: 'CRM, Portal oder internes Tool für gewachsene Abläufe.', en: 'CRM, portal, or internal tool for established workflows.'}}
];

export const faqItems: FaqItem[] = [
  {question: {de: 'Was kostet eine Website?', en: 'What does a website cost?'}, answer: {de: 'Kleine Websites starten meist bei 1.500-3.000 EUR. Mehrseitige Business Websites liegen häufig bei 3.000-6.000 EUR.', en: 'Small websites usually start at EUR 1,500-3,000. Multi-page business websites often sit around EUR 3,000-6,000.'}},
  {question: {de: 'Wie lange dauert ein Projekt?', en: 'How long does a project take?'}, answer: {de: 'Kleine Websites oder Automatisierungen dauern oft wenige Wochen. Größere Systeme werden in Etappen umgesetzt.', en: 'Small websites or automations often take a few weeks. Larger systems are built in phases.'}},
  {question: {de: 'Können bestehende Websites verbessert werden?', en: 'Can existing websites be improved?'}, answer: {de: 'Ja. Struktur, Texte, Anfrageführung und CRM-Anbindung können oft ohne kompletten Neustart verbessert werden.', en: 'Yes. Structure, copy, inquiry guidance, and CRM connection can often be improved without a full rebuild.'}},
  {question: {de: 'Können wir klein starten?', en: 'Can we start small?'}, answer: {de: 'Ja. Website Sprint und Automation Sprint sind für einen klar begrenzten Einstieg gedacht.', en: 'Yes. Website Sprint and Automation Sprint are designed for a clearly limited first step.'}},
  {question: {de: 'Arbeitet TreeTech mit bestehenden Tools?', en: 'Does TreeTech work with existing tools?'}, answer: {de: 'Ja. Wenn möglich verbinden wir bestehende Website, Formulare, E-Mail, CRM und Kalender.', en: 'Yes. Where possible, we connect existing website, forms, email, CRM, and calendar.'}},
  {question: {de: 'Ist AI-Automation DSGVO-konform?', en: 'Is AI automation GDPR-compliant?'}, answer: {de: 'Das hängt vom Prozess ab. TreeTech plant AI-Flows DSGVO-bewusst mit Datenminimierung und menschlicher Kontrolle.', en: 'It depends on the process. TreeTech plans AI flows with GDPR awareness, data minimization, and human review.'}}
];

export const siteContent = {
  de: {
    metadata: {
      homeTitle: 'TreeTech | AI automation Austria, Webentwicklung und CRM Integration',
      homeDescription:
        'TreeTech baut AI-Automatisierungen, Websites, CRM-Integrationen und Workflow Automation für kleine und mittlere Unternehmen in Österreich.',
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
      primaryCta: 'Kostenlose Ersteinschätzung anfragen',
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
      heroTitle: 'Websites, AI-Automation und interne Tools für österreichische Betriebe.',
      heroLead:
        'Wir bauen Websites, CRM-Flows, AI-Assistenten und Automationen für Hotels, Ordinationen, Kanzleien, Dienstleister und lokale Betriebe in Österreich, die mehr Anfragen bekommen und manuelle Arbeit reduzieren wollen.',
      heroBadge: 'Kostenlose Ersteinschätzung',
      heroTrust: [
        'AI automation Austria für wiederkehrende Aufgaben',
        'Web development Austria mit klarer Anfrageführung',
        'CRM Integration, AI-Assistenten und Workflow Automation'
      ],
      proofTitle: 'Für Betriebe, die weniger manuell arbeiten und digital professioneller verkaufen möchten.',
      proofCopy:
        'Wir denken nicht nur in schönen Screens. Jede Lösung bekommt einen Zweck: schneller reagieren, Prozesse entlasten, Kundinnen und Kunden besser führen und Daten sauberer nutzen.',
      servicesTitle: 'Was wir bauen.',
      servicesLead:
        'Von business automation Vienna bis Custom Web Applications: TreeTech baut digitale Systeme, die im Alltag eines Unternehmens wirklich verwendet werden.',
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
      title: 'Beispiel-Websites für echte Branchen in Österreich.',
      lead:
        'Öffnen Sie ein Projekt und sehen Sie, wie Struktur, Texte, Design und Demo-Seite für ähnliche Betriebe aussehen können.',
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
      homeTitle: 'TreeTech | AI automation Austria, web development, and CRM integration',
      homeDescription:
        'TreeTech builds AI automations, websites, CRM integrations, and workflow automation for small and medium-sized businesses in Austria.',
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
      primaryCta: 'Request a free first assessment',
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
      heroTitle: 'Websites, AI automation, and internal tools for Austrian businesses.',
      heroLead:
        'We build websites, CRM flows, AI assistants, and automations for hotels, clinics, law firms, service providers, and local businesses in Austria that want more inquiries and less manual work.',
      heroBadge: 'Free first assessment',
      heroTrust: [
        'AI automation Austria for recurring work',
        'Web development Austria with clear inquiry flows',
        'CRM Integration, AI assistants, and Workflow Automation'
      ],
      proofTitle: 'For businesses that want less manual work and a more professional digital sales flow.',
      proofCopy:
        'We do not think only in good-looking screens. Every solution has a purpose: respond faster, remove process friction, guide customers better, and use data more cleanly.',
      servicesTitle: 'What we build.',
      servicesLead:
        'From business automation Vienna to custom web applications: TreeTech builds digital systems that companies actually use in daily operations.',
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
      title: 'Example websites for real Austrian industries.',
      lead:
        'Open any project to see the structure, copy direction, visual style, and demo website we could build for similar businesses.',
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
