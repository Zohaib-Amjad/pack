const fs = require('fs');

const csvPath = 'D:\\hof-pack\\product-tags.csv';
const lines = fs.readFileSync(csvPath, 'utf8').split('\n');

const map = {};

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('Total:') || trimmed.startsWith('Tag,')) continue;
  
  const matches = trimmed.match(/"([^"]+)"/g);
  if (matches && matches.length >= 5) {
    let rawTag = matches[0].replace(/"/g, '');
    const slug = matches[4].replace(/"/g, '');
    const fCode = rawTag.match(/F\d+/)?.[0] || 'F100';
    map[slug] = `${fCode} — Custom Packaging`;
  }
}

let dbContent = fs.readFileSync('src/data/product-detail-defaults.ts', 'utf8');

dbContent = dbContent.replace(/"slug":\s*"([^"]+)",\s*"skuCode":\s*"[^"]*"/g, (match, slug) => {
  const exactTag = map[slug] || 'F100 — Custom Packaging';
  return `"slug": "${slug}",\n    "skuCode": "${exactTag}"`;
});

fs.writeFileSync('src/data/product-detail-defaults.ts', dbContent, 'utf8');
console.log(`Successfully updated ${Object.keys(map).length} product tags in product-detail-defaults.ts directly from CSV!`);
