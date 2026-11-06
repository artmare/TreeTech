import 'server-only';

import {unstable_cache} from 'next/cache';

import {wegiDefaults, type WegiContent} from '@/content/client-sites/weg-i';
import {getGoogleConnectionStatus} from '@/lib/google/auth';
import {appendValues, ensureSheet, readValues, updateValues} from '@/lib/google/sheets';

// Content of client websites is stored as one JSON document per site in the CRM spreadsheet,
// tab "ClientSites" (A: slug, B: JSON, C: updated at). Without Google credentials, or when a site
// has never been saved, the defaults from src/content/client-sites are used.

const SHEET = 'ClientSites';
const HEADER = ['slug', 'content_json', 'updated_at'];

export const clientSites = {
  'weg-i': {name: 'Peter Wegscheider GmbH', host: 'weg-i.treetech.at', defaults: wegiDefaults}
} as const;

export type ClientSiteSlug = keyof typeof clientSites;

export function isClientSiteSlug(value: string): value is ClientSiteSlug {
  return Object.prototype.hasOwnProperty.call(clientSites, value);
}

export function isClientSiteStorageConfigured() {
  const status = getGoogleConnectionStatus();
  return status.serviceAccount && status.spreadsheet;
}

export async function getClientSiteContent(slug: ClientSiteSlug): Promise<{content: WegiContent; source: 'saved' | 'defaults' | 'error'}> {
  const defaults = clientSites[slug].defaults;
  if (!isClientSiteStorageConfigured()) return {content: defaults, source: 'defaults'};
  try {
    const rows = await readValues(`${SHEET}!A2:C`);
    const row = rows.find((r) => r[0] === slug);
    if (!row?.[1]) return {content: defaults, source: 'defaults'};
    const saved = JSON.parse(row[1]) as Partial<WegiContent>;
    return {content: mergeContent(defaults, saved), source: 'saved'};
  } catch (error) {
    // Missing tab or Google outage: never take the public site down, fall back to defaults.
    console.error(`[client-sites] could not load ${slug}:`, error instanceof Error ? error.message : error);
    return {content: defaults, source: 'error'};
  }
}

export function clientSiteCacheTag(slug: ClientSiteSlug) {
  return `client-site:${slug}`;
}

/** Cached read for the public site: one Sheets call per 10 minutes, purged on save via updateTag. */
export function getCachedClientSiteContent(slug: ClientSiteSlug) {
  return unstable_cache(() => getClientSiteContent(slug), ['client-site', slug], {
    tags: [clientSiteCacheTag(slug)],
    revalidate: 600
  })();
}

export async function saveClientSiteContent(slug: ClientSiteSlug, content: WegiContent) {
  if (!isClientSiteStorageConfigured()) throw new Error('Google Sheets ist nicht konfiguriert – Speichern nicht möglich.');
  await ensureSheet(SHEET, HEADER);
  const updatedAt = new Date().toISOString();
  const json = JSON.stringify({...content, updatedAt});
  if (json.length > 45000) throw new Error('Inhalt zu groß für eine Tabellenzelle.');
  const rows = await readValues(`${SHEET}!A2:A`);
  const index = rows.findIndex((r) => r[0] === slug);
  if (index >= 0) await updateValues(`${SHEET}!A${index + 2}:C${index + 2}`, [[slug, json, updatedAt]]);
  else await appendValues(`${SHEET}!A:C`, [[slug, json, updatedAt]]);
  return updatedAt;
}

function mergeContent(defaults: WegiContent, saved: Partial<WegiContent>): WegiContent {
  return {
    ...defaults,
    ...saved,
    banner: {...defaults.banner, ...saved.banner},
    contact: {...defaults.contact, ...saved.contact},
    hours: {...defaults.hours, ...saved.hours},
    hero: {...defaults.hero, ...saved.hero},
    promo: {...defaults.promo, ...saved.promo},
    services: Array.isArray(saved.services) ? saved.services : defaults.services,
    references: Array.isArray(saved.references) ? saved.references : defaults.references,
    bathBrands: Array.isArray(saved.bathBrands) ? saved.bathBrands : defaults.bathBrands,
    boilerBrands: Array.isArray(saved.boilerBrands) ? saved.boilerBrands : defaults.boilerBrands,
    milestones: Array.isArray(saved.milestones) ? saved.milestones : defaults.milestones,
    team: Array.isArray(saved.team) ? saved.team : defaults.team
  };
}

/** Banner shows when enabled and today (Vienna) lies within the optional from/until dates. */
export function isBannerActive(banner: WegiContent['banner'], now = new Date()) {
  if (!banner.enabled || !banner.text.trim()) return false;
  const today = new Intl.DateTimeFormat('en-CA', {timeZone: 'Europe/Vienna'}).format(now);
  if (banner.from && today < banner.from) return false;
  if (banner.until && today > banner.until) return false;
  return true;
}
