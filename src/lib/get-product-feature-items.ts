import { createPublicClient } from "@/utils/supabase/public-client";
import type { FeatureItem, ProductContent, ProductFeatureItemsResult } from "@/types/product-content";

/**
 * Reads feature_items from the same Supabase DB as Hof Pack.
 * Column: products.product_content.feature_items (JSON array, per slug)
 */
export async function getProductFeatureItems(
  slug: string,
): Promise<ProductFeatureItemsResult | null> {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("products" as any)
    .select("slug, name, product_content")
    .eq("slug", rawNormalizeSlug(slug))
    .eq("is_active", true)
    .maybeSingle() as any;

  if (error) throw error;
  if (!data) return null;

  const pc = (data.product_content ?? {}) as ProductContent;
  const featureItems = Array.isArray(pc.feature_items)
    ? pc.feature_items.filter(
        (item): item is FeatureItem =>
          Boolean(item?.title && item?.description),
      )
    : [];

  return {
    slug: data.slug,
    name: data.name,
    featureItems,
  };
}

function rawNormalizeSlug(slug: string): string {
  return slug ? slug.trim().toLowerCase() : "";
}
