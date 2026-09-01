"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCmsHome } from "@/hooks/useCms";
import { getAllProducts } from "@/data/products";
import type { CmsHome } from "@/types/cms";

const DEFAULT_BIG_PRODUCT = {
  name: "3.5 Mylar Bags",
  slug: "3.5-mylar-bags",
  image: "/images/products/89e1f25c-2e6b-4176-83fa-97f9f7ce5f23.jpg",
};

const DEFAULT_SMALL_PRODUCTS = [
  {
    name: "Black Tube Packaging",
    slug: "black-tube-packaging",
    image: "/images/products/87b17739-33e7-484c-b955-5c367d976ccb.jpg",
    radius: "0px 10px 0px 0px",
  },
  {
    name: "Blank Cigarette Boxes",
    slug: "blank-cigarette-boxes",
    image: "/images/products/77ffb43c-6cbe-4fed-a272-41bc8a6f0ba9.jpg",
    radius: "0px",
  },
  {
    name: "Blunt Packaging",
    slug: "blunt-packaging",
    image: "/images/products/1a64ecc7-eb56-48b1-b439-add175ad2fda.jpg",
    radius: "0px",
  },
  {
    name: "Candle Display Boxes",
    slug: "candle-display-boxes",
    image: "/images/products/5f720473-6b0e-480b-8262-4dfd67e8f798.jpg",
    radius: "0px",
  },
  {
    name: "Candle Dust Covers",
    slug: "candle-dust-covers",
    image: "/images/products/7ad4a28c-96ed-47b2-80b6-9853082108bd.jpg",
    radius: "0px",
  },
];

type TrendingProductsProps = {
  cms?: CmsHome;
};

const TrendingProducts = ({ cms }: TrendingProductsProps) => {
  const { data } = useCmsHome(cms);
  const rp = data?.relatedProducts || cms?.relatedProducts;

  const allCatalogProducts = useMemo(() => getAllProducts(), []);

  if (rp?.enabled === false) return null;

  const sectionLabel = rp?.sectionLabel ?? "Trending";
  const titleLead = rp?.titleLead ?? "Trending";
  const titleAccent = rp?.titleAccent ?? "Now";
  const viewAllLabel = rp?.viewAllLabel ?? "See all";
  const viewAllHref = rp?.viewAllHref ?? "/catalog";
  const selectedProductNames = rp?.selectedProductIds || [];

  // Match ONLY the products the user explicitly ticked
  const matchedProducts = useMemo(() => {
    const selectedList: { name: string; slug: string; image: string }[] = [];
    const usedSlugs = new Set<string>();

    // 1. Add explicitly ticked products in manual selection order
    selectedProductNames.forEach((query) => {
      const q = query.toLowerCase().trim();
      const found = allCatalogProducts.find(
        (p) =>
          p.name.toLowerCase() === q ||
          p.slug.toLowerCase() === q ||
          p.name.toLowerCase().includes(q)
      );
      if (found && !usedSlugs.has(found.slug)) {
        usedSlugs.add(found.slug);
        selectedList.push({
          name: found.name,
          slug: found.slug,
          image: found.image || "/images/products/89e1f25c-2e6b-4176-83fa-97f9f7ce5f23.jpg",
        });
      }
    });

    // 2. If ZERO products are ticked AND auto-fill is enabled, fallback to defaults
    if (selectedList.length === 0 && rp?.autoFillWhenEmpty !== false) {
      const defaults = [DEFAULT_BIG_PRODUCT, ...DEFAULT_SMALL_PRODUCTS];
      defaults.forEach((d) => {
        if (!usedSlugs.has(d.slug)) {
          usedSlugs.add(d.slug);
          selectedList.push(d);
        }
      });
    }

    return selectedList;
  }, [allCatalogProducts, selectedProductNames, rp?.autoFillWhenEmpty]);

  if (matchedProducts.length === 0) return null;

  const bigProduct = matchedProducts[0];
  const smallProducts = matchedProducts.slice(1, 6).map((p, idx) => ({
    ...p,
    radius: idx === 0 ? "0px 10px 0px 0px" : "0px",
  }));

  const hasSmallProducts = smallProducts.length > 0;

  return (
    <div>
      <div className="bg-white border-t border-b border-[#e0ddd6] px-4 sm:px-10 py-12 sm:py-[56px]">
        <div style={{ maxWidth: 1100, margin: "0px auto" }}>
          {/* Header */}
          <div
            className="flex flex-col sm:flex-row items-center sm:items-end justify-center sm:justify-between text-center sm:text-left"
            style={{ marginBottom: 24 }}
          >
            <div className="flex flex-col items-center sm:items-start">
              {sectionLabel && (
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7a7672] mb-1">
                  {sectionLabel}
                </p>
              )}
              <h2 className="font-sans text-[#1a1a1a]" style={{ fontSize: 26, fontWeight: 700 }}>
                {titleLead} {titleAccent && <span style={{ color: "rgb(232, 115, 42)" }}>{titleAccent}</span>}
              </h2>
            </div>
            <Link
              className="hidden sm:block font-sans font-semibold text-[#e8732a] uppercase border-b border-[#f5c8a8] pb-px hover:text-[#c45a18] transition-colors"
              href={viewAllHref}
              style={{ fontSize: 12, letterSpacing: "0.06em" }}
            >
              <strong>{viewAllLabel} →</strong>
            </Link>
          </div>

          {/* Desktop Bento Grid */}
          <div
            className="hidden sm:grid"
            style={{
              gridTemplateColumns: hasSmallProducts ? "5fr 4fr" : "1fr",
              gap: 4,
            }}
          >
            {/* Big tile */}
            <Link
              className="group relative overflow-hidden cursor-pointer bg-[#ece9e2]"
              href={`/product/${bigProduct.slug}`}
              style={{
                borderRadius: hasSmallProducts ? "10px 0px 0px 10px" : "10px",
                height: 390,
              }}
            >
              <Image
                alt={bigProduct.name}
                loading="lazy"
                fill
                className="object-cover transition-transform duration-400 group-hover:scale-[1.05]"
                sizes="55vw"
                src={bigProduct.image}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 55%)" }}
              />
              <div className="absolute bottom-4 left-4">
                <p className="font-sans font-bold text-white" style={{ fontSize: 20 }}>
                  {bigProduct.name}
                </p>
              </div>
            </Link>

            {/* Right side products grid (only shown if other products are ticked) */}
            {hasSmallProducts && (
              <div
                className="grid"
                style={{
                  gridTemplateColumns: smallProducts.length > 2 ? "1fr 1fr" : "1fr",
                  gridTemplateRows: `repeat(${Math.max(1, Math.min(3, Math.ceil((smallProducts.length + 1) / 2)))}, 1fr)`,
                  gap: 4,
                  height: 390,
                }}
              >
                {smallProducts.map((p) => (
                  <Link
                    key={p.slug}
                    className="group relative overflow-hidden cursor-pointer bg-[#ece9e2]"
                    href={`/product/${p.slug}`}
                    style={{ borderRadius: p.radius }}
                  >
                    <Image
                      alt={p.name}
                      loading="lazy"
                      fill
                      className="object-cover transition-transform duration-400 group-hover:scale-[1.05]"
                      sizes="20vw"
                      src={p.image}
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 55%)" }}
                    />
                    <div className="absolute bottom-3 left-3">
                      <p className="font-sans font-bold text-white" style={{ fontSize: 13 }}>
                        {p.name}
                      </p>
                    </div>
                  </Link>
                ))}

                {/* View all card */}
                <Link
                  className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                  href={viewAllHref}
                  style={{ background: "rgb(45, 92, 62)", borderRadius: "0px 0px 10px", padding: 20 }}
                >
                  <ArrowRight size={26} color="#e8732a" strokeWidth={2.5} />
                  <p className="font-sans font-bold text-white text-center" style={{ fontSize: 13 }}>
                    View All Products
                  </p>
                  <small className="font-sans text-white/60 text-center" style={{ fontSize: "10.5px" }}>
                    20+ box types
                  </small>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile list */}
          <div className="flex flex-col gap-3 sm:hidden">
            {/* Big tile */}
            <Link
              className="group relative rounded-[10px] overflow-hidden bg-[#ece9e2] block"
              href={`/product/${bigProduct.slug}`}
              style={{ height: 220 }}
            >
              <Image
                alt={bigProduct.name}
                loading="lazy"
                fill
                className="object-cover transition-transform duration-350 group-hover:scale-105"
                sizes="100vw"
                src={bigProduct.image}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 55%)" }}
              />
              <div className="absolute bottom-3 left-3">
                <p className="font-sans font-bold text-white" style={{ fontSize: 16 }}>
                  {bigProduct.name}
                </p>
              </div>
            </Link>

            {/* Small products grid */}
            {hasSmallProducts && (
              <div className="grid grid-cols-2 gap-3">
                {smallProducts.map((p) => (
                  <Link
                    key={p.slug}
                    className="group relative rounded-[10px] overflow-hidden bg-[#ece9e2] block"
                    href={`/product/${p.slug}`}
                    style={{ aspectRatio: "4 / 3" }}
                  >
                    <Image
                      alt={p.name}
                      loading="lazy"
                      fill
                      className="object-cover transition-transform duration-350 group-hover:scale-105"
                      sizes="50vw"
                      src={p.image}
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 55%)" }}
                    />
                    <div className="absolute bottom-2.5 left-2.5">
                      <p className="font-sans font-bold text-white" style={{ fontSize: 12 }}>
                        {p.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile View all button */}
            <Link
              className="mt-2 flex items-center justify-center gap-2 rounded-[8px] py-3 text-center font-sans font-bold text-white shadow-sm"
              href={viewAllHref}
              style={{ background: "#2d5c3e", fontSize: 13 }}
            >
              <span>See All Products</span>
              <ArrowRight size={14} color="#e8732a" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;