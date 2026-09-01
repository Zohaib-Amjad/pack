import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { getCategoryBySlug } from "@/data/products";
import { getCategoryDetailDefaults, COFFEE_RELATED_PRODUCTS, COSMETIC_RELATED_PRODUCTS, JEWELRY_RELATED_PRODUCTS, RETAIL_RELATED_PRODUCTS, WAX_PAPER_RELATED_PRODUCTS, SOAP_RELATED_PRODUCTS, CARDBOARD_RELATED_PRODUCTS, CORRUGATED_RELATED_PRODUCTS, KRAFT_RELATED_PRODUCTS, MYLAR_RELATED_PRODUCTS, RIGID_RELATED_PRODUCTS, STICKERS_RELATED_PRODUCTS, MAILER_RELATED_PRODUCTS, DISPLAY_RELATED_PRODUCTS, GABLE_RELATED_PRODUCTS, PILLOW_RELATED_PRODUCTS, TUBE_RELATED_PRODUCTS, TUCK_RELATED_PRODUCTS } from "@/data/category-defaults";
import { getCategoryFaqs, toPageFaqs } from "@/data/content-sheet-faqs";

export type CategoryPageData = {
  category: any;
  products: any[];
  faqs: any[];
  relatedProducts: any[];
};

const categoryBaseSelect =
  "id, name, slug, thank_you_slug, description, detail_description, section, image_url, banner_image_url, hero_headline_white, hero_headline_accent, category_content";

/** Map live/DB slugs → static catalog slugs when names drifted. */
const STATIC_SLUG_ALIASES: Record<string, string> = {
  "bakery-boxes": "custom-bakery-boxes",
  "cardboard-boxes": "custom-cardboard-boxes",
  "gable-boxes": "custom-gable-boxes",
  "cosmetic-boxes": "custom-cosmetic-boxes",
  "candle-boxes": "custom-candle-boxes",
  "coffee-packaging": "custom-coffee-packaging",
  "cigarette-boxes": "custom-cigarette-boxes",
  "jewelry-boxes": "custom-jewelry-boxes",
  "retail-boxes": "custom-retail-boxes",
  "wax-papers": "custom-wax-papers",
  "soap-boxes": "custom-soap-boxes",
  "corrugated-boxes": "custom-corrugated-boxes",
  "kraft-boxes": "custom-kraft-boxes",
  "mylar-bags": "custom-mylar-bags",
  "custom-mylar-boxes": "custom-mylar-bags",
  "rigid-boxes": "custom-rigid-boxes",
  "labels-and-stickers": "custom-labels-and-stickers",
  "custom-labels-stickers": "custom-labels-and-stickers",
  "mailer-boxes": "custom-mailer-boxes",
  "display-boxes": "custom-display-boxes",
  "pillow-boxes": "custom-pillow-boxes",
  "tube-packaging": "custom-tube-packaging",
  "tuck-boxes": "custom-tuck-boxes",
};

function overlayCategoryFaqs(slug: string, faqs: any[]) {
  if (Array.isArray(faqs) && faqs.length > 0) {
    return faqs;
  }
  return toPageFaqs(slug, getCategoryFaqs(slug)) || faqs;
}

const RELATED_PRODUCTS_LIMIT = 12;

/** Tube/cylinder products miscategorized under Rigid Boxes in CMS. */
function isCylinderPackagingProduct(product: { slug?: string; name?: string }) {
  const slug = (product.slug ?? "").toLowerCase();
  const name = (product.name ?? "").toLowerCase();
  return slug.includes("cylinder") || name.includes("cylinder");
}

function filterRigidBoxesProducts<T extends { slug?: string; name?: string }>(
  products: T[]
): T[] {
  return products.filter((p) => !isCylinderPackagingProduct(p));
}

export function staticCategoryFallback(categorySlug: string): CategoryPageData | null {
  if (!categorySlug) return null;
  const resolvedSlug = STATIC_SLUG_ALIASES[categorySlug] || categorySlug;
  const staticCat = getCategoryBySlug(resolvedSlug) || getCategoryBySlug(categorySlug);
  if (!staticCat) return null;

  const defaults = getCategoryDetailDefaults(staticCat.slug, staticCat.name, staticCat.section);

  // Check client-side overrides if available
  let customOverrides: any = null;
  if (typeof window !== "undefined") {
    try {
      const localOverrides = localStorage.getItem("hof_category_status_overrides");
      if (localOverrides) {
        const map = JSON.parse(localOverrides);
        customOverrides = map[categorySlug] || map[resolvedSlug] || map[staticCat.slug];
      }
    } catch {
      // ignore
    }
  }

  if (customOverrides?.is_active === false) {
    return null;
  }

  const staticProducts = (staticCat.products || []).map((p) => ({
    id: `static-${p.slug}`,
    name: p.name,
    slug: p.slug,
    images: (p as any).image ? [(p as any).image] : ["/images/products/69242008-f271-4264-95f3-651f28529196.jpg"],
    category_id: `static-${staticCat.slug}`,
  }));

  const relatedSource =
    staticCat.slug === "custom-cosmetic-boxes" || staticCat.slug === "cosmetic-boxes"
      ? COSMETIC_RELATED_PRODUCTS
      : staticCat.slug === "custom-jewelry-boxes" || staticCat.slug === "jewelry-boxes"
        ? JEWELRY_RELATED_PRODUCTS
        : staticCat.slug === "custom-retail-boxes" || staticCat.slug === "retail-boxes"
          ? RETAIL_RELATED_PRODUCTS
          : staticCat.slug === "custom-wax-papers" || staticCat.slug === "wax-papers"
            ? WAX_PAPER_RELATED_PRODUCTS
            : staticCat.slug === "custom-soap-boxes" || staticCat.slug === "soap-boxes"
              ? SOAP_RELATED_PRODUCTS
              : staticCat.slug === "custom-cardboard-boxes" || staticCat.slug === "cardboard-boxes"
                ? CARDBOARD_RELATED_PRODUCTS
                : staticCat.slug === "custom-corrugated-boxes" || staticCat.slug === "corrugated-boxes"
                  ? CORRUGATED_RELATED_PRODUCTS
                  : staticCat.slug === "custom-kraft-boxes" || staticCat.slug === "kraft-boxes"
                    ? KRAFT_RELATED_PRODUCTS
                    : staticCat.slug === "custom-mylar-bags" || staticCat.slug === "mylar-bags" || staticCat.slug === "custom-mylar-boxes"
                      ? MYLAR_RELATED_PRODUCTS
                      : staticCat.slug === "custom-rigid-boxes" || staticCat.slug === "rigid-boxes"
                        ? RIGID_RELATED_PRODUCTS
                        : staticCat.slug === "custom-labels-and-stickers" || staticCat.slug === "labels-and-stickers"
                          ? STICKERS_RELATED_PRODUCTS
                          : staticCat.slug === "custom-mailer-boxes" || staticCat.slug === "mailer-boxes"
                            ? MAILER_RELATED_PRODUCTS
                            : staticCat.slug === "custom-display-boxes" || staticCat.slug === "display-boxes"
                              ? DISPLAY_RELATED_PRODUCTS
                              : staticCat.slug === "custom-gable-boxes" || staticCat.slug === "gable-boxes"
                                ? GABLE_RELATED_PRODUCTS
                                : staticCat.slug === "custom-pillow-boxes" || staticCat.slug === "pillow-boxes"
                                  ? PILLOW_RELATED_PRODUCTS
                                  : staticCat.slug === "custom-tube-packaging" || staticCat.slug === "tube-packaging"
                                    ? TUBE_RELATED_PRODUCTS
                                    : staticCat.slug === "custom-tuck-boxes" || staticCat.slug === "tuck-boxes"
                                      ? TUCK_RELATED_PRODUCTS
                                      : COFFEE_RELATED_PRODUCTS;

  const relatedProducts = relatedSource.map((p) => ({
    id: `related-${p.slug}`,
    name: p.name,
    slug: p.slug,
    images: p.images,
  }));

  return {
    category: {
      id: defaults.id,
      name: customOverrides?.name || defaults.name,
      slug: categorySlug, // Matches the route slug requested
      canonical_slug: defaults.slug,
      description: customOverrides?.description || defaults.description,
      detail_description: null,
      section: customOverrides?.section || defaults.section,
      image_url: customOverrides?.image || defaults.image_url,
      banner_image_url: customOverrides?.banner_image_url || defaults.banner_image_url,
      hero_headline_white: customOverrides?.hero_headline_white || defaults.hero_headline_white,
      hero_headline_accent: customOverrides?.hero_headline_accent || defaults.hero_headline_accent,
      category_content: defaults.category_content,
      related_product_ids: [],
    },
    products:
      staticCat.slug === "custom-rigid-boxes"
        ? filterRigidBoxesProducts(staticProducts)
        : staticProducts,
    faqs: overlayCategoryFaqs(staticCat.slug, defaults.faqs),
    relatedProducts,
  };
}

/**
 * Shared category page loader (server + browser).
 * Secondary query failures degrade gracefully instead of 404-ing the page.
 */
export async function fetchCategoryPageData(
  categorySlug: string
): Promise<CategoryPageData | null> {
  if (!categorySlug) return null;

  try {
    const supabase = createPublicClient();
    const resolvedSlug = STATIC_SLUG_ALIASES[categorySlug] || categorySlug;

    // Try finding by categorySlug or resolvedSlug
    let catDataRes = await withAbortableTimeout(
      (signal) =>
        (supabase
          .from("categories" as any)
          .select(`${categoryBaseSelect}, related_product_ids`)
          .eq("slug", categorySlug)
          .eq("is_active", true)
          .single() as any).abortSignal(signal),
      3_000
    );

    if (catDataRes.error && resolvedSlug !== categorySlug) {
      catDataRes = await withAbortableTimeout(
        (signal) =>
          (supabase
            .from("categories" as any)
            .select(`${categoryBaseSelect}, related_product_ids`)
            .eq("slug", resolvedSlug)
            .eq("is_active", true)
            .single() as any).abortSignal(signal),
        3_000
      );
    }

    let catData = catDataRes.data;
    let catError = catDataRes.error;

    const missingRelatedColumn =
      !!catError &&
      typeof catError.message === "string" &&
      catError.message.includes("related_product_ids");

    if (missingRelatedColumn) {
      const fallbackCategoryRes = await withAbortableTimeout(
        (signal) =>
          (supabase
            .from("categories" as any)
            .select(categoryBaseSelect)
            .eq("slug", categorySlug)
            .eq("is_active", true)
            .single() as any).abortSignal(signal),
        3_000
      );

      catData = fallbackCategoryRes.data
        ? { ...fallbackCategoryRes.data, related_product_ids: [] }
        : null;
      catError = fallbackCategoryRes.error;
    }

    if (catError || !catData) {
      return staticCategoryFallback(categorySlug);
    }

    const manualRelatedIds: string[] = Array.isArray(catData.related_product_ids)
      ? catData.related_product_ids.filter(Boolean)
      : [];

    const isRigidBoxesPage = categorySlug === "custom-rigid-boxes" || resolvedSlug === "custom-rigid-boxes";

    const [prodRes, faqRes, relatedRes] = await withAbortableTimeout(
      (signal) =>
        Promise.all([
          (supabase
            .from("products" as any)
            .select("id, name, slug, images, category_id")
            .eq("category_id", catData.id)
            .eq("is_active", true)
            .abortSignal(signal) as any),
          (supabase
            .from("faqs" as any)
            .select("id, question, answer, display_order")
            .eq("category_id", catData.id)
            .eq("is_published", true)
            .order("display_order", { ascending: true })
            .abortSignal(signal) as any),
          manualRelatedIds.length > 0
            ? (supabase
              .from("products" as any)
              .select("id, name, slug, images, category_id")
              .in("id", manualRelatedIds)
              .eq("is_active", true)
              .abortSignal(signal) as any)
            : isRigidBoxesPage
              ? (supabase
                .from("products" as any)
                .select("id, name, slug, images, category_id")
                .eq("category_id", catData.id)
                .eq("is_active", true)
                .order("created_at", { ascending: false })
                .limit(RELATED_PRODUCTS_LIMIT)
                .abortSignal(signal) as any)
              : (supabase
                .from("products" as any)
                .select("id, name, slug, images, category_id")
                .neq("category_id", catData.id)
                .eq("is_active", true)
                .order("created_at", { ascending: false })
                .limit(RELATED_PRODUCTS_LIMIT)
                .abortSignal(signal) as any),
        ]),
      3_000
    );

    const prodData = prodRes.error ? [] : prodRes.data || [];
    const faqData = faqRes.error ? [] : faqRes.data || [];
    let relatedProducts: any[] = relatedRes.error ? [] : relatedRes.data || [];

    // If no products found in Supabase for this category, populate from static catalog
    let finalProducts = prodData;
    if (finalProducts.length === 0) {
      const staticCat = getCategoryBySlug(categorySlug) || getCategoryBySlug(resolvedSlug);
      if (staticCat && staticCat.products) {
        finalProducts = staticCat.products.map((p) => ({
          id: `static-${p.slug}`,
          name: p.name,
          slug: p.slug,
          images: (p as any).image ? [(p as any).image] : ["/images/products/69242008-f271-4264-95f3-651f28529196.jpg"],
          category_id: catData.id,
        }));
      }
    }

    // Preserve admin-selected related order when manual IDs are set.
    if (manualRelatedIds.length > 0 && relatedProducts.length > 0) {
      const byId = new Map(relatedProducts.map((p: any) => [p.id, p]));
      relatedProducts = manualRelatedIds.map((id) => byId.get(id)).filter(Boolean);
    }

    if (relatedProducts.length === 0) {
      relatedProducts = COFFEE_RELATED_PRODUCTS.map((p) => ({
        id: `related-${p.slug}`,
        name: p.name,
        slug: p.slug,
        images: p.images,
      }));
    }

    if (isRigidBoxesPage) {
      relatedProducts = filterRigidBoxesProducts(relatedProducts)
        .filter((p) => p.category_id === catData.id)
        .slice(0, RELATED_PRODUCTS_LIMIT);
    }

    const products = isRigidBoxesPage
      ? filterRigidBoxesProducts(finalProducts)
      : finalProducts;

    const defaults = getCategoryDetailDefaults(resolvedSlug, catData.name, catData.section);
    const mergedCategoryContent = catData.category_content && Object.keys(catData.category_content).length > 0
      ? catData.category_content
      : defaults.category_content;

    return {
      category: {
        ...catData,
        slug: categorySlug,
        hero_headline_white: catData.hero_headline_white || defaults.hero_headline_white,
        hero_headline_accent: catData.hero_headline_accent || defaults.hero_headline_accent,
        description: catData.description || defaults.description,
        banner_image_url: catData.banner_image_url || defaults.banner_image_url,
        image_url: catData.image_url || defaults.image_url,
        category_content: mergedCategoryContent,
      },
      products,
      faqs: overlayCategoryFaqs(resolvedSlug, faqData.length > 0 ? faqData : defaults.faqs),
      relatedProducts,
    };
  } catch {
    return staticCategoryFallback(categorySlug);
  }
}
