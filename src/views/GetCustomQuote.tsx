"use client";

import { Tag, CheckCircle2, Maximize2, Layers, Timer, Package2 } from "lucide-react";
import CustomPackingShell from "@/components/CustomPackingShell";
import CustomPackingForm from "@/components/CustomPackingForm";

const SALES_EMAIL = "info@hofpack.com";

const features = [
  { icon: Maximize2, title: "Custom Sizes & Styles", body: "Any dimension, any shape — built exactly to your product specs." },
  { icon: Layers,    title: "Premium Print Quality", body: "Full-colour CMYK, foil, emboss, matte/gloss — every finish available." },
  { icon: Package2,  title: "Low Minimum Orders",   body: "Start from as few as 100 units. Scale up as your brand grows." },
  { icon: Timer,     title: "Fast Turnaround Times", body: "Quick production with reliable delivery straight to your door." },
];

const scrollToForm = () => {
  document.getElementById("quote-form-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function GetCustomQuote() {
  return (
    <CustomPackingShell onGetQuoteClick={scrollToForm}>

      {/* ── Hero + Form (same layout as Contact Us) ── */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#1f5a38_45%,#2a6b45_100%)] px-4 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14">
        <div className="mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-[1fr_430px] lg:items-start">

          {/* Left */}
          <div className="pt-2 lg:pt-8">
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#ee7a1b] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_2px_12px_rgba(238,122,27,0.45)]">
                <Tag size={12} strokeWidth={2.5} />
                20% Off First Order · Free Shipping
              </span>
            </div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">HOF PACK — GET A QUOTE</p>
            <h1
              className="font-sans text-white [text-wrap:balance]"
              style={{ fontSize: "clamp(26px, 4.5vw, 46px)", fontWeight: 700, lineHeight: 1.12, marginBottom: 16 }}
            >
              <span className="block">Get a Custom</span>
              <span className="block text-[#f19a48] mt-1">Packaging Quote</span>
            </h1>
            <p className="mb-6 max-w-[480px] text-[15px] leading-[1.65] text-white/80">
              Premium custom boxes tailored to your product, brand, and budget. Tell us what you need — we&apos;ll handle the rest.
            </p>
            <ul className="mb-8 flex flex-col gap-3">
              {[
                "Custom Packaging Made Simple",
                "Free design mockups with every quote",
                "Reply within 1 business day",
                "No obligation — 100% free",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[14px] text-white/85">
                  <CheckCircle2 size={16} className="shrink-0 text-[#f19a48]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Form at top same as Contact Us */}
          <div id="quote-form-top">
            <CustomPackingForm source="get_custom_quote" />
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="bg-[#f8f9f6] px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">Why HOF Pack</p>
          <h2 className="mb-10 text-center text-[26px] font-bold text-[#1a1a1a] sm:text-[30px]">Custom Packaging Made Simple</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-[#e8e8e4] bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10">
                  <f.icon size={22} className="text-[#1f5a38]" />
                </div>
                <h3 className="mb-2 text-[15px] font-semibold text-[#1a1a1a]">{f.title}</h3>
                <p className="text-[13px] leading-[1.65] text-[#6c7170]">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#2a6b45_100%)] px-4 py-14 sm:px-8">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
          <h2 className="text-[24px] font-bold text-white sm:text-[28px]">Ready to upgrade your packaging?</h2>
          <p className="text-[14px] leading-[1.65] text-white/70">Get a free custom quote today — no obligation, no commitment.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={scrollToForm} className="inline-flex items-center gap-2 rounded-[8px] bg-[#ee7a1b] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-[#d46710]">
              Get a Free Quote
            </button>
            <a href={`mailto:${SALES_EMAIL}`} className="inline-flex items-center gap-2 rounded-[8px] border border-white/30 px-6 py-3 text-[13px] font-semibold text-white transition hover:border-white/60">
              Email Our Team
            </a>
          </div>
        </div>
      </section>

    </CustomPackingShell>
  );
}