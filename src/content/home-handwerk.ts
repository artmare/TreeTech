import type {Locale} from '@/i18n/routing';

/**
 * Home page copy for the primary niche: trades and workshops
 * (Handwerk & Werkstatt) in Vienna and Lower Austria.
 * German is the master copy; EN and RU are translations of it.
 */

type Card = {title: string; text: string};

type HomeCopy = {
  hero: {
    badge: string;
    title: string;
    lead: string;
    primaryCta: string;
    call: string;
    whatsapp: string;
    /** `{price}` is replaced with the Website Start price from pricing.ts. */
    facts: string[];
  };
  pains: {eyebrow: string; title: string; lead: string; items: Card[]};
  steps: {eyebrow: string; title: string; lead: string; items: Card[]; cta: string};
  features: {eyebrow: string; title: string; lead: string; tradesLabel: string; trades: string[]; items: Card[]};
  pricing: {eyebrow: string; title: string; lead: string; allPrices: string};
  guarantee: {eyebrow: string; title: string; items: Card[]};
  team: {eyebrow: string; title: string; lead: string};
  portfolio: {title: string; lead: string};
  more: {eyebrow: string; title: string; lead: string};
  faq: {title: string; lead: string};
  final: {title: string; lead: string; cta: string};
  whatsappMessage: string;
};

export const homeHandwerk: Record<Locale, HomeCopy> = {
  de: {
    hero: {
      badge: 'Websites für Handwerk & Werkstätten · Wien und Niederösterreich',
      title: 'Ihre Website — fertig in 7 Tagen. Sie sehen sie, bevor Sie zahlen.',
      lead: 'Wir bauen für Elektriker, Installateure, Dachdecker, Maler und Kfz-Werkstätten Websites, über die Kunden Sie bei Google finden und direkt anrufen. Die Texte schreiben wir — Sie brauchen nur 30 Minuten für ein Gespräch.',
      primaryCta: 'Kostenlose Website-Vorschau',
      call: 'Anrufen',
      whatsapp: 'WhatsApp',
      facts: ['Fixpreis ab {price}', 'Texte inklusive', 'Online in 7 Tagen', 'Ohne Verpflichtung']
    },
    pains: {
      eyebrow: 'Kennen Sie das?',
      title: 'Gute Arbeit allein reicht online nicht mehr.',
      lead: 'Wer heute einen Elektriker oder eine Werkstatt sucht, googelt — und ruft den ersten an, der vertrauenswürdig aussieht.',
      items: [
        {title: 'Kunden finden Sie — aber keine Website', text: 'Ihr Google-Profil hat gute Bewertungen, doch ohne Website wirkt der Betrieb kleiner, als er ist. Viele rufen dann den Nächsten an.'},
        {title: 'Anrufe mitten in der Arbeit', text: 'Sie stehen auf der Baustelle oder unter dem Auto, das Telefon läutet, und die Anfrage ist weg. Ein Formular mit Foto sammelt sie für später.'},
        {title: 'Die alte Seite schadet mehr, als sie hilft', text: 'Veraltet, am Handy kaum lesbar, ohne Impressum — so verlieren Sie Kunden, bevor sie anrufen.'}
      ]
    },
    steps: {
      eyebrow: "So läuft's",
      title: 'In drei Schritten zur fertigen Website.',
      lead: 'Kein langes Briefing, keine Texte schreiben, keine Überraschungen beim Preis.',
      items: [
        {title: 'Kostenlose Vorschau', text: 'Wir bauen vorab einen Entwurf Ihrer Website — mit Ihrem Namen, Ihren Leistungen und Ihrem Einsatzgebiet. Sie sehen das Ergebnis, bevor Sie sich entscheiden.'},
        {title: '30 Minuten Gespräch', text: 'Gefällt Ihnen die Vorschau, besprechen wir Leistungen, Fotos und Details — am Telefon oder bei Ihnen im Betrieb. Die Texte schreiben wir danach selbst.'},
        {title: 'Online in 7 Tagen', text: 'Wir stellen die Website fertig, richten Ihr Google-Profil ein und gehen online. Danach kümmern wir uns auf Wunsch um Technik und Änderungen.'}
      ],
      cta: 'Vorschau anfragen'
    },
    features: {
      eyebrow: 'Was Ihre Website kann',
      title: 'Gebaut für Betriebe, deren Kunden anrufen.',
      lead: 'Keine Spielereien — alles, was auf der Seite ist, soll zu einem Anruf oder einer Anfrage führen.',
      tradesLabel: 'Typische Betriebe',
      trades: ['Elektriker', 'Installateure', 'Heizung & Sanitär', 'Dachdecker', 'Fliesenleger', 'Maler', 'Kfz-Werkstätten'],
      items: [
        {title: 'Anruf mit einem Tippen', text: 'Telefon- und WhatsApp-Button immer sichtbar, besonders am Handy, wo die meisten Kunden suchen.'},
        {title: 'Anfrage mit Foto', text: 'Kunden schicken ein Foto vom Schaden und eine Beschreibung — Sie wissen schon vor dem Rückruf, worum es geht.'},
        {title: 'Leistungen und Einsatzgebiet', text: 'Klar aufgelistet, damit Google und Kunden sofort sehen, was Sie machen und wohin Sie fahren.'},
        {title: 'Google-Profil eingerichtet', text: 'Website und Google-Unternehmensprofil arbeiten zusammen — für mehr Sichtbarkeit in Ihrer Umgebung.'}
      ]
    },
    pricing: {
      eyebrow: 'Fixpreise',
      title: 'Klare Preise. Keine versteckten Kosten.',
      lead: 'Sie wissen vorher, was es kostet. Zusätzliche Arbeiten gibt es nur nach Absprache.',
      allPrices: 'Alle Leistungen und Preise'
    },
    guarantee: {
      eyebrow: 'Unser Versprechen',
      title: 'Sie gehen kein Risiko ein.',
      items: [
        {title: 'Erst sehen, dann zahlen', text: 'Sie sehen die Vorschau Ihrer Website, bevor Sie einen Cent bezahlen. Gefällt sie Ihnen nicht, zahlen Sie nichts.'},
        {title: '7 Tage — sonst Pflege gratis', text: 'Ist Ihre Website durch unser Verschulden nicht 7 Tage nach dem Gespräch online, ist die Pflege die ersten 3 Monate kostenlos.'},
        {title: 'Alles gehört Ihnen', text: 'Domain, Inhalte und Code gehören Ihnen. Keine Bindung, kein Abo-Zwang — Sie können jederzeit wechseln.'}
      ]
    },
    team: {
      eyebrow: 'Wer steckt dahinter',
      title: 'Zwei Ansprechpartner statt Callcenter.',
      lead: 'Sie sprechen immer direkt mit den Menschen, die Ihre Website bauen.'
    },
    portfolio: {
      title: 'Beispiele aus der Praxis.',
      lead: 'Demo-Websites für typische Branchen — so könnte auch Ihre Seite aussehen.'
    },
    more: {
      eyebrow: 'Mehr als eine Website',
      title: 'Wenn der Betrieb wächst.',
      lead: 'Automatische Anfragen, ein KI-Assistent auf der Website oder ein eigenes Werkzeug für Aufträge — wenn Sie es brauchen.'
    },
    faq: {
      title: 'Häufige Fragen',
      lead: 'Was Betriebe uns vor dem Start am häufigsten fragen.'
    },
    final: {
      title: 'Wollen Sie sehen, wie Ihre Website aussehen könnte?',
      lead: 'Schreiben Sie uns oder rufen Sie an — die Vorschau ist kostenlos und unverbindlich.',
      cta: 'Kostenlose Vorschau anfragen'
    },
    whatsappMessage: 'Hallo TreeTech, ich interessiere mich für eine Website für meinen Betrieb.'
  },
  en: {
    hero: {
      badge: 'Websites for trades & workshops · Vienna and Lower Austria',
      title: 'Your website — ready in 7 days. You see it before you pay.',
      lead: 'We build websites for electricians, plumbers, roofers, painters and car workshops that help customers find you on Google and call you directly. We write the copy — you only need 30 minutes for a call.',
      primaryCta: 'Free website preview',
      call: 'Call',
      whatsapp: 'WhatsApp',
      facts: ['Fixed price from {price}', 'Copywriting included', 'Live in 7 days', 'No obligation']
    },
    pains: {
      eyebrow: 'Sound familiar?',
      title: 'Good work alone is no longer enough online.',
      lead: 'Anyone looking for an electrician or a workshop today searches on Google — and calls the first one that looks trustworthy.',
      items: [
        {title: 'Customers find you — but no website', text: 'Your Google profile has good reviews, but without a website your business looks smaller than it is. Many people simply call the next one.'},
        {title: 'Calls in the middle of a job', text: 'You are on site or under a car, the phone rings, and the inquiry is gone. A form with photo upload collects it for later.'},
        {title: 'The old site does more harm than good', text: 'Outdated, hard to read on a phone, no legal notice — you lose customers before they ever call.'}
      ]
    },
    steps: {
      eyebrow: 'How it works',
      title: 'Three steps to a finished website.',
      lead: 'No long briefing, no writing copy, no surprises on the price.',
      items: [
        {title: 'Free preview', text: 'We build a draft of your website upfront — with your name, your services and your service area. You see the result before you decide.'},
        {title: '30-minute call', text: 'If you like the preview, we go through services, photos and details — by phone or at your business. We write the copy ourselves afterwards.'},
        {title: 'Live in 7 days', text: 'We finish the website, set up your Google profile and go live. Afterwards we can take care of hosting and changes for you.'}
      ],
      cta: 'Request a preview'
    },
    features: {
      eyebrow: 'What your website does',
      title: 'Built for businesses whose customers call.',
      lead: 'No gimmicks — everything on the page should lead to a call or an inquiry.',
      tradesLabel: 'Typical businesses',
      trades: ['Electricians', 'Plumbers', 'Heating & sanitary', 'Roofers', 'Tilers', 'Painters', 'Car workshops'],
      items: [
        {title: 'Call with one tap', text: 'Phone and WhatsApp buttons always visible, especially on mobile, where most customers search.'},
        {title: 'Inquiry with photo', text: 'Customers send a photo of the problem and a description — you know what it is about before calling back.'},
        {title: 'Services and service area', text: 'Clearly listed, so Google and customers immediately see what you do and where you go.'},
        {title: 'Google profile set up', text: 'Website and Google Business Profile work together — for more visibility in your area.'}
      ]
    },
    pricing: {
      eyebrow: 'Fixed prices',
      title: 'Clear prices. No hidden costs.',
      lead: 'You know the cost upfront. Extra work only after we agree on it.',
      allPrices: 'All services and prices'
    },
    guarantee: {
      eyebrow: 'Our promise',
      title: 'You take no risk.',
      items: [
        {title: 'See first, then pay', text: 'You see the preview of your website before you pay a cent. If you do not like it, you pay nothing.'},
        {title: '7 days — or care for free', text: 'If your website is not live 7 days after our call through our fault, the first 3 months of care are free.'},
        {title: 'Everything belongs to you', text: 'Domain, content and code are yours. No lock-in, no forced subscription — you can switch any time.'}
      ]
    },
    team: {
      eyebrow: 'Who we are',
      title: 'Two people you can talk to, not a call centre.',
      lead: 'You always talk directly to the people who build your website.'
    },
    portfolio: {
      title: 'Examples.',
      lead: 'Demo websites for typical industries — this is how your site could look.'
    },
    more: {
      eyebrow: 'More than a website',
      title: 'When your business grows.',
      lead: 'Automatic inquiry handling, an AI assistant on your website or your own tool for jobs — when you need it.'
    },
    faq: {
      title: 'Frequently asked questions',
      lead: 'What businesses ask us most before getting started.'
    },
    final: {
      title: 'Want to see what your website could look like?',
      lead: 'Message us or call — the preview is free and without obligation.',
      cta: 'Request a free preview'
    },
    whatsappMessage: 'Hello TreeTech, I am interested in a website for my business.'
  },
  ru: {
    hero: {
      badge: 'Сайты для мастерских и автосервисов · Вена и Нижняя Австрия',
      title: 'Ваш сайт — готов за 7 дней. Вы видите его до оплаты.',
      lead: 'Делаем сайты для электриков, сантехников, кровельщиков, маляров и автосервисов — чтобы клиенты находили вас в Google и сразу звонили. Тексты пишем мы, от вас нужно только 30 минут на разговор.',
      primaryCta: 'Бесплатное превью сайта',
      call: 'Позвонить',
      whatsapp: 'WhatsApp',
      facts: ['Фиксированная цена от {price}', 'Тексты включены', 'Онлайн за 7 дней', 'Без обязательств']
    },
    pains: {
      eyebrow: 'Знакомо?',
      title: 'Одной хорошей работы в интернете уже мало.',
      lead: 'Сегодня электрика или автосервис ищут в Google — и звонят первому, кто выглядит надёжно.',
      items: [
        {title: 'Вас находят — а сайта нет', text: 'В Google-профиле хорошие отзывы, но без сайта бизнес выглядит меньше, чем есть. Многие просто звонят следующему.'},
        {title: 'Звонки посреди работы', text: 'Вы на объекте или под машиной, звонит телефон — и заявка потеряна. Форма с фото сохранит её на потом.'},
        {title: 'Старый сайт скорее вредит', text: 'Устаревший, неудобный с телефона, без Impressum — клиенты уходят ещё до звонка.'}
      ]
    },
    steps: {
      eyebrow: 'Как это работает',
      title: 'Три шага до готового сайта.',
      lead: 'Без долгих брифов, без написания текстов, без сюрпризов в цене.',
      items: [
        {title: 'Бесплатное превью', text: 'Заранее делаем черновик вашего сайта — с вашим названием, услугами и районом работы. Вы видите результат до того, как принимаете решение.'},
        {title: '30 минут разговора', text: 'Если превью понравилось, обсуждаем услуги, фото и детали — по телефону или у вас на месте. Тексты потом пишем сами.'},
        {title: 'Онлайн за 7 дней', text: 'Доделываем сайт, настраиваем Google-профиль и запускаем. Дальше по желанию берём на себя технику и правки.'}
      ],
      cta: 'Запросить превью'
    },
    features: {
      eyebrow: 'Что умеет ваш сайт',
      title: 'Сделан для бизнеса, которому звонят.',
      lead: 'Без лишнего — всё на странице должно вести к звонку или заявке.',
      tradesLabel: 'Для кого',
      trades: ['Электрики', 'Сантехники', 'Отопление', 'Кровельщики', 'Плиточники', 'Маляры', 'Автосервисы'],
      items: [
        {title: 'Звонок в одно касание', text: 'Кнопки звонка и WhatsApp всегда на виду — особенно на телефоне, откуда ищет большинство клиентов.'},
        {title: 'Заявка с фото', text: 'Клиент присылает фото проблемы и описание — вы знаете, о чём речь, ещё до перезвона.'},
        {title: 'Услуги и район работы', text: 'Чётко перечислены, чтобы Google и клиенты сразу видели, что вы делаете и куда выезжаете.'},
        {title: 'Google-профиль настроен', text: 'Сайт и профиль в Google работают вместе — больше видимости в вашем районе.'}
      ]
    },
    pricing: {
      eyebrow: 'Фиксированные цены',
      title: 'Понятные цены. Без скрытых доплат.',
      lead: 'Вы заранее знаете стоимость. Дополнительные работы — только по договорённости.',
      allPrices: 'Все услуги и цены'
    },
    guarantee: {
      eyebrow: 'Наше обещание',
      title: 'Вы ничем не рискуете.',
      items: [
        {title: 'Сначала смотрите, потом платите', text: 'Вы видите превью сайта до любой оплаты. Не понравилось — ничего не платите.'},
        {title: '7 дней — или поддержка бесплатно', text: 'Если сайт по нашей вине не запущен через 7 дней после разговора, первые 3 месяца поддержки бесплатно.'},
        {title: 'Всё принадлежит вам', text: 'Домен, контент и код — ваши. Никакой привязки и обязательной подписки — можно уйти в любой момент.'}
      ]
    },
    team: {
      eyebrow: 'Кто мы',
      title: 'Два живых человека вместо колл-центра.',
      lead: 'Вы всегда говорите напрямую с теми, кто делает ваш сайт.'
    },
    portfolio: {
      title: 'Примеры.',
      lead: 'Демо-сайты для типичных отраслей — так может выглядеть и ваш.'
    },
    more: {
      eyebrow: 'Больше, чем сайт',
      title: 'Когда бизнес растёт.',
      lead: 'Автоматическая обработка заявок, AI-ассистент на сайте или собственный инструмент для заказов — когда понадобится.'
    },
    faq: {
      title: 'Частые вопросы',
      lead: 'О чём нас чаще всего спрашивают перед стартом.'
    },
    final: {
      title: 'Хотите увидеть, как может выглядеть ваш сайт?',
      lead: 'Напишите или позвоните — превью бесплатное и ни к чему не обязывает.',
      cta: 'Запросить бесплатное превью'
    },
    whatsappMessage: 'Здравствуйте, TreeTech! Меня интересует сайт для моего бизнеса.'
  }
};
