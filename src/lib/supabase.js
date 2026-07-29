import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Guarantees createClient always receives a valid https:// URL during builds
const safeUrl = (rawUrl && rawUrl.startsWith('http')) 
  ? rawUrl 
  : 'https://dlgbxouabrficthkmlnd.supabase.co';

const safeKey = rawKey || 'sb_publishable_sh8i1DD2mS1EWqwRtICzIQ_apD31eCR';

export const supabase = createClient(safeUrl, safeKey);