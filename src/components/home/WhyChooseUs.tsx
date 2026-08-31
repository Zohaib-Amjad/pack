"use client";

import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";
import { useCmsHome } from "@/hooks/useCms";
import type { CmsHome } from "@/types/cms";

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

type WhyChooseUsProps = {
  cms?: CmsHome;
};

const WhyChooseUs = ({ cms }: WhyChooseUsProps) => {
  const { data } = useCmsHome(cms);
  const why = data?.whyUs || cms?.whyUs;

  const sectionLabel = why?.sectionLabel;
  const titleLead = why?.titleLead ?? "Good Packaging Shouldn’t Cost The Earth";
  const titleAccent = why?.titleAccent ?? "Shop with us for a Greener Future";
  const description =
    why?.description ??
    "For a sustainable future and a greener Earth, HOF Pack offers recyclable materials, a minimalist branding trend, and a cost-effective solution to your plastic-free packaging. We use recycled materials, soy-based inks, and work with FSC-certified suppliers.";

  const ctaLabel = why?.ctaLabel || "View Eco-Friendly Products";
  const ctaHref = why?.ctaHref || "/custom-kraft-boxes";

  const rawCards = Array.isArray(why?.cards) ? why.cards : [];
  const activeCards = rawCards.filter((c) => c.active !== false && (c.title || c.desc));

  return (
    <div>
      <div className="bg-white border-t border-[#e0ddd6] px-4 sm:px-10 py-12 sm:py-[64px]">
        <div className="mx-auto" style={{ maxWidth: "1100px" }}>
          <div className="grid gap-10 lg:gap-14" style={{ gridTemplateColumns: "1fr" }}>
            <style>{`@media(min-width:1024px){ .why-inner { grid-template-columns: 1fr 1fr !important; } }`}</style>
            <div className="why-inner grid gap-10 lg:gap-14" style={{ gridTemplateColumns: "1fr" }}>

              {/* LEFT: Heading, Description, Cards & CTA */}
              <div>
                {sectionLabel && (
                  <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#e8732a] mb-1.5">
                    {sectionLabel}
                  </p>
                )}
                {(titleLead || titleAccent) && (
                  <h2
                    className="font-display text-[#1a1a1a]"
                    style={{ fontSize: "24px", fontWeight: 700, lineHeight: 1.3, marginBottom: "14px" }}
                  >
                    {titleLead}{" "}
                    {titleAccent && <span className="text-[#e8732a]">{titleAccent}</span>}
                  </h2>
                )}
                {description && (
                  <p
                    className="font-sans text-[#5a5652]"
                    style={{ fontSize: "13px", lineHeight: 1.75, marginBottom: "24px" }}
                  >
                    {description}
                  </p>
                )}

                {/* Why Us Cards (Dynamic from /admin/cms/home/why-us) */}
                {activeCards.map((card, index) => {
                  const isLast = index === activeCards.length - 1;
                  return (
                    <div
                      key={card.id || index}
                      style={{
                        marginBottom: isLast ? "0px" : "18px",
                        paddingBottom: isLast ? "0px" : "18px",
                        borderBottom: isLast ? "none" : "1px solid rgb(240, 237, 230)",
                      }}
                    >
                      {card.title && (
                        <div className="font-sans font-bold text-[#1a1a1a]" style={{ fontSize: "13px", marginBottom: "4px" }}>
                          {card.title}
                        </div>
                      )}
                      {card.desc && (
                        <div className="font-sans text-[#5a5652]" style={{ fontSize: "12.5px", lineHeight: 1.65 }}>
                          {card.desc}
                        </div>
                      )}
                    </div>
                  );
                })}

                {ctaLabel && (
                  <div className="flex flex-wrap items-center gap-4 mt-6">
                    <Link
                      href={ctaHref}
                      className="inline-flex items-center justify-center gap-1.5 font-sans font-semibold text-white rounded-md w-full sm:w-auto hover:bg-[#c45a18] transition-colors"
                      style={{
                        background: "rgb(232, 115, 42)",
                        fontSize: "12px",
                        padding: "10px 22px",
                        textDecoration: "none",
                      }}
                    >
                      {ctaLabel} →
                    </Link>
                  </div>
                )}
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