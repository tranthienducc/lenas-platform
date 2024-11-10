import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SERVER_SUPABASE_URL;
const supabaseKey = process.env.SERVER_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
