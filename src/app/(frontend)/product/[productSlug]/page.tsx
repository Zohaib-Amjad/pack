import React from "react";
import ProductPageView from "@/views/ProductPage";
import { getAllProducts } from "@/data/products";

interface PageProps {
  params: Promise<{ productSlug: string }>;
}

export async function generateStaticParams() {
  const allProds = getAllProducts();
  return allProds.slice(0, 20).map((prod) => ({
    productSlug: prod.slug,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { productSlug } = await params;
  return <ProductPageView productSlug={productSlug} />;
}
