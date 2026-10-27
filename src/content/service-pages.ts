import type {Locale} from '@/i18n/routing';
import {formatEur, getPackage, priceLine} from '@/content/pricing';
import {withLocaleFallbacks} from '@/i18n/localized';

export type ServicePage = {
  slug: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  audience: Record<Locale, string>;
  problem: Record<Locale, string>;
  solution: Record<Locale, string>;
  result: Record<Locale, string>;
  example: Record<Locale, string>;
  price: Record<Locale, string>;
  deliverables: Record<Locale, string[]>;
  /** Page-specific questions. Without them the general FAQ is shown. */
  faq?: Record<Locale, Array<{q: string; a: string}>>;
  /** Niche pages for the main audience: CTA leads to the free preview. */
  primary?: boolean;
};

const startPrice = getPackage('websiteStart').oneTime ?? 0;
const startDe = formatEur(startPrice, 'de');
const startEn = formatEur(startPrice, 'en');
const startRu = formatEur(startPrice, 'ru');

export const servicePageContent = withLocaleFallbacks({
  de: {
    back: 'Zurück zu Leistungen',
    forWhom: 'Für wen',
    problem: 'Problem',
    solution: 'Was TreeTech macht',
    result: 'Ergebnis',
    example: 'Beispiel',
    price: 'Preis',
    deliverables: 'Was Sie bekommen',
    ctaTitle: 'Sehen Sie Ihre Website, bevor Sie sich entscheiden.',
    ctaLead: 'Name Ihres Betriebs und Ort genügen. Die Vorschau haben Sie in 3 Werktagen, kostenlos.',
    cta: 'Kostenlose Vorschau anfordern',
    call: 'Anrufen',
    assessmentTitle: 'Kostenlose Ersteinschätzung anfragen',
    assessmentLead:
      'Beschreiben Sie kurz Ihren Ablauf oder Ihre Idee. Wir antworten mit einer ehrlichen Einschätzung, welcher nächste Schritt sinnvoll ist.',
    assessmentCta: 'Einschätzung anfragen'
  },
  en: {
    back: 'Back to services',
    forWhom: 'Who it is for',
    problem: 'Problem',
    solution: 'What TreeTech does',
    result: 'Result',
    example: 'Example',
    price: 'Price',
    deliverables: 'What you get',
    ctaTitle: 'See your website before you decide.',
    ctaLead: 'Your business name and town are enough. You get the preview within 3 working days, free of charge.',
    cta: 'Get my free preview',
    call: 'Call',
    assessmentTitle: 'Request a free first assessment',
    assessmentLead:
      'Briefly describe your workflow or idea. We reply with an honest recommendation for the next step.',
    assessmentCta: 'Request assessment'
  },
  ru: {
    back: 'Назад к услугам',
    forWhom: 'Для кого',
    problem: 'Проблема',
    solution: 'Что делает TreeTech',
    result: 'Результат',
    example: 'Пример',
    price: 'Цена',
    deliverables: 'Что вы получаете',
    ctaTitle: 'Посмотрите на свой сайт, прежде чем решать.',
    ctaLead: 'Достаточно названия бизнеса и города. Превью будет у вас через 3 рабочих дня, бесплатно.',
    cta: 'Получить бесплатное превью',
    call: 'Позвонить',
    assessmentTitle: 'Запросить бесплатную первичную оценку',
    assessmentLead:
      'Коротко опишите ваш процесс или идею. Мы честно ответим, какой следующий шаг имеет смысл.',
    assessmentCta: 'Запросить оценку'
  }
}) satisfies Record<Locale, Record<string, unknown>>;

export const servicePages: ServicePage[] = withLocaleFallbacks([
  {
    slug: 'websites-fuer-handwerker',
    primary: true,
    title: {
      de: 'Websites für Handwerker in Wien und Niederösterreich',
      en: 'Websites for tradespeople in Vienna and Lower Austria',
      ru: 'Сайты для мастеров в Вене и Нижней Австрии'
    },
    description: {
      de: `Für Elektriker, Installateure, Dachdecker, Maler und Fliesenleger. Fixpreis ${startDe}, Texte inklusive, in 7 Tagen online. Die Vorschau ist kostenlos.`,
      en: `For electricians, plumbers, roofers, painters and tilers. Fixed price ${startEn}, copy included, live in 7 days. The preview is free.`,
      ru: `Для электриков, сантехников, кровельщиков, маляров и плиточников. Фиксированная цена ${startRu}, тексты включены, онлайн за 7 дней. Превью бесплатно.`
    },
    audience: {
      de: 'Für Handwerksbetriebe mit 1 bis 20 Leuten, die gute Arbeit machen, aber online kaum zu finden sind oder eine veraltete Seite haben.',
      en: 'For trade businesses with 1 to 20 people who do good work but are hard to find online or have an outdated site.',
      ru: 'Для мастерских и бригад от 1 до 20 человек, которые хорошо работают, но в интернете их почти не найти или сайт устарел.'
    },
    problem: {
      de: 'Kunden suchen am Handy nach "Elektriker Mödling" oder "Installateur Wien". Wer dort keine ordentliche Seite hat, bekommt den Anruf nicht, auch mit guten Bewertungen.',
      en: 'Customers search on their phone for "electrician Mödling" or "plumber Vienna". Without a proper website you do not get the call, even with good reviews.',
      ru: 'Клиенты ищут с телефона «электрик Мёдлинг» или «сантехник Вена». Без нормального сайта звонок уходит другому, даже при хороших отзывах.'
    },
    solution: {
      de: 'Wir bauen eine schnelle Website mit Ihren Leistungen, Ihrem Einsatzgebiet und einem Anruf-Knopf, der am Handy immer sichtbar ist. Die Texte schreiben wir nach einem 30-Minuten-Gespräch. Google-Profil, Impressum und Datenschutz richten wir mit ein.',
      en: 'We build a fast website with your services, your service area and a call button that is always visible on mobile. We write the copy after a 30-minute call and set up your Google profile, legal notice and privacy policy.',
      ru: 'Делаем быстрый сайт с вашими услугами, районом выезда и кнопкой звонка, которая всегда видна с телефона. Тексты пишем после 30-минутного разговора. Профиль в Google, Impressum и Datenschutz настраиваем сами.'
    },
    result: {
      de: 'Kunden finden Sie, sehen in Sekunden, was Sie machen und wo, und rufen an oder schicken ein Foto vom Schaden.',
      en: 'Customers find you, see in seconds what you do and where, and call or send a photo of the problem.',
      ru: 'Клиенты находят вас, за секунды понимают, что и где вы делаете, и звонят или присылают фото поломки.'
    },
    example: {
      de: 'Ein Elektriker aus Mödling bekommt Seiten für Störungsdienst, E-Check und Photovoltaik, eine eigene Seite für Mödling und Baden und ein Formular, über das Kunden ein Foto schicken.',
      en: 'An electrician from Mödling gets pages for emergency service, safety checks and solar, a page each for Mödling and Baden, and a form where customers can send a photo.',
      ru: 'Электрик из Мёдлинга получает страницы для аварийных вызовов, проверок и солнечных панелей, отдельные страницы для Мёдлинга и Бадена и форму, через которую клиенты присылают фото.'
    },
    price: priceLine('websiteStart', 'websiteBusiness', 'pflege'),
    deliverables: {
      de: ['Bis 5 Seiten, Texte inklusive', 'Anruf- und WhatsApp-Knopf, Anfrage mit Foto', 'Google-Profil eingerichtet und verbunden', 'Impressum und Datenschutz', 'Online in 7 Tagen nach dem Gespräch'],
      en: ['Up to 5 pages, copy included', 'Call and WhatsApp button, inquiry with photo', 'Google profile set up and linked', 'Legal notice and privacy policy', 'Live 7 days after the call'],
      ru: ['До 5 страниц, тексты включены', 'Кнопки звонка и WhatsApp, заявка с фото', 'Профиль в Google настроен и связан с сайтом', 'Impressum и Datenschutz', 'Онлайн через 7 дней после разговора']
    },
    faq: {
      de: [
        {q: 'Ich habe keine Fotos von meinen Arbeiten.', a: 'Dann nehmen wir passende Bilder, bis Sie eigene machen. Ein paar Handyfotos von fertigen Arbeiten reichen später völlig.'},
        {q: 'Brauche ich als Handwerker wirklich ein Impressum?', a: 'Ja, in Österreich braucht jede Firmenwebsite ein Impressum. Wir richten es mit Ihren Daten ein, ebenso die Datenschutzerklärung.'},
        {q: 'Kann ich die Seite später selbst ändern?', a: 'Kleine Änderungen schicken Sie uns einfach per WhatsApp. Mit der Pflege sind sie inklusive.'},
        {q: 'Was ist, wenn ich mehrere Orte habe?', a: 'Dann passt Website Business. Dort bekommt jeder Ort und jede Leistung eine eigene Seite, damit Sie bei Google dort gefunden werden.'}
      ],
      en: [
        {q: 'I have no photos of my work.', a: 'Then we use suitable images until you take your own. A few phone photos of finished jobs are plenty later on.'},
        {q: 'Do I really need a legal notice?', a: 'Yes, every business website in Austria needs one. We set it up with your details, along with the privacy policy.'},
        {q: 'Can I change the site later?', a: 'Simply send small changes via WhatsApp. With the care plan they are included.'},
        {q: 'What if I work in several towns?', a: 'Then Website Business fits. Every town and service gets its own page so Google shows you there.'}
      ],
      ru: [
        {q: 'У меня нет фото моих работ.', a: 'Тогда поставим подходящие картинки, пока не появятся ваши. Потом хватит нескольких фото с телефона.'},
        {q: 'Мастеру правда нужен Impressum?', a: 'Да, в Австрии он нужен на каждом сайте компании. Мы оформим его с вашими данными, как и Datenschutz.'},
        {q: 'Смогу ли я потом менять сайт?', a: 'Мелкие правки просто присылайте в WhatsApp. С поддержкой они включены.'},
        {q: 'А если я работаю в нескольких городах?', a: 'Тогда подойдёт Website Business. У каждого города и услуги будет своя страница, чтобы Google показывал вас там.'}
      ]
    }
  },
  {
    slug: 'websites-fuer-kfz-werkstaetten',
    primary: true,
    title: {
      de: 'Websites für Kfz-Werkstätten in Wien und Niederösterreich',
      en: 'Websites for car workshops in Vienna and Lower Austria',
      ru: 'Сайты для автосервисов в Вене и Нижней Австрии'
    },
    description: {
      de: `Terminwunsch fürs Pickerl oder den Reifenwechsel direkt über die Website. Fixpreis ${startDe}, Texte inklusive, in 7 Tagen online.`,
      en: `Customers request a slot for the annual inspection (Pickerl) or a tyre change right on your website. Fixed price ${startEn}, copy included, live in 7 days.`,
      ru: `Запись на техосмотр (Pickerl) или смену шин прямо через сайт. Фиксированная цена ${startRu}, тексты включены, онлайн за 7 дней.`
    },
    audience: {
      de: 'Für freie Werkstätten, Reifen- und Pickerl-Betriebe, Spengler und Lackierer.',
      en: 'For independent garages, tyre and inspection shops, body shops and painters.',
      ru: 'Для независимых автосервисов, шиномонтажей, пунктов техосмотра, жестянщиков и маляров.'
    },
    problem: {
      de: 'Viele Kunden rufen nur an, um Preise und freie Termine zu fragen. Das Telefon läutet, während Sie unter dem Auto liegen.',
      en: 'Many customers only call to ask about prices and free slots. The phone rings while you are under a car.',
      ru: 'Многие звонят только спросить цену и свободное время. Телефон звонит, когда вы под машиной.'
    },
    solution: {
      de: 'Wir bauen eine Website mit Ihren Leistungen, auf Wunsch mit Richtpreisen, Öffnungszeiten, Anfahrt und einem Formular für Terminwünsche mit Kennzeichen und Anliegen.',
      en: 'We build a website with your services, guide prices if you want, opening hours, directions and a booking request form with licence plate and issue.',
      ru: 'Делаем сайт с услугами, при желании с ориентировочными ценами, часами работы, схемой проезда и формой записи с номером машины и проблемой.'
    },
    result: {
      de: 'Weniger Unterbrechungen am Telefon. Terminwünsche kommen gesammelt per E-Mail oder WhatsApp.',
      en: 'Fewer interruptions on the phone. Booking requests arrive bundled via email or WhatsApp.',
      ru: 'Меньше отвлечений на звонки. Заявки на запись приходят собранными в e-mail или WhatsApp.'
    },
    example: {
      de: 'Eine Werkstatt in Wien-Floridsdorf bekommt Seiten für Pickerl, Service, Reifen und Klimaservice und ein Formular, das Kennzeichen, Wunschtermin und Telefonnummer abfragt.',
      en: 'A workshop in Vienna-Floridsdorf gets pages for inspection, service, tyres and air conditioning, plus a form asking for plate, preferred date and phone number.',
      ru: 'Автосервис во Флоридсдорфе получает страницы для Pickerl, сервиса, шин и кондиционера и форму с номером машины, желаемой датой и телефоном.'
    },
    price: priceLine('websiteStart', 'websiteBusiness', 'anfrageAutomation'),
    deliverables: {
      de: ['Seiten für Pickerl, Service, Reifen und mehr', 'Terminwunsch mit Kennzeichen und Wunschtermin', 'Öffnungszeiten, Anfahrt, Google-Profil', 'Impressum und Datenschutz', 'Online in 7 Tagen nach dem Gespräch'],
      en: ['Pages for inspection, service, tyres and more', 'Booking request with plate and preferred date', 'Opening hours, directions, Google profile', 'Legal notice and privacy policy', 'Live 7 days after the call'],
      ru: ['Страницы для Pickerl, сервиса, шин и другого', 'Запись с номером машины и желаемой датой', 'Часы работы, проезд, профиль в Google', 'Impressum и Datenschutz', 'Онлайн через 7 дней после разговора']
    },
    faq: {
      de: [
        {q: 'Muss ich Preise auf die Website schreiben?', a: 'Nein. Viele Werkstätten zeigen nur Richtpreise für Pickerl oder Reifenwechsel, der Rest bleibt auf Anfrage. Sie entscheiden.'},
        {q: 'Ersetzt das Formular mein Terminbuch?', a: 'Nein, es sammelt nur Terminwünsche. Sie bestätigen wie gewohnt per Telefon oder WhatsApp.'},
        {q: 'Kann ich Öffnungszeiten selbst ändern?', a: 'Schicken Sie uns die neuen Zeiten per WhatsApp, mit der Pflege ist das inklusive. Im Google-Profil können Sie sie auch selbst ändern.'}
      ],
      en: [
        {q: 'Do I have to show prices?', a: 'No. Many workshops only show guide prices for inspection or tyre changes and keep the rest on request. Your call.'},
        {q: 'Does the form replace my booking book?', a: 'No, it only collects requests. You confirm by phone or WhatsApp as usual.'},
        {q: 'Can I change opening hours myself?', a: 'Send us the new hours via WhatsApp, included with the care plan. You can also change them in your Google profile.'}
      ],
      ru: [
        {q: 'Обязательно указывать цены?', a: 'Нет. Многие показывают только ориентировочные цены на Pickerl или шины, остальное по запросу. Решаете вы.'},
        {q: 'Форма заменит мой журнал записи?', a: 'Нет, она только собирает пожелания. Подтверждаете вы как обычно, по телефону или в WhatsApp.'},
        {q: 'Могу ли я сам менять часы работы?', a: 'Пришлите новые часы в WhatsApp, с поддержкой это включено. В профиле Google их можно поменять и самому.'}
      ]
    }
  },
  {
    slug: 'ai-automation',
    title: {de: 'AI-Automation für österreichische Betriebe', en: 'AI automation for Austrian businesses', ru: 'AI-автоматизация для бизнеса в Австрии'},
    description: {de: 'Automatisierungen und AI-Assistenten, die E-Mails, Anfragen, Dokumente und interne Routinen schneller machen.', en: 'Automations and AI assistants that make emails, inquiries, documents, and internal routines faster.', ru: 'Автоматизации и AI-ассистенты, которые ускоряют e-mail, заявки, документы и внутреннюю рутину.'},
    audience: {de: 'Für KMU, Dienstleister, Hotels, Ordinationen und lokale Betriebe, die täglich wiederkehrende Büroarbeit reduzieren möchten.', en: 'For SMEs, service providers, hotels, clinics, and local businesses that want to reduce recurring office work.', ru: 'Для малого и среднего бизнеса, сервисных компаний, отелей, клиник и локальных бизнесов, которые хотят сократить повторяющуюся офисную работу.'},
    problem: {de: 'Viele Aufgaben werden manuell kopiert, geprüft, beantwortet oder nachgetragen. Dadurch dauern Reaktionen länger und gute Anfragen bleiben leichter liegen.', en: 'Many tasks are copied, checked, answered, or updated manually. Responses take longer and good inquiries are easier to miss.', ru: 'Многие задачи вручную копируются, проверяются, отвечаются или дозаполняются. Из-за этого ответы дольше, а хорошие заявки легче теряются.'},
    solution: {de: 'TreeTech analysiert einen konkreten Ablauf und baut eine AI-Automation mit klaren Regeln, Übergaben und menschlicher Kontrolle bei wichtigen Entscheidungen.', en: 'TreeTech analyzes one concrete workflow and builds an AI automation with clear rules, handovers, and human review for important decisions.', ru: 'TreeTech анализирует конкретный процесс и строит AI-автоматизацию с понятными правилами, передачами и человеческим контролем важных решений.'},
    result: {de: 'Weniger manuelle Arbeit, schnellere Antworten und mehr Zeit für Kunden, Beratung und Verkauf.', en: 'Less manual work, faster replies, and more time for customers, consulting, and sales.', ru: 'Меньше ручной работы, быстрее ответы и больше времени для клиентов, консультаций и продаж.'},
    example: {de: 'Eine Anfrage wird automatisch zusammengefasst, kategorisiert, ins CRM übertragen und mit einem Antwortentwurf vorbereitet.', en: 'An inquiry is automatically summarized, categorized, transferred into the CRM, and prepared with a reply draft.', ru: 'Заявка автоматически резюмируется, категоризируется, передается в CRM и подготавливается с черновиком ответа.'},
    price: priceLine('anfrageAutomation', 'automationSprint'),
    deliverables: {de: ['Prozessanalyse', 'AI-Flow oder Automationslogik', 'Test mit realen Beispielen', 'Übergabe und kurze Dokumentation'], en: ['Process analysis', 'AI flow or automation logic', 'Testing with real examples', 'Handover and short documentation'], ru: ['Анализ процесса', 'AI-flow или логика автоматизации', 'Тест на реальных примерах', 'Передача и короткая документация']}
  },
  {
    slug: 'webentwicklung',
    title: {de: 'Webentwicklung für Unternehmen in Österreich', en: 'Web development for companies in Austria', ru: 'Веб-разработка для компаний в Австрии'},
    description: {de: 'Websites, die Leistungen verständlich erklären, Vertrauen schaffen und Besucher zu Anfragen führen.', en: 'Websites that explain services clearly, build trust, and guide visitors toward inquiries.', ru: 'Сайты, которые понятно объясняют услуги, вызывают доверие и ведут посетителей к заявке.'},
    audience: {de: 'Für Betriebe, die online professioneller auftreten und mehr qualifizierte Anfragen erhalten möchten.', en: 'For businesses that want a more professional online presence and more qualified inquiries.', ru: 'Для компаний, которые хотят выглядеть профессиональнее онлайн и получать больше качественных заявок.'},
    problem: {de: 'Die Website sieht vielleicht ordentlich aus, erklärt aber zu wenig, führt Besucher nicht klar und erzeugt zu wenige Anfragen.', en: 'The website may look acceptable, but explains too little, lacks clear guidance, and generates too few inquiries.', ru: 'Сайт может выглядеть нормально, но объясняет слишком мало, ведет посетителей неясно и дает слишком мало заявок.'},
    solution: {de: 'TreeTech entwickelt Struktur, Texte, Design, responsive Umsetzung, SEO-Grundlagen und auf Wunsch Formular- oder CRM-Anbindung.', en: 'TreeTech develops structure, copy, design, responsive implementation, SEO basics, and optional form or CRM connection.', ru: 'TreeTech разрабатывает структуру, тексты, дизайн, адаптивную реализацию, SEO-основу и при необходимости подключение форм или CRM.'},
    result: {de: 'Ein Webauftritt, der klarer verkauft, Vertrauen aufbaut und Anfragen sauberer erfasst.', en: 'A website that sells more clearly, builds trust, and captures inquiries more cleanly.', ru: 'Сайт, который понятнее продает, вызывает доверие и аккуратнее собирает заявки.'},
    example: {de: 'Aus einer unklaren Firmenwebsite wird eine mehrseitige Business Website mit Leistungsseiten, Anfrage-CTA und besserer mobiler Führung.', en: 'An unclear company website becomes a multi-page business website with service pages, inquiry CTA, and better mobile guidance.', ru: 'Неясный сайт компании превращается в многостраничный Business Website со страницами услуг, CTA на заявку и лучшей мобильной навигацией.'},
    price: priceLine('websiteStart', 'websiteBusiness', 'websiteAbo'),
    deliverables: {de: ['Informationsarchitektur', 'Texte und Seitenstruktur', 'Responsive Website', 'Kontakt- und Anfrageführung'], en: ['Information architecture', 'Copy and page structure', 'Responsive website', 'Contact and inquiry flow'], ru: ['Информационная архитектура', 'Тексты и структура страниц', 'Адаптивный сайт', 'Путь контакта и заявки']}
  },
  {
    slug: 'websites-fuer-hotels',
    title: {de: 'Websites für Hotels und Tourismusbetriebe', en: 'Websites for hotels and tourism businesses', ru: 'Сайты для отелей и туристического бизнеса'},
    description: {de: 'Hotelwebsites mit klarer Zimmerstruktur, Direktanfragen und besserer Gästekommunikation.', en: 'Hotel websites with clear room structure, direct inquiries, and better guest communication.', ru: 'Сайты отелей с понятной структурой номеров, прямыми заявками и лучшей коммуникацией с гостями.'},
    audience: {de: 'Für Hotels, Pensionen, Apartments und Tourismusbetriebe in Österreich.', en: 'For hotels, guesthouses, apartments, and tourism businesses in Austria.', ru: 'Для отелей, пансионов, апартаментов и туристического бизнеса в Австрии.'},
    problem: {de: 'Angebote, Zimmer und Anfragewege wirken oft verstreut. Gäste finden keinen klaren Weg von Interesse zu Direktanfrage.', en: 'Offers, rooms, and inquiry paths often feel scattered. Guests do not find a clear path from interest to direct inquiry.', ru: 'Предложения, номера и пути заявки часто выглядят разрозненно. Гости не видят понятного пути от интереса к прямой заявке.'},
    solution: {de: 'TreeTech strukturiert Zimmer, Angebote, Region, FAQs und Anfrage-CTAs so, dass Gäste schneller verstehen und anfragen können.', en: 'TreeTech structures rooms, offers, region, FAQs, and inquiry CTAs so guests understand faster and can inquire easily.', ru: 'TreeTech структурирует номера, предложения, регион, FAQ и CTA так, чтобы гости быстрее понимали и проще отправляли запрос.'},
    result: {de: 'Mehr Direktanfragen, weniger Standardfragen und ein professioneller Auftritt für Saison und Region.', en: 'More direct inquiries, fewer standard questions, and a professional presence for season and region.', ru: 'Больше прямых заявок, меньше стандартных вопросов и профессиональная подача сезона и региона.'},
    example: {de: 'Ein Anfrageformular fragt Reisedaten, Personenanzahl und Interessen ab und sendet die Daten direkt an das Team oder CRM.', en: 'An inquiry form asks for travel dates, number of guests, and interests, then sends the data directly to the team or CRM.', ru: 'Форма заявки спрашивает даты поездки, количество гостей и интересы, а затем отправляет данные команде или в CRM.'},
    price: priceLine('websiteBusiness'),
    deliverables: {de: ['Startseite', 'Zimmer- oder Angebotsseiten', 'Direktanfrage-Flow', 'Regionale SEO-Grundlagen'], en: ['Homepage', 'Room or offer pages', 'Direct inquiry flow', 'Regional SEO basics'], ru: ['Главная страница', 'Страницы номеров или предложений', 'Flow прямой заявки', 'Базовое региональное SEO']}
  },
  {
    slug: 'websites-fuer-aerzte',
    title: {de: 'Websites für Ärzte und Ordinationen', en: 'Websites for doctors and clinics', ru: 'Сайты для врачей и клиник'},
    description: {de: 'Klare Ordinationswebsites mit Leistungsseiten, Terminführung und verständlichen Patienteninformationen.', en: 'Clear clinic websites with service pages, appointment guidance, and understandable patient information.', ru: 'Понятные сайты клиник со страницами услуг, маршрутом записи и доступной информацией для пациентов.'},
    audience: {de: 'Für Arztpraxen, Zahnärzte, Fachärzte und Ordinationen in Österreich.', en: 'For medical practices, dentists, specialists, and clinics in Austria.', ru: 'Для медицинских практик, стоматологов, специалистов и клиник в Австрии.'},
    problem: {de: 'Patientinnen und Patienten finden Leistungen, Öffnungszeiten, Terminwege oder häufige Fragen nicht schnell genug.', en: 'Patients do not find services, opening hours, appointment paths, or common questions quickly enough.', ru: 'Пациенты не находят услуги, часы работы, путь к записи или частые вопросы достаточно быстро.'},
    solution: {de: 'TreeTech baut eine ruhige, vertrauenswürdige Struktur mit Leistungsseiten, FAQ, Kontaktführung und klaren mobilen Wegen.', en: 'TreeTech builds a calm, trustworthy structure with service pages, FAQ, contact guidance, and clear mobile paths.', ru: 'TreeTech строит спокойную, надежную структуру со страницами услуг, FAQ, контактным маршрутом и понятными мобильными путями.'},
    result: {de: 'Weniger wiederholte Fragen, mehr Vertrauen vor dem Erstkontakt und klarere Termin- oder Anfragewege.', en: 'Fewer repeated questions, more trust before first contact, and clearer appointment or inquiry paths.', ru: 'Меньше повторяющихся вопросов, больше доверия до первого контакта и понятнее путь к записи или заявке.'},
    example: {de: 'Neue Patientinnen sehen sofort Leistungen, Ablauf und Kontaktoptionen und können gezielt eine Anfrage senden.', en: 'New patients immediately see services, process, and contact options and can send a targeted inquiry.', ru: 'Новые пациенты сразу видят услуги, процесс и варианты контакта и могут отправить точную заявку.'},
    price: priceLine('websiteStart', 'websiteBusiness'),
    deliverables: {de: ['Leistungsstruktur', 'FAQ', 'Kontakt- und Terminführung', 'Mobile Optimierung'], en: ['Service structure', 'FAQ', 'Contact and appointment guidance', 'Mobile optimization'], ru: ['Структура услуг', 'FAQ', 'Путь контакта и записи', 'Мобильная оптимизация']}
  },
  {
    slug: 'websites-fuer-kanzleien',
    title: {de: 'Websites für Kanzleien und Beratungen', en: 'Websites for law firms and consultancies', ru: 'Сайты для юридических фирм и консалтинга'},
    description: {de: 'Seriöse Websites, die Fachgebiete verständlich erklären und Erstkontakte strukturieren.', en: 'Credible websites that explain practice areas clearly and structure first contact.', ru: 'Серьезные сайты, которые понятно объясняют специализации и структурируют первый контакт.'},
    audience: {de: 'Für Rechtsanwälte, Steuerberater, Unternehmensberater und spezialisierte Dienstleister.', en: 'For lawyers, tax advisors, business consultants, and specialized service providers.', ru: 'Для адвокатов, налоговых консультантов, бизнес-консультантов и специализированных сервисных компаний.'},
    problem: {de: 'Kompetenz ist vorhanden, aber online fehlen klare Positionierung, verständliche Fachbereiche und ein diskreter Kontaktweg.', en: 'Expertise exists, but online positioning, understandable service areas, and a discreet contact path are missing.', ru: 'Экспертиза есть, но онлайн не хватает четкого позиционирования, понятных направлений и дискретного пути контакта.'},
    solution: {de: 'TreeTech strukturiert Leistungen, Erstkontakt, Vertrauen und Sprache so, dass passende Mandanten schneller erkennen, ob die Kanzlei passt.', en: 'TreeTech structures services, first contact, trust, and copy so suitable clients understand faster whether the firm fits.', ru: 'TreeTech структурирует услуги, первый контакт, доверие и тексты так, чтобы подходящие клиенты быстрее понимали, подходит ли фирма.'},
    result: {de: 'Mehr qualifizierte Erstkontakte und weniger unklare Anfragen.', en: 'More qualified first contacts and fewer unclear inquiries.', ru: 'Больше квалифицированных первых контактов и меньше неясных заявок.'},
    example: {de: 'Ein Fachgebiet erhält eine eigene Seite mit typischen Fällen, Ablauf und diskretem Anfrageformular.', en: 'A practice area receives its own page with typical cases, process, and discreet inquiry form.', ru: 'Отдельная специализация получает свою страницу с типичными случаями, процессом и дискретной формой заявки.'},
    price: priceLine('websiteBusiness'),
    deliverables: {de: ['Fachgebietsseiten', 'Vertrauensstruktur', 'Diskrete Kontaktführung', 'SEO-Grundlagen'], en: ['Practice area pages', 'Trust structure', 'Discreet contact guidance', 'SEO basics'], ru: ['Страницы направлений', 'Структура доверия', 'Дискретный контактный путь', 'SEO-основа']}
  },
  {
    slug: 'crm-automatisierung',
    title: {de: 'CRM-Automatisierung für kleine und mittlere Unternehmen', en: 'CRM automation for small and medium-sized businesses', ru: 'CRM-автоматизация для малого и среднего бизнеса'},
    description: {de: 'CRM-Flows, die Leads, Formulare, E-Mails, Aufgaben und Follow-ups automatisch verbinden.', en: 'CRM flows that connect leads, forms, emails, tasks, and follow-ups automatically.', ru: 'CRM-flow, которые автоматически связывают лиды, формы, e-mail, задачи и follow-up.'},
    audience: {de: 'Für Teams, die Leads schneller bearbeiten und weniger Daten manuell nachtragen möchten.', en: 'For teams that want to process leads faster and enter less data manually.', ru: 'Для команд, которые хотят быстрее обрабатывать лиды и меньше вручную переносить данные.'},
    problem: {de: 'Leads landen im Postfach, Follow-ups werden vergessen und CRM-Daten bleiben unvollständig.', en: 'Leads land in the inbox, follow-ups are forgotten, and CRM data stays incomplete.', ru: 'Лиды остаются в почте, follow-up забываются, а CRM-данные остаются неполными.'},
    solution: {de: 'TreeTech verbindet Website, Formulare, E-Mail und CRM zu einem klaren Lead-Flow mit Aufgaben und Erinnerungen.', en: 'TreeTech connects website, forms, email, and CRM into a clear lead flow with tasks and reminders.', ru: 'TreeTech связывает сайт, формы, e-mail и CRM в понятный lead-flow с задачами и напоминаниями.'},
    result: {de: 'Schnellere Reaktionszeiten, bessere Übersicht und weniger verlorene Anfragen.', en: 'Faster response times, better overview, and fewer lost inquiries.', ru: 'Быстрее реакция, лучше обзор и меньше потерянных заявок.'},
    example: {de: 'Eine Anfrage wird automatisch als Lead angelegt, kategorisiert und mit einer Follow-up-Aufgabe versehen.', en: 'An inquiry is automatically created as a lead, categorized, and assigned a follow-up task.', ru: 'Заявка автоматически создается как лид, категоризируется и получает follow-up задачу.'},
    price: priceLine('anfrageAutomation', 'automationSprint'),
    deliverables: {de: ['CRM-Flow', 'Formular-Integration', 'Aufgaben und Erinnerungen', 'Testfälle'], en: ['CRM flow', 'Form integration', 'Tasks and reminders', 'Test cases'], ru: ['CRM-flow', 'Интеграция формы', 'Задачи и напоминания', 'Тестовые сценарии']}
  },
  {
    slug: 'ki-chatbot-fuer-unternehmen',
    title: {de: 'KI-Chatbot für Unternehmen', en: 'AI chatbot for business', ru: 'AI-чатбот для бизнеса'},
    description: {de: 'AI-Chatbots, die häufige Fragen beantworten, Kontext sammeln und Anfragen sauber weiterleiten.', en: 'AI chatbots that answer common questions, collect context, and route inquiries cleanly.', ru: 'AI-чатботы, которые отвечают на частые вопросы, собирают контекст и аккуратно передают заявки.'},
    audience: {de: 'Für Betriebe mit vielen wiederkehrenden Fragen auf Website, Support oder Vertrieb.', en: 'For businesses with many recurring questions in website, support, or sales.', ru: 'Для компаний с большим количеством повторяющихся вопросов на сайте, в поддержке или продажах.'},
    problem: {de: 'Teams beantworten oft dieselben Fragen und erhalten trotzdem unvollständige Anfragen.', en: 'Teams often answer the same questions and still receive incomplete inquiries.', ru: 'Команды часто отвечают на одни и те же вопросы и все равно получают неполные заявки.'},
    solution: {de: 'TreeTech baut einen begrenzten, klar gesteuerten AI-Assistenten mit Übergabe an Menschen und optionaler CRM-Anbindung.', en: 'TreeTech builds a limited, clearly controlled AI assistant with human handover and optional CRM connection.', ru: 'TreeTech строит ограниченного, управляемого AI-ассистента с передачей человеку и опциональным подключением CRM.'},
    result: {de: 'Schnellere Antworten, bessere Vorqualifizierung und weniger Standardkommunikation.', en: 'Faster replies, better pre-qualification, and less standard communication.', ru: 'Быстрее ответы, лучше предварительная квалификация и меньше стандартной коммуникации.'},
    example: {de: 'Der Chatbot beantwortet FAQs, fragt fehlende Details ab und sendet eine strukturierte Anfrage an das Team.', en: 'The chatbot answers FAQs, asks for missing details, and sends a structured inquiry to the team.', ru: 'Чатбот отвечает на FAQ, уточняет недостающие детали и отправляет структурированную заявку команде.'},
    price: priceLine('kiAssistent'),
    deliverables: {de: ['FAQ- und Wissensstruktur', 'Chatbot-Flow', 'Fallback an Menschen', 'Test und Übergabe'], en: ['FAQ and knowledge structure', 'Chatbot flow', 'Human fallback', 'Testing and handover'], ru: ['Структура FAQ и знаний', 'Chatbot-flow', 'Fallback к человеку', 'Тест и передача']}
  },
  {
    slug: 'workflow-automatisierung',
    title: {de: 'Workflow-Automatisierung für Unternehmen in Österreich', en: 'Workflow automation for companies in Austria', ru: 'Workflow-автоматизация для компаний в Австрии'},
    description: {de: 'Digitale Workflows, die E-Mail, CRM, Formulare, Dokumente und interne Aufgaben verbinden.', en: 'Digital workflows that connect email, CRM, forms, documents, and internal tasks.', ru: 'Цифровые workflow, которые связывают e-mail, CRM, формы, документы и внутренние задачи.'},
    audience: {de: 'Für KMU, die gewachsene Büroprozesse modernisieren möchten, ohne sofort Personal aufzubauen.', en: 'For SMEs that want to modernize grown office processes without immediately hiring.', ru: 'Для малого и среднего бизнеса, который хочет модернизировать офисные процессы без немедленного найма.'},
    problem: {de: 'Informationen wechseln zwischen Telefon, E-Mail, Tabellen und Tools. Zuständigkeiten und Status sind schwer sichtbar.', en: 'Information moves between phone, email, spreadsheets, and tools. Responsibilities and status are hard to see.', ru: 'Информация ходит между телефоном, почтой, таблицами и инструментами. Ответственность и статусы плохо видны.'},
    solution: {de: 'TreeTech dokumentiert den Ablauf, reduziert unnötige Schritte und verbindet die passenden Tools zu einem klaren Workflow.', en: 'TreeTech documents the process, reduces unnecessary steps, and connects the right tools into a clear workflow.', ru: 'TreeTech документирует процесс, убирает лишние шаги и связывает подходящие инструменты в понятный workflow.'},
    result: {de: 'Weniger Doppelarbeit, bessere Übersicht und ein Team, das mit gleicher Besetzung mehr schafft.', en: 'Less duplicate work, better overview, and a team that can handle more with the same headcount.', ru: 'Меньше двойной работы, лучший обзор и команда, которая успевает больше тем же составом.'},
    example: {de: 'Aus einer E-Mail-Anfrage entsteht automatisch ein CRM-Eintrag, eine Aufgabe, ein Dokumententwurf und eine Erinnerung.', en: 'An email inquiry automatically becomes a CRM entry, task, document draft, and reminder.', ru: 'Из e-mail заявки автоматически создаются CRM-запись, задача, черновик документа и напоминание.'},
    price: priceLine('automationSprint', 'analyseWorkshop'),
    deliverables: {de: ['Workflow-Audit', 'Systemplan', 'Automationslogik', 'Dokumentation'], en: ['Workflow audit', 'System plan', 'Automation logic', 'Documentation'], ru: ['Workflow-аудит', 'План системы', 'Логика автоматизации', 'Документация']}
  }
]);

export function getServicePageBySlug(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}
