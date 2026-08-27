const http = require('http');

http.get('http://localhost:3000/product/custom-cake-boxes', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const hasSection = body.includes('Related products');
    const hasSlider = body.includes('id="related-products-slider"');
    console.log('Related products section present:', hasSection);
    console.log('Slider present:', hasSlider);
  });
}).on('error', err => console.error(err.message));
