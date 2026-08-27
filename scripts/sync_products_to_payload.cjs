const { getPayload } = require('payload');
const config = require('./src/payload.config.ts').default;
const fs = require('fs');

async function seedProductsToPayload() {
  console.log('Initializing Payload...');
  const payload = await getPayload({ config });

  const specData = JSON.parse(fs.readFileSync('D:\\hof-pack\\exports\\product-spec-table-fields.json', 'utf8'));

  // Fetch all categories from Payload to link products
  const payloadCategories = await payload.find({
    collection: 'categories',
    limit: 100,
  });

  const categoryMap = {};
  for (const cat of payloadCategories.docs) {
    categoryMap[cat.slug] = cat.id;
  }

  // Fallback category if none matched
  const defaultCategoryId = payloadCategories.docs[0]?.id;

  console.log(`Found ${payloadCategories.totalDocs} categories in Payload.`);

  const { FULL_PRODUCTS_DATABASE } = require('./src/data/product-detail-defaults.ts');

  let synced = 0;

  for (const [slug, prod] of Object.entries(FULL_PRODUCTS_DATABASE)) {
    const spec = specData.products[slug] || specData.defaultTemplate;
    const catSlug = prod.category?.slug || 'packaging';
    const categoryId = categoryMap[catSlug] || defaultCategoryId;

    if (!categoryId) {
      console.warn(`No category found for ${slug}, skipping...`);
      continue;
    }

    const existing = await payload.find({
      collection: 'products',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    });

    const specOverrides = spec.specOverrides || {};

    const productPayloadData = {
      title: prod.name,
      slug: prod.slug,
      category: categoryId,
      shortDescription: prod.description,
      moq: specOverrides.quantities_info || spec.minQuantity || "100",
      specifications: {
        boxStyle: spec.name || prod.box_style || prod.name,
        sizeInfo: specOverrides.dimension_info || spec.sizeInfo || prod.size_info || "Fully Customizable (All dimensions available)",
        minQuantity: specOverrides.quantities_info || spec.minQuantity || prod.min_quantity || "Starting from 100 Units",
        stockInfo: spec.stockInfo || prod.stock_info || "10pt to 28pt Kraft, Corrugated, Rigid, Cardstock",
        printingOptions: Array.isArray(specOverrides.printing_options_list) ? specOverrides.printing_options_list.join(", ") : (spec.printingOptions || prod.printing_options || "CMYK, PMS, No Printing, Offset High Fidelity"),
        finishingOptions: Array.isArray(specOverrides.finishing_options_list) ? specOverrides.finishing_options_list.join(", ") : (spec.finishingOptions || prod.finishing_options || "Gloss, Matte, Aqua Coating, Foil Stamping, Spot UV"),
        includedOptions: Array.isArray(specOverrides.included_options) ? specOverrides.included_options.join(", ") : "Die Cutting, Gluing, Scored, Perforation",
        additionalOptions: Array.isArray(specOverrides.additional_options) ? specOverrides.additional_options.join(", ") : "Eco-Friendly, Recycled Boxes, Biodegradable",
        proofInfo: spec.proofInfo || prod.proof_info || "2D Flat View, 3D Digital Mockup",
        turnaroundTime: specOverrides.turnaround_label || spec.turnaroundTime || prod.turnaround_time || "8 to 12 Business Days",
        rushAvailable: specOverrides.rush_available !== false,
        showShippingPolicy: specOverrides.show_shipping_policy === true,
        shippingInfo: prod.shipping_info || "FREE Shipping Worldwide",
      },
    };

    if (existing.totalDocs > 0) {
      await payload.update({
        collection: 'products',
        id: existing.docs[0].id,
        data: productPayloadData,
      });
    } else {
      await payload.create({
        collection: 'products',
        data: productPayloadData,
      });
    }

    synced++;
    if (synced % 25 === 0) {
      console.log(`Synced ${synced} products to Payload...`);
    }
  }

  console.log(`\n========================================`);
  console.log(`Successfully synced ${synced} products to Payload CMS!`);
  console.log(`========================================`);
}

seedProductsToPayload().catch(console.error);
