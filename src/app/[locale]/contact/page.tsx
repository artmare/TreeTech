import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import {Mail, MapPin, Timer} from 'lucide-react';

import {ContactForm} from '@/components/contact-form';
import {FadeIn} from '@/components/motion/fade-in';
import {Container} from '@/components/ui/container';
import {siteConfig, siteContent} from '@/content/site';
import type {Locale} from '@/i18n/routing';
import {createPageMetadata} from '@/lib/seo';

type PageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const content = siteContent[locale];

  return createPageMetadata({
    locale,
    path: '/contact',
    title: content.metadata.contactTitle,
    description: content.metadata.contactDescription
  });
}

export default async function ContactPage({params}: PageProps) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const content = siteContent[locale];

  return (
    <>
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <FadeIn>
              <p className="text-sm font-semibold uppercase text-primary">
                {content.common.nextStep}
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
                {content.contact.title}
              </h1>
              <p className="mt-6 text-pretty text-lg leading-8 text-muted">
                {content.contact.lead}
              </p>

              <div className="mt-8 grid gap-3">
                <div className="flex gap-3 rounded-[8px] border border-border bg-white p-4 shadow-sm">
                  <Mail className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                  <a href={`mailto:${siteConfig.email}`} className="text-sm font-semibold text-foreground">
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex gap-3 rounded-[8px] border border-border bg-white p-4 shadow-sm">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                  <p className="text-sm leading-6 text-muted">{content.contact.details}</p>
                </div>
                <div className="flex gap-3 rounded-[8px] border border-border bg-white p-4 shadow-sm">
                  <Timer className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                  <p className="text-sm leading-6 text-muted">{content.contact.responseTime}</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-foreground">
                  {content.contact.formTitle}
                </h2>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
