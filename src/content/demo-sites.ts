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
  /** Trade demos (Handwerk) are rendered by `HandwerkDemo` from this config. */
  handwerk: HandwerkConfig;
  /**
   * Present on "Website Business" demos: a richer multi-page site with its own look.
   * Without it the demo is a one-page "Website Start".
   */
  business?: BusinessConfig;
};

export type BusinessServicePage = {
  slug: string;
  intro: string;
  bullets: string[];
  price: string;
};

export type BusinessLocation = {
  slug: string;
  name: string;
  text: string;
  travel: string;
};

export type BusinessCopy = {
  utility: string;
  heroBadges: [string, string];
  servicePages: BusinessServicePage[];
  beforeAfter: {title: string; text: string};
  about: {title: string; text: string; name: string; role: string; quote: string};
  reviews: {name: string; place: string; text: string}[];
  locationsTitle: string;
  locationsText: string;
  locations: BusinessLocation[];
  faq: {q: string; a: string}[];
  steps: {topic: string; topics: string[]; when: string; whens: string[]};
  hours: [string, string][];
};

export type BusinessConfig = {
  /** Visual direction, so Business demos never look like the same template. */
  variant: 'friendly' | 'editorial' | 'bold';
  illustration: 'bathroom' | 'kitchen' | 'roof';
  rating: string;
  copy: Localized<BusinessCopy>;
};

export type HandwerkIcon =
  | 'zap'
  | 'wrench'
  | 'shield'
  | 'star'
  | 'droplets'
  | 'flame'
  | 'bath'
  | 'thermometer'
  | 'car'
  | 'gauge'
  | 'tire'
  | 'hammer'
  | 'ruler'
  | 'sofa'
  | 'kitchen'
  | 'roller'
  | 'brush'
  | 'layers'
  | 'house'
  | 'storm';

export type HandwerkFormField = {
  label: string;
  type?: 'text' | 'tel' | 'date' | 'textarea' | 'select';
  placeholder?: string;
  options?: string[];
  /** Spans both form columns. */
  wide?: boolean;
};

export type HandwerkAside =
  | {type: 'stats'}
  | {type: 'prices'; title: string; note: string; items: {label: string; price: number}[]}
  | {
      type: 'calculator';
      title: string;
      label: string;
      unit: string;
      min: number;
      max: number;
      step: number;
      defaultValue: number;
      /** Euro per unit, lower and upper bound of the estimate. */
      rateLow: number;
      rateHigh: number;
      resultLabel: string;
      note: string;
    };

export type HandwerkCopy = {
  areaText: string;
  towns: string[];
  hours: string;
  trust?: string[];
  emergency?: {title: string; text: string};
  aside?: HandwerkAside;
  gallery?: {title: string; text: string; photoLabel: string; items: {title: string; meta: string}[]};
  form: {fields: HandwerkFormField[]; photo?: string};
};

export type HandwerkConfig = {
  /** True when the demo has its own Russian text. Otherwise /ru shows the German version. */
  russian?: boolean;
  icon: HandwerkIcon;
  serviceIcons: HandwerkIcon[];
  secondaryIcon?: 'camera' | 'calendar';
  /** Fictional phone number, used only inside the example site. */
  phone: string;
  theme: {
    primary: string;
    accent: string;
    accentStrong: string;
    onDark: string;
    footer: string;
    background: string;
    text: string;
    muted: string;
    border: string;
    chip: string;
  };
  copy: Localized<HandwerkCopy>;
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

/** Trade demos are written in German and English. On /ru they show the German text, as an Austrian business would. */
function deAsRu<T>(value: {de: T; en: T}): Localized<T> {
  return {...value, ru: value.de};
}

/**
 * Example sites for the trades TreeTech targets (Handwerk in Wien and Niederösterreich).
 * All businesses, phone numbers and prices are made up.
 */
export const demoSites: DemoSite[] = [
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
      accent: '#c2410c',
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
    },
    handwerk: {
      russian: true,
      icon: 'zap',
      serviceIcons: ['zap', 'wrench', 'shield', 'star'],
      phone: '02236 000 000',
      theme: {
        primary: '#14324f',
        accent: '#c2410c',
        accentStrong: '#9a3412',
        onDark: '#ffb37a',
        footer: '#0f2338',
        background: '#f5f6f8',
        text: '#14202e',
        muted: '#556170',
        border: '#e3e7ec',
        chip: '#eef1f5'
      },
      copy: {
        de: {
          areaText: 'Wir sind schnell bei Ihnen in',
          towns: ['Mödling', 'Brunn am Gebirge', 'Maria Enzersdorf', 'Perchtoldsdorf', 'Guntramsdorf', 'Baden', 'Wien Liesing'],
          hours: 'Mo bis Fr 7 bis 19 Uhr',
          form: {
            fields: [
              {label: 'Name'},
              {label: 'Telefon', type: 'tel'},
              {label: 'Adresse', wide: true},
              {label: 'Was ist los?', type: 'textarea', placeholder: 'z. B. Sicherung fliegt im Bad immer raus', wide: true}
            ],
            photo: 'Foto hinzufügen'
          }
        },
        en: {
          areaText: 'We are with you quickly in',
          towns: ['Mödling', 'Brunn am Gebirge', 'Maria Enzersdorf', 'Perchtoldsdorf', 'Guntramsdorf', 'Baden', 'Vienna Liesing'],
          hours: 'Mon to Fri 7am to 7pm',
          form: {
            fields: [
              {label: 'Name'},
              {label: 'Phone', type: 'tel'},
              {label: 'Address', wide: true},
              {label: 'What is wrong?', type: 'textarea', placeholder: 'e.g. the fuse in the bathroom keeps tripping', wide: true}
            ],
            photo: 'Add photo'
          }
        },
        ru: {
          areaText: 'Быстро приедем в',
          towns: ['Мёдлинг', 'Брунн-ам-Гебирге', 'Мария-Энцерсдорф', 'Перхтольдсдорф', 'Гунтрамсдорф', 'Баден', 'Вена-Лизинг'],
          hours: 'пн–пт 7:00–19:00',
          form: {
            fields: [
              {label: 'Имя'},
              {label: 'Телефон', type: 'tel'},
              {label: 'Адрес', wide: true},
              {label: 'Что случилось?', type: 'textarea', placeholder: 'например, в ванной всё время выбивает автомат', wide: true}
            ],
            photo: 'Добавить фото'
          }
        }
      }
    }
  },
  {
    slug: 'installateur-novak',
    brand: 'Installateur Novak',
    location: 'Wien Favoriten',
    industry: {
      de: 'Installateur',
      en: 'Plumber and heating',
      ru: 'Сантехник и отопление'
    },
    metaTitle: {
      de: 'Installateur Novak Beispiel-Website | TreeTech',
      en: 'Installateur Novak example website | TreeTech',
      ru: 'Installateur Novak, пример сайта | TreeTech'
    },
    metaDescription: {
      de: 'Beispiel-Website für einen Installateur in Wien: Notdienst-Hinweis, Anfrage mit Foto und Dringlichkeit, Referenzen und Einsatzgebiet. Ein erfundener Betrieb, gebaut von TreeTech.',
      en: 'Example website for a plumber in Vienna: emergency notice, inquiry with photo and urgency, references and service area. A made-up business built by TreeTech.',
      ru: 'Пример сайта для сантехника в Вене: аварийный выезд, заявка с фото и срочностью, примеры работ и район выезда. Вымышленная фирма, сайт сделал TreeTech.'
    },
    theme: {
      background: '#f4f7f6',
      surface: '#ffffff',
      text: '#10201f',
      muted: '#4d5f5d',
      primary: '#0f3d3e',
      accent: '#b45309',
      hero: '#0f3d3e'
    },
    copy: deAsRu({
      de: {
        nav: ['Leistungen', 'Referenzen', 'Ablauf', 'Kontakt'],
        eyebrow: 'Installateur in Wien Favoriten und Umgebung',
        title: 'Therme kalt? Rohr undicht? Wir sind schnell da.',
        lead: 'Sanitär, Heizung und Thermenservice für Wohnungen, Häuser und Hausverwaltungen. Unterwegs in allen Bezirken südlich der Donau.',
        primaryCta: 'Jetzt anrufen',
        secondaryCta: 'Foto vom Schaden senden',
        stats: [
          {value: '60 min', label: 'Anfahrt im Notfall'},
          {value: 'Fixpreis', label: 'vor Arbeitsbeginn'},
          {value: '24/7', label: 'Notdienst bei Rohrbruch'}
        ],
        introTitle: 'Ehrliche Preise, saubere Arbeit.',
        introText: 'Bevor wir anfangen, wissen Sie, was es kostet. Wir arbeiten mit Schuhüberziehern, decken ab und nehmen alte Teile mit.',
        servicesTitle: 'Was wir für Sie machen',
        services: [
          {title: 'Rohrbruch und Wasserschaden', text: 'Wir finden das Leck, stoppen das Wasser und dokumentieren den Schaden für Ihre Versicherung.'},
          {title: 'Thermenservice', text: 'Wartung, Reparatur und Tausch für Vaillant, Junkers, Buderus und andere Marken.'},
          {title: 'Badsanierung', text: 'Vom alten Bad zur bodenebenen Dusche, mit einem Ansprechpartner für alle Gewerke.'},
          {title: 'Heizung und Wärmepumpe', text: 'Heizkörper, Fußbodenheizung und der Umstieg von Gas auf Wärmepumpe, mit Förderberatung.'}
        ],
        processTitle: 'So einfach geht es',
        process: [
          {title: 'Anrufen oder Foto schicken', text: 'Ein Foto vom Typenschild der Therme oder vom Schaden spart oft eine zweite Anfahrt.'},
          {title: 'Fixpreis vor Ort', text: 'Wir schauen es uns an und nennen den Preis, bevor wir anfangen.'},
          {title: 'Repariert und dokumentiert', text: 'Sie bekommen Rechnung und Fotos, auf Wunsch direkt an Hausverwaltung oder Versicherung.'}
        ],
        testimonial: 'Hier stehen auf Ihrer Website später Ihre echten Google-Bewertungen.',
        testimonialAuthor: 'Platz für Ihre Bewertungen',
        contactTitle: 'Was ist passiert?',
        contactText: 'Beschreiben Sie kurz das Problem und schicken Sie ein Foto. Im Notfall bitte gleich anrufen.',
        contactButton: 'Anfrage senden'
      },
      en: {
        nav: ['Services', 'References', 'Process', 'Contact'],
        eyebrow: 'Plumber in Vienna Favoriten and nearby',
        title: 'Boiler cold? Pipe leaking? We are there fast.',
        lead: 'Plumbing, heating and boiler service for flats, houses and property managers. Working in every district south of the Danube.',
        primaryCta: 'Call now',
        secondaryCta: 'Send a photo of the damage',
        stats: [
          {value: '60 min', label: 'to arrive in an emergency'},
          {value: 'Fixed price', label: 'before we start'},
          {value: '24/7', label: 'emergency service for burst pipes'}
        ],
        introTitle: 'Honest prices, clean work.',
        introText: 'Before we start, you know what it costs. We wear shoe covers, protect the floor and take the old parts with us.',
        servicesTitle: 'What we do for you',
        services: [
          {title: 'Burst pipes and water damage', text: 'We find the leak, stop the water and document the damage for your insurer.'},
          {title: 'Boiler service', text: 'Maintenance, repair and replacement for Vaillant, Junkers, Buderus and other brands.'},
          {title: 'Bathroom renovation', text: 'From an old bathroom to a walk-in shower, with one contact for every trade.'},
          {title: 'Heating and heat pumps', text: 'Radiators, underfloor heating and switching from gas to a heat pump, with subsidy advice.'}
        ],
        processTitle: 'Simple as that',
        process: [
          {title: 'Call or send a photo', text: 'A photo of the boiler label or the damage often saves a second trip.'},
          {title: 'Fixed price on site', text: 'We take a look and name the price before we start.'},
          {title: 'Repaired and documented', text: 'You get the invoice and photos, sent straight to your property manager or insurer if you like.'}
        ],
        testimonial: 'Your real Google reviews will appear here on your website.',
        testimonialAuthor: 'Space for your reviews',
        contactTitle: 'What happened?',
        contactText: 'Describe the problem briefly and send a photo. In an emergency, please call right away.',
        contactButton: 'Send request'
      }
    }),
    business: {
      variant: 'friendly',
      illustration: 'bathroom',
      rating: '4,9',
      copy: deAsRu({
        de: {
          utility: 'Notdienst rund um die Uhr · alle Bezirke südlich der Donau',
          heroBadges: ['Badsanierung in Wien 10', 'Techniker in 60 Minuten'],
          servicePages: [
            {
              slug: 'rohrbruch-wasserschaden',
              intro: 'Wasser tritt aus? Drehen Sie den Haupthahn zu und rufen Sie an. Wir sind im Notfall in rund 60 Minuten bei Ihnen, auch nachts und am Wochenende.',
              bullets: ['Leckortung ohne unnötiges Stemmen', 'Sofortige Abdichtung und Trocknungsempfehlung', 'Fotodokumentation für die Versicherung', 'Abrechnung direkt mit der Hausverwaltung möglich'],
              price: 'Notdienst-Pauschale ab 119 €'
            },
            {
              slug: 'thermenservice',
              intro: 'Eine gewartete Therme verbraucht weniger und fällt seltener aus. Wir warten und reparieren alle gängigen Marken und tauschen alte Geräte gegen sparsame Brennwerttechnik.',
              bullets: ['Jährliche Wartung mit Abgasmessung und Protokoll', 'Reparatur mit Originalersatzteilen', 'Thermentausch meist an einem Tag', 'Erinnerung an den nächsten Termin per SMS'],
              price: 'Wartung ab 149 €'
            },
            {
              slug: 'badsanierung',
              intro: 'Vom alten Bad mit Wanne zur bodenebenen Dusche. Wir koordinieren Installateur, Fliesenleger und Elektriker, Sie haben einen Ansprechpartner und einen Fixpreis.',
              bullets: ['Planung mit 3D-Ansicht', 'Bodenebene Duschen und barrierefreie Bäder', 'Alle Gewerke aus einer Hand', 'Typische Bauzeit 8 bis 12 Arbeitstage'],
              price: 'Komplettbad ab 14.900 €'
            },
            {
              slug: 'heizung-waermepumpe',
              intro: 'Raus aus Gas? Wir prüfen, ob eine Wärmepumpe für Ihr Haus passt, planen die Anlage und kümmern uns um die Förderung von Bund und Land.',
              bullets: ['Heizlastberechnung vor Ort', 'Wärmepumpe, Fußbodenheizung, Heizkörpertausch', 'Förderantrag „Raus aus Öl und Gas“ inklusive', 'Wartungsvertrag auf Wunsch'],
              price: 'Beratung vor Ort kostenlos'
            }
          ],
          beforeAfter: {
            title: 'Vorher, nachher. Schieben Sie selbst.',
            text: 'Ein altes Bad mit Wanne wird zur bodenebenen Dusche. Auf Ihrer Website zeigen Sie hier Ihre eigenen Projekte, mit Bezirk und Bauzeit.'
          },
          about: {
            title: 'Ein Familienbetrieb aus Favoriten.',
            text: 'Seit 2009 sind wir in Wien unterwegs, heute mit sechs Technikern und zwei Servicewagen pro Bezirk. Wer anruft, spricht mit uns, nicht mit einem Callcenter.',
            name: 'Marko Novak',
            role: 'Installateur- und Heizungsbaumeister',
            quote: 'Ich sage meinen Kunden vor der Arbeit, was es kostet. Wenn wir gehen, ist das Bad sauberer als vorher.'
          },
          reviews: [
            {name: 'Sabine K.', place: 'Wien 10', text: 'Sonntagabend Rohrbruch, eine Stunde später war der Techniker da. Freundlich, schnell, Preis wie am Telefon gesagt.'},
            {name: 'Thomas W.', place: 'Wien 12', text: 'Therme getauscht, alles an einem Tag. Die Förderung haben sie auch gleich erledigt.'},
            {name: 'Hausverwaltung Prinz', place: 'Wien 4', text: 'Wir arbeiten seit Jahren zusammen. Rechnung mit Fotos, keine Rückfragen nötig.'}
          ],
          locationsTitle: 'Schnell bei Ihnen im Süden von Wien.',
          locationsText: 'Für jeden Bezirk gibt es eine eigene Seite. So finden Sie Kundinnen und Kunden, die „Installateur Simmering“ suchen.',
          locations: [
            {slug: 'favoriten', name: 'Favoriten', text: 'Unsere Werkstatt ist in Favoriten. Hier sind wir im Notfall oft in einer halben Stunde bei Ihnen, egal ob Gemeindebau, Altbau oder Neubau am Hauptbahnhof.', travel: 'ca. 30 Minuten'},
            {slug: 'simmering', name: 'Simmering', text: 'In Simmering betreuen wir viele Wohnhausanlagen und Einfamilienhäuser. Thermenwartung, Rohrbruch, Badsanierung: alles mit einem Anruf.', travel: 'ca. 40 Minuten'},
            {slug: 'meidling', name: 'Meidling', text: 'Altbau in Meidling heißt oft alte Leitungen. Wir tauschen Steigleitungen, sanieren Bäder und warten Thermen in Wohnungen jeder Größe.', travel: 'ca. 40 Minuten'}
          ],
          faq: [
            {q: 'Was kostet der Notdienst?', a: 'Die Notdienst-Pauschale beginnt bei 119 € und deckt Anfahrt und die erste halbe Stunde. Den Preis für die Reparatur sagen wir Ihnen, bevor wir anfangen.'},
            {q: 'Rechnen Sie mit der Versicherung ab?', a: 'Wir dokumentieren den Schaden mit Fotos und schicken alles an Sie oder direkt an Ihre Versicherung bzw. Hausverwaltung.'},
            {q: 'Welche Thermen warten Sie?', a: 'Vaillant, Junkers, Buderus, Viessmann, Baxi und die meisten anderen Marken. Ersatzteile haben wir für gängige Modelle im Wagen.'},
            {q: 'Gibt es Förderungen für die Wärmepumpe?', a: 'Ja. Wir prüfen, welche Förderungen von Bund und Stadt Wien Sie bekommen, und stellen den Antrag mit Ihnen gemeinsam.'}
          ],
          steps: {
            topic: 'Worum geht es?',
            topics: ['Rohrbruch oder Wasserschaden', 'Therme oder Heizung', 'Bad oder WC', 'Etwas anderes'],
            when: 'Wie dringend ist es?',
            whens: ['Notfall, heute', 'Diese Woche', 'Hat Zeit']
          },
          hours: [
            ['Mo bis Fr', '7 bis 18 Uhr'],
            ['Samstag', '8 bis 12 Uhr'],
            ['Notdienst', 'rund um die Uhr']
          ]
        },
        en: {
          utility: 'Emergency service around the clock · every district south of the Danube',
          heroBadges: ['Bathroom renovation in Vienna 10', 'Technician in 60 minutes'],
          servicePages: [
            {
              slug: 'rohrbruch-wasserschaden',
              intro: 'Water leaking? Turn off the main valve and call us. In an emergency we are with you in about 60 minutes, at night and at weekends too.',
              bullets: ['Leak detection without needless chiselling', 'Immediate sealing and drying advice', 'Photo documentation for your insurer', 'Billing straight to your property manager if you like'],
              price: 'Emergency call-out from €119'
            },
            {
              slug: 'thermenservice',
              intro: 'A serviced boiler uses less and breaks down less often. We service and repair all common brands and replace old units with efficient condensing boilers.',
              bullets: ['Yearly service with flue gas test and report', 'Repairs with original parts', 'Boiler replacement usually in one day', 'Text reminder for your next service'],
              price: 'Service from €149'
            },
            {
              slug: 'badsanierung',
              intro: 'From an old bathroom with a tub to a walk-in shower. We coordinate plumber, tiler and electrician; you have one contact and a fixed price.',
              bullets: ['Planning with a 3D view', 'Walk-in showers and accessible bathrooms', 'Every trade from one source', 'Typical build time 8 to 12 working days'],
              price: 'Complete bathroom from €14,900'
            },
            {
              slug: 'heizung-waermepumpe',
              intro: 'Moving off gas? We check whether a heat pump suits your house, plan the system and handle the federal and state subsidies.',
              bullets: ['Heat load calculation on site', 'Heat pumps, underfloor heating, new radiators', 'Subsidy application included', 'Maintenance contract on request'],
              price: 'On-site advice free of charge'
            }
          ],
          beforeAfter: {
            title: 'Before and after. Slide it yourself.',
            text: 'An old bathroom with a tub becomes a walk-in shower. On your website you show your own projects here, with district and build time.'
          },
          about: {
            title: 'A family business from Favoriten.',
            text: 'We have been working across Vienna since 2009, today with six technicians and two service vans per district. When you call, you talk to us, not a call centre.',
            name: 'Marko Novak',
            role: 'Master plumber and heating engineer',
            quote: 'I tell my customers what it costs before we start. When we leave, the bathroom is cleaner than before.'
          },
          reviews: [
            {name: 'Sabine K.', place: 'Vienna 10', text: 'Burst pipe on a Sunday evening, the technician arrived an hour later. Friendly, fast, price as quoted on the phone.'},
            {name: 'Thomas W.', place: 'Vienna 12', text: 'Boiler replaced, all in one day. They handled the subsidy too.'},
            {name: 'Prinz property management', place: 'Vienna 4', text: 'We have worked together for years. Invoices with photos, no follow-up questions needed.'}
          ],
          locationsTitle: 'Close to you in the south of Vienna.',
          locationsText: 'Every district gets its own page. That is how you reach people searching for “plumber Simmering”.',
          locations: [
            {slug: 'favoriten', name: 'Favoriten', text: 'Our workshop is in Favoriten. Here we are often with you within half an hour in an emergency, whether council flat, period building or new build by the main station.', travel: 'about 30 minutes'},
            {slug: 'simmering', name: 'Simmering', text: 'In Simmering we look after many housing estates and family homes. Boiler service, burst pipes, bathroom renovation: all with one call.', travel: 'about 40 minutes'},
            {slug: 'meidling', name: 'Meidling', text: 'Period buildings in Meidling often mean old pipes. We replace risers, renovate bathrooms and service boilers in flats of every size.', travel: 'about 40 minutes'}
          ],
          faq: [
            {q: 'What does the emergency service cost?', a: 'The emergency flat fee starts at €119 and covers travel and the first half hour. We tell you the repair price before we start.'},
            {q: 'Do you bill the insurer?', a: 'We document the damage with photos and send everything to you or straight to your insurer or property manager.'},
            {q: 'Which boilers do you service?', a: 'Vaillant, Junkers, Buderus, Viessmann, Baxi and most other brands. We carry parts for common models in the van.'},
            {q: 'Are there subsidies for heat pumps?', a: 'Yes. We check which federal and City of Vienna subsidies you can get and file the application with you.'}
          ],
          steps: {
            topic: 'What is it about?',
            topics: ['Burst pipe or water damage', 'Boiler or heating', 'Bathroom or toilet', 'Something else'],
            when: 'How urgent is it?',
            whens: ['Emergency, today', 'This week', 'No rush']
          },
          hours: [
            ['Mon to Fri', '7am to 6pm'],
            ['Saturday', '8am to 12pm'],
            ['Emergencies', 'around the clock']
          ]
        }
      })
    },
    handwerk: {
      icon: 'droplets',
      serviceIcons: ['droplets', 'flame', 'bath', 'thermometer'],
      phone: '01 000 00 10',
      theme: {
        primary: '#0f3d3e',
        accent: '#b45309',
        accentStrong: '#92400e',
        onDark: '#fcd34d',
        footer: '#0a2a2b',
        background: '#f4f7f6',
        text: '#10201f',
        muted: '#4d5f5d',
        border: '#d9e3e1',
        chip: '#e6efed'
      },
      copy: deAsRu({
        de: {
          areaText: 'Wir sind schnell bei Ihnen in',
          towns: ['Favoriten', 'Simmering', 'Meidling', 'Liesing', 'Wieden', 'Margareten', 'Hietzing', 'Vösendorf'],
          hours: 'Mo bis Fr 7 bis 18 Uhr, Notdienst rund um die Uhr',
          trust: ['Konzessionierter Betrieb', 'Fixpreis vor Arbeitsbeginn', 'Alle Thermenmarken'],
          emergency: {title: 'Rohrbruch oder Therme aus?', text: 'Notdienst in ganz Wien, auch an Sonn- und Feiertagen.'},
          gallery: {
            title: 'Aus unserer Arbeit',
            text: 'Hier zeigen Sie Ihre eigenen Fotos: vorher, nachher, mit Bezirk.',
            photoLabel: 'Ihr Foto',
            items: [
              {title: 'Badsanierung, Wien 10', meta: 'Bodenebene Dusche, 6 m², in 9 Arbeitstagen'},
              {title: 'Thermentausch, Wien 12', meta: 'Brennwerttherme, an einem Tag erledigt'},
              {title: 'Wärmepumpe, Wien 23', meta: 'Einfamilienhaus, Förderantrag inklusive'}
            ]
          },
          form: {
            fields: [
              {label: 'Name'},
              {label: 'Telefon', type: 'tel'},
              {label: 'Adresse und Bezirk'},
              {label: 'Worum geht es?', type: 'select', placeholder: 'Bitte wählen', options: ['Rohrbruch oder Wasserschaden', 'Therme oder Heizung', 'Bad oder WC', 'Etwas anderes']},
              {label: 'Wie dringend?', type: 'select', placeholder: 'Bitte wählen', options: ['Notfall, heute', 'Diese Woche', 'Hat Zeit'], wide: true},
              {label: 'Was ist los?', type: 'textarea', placeholder: 'z. B. Therme zeigt Fehler F28, kein Warmwasser', wide: true}
            ],
            photo: 'Foto hinzufügen'
          }
        },
        en: {
          areaText: 'We are with you quickly in',
          towns: ['Favoriten', 'Simmering', 'Meidling', 'Liesing', 'Wieden', 'Margareten', 'Hietzing', 'Vösendorf'],
          hours: 'Mon to Fri 7am to 6pm, emergency service around the clock',
          trust: ['Licensed business', 'Fixed price before we start', 'All boiler brands'],
          emergency: {title: 'Burst pipe or boiler down?', text: 'Emergency service across Vienna, Sundays and holidays included.'},
          gallery: {
            title: 'Recent work',
            text: 'This is where your own photos go: before, after, with the district.',
            photoLabel: 'Your photo',
            items: [
              {title: 'Bathroom renovation, Vienna 10', meta: 'Walk-in shower, 6 m², in 9 working days'},
              {title: 'Boiler replacement, Vienna 12', meta: 'Condensing boiler, done in one day'},
              {title: 'Heat pump, Vienna 23', meta: 'Detached house, subsidy application included'}
            ]
          },
          form: {
            fields: [
              {label: 'Name'},
              {label: 'Phone', type: 'tel'},
              {label: 'Address and district'},
              {label: 'What is it about?', type: 'select', placeholder: 'Please choose', options: ['Burst pipe or water damage', 'Boiler or heating', 'Bathroom or toilet', 'Something else']},
              {label: 'How urgent?', type: 'select', placeholder: 'Please choose', options: ['Emergency, today', 'This week', 'No rush'], wide: true},
              {label: 'What is wrong?', type: 'textarea', placeholder: 'e.g. boiler shows error F28, no hot water', wide: true}
            ],
            photo: 'Add photo'
          }
        }
      })
    }
  },
  {
    slug: 'kfz-berger',
    brand: 'KFZ Berger',
    location: 'Wien Floridsdorf',
    industry: {
      de: 'Kfz-Werkstatt',
      en: 'Car repair shop',
      ru: 'Автомастерская'
    },
    metaTitle: {
      de: 'KFZ Berger Beispiel-Website | TreeTech',
      en: 'KFZ Berger example website | TreeTech',
      ru: 'KFZ Berger, пример сайта | TreeTech'
    },
    metaDescription: {
      de: 'Beispiel-Website für eine Kfz-Werkstatt in Wien: Richtpreise, Online-Terminanfrage mit Kennzeichen und Wunschtag. Ein erfundener Betrieb, gebaut von TreeTech.',
      en: 'Example website for a car repair shop in Vienna: guide prices, online appointment request with plate number and preferred day. A made-up business built by TreeTech.',
      ru: 'Пример сайта для автомастерской в Вене: ориентировочные цены, онлайн-запись с номером машины и желаемым днём. Вымышленная фирма, сайт сделал TreeTech.'
    },
    theme: {
      background: '#f4f4f5',
      surface: '#ffffff',
      text: '#18181b',
      muted: '#52525b',
      primary: '#1f2328',
      accent: '#c8102e',
      hero: '#1f2328'
    },
    copy: deAsRu({
      de: {
        nav: ['Leistungen', 'Referenzen', 'Ablauf', 'Termin'],
        eyebrow: 'Kfz-Werkstatt in Wien Floridsdorf',
        title: 'Pickerl fällig? Termin in zwei Minuten.',
        lead: 'Service, Pickerl, Reifen und Reparaturen für alle Marken. Fixpreis vorher, das Auto meist am selben Tag zurück.',
        primaryCta: 'Jetzt anrufen',
        secondaryCta: 'Termin anfragen',
        stats: [
          {value: 'Alle Marken', label: 'Pkw und Kleintransporter'},
          {value: 'Fixpreis', label: 'bevor wir anfangen'},
          {value: 'Gleicher Tag', label: 'für Service und Pickerl'}
        ],
        introTitle: 'Sie wissen vorher, was es kostet.',
        introText: 'Wir rufen an, bevor wir etwas machen, das nicht vereinbart ist. Alte Teile bekommen Sie auf Wunsch zurück.',
        servicesTitle: 'Was wir für Sie machen',
        services: [
          {title: 'Pickerl (§57a)', text: 'Begutachtung im Haus. Kleine Mängel beheben wir gleich mit, damit Sie nicht zweimal kommen.'},
          {title: 'Service nach Herstellervorgabe', text: 'Ölservice und Inspektion. Die Herstellergarantie bleibt erhalten.'},
          {title: 'Reifen und Einlagerung', text: 'Wechseln, wuchten und einlagern. Termin meist in derselben Woche.'},
          {title: 'Reparatur und Diagnose', text: 'Bremsen, Kupplung, Fehlerspeicher. Immer mit Kostenvoranschlag.'}
        ],
        processTitle: 'So läuft es ab',
        process: [
          {title: 'Termin anfragen', text: 'Online oder per Telefon, mit Kennzeichen und Wunschtag.'},
          {title: 'Auto abgeben', text: 'In der Früh vorbeibringen. Wir rufen mit dem Fixpreis an.'},
          {title: 'Abholen', text: 'Meist am selben Tag. Rechnung und Servicebuch liegen im Auto.'}
        ],
        testimonial: 'Hier stehen auf Ihrer Website später Ihre echten Google-Bewertungen.',
        testimonialAuthor: 'Platz für Ihre Bewertungen',
        contactTitle: 'Termin anfragen',
        contactText: 'Kennzeichen, Wunschtag und Anliegen. Wir bestätigen den Termin am selben Werktag.',
        contactButton: 'Termin anfragen'
      },
      en: {
        nav: ['Services', 'References', 'Process', 'Appointment'],
        eyebrow: 'Car repair shop in Vienna Floridsdorf',
        title: 'MOT due? Book in two minutes.',
        lead: 'Service, roadworthiness test, tyres and repairs for every make. Fixed price upfront, car usually back the same day.',
        primaryCta: 'Call now',
        secondaryCta: 'Request an appointment',
        stats: [
          {value: 'All makes', label: 'cars and small vans'},
          {value: 'Fixed price', label: 'before we start'},
          {value: 'Same day', label: 'for service and MOT'}
        ],
        introTitle: 'You know the cost upfront.',
        introText: 'We call before doing anything that was not agreed. You get the old parts back if you want them.',
        servicesTitle: 'What we do for you',
        services: [
          {title: 'Roadworthiness test (§57a)', text: 'Tested in-house. We fix small defects right away so you do not have to come twice.'},
          {title: 'Manufacturer service', text: 'Oil service and inspection. Your manufacturer warranty stays valid.'},
          {title: 'Tyres and storage', text: 'Change, balance and store. Usually booked within the same week.'},
          {title: 'Repair and diagnostics', text: 'Brakes, clutch, fault memory. Always with a quote.'}
        ],
        processTitle: 'How it works',
        process: [
          {title: 'Request a slot', text: 'Online or by phone, with plate number and preferred day.'},
          {title: 'Drop off the car', text: 'Bring it in the morning. We call you with the fixed price.'},
          {title: 'Pick it up', text: 'Usually the same day. Invoice and service book are in the car.'}
        ],
        testimonial: 'Your real Google reviews will appear here on your website.',
        testimonialAuthor: 'Space for your reviews',
        contactTitle: 'Request an appointment',
        contactText: 'Plate number, preferred day and what you need. We confirm on the same working day.',
        contactButton: 'Request appointment'
      }
    }),
    handwerk: {
      icon: 'car',
      serviceIcons: ['shield', 'gauge', 'tire', 'wrench'],
      secondaryIcon: 'calendar',
      phone: '01 000 00 21',
      theme: {
        primary: '#1f2328',
        accent: '#c8102e',
        accentStrong: '#9b0c23',
        onDark: '#f5b942',
        footer: '#141619',
        background: '#f4f4f5',
        text: '#18181b',
        muted: '#52525b',
        border: '#e0e0e4',
        chip: '#ececef'
      },
      copy: deAsRu({
        de: {
          areaText: 'Unsere Kundschaft kommt vor allem aus',
          towns: ['Floridsdorf', 'Donaustadt', 'Brigittenau', 'Stammersdorf', 'Strebersdorf', 'Gerasdorf', 'Langenzersdorf'],
          hours: 'Mo bis Fr 7:30 bis 17:30 Uhr, Sa nach Vereinbarung',
          trust: ['§57a-Prüfstelle', 'Alle Marken', 'Ersatzauto auf Anfrage'],
          aside: {
            type: 'prices',
            title: 'Richtpreise',
            note: 'Endpreise inkl. MwSt. Den Fixpreis nennen wir, nachdem wir das Auto gesehen haben.',
            items: [
              {label: 'Pickerl-Begutachtung', price: 69},
              {label: 'Reifenwechsel', price: 39},
              {label: 'Klimaservice', price: 89},
              {label: 'Ölservice', price: 129}
            ]
          },
          form: {
            fields: [
              {label: 'Name'},
              {label: 'Telefon', type: 'tel'},
              {label: 'Kennzeichen', placeholder: 'z. B. W-12345A'},
              {label: 'Marke und Modell', placeholder: 'z. B. VW Golf, 2017'},
              {label: 'Wunschtermin', type: 'date'},
              {label: 'Anliegen', type: 'select', placeholder: 'Bitte wählen', options: ['Pickerl', 'Service', 'Reifen', 'Reparatur', 'Etwas anderes']},
              {label: 'Bemerkung', type: 'textarea', placeholder: 'z. B. Quietschen beim Bremsen', wide: true}
            ],
            photo: 'Foto vom Schaden (optional)'
          }
        },
        en: {
          areaText: 'Most of our customers come from',
          towns: ['Floridsdorf', 'Donaustadt', 'Brigittenau', 'Stammersdorf', 'Strebersdorf', 'Gerasdorf', 'Langenzersdorf'],
          hours: 'Mon to Fri 7:30am to 5:30pm, Sat by appointment',
          trust: ['Licensed §57a test centre', 'All makes', 'Courtesy car on request'],
          aside: {
            type: 'prices',
            title: 'Guide prices',
            note: 'Final prices incl. VAT. We confirm the fixed price once we have seen the car.',
            items: [
              {label: 'Roadworthiness test', price: 69},
              {label: 'Tyre change', price: 39},
              {label: 'Air-con service', price: 89},
              {label: 'Oil service', price: 129}
            ]
          },
          form: {
            fields: [
              {label: 'Name'},
              {label: 'Phone', type: 'tel'},
              {label: 'Plate number', placeholder: 'e.g. W-12345A'},
              {label: 'Make and model', placeholder: 'e.g. VW Golf, 2017'},
              {label: 'Preferred date', type: 'date'},
              {label: 'What do you need?', type: 'select', placeholder: 'Please choose', options: ['Roadworthiness test', 'Service', 'Tyres', 'Repair', 'Something else']},
              {label: 'Notes', type: 'textarea', placeholder: 'e.g. squeaking when braking', wide: true}
            ],
            photo: 'Photo of the damage (optional)'
          }
        }
      })
    }
  },
  {
    slug: 'tischlerei-gruber',
    brand: 'Tischlerei Gruber',
    location: 'Korneuburg',
    industry: {
      de: 'Tischlerei',
      en: 'Joinery',
      ru: 'Столярная мастерская'
    },
    metaTitle: {
      de: 'Tischlerei Gruber Beispiel-Website | TreeTech',
      en: 'Tischlerei Gruber example website | TreeTech',
      ru: 'Tischlerei Gruber, пример сайта | TreeTech'
    },
    metaDescription: {
      de: 'Beispiel-Website für eine Tischlerei in Korneuburg: Referenzgalerie, Anfrage mit Foto oder Skizze, Leistungen und Einsatzgebiet. Ein erfundener Betrieb, gebaut von TreeTech.',
      en: 'Example website for a joinery in Korneuburg: project gallery, inquiry with photo or sketch, services and service area. A made-up business built by TreeTech.',
      ru: 'Пример сайта для столярной мастерской в Корнойбурге: галерея работ, заявка с фото или эскизом, услуги и район работы. Вымышленная фирма, сайт сделал TreeTech.'
    },
    theme: {
      background: '#f7f3ec',
      surface: '#ffffff',
      text: '#241a12',
      muted: '#6b5a4a',
      primary: '#3b2a1e',
      accent: '#2f6b4f',
      hero: '#3b2a1e'
    },
    copy: deAsRu({
      de: {
        nav: ['Leistungen', 'Referenzen', 'Ablauf', 'Kontakt'],
        eyebrow: 'Tischlerei in Korneuburg und im Weinviertel',
        title: 'Möbel, die genau in Ihren Raum passen.',
        lead: 'Küchen, Einbauschränke und Möbel nach Maß. Geplant bei Ihnen zu Hause, gebaut in unserer Werkstatt, montiert von uns.',
        primaryCta: 'Jetzt anrufen',
        secondaryCta: 'Foto oder Skizze senden',
        stats: [
          {value: 'Seit 1978', label: 'Familienbetrieb in 3. Generation'},
          {value: '3D-Planung', label: 'kostenlos vor dem Auftrag'},
          {value: '8 Wochen', label: 'typische Lieferzeit für eine Küche'}
        ],
        introTitle: 'Vom ersten Maß bis zur letzten Schraube.',
        introText: 'Sie haben einen Ansprechpartner: den Tischler, der misst, plant und am Ende selbst montiert. Kein Callcenter, keine Subfirmen.',
        servicesTitle: 'Was wir für Sie bauen',
        services: [
          {title: 'Küchen nach Maß', text: 'Auch für Dachschrägen und Altbau. Mit Geräten Ihrer Wahl.'},
          {title: 'Einbauschränke', text: 'Nischen, Schrägen und Vorräume voll genutzt, bis unter die Decke.'},
          {title: 'Möbel und Innenausbau', text: 'Tische, Betten, Wandverkleidungen und Türen aus Eiche, Nuss oder Lärche.'},
          {title: 'Reparatur und Aufarbeitung', text: 'Alte Möbel und Holzfenster wieder schön machen, statt neu zu kaufen.'}
        ],
        processTitle: 'So entsteht Ihr Möbel',
        process: [
          {title: 'Aufmaß bei Ihnen', text: 'Wir kommen vorbei, messen genau und hören zu, was Sie brauchen.'},
          {title: 'Planung mit 3D-Ansicht', text: 'Sie sehen vorher, wie es aussieht, und bekommen einen Fixpreis.'},
          {title: 'Fertigung und Montage', text: 'In unserer Werkstatt gebaut und meist an einem Tag bei Ihnen montiert.'}
        ],
        testimonial: 'Hier stehen auf Ihrer Website später Ihre echten Google-Bewertungen.',
        testimonialAuthor: 'Platz für Ihre Bewertungen',
        contactTitle: 'Was planen Sie?',
        contactText: 'Ein Handyfoto vom Raum und ungefähre Maße reichen für eine erste Einschätzung.',
        contactButton: 'Anfrage senden'
      },
      en: {
        nav: ['Services', 'References', 'Process', 'Contact'],
        eyebrow: 'Joinery in Korneuburg and the Weinviertel',
        title: 'Furniture that fits your room exactly.',
        lead: 'Kitchens, fitted wardrobes and custom furniture. Planned in your home, built in our workshop, installed by us.',
        primaryCta: 'Call now',
        secondaryCta: 'Send a photo or sketch',
        stats: [
          {value: 'Since 1978', label: 'family business, third generation'},
          {value: '3D planning', label: 'free before you order'},
          {value: '8 weeks', label: 'typical lead time for a kitchen'}
        ],
        introTitle: 'From the first measurement to the last screw.',
        introText: 'You have one contact: the joiner who measures, plans and installs it himself. No call centre, no subcontractors.',
        servicesTitle: 'What we build for you',
        services: [
          {title: 'Custom kitchens', text: 'Also for sloped ceilings and old buildings. With the appliances you choose.'},
          {title: 'Fitted wardrobes', text: 'Niches, slopes and hallways fully used, right up to the ceiling.'},
          {title: 'Furniture and interiors', text: 'Tables, beds, wall panelling and doors in oak, walnut or larch.'},
          {title: 'Repair and restoration', text: 'Make old furniture and wooden windows beautiful again instead of buying new.'}
        ],
        processTitle: 'How your furniture is made',
        process: [
          {title: 'We measure at your place', text: 'We come by, measure precisely and listen to what you need.'},
          {title: 'Planning with a 3D view', text: 'You see how it will look and get a fixed price.'},
          {title: 'Build and install', text: 'Built in our workshop and usually installed in a single day.'}
        ],
        testimonial: 'Your real Google reviews will appear here on your website.',
        testimonialAuthor: 'Space for your reviews',
        contactTitle: 'What are you planning?',
        contactText: 'A phone photo of the room and rough measurements are enough for a first estimate.',
        contactButton: 'Send request'
      }
    }),
    business: {
      variant: 'editorial',
      illustration: 'kitchen',
      rating: '5,0',
      copy: deAsRu({
        de: {
          utility: 'Werkstatt und Schauraum in Korneuburg · Besichtigung nach Vereinbarung',
          heroBadges: ['Küche in Eiche unter der Dachschräge, Korneuburg', 'Planung kostenlos'],
          servicePages: [
            {
              slug: 'kuechen',
              intro: 'Eine Küche nach Maß nutzt jeden Zentimeter, auch unter Schrägen und in Altbauten mit schiefen Wänden. Sie wählen Holz, Fronten und Geräte, wir bauen sie passend.',
              bullets: ['Aufmaß und Beratung bei Ihnen zu Hause', '3D-Planung mit Fixpreis', 'Fronten in Massivholz, Furnier oder Lack', 'Montage und Geräteanschluss an einem Tag'],
              price: 'Küchen ab 12.000 €'
            },
            {
              slug: 'einbauschraenke',
              intro: 'Einbauschränke machen aus schwierigen Ecken Stauraum: Nischen, Schrägen, lange Vorräume. Bis unter die Decke, mit Schiebe- oder Drehtüren.',
              bullets: ['Millimetergenau für Ihren Raum', 'Innenausstattung nach Wunsch', 'Grifflose Fronten oder Griffleisten aus Holz', 'Lieferzeit rund 6 Wochen'],
              price: 'ab 1.800 € pro Laufmeter'
            },
            {
              slug: 'moebel-innenausbau',
              intro: 'Tische, Betten, Bänke, Wandverkleidungen und Türen aus heimischem Holz. Jedes Stück wird in unserer Werkstatt in Korneuburg gebaut.',
              bullets: ['Eiche, Nuss, Lärche und Zirbe aus Österreich', 'Geölte oder lackierte Oberflächen', 'Passend zu bestehenden Möbeln', 'Auch Einzelstücke und kleine Aufträge'],
              price: 'Esstisch ab 2.400 €'
            },
            {
              slug: 'reparatur-aufarbeitung',
              intro: 'Ein guter Tisch hält Generationen. Wir schleifen, ölen und reparieren alte Möbel und Holzfenster, statt sie wegzuwerfen.',
              bullets: ['Abholung und Lieferung im Bezirk', 'Kratzer, Wasserflecken und lose Verbindungen', 'Holzfenster abdichten und streichen', 'Ehrliche Einschätzung, ob es sich lohnt'],
              price: 'Kostenvoranschlag kostenlos'
            }
          ],
          beforeAfter: {
            title: 'Aus der alten Küche wird Ihre.',
            text: 'Schieben Sie den Regler: vorher die abgenutzte Einbauküche, nachher Eiche nach Maß. Auf Ihrer Website stehen hier Fotos Ihrer eigenen Projekte.'
          },
          about: {
            title: 'Drei Generationen, eine Werkstatt.',
            text: 'Großvater Gruber hat 1978 in Korneuburg angefangen. Heute arbeiten wir zu fünft, mit modernen Maschinen und demselben Anspruch: Möbel, die bleiben.',
            name: 'Lena Gruber',
            role: 'Tischlermeisterin, 3. Generation',
            quote: 'Wir bauen nichts, was wir nicht selbst montieren würden. Darum kommt der Tischler, der plant, auch zur Montage.'
          },
          reviews: [
            {name: 'Familie Berger', place: 'Stockerau', text: 'Die Küche passt perfekt unter die Schräge. Vom ersten Termin bis zur Montage genau so, wie besprochen.'},
            {name: 'Martin H.', place: 'Wien 21', text: 'Unser Nusstisch ist ein Traum. Man merkt, dass hier Menschen mit Liebe zum Holz arbeiten.'},
            {name: 'Claudia S.', place: 'Korneuburg', text: 'Alte Holzfenster aufgearbeitet statt getauscht. Günstiger und schöner, danke!'}
          ],
          locationsTitle: 'Zu Hause im Weinviertel.',
          locationsText: 'Für jeden Ort eine eigene Seite. So findet Sie, wer „Tischler Stockerau“ oder „Küche nach Maß Hollabrunn“ sucht.',
          locations: [
            {slug: 'korneuburg', name: 'Korneuburg', text: 'Hier steht unsere Werkstatt. Kommen Sie vorbei, sehen Sie Holzmuster und fertige Stücke und besprechen Sie Ihr Projekt am Werktisch.', travel: 'vor Ort'},
            {slug: 'stockerau', name: 'Stockerau', text: 'In Stockerau haben wir viele Küchen und Einbauschränke gebaut, vom Reihenhaus bis zur Altbauwohnung am Hauptplatz.', travel: 'ca. 15 Minuten'},
            {slug: 'hollabrunn', name: 'Hollabrunn', text: 'Auch in Hollabrunn und Umgebung messen, planen und montieren wir. Für größere Projekte kommen wir gerne mehrmals vorbei.', travel: 'ca. 30 Minuten'}
          ],
          faq: [
            {q: 'Was kostet eine Küche nach Maß?', a: 'Eine kleine Küche beginnt bei etwa 12.000 €, je nach Holz, Fronten und Geräten. Nach dem Aufmaß bekommen Sie einen Fixpreis.'},
            {q: 'Wie lange dauert es?', a: 'Von der Planung bis zur Montage rechnen Sie bei einer Küche mit etwa acht Wochen, bei Einbauschränken mit sechs.'},
            {q: 'Kann ich die Werkstatt besichtigen?', a: 'Gerne. Vereinbaren Sie einen Termin und sehen Sie Holzmuster, Oberflächen und Stücke, an denen wir gerade arbeiten.'},
            {q: 'Bauen Sie auch alte Geräte ein?', a: 'Ja, wenn sie noch gut sind. Wir planen die Küche um Ihre Geräte herum oder beraten beim Neukauf.'}
          ],
          steps: {
            topic: 'Was planen Sie?',
            topics: ['Küche', 'Einbauschrank', 'Möbel oder Innenausbau', 'Reparatur'],
            when: 'Wann soll es fertig sein?',
            whens: ['In 2 Monaten', 'Dieses Jahr', 'Noch offen']
          },
          hours: [
            ['Mo bis Do', '7 bis 16 Uhr'],
            ['Freitag', '7 bis 12 Uhr'],
            ['Schauraum', 'nach Vereinbarung']
          ]
        },
        en: {
          utility: 'Workshop and showroom in Korneuburg · visits by appointment',
          heroBadges: ['Oak kitchen under a sloped ceiling, Korneuburg', 'Free planning'],
          servicePages: [
            {
              slug: 'kuechen',
              intro: 'A custom kitchen uses every centimetre, even under slopes and in old buildings with crooked walls. You choose wood, fronts and appliances; we build it to fit.',
              bullets: ['Measuring and advice in your home', '3D planning with a fixed price', 'Fronts in solid wood, veneer or lacquer', 'Installation and appliance hook-up in one day'],
              price: 'Kitchens from €12,000'
            },
            {
              slug: 'einbauschraenke',
              intro: 'Fitted wardrobes turn awkward corners into storage: niches, slopes, long hallways. Up to the ceiling, with sliding or hinged doors.',
              bullets: ['Made to the millimetre for your room', 'Interior fittings as you like', 'Handleless fronts or wooden grips', 'Lead time around 6 weeks'],
              price: 'from €1,800 per running metre'
            },
            {
              slug: 'moebel-innenausbau',
              intro: 'Tables, beds, benches, wall panelling and doors in local timber. Every piece is built in our Korneuburg workshop.',
              bullets: ['Oak, walnut, larch and stone pine from Austria', 'Oiled or lacquered finishes', 'Matching your existing furniture', 'One-off pieces and small jobs welcome'],
              price: 'Dining table from €2,400'
            },
            {
              slug: 'reparatur-aufarbeitung',
              intro: 'A good table lasts generations. We sand, oil and repair old furniture and wooden windows instead of throwing them away.',
              bullets: ['Pick-up and delivery in the district', 'Scratches, water marks and loose joints', 'Sealing and painting wooden windows', 'Honest advice on whether it is worth it'],
              price: 'Free quote'
            }
          ],
          beforeAfter: {
            title: 'Your old kitchen becomes yours.',
            text: 'Move the slider: before, the worn fitted kitchen; after, custom oak. On your website this is where photos of your own projects go.'
          },
          about: {
            title: 'Three generations, one workshop.',
            text: 'Grandfather Gruber started in Korneuburg in 1978. Today we are five, with modern machines and the same standard: furniture that lasts.',
            name: 'Lena Gruber',
            role: 'Master joiner, third generation',
            quote: 'We never build anything we would not install ourselves. That is why the joiner who plans it also comes to install it.'
          },
          reviews: [
            {name: 'The Berger family', place: 'Stockerau', text: 'The kitchen fits perfectly under the slope. From the first visit to installation exactly as discussed.'},
            {name: 'Martin H.', place: 'Vienna 21', text: 'Our walnut table is a dream. You can tell these people love wood.'},
            {name: 'Claudia S.', place: 'Korneuburg', text: 'Old wooden windows restored instead of replaced. Cheaper and more beautiful, thank you!'}
          ],
          locationsTitle: 'At home in the Weinviertel.',
          locationsText: 'One page per town. That is how people searching for “joiner Stockerau” or “custom kitchen Hollabrunn” find you.',
          locations: [
            {slug: 'korneuburg', name: 'Korneuburg', text: 'Our workshop is here. Drop by, see wood samples and finished pieces, and talk about your project at the workbench.', travel: 'on site'},
            {slug: 'stockerau', name: 'Stockerau', text: 'We have built many kitchens and wardrobes in Stockerau, from terraced houses to period flats on the main square.', travel: 'about 15 minutes'},
            {slug: 'hollabrunn', name: 'Hollabrunn', text: 'We measure, plan and install in Hollabrunn and the surrounding area too. For larger projects we are happy to visit several times.', travel: 'about 30 minutes'}
          ],
          faq: [
            {q: 'What does a custom kitchen cost?', a: 'A small kitchen starts at about €12,000, depending on wood, fronts and appliances. After measuring you get a fixed price.'},
            {q: 'How long does it take?', a: 'From planning to installation expect about eight weeks for a kitchen and six for fitted wardrobes.'},
            {q: 'Can I visit the workshop?', a: 'Of course. Book a time and see wood samples, finishes and pieces we are working on.'},
            {q: 'Can you fit my existing appliances?', a: 'Yes, if they are still good. We plan the kitchen around them or advise you on buying new.'}
          ],
          steps: {
            topic: 'What are you planning?',
            topics: ['Kitchen', 'Fitted wardrobe', 'Furniture or interior', 'Repair'],
            when: 'When should it be ready?',
            whens: ['In 2 months', 'This year', 'Not sure yet']
          },
          hours: [
            ['Mon to Thu', '7am to 4pm'],
            ['Friday', '7am to 12pm'],
            ['Showroom', 'by appointment']
          ]
        }
      })
    },
    handwerk: {
      icon: 'hammer',
      serviceIcons: ['kitchen', 'layers', 'sofa', 'ruler'],
      phone: '02262 000 000',
      theme: {
        primary: '#3b2a1e',
        accent: '#2f6b4f',
        accentStrong: '#245540',
        onDark: '#e8c99b',
        footer: '#2a1d14',
        background: '#f7f3ec',
        text: '#241a12',
        muted: '#6b5a4a',
        border: '#e4d9c8',
        chip: '#efe6d8'
      },
      copy: deAsRu({
        de: {
          areaText: 'Wir planen und montieren in',
          towns: ['Korneuburg', 'Stockerau', 'Bisamberg', 'Langenzersdorf', 'Leobendorf', 'Hollabrunn', 'Wien Floridsdorf'],
          hours: 'Mo bis Do 7 bis 16 Uhr, Fr 7 bis 12 Uhr',
          trust: ['Eigene Werkstatt', 'Heimische Hölzer', 'Montage durch unser Team'],
          gallery: {
            title: 'Aus unserer Werkstatt',
            text: 'Auf Ihrer Website stehen hier Fotos Ihrer eigenen Arbeiten.',
            photoLabel: 'Ihr Foto',
            items: [
              {title: 'Küche in Eiche', meta: 'Korneuburg, Altbau mit Dachschräge'},
              {title: 'Einbauschrank im Vorraum', meta: 'Stockerau, 4,1 m bis unter die Decke'},
              {title: 'Esstisch aus Nuss', meta: 'Wien 21, für zehn Personen'}
            ]
          },
          form: {
            fields: [
              {label: 'Name'},
              {label: 'Telefon oder E-Mail'},
              {label: 'Ort'},
              {label: 'Was planen Sie?', type: 'select', placeholder: 'Bitte wählen', options: ['Küche', 'Einbauschrank', 'Möbel', 'Innenausbau', 'Reparatur']},
              {label: 'Raum und ungefähre Maße', type: 'textarea', placeholder: 'z. B. Dachschräge im Schlafzimmer, 3,2 m breit', wide: true}
            ],
            photo: 'Foto oder Skizze hinzufügen'
          }
        },
        en: {
          areaText: 'We plan and install in',
          towns: ['Korneuburg', 'Stockerau', 'Bisamberg', 'Langenzersdorf', 'Leobendorf', 'Hollabrunn', 'Vienna Floridsdorf'],
          hours: 'Mon to Thu 7am to 4pm, Fri 7am to 12pm',
          trust: ['Our own workshop', 'Local timber', 'Installed by our team'],
          gallery: {
            title: 'From our workshop',
            text: 'On your website this is where photos of your own work go.',
            photoLabel: 'Your photo',
            items: [
              {title: 'Oak kitchen', meta: 'Korneuburg, old building with sloped ceiling'},
              {title: 'Hallway wardrobe', meta: 'Stockerau, 4.1 m up to the ceiling'},
              {title: 'Walnut dining table', meta: 'Vienna 21, seats ten'}
            ]
          },
          form: {
            fields: [
              {label: 'Name'},
              {label: 'Phone or email'},
              {label: 'Town'},
              {label: 'What are you planning?', type: 'select', placeholder: 'Please choose', options: ['Kitchen', 'Fitted wardrobe', 'Furniture', 'Interior fit-out', 'Repair']},
              {label: 'Room and rough measurements', type: 'textarea', placeholder: 'e.g. sloped ceiling in the bedroom, 3.2 m wide', wide: true}
            ],
            photo: 'Add a photo or sketch'
          }
        }
      })
    }
  },
  {
    slug: 'malerei-steiner',
    brand: 'Malerei Steiner',
    location: 'Wien Donaustadt',
    industry: {
      de: 'Maler und Anstreicher',
      en: 'Painter and decorator',
      ru: 'Маляр'
    },
    metaTitle: {
      de: 'Malerei Steiner Beispiel-Website | TreeTech',
      en: 'Malerei Steiner example website | TreeTech',
      ru: 'Malerei Steiner, пример сайта | TreeTech'
    },
    metaDescription: {
      de: 'Beispiel-Website für einen Malerbetrieb in Wien: Richtpreis-Rechner, Anfrage mit Fotos, Leistungen und Einsatzgebiet. Ein erfundener Betrieb, gebaut von TreeTech.',
      en: 'Example website for a painter in Vienna: price estimator, inquiry with photos, services and service area. A made-up business built by TreeTech.',
      ru: 'Пример сайта для малярной фирмы в Вене: калькулятор цены, заявка с фото, услуги и район выезда. Вымышленная фирма, сайт сделал TreeTech.'
    },
    theme: {
      background: '#f6f6f9',
      surface: '#ffffff',
      text: '#1c1d29',
      muted: '#575a6e',
      primary: '#2b2d42',
      accent: '#2563eb',
      hero: '#2b2d42'
    },
    copy: deAsRu({
      de: {
        nav: ['Leistungen', 'Referenzen', 'Ablauf', 'Kontakt'],
        eyebrow: 'Maler und Anstreicher in Wien Donaustadt',
        title: 'Frisch ausgemalt, ohne Chaos in der Wohnung.',
        lead: 'Wohnungen, Stiegenhäuser und Fassaden. Wir decken ab, rücken die Möbel und hinterlassen alles besenrein.',
        primaryCta: 'Jetzt anrufen',
        secondaryCta: 'Fotos der Räume senden',
        stats: [
          {value: '20 Jahre', label: 'Meisterbetrieb'},
          {value: 'Fixpreis', label: 'nach kurzer Besichtigung'},
          {value: '2 Wochen', label: 'typische Wartezeit'}
        ],
        introTitle: 'Pünktlich, sauber, zum vereinbarten Preis.',
        introText: 'Sie bekommen einen Fixpreis und einen fixen Termin. Wenn wir gehen, steht jedes Möbelstück wieder an seinem Platz.',
        servicesTitle: 'Was wir für Sie machen',
        services: [
          {title: 'Wohnung ausmalen', text: 'Wände und Decken, auch kurzfristig vor dem Ein- oder Auszug.'},
          {title: 'Lackieren', text: 'Türen, Fenster, Heizkörper und Geländer wie neu.'},
          {title: 'Spachteln und Tapezieren', text: 'Glatte Wände, Risse saniert, Vliestapeten sauber verklebt.'},
          {title: 'Fassade und Stiegenhaus', text: 'Für Häuser und Hausverwaltungen, mit Gerüst und Genehmigung.'}
        ],
        processTitle: 'So einfach geht es',
        process: [
          {title: 'Fotos schicken', text: 'Ein paar Handyfotos und die Wohnfläche reichen für einen ersten Richtpreis.'},
          {title: 'Besichtigung und Fixpreis', text: 'Wir kommen kurz vorbei und nennen den fixen Preis und Termin.'},
          {title: 'Ausmalen und aufräumen', text: 'Abdecken, malen, Möbel zurück. Sie kommen in eine fertige Wohnung.'}
        ],
        testimonial: 'Hier stehen auf Ihrer Website später Ihre echten Google-Bewertungen.',
        testimonialAuthor: 'Platz für Ihre Bewertungen',
        contactTitle: 'Welche Räume sollen neu werden?',
        contactText: 'Schicken Sie Fotos und die ungefähre Fläche. Wir melden uns innerhalb eines Werktags.',
        contactButton: 'Anfrage senden'
      },
      en: {
        nav: ['Services', 'References', 'Process', 'Contact'],
        eyebrow: 'Painter and decorator in Vienna Donaustadt',
        title: 'Freshly painted, without chaos in your flat.',
        lead: 'Flats, stairwells and façades. We cover everything, move the furniture and leave the place swept clean.',
        primaryCta: 'Call now',
        secondaryCta: 'Send photos of the rooms',
        stats: [
          {value: '20 years', label: 'master business'},
          {value: 'Fixed price', label: 'after a short visit'},
          {value: '2 weeks', label: 'typical waiting time'}
        ],
        introTitle: 'On time, clean, at the agreed price.',
        introText: 'You get a fixed price and a fixed date. When we leave, every piece of furniture is back in its place.',
        servicesTitle: 'What we do for you',
        services: [
          {title: 'Painting flats', text: 'Walls and ceilings, also at short notice before moving in or out.'},
          {title: 'Lacquering', text: 'Doors, windows, radiators and railings like new.'},
          {title: 'Filling and wallpapering', text: 'Smooth walls, cracks repaired, wallpaper hung cleanly.'},
          {title: 'Façades and stairwells', text: 'For houses and property managers, with scaffolding and permits.'}
        ],
        processTitle: 'Simple as that',
        process: [
          {title: 'Send photos', text: 'A few phone photos and the floor area are enough for a first guide price.'},
          {title: 'Visit and fixed price', text: 'We come by briefly and name the fixed price and date.'},
          {title: 'Paint and tidy up', text: 'Cover, paint, furniture back. You come home to a finished flat.'}
        ],
        testimonial: 'Your real Google reviews will appear here on your website.',
        testimonialAuthor: 'Space for your reviews',
        contactTitle: 'Which rooms need a refresh?',
        contactText: 'Send photos and the rough floor area. We get back to you within one working day.',
        contactButton: 'Send request'
      }
    }),
    handwerk: {
      icon: 'roller',
      serviceIcons: ['roller', 'brush', 'layers', 'house'],
      phone: '01 000 00 22',
      theme: {
        primary: '#2b2d42',
        accent: '#2563eb',
        accentStrong: '#1d4ed8',
        onDark: '#fde68a',
        footer: '#1d1e2c',
        background: '#f6f6f9',
        text: '#1c1d29',
        muted: '#575a6e',
        border: '#e0e1e9',
        chip: '#ebecf3'
      },
      copy: deAsRu({
        de: {
          areaText: 'Wir malen vor allem in',
          towns: ['Donaustadt', 'Floridsdorf', 'Leopoldstadt', 'Brigittenau', 'Landstraße', 'Groß-Enzersdorf', 'Raasdorf'],
          hours: 'Mo bis Fr 7 bis 17 Uhr',
          trust: ['Meisterbetrieb', 'Abdecken und Möbelrücken inklusive', 'Fixer Termin'],
          aside: {
            type: 'calculator',
            title: 'Was kostet das Ausmalen?',
            label: 'Wohnfläche',
            unit: 'm²',
            min: 30,
            max: 150,
            step: 5,
            defaultValue: 70,
            rateLow: 9,
            rateHigh: 13,
            resultLabel: 'Richtwert inkl. Material und Abdecken',
            note: 'Unverbindlich. Den Fixpreis bekommen Sie nach einer kurzen Besichtigung.'
          },
          form: {
            fields: [
              {label: 'Name'},
              {label: 'Telefon', type: 'tel'},
              {label: 'Adresse und Bezirk'},
              {label: 'Wohnfläche ungefähr', placeholder: 'z. B. 70 m²'},
              {label: 'Was soll gemacht werden?', type: 'textarea', placeholder: 'z. B. 3 Zimmer ausmalen, Decken weiß, eine Wand farbig', wide: true}
            ],
            photo: 'Fotos hinzufügen'
          }
        },
        en: {
          areaText: 'We mostly work in',
          towns: ['Donaustadt', 'Floridsdorf', 'Leopoldstadt', 'Brigittenau', 'Landstraße', 'Groß-Enzersdorf', 'Raasdorf'],
          hours: 'Mon to Fri 7am to 5pm',
          trust: ['Master business', 'Covering and moving furniture included', 'Fixed date'],
          aside: {
            type: 'calculator',
            title: 'What does painting cost?',
            label: 'Floor area',
            unit: 'm²',
            min: 30,
            max: 150,
            step: 5,
            defaultValue: 70,
            rateLow: 9,
            rateHigh: 13,
            resultLabel: 'Guide price incl. materials and covering',
            note: 'Non-binding. You get the fixed price after a short visit.'
          },
          form: {
            fields: [
              {label: 'Name'},
              {label: 'Phone', type: 'tel'},
              {label: 'Address and district'},
              {label: 'Approximate floor area', placeholder: 'e.g. 70 m²'},
              {label: 'What should be done?', type: 'textarea', placeholder: 'e.g. paint 3 rooms, white ceilings, one coloured wall', wide: true}
            ],
            photo: 'Add photos'
          }
        }
      })
    }
  },
  {
    slug: 'dach-hofer',
    brand: 'Dach Hofer',
    location: 'Klosterneuburg',
    industry: {
      de: 'Dachdecker und Spengler',
      en: 'Roofer and tinsmith',
      ru: 'Кровельщик и жестянщик'
    },
    metaTitle: {
      de: 'Dach Hofer Beispiel-Website | TreeTech',
      en: 'Dach Hofer example website | TreeTech',
      ru: 'Dach Hofer, пример сайта | TreeTech'
    },
    metaDescription: {
      de: 'Beispiel-Website für einen Dachdecker in Klosterneuburg: Sturmschaden-Hinweis, Anfrage mit Foto und Dringlichkeit, Referenzen. Ein erfundener Betrieb, gebaut von TreeTech.',
      en: 'Example website for a roofer in Klosterneuburg: storm damage notice, inquiry with photo and urgency, references. A made-up business built by TreeTech.',
      ru: 'Пример сайта для кровельщика в Клостернойбурге: срочный выезд после бури, заявка с фото и срочностью, примеры работ. Вымышленная фирма, сайт сделал TreeTech.'
    },
    theme: {
      background: '#f5f5f3',
      surface: '#ffffff',
      text: '#1d2223',
      muted: '#596163',
      primary: '#2d3436',
      accent: '#b4531f',
      hero: '#2d3436'
    },
    copy: deAsRu({
      de: {
        nav: ['Leistungen', 'Referenzen', 'Ablauf', 'Kontakt'],
        eyebrow: 'Dachdecker und Spengler in Klosterneuburg',
        title: 'Dach undicht? Wir schauen es uns heute an.',
        lead: 'Reparatur, Sanierung und Spenglerarbeiten im Bezirk Tulln und im Norden von Wien. Mit Fotos vom Dach, damit Sie sehen, was wir sehen.',
        primaryCta: 'Jetzt anrufen',
        secondaryCta: 'Foto vom Schaden senden',
        stats: [
          {value: 'Gleicher Tag', label: 'Notsicherung bei Sturm'},
          {value: 'Fotobericht', label: 'für Sie und die Versicherung'},
          {value: '10 Jahre', label: 'Garantie auf Neueindeckung'}
        ],
        introTitle: 'Sie sehen, was am Dach los ist.',
        introText: 'Wir fotografieren jede Stelle und erklären, was dringend ist und was warten kann. So entscheiden Sie selbst.',
        servicesTitle: 'Was wir für Sie machen',
        services: [
          {title: 'Sturmschaden und Notdienst', text: 'Ziegel verrutscht, Blech lose: Wir sichern das Dach sofort.'},
          {title: 'Dachsanierung', text: 'Neueindeckung mit Dämmung, auf Wunsch mit Förderantrag.'},
          {title: 'Spenglerarbeiten', text: 'Dachrinnen, Kamineinfassungen und Blechdächer aus Kupfer oder Zink.'},
          {title: 'Dach-Check und Wartung', text: 'Jährliche Kontrolle mit Fotobericht, bevor kleine Schäden teuer werden.'}
        ],
        processTitle: 'So läuft es ab',
        process: [
          {title: 'Anrufen oder Foto schicken', text: 'Ein Foto vom Fleck an der Decke oder vom Dach hilft schon weiter.'},
          {title: 'Besichtigung mit Fotobericht', text: 'Wir steigen aufs Dach und zeigen Ihnen jede Stelle auf Fotos.'},
          {title: 'Reparatur zum Fixpreis', text: 'Sie bekommen ein klares Angebot. Altmaterial nehmen wir mit.'}
        ],
        testimonial: 'Hier stehen auf Ihrer Website später Ihre echten Google-Bewertungen.',
        testimonialAuthor: 'Platz für Ihre Bewertungen',
        contactTitle: 'Wo ist das Problem?',
        contactText: 'Schicken Sie ein Foto und Ihre Adresse. Bei Sturmschaden rufen wir am selben Tag zurück.',
        contactButton: 'Anfrage senden'
      },
      en: {
        nav: ['Services', 'References', 'Process', 'Contact'],
        eyebrow: 'Roofer and tinsmith in Klosterneuburg',
        title: 'Roof leaking? We look at it today.',
        lead: 'Repairs, renovation and sheet metal work in the Tulln district and the north of Vienna. With photos of the roof, so you see what we see.',
        primaryCta: 'Call now',
        secondaryCta: 'Send a photo of the damage',
        stats: [
          {value: 'Same day', label: 'emergency cover after storms'},
          {value: 'Photo report', label: 'for you and your insurer'},
          {value: '10 years', label: 'warranty on a new roof'}
        ],
        introTitle: 'You see what is going on up there.',
        introText: 'We photograph every spot and explain what is urgent and what can wait. So you decide yourself.',
        servicesTitle: 'What we do for you',
        services: [
          {title: 'Storm damage and emergencies', text: 'Tiles slipped, metal loose: we secure the roof right away.'},
          {title: 'Roof renovation', text: 'New roofing with insulation, with a subsidy application if you like.'},
          {title: 'Sheet metal work', text: 'Gutters, chimney flashing and metal roofs in copper or zinc.'},
          {title: 'Roof check and maintenance', text: 'Yearly inspection with a photo report, before small damage gets expensive.'}
        ],
        processTitle: 'How it works',
        process: [
          {title: 'Call or send a photo', text: 'A photo of the stain on the ceiling or of the roof already helps.'},
          {title: 'Inspection with photo report', text: 'We climb up and show you every spot in photos.'},
          {title: 'Repair at a fixed price', text: 'You get a clear quote. We take the old material with us.'}
        ],
        testimonial: 'Your real Google reviews will appear here on your website.',
        testimonialAuthor: 'Space for your reviews',
        contactTitle: 'Where is the problem?',
        contactText: 'Send a photo and your address. For storm damage we call back the same day.',
        contactButton: 'Send request'
      }
    }),
    business: {
      variant: 'bold',
      illustration: 'roof',
      rating: '4,8',
      copy: deAsRu({
        de: {
          utility: 'Sturmschaden? Notsicherung noch am selben Tag · 02243 000 000',
          heroBadges: ['Neueindeckung in Klosterneuburg', 'über 600 Dächer im Bezirk Tulln'],
          servicePages: [
            {
              slug: 'sturmschaden',
              intro: 'Nach einem Sturm zählt jede Stunde. Wir sichern lose Ziegel und offene Stellen noch am selben Tag und dokumentieren alles für Ihre Versicherung.',
              bullets: ['Notsicherung mit Plane oder Ersatzziegeln', 'Fotobericht für die Versicherung', 'Reparatur zum Fixpreis danach', 'Bei Sturm auch am Wochenende im Einsatz'],
              price: 'Notsicherung ab 290 €'
            },
            {
              slug: 'dachsanierung',
              intro: 'Ein neues Dach mit guter Dämmung spart Heizkosten und hält Jahrzehnte. Wir decken neu, dämmen und kümmern uns um den Förderantrag.',
              bullets: ['Ziegel, Betondachstein oder Blech', 'Aufsparrendämmung nach aktuellem Standard', 'Förderberatung und Antrag', '10 Jahre Garantie auf die Neueindeckung'],
              price: 'ab 180 € pro m²'
            },
            {
              slug: 'spenglerarbeiten',
              intro: 'Dachrinnen, Kamineinfassungen, Gaupen und Blechdächer aus Kupfer, Zink oder Aluminium. Gefertigt in unserer eigenen Spenglerei.',
              bullets: ['Dachrinnen und Fallrohre tauschen', 'Kamin- und Gaupeneinfassungen', 'Stehfalzdächer aus Kupfer und Zink', 'Reinigung und Laubschutz'],
              price: 'Dachrinne ab 65 € pro Meter'
            },
            {
              slug: 'dach-check',
              intro: 'Kleine Schäden werden teuer, wenn man sie nicht sieht. Beim Dach-Check prüfen wir jede Stelle und schicken Ihnen einen Fotobericht.',
              bullets: ['Kontrolle von Ziegeln, Rinnen und Einfassungen', 'Fotobericht mit Empfehlung', 'Kleine Reparaturen gleich vor Ort', 'Jährliche Erinnerung auf Wunsch'],
              price: 'Dach-Check 149 €'
            }
          ],
          beforeAfter: {
            title: 'Vorher, nachher.',
            text: 'Fehlende Ziegel, rostige Rinne, undichter Kamin. Und dasselbe Dach nach der Sanierung. Auf Ihrer Website stehen hier Ihre eigenen Fotos.'
          },
          about: {
            title: 'Dachdecker und Spengler unter einem Dach.',
            text: 'Seit 1996 in Klosterneuburg. Zwölf Leute, eigene Spenglerei, eigene Gerüste. So sind wir schnell und brauchen keine Subfirmen.',
            name: 'Georg Hofer',
            role: 'Dachdecker- und Spenglermeister',
            quote: 'Ich zeige jedem Kunden Fotos vom eigenen Dach. Erst wenn Sie sehen, was los ist, entscheiden Sie.'
          },
          reviews: [
            {name: 'Andreas P.', place: 'Klosterneuburg', text: 'Nach dem Sturm am Samstag angerufen, am Nachmittag war das Dach gesichert. Top!'},
            {name: 'Elisabeth R.', place: 'Tulln', text: 'Neues Dach mit Dämmung, Förderung inklusive. Alles termingerecht und sauber.'},
            {name: 'Hausverwaltung Mayr', place: 'Wien 19', text: 'Zuverlässig, Fotoberichte nach jedem Einsatz. So soll das sein.'}
          ],
          locationsTitle: 'Im Bezirk Tulln und im Norden von Wien.',
          locationsText: 'Eigene Seiten für die wichtigsten Orte. So werden Sie bei „Dachdecker Tulln“ gefunden.',
          locations: [
            {slug: 'klosterneuburg', name: 'Klosterneuburg', text: 'Hier sind Werkstatt und Lager. Bei Sturmschaden in Klosterneuburg, Kierling oder Kritzendorf sind wir meist innerhalb von zwei Stunden am Dach.', travel: 'ca. 20 Minuten'},
            {slug: 'tulln', name: 'Tulln', text: 'In Tulln und Umgebung sanieren wir viele Einfamilienhäuser und betreuen landwirtschaftliche Gebäude mit großen Dachflächen.', travel: 'ca. 35 Minuten'},
            {slug: 'wien-doebling', name: 'Wien Döbling', text: 'Villen und Gründerzeithäuser in Döbling brauchen Erfahrung mit Kupfer, Gaupen und Denkmalschutz. Wir haben beides.', travel: 'ca. 25 Minuten'}
          ],
          faq: [
            {q: 'Zahlt die Versicherung den Sturmschaden?', a: 'In vielen Fällen ja. Wir machen Fotos, beschreiben den Schaden und schicken Ihnen alles für die Meldung an die Versicherung.'},
            {q: 'Was kostet ein neues Dach?', a: 'Für ein Einfamilienhaus rechnen Sie mit 180 bis 260 € pro m², je nach Material und Dämmung. Nach der Besichtigung bekommen Sie einen Fixpreis.'},
            {q: 'Gibt es Förderungen?', a: 'Für die Dämmung gibt es Förderungen von Bund und Land Niederösterreich. Wir beraten Sie und helfen beim Antrag.'},
            {q: 'Wie schnell kommen Sie?', a: 'Bei Sturmschaden am selben Tag. Für Besichtigungen und Angebote meist innerhalb einer Woche.'}
          ],
          steps: {
            topic: 'Worum geht es?',
            topics: ['Sturmschaden', 'Undichte Stelle', 'Dachrinne oder Spengler', 'Sanierung oder Dach-Check'],
            when: 'Wie dringend ist es?',
            whens: ['Heute, es regnet rein', 'Diese Woche', 'Hat Zeit']
          },
          hours: [
            ['Mo bis Fr', '7 bis 17 Uhr'],
            ['Samstag', 'bei Sturm'],
            ['Notsicherung', 'am selben Tag']
          ]
        },
        en: {
          utility: 'Storm damage? Emergency cover the same day · 02243 000 000',
          heroBadges: ['New roof in Klosterneuburg', 'over 600 roofs in the Tulln district'],
          servicePages: [
            {
              slug: 'sturmschaden',
              intro: 'After a storm every hour counts. We secure loose tiles and open spots the same day and document everything for your insurer.',
              bullets: ['Emergency cover with tarp or spare tiles', 'Photo report for your insurer', 'Repair at a fixed price afterwards', 'Out at weekends after storms'],
              price: 'Emergency cover from €290'
            },
            {
              slug: 'dachsanierung',
              intro: 'A new roof with good insulation saves heating costs and lasts decades. We re-roof, insulate and handle the subsidy application.',
              bullets: ['Clay tiles, concrete tiles or metal', 'Insulation to current standards', 'Subsidy advice and application', '10-year warranty on new roofing'],
              price: 'from €180 per m²'
            },
            {
              slug: 'spenglerarbeiten',
              intro: 'Gutters, chimney flashing, dormers and metal roofs in copper, zinc or aluminium. Made in our own sheet metal shop.',
              bullets: ['Replacing gutters and downpipes', 'Chimney and dormer flashing', 'Standing seam roofs in copper and zinc', 'Cleaning and leaf guards'],
              price: 'Gutter from €65 per metre'
            },
            {
              slug: 'dach-check',
              intro: 'Small damage gets expensive when nobody sees it. In a roof check we inspect every spot and send you a photo report.',
              bullets: ['Checking tiles, gutters and flashing', 'Photo report with recommendations', 'Small repairs on the spot', 'Yearly reminder on request'],
              price: 'Roof check €149'
            }
          ],
          beforeAfter: {
            title: 'Before and after.',
            text: 'Missing tiles, a rusty gutter, a leaking chimney. And the same roof after renovation. On your website your own photos go here.'
          },
          about: {
            title: 'Roofers and tinsmiths under one roof.',
            text: 'In Klosterneuburg since 1996. Twelve people, our own sheet metal shop, our own scaffolding. That keeps us fast and free of subcontractors.',
            name: 'Georg Hofer',
            role: 'Master roofer and tinsmith',
            quote: 'I show every customer photos of their own roof. Only when you see what is going on do you decide.'
          },
          reviews: [
            {name: 'Andreas P.', place: 'Klosterneuburg', text: 'Called after the storm on Saturday, by the afternoon the roof was secured. Excellent!'},
            {name: 'Elisabeth R.', place: 'Tulln', text: 'New roof with insulation, subsidy included. Everything on time and clean.'},
            {name: 'Mayr property management', place: 'Vienna 19', text: 'Reliable, photo reports after every job. That is how it should be.'}
          ],
          locationsTitle: 'In the Tulln district and north Vienna.',
          locationsText: 'Separate pages for the key towns. That is how you get found for “roofer Tulln”.',
          locations: [
            {slug: 'klosterneuburg', name: 'Klosterneuburg', text: 'Our workshop and yard are here. After storms in Klosterneuburg, Kierling or Kritzendorf we are usually on the roof within two hours.', travel: 'about 20 minutes'},
            {slug: 'tulln', name: 'Tulln', text: 'In and around Tulln we renovate many family homes and look after farm buildings with large roof areas.', travel: 'about 35 minutes'},
            {slug: 'wien-doebling', name: 'Vienna Döbling', text: 'Villas and period buildings in Döbling need experience with copper, dormers and heritage rules. We have both.', travel: 'about 25 minutes'}
          ],
          faq: [
            {q: 'Does insurance pay for storm damage?', a: 'In many cases yes. We take photos, describe the damage and send you everything for your claim.'},
            {q: 'What does a new roof cost?', a: 'For a family home expect €180 to €260 per m², depending on material and insulation. After the inspection you get a fixed price.'},
            {q: 'Are there subsidies?', a: 'Insulation is subsidised by the federal government and Lower Austria. We advise you and help with the application.'},
            {q: 'How fast can you come?', a: 'For storm damage the same day. For inspections and quotes usually within a week.'}
          ],
          steps: {
            topic: 'What is it about?',
            topics: ['Storm damage', 'Leak', 'Gutter or sheet metal', 'Renovation or roof check'],
            when: 'How urgent is it?',
            whens: ['Today, water is coming in', 'This week', 'No rush']
          },
          hours: [
            ['Mon to Fri', '7am to 5pm'],
            ['Saturday', 'after storms'],
            ['Emergency cover', 'same day']
          ]
        }
      })
    },
    handwerk: {
      icon: 'house',
      serviceIcons: ['storm', 'house', 'droplets', 'shield'],
      phone: '02243 000 000',
      theme: {
        primary: '#2d3436',
        accent: '#b4531f',
        accentStrong: '#8f3f15',
        onDark: '#f0b48a',
        footer: '#1f2526',
        background: '#f5f5f3',
        text: '#1d2223',
        muted: '#596163',
        border: '#dfe1de',
        chip: '#ebece8'
      },
      copy: deAsRu({
        de: {
          areaText: 'Wir sind schnell bei Ihnen in',
          towns: ['Klosterneuburg', 'Kierling', 'Kritzendorf', 'Tulln', 'Purkersdorf', 'Wien Döbling', 'Wien Floridsdorf'],
          hours: 'Mo bis Fr 7 bis 17 Uhr, bei Sturm auch am Wochenende',
          trust: ['Dachdecker- und Spenglermeister', 'Fotobericht bei jeder Besichtigung', 'Förderberatung'],
          emergency: {title: 'Sturmschaden?', text: 'Wir sichern Ihr Dach noch am selben Tag und dokumentieren alles für die Versicherung.'},
          gallery: {
            title: 'Aus unserer Arbeit',
            text: 'Hier zeigen Sie Ihre eigenen Fotos, am besten vorher und nachher.',
            photoLabel: 'Ihr Foto',
            items: [
              {title: 'Neueindeckung mit Dämmung', meta: 'Klosterneuburg, Einfamilienhaus, 180 m²'},
              {title: 'Dachrinne aus Kupfer', meta: 'Wien 19, Gründerzeithaus'},
              {title: 'Sturmschaden gesichert', meta: 'Tulln, am selben Abend erledigt'}
            ]
          },
          form: {
            fields: [
              {label: 'Name'},
              {label: 'Telefon', type: 'tel'},
              {label: 'Adresse', wide: true},
              {label: 'Worum geht es?', type: 'select', placeholder: 'Bitte wählen', options: ['Sturmschaden', 'Undichte Stelle', 'Dachrinne oder Spengler', 'Sanierung', 'Dach-Check']},
              {label: 'Wie dringend?', type: 'select', placeholder: 'Bitte wählen', options: ['Heute, es regnet rein', 'Diese Woche', 'Hat Zeit']},
              {label: 'Was ist los?', type: 'textarea', placeholder: 'z. B. Wasserfleck an der Decke im Dachgeschoß', wide: true}
            ],
            photo: 'Foto hinzufügen'
          }
        },
        en: {
          areaText: 'We are with you quickly in',
          towns: ['Klosterneuburg', 'Kierling', 'Kritzendorf', 'Tulln', 'Purkersdorf', 'Vienna Döbling', 'Vienna Floridsdorf'],
          hours: 'Mon to Fri 7am to 5pm, at weekends after storms',
          trust: ['Master roofer and tinsmith', 'Photo report at every visit', 'Subsidy advice'],
          emergency: {title: 'Storm damage?', text: 'We secure your roof the same day and document everything for your insurer.'},
          gallery: {
            title: 'Recent work',
            text: 'This is where your own photos go, ideally before and after.',
            photoLabel: 'Your photo',
            items: [
              {title: 'New roof with insulation', meta: 'Klosterneuburg, detached house, 180 m²'},
              {title: 'Copper gutter', meta: 'Vienna 19, period building'},
              {title: 'Storm damage secured', meta: 'Tulln, done the same evening'}
            ]
          },
          form: {
            fields: [
              {label: 'Name'},
              {label: 'Phone', type: 'tel'},
              {label: 'Address', wide: true},
              {label: 'What is it about?', type: 'select', placeholder: 'Please choose', options: ['Storm damage', 'Leak', 'Gutter or sheet metal', 'Renovation', 'Roof check']},
              {label: 'How urgent?', type: 'select', placeholder: 'Please choose', options: ['Today, water is coming in', 'This week', 'No rush']},
              {label: 'What is wrong?', type: 'textarea', placeholder: 'e.g. water stain on the attic ceiling', wide: true}
            ],
            photo: 'Add photo'
          }
        }
      })
    }
  }
];

export function getDemoSiteBySlug(slug: string) {
  return demoSites.find((site) => site.slug === slug);
}
