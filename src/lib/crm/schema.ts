import {z} from 'zod';

import {activityTypes, leadPriorities, leadSources, leadStatuses, serviceTypes, taskStatuses} from './types';

const optionalText = z.string().trim().max(5000).default('');

export const leadSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).default(''),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(80).default(''),
  language: z.enum(['de', 'en', 'ru']).default('de'),
  source: z.enum(leadSources),
  sourceUrl: z.string().trim().max(500).default(''),
  service: z.enum(serviceTypes),
  industry: z.string().trim().max(160).default(''),
  location: z.string().trim().max(160).default(''),
  status: z.enum(leadStatuses),
  priority: z.enum(leadPriorities),
  budget: z.string().trim().max(120).default(''),
  value: z.number().nonnegative().nullable().default(null),
  message: z.string().trim().min(1).max(10000),
  aiSummary: optionalText,
  nextAction: z.string().trim().max(500).default(''),
  nextActionAt: z.string().default(''),
  lastContactAt: z.string().default(''),
  notes: optionalText,
  driveFolderId: z.string().trim().max(200).default(''),
  resendEmailId: z.string().trim().max(200).default(''),
  archived: z.boolean().default(false)
});

export const activitySchema = z.object({
  id: z.string().uuid(),
  leadId: z.string().uuid(),
  type: z.enum(activityTypes),
  description: z.string().trim().min(1).max(2000),
  createdAt: z.string(),
  createdBy: z.string().trim().max(120).default('system')
});

export const taskSchema = z.object({
  id: z.string().uuid(),
  leadId: z.string().uuid(),
  title: z.string().trim().min(1).max(240),
  description: z.string().trim().max(2000).default(''),
  dueAt: z.string().default(''),
  status: z.enum(taskStatuses).default('open'),
  createdAt: z.string(),
  completedAt: z.string().default('')
});

