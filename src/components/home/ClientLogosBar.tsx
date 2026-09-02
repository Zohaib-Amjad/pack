"use client";

import React, { useMemo } from "react";
import { Star, ShieldCheck } from "lucide-react";
import type { CmsHome } from "@/types/cms";
import { useCmsHome } from "@/hooks/useCms";

const DEFAULT_BRAND_LOGOS = [
  { alt: "ShopMax", src: "/images/brand/ecd0a299-c933-483c-8dae-143ef4f0e161.png", text: "ShopMax" },
  { alt: "NatureCo", src: "/images/brand/3bd7a2a2-3d40-49f1-8e82-989a4dff53cc.png", text: "NatureCo" },
  { alt: "TechStart", src: "/images/brand/b341f936-f848-42cd-af1a-f831636cf01f.png", text: "TechStart" },
  { alt: "LuxeLife", src: "/images/brand/b0b85fe9-b81e-4fad-8cad-2b71c4729bdb.png", text: "LuxeLife" },
  { alt: "GreenBox", src: "/images/brand/0a990bf6-8e5d-45f2-95fa-731cf04a372d.png", text: "GreenBox" },
  { alt: "PackWell", src: "/images/brand/d3857c33-8009-408d-a1e6-419253e4b7e2.png", text: "PackWell" },
  { alt: "EcoCrate", src: "/images/brand/dfbeb843-6fbb-448f-9f14-216c4cefe79c.png", text: "EcoCrate" },
  { alt: "Gilead", src: "/images/brand/5e8d59d6-1d11-46c8-999f-241cd91f9255.png", text: "Gilead" },
  { alt: "Cheerios", src: "/images/brand/9054bf8b-322c-4550-a2d1-903dc24941f5.png", text: "Cheerios" },
  { alt: "Woosh", src: "/images/brand/b234ce64-2b35-4fdc-af62-ef6d50c0956b.png", text: "Woosh" },
  { alt: "Rare Beauty", src: "/images/brand/5ca043b3-ab32-4348-9cfa-48f5505bd720.png", text: "Rare Beauty" },
  { alt: "Subtl", src: "/images/brand/028d5bd8-177b-4f7a-8612-6f643f9dc05d.png", text: "Subtl" },
] as const;

type BrandLogo = { alt: string; src: string; text: string };

function uniqueLogos(items: BrandLogo[]): BrandLogo[] {
  const seen = new Set<string>();
  const logos: BrandLogo[] = [];
  for (const item of items) {
    const key = (item.src || item.text).trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    logos.push(item);
    if (logos.length === 12) break;
  }
  return logos;
}

function twelveUniqueLogos(items: BrandLogo[]): BrandLogo[] {
  const unique = uniqueLogos(items);
  if (unique.length >= 12) return unique;
  return uniqueLogos([...unique, ...DEFAULT_BRAND_LOGOS]);
}

type ClientLogosBarProps = {
  cms?: CmsHome;
};

export default function ClientLogosBar({ cms }: ClientLogosBarProps) {
  const { data } = useCmsHome(cms);
  const liveTrustBar = data?.trustBar || cms?.trustBar;

  const prefix = liveTrustBar?.trustedPrefix !== undefined ? liveTrustBar.trustedPrefix : "Trusted by";
  const count = liveTrustBar?.brandsCount !== undefined ? liveTrustBar.brandsCount : "1,000+";
  const suffix = liveTrustBar?.trustedSuffix !== undefined ? liveTrustBar.trustedSuffix : "brands";
  const ratingLine = liveTrustBar?.ratingText !== undefined ? liveTrustBar.ratingText : "3.9 on Google";
  const usaBadge = liveTrustBar?.usaBadge !== undefined ? liveTrustBar.usaBadge : "USA Registered";

  const displayLogos = useMemo(() => {
    const activeItems = (liveTrustBar?.brandMarqueeItems || []).filter(
      (it) =>
        it.active !== false &&
        ((it.text && it.text.trim().length > 0) || (it.logoUrl && it.logoUrl.trim().length > 0)),
    );

    const fromCms: BrandLogo[] = activeItems.map((it) => ({
      alt: it.text || "Brand Logo",
      src: it.logoUrl || "",
      text: it.text || "",
    }));

    return twelveUniqueLogos(fromCms.length > 0 ? fromCms : [...DEFAULT_BRAND_LOGOS]);
  }, [liveTrustBar?.brandMarqueeItems]);

  const renderLogo = (logo: BrandLogo, key: string) => (
    <span
      key={key}
      className="inline-flex items-center justify-center whitespace-nowrap"
      style={{ padding: "0 clamp(28px, 4.5vw, 52px)" }}
    >
      {logo.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={logo.alt}
          loading="lazy"
          width={320}
          height={128}
          className="h-12 sm:h-16 md:h-20 w-auto max-w-[280px] object-contain"
          style={{ color: "transparent", background: "transparent" }}
          src={logo.src}
        />
      ) : (
        <span className="font-sans font-bold text-[22px] sm:text-[26px] text-[#1a1a1a]/40 tracking-wider">
          {logo.text}
        </span>
      )}
    </span>
  );

  return (
    <div className="bg-[#f5f3ee] border-b border-[#e0ddd6] py-6 sm:py-8 select-none">
      <div className="container-max px-4 sm:px-6 mb-4 sm:mb-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
        {(prefix || count || suffix) && (
          <p
            className="font-sans font-semibold uppercase text-[#7a7672]"
            style={{ fontSize: "11px", letterSpacing: "0.12em" }}
          >
            {prefix}{" "}
            {count && <span className="font-bold text-[#1a1a1a]">{count}</span>}{" "}
            {suffix}
          </p>
        )}

        {ratingLine && (
          <div className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold text-[#7a7672] uppercase tracking-wider">
            <span className="text-white/40 hidden sm:inline">•</span>
            <div className="flex gap-0.5 text-[#fbbc04]">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} size={11} className="fill-[#fbbc04] text-[#fbbc04]" />
                ))}
            </div>
            <span>{ratingLine}</span>
          </div>
        )}

        {usaBadge && (
          <div className="inline-flex items-center gap-1.5 font-sans text-[11px] font-bold text-[#2d5c3e] uppercase tracking-wider bg-[#edf7f1] border border-[#b8dfc8] px-2.5 py-0.5 rounded-full">
            <ShieldCheck size={12} className="text-[#2d5c3e]" />
            <span>{usaBadge}</span>
          </div>
        )}
      </div>

      <div className="overflow-hidden relative">
        <div
          className="absolute top-0 bottom-0 left-0 z-10 pointer-events-none"
          style={{ width: "80px", background: "linear-gradient(to right, #f5f3ee, transparent)" }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 z-10 pointer-events-none"
          style={{ width: "80px", background: "linear-gradient(to left, #f5f3ee, transparent)" }}
        />
        <div className="flex items-center animate-marquee-slow" style={{ width: "max-content" }}>
          {displayLogos.map((logo, i) => renderLogo(logo, `${logo.src || logo.alt}-${i}`))}
          <span aria-hidden="true" className="inline-flex items-center">
            {displayLogos.map((logo, i) => renderLogo(logo, `loop-${logo.src || logo.alt}-${i}`))}
          </span>
        </div>
      </div>
    </div>
  );
}
