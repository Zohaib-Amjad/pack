const fs = require('fs');
const path = require('path');

const csvPath = 'D:\\hof-pack\\product-tags.csv';
const lines = fs.readFileSync(csvPath, 'utf8').split('\n');

const tagMap = {};

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('Total:') || trimmed.startsWith('Tag,')) continue;
  
  // Format: "F100 - Custom Packaging","Donut Boxes","Bakery Boxes","custom-bakery-boxes","custom-donut-boxes","/product/custom-donut-boxes"
  const matches = trimmed.match(/"([^"]+)"/g);
  if (matches && matches.length >= 5) {
    let rawTag = matches[0].replace(/"/g, '');
    const slug = matches[4].replace(/"/g, '');
    
    // Normalize to em dash: "F100 — Custom Packaging"
    const fCode = rawTag.match(/F\d+/)?.[0] || 'F100';
    const normalizedTag = `${fCode} — Custom Packaging`;
    
    tagMap[slug] = normalizedTag;
  }
}

console.log(`Parsed ${Object.keys(tagMap).length} product tags from CSV.`);

const outputCode = `// Auto-generated product tags mapping from product-tags.csv (212 products)
// Uses em dash: "F{100+position} — Custom Packaging"

export const PRODUCT_TAGS_MAP: Record<string, string> = ${JSON.stringify(tagMap, null, 2)};

export function getExactProductTag(slug: string): string {
  return PRODUCT_TAGS_MAP[slug] || "F100 — Custom Packaging";
}
`;

fs.writeFileSync('src/data/product-tags.ts', outputCode, 'utf8');
console.log('Successfully written src/data/product-tags.ts!');
