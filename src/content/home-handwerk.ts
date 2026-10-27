import type {Locale} from '@/i18n/routing';

/**
 * Home page copy for the primary niche: trades and workshops
 * (Handwerk & Werkstatt) in Vienna and Lower Austria.
 * German is the master copy; EN and RU are translations of it.
 *
 * Tokens replaced at render time from src/content/pricing.ts:
 *   {start}  Website Start price      {care}   Pflege monthly price
 *   {hourly} hourly rate
 */

type Item = {title: string; text: string};
type Faq = {q: string; a: string};

export type HomeCopy = {
  nav: {process: string; prices: string; examples: string; faq: string};
  hero: {title: string; sub: string; cta: string; call: string; whatsapp: string; micro: string};
  preview: {caption: string; stampLine1: string; stampLine2: string; stampSmall: string; label: string};
  pains: {title: string; lead: string; items: Item[]};
  steps: {title: string; lead: string; items: Item[]};
  features: {title: string; tradesPrefix: string; trades: string; items: string[]};
  prices: {
    title: string;
    founderTag: string;
    perMonth: string;
    cards: {websiteStart: string; websiteBusiness: string; websiteAbo: string; pflege: string};
    swipe: string;
    note: string;
    all: string;
  };
  promise: {title: string; items: Item[]};
  team: {title: string; lead: string};
  faq: {title: string; items: Faq[]};
  final: {title: string; lead: string; micro: string};
  bar: {call: string; whatsapp: string; preview: string};
  whatsappMessage: string;
};

export const homeHandwerk: Record<Locale, HomeCopy> = {
  de: {
    nav: {process: 'Ablauf', prices: 'Preise', examples: 'Beispiele', faq: 'Fragen'},
    hero: {
      title: 'Wir bauen Ihre Website, bevor Sie Ja sagen.',
      sub: 'Für Elektriker, Installateure, Dachdecker, Maler und Werkstätten in Wien und Niederösterreich. Gefällt Ihnen die Vorschau, ist die Seite in 7 Tagen online. Fixpreis {start}, die Texte schreiben wir.',
      cta: 'Meine Vorschau anfordern',
      call: 'Anrufen',
      whatsapp: 'WhatsApp',
      micro: 'Kostenlos. Sie zahlen nur, wenn Ihnen der Entwurf gefällt.'
    },
    preview: {
      caption: 'Beispiel einer Vorschau für einen Elektriker',
      stampLine1: 'Erst ansehen.',
      stampLine2: 'Dann zahlen.',
      stampSmall: 'Vorschau kostenlos',
      label: 'Beispiel einer Website-Vorschau auf dem Handy'
    },
    pains: {
      title: 'Die Kunden suchen Sie schon. Finden sie Sie auch?',
      lead: 'Wer einen Elektriker oder eine Werkstatt braucht, googelt und ruft den ersten an, der ordentlich aussieht.',
      items: [
        {title: 'Gute Bewertungen bei Google, aber keine eigene Website.', text: 'Wer Sie sucht, sieht Ihre Sterne und daneben den Mitbewerber mit der ordentlichen Seite. Den ruft er an.'},
        {title: 'Das Telefon läutet, Sie stehen auf der Leiter.', text: 'Bis Sie zurückrufen, hat der Kunde schon jemand anderen. Über die Website schickt er Ihnen stattdessen Foto und Adresse.'},
        {title: 'Ihre Seite ist älter als Ihr Firmenauto.', text: 'Am Handy kaum lesbar, kein Impressum, die Telefonnummer nur als Bild. So verlieren Sie Kunden, bevor sie anrufen.'}
      ]
    },
    steps: {
      title: 'So läuft es ab',
      lead: 'Keine Formulare zum Ausfüllen, keine Texte zum Schreiben. Sie entscheiden erst, wenn Sie Ihre Seite gesehen haben.',
      items: [
        {title: 'Sie melden sich', text: 'Anruf, WhatsApp oder Formular. Wir brauchen nur den Namen Ihres Betriebs und den Ort.'},
        {title: 'Sie bekommen Ihre Vorschau', text: 'Innerhalb von 3 Werktagen sehen Sie, wie Ihre Website aussehen kann. Kostenlos.'},
        {title: '30 Minuten Gespräch', text: 'Gefällt sie Ihnen, besprechen wir Leistungen und Fotos. Am Telefon oder bei Ihnen im Betrieb.'},
        {title: 'In 7 Tagen online', text: 'Mit Google-Profil, Impressum und allem, was dazugehört. Die Texte schreiben wir.'}
      ]
    },
    features: {
      title: 'Gemacht für Betriebe, die angerufen werden wollen.',
      tradesPrefix: 'Für',
      trades: 'Elektriker, Installateure, Heizung und Sanitär, Dachdecker, Fliesenleger, Maler und Kfz-Werkstätten.',
      items: [
        'Anruf- und WhatsApp-Knopf, am Handy immer sichtbar',
        'Anfrage mit Foto vom Schaden und Adresse',
        'Leistungen und Einsatzgebiet auf einen Blick',
        'Google-Profil eingerichtet und mit der Seite verbunden',
        'Impressum und Datenschutz, rechtlich sauber',
        'Lädt schnell, auch mit schlechtem Netz auf der Baustelle'
      ]
    },
    prices: {
      title: 'Was es kostet. Vorher, nicht nachher.',
      founderTag: 'Für die ersten 3 Betriebe: {founder}',
      perMonth: 'pro Monat',
      cards: {
        websiteStart: 'Bis 5 Seiten, Texte inklusive, online in 7 Tagen.',
        websiteBusiness: 'Bis 10 Seiten, eigene Seite für jede Leistung und jeden Ort.',
        websiteAbo: 'Plus {setup} zum Start. Ohne große Zahlung am Anfang, 12 Monate Mindestlaufzeit.',
        pflege: 'Hosting, kleine Änderungen per WhatsApp, jeden Monat ein Bericht. Monatlich kündbar.'
      },
      swipe: 'Zur Seite wischen für alle Pakete',
      note: 'Endpreise. Alles Weitere nur nach Absprache, {hourly} pro Stunde.',
      all: 'Alle Leistungen und Preise'
    },
    promise: {
      title: 'Drei Zusagen. Schriftlich im Auftrag.',
      items: [
        {title: 'Erst ansehen, dann zahlen.', text: 'Gefällt Ihnen die Vorschau nicht, zahlen Sie nichts. Auch nicht für die Vorschau.'},
        {title: '7 Tage, sonst 3 Monate Pflege gratis.', text: 'Liegt die Verzögerung bei uns, kostet Sie die Pflege drei Monate lang nichts.'},
        {title: 'Alles gehört Ihnen.', text: 'Domain, Texte, Fotos und Code. Kein Vertrag, der Sie festhält.'}
      ]
    },
    team: {
      title: 'Mit wem Sie sprechen',
      lead: 'Sie reden mit den zwei Leuten, die Ihre Website bauen. Immer unter derselben Nummer.'
    },
    faq: {
      title: 'Was Betriebe uns vorher fragen',
      items: [
        {q: 'Was kostet die Vorschau?', a: 'Nichts. Wir bauen sie auf unser Risiko. Gefällt sie Ihnen nicht, ist die Sache erledigt.'},
        {q: 'Was muss ich selbst machen?', a: '30 Minuten für ein Gespräch und ein paar Fotos von Ihren Arbeiten. Haben Sie keine, nehmen wir passende Bilder, bis Sie eigene machen.'},
        {q: 'Ich habe keine Zeit für so etwas.', a: 'Genau deshalb schreiben wir die Texte und kümmern uns um das Technische. Änderungen schicken Sie uns später einfach per WhatsApp.'},
        {q: 'Bringt mir eine Website wirklich Aufträge?', a: 'Eine Anzahl versprechen wir nicht. Sie sehen es aber selbst: Mit der Pflege bekommen Sie jeden Monat einen Bericht, wie viele Leute angerufen oder angefragt haben.'},
        {q: 'Ich bin schon auf Herold und Facebook.', a: 'Dort gehört die Seite der Plattform. Ihre Website gehört Ihnen, und Google zeigt sie, wenn jemand in Ihrer Gegend sucht.'},
        {q: 'Was passiert nach dem Start?', a: 'Mit der Pflege um {care} kümmern wir uns um Technik und kleine Änderungen. Ohne Pflege übergeben wir Ihnen alles, was Sie brauchen.'}
      ]
    },
    final: {
      title: 'Sehen Sie Ihre Website, bevor Sie sich entscheiden.',
      lead: 'Die Vorschau haben Sie in 3 Werktagen.',
      micro: 'Kostenlos und unverbindlich.'
    },
    bar: {call: 'Anrufen', whatsapp: 'WhatsApp', preview: 'Vorschau anfordern'},
    whatsappMessage: 'Hallo TreeTech, ich hätte gern eine kostenlose Vorschau für meine Website.'
  },
  en: {
    nav: {process: 'How it works', prices: 'Prices', examples: 'Examples', faq: 'Questions'},
    hero: {
      title: 'We build your website before you say yes.',
      sub: 'For electricians, plumbers, roofers, painters and workshops in Vienna and Lower Austria. If you like the preview, the site goes live in 7 days. Fixed price {start}, and we write the copy.',
      cta: 'Get my preview',
      call: 'Call',
      whatsapp: 'WhatsApp',
      micro: 'Free. You only pay if you like the draft.'
    },
    preview: {
      caption: 'Example preview for an electrician',
      stampLine1: 'See it first.',
      stampLine2: 'Then pay.',
      stampSmall: 'Preview is free',
      label: 'Example of a website preview on a phone'
    },
    pains: {
      title: 'Customers are already looking for you. Do they find you?',
      lead: 'Anyone who needs an electrician or a workshop searches on Google and calls the first one that looks trustworthy.',
      items: [
        {title: 'Good Google reviews, but no website of your own.', text: 'People see your stars and, right next to them, a competitor with a proper website. That is who they call.'},
        {title: 'The phone rings while you are up a ladder.', text: 'By the time you call back, the customer has found someone else. Through your website they send you a photo and an address instead.'},
        {title: 'Your website is older than your van.', text: 'Hard to read on a phone, no legal notice, the phone number only as an image. You lose customers before they ever call.'}
      ]
    },
    steps: {
      title: 'How it works',
      lead: 'No forms to fill in, no copy to write. You only decide once you have seen your site.',
      items: [
        {title: 'You get in touch', text: 'Call, WhatsApp or the form. All we need is your business name and location.'},
        {title: 'You get your preview', text: 'Within 3 working days you see what your website could look like. Free of charge.'},
        {title: '30-minute call', text: 'If you like it, we go through services and photos. By phone or at your business.'},
        {title: 'Live in 7 days', text: 'With your Google profile, legal notice and everything else it needs. We write the copy.'}
      ]
    },
    features: {
      title: 'Made for businesses that want the phone to ring.',
      tradesPrefix: 'For',
      trades: 'electricians, plumbers, heating engineers, roofers, tilers, painters and car workshops.',
      items: [
        'Call and WhatsApp button, always visible on mobile',
        'Inquiries with a photo of the problem and the address',
        'Services and service area at a glance',
        'Google profile set up and linked to your site',
        'Legal notice and privacy policy done properly',
        'Loads fast, even with poor signal on site'
      ]
    },
    prices: {
      title: 'What it costs. Before, not after.',
      founderTag: 'First 3 businesses: {founder}',
      perMonth: 'per month',
      cards: {
        websiteStart: 'Up to 5 pages, copywriting included, live in 7 days.',
        websiteBusiness: 'Up to 10 pages, a page for each service and each location.',
        websiteAbo: 'Plus {setup} to start. No large upfront payment, 12-month minimum term.',
        pflege: 'Hosting, small changes via WhatsApp, a report every month. Cancel monthly.'
      },
      swipe: 'Swipe to see all packages',
      note: 'Final prices. Anything extra only after we agree on it, {hourly} per hour.',
      all: 'All services and prices'
    },
    promise: {
      title: 'Three promises. In writing, in the contract.',
      items: [
        {title: 'See it first, then pay.', text: 'If you do not like the preview, you pay nothing. Not even for the preview.'},
        {title: '7 days, or 3 months of care free.', text: 'If the delay is on us, care costs you nothing for three months.'},
        {title: 'Everything is yours.', text: 'Domain, copy, photos and code. No contract that ties you down.'}
      ]
    },
    team: {
      title: 'Who you talk to',
      lead: 'You talk to the two people who build your website. Always on the same number.'
    },
    faq: {
      title: 'What businesses ask us first',
      items: [
        {q: 'What does the preview cost?', a: 'Nothing. We build it at our own risk. If you do not like it, that is the end of it.'},
        {q: 'What do I need to do myself?', a: '30 minutes for a call and a few photos of your work. If you have none, we use suitable images until you take your own.'},
        {q: 'I have no time for this.', a: 'That is exactly why we write the copy and handle the technical side. Later you simply send us changes via WhatsApp.'},
        {q: 'Will a website really bring me jobs?', a: 'We do not promise a number. But you will see it yourself: with care you get a monthly report on how many people called or sent an inquiry.'},
        {q: 'I am already on Herold and Facebook.', a: 'There, the page belongs to the platform. Your website belongs to you, and Google shows it when someone searches in your area.'},
        {q: 'What happens after launch?', a: 'With care for {care} we look after the technical side and small changes. Without care, we hand over everything you need.'}
      ]
    },
    final: {
      title: 'See your website before you decide.',
      lead: 'You get the preview within 3 working days.',
      micro: 'Free and without obligation.'
    },
    bar: {call: 'Call', whatsapp: 'WhatsApp', preview: 'Get preview'},
    whatsappMessage: 'Hello TreeTech, I would like a free preview of a website for my business.'
  },
  ru: {
    nav: {process: 'Как работаем', prices: 'Цены', examples: 'Примеры', faq: 'Вопросы'},
    hero: {
      title: 'Мы делаем ваш сайт до того, как вы скажете «да».',
      sub: 'Для электриков, сантехников, кровельщиков, маляров и автосервисов в Вене и Нижней Австрии. Понравится превью, и через 7 дней сайт будет онлайн. Фиксированная цена {start}, тексты пишем мы.',
      cta: 'Получить превью',
      call: 'Позвонить',
      whatsapp: 'WhatsApp',
      micro: 'Бесплатно. Платите, только если черновик понравился.'
    },
    preview: {
      caption: 'Пример превью для электрика',
      stampLine1: 'Сначала смотрите.',
      stampLine2: 'Потом платите.',
      stampSmall: 'Превью бесплатно',
      label: 'Пример превью сайта на телефоне'
    },
    pains: {
      title: 'Клиенты вас уже ищут. А находят?',
      lead: 'Кому нужен электрик или автосервис, тот гуглит и звонит первому, кто выглядит надёжно.',
      items: [
        {title: 'Хорошие отзывы в Google, но своего сайта нет.', text: 'Вас ищут, видят ваши звёзды, а рядом конкурента с нормальным сайтом. Звонят ему.'},
        {title: 'Телефон звонит, а вы на стремянке.', text: 'Пока вы перезвоните, клиент уже нашёл другого. Через сайт он вместо этого пришлёт вам фото и адрес.'},
        {title: 'Ваш сайт старше вашего рабочего фургона.', text: 'С телефона не читается, Impressum нет, номер только картинкой. Клиенты уходят ещё до звонка.'}
      ]
    },
    steps: {
      title: 'Как это работает',
      lead: 'Никаких анкет и никаких текстов от вас. Решение вы принимаете, когда уже увидели свой сайт.',
      items: [
        {title: 'Вы связываетесь с нами', text: 'Звонок, WhatsApp или форма. Нам нужны только название вашего бизнеса и город.'},
        {title: 'Вы получаете превью', text: 'За 3 рабочих дня вы видите, каким может быть ваш сайт. Бесплатно.'},
        {title: '30 минут разговора', text: 'Если понравилось, обсуждаем услуги и фото. По телефону или у вас на месте.'},
        {title: 'Онлайн за 7 дней', text: 'С профилем в Google, Impressum и всем остальным. Тексты пишем мы.'}
      ]
    },
    features: {
      title: 'Сделан для тех, кому должны звонить.',
      tradesPrefix: 'Для',
      trades: 'электриков, сантехников, отопления, кровельщиков, плиточников, маляров и автосервисов.',
      items: [
        'Кнопки звонка и WhatsApp всегда на виду с телефона',
        'Заявка с фото поломки и адресом',
        'Услуги и район выезда с первого взгляда',
        'Профиль в Google настроен и связан с сайтом',
        'Impressum и Datenschutz, всё по закону',
        'Быстро грузится даже при слабой связи на объекте'
      ]
    },
    prices: {
      title: 'Сколько стоит. Заранее, а не потом.',
      founderTag: 'Первым 3 бизнесам: {founder}',
      perMonth: 'в месяц',
      cards: {
        websiteStart: 'До 5 страниц, тексты включены, онлайн за 7 дней.',
        websiteBusiness: 'До 10 страниц, отдельная страница на каждую услугу и каждый город.',
        websiteAbo: 'Плюс {setup} на старте. Без крупной оплаты сразу, минимальный срок 12 месяцев.',
        pflege: 'Хостинг, мелкие правки через WhatsApp, отчёт каждый месяц. Расторжение помесячно.'
      },
      swipe: 'Листайте вбок, чтобы увидеть все пакеты',
      note: 'Конечные цены. Всё дополнительное только по договорённости, {hourly} в час.',
      all: 'Все услуги и цены'
    },
    promise: {
      title: 'Три обещания. Письменно, в договоре.',
      items: [
        {title: 'Сначала смотрите, потом платите.', text: 'Если превью не понравилось, вы ничего не платите. Даже за превью.'},
        {title: '7 дней, или 3 месяца поддержки бесплатно.', text: 'Если задержка по нашей вине, поддержка три месяца ничего вам не стоит.'},
        {title: 'Всё принадлежит вам.', text: 'Домен, тексты, фото и код. Никакого договора, который вас держит.'}
      ]
    },
    team: {
      title: 'С кем вы говорите',
      lead: 'Вы общаетесь с двумя людьми, которые делают ваш сайт. Всегда по одному номеру.'
    },
    faq: {
      title: 'О чём нас спрашивают заранее',
      items: [
        {q: 'Сколько стоит превью?', a: 'Нисколько. Мы делаем его на свой риск. Не понравилось, значит, на этом всё.'},
        {q: 'Что нужно сделать мне самому?', a: '30 минут на разговор и несколько фото ваших работ. Если их нет, поставим подходящие картинки, пока не сделаете свои.'},
        {q: 'У меня нет на это времени.', a: 'Именно поэтому тексты пишем мы и всё техническое берём на себя. Правки потом просто присылаете в WhatsApp.'},
        {q: 'Сайт правда принесёт заказы?', a: 'Количество мы не обещаем. Но вы увидите сами: с поддержкой каждый месяц приходит отчёт, сколько людей позвонили или оставили заявку.'},
        {q: 'Я уже есть на Herold и в Facebook.', a: 'Там страница принадлежит платформе. Ваш сайт принадлежит вам, и Google показывает его, когда ищут в вашем районе.'},
        {q: 'Что будет после запуска?', a: 'С поддержкой за {care} мы берём на себя технику и мелкие правки. Без поддержки передаём вам всё, что нужно.'}
      ]
    },
    final: {
      title: 'Посмотрите на свой сайт, прежде чем решать.',
      lead: 'Превью будет у вас через 3 рабочих дня.',
      micro: 'Бесплатно и без обязательств.'
    },
    bar: {call: 'Позвонить', whatsapp: 'WhatsApp', preview: 'Получить превью'},
    whatsappMessage: 'Здравствуйте, TreeTech! Хочу бесплатное превью сайта для моего бизнеса.'
  }
};
