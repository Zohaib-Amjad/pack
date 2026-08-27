import heroImgFallback from "@/assets/banner.jpg";
import type { StaticImageData } from "next/image";

export const HERO_WIDTHS = [420, 750, 1024, 1920] as const;

function resolveHeroSrc(src: string | StaticImageData): string {
  return typeof src === "string" ? src : src.src;
}

export function withCloudinaryTransform(url: string, width: number): string {
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
}

export function buildHeroImageSources(heroImageUrl?: string | null) {
  const heroSrc = heroImageUrl?.trim() ? heroImageUrl.trim() : heroImgFallback;
  const resolved = resolveHeroSrc(heroSrc);

  if (!resolved.includes("res.cloudinary.com")) {
    return { src: resolved, srcSet: undefined as string | undefined };
  }

  const srcSet = HERO_WIDTHS.map((width) => `${withCloudinaryTransform(resolved, width)} ${width}w`).join(", ");
  const mobileSrc = withCloudinaryTransform(resolved, 420);
  return {
    src: withCloudinaryTransform(resolved, 750),
    srcSet,
    mobileSrc,
    desktopSrc: withCloudinaryTransform(resolved, 1920),
    mobileSrcSet: ([420, 750] as const)
      .map((width) => `${withCloudinaryTransform(resolved, width)} ${width}w`)
      .join(", "),
    desktopSrcSet: ([1024, 1920] as const)
      .map((width) => `${withCloudinaryTransform(resolved, width)} ${width}w`)
      .join(", "),
  };
}
