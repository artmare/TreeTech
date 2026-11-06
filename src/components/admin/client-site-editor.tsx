'use client';

import {useState} from 'react';
import {useFormStatus} from 'react-dom';

import type {WegiContent} from '@/content/client-sites/weg-i';

const tabs = [
  {id: 'allgemein', label: 'Allgemein'},
  {id: 'leistungen', label: 'Leistungen'},
  {id: 'referenzen', label: 'Referenzen & Marken'},
  {id: 'ueber-uns', label: 'Über uns'}
] as const;
type TabId = (typeof tabs)[number]['id'];

const fieldClasses =
  '[&_input:not([type=checkbox])]:h-11 [&_input:not([type=checkbox])]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-white/10 [&_input]:bg-black/20 [&_input]:px-3 [&_textarea]:w-full [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-white/10 [&_textarea]:bg-black/20 [&_textarea]:p-3 [&_textarea]:leading-6';

function Card({title, hint, children}: {title: string; hint?: string; children: React.ReactNode}) {
  return (
    <section className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      {hint ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
      <div className="mt-4 grid gap-4">{children}</div>
    </section>
  );
}

function Field({label, children, hint}: {label: string; children: React.ReactNode; hint?: string}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium">
      {label}
      {children}
      {hint ? <span className="text-xs font-normal text-muted">{hint}</span> : null}
    </label>
  );
}

function SaveButton() {
  const {pending} = useFormStatus();
  return (
    <button disabled={pending} className="min-h-12 rounded-full bg-accent px-6 font-semibold text-[#070806] disabled:opacity-60">
      {pending ? 'Wird veröffentlicht…' : 'Veröffentlichen'}
    </button>
  );
}

export function ClientSiteEditor({
  slug,
  content,
  action,
  siteUrl,
  initialTab
}: {
  slug: string;
  content: WegiContent;
  action: (formData: FormData) => Promise<void>;
  siteUrl: string;
  initialTab?: string;
}) {
  const [tab, setTab] = useState<TabId>(tabs.some((t) => t.id === initialTab) ? (initialTab as TabId) : 'allgemein');
  const [bannerOn, setBannerOn] = useState(content.banner.enabled);
  const [bannerText, setBannerText] = useState(content.banner.text);
  const [monThu, setMonThu] = useState(content.hours.monThu);
  const [fri, setFri] = useState(content.hours.fri);

  return (
    <form action={action} className={`mt-7 grid gap-6 ${fieldClasses}`}>
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="tab" value={tab} />

      <div role="tablist" aria-label="Bereiche" className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`min-h-11 rounded-full px-4 text-sm font-semibold transition ${tab === t.id ? 'bg-white text-[#070806]' : 'border border-white/10 text-muted hover:text-white'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* All panels stay in the DOM so one submit saves every field. */}
      <div hidden={tab !== 'allgemein'} className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <Card title="Hinweis-Banner" hint="Erscheint ganz oben auf der Website, z. B. Betriebsurlaub oder eine Aktion.">
            <label className="flex items-center gap-3 text-sm font-medium">
              <input type="checkbox" name="banner_enabled" checked={bannerOn} onChange={(e) => setBannerOn(e.target.checked)} className="h-5 w-5 accent-[#e08a4b]" />
              Banner anzeigen
            </label>
            <Field label="Text">
              <input name="banner_text" value={bannerText} onChange={(e) => setBannerText(e.target.value)} maxLength={160} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Anzeigen ab" hint="leer = sofort">
                <input type="date" name="banner_from" defaultValue={content.banner.from} />
              </Field>
              <Field label="bis" hint="leer = ohne Ende">
                <input type="date" name="banner_until" defaultValue={content.banner.until} />
              </Field>
            </div>
          </Card>

          <Card title="Bürozeiten">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Montag – Donnerstag">
                <input name="hours_monThu" value={monThu} onChange={(e) => setMonThu(e.target.value)} maxLength={60} />
              </Field>
              <Field label="Freitag">
                <input name="hours_fri" value={fri} onChange={(e) => setFri(e.target.value)} maxLength={60} />
              </Field>
            </div>
          </Card>

          <Card title="Kontakt">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Telefon">
                <input name="phone" defaultValue={content.contact.phone} maxLength={40} />
              </Field>
              <Field label="E-Mail">
                <input type="email" name="email" defaultValue={content.contact.email} maxLength={120} />
              </Field>
              <Field label="Adresse">
                <input name="address" defaultValue={content.contact.address} maxLength={120} />
              </Field>
              <Field label="PLZ & Ort">
                <input name="address2" defaultValue={content.contact.addressLine2} maxLength={80} />
              </Field>
            </div>
          </Card>

          <Card title="Startseite & Aktionen">
            <Field label="Zeile über der Überschrift">
              <input name="hero_eyebrow" defaultValue={content.hero.eyebrow} maxLength={90} />
            </Field>
            <Field label="Einleitungstext">
              <textarea name="hero_lead" rows={3} defaultValue={content.hero.lead} maxLength={320} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
              <Field label="Thermen-Aktion" hint="leer = ausblenden">
                <input name="promo_value" defaultValue={content.promo.value} maxLength={16} />
              </Field>
              <Field label="Beschreibung">
                <input name="promo_text" defaultValue={content.promo.text} maxLength={120} />
              </Field>
            </div>
            <Field label="Beratung & Planung (Preis)">
              <input name="consultationFee" defaultValue={content.consultationFee} maxLength={20} />
            </Field>
          </Card>
        </div>

        <aside className="xl:sticky xl:top-6 xl:self-start">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Live-Vorschau</p>
          <div className="mt-3 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0b1d2a] text-white shadow-2xl">
            {bannerOn && bannerText.trim() ? <div className="bg-[#e08a4b] px-4 py-2 text-center text-xs font-semibold text-[#0b1d2a]">{bannerText}</div> : null}
            <div className="grid gap-3 p-5">
              <span className="text-xs text-[#9fb3c2]">
                Büro: Mo–Do {monThu} · Fr {fri}
              </span>
              <span className="text-4xl font-extrabold leading-[0.95] tracking-tight">
                Wasser.
                <br />
                <span className="text-[#e08a4b]">Wärme.</span>
                <br />
                Wegscheider.
              </span>
              <span className="w-fit rounded-full bg-[#e08a4b] px-4 py-2 text-xs font-semibold text-[#0b1d2a]">Beratung anfragen</span>
            </div>
          </div>
          <p className="mt-3 text-xs leading-5 text-muted">Änderungen sind nach „Veröffentlichen“ sofort online.</p>
          <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center rounded-full border border-white/10 px-4 text-sm font-semibold hover:bg-white/[0.06]">
            Website öffnen ↗
          </a>
        </aside>
      </div>

      <div hidden={tab !== 'leistungen'} className="grid gap-4">
        <p className="text-sm text-muted">Ausgeblendete Leistungen erscheinen nicht auf der Website. Die Reihenfolge entspricht der Website.</p>
        {content.services.map((service, i) => (
          <section key={service.id} className="grid gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-[1fr_2fr_auto] sm:items-end">
            <Field label="Titel">
              <input name={`service_title_${i}`} defaultValue={service.title} maxLength={60} />
            </Field>
            <Field label="Kurztext">
              <input name={`service_text_${i}`} defaultValue={service.text} maxLength={240} />
            </Field>
            <label className="flex min-h-11 items-center gap-2 text-sm font-medium">
              <input type="checkbox" name={`service_visible_${i}`} defaultChecked={service.visible} className="h-5 w-5 accent-[#e08a4b]" />
              Sichtbar
            </label>
          </section>
        ))}
      </div>

      <div hidden={tab !== 'referenzen'} className="grid gap-6 lg:grid-cols-2">
        <Card title="Referenzen" hint="Ein Name pro Zeile. Laufen auf der Startseite im Referenz-Band.">
          <textarea name="references" rows={14} defaultValue={content.references.join('\n')} />
        </Card>
        <div className="grid gap-6">
          <Card title="Marken im Schauraum" hint="Mit Komma trennen.">
            <textarea name="bathBrands" rows={3} defaultValue={content.bathBrands.join(', ')} />
          </Card>
          <Card title="Thermen-Marken" hint="Mit Komma trennen.">
            <textarea name="boilerBrands" rows={3} defaultValue={content.boilerBrands.join(', ')} />
          </Card>
        </div>
      </div>

      <div hidden={tab !== 'ueber-uns'} className="grid gap-6 lg:grid-cols-2">
        <Card title="Geschichte" hint="Pro Zeile: Jahr | Text">
          <textarea name="milestones" rows={10} defaultValue={content.milestones.map((m) => `${m.year} | ${m.text}`).join('\n')} />
        </Card>
        <Card title="Team" hint="Pro Zeile: Name | Rolle">
          <textarea name="team" rows={10} defaultValue={content.team.map((t) => `${t.name} | ${t.role}`).join('\n')} />
        </Card>
      </div>

      <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#070806]/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <span className="text-sm text-muted">Alle Bereiche werden gemeinsam gespeichert.</span>
        <SaveButton />
      </div>
    </form>
  );
}
