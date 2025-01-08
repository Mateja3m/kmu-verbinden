import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rcybxtesntjdocegehwy.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: localStorage,
    autoRefreshToken: true,
    flowType: 'pkce',
  },
});