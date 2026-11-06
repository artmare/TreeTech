// Default content for the redesign preview of Peter Wegscheider GmbH (weg-i.at).
// Facts are taken from weg-i.at (as of 11/2026). Everything here can be overridden in the admin
// (/admin/sites/weg-i); saved changes are stored in Google Sheets, these values are the fallback.

export type WegiService = {id: string; title: string; text: string; visible: boolean};
export type WegiTeamMember = {name: string; role: string};
export type WegiMilestone = {year: string; text: string};

export type WegiContent = {
  banner: {enabled: boolean; text: string; from: string; until: string};
  contact: {phone: string; phoneHref: string; email: string; address: string; addressLine2: string};
  hours: {monThu: string; fri: string};
  hero: {eyebrow: string; lead: string};
  services: WegiService[];
  references: string[];
  promo: {value: string; text: string};
  consultationFee: string;
  bathBrands: string[];
  boilerBrands: string[];
  milestones: WegiMilestone[];
  team: WegiTeamMember[];
  updatedAt: string;
};

export const wegiDefaults: WegiContent = {
  banner: {enabled: false, text: 'Betriebsurlaub 23.12.–6.1. – in dringenden Fällen: 01 786 22 11', from: '', until: ''},
  contact: {
    phone: '01 786 22 11',
    phoneHref: '+4317862211',
    email: 'office@weg-i.at',
    address: 'Ameisgasse 47, 1. Stock',
    addressLine2: '1140 Wien'
  },
  hours: {monThu: '8–12 & 14–16 Uhr', fri: '8–12 Uhr'},
  hero: {
    eyebrow: 'Familienbetrieb in 4. Generation · Wien-Penzing',
    lead: 'Seit 1951 planen, installieren und warten wir Bad, Gas und Heizung in Wien – heute geführt von Installateurmeister Mark Wegscheider.'
  },
  services: [
    {id: 'bad', title: 'Bad & Sanitär', text: 'Badrenovierung, barrierefreie Duschen, Dusch-WC – und Duschtausch ohne Fliesenarbeiten.', visible: true},
    {id: 'heizung', title: 'Heizung & Wärmepumpe', text: 'Brennwert-Tausch, Fußbodenheizung, Wärmepumpen, Solar und Photovoltaik – mit kostenloser Erstberatung.', visible: true},
    {id: 'gas', title: 'Gas & Thermenservice', text: 'Service für fast alle Gasgeräte, Abgasmessung, Befunde und Gasleitungs-Sanierung ohne Stemmen.', visible: true},
    {id: 'klima', title: 'Klimaanlagen', text: 'Mono-Split- und Split-Geräte: Beratung, Errichtung und Wartung auf Anfrage.', visible: true},
    {id: 'wasser', title: 'Wasser & Garten', text: 'Entkalkung, Wasseraufbereitung, Gartenbewässerung, Schwimmbadtechnik und Winterfestmachen.', visible: true},
    {id: 'reparatur', title: 'Rohrbruch & Reparatur', text: 'Verstopfung, Rohrbruch, tropfende Armatur? Rufen Sie an – wir kommen schnell.', visible: true}
  ],
  references: [
    'Schloss Schönbrunn',
    'Wiener Wohnen',
    'MA 34 – Schulen & Kindergärten',
    'Rehaklinik Wien Baumgarten',
    'Marionettentheater Schönbrunn',
    'Generali Immobilien',
    'Bäckerei Felber',
    'ENGIE Gebäudetechnik',
    'Schönbrunner Bad',
    'Hotel Matauschek'
  ],
  promo: {value: '−30 %', text: 'auf die Abgasmessung bei gleichzeitigem Geräteservice'},
  consultationFee: '150 €',
  bathBrands: ['Geberit', 'Hansgrohe', 'Grohe', 'Artweger', 'Dansani', 'Damixa'],
  boilerBrands: ['Vaillant', 'Junkers', 'Saunier Duval', 'Baxi / Ozean', 'Viessmann', 'Wolf', 'Ferroli', 'Löblich'],
  milestones: [
    {year: '1951', text: 'KommR Josef Böhm gründet den Betrieb.'},
    {year: '1958', text: 'Renate Böhm wird Gas- und Wasserinstallateurin.'},
    {year: '1983', text: 'Alois Wegscheider übernimmt.'},
    {year: '1996', text: 'Peter Wegscheider führt den Betrieb.'},
    {year: '2018', text: 'Neuer Standort mit Schauraum: Ameisgasse 47.'},
    {year: '2024', text: 'Mark Wegscheider legt die Meisterprüfung ab.'},
    {year: '2025', text: 'Mark übernimmt die Geschäftsführung – 4. Generation.'}
  ],
  team: [
    {name: 'Mark Wegscheider', role: 'Installateurmeister · Geschäftsführer'},
    {name: 'Melanie Wegscheider', role: '4. Generation'},
    {name: 'Peter Wegscheider', role: '3. Generation · Beratung'}
  ],
  updatedAt: ''
};
