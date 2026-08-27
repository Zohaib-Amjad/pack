const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Read .env.local
const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v) env[k.trim()] = v.join('=').trim();
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(5);

  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log('Total sample fetched:', data.length);
  if (data.length > 0) {
    console.log('Sample product columns:', Object.keys(data[0]));
    console.log('Sample product specs for:', data[0].slug);
    console.log({
      box_style: data[0].box_style,
      min_quantity: data[0].min_quantity,
      stock_info: data[0].stock_info,
      size_info: data[0].size_info,
      printing_options: data[0].printing_options,
      finishing_options: data[0].finishing_options,
      proof_info: data[0].proof_info,
      turnaround_time: data[0].turnaround_time,
      shipping_info: data[0].shipping_info,
      product_content: data[0].product_content,
    });
  }
}

run();
