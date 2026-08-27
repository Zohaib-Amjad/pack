# HOF Pack — Full Site Migration Brief (Next.js + TypeScript + Payload CMS)

Use this as the master prompt/spec to rebuild **hofpack.com** in **Next.js 15 App Router**, **TypeScript**, and **Payload CMS 3.x**, preserving visual fidelity, SEO, and content structure.

---

## 1. Project Overview

**Brand:** HOF Pack — custom packaging & rigid boxes (B2B e-commerce / lead-gen)  
**Domain:** hofpack.com  
**Business model:** Quote-driven (forms → inquiries, not checkout-first)  
**Primary CTA:** “Get a Free Quote” (global modal + inline forms)  
**Secondary channels:** Live chat (Crisp), WhatsApp floating button  

**Design personality:** Warm, premium, earthy — cream backgrounds, forest green brand, orange CTAs. Clean sans-serif (DM Sans). Packaging-industry trust signals (Trustpilot, payment badges, logistics partners).

---

## 2. Target Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 App Router |
| Language | TypeScript (strict) |
| CMS | Payload CMS 3.x (replace Supabase JSON CMS + admin) |
| Styling | Tailwind CSS 3.4 + CSS variables |
| UI primitives | Radix UI / custom accessible primitives |
| Forms | React Hook Form + Zod validation |
| Data fetching | Server Components + Payload Local API |
| Media | Payload Upload → Cloudinary (or keep Cloudinary URLs) |
| Rich text | Payload Lexical (replace TinyMCE HTML in JSONB) |
| Analytics | GTM, Meta Pixel, Google Ads (deferred load) |
| Chat | Crisp widget (client-side, public pages only) |

---

## 3. Design System — Colors

### Core palette (CSS variables — use everywhere)

```css
/* Page & surfaces */
--ds-page-bg:     #f5f3ee;   /* warm cream — page background */
--ds-card-bg:     #ffffff;
--ds-panel-bg:    #ece9e2;   /* alternate section bg */
--ds-input-bg:    #faf8f5;

/* Text */
--ds-ink:         #1a1a1a;   /* headings */
--ds-body:        #4a4a4a;   /* body copy */
--ds-muted:       #7a7672;   /* labels, footer links */
--ds-placeholder: #aaa6a0;   /* eyebrows, fine print */

/* Brand */
--ds-green:       #2d5c3e;   /* primary brand green */
--ds-green-dark:  #1e3d2b;   /* hero, footer, announcement bar */
--ds-orange:      #e8732a;   /* primary CTA */
--ds-orange-hover:#c45a18;   /* CTA hover */

/* Borders */
--ds-border:      #e0ddd6;
--ds-input-border:#d8d4cc;

/* Gradients */
--hero-gradient:  linear-gradient(135deg, #1e3d2b 0%, #2d5c3e 45%, #3a6b4a 100%);
--accent-gradient:linear-gradient(135deg, #e8732a 0%, #d4621f 100%);
```

### Semantic Tailwind mapping

- `primary` = green `#2d5c3e`
- `accent` = orange `#e8732a`
- `background` = cream `#f5f3ee`
- `border` = `#e0ddd6`
- `ds.*` namespace in Tailwind for direct hex access

### Accent colors (contextual)

| Hex | Usage |
|-----|-------|
| `#E8F4EA` / `#dce8df` | Trustpilot / testimonial mint tint |
| `#00b67a` | Trustpilot star green |
| `#fbbc04` | Google review stars |
| `#ee7a1b` | Custom landing funnel only (consolidate to `#e8732a` in rebuild) |

---

## 4. Design System — Typography

**Single font family:** DM Sans (Google Fonts via `next/font`)  
**Weights used:** 300, 400, 500, 600, 700  
**No serif** — live site is 100% DM Sans.

### Type scale

| Token / Class | Size | Weight | Tracking | Transform | Use |
|---------------|------|--------|----------|-----------|-----|
| Hero title | `clamp(28px, 7vw, 52px)` | 700 | normal | — | Page heroes |
| `.ds-heading` | 32px | 600 | — | — | Section H2 |
| `.ds-subheading` | 26px | 600 | — | — | Sub-sections |
| `.ds-faq-heading` | 21px | 500 | 0.12em | uppercase | FAQ labels |
| `.ds-card-title` | 14px | 500 | — | — | Card titles |
| `.ds-body` | 13px | 400 | — | lh 1.78 | All body text |
| `.ds-hero-desc` | 13.5px | 400 | — | lh 1.7 | Hero subtitles |
| `.ds-product-name` | 12px | 500 | — | — | Product grid names |
| `.ds-btn` | 11.5px | 500 | 0.10em | uppercase | Buttons/CTAs |
| `.ds-label` | 9.5px | 500 | 0.09em | uppercase | Form labels |
| `.ds-eyebrow` | 9.5px | 500 | 0.16em | uppercase | Section eyebrows |
| `.ds-nav-link` | 13.5px | 500 | 0.03em | — | Nav links |
| `.ds-footer-link` | 12.5px | 400 | — | — | Footer links |
| `.ds-caption` | 11px | 400 | — | — | Legal/fine print |

**Body default:** 13px, weight 400, line-height 1.78, color `#4a4a4a`

---

## 5. Design System — Spacing & Layout

### Container widths

| Class / value | Width | Where |
|---------------|-------|-------|
| `.container-max` | `max-w-7xl` (1280px) + `px-4 sm:px-6 lg:px-8` | Default sections |
| `max-w-[1100px]` | 1100px | Footer, CTASection, category content |
| `max-w-3xl` | ~768px | Legal pages |
| `max-w-2xl` | ~672px | Hero text column |

### Section padding

```css
.section-padding → px-4 sm:px-6 lg:px-8, py-16 sm:py-20 lg:py-24
Home sections    → py-10 sm:py-[64px], px-4 sm:px-10
Footer           → py-[52px], inner max-w-[1100px]
```

### Grid gaps

- Product cards: `gap-3 sm:gap-5`
- Carousels: `gap-4 sm:gap-5 lg:gap-6`
- Footer columns: `gap-10 lg:gap-16`

### Border radius

- Base `--radius`: 8px (`0.5rem`)
- Cards: `rounded-xl` (12px), sometimes `rounded-[10px]` / `rounded-[14px]`
- Buttons: `rounded-md`, `rounded-lg`, or `rounded-[5px]` (standardized to 6–8px or full pill)

### Breakpoints (Tailwind defaults)

| Breakpoint | px | Key behavior |
|------------|-----|--------------|
| default | <640 | Mobile-first |
| `sm:` | 640 | Padding, 2-col grids |
| `md:` | 768 | Footer static columns |
| `lg:` | 1024 | Desktop nav, utility bar, `pt-[112px]` main |
| `xl:` | 1280 | 5-col product grids |
| `2xl:` | 1400 | Container max |

---

## 6. Global Layout Architecture

### Two shells

**A) Main site shell** (most pages):
- Navbar (fixed, z-50)
  - Utility bar (`hidden lg:block`, `bg-[#2d5c3e]`, 32px)
  - Main nav row (`h-20` / 80px)
- `<main class="pt-20 lg:pt-[112px]">`
- Footer (`bg #1e3d2b`)
- WhatsApp floating button (bottom-right)

**B) Custom landing shell** (`/custompackaging`, `/custom-quote`, etc.):
- No main Navbar/Footer
- Minimal header/footer, system-ui override
- Promo-focused funnel pages

---

## 7. Navbar Specification

- **Desktop utility bar** (`hidden lg:block`, `bg-[#2d5c3e]`, 32px height)
- **Main nav row** (`h-20`, cream `#f5f3ee`, backdrop-blur)
- **Mega menus** (3 columns from categories: By Industry, By Material, By Style)
- **Help Center dropdown**: Artwork Guidelines, Blog, Library
- **Static links**: About, Process, Portfolio, Contact
- **Mobile** (`lg:hidden`): Hamburger → full-screen tray (`z-[80]`), accordion menus, quote CTA
- **Quote CTA**: Global `QuoteModal` via React Context, orange uppercase button

---

## 8. Footer Specification

- **Background:** `#1e3d2b` (dark green), inner container `max-w-[1100px]`
- **4 desktop columns:**
  1. Brand column: Logo, address, phone, email, payment icons, trust badges, socials
  2. Business: About, Process, Portfolio, Contact, etc.
  3. Categories: dynamic from CMS (`show_in_footer: true`)
  4. Products: dynamic from CMS (`show_in_footer: true`)
- **Mobile:** Accordion collapsible sections
- **Bottom bar:** Logistics partners (DHL, UPS, FedEx), legal links (Privacy, Terms, Refund, Shipping), copyright

---

## 9. Announcement Bar (Homepage only)

- Only on `/`
- Background: `#1e3d2b`
- Marquee animation (20s linear)
- Font: 11–13px white text

---

## 10. Complete Page Inventory

### Public — Main shell

| Route | Template | Key sections |
|-------|----------|--------------|
| `/` | Home | AnnouncementBar → Hero → ClientLogos → FeaturedCategories → DiscountBar → TrendingProducts → HowItWorks → WhyChooseUs → HomeQuoteSection → FAQ → HomeMoreProducts → Trustpilot |
| `/[categorySlug]` | CategoryPage | Hero banner → Product grid (2→5 cols) → Quote form `#quote` → Brand content (rich HTML) → FAQ → Related carousel → CTASection → Trustpilot |
| `/product/[productSlug]` | ProductPage | Image gallery → Specs table → Inline quote form → Dynamic content blocks → Related products → Rating slider → FAQ → Google Shopping cart (conditional) → CTA |
| `/about` | About | Hero, stats strip, mission, timeline, manufacturing, values, certifications |
| `/process` | Process | Hero, stats cards, step cards with images, promise grid |
| `/portfolio` | Portfolio | CMS header, filter tabs, masonry grid |
| `/contact` | Contact | Contact info + quote form |
| `/industries` | Industries | Industry grid |
| `/blog` | Blog index | Post cards |
| `/blog/[slug]` | Blog detail | Hero, body, related |
| `/case-studies` | Case studies index | Cards |
| `/case-studies/[slug]` | Case study detail | Hero, body |
| `/library` | Library | CMS hero + downloadable resources |
| `/catalog` | Catalog | Filterable category/product browser |
| `/cart` | Cart | Google Shopping cart flow |
| `/artwork-guidelines` | FAQ-style | Guidelines content |
| `/brand-guide` | Design system | Live token reference page |
| `/company-profile` | Corporate | PDF-style profile |
| `/track`, `/track/[code]` | Tracking | Order lookup |
| `/thank-you`, `/thank-you/[categorySlug]` | Thank you | Post-quote confirmation |
| `/privacy`, `/terms`, `/refund-policy`, `/shipping-policy` | Legal | Numbered sections |

### Public — Custom landing shell (no main nav)

| Route | Purpose |
|-------|---------|
| `/custompackaging` | Main landing funnel |
| `/custom-packaging-solutions` | Solutions landing |
| `/custom-quote` | Quote landing |
| `/exclusive-offer` | Promo offer |
| `/our-products` | Product showcase |
| `/learn-more` | Info landing |
| `/contactus-s` | Custom contact |
| `/custom-terms`, `/custom-privacy-policy`, etc. | Funnel legal pages |

### Redirects to preserve

- `/faq` → `/artwork-guidelines` (301)
- `/custom-packing` → `/custompackaging` (301)
