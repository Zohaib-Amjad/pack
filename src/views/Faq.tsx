"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";

type Faq = {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  artwork_section: string | null;
};

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  const { data: faqs = [], isLoading } = useQuery<Faq[]>({
    queryKey: ["public", "faqs", "artwork-guidelines"],
    queryFn: async () => {
      const supabase = createPublicClient();
      const { data, error } = await withAbortableTimeout((signal) =>
        (supabase
          .from("faqs" as any)
          .select("id, question, answer, display_order, artwork_section")
          .eq("is_published", true)
          .is("category_id", null)
          .is("product_id", null)
          .order("display_order", { ascending: true })
          .abortSignal(signal) as any)
      ) as any;
      if (error) throw error;
      return data || [];
    },
  });

  const globalFaqs = faqs.filter(f => !f.artwork_section);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <Layout>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#e8ede5", marginTop: "-112px" }}
      >
        <style>{`
          @media (max-width: 1023px) { .faq-hero-section { margin-top: -80px !important; } }
          .faq-hero-text { position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; text-align: center; padding: 172px 24px 0; }
          @media (max-width: 1023px) { .faq-hero-text { padding-top: 132px; } }
          @media (max-width: 640px) { .faq-hero-text { padding-top: 110px; } .faq-hero-para { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; } }
        `}</style>

        {/* Image — full width, natural height */}
        <Image
          src="/Premium custom packaging by HOF Pack.png"
          alt=""
          width={1440}
          height={693}
          className="w-full h-auto pointer-events-none select-none block"
          priority
          aria-hidden="true"
          style={{ display: "block" }}
        />

        {/* Text overlay */}
        <div className="faq-hero-section faq-hero-text w-full"
          style={{ maxWidth: "100%" }}
        >
          <h1
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 5.1vw, 73.61px)",
              lineHeight: "clamp(44px, 5.5vw, 79.5px)",
              letterSpacing: 0,
              color: "#1A1A1A",
              marginBottom: 20,
            }}
          >
            Artwork{" "}
            <span style={{ color: "#E8732A" }}>Guidelines</span>
          </h1>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(18px, 1.7vw, 24.54px)",
              lineHeight: "clamp(26px, 2.5vw, 36.5px)",
              letterSpacing: 0,
              color: "#1A1A1AEB",
              maxWidth: 720,
            }}
          >
            <span className="faq-hero-para">Need help with your HOF Packs artwork or dielines? Find all the answers you need here.</span>
          </p>
        </div>
      </section>

      {/* ── 8 Rules Section ── */}
      <section
        className="py-16 sm:py-20"
        style={{ background: "#F6F4EF" }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10">
          {/* Heading */}
          <h2
            className="text-center"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 3.5vw, 48px)",
              lineHeight: "1.2",
              color: "#1A1A1A",
              marginBottom: 4,
            }}
          >
            8 Rules for Preparing{" "}
            <span style={{ color: "#E8732A", whiteSpace: "nowrap" }}>Artwork Files</span>
          </h2>
          <p
            className="text-center mx-auto"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 300,
              fontSize: 18,
              lineHeight: "140%",
              color: "#1A1A1A",
              maxWidth: 520,
              marginBottom: 48,
            }}
          >
            Follow these simple artwork guidelines to ensure your custom packaging
            is printed accurately and without delays.
          </p>

          {/* 4x2 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              {
                img: "/Design (1).png",
                step: "STEP 01",
                title: "File Formats",
                body: "Submit artwork in AI, PDF, or EPS format for the best printing results.",
              },
              {
                img: "/Design.png",
                step: "STEP 02",
                title: "Color Mode",
                body: "Design all artwork in CMYK color mode to achieve accurate printed colors.",
              },
              {
                img: "/Design (2).png",
                step: "STEP 03",
                title: "Fonts & Text",
                body: "Convert all fonts to outlines and ensure text is clear and readable.",
              },
              {
                img: "/Design (3).png",
                step: "STEP 04",
                title: "Special Finishes",
                body: "Create separate layers for foil stamping, embossing, debossing, and Spot UV effects.",
              },
              {
                img: "/Design (4).png",
                step: "STEP 05",
                title: "Dielines",
                body: "Do not resize, move, or modify the HOF Packs dieline template.",
              },
              {
                img: "/Design (5).png",
                step: "STEP 06",
                title: "Line Thickness",
                body: "Keep all strokes and lines at a minimum thickness of 0.25 pt.",
              },
              {
                img: "/Design (6).png",
                step: "STEP 07",
                title: "Images",
                body: "Embed all linked images before submitting your artwork files.",
              },
              {
                img: "/Design (7).png",
                step: "STEP 08",
                title: "Resolution",
                body: "Use images and graphics with a minimum resolution of 300 DPI for sharp, professional printing.",
              },
            ].map((card) => (
              <div
                key={card.step}
                style={{
                  background: "#FFFFFF",
                  boxShadow: "4px 4px 6.6px 0px #00000026",
                  borderRadius: 16,
                  borderRight: "1px solid #E8E8E8",
                  borderBottom: "1px solid #E8E8E8",
                  borderLeft: "1px solid #E8E8E8",
                  padding: 20,
                  minHeight: 281,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {/* Icon — uses its own background from the image file */}
                <Image
                  src={card.img}
                  alt={card.title}
                  width={48}
                  height={48}
                  style={{
                    borderRadius: 12,
                    objectFit: "contain",
                    padding: 0,
                  }}
                />

                {/* Step label */}
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    color: "#888",
                    marginBottom: -8,
                  }}
                >
                  {card.step}
                </p>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    lineHeight: "26.7px",
                    color: "#E8732A",
                    margin: 0,
                  }}
                >
                  {card.title}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 500,
                    fontSize: 18,
                    lineHeight: "140%",
                    color: "#1A1A1A",
                    margin: 0,
                  }}
                >
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Artwork & Print FAQs Section ── */}
      <section
        className="py-12 sm:py-16"
        style={{ background: "#F6F4EF" }}
      >
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10">

          {/* Section heading */}
          <h2
            className="text-center"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 3.5vw, 48px)",
              lineHeight: "1.2",
              color: "#1A1A1A",
              marginBottom: 4,
            }}
          >
            Artwork &amp; Print{" "}
            <span style={{ color: "#E8732A" }}>FAQs</span>
          </h2>
          <p
            className="text-center mx-auto"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 300,
              fontSize: 18,
              lineHeight: "140%",
              color: "#1A1A1A",
              maxWidth: 520,
              marginBottom: 56,
            }}
          >
            Find quick answers to the most common questions about preparing your
            artwork for packaging print production.
          </p>

          {/* 8 category blocks */}
          {[
            { img: "/Design (1).png", label: "File Formats",     key: "file_formats" },
            { img: "/Design.png",     label: "Color Mode",       key: "color_mode" },
            { img: "/Design (2).png", label: "Fonts & Text",     key: "fonts_text" },
            { img: "/Design (3).png", label: "Special Finishes", key: "special_finishes" },
            { img: "/Design (4).png", label: "Dielines",         key: "dielines" },
            { img: "/Design (5).png", label: "Line Thickness",   key: "line_thickness" },
            { img: "/Design (6).png", label: "Images",           key: "images" },
            { img: "/Design (7).png", label: "Resolution",       key: "resolution" },
          ].map((cat, catIdx) => {
            const specific = faqs.filter(f => f.artwork_section === cat.key);
            const sectionFaqs = specific.length > 0 ? specific : globalFaqs;
            return (
            <div
              key={cat.label}
              className="flex flex-col md:flex-row items-start"
              style={{ gap: 0, marginBottom: 48 }}
            >
              {/* Left — full width on mobile, 28% on md+ */}
              <div
                className="flex items-center gap-3 w-full md:w-[28%] lg:w-[25%] mb-4 md:mb-0"
                style={{ flexShrink: 0 }}
              >
                <Image
                  src={cat.img}
                  alt={cat.label}
                  width={32}
                  height={32}
                  style={{ borderRadius: 8, objectFit: "contain", flexShrink: 0 }}
                />
                <span
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(18px, 1.8vw, 32px)",
                    lineHeight: 1.2,
                    color: "#1A1A1A",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat.label}
                </span>
              </div>

              {/* Right — full width on mobile, flex-1 on md+ */}
              <div className="w-full md:flex-1" style={{ textAlign: "left", paddingLeft: 0 }}>
                {isLoading && (
                  <div className="flex flex-col gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-14 animate-pulse" style={{ background: "#e8e5df" }} />
                    ))}
                  </div>
                )}
                {!isLoading && sectionFaqs.length > 0 && (
                  <div className="flex flex-col">
                    {sectionFaqs.map((faq) => {
                      const key = `${catIdx}-${faq.id}`;
                      const isOpen = openId === key;
                      return (
                        <div
                          key={key}
                          style={{
                            background: isOpen ? "#FFFFFF" : "transparent",
                            border: "none",
                            borderRadius: isOpen ? 8 : 0,
                            overflow: "hidden",
                            marginBottom: isOpen ? 8 : 0,
                            transition: "background 0.2s, border-radius 0.2s, margin 0.2s",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setOpenId((prev) => (prev === key ? null : key))}
                            aria-expanded={isOpen}
                            className="w-full flex items-center justify-between gap-4 bg-transparent border-none text-left cursor-pointer"
                            style={{ padding: "14px 16px" }}
                          >
                            <span style={{
                              fontFamily: "Inter, sans-serif",
                              fontWeight: 500,
                              fontSize: "clamp(15px, 1.2vw, 18px)",
                              lineHeight: 1.5,
                              color: "#1A1A1A",
                            }}>
                              {faq.question}
                            </span>
                            <span className="flex-shrink-0 transition-all" style={{ color: isOpen ? "#2A58FF" : "#888888" }}>
                              {isOpen ? <ChevronUp size={18} strokeWidth={2} /> : <ChevronDown size={18} strokeWidth={2} />}
                            </span>
                          </button>
                          <div style={{ maxHeight: isOpen ? 400 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
                            <p style={{
                              fontFamily: "Inter, sans-serif",
                              fontWeight: 400,
                              fontSize: "clamp(12px, 1vw, 14px)",
                              lineHeight: "1.7",
                              color: "#555555",
                              padding: "0 16px 14px",
                            }}>
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
          })}
        </div>
      </section>

      {/* ── Bottom CTA Card ── */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-8 lg:px-10" style={{ background: "#F6F4EF" }}>
        <div>
          <div
            className="relative overflow-hidden flex flex-col items-center justify-center text-center mx-auto"
            style={{
              background: "linear-gradient(85.07deg, #2D5C3E -0.86%, #143721 100%)",
              borderRadius: "clamp(16px, 3vw, 36px)",
              borderTop: "3px solid rgba(255,255,255,0.15)",
              maxWidth: 1240,
              minHeight: "clamp(280px, 30vw, 350px)",
              padding: "clamp(32px, 5vw, 56px) clamp(20px, 4vw, 40px)",
            }}
          >
            {/* Background image overlay */}
            <Image
              src="/Section.png"
              alt=""
              fill
              className="object-cover object-center mix-blend-overlay opacity-40"
              aria-hidden="true"
              priority
            />

            {/* Content */}
            <h2
              className="relative"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 600,
                fontSize: 26,
                lineHeight: "32px",
                letterSpacing: 0,
                color: "#FFFFFF",
                marginBottom: 16,
              }}
            >
              Let&apos;s Make Something Great
            </h2>
            <p
              className="relative"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 400,
                fontSize: 13,
                lineHeight: "150%",
                letterSpacing: 0,
                color: "rgba(255,255,255,0.75)",
                maxWidth: 420,
                marginBottom: 28,
              }}
            >
              Tell us about your project. We&apos;ll handle design, production, and shipping, start to finish.
            </p>
            <Link
              href="/contactus-s"
              className="relative inline-flex items-center justify-center font-semibold text-white transition-colors"
              style={{
                fontFamily: "DM Sans, sans-serif",
                background: "#E8732A",
                borderRadius: 6,
                width: 259,
                height: 46,
                padding: "12px 16px",
                fontSize: 14,
                gap: 10,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Get Your Free Quote →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}