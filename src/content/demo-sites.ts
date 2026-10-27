import type {Locale} from '@/i18n/routing';
import {withLocaleFallbacks} from '@/i18n/localized';

type Localized<T> = Record<Locale, T>;

type DemoCard = {
  title: string;
  text: string;
};

type DemoStat = {
  value: string;
  label: string;
};

export type DemoSiteCopy = {
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

export const demoSiteLabels = withLocaleFallbacks({
  de: {
    viewDemo: 'Beispiel-Website ansehen',
    demoEyebrow: 'Beispiel',
    backToCase: 'Zurück zum Beispiel',
    banner: 'Beispiel-Website von TreeTech. Der Betrieb ist erfunden.',
    bannerCta: 'So eine Website für Ihren Betrieb'
  },
  en: {
    viewDemo: 'View example website',
    demoEyebrow: 'Example',
    backToCase: 'Back to the example',
    banner: 'Example website by TreeTech. The business is made up.',
    bannerCta: 'A site like this for your business'
  },
  ru: {
    viewDemo: 'Открыть пример сайта',
    demoEyebrow: 'Пример',
    backToCase: 'Назад к примеру',
    banner: 'Пример сайта от TreeTech. Фирма вымышленная.',
    bannerCta: 'Такой сайт для вашего бизнеса'
  }
}) satisfies Localized<Record<string, string>>;

export const demoSites: DemoSite[] = withLocaleFallbacks([
  {
    slug: 'elektro-huber',
    brand: 'Elektro Huber',
    location: 'Mödling',
    industry: {
      de: 'Elektriker',
      en: 'Electrician',
      ru: 'Электрик'
    },
    metaTitle: {
      de: 'Elektro Huber Beispiel-Website | TreeTech',
      en: 'Elektro Huber example website | TreeTech',
      ru: 'Elektro Huber, пример сайта | TreeTech'
    },
    metaDescription: {
      de: 'Beispiel-Website für einen Elektriker in Mödling: Anruf-Knopf, Anfrage mit Foto, Leistungen und Einsatzgebiet. Ein erfundener Betrieb, gebaut von TreeTech.',
      en: 'Example website for an electrician in Mödling: call button, inquiry with photo, services and service area. A made-up business built by TreeTech.',
      ru: 'Пример сайта для электрика в Мёдлинге: кнопка звонка, заявка с фото, услуги и район выезда. Вымышленная фирма, сайт сделал TreeTech.'
    },
    theme: {
      background: '#f5f6f8',
      surface: '#ffffff',
      text: '#14202e',
      muted: '#556170',
      primary: '#14324f',
      accent: '#e8590c',
      hero: '#14324f'
    },
    copy: {
      de: {
        nav: ['Leistungen', 'Über uns', 'Ablauf', 'Kontakt'],
        eyebrow: 'Elektriker in Mödling und Umgebung',
        title: 'Strom weg? Wir kommen heute noch.',
        lead: 'Störungen, Umbau, E-Check und Photovoltaik. Meisterbetrieb in Mödling, unterwegs im ganzen Bezirk und in Baden.',
        primaryCta: 'Jetzt anrufen',
        secondaryCta: 'Anfrage mit Foto senden',
        stats: [
          {value: '25 Jahre', label: 'Meisterbetrieb'},
          {value: '30 min', label: 'bis zum Rückruf'},
          {value: '7 bis 19 Uhr', label: 'Mo bis Fr, Notdienst am Wochenende'}
        ],
        introTitle: 'Ein Betrieb, ein Ansprechpartner.',
        introText: 'Sie reden mit dem Meister, nicht mit einer Hotline. Wir sagen Ihnen vorher, was es kostet, und hinterlassen die Baustelle sauber.',
        servicesTitle: 'Was wir für Sie machen',
        services: [
          {title: 'Störungsdienst', text: 'Sicherung fliegt, Licht geht nicht, Herd ohne Strom. Wir finden den Fehler und beheben ihn.'},
          {title: 'Umbau und Sanierung', text: 'Neue Leitungen, Steckdosen und Verteiler für Wohnung, Haus und Geschäft.'},
          {title: 'E-Check für Vermieter', text: 'Prüfung der Elektroanlage mit Protokoll, oft schon am nächsten Tag.'},
          {title: 'Photovoltaik und Wallbox', text: 'Beratung, Montage und Anschluss, abgestimmt mit Ihrem Netzbetreiber.'}
        ],
        processTitle: 'So einfach geht es',
        process: [
          {title: 'Anrufen oder Foto schicken', text: 'Sagen Sie kurz, was los ist. Ein Foto hilft uns, gleich das Richtige mitzunehmen.'},
          {title: 'Termin und Preis vorher', text: 'Sie wissen, wann wir kommen und womit Sie rechnen können.'},
          {title: 'Erledigt und sauber', text: 'Wir machen die Arbeit fertig, räumen auf und erklären Ihnen, was wir gemacht haben.'}
        ],
        testimonial: 'Hier stehen auf Ihrer Website später Ihre echten Google-Bewertungen.',
        testimonialAuthor: 'Platz für Ihre Bewertungen',
        contactTitle: 'Was ist kaputt?',
        contactText: 'Schicken Sie uns ein Foto und Ihre Adresse. Wir rufen innerhalb von 30 Minuten zurück.',
        contactButton: 'Anfrage senden'
      },
      en: {
        nav: ['Services', 'About', 'Process', 'Contact'],
        eyebrow: 'Electrician in Mödling and the surrounding area',
        title: 'Power out? We come today.',
        lead: 'Faults, renovations, safety checks and solar. Master electricians in Mödling, working across the district and in Baden.',
        primaryCta: 'Call now',
        secondaryCta: 'Send a request with photo',
        stats: [
          {value: '25 years', label: 'master business'},
          {value: '30 min', label: 'until we call back'},
          {value: '7am to 7pm', label: 'Mon to Fri, emergency service at weekends'}
        ],
        introTitle: 'One business, one contact.',
        introText: 'You talk to the master electrician, not a hotline. We tell you the cost upfront and leave the site clean.',
        servicesTitle: 'What we do for you',
        services: [
          {title: 'Emergency service', text: 'Fuse keeps tripping, lights out, cooker without power. We find the fault and fix it.'},
          {title: 'Renovation', text: 'New wiring, sockets and distribution boards for flats, houses and shops.'},
          {title: 'Safety check for landlords', text: 'Inspection of the electrical system with a report, often the next day.'},
          {title: 'Solar and wallbox', text: 'Advice, installation and connection, coordinated with your grid operator.'}
        ],
        processTitle: 'Simple as that',
        process: [
          {title: 'Call or send a photo', text: 'Tell us briefly what is wrong. A photo helps us bring the right parts.'},
          {title: 'Date and price upfront', text: 'You know when we come and what to expect.'},
          {title: 'Done and clean', text: 'We finish the job, tidy up and explain what we did.'}
        ],
        testimonial: 'Your real Google reviews will appear here on your website.',
        testimonialAuthor: 'Space for your reviews',
        contactTitle: 'What is broken?',
        contactText: 'Send us a photo and your address. We call back within 30 minutes.',
        contactButton: 'Send request'
      },
      ru: {
        nav: ['Услуги', 'О нас', 'Как работаем', 'Контакт'],
        eyebrow: 'Электрик в Мёдлинге и окрестностях',
        title: 'Нет света? Приедем сегодня.',
        lead: 'Неисправности, ремонт, проверки и солнечные панели. Мастерская в Мёдлинге, выезжаем по всему округу и в Баден.',
        primaryCta: 'Позвонить',
        secondaryCta: 'Отправить заявку с фото',
        stats: [
          {value: '25 лет', label: 'работаем как мастерская'},
          {value: '30 мин', label: 'до обратного звонка'},
          {value: '7:00–19:00', label: 'пн–пт, аварийный выезд в выходные'}
        ],
        introTitle: 'Одна фирма, один контакт.',
        introText: 'Вы говорите с мастером, а не с горячей линией. Цену называем заранее и оставляем после себя чистоту.',
        servicesTitle: 'Что мы делаем',
        services: [
          {title: 'Аварийный выезд', text: 'Выбивает автомат, не горит свет, плита без тока. Находим причину и устраняем.'},
          {title: 'Ремонт и замена', text: 'Новая проводка, розетки и щитки для квартиры, дома и магазина.'},
          {title: 'Проверка для арендодателей', text: 'Проверка электросети с протоколом, часто уже на следующий день.'},
          {title: 'Солнечные панели и зарядка', text: 'Консультация, монтаж и подключение по согласованию с сетевой компанией.'}
        ],
        processTitle: 'Всё просто',
        process: [
          {title: 'Позвоните или пришлите фото', text: 'Коротко опишите проблему. Фото помогает взять с собой нужное.'},
          {title: 'Время и цена заранее', text: 'Вы знаете, когда мы приедем и сколько это будет стоить.'},
          {title: 'Сделано и чисто', text: 'Заканчиваем работу, убираем за собой и объясняем, что сделали.'}
        ],
        testimonial: 'Здесь на вашем сайте будут ваши настоящие отзывы из Google.',
        testimonialAuthor: 'Место для ваших отзывов',
        contactTitle: 'Что сломалось?',
        contactText: 'Пришлите фото и адрес. Перезвоним в течение 30 минут.',
        contactButton: 'Отправить заявку'
      }
    }
  },
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
      de: 'Zweisprachige Demo-Website für eine moderne Zahnordination in Innsbruck.',
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
        title: 'Ruhige Zahnmedizin für ein gutes Gefühl vor dem Termin.',
        lead:
          'AlpenDent verbindet moderne Zahnmedizin mit klarer Beratung und einer Atmosphäre, in der sich Patientinnen und Patienten gut aufgehoben fühlen.',
        primaryCta: 'Termin anfragen',
        secondaryCta: 'Behandlungen ansehen',
        stats: [
          {value: '24h', label: 'Rückmeldung bei Online-Anfragen'},
          {value: '4.9', label: 'Patientenzufriedenheit'},
          {value: 'DE/EN', label: 'Betreuung auf zwei Sprachen'}
        ],
        introTitle: 'Vertrauen beginnt vor dem ersten Besuch.',
        introText:
          'Die Website führt neue Patientinnen und Patienten ruhig durch Leistungen, Team und Terminoptionen. Jede Sektion beantwortet eine konkrete Frage, bevor sie zur Anfrage führt.',
        servicesTitle: 'Leistungen mit klarer Orientierung',
        services: [
          {
            title: 'Prophylaxe & Mundhygiene',
            text: 'Schonende Betreuung, transparente Empfehlungen und regelmäßige Vorsorge für langfristige Zahngesundheit.'
          },
          {
            title: 'Ästhetische Zahnmedizin',
            text: 'Bleaching, Veneers und unauffällige Korrekturen mit einem natürlichen Ergebnis im Fokus.'
          },
          {
            title: 'Akute Beschwerden',
            text: 'Schnelle Einschätzung, klare Kommunikation und planbare nächste Schritte bei Schmerzen.'
          }
        ],
        processTitle: 'So läuft der erste Termin',
        process: [
          {title: 'Anfrage', text: 'Patienten senden online ihr Anliegen und erhalten eine zeitnahe Rückmeldung.'},
          {title: 'Erstgespräch', text: 'Die Ordination klärt Beschwerden, Wünsche und passende Behandlungsschritte.'},
          {title: 'Behandlung', text: 'Jede Massnahme wird verständlich erklärt und sorgfältig umgesetzt.'}
        ],
        testimonial:
          'Die neue Website nimmt die Unsicherheit vor dem ersten Besuch. Genau das wollten wir erreichen.',
        testimonialAuthor: 'Dr. Lena Hofer, Leitung AlpenDent',
        contactTitle: 'Bereit für einen ruhigen ersten Schritt?',
        contactText: 'Senden Sie Ihre Anfrage direkt an die Ordination. AlpenDent meldet sich mit passenden Terminvorschlägen.',
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
      de: 'Zweisprachige Demo-Website für eine seriöse Wiener Rechtsanwaltskanzlei.',
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
        eyebrow: 'Kanzlei für Wirtschafts- und Immobilienrecht',
        title: 'Klare rechtliche Orientierung, bevor es kompliziert wird.',
        lead:
          'Vienna Legal begleitet Unternehmen, Eigentümer und Privatpersonen mit präziser Beratung und einem diskreten Weg zum Erstgespräch.',
        primaryCta: 'Erstgespräch anfragen',
        secondaryCta: 'Fachgebiete ansehen',
        stats: [
          {value: '3', label: 'Kernbereiche'},
          {value: '48h', label: 'Rückmeldung auf Anfragen'},
          {value: 'DE/EN', label: 'Mandantenkommunikation'}
        ],
        introTitle: 'Seriös, klar und ohne juristische Nebelwand.',
        introText:
          'Die Website erklärt Fachgebiete in verständlicher Sprache und führt Mandantinnen und Mandanten zu einem sicheren ersten Kontakt.',
        servicesTitle: 'Fachgebiete',
        services: [
          {
            title: 'Wirtschaftsrecht',
            text: 'Verträge, Gesellschaftsfragen und laufende rechtliche Begleitung für Unternehmen.'
          },
          {
            title: 'Immobilienrecht',
            text: 'Kauf, Bestand, Entwicklung und Streitfragen mit Fokus auf saubere Entscheidungen.'
          },
          {
            title: 'Konfliktlösung',
            text: 'Strategische Einschätzung, Verhandlung und gerichtliche Vertretung, wenn es nötig ist.'
          }
        ],
        processTitle: 'Vom Anliegen zur Einschätzung',
        process: [
          {title: 'Kurz schildern', text: 'Mandanten beschreiben ihr Anliegen sicher und knapp über das Formular.'},
          {title: 'Prüfen', text: 'Die Kanzlei klärt Zuständigkeit, Dringlichkeit und die passende Vorgehensweise.'},
          {title: 'Beraten', text: 'Im Erstgespräch entstehen klare Optionen, Risiken und nächste Schritte.'}
        ],
        testimonial:
          'Die Seite wirkt wie unsere Kanzlei: ruhig, präzise und auf den Punkt.',
        testimonialAuthor: 'Mag. Thomas Berger, Partner Vienna Legal',
        contactTitle: 'Ihr Anliegen braucht eine klare Einschätzung?',
        contactText: 'Senden Sie eine kurze Beschreibung. Vienna Legal meldet sich diskret mit dem passenden nächsten Schritt.',
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
      de: 'Zweisprachige Demo-Website für ein alpines Hotel im Salzkammergut.',
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
          'Das Bergblick Hotel verbindet alpine Erholung, regionale Küche und persönlichen Service für Gäste, die bewusst buchen.',
        primaryCta: 'Aufenthalt anfragen',
        secondaryCta: 'Zimmer entdecken',
        stats: [
          {value: '32', label: 'Zimmer & Suiten'},
          {value: '4', label: 'Jahreszeiten-Angebote'},
          {value: 'DE/EN', label: 'Gästekommunikation'}
        ],
        introTitle: 'Inspiration und Buchungsabsicht gehören zusammen.',
        introText:
          'Die Website zeigt Atmosphäre, Zimmer und Region emotional, führt aber immer wieder sauber zur Direktanfrage.',
        servicesTitle: 'Was Gäste erwartet',
        services: [
          {
            title: 'Zimmer mit Ausblick',
            text: 'Ruhige Zimmer, helle Materialien und Balkone mit Blick in die Berge.'
          },
          {
            title: 'Regionale Kulinarik',
            text: 'Frühstück, Abendmenüs und Produkte aus der Region mit persönlicher Handschrift.'
          },
          {
            title: 'Sommer & Winter',
            text: 'Wandern, Seen, Skitage und Wellnessmomente mit passenden saisonalen Angeboten.'
          }
        ],
        processTitle: 'Direkt anfragen ohne Umwege',
        process: [
          {title: 'Zeitraum wählen', text: 'Gäste geben Reisedaten, Personen und Wünsche an.'},
          {title: 'Angebot erhalten', text: 'Das Hotel sendet ein persönliches Angebot statt anonymer Standardpreise.'},
          {title: 'Aufenthalt fixieren', text: 'Die Buchung wird direkt und nachvollziehbar abgeschlossen.'}
        ],
        testimonial:
          'Die Website fühlt sich nach Urlaub an und macht Direktanfragen viel einfacher.',
        testimonialAuthor: 'Maria Leitner, Gastgeberin Bergblick Hotel',
        contactTitle: 'Planen Sie Ihre Auszeit in den Bergen?',
        contactText: 'Fragen Sie Ihren Wunschzeitraum direkt an. Das Bergblick Team sendet ein persönliches Angebot.',
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
      de: 'Zweisprachige Demo-Website für eine Immobilienagentur in Graz.',
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
        title: 'Immobilien hochwertig präsentieren und Eigentümern Vertrauen geben.',
        lead:
          'GreenHaus Immobilien verbindet Marktkenntnis, saubere Objektpräsentation und persönliche Beratung für Kauf, Verkauf und Bewertung.',
        primaryCta: 'Immobilie bewerten',
        secondaryCta: 'Objekte ansehen',
        stats: [
          {value: '18', label: 'aktive Objekte'},
          {value: '72h', label: 'erste Bewertung'},
          {value: 'DE/EN', label: 'Exposes & Beratung'}
        ],
        introTitle: 'Ein Immobilienauftritt muss zwei Zielgruppen führen.',
        introText:
          'Käufer wollen schnell passende Objekte verstehen. Eigentümern muss die Website Kompetenz und Diskretion vermitteln.',
        servicesTitle: 'Leistungen für Eigentümer und Käufer',
        services: [
          {
            title: 'Immobilienbewertung',
            text: 'Realistische Einschätzung mit Marktbezug, Lageanalyse und klarem nächsten Schritt.'
          },
          {
            title: 'Verkauf & Vermarktung',
            text: 'Präzise Objektaufbereitung, hochwertige Exposes und strukturierte Anfrageführung.'
          },
          {
            title: 'Käuferberatung',
            text: 'Begleitung von der ersten Besichtigung bis zur fundierten Kaufentscheidung.'
          }
        ],
        processTitle: 'Vom Objekt zur qualifizierten Anfrage',
        process: [
          {title: 'Objekt verstehen', text: 'Eckdaten, Lage und Zielgruppe werden sauber aufgenommen.'},
          {title: 'Wertigkeit zeigen', text: 'Das Objekt wird strukturiert, klar und hochwertig präsentiert.'},
          {title: 'Anfragen qualifizieren', text: 'Kontaktwege trennen Käuferanfragen und Eigentümergespräche.'}
        ],
        testimonial:
          'Unsere Objekte wirken online endlich so hochwertig, wie sie es tatsächlich sind.',
        testimonialAuthor: 'Sophie Krainer, GreenHaus Immobilien',
        contactTitle: 'Möchten Sie eine Immobilie einschätzen lassen?',
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
      de: 'Zweisprachige Demo-Website für ein Fitnessstudio in Linz.',
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
        title: 'Training, das Energie macht und den Einstieg leicht hält.',
        lead:
          'KraftWerk Fitness verbindet starke Trainingsbereiche, motivierende Coaches und einen klaren Weg zum Probetraining.',
        primaryCta: 'Probetraining buchen',
        secondaryCta: 'Kurse ansehen',
        stats: [
          {value: '45+', label: 'Kurse pro Woche'},
          {value: '7', label: 'Coaches'},
          {value: 'DE/EN', label: 'Trainingseinweisung'}
        ],
        introTitle: 'Der erste Besuch entscheidet über die Mitgliedschaft.',
        introText:
          'Die Website nimmt Interessenten schnell mit: Was kann ich trainieren, wer begleitet mich, und wie komme ich zum Probetraining?',
        servicesTitle: 'Training für unterschiedliche Ziele',
        services: [
          {
            title: 'Strength Zone',
            text: 'Freihantelbereich, Maschinen und Planbegleitung für messbare Fortschritte.'
          },
          {
            title: 'Functional Classes',
            text: 'Kraft, Ausdauer und Beweglichkeit in kompakten Einheiten mit Coach.'
          },
          {
            title: 'Personal Coaching',
            text: 'Individuelle Betreuung für Einstieg, Technik und langfristige Motivation.'
          }
        ],
        processTitle: 'Vom Interesse zum ersten Training',
        process: [
          {title: 'Slot buchen', text: 'Interessenten wählen online einen passenden Probetraining-Termin.'},
          {title: 'Studio erleben', text: 'Ein Coach zeigt Bereiche, Kurse und sinnvolle Einstiegsoptionen.'},
          {title: 'Plan starten', text: 'Nach dem Probetraining gibt es einen klaren Plan für die ersten Wochen.'}
        ],
        testimonial:
          'Die Website bringt die Energie des Studios auf den Punkt und macht Probetrainings sichtbar.',
        testimonialAuthor: 'Markus Steiner, Gründer KraftWerk Fitness',
        contactTitle: 'Bereit für Ihr erstes Training?',
        contactText: 'Buchen Sie ein unverbindliches Probetraining und lernen Sie Studio, Coaches und Trainingsmöglichkeiten kennen.',
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
]);

export function getDemoSiteBySlug(slug: string) {
  return demoSites.find((site) => site.slug === slug);
}
