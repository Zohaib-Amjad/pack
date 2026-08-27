"use client";

import { Star as StarIcon, Building2 } from "lucide-react";
import Image from "next/image";
import badgeBbb from "@/assets/badge-bbb.png";
import badgeFsc from "@/assets/badge-fsc.png";
import badgeSsl from "@/assets/badge-ssl.png";
import { useCmsHome } from "@/hooks/useCms";
import { DEFAULT_CMS_HOME } from "@/data/cms-defaults";

const trustBadges = [
  { src: badgeBbb, alt: "BBB Accredited Business", label: "BBB Accredited" },
  { src: badgeFsc, alt: "FSC Certified", label: "FSC Certified" },
  { src: badgeSsl, alt: "SSL Secure", label: "SSL Secured" },
];

const TrustBar = () => {
  const { data: cms } = useCmsHome();
  const currentCms = cms || DEFAULT_CMS_HOME;
  const t = currentCms.trustBar;
  const brands = ((t?.brandMarqueeItems as any[]) || [])
    .filter((it: any) => it?.active && it?.text?.trim()?.length > 0)
    .map((it: any) => it.text.trim());
  const marqueeNames = brands.length > 0 ? brands : ["Premium Packaging", "Custom Boxes", "Eco Friendly", "Fast Turnaround", "Low MOQ"];

  return (
    <section className="border-y border-border bg-card">
      {/* ── Top row: trust statement + badges ── */}
      <div className="container-max px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: "Trusted by X brands" + star rating */}
        <div className="flex items-center gap-6 flex-wrap justify-center">
          {/* Body copy — 13px · DM Sans · 400 */}
          <p className="font-sans text-[13px] font-normal leading-none text-foreground">
            {t?.trustedPrefix || "Trusted by"}{" "}
            <span className="font-semibold text-accent">{t?.brandsCount || "5,000+"}</span>{" "}
            {t?.trustedSuffix || "Growing Brands Across the USA"}
          </p>

          {/* Star rating — body copy scale */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    size={13}
                    className="fill-accent text-accent"
                  />
                ))}
            </div>
            {/* Rating text — 13px · DM Sans · 400 */}
            <span className="font-sans text-[13px] font-normal leading-none text-muted-foreground">
              {t?.ratingText || "4.9/5 from 1,200+ Reviews"}
            </span>
          </div>
        </div>

        {/* Right: trust badges + USA badge */}
        <div className="flex items-center gap-5">
          {trustBadges.map((badge) => (
            <div key={badge.alt} className="flex items-center gap-2 group">
              <Image
                src={badge.src}
                alt={badge.alt}
                width={80}
                height={40}
                className="h-8 sm:h-9 w-auto object-contain"
              />
              {/* Badge label — ds-caption: 11px · DM Sans · 400 */}
              <span className="hidden lg:inline font-sans text-[11px] font-normal leading-none text-muted-foreground group-hover:text-foreground transition-colors">
                {badge.label}
              </span>
            </div>
          ))}

          {/* USA badge — ds-caption: 11px · DM Sans · 500 */}
          <div className="flex items-center gap-1.5 pl-3 border-l border-border">
            <Building2 size={14} className="text-accent" />
            <span className="font-sans text-[11px] font-medium leading-none tracking-[0.02em] text-foreground">
              {t?.usaBadge || "USA Based & Ships Worldwide"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom row: brand name marquee ── */}
      <div className="border-t border-border py-4 overflow-hidden">
        <div className="flex animate-marquee-slow items-center">
          {[...marqueeNames, ...marqueeNames].map((name, i) => (
            <span
              key={i}
              className="mx-10 font-display text-[18px] font-normal text-foreground/25 whitespace-nowrap tracking-[0.04em]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
