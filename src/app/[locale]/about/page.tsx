import {Check, MessageCircle, Phone, X} from 'lucide-react';
import type {Metadata} from 'next';
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import Image from 'next/image';
import {notFound} from 'next/navigation';

import {ButtonLink} from '@/components/ui/button-link';
import {Container} from '@/components/ui/container';
import {phoneHref, whatsappHref} from '@/content/contact-links';
import {homeHandwerk} from '@/content/home-handwerk';
import {formatEur, getPackage} from '@/content/pricing';
import {siteConfig} from '@/content/site';
import {teamMembers} from '@/content/team';
import {routing, type Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string}>;
};

type AboutCopy = {
  title: string;
  lead: string;
  whyTitle: string;
  why: string[];
  principlesTitle: string;
  principles: Array<{title: string; text: string}>;
  doTitle: string;
  do: string[];
  dontTitle: string;
  dont: string[];
  teamTitle: string;
  teamLead: string;
  teamSoon: string;
  regionTitle: string;
  region: string;
  ctaTitle: string;
  ctaLead: string;
  cta: string;
  call: string;
  whatsapp: string;
};

const copy: Record<Locale, AboutCopy> = {
  de: {
    title: 'Wir machen Websites für Leute, die keine Zeit für Websites haben.',
    lead: 'TreeTech ist ein kleines Webstudio für Handwerk und Werkstätten in Wien und Niederösterreich. Sie machen Ihre Arbeit, wir sorgen dafür, dass man Sie online findet und anruft.',
    whyTitle: 'Warum es uns gibt',
    why: [
      'Viele Betriebe haben gute Bewertungen bei Google, aber keine eigene Website. Oder eine, die am Handy kaum lesbar ist.',
      'Die üblichen Angebote passen nicht dazu: lange Fragebögen, Texte selbst schreiben, Preis erst nach drei Terminen.',
      'Wir drehen das um. Sie sehen Ihre Seite zuerst, kostenlos. Erst wenn sie Ihnen gefällt, reden wir über den Auftrag.'
    ],
    principlesTitle: 'Wie wir arbeiten',
    principles: [
      {title: 'Fixpreis vorher', text: 'Sie wissen vor dem Start, was es kostet. Alles Weitere nur nach Absprache.'},
      {title: 'Wir schreiben die Texte', text: '30 Minuten Gespräch reichen. Den Rest übernehmen wir.'},
      {title: 'Ein Ansprechpartner', text: 'Sie reden mit den Leuten, die Ihre Seite bauen. Immer unter derselben Nummer.'},
      {title: 'Alles gehört Ihnen', text: 'Domain, Texte, Fotos und Code. Kein Vertrag, der Sie festhält.'}
    ],
    doTitle: 'Was wir machen',
    do: [
      'Websites für Handwerk und Werkstätten, in 7 Tagen online',
      'Google-Profil einrichten und mit der Seite verbinden',
      'Pflege: Technik, Sicherheit und kleine Änderungen per WhatsApp',
      'Anfragen automatisch zu Ihnen schicken, mit Foto und Adresse'
    ],
    dontTitle: 'Was wir nicht machen',
    dont: [
      'Versprechen, dass Sie bei Google auf Platz 1 landen',
      'Verträge, die Sie jahrelang binden',
      'Fachchinesisch und Folien statt einer fertigen Seite'
    ],
    teamTitle: 'Wer hinter TreeTech steckt',
    teamLead: 'Wir sind zwei Leute. Sie reden immer direkt mit uns, nicht mit einer Hotline.',
    teamSoon: 'Fotos und ein paar Sätze über uns folgen in Kürze. Bis dahin: Rufen Sie einfach an, dann lernen Sie uns direkt kennen.',
    regionTitle: 'Wo wir arbeiten',
    region: 'Wien und Niederösterreich. Das Gespräch führen wir am Telefon oder bei Ihnen im Betrieb.',
    ctaTitle: 'Sehen Sie Ihre Website, bevor Sie sich entscheiden.',
    ctaLead: 'Name Ihres Betriebs und Ort genügen. Die Vorschau haben Sie in 3 Werktagen.',
    cta: 'Kostenlose Vorschau anfordern',
    call: 'Anrufen',
    whatsapp: 'WhatsApp'
  },
  en: {
    title: 'We make websites for people who have no time for websites.',
    lead: 'TreeTech is a small web studio for trades and workshops in Vienna and Lower Austria. You do your work, we make sure people find you online and call.',
    whyTitle: 'Why we exist',
    why: [
      'Many businesses have good Google reviews but no website of their own. Or one that is barely readable on a phone.',
      'The usual offers do not fit: long questionnaires, writing your own copy, a price only after three meetings.',
      'We turn that around. You see your site first, for free. Only if you like it do we talk about the order.'
    ],
    principlesTitle: 'How we work',
    principles: [
      {title: 'Fixed price upfront', text: 'You know the cost before we start. Anything extra only after we agree on it.'},
      {title: 'We write the copy', text: 'A 30-minute call is enough. We take care of the rest.'},
      {title: 'One contact', text: 'You talk to the people who build your site. Always on the same number.'},
      {title: 'Everything is yours', text: 'Domain, copy, photos and code. No contract that ties you down.'}
    ],
    doTitle: 'What we do',
    do: [
      'Websites for trades and workshops, live in 7 days',
      'Set up your Google profile and link it to your site',
      'Care: tech, security and small changes via WhatsApp',
      'Send inquiries straight to you, with photo and address'
    ],
    dontTitle: 'What we do not do',
    dont: [
      'Promise you the top spot on Google',
      'Contracts that lock you in for years',
      'Jargon and slide decks instead of a finished site'
    ],
    teamTitle: 'Who is behind TreeTech',
    teamLead: 'We are two people. You always talk to us directly, never to a hotline.',
    teamSoon: 'Photos and a few words about us are coming soon. Until then, just give us a call and get to know us directly.',
    regionTitle: 'Where we work',
    region: 'Vienna and Lower Austria. We hold the call by phone or at your business.',
    ctaTitle: 'See your website before you decide.',
    ctaLead: 'Your business name and town are enough. You get the preview within 3 working days.',
    cta: 'Get my free preview',
    call: 'Call',
    whatsapp: 'WhatsApp'
  },
  ru: {
    title: 'Мы делаем сайты для тех, у кого нет времени на сайты.',
    lead: 'TreeTech это небольшая веб-студия для мастеров и автосервисов в Вене и Нижней Австрии. Вы делаете свою работу, а мы делаем так, чтобы вас находили в интернете и звонили.',
    whyTitle: 'Зачем мы это делаем',
    why: [
      'У многих мастеров хорошие отзывы в Google, но нет своего сайта. Или есть, но с телефона его не прочитать.',
      'Обычные предложения им не подходят: длинные анкеты, тексты пиши сам, цена только после трёх встреч.',
      'Мы делаем наоборот. Сначала вы бесплатно видите свой сайт. Только если он понравился, говорим о заказе.'
    ],
    principlesTitle: 'Как мы работаем',
    principles: [
      {title: 'Фиксированная цена заранее', text: 'Вы знаете стоимость до начала работы. Всё дополнительное только по договорённости.'},
      {title: 'Тексты пишем мы', text: 'Хватит 30 минут разговора. Остальное берём на себя.'},
      {title: 'Один контакт', text: 'Вы говорите с теми, кто делает ваш сайт. Всегда по одному номеру.'},
      {title: 'Всё принадлежит вам', text: 'Домен, тексты, фото и код. Никакого договора, который вас держит.'}
    ],
    doTitle: 'Что мы делаем',
    do: [
      'Сайты для мастеров и автосервисов, онлайн за 7 дней',
      'Настраиваем профиль в Google и связываем его с сайтом',
      'Поддержка: техника, безопасность и мелкие правки через WhatsApp',
      'Заявки сразу приходят вам, с фото и адресом'
    ],
    dontTitle: 'Чего мы не делаем',
    dont: [
      'Не обещаем первое место в Google',
      'Не заключаем договоров, которые держат вас годами',
      'Не заменяем готовый сайт презентациями и умными словами'
    ],
    teamTitle: 'Кто стоит за TreeTech',
    teamLead: 'Нас двое. Вы всегда говорите с нами напрямую, а не с горячей линией.',
    teamSoon: 'Фото и пару слов о нас добавим совсем скоро. А пока просто позвоните, и познакомимся лично.',
    regionTitle: 'Где мы работаем',
    region: 'Вена и Нижняя Австрия. Разговор проводим по телефону или у вас на месте.',
    ctaTitle: 'Посмотрите на свой сайт, прежде чем решать.',
    ctaLead: 'Достаточно названия бизнеса и города. Превью будет у вас через 3 рабочих дня.',
    cta: 'Получить бесплатное превью',
    call: 'Позвонить',
    whatsapp: 'WhatsApp'
  }
};

const aboutMeta: Record<Locale, {title: string; description: string}> = {
  de: {
    title: 'Über uns | TreeTech, Websites für Handwerk',
    description: `Kleines Webstudio für Handwerk und Werkstätten in Wien und Niederösterreich. Fixpreis ab ${formatEur(getPackage('websiteStart').oneTime ?? 0, 'de')}, Texte inklusive, Vorschau kostenlos.`
  },
  en: {
    title: 'About us | TreeTech, websites for trades',
    description: `Small web studio for trades and workshops in Vienna and Lower Austria. Fixed price from ${formatEur(getPackage('websiteStart').oneTime ?? 0, 'en')}, copy included, free preview.`
  },
  ru: {
    title: 'О нас | TreeTech, сайты для мастеров',
    description: `Небольшая веб-студия для мастеров и автосервисов в Вене и Нижней Австрии. Фиксированная цена от ${formatEur(getPackage('websiteStart').oneTime ?? 0, 'ru')}, тексты включены, превью бесплатно.`
  }
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const rawLocale = (await params).locale;

  if (!hasLocale(routing.locales, rawLocale)) {
    return {};
  }

  return createPageMetadata({
    locale: rawLocale,
    path: '/about',
    title: aboutMeta[rawLocale].title,
    description: aboutMeta[rawLocale].description
  });
}

export default async function AboutPage({params}: PageProps) {
  const rawLocale = (await params).locale;

  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }

  const locale = rawLocale;
  setRequestLocale(locale);
  const text = copy[locale];

  return (
    <>
      <section className="border-b-2 border-foreground py-12 sm:py-20">
        <Container>
          <h1 className="max-w-4xl text-balance text-[42px] leading-[1.02] text-foreground sm:text-6xl">{text.title}</h1>
          <p className="mt-5 max-w-[36em] text-pretty text-lg leading-relaxed text-muted sm:text-xl">{text.lead}</p>
        </Container>
      </section>

      <section className="bg-surface py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <h2 className="text-[30px] leading-[1.08] text-foreground sm:text-[44px]">{text.whyTitle}</h2>
            <div className="grid gap-5">
              {text.why.map((item, index) => (
                <p
                  key={item}
                  className={
                    index === text.why.length - 1
                      ? 'text-pretty text-xl font-bold leading-snug text-foreground sm:text-2xl'
                      : 'text-pretty text-lg leading-relaxed text-muted'
                  }
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <h2 className="text-[30px] leading-[1.08] text-foreground sm:text-[44px]">{text.principlesTitle}</h2>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {text.principles.map((item, index) => (
              <article key={item.title} className="border-t-2 border-foreground pt-4">
                <span className="text-sm font-bold text-accent">{index + 1}</span>
                <h3 className="mt-1 text-xl font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y-2 border-foreground bg-surface py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-2xl text-foreground sm:text-3xl">{text.doTitle}</h2>
              <ul className="mt-5 grid gap-3">
                {text.do.map((item) => (
                  <li key={item} className="grid grid-cols-[24px_1fr] gap-3 text-[17px] font-semibold text-foreground">
                    <Check className="mt-0.5 h-6 w-6 text-accent" strokeWidth={2.6} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl text-foreground sm:text-3xl">{text.dontTitle}</h2>
              <ul className="mt-5 grid gap-3">
                {text.dont.map((item) => (
                  <li key={item} className="grid grid-cols-[24px_1fr] gap-3 text-[17px] font-semibold text-muted">
                    <X className="mt-0.5 h-6 w-6 text-[#b42318]" strokeWidth={2.6} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="text-[30px] leading-[1.08] text-foreground sm:text-[44px]">{text.teamTitle}</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted">{text.teamLead}</p>
            </div>
            {teamMembers.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {teamMembers.map((member) => (
                  <article key={member.name} className="rounded-[14px] border-2 border-foreground bg-surface p-5">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={240}
                      height={240}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                    <h3 className="mt-4 text-xl font-bold text-foreground">{member.name}</h3>
                    <p className="text-[15px] font-bold text-accent">{member.role[locale]}</p>
                    <p className="mt-2 text-[16px] leading-relaxed text-muted">{member.bio[locale]}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[14px] border-2 border-foreground bg-surface p-6">
                <p className="text-lg leading-relaxed text-foreground">{text.teamSoon}</p>
                <div className="mt-5 grid gap-3 sm:flex">
                  <ButtonLink href={phoneHref} variant="secondary" icon={Phone} trackingEvent="phone_click">
                    {`${text.call}: ${siteConfig.phone}`}
                  </ButtonLink>
                  <ButtonLink
                    href={whatsappHref(homeHandwerk[locale].whatsappMessage)}
                    variant="secondary"
                    icon={MessageCircle}
                    trackingEvent="whatsapp_click"
                  >
                    {text.whatsapp}
                  </ButtonLink>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 border-t-2 border-foreground pt-6">
            <h2 className="text-2xl text-foreground">{text.regionTitle}</h2>
            <p className="mt-2 max-w-[38em] text-lg leading-relaxed text-muted">{text.region}</p>
          </div>
        </Container>
      </section>

      <section className="bg-accent py-14 text-white">
        <Container>
          <h2 className="max-w-3xl text-balance text-[30px] leading-[1.08] sm:text-[44px]">{text.ctaTitle}</h2>
          <p className="mt-3 max-w-[38em] text-[17px] text-white/85">{text.ctaLead}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact#audit-call" variant="signal" trackingEvent="cta_preview_about">
              {text.cta}
            </ButtonLink>
            <ButtonLink href={phoneHref} variant="onDark" icon={Phone} trackingEvent="phone_click">
              {text.call}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
