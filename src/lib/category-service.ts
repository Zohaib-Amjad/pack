import { createPublicClient } from "@/utils/supabase/public-client";
import { createDataClient } from "@/utils/supabase/data-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { categories as defaultCategories, type Category, type Product } from "@/data/products";

const SETTINGS_KEY = "custom_categories_list";
const OVERRIDES_KEY = "category_status_overrides";

export interface CategoryDetailRecord {
  id: string;
  name: string;
  slug: string;
  section: "industry" | "material" | "style";
  description: string;
  detail_description?: string;
  hero_headline_white?: string;
  hero_headline_accent?: string;
  image?: string;
  banner_image_url?: string;
  is_active: boolean;
  product_count?: number;
  products?: Product[];
  created_at?: string;
  updated_at?: string;
}

export const BASE_CATEGORIES: CategoryDetailRecord[] = [
  {
    id: "cat-bakery-boxes",
    name: "Bakery Boxes",
    slug: "bakery-boxes",
    section: "industry",
    description: "Custom bakery boxes designed to keep your baked goods fresh and beautifully presented.",
    is_active: true,
    product_count: 9,
  },
  {
    id: "cat-candle-boxes",
    name: "Candle Boxes",
    slug: "custom-candle-boxes",
    section: "industry",
    description: "Flat 20% Off on Your First Order + Free Shipping",
    is_active: true,
    product_count: 8,
  },
  {
    id: "cat-cardboard-boxes",
    name: "Cardboard Boxes",
    slug: "cardboard-boxes",
    section: "material",
    description: "Versatile cardboard packaging for every need. Lightweight yet strong, fully customizable with high-quality printing and sustainable materials.",
    is_active: true,
    product_count: 10,
  },
  {
    id: "cat-coffee-packaging",
    name: "Coffee Packaging",
    slug: "custom-coffee-packaging",
    section: "industry",
    description: "Flat 20% Off on Your First Order + Free Shipping",
    is_active: true,
    product_count: 10,
  },
  {
    id: "cat-corrugated-boxes",
    name: "Corrugated Boxes",
    slug: "custom-corrugated-boxes",
    section: "material",
    description: "HOF Pack makes recyclable custom corrugated boxes sized to your exact product and printed with your brand.",
    is_active: true,
    product_count: 10,
  },
  {
    id: "cat-cosmetic-boxes",
    name: "Cosmetic Boxes",
    slug: "cosmetic-boxes",
    section: "industry",
    description: "Flat 20% Off on Your First Order + Free Shipping",
    is_active: true,
    product_count: 9,
  },
  {
    id: "cat-cigarette-boxes",
    name: "Custom Cigarette Boxes",
    slug: "custom-cigarette-boxes",
    section: "industry",
    description: "Flat 20% Off on Your First Order + Free Shipping",
    is_active: true,
    product_count: 5,
  },
  {
    id: "cat-food-boxes",
    name: "Custom Food Boxes",
    slug: "custom-food-boxes",
    section: "industry",
    description: "FDA-compliant food packaging for restaurants, catering, and food brands. From burger boxes to custom crepe packaging, we cover every cuisine.",
    is_active: false,
    product_count: 0,
  },
  {
    id: "cat-jewelry-boxes",
    name: "Custom Jewelry Boxes",
    slug: "custom-jewelry-boxes",
    section: "industry",
    description: "At HOF Pack, we build custom jewelry boxes that hold their shape, hold their shine, and hold a customer's attention long enough to turn a first order into a repeat one. Here's what that actually looks like.",
    is_active: true,
    product_count: 10,
  },
  {
    id: "cat-labels-stickers",
    name: "Custom Labels and Stickers",
    slug: "custom-labels-and-stickers",
    section: "style",
    description: "—",
    is_active: true,
    product_count: 7,
  },
  {
    id: "cat-mailer-boxes",
    name: "Custom Mailer Boxes",
    slug: "custom-mailer-boxes",
    section: "style",
    description: "Flat 20% Off on Your First Order + Free Shipping",
    is_active: true,
    product_count: 4,
  },
  {
    id: "cat-retail-boxes",
    name: "Custom Retail Boxes",
    slug: "custom-retail-boxes",
    section: "industry",
    description: "Flat 20% Off on Your First Order + Free Shipping",
    is_active: true,
    product_count: 9,
  },
  {
    id: "cat-wax-papers",
    name: "Custom Wax Papers",
    slug: "custom-wax-papers",
    section: "industry",
    description: "Premium, food-safe wax paper custom-printed with your logo to elevate your brand's packaging.",
    is_active: true,
    product_count: 10,
  },
  {
    id: "cat-display-boxes",
    name: "Display Boxes",
    slug: "custom-display-boxes",
    section: "style",
    description: "Flat 20% Off on Your First Order + Free Shipping",
    is_active: true,
    product_count: 4,
  },
  {
    id: "cat-gable-boxes",
    name: "Gable Boxes",
    slug: "gable-boxes",
    section: "style",
    description: "—",
    is_active: true,
    product_count: 8,
  },
  {
    id: "cat-kraft-boxes",
    name: "Kraft Boxes",
    slug: "kraft-boxes",
    section: "material",
    description: "Flat 20% Off on Your First Order + Free Shipping",
    is_active: true,
    product_count: 7,
  },
  {
    id: "cat-mylar-bags",
    name: "Mylar Bags",
    slug: "custom-mylar-bags",
    section: "material",
    description: "Flat 20% Off on Your First Order + Free Shipping",
    is_active: true,
    product_count: 12,
  },
  {
    id: "cat-pillow-boxes",
    name: "Pillow Boxes",
    slug: "custom-pillow-boxes",
    section: "style",
    description: "Flat 20% Off on Your First Order + Free Shipping",
    is_active: true,
    product_count: 4,
  },
  {
    id: "cat-pre-roll-boxes",
    name: "Pre Roll Boxes",
    slug: "pre-roll-boxes",
    section: "industry",
    description: "HOF Pack supplies top quality custom pre roll boxes, which are sturdy enough to hold singles, multipacks, or tubes.",
    is_active: true,
    product_count: 6,
  },
  {
    id: "cat-rigid-boxes",
    name: "Rigid Boxes",
    slug: "custom-rigid-boxes",
    section: "material",
    description: "Flat 20% Off on Your First Order + Free Shipping",
    is_active: true,
    product_count: 11,
  },
  {
    id: "cat-soap-boxes",
    name: "Soap Boxes",
    slug: "custom-soap-boxes",
    section: "industry",
    description: "Flat 20% Off on Your First Order + Free Shipping",
    is_active: true,
    product_count: 9,
  },
  {
    id: "cat-tube-packaging",
    name: "Tube Packaging",
    slug: "custom-tube-packaging",
    section: "style",
    description: "Flat 20% Off on Your First Order + Free Shipping",
    is_active: true,
    product_count: 3,
  },
  {
    id: "cat-tuck-boxes",
    name: "Tuck Boxes",
    slug: "custom-tuck-boxes",
    section: "style",
    description: "Flat 20% Off on Your First Order + Free Shipping",
    is_active: true,
    product_count: 3,
  },
];

export async function fetchAllAdminCategories(): Promise<CategoryDetailRecord[]> {
  const baseList = BASE_CATEGORIES;

  const dbCategoriesMap = new Map<string, CategoryDetailRecord>();
  let overrides: Record<string, Partial<CategoryDetailRecord>> = {};

  // 1. Try Supabase categories table
  try {
    const supabase = createPublicClient();
    const res = (await withAbortableTimeout((signal) =>
      (supabase
        .from("categories" as any)
        .select("*")
        .abortSignal(signal) as any)
    )) as any;

    if (!res?.error && Array.isArray(res?.data) && res.data.length > 0) {
      res.data.forEach((c: any) => {
        if (!c.slug) return;
        dbCategoriesMap.set(c.slug, {
          id: c.id || `cat-${c.slug}`,
          name: c.name,
          slug: c.slug,
          section: c.section || "industry",
          description: c.description || "",
          detail_description: c.detail_description || "",
          hero_headline_white: c.hero_headline_white || "",
          hero_headline_accent: c.hero_headline_accent || "",
          image: c.image_url || c.image || "",
          banner_image_url: c.banner_image_url || "",
          is_active: c.is_active !== false,
          product_count: Array.isArray(c.products) ? c.products.length : 0,
          created_at: c.created_at || new Date().toISOString(),
          updated_at: c.updated_at,
        });
      });
    }
  } catch {
    // Ignore
  }

  // 2. Try site_settings (takes precedence over raw DB categories)
  try {
    const supabase = createPublicClient();
    const [customRes, overridesRes] = await Promise.all([
      withAbortableTimeout((signal) =>
        (supabase
          .from("site_settings" as any)
          .select("value")
          .eq("key", SETTINGS_KEY)
          .abortSignal(signal)
          .maybeSingle() as any)
      ),
      withAbortableTimeout((signal) =>
        (supabase
          .from("site_settings" as any)
          .select("value")
          .eq("key", OVERRIDES_KEY)
          .abortSignal(signal)
          .maybeSingle() as any)
      ),
    ]);

    if (!customRes?.error && Array.isArray(customRes?.data?.value)) {
      const customList: CategoryDetailRecord[] = customRes.data.value;
      customList.forEach((c) => {
        if (c.slug) {
          dbCategoriesMap.set(c.slug, {
            ...(dbCategoriesMap.get(c.slug) || {}),
            ...c,
          });
        }
      });
    }

    if (!overridesRes?.error && overridesRes?.data?.value) {
      overrides = overridesRes.data.value;
    }
  } catch {
    // Ignore
  }

  // 3. LocalStorage (instant client-side sync)
  if (typeof window !== "undefined") {
    try {
      const localCustom = localStorage.getItem("hof_custom_categories_list");
      if (localCustom) {
        const localList: CategoryDetailRecord[] = JSON.parse(localCustom);
        localList.forEach((c) => {
          if (c.slug) {
            dbCategoriesMap.set(c.slug, {
              ...(dbCategoriesMap.get(c.slug) || {}),
              ...c,
            });
          }
        });
      }

      const localOverrides = localStorage.getItem("hof_category_status_overrides");
      if (localOverrides) {
        overrides = { ...overrides, ...JSON.parse(localOverrides) };
      }
    } catch {
      // Ignore
    }
  }

  const merged: CategoryDetailRecord[] = baseList.map((base) => {
    const custom = dbCategoriesMap.get(base.slug);
    const override = overrides[base.slug] || overrides[base.id];
    let res: CategoryDetailRecord = { ...base };
    if (custom) {
      res = {
        ...res,
        ...custom,
        name: custom.name || base.name,
        description: custom.description !== undefined && custom.description !== "" ? custom.description : base.description,
        product_count: custom.product_count !== undefined ? custom.product_count : base.product_count,
        section: custom.section || base.section,
        is_active: custom.is_active !== undefined ? custom.is_active : base.is_active,
      };
    }
    if (override) {
      res = { ...res, ...override };
    }
    return res;
  });

  // Add any custom categories created that are not in baseList
  const baseSlugs = new Set(baseList.map((b) => b.slug));
  dbCategoriesMap.forEach((c, slug) => {
    if (!baseSlugs.has(slug)) {
      const override = overrides[slug] || overrides[c.id];
      merged.push(override ? { ...c, ...override } : c);
    }
  });

  return merged;
}

export async function fetchCategoryBySlugOrId(
  slugOrId: string
): Promise<CategoryDetailRecord | null> {
  const all = await fetchAllAdminCategories();
  const clean = slugOrId.toLowerCase().trim();

  const match = all.find(
    (c) =>
      c.id.toLowerCase() === clean ||
      c.slug.toLowerCase() === clean ||
      c.slug.toLowerCase() === `custom-${clean}` ||
      c.slug.toLowerCase().replace(/^custom-/, "") === clean
  );

  if (match) return match;

  // Fallback to static category
  const staticCat = defaultCategories.find(
    (c) =>
      c.slug.toLowerCase() === clean ||
      c.slug.toLowerCase() === `custom-${clean}` ||
      c.slug.toLowerCase().replace(/^custom-/, "") === clean
  );

  if (staticCat) {
    return {
      id: `cat-${staticCat.slug}`,
      name: staticCat.name,
      slug: staticCat.slug,
      section: staticCat.section,
      description: staticCat.description,
      is_active: staticCat.slug !== "custom-food-boxes",
      product_count: staticCat.products?.length || 0,
      products: staticCat.products || [],
    };
  }

  return null;
}

export async function saveCategoryRecord(
  cat: Partial<CategoryDetailRecord> & { slug: string; name: string }
): Promise<void> {
  const now = new Date().toISOString();
  const record: CategoryDetailRecord = {
    id: cat.id || `cat-${cat.slug}`,
    name: cat.name,
    slug: cat.slug,
    section: cat.section || "industry",
    description: cat.description || "",
    detail_description: cat.detail_description || "",
    hero_headline_white: cat.hero_headline_white || "",
    hero_headline_accent: cat.hero_headline_accent || "",
    image: cat.image || "",
    banner_image_url: cat.banner_image_url || "",
    is_active: cat.is_active !== false,
    product_count: cat.product_count || 0,
    updated_at: now,
    created_at: cat.created_at || now,
  };

  // 1. Try Supabase categories table
  try {
    const supabase = createDataClient();
    await (supabase.from("categories" as any).upsert(record as any, { onConflict: "slug" }) as any);
  } catch {
    // Ignore
  }

  // 2. Persist in site_settings
  try {
    const supabase = createDataClient();
    const all = await fetchAllAdminCategories();
    const filtered = all.filter((c) => c.slug !== record.slug);
    const updated = [record, ...filtered];

    await (supabase
      .from("site_settings" as any)
      .upsert(
        { key: SETTINGS_KEY, value: updated, updated_at: now } as any,
        { onConflict: "key" }
      ) as any);

    // Also persist into OVERRIDES_KEY
    const overridesRes = (await withAbortableTimeout((signal) =>
      (supabase
        .from("site_settings" as any)
        .select("value")
        .eq("key", OVERRIDES_KEY)
        .abortSignal(signal)
        .maybeSingle() as any)
    )) as any;
    const currentOverrides = overridesRes?.data?.value || {};
    currentOverrides[record.slug] = {
      name: record.name,
      description: record.description,
      is_active: record.is_active,
      section: record.section,
      hero_headline_white: record.hero_headline_white,
      hero_headline_accent: record.hero_headline_accent,
      image: record.image,
      banner_image_url: record.banner_image_url,
      product_count: record.product_count,
    };
    await (supabase
      .from("site_settings" as any)
      .upsert(
        { key: OVERRIDES_KEY, value: currentOverrides, updated_at: now } as any,
        { onConflict: "key" }
      ) as any);
  } catch {
    // Ignore
  }

  // 3. LocalStorage
  if (typeof window !== "undefined") {
    try {
      const localStr = localStorage.getItem("hof_custom_categories_list");
      const currentList: CategoryDetailRecord[] = localStr ? JSON.parse(localStr) : [];
      const filtered = currentList.filter((c) => c.slug !== record.slug);
      localStorage.setItem("hof_custom_categories_list", JSON.stringify([record, ...filtered]));

      const localOverrides = localStorage.getItem("hof_category_status_overrides");
      const overridesMap = localOverrides ? JSON.parse(localOverrides) : {};
      overridesMap[record.slug] = {
        name: record.name,
        description: record.description,
        is_active: record.is_active,
        section: record.section,
        hero_headline_white: record.hero_headline_white,
        hero_headline_accent: record.hero_headline_accent,
        image: record.image,
        banner_image_url: record.banner_image_url,
        product_count: record.product_count,
      };
      localStorage.setItem("hof_category_status_overrides", JSON.stringify(overridesMap));
    } catch {
      // Ignore
    }
  }
}

export async function deleteCategoryRecord(slug: string): Promise<void> {
  // 1. Mark as hidden override
  try {
    const supabase = createDataClient();
    const res = (await withAbortableTimeout((signal) =>
      (supabase
        .from("site_settings" as any)
        .select("value")
        .eq("key", OVERRIDES_KEY)
        .abortSignal(signal)
        .maybeSingle() as any)
    )) as any;

    const currentOverrides = res?.data?.value || {};
    currentOverrides[slug] = { is_active: false };

    await (supabase
      .from("site_settings" as any)
      .upsert(
        { key: OVERRIDES_KEY, value: currentOverrides, updated_at: new Date().toISOString() } as any,
        { onConflict: "key" }
      ) as any);
  } catch {
    // Ignore
  }

  // 2. Delete from custom categories list
  try {
    const supabase = createDataClient();
    const all = await fetchAllAdminCategories();
    const filtered = all.filter((c) => c.slug !== slug);
    await (supabase
      .from("site_settings" as any)
      .upsert(
        { key: SETTINGS_KEY, value: filtered, updated_at: new Date().toISOString() } as any,
        { onConflict: "key" }
      ) as any);
  } catch {
    // Ignore
  }

  // 3. LocalStorage
  if (typeof window !== "undefined") {
    try {
      const localStr = localStorage.getItem("hof_custom_categories_list");
      if (localStr) {
        const list: CategoryDetailRecord[] = JSON.parse(localStr);
        localStorage.setItem("hof_custom_categories_list", JSON.stringify(list.filter((c) => c.slug !== slug)));
      }
    } catch {
      // Ignore
    }
  }
}
