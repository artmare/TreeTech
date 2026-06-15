import type {Locale} from '@/i18n/routing';

type Localized<T> = Record<Locale, T>;

type DemoCard = {
  title: string;
  text: string;
};

type DemoStat = {
  value: string;
  label: string;
};

type DemoSiteCopy = {
  nav: string[];
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  stats: DemoStat[];
  introTitle: string;
  introText: string;
  servicesTitle: string;
  services: DemoCard[];
  processTitle: string;
  process: DemoCard[];
  testimonial: string;
  testimonialAuthor: string;
  contactTitle: string;
  contactText: string;
  contactButton: string;
};

export type DemoSite = {
  slug: string;
  brand: string;
  location: string;
  industry: Localized<string>;
  metaTitle: Localized<string>;
  metaDescription: Localized<string>;
  theme: {
    background: string;
    surface: string;
    text: string;
    muted: string;
    primary: string;
    accent: string;
    hero: string;
  };
  copy: Localized<DemoSiteCopy>;
};

export const demoSiteLabels = {
  de: {
    viewDemo: 'Demo-Website ansehen',
    demoEyebrow: 'Live-Demo',
    backToCase: 'Zurueck zum Case',
    storageTitle: 'Speicherstrategie',
    storageText:
      'Dieses Demo wird als typisierte Inhaltsdatei gespeichert und statisch generiert. So bleibt das Portfolio schnell, uebersetzbar und ohne zusaetzliche Datenbank wartbar.'
  },
  en: {
    viewDemo: 'View demo website',
    demoEyebrow: 'Live demo',
    backToCase: 'Back to case',
    storageTitle: 'Storage strategy',
    storageText:
      'This demo is stored as typed content and statically generated. That keeps the portfolio fast, translatable, and maintainable without an extra database.'
  }
} satisfies Localized<Record<string, string>>;

export const demoSites: DemoSite[] = [
  {
    slug: 'alpendent',
    brand: 'AlpenDent',
    location: 'Innsbruck',
    industry: {
      de: 'Zahnordination',
      en: 'Dental clinic'
    },
    metaTitle: {
      de: 'AlpenDent Demo-Website | TreeTech Portfolio',
      en: 'AlpenDent Demo Website | TreeTech Portfolio'
    },
    metaDescription: {
      de: 'Zweisprachige Demo-Website fuer eine moderne Zahnordination in Innsbruck.',
      en: 'Bilingual demo website for a modern dental clinic in Innsbruck.'
    },
    theme: {
      background: '#f3fbfa',
      surface: '#ffffff',
      text: '#10201f',
      muted: '#5c706e',
      primary: '#0d766f',
      accent: '#9be7dd',
      hero: 'linear-gradient(135deg, #e8fffb 0%, #ffffff 45%, #dff4ff 100%)'
    },
    copy: {
      de: {
        nav: ['Behandlungen', 'Ordination', 'Ablauf', 'Kontakt'],
        eyebrow: 'Zahnarztpraxis in Innsbruck',
        title: 'Ruhige Zahnmedizin fuer ein gutes Gefuehl vor dem Termin.',
        lead:
          'AlpenDent verbindet moderne Zahnmedizin mit klarer Beratung und einer Atmosphaere, in der sich Patientinnen und Patienten gut aufgehoben fuehlen.',
        primaryCta: 'Termin anfragen',
        secondaryCta: 'Behandlungen ansehen',
        stats: [
          {value: '24h', label: 'Rueckmeldung bei Online-Anfragen'},
          {value: '4.9', label: 'Patientenzufriedenheit'},
          {value: 'DE/EN', label: 'Betreuung auf zwei Sprachen'}
        ],
        introTitle: 'Vertrauen beginnt vor dem ersten Besuch.',
        introText:
          'Die Website fuehrt neue Patientinnen und Patienten ruhig durch Leistungen, Team und Terminoptionen. Jede Sektion beantwortet eine konkrete Frage, bevor sie zur Anfrage fuehrt.',
        servicesTitle: 'Leistungen mit klarer Orientierung',
        services: [
          {
            title: 'Prophylaxe & Mundhygiene',
            text: 'Schonende Betreuung, transparente Empfehlungen und regelmaessige Vorsorge fuer langfristige Zahngesundheit.'
          },
          {
            title: 'Aesthetische Zahnmedizin',
            text: 'Bleaching, Veneers und unauffaellige Korrekturen mit einem natuerlichen Ergebnis im Fokus.'
          },
          {
            title: 'Akute Beschwerden',
            text: 'Schnelle Einschaetzung, klare Kommunikation und planbare naechste Schritte bei Schmerzen.'
          }
        ],
        processTitle: 'So laeuft der erste Termin',
        process: [
          {title: 'Anfrage', text: 'Patienten senden online ihr Anliegen und erhalten eine zeitnahe Rueckmeldung.'},
          {title: 'Erstgespraech', text: 'Die Ordination klaert Beschwerden, Wuensche und passende Behandlungsschritte.'},
          {title: 'Behandlung', text: 'Jede Massnahme wird verstaendlich erklaert und sorgfaeltig umgesetzt.'}
        ],
        testimonial:
          'Die neue Website nimmt die Unsicherheit vor dem ersten Besuch. Genau das wollten wir erreichen.',
        testimonialAuthor: 'Dr. Lena Hofer, Leitung AlpenDent',
        contactTitle: 'Bereit fuer einen ruhigen ersten Schritt?',
        contactText: 'Senden Sie Ihre Anfrage direkt an die Ordination. AlpenDent meldet sich mit passenden Terminvorschlaegen.',
        contactButton: 'Jetzt Termin anfragen'
      },
      en: {
        nav: ['Treatments', 'Clinic', 'Process', 'Contact'],
        eyebrow: 'Dental clinic in Innsbruck',
        title: 'Calm dental care that feels reassuring before the appointment.',
        lead:
          'AlpenDent combines modern dentistry with clear guidance and an atmosphere where patients feel genuinely looked after.',
        primaryCta: 'Request appointment',
        secondaryCta: 'View treatments',
        stats: [
          {value: '24h', label: 'Reply time for online requests'},
          {value: '4.9', label: 'Patient satisfaction'},
          {value: 'DE/EN', label: 'Care in two languages'}
        ],
        introTitle: 'Trust begins before the first visit.',
        introText:
          'The website guides new patients calmly through services, team, and appointment options. Every section answers a real question before leading to inquiry.',
        servicesTitle: 'Services with clear orientation',
        services: [
          {
            title: 'Prevention & hygiene',
            text: 'Gentle care, transparent recommendations, and regular prevention for long-term dental health.'
          },
          {
            title: 'Aesthetic dentistry',
            text: 'Whitening, veneers, and subtle corrections with a natural-looking result in focus.'
          },
          {
            title: 'Acute discomfort',
            text: 'Fast assessment, clear communication, and planable next steps when pain appears.'
          }
        ],
        processTitle: 'How the first appointment works',
        process: [
          {title: 'Request', text: 'Patients submit their concern online and receive a timely reply.'},
          {title: 'Consultation', text: 'The clinic clarifies symptoms, wishes, and suitable treatment steps.'},
          {title: 'Treatment', text: 'Every measure is explained clearly and carried out carefully.'}
        ],
        testimonial:
          'The new website reduces uncertainty before the first visit. That was exactly what we wanted.',
        testimonialAuthor: 'Dr. Lena Hofer, AlpenDent clinic lead',
        contactTitle: 'Ready for a calm first step?',
        contactText: 'Send your request directly to the clinic. AlpenDent will reply with suitable appointment options.',
        contactButton: 'Request appointment now'
      }
    }
  },
  {
    slug: 'vienna-legal',
    brand: 'Vienna Legal',
    location: 'Wien',
    industry: {
      de: 'Rechtsanwaltskanzlei',
      en: 'Law firm'
    },
    metaTitle: {
      de: 'Vienna Legal Demo-Website | TreeTech Portfolio',
      en: 'Vienna Legal Demo Website | TreeTech Portfolio'
    },
    metaDescription: {
      de: 'Zweisprachige Demo-Website fuer eine serioese Wiener Rechtsanwaltskanzlei.',
      en: 'Bilingual demo website for a composed Vienna law firm.'
    },
    theme: {
      background: '#f6f4ef',
      surface: '#ffffff',
      text: '#15171f',
      muted: '#646875',
      primary: '#1d2f6f',
      accent: '#c89b3c',
      hero: 'linear-gradient(135deg, #111827 0%, #1d2f6f 54%, #f2d28b 100%)'
    },
    copy: {
      de: {
        nav: ['Fachgebiete', 'Kanzlei', 'Ablauf', 'Kontakt'],
        eyebrow: 'Kanzlei fuer Wirtschafts- und Immobilienrecht',
        title: 'Klare rechtliche Orientierung, bevor es kompliziert wird.',
        lead:
          'Vienna Legal begleitet Unternehmen, Eigentuemer und Privatpersonen mit praeziser Beratung und einem diskreten Weg zum Erstgespraech.',
        primaryCta: 'Erstgespraech anfragen',
        secondaryCta: 'Fachgebiete ansehen',
        stats: [
          {value: '3', label: 'Kernbereiche'},
          {value: '48h', label: 'Rueckmeldung auf Anfragen'},
          {value: 'DE/EN', label: 'Mandantenkommunikation'}
        ],
        introTitle: 'Serioes, klar und ohne juristische Nebelwand.',
        introText:
          'Die Website erklaert Fachgebiete in verstaendlicher Sprache und fuehrt Mandantinnen und Mandanten zu einem sicheren ersten Kontakt.',
        servicesTitle: 'Fachgebiete',
        services: [
          {
            title: 'Wirtschaftsrecht',
            text: 'Vertraege, Gesellschaftsfragen und laufende rechtliche Begleitung fuer Unternehmen.'
          },
          {
            title: 'Immobilienrecht',
            text: 'Kauf, Bestand, Entwicklung und Streitfragen mit Fokus auf saubere Entscheidungen.'
          },
          {
            title: 'Konfliktloesung',
            text: 'Strategische Einschaetzung, Verhandlung und gerichtliche Vertretung, wenn es noetig ist.'
          }
        ],
        processTitle: 'Vom Anliegen zur Einschaetzung',
        process: [
          {title: 'Kurz schildern', text: 'Mandanten beschreiben ihr Anliegen sicher und knapp ueber das Formular.'},
          {title: 'Pruefen', text: 'Die Kanzlei klaert Zustaendigkeit, Dringlichkeit und die passende Vorgehensweise.'},
          {title: 'Beraten', text: 'Im Erstgespraech entstehen klare Optionen, Risiken und naechste Schritte.'}
        ],
        testimonial:
          'Die Seite wirkt wie unsere Kanzlei: ruhig, praezise und auf den Punkt.',
        testimonialAuthor: 'Mag. Thomas Berger, Partner Vienna Legal',
        contactTitle: 'Ihr Anliegen braucht eine klare Einschaetzung?',
        contactText: 'Senden Sie eine kurze Beschreibung. Vienna Legal meldet sich diskret mit dem passenden naechsten Schritt.',
        contactButton: 'Kontakt aufnehmen'
      },
      en: {
        nav: ['Practice areas', 'Firm', 'Process', 'Contact'],
        eyebrow: 'Commercial and real estate law firm',
        title: 'Clear legal orientation before things become complicated.',
        lead:
          'Vienna Legal supports companies, owners, and private clients with precise advice and a discreet path to the first consultation.',
        primaryCta: 'Request consultation',
        secondaryCta: 'View practice areas',
        stats: [
          {value: '3', label: 'Core areas'},
          {value: '48h', label: 'Response time'},
          {value: 'DE/EN', label: 'Client communication'}
        ],
        introTitle: 'Composed, clear, and free of legal fog.',
        introText:
          'The website explains practice areas in understandable language and guides potential clients toward a confident first contact.',
        servicesTitle: 'Practice areas',
        services: [
          {
            title: 'Commercial law',
            text: 'Contracts, corporate matters, and ongoing legal support for businesses.'
          },
          {
            title: 'Real estate law',
            text: 'Purchase, lease, development, and disputes with a focus on clean decisions.'
          },
          {
            title: 'Dispute resolution',
            text: 'Strategic assessment, negotiation, and court representation when needed.'
          }
        ],
        processTitle: 'From concern to assessment',
        process: [
          {title: 'Describe briefly', text: 'Clients outline their concern securely and concisely through the form.'},
          {title: 'Review', text: 'The firm checks fit, urgency, and the right way forward.'},
          {title: 'Advise', text: 'The first consultation clarifies options, risks, and next steps.'}
        ],
        testimonial:
          'The website feels like our firm: calm, precise, and to the point.',
        testimonialAuthor: 'Mag. Thomas Berger, partner at Vienna Legal',
        contactTitle: 'Does your matter need a clear assessment?',
        contactText: 'Send a short description. Vienna Legal will reply discreetly with the right next step.',
        contactButton: 'Get in touch'
      }
    }
  },
  {
    slug: 'bergblick-hotel',
    brand: 'Bergblick Hotel',
    location: 'Salzkammergut',
    industry: {
      de: 'Alpines Hotel',
      en: 'Alpine hotel'
    },
    metaTitle: {
      de: 'Bergblick Hotel Demo-Website | TreeTech Portfolio',
      en: 'Bergblick Hotel Demo Website | TreeTech Portfolio'
    },
    metaDescription: {
      de: 'Zweisprachige Demo-Website fuer ein alpines Hotel im Salzkammergut.',
      en: 'Bilingual demo website for an alpine hotel in the Salzkammergut.'
    },
    theme: {
      background: '#f5f8f3',
      surface: '#ffffff',
      text: '#172018',
      muted: '#63705f',
      primary: '#2f6b45',
      accent: '#8ecae6',
      hero: 'linear-gradient(135deg, #2f6b45 0%, #8ecae6 52%, #fff7df 100%)'
    },
    copy: {
      de: {
        nav: ['Zimmer', 'Erlebnisse', 'Angebote', 'Anfrage'],
        eyebrow: 'Alpines Hideaway im Salzkammergut',
        title: 'Urlaub mit Weitblick, Ruhe und einem klaren Weg zur Direktanfrage.',
        lead:
          'Das Bergblick Hotel verbindet alpine Erholung, regionale Kueche und persoenlichen Service fuer Gaeste, die bewusst buchen.',
        primaryCta: 'Aufenthalt anfragen',
        secondaryCta: 'Zimmer entdecken',
        stats: [
          {value: '32', label: 'Zimmer & Suiten'},
          {value: '4', label: 'Jahreszeiten-Angebote'},
          {value: 'DE/EN', label: 'Gaestekommunikation'}
        ],
        introTitle: 'Inspiration und Buchungsabsicht gehoeren zusammen.',
        introText:
          'Die Website zeigt Atmosphaere, Zimmer und Region emotional, fuehrt aber immer wieder sauber zur Direktanfrage.',
        servicesTitle: 'Was Gaeste erwartet',
        services: [
          {
            title: 'Zimmer mit Ausblick',
            text: 'Ruhige Zimmer, helle Materialien und Balkone mit Blick in die Berge.'
          },
          {
            title: 'Regionale Kulinarik',
            text: 'Fruehstueck, Abendmenues und Produkte aus der Region mit persoenlicher Handschrift.'
          },
          {
            title: 'Sommer & Winter',
            text: 'Wandern, Seen, Skitage und Wellnessmomente mit passenden saisonalen Angeboten.'
          }
        ],
        processTitle: 'Direkt anfragen ohne Umwege',
        process: [
          {title: 'Zeitraum waehlen', text: 'Gaeste geben Reisedaten, Personen und Wuensche an.'},
          {title: 'Angebot erhalten', text: 'Das Hotel sendet ein persoenliches Angebot statt anonymer Standardpreise.'},
          {title: 'Aufenthalt fixieren', text: 'Die Buchung wird direkt und nachvollziehbar abgeschlossen.'}
        ],
        testimonial:
          'Die Website fuehlt sich nach Urlaub an und macht Direktanfragen viel einfacher.',
        testimonialAuthor: 'Maria Leitner, Gastgeberin Bergblick Hotel',
        contactTitle: 'Planen Sie Ihre Auszeit in den Bergen?',
        contactText: 'Fragen Sie Ihren Wunschzeitraum direkt an. Das Bergblick Team sendet ein persoenliches Angebot.',
        contactButton: 'Aufenthalt anfragen'
      },
      en: {
        nav: ['Rooms', 'Experiences', 'Offers', 'Inquiry'],
        eyebrow: 'Alpine hideaway in the Salzkammergut',
        title: 'A stay with mountain views, calm, and a clear path to direct inquiry.',
        lead:
          'Bergblick Hotel combines alpine relaxation, regional cuisine, and personal service for guests who book intentionally.',
        primaryCta: 'Request a stay',
        secondaryCta: 'Explore rooms',
        stats: [
          {value: '32', label: 'Rooms & suites'},
          {value: '4', label: 'Seasonal offers'},
          {value: 'DE/EN', label: 'Guest communication'}
        ],
        introTitle: 'Inspiration and booking intent belong together.',
        introText:
          'The website presents atmosphere, rooms, and region emotionally while consistently guiding guests toward direct inquiry.',
        servicesTitle: 'What guests can expect',
        services: [
          {
            title: 'Rooms with a view',
            text: 'Quiet rooms, bright materials, and balconies facing the mountains.'
          },
          {
            title: 'Regional cuisine',
            text: 'Breakfast, dinner menus, and local products with a personal signature.'
          },
          {
            title: 'Summer & winter',
            text: 'Hiking, lakes, ski days, and wellness moments with seasonal offers.'
          }
        ],
        processTitle: 'Direct inquiry without detours',
        process: [
          {title: 'Choose dates', text: 'Guests enter travel dates, people, and personal wishes.'},
          {title: 'Receive offer', text: 'The hotel sends a personal offer instead of anonymous standard prices.'},
          {title: 'Confirm stay', text: 'The booking is completed directly and transparently.'}
        ],
        testimonial:
          'The website feels like a holiday and makes direct inquiries much easier.',
        testimonialAuthor: 'Maria Leitner, host at Bergblick Hotel',
        contactTitle: 'Planning your mountain getaway?',
        contactText: 'Request your preferred dates directly. The Bergblick team will send a personal offer.',
        contactButton: 'Request a stay'
      }
    }
  },
  {
    slug: 'greenhaus-immobilien',
    brand: 'GreenHaus Immobilien',
    location: 'Graz',
    industry: {
      de: 'Immobilienagentur',
      en: 'Real estate agency'
    },
    metaTitle: {
      de: 'GreenHaus Immobilien Demo-Website | TreeTech Portfolio',
      en: 'GreenHaus Immobilien Demo Website | TreeTech Portfolio'
    },
    metaDescription: {
      de: 'Zweisprachige Demo-Website fuer eine Immobilienagentur in Graz.',
      en: 'Bilingual demo website for a real estate agency in Graz.'
    },
    theme: {
      background: '#f8f7f1',
      surface: '#ffffff',
      text: '#182019',
      muted: '#667064',
      primary: '#3a7d44',
      accent: '#d7b46a',
      hero: 'linear-gradient(135deg, #f7f2dc 0%, #ffffff 44%, #dcefdc 100%)'
    },
    copy: {
      de: {
        nav: ['Objekte', 'Bewertung', 'Maklerteam', 'Kontakt'],
        eyebrow: 'Immobilienvermittlung in Graz',
        title: 'Immobilien hochwertig praesentieren und Eigentuemern Vertrauen geben.',
        lead:
          'GreenHaus Immobilien verbindet Marktkenntnis, saubere Objektpraesentation und persoenliche Beratung fuer Kauf, Verkauf und Bewertung.',
        primaryCta: 'Immobilie bewerten',
        secondaryCta: 'Objekte ansehen',
        stats: [
          {value: '18', label: 'aktive Objekte'},
          {value: '72h', label: 'erste Bewertung'},
          {value: 'DE/EN', label: 'Exposes & Beratung'}
        ],
        introTitle: 'Ein Immobilienauftritt muss zwei Zielgruppen fuehren.',
        introText:
          'Kaeufer wollen schnell passende Objekte verstehen. Eigentuemern muss die Website Kompetenz und Diskretion vermitteln.',
        servicesTitle: 'Leistungen fuer Eigentuemer und Kaeufer',
        services: [
          {
            title: 'Immobilienbewertung',
            text: 'Realistische Einschaetzung mit Marktbezug, Lageanalyse und klarem naechsten Schritt.'
          },
          {
            title: 'Verkauf & Vermarktung',
            text: 'Praezise Objektaufbereitung, hochwertige Exposes und strukturierte Anfragefuehrung.'
          },
          {
            title: 'Kaeuferberatung',
            text: 'Begleitung von der ersten Besichtigung bis zur fundierten Kaufentscheidung.'
          }
        ],
        processTitle: 'Vom Objekt zur qualifizierten Anfrage',
        process: [
          {title: 'Objekt verstehen', text: 'Eckdaten, Lage und Zielgruppe werden sauber aufgenommen.'},
          {title: 'Wertigkeit zeigen', text: 'Das Objekt wird strukturiert, klar und hochwertig praesentiert.'},
          {title: 'Anfragen qualifizieren', text: 'Kontaktwege trennen Kaeuferanfragen und Eigentuemergespraeche.'}
        ],
        testimonial:
          'Unsere Objekte wirken online endlich so hochwertig, wie sie es tatsaechlich sind.',
        testimonialAuthor: 'Sophie Krainer, GreenHaus Immobilien',
        contactTitle: 'Moechten Sie eine Immobilie einschaetzen lassen?',
        contactText: 'Senden Sie die wichtigsten Eckdaten. GreenHaus meldet sich mit einer ersten Orientierung.',
        contactButton: 'Bewertung anfragen'
      },
      en: {
        nav: ['Listings', 'Valuation', 'Agents', 'Contact'],
        eyebrow: 'Real estate agency in Graz',
        title: 'Present properties with quality and give owners confidence.',
        lead:
          'GreenHaus Immobilien combines market knowledge, precise property presentation, and personal advice for buying, selling, and valuation.',
        primaryCta: 'Request valuation',
        secondaryCta: 'View listings',
        stats: [
          {value: '18', label: 'active listings'},
          {value: '72h', label: 'first valuation'},
          {value: 'DE/EN', label: 'exposes & advice'}
        ],
        introTitle: 'A real estate website must guide two audiences.',
        introText:
          'Buyers need to understand suitable properties quickly. Owners need the website to signal expertise and discretion.',
        servicesTitle: 'Services for owners and buyers',
        services: [
          {
            title: 'Property valuation',
            text: 'Realistic assessment with market context, location analysis, and a clear next step.'
          },
          {
            title: 'Sales & marketing',
            text: 'Precise property preparation, premium exposes, and structured inquiry handling.'
          },
          {
            title: 'Buyer guidance',
            text: 'Support from the first viewing through to a confident purchase decision.'
          }
        ],
        processTitle: 'From property to qualified inquiry',
        process: [
          {title: 'Understand property', text: 'Key data, location, and audience are captured cleanly.'},
          {title: 'Show value', text: 'The property is presented clearly, structurally, and with quality.'},
          {title: 'Qualify inquiries', text: 'Contact paths separate buyer inquiries from owner conversations.'}
        ],
        testimonial:
          'Our listings finally feel online as premium as they are in reality.',
        testimonialAuthor: 'Sophie Krainer, GreenHaus Immobilien',
        contactTitle: 'Would you like to assess a property?',
        contactText: 'Send the key details. GreenHaus will reply with a first orientation.',
        contactButton: 'Request valuation'
      }
    }
  },
  {
    slug: 'kraftwerk-fitness',
    brand: 'KraftWerk Fitness',
    location: 'Linz',
    industry: {
      de: 'Fitnessstudio',
      en: 'Fitness studio'
    },
    metaTitle: {
      de: 'KraftWerk Fitness Demo-Website | TreeTech Portfolio',
      en: 'KraftWerk Fitness Demo Website | TreeTech Portfolio'
    },
    metaDescription: {
      de: 'Zweisprachige Demo-Website fuer ein Fitnessstudio in Linz.',
      en: 'Bilingual demo website for a fitness studio in Linz.'
    },
    theme: {
      background: '#111111',
      surface: '#1b1b1b',
      text: '#ffffff',
      muted: '#c7c7c7',
      primary: '#ef4444',
      accent: '#facc15',
      hero: 'linear-gradient(135deg, #111111 0%, #3f1111 52%, #ef4444 100%)'
    },
    copy: {
      de: {
        nav: ['Training', 'Kurse', 'Coaches', 'Probetraining'],
        eyebrow: 'Fitnessstudio in Linz',
        title: 'Training, das Energie macht und den Einstieg leicht haelt.',
        lead:
          'KraftWerk Fitness verbindet starke Trainingsbereiche, motivierende Coaches und einen klaren Weg zum Probetraining.',
        primaryCta: 'Probetraining buchen',
        secondaryCta: 'Kurse ansehen',
        stats: [
          {value: '45+', label: 'Kurse pro Woche'},
          {value: '7', label: 'Coaches'},
          {value: 'DE/EN', label: 'Trainingseinweisung'}
        ],
        introTitle: 'Der erste Besuch entscheidet ueber die Mitgliedschaft.',
        introText:
          'Die Website nimmt Interessenten schnell mit: Was kann ich trainieren, wer begleitet mich, und wie komme ich zum Probetraining?',
        servicesTitle: 'Training fuer unterschiedliche Ziele',
        services: [
          {
            title: 'Strength Zone',
            text: 'Freihantelbereich, Maschinen und Planbegleitung fuer messbare Fortschritte.'
          },
          {
            title: 'Functional Classes',
            text: 'Kraft, Ausdauer und Beweglichkeit in kompakten Einheiten mit Coach.'
          },
          {
            title: 'Personal Coaching',
            text: 'Individuelle Betreuung fuer Einstieg, Technik und langfristige Motivation.'
          }
        ],
        processTitle: 'Vom Interesse zum ersten Training',
        process: [
          {title: 'Slot buchen', text: 'Interessenten waehlen online einen passenden Probetraining-Termin.'},
          {title: 'Studio erleben', text: 'Ein Coach zeigt Bereiche, Kurse und sinnvolle Einstiegsoptionen.'},
          {title: 'Plan starten', text: 'Nach dem Probetraining gibt es einen klaren Plan fuer die ersten Wochen.'}
        ],
        testimonial:
          'Die Website bringt die Energie des Studios auf den Punkt und macht Probetrainings sichtbar.',
        testimonialAuthor: 'Markus Steiner, Gruender KraftWerk Fitness',
        contactTitle: 'Bereit fuer Ihr erstes Training?',
        contactText: 'Buchen Sie ein unverbindliches Probetraining und lernen Sie Studio, Coaches und Trainingsmoeglichkeiten kennen.',
        contactButton: 'Probetraining buchen'
      },
      en: {
        nav: ['Training', 'Classes', 'Coaches', 'Trial session'],
        eyebrow: 'Fitness studio in Linz',
        title: 'Training that creates energy and makes starting easy.',
        lead:
          'KraftWerk Fitness combines strong training zones, motivating coaches, and a clear path to the first trial session.',
        primaryCta: 'Book trial session',
        secondaryCta: 'View classes',
        stats: [
          {value: '45+', label: 'classes per week'},
          {value: '7', label: 'coaches'},
          {value: 'DE/EN', label: 'training intro'}
        ],
        introTitle: 'The first visit decides the membership.',
        introText:
          'The website quickly answers what prospects care about: what can I train, who guides me, and how do I book a trial session?',
        servicesTitle: 'Training for different goals',
        services: [
          {
            title: 'Strength zone',
            text: 'Free weights, machines, and plan guidance for measurable progress.'
          },
          {
            title: 'Functional classes',
            text: 'Strength, endurance, and mobility in compact coached sessions.'
          },
          {
            title: 'Personal coaching',
            text: 'Individual support for getting started, technique, and long-term motivation.'
          }
        ],
        processTitle: 'From interest to first training',
        process: [
          {title: 'Book a slot', text: 'Prospects choose a suitable trial-session appointment online.'},
          {title: 'Experience the studio', text: 'A coach presents areas, classes, and useful starting options.'},
          {title: 'Start a plan', text: 'After the trial, members receive a clear plan for the first weeks.'}
        ],
        testimonial:
          'The website captures the studio energy and makes trial sessions visible.',
        testimonialAuthor: 'Markus Steiner, founder of KraftWerk Fitness',
        contactTitle: 'Ready for your first training?',
        contactText: 'Book a non-binding trial session and get to know the studio, coaches, and training options.',
        contactButton: 'Book trial session'
      }
    }
  }
];

export function getDemoSiteBySlug(slug: string) {
  return demoSites.find((site) => site.slug === slug);
}
