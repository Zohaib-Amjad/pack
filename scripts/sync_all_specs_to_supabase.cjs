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

async function syncToSupabase() {
  console.log('Fetching all products from Supabase...');
  const { data: dbProducts, error } = await supabase
    .from('products')
    .select('id, name, slug, stock_info, size_info, min_quantity, printing_options, finishing_options, proof_info, turnaround_time, shipping_info, product_content');

  if (error) {
    console.error('Error fetching Supabase products:', error);
    return;
  }

  console.log(`Starting sync for ${dbProducts.length} products to Supabase...`);

  let updatedCount = 0;
  let errorCount = 0;

  for (const p of dbProducts) {
    const spec = specData.products[p.slug] || specData.defaultTemplate;
    const existingContent = p.product_content && typeof p.product_content === 'object' ? p.product_content : {};

    const updatedProductContent = {
      ...existingContent,
      spec_overrides: spec.specOverrides || existingContent.spec_overrides || specData.defaultTemplate.specOverrides,
    };

    const updatePayload = {
      stock_info: spec.stockInfo || p.stock_info || specData.defaultTemplate.stockInfo,
      size_info: spec.sizeInfo || p.size_info || specData.defaultTemplate.sizeInfo,
      min_quantity: spec.minQuantity || p.min_quantity || specData.defaultTemplate.minQuantity,
      printing_options: spec.printingOptions || p.printing_options || specData.defaultTemplate.printingOptions,
      finishing_options: spec.finishingOptions || p.finishing_options || specData.defaultTemplate.finishingOptions,
      proof_info: spec.proofInfo || p.proof_info || specData.defaultTemplate.proofInfo,
      turnaround_time: spec.turnaroundTime || p.turnaround_time || specData.defaultTemplate.turnaroundTime,
      shipping_info: p.shipping_info || "FREE Shipping Worldwide",
      product_content: updatedProductContent,
    };

    const { error: updateError } = await supabase
      .from('products')
      .update(updatePayload)
      .eq('id', p.id);

    if (updateError) {
      console.error(`Error updating product ${p.slug}:`, updateError.message);
      errorCount++;
    } else {
      updatedCount++;
      if (updatedCount % 25 === 0 || updatedCount === dbProducts.length) {
        console.log(`Synced ${updatedCount}/${dbProducts.length} products to Supabase...`);
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`Sync completed successfully!`);
  console.log(`Total updated: ${updatedCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`========================================`);
}

syncToSupabase();
