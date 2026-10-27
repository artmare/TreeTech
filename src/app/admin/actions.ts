'use server';

import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

import {createAdminSession, destroyAdminSession, isAdminAuthenticated, verifyAdminCredentials} from '@/lib/admin-auth';
import {getCrmRepositories} from '@/lib/crm/factory';
import {leadPriorities, leadSources, leadStatuses, serviceTypes} from '@/lib/crm/types';
import {createLeadDriveFolder} from '@/lib/google/drive';

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  if (!verifyAdminCredentials(email, password)) redirect('/admin/login?error=credentials');
  await createAdminSession();
  redirect('/admin');
}

export async function logoutAction() { await destroyAdminSession(); redirect('/admin/login'); }

export async function createLeadAction(formData: FormData) {
  await requireAdmin();
  const repositories = getCrmRepositories();
  const source = pick(String(formData.get('source') || ''), leadSources, 'manual');
  const service = pick(String(formData.get('service') || ''), serviceTypes, 'unsure');
  const lead = await repositories.leads.create({
    name: required(formData, 'name', 120), company: optional(formData, 'company', 160), email: required(formData, 'email', 160), phone: optional(formData, 'phone', 80),
    language: 'de', source, sourceUrl: '', service, industry: optional(formData, 'industry', 160), location: optional(formData, 'location', 160), status: 'new', priority: 'medium',
    budget: optional(formData, 'budget', 120), value: numberOrNull(formData.get('value')), message: required(formData, 'message', 10000), aiSummary: '', nextAction: optional(formData, 'nextAction', 500),
    nextActionAt: optional(formData, 'nextActionAt', 80), lastContactAt: '', notes: optional(formData, 'notes', 5000), driveFolderId: '', resendEmailId: '', archived: false
  });
  await repositories.activities.create({leadId: lead.id, type: 'lead_created', description: 'Lead manually created.', createdBy: 'admin'});
  revalidateCrm();
  redirect(`/admin/leads/${lead.id}`);
}

export async function updateLeadAction(formData: FormData) {
  await requireAdmin();
  const id = required(formData, 'id', 80);
  const repositories = getCrmRepositories();
  const existing = await repositories.leads.findById(id);
  if (!existing) throw new Error('Lead not found.');
  const status = pick(String(formData.get('status') || ''), leadStatuses, existing.status);
  const priority = pick(String(formData.get('priority') || ''), leadPriorities, existing.priority);
  await repositories.leads.update(id, {
    status, priority, nextAction: optional(formData, 'nextAction', 500), nextActionAt: optional(formData, 'nextActionAt', 80),
    value: numberOrNull(formData.get('value')), lastContactAt: status === 'contacted' && !existing.lastContactAt ? new Date().toISOString() : existing.lastContactAt
  });
  if (status !== existing.status) await repositories.activities.create({leadId: id, type: 'status_changed', description: `Status changed from ${existing.status} to ${status}.`, createdBy: 'admin'});
  revalidateCrm(id);
}

export async function addNoteAction(formData: FormData) {
  await requireAdmin();
  const id = required(formData, 'id', 80); const note = required(formData, 'note', 2000);
  const repositories = getCrmRepositories();
  await repositories.activities.create({leadId: id, type: 'note_added', description: note, createdBy: 'admin'});
  revalidateCrm(id);
}

export async function createTaskAction(formData: FormData) {
  await requireAdmin();
  const leadId = required(formData, 'leadId', 80); const repositories = getCrmRepositories();
  await repositories.tasks.create({leadId, title: required(formData, 'title', 240), description: optional(formData, 'description', 2000), dueAt: optional(formData, 'dueAt', 80), status: 'open'});
  await repositories.activities.create({leadId, type: 'task_created', description: `Task created: ${required(formData, 'title', 240)}`, createdBy: 'admin'});
  revalidateCrm(leadId);
}

export async function toggleTaskAction(formData: FormData) {
  await requireAdmin();
  const id = required(formData, 'id', 80); const leadId = required(formData, 'leadId', 80); const complete = String(formData.get('complete')) === 'true';
  const repositories = getCrmRepositories();
  await repositories.tasks.update(id, {status: complete ? 'completed' : 'open', completedAt: complete ? new Date().toISOString() : ''});
  if (complete) await repositories.activities.create({leadId, type: 'task_completed', description: 'Task completed.', createdBy: 'admin'});
  revalidateCrm(leadId);
}

export async function archiveLeadAction(formData: FormData) {
  await requireAdmin(); const id = required(formData, 'id', 80); const archived = String(formData.get('archived')) === 'true';
  await getCrmRepositories().leads.archive(id, archived); revalidateCrm(id);
  redirect(archived ? '/admin/leads' : `/admin/leads/${id}`);
}

export async function createDriveFolderAction(formData: FormData) {
  await requireAdmin(); const id = required(formData, 'id', 80); const repositories = getCrmRepositories();
  const lead = await repositories.leads.findById(id); if (!lead) throw new Error('Lead not found.');
  if (!lead.driveFolderId) {
    const folder = await createLeadDriveFolder(`${lead.company || lead.name} — ${lead.id.slice(0, 8)}`);
    await repositories.leads.update(id, {driveFolderId: folder.id});
    await repositories.activities.create({leadId: id, type: 'document_added', description: 'Google Drive folder created.', createdBy: 'admin'});
  }
  revalidateCrm(id);
}

async function requireAdmin() { if (!(await isAdminAuthenticated())) redirect('/admin/login'); }
function required(data: FormData, key: string, max: number) { const value = String(data.get(key) || '').trim(); if (!value || value.length > max) throw new Error(`Invalid ${key}.`); return value; }
function optional(data: FormData, key: string, max: number) { return String(data.get(key) || '').trim().slice(0, max); }
function numberOrNull(value: FormDataEntryValue | null) { const parsed = Number(String(value || '')); return Number.isFinite(parsed) && parsed >= 0 && String(value || '').trim() ? parsed : null; }
function pick<T extends readonly string[]>(value: string, values: T, fallback: T[number]): T[number] { return values.includes(value as T[number]) ? value as T[number] : fallback; }
function revalidateCrm(id?: string) { revalidatePath('/admin'); revalidatePath('/admin/leads'); revalidatePath('/admin/pipeline'); revalidatePath('/admin/tasks'); revalidatePath('/admin/archive'); if (id) revalidatePath(`/admin/leads/${id}`); }

