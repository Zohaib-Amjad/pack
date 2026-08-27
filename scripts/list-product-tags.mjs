import { categories, getProductTag } from '../src/data/products.ts';

console.log('Tag,Product,Category,Category Slug,Product Slug,URL');

for (const cat of categories) {
  cat.products.forEach((p, idx) => {
    const tag = `F${100 + idx} — Custom Packaging`;
    console.log(`"${tag}","${p.name}","${cat.name}","${cat.slug}","${p.slug}","https://hofpack.com/product/${p.slug}"`);
  });
}
