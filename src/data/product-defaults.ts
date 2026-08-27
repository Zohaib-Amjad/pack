import type { ProductContent } from "@/types/product-content";
import { PRODUCT_GALLERIES } from "./product-galleries";
import { FULL_PRODUCTS_DATABASE } from "./product-detail-defaults";
import { categories, getCategoryBySlug, getProductTag } from "./products";

export interface ProductDetailData {
  id: string;
  name: string;
  slug: string;
  skuCode?: string;
  description: string;
  images: string[];
  box_style?: string;
  min_quantity?: string;
  stock_info?: string;
  size_info?: string;
  printing_options?: string;
  finishing_options?: string;
  proof_info?: string;
  turnaround_time?: string;
  shipping_info?: string;
  category: {
    name: string;
    slug: string;
  };
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  product_content?: ProductContent;
  faqs?: { id: string; question: string; answer: string; display_order: number }[];
  relatedProducts?: { name: string; slug: string; image: string }[];
}

export const KRAFT_PAPER_TUBES_DATA: ProductDetailData = {
  id: "prod-kraft-paper-tubes",
  name: "Kraft Paper Tubes",
  slug: "kraft-paper-tubes",
  skuCode: "F112 — Custom Packaging",
  description:
    "Tired of packaging that looks basic or fails to protect your products? Kraft paper tubes are durable, cylindrical packaging solutions designed for brands looking for protective yet eco-conscious packaging. Their natural kraft appearance creates a clean and minimal presentation while offering reliable structural strength for retail and shipping purposes. These tubes are commonly used for candles, cosmetics, food items, apparel accessories, and gift packaging.",
  images: [
    "/images/products/8dffc711-913a-42f7-8487-370ec897939e.jpg",
    "/images/products/aaf0249a-e71c-4e80-b765-f9aedc4bc9a2.jpg",
    "/images/products/ad4906c1-9293-4f88-a03f-199cb60b4929.jpg",
    "/images/products/b86498f8-2f37-4c36-a7fb-3c9088fa1d58.jpg",
  ],
  box_style: "Kraft Paper Tubes",
  size_info: "All Custom Sizes & Shapes",
  min_quantity: "No MOQ Required",
  stock_info: "10pt to 28pt Kraft, Corrugated, Rigid, Cardstock",
  printing_options: "No Printing, Digital, Gravure",
  finishing_options:
    "Gloss Lamination, Matte Lamination, Gloss AQ, Gloss UV, Matte UV, Spot UVEmbossing, Debossing, Gold / Silver Foiling, Holographic Foiling",
  proof_info: "2D Flat View, 3D Digital Mockup",
  turnaround_time: "10–20 Business Days",
  shipping_info: "Free Ground Shipping Nationwide",
  category: {
    name: "Kraft Boxes",
    slug: "custom-kraft-boxes",
  },
  product_content: {
    spec_overrides: {
      printing_options_list: ["No Printing", "Digital", "Gravure"],
      finishing_options_list: [
        "Gloss Lamination",
        "Matte Lamination",
        "Gloss AQ",
        "Gloss UV",
        "Matte UV",
        "Spot UVEmbossing",
        "Debossing",
        "Gold / Silver Foiling",
        "Holographic Foiling",
      ],
      included_options: ["Die Cutting", "Gluing", "Scored", "Perforation"],
      additional_options: ["Eco-Friendly", "Recycled Boxes", "Biodegradable"],
      turnaround_label: "10–20 Business Days",
      rush_available: true,
      dimension_info: "All Custom Sizes & Shapes",
      quantities_info: "No MOQ Required",
    },
    feature_items: [
      {
        icon: "Palette",
        title: "Bold color output",
        description:
          "Expressive, striking, vibrant colors through the use of our high-quality water-based inks and advanced print buttons.",
      },
      {
        icon: "Feather",
        title: "Low-weight packaging",
        description:
          "Maintain light packaging without sacrificing security, effectively lowering your shipping expenses.",
      },
      {
        icon: "Leaf",
        title: "Earth-friendly choices",
        description:
          "Minimise your ecological footprint through FSC-certified, sustainable paperboard made from recycled fibres.",
      },
    ],
    content_blocks: [
      {
        heading: "Stand Out On Shelves",
        body: "If your packaging blends in with others, your product gets ignored. Yeah, it is what it is. Kraft cylinder packaging is designed to grab attention with its sleek, round structure. These kraft paper tube packaging solutions give your products a high-end look while ensuring durability and protection.",
        image: "/images/products/aaf0249a-e71c-4e80-b765-f9aedc4bc9a2.jpg",
        alt: "Stand Out On Shelves",
        flipped: false,
      },
      {
        heading: "High Compression Resistance & Durability",
        body: "At HOF Pack, we create kraft paper tubes that combine durability with eco-conscious design. Our eco-friendly paper tubes are made from recyclable materials and built for long-term use. They not only provide durability but also high-end resistance to any sort of product damage. Order kraft paper tubes wholesale to reduce costs while maintaining premium quality.",
        image: "/images/products/ad4906c1-9293-4f88-a03f-199cb60b4929.jpg",
        alt: "High Compression Resistance & Durability",
        flipped: true,
      },
      {
        heading: "Ready to Elevate Your Packaging Game with HOF Pack?",
        body: "Design your custom kraft tubes with lids today and give your products packaging that stands out and sells. With its snug, protective structure, it not only gives an eye- catching and high-end feel, but also protects. Order your customized wholesale kraft paper tubes today!",
        image: "/images/products/b86498f8-2f37-4c36-a7fb-3c9088fa1d58.jpg",
        alt: "Ready to Elevate Your Packaging Game with HOF Pack?",
        linkLabel: "Start Customizing With Us!",
        flipped: false,
      },
    ],
    article_sections: [
      {
        level: "h2",
        text: "Why Standard Packaging is Holding Your Brand Back",
      },
      {
        level: "p",
        text: "Generic packaging often fails to create impact. It looks basic, lacks protection, and doesn’t reflect product value. Tube packaging has become increasingly popular because it offers something different from traditional square boxes. The cylindrical shape naturally attracts attention while creating a more premium unboxing experience. Combined with kraft textures, these tubes help products feel more modern, natural, and high-end at the same time.",
      },
      { level: "divider" },
      {
        level: "h4",
        text: "Flat Packaging Gets Ignored",
      },
      {
        level: "p",
        text: "Traditional boxes often look repetitive. Kraft cylinder packaging adds a unique, premium feel that instantly grabs attention.",
      },
      {
        level: "h4",
        text: "Weak Packaging Risks Product Damage",
      },
      {
        level: "p",
        text: "Our cardboard tube packaging is strong, shock-resistant, and durable, protecting products during storage and shipping.",
      },
      {
        level: "h4",
        text: "No Brand Identity with Plain Packaging",
      },
      {
        level: "p",
        text: "Say goodbye to plain packages. With custom kraft tubes with lids, you can add branding elements to create a memorable customer experience.",
      },
      {
        level: "h4",
        text: "Lack of Sustainability Hurts Brand Image",
      },
      {
        level: "p",
        text: "Consumers prefer eco-conscious brands. Our eco-friendly tubes help reduce environmental impact while maintaining quality.",
      },
      { level: "divider" },
      {
        level: "h2",
        text: "Packaging That Feels Natural & Premium Instantly",
      },
      {
        level: "p",
        text: "Modern customers are increasingly drawn toward packaging that feels authentic and sustainable. Kraft paper tubes create that balance through their earthy texture, clean appearance, and functional design. Their minimal look works especially well for organic, handmade, luxury, and eco-conscious brands. Interestingly, many luxury brands also use cylindrical packaging because round structures psychologically feel more unique and gift-like compared to traditional boxes. That subtle difference often makes products feel more memorable during unboxing.",
      },
      {
        level: "h3",
        text: "Built for Protection Without Bulky Packaging",
      },
      {
        level: "p",
        text: "Despite their lightweight feel, kraft cylinder packaging provides strong product protection during storage and transportation. The rigid tube structure helps reduce crushing, bending, and product movement inside the packaging. This makes kraft paper tubes both practical and visually appealing.",
      },
      {
        level: "h3",
        text: "Customize Your Kraft Tubes Your Way",
      },
      {
        level: "p",
        text: "We offer complete flexibility to design kraft paper tubes that match your brand identity.",
      },
      {
        level: "h4",
        text: "Custom Sizes & Structural Options",
      },
      {
        level: "p",
        text: "Get the perfect fit with kraft paper tube packaging designed according to your product dimensions.",
      },
      {
        level: "h4",
        text: "High-Quality Printing & Branding",
      },
      {
        level: "p",
        text: "Create strong brand recognition with custom printing on your kraft cylinder packaging. Help your customers remember you.",
      },
      {
        level: "h4",
        text: "Premium Finishing Options",
      },
      {
        level: "p",
        text: "Kraft paper tube packaging can include several customization features. These details help create a stronger visual identity while improving customer experience, such as:\n- Matte or textured finishes\n- Foil stamping\n- Embossed branding\n- Inner protective liners\n- Custom printed artwork",
      },
      {
        level: "h4",
        text: "Functional Add-Ons & Lids",
      },
      {
        level: "p",
        text: "Our custom kraft tubes with lids provide easy opening and secure closure, improving user experience. The slightly resistant design is exactly what brands like Apple use.",
      },
      { level: "divider" },
      {
        level: "h2",
        text: "Suitable for Cosmetics, Candles, Food & More",
      },
      {
        level: "p",
        text: "Custom kraft paper tubes are widely used across different industries because of their versatile structure. it offers better structural strength compared to folding cartons. Its cylindrical shape distributes pressure evenly, making kraft paper tubes more resistant to crushing during shipping. Moreover, their structure allows products to remain protected while improving shelf presentation. Popular applications include:\n- Candle packaging\n- Lip balm and cosmetic packaging\n- Coffee and tea packaging\n- Cookie and snack packaging\n- Gift packaging\n- Apparel accessories\n- Mechanical and Automotive Industry\n- Electrical wires and grease cartridges",
      },
      {
        level: "h2",
        text: "Durable and Sustainable Materials Used in Kraft Packaging",
      },
      {
        level: "p",
        text: "Our eco-friendly cylinder packaging is made of top-grade materials that ensure your kraft paper tubes wholesale orders are sustainable, durable, and cost-effective, ideal for brands focusing on sustainability. Many businesses now prefer kraft tube packaging because it aligns with growing sustainability trends. Kraft materials naturally communicate a more eco-conscious and recyclable appearance compared to excessive plastic packaging. That natural visual appeal often helps brands build stronger trust with environmentally aware customers. We use:\n- Kraft Paperboard\n- Corrugated Kraft\n- Recycled Kraft Paper",
      },
      { level: "divider" },
      {
        level: "h2",
        text: "Why do U.S. Brands Trust HOF Pack?",
      },
      {
        level: "p",
        text: "We carefully engineer our Kraft cylinder tube, specifically tailored to your brand needs. They offer a simple yet impactful packaging design that improves both product security and brand visibility. Trust HOF Pack for wholesale kraft paper tubes, just like all brands in the US do. Contact our team at info@hofpack.com or call +1 (888) 429-4881 for a free consultation.",
      },
    ],
    material_items: [
      "Eco-friendly Packaging",
      "Food-Grade Safe Materials",
      "Grease Resistant",
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
      question: "What are kraft paper tubes used for?",
      answer:
        "Kraft paper tubes are versatile cylindrical containers used for cosmetics, candles, apparel, posters, teas, coffee, artisan snacks, and gifts.",
      display_order: 1,
    },
    {
      id: "faq-2",
      question: "Can I customize kraft paper tubes with our logo and branding?",
      answer:
        "Yes! We offer full-color CMYK printing, PMS Pantone matching, foil stamping, embossing, spot UV, and custom labels tailored to your brand guidelines.",
      display_order: 2,
    },
    {
      id: "faq-3",
      question: "Do you offer wholesale kraft paper tubes?",
      answer:
        "Yes! We provide tiered bulk volume discounts starting at 100 units up to 100,000+ units with free digital mockups and free USA shipping.",
      display_order: 3,
    },
    {
      id: "faq-4",
      question: "Why are kraft paper tubes an effective packaging solution?",
      answer:
        "Their rigid circular structure naturally distributes pressure, providing exceptional crush resistance during shipping while offering an eco-friendly, premium unboxing aesthetic.",
      display_order: 4,
    },
    {
      id: "faq-5",
      question: "What is your turnaround time for custom Kraft paper tubes?",
      answer:
        "Standard production turnaround is 8–10 business days after digital dieline approval, with rush production options available upon request.",
      display_order: 5,
    },
  ],
  relatedProducts: [
    {
      name: "Coffee Kraft Bags",
      slug: "coffee-kraft-bags",
      image:
        "/images/products/edd5a371-9cbf-4c82-8236-c048283ba573.jpg",
    },
    {
      name: "Kraft Window Boxes",
      slug: "kraft-window-boxes",
      image:
        "/images/products/db87231c-7bac-42ea-af2d-717dae46fcad.jpg",
    },
    {
      name: "Kraft Bakery Boxes",
      slug: "kraft-bakery-boxes",
      image:
        "/images/products/99003f72-0f73-45e7-b6ab-01d76805a064.jpg",
    },
    {
      name: "Kraft Boxes With Lids",
      slug: "kraft-boxes-with-lids",
      image:
        "/images/products/20c20026-81fd-4c59-9f93-68b40015c9a1.jpg",
    },
    {
      name: "Kraft Gable Boxes",
      slug: "kraft-gable-boxes",
      image:
        "/images/products/6d43e73b-2afa-40df-a97e-89ff62538e9a.jpg",
    },
    {
      name: "Kraft Gift Boxes",
      slug: "kraft-gift-boxes",
      image:
        "/images/products/caec6940-af3b-4081-b766-fa9f78fa8725.jpg",
    },
    {
      name: "Kraft Mailer Boxes",
      slug: "kraft-mailer-boxes",
      image:
        "/images/products/ebbb0947-f40f-4ca1-b308-51d843cfe163.jpg",
    },
    {
      name: "Kraft Pillow Boxes",
      slug: "kraft-pillow-boxes",
      image:
        "/images/products/d0fff8f0-f9fe-4173-812b-11a806d9ac12.jpg",
    },
    {
      name: "White Kraft Boxes",
      slug: "white-kraft-boxes",
      image:
        "/images/products/dae63e62-b339-4047-b6ef-cf395b5dc13f.jpg",
    },
  ],
};

export function getProductDetailDefaults(
  slug: string,
  name?: string,
  categoryName?: string,
  categorySlug?: string,
  productImage?: string
): ProductDetailData {
  const resolvedCatSlug = categorySlug || (FULL_PRODUCTS_DATABASE[slug]?.category?.slug) || "custom-kraft-boxes";
  const resolvedCatName = categoryName || (FULL_PRODUCTS_DATABASE[slug]?.category?.name) || "Custom Boxes";

  const catObj = getCategoryBySlug(resolvedCatSlug) || categories.find(c => c.slug === resolvedCatSlug || c.name.toLowerCase() === resolvedCatName.toLowerCase());
  const siblingProds = catObj?.products || [];
  const defaultRelated = siblingProds
    .filter(p => p.slug !== slug)
    .slice(0, 8)
    .map(p => ({
      name: p.name,
      slug: p.slug,
      image: (p as any).image || `/images/products/${p.slug}.jpg`
    }));

  const calculatedTag = getProductTag(slug, resolvedCatSlug);

  if (FULL_PRODUCTS_DATABASE[slug]) {
    const dbProduct = FULL_PRODUCTS_DATABASE[slug];
    return {
      ...dbProduct,
      skuCode: calculatedTag,
      category: {
        name: dbProduct.category?.name || resolvedCatName,
        slug: dbProduct.category?.slug || resolvedCatSlug,
      },
      relatedProducts: (dbProduct.relatedProducts && dbProduct.relatedProducts.length > 0)
        ? dbProduct.relatedProducts
        : defaultRelated
    };
  }

  const resolvedName = name || slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const explicitGallery = PRODUCT_GALLERIES[slug];
  const resolvedImages = (explicitGallery && explicitGallery.length > 0)
    ? explicitGallery
    : productImage
      ? [productImage]
      : ["/images/products/kraft-paper-tubes.jpg"];

  if (slug === "kraft-paper-tubes") {
    return {
      ...KRAFT_PAPER_TUBES_DATA,
      skuCode: calculatedTag,
      images: resolvedImages,
      relatedProducts: defaultRelated.length > 0 ? defaultRelated : KRAFT_PAPER_TUBES_DATA.relatedProducts,
    };
  }

  return {
    id: `prod-${slug}`,
    name: resolvedName,
    slug,
    skuCode: calculatedTag,
    description: `Custom ${resolvedName} engineered with premium materials, precision die-cuts, and full CMYK branding. Free design assistance and fastest turnaround time in the USA.`,
    images: resolvedImages,
    box_style: resolvedName,
    size_info: "All Custom Sizes & Shapes",
    min_quantity: "No MOQ Required",
    stock_info: "10pt to 28pt Kraft, Corrugated, Rigid, Cardstock",
    printing_options: "No Printing, Digital, Gravure",
    finishing_options:
      "Gloss Lamination, Matte Lamination, Gloss AQ, Gloss UV, Matte UV, Spot UVEmbossing, Debossing, Gold / Silver Foiling, Holographic Foiling",
    proof_info: "2D Flat View, 3D Digital Mockup",
    turnaround_time: "8–10 Business Days",
    shipping_info: "Free Ground Shipping Nationwide",
    category: {
      name: resolvedCatName,
      slug: resolvedCatSlug,
    },
    product_content: {
      ...KRAFT_PAPER_TUBES_DATA.product_content,
      content_blocks: [
        {
          heading: `Stand Out On Shelves with ${resolvedName}`,
          body: `Elevate your product presentation with custom engineered ${resolvedName}. Built with premium sustainable materials that protect your merchandise while turning heads in retail displays.`,
          image: resolvedImages[0] || "/images/products/aaf0249a-e71c-4e80-b765-f9aedc4bc9a2.jpg",
          alt: resolvedName,
          flipped: false,
        },
        {
          heading: "High Compression Resistance & Durability",
          body: `At HOF Pack, we engineer ${resolvedName} that combine durability with eco-conscious aesthetics. Built for high-volume shipping and retail presentation.`,
          image: resolvedImages[1] || resolvedImages[0] || "/images/products/ad4906c1-9293-4f88-a03f-199cb60b4929.jpg",
          alt: "Durability",
          flipped: true,
        },
        {
          heading: "Ready to Elevate Your Packaging Game with HOF Pack?",
          body: `Design your custom ${resolvedName.toLowerCase()} today with free digital dielines and 2D/3D mockups. Fast turnarounds and low MOQ.`,
          image: resolvedImages[2] || resolvedImages[0] || "/images/products/b86498f8-2f37-4c36-a7fb-3c9088fa1d58.jpg",
          alt: "Elevate your packaging",
          linkLabel: "Start Customizing With Us!",
          flipped: false,
        },
      ],
    },
    faqs: KRAFT_PAPER_TUBES_DATA.faqs,
    relatedProducts: defaultRelated.length > 0 ? defaultRelated : KRAFT_PAPER_TUBES_DATA.relatedProducts,
  };
}
