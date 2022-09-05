import { createClient } from '@supabase/supabase-js';

export interface User {
  id: string;
  username: string;
  pfp: string;
  last_posted: null | string;
  streak: number;
  strikes: number;
  notification_token: null | string;
}


if (!process.env.SUPABASE_URL) throw new Error('Missing env-var: "SUPABASE_URL"');
if (!process.env.SUPABASE_ADMIN_KEY) throw new Error('Missing env-var: "SUPABASE_ADMIN_KEY"');

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAdminKey = process.env.SUPABASE_ADMIN_KEY!;

const supabase = createClient(supabaseUrl, supabaseAdminKey);

export default supabase;

export const tables = {
  users: () => supabase.from<User>('Users')
}
