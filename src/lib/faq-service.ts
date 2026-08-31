import { createPublicClient } from "@/utils/supabase/public-client";
import { createDataClient } from "@/utils/supabase/data-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tab: "global" | "artwork" | "category" | "product" | "page";
  section?: "homepage" | "category" | "artwork" | "product" | "general" | "page";
  page_slug?: string | null;
  page_name?: string | null;
  category_slug?: string | null;
  category_id?: string | null;
  product_slug?: string | null;
  product_id?: string | null;
  status: "Published" | "Draft";
  order?: number;
  created_at?: string;
  updated_at?: string;
}

export const BASE_FAQS: FAQItem[] = [
  // ── Home Page FAQs ──
  {
    id: "ba1c9724-18f6-4901-9975-f68f502f9cc7",
    question: "Can I get a sample before a custom order in bulk?",
    answer:
      "Yes, you can get a digital proof to check printing and color quality, or you can request a physical sample of your custom box before finalizing your bulk order. We also provide 2D mockups, 3D mockups, and video mockups for your custom packaging. Check it first, and then approve the final design.",
    category: "Home: Samples & Proofing",
    tab: "global",
    section: "homepage",
    page_slug: "home",
    page_name: "Home Page",
    status: "Published",
    order: 1,
  },
  {
    id: "f4920232-2897-483e-8263-a34e79c44e17",
    question: "What are the benefits of custom boxes?",
    answer:
      "With custom boxes, you can enhance your brand recognition with every order and create a consistent brand identity through custom designs and brand logo. They are a perfect way to attract customers, boost your brand sales, create memorable unboxing experiences, improve marketing, and offer the right product fit. This will overall increase your brand awareness and perceived value.",
    category: "Home: Brand Value",
    tab: "global",
    section: "homepage",
    page_slug: "home",
    page_name: "Home Page",
    status: "Published",
    order: 2,
  },
  {
    id: "bb81fb82-957c-4664-9c1d-652f04605f1f",
    question: "What is the minimum order quantity for HOF Pack?",
    answer:
      "There is no minimum order quantity for the HOF Pack. You can request as few as 100 units for your custom boxes wholesale order. We provide flexibility in order quantity and support small startups and businesses alike, all across the United States.",
    category: "Home: Order Quantities",
    tab: "global",
    section: "homepage",
    page_slug: "home",
    page_name: "Home Page",
    status: "Published",
    order: 3,
  },
  {
    id: "cbd4772c-cbcf-4a97-8e51-ed469b01002b",
    question: "What is the turnaround time for an order?",
    answer:
      "On average, we take around 8-10 business days to finalize an order and ship it. However, the turnaround time mainly depends on design complexity, additional finishes, large quantities, and delays in design approvals.",
    category: "Home: Turnaround & Logistics",
    tab: "global",
    section: "homepage",
    page_slug: "home",
    page_name: "Home Page",
    status: "Published",
    order: 4,
  },
  {
    id: "2e25609f-2b4d-47e3-b30a-496cafeae0bd",
    question: "Do you ship all across the USA?",
    answer:
      "Yes, we ship all across the US and also provide worldwide shipping for your custom printed boxes. We are partnered with DHL, FedEx Corp, and UPS to provide a transparent and smooth shipping experience. You can track your orders online once they are shipped by us.",
    category: "Home: Shipping Policies",
    tab: "global",
    section: "homepage",
    page_slug: "home",
    page_name: "Home Page",
    status: "Published",
    order: 5,
  },
  {
    id: "208e7843-9efa-4a54-9690-2fc08f86d9db",
    question: "Can I get an instant quote before ordering?",
    answer:
      "Absolutely, you can get a free quote from our team by providing us with your product details, specifications, and design preferences. Contact our team at info@hofpack.com or call +1 (888) 429-4881 for a free design consultation.",
    category: "Home: Quotes & Inquiries",
    tab: "global",
    section: "homepage",
    page_slug: "home",
    page_name: "Home Page",
    status: "Published",
    order: 6,
  },

  // ── Product Detail Pages FAQs ──
  {
    id: "pdp-faq-1",
    question: "How do I determine the right dimensions (L x W x H) for my custom box?",
    answer:
      "Measure your item at its widest points and add 1/8\" (0.125\") to each dimension for a snug fit. If you're adding custom foam inserts, bubble wrap, or tissue paper, add 1/4\" to 1/2\" of buffer room so everything sits neatly inside.",
    category: "Product Detail Pages: Dimensions & Fit",
    tab: "page",
    section: "product",
    page_slug: "product-detail-pages",
    page_name: "Product Detail Pages",
    status: "Published",
    order: 1,
  },
  {
    id: "pdp-faq-2",
    question: "Can I print on both the interior and exterior of my custom packaging?",
    answer:
      "Yes! We offer full CMYK printing on both the outside and inside surfaces of our corrugated mailers, folding cartons, and rigid setup boxes. Interior printing is a great way to include welcome messages, branding, or discount codes for an unforgettable unboxing experience.",
    category: "Product Detail Pages: Custom Printing",
    tab: "page",
    section: "product",
    page_slug: "product-detail-pages",
    page_name: "Product Detail Pages",
    status: "Published",
    order: 2,
  },
  {
    id: "pdp-faq-3",
    question: "What cardboard paperboard thickness and materials do you offer?",
    answer:
      "We offer a wide range of paperboard stocks including 14pt–24pt SBS (Solid Bleached Sulfate) C1S/C2S paperboard for folding cartons, E-flute and B-flute corrugated cardboard for shipping and mailer boxes, 1.5mm–3mm greyboard for luxury rigid gift boxes, and 100% recyclable Kraft board.",
    category: "Product Detail Pages: Materials & Stock",
    tab: "page",
    section: "product",
    page_slug: "product-detail-pages",
    page_name: "Product Detail Pages",
    status: "Published",
    order: 3,
  },
  {
    id: "pdp-faq-4",
    question: "Do you offer custom molded EVA foam, velvet trays, or cardboard dividers?",
    answer:
      "Yes, we build custom precision-cut EVA foam inserts, high-density sponge trays, molded pulp dividers, and velvet-flocked platforms tailored to the exact silhouette of your bottles, cosmetics, electronics, or jewelry.",
    category: "Product Detail Pages: Inserts & Accessories",
    tab: "page",
    section: "product",
    page_slug: "product-detail-pages",
    page_name: "Product Detail Pages",
    status: "Published",
    order: 4,
  },
  {
    id: "pdp-faq-5",
    question: "What specialty luxury finishes are available on product detail pages?",
    answer:
      "You can choose from Matte Soft-Touch Lamination, High-Gloss Finish, Metallic Foil Stamping (Gold, Silver, Rose Gold, Holographic), Spot UV Varnish, Raised Embossing / Debossing, and Magnetic Strip Closures.",
    category: "Product Detail Pages: Premium Finishes",
    tab: "page",
    section: "product",
    page_slug: "product-detail-pages",
    page_name: "Product Detail Pages",
    status: "Published",
    order: 5,
  },

  // ── Process Page FAQs ──
  {
    id: "process-faq-1",
    question: "What is the step-by-step production workflow at HOF Pack?",
    answer:
      "Our 4-step process includes: 1) Initial Quote & Dimension Consultation, 2) Custom Dieline Template & 3D Mockup Approval, 3) Precision Printing & Manufacturing, 4) Quality Assurance & Fast Tracked Delivery straight to your door.",
    category: "Process: Manufacturing Steps",
    tab: "page",
    section: "general",
    page_slug: "process",
    page_name: "Process Page",
    status: "Published",
    order: 1,
  },
  {
    id: "process-faq-2",
    question: "How long does digital 3D proofing take before production begins?",
    answer:
      "Once you submit your artwork on our custom dieline template, our structural packaging engineers generate a complimentary 3D interactive mockup within 12 to 24 hours. Production starts only after you give 100% written approval.",
    category: "Process: Proofing Timeline",
    tab: "page",
    section: "general",
    page_slug: "process",
    page_name: "Process Page",
    status: "Published",
    order: 2,
  },
  {
    id: "process-faq-3",
    question: "Can I order a physical pre-production sample to test my product fit?",
    answer:
      "Yes! We can ship a physical pre-production prototype box (either unprinted plain structural sample or full custom printed sample) so your team can verify structural integrity, weight tolerances, and print vibrancy before mass manufacturing.",
    category: "Process: Physical Sampling",
    tab: "page",
    section: "general",
    page_slug: "process",
    page_name: "Process Page",
    status: "Published",
    order: 3,
  },

  // ── About Page FAQs ──
  {
    id: "about-faq-1",
    question: "Are HOF Pack packaging materials eco-friendly and sustainably sourced?",
    answer:
      "Yes! Sustainability is core to our manufacturing. We utilize FSC-certified paperboard, biodegradable kraft stocks, water-based non-toxic inks, and fully recyclable corrugated fluting across our entire packaging lineup.",
    category: "About: Eco Commitment",
    tab: "page",
    section: "general",
    page_slug: "about",
    page_name: "About Page",
    status: "Published",
    order: 1,
  },
  {
    id: "about-faq-2",
    question: "Where is HOF Pack based and how do you support American businesses?",
    answer:
      "HOF Pack is headquartered in the United States with dedicated customer support based in Tucson, Arizona. We provide direct wholesale pricing, free shipping to all US 50 states, dedicated account managers, and zero hidden die-cut fees.",
    category: "About: Company & Locations",
    tab: "page",
    section: "general",
    page_slug: "about",
    page_name: "About Page",
    status: "Published",
    order: 2,
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

const SETTINGS_KEY = "custom_faqs_list";

export async function fetchAllFaqs(tabFilter?: string): Promise<FAQItem[]> {
  const map = new Map<string, FAQItem>();

  // Base list
  BASE_FAQS.forEach((f) => {
    map.set(f.id, { ...f });
  });

  // 1. Fetch from Supabase faqs table
  try {
    const supabase = createPublicClient();
    const { data: rows } = await withAbortableTimeout((signal) =>
      supabase
        .from("faqs" as any)
        .select("*")
        .order("order", { ascending: true })
        .abortSignal(signal) as any
    );

    if (Array.isArray(rows) && rows.length > 0) {
      rows.forEach((row: any) => {
        const id = String(row.id || "");
        if (!id) return;
        const existing = map.get(id);
        const sec = row.section || (row.category === "artwork" ? "artwork" : "homepage");
        const tab = (row.tab as any) || (sec === "artwork" ? "artwork" : sec === "category" ? "category" : sec === "product" ? "product" : "global");

        map.set(id, {
          id,
          question: row.question || "",
          answer: row.answer || "",
          category: row.category || row.section || "Global Support",
          tab,
          section: sec,
          category_slug: row.category_slug || row.categoryRef || null,
          category_id: row.category_id || null,
          product_slug: row.product_slug || row.productRef || null,
          product_id: row.product_id || null,
          status: row.is_published === false ? "Draft" : "Published",
          order: row.order ?? row.display_order ?? existing?.order ?? 999,
          created_at: row.created_at,
          updated_at: row.updated_at,
        });
      });
    }
  } catch {
    // ignore
  }

  // 2. Fetch from Supabase site_settings
  try {
    const supabase = createPublicClient();
    const res = (await withAbortableTimeout((signal) =>
      (supabase
        .from("site_settings" as any)
        .select("value")
        .eq("key", SETTINGS_KEY)
        .abortSignal(signal)
        .maybeSingle() as any)
    )) as any;

    if (!res?.error && Array.isArray(res?.data?.value)) {
      res.data.value.forEach((item: FAQItem) => {
        if (item.id) {
          map.set(item.id, {
            ...(map.get(item.id) || {}),
            ...item,
          });
        }
      });
    }
  } catch {
    // ignore
  }

  // 3. Check LocalStorage
  if (typeof window !== "undefined") {
    try {
      const localStr = localStorage.getItem("hof_custom_faqs_list");
      if (localStr) {
        const localList: FAQItem[] = JSON.parse(localStr);
        localList.forEach((item) => {
          if (item.id) {
            map.set(item.id, {
              ...(map.get(item.id) || {}),
              ...item,
            });
          }
        });
      }
    } catch {
      // ignore
    }
  }

  let list = Array.from(map.values());
  if (tabFilter && tabFilter !== "all") {
    list = list.filter((f) => f.tab === tabFilter || f.section === tabFilter);
  }
  list.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  return list;
}

export async function fetchHomepageFaqs(): Promise<FAQItem[]> {
  const all = await fetchAllFaqs();
  return all.filter((f) => f.status !== "Draft");
}

export async function fetchCategoryFaqs(categorySlug: string, categoryId?: string): Promise<FAQItem[]> {
  const all = await fetchAllFaqs();
  const clean = categorySlug.toLowerCase().replace(/^custom-/, "");
  return all.filter((f) => {
    if (f.status === "Draft") return false;
    if (f.tab !== "category" && f.section !== "category") return false;
    if (categoryId && f.category_id === categoryId) return true;
    if (f.category_slug && (f.category_slug === categorySlug || f.category_slug.replace(/^custom-/, "") === clean)) return true;
    return false;
  });
}

export async function fetchProductFaqs(productSlug: string, productId?: string): Promise<FAQItem[]> {
  const all = await fetchAllFaqs();
  return all.filter((f) => {
    if (f.status === "Draft") return false;
    if (f.tab !== "product" && f.section !== "product") return false;
    if (productId && f.product_id === productId) return true;
    if (f.product_slug && f.product_slug === productSlug) return true;
    return false;
  });
}

export async function fetchPageFaqs(pageSlug: string): Promise<FAQItem[]> {
  const all = await fetchAllFaqs();
  const clean = pageSlug.toLowerCase().trim();
  return all.filter((f) => {
    if (f.status === "Draft") return false;
    if (f.page_slug && f.page_slug.toLowerCase() === clean) return true;
    if (clean === "home" && (f.tab === "global" || f.section === "homepage")) return true;
    if (clean === "artwork-guidelines" && (f.tab === "artwork" || f.section === "artwork")) return true;
    if (clean === "product-detail-pages" && (f.tab === "product" || f.section === "product" || f.page_slug === "product-detail-pages")) return true;
    return false;
  });
}

export async function fetchFaqById(id: string): Promise<FAQItem | null> {
  const all = await fetchAllFaqs();
  return all.find((f) => f.id === id) || null;
}

export async function saveFaqRecord(faq: Partial<FAQItem> & { question: string; answer: string }): Promise<FAQItem> {
  const now = new Date().toISOString();
  const id = faq.id || crypto.randomUUID();
  const record: FAQItem = {
    id,
    question: faq.question,
    answer: faq.answer,
    category: faq.category || "Global Support",
    tab: faq.tab || "global",
    section: faq.section || (faq.tab === "artwork" ? "artwork" : faq.tab === "category" ? "category" : faq.tab === "product" ? "product" : faq.tab === "page" ? "page" : "homepage"),
    page_slug: faq.page_slug || (faq.tab === "page" ? "product-detail-pages" : null),
    page_name: faq.page_name || null,
    category_slug: faq.category_slug || null,
    category_id: faq.category_id || null,
    product_slug: faq.product_slug || null,
    product_id: faq.product_id || null,
    status: faq.status || "Published",
    order: faq.order ?? 0,
    created_at: faq.created_at || now,
    updated_at: now,
  };

  // 1. Try Supabase faqs table
  try {
    const supabase = createDataClient();
    await supabase.from("faqs" as any).upsert(
      {
        id: record.id,
        question: record.question,
        answer: record.answer,
        category: record.category,
        tab: record.tab,
        section: record.section,
        page_slug: record.page_slug,
        category_slug: record.category_slug,
        category_id: record.category_id,
        product_slug: record.product_slug,
        product_id: record.product_id,
        is_published: record.status !== "Draft",
        order: record.order,
        updated_at: now,
      },
      { onConflict: "id" }
    );
  } catch {
    // fallback
  }

  // 2. Try Supabase site_settings
  try {
    const all = await fetchAllFaqs();
    const updated = [record, ...all.filter((f) => f.id !== record.id)];
    const supabase = createDataClient();
    await supabase.from("site_settings" as any).upsert(
      {
        key: SETTINGS_KEY,
        value: updated,
        updated_at: now,
      },
      { onConflict: "key" }
    );
  } catch {
    // fallback
  }

  // 3. LocalStorage
  if (typeof window !== "undefined") {
    try {
      const all = await fetchAllFaqs();
      const updated = [record, ...all.filter((f) => f.id !== record.id)];
      localStorage.setItem("hof_custom_faqs_list", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    } catch {
      // ignore
    }
  }

  return record;
}

export async function reorderFaqs(reorderedList: FAQItem[]): Promise<boolean> {
  const now = new Date().toISOString();
  const updatedMap = new Map<string, FAQItem>();

  // Fetch current all to preserve items not in current filter
  const currentAll = await fetchAllFaqs();
  currentAll.forEach((item) => updatedMap.set(item.id, item));

  // Update order for the reordered items
  reorderedList.forEach((item, index) => {
    const updated = {
      ...item,
      order: index + 1,
      updated_at: now,
    };
    updatedMap.set(item.id, updated);
  });

  const fullList = Array.from(updatedMap.values()).sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  // 1. Supabase faqs table
  try {
    const supabase = createDataClient();
    const updates = reorderedList.map((item, index) => ({
      id: item.id,
      order: index + 1,
      updated_at: now,
    }));
    for (const u of updates) {
      await supabase.from("faqs" as any).update({ order: u.order, updated_at: u.updated_at }).eq("id", u.id);
    }
  } catch {
    // ignore
  }

  // 2. Supabase site_settings
  try {
    const supabase = createDataClient();
    await supabase.from("site_settings" as any).upsert(
      {
        key: SETTINGS_KEY,
        value: fullList,
        updated_at: now,
      },
      { onConflict: "key" }
    );
  } catch {
    // ignore
  }

  // 3. LocalStorage
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("hof_custom_faqs_list", JSON.stringify(fullList));
      window.dispatchEvent(new Event("storage"));
    } catch {
      // ignore
    }
  }

  return true;
}

export async function deleteFaqRecord(id: string): Promise<boolean> {
  // 1. Supabase faqs table
  try {
    const supabase = createDataClient();
    await supabase.from("faqs" as any).delete().eq("id", id);
  } catch {
    // ignore
  }

  // 2. Supabase site_settings
  try {
    const all = await fetchAllFaqs();
    const filtered = all.filter((f) => f.id !== id);
    const supabase = createDataClient();
    await supabase.from("site_settings" as any).upsert(
      {
        key: SETTINGS_KEY,
        value: filtered,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" }
    );
  } catch {
    // ignore
  }

  // 3. LocalStorage
  if (typeof window !== "undefined") {
    try {
      const all = await fetchAllFaqs();
      const filtered = all.filter((f) => f.id !== id);
      localStorage.setItem("hof_custom_faqs_list", JSON.stringify(filtered));
      window.dispatchEvent(new Event("storage"));
    } catch {
      // ignore
    }
  }

  return true;
}
