'use server';

import {revalidatePath, updateTag} from 'next/cache';
import {redirect} from 'next/navigation';

import type {WegiContent, WegiMilestone, WegiService, WegiTeamMember} from '@/content/client-sites/weg-i';
import {isAdminAuthenticated} from '@/lib/admin-auth';
import {clientSiteCacheTag, getClientSiteContent, isClientSiteSlug, saveClientSiteContent} from '@/lib/client-sites/store';

export async function saveClientSiteAction(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect('/admin/login');
  const slug = String(formData.get('slug') || '');
  if (!isClientSiteSlug(slug)) throw new Error('Unbekannte Website.');

  const {content: current} = await getClientSiteContent(slug);
  const phone = text(formData, 'phone', 40) || current.contact.phone;

  const services: WegiService[] = current.services.map((service, i) => ({
    id: service.id,
    title: text(formData, `service_title_${i}`, 60) || service.title,
    text: text(formData, `service_text_${i}`, 240),
    visible: formData.get(`service_visible_${i}`) === 'on'
  }));

  const next: WegiContent = {
    ...current,
    banner: {
      enabled: formData.get('banner_enabled') === 'on',
      text: text(formData, 'banner_text', 160),
      from: date(formData, 'banner_from'),
      until: date(formData, 'banner_until')
    },
    contact: {
      phone,
      phoneHref: toPhoneHref(phone),
      email: text(formData, 'email', 120) || current.contact.email,
      address: text(formData, 'address', 120) || current.contact.address,
      addressLine2: text(formData, 'address2', 80) || current.contact.addressLine2
    },
    hours: {monThu: text(formData, 'hours_monThu', 60), fri: text(formData, 'hours_fri', 60)},
    hero: {eyebrow: text(formData, 'hero_eyebrow', 90), lead: text(formData, 'hero_lead', 320)},
    promo: {value: text(formData, 'promo_value', 16), text: text(formData, 'promo_text', 120)},
    consultationFee: text(formData, 'consultationFee', 20),
    services,
    references: lines(formData, 'references', 60, 80),
    bathBrands: list(formData, 'bathBrands', 30, 20),
    boilerBrands: list(formData, 'boilerBrands', 30, 20),
    milestones: pairs(formData, 'milestones', 16).map(([year, value]): WegiMilestone => ({year: year.slice(0, 12), text: value.slice(0, 140)})),
    team: pairs(formData, 'team', 12).map(([name, role]): WegiTeamMember => ({name: name.slice(0, 60), role: role.slice(0, 80)}))
  };

  try {
    await saveClientSiteContent(slug, next);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Speichern fehlgeschlagen.';
    redirect(`/admin/sites/${slug}?error=${encodeURIComponent(message.slice(0, 200))}`);
  }

  updateTag(clientSiteCacheTag(slug));
  revalidatePath(`/sites/${slug}`);
  revalidatePath(`/admin/sites/${slug}`);
  redirect(`/admin/sites/${slug}?saved=1&tab=${encodeURIComponent(String(formData.get('tab') || 'allgemein').slice(0, 20))}`);
}

function text(formData: FormData, key: string, max: number) {
  return String(formData.get(key) ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .trim()
    .slice(0, max);
}

function date(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? '').trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : '';
}

function lines(formData: FormData, key: string, maxItems: number, maxLength: number) {
  return String(formData.get(key) ?? '')
    .split(/\r?\n/)
    .map((line) => line.trim().slice(0, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function list(formData: FormData, key: string, maxItems: number, maxLength: number) {
  return String(formData.get(key) ?? '')
    .split(/[,\n]/)
    .map((item) => item.trim().slice(0, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

/** "left | right" per line. */
function pairs(formData: FormData, key: string, maxItems: number) {
  return lines(formData, key, maxItems, 240)
    .map((line) => {
      const [left, ...rest] = line.split('|');
      return [left.trim(), rest.join('|').trim()] as [string, string];
    })
    .filter(([left]) => left);
}

/** "01 786 22 11" → "+4317862211" for tel: links (Austrian numbers). */
function toPhoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) return digits;
  if (digits.startsWith('00')) return `+${digits.slice(2)}`;
  if (digits.startsWith('0')) return `+43${digits.slice(1)}`;
  return digits;
}
