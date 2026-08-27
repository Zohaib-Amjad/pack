"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";

interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  excerpt?: string;
  isFeatured?: boolean;
}

const BLOG_POSTS: BlogPostItem[] = [
  {
    id: "post-1",
    slug: "wax-paper-vs-butter-paper",
    title: "Wax Paper vs Butter Paper: Stop Grabbing the Wrong Sheet",
    category: "Industry News",
    date: "Aug 5, 2026",
    readTime: "6 min read",
    coverImage: "/images/blog/b361803d-d29d-4085-beff-a704ff75dc18.png",
    isFeatured: true,
  },
  {
    id: "post-2",
    slug: "milk-carton-dimensions",
    title: "How to Measure Milk Carton Dimensions: A Complete Packaging Guide",
    category: "Packaging",
    date: "Aug 21, 2026",
    readTime: "8 min read",
    coverImage: "/images/blog/c1396e60-4e8f-4ebb-8921-8c705fb1428b.png",
  },
  {
    id: "post-3",
    slug: "jewelry-packaging-ideas",
    title: "Jewelry Packaging Ideas To Elevate Your Brand",
    category: "Packaging",
    date: "Aug 21, 2026",
    readTime: "9 min read",
    coverImage: "/images/blog/789cef6f-445a-4071-9a82-49e90666b480.png",
  },
  {
    id: "post-4",
    slug: "how-to-measure-shoe-box-dimensions",
    title: "How to Measure Shoe Box Dimensions: Simple Step-by-Step Guide",
    category: "Packaging",
    date: "Jun 19, 2026",
    readTime: "6 min read",
    coverImage: "/images/blog/226d2933-0e9f-4f09-a23f-f66f407d3c62.png",
  },
  {
    id: "post-5",
    slug: "food-packaging-solutions-for-brands",
    title: "The Complete Guide to Custom Food Packaging: Boxes, Pouches, Bags & Labels",
    category: "Packaging",
    date: "Jun 11, 2026",
    readTime: "12 min read",
    coverImage: "/images/blog/f837086c-3ef9-467b-aeba-de58f17af089.png",
    excerpt: "In this guide, we’ll break down different types of custom food packaging for you, so that you can choose the style that suits your product best and help it stand out from the crowd.",
  },
  {
    id: "post-6",
    slug: "custom-mailers-vs-poly-mailers-vs-bubble-mailers",
    title: "Custom Mailers, Poly Mailers & Bubble Mailers: What’s Right for Your Brand?",
    category: "Packaging",
    date: "Jun 10, 2026",
    readTime: "12 min read",
    coverImage: "/images/blog/6c24f0d9-35ef-4f41-b249-b585dc4f88b6.png",
  },
  {
    id: "post-7",
    slug: "custom-flexible-packaging-bag-guide",
    title: "Guide to Flexible Packaging: How to Choose the Right Custom Bag for Your Brand?",
    category: "Packaging",
    date: "Jun 1, 2026",
    readTime: "13 min read",
    coverImage: "/images/blog/29f8aa58-5e4f-4fb7-aa7e-a002652546b4.png",
    excerpt: "Choose the right custom stand up pouch or packaging bag for your brand with an ultimate guide to all flexible packaging types.",
  },
  {
    id: "post-8",
    slug: "types-of-custom-boxes",
    title: "Types of Custom Boxes | A Go-To Guide for Every Brand Owner",
    category: "Packaging",
    date: "May 18, 2026",
    readTime: "12 min read",
    coverImage: "/images/blog/cb1a7ae7-08e8-4726-8153-604250b36632.jpg",
    excerpt: "Learn everything about custom boxes in the USA, including mailer boxes, shipping boxes, folding cartons, rigid boxes, display packaging, and printing options.",
  },
  {
    id: "post-9",
    slug: "secondary-packaging-explained",
    title: "Secondary Packaging Explained: Types, Materials & Branding Guide",
    category: "Packaging",
    date: "May 11, 2026",
    readTime: "17 min read",
    coverImage: "/images/blog/63bb1ca0-27a0-4dbe-a1a0-181228d2c16b.jpg",
    excerpt: "Learn everything about custom secondary packaging, including packaging types, materials, printing methods, sustainability, costs, and how businesses choose the right packaging solutions.",
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { open } = useQuoteModal();

  const categories = ["All", "Industry News", "Packaging"];

  const filtered =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const featured = filtered.find((p) => p.isFeatured) || filtered[0];
  const rest = filtered.filter((p) => p.id !== featured?.id);

  return (
    <div className="flex-1 w-full">
      {/* ── Hero Section ── */}
      <section className="relative bg-primary overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block font-sans text-[10px] font-semibold tracking-[0.25em] uppercase text-accent mb-5">
              Insights &amp; Guides
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">
              The HOF Pack
              <br />
              <span className="text-accent italic">Blog</span>
            </h1>
            <p className="mt-5 font-sans text-base text-white/55 leading-relaxed max-w-lg">
              Packaging tips, brand strategy, and industry trends — straight from our team of custom packaging experts.
            </p>
          </div>
        </div>
        <div className="relative h-10 sm:h-14">
          <svg
            viewBox="0 0 1440 56"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            fill="hsl(var(--background))"
          >
            <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z" />
          </svg>
        </div>
      </section>

      {/* ── Category Filters ── */}
      <div className="bg-background border-b border-border">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-5 py-2 rounded-full font-sans text-[12px] font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Blog Posts Section ── */}
      <section className="bg-background py-14 sm:py-20">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          {/* Featured Article */}
          {featured && (
            <Link className="group block mb-12 no-underline" href={`/blog/${featured.slug}`}>
              <div className="grid lg:grid-cols-[1fr_480px] rounded-3xl overflow-hidden border border-border bg-card hover:border-accent/20 hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden order-1 lg:order-2 min-h-[280px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 absolute inset-0"
                    src={featured.coverImage}
                  />
                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm font-sans text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
                      <Tag className="w-[9px] h-[9px]" /> {featured.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                  <span className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-accent mb-4 block">
                    Featured Article
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-[1.1] group-hover:text-accent transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <div className="mt-6 flex items-center gap-5 font-sans text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-accent" />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-accent" />
                      {featured.readTime}
                    </span>
                  </div>
                  <div className="mt-8">
                    <span className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-accent group-hover:gap-3 transition-all duration-300">
                      Read Article <ArrowRight className="w-[15px] h-[15px]" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* More Articles Header */}
          {rest.length > 0 && (
            <div className="flex items-center gap-4 mb-8">
              <span className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                More Articles
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
          )}

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post.id} className="group block no-underline" href={`/blog/${post.slug}`}>
                <article className="h-full rounded-2xl overflow-hidden border border-border bg-card hover:border-accent/20 hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 absolute inset-0"
                      src={post.coverImage}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-flex items-center gap-1 font-sans text-[9.5px] font-bold uppercase tracking-wider text-accent mb-3">
                      <Tag className="w-[9px] h-[9px]" /> {post.category}
                    </span>
                    <h3 className="font-display text-xl font-bold text-foreground leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 font-sans text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                      <div className="flex items-center gap-3 font-sans text-[10.5px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {post.readTime}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-accent -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ── */}
      <section className="border-t-[3px] border-accent bg-[#2d5c3e] text-white">
        <div className="mx-auto max-w-[1100px] px-4 py-10 text-center sm:px-10">
          <h2 className="font-display text-[24px] font-semibold text-white sm:text-[28px]">
            Let&apos;s build something great together.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-[13px] text-white/65 sm:text-sm">
            Get your custom packaging quote today — free design support included.
          </p>
          <button
            onClick={() => open()}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 mt-4 rounded-md bg-accent px-7 py-[11px] text-[12px] font-medium uppercase tracking-[0.12em] text-white hover:bg-[#c45a18] cursor-pointer"
            type="button"
          >
            Get a Quote
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}