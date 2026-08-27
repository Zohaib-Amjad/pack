// ===== HOF Pack — Full Product Catalog =====
// Organized by: Boxes by Industry (9), Boxes by Material (5), Boxes by Style (7)

export interface Product {
  name: string;
  slug: string; // URL: /product/{slug}
  category: string;
  section: "industry" | "material" | "style";
}

export interface Category {
  name: string;
  slug: string; // URL: /{slug}
  section: "industry" | "material" | "style";
  description: string;
  products: Product[];
}

// ---------- 1. BOXES BY INDUSTRY ----------

const bakeryProducts: (Product & { image?: string })[] = [
  { name: "Custom Cake Boxes", slug: "custom-cake-boxes", category: "Bakery Boxes", section: "industry", image: "/images/products/custom-cake-boxes.jpg" },
  { name: "Window Bakery Boxes", slug: "window-bakery-boxes", category: "Bakery Boxes", section: "industry", image: "/images/products/window-bakery-boxes.jpg" },
  { name: "Custom Donut Boxes", slug: "custom-donut-boxes", category: "Bakery Boxes", section: "industry", image: "/images/products/custom-donut-boxes.jpg" },
  { name: "Custom Bread Bags", slug: "custom-bread-bags", category: "Bakery Boxes", section: "industry", image: "/images/products/custom-bread-bags.jpg" },
  { name: "Custom Pastry Boxes", slug: "custom-pastry-boxes", category: "Bakery Boxes", section: "industry", image: "/images/products/custom-pastry-boxes.jpg" },
];

const candleProducts: (Product & { image?: string })[] = [
  { name: "Two Piece Candle Boxes", slug: "two-piece-candle-boxes", category: "Candle Boxes", section: "industry", image: "/images/products/two-piece-candle-boxes.jpg" },
  { name: "Candle Gift Boxes", slug: "candle-gift-boxes", category: "Candle Boxes", section: "industry", image: "/images/products/candle-gift-boxes.jpg" },
  { name: "Luxury Candle Packaging", slug: "luxury-candle-packaging", category: "Candle Boxes", section: "industry", image: "/images/products/luxury-candle-packaging.jpg" },
  { name: "Candle Shipping Boxes", slug: "candle-shipping-boxes", category: "Candle Boxes", section: "industry", image: "/images/products/candle-shipping-boxes.jpg" },
  { name: "Candle Dust Covers", slug: "candle-dust-covers", category: "Candle Boxes", section: "industry", image: "/images/products/candle-dust-covers.jpg" },
  { name: "Candle Jar Boxes", slug: "candle-jar-boxes", category: "Candle Boxes", section: "industry", image: "/images/products/candle-jar-boxes.jpg" },
  { name: "Votive Candle Boxes", slug: "votive-candle-boxes", category: "Candle Boxes", section: "industry", image: "/images/products/votive-candle-boxes.jpg" },
];

const coffeeProducts: (Product & { image?: string })[] = [
  { name: "Stand Up Coffee Pouches", slug: "stand-up-coffee-pouches", category: "Coffee Packaging", section: "industry", image: "/images/products/stand-up-coffee-pouches.jpg" },
  { name: "Coffee Cup Sleeves", slug: "coffee-cup-sleeves", category: "Coffee Packaging", section: "industry", image: "/images/products/coffee-cup-sleeves.jpg" },
  { name: "Coffee Bag Sleeves", slug: "coffee-bag-sleeves", category: "Coffee Packaging", section: "industry", image: "/images/products/coffee-bag-sleeves.jpg" },
  { name: "Vented Coffee Bags", slug: "vented-coffee-bags", category: "Coffee Packaging", section: "industry", image: "/images/products/vented-coffee-bags.jpg" },
  { name: "Coffee Kraft Bags", slug: "coffee-kraft-bags", category: "Coffee Packaging", section: "industry", image: "/images/products/coffee-kraft-bags.jpg" },
  { name: "Custom Paper Coffee Cups", slug: "paper-coffee-cups", category: "Coffee Packaging", section: "industry", image: "/images/products/paper-coffee-cups.jpg" },
  { name: "Coffee Capsule Packaging", slug: "coffee-capsule-packaging", category: "Coffee Packaging", section: "industry", image: "/images/products/coffee-capsule-packaging.jpg" },
  { name: "Coffee Filter Packaging", slug: "coffee-filter-packaging", category: "Coffee Packaging", section: "industry", image: "/images/products/coffee-filter-packaging.jpg" },
  { name: "Coffee Bean Packaging", slug: "coffee-bean-packaging", category: "Coffee Packaging", section: "industry", image: "/images/products/coffee-bean-packaging.jpg" },
  { name: "Gusseted Coffee Bags", slug: "gusseted-coffee-bags", category: "Coffee Packaging", section: "industry", image: "/images/products/gusseted-coffee-bags.jpg" },
];

const cosmeticProducts: (Product & { image?: string })[] = [
  { name: "Makeup Packaging", slug: "makeup-packaging", category: "Cosmetic Boxes", section: "industry", image: "/images/products/makeup-packaging.jpg" },
  { name: "Lip Balm Boxes", slug: "lip-balm-boxes", category: "Cosmetic Boxes", section: "industry", image: "/images/products/lip-balm-boxes.jpg" },
  { name: "Eye Shadow Boxes", slug: "eye-shadow-boxes", category: "Cosmetic Boxes", section: "industry", image: "/images/products/eye-shadow-boxes.jpg" },
  { name: "Press On Nail Packaging", slug: "press-on-nail-packaging", category: "Cosmetic Boxes", section: "industry", image: "/images/products/press-on-nail-packaging.jpg" },
  { name: "Custom Serum Boxes", slug: "serum-boxes", category: "Cosmetic Boxes", section: "industry", image: "/images/products/custom-serum-boxes.jpg" },
  { name: "Lip Balm Tubes", slug: "lip-balm-tubes", category: "Cosmetic Boxes", section: "industry", image: "/images/products/lip-balm-tubes.jpg" },
  { name: "Lip Mask Boxes", slug: "lip-mask-boxes", category: "Cosmetic Boxes", section: "industry", image: "/images/products/lip-mask-boxes.jpg" },
  { name: "Custom Lipstick Packaging", slug: "custom-lipstick-packaging", category: "Cosmetic Boxes", section: "industry", image: "/images/products/custom-lipstick-packaging.jpg" },
  { name: "Custom Hair Extension Boxes", slug: "hair-extension-boxes", category: "Cosmetic Boxes", section: "industry", image: "/images/products/custom-hair-extension-boxes.jpg" },
];

const cigaretteProducts: (Product & { image?: string })[] = [
  { name: "Paper Cigarette Boxes", slug: "paper-cigarette-boxes", category: "Custom Cigarette Boxes", section: "industry", image: "/images/products/paper-cigarette-boxes.jpg" },
  { name: "Cardboard Cigarette Boxes", slug: "cardboard-cigarette-boxes", category: "Custom Cigarette Boxes", section: "industry", image: "/images/products/cardboard-cigarette-boxes.jpg" },
  { name: "Custom Lighter Boxes", slug: "custom-lighter-boxes", category: "Custom Cigarette Boxes", section: "industry", image: "/images/products/custom-lighter-boxes.jpg" },
  { name: "Blank Cigarette Boxes", slug: "blank-cigarette-boxes", category: "Custom Cigarette Boxes", section: "industry", image: "/images/products/blank-cigarette-boxes.jpg" },
  { name: "Blunt Packaging", slug: "blunt-packaging", category: "Custom Cigarette Boxes", section: "industry", image: "/images/products/blunt-packaging.jpg" },
];

const jewelryProducts: (Product & { image?: string })[] = [
  { name: "Custom Ring Boxes", slug: "custom-ring-boxes", category: "Custom Jewelry Boxes", section: "industry", image: "/images/products/custom-ring-boxes.jpg" },
  { name: "Custom Earring Boxes", slug: "custom-earring-boxes", category: "Custom Jewelry Boxes", section: "industry", image: "/images/products/custom-earring-boxes.jpg" },
  { name: "Kraft Bulk Jewelry Boxes", slug: "kraft-bulk-jewelry-boxes", category: "Custom Jewelry Boxes", section: "industry", image: "/images/products/kraft-bulk-jewelry-boxes.jpg" },
  { name: "Bracelet Boxes", slug: "bracelet-boxes", category: "Custom Jewelry Boxes", section: "industry", image: "/images/products/bracelet-boxes.jpg" },
  { name: "Custom Pandasew Packaging", slug: "custom-pandasew-packaging", category: "Custom Jewelry Boxes", section: "industry", image: "/images/products/custom-pandasew-packaging.jpg" },
  { name: "Custom Bangle Boxes", slug: "custom-bangle-boxes", category: "Custom Jewelry Boxes", section: "industry", image: "/images/products/custom-bangle-boxes.jpg" },
  { name: "Pendant Boxes", slug: "pendant-boxes", category: "Custom Jewelry Boxes", section: "industry", image: "/images/products/pendant-boxes.jpg" },
  { name: "Custom Anklet Boxes", slug: "custom-anklet-boxes", category: "Custom Jewelry Boxes", section: "industry", image: "/images/products/custom-anklet-boxes.jpg" },
];

const retailProducts: (Product & { image?: string })[] = [
  { name: "Tea Gift Boxes", slug: "tea-gift-boxes", category: "Custom Retail Boxes", section: "industry", image: "/images/products/tea-gift-boxes.jpg" },
  { name: "Custom Paper Cups", slug: "custom-paper-cups", category: "Custom Retail Boxes", section: "industry", image: "/images/products/custom-paper-cups.jpg" },
  { name: "Playing Card Boxes", slug: "playing-card-boxes", category: "Custom Retail Boxes", section: "industry", image: "/images/products/playing-card-boxes.jpg" },
  { name: "Custom Holographic Boxes", slug: "custom-holographic-boxes", category: "Custom Retail Boxes", section: "industry", image: "/images/products/custom-holographic-boxes.jpg" },
  { name: "Cannabis Mylar Bags", slug: "cannabis-mylar-bags", category: "Custom Retail Boxes", section: "industry", image: "/images/products/cannabis-mylar-bags.jpg" },
  { name: "Underwear Packaging", slug: "underwear-packaging", category: "Custom Retail Boxes", section: "industry", image: "/images/products/underwear-packaging.jpg" },
  { name: "Custom Bra Boxes", slug: "custom-bra-boxes", category: "Custom Retail Boxes", section: "industry", image: "/images/products/custom-bra-boxes.jpg" },
  { name: "Single Wall Paper Cups", slug: "single-wall-paper-cups", category: "Custom Retail Boxes", section: "industry", image: "/images/products/single-wall-paper-cups.jpg" },
  { name: "Pantyhose Packaging", slug: "pantyhose-packaging", category: "Custom Retail Boxes", section: "industry", image: "/images/products/pantyhose-packaging.jpg" },
];

const waxPaperProducts: (Product & { image?: string })[] = [
  { name: "Custom Cheese Paper", slug: "custom-cheese-paper", category: "Custom Wax Papers", section: "industry", image: "/images/products/custom-cheese-paper.jpg" },
  { name: "Custom Deli Papers", slug: "custom-deli-papers", category: "Custom Wax Papers", section: "industry", image: "/images/products/custom-deli-papers.png" },
  { name: "Custom Greaseproof Paper", slug: "custom-greaseproof-paper", category: "Custom Wax Papers", section: "industry", image: "/images/products/custom-greaseproof-paper.jpg" },
  { name: "Custom Freezer Paper", slug: "custom-freezer-paper", category: "Custom Wax Papers", section: "industry", image: "/images/products/custom-freezer-paper.jpg" },
  { name: "Custom Food Wrapping Paper", slug: "custom-food-wrapping-paper", category: "Custom Wax Papers", section: "industry", image: "/images/products/custom-food-wrapping-paper.jpg" },
  { name: "Custom Hot Paper", slug: "custom-hot-paper", category: "Custom Wax Papers", section: "industry", image: "/images/products/custom-hot-paper.jpg" },
  { name: "Custom Butter Paper", slug: "custom-butter-paper", category: "Custom Wax Papers", section: "industry", image: "/images/products/custom-butter-paper.jpg" },
  { name: "Custom Fry Paper", slug: "custom-fry-paper", category: "Custom Wax Papers", section: "industry", image: "/images/products/custom-fry-paper.jpg" },
  { name: "Custom Butcher Paper", slug: "custom-butcher-paper", category: "Custom Wax Papers", section: "industry", image: "/images/products/custom-butcher-paper.jpg" },
  { name: "Custom Bakery Wax Paper", slug: "custom-bakery-wax-paper", category: "Custom Wax Papers", section: "industry", image: "/images/products/custom-bakery-wax-paper.jpg" },
];

const soapProducts: (Product & { image?: string })[] = [
  { name: "Soap Wrapping Paper", slug: "soap-wrapping-paper", category: "Soap Boxes", section: "industry", image: "/images/products/soap-wrapping-paper.jpg" },
  { name: "Square Soap Boxes", slug: "square-soap-boxes", category: "Soap Boxes", section: "industry", image: "/images/products/square-soap-boxes.jpg" },
  { name: "Soap Sleeve Packaging", slug: "soap-sleeve-packaging", category: "Soap Boxes", section: "industry", image: "/images/products/soap-sleeve-packaging.jpg" },
  { name: "Luxury Soap Packaging", slug: "luxury-soap-packaging", category: "Soap Boxes", section: "industry", image: "/images/products/luxury-soap-packaging.jpg" },
  { name: "Soap Display Boxes", slug: "soap-display-boxes", category: "Soap Boxes", section: "industry", image: "/images/products/soap-display-boxes.jpg" },
];

// ---------- 2. BOXES BY MATERIAL ----------

const cardboardProducts: (Product & { image?: string })[] = [
  { name: "Cardboard Display Boxes", slug: "cardboard-display-boxes", category: "Cardboard Boxes", section: "material", image: "/images/products/cardboard-display-boxes.jpg" },
  { name: "Cardboard Jewelry Boxes", slug: "cardboard-jewelry-boxes", category: "Cardboard Boxes", section: "material", image: "/images/products/cardboard-jewelry-boxes.jpg" },
  { name: "Cardboard Pencil Boxes", slug: "cardboard-pencil-boxes", category: "Cardboard Boxes", section: "material", image: "/images/products/cardboard-pencil-boxes.jpg" },
  { name: "Cardboard Shoe Boxes", slug: "cardboard-shoe-boxes", category: "Cardboard Boxes", section: "material", image: "/images/products/cardboard-shoe-boxes.jpg" },
  { name: "Cardboard Tube Packaging", slug: "cardboard-tube-packaging", category: "Cardboard Boxes", section: "material", image: "/images/products/cardboard-tube-packaging.jpg" },
  { name: "Custom Cardboard Can Carriers", slug: "custom-cardboard-can-carriers", category: "Cardboard Boxes", section: "material", image: "/images/products/custom-cardboard-can-carriers.jpg" },
  { name: "Custom Cardboard Ammo Boxes", slug: "custom-cardboard-ammo-boxes", category: "Cardboard Boxes", section: "material", image: "/images/products/custom-cardboard-ammo-boxes.jpg" },
  { name: "Cardboard Box with Lid", slug: "cardboard-box-with-lid", category: "Cardboard Boxes", section: "material", image: "/images/products/cardboard-box-with-lid.jpg" },
  { name: "White Cardboard Boxes", slug: "white-cardboard-boxes", category: "Cardboard Boxes", section: "material", image: "/images/products/white-cardboard-boxes.jpg" },
];

const corrugatedProducts: (Product & { image?: string })[] = [
  { name: "Ecommerce Packaging", slug: "ecommerce-packaging", category: "Corrugated Boxes", section: "material", image: "/images/products/ecommerce-packaging.jpg" },
  { name: "Screen Printing Boxes", slug: "screen-printing-boxes", category: "Corrugated Boxes", section: "material", image: "/images/products/screen-printing-boxes.jpg" },
  { name: "Corrugated Tuck Top Boxes", slug: "corrugated-tuck-top-boxes", category: "Corrugated Boxes", section: "material", image: "/images/products/corrugated-tuck-top-boxes.jpg" },
  { name: "White Corrugated Boxes", slug: "white-corrugated-boxes", category: "Corrugated Boxes", section: "material", image: "/images/products/white-corrugated-boxes.jpg" },
  { name: "Corrugated Cake Boxes", slug: "corrugated-cake-boxes", category: "Corrugated Boxes", section: "material", image: "/images/products/corrugated-cake-boxes.jpg" },
  { name: "Custom Shipping Boxes", slug: "custom-shipping-boxes", category: "Corrugated Boxes", section: "material", image: "/images/products/custom-shipping-boxes.jpg" },
  { name: "Double Wall Corrugated Boxes", slug: "double-wall-corrugated-boxes", category: "Corrugated Boxes", section: "material", image: "/images/products/double-wall-corrugated-boxes.jpg" },
  { name: "Custom Air Float Boxes", slug: "custom-air-float-boxes", category: "Corrugated Boxes", section: "material", image: "/images/products/custom-air-float-boxes.jpg" },
  { name: "Corrugated Mailer Boxes", slug: "corrugated-mailer-boxes", category: "Corrugated Boxes", section: "material", image: "/images/products/corrugated-mailer-boxes.jpg" },
  { name: "Corrugated Boxes with Lids", slug: "corrugated-boxes-with-lids", category: "Corrugated Boxes", section: "material", image: "/images/products/corrugated-boxes-with-lids.jpg" },
];

const kraftProducts: (Product & { image?: string })[] = [
  { name: "Kraft Paper Tubes", slug: "kraft-paper-tubes", category: "Kraft Boxes", section: "material", image: "/images/products/kraft-paper-tubes.jpg" },
  { name: "Kraft Boxes With Lids", slug: "kraft-boxes-with-lids", category: "Kraft Boxes", section: "material", image: "/images/products/kraft-boxes-with-lids.jpg" },
  { name: "Kraft Tin Tie Bags", slug: "kraft-tin-tie-bags", category: "Kraft Boxes", section: "material", image: "/images/products/kraft-tin-tie-bags.jpg" },
  { name: "Kraft Gift Boxes", slug: "kraft-gift-boxes", category: "Kraft Boxes", section: "material", image: "/images/products/kraft-gift-boxes.jpg" },
  { name: "Custom Kraft Window Boxes", slug: "kraft-window-boxes", category: "Kraft Boxes", section: "material", image: "/images/products/custom-kraft-window-boxes.jpg" },
  { name: "Kraft Bakery Boxes", slug: "kraft-bakery-boxes", category: "Kraft Boxes", section: "material", image: "/images/products/kraft-bakery-boxes.jpg" },
  { name: "White Kraft Boxes", slug: "white-kraft-boxes", category: "Kraft Boxes", section: "material", image: "/images/products/white-kraft-boxes.jpg" },
];

const mylarProducts: (Product & { image?: string })[] = [
  { name: "Mylar bags for Food Storage", slug: "mylar-bags-for-food-storage", category: "Mylar Bags", section: "material", image: "/images/products/mylar-bags-for-food-storage.jpg" },
  { name: "3.5 Mylar Bags", slug: "3.5-mylar-bags", category: "Mylar Bags", section: "material", image: "/images/products/3-5-mylar-bags.jpg" },
  { name: "Child Resistant Mylar Bags", slug: "child-resistant-mylar-bags", category: "Mylar Bags", section: "material", image: "/images/products/child-resistant-mylar-bags.jpg" },
  { name: "Mylar Vacuum Seal Bags", slug: "mylar-vacuum-seal-bags", category: "Mylar Bags", section: "material", image: "/images/products/mylar-vacuum-seal-bags.jpg" },
  { name: "Kraft Mylar Bags", slug: "kraft-mylar-bags", category: "Mylar Bags", section: "material", image: "/images/products/kraft-mylar-bags.jpg" },
  { name: "Cookies Mylar Bags", slug: "cookies-mylar-bags", category: "Mylar Bags", section: "material", image: "/images/products/cookies-mylar-bags.jpg" },
  { name: "Custom Ziplock Mylar Bags", slug: "ziplock-mylar-bags", category: "Mylar Bags", section: "material", image: "/images/products/ziplock-mylar-bags.jpg" },
  { name: "Custom Stand Up Pouches", slug: "stand-up-pouches", category: "Mylar Bags", section: "material", image: "/images/products/stand-up-pouches.jpg" },
  { name: "Custom Die Cut Mylar Bags", slug: "die-cut-mylar-bags", category: "Mylar Bags", section: "material", image: "/images/products/custom-die-cut-mylar-bags.jpg" },
];

const rigidProducts: (Product & { image?: string })[] = [
  { name: "Custom Booklet Boxes", slug: "custom-booklet-boxes", category: "Rigid Boxes", section: "material", image: "/images/products/custom-booklet-boxes.jpg" },
  { name: "custom Perfume Boxes", slug: "custom-perfume-boxes", category: "Rigid Boxes", section: "material", image: "/images/products/custom-perfume-boxes.jpg" },
  { name: "Magnetic Closure Boxes", slug: "magnetic-closure-boxes", category: "Rigid Boxes", section: "material", image: "/images/products/magnetic-closure-boxes.jpg" },
  { name: "Collapsible Rigid Boxes", slug: "collapsible-rigid-boxes", category: "Rigid Boxes", section: "material", image: "/images/products/collapsible-rigid-boxes.jpg" },
  { name: "Child Resistant Rigid Boxes", slug: "child-resistant-boxes", category: "Rigid Boxes", section: "material", image: "/images/products/child-resistant-boxes.jpg" },
  { name: "Two Piece Rigid Boxes", slug: "two-piece-rigid-boxes", category: "Rigid Boxes", section: "material", image: "/images/products/two-piece-rigid-boxes.jpg" },
  { name: "Custom Shoulder Boxes", slug: "custom-shoulder-boxes", category: "Rigid Boxes", section: "material", image: "/images/products/custom-shoulder-boxes.jpg" },
  { name: "Rigid Setup Boxes", slug: "rigid-setup-boxes", category: "Rigid Boxes", section: "material", image: "/images/products/rigid-setup-boxes.jpg" },
  { name: "Rigid Jewellery Boxes", slug: "rigid-jewellery-boxes", category: "Rigid Boxes", section: "material", image: "/images/products/rigid-jewellery-boxes.jpg" },
];

// ---------- 3. BOXES BY STYLE ----------

const stickerProducts: (Product & { image?: string })[] = [
  { name: "Custom Lenticular Stickers", slug: "custom-lenticular-stickers", category: "Custom Labels and Stickers", section: "style", image: "/images/products/custom-lenticular-stickers.jpg" },
  { name: "Custom Business Labels", slug: "custom-business-labels", category: "Custom Labels and Stickers", section: "style", image: "/images/products/custom-business-labels.jpg" },
  { name: "Custom Sticker Sheets", slug: "custom-sticker-sheets", category: "Custom Labels and Stickers", section: "style", image: "/images/products/custom-sticker-sheets.jpg" },
  { name: "Custom Holographic Stickers", slug: "custom-holographic-stickers", category: "Custom Labels and Stickers", section: "style", image: "/images/products/custom-holographic-stickers.jpg" },
  { name: "Custom Eco Safe Stickers", slug: "eco-safe-stickers", category: "Custom Labels and Stickers", section: "style", image: "/images/products/eco-safe-stickers.jpg" },
  { name: "Custom Vinyl Stickers", slug: "custom-vinyl-stickers", category: "Custom Labels and Stickers", section: "style", image: "/images/products/custom-vinyl-stickers.jpg" },
  { name: "Custom Circle Stickers", slug: "custom-circle-stickers", category: "Custom Labels and Stickers", section: "style", image: "/images/products/custom-circle-stickers.jpg" },
];

const mailerProducts: (Product & { image?: string })[] = [
  { name: "Colored Mailer Boxes | Custom Shipping Boxes Wholesale", slug: "colored-mailer-boxes", category: "Custom Mailer Boxes", section: "style", image: "/images/products/colored-mailer-boxes.jpg" },
  { name: "Kraft Mailer Boxes", slug: "kraft-mailer-boxes", category: "Custom Mailer Boxes", section: "style", image: "/images/products/kraft-mailer-boxes.jpg" },
  { name: "Tuck Top Mailer Boxes", slug: "tuck-top-mailer-boxes", category: "Custom Mailer Boxes", section: "style", image: "/images/products/tuck-top-mailer-boxes.jpg" },
];

const displayProducts: (Product & { image?: string })[] = [
  { name: "Retail Display Boxes", slug: "retail-display-boxes", category: "Display Boxes", section: "style", image: "/images/products/retail-display-boxes.jpg" },
  { name: "Counter Display Boxes", slug: "counter-display-boxes", category: "Display Boxes", section: "style", image: "/images/products/counter-display-boxes.jpg" },
  { name: "Candle Display Boxes", slug: "candle-display-boxes", category: "Display Boxes", section: "style", image: "/images/products/candle-display-boxes.jpg" },
  { name: "CBD Display Boxes", slug: "cbd-display-boxes", category: "Display Boxes", section: "style", image: "/images/products/cbd-display-boxes.jpg" },
];

const gableProducts: (Product & { image?: string })[] = [
  { name: "Gable Box With Window", slug: "gable-box-with-window", category: "Gable Boxes", section: "style", image: "/images/products/gable-box-with-window.jpg" },
  { name: "Kraft Gable Boxes", slug: "kraft-gable-boxes", category: "Gable Boxes", section: "style", image: "/images/products/kraft-gable-boxes.jpg" },
  { name: "Christmas Gable Boxes", slug: "christmas-gable-boxes", category: "Gable Boxes", section: "style", image: "/images/products/christmas-gable-boxes.jpg" },
  { name: "Large Gable Boxes", slug: "large-gable-boxes", category: "Gable Boxes", section: "style", image: "/images/products/large-gable-boxes.jpg" },
  { name: "3D Gable Boxes", slug: "3d-gable-boxes", category: "Gable Boxes", section: "style", image: "/images/products/3d-gable-boxes.jpg" },
  { name: "Gable Gift Boxes", slug: "gable-gift-boxes", category: "Gable Boxes", section: "style", image: "/images/products/gable-gift-boxes.jpg" },
  { name: "Cardboard Gable Boxes", slug: "cardboard-gable-boxes", category: "Gable Boxes", section: "style", image: "/images/products/cardboard-gable-boxes.jpg" },
  { name: "White Gable Boxes", slug: "white-gable-boxes", category: "Gable Boxes", section: "style", image: "/images/products/white-gable-boxes.jpg" },
];

const pillowProducts: (Product & { image?: string })[] = [
  { name: "Kraft Pillow Boxes", slug: "kraft-pillow-boxes", category: "Pillow Boxes", section: "style", image: "/images/products/kraft-pillow-boxes.jpg" },
  { name: "Pillow Gift Boxes", slug: "pillow-gift-boxes", category: "Pillow Boxes", section: "style", image: "/images/products/pillow-gift-boxes.jpg" },
  { name: "Candy Pillow Boxes", slug: "candy-pillow-boxes", category: "Pillow Boxes", section: "style", image: "/images/products/candy-pillow-boxes.jpg" },
  { name: "Cardboard Pillow boxes", slug: "cardboard-pillow-boxes", category: "Pillow Boxes", section: "style", image: "/images/products/cardboard-pillow-boxes.jpg" },
];

const tubeProducts: (Product & { image?: string })[] = [
  { name: "Black Tube Packaging", slug: "black-tube-packaging", category: "Tube Packaging", section: "style", image: "/images/products/black-tube-packaging.jpg" },
  { name: "Cookie Tube Packaging", slug: "cookie-tube-packaging", category: "Tube Packaging", section: "style", image: "/images/products/cookie-tube-packaging.jpg" },
  { name: "Candle Tube Packaging", slug: "candle-tube-packaging", category: "Tube Packaging", section: "style", image: "/images/products/candle-tube-packaging.jpg" },
];

const tuckProducts: (Product & { image?: string })[] = [
  { name: "Reverse Tuck Boxes", slug: "reverse-tuck-boxes", category: "Tuck Boxes", section: "style", image: "/images/products/reverse-tuck-boxes.jpg" },
  { name: "Custom Tuck Top Boxes", slug: "tuck-top-boxes", category: "Tuck Boxes", section: "style", image: "/images/products/tuck-top-boxes.jpg" },
  { name: "Custom Tuck End Boxes", slug: "custom-tuck-end-boxes", category: "Tuck Boxes", section: "style", image: "/images/products/custom-tuck-end-boxes.jpg" },
];

export const categories: Category[] = [
  // ── 1. Boxes by Industry ──
  {
    name: "Bakery Boxes",
    slug: "bakery-boxes",
    section: "industry",
    description: "Custom bakery boxes designed to keep your baked goods fresh and beautifully presented. From donut boxes to cake packaging.",
    products: bakeryProducts,
  },
  {
    name: "Candle Boxes",
    slug: "custom-candle-boxes",
    section: "industry",
    description: "Premium candle packaging that protects fragile products while creating a luxurious unboxing experience.",
    products: candleProducts,
  },
  {
    name: "Coffee Packaging",
    slug: "custom-coffee-packaging",
    section: "industry",
    description: "Specialty coffee packaging from pouches to sleeves. Keep your beans fresh and brand front-and-center.",
    products: coffeeProducts,
  },
  {
    name: "Cosmetic Boxes",
    slug: "custom-cosmetic-boxes",
    section: "industry",
    description: "Elegant and luxury cosmetic packaging boxes tailored for makeup, beauty, skincare, and fragrances.",
    products: cosmeticProducts,
  },
  {
    name: "Custom Cigarette Boxes",
    slug: "custom-cigarette-boxes",
    section: "industry",
    description: "Custom printed cigarette and pre-roll boxes with durable flip-top structures and premium foil finishes.",
    products: cigaretteProducts,
  },
  {
    name: "Custom Jewelry Boxes",
    slug: "custom-jewelry-boxes",
    section: "industry",
    description: "High-end luxury jewelry packaging boxes crafted for rings, necklaces, bracelets, and watches.",
    products: jewelryProducts,
  },
  {
    name: "Custom Retail Boxes",
    slug: "custom-retail-boxes",
    section: "industry",
    description: "Versatile retail packaging boxes that make products pop on physical shelves and e-commerce stores.",
    products: retailProducts,
  },
  {
    name: "Custom Wax Papers",
    slug: "custom-wax-papers",
    section: "industry",
    description: "FDA-approved custom printed wax paper and deli wraps for restaurants, burgers, bakeries, and food carts.",
    products: waxPaperProducts,
  },
  {
    name: "Soap Boxes",
    slug: "custom-soap-boxes",
    section: "industry",
    description: "Eco-friendly and visually stunning soap packaging. Handcrafted soaps deserve packaging that matches their quality.",
    products: soapProducts,
  },

  // ── 2. Boxes by Material ──
  {
    name: "Cardboard Boxes",
    slug: "custom-cardboard-boxes",
    section: "material",
    description: "Versatile cardboard packaging for every need. Lightweight yet strong, fully customizable.",
    products: cardboardProducts,
  },
  {
    name: "Corrugated Boxes",
    slug: "custom-corrugated-boxes",
    section: "material",
    description: "Heavy-duty corrugated shipping and packaging boxes built for maximum protection and durability.",
    products: corrugatedProducts,
  },
  {
    name: "Kraft Boxes",
    slug: "custom-kraft-boxes",
    section: "material",
    description: "Eco-friendly kraft packaging that combines natural aesthetics with durability. 100% recyclable.",
    products: kraftProducts,
  },
  {
    name: "Mylar Bags",
    slug: "custom-mylar-bags",
    section: "material",
    description: "High-barrier smell-proof mylar bags that protect against moisture, light, and oxygen.",
    products: mylarProducts,
  },
  {
    name: "Rigid Boxes",
    slug: "custom-rigid-boxes",
    section: "material",
    description: "Premium rigid boxes built for luxury products. Magnetic closures, satin linings, and flawless finishing.",
    products: rigidProducts,
  },

  // ── 3. Boxes by Style ──
  {
    name: "Custom Labels and Stickers",
    slug: "custom-labels-and-stickers",
    section: "style",
    description: "Custom printed roll labels, die-cut vinyl stickers, and waterproof product labels.",
    products: stickerProducts,
  },
  {
    name: "Custom Mailer Boxes",
    slug: "custom-mailer-boxes",
    section: "style",
    description: "E-commerce ready mailer boxes designed for the perfect unboxing experience. Custom printed inside and out.",
    products: mailerProducts,
  },
  {
    name: "Display Boxes",
    slug: "custom-display-boxes",
    section: "style",
    description: "Counter and retail display boxes that showcase your products beautifully for maximum shelf impact.",
    products: displayProducts,
  },
  {
    name: "Gable Boxes",
    slug: "custom-gable-boxes",
    section: "style",
    description: "Easy-carry gable boxes with built-in handles. Perfect for gift packaging and food takeaway.",
    products: gableProducts,
  },
  {
    name: "Pillow Boxes",
    slug: "custom-pillow-boxes",
    section: "style",
    description: "Elegant pillow-shaped packaging perfect for gifts, jewelry, cosmetics, and small items.",
    products: pillowProducts,
  },
  {
    name: "Tube Packaging",
    slug: "custom-tube-packaging",
    section: "style",
    description: "Cylindrical tube packaging for candles, cosmetics, and luxury goods. Eco-friendly paperboard.",
    products: tubeProducts,
  },
  {
    name: "Tuck Boxes",
    slug: "custom-tuck-boxes",
    section: "style",
    description: "Classic tuck-end boxes in every variety — reverse tuck, snap lock, straight tuck.",
    products: tuckProducts,
  },
];

// Helper functions
export const getCategoryBySlug = (slug: string) => {
  if (!slug) return undefined;
  const clean = slug.toLowerCase().trim();
  const direct = categories.find((c) => c.slug.toLowerCase() === clean);
  if (direct) return direct;

  const withCustom = clean.startsWith("custom-") ? clean : `custom-${clean}`;
  const withoutCustom = clean.replace(/^custom-/, "");

  return (
    categories.find((c) => c.slug.toLowerCase() === withCustom) ||
    categories.find((c) => c.slug.toLowerCase() === withoutCustom) ||
    categories.find(
      (c) =>
        c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === withoutCustom ||
        c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === withCustom
    )
  );
};

export const getProductBySlug = (slug: string) => {
  for (const cat of categories) {
    const product = cat.products.find((p) => p.slug === slug);
    if (product) return { product, category: cat };
  }
  return null;
};

export const getCategoriesBySection = (section: "industry" | "material" | "style") =>
  categories.filter((c) => c.section === section);

export const getAllProducts = () =>
  categories.flatMap((c) => c.products);

import { PRODUCT_TAGS_MAP } from "./product-tags";

export const getProductTag = (slug: string, categorySlug?: string): string => {
  if (PRODUCT_TAGS_MAP[slug]) {
    return PRODUCT_TAGS_MAP[slug];
  }

  if (categorySlug) {
    const cat = getCategoryBySlug(categorySlug);
    if (cat) {
      const idx = cat.products.findIndex((p) => p.slug === slug);
      if (idx !== -1) {
        return `F${100 + idx} — Custom Packaging`;
      }
    }
  }

  for (const cat of categories) {
    const idx = cat.products.findIndex((p) => p.slug === slug);
    if (idx !== -1) {
      return `F${100 + idx} — Custom Packaging`;
    }
  }

  return "F100 — Custom Packaging";
};
