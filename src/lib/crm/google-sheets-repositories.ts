import 'server-only';

import {appendValues, readValues, updateValues} from '@/lib/google/sheets';

import type {ActivityRepository, CrmRepositories, LeadRepository, TaskRepository} from './repositories';
import {activitySchema, leadSchema, taskSchema} from './schema';
import type {Lead, LeadActivity, LeadTask, NewLead} from './types';

export const leadHeaders = ['id', 'createdAt', 'updatedAt', 'name', 'company', 'email', 'phone', 'language', 'source', 'sourceUrl', 'service', 'industry', 'location', 'status', 'priority', 'budget', 'value', 'message', 'aiSummary', 'nextAction', 'nextActionAt', 'lastContactAt', 'notes', 'driveFolderId', 'resendEmailId', 'archived'] as const;
export const activityHeaders = ['id', 'leadId', 'type', 'description', 'createdAt', 'createdBy'] as const;
export const taskHeaders = ['id', 'leadId', 'title', 'description', 'dueAt', 'status', 'createdAt', 'completedAt'] as const;

type Header = readonly string[];

class GoogleSheetsLeadRepository implements LeadRepository {
  async create(input: NewLead) {
    const now = new Date().toISOString();
    const lead = leadSchema.parse({...input, id: input.id || crypto.randomUUID(), createdAt: now, updatedAt: now});
    await ensureSchema('Leads', leadHeaders);
    await appendValues('Leads!A:Z', [serialize(lead, leadHeaders)]);
    return lead;
  }

  async update(id: string, changes: Partial<Lead>) {
    const rows = await readRows<Lead>('Leads', leadHeaders, parseLead);
    const target = rows.find((row) => row.value.id === id);
    if (!target) throw new Error('Lead not found.');
    const lead = leadSchema.parse({...target.value, ...changes, id, createdAt: target.value.createdAt, updatedAt: new Date().toISOString()});
    await updateValues(`Leads!A${target.rowNumber}:Z${target.rowNumber}`, [serialize(lead, leadHeaders)]);
    return lead;
  }

  async findById(id: string) {
    const leads = await this.findAll();
    return leads.find((lead) => lead.id === id) || null;
  }

  async findAll() {
    const rows = await readRows<Lead>('Leads', leadHeaders, parseLead);
    return rows.map((row) => row.value).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  archive(id: string, archived: boolean) {
    return this.update(id, {archived});
  }
}

class GoogleSheetsActivityRepository implements ActivityRepository {
  async create(input: Omit<LeadActivity, 'id' | 'createdAt'>) {
    const activity = activitySchema.parse({...input, id: crypto.randomUUID(), createdAt: new Date().toISOString()});
    await ensureSchema('Activities', activityHeaders);
    await appendValues('Activities!A:F', [serialize(activity, activityHeaders)]);
    return activity;
  }

  async findByLeadId(leadId: string) {
    const rows = await readRows<LeadActivity>('Activities', activityHeaders, parseActivity);
    return rows.map((row) => row.value).filter((activity) => activity.leadId === leadId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
}

class GoogleSheetsTaskRepository implements TaskRepository {
  async create(input: Omit<LeadTask, 'id' | 'createdAt' | 'completedAt'>) {
    const task = taskSchema.parse({...input, id: crypto.randomUUID(), createdAt: new Date().toISOString(), completedAt: ''});
    await ensureSchema('Tasks', taskHeaders);
    await appendValues('Tasks!A:H', [serialize(task, taskHeaders)]);
    return task;
  }

  async update(id: string, changes: Partial<LeadTask>) {
    const rows = await readRows<LeadTask>('Tasks', taskHeaders, parseTask);
    const target = rows.find((row) => row.value.id === id);
    if (!target) throw new Error('Task not found.');
    const task = taskSchema.parse({...target.value, ...changes, id, createdAt: target.value.createdAt});
    await updateValues(`Tasks!A${target.rowNumber}:H${target.rowNumber}`, [serialize(task, taskHeaders)]);
    return task;
  }

  async findByLeadId(leadId: string) {
    const tasks = await this.findAll();
    return tasks.filter((task) => task.leadId === leadId);
  }

  async findAll() {
    const rows = await readRows<LeadTask>('Tasks', taskHeaders, parseTask);
    return rows.map((row) => row.value).sort((a, b) => a.dueAt.localeCompare(b.dueAt));
  }
}

export function createGoogleSheetsRepositories(): CrmRepositories {
  return {leads: new GoogleSheetsLeadRepository(), activities: new GoogleSheetsActivityRepository(), tasks: new GoogleSheetsTaskRepository()};
}

async function ensureSchema(sheet: string, expected: Header) {
  const rows = await readValues(`${sheet}!1:1`);
  const actual = rows[0] || [];
  if (actual.length === 0) {
    await updateValues(`${sheet}!A1:${columnName(expected.length)}1`, [[...expected]]);
    return;
  }
  if (expected.some((header, index) => actual[index] !== header)) {
    throw new Error(`${sheet} worksheet schema does not match the expected CRM headers.`);
  }
}

async function readRows<T>(sheet: string, headers: Header, parser: (value: Record<string, string>) => T) {
  await ensureSchema(sheet, headers);
  const values = await readValues(`${sheet}!A2:${columnName(headers.length)}`);
  return values.flatMap((row, index) => {
    try {
      const record = Object.fromEntries(headers.map((header, cell) => [header, row[cell] || '']));
      return [{rowNumber: index + 2, value: parser(record)}];
    } catch (error) {
      console.error('crm_row_parse_failed', {sheet, rowNumber: index + 2, reason: error instanceof Error ? error.message : 'unknown'});
      return [];
    }
  });
}

function serialize(value: object, headers: Header) {
  const record = value as Record<string, unknown>;
  return headers.map((header) => {
    const cell = record[header];
    if (typeof cell === 'boolean') return cell ? 'TRUE' : 'FALSE';
    if (cell === null || cell === undefined) return '';
    return String(cell);
  });
}

function parseLead(row: Record<string, string>) {
  return leadSchema.parse({...row, value: row.value ? Number(row.value) : null, archived: row.archived.toUpperCase() === 'TRUE'});
}
function parseActivity(row: Record<string, string>) { return activitySchema.parse(row); }
function parseTask(row: Record<string, string>) { return taskSchema.parse(row); }
function columnName(count: number) {
  let result = '';
  let value = count;
  while (value > 0) { value -= 1; result = String.fromCharCode(65 + (value % 26)) + result; value = Math.floor(value / 26); }
  return result;
}

