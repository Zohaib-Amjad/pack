"use client";

import React from "react";
import type { CmsHome } from "@/types/cms";
import { buildHeroImageSources } from "@/lib/hero-image";
import HeroSectionActions from "@/components/home/HeroSectionActions";
import HeroReviewLinks from "@/components/home/HeroReviewLinks";
import { useCmsHome } from "@/hooks/useCms";
import { CheckCircle2, ShieldCheck } from "lucide-react";

function splitHeadline(headline: string): [string, string] {
  if (headline.includes("\n")) {
    const [a, ...rest] = headline.split("\n");
    return [a.trim(), rest.join(" ").trim()];
  }
  const words = headline.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 4) return [words.join(" "), ""];
  const mid = Math.floor(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

type HeroSectionProps = {
  cms: CmsHome;
};

export default function HeroSection({ cms }: HeroSectionProps) {
  const { data } = useCmsHome(cms);
  const liveHero = data?.hero || cms.hero;

  const [headlineWhite, headlineOrange] = splitHeadline(liveHero.headline);
  const heroAlt = liveHero.heroImageAlt || "HOF Pack";
  const eyebrow = liveHero.eyebrow?.trim() || "PREMIUM CUSTOM PACKAGING";
  const hero = buildHeroImageSources(liveHero.heroImageUrl);
  const trustPoints = liveHero.trustPoints || [];

  return (
    <div
      className="relative bg-[#2d5c3e] overflow-hidden min-h-[520px] sm:min-h-[500px] lg:min-h-[520px] flex items-center"
    >
      <picture className="absolute inset-0 block h-full w-full translate-y-6 sm:translate-y-8 lg:translate-y-10 scale-105 origin-bottom">
        {hero.mobileSrcSet && hero.desktopSrcSet ? (
          <>
            <source media="(max-width: 639px)" srcSet={hero.mobileSrcSet} sizes="100vw" />
            <source media="(min-width: 640px)" srcSet={hero.desktopSrcSet} sizes="100vw" />
          </>
        ) : null}
        <img
          src={hero.mobileSrc ?? hero.src}
          srcSet={hero.srcSet}
          sizes="100vw"
          alt={heroAlt}
          fetchPriority="high"
          decoding="sync"
          className="h-full w-full object-cover object-[center_bottom] sm:object-right lg:object-center"
        />
      </picture>

      {/* Mobile-only greenish gradient overlay with 0.2 opacity */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#1b432a] via-[#234e33] to-[#2d5c3e] sm:hidden pointer-events-none"
        style={{ opacity: 0.2 }}
        aria-hidden="true"
      />

      <div className="relative w-full flex flex-col items-start justify-start text-left pt-2 pb-14 sm:pt-4 sm:pb-12 lg:pt-6 lg:pb-14 px-4 sm:px-10 lg:px-[72px] -translate-y-4 sm:-translate-y-7 lg:-translate-y-8 z-10">
        <div className="w-full max-w-[840px] space-y-3.5 sm:space-y-4.5">
          {eyebrow && (
            <p className="font-sans font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#f19a48] text-[10px] sm:text-[12px] mb-0.5">
              {eyebrow}
            </p>
          )}

          <h1
            className="font-sans text-white [text-wrap:balance]"
            style={{
              fontSize: "clamp(19px, 5.1vw, 46px)",
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            <span className="block">{headlineWhite}</span>
            {headlineOrange && (
              <span className="block text-accent mt-0.5 sm:mt-1">{headlineOrange}</span>
            )}
          </h1>

          {liveHero.subheadline && (
            <div className="pt-0.5">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-[13.5px] font-semibold tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#e8732a] shrink-0 animate-pulse" />
                <span>{liveHero.subheadline}</span>
              </span>
            </div>
          )}

          {liveHero.tagline && (
            <p className="font-sans text-white/80 text-[12px] sm:text-[14px] leading-relaxed max-w-lg">
              {liveHero.tagline}
            </p>
          )}

          {/* Action Buttons */}
          <div className="pt-1.5 sm:pt-2.5 w-full">
            <HeroSectionActions
              primaryCta={liveHero.primaryCta}
              secondaryCta={liveHero.secondaryCta}
            />
          </div>

          {/* Trust Points Checkmarks List (if populated) */}
          {trustPoints.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-white/95 text-[11px] sm:text-[12.5px] font-medium">
              {trustPoints.map((point, idx) => (
                <div key={idx} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#e8732a] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          )}

          {/* Rating Reviews & BBB Badge Strip */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5 sm:pt-2">
            <HeroReviewLinks />

            {(liveHero.bbbTitle || liveHero.bbbSubtitle) && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/15 text-[10.5px] sm:text-[12px] text-white/90">
                <ShieldCheck className="w-3.5 h-3.5 text-[#e8732a]" />
                <span className="font-bold">{liveHero.bbbTitle}</span>
                {liveHero.bbbSubtitle && (
                  <span className="text-white/60 text-[9.5px] sm:text-[10.5px]">
                    · {liveHero.bbbSubtitle}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
