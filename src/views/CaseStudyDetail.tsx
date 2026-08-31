"use client";

import { useMemo } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { Calendar, Clock, ArrowLeft, Tag, ArrowRight } from "lucide-react";
import CTASection from "@/components/CTASection";
import { DEFAULT_CASE_STUDIES } from "@/data/case-studies-defaults";

function readingTime(content: string) {
  return Math.max(1, Math.ceil((content?.trim().split(/\s+/).length ?? 0) / 200));
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default function CaseStudyDetail({ slug }: { slug: string }) {
  const fallbackPost = DEFAULT_CASE_STUDIES[slug];

  const { data: post = fallbackPost, isLoading, isError } = useQuery({
    queryKey: ["public", "case-study", slug],
    queryFn: async () => {
      try {
        const supabase = createPublicClient();
        const { data, error } = await withAbortableTimeout((signal) =>
          (supabase as any)
            .from("case_studies")
            .select("*")
            .eq("slug", slug)
            .eq("is_published", true)
            .maybeSingle()
            .abortSignal(signal)
        );
        if (!error && data) {
          return {
            ...data,
            cover_image: data.cover_image || data.image || "/images/case-studies/luxe-candle-co-rigid-boxes.jpg",
          };
        }
      } catch {
        // fallback to default
      }
      return fallbackPost || null;
    },
    initialData: fallbackPost,
    staleTime: 0,
    refetchOnMount: true,
  });

  const fallbackRelated = useMemo(() => {
    const allPosts = Object.values(DEFAULT_CASE_STUDIES).filter((p) => p.slug !== slug);
    const categoryMatches = allPosts.filter((p) => p.category === post?.category);
    if (categoryMatches.length >= 3) {
      return categoryMatches.slice(0, 3);
    }
    const otherPosts = allPosts.filter((p) => p.category !== post?.category);
    return [...categoryMatches, ...otherPosts].slice(0, 3);
  }, [slug, post?.category]);

  const { data: related = fallbackRelated } = useQuery({
    queryKey: ["public", "case-study-related", slug],
    queryFn: async () => {
      if (!post?.category) return fallbackRelated;
      try {
        const supabase = createPublicClient();
        const { data } = await withAbortableTimeout((signal) =>
          (supabase as any)
            .from("case_studies")
            .select("*")
            .eq("is_published", true)
            .eq("category", post.category)
            .neq("slug", slug)
            .limit(3)
            .abortSignal(signal)
        );
        if (data && (data as any[]).length > 0) return data as any[];
      } catch {
        // fallback
      }
      return fallbackRelated;
    },
    initialData: fallbackRelated,
    enabled: !!post,
    staleTime: 0,
    refetchOnMount: true,
  });

  if (isLoading && !post) {
    return (
      <Layout>
        <div className="bg-background min-h-screen">
          <div className="container-max px-4 sm:px-6 lg:px-8 py-20 max-w-4xl mx-auto space-y-6 animate-pulse">
            <div className="h-5 bg-muted/40 rounded w-24" />
            <div className="h-12 bg-muted/40 rounded-xl w-3/4" />
            <div className="h-5 bg-muted/30 rounded w-1/2" />
            <div className="aspect-[21/9] bg-muted/30 rounded-3xl mt-8" />
            <div className="space-y-3 mt-10">
              {[...Array(8)].map((_, i) => <div key={i} className={`h-4 bg-muted/20 rounded ${i % 4 === 3 ? "w-2/3" : "w-full"}`} />)}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post || (isError && !fallbackPost)) {
    return (
      <Layout>
        <div className="container-max px-4 sm:px-6 py-40 text-center">
          <p className="font-display text-5xl font-bold text-foreground mb-4">Case Study Not Found</p>
          <p className="font-sans text-sm text-muted-foreground mb-10">This case study may have been moved or unpublished.</p>
          <Link href="/case-studies" className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-accent hover:underline">
            <ArrowLeft size={14} /> Back to Case Studies
          </Link>
        </div>
      </Layout>
    );
  }

  const coverImg = post.cover_image || post.image;

  return (
    <Layout>

      {/* ── Hero ── */}
      <section className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[100px] -translate-y-1/2 translate-x-1/3" />

        <div className="container-max px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20 relative z-10">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 font-sans text-xs text-white/40 hover:text-white/70 transition-colors mb-8 no-underline"
          >
            <ArrowLeft size={12} /> Back to Case Studies
          </Link>

          <div className="max-w-3xl">
            {post.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/15 text-accent font-sans text-[10px] font-bold uppercase tracking-wider mb-5">
                <Tag size={9} /> {post.category}
              </span>
            )}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-[1.15] [text-wrap:balance] max-w-3xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-5 font-sans text-base text-white/55 leading-relaxed max-w-2xl">
                {post.excerpt}
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white font-bold font-sans text-sm shrink-0">
                  {(post.author || "H").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-sans text-xs font-semibold text-white/80">{post.author || "HOF Pack Team"}</p>
                  <p className="font-sans text-[10px] text-white/40">Packaging Expert</p>
                </div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <span className="flex items-center gap-1.5 font-sans text-xs text-white/50">
                <Calendar size={12} className="text-accent/70" />
                {formatDate(post.published_at || post.created_at)}
              </span>
              <span className="flex items-center gap-1.5 font-sans text-xs text-white/50">
                <Clock size={12} className="text-accent/70" />
                {post.read_time || `${readingTime(post.content || "")} min read`}
              </span>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="relative h-10 sm:h-14">
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" fill="hsl(var(--background))">
            <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z" />
          </svg>
        </div>
      </section>

      {/* ── Cover Image ── */}
      {coverImg && (
        <div className="bg-background">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[21/9] max-h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-border -mt-2">
              <Image src={coverImg} alt={post.title} fill unoptimized className="object-cover" priority />
            </div>
          </div>
        </div>
      )}

      {/* ── Article Body ── */}
      <section className="bg-background py-14 sm:py-20">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_260px] gap-12 lg:gap-16 max-w-5xl mx-auto">

            <article>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-muted border border-border font-sans text-[10.5px] font-medium text-muted-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div
                className="
                  tinymce-content
                  [&_h2]:font-display [&_h2]:text-[28px] [&_h2]:sm:text-[32px] [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:leading-tight [&_h2]:mt-10 [&_h2]:mb-4
                  [&_h3]:font-display [&_h3]:text-[22px] [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:leading-tight [&_h3]:mt-8 [&_h3]:mb-3
                  [&_p]:font-sans [&_p]:text-[15px] [&_p]:text-[var(--ds-body)] [&_p]:leading-[1.85] [&_p]:mb-5
                  [&_a]:text-accent [&_a]:no-underline [&_a:hover]:underline
                  [&_strong]:text-foreground [&_strong]:font-semibold
                  [&_ul]:font-sans [&_ul]:text-[15px] [&_ul]:text-[var(--ds-body)] [&_ul]:mb-5 [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:list-disc
                  [&_ol]:font-sans [&_ol]:text-[15px] [&_ol]:text-[var(--ds-body)] [&_ol]:mb-5 [&_ol]:pl-5 [&_ol]:space-y-2 [&_ol]:list-decimal
                  [&_li]:leading-[1.75] [&_li]:list-item
                  [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-6 [&_blockquote]:py-1 [&_blockquote]:my-8 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:text-[16px] [&_blockquote]:font-display
                  [&_hr]:border-border [&_hr]:my-10
                  [&_img]:w-full [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:my-6 [&_img]:object-cover [&_img]:block
                  [&_table]:w-full [&_table]:table-fixed [&_table]:border-collapse [&_table]:my-6
                  [&_th]:border [&_th]:border-border [&_th]:p-3.5 [&_th]:text-left [&_th]:font-semibold [&_th]:bg-muted/50
                  [&_td]:border [&_td]:border-border [&_td]:p-3.5 [&_td]:align-top
                  [&_pre]:bg-muted [&_pre]:rounded-xl [&_pre]:p-5 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:my-6
                  [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                "
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />

              <div className="mt-14 p-6 rounded-2xl bg-card border border-border flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold font-display text-2xl shrink-0">
                  {(post.author || "H").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-sans text-sm font-bold text-foreground">{post.author || "HOF Pack Team"}</p>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">Custom Packaging Experts at HOF Pack</p>
                </div>
              </div>
            </article>

            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">

                <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                  <p className="font-sans text-[9.5px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Case Study Info</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <Calendar size={13} className="text-accent shrink-0" />
                      <div>
                        <p className="font-sans text-[10px] text-muted-foreground">Published</p>
                        <p className="font-sans text-[12px] font-semibold text-foreground">{formatDate(post.published_at || post.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock size={13} className="text-accent shrink-0" />
                      <div>
                        <p className="font-sans text-[10px] text-muted-foreground">Reading time</p>
                        <p className="font-sans text-[12px] font-semibold text-foreground">{post.read_time || `${readingTime(post.content || "")} min read`}</p>
                      </div>
                    </div>
                    {post.category && (
                      <div className="flex items-center gap-2.5">
                        <Tag size={13} className="text-accent shrink-0" />
                        <div>
                          <p className="font-sans text-[10px] text-muted-foreground">Industry</p>
                          <p className="font-sans text-[12px] font-semibold text-foreground">{post.category}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="bg-card border border-border rounded-2xl p-5">
                    <p className="font-sans text-[9.5px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-3">Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag: string) => (
                        <span key={tag} className="px-2.5 py-1 rounded-full bg-muted border border-border font-sans text-[10px] font-medium text-muted-foreground">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-primary rounded-2xl p-5 text-center">
                  <p className="font-display text-lg font-bold text-white mb-1">Get Similar Results</p>
                  <p className="font-sans text-[11px] text-white/55 mb-4 leading-relaxed">Get a free quote in 24 hours. No commitment.</p>
                  <Link href="/contact" className="block w-full py-2.5 rounded-lg bg-accent hover:bg-[var(--ds-orange-hover)] text-white font-sans text-[12px] font-bold tracking-wide transition-colors no-underline text-center">
                    Get Free Quote
                  </Link>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ── Related Case Studies ── */}
      {related.length > 0 && (
        <section className="bg-[var(--ds-panel-bg)] border-t border-border py-14 sm:py-20">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-10">
              <div>
                <p className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-accent mb-1">Keep Reading</p>
                <h2 className="font-display text-3xl font-bold text-foreground">More in {post.category}</h2>
              </div>
              <div className="flex-1 h-px bg-border hidden sm:block" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p: any) => (
                <Link key={p.id || p.slug} href={`/case-studies/${p.slug}`} className="group block no-underline">
                  <article className="h-full rounded-2xl overflow-hidden border border-border bg-card hover:border-accent/20 hover:shadow-lg transition-all duration-300 flex flex-col">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      {p.cover_image ? (
                        <Image src={p.cover_image} alt={p.title} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center">
                          <span className="font-display text-4xl text-white/10 font-bold select-none">HOF</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display text-lg font-bold text-foreground leading-snug group-hover:text-accent transition-colors line-clamp-2">
                        {p.title}
                      </h3>
                      {p.excerpt && (
                        <p className="mt-1.5 font-sans text-xs text-muted-foreground line-clamp-2 leading-relaxed flex-1">{p.excerpt}</p>
                      )}
                      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                        <span className="font-sans text-[10.5px] text-muted-foreground flex items-center gap-1">
                          <Clock size={10} /> {p.read_time || `${readingTime(p.content || "")} min read`}
                        </span>
                        <ArrowRight size={13} className="text-accent -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </Layout>
  );
}