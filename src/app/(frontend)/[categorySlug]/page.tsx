import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPageView from "@/views/CategoryPage";
import { fetchCategoryPageData } from "@/lib/category-page-data";
import { categories, getCategoryBySlug } from "@/data/products";

interface PageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateStaticParams() {
  const slugs = new Set<string>();
  for (const cat of categories) {
    slugs.add(cat.slug);
    if (cat.slug.startsWith("custom-")) {
      slugs.add(cat.slug.replace(/^custom-/, ""));
    } else {
      slugs.add(`custom-${cat.slug}`);
    }
  }

  // Common aliases
  const aliases = [
    "bakery-boxes",
    "cardboard-boxes",
    "gable-boxes",
    "cosmetic-boxes",
    "candle-boxes",
    "coffee-packaging",
    "cigarette-boxes",
    "jewelry-boxes",
    "retail-boxes",
    "wax-papers",
    "soap-boxes",
    "corrugated-boxes",
    "kraft-boxes",
    "mylar-bags",
    "rigid-boxes",
    "labels-and-stickers",
    "mailer-boxes",
    "display-boxes",
    "pillow-boxes",
    "tube-packaging",
    "tuck-boxes",
    "pre-roll-boxes",
    "custom-pre-roll-boxes",
  ];
  for (const a of aliases) slugs.add(a);

  return Array.from(slugs).map((slug) => ({
    categorySlug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const initialData = await fetchCategoryPageData(categorySlug);
  const cat = initialData?.category || getCategoryBySlug(categorySlug);

  if (!cat) {
    return {
      title: "Custom Packaging Boxes | HOF Pack",
    };
  }

  const title = `${cat.name} | Custom Printed Packaging Boxes | HOF Pack`;
  const description =
    cat.description ||
    `Order high-quality custom ${cat.name.toLowerCase()} with low MOQ, wholesale pricing, free design support, and free shipping across the USA.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: cat.image_url ? [{ url: cat.image_url }] : undefined,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { categorySlug } = await params;
  const initialData = await fetchCategoryPageData(categorySlug);

  if (!initialData) {
    notFound();
  }

  return <CategoryPageView categorySlug={categorySlug} initialData={initialData} />;
}
