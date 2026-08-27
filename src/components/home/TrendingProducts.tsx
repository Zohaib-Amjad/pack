"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BIG_PRODUCT = {
  name: "3.5 Mylar Bags",
  slug: "3.5-mylar-bags",
  image: "/images/products/89e1f25c-2e6b-4176-83fa-97f9f7ce5f23.jpg",
};

const SMALL_PRODUCTS = [
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

const TrendingProducts = () => {
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
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7a7672] mb-1">
                Trending
              </p>
              <h2 className="font-sans text-[#1a1a1a]" style={{ fontSize: 26, fontWeight: 700 }}>
                Trending <span style={{ color: "rgb(232, 115, 42)" }}>Now</span>
              </h2>
            </div>
            <Link
              className="hidden sm:block font-sans font-semibold text-[#e8732a] uppercase border-b border-[#f5c8a8] pb-px hover:text-[#c45a18] transition-colors"
              href="/catalog"
              style={{ fontSize: 12, letterSpacing: "0.06em" }}
            >
              <strong>See all →</strong>
            </Link>
          </div>

          {/* Desktop Bento Grid (5fr 4fr) */}
          <div className="hidden sm:grid" style={{ gridTemplateColumns: "5fr 4fr", gap: 4 }}>
            {/* Big tile */}
            <Link
              className="group relative overflow-hidden cursor-pointer bg-[#ece9e2]"
              href={`/product/${BIG_PRODUCT.slug}`}
              style={{ borderRadius: "10px 0px 0px 10px", height: 390 }}
            >
              <Image
                alt={BIG_PRODUCT.name}
                loading="lazy"
                fill
                className="object-cover transition-transform duration-400 group-hover:scale-[1.05]"
                sizes="55vw"
                src={BIG_PRODUCT.image}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 55%)" }}
              />
              <div className="absolute bottom-4 left-4">
                <p className="font-sans font-bold text-white" style={{ fontSize: 20 }}>
                  {BIG_PRODUCT.name}
                </p>
              </div>
            </Link>

            {/* Right 2x3 grid */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "repeat(3, 1fr)",
                gap: 4,
                height: 390,
              }}
            >
              {SMALL_PRODUCTS.map((p) => (
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
                href="/catalog"
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
          </div>

          {/* Mobile Vertical List + 2-col Grid */}
          <div className="sm:hidden flex flex-col gap-3">
            {/* Big card */}
            <Link
              className="group relative rounded-[10px] overflow-hidden bg-[#ece9e2] block"
              href={`/product/${BIG_PRODUCT.slug}`}
              style={{ aspectRatio: "16 / 10" }}
            >
              <Image
                alt={BIG_PRODUCT.name}
                loading="lazy"
                fill
                className="object-cover transition-transform duration-400 group-hover:scale-[1.05]"
                sizes="92vw"
                src={BIG_PRODUCT.image}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 55%)" }}
              />
              <div className="absolute bottom-4 left-4">
                <p className="font-sans font-bold text-white text-[16px]">{BIG_PRODUCT.name}</p>
              </div>
            </Link>

            {/* 2-col grid */}
            <div className="grid grid-cols-2 gap-3">
              {SMALL_PRODUCTS.map((p) => (
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
                    className="object-cover transition-transform duration-400 group-hover:scale-[1.05]"
                    sizes="46vw"
                    src={p.image}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 55%)" }}
                  />
                  <div className="absolute bottom-3 left-3">
                    <p className="font-sans font-bold text-white text-[12.5px]">{p.name}</p>
                  </div>
                </Link>
              ))}

              {/* Green See all card */}
              <Link
                className="flex flex-col items-center justify-center gap-1.5 rounded-[10px]"
                href="/catalog"
                style={{ background: "rgb(45, 92, 62)", aspectRatio: "4 / 3", padding: 12 }}
              >
                <ArrowRight size={20} color="#e8732a" strokeWidth={2.5} />
                <p className="font-sans font-bold text-white text-center text-[12px] leading-tight">
                  View All Products
                </p>
                <small className="font-sans text-white/60 text-center text-[9.5px]">
                  20+ box types
                </small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;