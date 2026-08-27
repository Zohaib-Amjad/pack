import dotenv from "dotenv";
dotenv.config();

import { getPayload } from "payload";
import config from "../src/payload.config";
import {
  COFFEE_CATEGORY_DATA,
  BAKERY_CATEGORY_DATA,
  CANDLE_CATEGORY_DATA,
  COSMETIC_CATEGORY_DATA,
  CIGARETTE_CATEGORY_DATA,
  JEWELRY_CATEGORY_DATA,
  RETAIL_CATEGORY_DATA,
  WAX_PAPER_CATEGORY_DATA,
  SOAP_CATEGORY_DATA,
  CARDBOARD_CATEGORY_DATA,
  CORRUGATED_CATEGORY_DATA,
  KRAFT_CATEGORY_DATA,
  MYLAR_CATEGORY_DATA,
  RIGID_CATEGORY_DATA,
  STICKERS_CATEGORY_DATA,
  MAILER_CATEGORY_DATA,
  DISPLAY_CATEGORY_DATA,
  GABLE_CATEGORY_DATA,
  PILLOW_CATEGORY_DATA,
  TUBE_CATEGORY_DATA,
  TUCK_CATEGORY_DATA,
} from "../src/data/category-defaults";
import { FAQS as GENERAL_FAQS } from "../src/data/seed-data";

const HOMEPAGE_FAQS = [
  {
    question: "Can I get a sample before a custom order in bulk?",
    answer:
      "Yes, you can get a digital proof to check printing and color quality, or you can request a physical sample of your custom box before finalizing your bulk order. We also provide 2D mockups, 3D mockups, and video mockups for your custom packaging. Check it first, and then approve the final design.",
    category: "general",
  },
  {
    question: "What are the benefits of custom boxes?",
    answer:
      "With custom boxes, you can enhance your brand recognition with every order and create a consistent brand identity through custom designs and brand logo. They are a perfect way to attract customers, boost your brand sales, create memorable unboxing experiences, improve marketing, and offer the right product fit. This will overall increase your brand awareness and perceived value.",
    category: "general",
  },
  {
    question: "What is the minimum order quantity for HOF Pack?",
    answer:
      "There is no minimum order quantity for the HOF Pack. You can request as few as 500 units for your custom boxes wholesale order. We provide flexibility in order quantity and support small startups and businesses alike, all across the United States.",
    category: "ordering",
  },
  {
    question: "What is the turnaround time for an order?",
    answer:
      "On average, we take around 8-10 business days to finalize an order and ship it. However, the turnaround time mainly depends on design complexity, additional finishes, large quantities, and delays in design approvals.",
    category: "shipping",
  },
  {
    question: "Do you ship all across the USA?",
    answer:
      "Yes, we ship all across the US and also provide worldwide shipping for your custom printed boxes. We are partnered with DHL, FedEx Corp, and UPS to provide a transparent and smooth shipping experience. You can track your orders online once they are shipped by us. We provide both express shipping, which can take around 12 days, and standard delivery, which takes 2–7 business days for domestic shipments and 7–21 business days for international shipments.",
    category: "shipping",
  },
  {
    question: "Can I get an instant quote before ordering?",
    answer:
      "Absolutely, you can get a free quote from our team by providing us with your product details, specifications, and design preferences. Contact our team at info@hofpack.com or call +1 (888) 429-4881 for a free design consultation. We will help you choose the right material and style for your custom packaging.",
    category: "ordering",
  },
  {
    question: "What do the different lines on a dieline mean?",
    answer:
      "Cut Line (black): the final trimmed edge of the box. Keep important text/graphics at least 0.125\" inside this line.\nCrease/Fold Line (red): shows where the material will be folded.\nBleed Line (green): artwork that touches the cut line should extend out to the bleed line to avoid white edges after trimming.\nSafety Margin (dotted green): the recommended zone to keep text and key graphics within, generally 0.125\" from the cut line.\nPerforation(dotted black): marks a line of small punched holes for easy tearing.",
    category: "design",
  },
  {
    question: "What file formats does HofPack accept?",
    answer:
      "We accept vector-based files, which give the sharpest results for text, line art, and logos:\nAI (Adobe Illustrator)\nPDF (Portable Document Format, vector/print-ready)\nEPS (Encapsulated PostScript)\nPhotographs and other raster artwork should be embedded within one of the above file types rather than uploaded as a standalone JPEG or PNG.\n\nTip: When exporting a PDF from Illustrator, use the \"Press Quality\" preset to keep fonts, line weights, and image resolution intact.",
    category: "design",
  },
  {
    question: "Why does my artwork need to be in CMYK, not RGB?",
    answer:
      "Our presses print using CMYK (and PMS/Pantone) inks. RGB is built for screens and does not translate directly to print, so RGB files can shift in color, tone, and vibrancy once printed. Files submitted in RGB will be converted to CMYK, which may alter the final appearance — for the most accurate match, please convert your file yourself before submitting.",
    category: "design",
  },
  {
    question: "What's the minimum font size for print?",
    answer:
      "For legibility, we recommend a minimum of 8pt for standard (dark-on-light) text and 10pt for reverse/knockout text (light text on a dark background). As a general guide:\n\nDark text on a light background: 6pt minimum\nLight/reverse text on a dark background: 8pt minimum\n\nThin or light font weights may not hold up as well at small sizes, so test with a proof if you're near the minimum.",
    category: "design",
  },
  {
    question: "What if I don't have Adobe Illustrator?",
    answer:
      "Any vector design software that can export to AI, PDF, or EPS will work. If you don't have access to design software, HofPack's in-house design team can build or clean up your artwork for you — just reach out to your account specialist.",
    category: "design",
  },
  {
    question: "How should I set up layers for special finishes?",
    answer:
      "Create a duplicate artboard showing only the special-finish elements, filled at 100% K (solid black), and label the layer with the finish name (e.g., \"Foil Stamp,\" \"Spot UV\"). This keeps your base print file clean while clearly communicating what needs the special treatment.",
    category: "design",
  },
  {
    question: "Do I need to outline my fonts?",
    answer:
      "Yes. All text must be converted to outlines (vector shapes) before submission. This prevents font substitution or missing-font errors if we don't have the exact typeface installed. In Illustrator: select all text objects, then go to Type > Create Outlines.",
    category: "design",
  },
  {
    question: "How do I switch my document color mode to CMYK?",
    answer:
      "In Illustrator: File > Document Color Mode > CMYK Color. Any embedded photos or images should also be individually converted to CMYK, since document mode alone won't convert linked assets.",
    category: "design",
  },
  {
    question: "How do I set up artwork for inside and outside printing?",
    answer:
      "If your box design is printed on both the interior and exterior, separate the two into clearly labeled artboards or layers — \"Inside Print\" and \"Outside Print\" — rather than combining them on one layer.",
    category: "design",
  },
  {
    question: "Why is 100% K used for black text and line art?",
    answer:
      "Rich or mixed blacks (blends of C, M, Y, and K) can cause registration issues on small text and fine lines. Using 100% K (pure black) keeps small type and thin strokes crisp. If you need a deep, rich black for large solid areas, let your specialist know and we can advise on the right build.",
    category: "design",
  },
  {
    question: "Can I add Pantone (PMS) colors, foil stamping, or Spot UV?",
    answer:
      "Yes, HofPack supports PMS spot colors, foil stamping, embossing/debossing, and Spot UV coating. Each special finish needs to be placed on its own clearly labeled layer, separate from your base artwork, so our press team can identify exactly where it applies.",
    category: "materials",
  },
  {
    question: "Is there a maximum file size for uploads?",
    answer:
      "Files up to 100MB can be uploaded directly through your order portal. If your file is larger, contact your HofPack representative and we'll arrange an alternate transfer method.",
    category: "general",
  },
];

const ALL_CATEGORY_DATA = [
  COFFEE_CATEGORY_DATA,
  BAKERY_CATEGORY_DATA,
  CANDLE_CATEGORY_DATA,
  COSMETIC_CATEGORY_DATA,
  CIGARETTE_CATEGORY_DATA,
  JEWELRY_CATEGORY_DATA,
  RETAIL_CATEGORY_DATA,
  WAX_PAPER_CATEGORY_DATA,
  SOAP_CATEGORY_DATA,
  CARDBOARD_CATEGORY_DATA,
  CORRUGATED_CATEGORY_DATA,
  KRAFT_CATEGORY_DATA,
  MYLAR_CATEGORY_DATA,
  RIGID_CATEGORY_DATA,
  STICKERS_CATEGORY_DATA,
  MAILER_CATEGORY_DATA,
  DISPLAY_CATEGORY_DATA,
  GABLE_CATEGORY_DATA,
  PILLOW_CATEGORY_DATA,
  TUBE_CATEGORY_DATA,
  TUCK_CATEGORY_DATA,
];

export async function syncAllFaqs() {
  console.log("🚀 Starting Full FAQ Migration to Payload CMS Database...\n");

  const payload = await getPayload({ config });

  // 1. Fetch categories to link categoryRef
  console.log("📦 Fetching existing categories from Payload DB...");
  const categoriesRes = await payload.find({
    collection: "categories",
    limit: 100,
    pagination: false,
  });

  const categoryBySlug = new Map<string, any>();
  for (const cat of categoriesRes.docs) {
    categoryBySlug.set(cat.slug, cat.id);
  }
  console.log(`✓ Found ${categoryBySlug.size} categories in DB.\n`);

  // 2. Fetch existing FAQs to avoid duplicating
  console.log("🔍 Fetching existing FAQs in DB...");
  const existingFaqsRes = await payload.find({
    collection: "faqs",
    limit: 500,
    pagination: false,
  });

  const existingQuestionMap = new Map<string, any>();
  for (const f of existingFaqsRes.docs) {
    existingQuestionMap.set(f.question.trim().toLowerCase(), f.id);
  }
  console.log(`✓ Currently ${existingQuestionMap.size} FAQs exist in DB.\n`);

  let createdCount = 0;
  let updatedCount = 0;

  // Helper to upsert an FAQ
  async function upsertFaq(data: {
    question: string;
    answer: string;
    section: "homepage" | "category" | "artwork" | "general";
    category?: string;
    categoryRef?: any;
    order?: number;
  }) {
    const key = data.question.trim().toLowerCase();
    const existingId = existingQuestionMap.get(key);

    if (existingId) {
      await payload.update({
        collection: "faqs",
        id: existingId,
        data: {
          answer: data.answer,
          section: data.section,
          category: (data.category as any) || "general",
          categoryRef: data.categoryRef || undefined,
          is_published: true,
          order: data.order ?? 0,
        },
      });
      updatedCount++;
    } else {
      const created = await payload.create({
        collection: "faqs",
        data: {
          question: data.question,
          answer: data.answer,
          section: data.section,
          category: (data.category as any) || "general",
          categoryRef: data.categoryRef || undefined,
          is_published: true,
          order: data.order ?? 0,
        },
      });
      existingQuestionMap.set(key, created.id);
      createdCount++;
    }
  }

  // 3. Sync Homepage FAQs
  console.log(`🏠 Syncing ${HOMEPAGE_FAQS.length} Homepage FAQs...`);
  for (let i = 0; i < HOMEPAGE_FAQS.length; i++) {
    const item = HOMEPAGE_FAQS[i];
    await upsertFaq({
      question: item.question,
      answer: item.answer,
      section: "homepage",
      category: item.category,
      order: i + 1,
    });
  }
  console.log(`✓ Homepage FAQs processed.\n`);

  // 4. Sync General Site FAQs
  console.log(`🌐 Syncing ${GENERAL_FAQS.length} General Site FAQs...`);
  for (let i = 0; i < GENERAL_FAQS.length; i++) {
    const item = GENERAL_FAQS[i];
    await upsertFaq({
      question: item.question,
      answer: item.answer,
      section: "general",
      category: "general",
      order: i + 1,
    });
  }
  console.log(`✓ General Site FAQs processed.\n`);

  // 5. Sync Category Landing Page FAQs
  console.log(`📦 Syncing Category Landing Page FAQs across 21 categories...`);
  let catFaqTotal = 0;

  for (const catData of ALL_CATEGORY_DATA) {
    const catId = categoryBySlug.get(catData.slug);
    if (!catId) {
      console.warn(`  ⚠️ Category slug not found in DB: ${catData.slug} (${catData.name})`);
    }

    if (Array.isArray(catData.faqs)) {
      for (let i = 0; i < catData.faqs.length; i++) {
        const item = catData.faqs[i];
        await upsertFaq({
          question: item.question,
          answer: item.answer,
          section: "category",
          category: "general",
          categoryRef: catId || undefined,
          order: item.display_order ?? i + 1,
        });
        catFaqTotal++;
      }
    }
  }
  console.log(`✓ Category FAQs processed: ${catFaqTotal} FAQs across ${ALL_CATEGORY_DATA.length} categories.\n`);

  const finalCount = await payload.count({ collection: "faqs" });

  console.log("══════════════════════════════════════════════");
  console.log("🎉 FAQ MIGRATION & SYNC COMPLETED SUCCESSFULLY!");
  console.log(`✨ Created New: ${createdCount}`);
  console.log(`🔄 Updated:     ${updatedCount}`);
  console.log(`📊 Total in DB: ${finalCount.totalDocs}`);
  console.log("══════════════════════════════════════════════\n");

  process.exit(0);
}

syncAllFaqs().catch((err) => {
  console.error("❌ Fatal error during FAQ sync:", err);
  process.exit(1);
});
