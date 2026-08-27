const http = require('http');

const testCases = [
  { slug: 'custom-cake-boxes', expected: 'F100' },
  { slug: 'window-bakery-boxes', expected: 'F101' },
  { slug: 'custom-donut-boxes', expected: 'F102' },
  { slug: 'custom-magnetic-closure-boxes', expected: 'F100' },
  { slug: 'collapsible-rigid-boxes', expected: 'F101' },
  { slug: 'stand-up-coffee-pouches', expected: 'F100' },
  { slug: 'two-piece-candle-boxes', expected: 'F100' },
];

console.log('Testing exact product tag assignment...');

testCases.forEach(({ slug, expected }) => {
  http.get(`http://localhost:3000/product/${slug}`, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      const match = body.match(/F\d{3}\s*[-—–]\s*Custom Packaging/i);
      const tag = match ? match[0] : 'None';
      const isMatch = tag.startsWith(expected);
      console.log(`[${isMatch ? 'PASS' : 'FAIL'}] /product/${slug} -> Tag: "${tag}" (Expected: ${expected})`);
    });
  }).on('error', err => console.error(err.message));
});
