'use client';

import {type ComponentType, useEffect, useState} from 'react';

import type {Locale} from '@/i18n/routing';

type AssistantWidgetLoaderProps = {
  locale: Locale;
};

type AssistantWidgetComponent = ComponentType<AssistantWidgetLoaderProps>;

export function AssistantWidgetLoader({locale}: AssistantWidgetLoaderProps) {
  const [Widget, setWidget] = useState<AssistantWidgetComponent | null>(null);

  useEffect(() => {
    let active = true;
    let timeoutId: ReturnType<typeof globalThis.setTimeout> | undefined;
    let idleId: number | undefined;

    const loadWidget = () => {
      import('@/components/assistant-widget').then((module) => {
        if (active) {
          setWidget(() => module.AssistantWidget);
        }
      });
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(loadWidget, {timeout: 3500});
    } else {
      timeoutId = globalThis.setTimeout(loadWidget, 1800);
    }

    return () => {
      active = false;

      if (idleId !== undefined) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId !== undefined) {
        globalThis.clearTimeout(timeoutId);
      }
    };
  }, []);

  return Widget ? <Widget locale={locale} /> : null;
}
