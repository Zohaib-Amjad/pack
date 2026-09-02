import { createPublicClient } from "@/utils/supabase/public-client";
import { createDataClient } from "@/utils/supabase/data-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { getAllProducts, categories, isRemovedProductSlug, type Product } from "@/data/products";

const SETTINGS_KEY = "custom_products_list";
const STATUS_OVERRIDES_KEY = "product_status_overrides";

export interface CustomProductRecord extends Partial<Product> {
  id?: string;
  name: string;
  slug: string;
  category: string;
  is_active?: boolean;
  is_trending?: boolean;
  created_at?: string;
  updated_at?: string;
  image?: string;
  images?: string[];
  description?: string;
  specs?: any;
  faqs?: any[];
  category_id?: string;
}

export interface StatusOverrides {
  [slug: string]: {
    is_active?: boolean;
    is_trending?: boolean;
  };
}

export async function fetchAllProducts(): Promise<CustomProductRecord[]> {
  const defaultProducts: CustomProductRecord[] = getAllProducts().map((p: any, idx) => ({
    ...p,
    id: `prod-${p.slug}`,
    image: p.image || (p.images && p.images[0]) || "/images/products/custom-cake-boxes.jpg",
    images: p.images || [p.image || "/images/products/custom-cake-boxes.jpg"],
    is_active: true,
    is_trending: idx < 12,
    created_at: new Date(Date.now() - idx * 86400000).toISOString(),
    category_id: p.category,
  }));

  let dbProducts: CustomProductRecord[] = [];
  let overrides: StatusOverrides = {};

  // 1. Try fetching from Supabase products table
  try {
    const supabase = createPublicClient();
    const res = (await withAbortableTimeout((signal) =>
      (supabase
        .from("products" as any)
        .select("*")
        .abortSignal(signal) as any)
    )) as any;

    if (!res?.error && Array.isArray(res?.data) && res.data.length > 0) {
      dbProducts = res.data.map((item: any, idx: number) => ({
        id: item.id || `db-prod-${idx}`,
        name: item.name || "Custom Box",
        slug: item.slug,
        category: item.category || item.category_name || "Custom Boxes",
        category_id: item.category_id || item.category,
        description: item.description || "",
        image: item.image || item.cover_image || (item.images && item.images[0]) || "/images/products/custom-cake-boxes.jpg",
        images: Array.isArray(item.images) ? item.images : [item.image || "/images/products/custom-cake-boxes.jpg"],
        is_active: item.is_active !== false,
        is_trending: Boolean(item.is_trending),
        created_at: item.created_at || new Date().toISOString(),
        updated_at: item.updated_at,
        specs: item.specs || {},
        faqs: Array.isArray(item.faqs) ? item.faqs : [],
        product_content: item.product_content || undefined,
      }));
    }
  } catch {
    // Ignore table error
  }

  // 2. Fetch custom products & status overrides from site_settings
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
          .eq("key", STATUS_OVERRIDES_KEY)
          .abortSignal(signal)
          .maybeSingle() as any)
      ),
    ]);

    if (!customRes?.error && Array.isArray(customRes?.data?.value)) {
      const settingsProducts: CustomProductRecord[] = customRes.data.value;
      const existingSlugs = new Set(dbProducts.map((p) => p.slug));
      settingsProducts.forEach((p) => {
        if (!existingSlugs.has(p.slug)) {
          dbProducts.push(p);
        }
      });
    }

    if (!overridesRes?.error && overridesRes?.data?.value) {
      overrides = overridesRes.data.value;
    }
  } catch {
    // Ignore settings error
  }

  // 3. Merge browser localStorage
  if (typeof window !== "undefined") {
    try {
      const localCustom = localStorage.getItem("hof_custom_products_list");
      if (localCustom) {
        const localList: CustomProductRecord[] = JSON.parse(localCustom);
        const existingSlugs = new Set(dbProducts.map((p) => p.slug));
        localList.forEach((p) => {
          if (!existingSlugs.has(p.slug)) {
            dbProducts.push(p);
          }
        });
      }

      const localOverrides = localStorage.getItem("hof_product_status_overrides");
      if (localOverrides) {
        overrides = { ...overrides, ...JSON.parse(localOverrides) };
      }
    } catch {
      // Ignore localStorage error
    }
  }

  dbProducts.sort(
    (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
  );

  // Merge database products over default products
  const dbSlugs = new Set(dbProducts.map((p) => p.slug));
  const mergedList: CustomProductRecord[] = [
    ...dbProducts,
    ...defaultProducts.filter((p) => !dbSlugs.has(p.slug)),
  ];

  // Apply overrides
  return mergedList
    .filter((p) => !isRemovedProductSlug(p.slug))
    .map((p) => {
      const override = overrides[p.slug];
      if (!override) return p;
      return {
        ...p,
        is_active: override.is_active !== undefined ? override.is_active : p.is_active,
        is_trending: override.is_trending !== undefined ? override.is_trending : p.is_trending,
      };
    });
}

export async function saveProduct(product: CustomProductRecord): Promise<void> {
  // 1. Try table upsert
  try {
    const supabase = createDataClient();
    const payload = {
      id: product.id || (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `prod-${Date.now()}`),
      name: product.name,
      slug: product.slug,
      category: product.category,
      category_id: product.category_id || product.category,
      description: product.description,
      image: product.image || (product.images && product.images[0]) || "/images/products/custom-cake-boxes.jpg",
      images: product.images || [product.image || "/images/products/custom-cake-boxes.jpg"],
      is_active: product.is_active !== false,
      is_trending: Boolean(product.is_trending),
      specs: product.specs || {},
      faqs: product.faqs || [],
      updated_at: new Date().toISOString(),
      created_at: product.created_at || new Date().toISOString(),
    };
    await (supabase.from("products" as any).upsert(payload as any, { onConflict: "slug" }) as any);
  } catch {
    // Ignore
  }

  // 2. Persist in site_settings
  try {
    const supabase = createDataClient();
    const all = await fetchAllProducts();
    const filtered = all.filter((p) => p.slug !== product.slug);
    const updated = [product, ...filtered];

    await (supabase
      .from("site_settings" as any)
      .upsert(
        { key: SETTINGS_KEY, value: updated, updated_at: new Date().toISOString() } as any,
        { onConflict: "key" }
      ) as any);
  } catch {
    // Ignore
  }

  // 3. Persist in localStorage
  if (typeof window !== "undefined") {
    try {
      const localStr = localStorage.getItem("hof_custom_products_list");
      const currentList: CustomProductRecord[] = localStr ? JSON.parse(localStr) : [];
      const filtered = currentList.filter((p) => p.slug !== product.slug);
      localStorage.setItem("hof_custom_products_list", JSON.stringify([product, ...filtered]));
    } catch {
      // Ignore
    }
  }
}

export async function updateProductOverride(
  slug: string,
  updates: { is_active?: boolean; is_trending?: boolean }
): Promise<void> {
  // 1. Try table update
  try {
    const supabase = createDataClient();
    await (supabase.from("products" as any).update(updates as any).eq("slug", slug) as any);
  } catch {
    // Ignore
  }

  // 2. Persist overrides in site_settings
  try {
    const supabase = createDataClient();
    const res = (await withAbortableTimeout((signal) =>
      (supabase
        .from("site_settings" as any)
        .select("value")
        .eq("key", STATUS_OVERRIDES_KEY)
        .abortSignal(signal)
        .maybeSingle() as any)
    )) as any;

    const currentOverrides: StatusOverrides = res?.data?.value || {};
    currentOverrides[slug] = { ...currentOverrides[slug], ...updates };

    await (supabase
      .from("site_settings" as any)
      .upsert(
        { key: STATUS_OVERRIDES_KEY, value: currentOverrides, updated_at: new Date().toISOString() } as any,
        { onConflict: "key" }
      ) as any);
  } catch {
    // Ignore
  }

  // 3. LocalStorage
  if (typeof window !== "undefined") {
    try {
      const localStr = localStorage.getItem("hof_product_status_overrides");
      const currentOverrides: StatusOverrides = localStr ? JSON.parse(localStr) : {};
      currentOverrides[slug] = { ...currentOverrides[slug], ...updates };
      localStorage.setItem("hof_product_status_overrides", JSON.stringify(currentOverrides));
    } catch {
      // Ignore
    }
  }
}

export async function deleteProductRecord(slug: string): Promise<void> {
  // 1. Hide via override so it doesn't reappear from default seeds
  await updateProductOverride(slug, { is_active: false });

  // 2. Delete from products table
  try {
    const supabase = createDataClient();
    await (supabase.from("products" as any).delete().eq("slug", slug) as any);
  } catch {
    // Ignore
  }

  // 3. Delete from site_settings list
  try {
    const supabase = createDataClient();
    const all = await fetchAllProducts();
    const filtered = all.filter((p) => p.slug !== slug);
    await (supabase
      .from("site_settings" as any)
      .upsert(
        { key: SETTINGS_KEY, value: filtered, updated_at: new Date().toISOString() } as any,
        { onConflict: "key" }
      ) as any);
  } catch {
    // Ignore
  }

  // 4. LocalStorage
  if (typeof window !== "undefined") {
    try {
      const localStr = localStorage.getItem("hof_custom_products_list");
      if (localStr) {
        const list: CustomProductRecord[] = JSON.parse(localStr);
        localStorage.setItem("hof_custom_products_list", JSON.stringify(list.filter((p) => p.slug !== slug)));
      }
    } catch {
      // Ignore
    }
  }
}
