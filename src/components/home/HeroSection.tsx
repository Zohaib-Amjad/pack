import type { CmsHome } from "@/types/cms";
import { buildHeroImageSources } from "@/lib/hero-image";
import HeroSectionActions from "@/components/home/HeroSectionActions";
import HeroReviewLinks from "@/components/home/HeroReviewLinks";

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
  const h = cms.hero;
  const [headlineWhite, headlineOrange] = splitHeadline(h.headline);
  const heroAlt = h.heroImageAlt || "HOF Pack";
  const eyebrow = h.eyebrow?.trim() || "PREMIUM CUSTOM PACKAGING";
  const hero = buildHeroImageSources(h.heroImageUrl);

  return (
    <div className="relative bg-[#2d5c3e] overflow-hidden" style={{ minHeight: "clamp(480px, 80vw, 480px)" }}>
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
        <div className="w-full max-w-[580px]">
          <p className="font-sans font-bold uppercase tracking-[0.15em] text-white/80 mb-2 sm:mb-[14px] text-[10px] sm:text-[12px]">
            {eyebrow}
          </p>

          <h1
            className="font-sans text-white"
            style={{ fontSize: "clamp(28px, 7vw, 48px)", fontWeight: 700, lineHeight: 1.08, marginBottom: 12 }}
          >
            {headlineWhite}
            <br />
            <span className="text-accent">{headlineOrange}</span>
          </h1>

          <p
            className="font-sans text-white/75"
            style={{ fontSize: "clamp(13px, 3.5vw, 14px)", lineHeight: 1.7, fontWeight: 300, marginBottom: 22 }}
          >
            {h.subheadline || h.tagline}
          </p>

          <HeroSectionActions primaryCta={h.primaryCta} secondaryCta={h.secondaryCta} />
          <HeroReviewLinks />
        </div>
      </div>
    </div>
  );
}
