import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageView from "@/views/ProductPage";
import { getAllProducts, getProductBySlug, isRemovedProductSlug } from "@/data/products";
import { FULL_PRODUCTS_DATABASE } from "@/data/product-detail-defaults";
import { getProductMetaDescription, getProductMetaTitle } from "@/data/content-sheet-meta-titles";

interface PageProps {
  params: Promise<{ productSlug: string }>;
}

export async function generateStaticParams() {
  const allProds = getAllProducts();
  return allProds.slice(0, 20).map((prod) => ({
    productSlug: prod.slug,
  }));
}

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

export default async function ProductDetailPage({ params }: PageProps) {
  const { productSlug } = await params;
  if (isRemovedProductSlug(productSlug)) {
    notFound();
  }
  return <ProductPageView productSlug={productSlug} />;
}
