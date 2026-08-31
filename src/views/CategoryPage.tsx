"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { sanitizeHtml } from "@/lib/sanitize-html";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import { getCategoryImage } from "@/data/categoryImages";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, ChevronLeft, ChevronRight, Palette, Feather, Leaf } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import NotFound from "./NotFound";
import PageLoader from "@/components/PageLoader";
import type { CategoryContent, CategoryArticleSection } from "@/types/category-content";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import {
  fetchCategoryPageData,
  type CategoryPageData,
} from "@/lib/category-page-data";

import TrustpilotTestimonialsSection from "@/components/home/TrustpilotTestimonialsSection";

// ── WhySection extracted as a proper component to satisfy Rules of Hooks ─────
function WhySection({ cc, aboveFold, belowFold, renderSection }: {
  cc: CategoryContent;
  aboveFold: CategoryArticleSection[];
  belowFold: CategoryArticleSection[];
  renderSection: (s: CategoryArticleSection, i: number) => React.ReactNode;
}) {
  const allSections = [...aboveFold, ...belowFold];

  return (
    <div className="article-body bg-white border border-[#e0ddd6] rounded-[14px] px-8 sm:px-14 py-12 flex flex-col gap-4">
      {cc.why_heading && <h2 className="font-display text-[26px] font-semibold text-foreground leading-[1.25]">{cc.why_heading}</h2>}
      <div className="article-scroll max-h-[420px] overflow-y-auto overscroll-contain pr-2 sm:max-h-[480px]">
        <div className="flex flex-col gap-4 pb-1">
          {allSections.map(renderSection)}

          {(cc.material_items?.length ?? 0) > 0 && (
            <>
              <div className="h-px bg-[#e0ddd6]" />
              <div className="flex flex-wrap gap-2.5">
                {cc.material_items!.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 font-sans text-[12px] font-medium text-[#3a3a3a] bg-[#faf8f5] border border-[#d8d4cc] rounded-[8px] px-4 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {m}
                  </div>
                ))}
              </div>
            </>
          )}

          {(cc.perk_items?.length ?? 0) > 0 && (
            <>
              <div className="h-px bg-[#e0ddd6]" />
              <div className="grid grid-cols-2 border border-[#e0ddd6] rounded-[10px] overflow-hidden w-full max-w-[560px]">
                {cc.perk_items!.map((perk, i) => (
                  <div key={i} className={`flex items-center gap-2.5 font-sans text-[12.5px] text-[#3a3a3a] px-4 py-3 border-[#ece9e2] ${i % 2 === 0 ? "border-r" : ""} ${i < cc.perk_items!.length - 2 ? "border-b" : ""}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="#e8732a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {perk}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

interface CategoryPageProps {
  categorySlug?: string;
  initialData?: CategoryPageData | null;
}

const STYLE_TAG_REGEX = /<style\b[^>]*>[\s\S]*?<\/style>/gi;

const sanitizeRichContent = (html?: string | null) => {
  const rawHtml = html ?? "";
  const preservedStyles = rawHtml.match(STYLE_TAG_REGEX)?.join("\n") ?? "";
  const contentWithoutStyles = rawHtml.replace(STYLE_TAG_REGEX, "");

  return `${preservedStyles}${sanitizeHtml(contentWithoutStyles, {
    ADD_ATTR: ["style", "class", "id"],
  })}`;
};

const CategoryPage = ({ categorySlug: propSlug, initialData = null }: CategoryPageProps) => {
  const params = useParams();
  const categorySlug = propSlug || (params?.categorySlug as string);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [currentRelatedPage, setCurrentRelatedPage] = useState(0);

  const [clientFallback, setClientFallback] = useState<CategoryPageData | null>(null);
  const [clientLoading, setClientLoading] = useState(false);

  const relatedCarouselRef = useRef<HTMLDivElement | null>(null);

  const initialCategoryKey = initialData?.category?.id || initialData?.category?.slug || "";

  useEffect(() => {
    let cancelled = false;
    fetchCategoryPageData(categorySlug)
      .then((data) => {
        if (!cancelled && data) setClientFallback(data);
      })
      .finally(() => {
        if (!cancelled) setClientLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  const pageData =
    clientFallback?.category
      ? clientFallback
      : initialData?.category
        ? initialData
        : null;

  const category = pageData?.category;
  const products = pageData?.products || [];
  const faqs = pageData?.faqs || [];
  const relatedProducts = pageData?.relatedProducts || [];
  const loading = !category && clientLoading;

  const totalRelatedPages = Math.max(1, Math.ceil(relatedProducts.length / cardsPerView));

  const scrollRelatedProducts = (pageIndex: number) => {
    const container = relatedCarouselRef.current;
    if (!container) return;

    const nextPage = Math.max(0, Math.min(pageIndex, totalRelatedPages - 1));
    container.scrollTo({
      left: nextPage * container.clientWidth,
      behavior: "smooth",
    });
    setCurrentRelatedPage(nextPage);
  };

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1280) {
        setCardsPerView(4);
      } else if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  useEffect(() => {
    const container = relatedCarouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const pageWidth = container.clientWidth || 1;
      const nextPage = Math.round(container.scrollLeft / pageWidth);
      setCurrentRelatedPage(Math.max(0, Math.min(nextPage, totalRelatedPages - 1)));
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [totalRelatedPages, relatedProducts.length]);

  useEffect(() => {
    setCurrentRelatedPage(0);
    relatedCarouselRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }, [relatedProducts.length, cardsPerView]);

  if (loading) {
    return <PageLoader />;
  }

  if (!category) return <NotFound />;

  const sectionLabel =
    category.section === "industry" ? "Boxes by Industry" :
      category.section === "material" ? "Boxes by Material" : "Boxes by Style";

  const slugForBanner = (categorySlug || category.slug || category.name || "").toLowerCase();
  const isRigidBoxesPage = slugForBanner.includes("rigid");
  const isCardboardBoxesPage = slugForBanner.includes("cardboard");
  const isTuckBoxesPage = slugForBanner.includes("tuck");
  const hasCustomStudioBanner = isRigidBoxesPage || isCardboardBoxesPage || isTuckBoxesPage;

  // Hard-coded local photos — do not use CMS banner on these pages.
  const catBanner = isRigidBoxesPage
    ? "/hero-rigid-boxes.png"
    : isCardboardBoxesPage
      ? "/hero-kraft-boxes.png"
      : isTuckBoxesPage
        ? "/hero-branded-boxes.png"
        : (category.banner_image_url || category.image_url || getCategoryImage(category.slug));

  const cc: CategoryContent = category?.category_content ?? {};
  const hasFeatures = (cc.feature_items?.length ?? 0) > 0;
  const hasBlocks = (cc.content_blocks?.length ?? 0) > 0;
  const hasWhy = !!(cc.why_heading || (cc.article_sections?.length ?? 0) > 0);
  const hasDynamicBrandContent = hasFeatures || hasBlocks || hasWhy;

  const allArticleSections = cc.article_sections ?? [];
  const dividerIdx = allArticleSections.findIndex((s, i) => i > 0 && s.level === "divider");
  const aboveFold = dividerIdx >= 0 ? allArticleSections.slice(0, dividerIdx) : allArticleSections;
  const belowFold = dividerIdx >= 0 ? allArticleSections.slice(dividerIdx + 1) : [];

  const renderArticleSection = (s: CategoryArticleSection, i: number) => {
    if (s.level === "divider") return <div key={i} className="h-px bg-[#e0ddd6] my-2" />;

    const md = s.text ?? "";
    const converted = md
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.+?)_/g, "<em>$1</em>")
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul class="list-disc pl-5 space-y-1">${m}</ul>`)
      .replace(/^---$/gm, "<hr />");

    const html = sanitizeHtml(converted, { ADD_ATTR: ["target", "rel", "class"] });

    if (s.level === "h1") return <h1 key={i} className="font-display text-[32px] font-bold text-foreground leading-[1.2]" dangerouslySetInnerHTML={{ __html: html }} />;
    if (s.level === "h2") return <h2 key={i} className="font-display text-[26px] font-semibold text-foreground leading-[1.25]" dangerouslySetInnerHTML={{ __html: html }} />;
    if (s.level === "h3") return <h3 key={i} className="font-sans text-[18px] font-semibold text-foreground leading-[1.3]" dangerouslySetInnerHTML={{ __html: html }} />;
    if (s.level === "h4") return <h4 key={i} className="font-sans text-[15px] font-semibold text-foreground" dangerouslySetInnerHTML={{ __html: html }} />;
    if (s.level === "h5") return <h5 key={i} className="font-sans text-[13px] font-semibold text-foreground uppercase tracking-[0.08em]" dangerouslySetInnerHTML={{ __html: html }} />;
    if (s.level === "h6") return <h6 key={i} className="font-sans text-[11px] font-bold text-[#7a7672] uppercase tracking-[0.12em]" dangerouslySetInnerHTML={{ __html: html }} />;
    return <div key={i} className="font-sans text-[13px] text-[#4a4a4a] leading-[1.75] max-w-[820px]" dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const whyScrollSection = hasWhy ? (
    <WhySection
      cc={cc}
      aboveFold={aboveFold}
      belowFold={belowFold}
      renderSection={renderArticleSection}
    />
  ) : null;

  const brandContentSection = (() => {
    if (!hasDynamicBrandContent) {
      if (!category?.detail_description) return null;
      return (
        <section className="section-padding bg-section-alt">
          <div className="container-max max-w-4xl">
            <div
              className="article-scroll tinymce-content prose prose-lg mx-auto w-full max-w-[900px] max-h-[420px] overflow-y-auto overscroll-contain break-words pr-2 text-muted-foreground font-sans prose-headings:font-display prose-headings:text-foreground prose-headings:font-bold prose-a:text-accent hover:prose-a:text-accent/80 sm:max-h-[480px]"
              dangerouslySetInnerHTML={{ __html: sanitizeRichContent(category.detail_description) }}
            />
          </div>
        </section>
      );
    }

    if (isRigidBoxesPage && !hasFeatures && !hasBlocks) {
      return null;
    }

    return (
      <section className="bg-[#f5f3ee] border-t border-[#e0ddd6] py-16 px-4 sm:px-10">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-[72px]">
          {hasFeatures && (
            <div className="grid sm:grid-cols-3 gap-8 pb-4 border-b border-[#e0ddd6]">
              {cc.feature_items!.map((feat, i) => (
                <div key={i} className="flex gap-3.5 items-start">
                  <div className="shrink-0 w-10 h-10 bg-white border border-[#f5d5be] rounded-[10px] flex items-center justify-center">
                    {feat.icon === "Palette" ? (
                      <Palette className="w-[18px] h-[18px] text-accent" />
                    ) : feat.icon === "Feather" ? (
                      <Feather className="w-[18px] h-[18px] text-accent" />
                    ) : feat.icon === "Leaf" ? (
                      <Leaf className="w-[18px] h-[18px] text-accent" />
                    ) : (
                      <Package className="w-[18px] h-[18px] text-accent" />
                    )}
                  </div>
                  <div>
                    <p className="font-sans text-[12.5px] font-medium text-foreground mb-1">{feat.title}</p>
                    <p className="font-sans text-[12px] text-[#5a5652] leading-[1.6]">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {hasBlocks && cc.content_blocks!.map((block, i) => (
            <div key={i} className={`grid sm:grid-cols-2 gap-8 sm:gap-16 items-center ${block.flipped ? "sm:[direction:rtl]" : ""}`}>
              <div className="flex flex-col gap-4 text-left [direction:ltr]">
                <h3 className="font-display text-[26px] font-semibold text-foreground leading-[1.25]">{block.heading}</h3>
                <p className="font-sans text-[13px] text-[#4a4a4a] leading-[1.75]">{block.body}</p>
                {block.linkLabel && (
                  <Link href="#quote" className="font-sans text-[12px] font-medium tracking-[0.08em] text-accent uppercase border-b border-[#f5d5be] pb-0.5 self-start hover:text-[#c45a18] transition-colors no-underline">
                    {block.linkLabel}
                  </Link>
                )}
              </div>
              <div className="rounded-[12px] overflow-hidden aspect-[4/3] [direction:ltr]">
                {block.image && <Image src={block.image} alt={block.alt || block.heading} fill={false} width={700} height={525} className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500" />}
              </div>
            </div>
          ))}

          {!isRigidBoxesPage && whyScrollSection}
        </div>
      </section>
    );
  })();

  const quoteFormSection = (
    <QuoteRequestForm
      id="quote"
      variant="card"
      productInterest={category.name || "Category Inquiry"}
      categorySlug={category.slug}
      thankYouPath={`/thank-you/${category.thank_you_slug || category.slug}`}
      headingEyebrow="GET A FREE QUOTE"
      headingTitle="Custom packaging, quoted in minutes"
      headingSubtitle={`Tell us about your ${category.name.toLowerCase()} project and we'll prepare a custom quote within 24 hrs.`}
    />
  );

  const faqSection = faqs.length > 0 ? (
    <section className="section-padding bg-background">
      <div className="container-max max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="font-sans text-[13px] uppercase tracking-[0.18em] text-[#1a1a1a]"
            style={{ fontWeight: 500 }}>
            Common <span className="text-[#e8732a]">Questions</span>
          </h2>
        </div>
        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  ) : null;

  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-[#1e3d2b]"
        style={{ minHeight: hasCustomStudioBanner ? "clamp(380px, 48vw, 520px)" : "clamp(320px, 55vw, 480px)" }}
      >
        {catBanner && (
          <div className="absolute inset-0">
            <Image
              src={catBanner}
              alt={category.name}
              fill
              className={hasCustomStudioBanner ? "object-cover object-right" : "object-cover object-center"}
              sizes="100vw"
              priority
              unoptimized
            />
          </div>
        )}
        {!catBanner && <div className="absolute inset-0 bg-hero" />}

        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-[72px]">
          <div className="w-full max-w-[840px]">
            <p className={`ds-eyebrow mb-[14px] ${isRigidBoxesPage ? "text-white/90" : "text-accent"}`}>{sectionLabel}</p>
            {(() => {
              const lead = category.hero_headline_white?.trim() || (isRigidBoxesPage ? "Custom Rigid Boxes" : "Custom");
              const accent = category.hero_headline_accent?.trim() || (isRigidBoxesPage ? "Adds Luxury Touch" : category.name);
              const totalWords = `${lead} ${accent}`.trim().split(/\s+/).filter(Boolean).length;
              return (
                <h1
                  className="font-sans text-white [text-wrap:balance]"
                  style={{ fontSize: "clamp(26px, 4.5vw, 48px)", fontWeight: 700, lineHeight: 1.12, marginBottom: 16 }}
                >
                  {totalWords <= 4 ? (
                    <span>{lead} <span className="text-accent">{accent}</span></span>
                  ) : (
                    <>
                      <span className="block">{lead}</span>
                      <span className="block text-accent mt-1">{accent}</span>
                    </>
                  )}
                </h1>
              );
            })()}
            <p
              className="font-sans text-white/75"
              style={{ fontSize: "clamp(13px, 1.5vw, 14px)", lineHeight: 1.7, fontWeight: 300, marginBottom: 28 }}
            >
              {category.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#quote"
                className="inline-flex items-center gap-2 font-sans font-semibold text-white bg-accent hover:bg-[var(--ds-orange-hover)] rounded-[7px] transition-colors no-underline"
                style={{ fontSize: 13, padding: "13px 26px", letterSpacing: "0.04em" }}
              >
                <ArrowRight size={13} /> Get Your FREE Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Spacer to give the section height on mobile */}
        <div className="invisible" style={{ paddingTop: hasCustomStudioBanner ? "clamp(320px, 42vw, 520px)" : "clamp(280px, 40vw, 480px)" }} />
      </section>

      {/* Product Grid */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-2">
            {category.name} <span className="text-accent">You&apos;ll Love</span>
          </h2>
          <p className="text-[13px] text-muted-foreground mb-8 font-sans leading-[1.78]">
            {products.length} styles, all fully customizable. Size, print, finish, everything.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
            {products.map((product) => {
              const productImg = (product.images && product.images.length > 0) ? product.images[0] : null;
              return (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className="group rounded-xl overflow-hidden hover-lift border border-border bg-card"
                >
                  <div className="aspect-square bg-muted overflow-hidden relative">
                    {productImg ? (
                      <Image
                        src={productImg}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package size={48} className="text-muted-foreground/30 group-hover:text-accent transition-colors duration-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-sans text-[12px] font-medium text-foreground group-hover:text-accent transition-colors leading-tight">
                      {product.name}
                    </h3>
                    <span className="inline-block mt-1.5 font-sans text-[11px] font-medium text-accent uppercase tracking-[0.08em]">
                      Get a Quote →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {isRigidBoxesPage && quoteFormSection}

      {brandContentSection}

      {isRigidBoxesPage ? (
        <>
          {faqSection}
          {whyScrollSection && (
            <section className="bg-[#f5f3ee] border-t border-[#e0ddd6] py-16 px-4 sm:px-10">
              <div className="max-w-[1100px] mx-auto">
                {whyScrollSection}
              </div>
            </section>
          )}
        </>
      ) : (
        <>
          {quoteFormSection}
          {faqSection}
        </>
      )}

      {relatedProducts.length > 0 && (
        <section className="section-padding bg-card border-t border-border">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-3xl font-display font-bold text-foreground">
                Related products
              </h2>

              {totalRelatedPages > 1 && (
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Previous related products"
                    onClick={() => scrollRelatedProducts(currentRelatedPage - 1)}
                    disabled={currentRelatedPage === 0}
                    className="rounded-full"
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Next related products"
                    onClick={() => scrollRelatedProducts(currentRelatedPage + 1)}
                    disabled={currentRelatedPage >= totalRelatedPages - 1}
                    className="rounded-full"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              )}
            </div>

            <div
              ref={relatedCarouselRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 lg:gap-6"
            >
              {relatedProducts.map((product: any) => {
                const productImg = (product.images && product.images.length > 0) ? product.images[0] : null;
                return (
                  <div
                    key={product.slug}
                    className="min-w-0 shrink-0 snap-start basis-[85%] sm:basis-[48%] lg:basis-[31%] xl:basis-[24%]"
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      className="group block overflow-hidden rounded-xl border border-border bg-card hover-lift"
                    >
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        {productImg ? (
                          <Image
                            src={productImg}
                            alt={product.name}
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, (max-width: 1280px) 31vw, 24vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Package size={48} className="text-muted-foreground/30 group-hover:text-accent transition-colors duration-300" />
                          </div>
                        )}
                      </div>
                      <div className="p-3 text-center">
                        <h3 className="font-display text-sm leading-tight text-foreground transition-colors group-hover:text-accent">
                          {product.name.replace("Custom ", "")}
                        </h3>
                        <span className="mt-1.5 inline-block text-xs font-bold text-accent">
                          Get a Quote &rarr;
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {totalRelatedPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  {Array.from({ length: totalRelatedPages }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Go to related products page ${index + 1}`}
                      onClick={() => scrollRelatedProducts(index)}
                      className={`h-1 rounded-full transition-all ${currentRelatedPage === index ? "w-12 bg-foreground" : "w-8 bg-muted/30 hover:bg-muted/60"}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <CTASection />
      <TrustpilotTestimonialsSection />
    </Layout>
  );
};

export default CategoryPage;