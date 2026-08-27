export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  badge?: string;
  moq: string;
  turnaround: string;
  material: string;
  features: string[];
  specs: {
    dimensions: string;
    materials: string[];
    thickness: string[];
    printing: string[];
    finishes: string[];
  };
  faqs: { question: string; answer: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  rating: number;
  highlight: string;
  content: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
}

export const SITE_CONFIG = {
  name: "HOF Pack",
  tagline: "Custom Packaging That Defines Your Brand!",
  description: "Premium custom packaging boxes, mylar bags, and mailer boxes with low MOQ and free design support. Ships across the USA.",
  phone: "+1 (888) 429 4881",
  email: "info@hofpack.com",
  address: "3700 W Tybolt Dr, Tucson, AZ 85746, USA",
  rating: {
    score: "4.9",
    totalReviews: "5,200+",
    source: "Trustpilot & Google",
  },
  announcements: [
    "🎉 Flat 20% Off on Your First Order",
    "Free Shipping on All Orders Across the USA",
    "Fastest Turnaround: 8 to 12 Days Delivery",
    "Low MOQ Starting at 100 Units",
    "Free 3D Digital Mockup & Unlimited Revisions",
  ],
  socials: {
    facebook: "https://www.facebook.com/people/HOF-Pack/61583706969172/",
    instagram: "https://www.instagram.com/hofpack/?hl=en",
    linkedin: "https://www.linkedin.com/company/hofpack",
    twitter: "https://twitter.com/hofpack",
  },
};

export const BRAND_CLIENTS = [
  { name: "ShopMax", logo: "ShopMax" },
  { name: "NatureCo", logo: "NatureCo" },
  { name: "TechStart", logo: "TechStart" },
  { name: "LuxeLife", logo: "LuxeLife" },
  { name: "GreenBox", logo: "GreenBox" },
  { name: "PackWell", logo: "PackWell" },
  { name: "EcoCrate", logo: "EcoCrate" },
  { name: "Gilead", logo: "Gilead" },
  { name: "Cheerros", logo: "Cheerros" },
  { name: "RareBeauty", logo: "RareBeauty" },
];

export const CATEGORIES: Category[] = [
  {
    id: "mailer-boxes",
    name: "Custom Mailer Boxes",
    slug: "custom-mailer-boxes",
    tagline: "Durable, stylish corrugated mailers for e-commerce and subscription kits",
    description: "Our custom mailer boxes combine robust corrugated protection with full-color edge-to-edge branding inside and out. Ideal for e-commerce shipments, subscription unboxings, and gift sets.",
    image: "/assets/cat-mailer-boxes.jpg",
    badge: "Most Popular",
    moq: "100 Units",
    turnaround: "8-12 Days",
    material: "E-flute / B-flute Corrugated",
    features: [
      "Interlocking tuck flap design (no tape needed)",
      "High crush resistance for transit protection",
      "Full inside and outside HD CMYK printing",
      "FSC-certified eco-friendly Kraft or White stock",
    ],
    specs: {
      dimensions: "Fully customizable (from 3\"x3\"x1.5\" to 20\"x16\"x6\")",
      materials: ["Standard White Corrugated", "Premium Kraft Corrugated", "Heavy Duty B-Flute"],
      thickness: ["1/16\" (E-Flute)", "1/8\" (B-Flute)"],
      printing: ["Full Color Outside Only", "Full Color Inside & Outside", "Spot PMS Inks"],
      finishes: ["Matte Lamination", "Gloss Finish", "Spot UV Coating", "Foil Stamping"],
    },
    faqs: [
      {
        question: "Do mailer boxes need tape to assemble?",
        answer: "No, our mailer boxes feature self-locking roll-end tuck fronts that assemble in seconds without tape or glue.",
      },
      {
        question: "Can I print inside the mailer box?",
        answer: "Yes! We offer full dual-sided printing so you can add thank you notes, brand storytelling, or patterns inside the lid.",
      },
    ],
  },
  {
    id: "rigid-boxes",
    name: "Custom Rigid Boxes",
    slug: "custom-rigid-boxes",
    tagline: "Ultra-premium luxury boxes with magnetic closures and thick chipboard",
    description: "Make an unforgettable luxury statement with custom rigid boxes. Engineered from dense chipboard wrapped in premium art paper with optional magnetic closures, foil accents, and custom foam inserts.",
    image: "/assets/hero-rigid-boxes.png",
    badge: "Luxury Grade",
    moq: "100 Units",
    turnaround: "10-14 Days",
    material: "1200-1800 GSM Greyboard",
    features: [
      "Magnetic flap closure or 2-piece lid & base",
      "Rigid non-collapsible heavy-duty structure",
      "Gold/Silver metallic hot foil stamping",
      "Custom velvet or EVA foam inserts",
    ],
    specs: {
      dimensions: "Custom tailored to product dimensions",
      materials: ["1200 GSM Greyboard", "1500 GSM Premium Board", "Specialty Textured Paper"],
      thickness: ["2mm Heavy Board", "3mm Ultra-Rigid Board"],
      printing: ["4-Color Offset CMYK", "Pantone Spot Matching", "Metallic Inks"],
      finishes: ["Soft-Touch Velvet Lamination", "Hot Foil Stamping", "Embossing / Debossing", "Spot UV"],
    },
    faqs: [
      {
        question: "Are rigid boxes shipped flat or assembled?",
        answer: "Rigid boxes are shipped fully assembled and ready for product loading, unless collapsible magnetic style is requested.",
      },
    ],
  },
  {
    id: "kraft-boxes",
    name: "Custom Kraft Boxes",
    slug: "custom-kraft-boxes",
    tagline: "100% recyclable, rustic organic packaging made from post-consumer fiber",
    description: "Showcase your eco-conscious ethos with naturally textured Kraft boxes. Made from 100% recycled paperboard printed with plant-based soy inks for an earthy, minimalist aesthetic.",
    image: "/assets/cat-kraft-boxes.jpg",
    badge: "100% Eco-Friendly",
    moq: "100 Units",
    turnaround: "8-10 Days",
    material: "Natural Brown Kraft Stock",
    features: [
      "100% biodegradable and compostable",
      "Natural unbleached wood fiber texture",
      "Crisp soy ink printing in black, white, or color",
      "FSC certified sustainably harvested material",
    ],
    specs: {
      dimensions: "All standard and custom sizes available",
      materials: ["Natural Brown Kraft", "Bleached White Kraft", "Kraft Corrugated"],
      thickness: ["16pt (350 GSM)", "18pt (400 GSM)", "24pt (500 GSM)"],
      printing: ["Single Color Eco Ink", "Full Color CMYK", "Opaque White Ink on Kraft"],
      finishes: ["Raw Natural Matte", "Spot UV", "Blind Embossing", "Gold Foil"],
    },
    faqs: [
      {
        question: "Can white ink be printed onto brown Kraft paper?",
        answer: "Yes, our advanced printing presses feature high-opacity white ink that pops vibrantly on brown Kraft stock.",
      },
    ],
  },
  {
    id: "mylar-bags",
    name: "Custom Mylar Bags",
    slug: "custom-mylar-bags",
    tagline: "Aroma-tight, moisture-proof barrier pouches with resealable zippers",
    description: "Keep snacks, coffee, cosmetics, and botanical products fresh with barrier foil Mylar pouches. Features airtight ziplocks, tear notches, hang holes, and optional clear display windows.",
    image: "/assets/cat-mylar-bags.jpg",
    badge: "Aroma Proof",
    moq: "100 Units",
    turnaround: "8-12 Days",
    material: "Multi-layer Barrier Foil / PET / PE",
    features: [
      "Airtight resealable press-to-close zipper",
      "Oxygen, odor, and moisture barrier protection",
      "Matte, glossy, or holographic foil finishes",
      "Heat-sealable top with easy tear notches",
    ],
    specs: {
      dimensions: "1g, 3.5g, 7g, 14g, 28g (1oz), 1/2lb, 1lb, and custom sizes",
      materials: ["Matte Foil Laminate", "Glossy Poly", "Kraft Foil Barrier", "Holographic Film"],
      thickness: ["4 mil", "5 mil", "6 mil Heavy Duty"],
      printing: ["High-Def Digital Printing", "Rotogravure Full Coverage", "Spot Metallic"],
      finishes: ["Soft-Touch Matte", "Gloss Finish", "Holographic Foil", "Clear Window"],
    },
    faqs: [
      {
        question: "Are your Mylar bags smell-proof?",
        answer: "Yes, our multi-layer barrier foil films provide complete odor and moisture barriers when sealed.",
      },
    ],
  },
  {
    id: "tuck-boxes",
    name: "Custom Tuck Boxes",
    slug: "custom-tuck-boxes",
    tagline: "Classic folding carton boxes for cosmetics, medicines, and retail goods",
    description: "Versatile folding cartons engineered for retail shelves and lightweight product packaging. Features straight tuck or reverse tuck closures for swift automated or manual assembly.",
    image: "/assets/cat-tuck-boxes.jpg",
    badge: "Retail Standard",
    moq: "100 Units",
    turnaround: "8-10 Days",
    material: "16pt - 24pt SBS Cardstock",
    features: [
      "Straight tuck, reverse tuck, or auto-lock bottom",
      "Lightweight yet sturdy for retail shelf display",
      "Vibrant high-gloss or matte coatings",
      "Die-cut custom window cutouts available",
    ],
    specs: {
      dimensions: "Custom sized to your exact bottle, jar, or product",
      materials: ["SBS Paperboard", "Recycled CCNB", "Kraft Folding Board", "Metallic Board"],
      thickness: ["14pt", "16pt (Standard)", "18pt", "24pt"],
      printing: ["Full CMYK Color", "PMS Spot Color", "Inside Pattern Printing"],
      finishes: ["High Gloss UV", "Soft Touch Matte", "Embossing", "Holographic Foil"],
    },
    faqs: [
      {
        question: "What is the difference between straight tuck and reverse tuck?",
        answer: "Straight tuck boxes have both top and bottom flaps folding toward the same side, while reverse tuck flaps fold in opposite directions.",
      },
    ],
  },
  {
    id: "bakery-boxes",
    name: "Custom Bakery Boxes",
    slug: "bakery-boxes",
    tagline: "Food-safe grease-resistant packaging for cakes, pastries, and donuts",
    description: "Keep baked delights fresh and presentable with FDA-compliant food-grade bakery boxes. Available with crystal-clear viewing windows, auto-pop bottoms, and grease-resistant coatings.",
    image: "/assets/cat-bakery-boxes.jpg",
    badge: "Food Safe",
    moq: "100 Units",
    turnaround: "8-12 Days",
    material: "Food-Grade SBS & Kraft",
    features: [
      "FDA certified food contact safe",
      "Grease-resistant barrier coating",
      "Clear PET viewing window",
      "Auto-lock pop-up assembly",
    ],
    specs: {
      dimensions: "Cake sizes (6\", 8\", 10\", 12\"), Cupcake 4/6/12 packs, Pastry boxes",
      materials: ["Food-Grade Bleached White SBS", "Unbleached Natural Kraft"],
      thickness: ["16pt", "18pt", "20pt Heavy Food Board"],
      printing: ["Food-Safe Soy Inks", "Full Exterior CMYK", "Spot Color"],
      finishes: ["Aqueous Coating", "Matte Lamination", "Clear Window Patching"],
    },
    faqs: [
      {
        question: "Are the inks food-safe?",
        answer: "Yes, we use food-safe, odorless soy-based vegetable inks compliant with FDA guidelines.",
      },
    ],
  },
  {
    id: "candle-boxes",
    name: "Custom Candle Boxes",
    slug: "custom-candle-boxes",
    tagline: "Sturdy luxury candle packaging with protective inserts and premium foils",
    description: "Elevate your artisanal candles with luxury candle boxes. Engineered to withstand heavy glass jar weights while creating a sensational unboxing experience with soft-touch finishes.",
    image: "/assets/cat-candle-boxes.jpg",
    badge: "Heavy Duty",
    moq: "100 Units",
    turnaround: "8-12 Days",
    material: "18pt Cardstock or Rigid Board",
    features: [
      "Custom snug fit for 4oz, 8oz, 12oz, 16oz candle jars",
      "Reinforced base support prevents sagging",
      "Metallic foil stamping & embossed logo details",
      "Optional custom protective cardboard/foam insert",
    ],
    specs: {
      dimensions: "Custom tailored for any jar diameter and height",
      materials: ["Heavy 18pt-24pt SBS", "Corrugated E-Flute", "Luxury Rigid Greyboard"],
      thickness: ["18pt", "24pt", "2mm Rigid"],
      printing: ["Full CMYK Color", "Metallic Pantone", "Dual Sided Print"],
      finishes: ["Soft Touch Velvet", "Foil Stamping (Gold/Rose Gold/Silver)", "Spot UV"],
    },
    faqs: [
      {
        question: "Can these boxes hold heavy 16oz candle jars?",
        answer: "Yes, we use reinforced corrugated or heavy 24pt board with crash-lock bottoms rated for heavy glass vessels.",
      },
    ],
  },
  {
    id: "soap-boxes",
    name: "Custom Soap Boxes",
    slug: "custom-soap-boxes",
    tagline: "Natural, breathable packaging for handmade and organic soaps",
    description: "Custom soap packaging designed with die-cut scent windows, Kraft textures, and moisture-resistant paperboards. Perfect for organic bar soaps, bath bombs, and cosmetics.",
    image: "/assets/cat-soap-boxes.jpg",
    badge: "Scent Window",
    moq: "100 Units",
    turnaround: "8-10 Days",
    material: "Recycled Kraft / SBS Cardstock",
    features: [
      "Custom die-cut window lets customers smell the soap",
      "Moisture-resistant coating prevents paper softening",
      "Eco-friendly 100% biodegradable Kraft option",
      "Quick-tuck closure for fast packaging",
    ],
    specs: {
      dimensions: "Standard bar sizes (3.5\"x2.5\"x1\") and custom molds",
      materials: ["Recycled Kraft Board", "16pt White SBS", "Textured Linen Board"],
      thickness: ["16pt", "18pt"],
      printing: ["Eco Soy Inks", "Full CMYK", "Pantone Match"],
      finishes: ["Matte", "Gloss", "Window Die-Cut", "Embossed"],
    },
    faqs: [
      {
        question: "Can I get a custom die-cut shape for the window?",
        answer: "Yes! You can choose circles, ovals, leaves, hexagons, or your custom brand silhouette.",
      },
    ],
  },
  {
    id: "coffee-packaging",
    name: "Custom Coffee Packaging",
    slug: "custom-coffee-packaging",
    tagline: "Degassing valve pouches and artisan boxes for whole bean & ground coffee",
    description: "Preserve roast freshness and aromatic oils with high-barrier coffee pouches featuring one-way degassing valves and airtight zip closures.",
    image: "/assets/cat-coffee-packaging.jpg",
    badge: "Degassing Valve",
    moq: "100 Units",
    turnaround: "10-12 Days",
    material: "Foil Barrier / Kraft Laminate",
    features: [
      "Built-in one-way Swiss degassing valve",
      "Resealable pocket zipper with easy-pull tab",
      "Flat bottom or stand-up pouch structure",
      "High oxygen and UV barrier protection",
    ],
    specs: {
      dimensions: "250g (8oz), 500g (12oz), 1kg (2.2lb), 5lb bags",
      materials: ["Natural Kraft Foil", "Matte Poly Barrier", "Recyclable PE Mono-Material"],
      thickness: ["4.5 mil", "5.5 mil"],
      printing: ["HD Digital Print", "Rotogravure Full Wrap", "Metallic Accents"],
      finishes: ["Soft Touch Matte", "Gloss", "Spot UV", "Tin-Tie Closure"],
    },
    faqs: [
      {
        question: "How does the degassing valve work?",
        answer: "The valve allows naturally released CO2 from roasted coffee to escape without letting outside oxygen in, keeping beans peak fresh.",
      },
    ],
  },
  {
    id: "corrugated-boxes",
    name: "Custom Corrugated Boxes",
    slug: "custom-corrugated-boxes",
    tagline: "Heavy-duty shipping and master carton boxes with custom exterior print",
    description: "Engineered for maximum stack strength and freight shipping. Protect bulk goods and retail orders with single-wall or double-wall corrugated master shipping cartons.",
    image: "/assets/hero-kraft-boxes.png",
    badge: "Heavy Duty",
    moq: "100 Units",
    turnaround: "8-12 Days",
    material: "Single / Double Wall Corrugated",
    features: [
      "High Edge Crush Test (ECT) ratings for pallet stacking",
      "Regular Slotted Carton (RSC) standard or custom cuts",
      "Water-based flexographic or HD digital printing",
      "100% recyclable post-consumer corrugated board",
    ],
    specs: {
      dimensions: "From small parcel boxes to large 36\" shipping crates",
      materials: ["32 ECT Single Wall", "44 ECT Heavy Single Wall", "275# Double Wall"],
      thickness: ["1/8\" (B-Flute)", "3/16\" (C-Flute)", "5/16\" (BC-Flute Double Wall)"],
      printing: ["Flexo Direct Print", "Digital Full Color", "High-Gloss Litho Laminate"],
      finishes: ["Standard Kraft", "Bleached White", "Water-Resistant Varnish"],
    },
    faqs: [
      {
        question: "What ECT rating should I choose?",
        answer: "32 ECT is ideal for shipments up to 30 lbs, while 44 ECT or Double Wall is recommended for 40+ lbs or fragile goods.",
      },
    ],
  },
  {
    id: "cosmetic-boxes",
    name: "Custom Cosmetic Boxes",
    slug: "cosmetic-boxes",
    tagline: "Elegant beauty & skincare packaging with luxury foil and embossed accents",
    description: "Elevate your beauty brand with sleek cosmetic boxes. Tailored for serums, lotions, lipsticks, and creams with luxury coatings, metallic accents, and pristine color matching.",
    image: "/assets/ind-cosmetics.jpg",
    badge: "Beauty Grade",
    moq: "100 Units",
    turnaround: "8-10 Days",
    material: "18pt SBS Paperboard",
    features: [
      "Pristine vibrant CMYK & Pantone color matching",
      "Soft-touch velvet finish with gold or holographic foil",
      "Custom internal bottle/jar support collar",
      "Ultra-crisp fold lines and tight closure fit",
    ],
    specs: {
      dimensions: "Custom fit for dropper bottles, tubes, compacts, and jars",
      materials: ["16pt-20pt C1S/C2S Cardstock", "Silver/Gold Foil Board", "Textured Paper"],
      thickness: ["16pt", "18pt", "20pt"],
      printing: ["Offset High-Res CMYK", "Spot UV", "Pantone Inks"],
      finishes: ["Soft-Touch Matte", "Gloss UV", "Hot Foil Stamping", "Embossing"],
    },
    faqs: [
      {
        question: "Can I get internal dividers for cosmetic sets?",
        answer: "Yes, we can design custom paperboard or foam insert trays to hold multiple cosmetic items securely.",
      },
    ],
  },
  {
    id: "display-boxes",
    name: "Custom Display Boxes",
    slug: "custom-display-boxes",
    tagline: "Point-of-sale (POS) counter display boxes designed to drive impulse buys",
    description: "Turn packaging into instant countertop retail displays. Tear-off perforated header cards and tiered stair-step trays make your products stand out at checkout counters.",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
    badge: "POS Ready",
    moq: "100 Units",
    turnaround: "8-12 Days",
    material: "Heavy Corrugated & Cardstock",
    features: [
      "Perforated lid folds back into vibrant branded header",
      "Tiered stair-step product organization",
      "High structural rigidity for store counter use",
      "Ships flat for economical shipping and storage",
    ],
    specs: {
      dimensions: "Customized for counter footprint and product count",
      materials: ["Heavy B-Flute Corrugated", "24pt SBS Paperboard"],
      thickness: ["E-Flute", "B-Flute"],
      printing: ["High-Gloss Full Color Outside", "Header Card Double-Sided"],
      finishes: ["High Gloss Lamination", "Matte", "Spot UV"],
    },
    faqs: [
      {
        question: "Does the display box ship flat?",
        answer: "Yes, all display boxes ship flat and pop up into rigid display fixtures in under 15 seconds.",
      },
    ],
  },
];

export const SUSTAINABILITY_PILLARS = [
  {
    id: "sus-1",
    title: "Recycled & Biodegradable",
    description: "FSC-certified stock options across all product lines, utilizing up to 100% post-consumer fibers.",
    icon: "TreePine",
    stat: "100%",
    statLabel: "Recyclable Materials",
  },
  {
    id: "sus-2",
    title: "Cruelty-Free Inks",
    description: "Soy-based, vegan inks that deliver vibrant, rich colors without harmful heavy metals or petroleum solvents.",
    icon: "Sparkles",
    stat: "100%",
    statLabel: "Plant-Based Inks",
  },
  {
    id: "sus-3",
    title: "Fully Recyclable",
    description: "Every box we ship can be recycled or composted in standard municipal recycling programs.",
    icon: "Recycle",
    stat: "0",
    statLabel: "Animal Testing",
  },
  {
    id: "sus-4",
    title: "Responsible Sourcing",
    description: "Certified sustainable supply chain from raw material harvesting to delivery at your doorstep.",
    icon: "ShieldCheck",
    stat: "100%",
    statLabel: "Certified Facilities",
  },
];

export const WHY_CHOOSE_US = [
  {
    id: "why-1",
    title: "Eco-Friendly Packaging That Builds Customer Trust",
    description: "Going green is no longer a differentiator; it's a necessity. We use FSC-certified stock and water/soy-based inks so your customers feel great opening your boxes.",
    stat: "100%",
    statLabel: "Eco-Certified",
  },
  {
    id: "why-2",
    title: "Best Price, Guaranteed (Price Match)",
    description: "Premium packaging at prices that make sense. Bring us any comparable quote and we will match or beat it.",
    stat: "Price Match",
    statLabel: "Guaranteed",
  },
  {
    id: "why-3",
    title: "Dedicated Account Manager",
    description: "One real person who knows your project inside out. Call, email, or text whenever you need updates or adjustments.",
    stat: "< 2h",
    statLabel: "Average Response",
  },
  {
    id: "why-4",
    title: "Fastest Turnaround: 8 to 12 Days Delivery",
    description: "We build buffer into every single production run so your custom packaging arrives at your door ahead of deadline.",
    stat: "8-12",
    statLabel: "Day Delivery",
  },
  {
    id: "why-5",
    title: "Low MOQ Starting at 100 Units",
    description: "Scale on your own terms. Test new product lines or limited-edition runs without committing to thousands of units.",
    stat: "100",
    statLabel: "Minimum Units",
  },
  {
    id: "why-6",
    title: "Free 3D Digital Mockups & Revisions",
    description: "See exactly how your packaging looks before anything goes to print. Make unlimited revisions until it's 100% perfect.",
    stat: "Free",
    statLabel: "Design Proofs",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Design & Consultation",
    description: "Share your dimensions and artwork ideas. Our structural designers create custom dielines and concepts with zero commitment.",
    points: ["Free creative consultation", "Custom dieline templates", "Artwork pre-flight check"],
  },
  {
    step: "02",
    title: "Realistic 3D Digital Mockup",
    description: "Review a photorealistic 3D rendering of your box. Inspect colors, fold angles, textures, and finishes before printing.",
    points: ["High-res 360° 3D preview", "Review print & color layout", "Unlimited design revisions"],
  },
  {
    step: "03",
    title: "Precision Production",
    description: "Your order goes into production with advanced CMYK/PMS offset presses. Every batch undergoes multi-point quality inspection.",
    points: ["High-definition offset printing", "Strict color consistency check", "Crush and durability testing"],
  },
  {
    step: "04",
    title: "Doorstep Delivery",
    description: "We pack your boxes securely and ship them direct to your door with live tracking and free shipping across the USA.",
    points: ["Free shipping on all orders", "Transit-safe protective packing", "8 to 12 day standard delivery"],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "tm-1",
    name: "Sarah M.",
    company: "Glow Cosmetics",
    role: "Founder & Creative Director",
    rating: 5,
    highlight: "Customers notice the difference immediately",
    content: "We switched to HOF Pack last year and the difference is night and day. Our customers actually comment on how luxurious the unboxing feels on TikTok. The soft-touch coating and rose gold foil look breathtaking.",
  },
  {
    id: "tm-2",
    name: "James L.",
    company: "TechGear Pro",
    role: "Head of Operations",
    rating: 5,
    highlight: "Small runs, big brand quality",
    content: "As a fast-growing startup, we needed small quantities without sacrificing quality. HOF Pack delivered 250 mailer boxes that looked like we ordered 25,000. Super sturdy and arrived 2 days ahead of schedule.",
  },
  {
    id: "tm-3",
    name: "Maria R.",
    company: "Organic Eats & Snacks",
    role: "Product Manager",
    rating: 5,
    highlight: "Real eco commitment that we can verify",
    content: "They actually use recycled materials and soy inks. It's not just marketing talk. The boxes arrived crisp, beautifully printed, and our customers love that everything is compostable.",
  },
  {
    id: "tm-4",
    name: "David K.",
    company: "LuxeWick Candles",
    role: "Owner",
    rating: 5,
    highlight: "Elevated our candles into a luxury tier",
    content: "The rigid boxes with magnetic closures blew us away. People think we're a high-end Nordstrom brand now. The quality and structural rigidity are simply unbeatable.",
  },
  {
    id: "tm-5",
    name: "Emily T.",
    company: "Rise & Grind Coffee Roasters",
    role: "Co-Founder",
    rating: 5,
    highlight: "Three-time repeat customer and counting",
    content: "From our first quote to delivery, the communication was stellar. The degassing valve coffee pouches keep our single-origin beans super fresh and the matte print finish is flawless.",
  },
  {
    id: "tm-6",
    name: "Alex B.",
    company: "Urban Botanicals",
    role: "Brand Director",
    rating: 5,
    highlight: "Best price match and dedicated support",
    content: "HOF Pack beat our previous supplier's pricing by 18% while giving us faster delivery and a dedicated account rep. We've placed 4 reorders this year already.",
  },
];

export const FAQS = [
  {
    question: "What is your Minimum Order Quantity (MOQ)?",
    answer: "Our minimum order quantity starts as low as 100 units across most custom packaging styles, allowing emerging brands to scale without huge upfront capital.",
  },
  {
    question: "How long does production and shipping take?",
    answer: "Our standard turnaround time is 8 to 12 business days from the moment you approve your digital 3D proof. Rush production is also available for tight deadlines.",
  },
  {
    question: "Is shipping really free?",
    answer: "Yes! We offer free standard flat-rate shipping on all custom box and packaging orders across the contiguous United States with zero hidden freight fees.",
  },
  {
    question: "Do you provide free design support and 3D mockups?",
    answer: "Absolutely. Once you provide your product dimensions and branding assets, our structural team will create a photorealistic 3D digital mockup with unlimited revisions until you are completely satisfied.",
  },
  {
    question: "What file formats do you accept for artwork?",
    answer: "We accept print-ready vector files in AI (Adobe Illustrator), PDF, EPS, and high-resolution PSD or TIFF files (300 DPI minimum). We also provide dieline templates tailored to your custom box dimensions.",
  },
  {
    question: "Can I order a physical sample before full production?",
    answer: "Yes, we can produce a custom pre-production physical prototype with your exact dimensions, materials, and printing so you can test fit your product prior to bulk manufacturing.",
  },
  {
    question: "Are your packaging materials eco-friendly?",
    answer: "Yes! We specialize in FSC-certified Kraft papers, 100% recyclable corrugated cardboard, biodegradable folding cartons, and non-toxic soy-based printing inks.",
  },
  {
    question: "How does your Price Match Guarantee work?",
    answer: "If you receive a lower written quote from another custom packaging provider for identical specifications, material grades, and quantities, simply send it to your account manager and we will match or beat it.",
  },
];

export const CUSTOMIZATION_OPTIONS = [
  {
    id: "sizes",
    title: "Custom Sizes & Shapes",
    description: "Take full control and customize the exact length, width, and depth you need. Reduce void-fill waste, fit your product like a glove, and create an unforgettable unboxing experience.",
    icon: "Box",
  },
  {
    id: "materials",
    title: "Premium Eco Materials",
    description: "Choose from unbleached natural Kraft, heavy-duty corrugated flutes, rigid luxury greyboard, and food-grade cardstocks. Sustainably sourced and built to protect.",
    icon: "Layers",
  },
  {
    id: "printing",
    title: "Vibrant HD Printing",
    description: "High-definition CMYK, Pantone PMS spot colors, and specialty opaque white inks deliver bold, consistent brand fidelity on every single box.",
    icon: "Printer",
  },
  {
    id: "finishes",
    title: "Luxury Premium Finishes",
    description: "Elevate your packaging with soft-touch velvet lamination, metallic hot foil stamping (gold, silver, rose gold), raised Spot UV, and precision embossing/debossing.",
    icon: "Sparkles",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Types of Custom Packaging Boxes: The Complete 2026 Guide",
    slug: "types-of-custom-boxes",
    excerpt: "Explore the different types of custom packaging boxes, from corrugated mailers to luxury rigid boxes, and discover which style is best for your brand.",
    author: "HOF Pack Editorial Team",
    date: "February 12, 2026",
    readTime: "6 min read",
    category: "Packaging Guide",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    content: "Choosing the right packaging box is essential for product safety, customer unboxing satisfaction, and brand perception. In this guide, we break down mailer boxes, rigid boxes, folding cartons, and corrugated shippers...",
  },
  {
    id: "blog-2",
    title: "How Eco-Friendly Packaging Drives Customer Loyalty in E-Commerce",
    slug: "eco-friendly-packaging-customer-loyalty",
    excerpt: "Learn why modern consumers demand sustainable packaging, how soy inks and FSC materials make an impact, and how to tell your sustainability story on your boxes.",
    author: "Sarah Jenkins",
    date: "January 28, 2026",
    readTime: "5 min read",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    content: "Sustainability is no longer a niche preference—over 73% of consumers report they are more likely to recommend brands that use recyclable packaging. Here is how you can transition seamlessly...",
  },
  {
    id: "blog-3",
    title: "The Anatomy of an Unforgettable Unboxing Experience",
    slug: "anatomy-of-unboxing-experience",
    excerpt: "From inside-the-box printing to custom inserts and luxury soft-touch finishes, here is how leading direct-to-consumer brands create viral unboxing moments.",
    author: "Michael Chang",
    date: "January 15, 2026",
    readTime: "7 min read",
    category: "Brand Strategy",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    content: "Unboxing is the only marketing channel that has a 100% open rate. Discover how inside printing, custom tissue paper, and tactile coatings turn casual shoppers into brand evangelists...",
  },
];
