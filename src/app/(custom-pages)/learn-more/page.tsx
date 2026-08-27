"use client";

import React, { useState } from "react";
import {
  Tag,
  ArrowRight,
  Palette,
  Headphones,
  Printer,
  MessageSquare,
  ShieldCheck,
  Zap,
  CheckCircle,
  Loader2,
} from "lucide-react";

export default function LearnMorePage() {
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
    const el = document.getElementById("learn-more-form");
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
          source: "Learn More Landing Page",
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
      {/* Hero Section */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#1f5a38_45%,#2a6b45_100%)] px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1280px] text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#ee7a1b] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_2px_12px_rgba(238,122,27,0.45)]">
            <Tag className="h-3 w-3 stroke-[2.5]" />
            Flat 20% Off Your First Order + Free Shipping
          </span>

          <h1
            className="mb-4 font-sans text-white text-[32px] sm:text-[44px] lg:text-[54px] font-bold leading-[1.08]"
          >
            Learn More
          </h1>

          <p className="mx-auto mb-8 max-w-[560px] text-[16px] leading-[1.7] text-white/80">
            Discover how HOF Pack helps brands create exceptional packaging
            experiences.
          </p>

          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 rounded-[10px] bg-[#ee7a1b] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(238,122,27,0.35)] transition hover:bg-[#d46710]"
          >
            Get Started Today
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="bg-[#f8f9f6] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
            What We Offer
          </p>
          <h2 className="mb-3 text-center text-[26px] font-bold text-[#1a1a1a] sm:text-[32px]">
            Everything Your Brand Needs
          </h2>
          <p className="mx-auto mb-12 max-w-[520px] text-center text-[14px] leading-[1.7] text-[#6c7170]">
            From first concept to final delivery — HOF Pack provides end-to-end
            custom packaging support for growing brands.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 */}
            <div className="group rounded-2xl border border-[#e8e8e4] bg-white p-7 shadow-sm transition hover:border-[#1f5a38]/20 hover:shadow-md">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10 p-3">
                <Palette className="h-6 w-6 text-[#1f5a38]" />
              </div>
              <h3 className="mb-2.5 text-[16px] font-semibold text-[#1a1a1a]">
                Packaging Design Support
              </h3>
              <p className="text-[13px] leading-[1.7] text-[#6c7170]">
                Our team helps bring your packaging vision to life. From concept
                to final artwork, our designers work alongside you to create
                packaging that stands out and reflects your brand identity.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group rounded-2xl border border-[#e8e8e4] bg-white p-7 shadow-sm transition hover:border-[#1f5a38]/20 hover:shadow-md">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10 p-3">
                <Headphones className="h-6 w-6 text-[#1f5a38]" />
              </div>
              <h3 className="mb-2.5 text-[16px] font-semibold text-[#1a1a1a]">
                Dedicated Account Support
              </h3>
              <p className="text-[13px] leading-[1.7] text-[#6c7170]">
                Work directly with a packaging specialist throughout your
                project. You get a single point of contact who understands your
                brand, your goals, and your timeline.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group rounded-2xl border border-[#e8e8e4] bg-white p-7 shadow-sm transition hover:border-[#1f5a38]/20 hover:shadow-md">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10 p-3">
                <Printer className="h-6 w-6 text-[#1f5a38]" />
              </div>
              <h3 className="mb-2.5 text-[16px] font-semibold text-[#1a1a1a]">
                Custom Printing Solutions
              </h3>
              <p className="text-[13px] leading-[1.7] text-[#6c7170]">
                High-quality printing and finishing options — full-colour CMYK,
                spot UV, foil stamping, embossing, matte/gloss lamination and
                more. Every finish available to make your packaging shine.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group rounded-2xl border border-[#e8e8e4] bg-white p-7 shadow-sm transition hover:border-[#1f5a38]/20 hover:shadow-md">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10 p-3">
                <MessageSquare className="h-6 w-6 text-[#1f5a38]" />
              </div>
              <h3 className="mb-2.5 text-[16px] font-semibold text-[#1a1a1a]">
                Packaging Consultation
              </h3>
              <p className="text-[13px] leading-[1.7] text-[#6c7170]">
                Expert guidance for materials, sizing, and production. Not sure
                where to start? Our consultants help you choose the right
                packaging solution for your product and budget.
              </p>
            </div>

            {/* Card 5 */}
            <div className="group rounded-2xl border border-[#e8e8e4] bg-white p-7 shadow-sm transition hover:border-[#1f5a38]/20 hover:shadow-md">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10 p-3">
                <ShieldCheck className="h-6 w-6 text-[#1f5a38]" />
              </div>
              <h3 className="mb-2.5 text-[16px] font-semibold text-[#1a1a1a]">
                Quality Assurance
              </h3>
              <p className="text-[13px] leading-[1.7] text-[#6c7170]">
                Consistent quality control throughout manufacturing. Every order
                goes through rigorous checks before it ships — so you receive
                exactly what you approved, every time.
              </p>
            </div>

            {/* Card 6 */}
            <div className="group rounded-2xl border border-[#e8e8e4] bg-white p-7 shadow-sm transition hover:border-[#1f5a38]/20 hover:shadow-md">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10 p-3">
                <Zap className="h-6 w-6 text-[#1f5a38]" />
              </div>
              <h3 className="mb-2.5 text-[16px] font-semibold text-[#1a1a1a]">
                Fast Turnaround
              </h3>
              <p className="text-[13px] leading-[1.7] text-[#6c7170]">
                Efficient production and delivery timelines. We understand
                deadlines matter. Our streamlined process gets your custom
                packaging produced and delivered without unnecessary delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner & Stats Section */}
      <section className="bg-white px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
                Why HOF Pack
              </p>
              <h2 className="mb-4 text-[26px] font-bold text-[#1a1a1a] sm:text-[30px]">
                Your Partner from Concept to Delivery
              </h2>
              <p className="mb-6 text-[14px] leading-[1.75] text-[#5a5a5a]">
                We don&apos;t just manufacture boxes — we become a part of your
                brand journey. Every project gets a dedicated team, free design
                support, and a commitment to quality that keeps our clients
                coming back.
              </p>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-3 text-[14px] text-[#3a3a3a]">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ee7a1b]"></span>
                  Free design mockups with every quote
                </li>
                <li className="flex items-start gap-3 text-[14px] text-[#3a3a3a]">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ee7a1b]"></span>
                  Low MOQ — start from just 100 units
                </li>
                <li className="flex items-start gap-3 text-[14px] text-[#3a3a3a]">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ee7a1b]"></span>
                  Reply within 1 business day
                </li>
                <li className="flex items-start gap-3 text-[14px] text-[#3a3a3a]">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ee7a1b]"></span>
                  Worldwide shipping with reliable tracking
                </li>
                <li className="flex items-start gap-3 text-[14px] text-[#3a3a3a]">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ee7a1b]"></span>
                  Eco-friendly materials available
                </li>
              </ul>
            </div>

            {/* Stats 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[#e8e8e4] bg-[#f8f9f6] p-6 text-center">
                <p className="mb-1 text-[32px] font-extrabold text-[#1f5a38]">
                  500+
                </p>
                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-[#6c7170]">
                  Brands Served
                </p>
              </div>
              <div className="rounded-2xl border border-[#e8e8e4] bg-[#f8f9f6] p-6 text-center">
                <p className="mb-1 text-[32px] font-extrabold text-[#1f5a38]">
                  100
                </p>
                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-[#6c7170]">
                  Min. Order Units
                </p>
              </div>
              <div className="rounded-2xl border border-[#e8e8e4] bg-[#f8f9f6] p-6 text-center">
                <p className="mb-1 text-[32px] font-extrabold text-[#1f5a38]">
                  1 Day
                </p>
                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-[#6c7170]">
                  Response Time
                </p>
              </div>
              <div className="rounded-2xl border border-[#e8e8e4] bg-[#f8f9f6] p-6 text-center">
                <p className="mb-1 text-[32px] font-extrabold text-[#1f5a38]">
                  100%
                </p>
                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-[#6c7170]">
                  Quality Checked
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="learn-more-form" className="bg-[#f8f9f6] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
            Get Started
          </p>
          <h2 className="mb-2 text-center text-[26px] font-bold text-[#1a1a1a] sm:text-[30px]">
            Get Started Today
          </h2>
          <p className="mb-10 text-center text-[14px] text-[#6c7170]">
            Fill in the form and our team will get back to you within 1 business
            day.
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

      {/* Bottom CTA Banner */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#2a6b45_100%)] px-4 py-14 sm:px-8">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
          <h2 className="text-[24px] font-bold text-white sm:text-[28px]">
            Ready to elevate your packaging?
          </h2>
          <p className="text-[14px] leading-[1.65] text-white/70">
            Thousands of brands trust HOF Pack for premium custom packaging.
            Let&apos;s build something great together.
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
