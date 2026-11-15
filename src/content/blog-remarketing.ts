import type {BlogPost} from '@/content/blog-types';

const g = (id: string) => `https://support.google.com/google-ads/answer/${id}`;

export const remarketingPost: BlogPost = {
  slug: 'google-ads-remarketing-dienstleister',
  publishedAt: '2026-11-15',
  featured: true,
  cover: 'remarketing',
  category: {de: 'Google Ads', en: 'Google Ads', ru: 'Google Ads'},
  title: {
    de: 'Remarketing mit Google Ads: So holen Sie Kunden zurück, die schon gesucht haben',
    en: 'Google Ads remarketing: how to win back customers who already searched for you',
    ru: 'Ремаркетинг Google Ads: как вернуть клиента, который уже искал ваши услуги'
  },
  excerpt: {
    de: 'Jemand sucht „Dachreparatur Preis“, landet auf Ihrer Seite und schließt den Tab. Wie Sie diese Menschen zurückholen, ohne zu nerven, und warum es mit Daten beginnt, nicht mit Bannern.',
    en: 'Someone searches “roof repair price”, lands on your site and closes the tab. How to bring these people back without annoying them, and why it starts with data, not banners.',
    ru: 'Человек искал «ремонт крыши цена», зашёл на сайт и закрыл вкладку. Как вернуть таких людей, не раздражая их, и почему всё начинается с данных, а не с баннеров.'
  },
  seoTitle: {
    de: 'Google Ads Remarketing für Dienstleister: Anleitung 2026',
    en: 'Google Ads remarketing for service businesses: 2026 guide',
    ru: 'Ремаркетинг Google Ads для бизнеса услуг: руководство 2026'
  },
  seoDescription: {
    de: 'Remarketing in Google Ads für Handwerk und Dienstleister: Segmente nach Kaufabsicht, Consent Mode v2, Such-Remarketing, Frequenz, Ausschlüsse und ehrliche Erfolgsmessung.',
    en: 'Google Ads remarketing for trades and service businesses: intent-based segments, Consent Mode v2, search remarketing, frequency, exclusions and honest measurement.',
    ru: 'Ремаркетинг в Google Ads для бизнеса услуг: сегменты по намерению, Consent Mode v2, поисковый ремаркетинг, частота, исключения и честная оценка результата.'
  },
  readingTime: {de: '12 Minuten', en: '12 minutes', ru: '12 минут'},
  tags: {
    de: ['Google Ads', 'Remarketing', 'Consent Mode v2', 'Dienstleister', 'Mehr Anfragen'],
    en: ['Google Ads', 'remarketing', 'Consent Mode v2', 'service businesses', 'more inquiries'],
    ru: ['Google Ads', 'ремаркетинг', 'Consent Mode v2', 'бизнес услуг', 'больше заявок']
  },
  sections: [
    {
      heading: {de: 'Warum Kunden beim ersten Besuch selten anfragen', en: 'Why customers rarely inquire on the first visit', ru: 'Почему клиент редко обращается с первого визита'},
      body: {
        ru: [
          {type: 'lead', text: 'Человек искал в Google «ремонт крыши цена», зашёл на ваш сайт, посмотрел услуги и закрыл вкладку. Он не обязательно выбрал конкурента.'},
          'Возможно, его отвлекли, он хотел посоветоваться с партнёром или сравнить ещё несколько предложений. Для бизнеса услуг это обычная ситуация: решение о ремонте, юридической консультации, установке кондиционера или разработке сайта редко принимают с первого визита.',
          {type: 'illustration', name: 'remarketing-journey', caption: 'Ремаркетинг работает с теми, кто уже проявил интерес, а не с холодной аудиторией.'},
          'Именно здесь появляется ремаркетинг Google Ads. Но это **не баннер, который неделю преследует человека** по всему интернету. Это способ вернуть в диалог тех, кто уже проявил интерес: с правильным сообщением, в правильный момент и с контролируемым бюджетом.'
        ],
        de: [
          {type: 'lead', text: 'Jemand sucht bei Google „Dachreparatur Preis“, öffnet Ihre Website, sieht sich die Leistungen an und schließt den Tab. Das heißt nicht, dass er sich für die Konkurrenz entschieden hat.'},
          'Vielleicht wurde er abgelenkt, wollte mit dem Partner reden oder noch zwei Angebote vergleichen. Für Dienstleister ist das völlig normal: Eine Sanierung, eine Rechtsberatung, eine Klimaanlage oder eine neue Website beauftragt kaum jemand beim ersten Besuch.',
          {type: 'illustration', name: 'remarketing-journey', caption: 'Remarketing spricht Menschen an, die schon Interesse gezeigt haben, nicht kaltes Publikum.'},
          'Genau hier setzt Remarketing in Google Ads an. Aber Remarketing ist **kein Banner, das jemanden eine Woche lang durchs Internet verfolgt**. Es holt Interessenten zurück ins Gespräch: mit der richtigen Botschaft, im richtigen Moment und mit kontrolliertem Budget.'
        ],
        en: [
          {type: 'lead', text: 'Someone searches Google for “roof repair price”, opens your website, looks at your services and closes the tab. That does not mean they picked a competitor.'},
          'Maybe they got distracted, wanted to talk it over with their partner or compare a few more offers. For service businesses this is completely normal: almost nobody books a renovation, legal advice, an air conditioner or a new website on the first visit.',
          {type: 'illustration', name: 'remarketing-journey', caption: 'Remarketing works with people who already showed interest, not with a cold audience.'},
          'This is where Google Ads remarketing comes in. But remarketing is **not a banner that follows someone around the internet for a week**. It brings interested people back into the conversation: with the right message, at the right moment and with a controlled budget.'
        ]
      }
    },
    {
      heading: {de: 'Was Remarketing in Google Ads heute ist', en: 'What remarketing in Google Ads is today', ru: 'Что такое ремаркетинг в Google Ads сегодня'},
      body: {
        ru: [
          `В интерфейсе Google Ads слова «ремаркетинг» уже почти нет. Google [переименовал этот раздел в «Ваши данные»](${g('2453998')}) (Your data segments), но суть не изменилась: вы показываете рекламу людям, которые уже взаимодействовали с вашим бизнесом.`,
          {type: 'list', style: 'bullet', items: [
            '**Посетители сайта.** Люди, которые были на сайте и попали в сегмент через тег Google.',
            '**Пользователи приложения.** Если у вас есть мобильное приложение.',
            `**Аудитория YouTube.** Люди, которые [смотрели ваши видео, подписались или заходили на канал](${g('2545661')}).`,
            '**Списки клиентов (Customer Match).** Email и телефоны из вашей CRM, которые вы загружаете в Google Ads.'
          ]},
          'Рекламу этим людям можно показывать в поиске, в контекстно-медийной сети (КМС), на YouTube, в Gmail и Discover.',
          {type: 'callout', tone: 'info', title: 'Cookie никуда не делись', text: 'О «смерти cookie» говорили годами, но в апреле 2025 года Google отказался от отключения сторонних cookie в Chrome, а в октябре 2025 года [свернул большую часть технологий Privacy Sandbox](https://privacysandbox.google.com/blog/update-on-plans-for-privacy-sandbox-technologies). Технически ремаркетинг никуда не исчезает.'},
          'Но правила игры изменились. Сегодня выигрывает не тот, кто чаще показывает баннер, а тот, у кого есть **качественные собственные данные, корректное согласие пользователей и честное измерение результата**.'
        ],
        de: [
          `In der Google-Ads-Oberfläche taucht das Wort „Remarketing“ kaum noch auf. Google hat den Bereich [in „Ihre Daten“ umbenannt](${g('2453998')}) (Your data segments). Das Prinzip ist gleich geblieben: Sie zeigen Werbung Menschen, die schon mit Ihrem Betrieb zu tun hatten.`,
          {type: 'list', style: 'bullet', items: [
            '**Website-Besucher.** Menschen, die auf Ihrer Seite waren und über das Google-Tag in ein Segment kamen.',
            '**App-Nutzer.** Falls Sie eine eigene App haben.',
            `**YouTube-Publikum.** Menschen, die [Ihre Videos angesehen, den Kanal abonniert oder besucht haben](${g('2545661')}).`,
            '**Kundenlisten (Customer Match).** E-Mail-Adressen und Telefonnummern aus Ihrem CRM, die Sie in Google Ads hochladen.'
          ]},
          'Diese Menschen erreichen Sie in der Google-Suche, im Displaynetzwerk, auf YouTube, in Gmail und in Discover.',
          {type: 'callout', tone: 'info', title: 'Cookies sind nicht verschwunden', text: 'Jahrelang war vom „Ende der Cookies“ die Rede. Im April 2025 hat Google aber darauf verzichtet, Drittanbieter-Cookies in Chrome abzuschalten, und im Oktober 2025 [den Großteil der Privacy-Sandbox-Technologien eingestellt](https://privacysandbox.google.com/blog/update-on-plans-for-privacy-sandbox-technologies). Technisch bleibt Remarketing also möglich.'},
          'Die Spielregeln haben sich trotzdem geändert. Heute gewinnt nicht, wer am häufigsten ein Banner zeigt, sondern wer **gute eigene Daten, eine saubere Einwilligung der Nutzer und eine ehrliche Erfolgsmessung** hat.'
        ],
        en: [
          `You will barely find the word “remarketing” in the Google Ads interface anymore. Google [renamed the section to “Your data”](${g('2453998')}) (Your data segments), but the idea is the same: you show ads to people who already interacted with your business.`,
          {type: 'list', style: 'bullet', items: [
            '**Website visitors.** People who visited your site and were added to a segment by the Google tag.',
            '**App users.** If you have a mobile app.',
            `**YouTube audience.** People who [watched your videos, subscribed or visited your channel](${g('2545661')}).`,
            '**Customer lists (Customer Match).** Emails and phone numbers from your CRM that you upload to Google Ads.'
          ]},
          'You can reach these people in Search, on the Display Network, on YouTube, in Gmail and in Discover.',
          {type: 'callout', tone: 'info', title: 'Cookies did not disappear', text: 'People talked about the “death of cookies” for years. But in April 2025 Google decided not to switch off third-party cookies in Chrome, and in October 2025 it [retired most Privacy Sandbox technologies](https://privacysandbox.google.com/blog/update-on-plans-for-privacy-sandbox-technologies). Technically, remarketing is here to stay.'},
          'The rules have changed, though. Today the winner is not whoever shows a banner most often, but whoever has **good first-party data, proper user consent and honest measurement**.'
        ]
      }
    },
    {
      heading: {de: 'Wann sich Remarketing lohnt', en: 'When remarketing makes sense', ru: 'Когда ремаркетинг имеет смысл'},
      body: {
        ru: [
          'Ремаркетинг не создаёт спрос. Он работает с тем спросом, который уже пришёл на ваш сайт. Поэтому перед запуском ответьте как минимум на пять вопросов:',
          {type: 'list', style: 'number', items: [
            'Достаточно ли трафика, чтобы сформировать аудиторию?',
            'Как долго клиент принимает решение: час, неделю или несколько месяцев?',
            'Есть ли что сказать во второй раз, кроме «напоминаем о себе»?',
            'Отслеживаете ли вы обращения: звонки, формы, мессенджеры?',
            'Сколько стоит клиент и сколько он приносит?'
          ]},
          {type: 'stats', items: [
            {value: '100', label: 'активных пользователей за 30 дней — минимум, чтобы сегмент показывал рекламу'},
            {value: '1 000', label: 'пользователей — рекомендуемый размер списка для сигналов в Performance Max'},
            {value: '540', label: 'дней — максимальный срок членства в сегменте'}
          ], note: 'По данным справки Google Ads'},
          `Первый пункт часто становится неприятным сюрпризом для небольших компаний. Чтобы сегмент вообще мог показывать рекламу в поиске, КМС или на YouTube, в нём должно быть [не меньше 100 активных пользователей за последние 30 дней](${g('2472738')}). Если на сайт сантехника заходит 300 человек в месяц, мелкие сегменты просто не заработают. Тогда нужны более широкие сегменты и более длинное окно членства.`,
          'Последний пункт самый важный. Если средний чек €3 000, а маржа 30%, один вернувшийся клиент окупает довольно большой ремаркетинговый бюджет. Если услуга стоит €40, считать нужно гораздо осторожнее.',
          {type: 'quote', text: 'Возвращать нужно не всех посетителей. Возвращать нужно тех, чьё возвращение приносит прибыль.'}
        ],
        de: [
          'Remarketing erzeugt keine Nachfrage. Es arbeitet mit der Nachfrage, die schon auf Ihrer Website angekommen ist. Beantworten Sie vor dem Start mindestens diese fünf Fragen:',
          {type: 'list', style: 'number', items: [
            'Haben Sie genug Besucher, um überhaupt eine Zielgruppe aufzubauen?',
            'Wie lange überlegen Ihre Kunden: eine Stunde, eine Woche oder mehrere Monate?',
            'Haben Sie beim zweiten Kontakt etwas zu sagen, außer „Wir sind noch da“?',
            'Messen Sie Anfragen: Anrufe, Formulare, WhatsApp?',
            'Was kostet ein Kunde und was bringt er Ihnen?'
          ]},
          {type: 'stats', items: [
            {value: '100', label: 'aktive Nutzer in 30 Tagen braucht ein Segment, damit Anzeigen ausgespielt werden'},
            {value: '1.000', label: 'Nutzer empfiehlt Google als Listengröße für Signale in Performance Max'},
            {value: '540', label: 'Tage beträgt die maximale Mitgliedsdauer in einem Segment'}
          ], note: 'Laut Google-Ads-Hilfe'},
          `Der erste Punkt ist für kleine Betriebe oft eine unangenehme Überraschung. Damit ein Segment in der Suche, im Displaynetzwerk oder auf YouTube überhaupt Anzeigen ausspielt, braucht es [mindestens 100 aktive Nutzer in den letzten 30 Tagen](${g('2472738')}). Kommen auf die Website eines Installateurs 300 Besucher im Monat, funktionieren kleine Segmente schlicht nicht. Dann braucht es breitere Segmente und eine längere Mitgliedsdauer.`,
          'Der letzte Punkt ist der wichtigste. Liegt ein Auftrag im Schnitt bei 3.000 € und die Marge bei 30 %, finanziert ein einziger zurückgewonnener Kunde ein ordentliches Remarketing-Budget. Kostet die Leistung 40 €, müssen Sie deutlich vorsichtiger rechnen.',
          {type: 'quote', text: 'Holen Sie nicht alle Besucher zurück. Holen Sie die zurück, deren Rückkehr Gewinn bringt.'}
        ],
        en: [
          'Remarketing does not create demand. It works with the demand that has already reached your website. Before you start, answer at least these five questions:',
          {type: 'list', style: 'number', items: [
            'Do you have enough traffic to build an audience at all?',
            'How long do your customers take to decide: an hour, a week or several months?',
            'Do you have something to say the second time, other than “we are still here”?',
            'Do you track inquiries: calls, forms, messengers?',
            'What does a customer cost and what do they bring in?'
          ]},
          {type: 'stats', items: [
            {value: '100', label: 'active users in 30 days is the minimum for a segment to serve ads'},
            {value: '1,000', label: 'users is the recommended list size for Performance Max signals'},
            {value: '540', label: 'days is the maximum membership duration of a segment'}
          ], note: 'According to Google Ads Help'},
          `The first point is often an unpleasant surprise for small businesses. For a segment to serve ads in Search, Display or on YouTube, it needs [at least 100 active users in the last 30 days](${g('2472738')}). If a plumber’s website gets 300 visitors a month, small segments simply will not work. You then need broader segments and a longer membership window.`,
          'The last point matters most. If an average job is worth €3,000 at a 30% margin, one returning customer pays for a decent remarketing budget. If the service costs €40, you have to do the maths far more carefully.',
          {type: 'quote', text: 'Do not bring back every visitor. Bring back the ones whose return makes you money.'}
        ]
      }
    },
    {
      heading: {de: 'Am Anfang stehen Daten, nicht Banner', en: 'Start with data, not banners', ru: 'Начинаем не с баннеров, а с данных'},
      body: {
        ru: [
          'Самая распространённая ошибка: создать список «Все посетители», добавить несколько картинок и считать ремаркетинг настроенным. Перед запуском должны работать три вещи.',
          {type: 'steps', items: [
            {title: 'Тег Google и события', text: `Тег добавляет людей в сегменты, а [фрагмент события](${g('2454000')}) позволяет выделить тех, кто совершил конкретное действие. Для услуг это просмотр страницы цен, открытие формы, клик по телефону, расчёт в калькуляторе.`},
            {title: 'Конверсии и качество лидов', text: `Без конверсий невозможно исключить тех, кто уже обратился, и оценить результат. Сильный шаг для услуг: [расширенные конверсии для лидов](${g('11909980')}). Вы передаёте из CRM, какие обращения стали реальными клиентами, и алгоритм учится на продажах, а не на случайных заявках.`},
            {title: 'Согласие пользователей (Consent Mode v2)', text: `Для посетителей из Европейской экономической зоны Google требует [собирать согласие и передавать его сигналы](${g('13695607')}). Для персонализированной рекламы [нужны оба разрешения](${g('13802165')}): ad_user_data и ad_personalization. Без них ремаркетинг для этих людей недоступен.`}
          ]},
          {type: 'illustration', name: 'consent-audience', caption: 'Пример: из 1 000 посетителей в ремаркетинг попадают только те, кто дал согласие.'},
          {type: 'callout', tone: 'tip', title: 'Cookie-баннер — это маркетинг', text: 'Качественный cookie-баннер становится частью маркетинга, а не только юридической формальностью. От доли людей, которые дают согласие, напрямую зависит размер ваших аудиторий.'}
        ],
        de: [
          'Der häufigste Fehler: eine Liste „Alle Besucher“ anlegen, ein paar Bilder hochladen und das Remarketing für erledigt halten. Bevor es losgeht, müssen drei Dinge funktionieren.',
          {type: 'steps', items: [
            {title: 'Google-Tag und Ereignisse', text: `Das Tag fügt Menschen zu Segmenten hinzu, mit dem [Ereignis-Snippet](${g('2454000')}) erkennen Sie, wer eine bestimmte Aktion gemacht hat. Bei Dienstleistern ist das zum Beispiel: Preisseite angesehen, Formular geöffnet, auf die Telefonnummer getippt, Rechner benutzt.`},
            {title: 'Conversions und Lead-Qualität', text: `Ohne Conversions können Sie weder Menschen ausschließen, die schon angefragt haben, noch den Erfolg bewerten. Ein starker Schritt: [erweiterte Conversions für Leads](${g('11909980')}). Sie melden aus dem CRM zurück, welche Anfragen echte Kunden wurden. So lernt der Algorithmus aus Aufträgen statt aus zufälligen Anfragen.`},
            {title: 'Einwilligung (Consent Mode v2)', text: `Für Besucher aus dem Europäischen Wirtschaftsraum verlangt Google, [die Einwilligung einzuholen und als Signal weiterzugeben](${g('13695607')}). Für personalisierte Werbung [braucht es beide Zustimmungen](${g('13802165')}): ad_user_data und ad_personalization. Ohne sie gibt es für diese Menschen kein Remarketing.`}
          ]},
          {type: 'illustration', name: 'consent-audience', caption: 'Beispiel: Von 1.000 Besuchern landen nur jene im Remarketing, die zugestimmt haben.'},
          {type: 'callout', tone: 'tip', title: 'Der Cookie-Banner ist Marketing', text: 'Ein guter Cookie-Banner ist nicht nur eine rechtliche Pflicht, sondern Teil Ihres Marketings. Wie viele Menschen zustimmen, bestimmt direkt, wie groß Ihre Zielgruppen werden.'}
        ],
        en: [
          'The most common mistake: create an “All visitors” list, upload a few images and call remarketing done. Three things have to work before you start.',
          {type: 'steps', items: [
            {title: 'Google tag and events', text: `The tag adds people to segments, and the [event snippet](${g('2454000')}) lets you single out those who took a specific action. For service businesses that means viewing the pricing page, opening the form, tapping the phone number or using a calculator.`},
            {title: 'Conversions and lead quality', text: `Without conversions you cannot exclude people who already got in touch, and you cannot judge results. A strong step: [enhanced conversions for leads](${g('11909980')}). You send back from your CRM which inquiries became real customers, so the algorithm learns from sales rather than random form fills.`},
            {title: 'User consent (Consent Mode v2)', text: `For visitors from the European Economic Area, Google requires you to [collect consent and pass on consent signals](${g('13695607')}). Personalised ads [need both permissions](${g('13802165')}): ad_user_data and ad_personalization. Without them there is no remarketing for these users.`}
          ]},
          {type: 'illustration', name: 'consent-audience', caption: 'Example: out of 1,000 visitors, only those who gave consent end up in remarketing.'},
          {type: 'callout', tone: 'tip', title: 'Your cookie banner is marketing', text: 'A good cookie banner is part of your marketing, not just a legal formality. The share of people who agree directly determines how big your audiences get.'}
        ]
      }
    },
    {
      heading: {de: 'Segmente nach Kaufabsicht statt nach Besuch', en: 'Segment by intent, not by visit', ru: 'Сегментируем по намерению, а не по факту визита'},
      body: {
        ru: [
          `Человек, который ушёл с блога через десять секунд, и человек, который трижды открывал страницу цен, — разные клиенты. И платить за их возвращение стоит по-разному. У каждого сегмента есть правило добавления и [срок членства](${g('2472738')}): по умолчанию 30 дней, максимум 540. Google советует выбирать срок, близкий к длине вашего цикла продажи.`,
          {type: 'illustration', name: 'intent-ladder', caption: 'Чем ближе человек к заявке, тем выше ставка и тем короче окно.'},
          'Для типичного бизнеса услуг мы начинаем с такой структуры (сроки — ориентир, сверьте их со своим циклом):',
          {type: 'table', head: ['Сегмент', 'Правило', 'Срок', 'Что делаем'], rows: [
            ['«Горячие»', 'Открыли форму или калькулятор, но не отправили', '7–14 дней', 'Самые высокие ставки, простой призыв к действию'],
            ['Цены и услуги', 'Смотрели «Цены» или страницу конкретной услуги', '30 дней', 'Аргументы, кейсы, гарантии'],
            ['Общий интерес', 'Любой визит без целевого действия', '30–90 дней', 'Ставки ниже или только наблюдение'],
            ['Уже обратились', 'Конверсия: заявка, звонок', '30–90 дней', 'Исключение из кампаний на привлечение'],
            ['Клиенты', 'Список из CRM (Customer Match)', 'до 540 дней', 'Исключения, повторные услуги, сервис'],
            ['Сезонные', 'Клиенты прошлого сезона', '365–400 дней', 'Напоминание перед сезоном: сервис кондиционера, шиномонтаж']
          ]},
          'Последняя строка следует прямому совету Google: для сезонного спроса можно ставить срок «год плюс несколько дней», чтобы застать человека в следующем году.',
          {type: 'list', style: 'check', items: [
            'Новому сегменту нужно время, чтобы набрать аудиторию. Создавайте списки заранее, даже если рекламу запустите позже.',
            'Если сократить срок, люди за пределами нового окна будут удалены из списка.',
            'Сегмент, который не использовался в таргетинге 540 дней, автоматически закрывается.',
            'Чем мельче сегмент, тем выше риск, что он не наберёт минимального объёма для показов.'
          ]}
        ],
        de: [
          `Wer nach zehn Sekunden den Blog verlässt, und wer dreimal die Preisseite geöffnet hat, sind zwei verschiedene Kunden. Für ihre Rückkehr sollten Sie unterschiedlich viel bezahlen. Jedes Segment hat eine Regel und eine [Mitgliedsdauer](${g('2472738')}): standardmäßig 30 Tage, höchstens 540. Google empfiehlt, die Dauer an Ihren Verkaufszyklus anzupassen.`,
          {type: 'illustration', name: 'intent-ladder', caption: 'Je näher jemand an der Anfrage ist, desto höher das Gebot und desto kürzer das Zeitfenster.'},
          'Für einen typischen Dienstleister starten wir mit dieser Struktur (die Zeiträume sind Richtwerte, gleichen Sie sie mit Ihrem Zyklus ab):',
          {type: 'table', head: ['Segment', 'Regel', 'Dauer', 'Was wir tun'], rows: [
            ['„Heiß“', 'Formular oder Rechner geöffnet, aber nicht abgeschickt', '7–14 Tage', 'Höchste Gebote, einfache Handlungsaufforderung'],
            ['Preise und Leistungen', '„Preise“ oder eine bestimmte Leistung angesehen', '30 Tage', 'Argumente, Referenzen, Garantien'],
            ['Allgemeines Interesse', 'Besuch ohne Zielaktion', '30–90 Tage', 'Niedrigere Gebote oder nur Beobachtung'],
            ['Schon angefragt', 'Conversion: Anfrage, Anruf', '30–90 Tage', 'Ausschluss aus Neukunden-Kampagnen'],
            ['Kunden', 'Liste aus dem CRM (Customer Match)', 'bis 540 Tage', 'Ausschlüsse, Folgeaufträge, Service'],
            ['Saisonal', 'Kunden der letzten Saison', '365–400 Tage', 'Erinnerung vor der Saison: Klima-Service, Reifenwechsel']
          ]},
          'Die letzte Zeile folgt direkt einer Empfehlung von Google: Bei saisonaler Nachfrage können Sie „ein Jahr plus ein paar Tage“ einstellen, um den Kunden im nächsten Jahr wieder zu erreichen.',
          {type: 'list', style: 'check', items: [
            'Ein neues Segment braucht Zeit, um sich zu füllen. Legen Sie Listen früh an, auch wenn die Werbung erst später startet.',
            'Verkürzen Sie die Dauer, fallen alle außerhalb des neuen Zeitfensters aus der Liste.',
            'Ein Segment, das 540 Tage nicht im Targeting genutzt wurde, wird automatisch geschlossen.',
            'Je kleiner ein Segment, desto größer das Risiko, dass es die Mindestgröße für Anzeigen nicht erreicht.'
          ]}
        ],
        en: [
          `Someone who leaves your blog after ten seconds and someone who opened your pricing page three times are different customers. Their return is worth different money. Every segment has a rule and a [membership duration](${g('2472738')}): 30 days by default, 540 at most. Google recommends matching it to your sales cycle.`,
          {type: 'illustration', name: 'intent-ladder', caption: 'The closer someone is to inquiring, the higher the bid and the shorter the window.'},
          'For a typical service business we start with this structure (durations are a guide, check them against your own cycle):',
          {type: 'table', head: ['Segment', 'Rule', 'Duration', 'What we do'], rows: [
            ['“Hot”', 'Opened the form or calculator but did not submit', '7–14 days', 'Highest bids, one simple call to action'],
            ['Pricing and services', 'Viewed “Pricing” or a specific service page', '30 days', 'Arguments, case studies, guarantees'],
            ['General interest', 'Any visit without a goal action', '30–90 days', 'Lower bids or observation only'],
            ['Already inquired', 'Conversion: form, call', '30–90 days', 'Excluded from acquisition campaigns'],
            ['Customers', 'CRM list (Customer Match)', 'up to 540 days', 'Exclusions, repeat jobs, service'],
            ['Seasonal', 'Last season’s customers', '365–400 days', 'Reminder before the season: AC service, tyre change']
          ]},
          'The last row follows Google’s own advice: for seasonal demand you can set “a year plus a few days” to reach the person again next year.',
          {type: 'list', style: 'check', items: [
            'A new segment needs time to fill. Create lists early, even if ads start later.',
            'If you shorten the duration, people outside the new window are removed from the list.',
            'A segment not used for targeting for 540 days is closed automatically.',
            'The smaller the segment, the higher the risk it never reaches the minimum size to serve.'
          ]}
        ]
      }
    },
    {
      heading: {de: 'Welche Kanäle Sie nutzen sollten', en: 'Which channels to use', ru: 'Какие каналы использовать'},
      body: {
        ru: [
          'Универсального набора нет. Но для услуг у каналов есть чёткий порядок приоритета.',
          {type: 'illustration', name: 'channel-priority'},
          `**Поисковый ремаркетинг — самый сильный инструмент для услуг.** Ваш бывший посетитель [снова ищет в Google](${g('2701222')}) «электрик Вена». Он уже знает вас и всё ещё нуждается в услуге. В поиске есть два режима ([«Таргетинг» и «Наблюдение»](${g('7365594')})): в режиме наблюдения реклама идёт всем по ключевым словам, а аудитории становятся сигналами для Smart Bidding. В режиме таргетинга реклама показывается только людям из списка — так можно покупать широкие запросы, которые для холодной аудитории были бы слишком дорогими.`,
          {type: 'callout', tone: 'info', title: 'Пример', text: 'Для всех пользователей ремонтная компания покупает «ремонт ванной под ключ», а для своих посетителей ещё и широкое «плитка для ванной».'},
          `**Контекстно-медийная сеть** [охватывает более 2 млн сайтов и приложений](https://support.google.com/sa360/answer/9571801). Это канал для напоминания, а не для преследования: здесь особенно важны частота показов и качество креатива.`,
          `**YouTube и Demand Gen.** Там, где важно доверие, видео работает лучше баннера: знакомство с мастером, процесс работы, отзыв клиента. [Demand Gen](${g('15594567')}) показывает рекламу на YouTube, в Gmail и Discover, и именно в нём есть похожие сегменты (lookalike) на основе ваших данных.`,
          `**Performance Max.** Здесь ваши списки — [сигналы аудитории](${g('14530785')}), а не жёсткий таргетинг: кампания может показывать рекламу и за их пределами. Поэтому PMax — инструмент привлечения с подсказками, а не чистый ремаркетинг. Новым сигналам нужно до двух недель, чтобы повлиять на оптимизацию.`,
          `**Customer Match.** Загруженная база клиентов работает даже там, где cookie не помогают. Но полный таргетинг и корректировки ставок [доступны только аккаунтам с 90 днями истории и расходами более $50 000](${g('6299717')}). Для большинства небольших компаний список клиентов — это прежде всего исключения и сигнал для алгоритма.`
        ],
        de: [
          'Ein Standardpaket gibt es nicht. Für Dienstleister haben die Kanäle aber eine klare Reihenfolge.',
          {type: 'illustration', name: 'channel-priority'},
          `**Such-Remarketing ist das stärkste Werkzeug für Dienstleister.** Ihr früherer Besucher [sucht wieder bei Google](${g('2701222')}), etwa „Elektriker Wien“. Er kennt Sie schon und braucht die Leistung immer noch. In der Suche gibt es zwei Einstellungen ([„Targeting“ und „Beobachtung“](${g('7365594')})): Bei Beobachtung läuft die Anzeige für alle Keywords, die Zielgruppen werden zu Signalen für Smart Bidding. Bei Targeting sehen nur Menschen aus der Liste die Anzeige. So können Sie breite Suchbegriffe buchen, die für kaltes Publikum zu teuer wären.`,
          {type: 'callout', tone: 'info', title: 'Beispiel', text: 'Für alle bucht ein Sanierungsbetrieb „Badsanierung komplett“, für frühere Besucher zusätzlich das breite „Fliesen Badezimmer“.'},
          `**Das Displaynetzwerk** [umfasst mehr als 2 Millionen Websites und Apps](https://support.google.com/sa360/answer/9571801). Es ist ein Kanal zum Erinnern, nicht zum Verfolgen. Frequenz und gute Gestaltung sind hier besonders wichtig.`,
          `**YouTube und Demand Gen.** Wo Vertrauen zählt, wirkt Video stärker als ein Banner: der Meister stellt sich vor, ein Blick auf die Arbeit, eine Kundenstimme. [Demand Gen](${g('15594567')}) spielt Anzeigen auf YouTube, in Gmail und Discover aus und bietet ähnliche Segmente (Lookalikes) auf Basis Ihrer Daten.`,
          `**Performance Max.** Ihre Listen sind hier [Zielgruppensignale](${g('14530785')}), kein festes Targeting: Die Kampagne darf auch außerhalb davon ausspielen. PMax ist also Neukundengewinnung mit Hinweisen, kein reines Remarketing. Neue Signale brauchen bis zu zwei Wochen, bis sie die Optimierung beeinflussen.`,
          `**Customer Match.** Eine hochgeladene Kundenliste funktioniert auch dort, wo Cookies nicht helfen. Volles Targeting und Gebotsanpassungen gibt es aber [nur für Konten mit 90 Tagen Verlauf und mehr als 50.000 US-Dollar Ausgaben](${g('6299717')}). Für die meisten kleinen Betriebe dient die Kundenliste deshalb vor allem für Ausschlüsse und als Signal für den Algorithmus.`
        ],
        en: [
          'There is no universal set. But for service businesses the channels have a clear order of priority.',
          {type: 'illustration', name: 'channel-priority'},
          `**Search remarketing is the strongest tool for services.** Your former visitor [searches Google again](${g('2701222')}) for “electrician Vienna”. They already know you and still need the service. Search has two settings ([“Targeting” and “Observation”](${g('7365594')})): with observation, ads run for everyone on your keywords and audiences become Smart Bidding signals. With targeting, only people on the list see the ad, so you can buy broad queries that would be too expensive for a cold audience.`,
          {type: 'callout', tone: 'info', title: 'Example', text: 'For everyone, a renovation company buys “complete bathroom renovation”; for its own visitors it also buys the broad “bathroom tiles”.'},
          `**The Display Network** [reaches more than 2 million websites and apps](https://support.google.com/sa360/answer/9571801). It is a channel for reminding, not chasing. Frequency and creative quality matter most here.`,
          `**YouTube and Demand Gen.** Where trust matters, video beats banners: meet the tradesperson, see the work, hear a customer. [Demand Gen](${g('15594567')}) serves ads on YouTube, Gmail and Discover and offers lookalike segments based on your data.`,
          `**Performance Max.** Your lists are [audience signals](${g('14530785')}) here, not strict targeting: the campaign can serve beyond them. So PMax is acquisition with hints, not pure remarketing. New signals take up to two weeks to affect optimisation.`,
          `**Customer Match.** An uploaded customer list works even where cookies do not. But full targeting and bid adjustments are [only available to accounts with 90 days of history and more than $50,000 in spend](${g('6299717')}). For most small businesses, the customer list is mainly for exclusions and as a signal for the algorithm.`
        ]
      }
    },
    {
      heading: {de: 'Die Botschaft zählt mehr als die Einblendung', en: 'The message matters more than the impression', ru: 'Сообщение важнее самого показа'},
      body: {
        ru: [
          'Человек не оставил заявку по какой-то причине. Ремаркетинг должен ответить именно на неё, а не просто напомнить о существовании компании. В бизнесе услуг чаще всего встречаются такие сомнения:',
          {type: 'qa', items: [
            {q: '«Дорого?»', a: 'Что входит в цену, прозрачная смета, рассрочка, бесплатный выезд замерщика.'},
            {q: '«Можно ли вам доверять?»', a: 'Кейсы с фото «до/после», отзывы, гарантия, лицензии и сертификаты.'},
            {q: '«Не сейчас»', a: 'Преимущество раннего старта, свободные даты на следующий месяц.'},
            {q: '«Непонятно, что делать дальше»', a: 'Один простой шаг: «Получите расчёт за 15 минут», «Напишите в WhatsApp».'},
            {q: '«Сравниваю несколько вариантов»', a: 'Чем именно вы отличаетесь: сроки, локальное присутствие, фиксированная цена.'}
          ]},
          {type: 'flow', items: ['Сегмент', 'Его сомнение', 'Аргумент', 'Один призыв', 'Подходящая страница']},
          {type: 'callout', tone: 'warn', title: 'Реклама не должна звучать как слежка', text: '«Вы смотрели ремонт ванной вчера» вызывает дискомфорт. «Ремонт ванной за 14 дней с фиксированной ценой» работает лучше и не выдаёт, что за человеком «следят».'}
        ],
        de: [
          'Der Besucher hat aus einem bestimmten Grund nicht angefragt. Remarketing muss genau darauf antworten, statt nur zu erinnern, dass es Ihren Betrieb gibt. Bei Dienstleistern sind das die häufigsten Zweifel:',
          {type: 'qa', items: [
            {q: '„Zu teuer?“', a: 'Was im Preis enthalten ist, ein transparenter Kostenvoranschlag, Ratenzahlung, kostenlose Besichtigung.'},
            {q: '„Kann ich euch vertrauen?“', a: 'Vorher-nachher-Fotos, Bewertungen, Garantie, Befugnisse und Zertifikate.'},
            {q: '„Nicht jetzt“', a: 'Der Vorteil eines frühen Starts, freie Termine im nächsten Monat.'},
            {q: '„Was soll ich als Nächstes tun?“', a: 'Ein einziger einfacher Schritt: „Angebot in 15 Minuten“, „Schreiben Sie uns auf WhatsApp“.'},
            {q: '„Ich vergleiche noch“', a: 'Was Sie genau unterscheidet: Termine, Nähe, Fixpreis.'}
          ]},
          {type: 'flow', items: ['Segment', 'Sein Zweifel', 'Argument', 'Ein Aufruf', 'Passende Seite']},
          {type: 'callout', tone: 'warn', title: 'Werbung darf nicht nach Überwachung klingen', text: '„Sie haben sich gestern Badsanierung angesehen“ wirkt unangenehm. „Badsanierung in 14 Tagen zum Fixpreis“ wirkt besser und verrät nicht, dass jemand „beobachtet“ wird.'}
        ],
        en: [
          'The visitor did not inquire for a reason. Remarketing has to answer that reason, not just remind them your business exists. These are the most common doubts in service businesses:',
          {type: 'qa', items: [
            {q: '“Too expensive?”', a: 'What the price includes, a transparent estimate, instalments, a free site visit.'},
            {q: '“Can I trust you?”', a: 'Before-and-after photos, reviews, guarantees, licences and certificates.'},
            {q: '“Not now”', a: 'The benefit of starting early, free dates next month.'},
            {q: '“What do I do next?”', a: 'One simple step: “Get a quote in 15 minutes”, “Message us on WhatsApp”.'},
            {q: '“I am comparing options”', a: 'What exactly makes you different: timing, being local, a fixed price.'}
          ]},
          {type: 'flow', items: ['Segment', 'Its doubt', 'Argument', 'One call to action', 'Matching page']},
          {type: 'callout', tone: 'warn', title: 'Ads must not sound like surveillance', text: '“You looked at bathroom renovation yesterday” feels creepy. “Bathroom renovation in 14 days at a fixed price” works better and does not reveal that anyone is being “watched”.'}
        ]
      }
    },
    {
      heading: {de: 'Frequenz, Ausschlüsse und Regeln', en: 'Frequency, exclusions and rules', ru: 'Частота, исключения и правила'},
      body: {
        ru: [
          'Ремаркетинг портится быстрее, чем любой другой канал. Достаточно показать одному человеку одно и то же объявление десять раз в день.',
          {type: 'list', style: 'bullet', items: [
            `**Частота показов.** [Ограничение частоты](${g('6034106')}) можно установить в кампаниях КМС и видеокампаниях. В Demand Gen этой функции нет, там частоту контролируют через размер аудитории, бюджет и смену креативов.`,
            '**Исключения.** Человек, который уже оставил заявку, не должен видеть рекламу «Оставьте заявку». Это сливает бюджет и раздражает клиента, который уже ждёт звонка.',
            `**Чувствительные категории.** Если услуги касаются здоровья, психологической помощи или финансовых трудностей, [собственные аудитории использовать нельзя](https://support.google.com/adspolicy/answer/143465). Стратегия строится на поисковых запросах и контексте.`,
            '**Конфиденциальность данных.** Для Customer Match можно загружать только собственные данные, собранные законно. Политика конфиденциальности должна сообщать о передаче данных третьим сторонам. Купленная база — риск для аккаунта и бизнеса.'
          ]}
        ],
        de: [
          'Remarketing geht schneller kaputt als jeder andere Kanal. Es reicht, einem Menschen zehnmal am Tag dieselbe Anzeige zu zeigen.',
          {type: 'list', style: 'bullet', items: [
            `**Frequenz.** Ein [Frequency Capping](${g('6034106')}) lässt sich in Display- und Videokampagnen einstellen. Demand Gen bietet das nicht, dort steuern Sie über Zielgruppengröße, Budget und regelmäßig neue Anzeigen.`,
            '**Ausschlüsse.** Wer schon angefragt hat, soll keine Anzeige „Jetzt anfragen“ sehen. Das verbrennt Budget und nervt jemanden, der ohnehin auf Ihren Rückruf wartet.',
            `**Sensible Kategorien.** Betreffen Ihre Leistungen Gesundheit, psychologische Hilfe oder finanzielle Schwierigkeiten, [dürfen Sie keine eigenen Zielgruppen nutzen](https://support.google.com/adspolicy/answer/143465). Dann baut die Strategie auf Suchbegriffe und Kontext.`,
            '**Datenschutz.** Für Customer Match dürfen Sie nur eigene, rechtmäßig erhobene Daten hochladen. Ihre Datenschutzerklärung muss die Weitergabe an Dritte erwähnen. Gekaufte Adresslisten gefährden Konto und Betrieb.'
          ]}
        ],
        en: [
          'Remarketing goes bad faster than any other channel. All it takes is showing one person the same ad ten times a day.',
          {type: 'list', style: 'bullet', items: [
            `**Frequency.** You can set [frequency capping](${g('6034106')}) in Display and video campaigns. Demand Gen does not have it, so there you control frequency through audience size, budget and fresh creatives.`,
            '**Exclusions.** Someone who already inquired should not see a “Get in touch” ad. It burns budget and annoys a customer who is already waiting for your call.',
            `**Sensitive categories.** If your services touch health, psychological help or financial hardship, [you cannot use your own audiences](https://support.google.com/adspolicy/answer/143465). Build the strategy on search queries and context instead.`,
            '**Data privacy.** For Customer Match, upload only your own lawfully collected data. Your privacy policy must mention sharing data with third parties. A bought list puts both the account and the business at risk.'
          ]}
        ]
      }
    },
    {
      heading: {de: 'Die wichtigste Frage: Wäre der Kunde auch ohne Werbung gekommen?', en: 'The key question: would the customer have come back anyway?', ru: 'Главный вопрос: вернулся бы клиент и без рекламы?'},
      body: {
        ru: [
          `Ремаркетинг почти всегда выглядит самым прибыльным каналом в отчётах. И это логично: он встречает человека в самом конце пути, когда решение уже почти принято. Независимо от [модели атрибуции](${g('6259715')}) отчёт показывает, кому засчитана конверсия, но не отвечает, обратился бы человек и без рекламы.`,
          'Поэтому мы смотрим на ремаркетинг через всю воронку:',
          {type: 'flow', items: ['Визит', 'Возвращение', 'Обращение', 'Квалифицированный лид', 'Договор', 'Прибыль']},
          {type: 'list', style: 'check', items: [
            `**Стоимость квалифицированного лида**, а не любой заявки. Здесь помогает [импорт офлайн-конверсий из CRM](${g('15479791')}).`,
            '**Доля новых клиентов** среди тех, кто вернулся через ремаркетинг.',
            '**Частота и охват:** сколько раз человек видит рекламу до обращения.',
            '**Обращения из брендового поиска.** Часть людей вернулась бы сама, введя название компании.'
          ]},
          'Самый честный способ — эксперимент с контрольной группой: часть аудитории не видит ремаркетинг, и вы сравниваете результат. На малых бюджетах проще сравнить число договоров в периоды с ремаркетингом и без него.',
          {type: 'quote', text: 'Бизнесу нужны не дешёвые возвращения. Бизнесу нужны дополнительные клиенты, которых без рекламы не было бы.'}
        ],
        de: [
          `In Berichten sieht Remarketing fast immer wie der profitabelste Kanal aus. Das ist logisch: Es trifft den Menschen ganz am Ende, wenn die Entscheidung fast gefallen ist. Egal welches [Attributionsmodell](${g('6259715')}) Sie nutzen: Der Bericht zeigt, wem die Conversion zugerechnet wird, aber nicht, ob der Kunde auch ohne Anzeige gekommen wäre.`,
          'Deshalb betrachten wir Remarketing über den ganzen Weg:',
          {type: 'flow', items: ['Besuch', 'Rückkehr', 'Anfrage', 'Qualifizierter Lead', 'Auftrag', 'Gewinn']},
          {type: 'list', style: 'check', items: [
            `**Kosten pro qualifiziertem Lead**, nicht pro beliebiger Anfrage. Dabei hilft der [Import von Offline-Conversions aus dem CRM](${g('15479791')}).`,
            '**Anteil echter Neukunden** unter denen, die über Remarketing zurückkamen.',
            '**Frequenz und Reichweite:** wie oft jemand die Anzeige vor der Anfrage sieht.',
            '**Anfragen über die Markensuche.** Ein Teil wäre ohnehin gekommen und hätte einfach Ihren Firmennamen gegoogelt.'
          ]},
          'Am ehrlichsten ist ein Test mit Kontrollgruppe: Ein Teil der Zielgruppe sieht kein Remarketing, dann vergleichen Sie. Bei kleinen Budgets reicht es, die Zahl der Aufträge in Zeiträumen mit und ohne Remarketing zu vergleichen.',
          {type: 'quote', text: 'Ein Betrieb braucht keine billigen Rückkehrer. Er braucht zusätzliche Kunden, die es ohne Werbung nicht gegeben hätte.'}
        ],
        en: [
          `Remarketing almost always looks like the most profitable channel in reports. That makes sense: it meets the person at the very end, when the decision is nearly made. Whatever [attribution model](${g('6259715')}) you use, the report shows who gets credit for the conversion, not whether the person would have come anyway.`,
          'That is why we look at remarketing across the whole funnel:',
          {type: 'flow', items: ['Visit', 'Return', 'Inquiry', 'Qualified lead', 'Contract', 'Profit']},
          {type: 'list', style: 'check', items: [
            `**Cost per qualified lead**, not per any form fill. [Importing offline conversions from your CRM](${g('15479791')}) helps here.`,
            '**Share of genuinely new customers** among those who returned via remarketing.',
            '**Frequency and reach:** how many times someone sees the ad before inquiring.',
            '**Inquiries from branded search.** Some people would have come back by typing your company name.'
          ]},
          'The most honest method is a holdout test: part of the audience sees no remarketing, then you compare. On small budgets, simply compare the number of contracts in periods with and without remarketing.',
          {type: 'quote', text: 'A business does not need cheap returns. It needs extra customers it would not have had without the ads.'}
        ]
      }
    },
    {
      heading: {de: 'Typische Fehler bei Dienstleistern', en: 'Typical mistakes in service remarketing', ru: 'Типичные ошибки в ремаркетинге услуг'},
      body: {
        ru: [
          {type: 'list', style: 'number', items: [
            '**Один список «Все посетители».** Человек, который искал вакансию, получает ту же рекламу, что и горячий клиент.',
            '**Нет исключений.** Клиенты и те, кто уже обратился, продолжают видеть «Оставьте заявку».',
            '**Бесконечная частота.** Одно и то же объявление неделями вызывает раздражение, а не доверие.',
            '**Срок «по умолчанию».** 30 дней подходят для аварийного сантехника, но не для строительства дома.',
            '**Ремаркетинг без Consent Mode v2.** Списки для аудитории из ЕЭЗ перестают пополняться, и это замечают только через месяцы.',
            '**Оценка только по отчёту Google Ads.** Высокий ROAS в отчёте ещё не значит, что пришли дополнительные клиенты.',
            '**Слабая посадочная страница.** Если человек ушёл из-за непонятного предложения, реклама вернёт его ровно туда же.'
          ]}
        ],
        de: [
          {type: 'list', style: 'number', items: [
            '**Eine einzige Liste „Alle Besucher“.** Wer einen Job gesucht hat, sieht dieselbe Werbung wie ein heißer Interessent.',
            '**Keine Ausschlüsse.** Kunden und Menschen, die schon angefragt haben, sehen weiter „Jetzt anfragen“.',
            '**Endlose Frequenz.** Wochenlang dieselbe Anzeige erzeugt Ärger statt Vertrauen.',
            '**Standarddauer.** 30 Tage passen zum Installateur-Notdienst, nicht zum Hausbau.',
            '**Remarketing ohne Consent Mode v2.** Listen für Besucher aus dem EWR wachsen nicht mehr, und das merkt man oft erst nach Monaten.',
            '**Bewertung nur nach dem Google-Ads-Bericht.** Ein hoher ROAS heißt noch nicht, dass zusätzliche Kunden gekommen sind.',
            '**Schwache Zielseite.** Wer wegen eines unklaren Angebots gegangen ist, landet durch die Anzeige genau dort wieder.'
          ]}
        ],
        en: [
          {type: 'list', style: 'number', items: [
            '**One “All visitors” list.** Someone looking for a job sees the same ad as a hot prospect.',
            '**No exclusions.** Customers and people who already inquired keep seeing “Get in touch”.',
            '**Endless frequency.** The same ad for weeks breeds irritation, not trust.',
            '**Default duration.** 30 days fits an emergency plumber, not building a house.',
            '**Remarketing without Consent Mode v2.** Lists for EEA visitors stop growing, and people often notice months later.',
            '**Judging only by the Google Ads report.** A high ROAS does not mean extra customers came.',
            '**A weak landing page.** If someone left because the offer was unclear, the ad sends them right back there.'
          ]},
        ]
      }
    },
    {
      heading: {de: 'So sieht ein sauberer Start aus', en: 'What a proper launch looks like', ru: 'Как выглядит правильная модель запуска'},
      body: {
        ru: [
          {type: 'steps', items: [
            {title: 'Аудит', text: 'Тег Google, конверсии, Consent Mode v2, звонки и формы, связь с CRM.'},
            {title: 'Сегментация', text: 'Аудитории по намерению, срок членства под цикл продажи, списки исключений.'},
            {title: 'Поиск', text: 'Добавляем аудитории в поисковые кампании в режиме наблюдения и смотрим, как ведут себя прошлые посетители.'},
            {title: 'Тест дополнительных каналов', text: 'Ограниченный бюджет на КМС, YouTube или Demand Gen с отдельными креативами под сегменты.'},
            {title: 'Анализ', text: 'Стоимость квалифицированного лида, частота, договоры, сравнение с контрольным периодом.'},
            {title: 'Масштабирование', text: 'Увеличиваем бюджет в сегментах, которые приносят договоры, и отключаем те, что только собирают клики.'}
          ]},
          'Такой подход превращает ремаркетинг из «догонялок» за посетителями в управляемый инструмент продаж.'
        ],
        de: [
          {type: 'steps', items: [
            {title: 'Audit', text: 'Google-Tag, Conversions, Consent Mode v2, Anrufe und Formulare, Anbindung ans CRM.'},
            {title: 'Segmentierung', text: 'Zielgruppen nach Kaufabsicht, Dauer passend zum Verkaufszyklus, Ausschlusslisten.'},
            {title: 'Suche', text: 'Zielgruppen im Beobachtungsmodus zu Suchkampagnen hinzufügen und schauen, wie sich frühere Besucher verhalten.'},
            {title: 'Weitere Kanäle testen', text: 'Begrenztes Budget für Display, YouTube oder Demand Gen mit eigenen Anzeigen je Segment.'},
            {title: 'Auswertung', text: 'Kosten pro qualifiziertem Lead, Frequenz, Aufträge, Vergleich mit einem Kontrollzeitraum.'},
            {title: 'Skalieren', text: 'Mehr Budget für Segmente, die Aufträge bringen. Abschalten, was nur Klicks sammelt.'}
          ]},
          'So wird Remarketing vom „Hinterherlaufen“ zu einem steuerbaren Verkaufswerkzeug.'
        ],
        en: [
          {type: 'steps', items: [
            {title: 'Audit', text: 'Google tag, conversions, Consent Mode v2, calls and forms, CRM connection.'},
            {title: 'Segmentation', text: 'Intent-based audiences, membership matched to the sales cycle, exclusion lists.'},
            {title: 'Search', text: 'Add audiences to search campaigns in observation mode and see how past visitors behave.'},
            {title: 'Test more channels', text: 'A limited budget for Display, YouTube or Demand Gen with separate creatives per segment.'},
            {title: 'Analysis', text: 'Cost per qualified lead, frequency, contracts, comparison with a control period.'},
            {title: 'Scale', text: 'Increase budget in segments that bring contracts, switch off the ones that only collect clicks.'}
          ]},
          'This turns remarketing from “chasing visitors” into a controllable sales tool.'
        ]
      }
    },
    {
      heading: {de: 'Fazit', en: 'Conclusion', ru: 'Вывод'},
      body: {
        ru: [
          'Ремаркетинг не начинается с баннера. Он начинается с вопроса: **«Почему человек, который искал нашу услугу, не обратился, и что мы можем сказать ему во второй раз?»**',
          'Если ответ есть, а данные, согласие и аналитика настроены правильно, ремаркетинг становится одним из самых эффективных инструментов в Google Ads. Цель не в том, чтобы догнать каждого посетителя, а в том, чтобы вовремя напомнить о себе тем, для кого ваше предложение действительно ценно.',
          {type: 'callout', tone: 'tip', title: 'Сайт, аналитика и реклама из одних рук', text: 'TreeTech делает сайт так, чтобы тег, конверсии и Consent Mode v2 работали с первого дня. Рекламу в Google Ads мы запускаем вместе с нашим партнёром iWeb. [Подробнее о партнёрстве](/blog/partnerschaft-treetech-iweb)'}
        ],
        de: [
          'Remarketing beginnt nicht mit einem Banner. Es beginnt mit der Frage: **„Warum hat jemand, der unsere Leistung gesucht hat, nicht angefragt, und was können wir ihm beim zweiten Mal sagen?“**',
          'Gibt es darauf eine Antwort und sind Daten, Einwilligung und Messung sauber eingerichtet, wird Remarketing zu einem der wirksamsten Werkzeuge in Google Ads. Das Ziel ist nicht, jeden Besucher einzuholen, sondern sich rechtzeitig bei denen zu melden, für die Ihr Angebot wirklich passt.',
          {type: 'callout', tone: 'tip', title: 'Website, Messung und Werbung aus einer Hand', text: 'TreeTech baut Websites so, dass Google-Tag, Conversions und Consent Mode v2 vom ersten Tag an funktionieren. Google-Ads-Kampagnen setzen wir gemeinsam mit unserem Partner iWeb um. [Mehr zur Partnerschaft](/blog/partnerschaft-treetech-iweb)'}
        ],
        en: [
          'Remarketing does not start with a banner. It starts with a question: **“Why did someone who searched for our service not get in touch, and what can we tell them the second time?”**',
          'If you have the answer and data, consent and measurement are set up properly, remarketing becomes one of the most effective tools in Google Ads. The goal is not to catch every visitor, but to reach out in time to those for whom your offer truly fits.',
          {type: 'callout', tone: 'tip', title: 'Website, tracking and ads from one team', text: 'TreeTech builds websites so that the Google tag, conversions and Consent Mode v2 work from day one. We run Google Ads campaigns together with our partner iWeb. [More about the partnership](/blog/partnerschaft-treetech-iweb)'}
        ]
      }
    },
    {
      heading: {de: 'Quellen', en: 'Sources', ru: 'Источники'},
      body: (() => {
        const official = [
          {label: 'About your data segments', href: g('2453998')},
          {label: 'How your data segments work', href: g('2472738')},
          {label: 'About setting up your data segments', href: g('2454000')},
          {label: 'About your data segment compatibility', href: g('7476585')},
          {label: 'About your data segments for Search ads', href: g('2701222')},
          {label: 'Set up your data segments for Search ads campaign', href: g('7068417')},
          {label: 'About “Targeting” and “Observation” settings', href: g('7365594')},
          {label: 'Combining automated bid strategies with audience segments', href: g('4782789')},
          {label: 'About audience signals for Performance Max', href: g('14530785')},
          {label: 'Add audience signals', href: g('14753570')},
          {label: 'Demand Gen audiences overview', href: g('15594567')},
          {label: 'About audience segments', href: g('2497941')},
          {label: 'Expand your reach to YouTube users', href: g('2545661')},
          {label: 'Display Network (glossary)', href: 'https://support.google.com/sa360/answer/9571801'},
          {label: 'Use frequency capping', href: g('6034106')},
          {label: 'Customer Match policy', href: g('6299717')},
          {label: 'Personalized advertising policy', href: 'https://support.google.com/adspolicy/answer/143465'},
          {label: 'Updates to consent mode for traffic in the EEA', href: g('13695607')},
          {label: 'Set up and manage consent', href: g('13802165')},
          {label: 'Consent mode overview (Google Developers)', href: 'https://developers.google.com/tag-platform/security/concepts/consent-mode'},
          {label: 'Enhanced conversions for leads', href: g('11909980')},
          {label: 'How to upgrade offline imports', href: g('15479791')},
          {label: 'About attribution models', href: g('6259715')},
          {label: 'Update on Plans for Privacy Sandbox Technologies', href: 'https://privacysandbox.google.com/blog/update-on-plans-for-privacy-sandbox-technologies'}
        ];
        const industry = [
          {label: 'Search Engine Roundtable: Customer Match lists to have 540 days expiration', href: 'https://www.seroundtable.com/google-ads-customer-match-lists-expire-38904.html', note: '02/2025'},
          {label: 'PPC Land: Google to sunset Similar Audiences', href: 'https://ppc.land/google-to-sunset-similar-lookalike-audiences-in-dv360-and-google-ads/'}
        ];
        return {
          ru: [{type: 'sources' as const, groups: [{title: 'Официальная справка Google (по состоянию на ноябрь 2026)', items: official}, {title: 'Отраслевые источники', items: industry}]}],
          de: [{type: 'sources' as const, groups: [{title: 'Offizielle Google-Hilfe (Stand: November 2026)', items: official}, {title: 'Branchenquellen', items: industry}]}],
          en: [{type: 'sources' as const, groups: [{title: 'Official Google Help (as of November 2026)', items: official}, {title: 'Industry sources', items: industry}]}]
        };
      })()
    }
  ]
};
