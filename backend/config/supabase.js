// Supabase setup - file upload ke liye 
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl  = process.env.SUPABASE_URL;
const supabaseKey  = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service role key — backend only

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ SUPABASE_URL aur SUPABASE_SERVICE_ROLE_KEY .env mein set karo!');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Supabase dashboard mein yahi bucket naam se ek public bucket banao
const BUCKET = process.env.SUPABASE_BUCKET || 'digitalupasthiti-files';

module.exports = { supabase, BUCKET };
