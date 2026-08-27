"use client";

import Image from "next/image";
import { useState } from "react";
import {
    ArrowRight,
    Check,
    CheckCircle2,
    ChevronDown,
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

type CustomKraftWindowBoxesProps = {
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

const CustomKraftWindowBoxes = ({ productName }: CustomKraftWindowBoxesProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
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
            heading: `Show What’s Inside: Packaging That Sells at First Glance`,
            body: `Let your product shine with custom kraft window boxes that combine natural appeal with ‘smart’ display. The clear window adds visibility while the Kraft material keeps it eco-friendly and durable. Perfect for retail and gifting, our simple and attractive Kraft window boxes will boost your customers’ trust at first sight.`,
            image:
                "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=85&auto=format&fit=crop",
            alt: "Show What’s Inside: Packaging That Sells at First Glance",
        },
        {
            heading: `Reliable & Eco-Friendly Packaging Solutions with HOF Pack`,
            body: `At HOF Pack, get your durable, reliable, and elegant custom Kraft boxes. Explore our lamination designs, stickers, logo printing, and premium quality packaging, and get your wholesale kraft window boxes today.`,
            image:
                "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=85&auto=format&fit=crop",
            alt: "Reliable & Eco-Friendly Packaging Solutions with HOF Pack",
            flipped: true,
        },
        {
            heading: `Ready to Create Custom Kraft Window Boxes That Attract Customers?`,
            body: `Customize your Kraft window boxes today and get a free quote. Don’t wait; start your customization design journey with HOF Pack.`,
            image:
                "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1200&q=85&auto=format&fit=crop",
            alt: "Ready to Create Custom Kraft Window Boxes That Attract Customers?",
            linkLabel: "Get a Packaging Report",
        },
    ];

    const materialItems = [
        "Natural Kraft Pulp",
        "Recycled Fibres",
        "PLA Bioplastics",
        "Kraft cardboard boxes"
    ];

    const perkItems = [
        "Wholesale Pricing",
        "Fast production turnaround",
        "No Delays",
        "Innovative & High Volume Printing",
        "Free design consultation",
        "Flexible MOQ",
        "Competitive Bulk discounts",
        "Startup-friendly Packaging",
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
                                    className={`grid gap-2 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-[220px_1fr] lg:gap-6 ${index !== specificationRows.length - 1 ? "border-b border-[#ece9e2]" : ""
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
                            <div className="flex flex-col gap-4">
                                <h3 className="text-2xl font-display font-bold text-[#1a1a1a] sm:text-3xl xl:text-4xl">
                                  Kraft Paper Window Boxes That Luxury Brands Choose

                                </h3>
                                <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                                    Printed kraft boxes are an ideal choice for brands in 2026 as they create an earth-friendly image for your products, while also adding durability, aesthetics, and a personalized look.   </p>

                                <div className="h-px bg-[#e0ddd6]" />
                                <h4 className="text-sm font-semibold text-[#1a1a1a] sm:text-base">
                                 Packaging That Instantly Attracts Customers 

                                </h4>
                                <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                                   Wholesale custom Kraft window boxes offer the perfect appeal that brands look for in their packaging designs. They add charm, simplicity, and natural aesthetics to your product. 

                                </p>
                                <h4 className="text-sm font-semibold text-[#1a1a1a] sm:text-base">
                              Earth-Friendly, Window-Ready Kraft Boxes

                                </h4>
                                <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                                   Add a neutral tone to your packaging with our kraft paper window boxes. Whether you’re looking for minimalistic designs or eco-friendly options, these boxes are perfect to use. 

</p>
                                <h4 className="text-sm font-semibold text-[#1a1a1a] sm:text-base">

                               Let the Product Do the Talking 



                                </h4>
                                <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                                    Packaging is the first interaction that you have with your customers, so make it unique and memorable. Let your products do the talking with our kraft window boxes. 


                                </p>
                                <h4 className="text-sm font-semibold text-[#1a1a1a] sm:text-base">
                                   Good for the Planet, Great For Your Product



                                </h4>
                                <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                                  Custom kraft window boxes are not only good for the planet, but also for your brand. It enhances the look of your product and portrays an eco-conscious image of your brand. 
</p>
                                <h3 className="text-2xl font-display font-bold text-[#1a1a1a] sm:text-3xl xl:text-4xl">
                                 Personalized Designs That Communicate Your Brand’s Essence: 


                                </h3>
                                <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                                  We provide custom kraft window boxes wholesale that speak for themselves. It&apos;s your call to order our custom Kraft packaging boxes in bulk.
</p>
                                <div className="h-px bg-[#e0ddd6]" />
                                <h4 className="text-sm font-semibold text-[#1a1a1a] sm:text-base">
                                   Custom Sizes & Structural Designs


                                </h4>
                                <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                              Fully customize your kraft boxes to ensure a perfect fit for your products. Personalize your box with a custom length x width x height. Our team creates precise custom packaging dimensions to reduce waste and improve presentation. 



                                </p>

                                <h4 className="text-sm font-semibold text-[#1a1a1a] sm:text-base">
                                    High-Impact Printing & Logo Branding

                                </h4>
                                <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                              Professionally printed kraft boxes provide high-quality packaging solutions, including logo printing, brand colors, and detailed product information. Explore our kraft boxes with logo to reinforce your brand identity and create a consistent look. 
                </p>

                                <h4 className="text-sm font-semibold text-[#1a1a1a] sm:text-base">
                          Luxury Finishing Options for Premium Appeal

                                </h4>
                                <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                                 Upgrade your packaging game with custom Kraft packaging finishes, like embossing, debossing, foil stamping, and matte coating, to add texture and visual appeal to your boxes. 


                                </p>


                                <h4 className="text-sm font-semibold text-[#1a1a1a] sm:text-base">
                            Protective Inserts & Functional Add-Ons


                                </h4>
                                <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                               Make your products functional as well as naturally aesthetic through custom kraft boxes with a window. Protect your products with inserts designed for protection and strength.


                                </p>

                                <div className="h-px bg-[#e0ddd6]" />
                                <h3 className="text-2xl font-display font-bold text-[#1a1a1a] sm:text-3xl xl:text-4xl">
               Packaging Dressed to Impress: Multipurpose kraft paper window boxes


                                </h3>
                                <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                                  Turn ordinary packaging into an interactive brand experience with our custom shoulder rigid boxes. We deliver with utmost care and keen attention to detail. 

 </p>

                                <h4 className="text-sm font-semibold text-[#1a1a1a] sm:text-base">
                                    Kraft Window Boxes for Food and Bakery Items


                                </h4>
                                <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                           We deliver kraft paper boxes for food and bakery items, especially the hot and greasy items. Their packaging keeps the food protected from any chemicals. 


                                </p>

                                <h4 className="text-sm font-semibold text-[#1a1a1a] sm:text-base">
       Kraft Packaging for Cosmetics & Personal Care 
  


                                </h4>
                                <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                                Kraft paper boxes offer a premium, eco-friendly, and naturally aesthetic look to any brand. These are ideal for hand-made, small home-based personal care products. 


                                </p>
                                <h4 className="text-sm font-semibold text-[#1a1a1a] sm:text-base">
                           Minimalist Kraft Jewelry Packaging



                                </h4>
                                <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                                If you’re looking for a minimal and natural-toned look for your jewelry packaging, kraft paper boxes with a window are ideal to use. 


                                </p>

                                <h4 className="text-sm font-semibold text-[#1a1a1a] sm:text-base">
                          Peek-a-Boo Perfection for Kraft Gift Boxes



                                </h4>
                                <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                    Let them peek through your gifts with our custom window kraft paper boxes to elevate their unboxing experience and make it more interesting. 
                                </p>

                                {isExpanded && (

                                    <div className="flex flex-col gap-4">
                                        <div className="h-px bg-[#e0ddd6]" />
                                       <h3 className="text-2xl font-display font-bold text-[#1a1a1a] sm:text-3xl xl:text-4xl">
                                Luxury and Sustainable Materials For Custom Kraft Boxes

                                </h3>
                                <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                             Premium packaging starts with high-quality materials.  Have a look at our packaging material options for your wholesale kraft paper boxes and custom eco-friendly boxes. 
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
                                        {/* <h3 className="text-2xl font-display font-bold text-[#1a1a1a] sm:text-3xl xl:text-4xl">
                                  Order Wholesale Custom Kraft Gable Boxes with Low MOQ

                                </h3>
                                        <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                                          Order our wholesale custom Kraft gable boxes from our website. Explore our multiple categories of boxes and help us choose the best option that suits your brand and product specifications. Whether you want simple kraft paper boxes, kraft gable boxes, or kraft mailer boxes, we will help you pack your orders with style and functionality. 

                                        </p> */}

                                        <div className="h-px bg-[#e0ddd6]" />
                                        <h3 className="text-2xl font-display font-bold text-[#1a1a1a] sm:text-3xl xl:text-4xl">
                                          Why U.S. Brands Trust HOF Pack?

                                        </h3>
                                        <p className="text-sm leading-7 text-[#4a4a4a] sm:text-[15px]">
                                           U.S. Brands rely upon HOF Pack because of our easy process, innovative ideas, fast process, and high-end products’ bulk packaging. We offer quality assurance, wholesale option, functionality, speed, low MOQ, flexible prices, and worldwide shipping options. 

                                        </p>
                                        <div className="grid overflow-hidden rounded-[12px] border border-[#e0ddd6] sm:grid-cols-2">
                                            {perkItems.map((item, index) => (
                                                <div
                                                    key={item}
                                                    className={`flex items-center gap-2.5 px-4 py-3 text-[13px] text-[#3a3a3a] ${index < perkItems.length - 1 ? "border-b border-[#ece9e2] sm:[&:nth-last-child(-n+2)]:border-b-0" : ""
                                                        } ${index % 2 === 0 ? "sm:border-r sm:border-[#ece9e2]" : ""}`}
                                                >
                                                    <Check size={14} className="shrink-0 text-accent" />
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-center pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsExpanded((prev) => !prev)}
                                        className="inline-flex items-center gap-2 rounded-full border border-[#d8d4cc] px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#4a4a4a] transition-all hover:border-accent hover:text-accent"
                                    >
                                        {isExpanded ? "Read Less" : "Read More"}
                                        <ChevronDown
                                            size={14}
                                            className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CustomKraftWindowBoxes;