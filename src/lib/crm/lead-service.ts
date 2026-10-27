import 'server-only';

import type {ContactFormValues} from '@/lib/contact';

import {getCrmRepositories} from './factory';
import type {LeadSource, ServiceType} from './types';

export class LeadStorageError extends Error {
  constructor(message: string) { super(message); this.name = 'LeadStorageError'; }
}

export async function createLeadFromContact(data: ContactFormValues, request: Request) {
  const repositories = getCrmRepositories();
  const source: LeadSource = data.metadata?.source || 'website_form';
  const service = mapService(data.budget);
  const locale = data.metadata?.locale || localeFromReferer(request);
  const transcript = data.metadata?.transcript?.map((message) => `${message.role}: ${message.content}`).join('\n') || '';
  const qualification = data.metadata?.qualification;

  try {
    const lead = await repositories.leads.create({
      name: data.name,
      company: data.company || '',
      email: data.email,
      phone: '',
      language: locale,
      source,
      sourceUrl: (request.headers.get('referer') || '').slice(0, 500),
      service,
      industry: qualification?.businessType || '',
      location: '',
      status: 'new',
      priority: 'medium',
      budget: data.budget,
      value: null,
      message: data.message,
      aiSummary: qualification ? [qualification.businessType, qualification.projectType, qualification.urgency].filter(Boolean).join(' · ') : '',
      nextAction: '',
      nextActionAt: '',
      lastContactAt: '',
      notes: transcript,
      driveFolderId: '',
      resendEmailId: '',
      archived: false
    });

    repositories.activities.create({leadId: lead.id, type: 'lead_created', description: `Lead created from ${source}.`, createdBy: 'system'}).catch((error) => console.error('crm_activity_create_failed', {leadId: lead.id, reason: safeReason(error)}));
    return lead;
  } catch (error) {
    console.error('lead_create_failed', {source, reason: safeReason(error)});
    throw new LeadStorageError('Lead could not be saved.');
  }
}

export async function markLeadEmailSent(id: string, resendEmailId: string) {
  const repositories = getCrmRepositories();
  await repositories.leads.update(id, {resendEmailId});
  await repositories.activities.create({leadId: id, type: 'email_sent', description: 'Notification email sent.', createdBy: 'system'});
}

function mapService(value: string): ServiceType {
  if (value === 'web') return 'website';
  if (value === 'app') return 'custom_software';
  if (value === 'integration') return 'integration';
  if (value === 'automation' || value === 'workflow') return 'automation';
  return 'unsure';
}

function localeFromReferer(request: Request): 'de' | 'en' | 'ru' {
  const referer = request.headers.get('referer') || '';
  if (referer.includes('/en')) return 'en';
  if (referer.includes('/ru')) return 'ru';
  return 'de';
}

function safeReason(error: unknown) { return error instanceof Error ? error.message.slice(0, 300) : 'unknown'; }
