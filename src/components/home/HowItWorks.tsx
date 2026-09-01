"use client";

import Image from "next/image";
import { Bell } from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import { useCmsHome } from "@/hooks/useCms";
import type { CmsHome } from "@/types/cms";

const DEFAULT_IMAGES = [
  "/images/products/afe38795-24d9-47c6-b9f8-048f4d3b98d7.png",
  "/images/products/aa806591-0348-42f5-be2e-3330477f3054.png",
  "/images/products/7fde84ed-872a-454c-b74e-4f404d5d2bc4.png",
  "/images/products/f4d0a7f0-7ab2-43ee-a836-dd5be3d1321a.jpg",
];

const DEFAULT_STEPS = [
  {
    num: "1",
    step: "Step 01",
    name: "Design",
    desc: "Tell us your vision",
    tag: "Free consultation",
    img: DEFAULT_IMAGES[0],
    active: true,
  },
  {
    num: "2",
    step: "Step 02",
    name: "Proof",
    desc: "See it before we print",
    tag: "Free 3D mock-up",
    img: DEFAULT_IMAGES[1],
    active: true,
  },
  {
    num: "3",
    step: "Step 03",
    name: "Production",
    desc: "We print and inspect",
    tag: "100% QC inspected",
    img: DEFAULT_IMAGES[2],
    active: true,
  },
  {
    num: "4",
    step: "Step 04",
    name: "Delivery",
    desc: "At your door, on time",
    tag: "Free shipping USA",
    img: DEFAULT_IMAGES[3],
    active: true,
  },
];

type HowItWorksProps = {
  cms?: CmsHome;
};

const HowItWorks = ({ cms }: HowItWorksProps) => {
  const { open } = useQuoteModal();
  const { data } = useCmsHome();
  const how = data?.howItWorks || cms?.howItWorks;

  const sectionLabel = how?.sectionLabel;
  const titleLead = how?.titleLead || "From Idea to";
  const titleAccent = how?.titleAccent || "Your Door";
  const subtitle = how?.subtitle || "Four steps. No confusion. No hidden fees.";
  const ctaLabel = how?.ctaLabel || "Talk to a Designer";

  const rawSteps = Array.isArray(how?.steps) && how.steps.length > 0 ? how.steps : DEFAULT_STEPS;
  const activeSteps = (rawSteps as any[])
    .filter((s: any) => s.active !== false)
    .map((s: any, idx: number) => ({
      num: String(idx + 1),
      step: `Step 0${idx + 1}`,
      name: s.name || s.title || `Step ${idx + 1}`,
      desc: s.desc || s.description || "",
      tag:
        Array.isArray(s.details) && s.details.length > 0
          ? s.details[0]
          : s.tag || "Free consultation",
      img: s.imageUrl || s.img || DEFAULT_IMAGES[idx % DEFAULT_IMAGES.length],
    }));

  return (
    <div>
      <div className="bg-[#f5f3ee] px-4 sm:px-10 py-12 sm:py-[64px]">
        <div style={{ maxWidth: "1100px", margin: "0px auto" }}>
          {/* Header */}
          <div className="text-center sm:text-left">
            {sectionLabel && (
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#e8732a] mb-1.5">
                {sectionLabel}
              </p>
            )}
            <h2 className="font-display text-[#1a1a1a]" style={{ fontSize: "26px", fontWeight: 700 }}>
              {titleLead} <span className="text-[#e8732a]">{titleAccent}</span>
            </h2>
            {subtitle && (
              <p
                className="font-sans text-[#7a7672] mx-auto sm:mx-0"
                style={{ fontSize: "13px", marginTop: "8px", marginBottom: "28px", maxWidth: "480px" }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Mobile vertical list */}
          <div className="flex sm:hidden flex-col gap-3">
            {activeSteps.map((step) => (
              <div
                key={step.step}
                className="flex flex-row bg-white rounded-[10px] border border-[#e0ddd6] overflow-hidden"
              >
                <div className="relative w-[110px] shrink-0" style={{ aspectRatio: "1 / 1" }}>
                  <Image
                    src={step.img}
                    alt={step.name}
                    fill
                    className="object-cover"
                    sizes="110px"
                  />
                </div>
                <div className="flex-1 p-3.5 flex flex-col justify-center">
                  <div className="font-sans font-bold uppercase text-[#e8732a] text-[9.5px] tracking-[0.12em] mb-1">
                    {step.step}
                  </div>
                  <div className="font-sans font-bold text-[#1a1a1a] text-[16px] leading-tight mb-0.5">
                    {step.name}
                  </div>
                  <div className="font-sans text-[#7a7672] text-[12.5px] leading-snug mb-2">
                    {step.desc}
                  </div>
                  <div className="self-start">
                    <span className="inline-flex items-center gap-1 font-sans font-semibold text-[#2d5c3e] text-[9.5px] bg-[#edf7f1] border border-[#b8dfc8] px-2.5 py-0.5 rounded-full">
                      {step.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop grid (4 columns) */}
          <div
            className="hidden sm:grid gap-[3px]"
            style={{
              gridTemplateColumns: `repeat(${Math.max(1, Math.min(4, activeSteps.length))}, 1fr)`,
            }}
          >
            {activeSteps.map((step) => (
              <div key={step.step} className="group">
                <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                  <Image
                    src={step.img}
                    alt={step.name}
                    fill
                    className="object-cover transition-transform duration-400 group-hover:scale-[1.04]"
                    sizes="25vw"
                  />
                  <div
                    className="absolute flex items-center justify-center font-sans font-bold text-white z-10"
                    style={{
                      top: "14px",
                      left: "14px",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      background: "rgb(232, 115, 42)",
                      fontSize: "12px",
                    }}
                  >
                    {step.num}
                  </div>
                </div>
                <div
                  className="bg-white"
                  style={{
                    padding: "20px 18px 22px",
                    borderWidth: "medium 1px 1px",
                    borderStyle: "none solid solid",
                    borderColor: "currentcolor rgb(224, 221, 214) rgb(224, 221, 214)",
                  }}
                >
                  <div
                    className="font-sans font-bold uppercase text-[#e8732a]"
                    style={{ fontSize: "9px", letterSpacing: "0.15em", marginBottom: "6px" }}
                  >
                    {step.step}
                  </div>
                  <div
                    className="font-sans font-bold text-[#1a1a1a]"
                    style={{ fontSize: "17px", marginBottom: "2px" }}
                  >
                    {step.name}
                  </div>
                  <div
                    className="font-sans text-[#7a7672]"
                    style={{ fontSize: "12.5px", marginBottom: "10px" }}
                  >
                    {step.desc}
                  </div>
                  <span
                    className="inline-flex items-center gap-1 font-sans font-semibold text-[#2d5c3e]"
                    style={{
                      fontSize: "10px",
                      background: "rgb(237, 247, 241)",
                      border: "1px solid rgb(184, 223, 200)",
                      padding: "4px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {step.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom talk to designer banner */}
          <div
            className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left gap-5 rounded-xl px-5 py-6 sm:px-9 sm:py-8"
            style={{ marginTop: "32px", background: "rgb(45, 92, 62)" }}
          >
            <div className="flex flex-col items-center sm:items-start">
              <h3
                className="font-display text-white text-center sm:text-left"
                style={{ fontSize: "19px", fontWeight: 700, marginBottom: "8px" }}
              >
                Need help with your packaging design?
              </h3>
              <p
                className="font-sans text-white/65 text-center sm:text-left"
                style={{ fontSize: "13px", lineHeight: 1.65, maxWidth: "500px" }}
              >
                Our in-house design team works with you one-on-one — no templates, no extra charge.
              </p>
            </div>
            <button
              type="button"
              onClick={() => open()}
              className="inline-flex items-center justify-center gap-2 font-sans font-bold text-white rounded-[6px] flex-shrink-0 transition-colors cursor-pointer border-0 w-full sm:w-auto hover:bg-[#c45a18] shadow-xs"
              style={{
                background: "rgb(232, 115, 42)",
                fontSize: "13px",
                padding: "12px 24px",
              }}
            >
              <Bell className="w-4 h-4 text-white shrink-0 stroke-[2.2]" />
              <span>Talk to a Designer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;