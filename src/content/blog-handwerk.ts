import type {Locale} from '@/i18n/routing';
import {formatEur, getPackage, hourlyRate} from '@/content/pricing';

/**
 * Blog posts for the main audience (trades and workshops in Vienna and Lower Austria).
 * Written in DE, EN and RU. Prices come from pricing.ts.
 */

type Text = Record<Locale, string>;
type Section = {heading: Text; body: Record<Locale, string[]>};

export type HandwerkPost = {
  slug: string;
  publishedAt: string;
  category: Text;
  title: Text;
  excerpt: Text;
  seoTitle: Text;
  seoDescription: Text;
  readingTime: Text;
  tags: Record<Locale, string[]>;
  sections: Section[];
};

const eur = (amount: number, locale: Locale) => formatEur(amount, locale);
const start = getPackage('websiteStart').oneTime ?? 0;
const business = getPackage('websiteBusiness').oneTime ?? 0;
const care = getPackage('pflege').monthly ?? 0;
const aboSetup = getPackage('websiteAbo').oneTime ?? 0;
const aboMonthly = getPackage('websiteAbo').monthly ?? 0;

export const handwerkPosts: HandwerkPost[] = [
  {
    slug: 'website-kosten-handwerker',
    publishedAt: '2026-10-28',
    category: {de: 'Kosten', en: 'Costs', ru: 'Стоимость'},
    title: {
      de: 'Was kostet eine Website für Handwerker in Österreich?',
      en: 'What does a website for tradespeople in Austria cost?',
      ru: 'Сколько стоит сайт для мастера в Австрии?'
    },
    excerpt: {
      de: 'Von Baukasten bis Agentur: womit Sie rechnen müssen, was den Preis treibt und welche laufenden Kosten dazukommen.',
      en: 'From site builders to agencies: what to expect, what drives the price and which running costs come on top.',
      ru: 'От конструктора до агентства: на что рассчитывать, что влияет на цену и какие расходы будут каждый месяц.'
    },
    seoTitle: {
      de: 'Website Kosten für Handwerker in Österreich: Preise und Tipps',
      en: 'Website costs for tradespeople in Austria: prices and tips',
      ru: 'Стоимость сайта для мастера в Австрии: цены и советы'
    },
    seoDescription: {
      de: 'Was eine Website für Elektriker, Installateure oder Maler in Österreich kostet, welche laufenden Kosten dazukommen und worauf Sie beim Angebot achten sollten.',
      en: 'What a website for electricians, plumbers or painters in Austria costs, which running costs to expect and what to check in an offer.',
      ru: 'Сколько стоит сайт для электрика, сантехника или маляра в Австрии, какие расходы будут дальше и на что смотреть в предложении.'
    },
    readingTime: {de: '5 Minuten', en: '5 minutes', ru: '5 минут'},
    tags: {
      de: ['Website Kosten', 'Handwerker Website', 'Wien', 'Niederösterreich'],
      en: ['website costs', 'website for trades', 'Vienna', 'Lower Austria'],
      ru: ['стоимость сайта', 'сайт для мастера', 'Вена', 'Нижняя Австрия']
    },
    sections: [
      {
        heading: {de: 'Die kurze Antwort', en: 'The short answer', ru: 'Коротко'},
        body: {
          de: [
            'Für einen Handwerksbetrieb reicht meist eine Website mit drei bis fünf Seiten: Startseite, Leistungen, Einsatzgebiet, Kontakt, dazu Impressum und Datenschutz. Mehr braucht es am Anfang selten.',
            'Was Sie dafür zahlen, hängt vor allem davon ab, wer die Arbeit macht. Mit einem Baukasten zahlen Sie wenig Geld, aber viele Abende. Bei Freelancern und Agenturen in Österreich liegen solche Projekte nach unserer Erfahrung oft zwischen etwa 1.000 und 5.000 Euro. Das ist eine grobe Spanne, keine offizielle Statistik.'
          ],
          en: [
            'For a trade business, a website with three to five pages is usually enough: home, services, service area, contact, plus legal notice and privacy policy. You rarely need more at the start.',
            'What you pay depends mostly on who does the work. A site builder costs little money but many evenings. With freelancers and agencies in Austria, projects like this often land somewhere between about €1,000 and €5,000 in our experience. That is a rough range, not an official statistic.'
          ],
          ru: [
            'Мастерской обычно хватает сайта из трёх-пяти страниц: главная, услуги, район выезда, контакты, плюс Impressum и Datenschutz. Больше на старте нужно редко.',
            'Цена зависит прежде всего от того, кто делает работу. Конструктор стоит недорого, но отнимает много вечеров. У фрилансеров и агентств в Австрии такие проекты, по нашему опыту, часто стоят примерно от 1 000 до 5 000 евро. Это грубый диапазон, а не официальная статистика.'
          ]
        }
      },
      {
        heading: {de: 'Was den Preis nach oben treibt', en: 'What pushes the price up', ru: 'Что делает сайт дороже'},
        body: {
          de: [
            'Texte: Wenn die Agentur die Texte schreibt, kostet das mehr, spart Ihnen aber die meiste Zeit. Wenn Sie selbst schreiben, dauert das Projekt oft Wochen länger.',
            'Seitenanzahl und Orte: Eine eigene Seite pro Leistung und pro Ort hilft bei Google, macht die Website aber größer.',
            'Funktionen: Anfrageformular mit Foto, Terminbuchung, zweite Sprache oder ein Online-Shop kosten jeweils extra.',
            'Fotos: Ein Fotograf vor Ort kostet zusätzlich. Gute Handyfotos von fertigen Arbeiten reichen am Anfang oft.'
          ],
          en: [
            'Copy: if the agency writes the text it costs more but saves you the most time. If you write it yourself, the project often takes weeks longer.',
            'Number of pages and towns: a separate page per service and per town helps on Google but makes the site bigger.',
            'Features: an inquiry form with photo upload, online booking, a second language or a shop each cost extra.',
            'Photos: a photographer on site costs extra. Good phone photos of finished jobs are often enough to start.'
          ],
          ru: [
            'Тексты: если их пишет агентство, это дороже, но экономит больше всего времени. Если пишете сами, проект часто затягивается на недели.',
            'Количество страниц и городов: отдельная страница на каждую услугу и город помогает в Google, но делает сайт больше.',
            'Функции: форма заявки с фото, онлайн-запись, второй язык или магазин стоят отдельно.',
            'Фото: фотограф на месте стоит дополнительно. Для начала часто хватает хороших фото готовых работ с телефона.'
          ]
        }
      },
      {
        heading: {de: 'Laufende Kosten nicht vergessen', en: 'Do not forget running costs', ru: 'Не забудьте о регулярных расходах'},
        body: {
          de: [
            'Eine .at-Domain kostet je nach Anbieter meist rund 10 bis 30 Euro im Jahr. Dazu kommen Hosting und jemand, der sich um Updates, Sicherheit und kleine Änderungen kümmert.',
            'Fragen Sie beim Angebot immer: Was kostet die Seite im zweiten Jahr? Wer ändert Öffnungszeiten oder Telefonnummer? Und wie schnell passiert das?'
          ],
          en: [
            'An .at domain usually costs around €10 to €30 a year depending on the provider. On top come hosting and someone who looks after updates, security and small changes.',
            'Always ask: what does the site cost in year two? Who changes opening hours or the phone number? And how fast does that happen?'
          ],
          ru: [
            'Домен .at обычно стоит примерно 10–30 евро в год, в зависимости от регистратора. К этому добавляются хостинг и человек, который следит за обновлениями, безопасностью и мелкими правками.',
            'Всегда спрашивайте: сколько сайт будет стоить во второй год? Кто поменяет часы работы или номер телефона? И как быстро?'
          ]
        }
      },
      {
        heading: {de: 'Worauf Sie beim Angebot achten sollten', en: 'What to check in an offer', ru: 'На что смотреть в предложении'},
        body: {
          de: [
            'Fixpreis statt Stundenschätzung. Klar, wer die Texte schreibt. Die Domain läuft auf Ihren Namen. Keine Mindestlaufzeit über Jahre. Und: Sehen Sie sich die Seite am Handy an, denn dort suchen die meisten Ihrer Kunden.',
            'Ein gutes Zeichen ist, wenn Sie vor der Zahlung schon etwas sehen: einen Entwurf, eine Vorschau oder zumindest Beispiele aus Ihrer Branche.'
          ],
          en: [
            'Fixed price instead of an hourly estimate. Clear who writes the copy. The domain is registered in your name. No minimum term over several years. And check the site on a phone, because that is where most of your customers search.',
            'A good sign is when you see something before you pay: a draft, a preview or at least examples from your trade.'
          ],
          ru: [
            'Фиксированная цена, а не оценка в часах. Понятно, кто пишет тексты. Домен оформлен на вас. Нет минимального срока на годы. И посмотрите сайт с телефона: там вас ищет большинство клиентов.',
            'Хороший знак, если вы что-то видите до оплаты: черновик, превью или хотя бы примеры из вашей сферы.'
          ]
        }
      },
      {
        heading: {de: 'Unsere Preise zum Vergleich', en: 'Our prices for comparison', ru: 'Наши цены для сравнения'},
        body: {
          de: [
            `Bei TreeTech kostet Website Start ${eur(start, 'de')}: bis 5 Seiten, Texte inklusive, online in 7 Tagen. Website Business mit eigenen Seiten pro Leistung und Ort kostet ${eur(business, 'de')}. Ohne große Zahlung am Anfang gibt es das Website-Abo um ${eur(aboSetup, 'de')} zum Start und ${eur(aboMonthly, 'de')} im Monat.`,
            `Pflege mit Hosting und kleinen Änderungen per WhatsApp kostet ${eur(care, 'de')} im Monat. Alles außerhalb der Pakete nur nach Absprache, ${eur(hourlyRate, 'de')} pro Stunde. Die Vorschau Ihrer Website ist kostenlos.`
          ],
          en: [
            `At TreeTech, Website Start costs ${eur(start, 'en')}: up to 5 pages, copy included, live in 7 days. Website Business with pages per service and town costs ${eur(business, 'en')}. Without a large upfront payment there is the website subscription at ${eur(aboSetup, 'en')} to start and ${eur(aboMonthly, 'en')} a month.`,
            `Care with hosting and small changes via WhatsApp costs ${eur(care, 'en')} a month. Anything outside the packages only after agreement, ${eur(hourlyRate, 'en')} per hour. The preview of your website is free.`
          ],
          ru: [
            `В TreeTech Website Start стоит ${eur(start, 'ru')}: до 5 страниц, тексты включены, онлайн за 7 дней. Website Business с отдельными страницами под услуги и города стоит ${eur(business, 'ru')}. Без крупной оплаты сразу есть подписка: ${eur(aboSetup, 'ru')} на старте и ${eur(aboMonthly, 'ru')} в месяц.`,
            `Поддержка с хостингом и мелкими правками через WhatsApp стоит ${eur(care, 'ru')} в месяц. Всё вне пакетов только по договорённости, ${eur(hourlyRate, 'ru')} в час. Превью вашего сайта бесплатно.`
          ]
        }
      }
    ]
  },
  {
    slug: 'google-unternehmensprofil-handwerker',
    publishedAt: '2026-10-28',
    category: {de: 'Google', en: 'Google', ru: 'Google'},
    title: {
      de: 'Google-Unternehmensprofil für Handwerker: So richten Sie es ein',
      en: 'Google Business Profile for tradespeople: how to set it up',
      ru: 'Профиль компании в Google для мастера: как настроить'
    },
    excerpt: {
      de: 'Das kostenlose Profil entscheidet oft, wer angerufen wird. Die wichtigsten Schritte und Einstellungen für Betriebe ohne Laden.',
      en: 'The free profile often decides who gets the call. The key steps and settings for businesses without a shop front.',
      ru: 'Бесплатный профиль часто решает, кому позвонят. Главные шаги и настройки для тех, у кого нет офиса для клиентов.'
    },
    seoTitle: {
      de: 'Google-Unternehmensprofil für Handwerker einrichten: Anleitung',
      en: 'Set up a Google Business Profile for tradespeople: guide',
      ru: 'Как настроить профиль компании в Google для мастера'
    },
    seoDescription: {
      de: 'Schritt für Schritt: Google-Unternehmensprofil für Elektriker, Installateure und Werkstätten einrichten, Einzugsgebiet statt Adresse, Fotos, Bewertungen und Link zur Website.',
      en: 'Step by step: set up a Google Business Profile for electricians, plumbers and workshops, service area instead of address, photos, reviews and a link to your website.',
      ru: 'По шагам: профиль компании в Google для электриков, сантехников и автосервисов, район обслуживания вместо адреса, фото, отзывы и ссылка на сайт.'
    },
    readingTime: {de: '6 Minuten', en: '6 minutes', ru: '6 минут'},
    tags: {
      de: ['Google-Unternehmensprofil', 'Google Maps', 'Bewertungen', 'Handwerker'],
      en: ['Google Business Profile', 'Google Maps', 'reviews', 'trades'],
      ru: ['профиль Google', 'Google Maps', 'отзывы', 'мастера']
    },
    sections: [
      {
        heading: {de: 'Warum das Profil so wichtig ist', en: 'Why the profile matters so much', ru: 'Почему профиль так важен'},
        body: {
          de: [
            'Wer "Installateur in der Nähe" sucht, sieht zuerst die Karte mit drei Betrieben. Dort stehen Sterne, Öffnungszeiten und ein Anruf-Knopf. Viele Kunden rufen direkt von dort an, ohne je eine Website zu öffnen.',
            'Das Profil ist kostenlos. Es lohnt sich, es einmal ordentlich einzurichten und dann regelmäßig zu pflegen.'
          ],
          en: [
            'Anyone searching for "plumber near me" first sees the map with three businesses. It shows stars, opening hours and a call button. Many customers call straight from there without ever opening a website.',
            'The profile is free. It pays to set it up properly once and then keep it up to date.'
          ],
          ru: [
            'Кто ищет «сантехник рядом», сначала видит карту с тремя фирмами: звёзды, часы работы и кнопка звонка. Многие звонят прямо оттуда, даже не открывая сайт.',
            'Профиль бесплатный. Стоит один раз нормально его настроить и потом регулярно обновлять.'
          ]
        }
      },
      {
        heading: {de: 'Einrichten in fünf Schritten', en: 'Set it up in five steps', ru: 'Настройка за пять шагов'},
        body: {
          de: [
            '1. Auf business.google.com mit einem Google-Konto anmelden, das dem Betrieb gehört, nicht einem Mitarbeiter.',
            '2. Den genauen Namen des Betriebs eintragen, ohne Werbewörter. Als Hauptkategorie die passendste wählen, zum Beispiel Elektriker oder Kfz-Werkstatt.',
            '3. Kommen Kunden nicht zu Ihnen, sondern Sie zu den Kunden, die Adresse ausblenden und stattdessen ein Einzugsgebiet mit Orten angeben.',
            '4. Telefonnummer, Website und Öffnungszeiten eintragen. Gibt es einen Notdienst, gehört er in die Beschreibung.',
            '5. Das Profil bestätigen. Google wählt die Methode selbst, oft per Video oder Telefon. Erst danach ist das Profil voll sichtbar.'
          ],
          en: [
            '1. Sign in at business.google.com with a Google account that belongs to the business, not to an employee.',
            '2. Enter the exact business name without advertising words. Pick the best-fitting main category, for example electrician or auto repair shop.',
            '3. If customers do not come to you but you go to them, hide the address and add a service area with towns instead.',
            '4. Add phone number, website and opening hours. If you offer emergency service, mention it in the description.',
            '5. Verify the profile. Google chooses the method itself, often by video or phone. Only then is the profile fully visible.'
          ],
          ru: [
            '1. Войдите на business.google.com с аккаунтом Google, который принадлежит фирме, а не сотруднику.',
            '2. Укажите точное название без рекламных слов. Выберите самую подходящую основную категорию, например «Электрик» или «Автосервис».',
            '3. Если клиенты не приезжают к вам, а вы к ним, скройте адрес и укажите район обслуживания с городами.',
            '4. Добавьте телефон, сайт и часы работы. Если есть аварийный выезд, напишите об этом в описании.',
            '5. Подтвердите профиль. Способ Google выбирает сам, часто по видео или телефону. Только после этого профиль полностью виден.'
          ]
        }
      },
      {
        heading: {de: 'Fotos und Bewertungen', en: 'Photos and reviews', ru: 'Фото и отзывы'},
        body: {
          de: [
            'Laden Sie echte Fotos hoch: Ihr Firmenauto, Ihr Team, fertige Arbeiten. Handyfotos bei Tageslicht reichen völlig.',
            'Bitten Sie zufriedene Kunden direkt nach dem Auftrag um eine Bewertung. Am einfachsten mit einem Link per WhatsApp. Antworten Sie auf jede Bewertung kurz und freundlich, auch auf kritische.'
          ],
          en: [
            'Upload real photos: your van, your team, finished jobs. Phone photos in daylight are perfectly fine.',
            'Ask happy customers for a review right after the job, ideally with a link via WhatsApp. Reply to every review briefly and politely, including critical ones.'
          ],
          ru: [
            'Загружайте настоящие фото: рабочую машину, команду, готовые работы. Фото с телефона при дневном свете вполне подойдут.',
            'Просите довольных клиентов оставить отзыв сразу после работы, проще всего ссылкой в WhatsApp. Коротко и вежливо отвечайте на каждый отзыв, в том числе на критику.'
          ]
        }
      },
      {
        heading: {de: 'Profil und Website gehören zusammen', en: 'Profile and website belong together', ru: 'Профиль и сайт работают вместе'},
        body: {
          de: [
            'Viele Kunden schauen nach dem Profil noch kurz auf die Website: Macht der Betrieb das, was ich brauche? Kommt er zu mir? Wirkt das seriös? Ohne Website fehlt diese Antwort.',
            'Achten Sie darauf, dass Name, Telefonnummer und Einzugsgebiet auf Profil und Website gleich sind. Bei jeder TreeTech-Website richten wir das Google-Profil mit ein und verbinden beides.'
          ],
          en: [
            'Many customers take a quick look at the website after the profile: does this business do what I need? Do they come to me? Do they look trustworthy? Without a website that answer is missing.',
            'Make sure name, phone number and service area match on profile and website. With every TreeTech website we set up the Google profile and link the two.'
          ],
          ru: [
            'Многие после профиля быстро заглядывают на сайт: делает ли фирма то, что мне нужно? Приедут ли ко мне? Выглядит ли надёжно? Без сайта этого ответа нет.',
            'Следите, чтобы название, телефон и район в профиле и на сайте совпадали. С каждым сайтом TreeTech мы настраиваем профиль в Google и связываем их.'
          ]
        }
      }
    ]
  },
  {
    slug: 'handwerker-website-checkliste',
    publishedAt: '2026-10-28',
    category: {de: 'Checkliste', en: 'Checklist', ru: 'Чек-лист'},
    title: {
      de: 'Was muss auf die Website eines Handwerksbetriebs? Die Checkliste',
      en: 'What belongs on a trade business website? The checklist',
      ru: 'Что должно быть на сайте мастерской? Чек-лист'
    },
    excerpt: {
      de: 'Zehn Punkte, die entscheiden, ob ein Besucher anruft oder zum nächsten Betrieb weiterklickt.',
      en: 'Ten points that decide whether a visitor calls or clicks on to the next business.',
      ru: 'Десять пунктов, от которых зависит, позвонит посетитель или уйдёт к следующей фирме.'
    },
    seoTitle: {
      de: 'Handwerker Website Checkliste: 10 Punkte, die Anrufe bringen',
      en: 'Trade business website checklist: 10 points that bring calls',
      ru: 'Чек-лист сайта для мастера: 10 пунктов, которые приносят звонки'
    },
    seoDescription: {
      de: 'Checkliste für Elektriker, Installateure, Maler und Werkstätten: Telefon, Leistungen, Einsatzgebiet, Fotos, Bewertungen, Anfrage mit Foto, Impressum und Handy-Ansicht.',
      en: 'Checklist for electricians, plumbers, painters and workshops: phone, services, service area, photos, reviews, inquiry with photo, legal notice and mobile view.',
      ru: 'Чек-лист для электриков, сантехников, маляров и автосервисов: телефон, услуги, район, фото, отзывы, заявка с фото, Impressum и мобильная версия.'
    },
    readingTime: {de: '4 Minuten', en: '4 minutes', ru: '4 минуты'},
    tags: {
      de: ['Checkliste', 'Handwerker Website', 'mehr Anfragen'],
      en: ['checklist', 'website for trades', 'more inquiries'],
      ru: ['чек-лист', 'сайт для мастера', 'больше заявок']
    },
    sections: [
      {
        heading: {de: 'Ganz oben: erreichbar sein', en: 'At the top: be reachable', ru: 'В самом верху: быть на связи'},
        body: {
          de: [
            '1. Telefonnummer oben, als echter Anruf-Knopf und nicht als Bild. Am Handy sollte sie auf jeder Seite mit einem Tipp erreichbar sein.',
            '2. WhatsApp als zweite Möglichkeit. Viele Kunden schreiben lieber, als anzurufen, besonders abends.',
            '3. In einem Satz, was Sie machen und wo. Zum Beispiel: "Elektriker in Mödling und Umgebung, Störungsdienst noch am selben Tag."'
          ],
          en: [
            '1. Phone number at the top, as a real call button and not as an image. On a phone it should be one tap away on every page.',
            '2. WhatsApp as a second option. Many customers prefer writing to calling, especially in the evening.',
            '3. One sentence on what you do and where. For example: "Electrician in Mödling and surroundings, same-day emergency service."'
          ],
          ru: [
            '1. Телефон вверху, настоящей кнопкой звонка, а не картинкой. С телефона он должен быть в одном касании на каждой странице.',
            '2. WhatsApp как второй вариант. Многие предпочитают написать, а не звонить, особенно вечером.',
            '3. Одно предложение о том, что вы делаете и где. Например: «Электрик в Мёдлинге и окрестностях, аварийный выезд в тот же день».'
          ]
        }
      },
      {
        heading: {de: 'Was Kunden wissen wollen', en: 'What customers want to know', ru: 'Что хотят знать клиенты'},
        body: {
          de: [
            '4. Leistungen konkret benennen. Nicht "Elektroinstallationen aller Art", sondern Störungen, Umbau, E-Check, Photovoltaik.',
            '5. Einsatzgebiet mit Ortsnamen. So weiß der Kunde sofort, ob Sie zu ihm kommen, und Google auch.',
            '6. Echte Fotos von Ihren Arbeiten und Ihrem Team. Keine Archivbilder von lächelnden Models mit Helm.',
            '7. Bewertungen, am besten direkt von Google eingebunden oder verlinkt.'
          ],
          en: [
            '4. Name your services specifically. Not "all kinds of electrical work" but faults, renovations, safety checks, solar.',
            '5. Service area with town names. The customer knows straight away whether you come to them, and so does Google.',
            '6. Real photos of your work and your team. No stock photos of smiling models in helmets.',
            '7. Reviews, ideally embedded from Google or linked.'
          ],
          ru: [
            '4. Называйте услуги конкретно. Не «электромонтаж любой сложности», а неисправности, ремонт, проверки, солнечные панели.',
            '5. Район выезда с названиями городов. Клиент сразу видит, приедете ли вы к нему, и Google тоже.',
            '6. Настоящие фото ваших работ и команды. Никаких стоковых улыбающихся моделей в касках.',
            '7. Отзывы, лучше всего прямо из Google или со ссылкой на них.'
          ]
        }
      },
      {
        heading: {de: 'Damit aus Besuchern Anfragen werden', en: 'Turning visitors into inquiries', ru: 'Чтобы посетители становились заявками'},
        body: {
          de: [
            '8. Ein kurzes Anfrageformular: Name, Telefon, Adresse, was ist los, Foto. Mit dem Foto wissen Sie vorher, was Sie mitnehmen müssen.',
            '9. Impressum und Datenschutzerklärung. Für Firmenwebsites in Österreich ist ein Impressum Pflicht. Was genau hinein muss, hängt von Ihrer Rechtsform ab. Verbindlich klärt das die Wirtschaftskammer oder ein Anwalt.',
            '10. Schnell und gut lesbar am Handy, auch mit schlechtem Netz auf der Baustelle. Testen Sie Ihre Seite selbst am Handy, bevor Sie sie herzeigen.'
          ],
          en: [
            '8. A short inquiry form: name, phone, address, what is wrong, photo. With the photo you know in advance what to bring.',
            '9. Legal notice and privacy policy. In Austria a legal notice (Impressum) is mandatory for business websites. What exactly it must contain depends on your legal form. The Chamber of Commerce or a lawyer can give binding advice.',
            '10. Fast and easy to read on a phone, even with poor signal on a job site. Test your own site on a phone before you show it around.'
          ],
          ru: [
            '8. Короткая форма заявки: имя, телефон, адрес, что случилось, фото. По фото вы заранее знаете, что взять с собой.',
            '9. Impressum и Datenschutz. В Австрии Impressum на сайте компании обязателен. Что именно в нём должно быть, зависит от формы бизнеса. Точно подскажут в Wirtschaftskammer или у юриста.',
            '10. Быстро и читаемо с телефона, даже при плохой связи на объекте. Проверьте свой сайт с телефона, прежде чем его показывать.'
          ]
        }
      },
      {
        heading: {de: 'Wie viele Punkte erfüllt Ihre Seite?', en: 'How many points does your site meet?', ru: 'Сколько пунктов выполняет ваш сайт?'},
        body: {
          de: [
            'Fehlen mehr als drei Punkte, verlieren Sie wahrscheinlich Anfragen an Mitbewerber. Die gute Nachricht: Alles davon lässt sich in wenigen Tagen lösen.',
            'Bei jeder Website Start von TreeTech sind alle zehn Punkte dabei. Wollen Sie sehen, wie das für Ihren Betrieb aussieht? Fordern Sie die kostenlose Vorschau an.'
          ],
          en: [
            'If more than three points are missing, you are probably losing inquiries to competitors. The good news: all of it can be fixed in a few days.',
            'Every TreeTech Website Start includes all ten points. Want to see how that looks for your business? Request the free preview.'
          ],
          ru: [
            'Если не хватает больше трёх пунктов, вы, скорее всего, теряете заявки в пользу конкурентов. Хорошая новость: всё это решается за несколько дней.',
            'В каждом Website Start от TreeTech есть все десять пунктов. Хотите увидеть, как это будет выглядеть для вашего бизнеса? Запросите бесплатное превью.'
          ]
        }
      }
    ]
  }
];
