"use client";

import Image, { type StaticImageData } from "next/image";
import { ArrowRight, Tag } from "lucide-react";
import CustomPackingShell from "@/components/CustomPackingShell";
import CustomPackingForm from "@/components/CustomPackingForm";

import catRigid from "@/assets/custom-packing/cat-rigid.png";
import catMailer from "@/assets/custom-packing/cat-mailer.png";
import catTuck from "@/assets/custom-packing/cat-tuck.png";
import catMylar from "@/assets/custom-packing/cat-mylar.png";
import catBakery from "@/assets/custom-packing/cat-bakery.png";
import catCandle from "@/assets/custom-packing/cat-candle.png";
import catSoap from "@/assets/custom-packing/cat-soap.png";
import heroPackaging from "@/assets/custom-packing/hero-packaging.png";

type Product = {
  title: string;
  description: string;
  image: StaticImageData;
};

const products: Product[] = [
  { title: "Rigid Boxes", description: "Luxury packaging for premium products.", image: catRigid },
  { title: "Mailer Boxes", description: "Ideal for eCommerce and subscription brands.", image: catMailer },
  { title: "Tuck Boxes", description: "Premium, high-quality and fully customized.", image: catTuck },
  { title: "Flip Top Boxes", description: "Custom flip top packaging.", image: catMylar },
  { title: "Printed Boxes", description: "Fully customized branded packaging.", image: heroPackaging },
  { title: "Retail Packaging", description: "Designed to stand out on store shelves.", image: catBakery },
  { title: "Product Packaging", description: "Custom packaging for various industries.", image: catCandle },
  { title: "Eco-Friendly Packaging", description: "Sustainable packaging options.", image: catSoap },
];

const scrollToForm = () => {
  document.getElementById("our-products-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function OurProducts() {
  return (
    <CustomPackingShell onGetQuoteClick={scrollToForm}>

      {/* ── Hero ── */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#1f5a38_45%,#2a6b45_100%)] px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1280px] text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#ee7a1b] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_2px_12px_rgba(238,122,27,0.45)]">
            <Tag size={12} strokeWidth={2.5} />
            Flat 20% Off Your First Order + Free Shipping
          </span>
          <h1
            className="mb-4 font-sans text-white"
            style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 700, lineHeight: 1.08 }}
          >
            Our Products
          </h1>
          <p className="mx-auto mb-8 max-w-[540px] text-[16px] leading-[1.7] text-white/75">
            Explore our custom packaging solutions designed for brands of all sizes.
          </p>
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 rounded-[10px] bg-[#ee7a1b] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(238,122,27,0.35)] transition hover:bg-[#d46710]"
          >
            Get a Free Quote
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="bg-[#f8f9f6] px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
            Our Range
          </p>
          <h2 className="mb-10 text-center text-[26px] font-bold text-[#1a1a1a] sm:text-[30px]">
            Packaging Built for Every Product
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#e8e8e4] bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-[200px] w-full overflow-hidden bg-[#f0f2ee]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-1.5 text-[15px] font-semibold text-[#1a1a1a]">
                    {product.title}
                  </h3>
                  <p className="mb-4 flex-1 text-[13px] leading-[1.6] text-[#6c7170]">
                    {product.description}
                  </p>
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="inline-flex items-center justify-center gap-1.5 rounded-[8px] bg-[#1f5a38] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#174830]"
                  >
                    Request Quote
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote Form — same form, same integration ── */}
      <section id="our-products-form" className="bg-white px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
            Get Started
          </p>
          <h2 className="mb-2 text-center text-[26px] font-bold text-[#1a1a1a] sm:text-[30px]">
            Tell us about your project
          </h2>
          <p className="mb-10 text-center text-[14px] text-[#6c7170]">
            Fill in the form below and we&apos;ll get back to you within 1 business day.
          </p>
          <div className="mx-auto max-w-[500px]">
            <CustomPackingForm source="our_products" />
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#2a6b45_100%)] px-4 py-14 sm:px-8">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
          <h2 className="text-[24px] font-bold text-white sm:text-[28px]">
            Don&apos;t see what you need?
          </h2>
          <p className="text-[14px] leading-[1.65] text-white/70">
            We manufacture fully custom packaging for any product. Get in touch and we&apos;ll build it for you.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#ee7a1b] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-[#d46710]"
            >
              Get a Free Quote
            </button>
            <a
              href="mailto:info@hofpack.com"
              className="inline-flex items-center gap-2 rounded-[8px] border border-white/30 px-6 py-3 text-[13px] font-semibold text-white transition hover:border-white/60"
            >
              Email Our Team
            </a>
          </div>
        </div>
      </section>

    </CustomPackingShell>
  );
}