"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Tag,
  ArrowRight,
  CheckCircle,
  Loader2,
} from "lucide-react";

interface ProductCard {
  title: string;
  desc: string;
  image: string;
  packagingValue: string;
}

const PRODUCTS: ProductCard[] = [
  {
    title: "Rigid Boxes",
    desc: "Luxury packaging for premium products.",
    image: "/images/categories/rigid-unboxing-experience.jpg",
    packagingValue: "Rigid box",
  },
  {
    title: "Mailer Boxes",
    desc: "Ideal for eCommerce and subscription brands.",
    image: "/images/categories/cat-mailer-boxes.jpg",
    packagingValue: "Mailer boxes",
  },
  {
    title: "Tuck Boxes",
    desc: "Premium, high-quality and fully customized.",
    image: "/images/categories/cat-tuck-boxes.jpg",
    packagingValue: "Tuck box",
  },
  {
    title: "Flip Top Boxes",
    desc: "Custom flip top packaging.",
    image: "/images/categories/display-boxes-hero.jpg",
    packagingValue: "Display box",
  },
  {
    title: "Printed Boxes",
    desc: "Fully customized branded packaging.",
    image: "/images/categories/cat-cardboard-boxes.jpg",
    packagingValue: "Craft boxes",
  },
  {
    title: "Retail Packaging",
    desc: "Designed to stand out on store shelves.",
    image: "/images/categories/cat-bakery-boxes.jpg",
    packagingValue: "Bakery box",
  },
  {
    title: "Product Packaging",
    desc: "Custom packaging for various industries.",
    image: "/images/categories/cat-candle-boxes.jpg",
    packagingValue: "Candle box",
  },
  {
    title: "Eco-Friendly Packaging",
    desc: "Sustainable packaging options.",
    image: "/images/categories/cat-kraft-boxes.jpg",
    packagingValue: "Custom food boxes",
  },
];

export default function OurProductsPage() {
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    company: "",
    packagingType: "",
    quantity: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const scrollToForm = (packagingType?: string) => {
    if (packagingType) {
      setFormData((prev) => ({ ...prev, packagingType }));
    }
    const el = document.getElementById("our-products-form");
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
          source: "Our Products Landing Page",
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setIsSubmitted(true);
      setFormData(initialForm);
    } catch {
      setIsSubmitted(true);
      setFormData(initialForm);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
    setIsSubmitted(false);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#1f5a38_45%,#2a6b45_100%)] px-4 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1280px] text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#ee7a1b] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_2px_12px_rgba(238,122,27,0.45)]">
            <Tag className="h-3 w-3 stroke-[2.5]" />
            Flat 20% Off Your First Order + Free Shipping
          </span>

          <h1
            className="mb-4 font-sans text-white text-[32px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.08]"
          >
            Our Products
          </h1>

          <p className="mx-auto mb-8 max-w-[540px] text-[16px] leading-[1.7] text-white/75">
            Explore our custom packaging solutions designed for brands of all
            sizes.
          </p>

          <button
            type="button"
            onClick={() => scrollToForm()}
            className="inline-flex items-center gap-2 rounded-[10px] bg-[#ee7a1b] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(238,122,27,0.35)] transition hover:bg-[#d46710]"
          >
            Get a Free Quote
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Product Grid Section */}
      <section className="bg-[#f8f9f6] px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
            Our Range
          </p>
          <h2 className="mb-10 text-center text-[26px] font-bold text-[#1a1a1a] sm:text-[30px]">
            Packaging Built for Every Product
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((prod, idx) => (
              <div
                key={idx}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#e8e8e4] bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-[200px] w-full overflow-hidden bg-[#f0f2ee]">
                  <Image
                    alt={prod.title}
                    src={prod.image}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-1.5 text-[15px] font-semibold text-[#1a1a1a]">
                    {prod.title}
                  </h3>
                  <p className="mb-4 flex-1 text-[13px] leading-[1.6] text-[#6c7170]">
                    {prod.desc}
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollToForm(prod.packagingValue)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-[8px] bg-[#1f5a38] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#174830]"
                  >
                    Request Quote
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="our-products-form" className="bg-white px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
            Get Started
          </p>
          <h2 className="mb-2 text-center text-[26px] font-bold text-[#1a1a1a] sm:text-[30px]">
            Tell us about your project
          </h2>
          <p className="mb-10 text-center text-[14px] text-[#6c7170]">
            Fill in the form below and we&apos;ll get back to you within 1
            business day.
          </p>

          <div className="mx-auto max-w-[500px]">
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
                    Our packaging specialists will contact you with exact
                    wholesale pricing within 1 business day.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-[#1f5a38] px-4 text-xs font-semibold text-white hover:bg-[#174830] transition-colors"
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
                        placeholder="Jane Smith"
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
                        placeholder="jane@company.com"
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
                          className="h-full w-full px-3 text-[14px] outline-none"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          required
                          maxLength={10}
                          placeholder="5551234567"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone: e.target.value.replace(/[^0-9+()-\s]/g, ""),
                            })
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
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#2a6b45_100%)] px-4 py-14 sm:px-8">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
          <h2 className="text-[24px] font-bold text-white sm:text-[28px]">
            Don&apos;t see what you need?
          </h2>
          <p className="text-[14px] leading-[1.65] text-white/70">
            We manufacture fully custom packaging for any product. Get in touch
            and we&apos;ll build it for you.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollToForm()}
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
    </main>
  );
}
