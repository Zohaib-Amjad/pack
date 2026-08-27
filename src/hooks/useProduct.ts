import { useQuery } from "@tanstack/react-query";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";

export interface ProductData {
  product: any;
  faqs: any[];
  relatedProducts: any[];
}

export function useProductDetail(productSlug: string) {
  const supabase = createPublicClient();

  return useQuery({
    queryKey: ["public", "product-detail", productSlug],
    queryFn: async () => {
      if (!productSlug) return null;

      // Fetch main product (includes FAQs via join)
      const { data: product, error: productError } = await withAbortableTimeout((signal) =>
        ((supabase
          .from("products" as any)
          .select(`
            *,
            related_product_ids,
            categories (id, name, slug),
            faqs (id, question, answer, display_order)
          `)
          .eq("slug", productSlug)
          .eq("is_active", true)
          .eq("faqs.is_published", true)
          .maybeSingle() as any)
          .abortSignal(signal))
      ) as any;

      if (productError) throw productError;
      if (!product) return null;

      const relatedIds: string[] = Array.isArray(product.related_product_ids)
        ? product.related_product_ids.filter(Boolean)
        : [];

      // Fetch related products in parallel — don't block on empty list
      const relatedProducts: any[] = await (async () => {
        if (relatedIds.length === 0) return [];
        const { data: relatedData, error: relatedError } = await withAbortableTimeout((signal) =>
          ((supabase
            .from("products" as any)
            .select("id, name, slug, images, categories (id, name, slug)")
            .in("id", relatedIds)
            .eq("is_active", true) as any)
            .abortSignal(signal))
        ) as any;
        if (relatedError) {
          console.warn("Error fetching related products:", relatedError);
          return [];
        }
        // Preserve manual ordering from related_product_ids
        const byId = new Map((relatedData || []).map((p: any) => [p.id, p]));
        return relatedIds.map((id) => byId.get(id)).filter(Boolean);
      })();

      return { product, faqs: product.faqs || [], relatedProducts };
    },
    enabled: !!productSlug,
    staleTime: 5 * 60 * 1000,
  });
}
