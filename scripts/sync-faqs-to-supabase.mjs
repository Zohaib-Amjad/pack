import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.log("Supabase credentials not found.");
  process.exit(0);
}

const supabase = createClient(url, key);

const FAQS_18 = [
  {
    id: "ba1c9724-18f6-4901-9975-f68f502f9cc7",
    question: "Can I get a sample before a custom order in bulk?",
    answer:
      "Yes, you can get a digital proof to check printing and color quality, or you can request a physical sample of your custom box before finalizing your bulk order. We also provide 2D mockups, 3D mockups, and video mockups for your custom packaging. Check it first, and then approve the final design.",
    category: "Global Support",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 1,
  },
  {
    id: "f4920232-2897-483e-8263-a34e79c44e17",
    question: "What are the benefits of custom boxes?",
    answer:
      "With custom boxes, you can enhance your brand recognition with every order and create a consistent brand identity through custom designs and brand logo. They are a perfect way to attract customers, boost your brand sales, create memorable unboxing experiences, improve marketing, and offer the right product fit. This will overall increase your brand awareness and perceived value.",
    category: "Global Support",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 2,
  },
  {
    id: "bb81fb82-957c-4664-9c1d-652f04605f1f",
    question: "What is the minimum order quantity for HOF Pack?",
    answer:
      "There is no minimum order quantity for the HOF Pack. You can request as few as 500 units for your custom boxes wholesale order. We provide flexibility in order quantity and support small startups and businesses alike, all across the United States.",
    category: "Global Support",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 3,
  },
  {
    id: "cbd4772c-cbcf-4a97-8e51-ed469b01002b",
    question: "What is the turnaround time for an order?",
    answer:
      "On average, we take around 8-10 business days to finalize an order and ship it. However, the turnaround time mainly depends on design complexity, additional finishes, large quantities, and delays in design approvals.",
    category: "Global Support",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 4,
  },
  {
    id: "2e25609f-2b4d-47e3-b30a-496cafeae0bd",
    question: "Do you ship all across the USA?",
    answer:
      "Yes, we ship all across the US and also provide worldwide shipping for your custom printed boxes. We are partnered with DHL, FedEx Corp, and UPS to provide a transparent and smooth shipping experience. You can track your orders online once they are shipped by us. We provide both express shipping, which can take around 12 days, and standard delivery, which takes 2–7 business days for domestic shipments and 7–21 business days for international shipments.",
    category: "Global Support",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 5,
  },
  {
    id: "208e7843-9efa-4a54-9690-2fc08f86d9db",
    question: "Can I get an instant quote before ordering?",
    answer:
      "Absolutely, you can get a free quote from our team by providing us with your product details, specifications, and design preferences. Contact our team at info@hofpack.com or call +1 (888) 429-4881 for a free design consultation. We will help you choose the right material and style for your custom packaging.",
    category: "Global Support",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 6,
  },
  {
    id: "1c70f11a-6030-4a0c-a7bc-14b6b5d11170",
    question: "What do the different lines on a dieline mean?",
    answer:
      "Cut Line (black): the final trimmed edge of the box. Keep important text/graphics at least 0.125\" inside this line.\nCrease/Fold Line (red): shows where the material will be folded.\nBleed Line (green): artwork that touches the cut line should extend out to the bleed line to avoid white edges after trimming.\nSafety Margin (dotted green): the recommended zone to keep text and key graphics within, generally 0.125\" from the cut line.\nPerforation(dotted black): marks a line of small punched holes for easy tearing.",
    category: "Artwork: dielines",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 7,
  },
  {
    id: "7bee344a-60de-44ee-b843-accb94951e73",
    question: "What file formats does HofPack accept?",
    answer:
      "We accept vector-based files, which give the sharpest results for text, line art, and logos:\nAI (Adobe Illustrator)\nPDF (Portable Document Format, vector/print-ready)\nEPS (Encapsulated PostScript)\nPhotographs and other raster artwork should be embedded within one of the above file types rather than uploaded as a standalone JPEG or PNG.\n\nTip: When exporting a PDF from Illustrator, use the \"Press Quality\" preset to keep fonts, line weights, and image resolution intact.",
    category: "Artwork: file formats",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 8,
  },
  {
    id: "a72cea8a-4e5b-44a5-95dc-ea2633e02334",
    question: "Why does my artwork need to be in CMYK, not RGB?",
    answer:
      "Our presses print using CMYK (and PMS/Pantone) inks. RGB is built for screens and does not translate directly to print, so RGB files can shift in color, tone, and vibrancy once printed. Files submitted in RGB will be converted to CMYK, which may alter the final appearance — for the most accurate match, please convert your file yourself before submitting.",
    category: "Artwork: color mode",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 9,
  },
  {
    id: "04c884c3-699a-4360-ab4d-f055d8873208",
    question: "What's the minimum font size for print?",
    answer:
      "For legibility, we recommend a minimum of 8pt for standard (dark-on-light) text and 10pt for reverse/knockout text (light text on a dark background). As a general guide:\n\nDark text on a light background: 6pt minimum\nLight/reverse text on a dark background: 8pt minimum\n\nThin or light font weights may not hold up as well at small sizes, so test with a proof if you're near the minimum.",
    category: "Artwork: fonts text",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 10,
  },
  {
    id: "59049f64-2acb-4a05-a975-4e8c48a1b5ce",
    question: "What if I don't have Adobe Illustrator?",
    answer:
      "Any vector design software that can export to AI, PDF, or EPS will work. If you don't have access to design software, HofPack's in-house design team can build or clean up your artwork for you — just reach out to your account specialist.",
    category: "Artwork: file formats",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 11,
  },
  {
    id: "a15afe32-791e-418c-b956-57bf1e827ef4",
    question: "How should I set up layers for special finishes?",
    answer:
      "Create a duplicate artboard showing only the special-finish elements, filled at 100% K (solid black), and label the layer with the finish name (e.g., \"Foil Stamp,\" \"Spot UV\"). This keeps your base print file clean while clearly communicating what needs the special treatment.",
    category: "Artwork: special finishes",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 12,
  },
  {
    id: "d485a455-3930-4f52-93f2-f8624886f2cc",
    question: "Do I need to outline my fonts?",
    answer:
      "Yes. All text must be converted to outlines (vector shapes) before submission. This prevents font substitution or missing-font errors if we don't have the exact typeface installed. In Illustrator: select all text objects, then go to Type > Create Outlines.",
    category: "Artwork: fonts text",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 13,
  },
  {
    id: "3cd59f05-28a5-4984-b0b5-371365d832f2",
    question: "How do I switch my document color mode to CMYK?",
    answer:
      "In Illustrator: File > Document Color Mode > CMYK Color. Any embedded photos or images should also be individually converted to CMYK, since document mode alone won't convert linked assets.",
    category: "Artwork: color mode",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 14,
  },
  {
    id: "b39ac32b-9cd0-46ac-8c53-d4830b67186c",
    question: "How do I set up artwork for inside and outside printing?",
    answer:
      "If your box design is printed on both the interior and exterior, separate the two into clearly labeled artboards or layers — \"Inside Print\" and \"Outside Print\" — rather than combining them on one layer.",
    category: "Artwork: special finishes",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 15,
  },
  {
    id: "091a3e46-f280-44f8-918c-df5a744036f6",
    question: "Why is 100% K used for black text and line art?",
    answer:
      "Rich or mixed blacks (blends of C, M, Y, and K) can cause registration issues on small text and fine lines. Using 100% K (pure black) keeps small type and thin strokes crisp. If you need a deep, rich black for large solid areas, let your specialist know and we can advise on the right build.",
    category: "Artwork: color mode",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 16,
  },
  {
    id: "c3ffe414-6014-4867-9d0c-3a54b52ba23f",
    question: "Can I add Pantone (PMS) colors, foil stamping, or Spot UV?",
    answer:
      "Yes, HofPack supports PMS spot colors, foil stamping, embossing/debossing, and Spot UV coating. Each special finish needs to be placed on its own clearly labeled layer, separate from your base artwork, so our press team can identify exactly where it applies.",
    category: "Artwork: special finishes",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 17,
  },
  {
    id: "1d3c8e4c-8ff0-4523-b997-687f34edc53b",
    question: "Is there a maximum file size for uploads?",
    answer:
      "Files up to 100MB can be uploaded directly through your order portal. If your file is larger, contact your HofPack representative and we'll arrange an alternate transfer method.",
    category: "Artwork: file formats",
    tab: "global",
    section: "homepage",
    status: "Published",
    order: 18,
  },
];

async function sync() {
  const now = new Date().toISOString();

  // 1. Sync to site_settings
  const { error: err1 } = await supabase.from("site_settings").upsert(
    {
      key: "custom_faqs_list",
      value: FAQS_18,
      updated_at: now,
    },
    { onConflict: "key" }
  );

  if (err1) {
    console.error("site_settings sync error:", err1);
  } else {
    console.log("Synced 18 FAQs to site_settings!");
  }

  // 2. Sync to faqs table
  for (const faq of FAQS_18) {
    await supabase.from("faqs").upsert(
      {
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        tab: faq.tab,
        section: faq.section,
        is_published: true,
        order: faq.order,
        updated_at: now,
      },
      { onConflict: "id" }
    );
  }
  console.log("Upserted all 18 FAQs in Supabase faqs table!");
}

sync();
