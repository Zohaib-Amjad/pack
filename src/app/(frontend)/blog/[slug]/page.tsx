import React from "react";
import BlogDetailView from "@/views/BlogDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "types-of-custom-boxes" },
    { slug: "eco-friendly-packaging-customer-loyalty" },
    { slug: "anatomy-of-unboxing-experience" },
  ];
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  return <BlogDetailView slug={slug} />;
}
