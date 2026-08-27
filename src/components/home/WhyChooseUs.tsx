"use client";

import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";

const KRAFT_PRODUCTS = [
  {
    id: "kraft-1",
    name: "Kraft Tin Tie Bags",
    slug: "kraft-tin-tie-bags",
    badge: "Popular",
    image: "/images/products/d8efd675-eaef-420e-a49f-85d408303d55.jpg",
  },
  {
    id: "kraft-2",
    name: "Kraft Paper Tubes",
    slug: "kraft-paper-tubes",
    badge: null,
    image: "/images/products/8dffc711-913a-42f7-8487-370ec897939e.jpg",
  },
  {
    id: "kraft-3",
    name: "White Kraft Boxes",
    slug: "white-kraft-boxes",
    badge: null,
    image: "/images/products/dae63e62-b339-4047-b6ef-cf395b5dc13f.jpg",
  },
  {
    id: "kraft-4",
    name: "Kraft Boxes With Lids",
    slug: "kraft-boxes-with-lids",
    badge: null,
    image: "/images/products/20c20026-81fd-4c59-9f93-68b40015c9a1.jpg",
  },
];

const WhyChooseUs = () => {
  return (
    <div>
      <div className="bg-white border-t border-[#e0ddd6] px-4 sm:px-10 py-12 sm:py-[64px]">
        <div className="mx-auto" style={{ maxWidth: "1100px" }}>
          <div className="grid gap-10 lg:gap-14" style={{ gridTemplateColumns: "1fr" }}>
            <style>{`@media(min-width:1024px){ .why-inner { grid-template-columns: 1fr 1fr !important; } }`}</style>
            <div className="why-inner grid gap-10 lg:gap-14" style={{ gridTemplateColumns: "1fr" }}>

              {/* LEFT: Text & Value Propositions */}
              <div>
                <h2
                  className="font-display text-[#1a1a1a]"
                  style={{ fontSize: "22px", fontWeight: 700, lineHeight: 1.3, marginBottom: "14px" }}
                >
                  Good Packaging Shouldn’t Cost The Earth{" "}
                  <span className="text-[#e8732a]">Shop with us for a Greener Future</span>
                </h2>
                <p
                  className="font-sans text-[#5a5652]"
                  style={{ fontSize: "13px", lineHeight: 1.75, marginBottom: "24px" }}
                >
                  For a sustainable future and a greener Earth, HOF Pack offers recyclable materials, a minimalist branding trend, and a cost-effective solution to your plastic-free packaging. We use recycled materials, soy-based inks, and work with FSC-certified suppliers.
                </p>

                <div style={{ marginBottom: "18px", paddingBottom: "18px", borderBottom: "1px solid rgb(240, 237, 230)" }}>
                  <div className="font-sans font-bold text-[#1a1a1a]" style={{ fontSize: "13px", marginBottom: "4px" }}>
                    Eco-Friendly Packaging That Builds Customer Trust
                  </div>
                  <div className="font-sans text-[#5a5652]" style={{ fontSize: "12.5px", lineHeight: 1.65 }}>
                    Going green is no longer a trend or differentiation point; it has become a necessity because it&apos;s the right thing to do.
                  </div>
                </div>

                <div style={{ marginBottom: "18px", paddingBottom: "18px", borderBottom: "1px solid rgb(240, 237, 230)" }}>
                  <div className="font-sans font-bold text-[#1a1a1a]" style={{ fontSize: "13px", marginBottom: "4px" }}>
                    Strong Yet Lightweight
                  </div>
                  <div className="font-sans text-[#5a5652]" style={{ fontSize: "12.5px", lineHeight: 1.65 }}>
                    Our Kraft boxes are sturdy, light, and perfect for candles, food, and everyday retail products.
                  </div>
                </div>

                <div style={{ marginBottom: "0px", paddingBottom: "0px", borderBottomWidth: "medium", borderBottomStyle: "none", borderBottomColor: "currentColor" }}>
                  <div className="font-sans font-bold text-[#1a1a1a]" style={{ fontSize: "13px", marginBottom: "4px" }}>
                    A Natural Look That Elevates Brand Identity
                  </div>
                  <div className="font-sans text-[#5a5652]" style={{ fontSize: "12.5px", lineHeight: 1.65 }}>
                    Minimalist kraft packaging is a growing trend — and one of the most effective ways to tell your brand&apos;s sustainability story.
                  </div>
                </div>

                <Link
                  href="/custom-kraft-boxes"
                  className="inline-flex items-center justify-center gap-1.5 font-sans font-semibold text-white rounded-md w-full sm:w-auto"
                  style={{
                    marginTop: "20px",
                    background: "rgb(232, 115, 42)",
                    fontSize: "12px",
                    padding: "10px 22px",
                    textDecoration: "none",
                  }}
                >
                  View Eco-Friendly Products →
                </Link>
              </div>

              {/* RIGHT: 2×2 Product Grid */}
              <div className="grid gap-2.5" style={{ gridTemplateColumns: "1fr 1fr" }}>
                {KRAFT_PRODUCTS.map((p) => {
                  const img = p.image;
                  return (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      className="group relative rounded-[10px] overflow-hidden cursor-pointer bg-[#ece9e2]"
                      style={{ aspectRatio: "4 / 3" }}
                    >
                      {img ? (
                        <Image
                          src={img}
                          alt={p.name}
                          fill
                          className="object-cover transition-transform duration-350 group-hover:scale-105"
                          sizes="(max-width:1024px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package size={32} className="text-[#aaa6a0]" />
                        </div>
                      )}
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 55%)" }}
                      />
                      <div className="absolute bottom-3 left-3">
                        <p className="font-sans font-bold text-white" style={{ fontSize: "12.5px", marginBottom: "2px" }}>
                          {p.name}
                        </p>
                        {p.badge && (
                          <span
                            className="font-sans font-semibold text-white uppercase"
                            style={{
                              fontSize: "9px",
                              letterSpacing: "0.06em",
                              padding: "2px 7px",
                              borderRadius: "4px",
                              background: "rgb(232, 115, 42)",
                            }}
                          >
                            {p.badge}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;