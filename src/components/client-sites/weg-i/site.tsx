import type {ReactNode} from 'react';

import type {WegiContent} from '@/content/client-sites/weg-i';

import s from './site.module.css';

type Props = {content: WegiContent; showBanner: boolean; preview?: boolean};

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(' ');

function Svg({children, size = 24, width = 1.8}: {children: ReactNode; size?: number; width?: number}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const PhoneIcon = ({size = 18}: {size?: number}) => (
  <Svg size={size} width={2.2}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </Svg>
);
const Arrow = ({className}: {className?: string}) => (
  <span className={className}>
    <Svg size={16} width={2.2}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  </span>
);
const Check = () => (
  <Svg size={22} width={2.4}>
    <path d="M5 12l5 5L20 7" />
  </Svg>
);

const serviceIcons: Record<string, ReactNode> = {
  bad: (
    <>
      <path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
      <path d="M6 12V5a2 2 0 0 1 3.5-1.3" />
      <path d="M7 20l-1 2M17 20l1 2" />
    </>
  ),
  heizung: <path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-8z" />,
  gas: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M9 17h6" />
    </>
  ),
  klima: (
    <>
      <path d="M3 9h18v6H3z" />
      <path d="M7 15v3M12 15v4M17 15v3" />
    </>
  ),
  wasser: <path d="M12 2c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z" />,
  reparatur: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" />
};
const serviceTargets: Record<string, string> = {bad: '#bad', gas: '#therme', heizung: '#kontakt', klima: '#kontakt', wasser: '#kontakt'};

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function WegiSite({content: c, showBanner, preview = false}: Props) {
  const tel = `tel:${c.contact.phoneHref}`;
  const services = c.services.filter((service) => service.visible);
  const refs = c.references.filter(Boolean);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.contact.address}, ${c.contact.addressLine2}`)}`;

  return (
    <div className={s.page}>
      {preview ? (
        <div className={s.preview} role="note">
          Unverbindlicher <strong>Redesign-Entwurf von <a href="https://treetech.at">TreeTech</a></strong> für die Peter Wegscheider GmbH – die offizielle Website ist{' '}
          <a href="https://weg-i.at">weg-i.at</a>.
        </div>
      ) : null}
      {showBanner ? <div className={s.infoBanner}>{c.banner.text}</div> : null}

      <div className={s.topbar}>
        <div className={s.wrap}>
          <span>
            <span className={s.dot} aria-hidden="true" />
            Büro: Mo–Do {c.hours.monThu} · Fr {c.hours.fri}
          </span>
          <span className={s.topbarExtra}>
            Mitglied der 1a-Installateure · <a href={`mailto:${c.contact.email}`}>{c.contact.email}</a>
          </span>
        </div>
      </div>

      <header className={s.header}>
        <div className={s.wrap}>
          <a href="#top" className={s.brand} aria-label="Wegscheider Installationen – zum Seitenanfang">
            <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
              <rect width="44" height="44" rx="12" fill="#1F5FD6" />
              <path d="M10 14l5 16 7-11 7 11 5-16" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>
              <span className={s.brandName}>Wegscheider</span>
              <span className={s.brandSub}>Installationen · seit 1951</span>
            </span>
          </a>
          <nav className={s.nav} aria-label="Hauptnavigation">
            <a className={s.navLink} href="#leistungen">Leistungen</a>
            <a className={s.navLink} href="#bad">Bad &amp; Schauraum</a>
            <a className={s.navLink} href="#therme">Thermenservice</a>
            <a className={s.navLink} href="#ueber-uns">Über uns</a>
            <a className={s.navLink} href="#kontakt">Kontakt</a>
            <a className={cx(s.btn, s.btnCopper, s.btnSmall, s.headerCall)} href={tel} aria-label={`Anrufen: ${c.contact.phone}`}>
              <PhoneIcon size={17} />
              <span>{c.contact.phone}</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className={s.hero}>
          <div className={s.wrap}>
            <div className={s.heroText}>
              <span className={cx(s.chip, s.up)}>{c.hero.eyebrow}</span>
              <h1 className={cx(s.h1, s.up, s.d1)}>
                <span>Wasser.</span>
                <span className={s.warm}>Wärme.</span>
                <span>Wegscheider.</span>
              </h1>
              <p className={cx(s.heroLead, s.up, s.d2)}>{c.hero.lead}</p>
              <div className={cx(s.ctaRow, s.up, s.d3)}>
                <a className={cx(s.btn, s.btnCopper)} href="#kontakt">
                  Beratung anfragen <Arrow />
                </a>
                <a className={cx(s.btn, s.btnGhost)} href="#bad">
                  Schauraum besuchen
                </a>
              </div>
              <div className={cx(s.stats, s.up, s.d4)}>
                <div className={s.stat}>
                  <span className={s.statNum}>1951</span>
                  <span className={s.statLabel}>gegründet in Wien</span>
                </div>
                <div className={s.stat}>
                  <span className={s.statNum}>4</span>
                  <span className={s.statLabel}>Generationen Familie</span>
                </div>
                <div className={s.stat}>
                  <span className={s.statNum}>35+</span>
                  <span className={s.statLabel}>Referenzkunden</span>
                </div>
              </div>
            </div>
            <div className={cx(s.heroArt, s.up, s.d2)}>
              <svg viewBox="0 0 460 460" role="img" aria-label="Animierte Grafik: Wasser- und Heizungsleitungen">
                <rect x="20" y="20" width="420" height="420" rx="36" fill="#0F2636" stroke="#1C3242" />
                <path d="M60 120 H210 a30 30 0 0 1 30 30 V300 a30 30 0 0 0 30 30 H400" fill="none" stroke="#173247" strokeWidth="22" strokeLinecap="round" />
                <path className={s.flow} d="M60 120 H210 a30 30 0 0 1 30 30 V300 a30 30 0 0 0 30 30 H400" fill="none" stroke="#4B8CF5" strokeWidth="6" strokeLinecap="round" />
                <path d="M60 380 H140 a30 30 0 0 0 30 -30 V210 a30 30 0 0 1 30 -30 H300 a30 30 0 0 0 30 -30 V70" fill="none" stroke="#2E2420" strokeWidth="22" strokeLinecap="round" />
                <path className={s.flowWarm} d="M60 380 H140 a30 30 0 0 0 30 -30 V210 a30 30 0 0 1 30 -30 H300 a30 30 0 0 0 30 -30 V70" fill="none" stroke="#E08A4B" strokeWidth="6" strokeLinecap="round" />
                <circle cx="240" cy="225" r="34" fill="#0B1D2A" stroke="#3A5568" strokeWidth="3" />
                <path className={s.needle} d="M240 225 V200" stroke="#DCE6EC" strokeWidth="4" strokeLinecap="round" />
                <circle cx="240" cy="225" r="6" fill="#E08A4B" />
                <rect x="372" y="300" width="56" height="60" rx="12" fill="#0B1D2A" stroke="#3A5568" strokeWidth="3" />
                <path className={s.drop} d="M400 318 c6 8 10 14 10 19 a10 10 0 0 1 -20 0 c0 -5 4 -11 10 -19z" fill="#4B8CF5" />
                <text x="60" y="104" fill="#7FA6C8" fontFamily="Instrument Sans Variable, sans-serif" fontSize="14" letterSpacing="2">WASSER</text>
                <text x="60" y="412" fill="#C99A78" fontFamily="Instrument Sans Variable, sans-serif" fontSize="14" letterSpacing="2">WÄRME</text>
              </svg>
            </div>
          </div>
        </section>

        {refs.length ? (
          <section className={s.refs} aria-label="Referenzen">
            <div className={cx(s.wrap, s.refsLabel)}>Vertrauen von Wiener Institutionen und Betrieben</div>
            <div className={s.marqueeViewport}>
              <div className={s.marquee}>
                {[0, 1].map((copy) =>
                  refs.map((name, i) => (
                    <span key={`${copy}-${i}`} aria-hidden={copy === 1 ? true : undefined}>
                      {name} <span className={s.sep}>·</span>
                    </span>
                  ))
                )}
              </div>
            </div>
          </section>
        ) : null}

        <section id="leistungen" className={s.section}>
          <div className={s.wrap}>
            <div className={cx(s.sectionHead, s.reveal)}>
              <div>
                <span className={s.eyebrow}>Leistungen</span>
                <h2 className={s.h2}>Alles rund um Wasser, Gas und Wärme.</h2>
              </div>
              <p>Von der Planung über die Montage bis zur jährlichen Wartung – aus einer Hand und mit eigenem Schauraum.</p>
            </div>
            <div className={s.grid3}>
              {services.map((service) => {
                const isRepair = service.id === 'reparatur';
                return (
                  <a
                    key={service.id}
                    className={cx(s.card, s.reveal, isRepair && s.cardDark)}
                    href={isRepair ? tel : serviceTargets[service.id] || '#kontakt'}
                  >
                    <span className={cx(s.icon, service.id === 'heizung' && s.iconWarm, isRepair && s.iconCopper)}>
                      <Svg size={28} width={isRepair ? 2 : 1.8}>
                        {serviceIcons[service.id] || serviceIcons.wasser}
                      </Svg>
                    </span>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <span className={s.more}>
                      {isRepair ? c.contact.phone : 'Mehr erfahren'} <Arrow className={s.arrow} />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section id="bad" className={cx(s.section, s.white)}>
          <div className={cx(s.wrap, s.split)}>
            <div className={cx(s.bathTiles, s.reveal)}>
              <div className={cx(s.tile, s.tileWide, s.tileWater)}>
                <svg className={s.tileArt} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <g fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M0 220 q50 -30 100 0 t100 0 t100 0 t100 0" />
                    <path d="M0 250 q50 -30 100 0 t100 0 t100 0 t100 0" />
                    <path d="M0 190 q50 -30 100 0 t100 0 t100 0 t100 0" />
                  </g>
                </svg>
                <span className={s.tileTitle}>Schauraum Ameisgasse 47</span>
                <span className={s.tileText}>Dampfdusche, barrierefreie Dusche, Dusch-WC – live erleben.</span>
              </div>
              <div className={cx(s.tile, s.tileStone)}>
                <span className={s.tileTitle}>Artwall</span>
                <span className={s.tileText}>Dusche tauschen ohne Fliesenarbeiten</span>
              </div>
              <div className={cx(s.tile, s.tileInk)}>
                <span className={s.tileTitle} style={{fontSize: 40}}>
                  {c.consultationFee}
                </span>
                <span className={s.tileText}>Beratung &amp; Planung – wird bei Auftrag voll angerechnet</span>
              </div>
            </div>
            <div className={cx(s.bathText, s.reveal)}>
              <span className={s.eyebrow}>Bad &amp; Schauraum</span>
              <h2 className={s.h2} style={{marginTop: 0}}>
                Ihr neues Bad – vorher anfassen, dann entscheiden.
              </h2>
              <p>
                In unserem Schauraum in der Ameisgasse 47 sehen Sie Dampfdusche, barrierefreie Dusche mit Faltwänden, Dusch-WC und Waschtische live. Lieber von zu Hause? Dann über den virtuellen
                3D-Rundgang.
              </p>
              <div className={s.checks}>
                <div className={s.check}>
                  <Check />
                  <span>
                    <strong>Dusche oder Wanne tauschen ohne Fliesenarbeiten</strong> – mit dem Artwall-System.
                  </span>
                </div>
                <div className={s.check}>
                  <Check />
                  <span>
                    <strong>Besichtigung vor Ort</strong> und unverbindlicher Kostenvoranschlag.
                  </span>
                </div>
                <div className={s.check}>
                  <Check />
                  <span>
                    <strong>Von der Planung bis zur Übergabe</strong> – ein Ansprechpartner.
                  </span>
                </div>
              </div>
              <div className={s.pills}>
                {c.bathBrands.map((brand) => (
                  <span key={brand} className={s.pill}>
                    {brand}
                  </span>
                ))}
              </div>
              <div className={s.ctaRow}>
                <a className={cx(s.btn, s.btnDark)} href="#kontakt">
                  Schauraum-Termin vereinbaren
                </a>
                <a className={cx(s.btn, s.btnOutline)} href={tel}>
                  Anrufen
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="therme" className={cx(s.section, s.dark)}>
          <div className={cx(s.wrap, s.split)} style={{alignItems: 'flex-start'}}>
            <div className={cx(s.thermeText, s.reveal)}>
              <span className={s.eyebrow}>Thermenservice</span>
              <h2 className={s.h2} style={{marginTop: 0}}>
                Wann ist Ihre Therme dran?
              </h2>
              <p>Ein Gasgerät sollte jährlich gewartet werden. Die gesetzliche Abgasmessung richtet sich nach der Leistung des Geräts.</p>
              {c.promo.value.trim() ? (
                <div className={s.promo}>
                  <span className={s.promoValue}>{c.promo.value}</span>
                  <span className={s.promoText}>{c.promo.text}</span>
                </div>
              ) : null}
              <div className={s.pills}>
                {c.boilerBrands.map((brand) => (
                  <span key={brand} className={s.pillDark}>
                    {brand}
                  </span>
                ))}
              </div>
            </div>
            <div className={s.intervals}>
              {[
                ['4 Jahre', 'Gasgeräte bis 26 kW', 'typische Kombitherme in der Wohnung'],
                ['2 Jahre', 'Gas 26–50 kW, Öl & Feststoff bis 50 kW', 'Einfamilienhaus, größere Anlagen'],
                ['jährlich', 'Alle Anlagen ab 50 kW', 'Mehrparteienhäuser, Gewerbe']
              ].map(([value, title, sub]) => (
                <div key={value} className={cx(s.interval, s.reveal)}>
                  <span className={s.intervalValue}>{value}</span>
                  <span>
                    <span className={s.intervalTitle}>{title}</span>
                    <span className={s.intervalSub}>{sub}</span>
                  </span>
                </div>
              ))}
              <a className={cx(s.btn, s.btnCopper)} href="#kontakt" style={{alignSelf: 'flex-start', marginTop: 10}}>
                Thermenservice anfragen
              </a>
            </div>
          </div>
        </section>

        <section id="ueber-uns" className={s.section}>
          <div className={s.wrap}>
            <div className={cx(s.reveal)} style={{marginBottom: 56, maxWidth: 760}}>
              <span className={s.eyebrow}>Über uns</span>
              <h2 className={s.h2}>75 Jahre. Vier Generationen. Ein Handwerk.</h2>
            </div>
            <ol className={s.timeline} style={{listStyle: 'none', padding: 0}}>
              {c.milestones.map((m, i) => (
                <li key={`${m.year}-${i}`} className={cx(s.milestone, s.reveal, i === c.milestones.length - 1 && s.milestoneLast)}>
                  <span className={s.milestoneDot} aria-hidden="true" />
                  <span className={s.milestoneYear}>{m.year}</span>
                  <span className={s.milestoneText}>{m.text}</span>
                </li>
              ))}
            </ol>
            <div className={s.team}>
              {c.team.map((person) => (
                <div key={person.name} className={cx(s.person, s.reveal)}>
                  <div className={s.portrait} aria-hidden="true">
                    {initials(person.name)}
                  </div>
                  <div className={s.personBody}>
                    <span className={s.personName}>{person.name}</span>
                    <span className={s.personRole}>{person.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" className={cx(s.section, s.white)}>
          <div className={cx(s.wrap, s.split)} style={{alignItems: 'flex-start'}}>
            <div className={cx(s.contactInfo, s.reveal)}>
              <span className={s.eyebrow}>Kontakt</span>
              <h2 className={s.h2} style={{marginTop: 0}}>
                Erzählen Sie uns, was zu tun ist.
              </h2>
              <a className={s.bigPhone} href={tel}>
                {c.contact.phone}
              </a>
              <div className={s.infoGrid}>
                <div>
                  <strong>Adresse &amp; Schauraum</strong>
                  <span>
                    {c.contact.address}
                    <br />
                    {c.contact.addressLine2}
                  </span>
                </div>
                <div>
                  <strong>Bürozeiten</strong>
                  <span>
                    Mo–Do {c.hours.monThu}
                    <br />
                    Fr {c.hours.fri}
                  </span>
                </div>
              </div>
              <a className={s.mapLink} href={mapsUrl} target="_blank" rel="noopener noreferrer">
                <span className={s.icon}>
                  <Svg size={26}>
                    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </Svg>
                </span>
                <span>
                  <strong style={{display: 'block'}}>Route planen</strong>
                  <span style={{fontSize: 15, color: '#4A5B66'}}>In Google Maps öffnen</span>
                </span>
              </a>
            </div>
            <form className={cx(s.form, s.reveal)} aria-describedby={preview ? 'form-note' : undefined}>
              {preview ? (
                <p id="form-note" className={s.formNote}>
                  Vorschau: Das Formular wird erst nach Freigabe durch den Betrieb aktiviert. Bitte rufen Sie bis dahin direkt an.
                </p>
              ) : null}
              <fieldset className={s.fieldset} disabled={preview}>
                <legend className={s.legend}>Worum geht es?</legend>
                <div className={s.topics}>
                  {['Bad', 'Heizung', 'Thermenservice', 'Reparatur', 'Sonstiges'].map((topic, i) => (
                    <label key={topic} className={s.topic}>
                      <input type="radio" name="topic" value={topic} defaultChecked={i === 0} />
                      {topic}
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className={s.fieldset} disabled={preview} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
                <div className={s.row}>
                  <label className={s.label}>
                    Name
                    <input className={s.input} type="text" name="name" autoComplete="name" />
                  </label>
                  <label className={s.label}>
                    Telefon
                    <input className={s.input} type="tel" name="phone" autoComplete="tel" />
                  </label>
                </div>
                <label className={s.label}>
                  Nachricht
                  <textarea className={s.input} name="message" rows={4} />
                </label>
                <button className={cx(s.btn, s.btnCopper)} type="submit" style={preview ? {opacity: 0.6, cursor: 'not-allowed'} : undefined}>
                  Anfrage senden
                </button>
              </fieldset>
            </form>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.wrap}>
          <div className={s.footerWord} aria-hidden="true">
            Wegscheider
          </div>
          <div className={s.footerCols}>
            <div>
              <span className={s.footerStrong}>Peter Wegscheider GmbH</span>
              <span>
                {c.contact.address}, {c.contact.addressLine2}
              </span>
              <span>Lehrbetrieb · Mitglied der 1a-Installateure</span>
            </div>
            <div>
              <a href={tel}>{c.contact.phone}</a>
              <a href={`mailto:${c.contact.email}`}>{c.contact.email}</a>
            </div>
            <div>
              {preview ? (
                <>
                  <span>Entwurf – keine offizielle Website.</span>
                  <a href="https://treetech.at/de/impressum">Impressum (TreeTech)</a>
                </>
              ) : (
                <>
                  <a href="https://weg-i.at/impressum/">Impressum</a>
                  <a href="https://weg-i.at/datenschutz/">Datenschutz</a>
                </>
              )}
            </div>
          </div>
        </div>
      </footer>

      <div className={s.callbar}>
        <a className={cx(s.btn, s.btnCopper)} href={tel}>
          <PhoneIcon /> Anrufen
        </a>
        <a className={cx(s.btn, s.btnOutline)} href="#kontakt">
          Anfrage
        </a>
      </div>
    </div>
  );
}
