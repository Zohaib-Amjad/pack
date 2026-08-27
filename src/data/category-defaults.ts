import type { CategoryContent } from "@/types/category-content";

export interface CategoryDetailData {
  id: string;
  name: string;
  slug: string;
  section: "industry" | "material" | "style";
  hero_headline_white: string;
  hero_headline_accent: string;
  description: string;
  image_url: string;
  banner_image_url: string;
  category_content: CategoryContent;
  faqs: { id: string; question: string; answer: string; display_order: number }[];
}

export const COFFEE_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-coffee",
  name: "Coffee Packaging",
  slug: "custom-coffee-packaging",
  section: "industry",
  hero_headline_white: "Custom Coffee Packaging",
  hero_headline_accent: "Locks In Freshness",
  description: "Flat 20% Off on Your First Order + Free Shipping",
  image_url: "/images/categories/coffee-packaging-hero.jpg",
  banner_image_url: "/images/categories/coffee-packaging-hero.jpg",
  category_content: {
    feature_items: [
      {
        icon: "Palette",
        title: "Visually Appealing Color Palette",
        description: "We provide digital and offset printing with CMYK for full-color graphics and PMS for exact color matching.",
      },
      {
        icon: "Feather",
        title: "Lightweight Packaging",
        description: "Explore our lightweight packaging bags that are space-efficient and easy to transit.",
      },
      {
        icon: "Leaf",
        title: "Refined Materials",
        description: "We use refined food-grade materials to keep your products safe from humidity, air, and UV",
      },
    ],
    content_blocks: [
      {
        heading: "Increase Brand Value with Custom Coffee Bags",
        body: "From coffee bags to pouches and customized boxes, coffee packaging helps create a clean, memorable brand presentation. Suitable for beans, ground coffee, and subscription packs, custom packaging elevates the whole brand perception and boosts sales. Custom designs make your coffee packaging ideal for both small roasters and large-scale brands.",
        image: "/images/categories/coffee-brand-value.jpg",
        alt: "Custom coffee packaging for coffee brands",
        linkLabel: "Get a Free Quote →",
      },
      {
        heading: "Keep Your Coffee Fresher, Longer",
        body: "Preserve your coffee's quality and freshness during storage and in retail environments with our custom coffee bags. Their multi-layer structure and food-grade materials lock in freshness for longer, so that every sip feels like a warm hug.",
        image: "/images/categories/coffee-keep-fresher.jpg",
        alt: "Variety of custom coffee packaging styles",
        flipped: true,
      },
      {
        heading: "Customize Your Coffee Bags With HOF Pack",
        body: "Our lightweight and space-efficient coffee bags are ideal for e-commerce and retail settings. Get your hands on custom coffee packaging that performs across all stages from storage to shipping to retail display.",
        image: "/images/categories/coffee-customize-bags.jpg",
        alt: "Fresh coffee products in custom packaging",
        linkLabel: "Get a Packaging Report →",
      },
    ],
    why_heading: "How Custom Coffee Bags Create A Difference?",
    article_sections: [
      {
        level: "p",
        text: "Custom coffee bags are designed to lock in the flavor and freshness of your coffee, protect its quality, and enhance your brand’s shelf appeal, so your customers experience coffee the way it’s meant to be.",
      },
      {
        level: "h2",
        text: "Choose A Coffee Packaging Style Suitable for Your Brand",
      },
      {
        level: "p",
        text: 'At <a href="https://hofpack.com/" target="_blank" rel="noopener noreferrer">HOF Pack</a>, we offer a variety of custom coffee packaging solutions tailored to different product types and business needs:',
      },
      {
        level: "h4",
        text: "Stand Up Coffee Pouches",
      },
      {
        level: "p",
        text: "Best for 100g–1lb. Flexible and resealable packaging with bottom gussets for better shelf display, modern look, and storage.",
      },
      {
        level: "h4",
        text: "Flat Bottom Coffee Bags (Box Pouch)",
      },
      {
        level: "p",
        text: "Best for 250g–1lb. Provide maximum stability and premium shelf presence, ideal for retail environments.",
      },
      {
        level: "h4",
        text: "Side Gusset Coffee Bags",
      },
      {
        level: "p",
        text: "Ideal for 500g–5lb. Used for bulk coffee packaging with increased storage capacity.",
      },
      {
        level: "h4",
        text: "Coffee Bags with Valve",
      },
      {
        level: "p",
        text: "Designed with one-way degassing valves to maintain freshness and prevent oxidation.",
      },
      {
        level: "h4",
        text: "Kraft Coffee Bags",
      },
      {
        level: "p",
        text: "Ideal for organic and eco-conscious brands. Sustainable packaging with a natural look.",
      },
      {
        level: "h4",
        text: "Coffee Packaging Boxes",
      },
      {
        level: "p",
        text: "Used for secondary packaging and premium presentation, especially for gifting and retail.",
      },
      {
        level: "h2",
        text: "Not Sure What Size You Need?",
      },
      {
        level: "p",
        text: "Coffee packaging must match product quantity and form (beans or ground). Proper sizing ensures minimal air exposure and better product preservation. You can either custom-size your mylar bag or choose from the standard size chart.",
      },
      {
        level: "p",
        text: "For small coffee flat pouch or stand-up pouch:\n- Capacity: 50g–100g\n- Oz / Lb: 2–4 oz\n- Width (W): 3–4”\n- Height (H): 5–6”\n- Gusset (G): none or 1–2”",
      },
      {
        level: "divider",
      },
      {
        level: "p",
        text: "For specialty coffee and retail stand-up pouches or flat bottoms:\n- Capacity: 250g\n- Oz / Lb: 8–9 oz\n- Width (W): 3.5–5”\n- Height (H): 7–10”\n- Gusset (G): 2–3”",
      },
      {
        level: "p",
        text: "Standard retail-size coffee packaging:\n\nCapacity: 340g\nOz / Lb: 12 oz\nWidth (W): 4–5”\nHeight (H): 8–10”\nGusset (G): 2–3”",
      },
      {
        level: "p",
        text: "For side gusset coffee bags in daily use or cafes:\n- Capacity: 500g\n- Oz / Lb: 16–17 oz\n- Width (W): 5–6”\n- Height (H): 10–12”\n- Gusset (G): 2–4”",
      },
      {
        level: "divider",
      },
      {
        level: "p",
        text: "Side gusset or Quad Seal coffee bags for bulk retail and wholesale:\n- Capacity: 1 kg\n- Oz / Lb: 2.2 lb\n- Width (W): 6–8”\n- Height (H): 12–14”\n- Gusset (G): 3–5”",
      },
      {
        level: "p",
        text: "For Bulk coffee packaging for cafes and commercial use:\n- Capacity: 2-2.2 kg\n- Oz / Lb: 5lb\n- Width (W): 10–12”\n- Height (H): 18–24”\n- Gusset (G): 5–7”",
      },
      {
        level: "p",
        text: "Common sizes include:\n- 100g (3.5 oz) for small packs\n- 250g (8.8 oz) or 340g (12 oz) for retail packs\n- 500g (1 lb) as standard packs\n- 1kg (2.2 lb) for bulk packaging",
      },
      {
        level: "h2",
        text: "Design Your Dream Coffee Bag with HOF Pack",
      },
      {
        level: "p",
        text: "Good packaging can increase your brand perception from average to unforgettable. That is why custom coffee packaging is necessary for your coffee business. Here’s how HOF Pack adds value to your coffee packages and bags.",
      },
      {
        level: "h4",
        text: "High-quality Printing:",
      },
      {
        level: "p",
        text: "Packaging plays a key role in influencing buying decisions, especially in competitive coffee markets. High-quality printing really makes a difference. Explore PMS color tones and CMYK printing methods to showcase your brand identity and elevate your coffee packaging look.",
      },
      {
        level: "h4",
        text: "Add-ons, Finishes & Why They Matter",
      },
      {
        level: "p",
        text: "Enhance the functionality of your coffee bags with:\n- One-way degassing valves: Releases CO₂ & keeps oxygen out\n- Resealable zippers: Preserve freshness\n- Tear notches: Easy opening\n- Window cut-outs: Better product visibility\n- Tin Tie: Creates a traditional retail feel",
      },
      {
        level: "h4",
        text: "Material Thickness & Their Benefit",
      },
      {
        level: "p",
        text: "Customize your custom coffee bags as per your brand needs:\n- 2.5–3 mil thick light-duty coffee samples for short shelf life\n- 4–5 mil standard retail coffee packaging\n- 5–7 mil heavy-duty bulk coffee packaging for longer shelf life\n- 60–120 gsm (kraft) eco packaging for sustainable brands",
      },
      {
        level: "divider",
      },
      {
        level: "h2",
        text: "Here’s Why You Should Choose HOF Pack for Coffee Packaging:",
      },
      {
        level: "p",
        text: "We understand the challenges of packaging that fails to preserve the freshness and aroma of your coffee. Coffee is highly sensitive to air, moisture, and light, and one of the biggest challenges for coffee brands is maintaining freshness after roasting.",
      },
      {
        level: "p",
        text: "Exposure to oxygen and moisture quickly degrades flavor and aroma. That is why our coffee packaging bags and boxes are built with high-barrier materials that protect against air, humidity, and UV light.",
      },
      {
        level: "p",
        text: "Features like degassing valves allow freshly roasted coffee to release carbon dioxide without letting oxygen in. Whereas, resealable zippers and tear notches enhance user experience.",
      },
      {
        level: "p",
        text: "That’s why we offer solutions that combine protection with branding.",
      },
    ],
    material_items: [
      "Food-grade materials",
      "Trusted by 500+ clients",
      "FSC or ISO Certified",
      "Eco-friendly Kraft Material",
    ],
    perk_items: [
      "Wholesale Pricing with Free Sample",
      "8-10 days turnaround",
      "Free Shipping all Across the US",
      "Innovative Printing Designs",
      "Free design consultation",
      "MOQ as low as 100 units",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "What is the best packaging for coffee?",
      answer:
        "High-barrier bags with degassing valves are the best option to preserve freshness and aroma.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "Why are degassing valves important in coffee packaging?",
      answer:
        "They release carbon dioxide from freshly roasted coffee while preventing oxygen from entering.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "Can I customize coffee packaging with my brand design?",
      answer:
        "Yes, you can customize the size, materials, printing, and add-ons of your coffee bags.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "Is coffee packaging suitable for e-commerce?",
      answer:
        "Yes, lightweight and durable coffee packaging bags make them ideal for shipping.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "Do you offer coffee packaging wholesale?",
      answer:
        "Yes, bulk options are available with MOQs as low as 100 units and competitive pricing.",
      display_order: 5,
    },
  ],
};

export const BAKERY_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-bakery",
  name: "Bakery Boxes",
  slug: "bakery-boxes",
  section: "industry",
  hero_headline_white: "Custom Bakery Boxes",
  hero_headline_accent: "Makes Brands Memorable",
  description: "Custom bakery boxes designed to keep your baked goods fresh and beautifully presented.",
  image_url: "/images/categories/bakery-boxes-hero.jpg",
  banner_image_url: "/images/categories/bakery-boxes-hero.jpg",
  category_content: {
    feature_items: [
      {
        icon: "Palette",
        title: "Freshness-Focused Design",
        description: "Food-grade materials that help keep baked goods fresh and protected.",
      },
      {
        icon: "Feather",
        title: "Lightweight & Durable",
        description: "Easy to carry and stack while ensuring product safety during transit.",
      },
      {
        icon: "Leaf",
        title: "Eco-Friendly Materials",
        description: "Sustainable, FSC-certified options made from recycled paperboard.",
      },
    ],
    content_blocks: [
      {
        heading: "Presentation With Freshness",
        body: "Baked items are highly sensitive to moisture, air, and temperature. Standard packaging often leads to soggy textures or damaged designs. That is why HOF Pack offers custom bakery packaging boxes made with food-grade materials that maintain product freshness and enhance their look. Options like window bakery boxes enhance product visibility, their appeal, and purchase chances. These boxes also provide proper ventilation and structural strength to prevent condensation and damage during transport.",
        image: "/images/categories/bakery-presentation-freshness.jpg",
        alt: "Custom bakery boxes for baked goods",
        linkLabel: "Get a Free Quote →",
      },
      {
        heading: "Solve Display & Handling Challenges For Bakeries",
        body: "Bakery items require careful handling and attractive display. Our custom printed boxes are designed to protect delicate baked items, frosting, and toppings, maintain the product shape by keeping it in one place with inserts, and improve shelf presentation with branding. Whether you run a home bakery or a large-scale business, these custom bakery boxes wholesale help simplify operations and enhance customer experience.",
        image: "/images/categories/bakery-display-handling.jpg",
        alt: "Variety of custom bakery packaging styles",
        flipped: true,
      },
      {
        heading: "Ready To Customize Bakery Boxes with Personalized Designs?",
        body: "Packaging is your first pitch with your customers. Make it count. Explore our custom packaging boxes for bakeries for inspiration, or contact our team for a free design consultation and free quote.",
        image: "/images/categories/bakery-customize-designs.jpg",
        alt: "Ready To Customize Bakery Boxes with Personalized Designs?",
        linkLabel: "Start Customizing with Us!",
      },
    ],
    why_heading: "Make Your Baked Items Pop On The Shelves",
    article_sections: [
      {
        level: "p",
        text: "With customized bakery boxes wholesale, you can increase your product presentation 20x better. As cliché as it sounds, packaging creates a major difference in customers’ shopping experience. Make your items catch customers’ eyes with an enhanced look and presentation with custom bakery boxes.",
      },
      {
        level: "h2",
        text: "Explore our Wide Range of Custom Bakery Boxes",
      },
      {
        level: "p",
        text: "We offer a diverse range of custom bakery boxes tailored for different baked goods:",
      },
      {
        level: "h4",
        text: "Donut Boxes",
      },
      {
        level: "p",
        text: "Simple square or rectangular designs for single or bulk packaging. Designed with inserts or compartments to keep donuts in place and prevent smudging or sticking during transport.",
      },
      {
        level: "h4",
        text: "Window Bakery Boxes",
      },
      {
        level: "p",
        text: "A customized box with a transparent window that showcases your product before opening, while keeping it protected. Ideal for retail display and sweet lovers.",
      },
      {
        level: "h4",
        text: "Custom Cake Boxes",
      },
      {
        level: "p",
        text: "Built with extra strength, a circular or custom cake board, and height to support layered cakes. These boxes prevent movement and protect delicate icing designs.",
      },
      {
        level: "h4",
        text: "Pastry Boxes",
      },
      {
        level: "p",
        text: "Lightweight yet sturdy boxes with added inserts, perfect for pastries, muffins, cupcakes, croissants, and small baked items. They’re easy to carry and stack, without product damage.",
      },
      {
        level: "h4",
        text: "Cinnamon Roll Packaging",
      },
      {
        level: "p",
        text: "Specially designed to handle sticky and soft textures, preventing product damage, stickiness, or poor product presentation.",
      },
      {
        level: "h4",
        text: "Custom Sweet Boxes",
      },
      {
        level: "p",
        text: "Ideal for cookies, brownies, and assorted sweets. Can be customized with portions. These boxes combine protection with a premium gifting experience.",
      },
      {
        level: "h2",
        text: "Get Your Personalized Bakery Boxes With HOF Pack",
      },
      {
        level: "p",
        text: 'An ideal packaging reflects your brand identity while meeting functional needs. That is why we provide custom bakery boxes at <a href="https://hofpack.com/" target="_blank" rel="noopener noreferrer">HOF Pack</a> that protect your products and enhance their appeal.',
      },
      {
        level: "h4",
        text: "Custom sizes & dimensions:",
      },
      {
        level: "p",
        text: "Every bakery product has unique sizing needs. Choosing the right size prevents movement and damage. Standard bakery box sizes often include:\n\n- Small pastry boxes: 4” x 4” x 2”\n- Donut boxes: 9” x 9” x 3”\n- Cake boxes: 10” x 10” x 5” or larger\n- Cupcake boxes with inserts: 6” x 6” x 4”",
      },
      {
        level: "p",
        text: "High-quality printing: CMYK & PMS for vibrant branding",
      },
      {
        level: "p",
        text: "Add-ons & Finishes: Enhance functionality and appeal with die-cut window boxes for product visibility, food-grade coatings for moisture resistance, matte/gloss lamination for a premium finish, spot UV and foil stamping for branding impact, and custom inserts for cupcakes, pastries, and fragile items.",
      },
      {
        level: "p",
        text: "Materials: SBS paperboard (C1S/C2S), Kraft paper, or corrugated cardboard.",
      },
      {
        level: "p",
        text: "Features: Secure closures to prevent opening during transit, structural integrity for stacking and storage & ventilation options to reduce moisture buildup.",
      },
      {
        level: "h2",
        text: "Take Inspiration from All Across The Market Using Custom Bakery Boxes:",
      },
      {
        level: "p",
        text: "While primarily used in bakeries, these packaging solutions serve multiple industries:\n\n**Bakeries & Cafés:**\nFor daily packaging of cakes, pastries, and donuts\n\n**Home-Based Baking Businesses:**\nAffordable and customizable packaging for small-scale sellers\n\n**Retail & Supermarkets:**\nDisplay-ready packaging for baked goods\n\n**Event & Catering Services:**\nBulk packaging for weddings, parties, and corporate events\n\n**Gift & Specialty Food Brands:**\nPremium packaging for edible gifts and hampers",
      },
      {
        level: "divider",
        text: "",
      },
      {
        level: "h2",
        text: "Why Choose HOF Pack for Custom Bakery Boxes?",
      },
      {
        level: "p",
        text: "We deliver custom bakery boxes that combine protection, branding, and affordability, helping businesses grow faster.",
      },
    ],
    material_items: [
      "SBS paperboard (C1S/C2S) for premium printing",
      "Eco-friendly Kraft paper for organic brands",
      "Corrugated cardboard for extra strength",
    ],
    perk_items: [
      "Wholesale Pricing",
      "Fast production turnaround",
      "No Delays",
      "Innovative Printing Designs",
      "Free design consultation",
      "Flexible MOQ",
      "Competitive Bulk discounts",
      "Startup-friendly Packaging",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "Do home bakers buy cardboard to-go boxes or pastry boxes for baked gifts?",
      answer: "Home bakers use both cardboard takeout boxes and specialised pastry boxes. It depends on what they’re packing. Takeout boxes are good for small items, cookies, and brownies (non-fragile options). Pastry boxes are ideal for delicate pastries and cakes.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "Do you provide wholesale bakery boxes?",
      answer: "Yes, we provide wholesale bakery boxes all across the U.S with free shipping options.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "What is a cost-effective bakery box option?",
      answer: "For cost-effective packaging along with custom printing, both a paper kraft box or a cardboard/takeout box are reasonable choices.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "Can I customize my bakery box with only a logo?",
      answer: "Yes, you have full customization options, including printing, finishes, inserts, and add ons.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "Do you offer a sample before taking bulk orders?",
      answer: "Yes, at HOF Pack, we offer a free sample before you finalize your bulk order for custom bakery boxes.",
      display_order: 5,
    },
  ],
};

export const CANDLE_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-candle",
  name: "Candle Boxes",
  slug: "custom-candle-boxes",
  section: "industry",
  hero_headline_white: "Custom Candle Boxes",
  hero_headline_accent: "Adds Premium Touch",
  description: "Flat 20% Off on Your First Order + Free Shipping",
  image_url: "/images/categories/candle-boxes-hero.jpg",
  banner_image_url: "/images/categories/candle-boxes-hero.jpg",
  category_content: {
    feature_items: [
      {
        icon: "Palette",
        title: "Visually Appealing Color Palette",
        description: "We provide digital and offset printing with CMYK for full-color graphics and PMS for exact color matching.",
      },
      {
        icon: "Feather",
        title: "Lightweight Packaging",
        description: "Explore our lightweight packaging bags that are space-efficient and easy to transit.",
      },
      {
        icon: "Leaf",
        title: "Refined Materials",
        description: "We use refined food-grade materials to keep your products safe from humidity, air, and UV",
      },
    ],
    content_blocks: [
      {
        heading: "Protect Fragile & Heat-Sensitive Candle Products During Shipping",
        body: "Candles can easily melt, crack, or lose shape during storage and transit. Poor packaging leads to damaged products and customer dissatisfaction. To counter that, our custom candle packaging boxes are designed with durable cardboard, kraft materials, and secure structures to protect candles from external pressure, heat exposure, and movement. Options like foam inserts and rigid materials keep candles in place, reducing breakage and preserving their quality.",
        image: "/images/categories/candle-protect-fragile.jpg",
        alt: "Custom bakery boxes for baked goods",
        linkLabel: "Get a Free Quote →",
      },
      {
        heading: "Turn Candle Packaging into a Premium Unboxing  Experience",
        body: "Did you know that US candle brands lose 23% of repeat customers to poor unboxing experiences? Candle buyers are not just purchasing a product; they are buying an experience.  Packaging plays a major role in influencing their decision. That is why, at HOF Pack, our custom-printed candle boxes are built to make every order a brand moment with high-end finishes, detailed branding options, and an elevated perceived value of the product.",
        image: "/images/categories/candle-premium-unboxing.jpg",
        alt: "Variety of custom bakery packaging styles",
        flipped: true,
      },
      {
        heading: " Customize Candle Boxes with Personalized Designs",
        body: "Whether placed on retail shelves or used for gifting, these boxes help your candles stand out and create a memorable unboxing experience. Are you ready to customize your candle boxes with our in-house design team, who help you from designing to shipping, every step of the way. Contact us now to get started with a free quote.",
        image: "/images/categories/candle-customize-designs.jpg",
        alt: "Fresh bakery products in custom packaging",
        linkLabel: "Start Customizing with Us!",
      },
    ],
    why_heading: "Create a lasting impression on customers with Our Custom Candle Boxes",
    article_sections: [
      {
        level: "p",
        text: "Candles are fragile and heat-sensitive products. Poor packaging fails to protect delicate candles and doesn’t reflect your brand’s premium feel. If you’re a candle brand in the USA, you’re in luck because HOF Pack offers customized candle boxes with the MOQ as low as 50 units.",
      },
      {
        level: "h2",
        text: " Make Every Box Count With HOF Pack",
      },
      {
        level: "p",
        text: "Nearly 75% of American consumers say their purchases are influenced by packaging. So, make every box count with HOF Pack. Enhance your packaging with embossing and debossing for texture, foil stamping for a premium look, matte/gloss lamination for durability, die-cut windows for product visibility, and custom inserts for added protection. We also provide AQ coating, UV coating, UV spot, and soft-touch coating for an elevated look.",
      },
      {
        level: "h2",
        text: "Choose Any Style of Candle Box, Tailored Just for You",
      },
      {
        level: "p",
        text: "We offer a variety of custom candle boxes designed to meet different product and branding needs:",
      },
      {
        level: "divider",
      },
      {
        level: "h4",
        text: "Jar Candle Boxes",
      },
      {
        level: "p",
        text: "Premium packaging with rigid materials and high-end finishes, ideal for gifting and high-value candle brands.",
      },
      {
        level: "h4",
        text: " Candle Gift Boxes",
      },
      {
        level: "p",
        text: "Premium gifting experience with high-quality custom boxes. Make their special days memorable.",
      },
      {
        level: "h4",
        text: "Taper Candle Boxes",
      },
      {
        level: "p",
        text: "Designed to hold long, slender, or tapered candles (typically 10-inch or 12-inch) that are prone to bending or breaking, provides protection and enhances product outlook.",
      },
      {
        level: "divider",
      },
      {
        level: "h4",
        text: "Tealight/votive Candle Boxes:",
      },
      {
        level: "p",
        text: "Ideal for multi-packs (e.g., 4-pack, 8-pack, 12-pack) of small, compact candles such as tea lights, votives, or small container candles.",
      },
      {
        level: "divider",
      },
      {
        level: "h4",
        text: "Window Candle Boxes",
      },
      {
        level: "p",
        text: "Feature die-cut windows to showcase candle colors and designs while keeping them protected.",
      },
      {
        level: "h4",
        text: "Tuck Top Candle Boxes",
      },
      {
        level: "p",
        text: "Cost-effective and easy-to-assemble boxes, perfect for e-commerce and retail packaging.",
      },
      {
        level: "h4",
        text: "Two-Piece Candle Boxes",
      },
      {
        level: "p",
        text: "Offer a premium unboxing experience with a separate lid and base structure, perfect for luxury brands.",
      },
      {
        level: "h4",
        text: "Mailer Candle Boxes",
      },
      {
        level: "p",
        text: "Durable and sturdy packaging designed for e-commerce and shipping, ensuring product safety during transit.",
      },
      {
        level: "h4",
        text: "Sleeve & Tray Candle Boxes",
      },
      {
        level: "p",
        text: "Display boxes as candle holders with a slide-in and slide-out feature, along with custom inserts for product safety.",
      },
      {
        level: "h4",
        text: "Gable Boxes for Candles",
      },
      {
        level: "p",
        text: "Easy-to-carry and personalized boxes to enhance the product appeal and product presentation, with window cut options available.",
      },
      {
        level: "h2",
        text: "Get Your Personalized Candle Boxes With HOF Pack",
      },
      {
        level: "p",
        text: "At HOF Pack, we provide custom candle boxes that combine protection, durability, and premium design to reflect your brand identity while solving functional challenges.\n\nCandles come in various shapes and sizes, from small votives to large jar candles. Proper box sizing prevents movement and damage. Common dimensions include:\n- Small candle boxes: 2” x 2” x 3”\n- Jar candle boxes: 3” x 3” x 4” or larger\n- Luxury candle boxes: Customized based on product size",
      },
      {
        level: "h2",
        text: "Rigid & Sturdy Materials To Protect Your Products:",
      },
      {
        level: "p",
        text: "- SBS paperboard for smooth printing\n- Kraft paper for an eco & minimalistic look\n- Rigid cardboard for maximum protection\n- Paper weight (14pt, 16pt, 18pt) for added support",
      },
      {
        level: "h2",
        text: "Take Inspiration from Our Custom Candle Boxes Used in Multiple Industries:",
      },
      {
        level: "p",
        text: "The demand for custom candle boxes spans across multiple industries, which rely on wholesale candle boxes for consistent branding, protection, and scalability.",
      },
      {
        level: "h4",
        text: "Home Decor Brands:",
      },
      {
        level: "p",
        text: "For aesthetic and decorative candles & scented candles",
      },
      {
        level: "h4",
        text: "Luxury & Gift Brands:",
      },
      {
        level: "p",
        text: "Premium packaging of decorative candles for gifting purposes",
      },
      {
        level: "h4",
        text: "Aromatherapy & Wellness Brands:",
      },
      {
        level: "p",
        text: "Packaging for scented and essential oil candles.",
      },
      {
        level: "h4",
        text: "E-commerce Businesses & Retail Stores:",
      },
      {
        level: "p",
        text: "Durable packaging for small businesses for safe shipping & display-ready packaging for stores.",
      },
      {
        level: "h2",
        text: "Why Brands Trust HOF Pack for Custom Candle Boxes?",
      },
      {
        level: "p",
        text: "We understand the challenges of packaging fragile and premium products like candles. That’s why we offer solutions that combine protection with branding.",
      },
    ],
    material_items: [
      "Trusted by 100+ clients",
      "FSC or ISO Certified",
      "Eco-friendly Kraft Material",
    ],
    perk_items: [
      "Wholesale Pricing with Free Sample",
      "8-10 days turnaround",
      "Free Shipping all Across the US",
      "Innovative Printing Designs",
      "Free design consultation",
      "MOQ as low as 50 units",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "Are custom candle boxes suitable for shipping?",
      answer: "Yes, especially when made with corrugated or rigid materials and inserts for protection.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "Can I customize candle boxes with my brand design?",
      answer: "Yes, you can fully customize size, printing, finishes, and add-ons.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "What material is best for candle packaging?",
      answer: "Rigid and corrugated materials are best for protection, while kraft and SBS are ideal for branding.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "Do you offer candle boxes wholesale?",
      answer: "Yes, bulk options are available with flexible quantities and competitive pricing.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "What is your turnaround time for custom candle boxes?",
      answer: "Our turnaround time is around 8 to 10 business days.",
      display_order: 5,
    },
  ],
};

export const COSMETIC_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-cosmetic",
  name: "Cosmetic Boxes",
  slug: "custom-cosmetic-boxes",
  section: "industry",
  hero_headline_white: "Custom Cosmetic Boxes",
  hero_headline_accent: "Adds Premium Touch",
  description: "Flat 20% Off on Your First Order + Free Shipping",
  image_url: "/images/categories/cosmetic-boxes-hero.png",
  banner_image_url: "/images/categories/cosmetic-boxes-hero.png",
  category_content: {
    feature_items: [],
    content_blocks: [
      {
        heading: "The Right Box Style, Tailored for You",
        body: "Selecting the right custom cosmetic packaging can be daunting when your product range includes everything from tiny lip liners to heavy glass foundation jars. A diverse makeup & skincare product line requires custom packaging for each product. And a single material isn’t suitable for all. Specialized cosmetic packaging boxes are designed to match each product’s weight and fluid type, ensuring your brand maintains a unified look across SKUs.",
        image: "/images/categories/cosmetic-box-style.jpg",
        alt: "The Right Box Style, Tailored for You",
      },
      {
        heading: "Protect Your Cosmetic Product Line",
        body: "Nothing damages a beauty brand’s reputation faster than customers receiving shattered pressed powders or leaked facial oils. Luxury cosmetic boxes must be structurally sound and durable. By using thick, shock-absorbing folding paperboard combined with custom-molded internal trays, you can keep our makeup or cosmetic glass containers secure and protected from shipping & handling pressures.",
        image: "/images/categories/cosmetic-protect-product.jpg",
        alt: "Protect Your Cosmetic Product Line",
        flipped: true,
      },
      {
        heading: "Ready to Customize Cosmetic Packaging With HOF Pack?",
        body: "From small tube lip balms to big compact powders and eyeshadow palettes, HOF Pack has special packaging designs for all. We help brands elevate their packaging to increase their product and brand value. If you’re looking for custom cosmetics boxes, HOF Pack is a reliable custom packaging manufacturer in the United States of America, ready to upscale your cosmetic packaging line.",
        image: "/images/categories/cosmetic-packaging-wholesale.jpg",
        alt: "cosmetic-packaging-wholesale",
        linkLabel: "Start Customizing with Us!",
      },
    ],
    why_heading: "Cosmetic Box Printing",
    article_sections: [
      {
        level: "p",
        text: "Cosmetic products need a beautifully crafted custom packaging line that represents the brand across all SKUs and also showcases the brand story through custom printing, color themes, logo printing, premium finishes, and custom inserts. Branded packaging increases the perceived value of cosmetic products. Whether you’re selling drugstore makeup or high-end brands, your choice of materials will determine how well the product is presented.",
      },
      {
        level: "h2",
        text: "Key To Beautifully Crafted Custom Cosmetic Boxes",
      },
      {
        level: "p",
        text: "Cosmetic boxes are diverse. They range from skincare items to lip products, eye products, cheek tints, and foundations. So, using the same mailer shipping box for each product is a major RED FLAG done by brands. For every product line, you must customize a separate box. Whether you’re designing lip mask boxes or cheek tint boxes, each custom cosmetic box should reflect your brand identity and theme.",
      },
      {
        level: "h2",
        text: "How to Create Impactful Printed Cosmetic Boxes?",
      },
      {
        level: "p",
        text: "Here are a few tips on creating custom cosmetic packaging boxes that will appeal both to the market and your customers, even compelling potential customers to buy your product:\n- Design your customized cosmetic box with a custom font (mainly your brand logo’s font). For high-end brands, it should be minimalist typography that instantly catches your customers' attention and keeps their focus.\n- Play with colors. It can never go wrong with custom boxes for cosmetics. Warm hues work for summer collections, and cooler tones of blue and green are meant to refresh the skin, such as moisturizers or sunblock. That is exactly how luxury cosmetic brands choose the color theme of their products.\n- Lastly, use distinct patterns or creative illustrations. Design a cosmetics box your customers will want to keep and show off online through “unboxing reels” or “get ready with me” reels. Never underestimate the power of a good packaging design posted online by influencer marketing. Floral patterns or abstract shapes work easily on a white or Kraft (brown) background.",
      },
      {
        level: "h2",
        text: "Luxury Cosmetic Packaging with Premium Customization Options",
      },
      {
        level: "p",
        text: "Growing your beauty brand requires manufacturing that scales with your sales. Our custom cosmetic display boxes offer flexible minimum orders for boutique launches and quick-turnaround production. Each box design is engineered to easily include FDA-required ingredient labels, shade stickers, and batch codes without compromising the visual design of your custom cosmetic box packaging.",
      },
      {
        level: "h3",
        text: "Enhancing Shelf Appeal with Premium Finishes",
      },
      {
        level: "p",
        text: "In busy retail environments, striking contrast is key. Using a matte soft-touch lamination combined with raised Spot UV gloss over your logo creates a visually and tactilely engaging effect. For luxury cosmetic lines, metallic hot foil stamping (gold, rose gold, or silver) reflects light beautifully, signaling premium quality.",
      },
      {
        level: "h3",
        text: "Custom Inserts & Dieline Design",
      },
      {
        level: "p",
        text: "The internal structure of a makeup box is as important as its exterior. Custom-cut inserts ensure palettes don’t rattle, protect pump dispensers from leaks, and keep gift sets organized during shipping.",
      },
      {
        level: "h3",
        text: "Choosing The Best Materials for Beauty Packaging: Cardstock vs. Corrugated?",
      },
      {
        level: "p",
        text: "Different product weights require different materials. Lightweight folding cartons (14pt to 18pt cardstock) provide a smooth surface ideal for crisp typography and foil stamping. For e-commerce or heavy glass bottles, E-flute corrugated mailers provide crush-proof protection that withstands transit without extra packaging.",
      },
      {
        level: "h3",
        text: "Standard Sizing Guide of Cosmetic Boxes",
      },
      {
        level: "p",
        text: "Customize your next cosmetic boxes wholesale for the line of makeup products according to the right size. Your order can be created from the following ranges:\n- Length: 0.75\" – 30\".\n- Width: 0.75\" – 20\".\n- Depth: 1.75\" – 20\".",
      },
      {
        level: "h3",
        text: "14PT Cover, Coated (1 Side or Both Sides)",
      },
      {
        level: "p",
        text: "- Extra-thick, durable paperboard featuring a smooth, high-gloss surface\n- engineered to withstand vivid double-sided printing.\n- A satin or velvet soft-touch lamination for an ultra-premium, tactile hand feel.\n- Perfect for lightweight cosmetic items like lip gloss tubes, eye liners, and small serum bottles.",
      },
      {
        level: "h3",
        text: "16PT Cover, Coated (1 Side or Both Sides)",
      },
      {
        level: "p",
        text: "- The industry sweet spot for medium-weight products like liquid foundations, primer tubes, and compact palettes.\n- added weight and structural rigidity compared to 14PT\n- built for maximum retail durability.\n- pairs beautifully with high-build Spot UV or luxury matte coatings to make your branding pop on the shelf.",
      },
      {
        level: "h3",
        text: "18 PT Cover, Coated (1 Side or Both Sides)",
      },
      {
        level: "p",
        text: "- the thickest and most durable of the mentioned ones\n- has a glossy finish on one side",
      },
      {
        level: "h3",
        text: "130# Uncoated Cover",
      },
      {
        level: "p",
        text: "- relatively thick and sturdy\n- ideal for printing high-quality graphics and text\n- is durable and long-lasting\n- has excellent absorbency",
      },
      {
        level: "h3",
        text: "130# Epic Black Smooth Cover",
      },
      {
        level: "p",
        text: "- a heavyweight, smooth cardstock\n- has a matte finish and a deep black color that provides a sleek and sophisticated look",
      },
      {
        level: "h3",
        text: "130# Epic Black Linen Cover",
      },
      {
        level: "p",
        text: "- a heavyweight cardstock\n- has a textured, linen-like finish\n- deep black color\n- linen texture can provide a more upscale and elegant feel",
      },
      {
        level: "h3",
        text: "14PT Metalized Outside, Uncoated Inside",
      },
      {
        level: "p",
        text: "- elegant 14PT thickness\n- metalized finish for a sophisticated look\n- uncoated interior for a writable surface\n- versatile for various applications",
      },
      {
        level: "h3",
        text: "16PT Metalized Outside, Uncoated Inside",
      },
      {
        level: "p",
        text: "- premium 16PT thickness\n- eye-catching metalized exterior\n- uncoated inside for practicality\n- ideal for personalized notes",
      },
      {
        level: "h3",
        text: "18PT Metalized Outside, Uncoated Inside",
      },
      {
        level: "p",
        text: "- luxurious 18PT thickness\n- durable and thick construction\n- mesmerizing metalized exterior\n- uncoated inside for easy customization",
      },
      {
        level: "h3",
        text: "130# Brown Kraft Cover",
      },
      {
        level: "p",
        text: "- a heavyweight cardstock\n- light brown color\n- organic look and feel\n- subtle flecks",
      },
      {
        level: "h2",
        text: "Eco-Friendly & Natural Beauty Options",
      },
      {
        level: "p",
        text: 'For brands focused on vegan, organic, or zero-waste products, uncoated recycled Kraft paperboard offers a natural, tactile impression. Paired with non-toxic, soy-based inks, these materials make your packaging fully recyclable and visually vibrant. Choose your custom makeup boxes and custom <a href="https://www.hofpack.com/product/custom-lipstick-packaging" target="_blank" rel="noopener noreferrer">lipstick packaging</a> designs smartly.',
      },
      {
        level: "h2",
        text: "Choose HOF Pack for Custom Cosmetic Boxes Wholesale:",
      },
      {
        level: "p",
        text: "Choose HOF Pack to upscale your packaging look and enhance your customer retention. We help brands elevate their branding and packaging look through custom printed solutions. Contact our team at info@hofpack.com or call +1 (888) 429-4881 for a free consultation.",
      },
    ],
    material_items: [
      "Trusted by 5000+ clients",
      "FSC or ISO Certified",
      "Eco-friendly material options",
    ],
    perk_items: [
      "Wholesale Pricing with Free Sample",
      "8-10 days turnaround",
      "Free Shipping all Across the US",
      "Innovative Printing Designs",
      "Free design consultation",
      "MOQ as low as 100 units",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "What is your typical lead time for wholesale custom cosmetic boxes?",
      answer:
        "Our standard turnaround is 10 to 15 business days after final approval of your dieline design. For tight deadlines, we offer expedited production and sample runs to verify sizing.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "Do you offer structural design assistance?",
      answer:
        "Yes, our design consultants help design innovative, ergonomic packaging tailored to their product. Moreover, we print using exact PMS (Pantone Matching System) codes to guarantee color consistency across all branding materials.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "Does your custom packaging meet FDA labeling standards?",
      answer:
        "Yes, our designs include designated space for regulatory text such as ingredient lists, net weights, country of origin, and distributor info.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "Which box thickness is recommended for heavy glass cosmetic bottles?",
      answer:
        "For heavy jars, liquid foundations, or large sprays, we suggest using at least 24pt heavy-duty cardstock or rigid E-flute corrugated boxes to prevent damage under weight.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "Can you provide physical prototypes or samples?",
      answer:
        "Yes, we provide digital and physical samples before starting the product. Talk to our consultation team, and we will guide you throughout the process.",
      display_order: 5,
    },
    {
      id: "faq-6",
      question: "How do we ensure the products don't shift or break during shipping?",
      answer:
        "We add custom-fitted inserts (such as molded pulp, vac trays, or foam) to secure glass bottles, serums, or fragile palettes during e-commerce transit to prevent cosmetic products from breaking.",
      display_order: 6,
    },
  ],
};

export const COSMETIC_RELATED_PRODUCTS = [
  { name: "Paper Cups", slug: "custom-paper-cups", images: ["/images/products/custom-paper-cups.jpg"] },
  { name: "Paper Cigarette Boxes", slug: "paper-cigarette-boxes", images: ["/images/products/paper-cigarette-boxes.jpg"] },
  { name: "3.5 Mylar Bags", slug: "3.5-mylar-bags", images: ["/images/products/3.5-mylar-bags.jpg"] },
  { name: "Blunt Packaging", slug: "blunt-packaging", images: ["/images/products/blunt-packaging.jpg"] },
  { name: "Cardboard Cigarette Boxes", slug: "cardboard-cigarette-boxes", images: ["/images/products/cardboard-cigarette-boxes.jpg"] },
  { name: "Bra Boxes", slug: "custom-bra-boxes", images: ["/images/products/custom-bra-boxes.jpg"] },
];

export const CIGARETTE_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-cigarette",
  name: "Custom Cigarette Boxes",
  slug: "custom-cigarette-boxes",
  section: "industry",
  hero_headline_white: "Custom",
  hero_headline_accent: "Cigarette Boxes",
  description: "Flat 20% Off on Your First Order + Free Shipping",
  image_url: "/images/categories/cigarette-boxes-hero.jpg",
  banner_image_url: "/images/categories/cigarette-boxes-hero.jpg",
  category_content: {
    feature_items: [],
    content_blocks: [
      {
        heading: "Shelf-Ready Presentation",
        body: "Custom printed cigarette boxes have a flat surface. Their tuck flap design supports a flat printing surface, which makes customization easier. You can include your logo, product specifications, and custom designs in your cigarette packaging. Their high-quality printing and finishes make them retail-ready and improve their shelf visibility.",
        image: "/images/categories/cigarette-shelf-presentation.jpg",
        alt: "Shelf-Ready Presentation",
      },
      {
        heading: "Portable & Convenient Design",
        body: "Custom cigarette packaging boxes are portable designs. They help maintain product shape and reduce external damage. Their compact and small design makes them travel-friendly. Made from durable paperboard structure, they help protect products during both transport and retail display. Moreover, their lightweight design is practical for everyday use.",
        image: "/images/categories/cigarette-portable-design.jpg",
        alt: "Portable & Convenient Design",
        flipped: true,
      },
      {
        heading: " Ready To Customize High-Quality Cigarette Packaging?",
        body: "If you’re a cannabis brand or a tobacco brand in the USA, HOF Pack is your reliable packaging partner. HOF Pack helps DTC brands and the cannabis industry with custom box solutions that reflect their branding and make their products more appealing and valuable.",
        image: "/images/categories/cigarette-custom-packaging.jpg",
        alt: " Ready To Customize High-Quality Cigarette Packaging?",
      },
    ],
    why_heading: "Why Custom Packaging Is Important for Cigarette Boxes?",
    article_sections: [
      {
        level: "p",
        text: "Custom packaging is important for all cigarette and cannabis joint brands because without a custom cigarette box, you are not creating your unique brand identity, which works as a marketing tool or your silent salesperson. A customer always engages with the product that looks appealing and is shelf-ready. This simple technique and change make a simple blank cigarette box into a marketing tool, ready to be sold and promoted on social media platforms. That is the power of custom cigarette packaging, which can turn a simple “meh” box into a “wow, I need that” box.",
      },
      {
        level: "h2",
        text: "Material Selection for Cigarette Boxes",
      },
      {
        level: "p",
        text: "For customized cigarette boxes, there are several materials that you can choose from. At HOF Pack, we provide a variety of eco-friendly materials from which you can customize your custom cigarette box template. We have:\n- SBS Paperboard\n- Rigid cardboard\n- Kraft Paper",
      },
      {
        level: "h2",
        text: "Styles of Cigarette Boxes We Make",
      },
      {
        level: "p",
        text: "Different products require different packaging structures depending on their branding and functionality needs. We, as the leading custom packaging manufacturer in the US, provide personalized solutions to all cigarette brands in the US and overall world, so that each brand gets the perfect fit custom printed cigarette boxes for their brand. Here is the variety of boxes we offer at HOF Pack:",
      },
      {
        level: "divider",
      },
      {
        level: "h2",
        text: "Flip-Top Cigarette Boxes",
      },
      {
        level: "p",
        text: "Flip top boxes are tuck-style boxes. As the name suggests, they come with an opening lid that flips open, displaying the cigarettes inside the case. They are the most commonly used packaging style for cigarettes because of their easy opening and daily convenience. These boxes are ideal for businesses dealing with high traffic and high-volume customers every day.",
      },
      {
        level: "h3",
        text: "Slide-Out Cigarette Boxes",
      },
      {
        level: "p",
        text: "As the name suggests, these custom cigarette boxes come with a sliding tray like a drawer box, displaying the cigarettes inside the sliding tray. These boxes are specifically designed for a more premium unboxing experience. They are ideal to use for high-end brands that want to upscale their packaging style for a better customer experience.",
      },
      {
        level: "h3",
        text: "Rigid Cigarette Boxes",
      },
      {
        level: "p",
        text: "These custom cannabis cigarette boxes are made with thicker materials (rigid cardboard) for luxury presentation and added product protection. They are non-collapsible boxes that are specifically designed for luxury brands whose audience is high-net-worth individuals, who are looking for excellent quality, craftsmanship, and exclusivity. That's what rigid cigarette boxes are for: a premium smoking experience.",
      },
      {
        level: "h3",
        text: "Kraft Cigarette Packaging",
      },
      {
        level: "p",
        text: "Kraft boxes are the most eco-friendly packaging style. These boxes create a very natural and minimalist appearance, especially for eco-conscious and environmentally responsible brands. Since the US market is shifting towards sustainability, packaging manufacturers like HOF Pack are also integrating eco-friendly packaging solutions into their expertise.",
      },
      {
        level: "h3",
        text: "Window Cigarette Boxes",
      },
      {
        level: "p",
        text: "These boxes are made of SBS paperboard or Kraft with a die-cut design for enhanced presentation. The main idea behind window-cut cigarette boxes is enhanced product visibility, so that your customers can see what they are getting just by looking at the packaging. These boxes instantly grab the attention of customers, which is why modern brands choose window cut boxes.",
      },
      {
        level: "divider",
      },
      {
        level: "h2",
        text: "Why Choose HOF Pack for Customized Cigarette Boxes?",
      },
      {
        level: "p",
        text: "At HOF Pack, custom cigarette boxes are designed to showcase your branding, enhance your product presentation, and to protect your cigarettes from damage or contamination. Their compact and sturdy structure keeps your small cigarettes safe, and customizable printing options make them suitable for retail shelves, storage, and promotional packaging. This makes customization important for all tobacco brands in the US, and we are here to help you with that. We not only provide cigarette boxes wholesale, but also make custom electronic cigarette boxes and cigarette box paper for added convenience and branding elements.",
      },
      {
        level: "p",
        text: "Contact our team at info@hofpack.com or call +1 (888) 429-4881 for a free consultation.",
      },
    ],
    material_items: [
      "Trusted by 5000+ Clients",
      "FDA approved Packaging",
      "Eco-friendly Options",
    ],
    perk_items: [
      "Wholesale Pricing with Free Sample",
      "8-10 days turnaround",
      "Free Shipping all Across the US",
      "Innovative Printing Designs",
      "Free design consultation",
      "MOQ as low as 100 units",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "Can I customize cigarette boxes with my logo and branding?",
      answer:
        "Yes, you can fully customize your cigarette boxes and e-cigarette boxes with brand logos, colors, graphics, typography, and premium finishing options to match your brand identity.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "What materials are commonly used for cigarette packaging?",
      answer:
        "Cigarette boxes are commonly made using SBS paperboard, kraft paper, corrugated cardboard, or rigid paperboard, depending on durability and branding needs. If you want a luxury cigarette box, rigid would be a great choice. However, if you want it accessible for the whole mass affluent, paperboard would be an affordable option.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "Do you offer wholesale custom cigarette boxes?",
      answer:
        "Yes, wholesale production options are available at HOF Pack. You can order your desired custom box with low MOQs and bulk pricing for custom cigarette packaging orders. We accept as low as 500 MOQ units, and our prices are also flexible.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "What printing options are available for custom cigarette boxes?",
      answer:
        "Popular printing options for custom cigarette boxes are CMYK printing, PMS color matching, matte/gloss coatings, foil stamping, embossing, and spot UV finishes. You can choose whatever style or finish you find best for your brand.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "Are custom cigarette boxes suitable for retail shelves?",
      answer:
        "Yes, custom cigarette boxes, especially the flip top cigarette boxes, are specifically designed to improve retail presentation, product organization, and shelf visibility. They give a very clean and organized look on the retail shelves are are easy to stack.",
      display_order: 5,
    },
  ],
};

export const BAKERY_RELATED_PRODUCTS = [
  { name: "Custom Earring Boxes", slug: "custom-earring-boxes", images: ["/images/products/custom-earring-boxes.jpg"] },
  { name: "Custom Ring Boxes", slug: "custom-ring-boxes", images: ["/images/products/custom-ring-boxes.jpg"] },
  { name: "Bracelet Boxes", slug: "bracelet-boxes", images: ["/images/products/bracelet-boxes.jpg"] },
  { name: "Pendant Boxes", slug: "pendant-boxes", images: ["/images/products/pendant-boxes.jpg"] },
  { name: "Custom Pandasew Packaging", slug: "custom-pandasew-packaging", images: ["/images/products/custom-pandasew-packaging.jpg"] },
  { name: "Kraft Bulk Jewelry Boxes", slug: "kraft-bulk-jewelry-boxes", images: ["/images/products/kraft-bulk-jewelry-boxes.jpg"] },
  { name: "Custom Anklet Boxes", slug: "custom-anklet-boxes", images: ["/images/products/custom-anklet-boxes.jpg"] },
  { name: "Custom Bangle Boxes", slug: "custom-bangle-boxes", images: ["/images/products/custom-bangle-boxes.jpg"] },
  { name: "Corrugated Cake Boxes", slug: "corrugated-cake-boxes", images: ["/images/products/corrugated-cake-boxes.jpg"] },
  { name: "White Corrugated Boxes", slug: "white-corrugated-boxes", images: ["/images/products/white-corrugated-boxes.jpg"] },
  { name: "Corrugated Tuck Top Boxes", slug: "corrugated-tuck-top-boxes", images: ["/images/products/corrugated-tuck-top-boxes.jpg"] },
  { name: "Screen Printing Boxes", slug: "screen-printing-boxes", images: ["/images/products/screen-printing-boxes.jpg"] },
];

export const JEWELRY_RELATED_PRODUCTS = [
  { name: "Corrugated Cake Boxes", slug: "corrugated-cake-boxes", images: ["/images/products/corrugated-cake-boxes.jpg"] },
  { name: "White Corrugated Boxes", slug: "white-corrugated-boxes", images: ["/images/products/white-corrugated-boxes.jpg"] },
  { name: "Corrugated Tuck Top Boxes", slug: "corrugated-tuck-top-boxes", images: ["/images/products/corrugated-tuck-top-boxes.jpg"] },
  { name: "Screen Printing Boxes", slug: "screen-printing-boxes", images: ["/images/products/screen-printing-boxes.jpg"] },
  { name: "Ecommerce Packaging", slug: "ecommerce-packaging", images: ["/images/products/ecommerce-packaging.jpg"] },
  { name: "Corrugated Boxes with Lids", slug: "corrugated-boxes-with-lids", images: ["/images/products/corrugated-boxes-with-lids.jpg"] },
  { name: "Corrugated Mailer Boxes", slug: "corrugated-mailer-boxes", images: ["/images/products/corrugated-mailer-boxes.jpg"] },
  { name: "Shipping Boxes", slug: "custom-shipping-boxes", images: ["/images/products/custom-shipping-boxes.jpg"] },
  { name: "Air Float Boxes", slug: "custom-air-float-boxes", images: ["/images/products/custom-air-float-boxes.jpg"] },
  { name: "Double Wall Corrugated Boxes", slug: "double-wall-corrugated-boxes", images: ["/images/products/double-wall-corrugated-boxes.jpg"] },
  { name: "Hot Paper", slug: "custom-hot-paper", images: ["/images/products/custom-hot-paper.jpg"] },
  { name: "Food Wrapping Paper", slug: "custom-food-wrapping-paper", images: ["/images/products/custom-food-wrapping-paper.jpg"] },
];

export const COFFEE_RELATED_PRODUCTS = BAKERY_RELATED_PRODUCTS;
export const CANDLE_RELATED_PRODUCTS = BAKERY_RELATED_PRODUCTS;
export const CIGARETTE_RELATED_PRODUCTS = BAKERY_RELATED_PRODUCTS;

export const JEWELRY_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-jewelry",
  name: "Custom Jewelry Boxes",
  slug: "custom-jewelry-boxes",
  section: "industry",
  hero_headline_white: "Custom",
  hero_headline_accent: "Jewelry Boxes",
  description:
    "At HOF Pack, we build custom jewelry boxes that hold their shape, hold their shine, and hold a customer's attention long enough to turn a first order into a repeat one. Here's what that actually looks like.",
  image_url: "/images/categories/jewelry-boxes-hero.png",
  banner_image_url: "/images/categories/jewelry-boxes-hero.png",
  category_content: {
    feature_items: [
      {
        icon: "gem",
        title: "Ultra-Luxury Finishes & Foiling",
        description: "Enhance brand elegance with hot metallic gold foiling, debossed logos, and soft-touch tactile wraps.",
      },
      {
        icon: "feather",
        title: "Plush Velvet & Scratch-Free Cushioning",
        description: "Outfitted with custom-cut velvet inserts and foam trays to lock rings, necklaces, and gems securely.",
      },
      {
        icon: "leaf",
        title: "100% FSC® Certified Eco-Rigid Stock",
        description: "Crafted from heavy-duty recycled rigid chipboard, offering maximum anti-crush strength with zero eco-compromise.",
      },
    ],
    content_blocks: [
      {
        heading: "Your Jewelry Deserves Better Than a Bag",
        body: "A custom jewelry box is not a nice-to-have thing anymore. It has become the difference between \"I ordered a ring\" and \"I got a gift\" kind of experience. We provide rigid, tuck-end, and drawer-style boxes in a range of sizes for rings, studs, chains, and full sets. Get your now!",
        image: "/images/categories/jewelry-deserves-better.jpg",
        alt: "Your Jewelry Deserves Better Than a Bag",
      },
      {
        heading: "Luxury Jewelry Packaging, Without the Luxury Price Tag",
        body: "You don't need a 1,000-unit order to get magnetic-close rigid boxes with foam inserts and foil logos. Our low 100-unit minimum means a two-person jewelry brand gets the same luxury jewelry packaging as a warehouse-scale one — just sized to what you actually sell in a month.",
        image: "/images/categories/jewelry-luxury-packaging.jpg",
        alt: "Luxury Jewelry Packaging, Without the Luxury Price Tag",
        flipped: true,
      },
      {
        heading: "Every Detail, Made to Order",
        body: "Board weight, insert shape, matte or gloss lamination, ribbon color, window cutouts — a customize jewelry box request from us doesn't come back with \"closest match\" options. Our design team builds to your spec, sends a free 3D mock-up before anything goes to press, and adjusts it until it's right.",
        image: "/images/categories/jewelry-every-detail.jpg",
        alt: "Every Detail, Made to Order",
      },
    ],
    why_heading: "What Goes Into a Custom Made Jewelry Box",
    article_sections: [
      {
        level: "p",
        text: "People searching \"custom jewelry box manufacturer\" or shopping around for custom jewelry packaging boxes in general usually already know what they don't want — flimsy cardboard, mismatched printing, boxes that look nothing like the mock-up. So let's talk about what a properly built one actually includes.",
      },
      {
        level: "h2",
        text: "Structure And Material For Custom Jewelry Boxes",
      },
      {
        level: "p",
        text: "We work in rigid boards for the premium feel (think engagement rings, curated gift sets) and sturdy tuck-end cartons for everyday pieces like studs, anklets, or layered chains. Rigid boxes hold their shape indefinitely; they don't dent in a mail truck the way flat-pack cardboard does. For brands leaning into sustainability, we also build kraft-based bangle boxes and cardboard jewelry boxes from FSC-certified stock with soy-based inks — same durability, lighter footprint.",
      },
      {
        level: "h2",
        text: "Inserts that actually fit.",
      },
      {
        level: "p",
        text: "A custom made jewelry box lives or dies by its insert. We cut foam, velvet, or molded paperboard inserts shaped for your exact SKU — ring slots that hold a band upright, necklace hooks that stop chains from tangling, multi-slot trays for stacked bracelet sets. This is the part generic suppliers skip, and it's the part customers photograph for unboxing videos.",
      },
      {
        level: "h2",
        text: "Printing and branding.",
      },
      {
        level: "p",
        text: "Custom printed jewelry boxes from HOF Pack can carry full-color CMYK printing, spot UV, foil stamping, and embossing — so custom jewelry boxes with logo work end up looking closer to a fine-jewelry counter than a drop-ship warehouse. Matte lamination reads modern and understated; gloss reads bold and gift-shop bright. We'll mock up both if you're not sure which fits your brand.",
      },
      {
        level: "h2",
        text: "Wholesale And Repeat Runs.",
      },
      {
        level: "p",
        text: "If you're stocking multiple retailers or fulfilling a growing DTC line, custom jewelry boxes wholesale runs get the same 100-unit-minimum flexibility and the same 20% off on a first order, with pricing that scales down per unit as volume goes up. Rolling out to several stockists at once? Custom jewelry boxes with logo wholesale orders keep your branding identical across every retailer, so no store ends up with a slightly-off box.",
      },
      {
        level: "h2",
        text: "Get Packaging That Pairs With Your Jewelry Line",
      },
      {
        level: "p",
        text: "A lot of jewelry brands need more than one box in rotation, and we build the whole set:\n- Rigid gift boxes for engagement pieces, anniversary sets, or anything positioned as a splurge.\n- Kraft boxes for the eco-conscious or minimalist line sitting next to your premium one.\n- Mailer boxes for the outer shipping layer, so the inner jewelry box arrives exactly as pretty as it left our facility.\n- Tuck boxes for smaller accessory drops — hair pins, single studs, phone charms — where a full rigid box would be overkill.\nOrder them together and your unboxing experience stays consistent from the shipping label to the ring itself.",
      },
      {
        level: "h2",
        text: "Ready to See Yours?",
      },
      {
        level: "p",
        text: "You don't need a warehouse of inventory to get packaging that looks like it belongs on a jewelry counter — you need a box built around your actual product, your actual logo, and your actual budget. That's what a custom jewelry box packaging order from HOF Pack gets you: a free 3D mock-up, one-on-one design support, and a box that ships in days, not months.",
      },
    ],
    material_items: [
      "SBS paperboard (C1S/C2S) for premium printing",
      "Eco-friendly Kraft paper for organic brands",
      "Corrugated cardboard for extra strength",
    ],
    perk_items: [
      "Wholesale Pricing",
      "Fast production turnaround",
      "No Delays",
      "Innovative Printing Designs",
      "Free design consultation",
      "Flexible MOQ",
      "Competitive Bulk discounts",
      "Startup-friendly Packaging",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "What's the minimum order for custom jewelry boxes?",
      answer:
        "100 units. That's our standard minimum across rigid, tuck, and kraft styles, which is well below what most jewelry box manufacturers require. We make them for smaller and growing brands who don't want 1,000 boxes sitting in a closet.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "How long does it take to get customized jewelry boxes made?",
      answer:
        "Once you approve your free 3D mock-up, production and delivery typically run 8–12 days to your door within the US, with a full quality check on every batch before it ships.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "Can I put my logo and brand colors on the box?",
      answer:
        "Of course! We offer full-color printing options with foil stamping, embossing, and custom insert colors. You just need to send us your logo and brand palette. Our design team will build the mock-up around it at no extra charge.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "Do you offer eco-friendly jewelry packaging?",
      answer:
        "We do. We provide kraft-based boxes made from FSC-certified paperboard and soy-based inks. Your brand can go eco-friendly without giving up the structure or print quality a jewelry box needs.",
      display_order: 4,
    },
  ],
};

export const RETAIL_RELATED_PRODUCTS = [
  { name: "Candle Display Boxes", slug: "candle-display-boxes", images: ["/images/products/candle-display-boxes.jpg"] },
  { name: "3.5 Mylar Bags", slug: "3.5-mylar-bags", images: ["/images/products/3.5-mylar-bags.jpg"] },
  { name: "Black Tube Packaging", slug: "black-tube-packaging", images: ["/images/products/black-tube-packaging.jpg"] },
  { name: "Blank Cigarette Boxes", slug: "blank-cigarette-boxes", images: ["/images/products/blank-cigarette-boxes.jpg"] },
  { name: "Candle Dust Covers", slug: "candle-dust-covers", images: ["/images/products/candle-dust-covers.jpg"] },
  { name: "CBD Display Boxes", slug: "cbd-display-boxes", images: ["/images/products/cbd-display-boxes.jpg"] },
];

export const RETAIL_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-retail",
  name: "Custom Retail Boxes",
  slug: "custom-retail-boxes",
  section: "industry",
  hero_headline_white: "Custom",
  hero_headline_accent: "Retail Boxes",
  description: "Flat 20% Off on Your First Order + Free Shipping",
  image_url: "/images/categories/retail-boxes-hero.png",
  banner_image_url: "/images/categories/retail-boxes-hero.png",
  category_content: {
    feature_items: [],
    content_blocks: [
      {
        heading: "Because Packaging Sells Before You Do",
        body: "Before customers read a label, compare features, or check the price, they notice the packaging. Its the first thing that drives customers towards your product. If your packaging looks chic and appealing, customers will definitely notice and engage with your product. That’s why successful brands invest in custom retail boxes that reflect the quality of what’s inside. A thoughtfully designed box builds trust and helps products stand out in crowded retail shelves. From boutique shelves to major retail stores, great packaging works like a silent salesperson for your brand.",
        image: "/images/categories/retail-packaging-sells.jpg",
        alt: "Because Packaging Sells Before You Do",
      },
      {
        heading: "Built for Retail. Designed for Brands.",
        body: "Every product has different packaging needs. A jewelry brand may need elegant presentation and a soft matte touch for their custom retail jewelry boxes. A cosmetic company may prioritize shelf appeal and prefers a shiny glossy lamination. A subscription brand may require shipping durability. That’s why custom retail boxes packaging solutions are tailored specifically to your product, industry, and customer expectations. Whether you’re launching a new product line or just upgrading your packaging, custom retail boxes balance functionality, branding, and visual impact.",
        image: "/images/categories/retail-built-for-retail.jpg",
        alt: "Built for Retail. Designed for Brands.",
        flipped: true,
      },
      {
        heading: "Create Custom Retail Packaging with HOF Pack",
        body: "At HOF Pack, every project starts with your brand vision. From small businesses to growing national brands, we provide flexible solutions that help products look their best both online and in-store. Customize shipping boxes with HOF Pack for an elevated look of your brand.",
        image: "/images/categories/retail-create-custom.jpg",
        alt: "Create Custom Retail Packaging with HOF Pack",
      },
    ],
    why_heading: "What Are Custom Retail Boxes?",
    article_sections: [
      {
        level: "p",
        text: "Custom retail boxes are packaging solutions specifically designed to display, protect, and promote products sold in retail environments.\n\nUnlike generic packaging, retail boxes custom are created around your product dimensions, branding requirements, and customer experience goals. They can include custom graphics, logos, finishes, inserts, and structural features that help your products stand out in competitive retail markets, especially in 2026 when the market is super saturated with every product line. These boxes also keep your products protected throughout the supply chain.",
      },
      {
        level: "p",
        text: "Today, custom retail packaging is used across industries including beauty, food, wellness, electronics, fashion, CBD, jewelry, and home décor. Each brand or business, whether a small startup, home based entrepreneurs, or even large scale brands, can customize their packaging to match their brand identity. Customize your retail boxes with:\n- Logo printing\n- Custom dimensions\n- Window cut-outs\n- Embossing and debossing\n- Foil stamping\n- Matte or gloss finishes\n- Custom inserts\n- Premium paperboard and corrugated materials",
      },
      {
        level: "divider",
      },
      {
        level: "h3",
        text: "Why Do Businesses Go Custom for Their Retail Packaging?",
      },
      {
        level: "p",
        text: "Custom retail boxes help businesses present products professionally while creating a stronger connection with customers. Whether you’re selling cosmetics, candles, apparel, electronics, food products, or luxury gifts, the right retail packaging does more than hold a product. It helps tell your brand story, and even sell your products. It is your silent salesperson. At HOF Pack, we create custom retail packaging boxes designed to improve product presentation, strengthen brand recognition, and enhance the customer experience.",
      },
      {
        level: "divider",
      },
      {
        level: "h3",
        text: "Find the Right Retail Packaging for Your Product",
      },
      {
        level: "p",
        text: "Different products require different packaging styles. The best packaging solution depends on your product size, retail environment, branding goals, and budget. Our team helps businesses choose packaging that aligns with both product requirements and customer expectations.",
      },
      {
        level: "h4",
        text: "Tuck-end boxes",
      },
      {
        level: "p",
        text: "[Tuck end boxes](https://hofpack.com/product/custom-tuck-end-boxes) are a popular style for retail products across the globe. Especially in th United States, these custom boxes are commonly used for cosmetics, pharmaceuticals, and supplements. They have a secure base with a tuck flap closure at both end. They don’t need extra adhesives due to their interlocking mechanism.",
      },
      {
        level: "h4",
        text: "Mailer boxes",
      },
      {
        level: "p",
        text: "These boxes are majorly used as custom shipping boxes. They work well for subscription brands and e-commerce businesses where product protection is more important. These [custom mailer boxes](https://hofpack.com/custom-mailer-boxes) have a proper dieline, double-walled sides and a front tuck-in flap for a secure closure.",
      },
      {
        level: "h4",
        text: "Display boxes",
      },
      {
        level: "p",
        text: "[Custom display boxes](https://hofpack.com/custom-display-boxes) are specifically engineered and designed to help attract attention in retail stores. Their enhance product visibility, allowing the customers to see, stop, and engage with your products on retail shslves. They are commonly used for cosmetics, CBD industry, small retail items, packet food products.",
      },
      {
        level: "h4",
        text: "Rigid boxes",
      },
      {
        level: "p",
        text: "Rigid boxes offer a luxury packaging solution. They are made of thick chipboard for structural integrity and a premium touch. These [custom rigid boxes](https://hofpack.com/custom-rigid-boxes) are often chosen for luxury products and gifting due to their premium unboxing experience.",
      },
      {
        level: "divider",
      },
      {
        level: "h2",
        text: "Turn Every Box Into a Branding Opportunity",
      },
      {
        level: "p",
        text: "Retail packaging is one of the few marketing tools customers physically interact with. That interaction creates an opportunity. With custom printed retail boxes, brands can showcase logos, brand colors, product information, QR codes, social media details, and promotional messaging in a way that feels natural and memorable. Consistent packaging helps create stronger brand recognition and improves customer recall over time.",
      },
      {
        level: "divider",
      },
      {
        level: "h2",
        text: "Materials That Match Your Goals",
      },
      {
        level: "p",
        text: "The material you choose affects everything from appearance to durability. Each material serves a different purpose, allowing brands to balance aesthetics, performance, and budget. For custom packing, we offer:\n- SBS paperboard for premium printing\n- Kraft paperboard for eco-conscious brands\n- Corrugated board for added protection\n- Rigid chipboard for luxury packaging\n- Recyclable bux board and sustainable packaging options",
      },
      {
        level: "h2",
        text: "Printing and Finishes That Elevate The Look",
      },
      {
        level: "p",
        text: "Small details create big impacts. That is why choosing the right printing and finishing touch also creates a major difference. From cost-effective flexography for bulk corrugated boxes to offset or digital printing for detailed graphics, HOF Pack will help you choose the right style. Printing and finishing options for custom packaging are:\n- Offset Lithography\n- Digital Printing\n- Flexography\n- Matte Coating/Lamination\n- Gloss Coating/Lamination\n- Soft-Touch Lamination\n- Hot Foil Stamping\n- Cold Foil Stamping\n- Metallic Inks\n- Spot UV Coating\n- Embossing & Debossing\n- Textured Finishes\n- Die-Cutting\n- Mounting/Twinned Walls",
      },
      {
        level: "divider",
      },
      {
        level: "h2",
        text: "Why Businesses Choose HOF Pack",
      },
      {
        level: "p",
        text: "As custom retail packaging boxes manufacturers, we focus on creating packaging that helps brands grow. Whether you need custom retail display boxes, custom retail gift boxes, personalized corrugated boxes, or custom retail boxes with logo printing, our team provides complete support from concept to production. Contact our team at info@hofpack.com or call us +1 (888) 429-4881 for a free design consultation.",
      },
    ],
    material_items: [
      "Trusted by 5000+ clients",
      "FSC or ISO Certified",
      "Eco-friendly Kraft Materials",
    ],
    perk_items: [
      "Wholesale Pricing with Free Sample",
      "8-10 days turnaround",
      "Free Shipping all Across the US",
      "Innovative Printing Designs",
      "Free design consultation",
      "MOQ as low as 100 units",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "What are custom retail boxes used for?",
      answer:
        "Custom retail boxes are used to package, protect, display, and market products that are sold in retail stores, boutiques, supermarkets, and e-commerce businesses. They help improve presentation while strengthening brand identity.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "Can I customize retail boxes with my logo and artwork?",
      answer:
        "Yes. We offer complete customization option. You can add your logos, brand colors, graphics, product information, finishes, inserts, and structural designs tailored to your brand.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "Which industries commonly use custom retail packaging?",
      answer:
        "Retail packaging is widely used for cosmetics, skincare, candles, jewelry, apparel, electronics, CBD products, food items, gifts, and wellness products.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "What materials are available for custom retail boxes?",
      answer:
        "Common options include SBS paperboard, kraft paperboard, corrugated cardboard, and rigid board. Material selection depends on your product, budget, and branding goals.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "Do you offer wholesale custom retail boxes?",
      answer:
        "Yes. We provide wholesale pricing for businesses of all sizes with low minimum order quantities (as few as 500 units) and flexible customization options.",
      display_order: 5,
    },
    {
      id: "faq-6",
      question: "How do I choose the right retail packaging style?",
      answer:
        "The best packaging style depends on your product size, weight, retail environment, branding requirements, and budget. Contact our packaging specialists at info@hofpack.com or call us +1 (888) 429-4881. Our team will recommend you the most suitable option based on your goals.",
      display_order: 6,
    },
  ],
};

export const WAX_PAPER_RELATED_PRODUCTS = [
  { name: "Kraft Bakery Boxes", slug: "kraft-bakery-boxes", images: ["/images/products/kraft-bakery-boxes.jpg"] },
  { name: "Window Bakery Boxes", slug: "window-bakery-boxes", images: ["/images/products/window-bakery-boxes.jpg"] },
  { name: "Donut Boxes", slug: "custom-donut-boxes", images: ["/images/products/custom-donut-boxes.jpg"] },
];

export const WAX_PAPER_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-wax-papers",
  name: "Custom Wax Papers",
  slug: "custom-wax-papers",
  section: "industry",
  hero_headline_white: "Custom Wax Paper",
  hero_headline_accent: "Grease-Resistant & keep Your Food Fresh",
  description: "Premium, food-safe wax paper custom-printed with your logo to elevate your brand's packaging.",
  image_url: "/images/categories/wax-papers-hero.png",
  banner_image_url: "/images/categories/wax-papers-hero.png",
  category_content: {
    feature_items: [
      {
        icon: "Palette",
        title: "Freshness-Focused Design",
        description: "Food-grade materials that help keep baked goods fresh and protected.",
      },
      {
        icon: "Feather",
        title: "Lightweight & Durable",
        description: "Easy to carry and stack while ensuring product safety during transit.",
      },
      {
        icon: "Leaf",
        title: "Eco-Friendly Materials",
        description: "Sustainable, FSC-certified options made from recycled paperboard.",
      },
    ],
    content_blocks: [
      {
        heading: "Protect Your Food. Promote Your Business.",
        body: "Packaging shouldn’t just hold food—it should sell it. HOF Pack custom wax paper gives you high-performance protection and effortless marketing in one product. Our grease-resistant, food-safe barrier keeps wraps dry and neat, while your custom print brings your brand to life. Why use plain paper when you can turn every sandwich, meal kit, and to-go order into active advertising? Get in touch with us today and unlock new opportunities.",
        image: "/images/categories/wax-paper-protect-food.jpg",
        alt: "Protect Your Food. Promote Your Business.",
      },
      {
        heading: "Make Every Wrap Unforgettable with Custom Printed Wax Paper",
        body: "Stand out in a crowded market with high-definition printed wax paper. We use food-grade inks and advanced print clarity to transform ordinary greaseproof wraps into powerful marketing tools. Keep your food fresh and protected while ensuring your logo stays front and center on every takeaway order.",
        image: "/images/categories/wax-paper-make-every-wrap.jpg",
        alt: "Make Every Wrap Unforgettable with Custom Printed Wax Paper",
        flipped: true,
      },
      {
        heading: "Get Full Customization Freedom",
        body: "No two products wrap the same way. We manufacture custom wax paper wholesale to your exact size, wax type, and print. Pick dry or wet wax, pre-cut sheets or rolls, single or double-sided coating, and food-safe printing in one or full color. From small-batch bakeries to national brands, we cut, coat, and print the sheet around your use, so the wrap fits the food and the branding fits you.",
        image: "/images/categories/wax-paper-customization-freedom.jpg",
        alt: "Get Full Customization Freedom",
      },
    ],
    why_heading: "Turn Every Order Into a Moving Advertisement",
    article_sections: [
      {
        level: "p",
        text: "Turn every basket, box, and takeaway order into a powerful marketing tool with custom-printed wax paper. Our FDA Approved food-grade sheets keep every meal fresh while showcasing your logo in high-definition detail. Ditch plain wraps for branded food packaging that catches eyes, builds brand recognition, and turns hungry customers into walking advertisements everywhere your food goes.",
      },
      {
        level: "h2",
        text: "Popular Custom Wax Paper Styles Designed for US Businesses",
      },
      {
        level: "p",
        text: "Our premium printed wax papers give your brand a low-cost, high-impact way to protect food. You can find these options:\n- Dry Wax Wrap (The Bakery & Deli Classic):\nTreated internally so the wax is absorbed into the paper. Perfect for sandwiches, deli meats, and pastries where you need a breathable, non-tacky finish.\n- Wet Wax / High-Gloss Wrap (Heavy-Duty Defense):\nCoated on both sides for maximum moisture and oil protection. Ideal for hot burgers, ribs, fried chicken, and ice block inserts.\n- Natural Kraft Wax Paper (Artisan & Eco-Friendly):\nUnbleached paper stock for a rustic, farm-to-table look preferred by gourmet food trucks and craft bakeries.\n- Interfolded Pop-Up Sheets (High-Speed Kitchens):\nPre-trimmed, fast-dispensing sheets that save your staff valuable assembly time during peak rush hours.",
      },
      {
        level: "h2",
        text: "Dry Wax Papers vs Wet Wax Papers: Which One Fits Your Product?",
      },
      {
        level: "p",
        text: "Both start as food-grade paper, but the waxing differs. Dry wax paper absorbs wax into the fibers for a breathable, printable, non-stick surface, ideal for sandwiches, bakery items, and liners. Wet wax paper carries a heavier surface coating for greasy, oily, or refrigerated foods.",
      },
      {
        level: "h2",
        text: "What Sizes Do Our Wax Paper Sheets Come In?",
      },
      {
        level: "p",
        text: "Wax paper is sized to fit the food, basket, or box perfectly without waste. We manufacture every standard US dimension ranging from compact 6\" x 10¾\" pop-up deli sheets to versatile 12\" x 12\" wrap squares, catering sizes up to 36\" x 36\", and continuous dispenser rolls in multiple widths. Need something unique? Tell us your product or packaging, and we’ll custom-cut the exact sheet size to fit.",
      },
      {
        level: "h2",
        text: "What Materials and Wax Grades Do We Use?",
      },
      {
        level: "p",
        text: "We use food-grade paper with a food-safe wax coating that protects the product without transferring off onto the food. The right grade keeps the barrier strong through prep, service, and storage. Our common options include:\n- Dry wax coating for breathable, non-stick, moderate-barrier wrapping\n- Wet wax coating for a heavy-duty grease and moisture barrier\n- Bleached white stock for bright, clean printing\n- Natural kraft stock for an earthy, artisan look\n- Single or double-sided wax depending on the barrier you need\n- Recyclable, paper-based options for sustainability goals",
      },
      {
        level: "h2",
        text: "What Printing Choices Do We Offer?",
      },
      {
        level: "p",
        text: "Printing turns a plain sheet into branded packaging that carries your logo, colors, pattern, and message right to the customer. We print sharp, food-safe graphics across the sheet. Our printing options include:\n- Food-safe soy-based and water-based inks\n- CMYK full-color printing for detailed artwork\n- PMS spot color printing for exact brand color matching\n- One-color and two-color printing for clean, simple branding\n- Repeating logo or pattern prints across the full sheet\n- Digital printing for short runs and offset printing for large volume",
      },
      {
        level: "h2",
        text: "Order Custom Wax Papers from HOF Pack",
      },
      {
        level: "p",
        text: "At [HOF Pack](https://hofpack.com/), we manufacture custom wax papers that combine a dependable food-safe barrier, clean dispensing, and branding that puts your name in the customer's hands. From printed wax paper sheets and dry wax or wet wax grades to basket liners and rolls for a busy kitchen, our team is ready to help. Contact us at info@hofpack.com or call +1 (888) 429-4881 for a free consultation.",
      },
    ],
    material_items: [
      "Trusted by 5,000+ brands",
      "FSC-certified material options",
      "Food-safe, eco-friendly inks and stocks",
    ],
    perk_items: [
      "Wholesale pricing with a free sample",
      "8–12 day US turnaround",
      "Free shipping across the US",
      "Free 3D mockup and design consultation",
      "Dedicated project manager",
      "MOQ as low as 100 units",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "What is the minimum order quantity for custom wax paper?",
      answer:
        "Our standard minimum is 100 units, so small bakeries, cafés, and startup food brands can get custom printed wax paper without committing to huge volumes. Larger runs unlock better per-unit pricing for multi-location and retail distribution.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "What is the difference between dry wax and wet wax paper?",
      answer:
        "Dry wax paper is breathable with moderate resistance, ideal for sandwiches and bakery items. Wet wax has a heavier coating for stronger grease and moisture protection, ideal for greasy or refrigerated foods.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "Can I use wax paper for baking in the oven?",
      answer:
        "Wax paper is great for baking prep like rolling dough, layering cookies, and wrapping finished goods. It isn't made for high-heat oven use, though, since the wax can soften or smoke.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "Are your wax papers food-safe?",
      answer:
        "Yes. We use food-grade paper, food-safe wax coatings, and soy-based or water-based inks for printing, so the sheets are made for direct food contact.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "Can I get my logo printed on the wax paper?",
      answer:
        "Yes. We print logos, brand colors, patterns, and messaging across the sheet using food-safe inks, in one color, two colors, or full color. Printed wax paper is one of the easiest ways to put your brand in the customer's hands.",
      display_order: 5,
    },
    {
      id: "faq-6",
      question: "Are your wax papers eco-friendly?",
      answer:
        "We offer recyclable, paper-based stocks and food-safe soy or water-based inks, with FSC-certified material options, so you can meet sustainability goals while keeping the wrap functional.",
      display_order: 6,
    },
    {
      id: "faq-7",
      question: "Do you offer sheets, rolls, or pop-up dispensing?",
      answer:
        "All three. We produce flat pre-cut sheets, interfolded pop-up sheets for fast countertop dispensing, and continuous rolls, plus basket liners cut to your footprint.",
      display_order: 7,
    },
    {
      id: "faq-8",
      question: "Do you provide design help or do I need print-ready files?",
      answer:
        "Both work. If you have print-ready artwork, we move straight to production. If you need help, our team assists with layout and design, and we provide a free 3D mockup so you can see the printed sheet before we run it.",
      display_order: 8,
    },
  ],
};

export const SOAP_RELATED_PRODUCTS = [
  { name: "Custom Earring Boxes", slug: "custom-earring-boxes", images: ["/images/products/custom-earring-boxes.jpg"] },
  { name: "Custom Ring Boxes", slug: "custom-ring-boxes", images: ["/images/products/custom-ring-boxes.jpg"] },
  { name: "Bracelet Boxes", slug: "bracelet-boxes", images: ["/images/products/bracelet-boxes.jpg"] },
  { name: "Pendant Boxes", slug: "pendant-boxes", images: ["/images/products/pendant-boxes.jpg"] },
  { name: "Custom Pandasew Packaging", slug: "custom-pandasew-packaging", images: ["/images/products/custom-pandasew-packaging.jpg"] },
  { name: "Kraft Bulk Jewelry Boxes", slug: "kraft-bulk-jewelry-boxes", images: ["/images/products/kraft-bulk-jewelry-boxes.jpg"] },
  { name: "Custom Anklet Boxes", slug: "custom-anklet-boxes", images: ["/images/products/custom-anklet-boxes.jpg"] },
  { name: "Custom Bangle Boxes", slug: "custom-bangle-boxes", images: ["/images/products/custom-bangle-boxes.jpg"] },
  { name: "Corrugated Cake Boxes", slug: "corrugated-cake-boxes", images: ["/images/products/corrugated-cake-boxes.jpg"] },
  { name: "White Corrugated Boxes", slug: "white-corrugated-boxes", images: ["/images/products/white-corrugated-boxes.jpg"] },
  { name: "Corrugated Tuck Top Boxes", slug: "corrugated-tuck-top-boxes", images: ["/images/products/corrugated-tuck-top-boxes.jpg"] },
  { name: "Screen Printing Boxes", slug: "screen-printing-boxes", images: ["/images/products/screen-printing-boxes.jpg"] },
];

export const SOAP_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-soap",
  name: "Custom Soap Boxes",
  slug: "custom-soap-boxes",
  section: "industry",
  hero_headline_white: "Custom Soap Boxes",
  hero_headline_accent: "for Modern Brands",
  description: "Flat 20% Off on Your First Order + Free Shipping",
  image_url: "/images/categories/soap-boxes-hero.jpg",
  banner_image_url: "/images/categories/soap-boxes-hero.jpg",
  category_content: {
    feature_items: [
      {
        icon: "Palette",
        title: "Visually Striking Designs",
        description: "Creative prints and elegant finishes to make your soap packaging stand out and attract attention instantly.",
      },
      {
        icon: "Feather",
        title: "Protective & Practical Structure",
        description: "Designed to keep soaps secure, maintain shape, and ensure safe handling during storage and transit.",
      },
      {
        icon: "Leaf",
        title: "Eco-Conscious Material Choices",
        description: "Sustainable, recyclable materials that align with modern, environmentally aware brands.",
      },
    ],
    content_blocks: [
      {
        heading: "Know the Importance of Custom Soap Boxes for Your Brand",
        body: "In the soap industry, packaging is often the first thing customers notice. Custom soap boxes help create an aesthetic and memorable brand image for handmade, organic, and luxury soap products. With fully custom designs, they allow your products to stand out on shelves and attract customer attention.",
        image: "/images/categories/soap-importance.jpg",
        alt: "Custom soap packaging ",
        linkLabel: "Get a Free Quote →",
      },
      {
        heading: "Protective & Retail-Ready Soap Boxes",
        body: "Soap packaging is designed to protect delicate bars from moisture, dust, and external damage while maintaining their shape and quality. Eco-friendly materials like kraft paper also make them ideal for brands focused on sustainability.",
        image: "/images/categories/soap-protective-retail.jpg",
        alt: "Variety of custom bakery packaging styles",
        flipped: true,
      },
      {
        heading: "Choose HOF Pack for Aesthetic Soap Packaging:",
        body: "If you want attractive packaging for retail shelves, eco-friendly packaging solutions, and branded packaging for delicate or handmade soaps, HOF Pack is here to help. Design your custom soap boxes with us.",
        image: "/images/categories/soap-aesthetic-packaging.jpg",
        alt: "Fresh bakery products in custom packaging",
        linkLabel: "Get a Packaging Report →",
      },
    ],
    why_heading: "Know the Importance of Custom Soap Boxes for Your Brand:",
    article_sections: [
      {
        level: "p",
        text: "Custom soap boxes play a key role in how customers perceive your product. It’s not cliche, but the reality that brand perception = packaging. In a competitive market, especially for the cosmetics, handmade, and organic soaps industry, packaging helps communicate quality, ingredients, and brand identity at first glance.",
      },
      {
        level: "p",
        text: "If you are a handmade soap brand, organic & skincare company, cosmetic brand, gift and retail business, or run a hotel & hospitality industry, you need custom soap boxes. A well-designed soap packaging not only protects the product but also influences buying decisions through visual appeal and presentation.",
      },
      {
        level: "h2",
        text: "Product Specifications For Custom Soap Boxes:",
      },
      {
        level: "p",
        text: "For custom soap boxes, here’s the design and material specifications we provide at HOF Pack:\n- Dimensions: All Custom Sizes & Shapes\n- Paper Thickness / Stock: 10pt to 28pt (60lb to 400lb) or customized.\n- Materials Used: Eco-Friendly Kraft, E-flute Corrugated (extra strength for bulk and shipping), PaperBoard, Cardstock (lightweight, cost-effective).\n- Sustainability: Eco-Friendly, Recycled Boxes, Biodegradable materials certified by FSI.\n- Printing: Inside only, Outside only, Inside Outside both, No printing, CMYK + PMS color matching\n- Finishes: Matte/Gloss Lamination, Gloss AQ, Gloss UV, Matte UV, Spot UV, Embossing, Debossing, Foil Stamping\n- Styles: Die Cutting, Gluing, Scoring, Perforation\n- MOQ: No Minimum Order Required\n- Proofs and Guarantees: Flat View, 3D Mock-up, Physical Sampling (On request)\n- Turnaround Time: 8-10 Business Days with Flat shipping all across the US",
      },
      {
        level: "h2",
        text: "Types of Custom Soap Boxes for Different Styles",
      },
      {
        level: "p",
        text: "There’s a wide variety of soap boxes that brands use for their soaps. It depends on your aesthetics and brand style. If you’re unsure to choose the best style for your soap industry, consult our team for free design support. Here are some of the options of custom soap boxes we made:",
      },
      {
        level: "h4",
        text: "Kraft Soap Boxes",
      },
      {
        level: "p",
        text: "These are eco-friendly and biodegradable boxes with a natural, brown, kraft look. This type of box is ideal for organic, handmade, and sustainable soap brands.",
      },
      {
        level: "h4",
        text: "Window Soap Boxes",
      },
      {
        level: "p",
        text: "Designed with die-cut windows, these custom soap boxes showcase the soap inside before opening. Perfect for brands that want to drive sales through product visibility.",
      },
      {
        level: "h4",
        text: "Sleeve Soap Boxes",
      },
      {
        level: "p",
        text: "These are minimalist soap packaging boxes with a sliding sleeve design like a drawer. They are commonly used for premium and luxury soap brands.",
      },
      {
        level: "h4",
        text: "Tuck End Soap Boxes",
      },
      {
        level: "p",
        text: "These are the simplest and most functional boxes with tuck flaps. 90% of the brands use tuck soap boxes due to their seamless and simple design. They are highly suitable for everyday retail packaging and bulk production.",
      },
      {
        level: "h4",
        text: "Rigid Soap Boxes",
      },
      {
        level: "p",
        text: "If you want high-end packaging for a soap brand, rigid soap boxes made from thick board create a luxury look, perfect for premium brands and gift sets. They provide premium presentation and durability.",
      },
      {
        level: "h4",
        text: "Soap Display Boxes",
      },
      {
        level: "p",
        text: "These boxes are used to showcase multiple soap bars in retail stores, ideal for increasing visibility and improving product arrangement.",
      },
      {
        level: "h4",
        text: "Soap Pillow Boxes:",
      },
      {
        level: "p",
        text: "They have a curved design at both ends and create a luxury look to your soaps and skincare products. They are ideal for brands looking for a premium design for their soap packaging.",
      },
      {
        level: "h2",
        text: "How the Custom Soap Packaging Process Works At HOF Pack?",
      },
      {
        level: "p",
        text: "At [HOF Pack](https://hofpack.com/), we have streamlined the whole process for your convenience. Here’s a step-by-step guide on what we do and how you can customize your custom soap box.",
      },
      {
        level: "h4",
        text: "Select Your Design Specifications:",
      },
      {
        level: "p",
        text: "- Share your product size and packaging requirements for soap boxes\n- Choose box style, material, and design\n- Select customized printing and finishing options",
      },
      {
        level: "h4",
        text: "Set the MOQ, Price, and Turnaround time",
      },
      {
        level: "p",
        text: "- Talk to our consultation team\n- Sign the paperwork for MOQ, pricing, and turnaround\n- Free Delivery across the US",
      },
      {
        level: "h2",
        text: "Here’s Why You Should Choose HOF Pack for Custom Soap Boxes",
      },
      {
        level: "p",
        text: "We understand that soap packaging needs to balance aesthetics, protection, and sustainability. That’s why our custom soap boxes are designed to meet the needs of modern soap brands.",
      },
      {
        level: "p",
        text: "Contact our team at info@hofpack.com or call +1 (888) 429-4881 for a free consultation.",
      },
    ],
    material_items: [
      "Eco-friendly material options",
      "High-quality printing for branding",
      "Durable structure for protection",
      "FSC or ISO Certified",
    ],
    perk_items: [
      "Wholesale Pricing with Free Sample",
      "8-10 days turnaround",
      "Free Shipping all Across the US",
      "Innovative Printing Designs",
      "Free design consultation",
      "MOQ as low as 100 units",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "What is the best packaging for soap?",
      answer:
        "Kraft and cardboard boxes, especially tuck boxes and pillow boxes, are commonly used for soap packaging due to their durability and eco-friendliness.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "Can I use eco-friendly materials for soap boxes?",
      answer:
        "Yes, kraft paper and recyclable cardboard materials are widely used for sustainable soap packaging.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "Can I customize soap boxes with my brand design?",
      answer:
        "Yes, you can customize size, printing, materials, and finishes according to your brand.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "Are soap boxes suitable for retail display?",
      answer:
        "Yes, soap boxes are designed to enhance shelf presence and attract customers.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "Do you offer soap boxes wholesale?",
      answer:
        "Yes, bulk orders are available with competitive pricing and low minimum order quantities.",
      display_order: 5,
    },
  ],
};

export const CARDBOARD_RELATED_PRODUCTS = [
  { name: "Custom Earring Boxes", slug: "custom-earring-boxes", images: ["/images/products/custom-earring-boxes.jpg"] },
  { name: "Custom Ring Boxes", slug: "custom-ring-boxes", images: ["/images/products/custom-ring-boxes.jpg"] },
  { name: "Bracelet Boxes", slug: "bracelet-boxes", images: ["/images/products/bracelet-boxes.jpg"] },
  { name: "Pendant Boxes", slug: "pendant-boxes", images: ["/images/products/pendant-boxes.jpg"] },
  { name: "Custom Pandasew Packaging", slug: "custom-pandasew-packaging", images: ["/images/products/custom-pandasew-packaging.jpg"] },
  { name: "Kraft Bulk Jewelry Boxes", slug: "kraft-bulk-jewelry-boxes", images: ["/images/products/kraft-bulk-jewelry-boxes.jpg"] },
  { name: "Custom Anklet Boxes", slug: "custom-anklet-boxes", images: ["/images/products/custom-anklet-boxes.jpg"] },
  { name: "Custom Bangle Boxes", slug: "custom-bangle-boxes", images: ["/images/products/custom-bangle-boxes.jpg"] },
  { name: "Corrugated Cake Boxes", slug: "corrugated-cake-boxes", images: ["/images/products/corrugated-cake-boxes.jpg"] },
  { name: "White Corrugated Boxes", slug: "white-corrugated-boxes", images: ["/images/products/white-corrugated-boxes.jpg"] },
  { name: "Corrugated Tuck Top Boxes", slug: "corrugated-tuck-top-boxes", images: ["/images/products/corrugated-tuck-top-boxes.jpg"] },
  { name: "Screen Printing Boxes", slug: "screen-printing-boxes", images: ["/images/products/screen-printing-boxes.jpg"] },
];

export const CARDBOARD_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-cardboard",
  name: "Custom Cardboard Boxes",
  slug: "custom-cardboard-boxes",
  section: "material",
  hero_headline_white: "Custom Cardboard Boxes",
  hero_headline_accent: "Makes Brands Memorable",
  description: "Versatile cardboard packaging for every need. Lightweight yet strong, fully customizable with high-quality printing and sustainable materials.",
  image_url: "/hero-kraft-boxes.png",
  banner_image_url: "/hero-kraft-boxes.png",
  category_content: {
    feature_items: [
      {
        icon: "Palette",
        title: "Visually Appealing Color Palette",
        description: "We provide digital and offset printing with CMYK for full-color graphics and PMS for exact color matching.",
      },
      {
        icon: "Feather",
        title: "Lightweight Packaging",
        description: "Explore our lightweight packaging bags that are space-efficient and easy to transit.",
      },
      {
        icon: "Leaf",
        title: "Refined Materials",
        description: "We use refined food-grade materials to keep your products safe from humidity, air, and UV",
      },
    ],
    content_blocks: [
      {
        heading: "Tailored Box Styles for Every Industry",
        body: "No two products are exactly alike, which is why your packaging should never be generic. High-end custom cardboard boxes with logo printing options adapt beautifully to your inventory needs. From secure e-commerce mailers to stunning retail counter displays and luxury rigid gift sets, cardboard boxes give life to your packaging imagination. Premium construction gives your brand a major head start on crowded retail shelves.",
        image: "/images/categories/cardboard-tailored-styles.jpg",
        alt: "custom-cardboard-boxes",
        linkLabel: "Get a Free Quote →",
      },
      {
        heading: "Built-In Durability & Heavy-Duty Security",
        body: "Heavy or fragile goods require heavy-duty defenses. Our thick custom cardboard packaging boxes are engineered using top-grade kraft and reinforced fluted fibers to prevent crushing, bending, or tearing during transit. This rugged design absorbs external shocks and seals out humidity, ensuring your delicate cosmetics, heavy glass jars, or premium electronics arrive in flawless condition every time.",
        image: "/images/categories/cardboard-durability-security.jpg",
        alt: "custom-cardboard-packaging-boxes",
        flipped: true,
      },
      {
        heading: "Ready to Order Custom Cardboard Boxes Wholesale?",
        body: "Upgrading your packaging strategy is smooth, quick, and affordable when you partner with our team. We offer premium custom cardboard boxes wholesale packages structured to fit both your creative goals and your budget limits. With low minimum order quantities, free layout assistance, and lightning-fast turnarounds, HOF Pack turns your packaging ideas into a powerful marketing tool.",
        image: "/images/categories/cardboard-wholesale.jpg",
        alt: "custom-printed-cardboard-boxes",
        linkLabel: "Start Customizing with HOF Pack!",
      },
    ],
    why_heading: "Custom Printed Cardboard Boxes for Secure Shipping",
    article_sections: [
      {
        level: "p",
        text: "Custom cardboard shipping boxes are made of 100% recyclable and recycled paper-based materials. These eco-friendly packaging solutions are customized based on your brand’s product requirements, size, and branding preferences, instead of pre-made stock boxes. They are specifically tailored to each brand’s needs. These custom printed packaging boxes made of cardboard are ideal for:\n- Securely fit products\n- Minimize shipping costs since shipped flat\n- Elevate unboxing experiences",
      },
      {
        level: "h2",
        text: "Structural Styles of Custom Cardboard Boxes",
      },
      {
        level: "p",
        text: "At [HOF Pack](https://hofpack.com/), we bring you a massive variety of functional box styles built for retail compliance and high-end consumer unboxing experiences. Custom cardboard boxes for shipping come in a variety of sizes and styles, tailored specifically to each product, brand, and relevant industry. Explore our diverse range of packaging solutions designed to make your products stand out.",
      },
      {
        level: "h4",
        text: "E-commerce and Mailer Boxes:",
      },
      {
        level: "p",
        text: "- Sturdy e-commerce boxes perfect for subscription and online orders.\n- Built with double-walled side panels and secure front locking tabs.\n- Top choice for subscription boxes and online retail orders.",
      },
      {
        level: "h4",
        text: "Shipping and Carton Boxes",
      },
      {
        level: "p",
        text: "- Spacious, heavy-duty shipping cartons\n- Highly durable containers made for bulk shipping, heavy industrial items, and secure transit.",
      },
      {
        level: "h4",
        text: "Retail and Counter Display Boxes",
      },
      {
        level: "p",
        text: "- Attractive retail display boxes.\n- Feature eye-catching designs with crisp lines\n- Showcase die-cut viewing windows to attract customers at checkout.",
      },
      {
        level: "h4",
        text: "Luxury and Premium Packaging",
      },
      {
        level: "p",
        text: "- Thick, non-bendable, rigid structures\n- Ideal for elite cosmetics, jewelry, perfumes, high-end electronics, and holiday gift kits.",
      },
      {
        level: "p",
        text: "Whether you want cardboard gable boxes, cardboard pillow packaging, cardboard soap boxes, cardboard cigarette boxes, HOF Pack is here to provide you with custom packaging solutions.",
      },
      {
        level: "h2",
        text: "Choose the Cardboard Thickness of Your Choice",
      },
      {
        level: "p",
        text: "The safety of your product relies entirely on selecting the right material thickness. We offer premium paperboard and corrugated sheets to fit your exact weight requirements. Pick the right cardboard thickness to ensure your products are protected and perfectly presented. Our selection includes:",
      },
      {
        level: "h4",
        text: "14pt Cardstock",
      },
      {
        level: "p",
        text: "- A lightweight, smooth, and flexible board.\n- Cost-effective material\n- Ideal for small cosmetics, individual soaps, and light retail goods.",
      },
      {
        level: "h4",
        text: "18pt Cardstock",
      },
      {
        level: "p",
        text: "- Provides a premium, sturdy feel\n- Clean white printing surface\n- Ideal for medium-weight products, retail shelves, and gourmet treats.",
      },
      {
        level: "h4",
        text: "24pt Cardstock",
      },
      {
        level: "p",
        text: "A thick, durable, and heavy-duty option. Best for retail goods that require structural support without folding under freight pressure.",
      },
      {
        level: "h4",
        text: "Corrugated Board",
      },
      {
        level: "p",
        text: "- Engineered with a wavy, fluted middle layer sandwiched between two smooth liners.\n- The absolute standard for secure shipping and delivery.",
      },
      {
        level: "p",
        text: "Choosing the right thickness of your customized box is necessary to save yourself some shipping weight and freight expenses, and to provide a secure home to your products. Lightweight items do not require heavy-duty cardboard boxes, and delicate, glass-made products require extra rigidity and protection. For delicate products, using a corrugated cardboard box is necessary for product protection.",
      },
      {
        level: "h2",
        text: "Tailored Finishes for Personalized Cardboard Boxes",
      },
      {
        level: "p",
        text: "Wondering how to customize a cardboard box? At HOF Pack, we offer a premium selection of coatings and lamination options. Make your custom sized cardboard boxes truly unique with our personalized finishes. Add matte lamination for a sleek, elegant look, or go for gloss lamination to make colors and logos pop with shine. Spot UV finish highlights specific design elements with a glossy, raised texture, while soft-touch coating offers an ultra-premium, velvety feel that customers will love.",
      },
      {
        level: "h2",
        text: "Make a Statement with Sustainable Eco-Packaging",
      },
      {
        level: "p",
        text: "Modern consumers across the United States prioritize businesses that protect the planet. In the past few years, due to climate change and climate disasters, people have transitioned from plastic packaging to plastic-free paper-based packaging. People automatically associate eco-friendly packaging with high-end brand value. So, choosing cardboard-made boxes is a win-win situation in every case. Our custom cardboard boxes wholesale are crafted from 100% recycled, post-consumer, and recyclable paper fibers. They are completely biodegradable, compostable, and easy for your customers to recycle right at home. By utilizing eco-friendly materials and soy-based printing inks, your brand can lower its carbon footprint while building deep seasonal trust with green shoppers.",
      },
      {
        level: "h4",
        text: "Why Choose HOF Pack for Your Custom Boxes?",
      },
      {
        level: "p",
        text: "As custom cardboard box manufacturers in the United States, we take the stress and confusion out of commercial packaging supply chains. Our team provides high-quality manufacturing, reliable customer support, and wholesale pricing to help your business grow. Get your custom box quote today! Contact our team at info@hofpack.com or call +1 (888) 429-4881 for a free consultation.",
      },
    ],
    material_items: [
      "Trusted by 5000+ clients",
      "FSC or ISO Certified",
      "Eco-friendly material options",
    ],
    perk_items: [
      "Wholesale Pricing with Free Sample",
      "8-10 days turnaround",
      "Free Shipping all Across the US",
      "Innovative Printing Designs",
      "Free design consultation",
      "MOQ as low as 100 units",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "What is your minimum order quantity for custom cardboard boxes?",
      answer:
        "We love supporting growing small and medium enterprises. That is why we keep our minimum order quantity (MOQ) as low as just 500 boxes per custom design run. You can order low minimums and high maximums from HOF Pack. We are a reliable packaging company, based in the United States, helping scale up the packaging of businesses of all sizes.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "Can I get my custom business logo printed on the inside and outside?",
      answer:
        "Yes, absolutely! We provide full-bleed, high-resolution printing options. You can place your custom branding elements, logos, social media tags, and unboxing messages on both the exterior and interior panels/walls of your custom packaging boxes.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "What tools do I need to assemble these boxes?",
      answer:
        "No tools, tape, or glue are required for our standard custom mailers and cardboard shipping boxes. They are pre-scored and fold together smoothly in seconds using integrated interlocking tabs that lock the walls firmly into place.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "How to check the cardboard box quality before buying?",
      answer:
        "To check your custom cardboard box quality, you can request a sample of your product. We provide free samples to our customers so that they can hold the product, see its quality, and confirm the order before going bulk.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "What is your turnaround time for customized cardboard boxes?",
      answer:
        "Our average turnaround time is 8-10 business days. We are partnered with DHL, FedEx Corp, UPS, and provide both standard shipping (12-20 days) and express shipping (7-10 days).",
      display_order: 5,
    },
  ],
};

export const CORRUGATED_RELATED_PRODUCTS = [
  { name: "Custom Earring Boxes", slug: "custom-earring-boxes", images: ["/images/products/custom-earring-boxes.jpg"] },
  { name: "Custom Ring Boxes", slug: "custom-ring-boxes", images: ["/images/products/custom-ring-boxes.jpg"] },
  { name: "Bracelet Boxes", slug: "bracelet-boxes", images: ["/images/products/bracelet-boxes.jpg"] },
  { name: "Pendant Boxes", slug: "pendant-boxes", images: ["/images/products/pendant-boxes.jpg"] },
  { name: "Custom Pandasew Packaging", slug: "custom-pandasew-packaging", images: ["/images/products/custom-pandasew-packaging.jpg"] },
  { name: "Kraft Bulk Jewelry Boxes", slug: "kraft-bulk-jewelry-boxes", images: ["/images/products/kraft-bulk-jewelry-boxes.jpg"] },
  { name: "Custom Anklet Boxes", slug: "custom-anklet-boxes", images: ["/images/products/custom-anklet-boxes.jpg"] },
  { name: "Custom Bangle Boxes", slug: "custom-bangle-boxes", images: ["/images/products/custom-bangle-boxes.jpg"] },
  { name: "Hot Paper", slug: "custom-hot-paper", images: ["/images/products/custom-hot-paper.jpg"] },
  { name: "Food Wrapping Paper", slug: "custom-food-wrapping-paper", images: ["/images/products/custom-food-wrapping-paper.jpg"] },
  { name: "Freezer Paper", slug: "custom-freezer-paper", images: ["/images/products/custom-freezer-paper.jpg"] },
  { name: "Greaseproof Paper", slug: "custom-greaseproof-paper", images: ["/images/products/custom-greaseproof-paper.jpg"] },
];

export const CORRUGATED_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-corrugated",
  name: "Custom Corrugated Boxes",
  slug: "custom-corrugated-boxes",
  section: "material",
  hero_headline_white: "Custom Corrugated Boxes",
  hero_headline_accent: "Reliable Product Protection",
  description: "HOF Pack makes recyclable custom corrugated boxes sized to your exact product and printed with your brand.",
  image_url: "/images/categories/corrugated-boxes-hero.png",
  banner_image_url: "/images/categories/corrugated-boxes-hero.png",
  category_content: {
    feature_items: [
      {
        icon: "Package",
        title: "Superior Product Protection",
        description: "Strong corrugated construction helps protect products from impact, pressure, and damage during shipping.",
      },
      {
        icon: "Layers",
        title: "Strong & Durable",
        description: "Built for reliable stacking, handling, and transit while keeping your products securely packed.",
      },
      {
        icon: "Leaf",
        title: "Custom & Eco-Friendly",
        description: "Tailored sizes, prints, and finishes with recyclable materials for packaging that fits your brand.",
      },
    ],
    content_blocks: [
      {
        heading: "Board Strength Matched to Your Freight",
        body: "We fit the flute and wall of custom printed corrugated boxes to how your product ships, not a generic default. Light retail items get a right-weight single wall. Heavy or stacked freight gets double walls. You stop paying for boards you don't need and stop losing units you do.",
        image: "/images/categories/corrugated-board-strength.jpg",
        alt: "Board Strength Matched to Your Freight",
      },
      {
        heading: "Full-Color Print on Every Panel",
        body: "Your box is the first thing the customer touches. We print custom corrugated boxes in full CMYK and matched spot colors, inside and out. Unboxing carries your brand instead of a plain brown wall. Free 3D mockup before you commit to a run.",
        image: "/images/categories/corrugated-full-color.jpg",
        alt: "custom-corrugated-boxes",
        flipped: true,
      },
      {
        heading: "Wholesale Pricing, Low Minimums",
        body: "Start at a 100-unit MOQ and drop your per-box cost as volume climbs. Every order ships free across the US in 8–12 days, backed by a price-match guarantee and a dedicated project manager who owns your job from start to finish.",
        image: "/images/categories/corrugated-wholesale-pricing.jpg",
        alt: "corrugated-boxes-wholesale",
        linkLabel: "Start Customizing with Us!",
      },
    ],
    why_heading: "How We Produce Your Corrugated Boxes?",
    article_sections: [
      {
        level: "p",
        text: "Custom corrugated boxes are shipping and retail boxes made from fluted corrugated board. It is then cut and printed to your product's exact size. Our custom packing experts sandwich flat outer linerboards with an inner wavy fluted medium for the manufacturing of your corrugated packaging. It is then bonded with starch-based adhesives. We offer you the full range HOF Pack’s premium quality corrugated boxes that you can use for a variety of products. You can find:",
      },
      {
        level: "p",
        text: "**Custom Mailer Boxes**\nOur packaging experts produce die-cut, and self-locking custom corrugated mailer boxes for ecommerce and subscription shipments.",
      },
      {
        level: "p",
        text: "**Custom Shipping Boxes (RSC)**\nThe standard regular slotted custom corrugated shipping boxes for bulk freight and transit. These boxes come with equal-length flaps both on the top and bottom of the custom corrugated box for American e-commerce, retail, and manufacturing industries.",
      },
      {
        level: "p",
        text: "**Double Wall Corrugated Boxes**\nWe provide two fluted layers for heavy, fragile, or stacked loads. These custom corrugated boxes are ideal for heavy-duty shipping across USA, industrial storage, and e-commerce fulfillment.",
      },
      {
        level: "p",
        text: "**Single Wall Corrugated Boxes**\nWe manufacture standard 200#/ECT-32 single-wall boxes to carry up to 65 lbs for American retail and e-commerce. These lightweight single wall corrugated cartons for retail and lighter product weights gives you a budget-friendly, lightweight, and fully recyclable packaging solution.",
      },
      {
        level: "p",
        text: "**Custom Kraft Boxes**\nWe make these Kraft custom packing to offer you a high tensile strength along with green properties. These eco-friendly boxes serve industries like organic food, fast food and cosmetics to [luxury retail gifts](https://hofpack.com/custom-retail-boxes). It gives you a natural, recyclable kraft finish for eco-forward brands.",
      },
      {
        level: "p",
        text: "Each option we choose carries the same FSC-certified stock for customized shipping boxes. Not sure which flute or wall your product needs? Get in touch with our experts to find the best fit for your products.",
      },
      {
        level: "h2",
        text: "Explore Our Full Corrugated Box Range",
      },
      {
        level: "p",
        text: "Check out our wide range of custom corrugated boxes, made so that your products will get to their destination safe and sound.",
      },
      {
        level: "h3",
        text: "Double Wall Corrugated Boxes",
      },
      {
        level: "p",
        text: "These personalized corrugated boxes have two fluted layers for your heaviest, most fragile, or stacked shipments. These are ideal for freight that has to survive rough transit without crushing.",
      },
      {
        level: "h3",
        text: "Air Float Boxes",
      },
      {
        level: "p",
        text: "A suspension film holds your product floating in the center of the box, so it never touches the walls. The go-to custom packaging for fragile, high-value items that need premium, foam-free protection.",
      },
      {
        level: "h3",
        text: "Custom Shipping Boxes",
      },
      {
        level: "p",
        text: "The workhorse carton for bulk transit and everyday fulfillment. Get right-sized custom shipping boxes to your product so you cut void fill and ship more units per pallet.",
      },
      {
        level: "h3",
        text: "Colored Mailer Boxes",
      },
      {
        level: "p",
        text: "Full-color dyed mailers that make your box pop the moment it lands. Built for ecommerce brands that want the unboxing to feel like part of the product.",
      },
      {
        level: "h3",
        text: "Corrugated Mailer Boxes",
      },
      {
        level: "p",
        text: "Die-cut, self-locking mailers that fold flat and assemble without tape. The standard choice for subscription boxes and direct-to-consumer shipments.",
      },
      {
        level: "h3",
        text: "Corrugated Boxes with Lids",
      },
      {
        level: "p",
        text: "A two-piece lid-and-base build with a premium, gift-ready feel. Ideal for retail sets, hampers, and products that deserve a reveal.",
      },
      {
        level: "h3",
        text: "Ecommerce Packaging",
      },
      {
        level: "p",
        text: "Complete shipping packaging engineered for both transit and unboxing. Retail-ready boxes that protect the product and carry your brand from warehouse to doorstep.",
      },
      {
        level: "h3",
        text: "Screen Printing Boxes",
      },
      {
        level: "p",
        text: "Bold, durable screen-printed graphics that hold color on kraft and natural stock. Best for brands that want a clean, high-contrast logo without full CMYK.",
      },
      {
        level: "h3",
        text: "Corrugated Tuck Top Boxes",
      },
      {
        level: "p",
        text: "A tuck-top closure that assembles fast and stays retail-neat on the shelf. A practical pick for lighter products and quick pack-out lines.",
      },
      {
        level: "h3",
        text: "White Corrugated Boxes",
      },
      {
        level: "p",
        text: "Clean white board for a crisp, minimalist look that makes print and logos stand out. The premium base for beauty, cosmetic, and lifestyle brands.\nSturdy, food-grade boxes built to carry cakes, desserts, and bakery orders safely. Printed with your bakery's brand for a professional finish at pickup and delivery.",
      },
      {
        level: "h2",
        text: "Why Brands Order Corrugated From HOF Pack",
      },
      {
        level: "p",
        text: "[HOF Pack](https://hofpack.com/) is renowned in the USA packaging industry for its finest craftsmanship and excellent quality standards. We offer you premium construction of custom corrugated boxes at the best market rates. You can save more on bulk orders. Our boxes and mailers are 100% recyclable and were designed to make it through all of the typical things that happen when you're moving them from the warehouse to the front door.",
      },
      {
        level: "h2",
        text: "Ready To Spec Your Custom Printed Corrugated Boxes?",
      },
      {
        level: "p",
        text: "Send HoF experts your product and freight details. Our printing and packaging will match your brand. Mock it up free with design consultation. Email info@hofpack.com or call +1 (888) 429-4881. WhatsApp us at +1 (520) 427-1110 for a same-day quote.",
      },
    ],
    material_items: [
      "SBS paperboard (C1S/C2S) for premium printing",
      "Eco-friendly Kraft paper for organic brands",
      "Corrugated cardboard for extra strength",
    ],
    perk_items: [
      "Wholesale Pricing",
      "Fast production turnaround",
      "No Delays",
      "Innovative Printing Designs",
      "Free design consultation",
      "Flexible MOQ",
      "Competitive Bulk discounts",
      "Startup-friendly Packaging",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "Where Can I Buy Customized Corrugated Boxes?",
      answer:
        "HoF Pack offers the best quality custom corrugated boxes at the most affordable rates.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "How To Make A Custom Corrugated Box?",
      answer:
        "We have packaging experts with years of industry experience. Share your dimensions, select material strength, add custom branding artwork for custom corrugated boxes. The team at HOF Pack will manufacture and ship your order right to your door step.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "Where Can I Get Custom Corrugated Literature Mailer Boxes Made",
      answer:
        "You can order custom corrugated literature mailer boxes directly from HOF Pack through our website. You can also contact our packaging team to discuss your vision and requirements.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "Do Your Provide Custom Printed Corrugated Boxes With Inserts",
      answer:
        "Yes, at HOF Pack, we provide custom printed corrugated boxes that exactly fit your product's exact dimensions.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "5. How fast can I get corrugated boxes in the US?",
      answer:
        "Standard turnaround of your custom corrugated boxes order remains around 8–12 days with free US shipping. Your project manager confirms the exact timeline once your specs and artwork are locked.",
      display_order: 5,
    },
  ],
};

export const KRAFT_RELATED_PRODUCTS = [
  { name: "Custom Earring Boxes", slug: "custom-earring-boxes", images: ["/images/products/custom-earring-boxes.jpg"] },
  { name: "Custom Ring Boxes", slug: "custom-ring-boxes", images: ["/images/products/custom-ring-boxes.jpg"] },
  { name: "Bracelet Boxes", slug: "bracelet-boxes", images: ["/images/products/bracelet-boxes.jpg"] },
  { name: "Pendant Boxes", slug: "pendant-boxes", images: ["/images/products/pendant-boxes.jpg"] },
  { name: "Custom Pandasew Packaging", slug: "custom-pandasew-packaging", images: ["/images/products/custom-pandasew-packaging.jpg"] },
  { name: "Kraft Bulk Jewelry Boxes", slug: "kraft-bulk-jewelry-boxes", images: ["/images/products/kraft-bulk-jewelry-boxes.jpg"] },
  { name: "Custom Anklet Boxes", slug: "custom-anklet-boxes", images: ["/images/products/custom-anklet-boxes.jpg"] },
  { name: "Custom Bangle Boxes", slug: "custom-bangle-boxes", images: ["/images/products/custom-bangle-boxes.jpg"] },
  { name: "Corrugated Cake Boxes", slug: "corrugated-cake-boxes", images: ["/images/products/corrugated-cake-boxes.jpg"] },
  { name: "White Corrugated Boxes", slug: "white-corrugated-boxes", images: ["/images/products/white-corrugated-boxes.jpg"] },
  { name: "Corrugated Tuck Top Boxes", slug: "corrugated-tuck-top-boxes", images: ["/images/products/corrugated-tuck-top-boxes.jpg"] },
  { name: "Screen Printing Boxes", slug: "screen-printing-boxes", images: ["/images/products/screen-printing-boxes.jpg"] },
];

export const KRAFT_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-kraft",
  name: "Custom Kraft Boxes",
  slug: "custom-kraft-boxes",
  section: "material",
  hero_headline_white: "Custom Kraft Boxes",
  hero_headline_accent: "Sustainable Brand Choice",
  description: "Flat 20% Off on Your First Order + Free Shipping",
  image_url: "/images/categories/kraft-boxes-hero.png",
  banner_image_url: "/images/categories/kraft-boxes-hero.png",
  category_content: {
    content_blocks: [
      {
        heading: "Sustainable Packaging Options for a Greener Future",
        body: "If you are an eco-conscious brand, HOF Pack is here to provide you with reliable options to choose from. The future belongs to brands promoting green packaging. That is why we, as a manufacturing company based in the USA, prefer to incorporate recyclable packaging and biodegradable packaging materials for our custom rigid boxes. Book your wholesale order with us today!",
        image: "/images/categories/kraft-sustainable-options.jpg",
        alt: "Sustainable Packaging Options for a Greener Future",
        linkLabel: "Get a Free Quote →",
      },
      {
        heading: "Precise Fit & Engineered Style Kraft Boxes",
        body: "From material and design selection to assembly and shipping, our team designs high-quality kraft boxes, ensuring precision and careful engineering. Each personalized box, including candle kraft boxes, custom kraft gift boxes, or kraft pillow boxes, reflects our commitment to excellence, sustainability, and customer satisfaction.",
        image: "/images/categories/kraft-precise-fit.jpg",
        alt: "Variety of custom bakery packaging styles",
        flipped: true,
      },
      {
        heading: "Ready To Create Custom Kraft Packs Like No Other?",
        body: "Do not delay and order wholesale kraft paper boxes from us today. Start customization with us. Message us your industry, and we will suggest a box style with a free quote!",
        image: "/images/categories/kraft-ready-create.jpg",
        alt: "Ready To Create Custom Kraft Packs Like No Other?",
        linkLabel: "Request a quote",
      },
    ],
    why_heading: "Why Brands are Choosing Custom Kraft Boxes for Eco-Friendly Packaging",
    article_sections: [
      {
        level: "p",
        text: "In 2026, the demand for eco-friendly packaging is rising very fast. That is why HOF Pack offers recyclable materials, a minimalist branding trend, and a cost-effective solution to your plastic free packaging.",
      },
      {
        level: "h4",
        text: "Eco-Friendly Packaging That Builds Customer Trust",
      },
      {
        level: "p",
        text: "Adding a touch of sustainability will enhance the trust of your customers. Never let packaging undermine the credibility of your product. Choose the HOF Pack for wholesale eco friendly packaging.",
      },
      {
        level: "h4",
        text: "Strong Yet Lightweight Packaging for Product Protection",
      },
      {
        level: "p",
        text: "While not rigid, custom kraft boxes still offer a strong and lightweight packaging option for your products. Kraft paper boxes are the perfect choice for packaging food items, such as candies, fast foods, and greasy and hot foods.",
      },
      {
        level: "h4",
        text: "A Natural Look That Elevates Brand Identity",
      },
      {
        level: "p",
        text: "Kraft packaging boxes are a minimalist branding trend that brands use nowadays. Design your custom kraft presentation boxes with us and elevate the whole look of your small business or large enterprise’s eco friendly custom boxes.",
      },
      {
        level: "h3",
        text: "Explore our Wide Range of Custom Kraft Boxes",
      },
      {
        level: "p",
        text: "HOF Pack offers a myriad of custom printed kraft boxes that will enhance the credibility of your brand as an eco-conscious corporate sector. Get in touch with our consultation team for a complete analysis of your brand’s preferences and your product’s needs for custom kraft packaging.",
      },
      {
        level: "h4",
        text: "Custom Kraft Mailer Boxes",
      },
      {
        level: "p",
        text: "Custom kraft mailer boxes are ideal for e-commerce kraft shipping boxes and kraft subscription boxes. Book your wholesale order with us.",
      },
      {
        level: "h4",
        text: "Kraft Pillow Boxes",
      },
      {
        level: "p",
        text: "Kraft pillow packaging is a stylish, curved packaging used for small retail items and favors. Explore Kraft favor boxes on our website and book your wholesale order.",
      },
      {
        level: "h4",
        text: "Kraft Window Boxes",
      },
      {
        level: "p",
        text: "Showcase products through transparent windows with our display Kraft packaging. Kraft boxes with a window are ideal for food and bakery items.",
      },
      {
        level: "h4",
        text: "Kraft Tuck Boxes",
      },
      {
        level: "p",
        text: "Kraft tuck packaging is a simple yet highly versatile packaging style for retail products. Get our Kraft folding cartons for a simple and elegant look.",
      },
      {
        level: "h4",
        text: "Kraft Sleeve Boxes",
      },
      {
        level: "p",
        text: "Kraft sleeve packaging is the perfect way to showcase minimalist packaging with sliding sleeves for elegant presentation.",
      },
      {
        level: "h4",
        text: "Kraft Display Boxes",
      },
      {
        level: "p",
        text: "Our retail display Kraft boxes, designed for retail counters and product promotion, are ideal for the enhanced look and feel of your product. Explore our Kraft display packaging.",
      },
      {
        level: "h4",
        text: "Kraft Gable Boxes",
      },
      {
        level: "p",
        text: "Our Kraft gable boxes are ideal for take-outs and easy carrying of products. It’s a simple yet aesthetic look that will make your product stand out.",
      },
      {
        level: "h4",
        text: "Kraft Paper Tubes",
      },
      {
        level: "p",
        text: "HOF Pack offers versatile, eco-friendly options for Kraft paper tubes. Made from paperboard, these packaging designs are designed for storage purposes in homes, offices, and even construction sites.",
      },
      {
        level: "h2",
        text: "Customize your Kraft Boxes to Match Your Brand:",
      },
      {
        level: "p",
        text: "Every brand is different, and your packaging should reflect that. Our custom kraft boxes are designed to match your exact product needs, brand identity, and customer expectations. From size and structure to printing and finishing, we let you choose the packaging that speaks to your customers. Whether you’re a startup or an established business, at HOF Pack, we make customization simple, flexible, and results-driven.",
      },
      {
        level: "h4",
        text: "Custom Sizes & Box Styles",
      },
      {
        level: "p",
        text: "We offer fully custom-sized kraft boxes to ensure a perfect fit for your products. Whether you need compact packaging or large boxes, our team creates precise custom packaging dimensions that reduce waste and improve presentation.",
      },
      {
        level: "h4",
        text: "Kraft Box Small Size",
      },
      {
        level: "p",
        text: "- 2.16 x 2.16 x 0.98 inches\n- 2.44 x 2.44 x 1.38 inches\n- 1.57 x 1.57 x 0.98 inches",
      },
      {
        level: "h4",
        text: "Kraft Box Medium Size",
      },
      {
        level: "p",
        text: "- 3.5 x 2.35 x 1.2 inches\n- 3.35 x 2.35 x 1.18 inches",
      },
      {
        level: "h4",
        text: "Kraft Box Large Size",
      },
      {
        level: "p",
        text: "- 4 x 4 x 3 inches\n- 3 x 3 x 1 inches",
      },
      {
        level: "h2",
        text: "Custom Kraft Packaging Solutions for Multiple Industries",
      },
      {
        level: "p",
        text: "Our custom kraft boxes are versatile and suitable for a wide range of industries. Whether your focus is on sustainability ot brand presentation, custom printed kraft boxes offer both a minimalistic and neutral, earth-toned look.",
      },
      {
        level: "h4",
        text: "Food and Bakery Packaging",
      },
      {
        level: "p",
        text: "Our Kraft food boxes are ideal for bakeries and food brands seeking saleable, hygienic, and attractive packaging. These solutions are perfect for takeaway, storage, and display while maintaining freshness. Nobody remembers how many calories in kraft mac and cheese box; they all remember the packaging.",
      },
      {
        level: "h4",
        text: "Cosmetics and Skincare Packaging",
      },
      {
        level: "p",
        text: "Enhance your product appeal with Kraft cosmetic boxes that combine sustainability with elegance. These boxes are perfect for brands that want eco-friendly packaging without compromising on aesthetics.",
      },
      {
        level: "h4",
        text: "Retail and Apparel Packaging",
      },
      {
        level: "p",
        text: "Our Kraft retail packaging boxes provide a clean and professional look for clothing and retail items. They are sturdy, stylish, and ideal for both in-store and e-commerce packaging.",
      },
      {
        level: "h4",
        text: "Gift and Promotional Packaging",
      },
      {
        level: "p",
        text: "Create memorable experiences with Kraft promotional boxes designed for gifts, events, and marketing campaigns. Their natural look adds a unique touch while keeping packaging cost-effective. Explore our kraft gift boxes.",
      },
      {
        level: "h3",
        text: "Why do U.S. Brands Trust HOF Pack?",
      },
      {
        level: "p",
        text: "U.S. Brands rely upon HOF Pack because of our easy process, innovative ideas, fast process, and high-end products’ bulk packaging. We offer quality assurance, a wholesale option, functionality, speed, low MOQs, flexible pricing, and worldwide shipping.",
      },
    ],
    material_items: [
      "Natural Kraft Pulp",
      "Recycled Fibres",
      "PLA Bioplastics",
      "Kraft cardboard boxes",
    ],
    perk_items: [
      "Wholesale Pricing",
      "Fast production turnaround",
      "No Delays",
      "Innovative Printing Designs",
      "Free design consultation",
      "Flexible MOQ",
      "Competitive Bulk discounts",
      "Startup-friendly Packaging",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "Can I opt for a white Kraft substrate, and what benefits does it offer?",
      answer:
        "Yes, you can definitely opt for a white Kraft substrate for packaging and printing needs. White Kraft is a durable alternative to traditional brown Kraft. It offers a clean aesthetic while maintaining the strength and eco-friendly appeal of natural Kraft paper.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "Can I design a custom kraft box with a window cut-out?",
      answer:
        "Yes, HOF Pack offers a window cut option for custom kraft packaging boxes. It is a versatile solution for showcasing products while maintaining an eco-friendly appeal.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "What is the minimum order quantity for Kraft boxes?",
      answer:
        "There is no minimum order for our kraft boxes. You can get a few sample boxes if you need to check the material and quality before going big. However, keep in mind that larger orders lower the cost per unit. Your account rep can help you find the best quantity to keep your order on a budget.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "How to measure the length, width, and height of my custom Kraft box?",
      answer:
        "To measure the dimensions of a custom kraft box, use a ruler or tape measure to determine the length, width, and height in that order (L x W x H). The internal dimensions are measured to determine the capacity of the box, and the external sides are measured for shipping. From the inside, measure the longest side (length), then the shorter side (width) of the opening, and lastly the vertical side (height) to get exact dimensions.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "Are Kraft boxes eco-friendly?",
      answer:
        "Yes, Kraft boxes are considered an eco-friendly option and are a great alternative to heavily bleached cardboard boxes and plastic packages.",
      display_order: 5,
    },
    {
      id: "faq-6",
      question: "Can I print my logo on kraft packaging?",
      answer:
        "Yes, we provide customized logo printing options for packaging design. Explore our digital printing and holographic printing options for an upscale look.",
      display_order: 6,
    },
    {
      id: "faq-7",
      question: "Are cardboard Kraft boxes strong enough to be used as shipping boxes?",
      answer:
        "Regular Kraft boxes are not strong enough to be used as shipping boxes. You can go for recyclable kraft corrugated cartons, as these boxes are manufactured with Kraft paper and corrugated sheets that provide strength to the boxes. Corrugated cartons ensure your items arrive safely at your door.",
      display_order: 7,
    },
  ],
};

export const MYLAR_RELATED_PRODUCTS = [
  { name: "Custom Earring Boxes", slug: "custom-earring-boxes", images: ["/images/products/custom-earring-boxes.jpg"] },
  { name: "Custom Ring Boxes", slug: "custom-ring-boxes", images: ["/images/products/custom-ring-boxes.jpg"] },
  { name: "Bracelet Boxes", slug: "bracelet-boxes", images: ["/images/products/bracelet-boxes.jpg"] },
  { name: "Pendant Boxes", slug: "pendant-boxes", images: ["/images/products/pendant-boxes.jpg"] },
  { name: "Custom Pandasew Packaging", slug: "custom-pandasew-packaging", images: ["/images/products/custom-pandasew-packaging.jpg"] },
  { name: "Kraft Bulk Jewelry Boxes", slug: "kraft-bulk-jewelry-boxes", images: ["/images/products/kraft-bulk-jewelry-boxes.jpg"] },
  { name: "Custom Anklet Boxes", slug: "custom-anklet-boxes", images: ["/images/products/custom-anklet-boxes.jpg"] },
  { name: "Custom Bangle Boxes", slug: "custom-bangle-boxes", images: ["/images/products/custom-bangle-boxes.jpg"] },
  { name: "Corrugated Cake Boxes", slug: "corrugated-cake-boxes", images: ["/images/products/corrugated-cake-boxes.jpg"] },
  { name: "White Corrugated Boxes", slug: "white-corrugated-boxes", images: ["/images/products/white-corrugated-boxes.jpg"] },
  { name: "Corrugated Tuck Top Boxes", slug: "corrugated-tuck-top-boxes", images: ["/images/products/corrugated-tuck-top-boxes.jpg"] },
  { name: "Screen Printing Boxes", slug: "screen-printing-boxes", images: ["/images/products/screen-printing-boxes.jpg"] },
];

export const MYLAR_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-mylar",
  name: "Custom Mylar Bags",
  slug: "custom-mylar-bags",
  section: "material",
  hero_headline_white: "Custom Mylar Bags",
  hero_headline_accent: "Durable Sealed Protection",
  description: "Flat 20% Off on Your First Order + Free Shipping",
  image_url: "/images/categories/mylar-bags-hero.jpg",
  banner_image_url: "/images/categories/mylar-bags-hero.jpg",
  category_content: {
    content_blocks: [
      {
        heading: "Maximum Protection for Sensitive Products",
        body: "Many businesses face issues like moisture damage, air exposure, and odor leakage. Mylar bags custom solutions provide an airtight barrier that protects products, especially food, from humidity, light, and contamination. Mylar packaging keeps the food fresh and preserves its shelf life for longer.",
        image: "/images/categories/mylar-max-protection.jpg",
        alt: "Maximum Protection for Sensitive Products",
        linkLabel: "Get a Free Quote →",
      },
      {
        heading: "Why Brands are Choosing Custom Mylar Bags?",
        body: "Did you know that the vacuum seal of mylar bags increases the product protection for up to 30 years? Yes, you heard it right. Their durable style makes it user-friendly and product-friendly. Brands are choosing mylar bags for their functionality, aesthetics, easy packaging, and customer-friendly nature.",
        image: "/images/categories/mylar-why-brands.jpg",
        alt: "Variety of custom bakery packaging styles",
        flipped: true,
      },
      {
        heading: "Ready to Create Packaging That Markets Your Brand For You?",
        body: "Plain packaging gets ignored. With custom mylar bags with logo, you can create eye-catching designs that attract customers instantly. These custom mylar bags help brands in the USA and all around the world stand out on shelves and online.",
        image: "/images/categories/mylar-ready-create.jpg",
        alt: "Ready to Create Packaging That Markets Your Brand For You?",
        linkLabel: "Get a Packaging Report →",
      },
    ],
    why_heading: "Explore our Wide Range of Custom Mylar Bags",
    article_sections: [
      {
        level: "p",
        text: "Get your hands on custom mylar bags wholesale for a premium packaging solution that is secure, looks appealing, and enhances the shelf-life of products.",
      },
      {
        level: "h4",
        text: "Food Storage Mylar Bags:",
      },
      {
        level: "p",
        text: "Explore our mylar bags for food storage to keep your food preserved, fresh, and savory.",
      },
      {
        level: "h4",
        text: "Custom die-cut mylar bags:",
      },
      {
        level: "p",
        text: "Our custom die-cut mylar bags offer unlimited customized options to make your package stand out.",
      },
      {
        level: "h4",
        text: "Child-Resistant Mylar Bags:",
      },
      {
        level: "p",
        text: "Child-resistant mylar bags are extensively used in pharmaceutical, cannabis, and household chemical industries to secure them from little hands.",
      },
      {
        level: "h4",
        text: "Custom Weed Mylar Bags",
      },
      {
        level: "p",
        text: "Get our custom weed mylar bags for sealed, vacuumed, and moisture-free packaging to secure your products, like marijuana, weed, cannabis, and hemp flower extractions.",
      },
      {
        level: "h4",
        text: "Kraft Mylar Bags",
      },
      {
        level: "p",
        text: "Use Kraft mylar bags for sustainable and toxin-free packaging for tea, coffee, food products, or pharmaceuticals.",
      },
      {
        level: "h4",
        text: "Spout Pouches",
      },
      {
        level: "p",
        text: "Explore our spout bags for the convenience of dispensing liquids or semi-liquids with functionality and stability.",
      },
      {
        level: "h2",
        text: "Customize your Mylar Bags to Match Your Brand:",
      },
      {
        level: "p",
        text: "From wholesale custom mylar bags to niche packaging solutions, HOF Pack covers every requirement with precision and quality to provide you with the perfect mylar pouches that your products deserve. Reach out to us, and we will help you design, customize, and choose the perfect mylar bag for you.",
      },
      {
        level: "h4",
        text: "Custom Sizes & Styles",
      },
      {
        level: "p",
        text: "Every product is different, and your packaging should match it perfectly. Our Custom Mylar Bags come in various sizes and styles to fit your product securely, reducing waste and improving presentation.",
      },
      {
        level: "h4",
        text: "High-Quality Printing",
      },
      {
        level: "p",
        text: "Your packaging is your brand’s first impression. With advanced printing options, custom mylar bags with logo allow you to showcase your brand identity through bold colors, sharp graphics, and clear product details.",
      },
      {
        level: "h4",
        text: "Premium Finishing Options",
      },
      {
        level: "p",
        text: "Enhance your packaging with matte, glossy, holographic, or foil finishes. These finishing options make your Mylar bags look premium and more appealing to customers.",
      },
      {
        level: "h4",
        text: "Inserts & Add-Ons for Product Protection",
      },
      {
        level: "p",
        text: "Add zip locks, tear notches, valves, and resealable closures to your custom mylar bags wholesale orders. These features improve functionality and ensure product safety.",
      },
      {
        level: "h4",
        text: "Smell-Proof and Secure Packaging that Builds Trust",
      },
      {
        level: "p",
        text: "For industries like food, herbs, and specialty products, odor control is critical. Custom mylar bags wholesale options offer smell-proof technology and secure sealing, ensuring safe storage and transport.",
      },
      {
        level: "h4",
        text: "Custom Packaging Solutions for Multiple Industries",
      },
      {
        level: "p",
        text: "Mylar Bags are a durable, lightweight, and affordable packaging solution that is not only space-efficient but also cost-effective. From shipping to customer usage, these pouches are the most enduring packaging option for multiple industries.",
      },
      {
        level: "h4",
        text: "Food and Snack Packaging",
      },
      {
        level: "p",
        text: "Our Custom Mylar Bags for food storage are ideal for snacks, dry foods, and coffee. They maintain freshness, keep moisture away, and prevent contamination, making them a trusted solution for food businesses.",
      },
      {
        level: "h4",
        text: "Cannabis and Herbal Products",
      },
      {
        level: "p",
        text: "Smell-proof and child-resistant Custom Weed Mylar Bags are widely used in the cannabis and herbal industries all across the US and the rest of the world for compliance and safety.",
      },
      {
        level: "h4",
        text: "Cosmetics and Personal Care",
      },
      {
        level: "p",
        text: "Sealed mylar bags are perfect for powders, bath salts, and beauty products. Mylar bags custom protect against moisture and air exposure, increasing the shelf life of products.",
      },
      {
        level: "h4",
        text: "Retail and E-commerce Packaging",
      },
      {
        level: "p",
        text: "For online businesses, wholesale custom mylar bags offer lightweight, durable packaging that reduces shipping costs while protecting products.",
      },
      {
        level: "h2",
        text: "Why do U.S. Brands Trust HOF Pack?",
      },
      {
        level: "p",
        text: "We deliver Custom Mylar Bags that combine protection, branding, and affordability, helping businesses grow faster.\n\nHere’s how we stand out from the rest.",
      },
    ],
    material_items: [
      "Airtight & Moisture-Barrier Protection",
      "Odor-Proof & Leak-Resistant Layers",
      "Resealable Zip Lock Options",
      "Durable Multi-Layer Film Structure",
    ],
    perk_items: [
      "Wholesale Pricing",
      "Fast production turnaround",
      "No Delays",
      "Innovative Printing Designs",
      "Free design consultation",
      "Flexible MOQ",
      "Competitive Bulk discounts",
      "Startup-friendly Packaging",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "What are custom mylar bags used for?",
      answer:
        "They are used for packaging food, herbs, cosmetics, and retail products due to their protective, odor-free, moisture-free, and durable properties.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "Are custom mylar bags smell-proof?",
      answer: "Yes, they are designed to lock in odors and protect contents from external exposure.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "Can I customize mylar bags with my logo?",
      answer: "Yes, we offer full customization, including printing, size, and finishing options.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "Do you offer custom mylar bags wholesale?",
      answer: "Yes, we provide custom mylar bags wholesale with flexible MOQ and bulk discounts",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "Are mylar bags eco-friendly?",
      answer:
        "Some options, such as biodegradable mylar bags or kraft mylar bags, are available for sustainable packaging solutions.",
      display_order: 5,
    },
    {
      id: "faq-6",
      question: "What are the mylar pouch dimensions?",
      answer:
        "In mylar pouches, the dimensions are measured by length (L), height (h), and gusset (g), in this exact order.",
      display_order: 6,
    },
    {
      id: "faq-7",
      question: "Can I get a sample of my custom Mylar bags before placing a full order?",
      answer:
        "Yes, you can ask for a sample before finalizing your mylar bags order in bulk. You can check its quality, design, and features before going big.",
      display_order: 7,
    },
  ],
};

export const RIGID_RELATED_PRODUCTS = [
  { name: "Child Resistant Rigid Boxes", slug: "child-resistant-boxes", images: ["/images/products/child-resistant-boxes.jpg"] },
  { name: "Rigid Jewellery Boxes", slug: "rigid-jewellery-boxes", images: ["/images/products/rigid-jewellery-boxes.jpg"] },
  { name: "Custom Shoulder Boxes", slug: "custom-shoulder-boxes", images: ["/images/products/custom-shoulder-boxes.jpg"] },
  { name: "custom Perfume Boxes", slug: "custom-perfume-boxes", images: ["/images/products/custom-perfume-boxes.jpg"] },
  { name: "Collapsible Rigid Boxes", slug: "collapsible-rigid-boxes", images: ["/images/products/collapsible-rigid-boxes.jpg"] },
  { name: "Magnetic Closure Boxes", slug: "magnetic-closure-boxes", images: ["/images/products/magnetic-closure-boxes.jpg"] },
  { name: "Two Piece Rigid Boxes", slug: "two-piece-rigid-boxes", images: ["/images/products/two-piece-rigid-boxes.jpg"] },
  { name: "Rigid Setup Boxes", slug: "rigid-setup-boxes", images: ["/images/products/rigid-setup-boxes.jpg"] },
  { name: "Custom Booklet Boxes", slug: "custom-booklet-boxes", images: ["/images/products/custom-booklet-boxes.jpg"] },
];

export const RIGID_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-rigid",
  name: "Custom Rigid Boxes",
  slug: "custom-rigid-boxes",
  section: "material",
  hero_headline_white: "Custom Rigid Boxes",
  hero_headline_accent: "Adds Luxury Touch",
  description: "Flat 20% Off on Your First Order + Free Shipping",
  image_url: "/hero-rigid-boxes.png",
  banner_image_url: "/hero-rigid-boxes.png",
  category_content: {
    content_blocks: [
      {
        heading: "Upgrade Your Packaging Look With A Luxury Rigid Design",
        body: "Custom rigid boxes are the perfect “cherry on top” for your high-end products. By providing premium product packaging, we not only preserve your brand’s identity but also upscale the whole look of luxury products. Just give us your logo, design preferences, and color palette, and leave the rest to us.",
        image: "/images/categories/rigid-upgrade-luxury.jpg",
        alt: "Custom bakery boxes for baked goods",
        linkLabel: "Get a Free Quote →",
      },
      {
        heading: "Create a Pleasant Unboxing Experience with Rigid Boxes",
        body: "Your brand or startup deserves a packaging box that looks premium, feels sturdy, and sells your product before it’s even opened. That is why we want you to choose our structural custom rigid boxes that align seamlessly with your brand and product presentation.",
        image: "/images/categories/rigid-unboxing-experience.jpg",
        alt: "Variety of custom bakery packaging styles",
        flipped: true,
      },
      {
        heading: "Ready to Design Rigid Boxes That Speak For You?",
        body: "At HOF Pack, we offer fast turnaround and upscale packaging solutions that you & your customers will love. So, stop delaying and message us for a free design consultation and free quote.",
        image: "/images/categories/rigid-ready-design.jpg",
        alt: "Fresh bakery products in custom packaging",
        linkLabel: "Get a Packaging Report →",
      },
    ],
    why_heading: "What Makes Rigid Boxes Look Premium and Luxury?",
    article_sections: [
      {
        level: "p",
        text: "Rigid boxes look premium and luxurious through their:\n• Sturdy, non-collapsible chipboard construction\n• High-quality tactile wraps of leather, fabric, and velvet\n• Hot finishing techniques: foil stamping, embossing, and magnetic closures\n• Weight of the box\n• Precise sharp edges\n• Curated interior inserts\n• Secure unboxing experience",
      },
      {
        level: "h2",
        text: "Explore Different Styles of Custom Rigid Boxes at HOF Pack",
      },
      {
        level: "p",
        text: "Whether you want a custom box for gifts, candle sets, chocolates, or a custom rigid box for luxury and high-end products, such as jewelry pieces, electronics, makeup, watches, or perfumes, our diverse custom design packaging options at HOF Pack are ready for you!",
      },
      {
        level: "h4",
        text: "Magnetic Closure Rigid Boxes",
      },
      {
        level: "p",
        text: "One of our best-selling designs is the magnetic closure rigid box. These fine-quality boxes are ideal for luxury brand packaging, such as fragrances and cosmetics. The best part is that you can design the boxes yourself to reflect your brand’s identity and our premium brand packaging solutions. We are also not rigid about our minimum order quantity. Choose us for hassle-free services.",
      },
      {
        level: "h4",
        text: "Two Piece Rigid Boxes",
      },
      {
        level: "p",
        text: "If you want protective packaging for your premium products, our team also customizes two piece rigid boxes. These have a base to store the product and a lid to cover it. Such non-collapsible and sturdy boxes are perfect for protective packaging solutions for your exclusive products because they are made of thick, high-grade chipboard. Avail our services for luxury brand packaging.",
      },
      {
        level: "h4",
        text: "Drawer Rigid Boxes",
      },
      {
        level: "p",
        text: "As the name suggests, our drawer rigid boxes are the ideal retail display packaging solutions. They have an inner tray sliding like a drawer, used to store exquisite products. These chic-looking custom boxes are not only sumptuous but also affordable, providing a durable packaging solution that your product deserves and customers desire.",
      },
      {
        level: "h4",
        text: "Collapsible Rigid Boxes",
      },
      {
        level: "p",
        text: "Our bespoke and high end packaging makes us stand out from the rest of the packaging companies. Our collapsible rigid boxes give a lavish feel and storage efficiency. These custom design boxes can be folded flat, combining the deluxe look of a fixed rigid box but providing the storage of a folding carton.",
      },
      {
        level: "h4",
        text: "Custom Shoulder Neck Boxes",
      },
      {
        level: "p",
        text: "We understand that brands sometimes need upscale packaging solutions for their luxurious items like perfumes, jewellery, cosmetics, and electronics. That is why we provide shoulder neck boxes: a premium, three-piece rigid packaging structure consisting of a base, a separate lid, and an inner shoulder or neck that sits flush with the walls, creating a stepped, luxurious look.",
      },
      {
        level: "h4",
        text: "Child Resistant Rigid Boxes",
      },
      {
        level: "p",
        text: "Get our premium-quality rigid structure boxes that not only look appealing but are also child-resistant. Keep delicate and dangerous products away from your children with a study, aesthetic, child resistant rigid box. Enhance your packaging game with HOF Pack. We ensure product presentation with utmost precision and care for luxury goods.",
      },
      {
        level: "h4",
        text: "Rigid Setup Boxes",
      },
      {
        level: "p",
        text: "Our bespoke and high end packaging is ideal for retail design boxes. With 15+ years of experience, our packaging designs make us stand out from the rest of the packaging companies. Explore our rigid setup boxes, which give a lavish feel and storage efficiency.",
      },
      {
        level: "h4",
        text: "Custom Booklet Boxes",
      },
      {
        level: "p",
        text: "Get our custom booklet presentation boxes to turn your ordinary packaging into a luxury booklet-style packaging design that holds value to your customers. Our custom booklet packaging gives your product the look and unboxing experience it deserves the moment your customer opens it.",
      },
      {
        level: "h4",
        text: "Custom Cylinder Packaging",
      },
      {
        level: "p",
        text: "Your packaging should catch your customers' attention at first glance. Through our cylinder packaging design, we deliver both visual appeal and dependable product protection. Their elegant, round shape and robust build provide a distinctive, modern look that will immediately differentiate your brand from a local one. Get an out-of-the-box experience with us.",
      },
      {
        level: "h2",
        text: "Industry Usage of Our Custom Design Boxes",
      },
      {
        level: "p",
        text: "Do you know what makes a product stand out? It's the power of product presentation packaging. At HOF Pack, our custom rigid boxes are not limited to a specific industry. We provide a wide range of industry usage custom boxes that improve the look and feel of luxury products.",
      },
      {
        level: "h4",
        text: "Cosmetic Packaging",
      },
      {
        level: "p",
        text: "Your makeup deserves two things: protective packaging and luxury brand packaging. Whether you want to send a PR, ship a parcel, or import your high-end makeup products, our customized rigid boxes for the makeup industry will not leave you stranded.",
      },
      {
        level: "h4",
        text: "Jewelry Packaging",
      },
      {
        level: "p",
        text: "The perfect gift option does exist. With custom jewelry packaging options and premium product packaging, you can upscale those aesthetics you were craving for your jewelry brand. Make your products look Pinterest-worthy with our jewelry packaging boxes. You can choose magnetic closure boxes, rigid light boxes, or shoulder-neck boxes, whatever you prefer.",
      },
      {
        level: "h4",
        text: "Electronics Packaging",
      },
      {
        level: "p",
        text: "For delicate devices like electronics, custom rigid boxes are important to provide sturdy, secure packaging that ensures maximum protection during storage and shipping. These electronics packaging boxes are designed with inserts and cushioning that keep them safe from damage and scratches. And their sleek, professional look elevates brand perception, making them ideal for premium gadgets, accessories, and tech products that require both durability and visual appeal.",
      },
      {
        level: "h4",
        text: "Gift Packaging",
      },
      {
        level: "p",
        text: "Custom rigid boxes are perfect for creating elegant and memorable gift packaging solutions. Whether you want to send a jewelry piece for your friend or a special gift for your special one, the sturdy structure and luxurious finish of gift packaging boxes make them ideal for high-end gifts, promotional items, and special occasions. Moreover, add-ons like ribbons, magnetic lids, and custom prints enhance the overall gifting experience while keeping the product secure.",
      },
      {
        level: "h2",
        text: "Materials & Printing We Use:",
      },
      {
        level: "p",
        text: "Product presentation not only involves the designs but also the quality of materials used. Our high end packaging solution uses eco-friendly, sustainable materials that are not only recyclable and reusable but also biodegradable.",
      },
      {
        level: "h4",
        text: "Chipboard thickness:",
      },
      {
        level: "p",
        text: "Our premium finish chipboard-made custom boxes provide a sturdy look. It protects delicate materials like electronics, jewelry, perfumes, or makeup products, while also providing a variety of design options to customize the perfect box for your brand.",
      },
      {
        level: "h4",
        text: "Finishing Touches for Rigid Boxes:",
      },
      {
        level: "p",
        text: "Every brand knows the importance of finishes. One final touch can make the product go from average to an exclusive design. That is why we provide a perfect finish look to your high-end, luxury products that demand customer fascination and the brand’s identity. Whether you want a matte finish, glossy look, embossing, debossing, or foil stamping, we can get it done.",
      },
      {
        level: "h4",
        text: "Custom Inserts",
      },
      {
        level: "p",
        text: "Premium quality products deserve premium service. That is why our company ensures your products remain organized and damage-free during packaging and shipping. Our inserts, such as foam, cardboard, or fabric lining, fit perfectly to the contours of your product, whether it is a jewellery piece, a perfume bottle, or a watch.",
      },
      {
        level: "h4",
        text: "Eco-friendly Options",
      },
      {
        level: "p",
        text: "We understand the balance between consumer demand and sustainability demands for a green future. That is why we use eco-friendly materials for our custom rigid boxes. Aesthetic and sustainable, our premium product packaging ensures that your products look presentable and chic while preserving the natural limits of our dear Earth.",
      },
      {
        level: "h2",
        text: "Our Step-by-Step Custom Design Packaging Process:",
      },
      {
        level: "p",
        text: "- Talk to our consultation team to design and choose the perfect design for your product.\n- Try a sample custom box design first before finalizing a mass retail order.\n- Get a quote from us and let our production team do the magic.\n- Once your order is ready, our logistics team will deliver your custom boxes safe and sound.\n- Give us a review of our customer service and production style.",
      },
      {
        level: "h2",
        text: "Why Brands In The US Should Choose HOF Pack for Rigid Boxes?",
      },
      {
        level: "p",
        text: "Choose us, not because we say so, but because our values uphold the very essence of integrity, transparency, and elegance. Customize your perfect rigid box with us and see for yourself. Contact our team at info@hofpack.com or call +1 (888) 429-4881 for a free consultation.",
      },
    ],
    material_items: [
      "FSC certified",
      "CMYK Printing Options",
      "5000+ trusted clients",
    ],
    perk_items: [
      "Wholesale Pricing with Free Sample",
      "8-10 days turnaround",
      "Free Shipping all Across the US",
      "Innovative Printing Designs",
      "Free design consultation",
      "MOQ as low as 100 units",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "What is your minimum order quantity (MOQ)?",
      answer:
        "There is no specific minimum order quantity for your order. Based on your design and personalized custom rigid box style, we will make sure to assist you in any way possible.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "What is the turnaround time for retail display packaging?",
      answer:
        "The turnaround time depends on the complexity of your custom box design and the number of custom rigid boxes you order from us. Usually, it takes 10-12 days. Large orders can also take 15 days or more.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "Will a sample box be provided or shown before the final order?",
      answer:
        "Absolutely, you can order a sample custom box from us before finalizing the order. We believe in transparency, trust building, and customer service, before the company’s profit.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "Can our brand’s logo and color palette be used in custom rigid boxes?",
      answer:
        "Yes, you can definitely add your logo and custom design or color palette to our custom rigid boxes. We also provide expert services for consultation that would help you get the perfect packaging boxes for your brand.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "Do you offer an affordable custom rigid box option?",
      answer:
        "Although custom rigid boxes are designed for luxury products, their intricacy makes them expensive; we are open to negotiating with you. Our consultation team can help you get affordable options within your budget without compromising the quality and look of your custom packaging boxes.",
      display_order: 5,
    },
  ],
};

export const STICKERS_RELATED_PRODUCTS = [
  { name: "Cookies Mylar Bags", slug: "cookies-mylar-bags", images: ["/images/products/cookies-mylar-bags.jpg"] },
  { name: "Press On Nail Packaging", slug: "press-on-nail-packaging", images: ["/images/products/press-on-nail-packaging.jpg"] },
  { name: "Black Tube Packaging", slug: "black-tube-packaging", images: ["/images/products/black-tube-packaging.jpg"] },
  { name: "CBD Display Boxes", slug: "cbd-display-boxes", images: ["/images/products/cbd-display-boxes.jpg"] },
  { name: "Custom Booklet Boxes", slug: "custom-booklet-boxes", images: ["/images/products/custom-booklet-boxes.jpg"] },
  { name: "Custom Holographic Boxes", slug: "custom-holographic-boxes", images: ["/images/products/custom-holographic-boxes.jpg"] },
];

export const STICKERS_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-labels-stickers",
  name: "Custom Labels And Stickers",
  slug: "custom-labels-and-stickers",
  section: "style",
  hero_headline_white: "Custom Labels And Stickers",
  hero_headline_accent: "Makes Brands Memorable",
  description: "",
  image_url: "/images/categories/labels-stickers-hero.png",
  banner_image_url: "/images/categories/labels-stickers-hero.png",
  category_content: {
    content_blocks: [
      {
        heading: "Small Details That Make a Big Difference",
        body: "Not every branding tool has to be expensive or huge. A well-designed label, even though it is a small branding tool, can instantly transform plain packaging into something professional and memorable. It helps brands create an identity, so customers can identify your products, recognize your brand, and understand key product details at a glance. Think about it. Before customers try your product, they often read the label first. That’s why labels and stickers remain one of the most cost-effective marketing tools available.",
        image: "/images/categories/labels-small-details.jpg",
        alt: "labels and stickers",
      },
      {
        heading: "One Solution, Endless Applications",
        body: "Custom labels and stickers can be used almost anywhere. Whether you’re launching a new product or refreshing your packaging, custom labels help create a more professional presentation. With custom stickers and labels, you do not have to use fully custom printed boxes and bags. A simple custom label and stickers can make your simple kraft box or cardboard box into a branding tool. They can be used for product packaging, food and beverage containers, cosmetic packaging, candle jars, coffee bags, shipping boxes, mailers, retail packaging, promotional giveaways, and bottle labeling.",
        image: "/images/categories/labels-endless-applications.jpg",
        alt: "custom labels and stickers",
        flipped: true,
      },
      {
        heading: "Customize Labels That Match Your Brand",
        body: "Every business has different branding goals. That’s why we offer complete customization options. Whether you need minimalist product labels or bold promotional stickers, we can create a solution tailored just to your brand.",
        image: "/images/categories/labels-customize-brand.jpg",
        alt: "custom labels and stickers wholesale",
        linkLabel: "Start Customizing with Us!",
      },
    ],
    why_heading: "How Do Labels Help Build Brand Recognition?",
    article_sections: [
      {
        level: "p",
        text: "Consistency creates trust. When customers repeatedly see the same logo, colors, and design elements, they begin to recognize your brand more easily. Custom printed labels and stickers help create that consistency across products, packaging, shipping materials, and retail displays. Even a simple sticker can reinforce your brand identity every time a customer interacts with your product. Thus, customized labels and stickers help every brand create a consistent identity and develop trust for repeat purchases and customer memory.",
      },
      {
        level: "h2",
        text: "What Types of Labels & Stickers Are Available?",
      },
      {
        level: "p",
        text: "Different products require different labeling solutions. Some of the most popular options include product labels, bottle labels, jar labels, packaging stickers, shipping labels, barcode labels, warning labels, promotional stickers, logo stickers, and tamper-evident seals. Choosing the right label depends on your product, application, and branding requirements. At HOF Pack, we provide all format flexibility for roll labels vs. cut-to-size sheets for operational efficiency. Whether a business needs roll labels (for machine application and high-volume assembly lines) or custom sticker sheets (for hand application, promotional swag, or boutique runs), we provide fully customized stickers and labels.",
      },
      {
        level: "h2",
        text: "Choose the Right Material: Selecting Your Adhesive Canvas",
      },
      {
        level: "p",
        text: "Not all labels are created equal. Paper labels work well for general retail packaging and promotional uses. Waterproof labels are ideal for products exposed to moisture, such as cosmetics, beverages, and personal care items. Clear labels create a modern “no-label” appearance, while kraft labels are popular with handmade and eco-conscious brands. Our team can help you select the best material based on your product and environment.",
      },
      {
        level: "h4",
        text: "Waterproof Vinyl & BOPP (Biaxially-Oriented Polypropylene)",
      },
      {
        level: "p",
        text: "The ultimate solution for cosmetics, bath products, and beverages. BOPP is the industry standard for oil, water, and chemical resistance because of its inherent molecular structure. The polymer chains are tightly bound, creating an impermeable barrier that protects packaged goods and ensures labels remain spotless and clean.",
      },
      {
        level: "h4",
        text: "Premium Matte Paper & Eco-Friendly Kraft Labels",
      },
      {
        level: "p",
        text: "These customized stickers are used for clean-beauty, gourmet food, and organic brands that focus on tactile texture, glare-free aesthetics, and sustainable adhesive options.",
      },
      {
        level: "h4",
        text: "Luxury Specialty Finishes: Holographic, Metallic, & Clear Bases",
      },
      {
        level: "p",
        text: "Clear \"No-Look\" labels for sleek glass jars, and metallic foil stocks or holographic stickers for eye-catching visual pops for retail brands that want their product to outshine and stand out on the retail shelves.",
      },
      {
        level: "h2",
        text: "Application Mechanics & Adhesive Profiles",
      },
      {
        level: "p",
        text: "You can also choose the application mechanics for custom stickers and labels for business. Whether you want permanent stickers or removable stickers, you can customize them on your own based on your brand and product needs.",
      },
      {
        level: "h4",
        text: "Permanent vs. Removable Adhesives",
      },
      {
        level: "p",
        text: "Permanent adhesive stickers bond strongly with the surface and can not be easily removed without tearing the personalized stickers or damaging the surface beneath. They are resistant to water, moisture, UV, and are ideal for outdoor signage and for immediate retail security. On the other hand, residue-free removable adhesives peel off easily without damaging the surface and are best for jar lids, candle warnings, or promotional glass stickers.",
      },
      {
        level: "h4",
        text: "Precision Machine-Unwind Directions",
      },
      {
        level: "p",
        text: "At HOF Pack, we configure roll unwind directions (Top, Bottom, Right, Left) so they integrate flawlessly with automated labeling machinery without jamming. It is important to understand unwind direction because it guarantees that your product labeling lines up correctly without jamming the machine or placing labels upside down or sideways. However, if you’re a small business that places the stickers by hand, then this information is not for you.",
      },
      {
        level: "h2",
        text: "Printing & Finishing Options That Help You Stand Out",
      },
      {
        level: "p",
        text: "A label should do more than share information. It should attract attention. At HOF Pack, we use the best online custom printer for roll labels and stickers to help brands achieve the premium look. These finishing options help create labels that feel professional and visually appealing. We offer:\n• Full-color CMYK printing\n• Pantone color matching\n• Matte finishes\n• Gloss finishes\n• Spot UV\n• Foil stamping\n• Embossing\n• Custom die-cut shapes",
      },
      {
        level: "h2",
        text: "The Durability Dilemma: Moisture & Oil Resistance",
      },
      {
        level: "p",
        text: "We help brands solve the \"fading/peeling\" nightmare for customize stickers and print labels. HOF Pack labels handle environments like steamy showers (shampoo bottles), oily contents (essential oils/serums), or refrigeration (beverages) without bleeding or lifting. That is why we’re considered a reliable packaging partner and custom packaging manufacturer in the US market. Say no to cheap custom labels and stickers because HOF Pack is here in the United States to provide premium-quality custom labels and stickers printing at affordable prices. We help brands achieve premium-level packaging to increase their perceived value and credibility in the relevant industry and market.",
      },
      {
        level: "h2",
        text: "Why Businesses Choose HOF Pack for Labels & Stickers",
      },
      {
        level: "p",
        text: "At HOF Pack, we help brands create custom labels and stickers that not only look great but also perform reliably. Whether you need product labels, packaging stickers, shipping labels, or promotional decals, we provide solutions tailored to your business. Contact our team at info@hofpack.com or call +1 (888) 429-4881 for a free consultation.",
      },
    ],
    material_items: [
      "Trusted by 5000+ clients",
      "FSC or ISO Certified",
      "Eco-friendly material options",
    ],
    perk_items: [
      "Wholesale Pricing with Free Sample",
      "8-10 days turnaround",
      "Free Shipping all Across the US",
      "Innovative Printing Designs",
      "Free design consultation",
      "MOQ as low as 100 units",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "Can I order custom labels and stickers wholesale?",
      answer:
        "Yes, we offer wholesale pricing, low MOQs, and complete customization options for businesses of all sizes.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "What is the difference between a label and a sticker?",
      answer:
        "Labels are typically used to provide product information, branding, or instructions, while stickers are often used for promotions, decoration, branding, or marketing purposes. Many products can serve both purposes.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "What is the difference between custom roll labels and sheet stickers?",
      answer:
        "The major difference between custom roll labels and sheet stickers is order volume, application speed, and format. Roll labels are wound around a spool for high-volume, continuous peeling, used by automated labeling machinery. Sheet stickers are individual or grouped designs on flat pages for easy storage and manual (by hand) application.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "Can I order labels in custom shapes and sizes?",
      answer:
        "Yes, we offer fully customized labels and stickers in any size, shape, or design required for your product.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "Do you provide oil and water-resistant labels and stickers?",
      answer:
        "Absolutely. Waterproof and moisture-resistant materials are available for cosmetics, beverages, personal care products, and other products exposed to humidity or liquids. Permanent labels are usually waterproof, scratch-proof, oil-resistant, and UV-resistant.",
      display_order: 5,
    },
    {
      id: "faq-6",
      question: "What file format should I provide for printing?",
      answer:
        "Vector files such as AI, EPS, PDF, or high-resolution PNG files typically produce the best printing results. Our design team can also assist with artwork preparation.",
      display_order: 6,
    },
    {
      id: "faq-7",
      question: "Can you match exact Pantone colors for corporate branding on stickers?",
      answer:
        "Yes, we match the exact Pantone colors for premium printing quality of custom stickers and labels for businesses of all sizes.",
      display_order: 7,
    },
    {
      id: "faq-8",
      question: "Do you offer labels on rolls or sheets?",
      answer:
        "Labels can be supplied in both roll format and sheet format, or individual cut stickers depending on your application and equipment requirements.",
      display_order: 8,
    },
  ],
};

export const MAILER_RELATED_PRODUCTS = [
  { name: "Pre Roll Cone Packaging", slug: "pre-roll-cone-packaging", images: ["/images/products/pre-roll-cone-packaging.jpg"] },
  { name: "Cannabis Pre-Roll Packaging", slug: "cannabis-pre-roll-packaging", images: ["/images/products/cannabis-pre-roll-packaging.jpg"] },
  { name: "Necklace Cards", slug: "necklace-cards", images: ["/images/products/necklace-cards.jpg"] },
  { name: "Necklace Boxes", slug: "necklace-boxes", images: ["/images/products/necklace-boxes.jpg"] },
  { name: "Custom Earring Boxes", slug: "custom-earring-boxes", images: ["/images/products/custom-earring-boxes.jpg"] },
  { name: "Custom Ring Boxes", slug: "custom-ring-boxes", images: ["/images/products/custom-ring-boxes.jpg"] },
  { name: "Bracelet Boxes", slug: "bracelet-boxes", images: ["/images/products/bracelet-boxes.jpg"] },
  { name: "Pendant Boxes", slug: "pendant-boxes", images: ["/images/products/pendant-boxes.jpg"] },
  { name: "Custom Pandasew Packaging", slug: "custom-pandasew-packaging", images: ["/images/products/custom-pandasew-packaging.jpg"] },
  { name: "Kraft Bulk Jewelry Boxes", slug: "kraft-bulk-jewelry-boxes", images: ["/images/products/kraft-bulk-jewelry-boxes.jpg"] },
  { name: "Custom Anklet Boxes", slug: "custom-anklet-boxes", images: ["/images/products/custom-anklet-boxes.jpg"] },
  { name: "Custom Bangle Boxes", slug: "custom-bangle-boxes", images: ["/images/products/custom-bangle-boxes.jpg"] },
];

export const MAILER_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-mailer",
  name: "Custom Mailer Boxes",
  slug: "custom-mailer-boxes",
  section: "style",
  hero_headline_white: "Custom Mailer Boxes",
  hero_headline_accent: "Secures Product Journey",
  description: "Flat 20% Off on Your First Order + Free Shipping",
  image_url: "/images/categories/mailer-boxes-hero.jpg",
  banner_image_url: "/images/categories/mailer-boxes-hero.jpg",
  category_content: {
    feature_items: [
      {
        icon: "Palette",
        title: "Vibrant Print & Branding",
        description: "High-quality CMYK printing that brings bold colors, sharp graphics, and strong brand identity to life.",
      },
      {
        icon: "Feather",
        title: "Efficient & Protective Design",
        description: "Smart structure built for easy assembly, secure closure, and safe product delivery.",
      },
      {
        icon: "Leaf",
        title: "Sustainable Material Options",
        description: "Eco-friendly, recyclable materials, including FSC-certified paperboard for responsible packaging.",
      },
    ],
    content_blocks: [
      {
        heading: "Elevate Your Customer Journey With Mailer Boxes",
        body: "Custom mailer boxes are designed to create a memorable unboxing experience. With sturdy structures and customizable designs, they help your brand stand out from warehouse to doorstep. With prints that grab customer attention and colors that pop, custom mailer boxes are ideal for your brand.",
        image: "/images/categories/mailer-elevate-journey.jpg",
        alt: "Custom bakery boxes for baked goods",
        linkLabel: "Get a Free Quote →",
      },
      {
        heading: "Durable, Lightweight & Cost-Efficient Shipping",
        body: "Mailer boxes are made from affordable brown kraft or white corrugated materials that provide excellent strength without adding extra weight. This makes them ideal for reducing shipping costs while ensuring product safety throughout delivery.",
        image: "/images/categories/mailer-durable-shipping.jpg",
        alt: "Variety of custom bakery packaging styles",
        flipped: true,
      },
      {
        heading: "Create A Branded Unboxing Experience with Custom Mailer Boxes",
        body: "Ready to create an unforgettable unboxing experience with HOF Pack? We will help you create a custom-sized mailer box with personalized designs that reflect your brand’s identity. Contact our team to get a free quote.",
        image: "/images/categories/mailer-branded-unboxing.jpg",
        alt: "Fresh bakery products in custom packaging",
        linkLabel: "Start Customizing with Us!",
      },
    ],
    why_heading: "What Makes Custom Mailer Boxes a Preferred Packaging Choice?",
    article_sections: [
      {
        level: "p",
        text: "Custom mailer boxes are widely used in e-commerce and retail brands. They combine protection, branding, and convenience in one packaging solution. Their self-locking design eliminates the need for additional adhesives, and their sturdy structure ensures product safety during shipping. Hence, brands use custom mailer boxes when they need:\n• Secure packaging for shipping products\n• A branded unboxing experience\n• Lightweight packaging for cost-effective delivery\n• Reliable structure for e-commerce and subscription orders",
      },
      {
        level: "h2",
        text: "Types of Custom Mailer Boxes for Different Needs:",
      },
      {
        level: "p",
        text: "**Standard Roll End Tuck Top (RETT) Mailer Boxes**\n\nThese are the most commonly used mailer boxes among e-commerce and retail brands. They have a self-locking front flap, ideal for subscription boxes, apparel, and small accessories or retail products.",
      },
      {
        level: "p",
        text: "**Roll End Tuck Front (RETF) Mailer Boxes**\n\nThese mailer boxes are designed with a front tuck closure for added security. They are suitable for shipping delicate or slightly heavier products",
      },
      {
        level: "p",
        text: "**Corrugated Mailer Boxes**\n\nCorrugated mailer boxes are made with single, double, or triple-wall corrugated board for enhanced durability. They are best for shipping fragile or high-value items.",
      },
      {
        level: "p",
        text: "**Subscription Mailer Boxes**\n\nThese custom-designed mailer boxes are designed for monthly subscription services focused on branding, presentation, and customer experience.",
      },
      {
        level: "p",
        text: "**E-commerce Mailer Boxes**\n\nLightweight yet strong packaging, these mailer boxes are designed specifically for online businesses like Shopify stores to ensure safe and cost-efficient deliveries.",
      },
      {
        level: "p",
        text: "**Cosmetic Mailer Boxes**\n\nThese custom mailer boxes for cosmetic products are specifically designed with inserts to keep cosmetic items intact and safe during shipping, and give them an enhanced look.",
      },
      {
        level: "p",
        text: "**Holiday Mailer Boxes**\n\nThese durable, festive, and corrugated shipping boxes are designed for sending gifts, products, or promotional items during festive seasons and holidays like Christmas, Easter, Thanksgiving, Halloween.",
      },
      {
        level: "h2",
        text: "Industries That Commonly Use Custom Mailer Boxes:",
      },
      {
        level: "p",
        text: "Custom mailer boxes are widely used across various industries:\n• E-commerce brands\n• Subscription box businesses\n• Apparel & fashion brands\n• Cosmetics & skincare companies\n• Electronics & accessories brands\n• Food & beverage (non-perishable items)",
      },
      {
        level: "h2",
        text: "Fully Customize Your Mailer Box That Fits Your Brand",
      },
      {
        level: "p",
        text: "With the rise of e-commerce, packaging has become a key part of marketing, making custom mailer boxes essential for modern brands. Here’s how HOF Pack helps you customize your mailer box to match your brand’s identity and needs.",
      },
      {
        level: "divider",
        text: "",
      },
      {
        level: "h2",
        text: "Custom Dimensions and Sizes",
      },
      {
        level: "p",
        text: "Mailer boxes can be fully customized to match your product dimensions (L x W x H), ensuring a secure fit and minimal movement during shipping. Custom sizing helps reduce extra spacing, lowers shipping costs, and improves product protection.",
      },
      {
        level: "h2",
        text: "Material Options Used in Custom Mailer Boxes",
      },
      {
        level: "p",
        text: "Mailer boxes are typically made from durable corrugated materials for strength and protection:\n• Single Wall Corrugated: Lightweight and suitable for small products\n• Double Wall Corrugated: Extra strength for heavier items\n• Kraft Corrugated: Eco-friendly and sustainable packaging option\n• White Corrugated Board: Ideal for high-quality printing and branding",
      },
      {
        level: "h2",
        text: "Variation in Thickness",
      },
      {
        level: "p",
        text: "Thickness varies depending on what product you are packaging for:\n• 1/16” E-Flute Corrugated Cardboard: This is a lightweight and less thick cardboard, commonly used for small consumer products, cosmetics, electronics, pizza boxes, and fragile items like ceramics and glass.\n• 1/8” B-Flute Corrugated Cardboard: This is a thick cardboard box, having crush and puncture resistance, ideal for canned items and beverage bottles.\n• 3/16” C-Flute Corrugated Cardboard: This is the most popular and standard choice for shipping containers, ideal for packing glass, dairy, furniture, and food products.",
      },
      {
        level: "h2",
        text: "Printing Options for Custom Mailer Boxes:",
      },
      {
        level: "p",
        text: "Enhance your packaging with custom printing and finishes that reflect your brand identity with CMYK & PMS printing for accurate color reproduction and matte/gloss lamination, embossing, debossing, & foil stamping for luxury packaging. We provide:\n• Inside Printing Only: To elevate the unboxing experience\n• Outside Printing Printing Only: To grab customer attention\n• Inside and Outside Printing Both: For a unique experience with fully customized printing to enhance brand value.\n• Simple mailer box without Printing: Simple brown (kraft) or white cardboard.",
      },
      {
        level: "h2",
        text: "Sustainability Choices for Custom Mailer Boxes",
      },
      {
        level: "p",
        text: "We use Kraft (brown or bleached) and corrugated materials for sustainable packaging. With SFI (Sustainable Forestry Initiative) approved materials, we help brands in their eco-friendly approach. Moreover, custom mailer boxes save space, material wastage, and shipping costs, sustainable for the environment.",
      },
      {
        level: "h2",
        text: "Help Us Create Your Custom Mailer Box",
      },
      {
        level: "p",
        text: "• Share your product details and packaging requirements\n• Select box style, size, and material\n• Customize your design and branding\n• Approve digital or physical samples\n• Proceed to bulk production\n• Safe, timely, and free delivery across the US",
      },
      {
        level: "h2",
        text: "Why You Should Choose HOF Pack For Custom Mailer Boxes?",
      },
      {
        level: "p",
        text: "We understand that shipping packaging needs to balance protection, cost-efficiency, and branding. That’s why our custom mailer boxes are designed to perform across every stage of the delivery process.\n\nAt HOF Pack, we focus on customer trust, transparency, and accountability towards our custom-designed boxes. That is why we provide proofs and guarantees:\n• Color or Print Test via E-samples: To see the quality of our printing and design, you can order a free e-sample.\n• Physical Samples: Hold the box and then approve.\n\nContact our team at info@hofpack.com or call us +1 (888) 429-4881 to get a free design and size consultation, specifically for your brand.",
      },
    ],
    material_items: [
      "Trusted by 500+ clients",
      "FSC or ISO Certified",
      "Eco-friendly Kraft Material",
    ],
    perk_items: [
      "Wholesale Pricing with Free Sample",
      "8-10 days turnaround",
      "Free Shipping all Across the US",
      "Innovative Printing Designs",
      "Free design consultation",
      "MOQ as low as 100 units",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "Can I customize mailer boxes with my branding?",
      answer:
        "Yes, you can customize size, materials, printing, and finishes according to your brand requirements.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "Do you offer mailer boxes wholesale?",
      answer:
        "Yes, bulk orders are available with market-competitive pricing and MOQs as low as 100 units.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "Can I order 1 mailer box?",
      answer:
        "Yes, you can order a physical sample of a custom mailer box from us before finalizing your bulk order.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "How will I receive my mailer box orders?",
      answer:
        "They will be shipped flat and stocked for cost-effective shipping.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "What is the difference between shipping boxes and mailer boxes?",
      answer:
        "Mailer boxes are designed for branded, lightweight, direct-to-consumer shipping with an interlocking flap design. Shipping boxes (RSC) are durable, heavy-duty cartons used for bulk or heavy items, requiring tape to seal.",
      display_order: 5,
    },
  ],
};

export const DISPLAY_RELATED_PRODUCTS = [
  { name: "Pre Roll Cone Packaging", slug: "pre-roll-cone-packaging", images: ["/images/products/pre-roll-cone-packaging.jpg"] },
  { name: "Cannabis Pre-Roll Packaging", slug: "cannabis-pre-roll-packaging", images: ["/images/products/cannabis-pre-roll-packaging.jpg"] },
  { name: "Necklace Cards", slug: "necklace-cards", images: ["/images/products/necklace-cards.jpg"] },
  { name: "Necklace Boxes", slug: "necklace-boxes", images: ["/images/products/necklace-boxes.jpg"] },
  { name: "Custom Earring Boxes", slug: "custom-earring-boxes", images: ["/images/products/custom-earring-boxes.jpg"] },
  { name: "Custom Ring Boxes", slug: "custom-ring-boxes", images: ["/images/products/custom-ring-boxes.jpg"] },
  { name: "Bracelet Boxes", slug: "bracelet-boxes", images: ["/images/products/bracelet-boxes.jpg"] },
  { name: "Pendant Boxes", slug: "pendant-boxes", images: ["/images/products/pendant-boxes.jpg"] },
  { name: "Custom Pandasew Packaging", slug: "custom-pandasew-packaging", images: ["/images/products/custom-pandasew-packaging.jpg"] },
  { name: "Kraft Bulk Jewelry Boxes", slug: "kraft-bulk-jewelry-boxes", images: ["/images/products/kraft-bulk-jewelry-boxes.jpg"] },
  { name: "Custom Anklet Boxes", slug: "custom-anklet-boxes", images: ["/images/products/custom-anklet-boxes.jpg"] },
  { name: "Custom Bangle Boxes", slug: "custom-bangle-boxes", images: ["/images/products/custom-bangle-boxes.jpg"] },
];

export const DISPLAY_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-display",
  name: "Custom Display Boxes",
  slug: "custom-display-boxes",
  section: "style",
  hero_headline_white: "Custom Display Boxes",
  hero_headline_accent: "Designed For Attention",
  description: "Flat 20% Off on Your First Order + Free Shipping",
  image_url: "/images/categories/display-boxes-hero.jpg",
  banner_image_url: "/images/categories/display-boxes-hero.jpg",
  category_content: {
    feature_items: [
      {
        icon: "Palette",
        title: "Freshness-Focused Design",
        description: "Food-grade materials that help keep baked goods fresh and protected.",
      },
      {
        icon: "Feather",
        title: "Lightweight & Durable",
        description: "Easy to carry and stack while ensuring product safety during transit.",
      },
      {
        icon: "Leaf",
        title: "Eco-Friendly Materials",
        description: "Sustainable, FSC-certified options made from recycled paperboard.",
      },
    ],
    content_blocks: [
      {
        heading: "Enhance Your Product Look",
        body: "Elevate your product's look with specialized display packaging. Their open front or transparent window design enhances product visibility at retail checkout counters, end-caps, or near store entrances.",
        image: "/images/categories/display-enhance-look.jpg",
        alt: "Custom bakery boxes for baked goods",
        linkLabel: "Get a Free Quote →",
      },
      {
        heading: "Turn Heads & Increase Sales with Custom Display Boxes",
        body: "Grab your customer’s attention and enhance their shopping experience with custom display boxes. These boxes are carefully engineered to fascinate people and ultimately boost your brand sales.",
        image: "/images/categories/display-turn-heads.jpg",
        alt: "Variety of custom bakery packaging styles",
        flipped: true,
      },
      {
        heading: "Customize Display Boxes with HOF Pack",
        body: "If you want to elevate your brand perception and value and boost your sales, our custom display boxes will do a perfect job.",
        image: "/images/categories/display-customize-brand.jpg",
        alt: "Fresh bakery products in custom packaging",
        linkLabel: "Start Customizing with Us!",
      },
    ],
    why_heading: "Why Custom Display Boxes are Important for Your Brand?",
    article_sections: [
      {
        level: "p",
        text: "Custom display boxes really add a difference to both customers’ and the brand’s experience.\n\n**For Customers:**\n• Smart & Attractive Packaging Designs\n• Perfect for gifting\n• Enhanced shopping experience\n\n**For Brands:**\n• Act as a silent salesperson\n• Boost sales\n• Elevate product look\n• Product protection with custom inserts\n• Increased brand perception",
      },
      {
        level: "h2",
        text: "Explore Our Variety of Display Boxes To Choose From:",
      },
      {
        level: "p",
        text: "**Counter Display Boxes (POP Displays)**\nThese are open-top boxes placed on countertops, usually with a front cut and back header for branding. Ideal for retail stores, cosmetics, snacks, and small impulse-buy products.",
      },
      {
        level: "p",
        text: "**Floor Display Boxes (FSDU – Floor Standing Display Units)**\nThese are tall, multi-tier structures placed on the floor with shelves for multiple products. Best for supermarkets, electronics, beverages, and bulk retail promotions.",
      },
      {
        level: "p",
        text: "**Sidekick / Power Wing Display Boxes**\n\nThese are slim vertical displays attached to shelves or aisles to maximize unused space. Perfect for fast-moving FMCG brands, snacks, accessories, and promotional products.",
      },
      {
        level: "p",
        text: "**Dump Bins / Dump Display Boxes**\n\nThese are large open bins where products are placed loosely for easy picking. Commonly used for discount items, toys, apparel, and clearance sales in retail stores.",
      },
      {
        level: "p",
        text: "**Tray Style Display Boxes**\n\nThese are simple open trays with low walls that are often used to neatly arrange products. Ideal for bakery items, cosmetics, pharmaceuticals, and small packaged goods.",
      },
      {
        level: "p",
        text: "**Shelf Ready Packaging (SRP Display Boxes)**\n\nThese are custom boxes that convert into displays by tearing off the top lid. Perfect for supermarkets, food brands, packet foods, and mass retail distribution.",
      },
      {
        level: "p",
        text: "**Tuck Top Display Boxes**\n\nThese are boxes with a tuck flap lid that can be opened and converted into a display. Best for CBD products, cosmetics, supplements, and small retail items.",
      },
      {
        level: "p",
        text: "**Window Display Boxes**\n\nThese are boxes with a die-cut transparent window to showcase the product inside. Ideal for bakery, candles, cosmetics, and gift items where visibility drives sales.",
      },
      {
        level: "p",
        text: "**Hanging Display Boxes (Peg Hook Boxes)**\n\nThese are boxes with a die-cut hole for hanging on retail hooks or racks. Perfect for electronics accessories, tools, cosmetics, and small retail items.",
      },
      {
        level: "p",
        text: "**Drawer / Slide-Out Display Boxes**\n\nThese are boxes with a sliding tray mechanism that reveals the product like a drawer. Ideal for luxury products, jewelry, tech accessories, and premium gifting brands.",
      },
      {
        level: "p",
        text: "**Rigid Display Boxes**\n\nThese are premium, sturdy boxes made from thick board with high-end finishing. Used for luxury brands, perfumes, candles, and high-value retail products.",
      },
      {
        level: "p",
        text: "**POP Cardboard Standees / Display Units**\n\nLarge branded cardboard structures, these boxes are designed for marketing visibility. Mostly used for events, product launches, and promotional campaigns in retail stores.",
      },
      {
        level: "p",
        text: "**Acrylic/Glass Display Cases**\n\nThese are transparent, high-visibility cases used to protect valuables, collectibles, or jewelry. Ideal for luxury brands.",
      },
      {
        level: "h2",
        text: "Here’s How HOF Pack Adds Value to Your Custom Display Boxes:",
      },
      {
        level: "p",
        text: "We focus on transparency and accountability in what we do. Our custom display boxes are carefully engineered, tailored for every brand.",
      },
      {
        level: "divider",
        text: "",
      },
      {
        level: "h2",
        text: "Select Your Custom Length, Width, Height:",
      },
      {
        level: "p",
        text: "At HOF Pack, we design custom-sized display boxes that match the exact dimensions of your product. Just tell us the exact length, width, and height of the product, and we will design a custom display box tailored to your desired dimensions.\n• Length: The longest side of the display box from the exterior.\n• Width: The shorter side of the display box from the exterior.\n• Height: The vertical measurement from base to top. This is the exterior height of the box only. The total height, including base, will be an additional 1/4\".",
      },
      {
        level: "h2",
        text: "Visually Striking Colors & High-quality Printing:",
      },
      {
        level: "p",
        text: "Create an enhanced visual outlook with high-quality images and printing. A beautiful graphic design or trending colors can pop up your display boxes on those retail shelves. For a customer-centric approach, explore different printing options, such as digital, offset, holographic, and soft touch.",
      },
      {
        level: "h2",
        text: "Sustainability Focused Materials for Custom Display Boxes",
      },
      {
        level: "p",
        text: "We focus on sustainable production for a greener future. Our custom display boxes are made of eco-friendly, recyclable, and biodegradable materials:\n\n**SBS C1S:**\nBleached white paperboard coated on one side. Perfect for high-quality printing and finishes.\n\n**Brown Kraft Paper**\n\nKraft paper from a mix of virgin and recycled paper pulp.\n\n**Natural Kraft Board**\n\nUncoated and unbleached kraft linerboard from recycled paper pulp.\n\n**Oyster White Board**\n\nCoated, off-white, and textured linerboard for high-quality printing.",
      },
      {
        level: "h2",
        text: "Our Process of Creating Your Custom Display Box",
      },
      {
        level: "p",
        text: "• Consult with our in-house design team and select the ideal packaging for your product.\n• Get a free quote from our team in 24 hours.\n• Before placing a large retail order, try a sample custom display box design.\n• After confirmations, our production team will start your bulk order.\n• When your order is complete, our logistics team will ensure your custom boxes are delivered safely.\n• Last but not least, we welcome your feedback on our customer service and production process.",
      },
      {
        level: "h2",
        text: "Proofs and Product Guarantee By HOF Pack",
      },
      {
        level: "p",
        text: "At HOF Pack, we focus on customer trust, transparency, and accountability towards our custom-designed boxes. That is why we offer three types of proofs and guarantees:\n\n**Color or Print Test**: If you are trying to match a color, we strongly suggest using PMS (Pantone Matching System). Tell us the exact code, and our CMYK printing ink will do the magic.\n\n**E-samples**: If you are just looking to see the quality of our printing and design, you can order a free e-sample from us.\n\n**Physical Samples**: You can always order a free sample of your display box from HOF Pack. Hold it and then decide. However, this may affect the turnaround time.\n\nContact our team at info@hofpack.com or call us +1 (888) 429-4881 to get a free design and size consultation, specifically for your brand.",
      },
    ],
    material_items: [
      "Trusted by 500+ clients",
      "FSC or ISO Certified",
      "Eco-friendly Kraft Material",
    ],
    perk_items: [
      "Wholesale Pricing with Free Sample",
      "8-10 days turnaround",
      "Free Shipping all Across the US",
      "Innovative Printing Designs",
      "Free design consultation",
      "MOQ as low as 100 units",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "Can I customize my logo on the custom display box?",
      answer:
        "Yes, you can customize the size, materials, printing, and add-ons of your custom display boxes.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "Do you offer display boxes wholesale?",
      answer:
        "Yes, wholesale custom display boxes are available with MOQs as low as 100 units and competitive pricing.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "What is your minimum order quantity for custom counter displays?",
      answer:
        "The minimum order quantity (MOQ) for our custom display boxes depends on the packaging type you are ordering. However, normally we offer MOQs as low as 100 units for custom packaging.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "Can I order a sample before my bulk order?",
      answer:
        "Yes, you can order an e-sample or a physical sample from us for your custom display boxes before going towards a wholesale order.",
      display_order: 4,
    },
  ],
};

export const GABLE_RELATED_PRODUCTS = [
  { name: "Candle Gift Boxes", slug: "candle-gift-boxes", images: ["/images/products/candle-gift-boxes.jpg"] },
  { name: "Kraft Gift Boxes", slug: "kraft-gift-boxes", images: ["/images/products/kraft-gift-boxes.jpg"] },
  { name: "Pillow Gift Boxes", slug: "pillow-gift-boxes", images: ["/images/products/pillow-gift-boxes.jpg"] },
  { name: "Tea Gift Boxes", slug: "tea-gift-boxes", images: ["/images/products/tea-gift-boxes.jpg"] },
  { name: "Candle Display Boxes", slug: "candle-display-boxes", images: ["/images/products/candle-display-boxes.jpg"] },
  { name: "CBD Display Boxes", slug: "cbd-display-boxes", images: ["/images/products/cbd-display-boxes.jpg"] },
  { name: "Counter Display Boxes", slug: "counter-display-boxes", images: ["/images/products/counter-display-boxes.jpg"] },
  { name: "Retail Display Boxes", slug: "retail-display-boxes", images: ["/images/products/retail-display-boxes.jpg"] },
  { name: "Soap Display Boxes", slug: "soap-display-boxes", images: ["/images/products/soap-display-boxes.jpg"] },
];

export const GABLE_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-gable",
  name: "Custom Gable Boxes",
  slug: "custom-gable-boxes",
  section: "style",
  hero_headline_white: "Custom Gable Boxes",
  hero_headline_accent: "Carry Your Brand in Style",
  description: "Flat 20% Off on Your First Order + Free Shipping",
  image_url: "/images/categories/gable-boxes-hero.png",
  banner_image_url: "/images/categories/gable-boxes-hero.png",
  category_content: {
    content_blocks: [
      {
        heading: "Alluring Designs, Colors & Patterns",
        body: "Custom printed gable boxes tailored to your brand come with a variety of alluring designs, colors, and patterns to attract customers. The colorful prints and graphic designs convey your brand story. Whether you want to customize your gable box with window to enhance product visibility, add bold colors to catch attention, or want to go minimal with your gable boxes custom, personalized boxes always create a difference.",
        image: "/images/categories/gable-alluring-designs.jpg",
        alt: "gable-boxes",
      },
      {
        heading: "Built-In Handles & Easy To Carry",
        body: "Convenience is the key to customer satisfaction. That is why custom gable boxes wholesale have become so popular. They feature built-in handles that lock together seamlessly, creating a highly reliable and easy-to-carry transport solution. Instead of forcing customers to fumble with clumsy paper bags or loose plastic wrap, brands are now switching to gable boxes custom shaped for your products, as they provide style, aesthetics, and convenience.",
        image: "/images/categories/gable-built-in-handles.jpg",
        alt: "custom-gable-boxes",
        flipped: true,
      },
      {
        heading: "Ready To Customize Gable Boxes For Your Brand?",
        body: "HOF Pack makes it fast and simple to upgrade your packaging to a professional level. We can engineer a gorgeous custom window gable boxes layout to put your inner products on full display, or craft small, delicate runs of custom mini gable boxes for jewelry or premium treats.",
        image: "/images/categories/gable-ready-customize.jpg",
        alt: "personalized-gable-boxes",
        linkLabel: "Start Customizing with Us!",
      },
    ],
    why_heading: "What Is a Gable Box?",
    article_sections: [
      {
        level: "p",
        text: "A gable box is an all-in-one packaging design featuring a flat, square base that transitions into a triangular, house-like roof line with built-in handles. The built-in handles are specifically designed to carry the box easily for customer convenience. Moreover, the handles snap together perfectly without needing any tape, glue, or staples. This gives your customized box a smooth, clean finish that immediately grabs consumer attention on retail store shelves.",
      },
      {
        level: "h2",
        text: "What Makes Gable Boxes A Unique Style?",
      },
      {
        level: "p",
        text: "What makes this style so incredibly unique is that:\n• Serves as both a structural protection box\n• Acts as a beautiful carrying tote\n• Provides an easy and fast assembly\n• Looks beautiful\n• Offers customer convenience\n• Grabs the attention of all",
      },
      {
        level: "h2",
        text: "Put Your Brand Name On The Go With Sturdy Takeout Gable Boxes",
      },
      {
        level: "p",
        text: "If you run a bakery, restaurant, or catering service, you know that hot food and heavy treats require solid structural support. That is why custom food gable boxes are engineered to be grease-resistant, moisture-safe, FDA–approved, and incredibly durable under heavy loads. You can also choose specific options like custom gable cereal boxes for artisan dry goods or gable cake boxes for all types of bakery items. Customized gable boxes will ensure your brand name is proudly displayed on the move as customers carry their delicious treats home from your shop. They will act as your silent salesperson and a branding tool.",
      },
      {
        level: "h2",
        text: "Enhance Your Gifting Experience With Gable Boxes",
      },
      {
        level: "p",
        text: "First impressions are everything, right? You might’ve heard the common saying that first impressions are the last impressions. That is actually accurate. During special events, holiday campaigns, and corporate parties, nobody gives a gift in cheap stock boxes. People put in so much effort to customize their gifts. That is why customizing custom gable gift boxes for your brand is the right move. Switching to custom gable gift boxes turns an ordinary present into a high-end luxury experience. Because these boxes look naturally celebratory and pretty, you can skip the extra cost of expensive wrapping papers or gift bows. The beautiful structure of the box itself functions as the gift wrap, making it a favorite for big galas, product launches, gifts, and company treats.",
      },
      {
        level: "h2",
        text: "Customized Branding With Quick Assembly",
      },
      {
        level: "p",
        text: "Personalize your custom gable boxes with windows for an elevated brand look.",
      },
      {
        level: "divider",
        text: "",
      },
      {
        level: "h2",
        text: "Variety of Sizes",
      },
      {
        level: "p",
        text: "We understand that products come in all shapes and weights. That is why we offer a massive range of sizes. We manufacture everything from:\n• Ultra-cute custom mini gable boxes meant for small candies, cosmetics, or artisanal soaps\n• Large, heavy-duty gable boxes designed to comfortably hold complete apparel sets, multi-course meals\n• Extra large gable boxes for bulk retail items.",
      },
      {
        level: "h2",
        text: "Material Choices",
      },
      {
        level: "p",
        text: "We offer high-quality materials to fit your brand's unique style and core values:\n• Custom Kraft Gable Boxes: Made from 100% eco-friendly, natural brown recycled paperboard. Excellent for organic, zero-waste, or rustic brand styles.\n• Custom White Gable Box Material: Made from bright, crisp bleached paperboard. Perfect for luxury wedding favors, clean skincare lines, and bold, high-contrast color prints.\n• Heavy-Duty Gable Boxes: Crafted from thick, sturdy corrugated cardboard layers to provide maximum crush-resistance for heavy shipping items or delicate glass jars.",
      },
      {
        level: "h2",
        text: "Printing Options",
      },
      {
        level: "p",
        text: "Printing and finishing options for custom packaging are:\n• Offset Lithography\n• Digital Printing\n• Flexography\n• Matte Coating/Lamination\n• Gloss Coating/Lamination\n• Soft-Touch Lamination\n• Hot Foil Stamping\n• Cold Foil Stamping\n• Metallic Inks\n• Spot UV Coating\n• Embossing & Debossing\n• Textured Finishes\n• Die-Cutting\n• Mounting/Twinned Walls",
      },
      {
        level: "h2",
        text: "Which Industries Can Use Gable Boxes?",
      },
      {
        level: "p",
        text: "Gable boxes are famous and versatile for almost every industry in the United States. However, they are commonly used for:\n• Food & Bakeries: Custom food gable boxes are ideal for holding bakery items, cupcakes, pastries, gourmet donuts, and restaurant takeout orders.\n• Retail & Cosmetics: Gable boxes create an elegant shelf presence for skincare kits, bath bombs, clothing items, and candles.\n• Events & Weddings: Custom gable boxes are also highly popular as curated party favor boxes, holiday gift baskets, and corporate gala welcome packages.",
      },
      {
        level: "h2",
        text: "Why Do Brands Choose HOF Pack?",
      },
      {
        level: "p",
        text: "At HOF Pack, we treat your business like our own. We remove the stress from the packaging supply chain so you can focus entirely on growing your brand. Contact our team at info@hofpack.com or call +1 (888) 429-4881 for a free consultation, wholesale pricing, and fast turnaround.",
      },
    ],
    material_items: [
      "Trusted by 5000+ clients",
      "FSC or ISO Certified",
      "Eco-friendly material options",
    ],
    perk_items: [
      "Wholesale Pricing with Free Sample",
      "8-10 days turnaround",
      "Free Shipping all Across the US",
      "Innovative Printing Designs",
      "Free design consultation",
      "MOQ as low as 100 units",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "Do custom gable boxes ship flat, and are they easy to assemble?",
      answer:
        "Yes! All of our custom printed gable boxes are shipped completely flat to save you massive amounts of warehouse storage space and lower your initial shipping costs. They are pre-scored. You just have to pop the base open and interlock the top handles in a couple of seconds without needing any tape or glue.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "Can I order eco-friendly options like custom kraft gable boxes?",
      answer:
        "Absolutely. We care deeply about the environment, which is why our custom kraft gable boxes are made using 100% recycled, post-consumer paper fibers. They are completely biodegradable, compostable, and look wonderfully rustic. You can choose the material options. We provide kraft paper, SBS paperboard, and B-Flute cardboard: fantastic choices for sustainable and organic brands.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "What is the minimum order quantity for custom gable boxes wholesale orders?",
      answer:
        "We love supporting small businesses and growing brands. That is why we keep our minimum order quantity (MOQ) as low as just 500 units. This lets you test out new designs or holiday prints without going bulk all the way with stock units. We offer full customization options.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "Are your heavy-duty gable boxes strong enough to safely hold heavy items, food, and jars?",
      answer:
        "Yes, they are. If you are packing heavier items like glass bottles, candles, or large food takeouts, we highly recommend our heavy-duty cardboard gable boxes. These are manufactured using thicker, structural corrugated cardboard that perfectly secures your product.",
      display_order: 4,
    },
  ],
};

export const PILLOW_RELATED_PRODUCTS = [
  { name: "3.5 Mylar Bags", slug: "3.5-mylar-bags", images: ["/images/products/3.5-mylar-bags.jpg"] },
  { name: "Black Tube Packaging", slug: "black-tube-packaging", images: ["/images/products/black-tube-packaging.jpg"] },
  { name: "Blank Cigarette Boxes", slug: "blank-cigarette-boxes", images: ["/images/products/blank-cigarette-boxes.jpg"] },
  { name: "Blunt Packaging", slug: "blunt-packaging", images: ["/images/products/blunt-packaging.jpg"] },
  { name: "Candle Display Boxes", slug: "candle-display-boxes", images: ["/images/products/candle-display-boxes.jpg"] },
  { name: "Candle Dust Covers", slug: "candle-dust-covers", images: ["/images/products/candle-dust-covers.jpg"] },
];

export const PILLOW_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-pillow",
  name: "Custom Pillow Boxes",
  slug: "custom-pillow-boxes",
  section: "style",
  hero_headline_white: "Custom",
  hero_headline_accent: "Pillow Boxes",
  description: "Flat 20% Off on Your First Order + Free Shipping",
  image_url: "/images/categories/pillow-boxes-hero.png",
  banner_image_url: "/images/categories/pillow-boxes-hero.png",
  category_content: {
    content_blocks: [
      {
        heading: "Small Packaging, Big Impression",
        body: "Sometimes simple packaging creates the strongest impression. Custom printed pillow boxes are popular among US brands because they combine convenience with attractive presentation. Their sleek curved shape makes products feel more premium without requiring bulky packaging.",
        image: "/images/categories/pillow-small-packaging.jpg",
        alt: "Custom bakery boxes for baked goods",
        linkLabel: "Get a Free Quote →",
      },
      {
        heading: "Lightweight & Easy to Assemble",
        body: "One of the reasons why business owners love pillow packaging custom printed boxes wholesale is their convenience. These boxes are lightweight for shipping, easy to fold & assemble, space-efficient for storage, cost-effective for bulk orders, and suitable for both retail and e-commerce packaging.",
        image: "/images/categories/pillow-lightweight-assemble.jpg",
        alt: "Variety of custom bakery packaging styles",
        flipped: true,
      },
      {
        heading: "Ready to Customize Pillow Boxes with Us?",
        body: "Whether you want personalized pillow boxes for retail shelves or custom pillow gift boxes for promotional packaging, the right design can help your packaging stand out instantly. Whether you’re a startup brand or an established business in the US, customized pillow boxes offer the best flexibility for different packaging needs.",
        image: "/images/categories/pillow-ready-customize.jpg",
        alt: "Ready to Customize Pillow Boxes with Us?",
        linkLabel: "Get a Packaging Report →",
      },
    ],
    why_heading: "What Are Custom Pillow Boxes?",
    article_sections: [
      {
        level: "p",
        text: "Custom pillow boxes are a stylish and compact packaging solution, designed for gifting, retail, display, and lightweight product packaging. Their curved structure gives them a unique appearance that instantly feels elegant and premium. Whether you need custom pillow boxes with logo for retail products, events, soap packaging, jewelry, cosmetics, or apparel accessories, these boxes help create a memorable customer experience.",
      },
      {
        level: "h2",
        text: "Why Brands Choose Custom Pillow Boxes?",
      },
      {
        level: "p",
        text: "Custom pillow boxes help brands create packaging that feels clean, modern, and visually appealing without becoming overly expensive. Their unique shape makes the products look very chic and interesting on shelves and in online orders as well. They are ideal for businesses looking for:\n• Affordable, yet branded packaging\n• Lightweight packaging solutions\n• Stylish gift packaging style\n• Easy-to-carry retail packaging\n• Premium unboxing experience",
      },
      {
        level: "h3",
        text: "Explore Different Styles of Pillow Boxes",
      },
      {
        level: "p",
        text: "Different businesses use different pillow box styles. It usually depends on their product needs and audience demands. Here are different styles of pillow packaging:",
      },
      {
        level: "h4",
        text: "Kraft Pillow boxes:",
      },
      {
        level: "p",
        text: "These boxes are made of 100% recyclable and recycled kraft paper. For eco-conscious businesses and home-based brands, custom Kraft pillow boxes are a popular option because they create a natural and sustainable brand image.",
      },
      {
        level: "h4",
        text: "Custom Window Pillow Boxes:",
      },
      {
        level: "p",
        text: "Custom window pillow boxes are also a useful and functional packaging method. These boxes have a transparent window-like design on the front. They’re useful for showcasing products before the package is even opened. It increases product visibility while protecting it from dust and handling pressures.",
      },
      {
        level: "h4",
        text: "Luxury Pillow Gift Boxes:",
      },
      {
        level: "p",
        text: "These boxes create a luxury appeal and focus on product presentation for a premium unboxing experience and gifting purposes.",
      },
      {
        level: "h4",
        text: "Custom Printed Pillow Boxes:",
      },
      {
        level: "p",
        text: "Custom printed pillow boxes have a complete printable surface used to display the brand’s logo, branding elements, product ingredients, and custom labels or even barcodes. This will enhance your brand authority, customer experience, and customer trust.",
      },
      {
        level: "h2",
        text: "Printing & Finishing Options",
      },
      {
        level: "p",
        text: "Enhance your custom pillow boxes with premium printing and finishing techniques. These details help create packaging that feels more professional and memorable. Popular customization options include:\n• CMYK printing\n• PMS color matching\n• Matte lamination\n• Gloss coating\n• Spot UV\n• Gold or silver foil stamping\n• Embossing & debossing",
      },
      {
        level: "h2",
        text: "Materials Used for Pillow Packaging",
      },
      {
        level: "p",
        text: "Choosing the right material depends on your product type and branding goals. Custom kraft pillow boxes are especially popular among organic, handmade, and sustainable brands in the USA. Popular material choices include:\n• Kraft paper\n• SBS paperboard\n• Corrugated cardboard\n• Recyclable paper stock",
      },
      {
        level: "divider",
        text: "",
      },
      {
        level: "h2",
        text: "Industries Using Custom Pillow Boxes",
      },
      {
        level: "p",
        text: "The key industries and businesses using pillow boxes are:\n• Jewellery & Accessories: Provide a premium and compact home to your rings, earrings, bracelets, and necklaces.\n• Cosmetics & Beauty Industry: Provide ideal presentation and aesthetic appeal to items like lip kits, mascara, small cream jars, and organic soaps.\n• Soap Industry: Pillow boxes are an effective and unique way of soap packaging.\n• Events & Gifts: They are used by gift shops, wedding planners, and corporate event organizers for party favors, promotional gifts, and giveaways.\n• Food & Confectionery: Bakeries, candy stores, and gourmet brands use food-grade pillow boxes for chocolates, teas, mints, and small baked goods.\n• Apparel & Retail: Pillow boxes are also used for small wearable items like ties, scarves, undergarments, and promotional merchandise.",
      },
      {
        level: "divider",
        text: "",
      },
      {
        level: "h2",
        text: "Order Custom Pillow Boxes Wholesale from HOF Pack",
      },
      {
        level: "p",
        text: "At HOF Pack, we create custom pillow boxes wholesale designed for branding, product protection, and premium presentation. Whether you need custom pillow boxes with logo, custom kraft pillow boxes, or personalized gift packaging, our team helps create packaging solutions tailored to your business needs. Contact our team at info@hofpack.com or call +1 (888) 429-4881 for a free consultation.",
      },
    ],
    material_items: [
      "Trusted by 5000+ clients",
      "FSC or ISO Certified",
      "Eco-friendly packaging options",
    ],
    perk_items: [
      "Wholesale Pricing with Free Sample",
      "8-10 days turnaround",
      "Free Shipping all Across the US",
      "Innovative Printing Designs",
      "Free design consultation",
      "MOQ as low as 100 units",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "What products are best suited for custom pillow boxes?",
      answer:
        "Custom pillow boxes are ideal for lightweight products like jewelry, cosmetics, candles, gift cards, apparel accessories, party favors, and promotional items.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "Can I customize pillow boxes with my logo and brand colors?",
      answer:
        "Yes, you can fully customize your pillow boxes with logos, artwork, finishes, inserts, and brand-specific colors. At HOF Pack, we offer full customization options.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "Do you offer custom pillow boxes wholesale?",
      answer:
        "Yes, we offer wholesale options with low MOQs and fully customizable printing solutions at HOF Pack. You can order as few as 500 units.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "Can I add a window to my pillow box packaging?",
      answer:
        "Yes, custom window pillow boxes are available for better product visibility and retail presentation. Our consultation team will help you choose the best-suited style for your product.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "Are pillow boxes suitable for e-commerce packaging?",
      answer:
        "Yes, pillow boxes are lightweight and compact, making them suitable for small e-commerce products and subscription packaging.",
      display_order: 5,
    },
  ],
};

export const TUBE_RELATED_PRODUCTS = [
  { name: "Custom Earring Boxes", slug: "custom-earring-boxes", images: ["/images/products/custom-earring-boxes.jpg"] },
  { name: "Custom Ring Boxes", slug: "custom-ring-boxes", images: ["/images/products/custom-ring-boxes.jpg"] },
  { name: "Bracelet Boxes", slug: "bracelet-boxes", images: ["/images/products/bracelet-boxes.jpg"] },
  { name: "Pendant Boxes", slug: "pendant-boxes", images: ["/images/products/pendant-boxes.jpg"] },
  { name: "Pandasew Packaging", slug: "custom-pandasew-packaging", images: ["/images/products/custom-pandasew-packaging.jpg"] },
  { name: "Kraft Bulk Jewelry Boxes", slug: "kraft-bulk-jewelry-boxes", images: ["/images/products/kraft-bulk-jewelry-boxes.jpg"] },
  { name: "Custom Anklet Boxes", slug: "custom-anklet-boxes", images: ["/images/products/custom-anklet-boxes.jpg"] },
  { name: "Custom Bangle Boxes", slug: "custom-bangle-boxes", images: ["/images/products/custom-bangle-boxes.jpg"] },
  { name: "Corrugated Cake Boxes", slug: "corrugated-cake-boxes", images: ["/images/products/corrugated-cake-boxes.jpg"] },
  { name: "White Corrugated Boxes", slug: "white-corrugated-boxes", images: ["/images/products/white-corrugated-boxes.jpg"] },
  { name: "Corrugated Tuck Top Boxes", slug: "corrugated-tuck-top-boxes", images: ["/images/products/corrugated-tuck-top-boxes.jpg"] },
  { name: "Screen Printing Boxes", slug: "screen-printing-boxes", images: ["/images/products/screen-printing-boxes.jpg"] },
];

export const TUBE_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-tube",
  name: "Custom Tube Packaging",
  slug: "custom-tube-packaging",
  section: "style",
  hero_headline_white: "Custom",
  hero_headline_accent: "Paper Tube Packaging",
  description: "Flat 20% Off on Your First Order + Free Shipping",
  image_url: "/images/categories/tube-packaging-hero.png",
  banner_image_url: "/images/categories/tube-packaging-hero.png",
  category_content: {
    feature_items: [
      {
        icon: "Palette",
        title: "Premium Cylindrical Design",
        description: "Unique tube structure that adds a high-end, eye-catching look and enhances shelf appeal.",
      },
      {
        icon: "Feather",
        title: "Strong & Protective Build",
        description: "Rigid construction designed to keep products safe from pressure, impact, and external damage.",
      },
      {
        icon: "Leaf",
        title: "Sustainable Material Options",
        description: "Eco-friendly, recyclable paper-based materials, ideal for brands focused on sustainability.",
      },
    ],
    content_blocks: [
      {
        heading: "Finally, Eco-Friendly Tubes That Look Premium.",
        body: "Custom tube packaging made from 100% curbside recyclable and food-grade materials enhances visual appeal while maintaining product quality. With their sleek designs and high-quality printing, these custom-printed paper tubes help create a clean and modern brand image that stands out in retail environments.",
        image: "/images/categories/tube-eco-friendly.jpg",
        alt: "Custom bakery boxes for baked goods",
        linkLabel: "Get a Free Quote →",
      },
      {
        heading: "Hygienic, Durable & Product-Safe",
        body: "Tube packaging is designed to protect food products like coffee, tea, snacks, and chocolates from air exposure and moisture. Their secure sealing and durable materials ensure product safety throughout usage.",
        image: "/images/categories/tube-hygienic-durable.jpg",
        alt: "Variety of custom bakery packaging styles",
        flipped: true,
      },
      {
        heading: "Ready to Upgrade Your Boring Boxes With Paper Tube Packaging?",
        body: "If you want sleek and modern branding for your business to stand out on retail shelves, tube packaging is the perfect style to go with. Let HOF Pack help you in creating custom-designed tubes.",
        image: "/images/categories/tube-ready-upgrade.jpg",
        alt: "Fresh bakery products in custom packaging",
        linkLabel: "Get a Packaging Report →",
      },
    ],
    why_heading: "How Tube Packaging Helps Your Brand Stand Out",
    article_sections: [
      {
        level: "p",
        text: "Tube packaging offers both functionality and branding. Its sleek design and user-friendly features make it a popular choice among today’s consumers. Custom paper tubes not only help protect the product but also boost shelf appeal and contribute to a polished, professional brand image.",
      },
      {
        level: "h2",
        text: "When to Choose Custom Paper Tube Packaging?",
      },
      {
        level: "p",
        text: "Custom tube packaging is commonly used when brands need:\n• Enhanced product look\n• Increased Brand perception & value\n• Controlled dispensing for pharmaceuticals\n• Hygienic packaging\n• Leak-proof and travel-friendly packaging",
      },
      {
        level: "h2",
        text: "Why Custom Tube Packaging Is Ideal for Brands in the US?",
      },
      {
        level: "p",
        text: "Custom tube packaging is widely used in industries where hygiene and convenience matter. It allows controlled usage, reduces product waste, and ensures that products remain protected from external contaminants. This makes paper tubes a preferred choice for food and pharmaceutical brands.",
      },
      {
        level: "h3",
        text: "Create Your Custom-Sized Paper Tubes with HOF Pack:",
      },
      {
        level: "p",
        text: "We offer full custom options for size, capacity, fit, and height of your custom tube packaging. Here are some standard sizes if you are unsure of what will fit your product’s needs:\n• For small items like pre-rolls, samples, try diameter (0.5” – 1”) & height (2” – 6”)\n• For light products like essential oils, vapes, and cosmetics, common dimensions include 1” – 2” diameter and 3” – 8” height range.\n• For coffee and product samples, common size ranges are 2” – 3” diameter and 4” – 10” height.\n• For retail items like protein powders, roasted coffee beans, and gift items, custom tubes range from 3” – 4” in diameter and 5” – 12” in height.\n• For luxury kits, the common diameter is 4” – 6” and height 4” – 10”.\n• For bulk or premium items like bottles, gift sets, or PR kits, you can keep the diameter 6” or more and height range 6” – 15” or more for your custom paper tubes.",
      },
      {
        level: "divider",
        text: "",
      },
      {
        level: "h2",
        text: "Types of Custom Tube Packaging: Find Your Perfect Fit",
      },
      {
        level: "p",
        text: "Don’t worry about styling when HOF Pack is here to help you out. Our custom tubes are carefully engineered to fit every brand’s needs. Here is a wide range of styles we provide:",
      },
      {
        level: "h4",
        text: "Mini & Travel Size Tubes",
      },
      {
        level: "p",
        text: "These are compact tubes suitable for samples, travel kits, and promotional packaging.",
      },
      {
        level: "h4",
        text: "Straight Tube (2-piece)",
      },
      {
        level: "p",
        text: "These paper tubes have a telescopic fit with a separate lid and base. They are ideal for luxury packaging, coffee packaging, food storage, and other small items.",
      },
      {
        level: "h2",
        text: "Full Telescopic Tube",
      },
      {
        level: "p",
        text: "These are custom tubes with a deep lid covering the base, perfect for premium gift packaging.",
      },
      {
        level: "h4",
        text: "Child Resistant Tube Packaging",
      },
      {
        level: "p",
        text: "These paper tubes come with a locking mechanism to keep curious little hands away. They are perfect for pre-roll tubes, vapes, and cannabis tube packaging.",
      },
      {
        level: "h2",
        text: "Choose the Right Material for Your Tube Packaging",
      },
      {
        level: "p",
        text: "Choosing the right material is essential for product safety and usability:\n• Eco-friendly Tubes: Recyclable and sustainable material options\n• Paperboard: Commonly 1mm – 1.5mm thick for lightweight items.\n• Rigid Board: 2mm – 3mm thick, ideal for cosmetics and candles.\n• Reinforced board: Usually 3mm - 5mm + thick, perfect for luxury packaging, gift tubes, high-end kits, or heavy products due to their ultra durability.",
      },
      {
        level: "h2",
        text: "Printing & Finishing Options for Tube Packaging",
      },
      {
        level: "p",
        text: "Enhance your packaging with custom printing that reflects your brand identity. Explore options like offset printing, digital printing for high-quality graphics, silk screen printing for precise detailing, matte & gloss finishes for visual appeal, foil stamping for premium branding, and custom labeling through direct printing options.",
      },
      {
        level: "h2",
        text: "Design, Approve, & Enjoy Tube Packaging With HOF Pack",
      },
      {
        level: "p",
        text: "• Share your product type and packaging requirements\n• Select tube material, size, and style\n• Send your customized design and branding elements\n• Approve samples before production\n• Start bulk manufacturing and quality checks\n• Get your order delivered to your door.",
      },
      {
        level: "h2",
        text: "Here’s Why You Should Choose HOF Pack for Tube Packaging",
      },
      {
        level: "p",
        text: "We understand the importance of product safety, usability, and branding in tube packaging. That’s why HOF Pack brings solutions that are designed to meet industry standards while offering flexibility in customization.\n\nWe offer precision-matched caps, grease-resistant liners, food-safe materials, color proofing, & product guarantees through 2D flat view, 3D mockups, video mockups, and physical samples.\n\nContact our team at info@hofpack.com or call +1 (888) 429-4881 for a free consultation.",
      },
    ],
    material_items: [
      "foil linings & heat-sealed",
      "Leak-proof and durable designs",
      "FSC & SGS certified",
    ],
    perk_items: [
      "Wholesale Pricing with Free Sample",
      "8-10 days turnaround",
      "Free Shipping all Across the US",
      "Innovative Printing Designs",
      "Free design consultation",
      "MOQ as low as 100 units",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "What products are suitable for tube packaging?",
      answer:
        "Paper tube packaging is ideal for any solid product, like roasted coffee beans, gift sets, and sample products.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "Are paper tube packages odor-proof?",
      answer:
        "Yes, properly sealed custom tubes are designed to prevent odor leakage and protect the product.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "Can I customize paper tube packaging with my brand design?",
      answer:
        "Yes, you can customize size, materials, printing, and finishes according to your brand's needs.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "Is paper tube packaging hygienic?",
      answer:
        "Yes, tube packaging minimizes product exposure, making it a hygienic option for personal care products.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "Do you offer paper tube packaging wholesale?",
      answer:
        "Yes, bulk options are available with competitive pricing and low minimum order quantities.",
      display_order: 5,
    },
  ],
};

export const TUCK_RELATED_PRODUCTS = [
  { name: "Pre Roll Cone Packaging", slug: "pre-roll-cone-packaging", images: ["/images/products/pre-roll-cone-packaging.jpg"] },
  { name: "Cannabis Pre-Roll Packaging", slug: "cannabis-pre-roll-packaging", images: ["/images/products/cannabis-pre-roll-packaging.jpg"] },
  { name: "Necklace Cards", slug: "necklace-cards", images: ["/images/products/necklace-cards.jpg"] },
  { name: "Necklace Boxes", slug: "necklace-boxes", images: ["/images/products/necklace-boxes.jpg"] },
  { name: "Custom Earring Boxes", slug: "custom-earring-boxes", images: ["/images/products/custom-earring-boxes.jpg"] },
  { name: "Custom Ring Boxes", slug: "custom-ring-boxes", images: ["/images/products/custom-ring-boxes.jpg"] },
  { name: "Bracelet Boxes", slug: "bracelet-boxes", images: ["/images/products/bracelet-boxes.jpg"] },
  { name: "Pendant Boxes", slug: "pendant-boxes", images: ["/images/products/pendant-boxes.jpg"] },
  { name: "Pandasew Packaging", slug: "custom-pandasew-packaging", images: ["/images/products/custom-pandasew-packaging.jpg"] },
  { name: "Kraft Bulk Jewelry Boxes", slug: "kraft-bulk-jewelry-boxes", images: ["/images/products/kraft-bulk-jewelry-boxes.jpg"] },
  { name: "Custom Anklet Boxes", slug: "custom-anklet-boxes", images: ["/images/products/custom-anklet-boxes.jpg"] },
  { name: "Custom Bangle Boxes", slug: "custom-bangle-boxes", images: ["/images/products/custom-bangle-boxes.jpg"] },
];

export const TUCK_CATEGORY_DATA: CategoryDetailData = {
  id: "cat-tuck",
  name: "Custom Tuck Boxes",
  slug: "custom-tuck-boxes",
  section: "style",
  hero_headline_white: "Custom Tuck Boxes",
  hero_headline_accent: "Everyday Packaging Choice",
  description: "Flat 20% Off on Your First Order + Free Shipping",
  image_url: "/hero-branded-boxes.png",
  banner_image_url: "/hero-branded-boxes.png",
  category_content: {
    feature_items: [
      {
        icon: "Palette",
        title: "Bold color output",
        description: "Expressive, striking, vibrant colors through the use of our high-quality water-based inks and advanced print buttons.",
      },
      {
        icon: "Feather",
        title: "Low-weight packaging",
        description: "Maintain light packaging without sacrificing security, effectively lowering your shipping expenses.",
      },
      {
        icon: "Leaf",
        title: "Earth-friendly choices",
        description: "Minimise your ecological footprint through FSC-certified, sustainable paperboard made from recycled fibres.",
      },
    ],
    content_blocks: [
      {
        heading: "Smart Packaging That Balances Cost, Functionality, and Design",
        body: "Sometimes budget-friendly packaging comes at the cost of quality and visual appeal. Our custom tuck top boxes are lightweight, easy to assemble, and cost-efficient, making them ideal for bulk production. Their secure tuck closure keeps products safe while offering a clean and polished look for retail shelves. This is why tuck packaging is the most widely used box across industries.",
        image: "/images/categories/tuck-smart-packaging.jpg",
        alt: "Smart Packaging That Balances Cost, Functionality, and Design",
      },
      {
        heading: "Enhance Shelf Appeal with Secure, Scalable Packaging",
        body: "As your business grows, your packaging also needs to scale with it. Our custom tuck boxes wholesale are designed for both small businesses and large enterprises. They are easy to store, quick to assemble, and cost-effective for bulk packaging. Thus, helping brands reduce operational costs while maintaining consistency in packaging quality.",
        image: "/images/categories/tuck-enhance-shelf-appeal.jpg",
        alt: "Enhance Shelf Appeal with Secure, Scalable Packaging",
        flipped: true,
      },
      {
        heading: "Ready To Customize Custom Tuck Boxes with Personalized Designs?",
        body: "Packaging is the first interaction customers have with your product. Make it impactful. Explore our custom tuck packaging for inspiration or contact us for a free design consultation and free quote.",
        image: "/images/categories/tuck-ready-customize.jpg",
        alt: "Ready To Customize Custom Tuck Boxes with Personalized Designs?",
        linkLabel: "Start Customizing with Us!",
      },
    ],
    why_heading: "Explore our Wide Range of Custom Tuck Boxes",
    article_sections: [
      {
        level: "p",
        text: "Have a look at the variety of custom tuck boxes we provide, each engineered carefully according to different products and industry needs. Each style is designed to solve specific packaging challenges, from product protection to enhanced presentation.",
      },
      {
        level: "h4",
        text: "Tuck Top Boxes",
      },
      {
        level: "p",
        text: "Simple, cost-effective, and seamless design ideal for packing lightweight products and small items.",
      },
      {
        level: "h4",
        text: "Straight Tuck Boxes",
      },
      {
        level: "p",
        text: "Both front and bottom flap tuck at the back, simple design with a clean front-facing design, ideal for retail display for cosmetics, small electronic items, and cards.",
      },
      {
        level: "h4",
        text: "Reverse Tuck Boxes:",
      },
      {
        level: "p",
        text: "Top flap tucks to the back while the bottom flap tucks to the front, lightweight, and easy-to-use packaging for light products, cosmetics, and pharmaceuticals.",
      },
      {
        level: "h4",
        text: "Tuck Top Auto Bottom:",
      },
      {
        level: "p",
        text: "Auto-lock boxes with a secure, automatic locking base and a tuck-top closure. Extra strength for heavier items with quick assembly.",
      },
      {
        level: "h4",
        text: "Roll End Tuck Top/Tuck Mailer Boxes:",
      },
      {
        level: "p",
        text: "Durable and secure packaging with a tray-like base and a lid that tucks into the sides for added security and stability during shipping.",
      },
      {
        level: "h4",
        text: "Tuck Top Gable Box",
      },
      {
        level: "p",
        text: "A specialty tuck box with a unique design and built-in handle on top for easy carrying, often used for gifts or retail products.",
      },
      {
        level: "divider",
        text: "",
      },
      {
        level: "h2",
        text: "Fully Customize Tuck Top Boxes With HOF Pack",
      },
      {
        level: "p",
        text: "We believe an ideal packaging is what reflects your brand identity and meets functional needs. That is why we provide custom printed tuck boxes at HOF Pack that not only protect your product but also enhance its market appeal. Our custom tuck boxes can be fully tailored with:",
      },
      {
        level: "h4",
        text: "Custom sizes & dimensions:",
      },
      {
        level: "p",
        text: "You can select your custom size based on your product’s dimensions. However, here are some standard sizes:\n• Poker: 2.5\" x 3.5\" x 0.7\"\n• Bridge: 2.25\" x 3.5\" x 0.75\"\n• Tarot: 2.75\" x 4.75\" x 1.25\"\n• Standard product boxes: 2\" x 2\", 4\" x 6\", 10\" x 12\" (or custom-size)",
      },
      {
        level: "divider",
        text: "",
      },
      {
        level: "p",
        text: "• Depth: 0.5 to 3 inches (can be customized)\n• High-quality printing: CMYK & PMS for vibrant branding\n• Add-ons & Finishes: inserts, coatings for extra protection, die-cut windows for product viewing, glossy/matte lamination, spot UV, hot foil stamping, and embossed logos\n• Materials: SBS paperboard (C1S/C2S), Kraft, and corrugated cardboard.\n• Features: Secure closure, structural integrity, and tear-off strips for display or dispensing.",
      },
      {
        level: "divider",
        text: "",
      },
      {
        level: "h2",
        text: "Industries Which Use Tuck Top Boxes",
      },
      {
        level: "p",
        text: "The versatility, flexibility, affordability, and efficiency of tuck packaging boxes make them suitable and reliable for a wide range of industries.\n• Retail & Consumer Goods: Ideal for everyday products for simple yet attractive packaging.\n• Food & Bakery: Used for dry food items, snacks, and takeaway packaging.\n• Cosmetics & Skincare: Provides a premium look while protecting delicate items.\n• Pharmaceuticals: Ensures safe and secure packaging for medicines and healthcare products.\n• E-commerce & Subscription Boxes: Lightweight and durable for shipping purposes.\n• Electronics & Accessories: Ideal for small gadgets and components.\n• Playing Cards/Card Games: Ideal for card packaging like Poker, Bridge, Tarot, UNO",
      },
      {
        level: "h2",
        text: "Why HOF Pack is Best in Town?",
      },
      {
        level: "p",
        text: "We deliver custom tuck style boxes that combine protection, branding, and affordability, helping businesses grow faster.",
      },
    ],
    material_items: [
      "SBS Paperboard or Cardboard for Strength",
      "Safe And Secure Packaging",
      "Lightweight And Easy To Store",
    ],
    perk_items: [
      "Wholesale Pricing",
      "Fast production turnaround",
      "No Delays",
      "Innovative Printing Designs",
      "Free design consultation",
      "Flexible MOQ",
      "Competitive Bulk discounts",
      "Startup-friendly Packaging",
    ],
  },
  faqs: [
    {
      id: "faq-1",
      question: "Can I customize tuck boxes with my brand design?",
      answer: "Yes, you can fully customize size, printing, finishes, and add-ons",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "Are tuck boxes suitable for e-commerce packaging?",
      answer: "Yes, they are lightweight and easy to assemble, making them ideal for shipping.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "Do you offer custom tuck boxes wholesale?",
      answer: "Yes, we provide bulk options with flexible quantities and competitive pricing.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "What is your turnaround time for wholesale tuck boxes?",
      answer: "Our turnaround time is 8-10 business days for your wholesale orders of custom tuck boxes.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "What are tuck boxes used for?",
      answer: "Tuck boxes are used for packaging retail and e-commerce products due to their simple design and cost-effectiveness.",
      display_order: 5,
    },
  ],
};

// Generic rich content generator for all 21 categories so that each sub-page is completely populated
export function getCategoryDetailDefaults(slug: string, name: string, section: "industry" | "material" | "style"): CategoryDetailData {
  if (slug === "custom-coffee-packaging" || slug === "coffee-packaging") {
    return COFFEE_CATEGORY_DATA;
  }
  if (slug === "custom-bakery-boxes" || slug === "bakery-boxes") {
    return BAKERY_CATEGORY_DATA;
  }
  if (slug === "custom-candle-boxes" || slug === "candle-boxes") {
    return CANDLE_CATEGORY_DATA;
  }
  if (slug === "custom-cosmetic-boxes" || slug === "cosmetic-boxes") {
    return COSMETIC_CATEGORY_DATA;
  }
  if (slug === "custom-cigarette-boxes" || slug === "cigarette-boxes") {
    return CIGARETTE_CATEGORY_DATA;
  }
  if (slug === "custom-jewelry-boxes" || slug === "jewelry-boxes") {
    return JEWELRY_CATEGORY_DATA;
  }
  if (slug === "custom-retail-boxes" || slug === "retail-boxes") {
    return RETAIL_CATEGORY_DATA;
  }
  if (slug === "custom-wax-papers" || slug === "wax-papers") {
    return WAX_PAPER_CATEGORY_DATA;
  }
  if (slug === "custom-soap-boxes" || slug === "soap-boxes") {
    return SOAP_CATEGORY_DATA;
  }
  if (slug === "custom-cardboard-boxes" || slug === "cardboard-boxes") {
    return CARDBOARD_CATEGORY_DATA;
  }
  if (slug === "custom-corrugated-boxes" || slug === "corrugated-boxes") {
    return CORRUGATED_CATEGORY_DATA;
  }
  if (slug === "custom-kraft-boxes" || slug === "kraft-boxes") {
    return KRAFT_CATEGORY_DATA;
  }
  if (slug === "custom-mylar-bags" || slug === "mylar-bags" || slug === "custom-mylar-boxes") {
    return MYLAR_CATEGORY_DATA;
  }
  if (slug === "custom-rigid-boxes" || slug === "rigid-boxes") {
    return RIGID_CATEGORY_DATA;
  }
  if (slug === "custom-labels-and-stickers" || slug === "labels-and-stickers") {
    return STICKERS_CATEGORY_DATA;
  }
  if (slug === "custom-mailer-boxes" || slug === "mailer-boxes") {
    return MAILER_CATEGORY_DATA;
  }
  if (slug === "custom-display-boxes" || slug === "display-boxes") {
    return DISPLAY_CATEGORY_DATA;
  }
  if (slug === "custom-gable-boxes" || slug === "gable-boxes") {
    return GABLE_CATEGORY_DATA;
  }
  if (slug === "custom-pillow-boxes" || slug === "pillow-boxes") {
    return PILLOW_CATEGORY_DATA;
  }
  if (slug === "custom-tube-packaging" || slug === "tube-packaging") {
    return TUBE_CATEGORY_DATA;
  }
  if (slug === "custom-tuck-boxes" || slug === "tuck-boxes") {
    return TUCK_CATEGORY_DATA;
  }

  const sectionLabel =
    section === "industry" ? "Boxes by Industry" :
    section === "material" ? "Boxes by Material" : "Boxes by Style";

  return {
    id: `cat-${slug}`,
    name,
    slug,
    section,
    hero_headline_white: name,
    hero_headline_accent: section === "industry" ? "Tailored For Your Brand" : section === "material" ? "Premium Quality Stock" : "Exceptional Unboxing",
    description: "Flat 20% Off on Your First Order + Free Shipping Across USA",
    image_url: "/images/categories/a509eace-2e00-4b84-a0da-55157dd2db2b.jpg",
    banner_image_url: "/images/categories/a509eace-2e00-4b84-a0da-55157dd2db2b.jpg",
    category_content: {
      feature_items: [
        {
          icon: "Palette",
          title: "Vibrant Color Reproduction",
          description: "High-definition CMYK and Pantone PMS spot printing with crisp typography and brand-accurate colors.",
        },
        {
          icon: "Feather",
          title: "Lightweight & Sturdy",
          description: "Engineered for maximum structural integrity, space efficiency, and reduced postal shipping costs.",
        },
        {
          icon: "Leaf",
          title: "Eco-Friendly Materials",
          description: "FSC-certified recycled board and non-toxic soy inks that align with sustainable consumer expectations.",
        },
      ],
      content_blocks: [
        {
          heading: `Elevate Your Brand with Custom ${name}`,
          body: `Make your products unforgettable on the shelf and during unboxing. Our custom ${name.toLowerCase()} are precision engineered from premium materials to deliver durability, visual impact, and memorable customer impressions.`,
          image: "/images/categories/20a92f95-e23d-4dea-ac3d-b40970ced53f.jpg",
          alt: `Custom ${name} presentation`,
          linkLabel: "Get a Free Quote →",
        },
        {
          heading: "Engineered for Protection and Shelf Appeal",
          body: `Keep your products securely cushioned and protected throughout transit and retail display. With custom structural inserts, sturdy closures, and barrier coatings, your items arrive in pristine condition every time.`,
          image: "/images/categories/fd4f2ac8-2b9a-4276-b871-f5f637b0b765.jpg",
          alt: `Premium custom ${name.toLowerCase()} features`,
          flipped: true,
        },
        {
          heading: `Fully Customizable Solutions with HOF Pack`,
          body: `From size dimensions and board thickness to spot UV, soft-touch lamination, and hot foil stamping, configure every element to match your exact packaging requirements.`,
          image: "/images/categories/8b3309ce-5116-46b2-ac54-7827c8488c58.jpg",
          alt: `Custom ${name.toLowerCase()} production`,
          linkLabel: "Get a Packaging Report →",
        },
      ],
      why_heading: `Why Choose Custom ${name} from HOF Pack?`,
      article_sections: [
        {
          level: "p",
          text: `Custom ${name.toLowerCase()} provide the ultimate combination of structural protection and high-end presentation, transforming everyday packaging into an effective brand marketing asset.`,
        },
        {
          level: "h2",
          text: "Tailored Specifically For Your Business Needs",
        },
        {
          level: "p",
          text: `At HOF Pack, we offer bespoke packaging solutions built to your exact specifications. Whether you are launching a new product line or scaling wholesale distribution, we provide low MOQs and dedicated structural engineering support.`,
        },
        {
          level: "h4",
          text: "Premium Finishing & Custom Add-ons",
        },
        {
          level: "p",
          text: "Enhance your packaging with luxury options:\n- Soft-touch matte and high-gloss lamination\n- Gold, silver, and holographic foil stamping\n- Embossing and debossing for tactile 3D branding\n- Precision die-cut custom windows and EVA foam inserts",
        },
        {
          level: "h4",
          text: "Fast Turnaround & USA Delivery",
        },
        {
          level: "p",
          text: "Enjoy reliable 8-10 day turnaround with free digital 3D mockups, dieline assistance, and complimentary nationwide shipping.",
        },
      ],
      material_items: [
        "FSC-Certified Board",
        "Food-Grade Safe",
        "100% Recyclable Stock",
        "Soy-Based Inks",
      ],
      perk_items: [
        "Wholesale Pricing with Free Sample",
        "8-10 days turnaround",
        "Free Shipping all Across the US",
        "Innovative Printing Designs",
        "Free design consultation",
        "MOQ as low as 100 units",
      ],
    },
    faqs: [
      {
        id: "faq-1",
        question: `What is the minimum order quantity (MOQ) for ${name.toLowerCase()}?`,
        answer: `Our minimum order quantity starts as low as 100 units for custom printed ${name.toLowerCase()}, allowing emerging brands and established businesses to order flexibly without excess inventory.`,
        display_order: 1,
      },
      {
        id: "faq-2",
        question: "Can I receive a digital proof or sample before full production?",
        answer: "Yes! We provide complimentary 2D dieline templates and 3D digital mockups with every order. Physical pre-production samples are also available upon request.",
        display_order: 2,
      },
      {
        id: "faq-3",
        question: "What printing methods and finishes are available?",
        answer: "We support high-definition offset CMYK, PMS spot colors, digital printing, gloss/matte lamination, soft-touch coatings, spot UV, and hot foil stamping.",
        display_order: 3,
      },
      {
        id: "faq-4",
        question: "How long does production and shipping take?",
        answer: "Standard production turnaround is 8 to 10 business days following final artwork approval. We provide free standard shipping across the United States.",
        display_order: 4,
      },
      {
        id: "faq-5",
        question: "Can you help design the dieline and artwork layout?",
        answer: "Yes, our in-house packaging design team provides free design consultation and prepress review to ensure your dieline and vector artwork print flawlessly.",
        display_order: 5,
      },
    ],
  };
}
