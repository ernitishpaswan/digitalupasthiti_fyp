require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function test() {
  console.log('URL:', process.env.SUPABASE_URL);
  console.log('BUCKET:', process.env.SUPABASE_BUCKET);
  console.log('KEY starts with:', process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20));

  const { data, error } = await supabase.storage.listBuckets();
  if (error) {
    console.error('❌ Error:', error.message);
  } else {
    console.log('✅ Buckets found:', data.map(b => b.name));
  }
}

test();