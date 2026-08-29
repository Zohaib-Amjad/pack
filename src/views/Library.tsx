"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchAllLibraryItems } from "@/lib/library-service";
import { useCmsLibrary } from "@/hooks/useCms";
import { DEFAULT_CMS_LIBRARY } from "@/data/cms-defaults";
import type { CmsLibrary } from "@/types/cms";

interface MaterialItem {
  title: string;
  desc: string;
  img: string;
}

interface MaterialSection {
  title: string;
  desc: string;
  items: MaterialItem[];
}

const MATERIALS_DATA: MaterialSection[] = [
  {
    title: "Paperboard",
    desc: "Single-layer paper-based material perfect for all-round use.",
    items: [
      {
        title: "SBS C1S",
        desc: "Premium bleached white paperboard coated on one side — ideal for high-quality offset printing.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "SBS C2S",
        desc: "Bleached white paperboard coated on both sides — consistent printing surface on both faces.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "FBB (Folding Box Board)",
        desc: "Multi-ply folding box board — excellent stiffness-to-weight ratio, the top choice for folding cartons.",
        img: "/Background.png",
      },
      {
        title: "Kraft Paperboard",
        desc: "Unbleached natural brown paperboard — eco-friendly, ideal for sustainable retail packaging.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Duplex Board",
        desc: "Two-layer board: white coated top + grey back — cost-efficient choice for folding cartons.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Ivory Board",
        desc: "All-white duplex with bright coated surface on both sides — great for high-end retail boxes.",
        img: "/Background.png",
      },
      {
        title: "Coated Recycled Board",
        desc: "FSC-certified recycled paperboard with a coated surface — sustainable without compromising print quality.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Grey Back Duplex",
        desc: "White-coated front with natural grey back — popular for cosmetic and pharmaceutical folding cartons.",
        img: "/Pillow Gift Boxes (1).png",
      },
    ],
  },
  {
    title: "Corrugated",
    desc: "Triple-layer paper-based material perfect for added protection.",
    items: [
      {
        title: "Brown Kraft Linerboard",
        desc: "Uncoated unbleached linerboard from virgin and recycled pulp — the standard for shipping boxes.",
        img: "/Background.png",
      },
      {
        title: "White Top Linerboard",
        desc: "White-coated kraft linerboard — gives corrugated shipping boxes a clean printable surface.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "B-Flute Corrugated",
        desc: "Thin B-flute medium — lightweight with good stacking strength, ideal for retail mailer boxes.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "E-Flute Corrugated",
        desc: "Fine E-flute medium — excellent printing surface with smooth finish for premium display boxes.",
        img: "/Background.png",
      },
      {
        title: "C-Flute Corrugated",
        desc: "Most common flute size — strong cushioning and stacking performance for standard shipping.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Micro-Flute (F/G)",
        desc: "Ultra-thin micro flute — combines the look of solid board with corrugated strength for premium packaging.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Double Wall Corrugated",
        desc: "Two fluting layers for extra protection — ideal for heavy products and long-distance shipping.",
        img: "/Background.png",
      },
      {
        title: "Triple Wall Corrugated",
        desc: "Three fluting layers — maximum strength corrugated board for industrial and heavy-duty packaging.",
        img: "/Pillow Gift Boxes.png",
      },
    ],
  },
  {
    title: "Rigid",
    desc: "High-density board for premium rigid box construction.",
    items: [
      {
        title: "Grey Chipboard",
        desc: "Recycled grey chipboard — the core board used in rigid box construction worldwide.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "White Chipboard",
        desc: "White-lined chipboard for rigid boxes requiring a clean inner surface and bright exterior.",
        img: "/Background.png",
      },
      {
        title: "Black Chipboard",
        desc: "Solid black chipboard — no print required for luxury matte interiors in high-end packaging.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Laminated Chipboard",
        desc: "Pre-laminated chipboard with premium paper wrap — ready for foil, emboss, and die-cut finishes.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Premium Greyboard 2mm",
        desc: "Extra-thick 2mm greyboard for full rigid boxes with excellent shape retention and durability.",
        img: "/Background.png",
      },
      {
        title: "Recycled Pasted Board",
        desc: "Multi-ply recycled chipboard — sustainable option with strong compressive resistance for rigid boxes.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Lined Greyboard",
        desc: "Grey chipboard lined with white kraft paper on both sides — smooth surface for wrapping and printing.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Book Binding Board",
        desc: "High-density board with tight surface for case-bound rigid boxes and luxury book-style packaging.",
        img: "/Background.png",
      },
    ],
  },
];

const PRINT_INKS_DATA: MaterialSection[] = [
  {
    title: "Offset Printing",
    desc: "Industry-standard printing methods for sharp, consistent color reproduction.",
    items: [
      {
        title: "CMYK Offset",
        desc: "4-color process offset printing — the standard for full-color packaging at scale.",
        img: "/Background.png",
      },
      {
        title: "Pantone PMS",
        desc: "Spot color Pantone printing — precise brand color matching that CMYK cannot reliably achieve.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Digital Print",
        desc: "Full-color digital printing — ideal for short runs, variable data, and rapid prototype samples.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Flexographic Print",
        desc: "High-speed flexo printing for corrugated and kraft — cost-effective for large volumes.",
        img: "/Background.png",
      },
      {
        title: "Screen Printing",
        desc: "Thick opaque ink laydown for bold solid colors — ideal for specialty finishes on rigid boxes.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Gravure Printing",
        desc: "High-resolution intaglio printing for very long runs — finest detail and color fidelity available.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Letterpress",
        desc: "Traditional relief printing — deep impression with rich ink coverage for artisan and luxury brands.",
        img: "/Background.png",
      },
      {
        title: "Inkjet Digital",
        desc: "High-speed inkjet for mass personalisation — variable text, QR codes, and batch numbering at speed.",
        img: "/Pillow Gift Boxes.png",
      },
    ],
  },
  {
    title: "Specialty Inks",
    desc: "Special-effect inks that add visual impact and perceived value to your packaging.",
    items: [
      {
        title: "Metallic Ink",
        desc: "Gold, silver, and copper metallic inks for premium brand accents without foil stamping costs.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "UV Inks",
        desc: "Ultraviolet-cured inks — vibrant scratch-resistant finish, excellent for gloss-heavy designs.",
        img: "/Background.png",
      },
      {
        title: "Fluorescent Inks",
        desc: "Bright neon fluorescent inks — ideal for youth brands, sports packaging, and bold shelf impact.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Soy-Based Inks",
        desc: "Eco-certified soy-based inks — lower VOCs, brighter colors, and fully compostable after use.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Thermochromic Ink",
        desc: "Temperature-sensitive ink that changes color with heat — creates interactive packaging experiences.",
        img: "/Background.png",
      },
      {
        title: "Pearlescent Ink",
        desc: "Pearl-lustre inks that shimmer under different lighting — adds elegance to beauty and luxury brands.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Glow-in-Dark Ink",
        desc: "Photoluminescent ink that glows after light exposure — eye-catching for seasonal and novelty packaging.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Scented Ink",
        desc: "Microencapsulated fragrance ink released on touch — adds a multi-sensory dimension to premium packaging.",
        img: "/Background.png",
      },
    ],
  },
];

const FINISHES_DATA: MaterialSection[] = [
  {
    title: "Lamination",
    desc: "Surface coating options that protect your packaging and define your brand aesthetic.",
    items: [
      {
        title: "Matte Lamination",
        desc: "Non-reflective matte film lamination — the go-to finish for premium, sophisticated packaging.",
        img: "/Background.png",
      },
      {
        title: "Gloss Lamination",
        desc: "High-shine gloss film lamination — enhances color vibrancy and gives a sleek, polished look.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Soft-Touch Matte",
        desc: "Velvet-feel soft-touch lamination — ultra-premium tactile finish used by luxury brands globally.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Anti-Scratch Lam.",
        desc: "Hardened anti-scratch lamination — protects against scuffs during shipping and retail display.",
        img: "/Background.png",
      },
      {
        title: "Aqueous Coating",
        desc: "Water-based protective coating — fast-drying, environmentally friendly, recyclability-friendly.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Silk Lamination",
        desc: "Silk-feel film between matte and gloss — popular in cosmetics and premium retail packaging.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Linen Texture Lam.",
        desc: "Textured linen-effect lamination — adds a natural, tactile quality to eco and craft-style packaging.",
        img: "/Background.png",
      },
      {
        title: "Holographic Lam.",
        desc: "Full-surface holographic film lamination — rainbow prismatic effect for impactful shelf presence.",
        img: "/Pillow Gift Boxes.png",
      },
    ],
  },
  {
    title: "Special Effects",
    desc: "Embellishment techniques that create visual and tactile contrast on your packaging.",
    items: [
      {
        title: "UV Spot Coating",
        desc: "Gloss UV on specific areas only — high-contrast detail against matte for premium designs.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Hot Foil Stamping",
        desc: "Metallic gold, silver, rose gold, or holographic foil under heat — luxury standard for brand marks.",
        img: "/Background.png",
      },
      {
        title: "Embossing",
        desc: "Raised relief effect pressed into the board — adds dimension and a tactile brand identity.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Debossing",
        desc: "Pressed-in relief effect — creates an elegant sunken impression for logos and brand marks.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Holographic Foil",
        desc: "Rainbow-effect foil — eye-catching prismatic finish for limited editions and luxury lines.",
        img: "/Background.png",
      },
      {
        title: "Glitter Lamination",
        desc: "Fine glitter particles sealed under clear film — sparkle effect for gifting and cosmetics.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Textured Foil",
        desc: "Foil with surface texture pattern — adds both visual and tactile premium quality to rigid boxes.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Die-Cut Window",
        desc: "Precision-cut window in the packaging — allows product visibility while maintaining structure.",
        img: "/Background.png",
      },
    ],
  },
];

const BOX_FEATURES_DATA: MaterialSection[] = [
  {
    title: "Closures",
    desc: "Structural features that affect functionality, security, and the unboxing experience.",
    items: [
      {
        title: "Magnetic Closure",
        desc: "Hidden magnet closure — used in premium rigid boxes for a satisfying luxury open experience.",
        img: "/Background.png",
      },
      {
        title: "Auto-Lock Bottom",
        desc: "Self-locking base with no glue — strong, fast, ideal for high-volume shipping cartons.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Tuck-End Closure",
        desc: "Standard folding carton closure — cost-efficient for retail boxes with a clean top-tuck opening.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Sleeve Closure",
        desc: "Sliding sleeve over a tray — creates a premium reveal moment ideal for gifts and accessories.",
        img: "/Background.png",
      },
      {
        title: "Snap-Lock Bottom",
        desc: "Click-lock base without glue — faster than auto-lock for mid-weight retail cartons.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Double-Wall Lid",
        desc: "Double-walled rigid box lid — adds depth and weight for a premium keepsake box.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Gable Top Closure",
        desc: "Folded gable top — commonly used for food, gift, and carrier boxes with a built-in handle.",
        img: "/Background.png",
      },
      {
        title: "Seal-End Closure",
        desc: "Heat or glue sealed end flaps — tamper-evident closure for pharmaceutical and food-grade cartons.",
        img: "/Pillow Gift Boxes.png",
      },
    ],
  },
  {
    title: "Inserts & Interiors",
    desc: "Interior components that protect products and elevate the unboxing experience.",
    items: [
      {
        title: "Die-Cut Foam Insert",
        desc: "Custom die-cut EVA or PE foam — perfect product protection for fragile or high-value items.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Cardboard Insert",
        desc: "Scored and folded cardboard insert — cost-effective holder for bottles, jars, and skincare products.",
        img: "/Background.png",
      },
      {
        title: "Velvet Tray",
        desc: "Flocked velvet-lined tray — the luxury standard for jewelry, watches, and premium accessories.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Ribbon Pull",
        desc: "Satin ribbon on the base for easy product removal — adds a gift-premium touch to rigid boxes.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Thermoformed Tray",
        desc: "Vacuum-formed PET or PP tray — precise cavity shapes for multi-unit product presentation.",
        img: "/Background.png",
      },
      {
        title: "Tissue Paper Lining",
        desc: "Branded tissue paper wrapping — low-cost way to add colour and premium feel to any box.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Magnetic Insert Tray",
        desc: "Custom magnetic tray insert — holds multiple items securely in position for premium gifting.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Eco Paper Pulp Tray",
        desc: "Moulded paper pulp insert — 100% recyclable and biodegradable, ideal for sustainable brands.",
        img: "/Background.png",
      },
    ],
  },
];

const BAG_HANDLES_DATA: MaterialSection[] = [
  {
    title: "Handle Types",
    desc: "Handle options for paper bags, gift bags, and luxury carrier bags.",
    items: [
      {
        title: "Twisted Paper Handle",
        desc: "Twisted kraft paper handle — strong, eco-friendly, the most common retail bag handle worldwide.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Flat Ribbon Handle",
        desc: "Flat grosgrain or satin ribbon handle — adds a premium look to boutique and gift packaging bags.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Cotton Rope Handle",
        desc: "Thick braided cotton rope handle — natural, durable, ideal for luxury and eco-brand packaging.",
        img: "/Background.png",
      },
      {
        title: "Die-Cut Handle",
        desc: "Handle cut directly from the bag board — no attachment, clean look, lowest cost option.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "PP Rope Handle",
        desc: "Polypropylene twisted rope handle — very strong and moisture-resistant for heavy retail bags.",
        img: "/Pillow Gift Boxes (1).png",
      },
      {
        title: "Jute Handle",
        desc: "Natural jute twine handle — rustic, eco-conscious finish for craft brands and organic lines.",
        img: "/Background.png",
      },
      {
        title: "Soft Cord Handle",
        desc: "Soft braided cord handle with metal eyelets — sleek, premium finish for luxury boutique carriers.",
        img: "/Pillow Gift Boxes.png",
      },
      {
        title: "Woven Fabric Handle",
        desc: "Custom woven fabric handle with brand colours — unique tactile experience for premium gift bags.",
        img: "/Pillow Gift Boxes (1).png",
      },
    ],
  },
];

const TABS = [
  { id: "materials", label: "Materials", data: MATERIALS_DATA },
  { id: "print-inks", label: "Print & Inks", data: PRINT_INKS_DATA },
  { id: "finishes", label: "Finishes", data: FINISHES_DATA },
  { id: "box-features", label: "Box Features", data: BOX_FEATURES_DATA },
  { id: "bag-handles", label: "Bag Handles", data: BAG_HANDLES_DATA },
];

export default function Library({ initialCms }: { initialCms?: CmsLibrary } = {}) {
  const { data: cms = initialCms || DEFAULT_CMS_LIBRARY } = useCmsLibrary();
  const hero = cms?.hero || DEFAULT_CMS_LIBRARY.hero;
  const [activeTab, setActiveTab] = useState("materials");

  const { data: dbItems = [] } = useQuery({
    queryKey: ["public", "library-items"],
    queryFn: async () => {
      try {
        const all = await fetchAllLibraryItems();
        return all.filter((item: any) => item.is_published !== false);
      } catch {
        return [];
      }
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const tabsWithDb = useMemo(() => {
    return TABS.map((tab) => {
      const tabKey = tab.id.toLowerCase();
      const matchingDbItems = dbItems.filter((item: any) => {
        const rawTab = (item.tab || "Materials").toLowerCase().replace(/[^a-z0-9]/g, "-");
        return rawTab === tabKey || (tabKey === "materials" && !item.tab);
      });

      if (matchingDbItems.length === 0) return tab;

      const sectionMap = new Map<string, MaterialItem[]>();
      const sectionMeta = new Map<string, string>();

      matchingDbItems.forEach((item: any) => {
        const secTitle = item.section_name || item.category || "General";
        if (!sectionMap.has(secTitle)) {
          sectionMap.set(secTitle, []);
        }
        if (item.section_subtitle) {
          sectionMeta.set(secTitle, item.section_subtitle);
        }
        sectionMap.get(secTitle)!.push({
          title: item.title,
          desc: item.description || "",
          img: item.image || item.image_url || "/Pillow Gift Boxes.png",
        });
      });

      const updatedSections: MaterialSection[] = tab.data.map((sec) => {
        const customItems = sectionMap.get(sec.title);
        if (!customItems) return sec;
        const customTitles = new Set(customItems.map((i) => i.title.toLowerCase()));
        const remainingDefaults = sec.items.filter((i) => !customTitles.has(i.title.toLowerCase()));
        sectionMap.delete(sec.title);
        return {
          ...sec,
          items: [...customItems, ...remainingDefaults],
        };
      });

      sectionMap.forEach((items, title) => {
        updatedSections.push({
          title,
          desc: sectionMeta.get(title) || "Custom packaging options and specifications.",
          items,
        });
      });

      return {
        ...tab,
        data: updatedSections,
      };
    });
  }, [dbItems]);

  const titleLead = hero.titleLead || DEFAULT_CMS_LIBRARY.hero.titleLead;
  const titleAccent = hero.titleAccent || DEFAULT_CMS_LIBRARY.hero.titleAccent;
  const subtitle = hero.subtitle || DEFAULT_CMS_LIBRARY.hero.subtitle;
  const heroImg = hero.heroImageUrl || "/Group (1).png";
  const heroAlt = hero.heroImageAlt || "HOF Pack Library";

  const currentTabData = tabsWithDb.find((t) => t.id === activeTab)?.data || MATERIALS_DATA;

  return (
    <div className="flex-1 w-full">
      {/* ── Hero Section ── */}
      <section className="overflow-hidden w-full" style={{ backgroundColor: "rgb(233, 241, 231)" }}>
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center min-h-[320px] lg:min-h-[440px] gap-8 lg:gap-0">
            {/* Left */}
            <div className="flex-1 py-10 lg:py-14 pr-0 lg:pr-16 flex flex-col justify-center">
              <h1
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 700,
                  fontSize: "clamp(2.2rem, 3.8vw, 4rem)",
                  lineHeight: 1.08,
                  color: "rgb(26, 26, 26)",
                  letterSpacing: "-0.02em",
                }}
              >
                {titleLead}
                {titleAccent && (
                  <>
                    <br />
                    <span style={{ color: "rgb(232, 115, 42)" }}>{titleAccent}</span>
                  </>
                )}
              </h1>
              <p
                className="mt-5 max-w-[420px]"
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: 1.65,
                  color: "rgba(26, 26, 26, 0.72)",
                }}
              >
                {subtitle}
              </p>
            </div>

            {/* Right Banner Image */}
            <div className="flex-1 flex items-center justify-center lg:justify-end self-center">
              <div className="relative w-full max-w-[600px] h-[320px] sm:h-[420px] lg:h-[520px]">
                <Image
                  alt={heroAlt}
                  fill
                  unoptimized
                  className="object-contain w-full h-full"
                  src={heroImg}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Tab Bar ── */}
      <div className="sticky top-0 z-20 py-0" style={{ backgroundColor: "rgb(246, 244, 239)", paddingTop: "50px" }}>
        <div className="flex justify-center">
          <div
            className="flex overflow-x-auto scrollbar-none border border-[#e8c89a] rounded-[4px]"
            style={{ backgroundColor: "rgb(252, 236, 216)", height: "62px", width: "80%" }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1 flex items-center justify-center whitespace-nowrap transition-all duration-200 min-w-[120px] cursor-pointer"
                  style={{
                    backgroundColor: isActive ? "rgb(232, 115, 42)" : "transparent",
                    color: isActive ? "rgb(255, 255, 255)" : "rgba(0, 0, 0, 0.5)",
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: "18px",
                    lineHeight: "18px",
                    borderRadius: isActive ? "3px" : "0px",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Materials / Content Section ── */}
      <section className="py-12 sm:py-16 min-h-[500px]" style={{ backgroundColor: "rgb(246, 244, 239)" }}>
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {currentTabData.map((sec, secIdx) => (
              <div key={secIdx}>
                <div className="text-center mb-8">
                  <h2
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 700,
                      fontSize: "1.75rem",
                      color: "rgb(26, 26, 26)",
                      lineHeight: 1.2,
                    }}
                  >
                    {sec.title}
                  </h2>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 400,
                      fontSize: "0.9375rem",
                      color: "rgb(152, 152, 152)",
                      lineHeight: 1.5,
                    }}
                  >
                    {sec.desc}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                  {sec.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="flex flex-col rounded-2xl border border-[#e0ddd6] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative w-full aspect-[4/3] bg-white">
                        <Image
                          alt={item.title}
                          fill
                          unoptimized
                          className="object-contain p-4 w-full h-full"
                          src={item.img || "/Pillow Gift Boxes.png"}
                        />
                      </div>
                      <div className="p-4">
                        <p
                          style={{
                            fontFamily: '"DM Sans", sans-serif',
                            fontWeight: 500,
                            fontSize: "1rem",
                            lineHeight: 1.2,
                            color: "rgb(26, 26, 26)",
                            marginBottom: "8px",
                          }}
                        >
                          {item.title}
                        </p>
                        <p
                          style={{
                            fontFamily: '"DM Sans", sans-serif',
                            fontWeight: 400,
                            fontSize: "0.875rem",
                            lineHeight: 1.45,
                            color: "rgb(152, 152, 152)",
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ── */}
      <section className="py-6 sm:py-8 px-4 sm:px-16 lg:px-[100px]" style={{ background: "rgb(246, 244, 239)" }}>
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
                color: "rgba(255, 255, 255, 0.75)",
                maxWidth: "420px",
                marginBottom: "28px",
              }}
            >
              Tell us about your project. We&apos;ll handle design, production, and shipping, start to finish.
            </p>
            <Link
              className="relative z-10 inline-flex items-center justify-center font-semibold text-white transition-opacity hover:opacity-90 uppercase"
              href="/contact-us"
              style={{
                fontFamily: '"DM Sans", sans-serif',
                background: "rgb(232, 115, 42)",
                borderRadius: "6px",
                width: "259px",
                height: "46px",
                padding: "12px 16px",
                fontSize: "14px",
                letterSpacing: "0.05em",
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