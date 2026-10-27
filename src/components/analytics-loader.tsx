'use client';

import {useEffect, useState} from 'react';

const googleAnalyticsId = 'G-BQ851B8KN3';
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
const consentKey = 'treetech-analytics-consent';

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  clarity?: (...args: unknown[]) => void;
};

export function AnalyticsLoader() {
  const [consent, setConsent] = useState<'loading' | 'granted' | 'denied' | null>('loading');
  const consentCopy = getConsentCopy();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const stored = window.localStorage.getItem(consentKey);

      setConsent(stored === 'granted' || stored === 'denied' ? stored : null);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (consent !== 'granted') {
      return;
    }

    loadGoogleAnalytics();
    loadClarity();

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest('a[href]');
      const href = link?.getAttribute('href') || '';
      const tracked = link?.getAttribute('data-track');

      if (tracked) {
        trackEvent(tracked, {href});
      } else if (href.startsWith('tel:')) {
        trackEvent('phone_click', {href});
      } else if (href.includes('wa.me/')) {
        trackEvent('whatsapp_click', {href});
      }

      if (href.includes('#audit-call')) {
        trackEvent('cta_click', {target: 'audit_call', href});
      }

      if (href.startsWith('mailto:') && href.includes('TreeTech')) {
        trackEvent('booking_request_click', {target: 'email'});
      }
    };

    const onCustomEvent = (event: Event) => {
      const detail = (event as CustomEvent<{name?: string; params?: Record<string, unknown>}>).detail;

      if (detail?.name) {
        trackEvent(detail.name, detail.params);
      }
    };

    document.addEventListener('click', onClick);
    window.addEventListener('treetech:analytics', onCustomEvent);

    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('treetech:analytics', onCustomEvent);
    };
  }, [consent]);

  function updateConsent(nextConsent: 'granted' | 'denied') {
    window.localStorage.setItem(consentKey, nextConsent);
    setConsent(nextConsent);
  }

  if (consent !== null) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-20 z-[65] mx-auto max-w-xl rounded-[1rem] border border-white/12 bg-[#070806]/95 p-4 text-sm text-white shadow-[0_18px_58px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-auto sm:mx-0">
      <p className="font-semibold">{consentCopy.title}</p>
      <p className="mt-2 leading-6 text-white/68">{consentCopy.body}</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => updateConsent('granted')}
          className="inline-flex min-h-10 items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-[#070806] transition hover:bg-white"
        >
          {consentCopy.accept}
        </button>
        <button
          type="button"
          onClick={() => updateConsent('denied')}
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.055] px-4 py-2 text-sm font-semibold text-white/78 transition hover:border-accent/40 hover:text-accent"
        >
          {consentCopy.decline}
        </button>
      </div>
    </div>
  );
}

function loadGoogleAnalytics() {
  if (document.querySelector(`script[src*="${googleAnalyticsId}"]`)) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
  script.onload = () => {
    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
    analyticsWindow.gtag = (...args: unknown[]) => {
      analyticsWindow.dataLayer?.push(args);
    };
    analyticsWindow.gtag('js', new Date());
    analyticsWindow.gtag('config', googleAnalyticsId, {anonymize_ip: true});
  };
  document.head.append(script);
}

function loadClarity() {
  if (!clarityProjectId || document.querySelector(`script[src*="clarity.ms/tag/${clarityProjectId}"]`)) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${clarityProjectId}`;
  document.head.append(script);
}

function trackEvent(name: string, params?: Record<string, unknown>) {
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.gtag?.('event', name, params || {});
  analyticsWindow.clarity?.('event', name);
}

function getConsentCopy() {
  const locale =
    typeof document === 'undefined' ? 'de' : document.documentElement.lang.split('-')[0];
  const copy = {
    de: {
      title: 'Analytics erlauben?',
      body: 'Wir nutzen Analytics und optional Clarity, um CTA-Klicks, Formularabschlüsse und Chat-Nutzung zu verbessern. Keine Tracking-Skripte werden vor Ihrer Zustimmung geladen.',
      accept: 'Erlauben',
      decline: 'Ablehnen'
    },
    en: {
      title: 'Allow analytics?',
      body: 'We use analytics and optional Clarity to improve CTA clicks, form completion, and chat usage. No tracking scripts load before your consent.',
      accept: 'Allow',
      decline: 'Decline'
    },
    ru: {
      title: 'Разрешить аналитику?',
      body: 'Мы используем analytics и опционально Clarity, чтобы улучшать CTA, формы и чат. Tracking-скрипты не загружаются до вашего согласия.',
      accept: 'Разрешить',
      decline: 'Отклонить'
    }
  };

  if (locale === 'en' || locale === 'ru') {
    return copy[locale];
  }

  return copy.de;
}
