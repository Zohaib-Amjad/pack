"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { sanitizeHtml } from "@/lib/sanitize-html";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Feather,
  Leaf,
  Maximize,
  Package2,
  Palette,
  Printer,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
  Gift,
  Truck,
  Recycle,
  Award,
  Heart,
  Globe,
  Shield,
  Box,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ProductContent } from "@/types/product-content";

// ── Icon registry ────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  Palette, Leaf, Feather, Sparkles, ShieldCheck, Package2, Maximize,
  Printer, CheckCircle2, Clock3, Star, Zap, Gift, Truck, Recycle,
  Award, Heart, Globe, Shield, Box,
};

function DynamicIcon({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  const Icon = ICON_MAP[name] ?? Box;
  return <Icon size={size} className={className} />;
}

// ── Pill helpers ─────────────────────────────────────────────────────────────
const pillCls = "inline-flex items-center rounded-full border border-ds-input-border bg-ds-input-bg px-3 py-1 text-ds-caption font-medium text-ds-body";
const goldPillCls = "inline-flex items-center rounded-full border border-[#f5d5be] bg-[#fff5ee] px-3 py-1 text-ds-caption font-medium text-[#c45a18]";

function PillList({ items, gold = false }: { items: string[]; gold?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className={gold ? goldPillCls : pillCls}>{item}</span>
      ))}
    </div>
  );
}

// ── Props ────────────────────────────────────────────────────────────────────
interface Props {
  productName: string;
  /** Raw DB fields */
  stockInfo?: string;
  printingOptions?: string;
  finishingOptions?: string;
  proofInfo?: string;
  turnaroundTime?: string;
  sizeInfo?: string;
  minQuantity?: string;
  /** Structured content from product_content JSONB */
  content?: ProductContent;
  /** Rendered after feature/content cards, before article (e.g. testimonials) */
  afterCards?: ReactNode;
}

export default function ProductDynamicContent({
  productName,
  stockInfo,
  printingOptions,
  finishingOptions,
  proofInfo,
  turnaroundTime,
  sizeInfo,
  minQuantity,
  content = {},
  afterCards,
}: Props) {
  const {
    feature_items = [],
    content_blocks = [],
    article_sections = [],
    material_items = [],
    perk_items = [],
    spec_overrides = {},
  } = content;

  // ── Spec table rows ──────────────────────────────────────────────────────
  const printingList = spec_overrides.printing_options_list
    ?? (printingOptions ? printingOptions.split(",").map((s) => s.trim()).filter(Boolean) : []);

  const finishingList = spec_overrides.finishing_options_list
    ?? (finishingOptions ? finishingOptions.split(",").map((s) => s.trim()).filter(Boolean) : []);

  const materialsList = stockInfo ? stockInfo.split(",").map((s) => s.trim()).filter(Boolean) : [];

  const specRows: { iconName: string; label: string; value: ReactNode }[] = [
    {
      iconName: "Maximize",
      label: "Custom Dimensions",
      value: spec_overrides.dimension_info ?? sizeInfo ?? "Available in all custom sizes and shapes",
    },
    {
      iconName: "Printer",
      label: "Printing Options",
      value: printingList.length > 0
        ? <PillList items={printingList} />
        : "CMYK, PMS (Pantone), Digital & Offset printing available",
    },
    {
      iconName: "Sparkles",
      label: "Finishing & Coating",
      value: finishingList.length > 0
        ? <PillList items={finishingList} gold />
        : "Gloss, Matte, Soft-Touch, Spot UV, Foil Stamping, Embossing",
    },
    {
      iconName: "Package2",
      label: "Stock & Materials",
      value: materialsList.length > 0
        ? <PillList items={materialsList} />
        : "Eco-friendly Kraft, Corrugated, Cardstock, Rigid Board",
    },
    {
      iconName: "CheckCircle2",
      label: "Proofing Process",
      value: proofInfo ?? "Free digital 2D/3D proof with unlimited revisions",
    },
    {
      iconName: "Clock3",
      label: "Turnaround Time",
      value: (
        <div className="flex flex-wrap items-center gap-3">
          <span>{spec_overrides.turnaround_label ?? turnaroundTime ?? "8–10 business days"}</span>
          {(spec_overrides.rush_available ?? true) && (
            <span className="inline-flex items-center rounded-full border border-[#f5d5be] bg-[#fff5ee] px-3 py-1 text-ds-caption font-semibold uppercase tracking-ds-eyebrow text-[#c45a18]">
              Rush Available
            </span>
          )}
        </div>
      ),
    },
  ];

  // ── Article body ─────────────────────────────────────────────────────────
  function renderSection(s: (typeof article_sections)[number], i: number) {
    if (s.level === "divider") return <div key={i} className="h-px bg-[#e0ddd6]" />;

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

    if (s.level === "h1") return (
      <h1 key={i} className="font-display text-ds-heading font-semibold text-ds-ink" dangerouslySetInnerHTML={{ __html: html }} />
    );
    if (s.level === "h2") return (
      <h2 key={i} className="font-display text-ds-heading font-semibold text-ds-ink" dangerouslySetInnerHTML={{ __html: html }} />
    );
    if (s.level === "h3") return (
      <h3 key={i} className="font-display text-ds-subhead font-semibold text-ds-ink" dangerouslySetInnerHTML={{ __html: html }} />
    );
    if (s.level === "h4") return (
      <h4 key={i} className="font-sans text-ds-card font-semibold text-ds-ink" dangerouslySetInnerHTML={{ __html: html }} />
    );
    if (s.level === "h5") return (
      <h5 key={i} className="font-sans text-ds-body font-semibold text-ds-body" dangerouslySetInnerHTML={{ __html: html }} />
    );
    if (s.level === "h6") return (
      <h6 key={i} className="font-sans text-ds-eyebrow font-medium uppercase tracking-ds-eyebrow text-ds-muted" dangerouslySetInnerHTML={{ __html: html }} />
    );
    return <div key={i} className="font-sans text-ds-body text-ds-body" dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return (
    <>
      {/* ── Specification Table ─────────────────────────────────────────── */}
      <section className="border-t border-[#e0ddd6] bg-[#faf8f5] py-12 sm:py-14 lg:py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-ds-eyebrow uppercase text-accent">
                  Packaging details
                </p>
                <h2 className="font-display text-ds-heading font-semibold text-foreground">
                  Product Specification
                </h2>
              </div>
              <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-ds-border bg-ds-card-bg px-3 py-2 text-ds-eyebrow font-bold uppercase tracking-[0.12em] text-ds-muted sm:px-4">
                <ShieldCheck size={14} className="text-accent" />
                Complete packaging overview
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[#e6e1d8] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
              {specRows.map((row, index) => (
                <div
                  key={row.label}
                  className={`grid gap-2 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-[220px_1fr] lg:gap-6 ${
                    index !== specRows.length - 1 ? "border-b border-[#ece9e2]" : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-ds-spec-key font-medium text-ds-ink lg:items-start lg:pt-1">
                    <DynamicIcon name={row.iconName} size={16} className="text-accent" />
                    <span>{row.label}</span>
                  </div>
                  <div className="min-w-0 text-ds-spec-val text-ds-body">{row.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features + Content Blocks ─────────────────────────────────── */}
      {(feature_items.length > 0 || content_blocks.length > 0) && (
        <section className="border-t border-[#e0ddd6] bg-[#faf8f5] py-14 sm:py-16 lg:py-20">
          <div className="container-max px-4 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:gap-16">

              {/* Feature items */}
              {feature_items.length > 0 && (
                <div className="grid gap-5 border-b border-[#e0ddd6] pb-6 sm:grid-cols-2 xl:grid-cols-3 md:gap-6 lg:gap-8">
                  {feature_items.map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#f5d5be] bg-[#faf8f5]">
                        <DynamicIcon name={item.icon} size={20} className="text-accent" />
                      </div>
                      <div>
                        <p className="mb-1 text-ds-body font-semibold text-ds-ink">{item.title}</p>
                        <p className="text-ds-product leading-6 text-ds-muted">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Content blocks (image + text pairs) */}
              {content_blocks.map((block) => (
                <div key={block.heading} className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                  <div className={block.flipped ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
                    <div className="flex flex-col gap-4">
                      <h3 className="font-display text-ds-subhead font-semibold leading-tight text-ds-ink">
                        {block.heading}
                      </h3>
                      <p className="font-sans text-ds-body text-ds-body">{block.body}</p>
                      {block.linkLabel && (
                        <a
                          href="#quote"
                          className="inline-flex w-fit items-center gap-2 border-b border-[#f5d5be] pb-1 text-ds-product font-semibold uppercase tracking-ds-product text-accent transition-colors hover:text-[#c45a18]"
                        >
                          {block.linkLabel}
                          <ArrowRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className={block.flipped ? "order-1 lg:order-1" : "order-1 lg:order-2"}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] border border-[#e6e1d8] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.05)]">
                      <Image
                        src={block.image}
                        alt={block.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* After feature/content cards — e.g. Trustpilot testimonials on product pages */}
      {afterCards}

      {/* Article body — full content + scroll, no Read More */}
      {article_sections.length > 0 && (
        <section className="border-t border-[#e0ddd6] bg-[#faf8f5] py-14 sm:py-16 lg:py-20">
          <div className="container-max px-4 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="rounded-[20px] border border-[#e0ddd6] bg-white px-4 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] sm:px-6 sm:py-8 lg:px-8 xl:px-10">
                <div className="article-body flex flex-col gap-4">
                  <div className="article-scroll max-h-[420px] overflow-y-auto overscroll-contain pr-2 sm:max-h-[480px]">
                    <div className="flex flex-col gap-4 pb-1">
                      {article_sections.map(renderSection)}

                      {material_items.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {material_items.map((item) => (
                            <div
                              key={item}
                              className="inline-flex items-center gap-2 rounded-[10px] border border-ds-input-border bg-ds-input-bg px-4 py-2 text-ds-product font-medium text-ds-body"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                              {item}
                            </div>
                          ))}
                        </div>
                      )}

                      {perk_items.length > 0 && (
                        <div className="grid overflow-hidden rounded-[12px] border border-[#e0ddd6] sm:grid-cols-2">
                          {perk_items.map((item, index) => (
                            <div
                              key={item}
                              className={`flex items-center gap-2.5 px-4 py-3 text-ds-body text-ds-body ${
                                index % 2 === 0 ? "border-r border-[#e0ddd6]" : ""
                              } ${index < perk_items.length - 2 ? "border-b border-[#e0ddd6]" : ""}`}
                            >
                              <CheckCircle2 size={16} className="text-accent shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}