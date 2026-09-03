import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageView from "@/views/ProductPage";
import { getProductBySlug, isRemovedProductSlug } from "@/data/products";
import { FULL_PRODUCTS_DATABASE } from "@/data/product-detail-defaults";
import { getProductMetaDescription, getProductMetaTitle } from "@/data/content-sheet-meta-titles";
import { shouldShowAddToCart } from "@/lib/google-shopping";

interface PageProps {
  params: Promise<{ productSlug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * Product pages must see `?utm_source=google&utm_medium=cpc` (and gclid) at
 * request time. Static HTML from generateStaticParams is cached on Vercel as
 * `/product/[slug]` and reused for every query string, so the Google cart UI
 * never appears in production even though localhost (always dynamic) works.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productSlug } = await params;
  if (isRemovedProductSlug(productSlug)) {
    notFound();
  }
  const found = getProductBySlug(productSlug);
  const title =
    getProductMetaTitle(productSlug) ||
    (found?.product.name ? `${found.product.name} | HOF Pack` : "Custom Packaging | HOF Pack");
  const description =
    getProductMetaDescription(productSlug) ||
    FULL_PRODUCTS_DATABASE[productSlug]?.meta_description?.trim() ||
    undefined;

  return {
    title: { absolute: title },
    ...(description ? { description } : {}),
    openGraph: {
      title,
      ...(description ? { description } : {}),
    },
  };
}

export default async function ProductDetailPage({ params, searchParams }: PageProps) {
  const { productSlug } = await params;
  const query = await searchParams;
  if (isRemovedProductSlug(productSlug)) {
    notFound();
  }
  return (
    <ProductPageView
      productSlug={productSlug}
      initialShowGoogleCart={shouldShowAddToCart(query)}
    />
  );
}
