# Local Images Rule for HOF Pack

## Mandatory Directive: Always Store Images Locally
Whenever adding, modifying, or using ANY image in the codebase (for products, categories, blogs, case studies, hero sections, logos, badges, or ui components):
1. **Never use external or remote image URLs directly in source code** (e.g. Cloudinary, Unsplash, external CDNs).
2. **Always download and store the image locally** under the appropriate subfolder inside `public/images/`:
   - `public/images/brand/` for logos, badges, payment icons, certifications.
   - `public/images/logistics/` for shipping carrier logos (UPS, FedEx, USPS, DHL).
   - `public/images/hero/` for hero banners and background textures.
   - `public/images/categories/` for category cards, banners, and dielines.
   - `public/images/products/` for individual product photos, mockups, and dieline diagrams.
   - `public/images/blog/` for blog covers and embedded article images.
   - `public/images/case-studies/` for case study covers and galleries.
   - `public/images/ui/` for general UI graphics and icons.
3. **Reference the image using the local web path** (e.g. `/images/products/product-name.jpg` or `/images/categories/category-name.jpg`).
