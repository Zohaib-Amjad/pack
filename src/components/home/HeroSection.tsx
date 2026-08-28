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
  const words = headline.trim().split(" ");
  if (words.length <= 2) return [words[0] ?? "", words.slice(1).join(" ")];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

type HeroSectionProps = {
  cms: CmsHome;
};

export default function HeroSection({ cms }: HeroSectionProps) {
  const { data } = useCmsHome();
  const liveHero = data?.hero || cms.hero;

  const [headlineWhite, headlineOrange] = splitHeadline(liveHero.headline);
  const heroAlt = liveHero.heroImageAlt || "HOF Pack";
  const eyebrow = liveHero.eyebrow?.trim() || "PREMIUM CUSTOM PACKAGING";
  const hero = buildHeroImageSources(liveHero.heroImageUrl);
  const trustPoints = liveHero.trustPoints || [];

  return (
    <div
      className="relative bg-[#2d5c3e] overflow-hidden"
      style={{ minHeight: "clamp(480px, 80vw, 480px)" }}
    >
      <picture className="absolute inset-0 block h-full w-full">
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
          className="h-full w-full object-cover object-right sm:object-right lg:object-center"
        />
      </picture>

      <div className="relative flex flex-col items-start text-left pt-10 pb-6 px-6 sm:items-start sm:text-left sm:absolute sm:inset-0 sm:justify-center sm:px-12 sm:pt-0 sm:pb-0 lg:px-[72px] z-10">
        <div className="w-full max-w-[620px]">
          {eyebrow && (
            <p className="font-sans font-bold uppercase tracking-[0.15em] text-white/80 mb-2 sm:mb-[14px] text-[10px] sm:text-[12px]">
              {eyebrow}
            </p>
          )}

          <h1
            className="font-sans text-white"
            style={{
              fontSize: "clamp(28px, 7vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.08,
              marginBottom: 12,
            }}
          >
            {headlineWhite}
            <br />
            <span className="text-accent">{headlineOrange}</span>
          </h1>

          {liveHero.subheadline && (
            <p className="font-sans text-white/95 text-[14px] sm:text-[15px] font-semibold mb-1 leading-snug">
              {liveHero.subheadline}
            </p>
          )}

          {liveHero.tagline && (
            <p
              className="font-sans text-white/75"
              style={{
                fontSize: "clamp(12px, 3.2vw, 13.5px)",
                lineHeight: 1.6,
                fontWeight: 300,
                marginBottom: 20,
              }}
            >
              {liveHero.tagline}
            </p>
          )}

          {/* Action Buttons */}
          <HeroSectionActions
            primaryCta={liveHero.primaryCta}
            secondaryCta={liveHero.secondaryCta}
          />

          {/* Trust Points Checkmarks List (if populated) */}
          {trustPoints.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 text-white/90 text-[11px] sm:text-[12px] font-medium">
              {trustPoints.map((point, idx) => (
                <div key={idx} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e8732a] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          )}

          {/* Rating Reviews & BBB Badge Strip */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-1">
            <HeroReviewLinks />

            {(liveHero.bbbTitle || liveHero.bbbSubtitle) && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 text-[11px] text-white/90">
                <ShieldCheck className="w-3.5 h-3.5 text-[#e8732a]" />
                <span className="font-bold">{liveHero.bbbTitle}</span>
                {liveHero.bbbSubtitle && (
                  <span className="text-white/60 text-[10px]">
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
