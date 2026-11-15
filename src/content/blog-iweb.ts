import type {BlogPost} from '@/content/blog-types';

const preview = (slug: string, alt: string) => ({src: `/portfolio-previews/${slug}.webp`, alt, width: 1400, height: 875});

export const iwebPartnershipPost: BlogPost = {
  slug: 'partnerschaft-treetech-iweb',
  publishedAt: '2026-11-15',
  cover: 'partnership',
  category: {de: 'Neuigkeiten', en: 'News', ru: 'Новости'},
  title: {
    de: 'TreeTech und iWeb: Website und Google-Werbung jetzt aus einer Hand',
    en: 'TreeTech and iWeb: your website and Google ads from one team',
    ru: 'TreeTech и iWeb: сайт и реклама в Google теперь в одних руках'
  },
  excerpt: {
    de: 'Unsere erste Partnerschaft: Mit der Digitalagentur iWeb aus Kyjiw ergänzen wir unsere Websites um Google Ads, SEO und Analytics. Was das für Ihren Betrieb bedeutet.',
    en: 'Our first partnership: together with the digital agency iWeb from Kyiv, we add Google Ads, SEO and analytics to our websites. What it means for your business.',
    ru: 'Наше первое партнёрство: вместе с диджитал-агентством iWeb из Киева мы дополняем свои сайты рекламой Google Ads, SEO и аналитикой. Что это значит для вашего бизнеса.'
  },
  seoTitle: {
    de: 'Partnerschaft TreeTech × iWeb: Website, Google Ads und SEO',
    en: 'TreeTech × iWeb partnership: website, Google Ads and SEO',
    ru: 'Партнёрство TreeTech × iWeb: сайт, Google Ads и SEO'
  },
  seoDescription: {
    de: 'TreeTech aus Wien und die Digitalagentur iWeb arbeiten zusammen: Websites für Handwerksbetriebe plus Google Ads, SEO und Analytics. So profitieren Betriebe in Wien und Niederösterreich.',
    en: 'TreeTech from Vienna and the digital agency iWeb are partnering: websites for trade businesses plus Google Ads, SEO and analytics. How businesses in Vienna and Lower Austria benefit.',
    ru: 'TreeTech из Вены и диджитал-агентство iWeb начали сотрудничество: сайты для мастеров плюс Google Ads, SEO и аналитика. Что это даёт бизнесу в Вене и Нижней Австрии.'
  },
  readingTime: {de: '4 Minuten', en: '4 minutes', ru: '4 минуты'},
  tags: {
    de: ['Partnerschaft', 'iWeb', 'Google Ads', 'SEO', 'Website'],
    en: ['partnership', 'iWeb', 'Google Ads', 'SEO', 'website'],
    ru: ['партнёрство', 'iWeb', 'Google Ads', 'SEO', 'сайт']
  },
  sections: [
    {
      heading: {de: 'Unsere erste Partnerschaft', en: 'Our first partnership', ru: 'Наше первое партнёрство'},
      body: {
        de: [
          {type: 'lead', text: 'TreeTech arbeitet ab sofort mit der Digitalagentur iWeb aus Kyjiw zusammen. Für uns ist es die erste Partnerschaft, und sie schließt genau die Lücke, die uns Betriebe am häufigsten nennen.'},
          'Eine gute Website ist die Basis. Aber sie bringt erst dann Anfragen, wenn die richtigen Menschen sie finden. Viele Handwerksbetriebe fragen uns deshalb nach dem Launch: „Und wie kommen jetzt mehr Kunden auf die Seite?“ Ab jetzt haben wir darauf eine vollständige Antwort.'
        ],
        en: [
          {type: 'lead', text: 'TreeTech is now working with iWeb, a digital agency from Kyiv. It is our first partnership, and it closes exactly the gap businesses mention to us most often.'},
          'A good website is the foundation. But it only brings inquiries once the right people find it. That is why many trade businesses ask us after launch: “So how do we get more customers to the site now?” From now on we have a complete answer.'
        ],
        ru: [
          {type: 'lead', text: 'TreeTech начинает сотрудничество с диджитал-агентством iWeb из Киева. Это наше первое партнёрство, и оно закрывает именно тот пробел, о котором нам чаще всего говорят клиенты.'},
          'Хороший сайт — это основа. Но заявки он приносит только тогда, когда его находят нужные люди. Поэтому после запуска нас часто спрашивают: «А как теперь привести на сайт больше клиентов?» Теперь у нас есть на это полный ответ.'
        ]
      }
    },
    {
      heading: {de: 'Wer ist iWeb?', en: 'Who is iWeb?', ru: 'Кто такие iWeb'},
      body: {
        de: [
          '[iWeb](https://i-web.top) ist eine Full-Service-Digitalagentur mit Sitz in Kyjiw. Der Schwerpunkt liegt auf Websites und Werbung, die für das Geschäft der Kunden arbeiten: Google Ads, Meta- und TikTok-Werbung, SEO, Analytics, Design und Social Media.',
          {type: 'stats', items: [
            {value: '12', label: 'Jahre Erfahrung'},
            {value: '1.000+', label: 'abgeschlossene Projekte'},
            {value: '50+', label: 'Spezialistinnen und Spezialisten'},
            {value: 'Google', label: 'Partners zertifiziert'}
          ], note: 'Angaben laut iWeb'},
          'iWeb arbeitet für Kunden in der Ukraine und international, unter anderem in Deutschland, Polen, Spanien und den USA. Branchen reichen von Bau und Kfz bis zu Medizin, Immobilien und Onlinehandel.'
        ],
        en: [
          '[iWeb](https://i-web.top) is a full-service digital agency based in Kyiv. Its focus is websites and advertising that work for the client’s business: Google Ads, Meta and TikTok ads, SEO, analytics, design and social media.',
          {type: 'stats', items: [
            {value: '12', label: 'years of experience'},
            {value: '1,000+', label: 'completed projects'},
            {value: '50+', label: 'specialists'},
            {value: 'Google', label: 'Partners certified'}
          ], note: 'Figures according to iWeb'},
          'iWeb works with clients in Ukraine and internationally, including Germany, Poland, Spain and the USA. Industries range from construction and automotive to healthcare, real estate and e-commerce.'
        ],
        ru: [
          '[iWeb](https://i-web.top) — диджитал-агентство полного цикла из Киева. Главный фокус — сайты и реклама, которые работают на бизнес клиента: Google Ads, реклама в Meta и TikTok, SEO, аналитика, дизайн и соцсети.',
          {type: 'stats', items: [
            {value: '12', label: 'лет опыта'},
            {value: '1 000+', label: 'завершённых проектов'},
            {value: '50+', label: 'специалистов'},
            {value: 'Google', label: 'Partners, сертификация'}
          ], note: 'По данным iWeb'},
          'iWeb работает с клиентами в Украине и за рубежом, в том числе в Германии, Польше, Испании и США. Отрасли — от строительства и автобизнеса до медицины, недвижимости и онлайн-торговли.'
        ]
      }
    },
    {
      heading: {de: 'Wer macht was', en: 'Who does what', ru: 'Кто за что отвечает'},
      body: {
        de: [
          'Wir bleiben, was wir sind: ein kleines Webstudio aus Wien, das Websites für Handwerksbetriebe baut und betreut. iWeb bringt das ein, was nach dem Launch zählt: Sichtbarkeit und Messung.',
          {type: 'illustration', name: 'partnership-split', caption: 'Sie haben einen Ansprechpartner in Wien. Dahinter arbeiten zwei Teams zusammen.'},
          {type: 'table', head: ['', 'TreeTech', 'iWeb'], rows: [
            ['Schwerpunkt', 'Website, Pflege, Automatisierung', 'Werbung, SEO, Analytics'],
            ['Typische Aufgaben', 'Vorschau in 3 Tagen, Launch in 7 Tagen, Änderungen per WhatsApp', 'Google-Ads-Kampagnen, Remarketing, Suchmaschinenoptimierung'],
            ['Für Sie', 'Eine Website, die aus Besuchen Anfragen macht', 'Mehr der richtigen Besucher auf dieser Website']
          ]}
        ],
        en: [
          'We stay what we are: a small web studio from Vienna that builds and looks after websites for trade businesses. iWeb brings what matters after launch: visibility and measurement.',
          {type: 'illustration', name: 'partnership-split', caption: 'You have one contact in Vienna. Behind it, two teams work together.'},
          {type: 'table', head: ['', 'TreeTech', 'iWeb'], rows: [
            ['Focus', 'Website, care, automation', 'Advertising, SEO, analytics'],
            ['Typical work', 'Preview in 3 days, launch in 7 days, changes via WhatsApp', 'Google Ads campaigns, remarketing, search engine optimisation'],
            ['For you', 'A website that turns visits into inquiries', 'More of the right visitors on that website']
          ]}
        ],
        ru: [
          'Мы остаёмся теми, кто мы есть: небольшой веб-студией из Вены, которая делает и поддерживает сайты для мастеров. iWeb добавляет то, что важно после запуска: видимость и измерение результата.',
          {type: 'illustration', name: 'partnership-split', caption: 'У вас один контакт в Вене. За ним работают две команды.'},
          {type: 'table', head: ['', 'TreeTech', 'iWeb'], rows: [
            ['Фокус', 'Сайт, поддержка, автоматизация', 'Реклама, SEO, аналитика'],
            ['Типичные задачи', 'Превью за 3 дня, запуск за 7 дней, правки через WhatsApp', 'Кампании Google Ads, ремаркетинг, поисковая оптимизация'],
            ['Для вас', 'Сайт, который превращает визиты в заявки', 'Больше нужных посетителей на этом сайте']
          ]}
        ]
      }
    },
    {
      heading: {de: 'Was das für Ihren Betrieb bedeutet', en: 'What this means for your business', ru: 'Что это значит для вашего бизнеса'},
      body: {
        de: [
          {type: 'list', style: 'check', items: [
            '**Website und Werbung passen zusammen.** Google-Tag, Conversions und Consent Mode v2 sind ab dem ersten Tag eingerichtet. So hat Werbung später saubere Daten statt Rätselraten.',
            '**Ein Ansprechpartner.** Sie sprechen mit uns, auf Deutsch, Englisch oder Russisch. Wir koordinieren den Rest.',
            '**Erfahrung aus über 1.000 Projekten** bei Kampagnen, die Sie als kleiner Betrieb sonst nur bei großen Agenturen bekommen.',
            '**Nichts ist Pflicht.** Website und Pflege funktionieren wie bisher. Werbung und SEO kommen nur dazu, wenn Sie das möchten und es sich für Ihren Betrieb rechnet.'
          ]},
          {type: 'gallery', caption: 'Beispiele unserer Demo-Websites für Handwerksbetriebe. Mit iWeb sorgen wir dafür, dass solche Seiten auch gefunden werden.', items: [
            preview('elektro-huber', 'Demo-Website für einen Elektriker'),
            preview('installateur-novak', 'Demo-Website für einen Installateur'),
            preview('dach-hofer', 'Demo-Website für einen Dachdecker')
          ]}
        ],
        en: [
          {type: 'list', style: 'check', items: [
            '**Website and ads fit together.** The Google tag, conversions and Consent Mode v2 are set up from day one, so ads later run on clean data instead of guesswork.',
            '**One contact.** You talk to us, in German, English or Russian. We coordinate the rest.',
            '**Experience from more than 1,000 projects** for campaigns that small businesses usually only get from large agencies.',
            '**Nothing is mandatory.** Website and care work as before. Ads and SEO are only added if you want them and they pay off for your business.'
          ]},
          {type: 'gallery', caption: 'Examples of our demo websites for trade businesses. With iWeb we make sure sites like these get found.', items: [
            preview('elektro-huber', 'Demo website for an electrician'),
            preview('installateur-novak', 'Demo website for a plumber'),
            preview('dach-hofer', 'Demo website for a roofer')
          ]}
        ],
        ru: [
          {type: 'list', style: 'check', items: [
            '**Сайт и реклама настроены друг под друга.** Тег Google, конверсии и Consent Mode v2 работают с первого дня, поэтому реклама потом опирается на чистые данные, а не на догадки.',
            '**Один контакт.** Вы общаетесь с нами — на немецком, английском или русском. Остальное мы координируем сами.',
            '**Опыт более 1 000 проектов** в рекламных кампаниях, который небольшой бизнес обычно получает только у крупных агентств.',
            '**Ничего не обязательно.** Сайт и поддержка работают как раньше. Реклама и SEO подключаются, только если вы этого хотите и это окупается для вашего бизнеса.'
          ]},
          {type: 'gallery', caption: 'Примеры наших демо-сайтов для мастеров. Вместе с iWeb мы делаем так, чтобы такие сайты находили.', items: [
            preview('elektro-huber', 'Демо-сайт для электрика'),
            preview('installateur-novak', 'Демо-сайт для сантехника'),
            preview('dach-hofer', 'Демо-сайт для кровельщика')
          ]}
        ]
      }
    },
    {
      heading: {de: 'So läuft die Zusammenarbeit ab', en: 'How it works', ru: 'Как это работает'},
      body: {
        de: [
          {type: 'steps', items: [
            {title: 'Website von TreeTech', text: 'Sie schicken uns Firmenname und Ort. In 3 Werktagen sehen Sie eine kostenlose Vorschau, nach einem kurzen Gespräch ist die Seite in 7 Tagen online.'},
            {title: 'Messung ab Tag eins', text: 'Anrufe, WhatsApp-Klicks und Formulare werden als Conversions erfasst, mit sauberer Einwilligung nach DSGVO.'},
            {title: 'Werbung und SEO mit iWeb', text: 'Wenn Sie wachsen wollen, planen wir gemeinsam mit iWeb Kampagnen für Ihr Einzugsgebiet, zum Beispiel Wien und Niederösterreich.'},
            {title: 'Auswertung', text: 'Sie sehen, welche Kanäle echte Aufträge bringen. Was nichts bringt, wird abgeschaltet.'}
          ]},
          {type: 'callout', tone: 'tip', title: 'Unser erster gemeinsamer Ratgeber', text: 'Wie man Interessenten zurückholt, die schon auf der Website waren, lesen Sie hier: [Remarketing mit Google Ads für Dienstleister](/blog/google-ads-remarketing-dienstleister)'}
        ],
        en: [
          {type: 'steps', items: [
            {title: 'Website by TreeTech', text: 'Send us your business name and town. Within 3 working days you see a free preview, and after a short call the site is live in 7 days.'},
            {title: 'Tracking from day one', text: 'Calls, WhatsApp clicks and forms are recorded as conversions, with proper GDPR consent.'},
            {title: 'Ads and SEO with iWeb', text: 'If you want to grow, we plan campaigns for your service area together with iWeb, for example Vienna and Lower Austria.'},
            {title: 'Review', text: 'You see which channels bring real jobs. Whatever does not work gets switched off.'}
          ]},
          {type: 'callout', tone: 'tip', title: 'Our first joint guide', text: 'How to win back prospects who already visited your website: [Google Ads remarketing for service businesses](/blog/google-ads-remarketing-dienstleister)'}
        ],
        ru: [
          {type: 'steps', items: [
            {title: 'Сайт от TreeTech', text: 'Пришлите нам название бизнеса и город. Через 3 рабочих дня вы увидите бесплатное превью, а после короткого разговора сайт будет онлайн за 7 дней.'},
            {title: 'Аналитика с первого дня', text: 'Звонки, клики в WhatsApp и заявки считаются конверсиями, с корректным согласием по GDPR.'},
            {title: 'Реклама и SEO с iWeb', text: 'Если вы хотите расти, мы вместе с iWeb планируем кампании под ваш регион, например Вену и Нижнюю Австрию.'},
            {title: 'Анализ', text: 'Вы видите, какие каналы приносят реальные заказы. То, что не работает, отключаем.'}
          ]},
          {type: 'callout', tone: 'tip', title: 'Наш первый совместный материал', text: 'Как вернуть тех, кто уже был на сайте, но не обратился: [Ремаркетинг Google Ads для бизнеса услуг](/blog/google-ads-remarketing-dienstleister)'}
        ]
      }
    }
  ]
};
