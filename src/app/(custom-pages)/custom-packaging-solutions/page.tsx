"use client";

import React, { useState } from "react";
import {
  Tag,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Layers,
  Zap,
  Award,
  DollarSign,
  Headphones,
  Leaf,
  CheckCircle,
  Loader2,
} from "lucide-react";

export default function CustomPackagingSolutionsPage() {
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

  const scrollToForm = () => {
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
          source: "Custom Packaging Solutions Landing Page",
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
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#1f5a38_45%,#2a6b45_100%)] px-4 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14">
        <div className="mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-[1fr_430px] lg:items-start">
          {/* Left Column */}
          <div className="pt-2 lg:pt-8">
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#ee7a1b] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_2px_12px_rgba(238,122,27,0.45)]">
                <Tag className="h-3 w-3 stroke-[2.5]" />
                Flat 20% Off Your First Order + Free Shipping
              </span>
            </div>

            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
              HOF PACK — CUSTOM PACKAGING
            </p>

            <h1
              className="font-sans text-white text-[30px] sm:text-[42px] lg:text-[50px] font-bold leading-[1.08] mb-4"
            >
              Custom Packaging
              <br />
              <span className="text-[#f19a48]">Solutions</span>
            </h1>

            <p className="mb-8 max-w-[500px] text-[15px] leading-[1.65] text-white/80">
              Custom packaging designed to strengthen your brand and enhance
              customer experience. From concept to delivery — we handle
              everything.
            </p>

            <ul className="mb-8 flex flex-col gap-3">
              <li className="flex items-center gap-3 text-[14px] text-white/85">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#f19a48]" />
                Fully custom dimensions, materials &amp; print
              </li>
              <li className="flex items-center gap-3 text-[14px] text-white/85">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#f19a48]" />
                Free design mockups with every quote
              </li>
              <li className="flex items-center gap-3 text-[14px] text-white/85">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#f19a48]" />
                Low MOQ — start from 100 units
              </li>
              <li className="flex items-center gap-3 text-[14px] text-white/85">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#f19a48]" />
                Reply within 1 business day
              </li>
            </ul>

            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#ee7a1b] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(238,122,27,0.35)] transition hover:bg-[#d46710]"
            >
              Get Custom Quote
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Right Column: Quote Form */}
          <div id="solutions-form">
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
                    Our structural engineers will analyze your packaging
                    requirements and send wholesale pricing within 1 business
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
        </div>
      </section>

      {/* Customization & Finishes Section */}
      <section className="bg-white px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
                Fully Custom
              </p>
              <h2 className="mb-4 text-[26px] font-bold text-[#1a1a1a] sm:text-[30px]">
                Fully Customized Packaging
              </h2>
              <p className="mb-6 text-[14px] leading-[1.75] text-[#5a5a5a]">
                Every box we make is built from scratch to your exact
                specifications. Choose your dimensions, select your materials,
                and pick your printing finish — we tailor every detail to match
                your brand perfectly.
              </p>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-3 text-[14px] text-[#3a3a3a]">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#1f5a38]"></span>
                  Tailored dimensions for a perfect product fit
                </li>
                <li className="flex items-start gap-3 text-[14px] text-[#3a3a3a]">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#1f5a38]"></span>
                  Wide range of material weights and grades
                </li>
                <li className="flex items-start gap-3 text-[14px] text-[#3a3a3a]">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#1f5a38]"></span>
                  Inside and outside printing available
                </li>
                <li className="flex items-start gap-3 text-[14px] text-[#3a3a3a]">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#1f5a38]"></span>
                  Structural design assistance included
                </li>
              </ul>
            </div>

            {/* Printing Finishes 01-05 */}
            <div className="rounded-2xl border border-[#e8e8e4] bg-[#f8f9f6] p-8">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
                Print &amp; Finish Options
              </p>
              <h3 className="mb-6 text-[20px] font-bold text-[#1a1a1a]">
                Premium Printing &amp; Finishes
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 rounded-xl border border-[#e4e4e0] bg-white px-5 py-3.5 shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1f5a38] text-[12px] font-bold text-white">
                    01
                  </span>
                  <span className="text-[14px] font-medium text-[#1a1a1a]">
                    CMYK Printing
                  </span>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-[#e4e4e0] bg-white px-5 py-3.5 shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1f5a38] text-[12px] font-bold text-white">
                    02
                  </span>
                  <span className="text-[14px] font-medium text-[#1a1a1a]">
                    Spot UV
                  </span>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-[#e4e4e0] bg-white px-5 py-3.5 shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1f5a38] text-[12px] font-bold text-white">
                    03
                  </span>
                  <span className="text-[14px] font-medium text-[#1a1a1a]">
                    Embossing
                  </span>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-[#e4e4e0] bg-white px-5 py-3.5 shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1f5a38] text-[12px] font-bold text-white">
                    04
                  </span>
                  <span className="text-[14px] font-medium text-[#1a1a1a]">
                    Debossing
                  </span>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-[#e4e4e0] bg-white px-5 py-3.5 shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1f5a38] text-[12px] font-bold text-white">
                    05
                  </span>
                  <span className="text-[14px] font-medium text-[#1a1a1a]">
                    Foil Stamping
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="bg-[#f8f9f6] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
            Industries We Serve
          </p>
          <h2 className="mb-3 text-center text-[26px] font-bold text-[#1a1a1a] sm:text-[30px]">
            Packaging for Every Industry
          </h2>
          <p className="mx-auto mb-10 max-w-[480px] text-center text-[14px] leading-[1.7] text-[#6c7170]">
            Whether you&apos;re a DTC brand or a large retailer — we have the
            packaging expertise for your industry.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#e8e8e4] bg-white px-4 py-7 shadow-sm transition hover:border-[#1f5a38]/25 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10 p-3">
                <ShoppingBag className="h-6 w-6 text-[#1f5a38]" />
              </div>
              <p className="text-center text-[14px] font-semibold text-[#1a1a1a]">
                Retail
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#e8e8e4] bg-white px-4 py-7 shadow-sm transition hover:border-[#1f5a38]/25 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10 p-3">
                <Tag className="h-6 w-6 text-[#1f5a38]" />
              </div>
              <p className="text-center text-[14px] font-semibold text-[#1a1a1a]">
                eCommerce
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#e8e8e4] bg-white px-4 py-7 shadow-sm transition hover:border-[#1f5a38]/25 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10 p-3">
                <Sparkles className="h-6 w-6 text-[#1f5a38]" />
              </div>
              <p className="text-center text-[14px] font-semibold text-[#1a1a1a]">
                Cosmetics
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#e8e8e4] bg-white px-4 py-7 shadow-sm transition hover:border-[#1f5a38]/25 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10 p-3">
                <Layers className="h-6 w-6 text-[#1f5a38]" />
              </div>
              <p className="text-center text-[14px] font-semibold text-[#1a1a1a]">
                Food &amp; Beverage
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#e8e8e4] bg-white px-4 py-7 shadow-sm transition hover:border-[#1f5a38]/25 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10 p-3">
                <Zap className="h-6 w-6 text-[#1f5a38]" />
              </div>
              <p className="text-center text-[14px] font-semibold text-[#1a1a1a]">
                Electronics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose HOF Pack */}
      <section className="bg-white px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
            Why Us
          </p>
          <h2 className="mb-10 text-center text-[26px] font-bold text-[#1a1a1a] sm:text-[30px]">
            Why Choose HOF Pack
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#e8e8e4] bg-[#f9faf7] p-6 transition hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10">
                <Award className="h-[22px] w-[22px] text-[#1f5a38]" />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold text-[#1a1a1a]">
                High-quality manufacturing
              </h3>
              <p className="text-[13px] leading-[1.65] text-[#6c7170]">
                Every order is produced to exacting standards with premium
                materials and full QC before shipment.
              </p>
            </div>

            <div className="rounded-2xl border border-[#e8e8e4] bg-[#f9faf7] p-6 transition hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10">
                <DollarSign className="h-[22px] w-[22px] text-[#1f5a38]" />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold text-[#1a1a1a]">
                Competitive pricing
              </h3>
              <p className="text-[13px] leading-[1.65] text-[#6c7170]">
                Transparent pricing with no hidden fees. We work with your budget
                to deliver the best possible value.
              </p>
            </div>

            <div className="rounded-2xl border border-[#e8e8e4] bg-[#f9faf7] p-6 transition hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10">
                <Zap className="h-[22px] w-[22px] text-[#1f5a38]" />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold text-[#1a1a1a]">
                Fast turnaround
              </h3>
              <p className="text-[13px] leading-[1.65] text-[#6c7170]">
                Streamlined production means your packaging is ready on time —
                every time.
              </p>
            </div>

            <div className="rounded-2xl border border-[#e8e8e4] bg-[#f9faf7] p-6 transition hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10">
                <Headphones className="h-[22px] w-[22px] text-[#1f5a38]" />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold text-[#1a1a1a]">
                Dedicated support
              </h3>
              <p className="text-[13px] leading-[1.65] text-[#6c7170]">
                A dedicated specialist manages your project from first quote
                through to final delivery.
              </p>
            </div>

            <div className="rounded-2xl border border-[#e8e8e4] bg-[#f9faf7] p-6 transition hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10">
                <Leaf className="h-[22px] w-[22px] text-[#1f5a38]" />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold text-[#1a1a1a]">
                Sustainable options
              </h3>
              <p className="text-[13px] leading-[1.65] text-[#6c7170]">
                Eco-friendly materials and FSC-certified options available for
                brands committed to sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#2a6b45_100%)] px-4 py-14 sm:px-8">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
          <h2 className="text-[24px] font-bold text-white sm:text-[28px]">
            Request Your Custom Quote
          </h2>
          <p className="text-[14px] leading-[1.65] text-white/70">
            Tell us about your project and we&apos;ll send you a free custom
            quote — no obligation, no commitment.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#ee7a1b] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-[#d46710]"
            >
              Get Custom Quote
              <ArrowRight className="h-3.5 w-3.5" />
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
