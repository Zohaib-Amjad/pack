const http = require('http');

const testCases = [
  { slug: 'custom-donut-boxes', expected: 'F100 — Custom Packaging' },
  { slug: 'custom-cake-boxes', expected: 'F101 — Custom Packaging' },
  { slug: 'pink-bakery-boxes', expected: 'F102 — Custom Packaging' },
  { slug: 'luxury-candle-packaging', expected: 'F100 — Custom Packaging' },
  { slug: 'christmas-candle-boxes', expected: 'F101 — Custom Packaging' },
  { slug: 'two-piece-candle-boxes', expected: 'F102 — Custom Packaging' },
  { slug: 'custom-magnetic-closure-boxes', expected: 'F100 — Custom Packaging' },
  { slug: 'collapsible-rigid-boxes', expected: 'F101 — Custom Packaging' },
  { slug: 'cylinder-rigid-boxes', expected: 'F126 — Custom Packaging' },
];

console.log('Testing exact CSV product tag assignment...');

testCases.forEach(({ slug, expected }) => {
  http.get(`http://localhost:3000/product/${slug}`, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      const match = body.match(/F\d{3}\s*[-—–]\s*Custom Packaging/i);
      const tag = match ? match[0] : 'None';
      const isMatch = tag === expected;
      console.log(`[${isMatch ? 'PASS' : 'FAIL'}] /product/${slug} -> Tag: "${tag}" (Expected: "${expected}")`);
    });
  }).on('error', err => console.error(err.message));
});
