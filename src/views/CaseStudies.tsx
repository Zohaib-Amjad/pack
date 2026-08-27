"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import CTASection from "@/components/CTASection";
import { DEFAULT_CASE_STUDIES } from "@/data/case-studies-defaults";

function readingTime(content: string) {
  return Math.max(1, Math.ceil((content?.trim().split(/\s+/).length ?? 0) / 200));
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState("All");
  const fallbackPosts = Object.values(DEFAULT_CASE_STUDIES);

  const { data: posts = fallbackPosts, isLoading } = useQuery({
    queryKey: ["public", "case-studies"],
    queryFn: async () => {
      try {
        const supabase = createPublicClient();
        const { data, error } = await withAbortableTimeout((signal) =>
          (supabase as any)
            .from("case_studies")
            .select("id, title, slug, excerpt, cover_image, author, category, tags, published_at, read_time, content")
            .eq("is_published", true)
            .order("published_at", { ascending: false })
            .abortSignal(signal)
        );
        if (!error && data && (data as any[]).length > 0) return data as any[];
      } catch {
        // fallback
      }
      return fallbackPosts;
    },
    initialData: fallbackPosts,
    staleTime: 5 * 60 * 1000,
  });

  const categories = ["All", ...Array.from(new Set(posts.map((p: any) => p.category).filter(Boolean)))];
  const filtered = activeCategory === "All" ? posts : posts.filter((p: any) => p.category === activeCategory);
  const [featured, ...rest] = filtered;

  return (
    <Layout>

      {/* ── Hero ── */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] -translate-y-1/2 translate-x-1/3" />

        <div className="container-max px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block font-sans text-[10px] font-semibold tracking-[0.25em] uppercase text-accent mb-5">
              Success Stories
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">
              HOF Pack<br />
              <span className="text-accent italic">Case Studies</span>
            </h1>
            <p className="mt-5 font-sans text-base text-white/55 leading-relaxed max-w-lg">
              Real results from real brands — see how our custom packaging solutions helped businesses grow, stand out, and delight customers.
            </p>
          </div>
        </div>

        {/* Wave */}
        <div className="relative h-10 sm:h-14">
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" fill="hsl(var(--background))">
            <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z" />
          </svg>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <div className="bg-background border-b border-border">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2 rounded-full font-sans text-[12px] font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Posts ── */}
      <section className="bg-background py-14 sm:py-20">
        <div className="container-max px-4 sm:px-6 lg:px-8">

          {isLoading ? (
            <div className="space-y-6">
              <div className="h-[420px] rounded-3xl bg-muted/30 animate-pulse" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => <div key={i} className="h-72 rounded-2xl bg-muted/20 animate-pulse" />)}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-32">
              <p className="font-display text-4xl font-bold text-foreground mb-3">No case studies yet</p>
              <p className="font-sans text-sm text-muted-foreground">Check back soon — we&apos;re documenting our latest projects.</p>
            </div>
          ) : (
            <>
              {/* ── Featured ── */}
              {featured && (
                <Link href={`/case-studies/${featured.slug}`} className="group block mb-12 no-underline">
                  <div className="grid lg:grid-cols-[1fr_480px] rounded-3xl overflow-hidden border border-border bg-card hover:border-accent/20 hover:shadow-2xl transition-all duration-500">
                    <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden order-1 lg:order-2">
                      {featured.cover_image ? (
                        <Image
                          src={featured.cover_image}
                          alt={featured.title}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full min-h-[280px] bg-gradient-to-br from-primary via-primary/80 to-primary/50 flex items-center justify-center">
                          <span className="font-display text-8xl text-white/10 font-bold select-none">HOF</span>
                        </div>
                      )}
                      <div className="absolute top-5 left-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm font-sans text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
                          <Tag size={9} /> {featured.category || "Packaging"}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                      <span className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-accent mb-4 block">
                        Featured Case Study
                      </span>
                      <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-[1.1] group-hover:text-accent transition-colors duration-300">
                        {featured.title}
                      </h2>
                      {featured.excerpt && (
                        <p className="mt-4 font-sans text-sm text-muted-foreground leading-[1.75] line-clamp-3">
                          {featured.excerpt}
                        </p>
                      )}
                      <div className="mt-6 flex items-center gap-5 font-sans text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-accent" />
                          {formatDate(featured.published_at || featured.created_at)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} className="text-accent" />
                          {featured.read_time || `${readingTime(featured.content || "")} min read`}
                        </span>
                      </div>
                      <div className="mt-8">
                        <span className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-accent group-hover:gap-3 transition-all duration-300">
                          Read Case Study <ArrowRight size={15} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* ── Grid ── */}
              {rest.length > 0 && (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">More Case Studies</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((post: any) => (
                      <Link key={post.id} href={`/case-studies/${post.slug}`} className="group block no-underline">
                        <article className="h-full rounded-2xl overflow-hidden border border-border bg-card hover:border-accent/20 hover:shadow-xl transition-all duration-300 flex flex-col">
                          <div className="relative aspect-[16/9] overflow-hidden">
                            {post.cover_image ? (
                              <Image
                                src={post.cover_image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center">
                                <span className="font-display text-5xl text-white/10 font-bold select-none">HOF</span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>

                          <div className="p-6 flex flex-col flex-1">
                            <span className="inline-flex items-center gap-1 font-sans text-[9.5px] font-bold uppercase tracking-wider text-accent mb-3">
                              <Tag size={9} /> {post.category || "Packaging"}
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
                                  <Calendar size={10} />
                                  {formatDate(post.published_at || post.created_at)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock size={10} />
                                  {post.read_time || `${readingTime(post.content || "")} min`}
                                </span>
                              </div>
                              <ArrowRight size={14} className="text-accent -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}