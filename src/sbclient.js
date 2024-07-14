import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://kdalqzjpuknvgsfcgcce.supabase.co';
const supabaseKey = process.env.REACT_APP_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);