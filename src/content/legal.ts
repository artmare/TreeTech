import {contactEmail, contactPhone} from '@/content/contact-links';

/**
 * Legal entity behind treetech.at. Source: GISA-Auszug of 28.10.2026 (GISA-Zahl 38120565).
 * Change these values here only; Impressum, Datenschutz and AGB read them from this file.
 */
export const legalEntity = {
  owner: 'Maksym Prostakov',
  brand: 'TreeTech',
  street: 'Moselgasse 27/1/10',
  postalCode: '1100',
  city: 'Wien',
  country: 'Österreich',
  email: contactEmail,
  phone: contactPhone.display,
  gewerbe: 'Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik (freies Gewerbe)',
  gisaNumber: '38120565',
  authority: 'Magistrat der Stadt Wien',
  chamber:
    'Mitglied der Wirtschaftskammer Wien, Fachgruppe Unternehmensberatung, Buchhaltung und Informationstechnologie (UBIT)',
  /** Only shown when set. Fill in the ATU number once known. */
  uid: '' as string,
  /** Set to true if the owner uses the Kleinunternehmerregelung (no VAT on invoices). */
  kleinunternehmer: null as boolean | null,
  /** Date shown as "Stand" on the legal pages. */
  updated: '28.10.2026'
};

export const legalAddress = `${legalEntity.street}, ${legalEntity.postalCode} ${legalEntity.city}, ${legalEntity.country}`;
