"use client";

import { useQuery } from "@tanstack/react-query";
import RelatedProductsCarouselSection from "@/components/RelatedProductsCarouselSection";
import { useCmsHome } from "@/hooks/useCms";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { createPublicClient } from "@/utils/supabase/public-client";

type HomeProduct = {
  id: string;
  slug: string;
  name: string;
  images?: string[] | null;
  categories?: { slug?: string | null } | Array<{ slug?: string | null }> | null;
};

const DEFAULT_MORE_PRODUCTS: HomeProduct[] = [
  {
    id: "more-1",
    name: "Earring Boxes",
    slug: "custom-earring-boxes",
    images: ["/images/products/b22145e1-7afc-43d0-b1ea-3784de7eed89.jpg"],
  },
  {
    id: "more-2",
    name: "Ring Boxes",
    slug: "custom-ring-boxes",
    images: ["/images/products/f0ddde8c-bd56-43f0-885a-d38af8d8ab20.jpg"],
  },
  {
    id: "more-3",
    name: "Bracelet Boxes",
    slug: "bracelet-boxes",
    images: ["/images/products/cd3ece7f-1ed3-4792-a653-62272522b3ce.jpg"],
  },
  {
    id: "more-4",
    name: "Pendant Boxes ",
    slug: "pendant-boxes",
    images: ["/images/products/6a1e2f5b-075a-4299-947e-dcc4f8c2a51b.jpg"],
  },
  {
    id: "more-5",
    name: "Pandasew Packaging",
    slug: "custom-pandasew-packaging",
    images: ["/images/products/2bb393fe-5154-4cf2-9633-6ef1430013fb.jpg"],
  },
  {
    id: "more-6",
    name: "Kraft Bulk Jewelry Boxes",
    slug: "kraft-bulk-jewelry-boxes",
    images: ["/images/products/6ffcc479-5327-4a7a-baca-2135b9bfb47c.jpg"],
  },
  {
    id: "more-7",
    name: "Anklet Boxes",
    slug: "custom-anklet-boxes",
    images: ["/images/products/de8efc4c-3f4c-4047-804f-4306c163a956.jpg"],
  },
  {
    id: "more-8",
    name: "Bangle Boxes",
    slug: "custom-bangle-boxes",
    images: ["/images/products/845f7796-6e0e-4b96-98c4-358177dcda7c.jpg"],
  },
  {
    id: "more-9",
    name: "Corrugated Cake Boxes",
    slug: "corrugated-cake-boxes",
    images: ["/images/products/902f7e5a-7b03-4970-90a2-aed810617baa.jpg"],
  },
  {
    id: "more-10",
    name: "White Corrugated Boxes ",
    slug: "white-corrugated-boxes",
    images: ["/images/products/acee933d-82ef-4306-a1a3-808a17017e19.jpg"],
  },
  {
    id: "more-11",
    name: "Corrugated Tuck Top Boxes",
    slug: "corrugated-tuck-top-boxes",
    images: ["/images/products/08639f51-77df-47b9-8b3e-de74625cb319.jpg"],
  },
  {
    id: "more-12",
    name: "Screen Printing Boxes",
    slug: "screen-printing-boxes",
    images: ["/images/products/9d53ae8e-d0c5-4e9d-aa06-eff0cfa89235.jpg"],
  },
];

export default function HomeMoreProducts() {
  const { data: cms } = useCmsHome();
  const section = cms?.moreProducts;
  const selectedIds = section?.selectedProductIds || [];
  const limit = Math.max(1, Math.min(24, section?.limit ?? 12));

  const { data: products = DEFAULT_MORE_PRODUCTS } = useQuery({
    queryKey: ["public", "home-more-products", selectedIds, limit],
    initialData: DEFAULT_MORE_PRODUCTS,
    queryFn: async () => {
      try {
        const supabase = createPublicClient();
        if (selectedIds.length > 0) {
          const { data, error } = (await withAbortableTimeout(
            (signal) =>
              supabase
                .from("products" as any)
                .select("id, name, slug, images, categories(id, name, slug)")
                .in("id", selectedIds)
                .eq("is_active", true)
                .abortSignal(signal) as any,
          )) as any;

          if (!error && data && data.length > 0) {
            const byId = new Map((data || []).map((product: HomeProduct) => [product.id, product]));
            const mapped = selectedIds
              .map((id) => byId.get(id))
              .filter(Boolean)
              .slice(0, limit) as HomeProduct[];
            if (mapped.length > 0) return mapped;
          }
        }

        const { data: fallback, error: fallbackError } = (await withAbortableTimeout(
          (signal) =>
            supabase
              .from("products" as any)
              .select("id, name, slug, images, categories(id, name, slug)")
              .eq("is_active", true)
              .order("created_at", { ascending: false })
              .limit(limit)
              .abortSignal(signal) as any,
        )) as any;

        if (!fallbackError && fallback && fallback.length > 0) {
          return fallback as HomeProduct[];
        }
      } catch {
        // use DEFAULT_MORE_PRODUCTS
      }
      return DEFAULT_MORE_PRODUCTS;
    },
  });

  return (
    <RelatedProductsCarouselSection
      title={section?.title || "More Products"}
      description={section?.description || undefined}
      products={products}
      getProductImage={(product) => {
        if (Array.isArray(product.images) && product.images[0]) {
          return product.images[0];
        }
        return undefined;
      }}
    />
  );
}