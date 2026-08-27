"use client";

import { Palette, Award, Zap, Star, Headphones, Tag, Leaf, DollarSign } from "lucide-react";
import CustomPackingShell from "@/components/CustomPackingShell";
import CustomPackingForm from "@/components/CustomPackingForm";

const SALES_EMAIL = "info@hofpack.com";

const whyCards = [
  { icon: Zap, title: "Fast Response Times", body: "We reply to all inquiries within 1 business day — usually much faster." },
  { icon: Star, title: "Custom Packaging Expertise", body: "Our specialists help you find the perfect packaging solution for your product." },
  { icon: Headphones, title: "Dedicated Support Team", body: "A real person handles your inquiry from first contact to delivery." },
];

export default function ContactUsCustom() {
  const scrollToForm = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <CustomPackingShell onGetQuoteClick={scrollToForm}>

      {/* ── Hero + Form ── */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#1f5a38_45%,#2a6b45_100%)] px-4 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-12">
        <div className="mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-[1fr_430px] lg:items-start">

          {/* Left */}
          <div className="pt-2 lg:pt-8">
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#ee7a1b] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_2px_12px_rgba(238,122,27,0.45)]">
                <Tag size={12} strokeWidth={2.5} />
                Flat 20% Off Your First Order + Free Shipping
              </span>
            </div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">HOF PACK — GET IN TOUCH</p>
            <h1 className="font-sans text-white" style={{ fontSize: "clamp(30px, 6vw, 48px)", fontWeight: 700, lineHeight: 1.08, marginBottom: 16 }}>
              Contact Us
            </h1>
            <p className="mb-6 max-w-[520px] text-[15px] leading-[1.65] text-white/75">
              Get in touch with our packaging specialists. We&apos;re here to help with custom packaging solutions for your business.
            </p>

            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-2">
              {[
                { icon: Palette, label: "Custom Design", desc: "Free design support included" },
                { icon: Award,   label: "Premium Quality", desc: "Rigorous QC on every order" },
                { icon: Zap,     label: "Fast Turnaround", desc: "8–12 day production time" },
                { icon: DollarSign, label: "Competitive Pricing", desc: "Best value, no hidden fees" },
                { icon: Leaf,    label: "Eco-Friendly", desc: "Sustainable material options" },
                { icon: Star,    label: "500+ Brands Served", desc: "Trusted worldwide" },
              ].map((usp) => (
                <div key={usp.label} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white">
                  <usp.icon size={16} className="shrink-0 text-[#f19a48]" />
                  <div>
                    <p className="text-[11px] font-semibold text-white">{usp.label}</p>
                    <p className="text-[11px] text-white/55">{usp.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <ul className="flex flex-col gap-2.5">
              {["Fast response — reply within 1 business day", "Free design support included", "Low MOQ — start small and scale up"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-[13px] text-white/80">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f19a48]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — shared form */}
          <CustomPackingForm source="contact_page" />
        </div>
      </section>

      {/* ── Why Contact HOF Pack ── */}
      <section className="bg-white px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">Why Choose Us</p>
          <h2 className="mb-10 text-center text-[26px] font-bold text-[#1a1a1a] sm:text-[30px]">Why Contact HOF Pack?</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {whyCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-[#e8e8e4] bg-[#f9faf7] p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1f5a38]/10">
                  <card.icon size={22} className="text-[#1f5a38]" />
                </div>
                <h3 className="mb-2 text-[15px] font-semibold text-[#1a1a1a]">{card.title}</h3>
                <p className="text-[13px] leading-[1.6] text-[#6c7170]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#2a6b45_100%)] px-4 py-14 sm:px-8">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
          <h2 className="text-[24px] font-bold text-white sm:text-[28px]">Ready to get started?</h2>
          <p className="text-[14px] leading-[1.65] text-white/70">Fill out the form above or reach us directly — our team is standing by.</p>
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