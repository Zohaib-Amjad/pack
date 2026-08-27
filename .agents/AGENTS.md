# Workspace Guidelines for HOF Pack

## Image Management Rule
- **Mandatory Local Storage**: All images used anywhere across the website (products, categories, blog articles, case studies, hero sections, logos, badges, and UI components) must be downloaded and stored locally in `public/images/`.
- **No Direct Remote URLs**: Never leave external image URLs (Cloudinary, Unsplash, external CDNs) in data files or components.
- **Directory Hierarchy**:
  - `public/images/brand/` (Logos, badges, trust seals)
  - `public/images/logistics/` (Carrier logos)
  - `public/images/hero/` (Hero banners, background textures)
  - `public/images/categories/` (Category dielines, cards)
  - `public/images/products/` (Product images, dielines)
  - `public/images/blog/` (Blog featured images, illustrations)
  - `public/images/case-studies/` (Case study covers, photos )
  - `public/images/ui/` (General UI icons, graphics)

## Pre-Push Quality Control & Verification Rule
- **Mandatory Pre-Push Checks**: Right before pushing ANY code to the remote repository (`git push`), ALWAYS run:
  1. ESLint check (`npm run lint` or `npx next lint`)
  2. Build check (`npm run build` or `npx next build`)
- **Zero Errors Policy**: Both checks must pass with zero errors before pushing changes to remote. If any errors occur, fix them immediately before pushing.
