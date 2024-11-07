const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SERVER_SUPABASE_URL;
const supabaseKey = process.env.SERVER_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
