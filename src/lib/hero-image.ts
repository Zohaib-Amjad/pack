export const HERO_WIDTHS = [420, 750, 1024, 1920] as const;

export const DEFAULT_HERO_IMAGE = "/images/hero/banner.jpg";

export function withCloudinaryTransform(url: string, width: number): string {
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
}

export function buildHeroImageSources(heroImageUrl?: string | null) {
  const heroSrc = heroImageUrl?.trim() ? heroImageUrl.trim() : DEFAULT_HERO_IMAGE;

  if (!heroSrc.includes("res.cloudinary.com")) {
    return { src: heroSrc, srcSet: undefined as string | undefined };
  }

  const srcSet = HERO_WIDTHS.map((width) => `${withCloudinaryTransform(heroSrc, width)} ${width}w`).join(", ");
  const mobileSrc = withCloudinaryTransform(heroSrc, 420);
  return {
    src: withCloudinaryTransform(heroSrc, 750),
    srcSet,
    mobileSrc,
    desktopSrc: withCloudinaryTransform(heroSrc, 1920),
    mobileSrcSet: ([420, 750] as const)
      .map((width) => `${withCloudinaryTransform(heroSrc, width)} ${width}w`)
      .join(", "),
    desktopSrcSet: ([1024, 1920] as const)
      .map((width) => `${withCloudinaryTransform(heroSrc, width)} ${width}w`)
      .join(", "),
  };
}
