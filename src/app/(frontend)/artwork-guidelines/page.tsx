"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  title: string;
  icon: string;
  items: FAQItem[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    title: "File Formats",
    icon: "/Design (1).png",
    items: [
      {
        q: "What file formats does HofPack accept?",
        a: "We accept vector-based files, which give the sharpest results for text, line art, and logos:\n• AI (Adobe Illustrator)\n• PDF (Portable Document Format, vector/print-ready)\n• EPS (Encapsulated PostScript)\nPhotographs and other raster artwork should be embedded within one of the above file types rather than uploaded as a standalone JPEG or PNG.\n\nTip: When exporting a PDF from Illustrator, use the \"Press Quality\" preset to keep fonts, line weights, and image resolution intact.",
      },
      {
        q: "What if I don't have Adobe Illustrator?",
        a: "Any vector design software that can export to AI, PDF, or EPS will work. If you don't have access to design software, HofPack's in-house design team can build or clean up your artwork for you — just reach out to your account specialist.",
      },
      {
        q: "Is there a maximum file size for uploads?",
        a: "Files up to 100MB can be uploaded directly through your order portal. If your file is larger, contact your HofPack representative and we'll arrange an alternate transfer method.",
      },
    ],
  },
  {
    title: "Color Mode",
    icon: "/Design.png",
    items: [
      {
        q: "Why does my artwork need to be in CMYK, not RGB?",
        a: "Our presses print using CMYK (and PMS/Pantone) inks. RGB is built for screens and does not translate directly to print, so RGB files can shift in color, tone, and vibrancy once printed. Files submitted in RGB will be converted to CMYK, which may alter the final appearance — for the most accurate match, please convert your file yourself before submitting.",
      },
      {
        q: "How do I switch my document color mode to CMYK?",
        a: "In Illustrator: File > Document Color Mode > CMYK Color. Any embedded photos or images should also be individually converted to CMYK, since document mode alone won't convert linked assets.",
      },
      {
        q: "Why is 100% K used for black text and line art?",
        a: "Rich or mixed blacks (blends of C, M, Y, and K) can cause registration issues on small text and fine lines. Using 100% K (pure black) keeps small type and thin strokes crisp. If you need a deep, rich black for large solid areas, let your specialist know and we can advise on the right build.",
      },
    ],
  },
  {
    title: "Fonts & Text",
    icon: "/Design (2).png",
    items: [
      {
        q: "What's the minimum font size for print?",
        a: "For legibility, we recommend a minimum of 8pt for standard (dark-on-light) text and 10pt for reverse/knockout text (light text on a dark background). As a general guide:\n\n• Dark text on a light background: 6pt minimum\n• Light/reverse text on a dark background: 8pt minimum\n\nThin or light font weights may not hold up as well at small sizes, so test with a proof if you're near the minimum.",
      },
      {
        q: "Do I need to outline my fonts?",
        a: "Yes. All text must be converted to outlines (vector shapes) before submission. This prevents font substitution or missing-font errors if we don't have the exact typeface installed. In Illustrator: select all text objects, then go to Type > Create Outlines.",
      },
    ],
  },
  {
    title: "Special Finishes",
    icon: "/Design (3).png",
    items: [
      {
        q: "How should I set up layers for special finishes?",
        a: "Create a duplicate artboard showing only the special-finish elements, filled at 100% K (solid black), and label the layer with the finish name (e.g., \"Foil Stamp,\" \"Spot UV\"). This keeps your base print file clean while clearly communicating what needs the special treatment.",
      },
      {
        q: "How do I set up artwork for inside and outside printing?",
        a: "If your box design is printed on both the interior and exterior, separate the two into clearly labeled artboards or layers — \"Inside Print\" and \"Outside Print\" — rather than combining them on one layer.",
      },
      {
        q: "Can I add Pantone (PMS) colors, foil stamping, or Spot UV?",
        a: "Yes, HofPack supports PMS spot colors, foil stamping, embossing/debossing, and Spot UV coating. Each special finish needs to be placed on its own clearly labeled layer, separate from your base artwork, so our press team can identify exactly where it applies.",
      },
    ],
  },
  {
    title: "Dielines",
    icon: "/Design (4).png",
    items: [
      {
        q: "What do the different lines on a dieline mean?",
        a: "• Cut Line (black): the final trimmed edge of the box. Keep important text/graphics at least 0.125\" inside this line.\n• Crease/Fold Line (red): shows where the material will be folded.\n• Bleed Line (green): artwork that touches the cut line should extend out to the bleed line to avoid white edges after trimming.\n• Safety Margin (dotted green): the recommended zone to keep text and key graphics within, generally 0.125\" from the cut line.\n• Perforation (dotted black): marks a line of small punched holes for easy tearing.",
      },
    ],
  },
  {
    title: "Line Thickness",
    icon: "/Design (5).png",
    items: [
      {
        q: "Can I get a sample before a custom order in bulk?",
        a: "Yes, you can get a digital proof to check printing and color quality, or you can request a physical sample of your custom box before finalizing your bulk order. We also provide 2D mockups, 3D mockups, and video mockups for your custom packaging. Check it first, and then approve the final design.",
      },
      {
        q: "What are the benefits of custom boxes?",
        a: "With custom boxes, you can enhance your brand recognition with every order and create a consistent brand identity through custom designs and brand logo. They are a perfect way to attract customers, boost your brand sales, create memorable unboxing experiences, improve marketing, and offer the right product fit. This will overall increase your brand awareness and perceived value.",
      },
      {
        q: "What is the minimum order quantity for HOF Pack?",
        a: "There is no minimum order quantity for the HOF Pack. You can request as few as 500 units for your custom boxes wholesale order. We provide flexibility in order quantity and support small startups and businesses alike, all across the United States.",
      },
      {
        q: "What is the turnaround time for an order?",
        a: "On average, we take around 8-10 business days to finalize an order and ship it. However, the turnaround time mainly depends on design complexity, additional finishes, large quantities, and delays in design approvals.",
      },
      {
        q: "Do you ship all across the USA?",
        a: "Yes, we ship all across the US and also provide worldwide shipping for your custom printed boxes. We are partnered with DHL, FedEx Corp, and UPS to provide a transparent and smooth shipping experience. You can track your orders online once they are shipped by us. We provide both express shipping, which can take around 12 days, and standard delivery, which takes 2–7 business days for domestic shipments and 7–21 business days for international shipments.",
      },
      {
        q: "Can I get an instant quote before ordering?",
        a: "Absolutely, you can get a free quote from our team by providing us with your product details, specifications, and design preferences. Contact our team at info@hofpack.com or call +1 (888) 429-4881 for a free design consultation. We will help you choose the right material and style for your custom packaging.",
      },
    ],
  },
  {
    title: "Images",
    icon: "/Design (6).png",
    items: [
      {
        q: "Can I get a sample before a custom order in bulk?",
        a: "Yes, you can get a digital proof to check printing and color quality, or you can request a physical sample of your custom box before finalizing your bulk order. We also provide 2D mockups, 3D mockups, and video mockups for your custom packaging. Check it first, and then approve the final design.",
      },
      {
        q: "What are the benefits of custom boxes?",
        a: "With custom boxes, you can enhance your brand recognition with every order and create a consistent brand identity through custom designs and brand logo. They are a perfect way to attract customers, boost your brand sales, create memorable unboxing experiences, improve marketing, and offer the right product fit. This will overall increase your brand awareness and perceived value.",
      },
      {
        q: "What is the minimum order quantity for HOF Pack?",
        a: "There is no minimum order quantity for the HOF Pack. You can request as few as 500 units for your custom boxes wholesale order. We provide flexibility in order quantity and support small startups and businesses alike, all across the United States.",
      },
      {
        q: "What is the turnaround time for an order?",
        a: "On average, we take around 8-10 business days to finalize an order and ship it. However, the turnaround time mainly depends on design complexity, additional finishes, large quantities, and delays in design approvals.",
      },
      {
        q: "Do you ship all across the USA?",
        a: "Yes, we ship all across the US and also provide worldwide shipping for your custom printed boxes. We are partnered with DHL, FedEx Corp, and UPS to provide a transparent and smooth shipping experience. You can track your orders online once they are shipped by us. We provide both express shipping, which can take around 12 days, and standard delivery, which takes 2–7 business days for domestic shipments and 7–21 business days for international shipments.",
      },
      {
        q: "Can I get an instant quote before ordering?",
        a: "Absolutely, you can get a free quote from our team by providing us with your product details, specifications, and design preferences. Contact our team at info@hofpack.com or call +1 (888) 429-4881 for a free design consultation. We will help you choose the right material and style for your custom packaging.",
      },
    ],
  },
  {
    title: "Resolution",
    icon: "/Design (7).png",
    items: [
      {
        q: "Can I get a sample before a custom order in bulk?",
        a: "Yes, you can get a digital proof to check printing and color quality, or you can request a physical sample of your custom box before finalizing your bulk order. We also provide 2D mockups, 3D mockups, and video mockups for your custom packaging. Check it first, and then approve the final design.",
      },
      {
        q: "What are the benefits of custom boxes?",
        a: "With custom boxes, you can enhance your brand recognition with every order and create a consistent brand identity through custom designs and brand logo. They are a perfect way to attract customers, boost your brand sales, create memorable unboxing experiences, improve marketing, and offer the right product fit. This will overall increase your brand awareness and perceived value.",
      },
      {
        q: "What is the minimum order quantity for HOF Pack?",
        a: "There is no minimum order quantity for the HOF Pack. You can request as few as 500 units for your custom boxes wholesale order. We provide flexibility in order quantity and support small startups and businesses alike, all across the United States.",
      },
      {
        q: "What is the turnaround time for an order?",
        a: "On average, we take around 8-10 business days to finalize an order and ship it. However, the turnaround time mainly depends on design complexity, additional finishes, large quantities, and delays in design approvals.",
      },
      {
        q: "Do you ship all across the USA?",
        a: "Yes, we ship all across the US and also provide worldwide shipping for your custom printed boxes. We are partnered with DHL, FedEx Corp, and UPS to provide a transparent and smooth shipping experience. You can track your orders online once they are shipped by us. We provide both express shipping, which can take around 12 days, and standard delivery, which takes 2–7 business days for domestic shipments and 7–21 business days for international shipments.",
      },
      {
        q: "Can I get an instant quote before ordering?",
        a: "Absolutely, you can get a free quote from our team by providing us with your product details, specifications, and design preferences. Contact our team at info@hofpack.com or call +1 (888) 429-4881 for a free design consultation. We will help you choose the right material and style for your custom packaging.",
      },
    ],
  },
];

const RULES_STEPS = [
  {
    step: "STEP 01",
    title: "File Formats",
    icon: "/Design (1).png",
    desc: "Submit artwork in AI, PDF, or EPS format for the best printing results.",
  },
  {
    step: "STEP 02",
    title: "Color Mode",
    icon: "/Design.png",
    desc: "Design all artwork in CMYK color mode to achieve accurate printed colors.",
  },
  {
    step: "STEP 03",
    title: "Fonts & Text",
    icon: "/Design (2).png",
    desc: "Convert all fonts to outlines and ensure text is clear and readable.",
  },
  {
    step: "STEP 04",
    title: "Special Finishes",
    icon: "/Design (3).png",
    desc: "Create separate layers for foil stamping, embossing, debossing, and Spot UV effects.",
  },
  {
    step: "STEP 05",
    title: "Dielines",
    icon: "/Design (4).png",
    desc: "Do not resize, move, or modify the HOF Packs dieline template.",
  },
  {
    step: "STEP 06",
    title: "Line Thickness",
    icon: "/Design (5).png",
    desc: "Keep all strokes and lines at a minimum thickness of 0.25 pt.",
  },
  {
    step: "STEP 07",
    title: "Images",
    icon: "/Design (6).png",
    desc: "Embed all linked images before submitting your artwork files.",
  },
  {
    step: "STEP 08",
    title: "Resolution",
    icon: "/Design (7).png",
    desc: "Use images and graphics with a minimum resolution of 300 DPI for sharp, professional printing.",
  },
];

export default function ArtworkGuidelinesPage() {
  const [openKey, setOpenKey] = useState<string | null>("0-0");

  const toggleItem = (catIndex: number, itemIndex: number) => {
    const key = `${catIndex}-${itemIndex}`;
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{ background: "rgb(232, 237, 229)", marginTop: "-112px" }}
      >
        <style>{`
          @media (max-width: 1023px) { .faq-hero-section { margin-top: -80px !important; } }
          .faq-hero-text { position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; text-align: center; padding: 172px 24px 0; }
          @media (max-width: 1023px) { .faq-hero-text { padding-top: 132px; } }
          @media (max-width: 640px) { .faq-hero-text { padding-top: 110px; } .faq-hero-para { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; } }
        `}</style>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Premium custom packaging by HOF Pack"
          aria-hidden="true"
          width={1440}
          height={693}
          className="w-full h-auto pointer-events-none select-none block"
          src="/Premium custom packaging by HOF Pack.png"
          style={{ color: "transparent", display: "block" }}
        />
        <div className="faq-hero-section faq-hero-text w-full" style={{ maxWidth: "100%" }}>
          <h1
            className="[text-wrap:balance]"
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              fontSize: "clamp(28px, 4.5vw, 60px)",
              lineHeight: 1.1,
              letterSpacing: "0px",
              color: "rgb(26, 26, 26)",
              marginBottom: "20px",
            }}
          >
            Artwork <span style={{ color: "rgb(232, 115, 42)" }}>Guidelines</span>
          </h1>
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 300,
              fontSize: "clamp(18px, 1.7vw, 24.54px)",
              lineHeight: "clamp(26px, 2.5vw, 36.5px)",
              letterSpacing: "0px",
              color: "rgba(26, 26, 26, 0.92)",
              maxWidth: "720px",
            }}
          >
            <span className="faq-hero-para">
              Need help with your HOF Packs artwork or dielines? Find all the answers you need here.
            </span>
          </p>
        </div>
      </section>

      {/* 8 Rules Section */}
      <section className="py-16 sm:py-20" style={{ background: "rgb(246, 244, 239)" }}>
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10">
          <h2
            className="text-center"
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              fontSize: "clamp(36px, 3.5vw, 48px)",
              lineHeight: 1.2,
              color: "rgb(26, 26, 26)",
              marginBottom: "4px",
            }}
          >
            8 Rules for Preparing{" "}
            <span style={{ color: "rgb(232, 115, 42)", whiteSpace: "nowrap" }}>Artwork Files</span>
          </h2>
          <p
            className="text-center mx-auto"
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 300,
              fontSize: "18px",
              lineHeight: "140%",
              color: "rgb(26, 26, 26)",
              maxWidth: "520px",
              marginBottom: "48px",
            }}
          >
            Follow these simple artwork guidelines to ensure your custom packaging is printed accurately and without delays.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {RULES_STEPS.map((rule, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgb(255, 255, 255)",
                  boxShadow: "rgba(0, 0, 0, 0.15) 4px 4px 6.6px 0px",
                  borderRadius: "16px",
                  borderRight: "1px solid rgb(232, 232, 232)",
                  borderBottom: "1px solid rgb(232, 232, 232)",
                  borderLeft: "1px solid rgb(232, 232, 232)",
                  padding: "20px",
                  minHeight: "281px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={rule.title}
                  loading="lazy"
                  width={48}
                  height={48}
                  src={rule.icon}
                  style={{
                    color: "transparent",
                    borderRadius: "12px",
                    objectFit: "contain",
                    padding: "0px",
                  }}
                />
                <p
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color: "rgb(136, 136, 136)",
                    marginBottom: "-8px",
                  }}
                >
                  {rule.step}
                </p>
                <h3
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 700,
                    fontSize: "22px",
                    lineHeight: "26.7px",
                    color: "rgb(232, 115, 42)",
                    margin: "0px",
                  }}
                >
                  {rule.title}
                </h3>
                <p
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: "18px",
                    lineHeight: "140%",
                    color: "rgb(26, 26, 26)",
                    margin: "0px",
                  }}
                >
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 sm:py-16" style={{ background: "rgb(246, 244, 239)" }}>
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10">
          <h2
            className="text-center"
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              fontSize: "clamp(36px, 3.5vw, 48px)",
              lineHeight: 1.2,
              color: "rgb(26, 26, 26)",
              marginBottom: "4px",
            }}
          >
            Artwork &amp; Print{" "}
            <span style={{ color: "rgb(232, 115, 42)" }}>FAQs</span>
          </h2>
          <p
            className="text-center mx-auto"
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 300,
              fontSize: "18px",
              lineHeight: "140%",
              color: "rgb(26, 26, 26)",
              maxWidth: "520px",
              marginBottom: "56px",
            }}
          >
            Find quick answers to the most common questions about preparing your artwork for packaging print production.
          </p>

          {FAQ_DATA.map((cat, catIdx) => (
            <div
              key={catIdx}
              className="flex flex-col md:flex-row items-start"
              style={{ gap: "0px", marginBottom: "48px" }}
            >
              <div
                className="flex items-center gap-3 w-full md:w-[28%] lg:w-[25%] mb-4 md:mb-0"
                style={{ flexShrink: 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={cat.title}
                  loading="lazy"
                  width={32}
                  height={32}
                  src={cat.icon}
                  style={{
                    color: "transparent",
                    borderRadius: "8px",
                    objectFit: "contain",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: "clamp(18px, 1.8vw, 32px)",
                    lineHeight: 1.2,
                    color: "rgb(26, 26, 26)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat.title}
                </span>
              </div>

              <div className="w-full md:flex-1" style={{ textAlign: "left", paddingLeft: "0px" }}>
                <div className="flex flex-col">
                  {cat.items.map((item, itemIdx) => {
                    const isOpen = openKey === `${catIdx}-${itemIdx}`;
                    return (
                      <div
                        key={itemIdx}
                        style={{
                          background: isOpen ? "rgb(255, 255, 255)" : "transparent",
                          borderWidth: "medium",
                          borderStyle: "none",
                          borderColor: "currentcolor",
                          borderImage: "none",
                          borderRadius: isOpen ? "8px" : "0px",
                          overflow: "hidden",
                          marginBottom: isOpen ? "8px" : "0px",
                          transition: "background 0.2s, border-radius 0.2s, margin 0.2s",
                        }}
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => toggleItem(catIdx, itemIdx)}
                          className="w-full flex items-center justify-between gap-4 bg-transparent border-none text-left cursor-pointer"
                          style={{ padding: "14px 16px" }}
                        >
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontWeight: 500,
                              fontSize: "clamp(15px, 1.2vw, 18px)",
                              lineHeight: 1.5,
                              color: "rgb(26, 26, 26)",
                            }}
                          >
                            {item.q}
                          </span>
                          <span
                            className="flex-shrink-0 transition-all"
                            style={{
                              color: isOpen ? "rgb(42, 88, 255)" : "rgb(136, 136, 136)",
                            }}
                          >
                            {isOpen ? (
                              <ChevronUp className="w-[18px] h-[18px]" />
                            ) : (
                              <ChevronDown className="w-[18px] h-[18px]" />
                            )}
                          </span>
                        </button>

                        <div
                          style={{
                            maxHeight: isOpen ? "400px" : "0px",
                            overflow: "hidden",
                            transition: "max-height 0.35s ease",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontWeight: 400,
                              fontSize: "clamp(12px, 1vw, 14px)",
                              lineHeight: 1.7,
                              color: "rgb(85, 85, 85)",
                              padding: "0px 16px 14px",
                              whiteSpace: "pre-line",
                            }}
                          >
                            {item.a}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner Section */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-8 lg:px-10" style={{ background: "rgb(246, 244, 239)" }}>
        <div>
          <div
            className="relative overflow-hidden flex flex-col items-center justify-center text-center mx-auto"
            style={{
              background: "linear-gradient(85.07deg, rgb(45, 92, 62) -0.86%, rgb(20, 55, 33) 100%)",
              borderRadius: "clamp(16px, 3vw, 36px)",
              borderTop: "3px solid rgba(255, 255, 255, 0.15)",
              maxWidth: "1240px",
              minHeight: "clamp(280px, 30vw, 350px)",
              padding: "clamp(32px, 5vw, 56px) clamp(20px, 4vw, 40px)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              aria-hidden="true"
              className="object-cover object-center mix-blend-overlay opacity-40 absolute inset-0 w-full h-full pointer-events-none"
              src="/Section.png"
              style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }}
            />
            <h2
              className="relative z-10"
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 600,
                fontSize: "26px",
                lineHeight: "32px",
                letterSpacing: "0px",
                color: "rgb(255, 255, 255)",
                marginBottom: "16px",
              }}
            >
              Let&apos;s Make Something Great
            </h2>
            <p
              className="relative z-10"
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "150%",
                letterSpacing: "0px",
                color: "rgba(255, 255, 255, 0.75)",
                maxWidth: "420px",
                marginBottom: "28px",
              }}
            >
              Tell us about your project. We&apos;ll handle design, production, and shipping, start to finish.
            </p>
            <Link
              className="relative z-10 inline-flex items-center justify-center font-semibold text-white transition-opacity hover:opacity-90"
              href="/contact-us"
              style={{
                fontFamily: '"DM Sans", sans-serif',
                background: "rgb(232, 115, 42)",
                borderRadius: "6px",
                width: "259px",
                height: "46px",
                padding: "12px 16px",
                fontSize: "14px",
                gap: "10px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Get Your FREE Quote &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
