const fs = require('fs');

// Simple script to generate the product-tags.csv using the categories structure
const content = fs.readFileSync('src/data/products.ts', 'utf8');

// We can parse or import ts via ts-node/register or manual parser
console.log('Tag,Product,Category,Category Slug,Product Slug,URL');
