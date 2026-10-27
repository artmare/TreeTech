import type {Lead, LeadActivity, LeadTask, NewLead} from './types';

export interface LeadRepository {
  create(input: NewLead): Promise<Lead>;
  update(id: string, changes: Partial<Lead>): Promise<Lead>;
  findById(id: string): Promise<Lead | null>;
  findAll(): Promise<Lead[]>;
  archive(id: string, archived: boolean): Promise<Lead>;
}

export interface ActivityRepository {
  create(input: Omit<LeadActivity, 'id' | 'createdAt'>): Promise<LeadActivity>;
  findByLeadId(leadId: string): Promise<LeadActivity[]>;
}

export interface TaskRepository {
  create(input: Omit<LeadTask, 'id' | 'createdAt' | 'completedAt'>): Promise<LeadTask>;
  update(id: string, changes: Partial<LeadTask>): Promise<LeadTask>;
  findByLeadId(leadId: string): Promise<LeadTask[]>;
  findAll(): Promise<LeadTask[]>;
}

export type CrmRepositories = {
  leads: LeadRepository;
  activities: ActivityRepository;
  tasks: TaskRepository;
};

