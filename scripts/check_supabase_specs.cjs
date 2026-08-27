const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v) env[k.trim()] = v.join('=').trim();
});

const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['SUPABASE_SERVICE_ROLE_KEY']);

async function check() {
  const { data: supaProducts } = await supabase.from('products').select('*');
  console.log('Total live Supabase products:', supaProducts.length);

  const sample = supaProducts.slice(0, 5);
  for (const p of sample) {
    console.log(`\nProduct: ${p.name} (${p.slug})`);
    console.log({
      box_style: p.box_style,
      size_info: p.size_info,
      min_quantity: p.min_quantity,
      stock_info: p.stock_info,
      printing_options: p.printing_options,
      finishing_options: p.finishing_options,
      proof_info: p.proof_info,
      turnaround_time: p.turnaround_time,
      shipping_info: p.shipping_info,
    });
  }
}

check();
