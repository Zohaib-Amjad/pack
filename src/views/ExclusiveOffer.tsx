"use client";

import { Tag, CheckCircle2, ArrowRight, Package2, Minimize2, Zap, Headphones } from "lucide-react";
import CustomPackingShell from "@/components/CustomPackingShell";
import CustomPackingForm from "@/components/CustomPackingForm";

const benefits = [
  { icon: Package2, label: "Premium custom packaging" },
  { icon: Minimize2, label: "Low minimums available" },
  { icon: Zap, label: "Fast production" },
  { icon: Headphones, label: "Expert support" },
];

const steps = [
  { num: "1", text: "Request a quote" },
  { num: "2", text: "Approve your packaging design" },
  { num: "3", text: "Receive 20% off your first order" },
];

const scrollToForm = () => {
  document.getElementById("offer-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function ExclusiveOffer() {
  return (
    <CustomPackingShell onGetQuoteClick={scrollToForm}>

      {/* ── Hero + Form (same layout as /custompackaging) ── */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#1f5a38_45%,#2a6b45_100%)] px-4 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14">
        <div className="mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-[1fr_430px] lg:items-start">

          {/* ── Left: Content ── */}
          <div className="pt-2 lg:pt-6">
            {/* Badge */}
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#ee7a1b] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_2px_12px_rgba(238,122,27,0.45)]">
                <Tag size={12} strokeWidth={2.5} />
                Limited Time Offer — New Customers Only
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-sans text-white [text-wrap:balance]"
              style={{ fontSize: "clamp(26px, 4.5vw, 46px)", fontWeight: 700, lineHeight: 1.12, marginBottom: 14 }}
            >
              <span className="block">Your First Order,</span>
              <span className="block text-[#ee7a1b] mt-1">Done Right.</span>
            </h1>
            <p className="mb-6 max-w-[480px] text-[15px] leading-[1.65] text-white/80">
              Claim an exclusive discount on your first custom packaging order with HOF Pack. Premium quality, low minimums, and a team dedicated to making your brand shine.
            </p>

            {/* ── Big Promo Banner ── */}
            <div className="mb-8 inline-flex flex-col items-center justify-center rounded-2xl border-2 border-[#ee7a1b]/60 bg-[#ee7a1b]/15 px-10 py-6 text-center shadow-[0_0_40px_rgba(238,122,27,0.2)]">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#f5b87a]">Exclusive Discount</p>
              <p
                className="font-extrabold text-white"
                style={{ fontSize: "clamp(56px, 10vw, 88px)", lineHeight: 1 }}
              >
                20% OFF
              </p>
              <p className="mt-1 text-[13px] font-medium text-white/70">on your first custom packaging order</p>
            </div>

            {/* Benefits */}
            <ul className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b.label} className="flex items-center gap-2.5 text-[13px] text-white/85">
                  <CheckCircle2 size={16} className="shrink-0 text-[#f19a48]" />
                  {b.label}
                </li>
              ))}
            </ul>

            {/* How It Works */}
            <div className="rounded-xl border border-white/15 bg-white/8 p-5">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/60">
                How It Works
              </p>
              <ol className="flex flex-col gap-3">
                {steps.map((step) => (
                  <li key={step.num} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ee7a1b] text-[12px] font-bold text-white">
                      {step.num}
                    </span>
                    <span className="text-[13px] text-white/85">{step.text}</span>
                    {step.num !== "3" && <ArrowRight size={13} className="ml-auto shrink-0 text-white/30" />}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* ── Right: Lead Form (same position as /custompackaging) ── */}
          <div id="offer-form">
            <CustomPackingForm source="exclusive_offer" />
          </div>

        </div>
      </section>

      {/* ── Benefits detail cards ── */}
      <section className="bg-[#f8f9f6] px-4 py-14 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
            Why HOF Pack
          </p>
          <h2 className="mb-10 text-center text-[26px] font-bold text-[#1a1a1a] sm:text-[30px]">
            What You Get With Every Order
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Package2, title: "Premium Quality", body: "Every box is produced with premium materials and rigorous quality checks before it ships to you." },
              { icon: Minimize2, title: "Low Minimums", body: "Start from as few as 100 units. Scale up as your brand grows — no huge upfront commitment required." },
              { icon: Zap, title: "Fast Production", body: "Quick turnaround times with reliable delivery straight to your door — because your launch can't wait." },
              { icon: Headphones, title: "Expert Support", body: "A dedicated specialist handles your project from first quote to final delivery, every step of the way." },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-[#e8e8e4] bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f5a38]/10">
                  <card.icon size={22} className="text-[#1f5a38]" />
                </div>
                <h3 className="mb-2 text-[15px] font-semibold text-[#1a1a1a]">{card.title}</h3>
                <p className="text-[13px] leading-[1.65] text-[#6c7170]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#2a6b45_100%)] px-4 py-14 sm:px-8">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
          <div className="rounded-full bg-[#ee7a1b]/20 px-5 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#f5b87a]">
            Don&apos;t miss out
          </div>
          <h2 className="text-[24px] font-bold text-white sm:text-[28px]">
            Claim Your 20% Discount Today
          </h2>
          <p className="text-[14px] leading-[1.65] text-white/70">
            This offer is available for new customers on their first order. Fill in the form above to lock in your discount.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 rounded-[8px] bg-[#ee7a1b] px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-[#d46710]"
            >
              Claim My Discount
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