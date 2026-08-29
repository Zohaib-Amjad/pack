"use client";

import React, { useMemo, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import RelatedProductsCarouselSection from "@/components/RelatedProductsCarouselSection";
import { useCmsHome } from "@/hooks/useCms";
import { getAllProducts } from "@/data/products";
import { fetchAllProducts } from "@/lib/product-service";
import type { CmsHome } from "@/types/cms";

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

type HomeMoreProductsProps = {
  cms?: CmsHome;
};

export default function HomeMoreProducts({ cms }: HomeMoreProductsProps) {
  const queryClient = useQueryClient();
  const { data: cmsData } = useCmsHome();
  const section = cmsData?.moreProducts || cms?.moreProducts;

  const staticCatalog = useMemo(() => getAllProducts(), []);

  const { data: allCatalogProducts = staticCatalog } = useQuery({
    queryKey: ["all-products-for-more-slider"],
    queryFn: async () => {
      try {
        const full = await fetchAllProducts();
        if (full && full.length > 0) return full;
      } catch {
        // fallback
      }
      return staticCatalog;
    },
    initialData: staticCatalog,
    staleTime: 10_000,
  });

  // Listen for admin storage events to re-render in real-time
  useEffect(() => {
    const handleSync = () => {
      queryClient.invalidateQueries({ queryKey: ["public", "cms", "cms_home"] });
      queryClient.invalidateQueries({ queryKey: ["all-products-for-more-slider"] });
    };
    window.addEventListener("storage", handleSync);
    window.addEventListener("focus", handleSync);
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("focus", handleSync);
    };
  }, [queryClient]);

  if (section?.enabled === false) return null;

  const selectedIds = section?.selectedProductIds || [];
  const limit = Math.max(1, Math.min(40, section?.limit ?? (selectedIds.length > 0 ? selectedIds.length : 12)));

  // Match and preserve the exact order of products chosen in the admin
  const products: HomeProduct[] = useMemo(() => {
    if (selectedIds.length > 0) {
      const list: HomeProduct[] = [];
      const used = new Set<string>();

      selectedIds.forEach((query) => {
        const q = String(query || "").toLowerCase().trim();
        if (!q) return;

        const found = allCatalogProducts.find(
          (p: any) =>
            (p.name && p.name.toLowerCase().trim() === q) ||
            (p.slug && p.slug.toLowerCase().trim() === q) ||
            (p.id && String(p.id).toLowerCase().trim() === q) ||
            (p.name && p.name.toLowerCase().trim().includes(q)) ||
            (p.slug && p.slug.toLowerCase().trim().includes(q.replace(/\s+/g, "-")))
        );

        if (found) {
          const key = found.slug || found.name;
          if (!used.has(key)) {
            used.add(key);
            list.push({
              id: (found as any).id || found.slug || found.name,
              name: found.name,
              slug: found.slug,
              images: (found as any).image ? [(found as any).image] : (found as any).images || ["/images/products/custom-cake-boxes.jpg"],
            });
          }
        } else {
          // If not in catalog yet, add as custom item so it is NEVER omitted from the UI
          const slug = q.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          if (!used.has(slug)) {
            used.add(slug);
            list.push({
              id: `sel-${slug}`,
              name: query,
              slug: slug,
              images: ["/images/products/custom-cake-boxes.jpg"],
            });
          }
        }
      });

      return list.slice(0, limit);
    }

    // Default list if nothing selected
    return DEFAULT_MORE_PRODUCTS.slice(0, limit);
  }, [allCatalogProducts, selectedIds, limit]);

  if (products.length === 0) return null;

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