import { createClient } from '@supabase/supabase-js';

export type LeadInsert = {
  name: string;
  email: string;
  project_type: string;
  budget: string;
  message: string;
  source: string;
  user_agent?: string;
  referrer?: string;
};

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
