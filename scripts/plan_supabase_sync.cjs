const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v) env[k.trim()] = v.join('=').trim();
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

const specData = JSON.parse(fs.readFileSync('D:\\hof-pack\\exports\\product-spec-table-fields.json', 'utf8'));

async function inspectAndPlan() {
  const { data: dbProducts, error } = await supabase
    .from('products')
    .select('id, name, slug, stock_info, size_info, min_quantity, printing_options, finishing_options, proof_info, turnaround_time, shipping_info, product_content');

  if (error) {
    console.error('Supabase query error:', error);
    return;
  }

  console.log(`Found ${dbProducts.length} products in Supabase.`);
  console.log(`Found ${Object.keys(specData.products).length} products in spec fields export.`);

  let matchCount = 0;
  for (const p of dbProducts) {
    if (specData.products[p.slug]) {
      matchCount++;
    }
  }

  console.log(`Matched products: ${matchCount} / ${dbProducts.length}`);
}

inspectAndPlan();
