import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dlgbxouabrficthkmlnd.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_sh8i1DD2mS1EWqwRtICzIQ_apD31eCR';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);