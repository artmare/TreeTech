export const leadStatuses = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'] as const;
export const leadPriorities = ['low', 'medium', 'high'] as const;
export const leadSources = ['website_form', 'assistant', 'free_analysis', 'outbound', 'referral', 'email', 'manual', 'other'] as const;
export const serviceTypes = ['website', 'automation', 'custom_software', 'integration', 'unsure'] as const;
export const activityTypes = ['lead_created', 'status_changed', 'note_added', 'email_sent', 'contacted', 'task_created', 'task_completed', 'ai_qualification', 'document_added'] as const;
export const taskStatuses = ['open', 'completed'] as const;

export type LeadStatus = (typeof leadStatuses)[number];
export type LeadPriority = (typeof leadPriorities)[number];
export type LeadSource = (typeof leadSources)[number];
export type ServiceType = (typeof serviceTypes)[number];
export type ActivityType = (typeof activityTypes)[number];
export type TaskStatus = (typeof taskStatuses)[number];

export type Lead = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  language: 'de' | 'en' | 'ru';
  source: LeadSource;
  sourceUrl: string;
  service: ServiceType;
  industry: string;
  location: string;
  status: LeadStatus;
  priority: LeadPriority;
  budget: string;
  value: number | null;
  message: string;
  aiSummary: string;
  nextAction: string;
  nextActionAt: string;
  lastContactAt: string;
  notes: string;
  driveFolderId: string;
  resendEmailId: string;
  archived: boolean;
};

export type LeadActivity = {
  id: string;
  leadId: string;
  type: ActivityType;
  description: string;
  createdAt: string;
  createdBy: string;
};

export type LeadTask = {
  id: string;
  leadId: string;
  title: string;
  description: string;
  dueAt: string;
  status: TaskStatus;
  createdAt: string;
  completedAt: string;
};

export type NewLead = Omit<Lead, 'id' | 'createdAt' | 'updatedAt'> & {id?: string};

