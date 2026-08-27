const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v) env[k.trim()] = v.join('=').trim();
});

const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['SUPABASE_SERVICE_ROLE_KEY']);

async function updateLocalDB() {
  console.log('Fetching updated records from Supabase...');
  const { data: dbProducts } = await supabase.from('products').select(`
    id, name, slug, description, detail_description, images, is_active,
    box_style, min_quantity, stock_info, size_info, printing_options,
    finishing_options, proof_info, turnaround_time, shipping_info,
    meta_title, meta_description, meta_keywords, product_content,
    categories ( id, name, slug )
  `);

  console.log(`Fetched ${dbProducts.length} updated products from Supabase.`);

  const csvPath = 'D:\\hof-pack\\product-tags.csv';
  const lines = fs.readFileSync(csvPath, 'utf8').split('\n');
  const tagsMap = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('Total:') || trimmed.startsWith('Tag,')) continue;
    const matches = trimmed.match(/"([^"]+)"/g);
    if (matches && matches.length >= 5) {
      let rawTag = matches[0].replace(/"/g, '');
      const slug = matches[4].replace(/"/g, '');
      const fCode = rawTag.match(/F\d+/)?.[0] || 'F100';
      tagsMap[slug] = `${fCode} — Custom Packaging`;
    }
  }

  const productsDatabase = {};

  for (const p of dbProducts) {
    const slug = p.slug;
    const cat = p.categories || { name: 'Packaging', slug: 'packaging' };
    const exactTag = tagsMap[slug] || 'F100 — Custom Packaging';

    productsDatabase[slug] = {
      id: p.id,
      name: p.name,
      slug: p.slug,
      skuCode: exactTag,
      description: p.description || p.detail_description || `Custom ${p.name} engineered with premium materials.`,
      images: Array.isArray(p.images) ? p.images : [],
      box_style: p.box_style || p.name,
      size_info: p.size_info || "Fully Customizable (All dimensions available)",
      min_quantity: p.min_quantity || "Starting from 100 Units",
      stock_info: p.stock_info || "10pt to 28pt Kraft, Corrugated, Rigid, Cardstock",
      printing_options: p.printing_options || "CMYK, PMS, No Printing, Offset High Fidelity",
      finishing_options: p.finishing_options || "Gloss, Matte, Aqua Coating, Foil Stamping, Spot UV",
      proof_info: p.proof_info || "2D Flat View, 3D Digital Mockup",
      turnaround_time: p.turnaround_time || "8 to 12 Business Days",
      shipping_info: p.shipping_info || "FREE Shipping Worldwide",
      category: {
        name: cat.name,
        slug: cat.slug,
      },
      meta_title: p.meta_title || `${p.name} | Custom Packaging`,
      meta_description: p.meta_description || p.description || `Custom ${p.name}`,
      meta_keywords: p.meta_keywords || "",
      product_content: p.product_content || {},
    };
  }

  const outputCode = `// Auto-generated comprehensive product details extracted from Supabase
// Total Products: ${Object.keys(productsDatabase).length}
// All images downloaded locally to /images/products/

import type { ProductDetailData } from "./product-defaults";

export const FULL_PRODUCTS_DATABASE: Record<string, ProductDetailData> = ${JSON.stringify(productsDatabase, null, 2)};
`;

  fs.writeFileSync('src/data/product-detail-defaults.ts', outputCode, 'utf8');
  console.log('Successfully synced local FULL_PRODUCTS_DATABASE with Supabase!');
}

updateLocalDB();
