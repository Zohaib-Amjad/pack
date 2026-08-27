const fs = require('fs');

const jsonPath = 'D:\\hof-pack\\exports\\product-spec-table-fields.json';
const specData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log('Loaded product spec fields:', Object.keys(specData.products).length, 'products');

// Check sample
const sampleSlug = Object.keys(specData.products)[0];
console.log('Sample slug:', sampleSlug);
console.log('Sample data:', JSON.stringify(specData.products[sampleSlug], null, 2));
