"use client";

import React, { useState } from "react";
import {
  Tag,
  CheckCircle2,
  Maximize2,
  Layers,
  Package2,
  Timer,
  CheckCircle,
  Loader2,
} from "lucide-react";

export default function CustomQuotePage() {
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
          source: "Custom Quote Landing Page",
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
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#ee7a1b] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_2px_12px_rgba(238,122,27,0.45)]">
                <Tag className="h-3 w-3 stroke-[2.5]" />
                20% Off First Order · Free Shipping
              </span>
            </div>

            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
              HOF PACK — GET A QUOTE
            </p>

            <h1
              className="font-sans text-white text-[30px] sm:text-[42px] lg:text-[50px] font-bold leading-[1.08] mb-4"
            >
              Get a Custom
              <br />
              <span className="text-[#f19a48]">Packaging Quote</span>
            </h1>

            <p className="mb-6 max-w-[480px] text-[15px] leading-[1.65] text-white/80">
              Premium custom boxes tailored to your product, brand, and budget.
              Tell us what you need — we&apos;ll handle the rest.
            </p>

            {/* Checklist */}
            <ul className="mb-8 flex flex-col gap-3">
              <li className="flex items-center gap-3 text-[14px] text-white/85">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#f19a48]" />
                Custom Packaging Made Simple
              </li>
              <li className="flex items-center gap-3 text-[14px] text-white/85">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#f19a48]" />
                Free design mockups with every quote
              </li>
              <li className="flex items-center gap-3 text-[14px] text-white/85">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#f19a48]" />
                Reply within 1 business day
              </li>
              <li className="flex items-center gap-3 text-[14px] text-white/85">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#f19a48]" />
                No obligation — 100% free
              </li>
            </ul>
          </div>

          {/* Right Column: Quote Form */}
          <div id="quote-form-top">
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
                    Our packaging structural designers will send your custom quote
                    and 3D mockup within 1 business day.
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

      {/* Why HOF Pack Section */}
      <section className="bg-[#f8f9f6] px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
            Why HOF Pack
          </p>
          <h2 className="mb-10 text-center text-[26px] font-bold text-[#1a1a1a] sm:text-[30px]">
            Custom Packaging Made Simple
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#e8e8e4] bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10">
                <Maximize2 className="h-[22px] w-[22px] text-[#1f5a38]" />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold text-[#1a1a1a]">
                Custom Sizes &amp; Styles
              </h3>
              <p className="text-[13px] leading-[1.65] text-[#6c7170]">
                Any dimension, any shape — built exactly to your product specs.
              </p>
            </div>

            <div className="rounded-2xl border border-[#e8e8e4] bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10">
                <Layers className="h-[22px] w-[22px] text-[#1f5a38]" />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold text-[#1a1a1a]">
                Premium Print Quality
              </h3>
              <p className="text-[13px] leading-[1.65] text-[#6c7170]">
                Full-colour CMYK, foil, emboss, matte/gloss — every finish
                available.
              </p>
            </div>

            <div className="rounded-2xl border border-[#e8e8e4] bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10">
                <Package2 className="h-[22px] w-[22px] text-[#1f5a38]" />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold text-[#1a1a1a]">
                Low Minimum Orders
              </h3>
              <p className="text-[13px] leading-[1.65] text-[#6c7170]">
                Start from as few as 100 units. Scale up as your brand grows.
              </p>
            </div>

            <div className="rounded-2xl border border-[#e8e8e4] bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10">
                <Timer className="h-[22px] w-[22px] text-[#1f5a38]" />
              </div>
              <h3 className="mb-2 text-[15px] font-semibold text-[#1a1a1a]">
                Fast Turnaround Times
              </h3>
              <p className="text-[13px] leading-[1.65] text-[#6c7170]">
                Quick production with reliable delivery straight to your door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#2a6b45_100%)] px-4 py-14 sm:px-8">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
          <h2 className="text-[24px] font-bold text-white sm:text-[28px]">
            Ready to upgrade your packaging?
          </h2>
          <p className="text-[14px] leading-[1.65] text-white/70">
            Get a free custom quote today — no obligation, no commitment.
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
    </main>
  );
}
