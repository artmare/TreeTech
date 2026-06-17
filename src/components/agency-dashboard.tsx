import Image from 'next/image';

import type {Locale} from '@/i18n/routing';

type AgencyDashboardProps = {
  locale: Locale;
};

const copy = {
  de: {
    badge: 'Echte Demo-Vorschau'
  },
  en: {
    badge: 'Real demo preview'
  }
} satisfies Record<Locale, {badge: string}>;

export function AgencyDashboard({locale}: AgencyDashboardProps) {
  const content = copy[locale];

  return (
    <div className="relative min-h-[28rem] lg:min-h-[32rem]">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_70%_20%,rgba(214,255,99,0.22),transparent_34rem)] blur-2xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.07] p-3 shadow-[0_34px_110px_rgba(0,0,0,0.34)] backdrop-blur">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#08110f]">
          <Image
            src="/portfolio-previews/bergblick-hotel.png"
            alt="Bergblick Hotel demo website preview"
            fill
            priority
            sizes="(min-width: 1024px) 650px, 100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,6,0.02)_0%,rgba(7,8,6,0.08)_52%,rgba(7,8,6,0.74)_100%)]" />

          <div className="absolute left-5 top-5 rounded-full border border-white/24 bg-[#07110f]/72 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/82 backdrop-blur">
            {content.badge}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-8 left-4 hidden w-[44%] overflow-hidden rounded-[1.25rem] border border-white/14 bg-[#07110f] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.36)] sm:block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.9rem]">
          <Image
            src="/portfolio-previews/alpendent.png"
            alt="AlpenDent demo website preview"
            fill
            sizes="320px"
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="absolute -bottom-12 right-6 hidden w-[38%] overflow-hidden rounded-[1.25rem] border border-white/14 bg-[#07110f] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.36)] md:block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.9rem]">
          <Image
            src="/portfolio-previews/kraftwerk-fitness.png"
            alt="KraftWerk Fitness demo website preview"
            fill
            sizes="280px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
