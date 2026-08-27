"use client";

import {
  Tag,
  Palette,
  Headphones,
  Printer,
  MessageSquare,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";
import CustomPackingShell from "@/components/CustomPackingShell";
import CustomPackingForm from "@/components/CustomPackingForm";

const services = [
  {
    icon: Palette,
    title: "Packaging Design Support",
    body: "Our team helps bring your packaging vision to life. From concept to final artwork, our designers work alongside you to create packaging that stands out and reflects your brand identity.",
  },
  {
    icon: Headphones,
    title: "Dedicated Account Support",
    body: "Work directly with a packaging specialist throughout your project. You get a single point of contact who understands your brand, your goals, and your timeline.",
  },
  {
    icon: Printer,
    title: "Custom Printing Solutions",
    body: "High-quality printing and finishing options — full-colour CMYK, spot UV, foil stamping, embossing, matte/gloss lamination and more. Every finish available to make your packaging shine.",
  },
  {
    icon: MessageSquare,
    title: "Packaging Consultation",
    body: "Expert guidance for materials, sizing, and production. Not sure where to start? Our consultants help you choose the right packaging solution for your product and budget.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    body: "Consistent quality control throughout manufacturing. Every order goes through rigorous checks before it ships — so you receive exactly what you approved, every time.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    body: "Efficient production and delivery timelines. We understand deadlines matter. Our streamlined process gets your custom packaging produced and delivered without unnecessary delays.",
  },
];

const scrollToForm = () => {
  document.getElementById("learn-more-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function LearnMore() {
  return (
    <CustomPackingShell onGetQuoteClick={scrollToForm}>

      {/* ── Hero ── */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#1f5a38_45%,#2a6b45_100%)] px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1280px] text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#ee7a1b] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_2px_12px_rgba(238,122,27,0.45)]">
            <Tag size={12} strokeWidth={2.5} />
            Flat 20% Off Your First Order + Free Shipping
          </span>
          <h1
            className="mb-4 font-sans text-white"
            style={{ fontSize: "clamp(32px, 6vw, 54px)", fontWeight: 700, lineHeight: 1.08 }}
          >
            Learn More
          </h1>
          <p className="mx-auto mb-8 max-w-[560px] text-[16px] leading-[1.7] text-white/80">
            Discover how HOF Pack helps brands create exceptional packaging experiences.
          </p>
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 rounded-[10px] bg-[#ee7a1b] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(238,122,27,0.35)] transition hover:bg-[#d46710]"
          >
            Get Started Today
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="bg-[#f8f9f6] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
            What We Offer
          </p>
          <h2 className="mb-3 text-center text-[26px] font-bold text-[#1a1a1a] sm:text-[32px]">
            Everything Your Brand Needs
          </h2>
          <p className="mx-auto mb-12 max-w-[520px] text-center text-[14px] leading-[1.7] text-[#6c7170]">
            From first concept to final delivery — HOF Pack provides end-to-end custom packaging support for growing brands.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-[#e8e8e4] bg-white p-7 shadow-sm transition hover:shadow-md hover:border-[#1f5a38]/20"
              >
                <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-[#1f5a38]/10 p-3">
                  <service.icon size={24} className="text-[#1f5a38]" />
                </div>
                <h3 className="mb-2.5 text-[16px] font-semibold text-[#1a1a1a]">
                  {service.title}
                </h3>
                <p className="text-[13px] leading-[1.7] text-[#6c7170]">
                  {service.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why HOF Pack strip ── */}
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
                We don&apos;t just manufacture boxes — we become a part of your brand journey. Every project gets a dedicated team, free design support, and a commitment to quality that keeps our clients coming back.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Free design mockups with every quote",
                  "Low MOQ — start from just 100 units",
                  "Reply within 1 business day",
                  "Worldwide shipping with reliable tracking",
                  "Eco-friendly materials available",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] text-[#3a3a3a]">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ee7a1b]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats block */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "500+", label: "Brands Served" },
                { stat: "100", label: "Min. Order Units" },
                { stat: "1 Day", label: "Response Time" },
                { stat: "100%", label: "Quality Checked" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#e8e8e4] bg-[#f8f9f6] p-6 text-center"
                >
                  <p className="mb-1 text-[32px] font-extrabold text-[#1f5a38]">{item.stat}</p>
                  <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-[#6c7170]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quote Form ── */}
      <section id="learn-more-form" className="bg-[#f8f9f6] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-[#d07f3b]">
            Get Started
          </p>
          <h2 className="mb-2 text-center text-[26px] font-bold text-[#1a1a1a] sm:text-[30px]">
            Get Started Today
          </h2>
          <p className="mb-10 text-center text-[14px] text-[#6c7170]">
            Fill in the form and our team will get back to you within 1 business day.
          </p>
          <div className="mx-auto max-w-[500px]">
            <CustomPackingForm source="learn_more" />
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#2a6b45_100%)] px-4 py-14 sm:px-8">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
          <h2 className="text-[24px] font-bold text-white sm:text-[28px]">
            Ready to elevate your packaging?
          </h2>
          <p className="text-[14px] leading-[1.65] text-white/70">
            Thousands of brands trust HOF Pack for premium custom packaging. Let&apos;s build something great together.
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