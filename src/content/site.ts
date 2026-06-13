import type {Locale} from '@/i18n/routing';

export const siteConfig = {
  name: 'TreeTech',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://treetech.at',
  email: 'hello@treetech.at'
};

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

type Offer = {
  name: LocalizedText;
  price: string;
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
    name: {
      de: 'Landing Page',
      en: 'Landing page'
    },
    price: '299€',
    description: {
      de: 'Eine fokussierte Seite für ein Angebot, eine Aktion oder einen neuen Standort. Ideal, wenn schnell ein professioneller Auftritt online gehen soll.',
      en: 'A focused page for an offer, campaign, or new location. Ideal when a professional presence needs to go live quickly.'
    },
    features: {
      de: ['Klarer Seitenaufbau', 'Mobile Umsetzung', 'Kontakt-CTA', 'SEO-Grundlagen'],
      en: ['Clear page structure', 'Mobile implementation', 'Contact CTA', 'SEO essentials']
    }
  },
  {
    name: {
      de: 'Website',
      en: 'Website'
    },
    price: '499€',
    description: {
      de: 'Ein kompakter Webauftritt für Betriebe, Ordinationen und Dienstleister, die online seriös auftreten und mehr Anfragen erhalten möchten.',
      en: 'A compact website for companies, clinics, and service providers that need a credible online presence and more inquiries.'
    },
    features: {
      de: ['Bis zu 5 Seiten', 'Struktur für zwei Sprachen', 'Performance-Basis', 'Saubere Inhaltsführung'],
      en: ['Up to 5 pages', 'Two-language structure', 'Performance foundation', 'Clean content flow']
    },
    highlighted: true
  },
  {
    name: {
      de: 'Business Website',
      en: 'Business website'
    },
    price: '799€',
    description: {
      de: 'Ein hochwertiger Auftritt für Unternehmen mit mehreren Leistungen, Referenzen, Formularen und klarer Verkaufslogik.',
      en: 'A premium presence for businesses with multiple services, references, forms, and a clear conversion strategy.'
    },
    features: {
      de: ['Individuelle Sektionen', 'SEO-Metadaten', 'Kontaktformular', 'Launch-Begleitung'],
      en: ['Custom sections', 'SEO metadata', 'Contact form', 'Launch support']
    }
  }
];

export const processSteps: ProcessStep[] = [
  {
    title: {
      de: '1. Klarheit',
      en: '1. Clarity'
    },
    description: {
      de: 'Wir klären Angebot, Zielgruppe, Standortbezug und die wichtigste Anfrage auf der Website.',
      en: 'We clarify the offer, audience, local context, and the most important inquiry path.'
    }
  },
  {
    title: {
      de: '2. Konzept',
      en: '2. Concept'
    },
    description: {
      de: 'Aus Struktur, Text und visueller Richtung entsteht ein stimmiger Entwurf mit klarem roten Faden.',
      en: 'Structure, copy, and visual direction become a coherent concept with a clear narrative.'
    }
  },
  {
    title: {
      de: '3. Umsetzung',
      en: '3. Build'
    },
    description: {
      de: 'Wir entwickeln responsiv, schnell und so, dass Inhalte später nachvollziehbar gepflegt werden können.',
      en: 'We build responsively, quickly, and in a way that keeps content maintainable after launch.'
    }
  },
  {
    title: {
      de: '4. Launch',
      en: '4. Launch'
    },
    description: {
      de: 'Vor dem Go-live prüfen wir Darstellung, Formulare, Metadaten und die wichtigsten Nutzerwege.',
      en: 'Before launch, we check rendering, forms, metadata, and the most important user journeys.'
    }
  }
];

export const siteContent = {
  de: {
    metadata: {
      homeTitle: 'TreeTech | Premium Websites für österreichische Unternehmen',
      homeDescription:
        'TreeTech erstellt moderne, mehrsprachige Websites und Landing Pages für Betriebe in Österreich. Klare Pakete ab 299€.',
      aboutTitle: 'Über TreeTech | Webstudio für Österreich',
      aboutDescription:
        'TreeTech ist ein modernes Webstudio für österreichische Betriebe, die online seriös auftreten und mehr qualifizierte Anfragen erhalten möchten.',
      servicesTitle: 'Leistungen & Preise | TreeTech',
      servicesDescription:
        'Landing Pages ab 299€, Websites ab 499€ und Business Websites ab 799€ für Betriebe, Ordinationen, Kanzleien und Dienstleister in Österreich.',
      portfolioTitle: 'Portfolio | TreeTech Webstudio',
      portfolioDescription:
        'Beispielprojekte für österreichische Branchen: Ordination, Kanzlei, Hotel, Immobilien und Fitnessstudio.',
      contactTitle: 'Kontakt | TreeTech',
      contactDescription:
        'Starten Sie Ihr Website-Projekt mit TreeTech. Wir melden uns mit einer klaren Einschätzung und einem passenden nächsten Schritt.'
    },
    common: {
      eyebrow: 'Webstudio für Österreich',
      primaryCta: 'Projekt anfragen',
      secondaryCta: 'Referenzen ansehen',
      viewProject: 'Case ansehen',
      startProject: 'Website starten',
      learnMore: 'Mehr erfahren',
      requestPackage: 'Paket anfragen',
      recommended: 'Beliebt',
      from: 'ab',
      included: 'Enthalten',
      backToPortfolio: 'Zurück zum Portfolio',
      nextStep: 'Nächster Schritt'
    },
    home: {
      heroTitle: 'Websites, die österreichische Unternehmen seriös verkaufen.',
      heroLead:
        'TreeTech entwickelt klare, schnelle und mehrsprachige Webauftritte für Betriebe in Österreich. Damit Besucher rasch verstehen, warum sie gerade bei Ihnen anfragen sollen.',
      heroBadge: 'Landing Page ab 299€',
      heroTrust: [
        'Fixe Einstiegspakete',
        'SEO- und Performance-Basis',
        'Deutsch & Englisch mitgedacht'
      ],
      metricOne: '3 Pakete',
      metricOneLabel: 'klar kalkulierbar',
      metricTwo: '2 Sprachen',
      metricTwoLabel: 'DE & EN',
      metricThree: '5 Branchen',
      metricThreeLabel: 'realistische Beispiele',
      proofTitle: 'Für Betriebe, die nicht nach Baukasten aussehen möchten.',
      proofCopy:
        'Vom ersten Eindruck bis zur Anfrage ist jede Seite darauf ausgelegt, Vertrauen aufzubauen, Leistungen verständlich zu machen und Kontaktbarrieren zu senken.',
      servicesTitle: 'Klare Pakete, ohne Agentur-Nebel.',
      servicesLead:
        'Sie wählen einen passenden Einstieg. Wenn Ihr Projekt mehr braucht, erweitern wir den Umfang sauber und nachvollziehbar.',
      portfolioTitle: 'Beispiele, die nach echter Arbeit aussehen.',
      portfolioLead:
        'Fünf realistische Branchen-Cases zeigen, wie ein professioneller Auftritt für österreichische Unternehmen wirken kann.',
      processTitle: 'Ein Ablauf, der schnell bleibt und trotzdem sauber ist.',
      processLead:
        'Sie bekommen keine lose Sammlung hübscher Sektionen, sondern einen nachvollziehbaren Weg von Positionierung bis Go-live.'
    },
    about: {
      title: 'Ein schlankes Webstudio mit Sinn für österreichische Betriebe.',
      lead:
        'TreeTech unterstützt Unternehmen, Ordinationen, Kanzleien und lokale Dienstleister dabei, online hochwertiger aufzutreten und besser angefragt zu werden.',
      storyTitle: 'Warum TreeTech',
      story:
        'Viele Betriebe leisten sehr gute Arbeit, wirken online aber kleiner oder beliebiger, als sie sind. TreeTech übersetzt Qualität, Erfahrung und Standortnähe in einen Webauftritt, der ruhig, hochwertig und verständlich verkauft.',
      valuesTitle: 'So arbeiten wir',
      values: [
        'Zuerst Klarheit über Angebot und Zielgruppe',
        'Mobile Darstellung wird von Anfang an mitgedacht',
        'Texte, Struktur und Design greifen ineinander',
        'Technik bleibt nachvollziehbar und wartbar'
      ],
      promiseTitle: 'Was Sie erwarten können',
      promise:
        'Eine Zusammenarbeit ohne Fachchinesisch: klare Entscheidungen, ehrliche Einschätzungen und ein Ergebnis, das zu Ihrem Betrieb passt.'
    },
    services: {
      title: 'Websites für Betriebe, die Vertrauen und Anfragen brauchen.',
      lead:
        'Ob neue Landing Page, mehrseitiger Auftritt oder hochwertiger Relaunch: TreeTech baut Websites, die Leistungen verständlich machen und Besucher zur Anfrage führen.',
      packageTitle: 'Pakete',
      processTitle: 'So läuft die Zusammenarbeit',
      addOnsTitle: 'Sinnvolle Erweiterungen',
      addOns: [
        'Mehrsprachige Inhalte mit sauberer URL-Struktur',
        'Portfolio- oder Referenzbereich für Vertrauen',
        'Kontaktformular vorbereitet für Resend',
        'Performance-, Formular- und Launch-Check',
        'Text-Feinschliff für bessere Anfragen'
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
      title: 'Bereit für einen Webauftritt, der besser verkauft?',
      lead:
        'Schreiben Sie kurz, worum es geht. TreeTech meldet sich mit einer ehrlichen Einschätzung, einem passenden Paket und einem klaren nächsten Schritt.',
      detailsTitle: 'Direkter Kontakt',
      details:
        'Passend für neue Websites, Landing Pages, Relaunches und zweisprachige Auftritte für Betriebe in Österreich.',
      responseTime: 'Antwort in der Regel innerhalb eines Werktags.',
      formTitle: 'Projektanfrage'
    }
  },
  en: {
    metadata: {
      homeTitle: 'TreeTech | Premium websites for Austrian businesses',
      homeDescription:
        'TreeTech builds modern multilingual websites and landing pages for Austrian businesses. Clear packages from 299€.',
      aboutTitle: 'About TreeTech | Web studio for Austria',
      aboutDescription:
        'TreeTech is a modern web studio for Austrian businesses that want to look credible online and receive better inquiries.',
      servicesTitle: 'Services & pricing | TreeTech',
      servicesDescription:
        'Landing pages from 299€, websites from 499€, and business websites from 799€ for Austrian companies, clinics, law firms, and service providers.',
      portfolioTitle: 'Portfolio | TreeTech web studio',
      portfolioDescription:
        'Sample projects for Austrian industries: dental clinic, law firm, hotel, real estate, and fitness studio.',
      contactTitle: 'Contact | TreeTech',
      contactDescription:
        'Start your website project with TreeTech. We will reply with a clear assessment and the right next step.'
    },
    common: {
      eyebrow: 'Web studio for Austria',
      primaryCta: 'Request a project',
      secondaryCta: 'View work',
      viewProject: 'View case',
      startProject: 'Start website',
      learnMore: 'Learn more',
      requestPackage: 'Request package',
      recommended: 'Popular',
      from: 'from',
      included: 'Included',
      backToPortfolio: 'Back to portfolio',
      nextStep: 'Next step'
    },
    home: {
      heroTitle: 'Websites that help Austrian businesses sell with confidence.',
      heroLead:
        'TreeTech creates clear, fast, multilingual websites for businesses in Austria. Visitors understand what you offer, why it matters, and how to get in touch.',
      heroBadge: 'Landing page from 299€',
      heroTrust: [
        'Clear starter packages',
        'SEO and performance foundation',
        'German & English planned in'
      ],
      metricOne: '3 packages',
      metricOneLabel: 'easy to plan',
      metricTwo: '2 languages',
      metricTwoLabel: 'DE & EN',
      metricThree: '5 industries',
      metricThreeLabel: 'realistic cases',
      proofTitle: 'For companies that should not look like a template.',
      proofCopy:
        'From first impression to inquiry, every page is designed to build trust, explain services clearly, and make contact feel easy.',
      servicesTitle: 'Clear packages without agency fog.',
      servicesLead:
        'Choose the right starting point. If your project needs more, we expand the scope clearly and transparently.',
      portfolioTitle: 'Examples that feel like real client work.',
      portfolioLead:
        'Five realistic industry cases show how a professional website can work for Austrian businesses.',
      processTitle: 'A process that stays fast without getting messy.',
      processLead:
        'You get a clear path from positioning to launch, not a loose collection of nice-looking sections.'
    },
    about: {
      title: 'A lean web studio with a feel for Austrian businesses.',
      lead:
        'TreeTech helps companies, clinics, law firms, and local service providers look more professional online and generate better inquiries.',
      storyTitle: 'Why TreeTech',
      story:
        'Many businesses do excellent work but appear smaller or less distinctive online than they really are. TreeTech turns quality, experience, and local relevance into a calm, premium website that sells clearly.',
      valuesTitle: 'How we work',
      values: [
        'Clarity about offer and audience comes first',
        'Mobile experience is considered from the start',
        'Copy, structure, and design work together',
        'Technology stays understandable and maintainable'
      ],
      promiseTitle: 'What to expect',
      promise:
        'A collaboration without jargon: clear decisions, honest recommendations, and a result that fits your business.'
    },
    services: {
      title: 'Websites for businesses that need trust and inquiries.',
      lead:
        'Whether you need a new landing page, a multi-page website, or a premium relaunch, TreeTech builds websites that explain your services and guide visitors toward contact.',
      packageTitle: 'Packages',
      processTitle: 'How collaboration works',
      addOnsTitle: 'Useful add-ons',
      addOns: [
        'Multilingual content with clean URL structure',
        'Portfolio or references section for trust',
        'Contact form prepared for Resend',
        'Performance, form, and launch check',
        'Copy polish for stronger inquiries'
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
      title: 'Ready for a website that sells better?',
      lead:
        'Send a short note about your project. TreeTech will reply with an honest assessment, a suitable package, and a clear next step.',
      detailsTitle: 'Direct contact',
      details:
        'Best suited for new websites, landing pages, relaunches, and bilingual web presences for Austrian businesses.',
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
      en: 'TreeTech designed a high-contrast site with class modules, trainer sections, pricing anchors, and a prominent trial-session flow.'
    },
    features: {
      de: ['Probetraining-CTA', 'Kursplan-Sektion', 'Trainerkarten', 'Preisanker für Mitgliedschaften', 'Mobile-first Navigation'],
      en: ['Trial session CTA', 'Class schedule section', 'Trainer cards', 'Membership pricing anchors', 'Mobile-first navigation']
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
