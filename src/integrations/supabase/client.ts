import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rcybxtesntjdocegehwy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjeWJ4dGVzbnRqZG9jZWdlaHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ0NzMzODcsImV4cCI6MjAyMDA0OTM4N30.GqLcvWHrHwbQCGWqE9oQqFGZUQXGBqE0sL0FiHn8G98';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);