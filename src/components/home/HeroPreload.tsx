import { preload } from "react-dom";
import { buildHeroImageSources } from "@/lib/hero-image";
import type { CmsHome } from "@/types/cms";

type HeroPreloadProps = {
  cms: CmsHome;
};

/** Early LCP preload — mobile/desktop media queries reduce resource load delay. */
export default function HeroPreload({ cms }: HeroPreloadProps) {
  const hero = buildHeroImageSources(cms.hero.heroImageUrl);

  if (!hero.srcSet || !hero.mobileSrc || !hero.desktopSrc || !hero.mobileSrcSet || !hero.desktopSrcSet) {
    preload(hero.src, { as: "image", fetchPriority: "high" });
    return <link rel="preload" as="image" href={hero.src} fetchPriority="high" />;
  }

  preload(hero.mobileSrc, { as: "image", fetchPriority: "high" });
  preload(hero.desktopSrc, { as: "image", fetchPriority: "high" });

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={hero.mobileSrc}
        imageSrcSet={hero.mobileSrcSet}
        imageSizes="100vw"
        media="(max-width: 639px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={hero.desktopSrc}
        imageSrcSet={hero.desktopSrcSet}
        imageSizes="100vw"
        media="(min-width: 640px)"
        fetchPriority="high"
      />
    </>
  );
}
