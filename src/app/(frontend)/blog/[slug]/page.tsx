import React from "react";
import type { Metadata } from "next";
import BlogDetailView from "@/views/BlogDetail";
import { DEFAULT_BLOG_POSTS } from "@/data/blog-defaults";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BLOG_POST_META: Record<string, { title: string; description: string }> = {
  "wax-paper-vs-butter-paper": {
    title: "Wax Paper vs Butter Paper: Which One to Use When | HOF Pack | HofPack",
    description:
      "Confused by wax paper vs butter paper? Here's the real difference, which is oven-safe, and when to use each for baking, wrapping, and branded food packaging.",
  },
  "milk-carton-dimensions": {
    title: "How to Measure Milk Carton Dimensions: Step By Step Guide | HofPack",
    description:
      "Learn how to measure milk carton dimensions accurately with this step-by-step guide. Discover carton length, width, height, and sizing tips for packaging.",
  },
  "jewelry-packaging-ideas": {
    title: "Aesthetic Jewelry Packaging Ideas | Fast Shipping To USA | HofPack",
    description:
      "Get to know the most affordable jewelry packaging ideas for small businesses and aesthetic branding ideas for luxury jewelry brands to elevate your brand.",
  },
  "how-to-measure-shoe-box-dimensions": {
    title: "Shoe Box Dimensions Guide | Standard Shoe Box Sizes & Measuring Tips | HofPack",
    description:
      "Learn how to measure shoe box dimensions correctly. Discover standard shoe box sizes in inches and cm, shipping tips, and how to choose the right custom shoe box.",
  },
  "food-packaging-solutions-for-brands": {
    title: "Food Packaging Guide: Boxes, Pouches, Bags & Labels | HofPack",
    description:
      "Looking for the perfect food packaging? Compare custom boxes, pouches, bags & labels to find what fits your brand's needs and budget best. complete guide",
  },
  "custom-mailers-vs-poly-mailers-vs-bubble-mailers": {
    title: "Custom Mailers vs Poly Mailers vs Bubble Mailers: Which Is Best? | HofPack",
    description:
      "Explore the differences between custom poly mailers, bubble mailers, and paper mailers. Learn the best packaging option for different retail & e-commerce goods.",
  },
  "custom-flexible-packaging-bag-guide": {
    title:
      "Guide to Flexible Packaging: How to Choose the Right Custom Bag for Your Brand? | HofPack",
    description:
      "Choose the right custom stand up pouch or packaging bag for your brand with an ultimate guide to all flexible packaging types.",
  },
  "types-of-custom-boxes": {
    title: "Custom Boxes USA | Mailer Boxes, Folding Cartons & Packaging Guide | HofPack",
    description:
      "Learn everything about custom boxes in the USA, including mailer boxes, shipping boxes, folding cartons, rigid boxes, display packaging, and printing options.",
  },
  "secondary-packaging-explained": {
    title: "Secondary Packaging Explained: Types, Materials & Branding Guide | HofPack",
    description:
      "Learn everything about custom secondary packaging, including packaging types, materials, printing methods, sustainability, costs, and how businesses choose the right packaging solutions.",
  },
};

export async function generateStaticParams() {
  return Object.keys(DEFAULT_BLOG_POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dedicated = BLOG_POST_META[slug];
  if (dedicated) {
    return {
      title: { absolute: dedicated.title },
      description: dedicated.description,
    };
  }

  const post = DEFAULT_BLOG_POSTS[slug];
  if (!post) {
    return {
      title: "Packaging Blog | HOF Pack",
    };
  }

  return {
    title: { absolute: `${post.title} | HOF Pack | HofPack` },
    ...(post.excerpt ? { description: post.excerpt } : {}),
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  return <BlogDetailView slug={slug} />;
}
