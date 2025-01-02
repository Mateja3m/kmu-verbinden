import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rcybxtesntjdocegehwy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjeWJ4dGVzbnRqZG9jZWdlaHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4MzAyNjgsImV4cCI6MjA1MTQwNjI2OH0.RmsG7qb93dhG_YWD-SWacaA33GPJBfPAcGLF7q8pmno";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);