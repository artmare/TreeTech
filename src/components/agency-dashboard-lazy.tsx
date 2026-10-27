'use client';

import {type ComponentType, useEffect, useState} from 'react';

import type {Locale} from '@/i18n/routing';

type AgencyDashboardLazyProps = {
  locale: Locale;
};

type AgencyDashboardComponent = ComponentType<AgencyDashboardLazyProps>;

export function AgencyDashboardLazy({locale}: AgencyDashboardLazyProps) {
  const [Dashboard, setDashboard] = useState<AgencyDashboardComponent | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    let active = true;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof globalThis.setTimeout> | undefined;

    const loadDashboard = () => {
      if (!media.matches || Dashboard) {
        return;
      }

      import('@/components/agency-dashboard').then((module) => {
        if (active) {
          setDashboard(() => module.AgencyDashboard);
        }
      });
    };

    const scheduleLoad = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(loadDashboard, {timeout: 2500});
      } else {
        timeoutId = globalThis.setTimeout(loadDashboard, 900);
      }
    };

    const onChange = () => {
      if (media.matches) {
        scheduleLoad();
      }
    };

    scheduleLoad();
    media.addEventListener('change', onChange);

    return () => {
      active = false;
      media.removeEventListener('change', onChange);

      if (idleId !== undefined) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId !== undefined) {
        globalThis.clearTimeout(timeoutId);
      }
    };
  }, [Dashboard]);

  return Dashboard ? <Dashboard locale={locale} /> : <AgencyDashboardFallback />;
}

function AgencyDashboardFallback() {
  return (
    <div
      className="relative z-10 -mx-6 h-[40svh] min-h-[15rem] max-h-[18rem] overflow-hidden sm:mx-0 sm:h-auto sm:min-h-[30rem] sm:max-h-none lg:min-h-[34rem]"
      role="img"
      aria-label="TreeTech workflow system"
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-90" aria-hidden="true">
        <div className="relative h-56 w-56 sm:h-80 sm:w-80">
          <span className="absolute inset-8 rounded-full border border-accent/30 shadow-[0_0_80px_rgba(214,255,99,0.16)]" />
          <span className="absolute inset-0 rounded-full border border-white/10" />
          <span className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-accent/35 blur-xl" />
          <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-[1.25rem] border border-accent/50 bg-accent/20" />
        </div>
      </div>
    </div>
  );
}
