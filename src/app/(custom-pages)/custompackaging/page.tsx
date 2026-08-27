"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Tag,
  ArrowRight,
  Package,
  Sparkles,
  Leaf,
  Truck,
  Headphones,
  ShieldCheck,
  CheckCircle,
  Loader2,
} from "lucide-react";

interface ProductItem {
  title: string;
  desc: string;
  img: string;
  packagingValue: string;
}

const RANGE_PRODUCTS: ProductItem[] = [
  {
    title: "Rigid Boxes",
    desc: "Premium gift, retail and luxury packaging.",
    img: "/images/categories/cat-rigid.png",
    packagingValue: "Rigid box",
  },
  {
    title: "Mailer Boxes",
    desc: "Branded e-commerce shipping experience.",
    img: "/images/categories/cat-mailer.png",
    packagingValue: "Mailer boxes",
  },
  {
    title: "Mylar Bags",
    desc: "Stand-up pouches for coffee, snacks & more.",
    img: "/images/categories/cat-mylar.png",
    packagingValue: "Mylar bags",
  },
  {
    title: "Tuck Boxes",
    desc: "Versatile tuck-end folding cartons.",
    img: "/images/categories/cat-tuck.png",
    packagingValue: "Tuck box",
  },
  {
    title: "Bakery Boxes",
    desc: "Window boxes, pastry and cake packaging.",
    img: "/images/categories/cat-bakery.png",
    packagingValue: "Bakery box",
  },
  {
    title: "Candle Boxes",
    desc: "Elegant boxes built for candle brands.",
    img: "/images/categories/cat-candle.png",
    packagingValue: "Candle box",
  },
  {
    title: "Soap & Skincare",
    desc: "Clean, modern packaging for personal care.",
    img: "/images/categories/cat-soap.png",
    packagingValue: "Soap box",
  },
];

export default function CustomPackagingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    packagingType: "",
    quantity: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const scrollToForm = (packagingType?: string) => {
    if (packagingType) {
      setFormData((prev) => ({ ...prev, packagingType }));
    }
    const el = document.getElementById("quote-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "Custom Packaging Main Landing Page",
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      {/* Hero & Quote Section */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#1f5a38_45%,#2a6b45_100%)] px-4 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-12">
        <div className="mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-[1fr_430px] lg:items-start">
          {/* Left Hero Column */}
          <div className="pt-2 lg:pt-8">
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#ee7a1b] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_2px_12px_rgba(238,122,27,0.45)]">
                <Tag className="h-3 w-3 stroke-[2.5]" />
                Flat 20% Off Your First Order + Free Shipping
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
                ✨ Premium Custom Packaging
              </span>
            </div>

            <h1 className="max-w-[700px] text-[36px] font-bold leading-[1.03] text-white sm:text-[50px] lg:text-[60px]">
              Custom Packaging That
              <span className="block text-[#ee7a1b]">Defines Your Brand</span>
            </h1>

            <p className="mt-5 max-w-[560px] text-[14px] leading-[1.65] text-white sm:text-[15px]">
              Custom printed packaging built around your product, branding and
              order quantity. Low MOQ, free design support and worldwide
              shipping.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToForm()}
                className="inline-flex h-12 items-center gap-2 rounded-[9px] bg-[#ee7a1b] px-6 text-[15px] font-semibold leading-none text-white transition-colors hover:bg-[#d46710]"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="tel:+18884294881"
                aria-label="Call +1 (888) 429 4881"
                className="inline-flex h-12 items-center rounded-[9px] border border-white/45 px-6 text-[15px] font-medium leading-none text-white transition-colors hover:border-white/80"
              >
                Talk to Our Team
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/80">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ee7a1b]"></span>
                Low MOQ
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ee7a1b]"></span>
                Free Design Support
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ee7a1b]"></span>
                Worldwide Shipping
              </span>
            </div>
          </div>

          {/* Right Column: Quote Form */}
          <div
            id="quote-form"
            className="scroll-mt-6 rounded-[16px] bg-white p-5 shadow-[0_12px_32px_rgba(0,0,0,0.14)] sm:p-6"
          >
            <h3 className="text-[30px] font-bold leading-none text-[#1f1f1f] sm:text-[32px]">
              Get a Free Custom Quote
            </h3>
            <p className="mt-2 text-[13px] text-[#6c7170]">
              Reply within 1 business day.
            </p>

            {isSubmitted ? (
              <div className="mt-6 rounded-xl bg-[#1f5a38]/10 p-6 text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-[#1f5a38]" />
                <h4 className="mt-3 text-lg font-bold text-[#1f5a38]">
                  Quote Request Received!
                </h4>
                <p className="mt-1 text-sm text-[#5e6664]">
                  Our structural designers will review your packaging specs and
                  email your custom mockup and wholesale quote within 1 business
                  day.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-[#1f5a38] px-4 text-xs font-semibold text-white"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-[#2f2f2f]">
                      Name <span className="text-[#ee7a1b]">*</span>
                    </label>
                    <input
                      data-unfilled="name"
                      className="h-10 w-full rounded-[9px] border px-3 text-[14px] outline-none border-[#d6dad7] focus:border-[#a8b8ad]"
                      required
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-[#2f2f2f]">
                      Email <span className="text-[#ee7a1b]">*</span>
                    </label>
                    <input
                      data-unfilled="email"
                      className="h-10 w-full rounded-[9px] border px-3 text-[14px] outline-none border-[#d6dad7] focus:border-[#a8b8ad]"
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-[#2f2f2f]">
                      Phone <span className="text-[#ee7a1b]">*</span>
                    </label>
                    <div className="flex h-10 w-full overflow-hidden rounded-[9px] border border-[#d6dad7]">
                      <span className="inline-flex items-center border-r border-[#d6dad7] bg-[#f6f6f6] px-3 text-[14px] text-[#5b625f]">
                        +1
                      </span>
                      <input
                        data-unfilled="phone"
                        className="h-full w-full px-3 text-[14px] outline-none focus:border-transparent"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        required
                        maxLength={10}
                        placeholder="5551234567"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                    <p className="text-[11px] text-[#7a7a7a]">
                      10-digit USA mobile
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-[#2f2f2f]">
                      Company Name
                    </label>
                    <input
                      className="h-10 w-full rounded-[9px] border border-[#d6dad7] px-3 text-[14px] outline-none focus:border-[#a8b8ad]"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-[#2f2f2f]">
                    Packaging Type
                  </label>
                  <select
                    className="h-10 w-full rounded-[9px] border border-[#d6dad7] bg-white px-3 text-[14px] text-[#2f2f2f] outline-none focus:border-[#a8b8ad]"
                    value={formData.packagingType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        packagingType: e.target.value,
                      })
                    }
                  >
                    <option value="">Select packaging type...</option>
                    <option value="Bakery box">Bakery box</option>
                    <option value="Candle box">Candle box</option>
                    <option value="Coffee box">Coffee box</option>
                    <option value="Display box">Display box</option>
                    <option value="Craft boxes">Craft boxes</option>
                    <option value="Mailer boxes">Mailer boxes</option>
                    <option value="Mylar bags">Mylar bags</option>
                    <option value="Rigid box">Rigid box</option>
                    <option value="Custom food boxes">
                      Custom food boxes
                    </option>
                    <option value="Soap box">Soap box</option>
                    <option value="Tuck box">Tuck box</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-[#2f2f2f]">
                    Estimated Quantity
                  </label>
                  <input
                    className="h-10 w-full rounded-[9px] border px-3 text-[14px] outline-none border-[#d6dad7] focus:border-[#a8b8ad]"
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 500"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-[9px] bg-[#ee7a1b] text-[16px] font-semibold leading-none text-white transition-colors hover:bg-[#d46710] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Get My Quote"
                  )}
                </button>

                <p className="text-center text-[12px] text-[#7a7a7a]">
                  Free design support · Low MOQ · No obligation
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Hero Showcase Image Section */}
      <section className="-mt-2 px-4 pb-14 sm:px-8 sm:pb-16">
        <div className="mx-auto w-full max-w-[1280px] overflow-hidden rounded-[20px]">
          <Image
            alt="Custom packaging set"
            src="/images/hero/hero-packaging.png"
            width={1024}
            height={576}
            priority
            sizes="(max-width: 768px) 100vw, 1320px"
            className="h-auto w-full"
          />
        </div>
      </section>

      {/* Why Hof Pack Section */}
      <section className="bg-white px-4 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto w-full max-w-[1280px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#d07f3b]">
            Why Hof Pack
          </p>
          <h2 className="mt-3 max-w-[620px] text-[34px] font-bold leading-[1.05] text-[#1f4f35] sm:text-[42px]">
            A packaging partner built for growing brands
          </h2>
          <p className="mt-4 max-w-[900px] text-[18px] font-normal leading-[1.55] text-[#3f4845] sm:text-[20px]">
            Real value, no gimmicks — everything you need to launch and scale
            your packaging.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <article className="rounded-[16px] border border-[#e7e7e7] bg-white p-5 sm:p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff2e5] text-[#ee7a1b]">
                <Package className="h-[18px] w-[18px]" />
              </div>
              <h3 className="text-[24px] font-bold leading-[1.16] text-[#222] sm:text-[28px]">
                Low MOQ Available
              </h3>
              <p className="mt-3 text-[16px] leading-[1.52] text-[#505856] sm:text-[17px]">
                Order quantities that match your stage of growth — start small
                and scale up.
              </p>
            </article>

            {/* Feature 2 */}
            <article className="rounded-[16px] border border-[#e7e7e7] bg-white p-5 sm:p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff2e5] text-[#ee7a1b]">
                <Sparkles className="h-[18px] w-[18px]" />
              </div>
              <h3 className="text-[24px] font-bold leading-[1.16] text-[#222] sm:text-[28px]">
                Free Design Support
              </h3>
              <p className="mt-3 text-[16px] leading-[1.52] text-[#505856] sm:text-[17px]">
                Our in-house designers prepare print-ready artwork at no extra
                cost.
              </p>
            </article>

            {/* Feature 3 */}
            <article className="rounded-[16px] border border-[#e7e7e7] bg-white p-5 sm:p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff2e5] text-[#ee7a1b]">
                <Leaf className="h-[18px] w-[18px]" />
              </div>
              <h3 className="text-[24px] font-bold leading-[1.16] text-[#222] sm:text-[28px]">
                Eco-Friendly Materials
              </h3>
              <p className="mt-3 text-[16px] leading-[1.52] text-[#505856] sm:text-[17px]">
                Recyclable kraft, FSC paper and biodegradable options across our
                range.
              </p>
            </article>

            {/* Feature 4 */}
            <article className="rounded-[16px] border border-[#e7e7e7] bg-white p-5 sm:p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff2e5] text-[#ee7a1b]">
                <Truck className="h-[18px] w-[18px]" />
              </div>
              <h3 className="text-[24px] font-bold leading-[1.16] text-[#222] sm:text-[28px]">
                Worldwide Shipping
              </h3>
              <p className="mt-3 text-[16px] leading-[1.52] text-[#505856] sm:text-[17px]">
                Reliable delivery to your door, wherever your business
                operates.
              </p>
            </article>

            {/* Feature 5 */}
            <article className="rounded-[16px] border border-[#e7e7e7] bg-white p-5 sm:p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff2e5] text-[#ee7a1b]">
                <Headphones className="h-[18px] w-[18px]" />
              </div>
              <h3 className="text-[24px] font-bold leading-[1.16] text-[#222] sm:text-[28px]">
                Custom Packaging
              </h3>
              <p className="mt-3 text-[16px] leading-[1.52] text-[#505856] sm:text-[17px]">
                Fully bespoke shapes, sizes, finishes and print — built around
                your brand.
              </p>
            </article>

            {/* Feature 6 */}
            <article className="rounded-[16px] border border-[#e7e7e7] bg-white p-5 sm:p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#fff2e5] text-[#ee7a1b]">
                <ShieldCheck className="h-[18px] w-[18px]" />
              </div>
              <h3 className="text-[24px] font-bold leading-[1.16] text-[#222] sm:text-[28px]">
                Built for Growing Brands
              </h3>
              <p className="mt-3 text-[16px] leading-[1.52] text-[#505856] sm:text-[17px]">
                A packaging partner that grows with you, from launch to scale.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Our Range Section */}
      <section className="bg-[#f5f4eb] px-4 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#d07f3b]">
                Our Range
              </p>
              <h2 className="mt-3 text-[34px] font-bold leading-[1.05] text-[#1f4f35] sm:text-[42px]">
                Packaging built for every product
              </h2>
              <p className="mt-3 max-w-[900px] text-[18px] leading-[1.55] text-[#3f4845] sm:text-[20px]">
                From rigid gift boxes to mylar bags — fully custom printed and
                shipped to your door.
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToForm()}
              className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#d07f3b] hover:underline"
            >
              View all styles →
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {RANGE_PRODUCTS.map((prod, idx) => (
              <article
                key={idx}
                onClick={() => scrollToForm(prod.packagingValue)}
                className="group cursor-pointer overflow-hidden rounded-[16px] border border-[#e7e7e0] bg-white transition hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f0f2ee]">
                  <Image
                    alt={prod.title}
                    src={prod.img}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between gap-4 px-5 py-5 sm:px-6">
                  <div>
                    <h3 className="text-[24px] font-bold text-[#222] sm:text-[28px] group-hover:text-[#ee7a1b] transition-colors">
                      {prod.title}
                    </h3>
                    <p className="mt-1.5 text-[16px] leading-[1.5] text-[#505856] sm:text-[17px]">
                      {prod.desc}
                    </p>
                  </div>
                  <span className="mt-1 text-[#d07f3b] text-xl transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white px-4 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto w-full max-w-[1280px] text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#d07f3b]">
            Process
          </p>
          <h2 className="mt-3 text-[34px] font-bold leading-[1.05] text-[#1f4f35] sm:text-[42px]">
            How it works
          </h2>
          <p className="mx-auto mt-4 max-w-[920px] text-[18px] leading-[1.55] text-[#3f4845] sm:text-[20px]">
            From idea to delivered packaging — three simple steps.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {/* Step 01 */}
            <article className="rounded-[16px] border border-[#e7e7e7] bg-white p-5 text-left sm:p-6 shadow-sm">
              <p className="text-[46px] font-bold leading-none text-[#ee7a1b]">
                01
              </p>
              <h3 className="mt-4 text-[24px] font-bold leading-[1.15] text-[#222] sm:text-[28px]">
                Tell us what you need
              </h3>
              <p className="mt-3 text-[16px] leading-[1.52] text-[#505856] sm:text-[17px]">
                Share your product, dimensions and style — or just an idea.
                We&apos;ll guide you to the right packaging.
              </p>
            </article>

            {/* Step 02 */}
            <article className="rounded-[16px] border border-[#e7e7e7] bg-white p-5 text-left sm:p-6 shadow-sm">
              <p className="text-[46px] font-bold leading-none text-[#ee7a1b]">
                02
              </p>
              <h3 className="mt-4 text-[24px] font-bold leading-[1.15] text-[#222] sm:text-[28px]">
                Custom design &amp; pricing
              </h3>
              <p className="mt-3 text-[16px] leading-[1.52] text-[#505856] sm:text-[17px]">
                Receive print-ready mockups and transparent pricing — free and
                with no obligation.
              </p>
            </article>

            {/* Step 03 */}
            <article className="rounded-[16px] border border-[#e7e7e7] bg-white p-5 text-left sm:p-6 shadow-sm">
              <p className="text-[46px] font-bold leading-none text-[#ee7a1b]">
                03
              </p>
              <h3 className="mt-4 text-[24px] font-bold leading-[1.15] text-[#222] sm:text-[28px]">
                Production &amp; delivery
              </h3>
              <p className="mt-3 text-[16px] leading-[1.52] text-[#505856] sm:text-[17px]">
                We print, finish and ship your custom packaging straight to your
                door.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Ready to Upgrade CTA Section */}
      <section className="bg-[#f6f6f6] px-4 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto w-full max-w-[1280px] rounded-[18px] bg-[linear-gradient(120deg,#204f37_0%,#1f5a38_48%,#2f6d41_100%)] px-6 py-10 text-center sm:px-10 sm:py-12 shadow-xl">
          <h2 className="text-[34px] font-bold leading-[1.06] text-white sm:text-[44px]">
            Ready to upgrade your{" "}
            <span className="text-[#ee7a1b]">packaging?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[840px] text-[16px] leading-[1.6] text-white sm:text-[18px]">
            Tell us what you need and our team will send custom pricing,
            packaging recommendations and delivery options.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollToForm()}
              className="inline-flex h-12 items-center gap-2 rounded-[10px] bg-[#ee7a1b] px-8 text-[15px] font-semibold leading-none text-white transition-colors hover:bg-[#d46710]"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="mailto:info@hofpack.com"
              className="inline-flex h-12 items-center rounded-[10px] border border-white/35 px-7 text-[15px] font-medium leading-none text-white transition-colors hover:border-white/65"
            >
              Email Our Team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
