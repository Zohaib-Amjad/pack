"use client";

import Image from "next/image";
import {
  ArrowRight,
  Check,
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
} from "lucide-react";
import type { ReactNode } from "react";

type ProductSpecificationSectionProps = {
  productName: string;
};

type SpecificationRow = {
  label: string;
  icon: ReactNode;
  value: ReactNode;
};

const pillClassName =
  "inline-flex items-center rounded-full border border-[#d8d4cc] bg-[#faf8f5] px-3 py-1 text-[11px] font-medium text-[#4a4a4a]";
const goldPillClassName =
  "inline-flex items-center rounded-full border border-[#f5d5be] bg-[#fff5ee] px-3 py-1 text-[11px] font-medium text-[#c45a18]";

const ProductSpecificationSection = ({ productName }: ProductSpecificationSectionProps) => {
  const lowerProductName = productName.toLowerCase();

  const specificationRows: SpecificationRow[] = [
    {
      label: "Box Style",
      icon: <Package2 size={16} className="text-accent" />,
      value: productName,
    },
    {
      label: "Dimension (L + W + H)",
      icon: <Maximize size={16} className="text-accent" />,
      value: "All Custom Sizes & Shapes",
    },
    {
      label: "Quantities",
      icon: <Package2 size={16} className="text-accent" />,
      value: "No Minimum MOQ Required",
    },
    {
      label: "Stock",
      icon: <ShieldCheck size={16} className="text-accent" />,
      value:
        "Ranging from 60lb C1S/C2S to 400lb C1S/C2S card stock, kraft, e-flute corrugated, bux board, rigid, and Mylar bags.",
    },
    {
      label: "Printing",
      icon: <Printer size={16} className="text-accent" />,
      value: (
        <div className="flex flex-wrap gap-2">
          {["No Printing", "CMYK", "CMYK + 1 PMS color", "CMYK + 2 PMS colors"].map((item) => (
            <span key={item} className={pillClassName}>
              {item}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: "Finishing",
      icon: <Sparkles size={16} className="text-accent" />,
      value: (
        <div className="flex flex-wrap gap-2">
          {[
            "Gloss Lamination",
            "Matte Lamination",
            "Gloss AQ",
            "Gloss UV",
            "Matte UV",
            "Spot UV",
            "Embossing",
            "Debossing",
            "Gold / Silver Foiling",
            "Holographic Foiling",
          ].map((item) => (
            <span key={item} className={pillClassName}>
              {item}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: "Included Options",
      icon: <CheckCircle2 size={16} className="text-accent" />,
      value: (
        <div className="flex flex-wrap gap-2">
          {["Die Cutting", "Gluing", "Scored", "Perforation"].map((item) => (
            <span key={item} className={pillClassName}>
              {item}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: "Additional Options",
      icon: <Leaf size={16} className="text-accent" />,
      value: (
        <div className="flex flex-wrap gap-2">
          {["Eco-Friendly", "Recycled Boxes", "Biodegradable"].map((item) => (
            <span key={item} className={goldPillClassName}>
              {item}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: "Proof",
      icon: <ShieldCheck size={16} className="text-accent" />,
      value: "Flat View · 3D Mock-up · Physical Sampling (On request)",
    },
    {
      label: "Turnaround",
      icon: <Clock3 size={16} className="text-accent" />,
      value: (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-semibold text-[#1a1a1a]">4–8 Business Days</span>
          <span className="inline-flex items-center rounded-full border border-[#f5d5be] bg-[#fff5ee] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.07em] text-[#c45a18]">
            Rush Available
          </span>
        </div>
      ),
    },
  ];

  const featureItems = [
    {
      icon: <Palette size={20} className="text-accent" />,
      title: "Bold color output",
      description:
        "Expressive, striking, vibrant colors through the use of our high-quality water-based inks and advanced print buttons.",
    },
    {
      icon: <Feather size={20} className="text-accent" />,
      title: "Low-weight packaging",
      description:
        "Maintain light packaging without sacrificing security, effectively lowering your shipping expenses.",
    },
    {
      icon: <Leaf size={20} className="text-accent" />,
      title: "Earth-friendly choices",
      description:
        "Minimise your ecological footprint through FSC-certified, sustainable paperboard made from recycled fibres.",
    },
  ];

  const contentBlocks = [
    {
      heading: `Stand Out on Retail Shelves with Premium Custom ${productName}`,
      body: `Most brands miss this and regret it. Your packaging should catch your customers' attention even before they see the product. Through our custom ${lowerProductName}, we provide a distinctive, modern look that immediately helps your brand stand apart. This is why brands trust HOF Pack with premium packaging that feels elevated from the first glance.`,
      image:
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=85&auto=format&fit=crop",
      alt: "Premium rigid packaging",
    },
    {
      heading: `Order Wholesale ${productName} with Flexible MOQ`,
      body: `Are you a small business struggling to get low MOQ customisation options? You are at the right place. HOF Pack understands the challenges your startup or growing brand may be facing and helps you create ${lowerProductName} with flexible order quantities and wholesale support.`,
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=85&auto=format&fit=crop",
      alt: "Wholesale rigid packaging",
      flipped: true,
    },
    {
      heading: `Ready to Create ${productName} That Customers Love`,
      body: `With a sleek, refined shape and robust build, our packaging delivers both visual appeal and reliable product protection. Create an out-of-the-box experience your customers will remember and enjoy.`,
      image:
        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1200&q=85&auto=format&fit=crop",
      alt: "Custom rigid packaging customers love",
      linkLabel: "Get a Packaging Report",
    },
  ];

  const materialItems = [
    "Rigid Board for Luxury Strength",
    "Eco-Conscious Kraft Packaging Options",
    "High-Density Paperboard Printing Surfaces",
  ];

  const perkItems = [
    "Free design support",
    "Flexible MOQ",
    "Competitive bulk discounts",
    "Wholesale pricing facility",
    "Fast production turnaround",
    "Startup-friendly packaging",
    "Innovative design ideas",
    "No red tape mechanism",
  ];

  return (
    <>
      <section className="border-t border-[#e0ddd6] bg-[#faf8f5] py-12 sm:py-14 lg:py-16">
        <div className="container-max px-4 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                  Packaging details
                </p>
                <h2 className="text-3xl font-display font-black tracking-tight text-foreground sm:text-4xl">
                  Product Specification
                </h2>
              </div>

              <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-[#e6e1d8] bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#5a5652] sm:px-4 sm:text-[11px]">
                <ShieldCheck size={14} className="text-accent" />
                Complete packaging overview
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[#e6e1d8] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
              {specificationRows.map((row, index) => (
                <div
                  key={row.label}
                  className={`grid gap-2 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-[220px_1fr] lg:gap-6 ${
                    index !== specificationRows.length - 1 ? "border-b border-[#ece9e2]" : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-sm font-semibold text-[#1a1a1a] lg:items-start lg:pt-1">
                    {row.icon}
                    <span>{row.label}</span>
                  </div>
                  <div className="min-w-0 text-sm leading-6 text-[#4a4a4a]">{row.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e0ddd6] bg-[#faf8f5] py-14 sm:py-16 lg:py-20">
        <div className="container-max px-4 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:gap-16">
            <div className="grid gap-5 border-b border-[#e0ddd6] pb-6 sm:grid-cols-2 xl:grid-cols-3 md:gap-6 lg:gap-8">
              {featureItems.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#f5d5be] bg-[#faf8f5]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="mb-1 text-[13px] font-semibold text-[#1a1a1a]">{item.title}</p>
                    <p className="text-[12px] leading-6 text-[#5a5652]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {contentBlocks.map((block) => (
              <div key={block.heading} className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                <div className={block.flipped ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-display font-bold leading-tight text-[#1a1a1a] sm:text-3xl xl:text-4xl">
                      {block.heading}
                    </h3>
                    <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">{block.body}</p>
                    {block.linkLabel && (
                      <a
                        href="#quote"
                        className="inline-flex w-fit items-center gap-2 border-b border-[#f5d5be] pb-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-accent transition-colors hover:text-[#c45a18]"
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

            <div className="rounded-[20px] border border-[#e0ddd6] bg-white px-4 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] sm:px-6 sm:py-8 lg:px-8 xl:px-10">
              <div className="article-scroll max-h-[420px] overflow-y-auto overscroll-contain pr-2 sm:max-h-[480px]">
                <div className="flex flex-col gap-4 pb-1">
                  <h3 className="text-2xl font-display font-bold text-[#1a1a1a] sm:text-3xl xl:text-4xl">
                    Why Brands Are Switching to {productName}
                  </h3>
                  <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                    Whether launching a new product or refining your packaging approach, {lowerProductName} add a premium feel that boosts your brand’s perceived value. Many industries trust premium packaging to blend elegance, durability, and storytelling into a single standout solution.
                  </p>

                  <div className="h-px bg-[#e0ddd6]" />
                  <h4 className="text-sm font-semibold text-[#1a1a1a] sm:text-base">
                    A Unique Shape That Captures Attention Instantly
                  </h4>
                  <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                    Our unique packaging style gives your brand a distinctive look compared to more traditional options. The shape naturally commands more shelf space and draws the eye, making your brand harder to ignore in crowded retail environments.
                  </p>

                  <div className="h-px bg-[#e0ddd6]" />
                  <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                    Brands frequently use this packaging for limited-edition gifts, promotional products, and festive collections. Order gift-ready and promotional packaging with the same luxury feel customers love.
                  </p>

                  <div className="h-px bg-[#e0ddd6]" />
                  <h4 className="text-sm font-semibold text-[#1a1a1a] sm:text-base">
                    Gift and Promotional Packaging
                  </h4>
                  <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                    Brands frequently use premium boxes for limited-edition gifts, promotional products, and festive packaging collections. Order packaging that carries the same luxury presentation your audience expects.
                  </p>

                  <div className="h-px bg-[#e0ddd6]" />
                  <h4 className="text-sm font-semibold text-[#1a1a1a] sm:text-base">
                    Premium Materials Used for Custom Packaging
                  </h4>
                  <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                    High-quality materials play a crucial role in the durability and appearance of packaging. At HOF Pack, we manufacture custom packaging using premium materials that maintain both structural integrity and visual appeal.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {materialItems.map((item) => (
                      <div
                        key={item}
                        className="inline-flex items-center gap-2 rounded-[10px] border border-[#d8d4cc] bg-[#faf8f5] px-4 py-2 text-[12px] font-medium text-[#3a3a3a]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                    These materials provide excellent strength while offering smooth printing surfaces for branding and finishing. Brands that prioritise sustainability can also choose recyclable and eco-friendly materials.
                  </p>

                  <div className="h-px bg-[#e0ddd6]" />
                  <h4 className="text-sm font-semibold text-[#1a1a1a] sm:text-base">
                    Why Brands Across the USA Choose HOF Pack
                  </h4>
                  <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                    At HOF Pack, we do not compromise on quality. We prefer premium-looking finishes and dependable service for every order. We offer:
                  </p>
                  <div className="grid overflow-hidden rounded-[12px] border border-[#e0ddd6] sm:grid-cols-2">
                    {perkItems.map((item, index) => (
                      <div
                        key={item}
                        className={`flex items-center gap-2.5 px-4 py-3 text-[13px] text-[#3a3a3a] ${
                          index < perkItems.length - 1 ? "border-b border-[#ece9e2] sm:[&:nth-last-child(-n+2)]:border-b-0" : ""
                        } ${index % 2 === 0 ? "sm:border-r sm:border-[#ece9e2]" : ""}`}
                      >
                        <Check size={14} className="shrink-0 text-accent" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSpecificationSection;