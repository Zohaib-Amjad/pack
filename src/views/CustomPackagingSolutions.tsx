"use client";

import {
  Tag, ArrowRight, CheckCircle2,
  Layers, Sparkles, ShoppingBag, Leaf, Award, DollarSign, Zap, Headphones,
} from "lucide-react";
import CustomPackingShell from "@/components/CustomPackingShell";
import CustomPackingForm from "@/components/CustomPackingForm";

const finishes = [
  "CMYK Printing",
  "Spot UV",
  "Embossing",
  "Debossing",
  "Foil Stamping",
];

const industries = [
  { icon: ShoppingBag, label: "Retail" },
  { icon: Tag,         label: "eCommerce" },
  { icon: Sparkles,    label: "Cosmetics" },
  { icon: Layers,      label: "Food & Beverage" },
  { icon: Zap,         label: "Electronics" },
];

const whyReasons = [
  { icon: Award,       title: "High-quality manufacturing",  body: "Every order is produced to exacting standards with premium materials and full QC before shipment." },
  { icon: DollarSign,  title: "Competitive pricing",         body: "Transparent pricing with no hidden fees. We work with your budget to deliver the best possible value." },
  { icon: Zap,         title: "Fast turnaround",             body: "Streamlined production means your packaging is ready on time — every time." },
  { icon: Headphones,  title: "Dedicated support",           body: "A dedicated specialist manages your project from first quote through to final delivery." },
  { icon: Leaf,        title: "Sustainable options",         body: "Eco-friendly materials and FSC-certified options available for brands committed to sustainability." },
];

const scrollToForm = () => {
  document.getElementById("solutions-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function CustomPackagingSolutions() {
  return (
    <CustomPackingShell onGetQuoteClick={scrollToForm}>

      {/* ── Hero + Form ── */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#1f5a38_45%,#2a6b45_100%)] px-4 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14">
        <div className="mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-[1fr_430px] lg:items-start">

          {/* Left */}
          <div className="pt-2 lg:pt-8">
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#ee7a1b] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_2px_12px_rgba(238,122,27,0.45)]">
                <Tag size={12} strokeWidth={2.5} />
                Flat 20% Off Your First Order + Free Shipping
              </span>
            </div>

            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
              HOF PACK — CUSTOM PACKAGING
            </p>
            <h1
              className="font-sans text-white"
              style={{ fontSize: "clamp(30px, 5.5vw, 50px)", fontWeight: 700, lineHeight: 1.08, marginBottom: 16 }}
            >
              Custom Packaging<br />
              <span className="text-[#f19a48]">Solutions</span>
            </h1>
            <p className="mb-8 max-w-[500px] text-[15px] leading-[1.65] text-white/80">
              Custom packaging designed to strengthen your brand and enhance customer experience. From concept to delivery — we handle everything.
            </p>

            {/* Quick benefit bullets */}
            <ul className="mb-8 flex flex-col gap-3">
              {[
                "Fully custom dimensions, materials & print",
                "Free design mockups with every quote",
                "Low MOQ — start from 100 units",
                "Reply within 1 business day",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[14px] text-white/85">
                  <CheckCircle2 size={16} className="shrink-0 text-[#f19a48]" />
                  {item}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#ee7a1b] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(238,122,27,0.35)] transition hover:bg-[#d46710]"
            >
              Get Custom Quote
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right — Lead Form */}
          <div id="solutions-form">
            <CustomPackingForm source="custom_packaging_solutions" />
          </div>
        </div>
      </section>

      {/* ── Fully Customized Packaging ── */}
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
                Every box we make is built from scratch to your exact specifications. Choose your dimensions, select your materials, and pick your printing finish — we tailor every detail to match your brand perfectly.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Tailored dimensions for a perfect product fit",
                  "Wide range of material weights and grades",
                  "Inside and outside printing available",
                  "Structural design assistance included",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] text-[#3a3a3a]">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#1f5a38]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Finishes list */}
            <div className="rounded-2xl border border-[#e8e8e4] bg-[#f8f9f6] p-8">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
                Print & Finish Options
              </p>
              <h3 className="mb-6 text-[20px] font-bold text-[#1a1a1a]">
                Premium Printing &amp; Finishes
              </h3>
              <div className="flex flex-col gap-3">
                {finishes.map((finish, i) => (
                  <div
                    key={finish}
                    className="flex items-center gap-4 rounded-xl border border-[#e4e4e0] bg-white px-5 py-3.5 shadow-sm"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1f5a38] text-[12px] font-bold text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[14px] font-medium text-[#1a1a1a]">{finish}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="bg-[#f8f9f6] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
            Industries We Serve
          </p>
          <h2 className="mb-3 text-center text-[26px] font-bold text-[#1a1a1a] sm:text-[30px]">
            Packaging for Every Industry
          </h2>
          <p className="mx-auto mb-10 max-w-[480px] text-center text-[14px] leading-[1.7] text-[#6c7170]">
            Whether you&apos;re a DTC brand or a large retailer — we have the packaging expertise for your industry.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {industries.map((ind) => (
              <div
                key={ind.label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-[#e8e8e4] bg-white px-4 py-7 shadow-sm transition hover:shadow-md hover:border-[#1f5a38]/25"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-[#1f5a38]/10 p-3">
                  <ind.icon size={24} className="text-[#1f5a38]" />
                </div>
                <p className="text-center text-[14px] font-semibold text-[#1a1a1a]">{ind.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose HOF Pack ── */}
      <section className="bg-white px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
            Why Us
          </p>
          <h2 className="mb-10 text-center text-[26px] font-bold text-[#1a1a1a] sm:text-[30px]">
            Why Choose HOF Pack
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyReasons.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-[#e8e8e4] bg-[#f9faf7] p-6 transition hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10">
                  <r.icon size={22} className="text-[#1f5a38]" />
                </div>
                <h3 className="mb-2 text-[15px] font-semibold text-[#1a1a1a]">{r.title}</h3>
                <p className="text-[13px] leading-[1.65] text-[#6c7170]">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#2a6b45_100%)] px-4 py-14 sm:px-8">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
          <h2 className="text-[24px] font-bold text-white sm:text-[28px]">
            Request Your Custom Quote
          </h2>
          <p className="text-[14px] leading-[1.65] text-white/70">
            Tell us about your project and we&apos;ll send you a free custom quote — no obligation, no commitment.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#ee7a1b] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-[#d46710]"
            >
              Get Custom Quote
              <ArrowRight size={14} />
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