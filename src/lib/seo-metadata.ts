import type { Metadata } from "next";
import type { SeoPageBlock, SeoSettings } from "@/types/seo-settings";

export function publicSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://hofpack.com").replace(/\/$/, "");
}

/** Resolve OG image: absolute URL, or site-relative path, or fallback. */
export function resolveOgImageUrl(seo: SeoSettings, fallbackPath = "/og-image.png"): string {
  const raw = seo.advanced.defaultOgImageUrl?.trim();
  const base = publicSiteUrl();
  if (!raw) return `${base}${fallbackPath.startsWith("/") ? fallbackPath : `/${fallbackPath}`}`;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return `${base}${path}`;
}

export function buildPageMetadata(path: string, block: SeoPageBlock, seo: SeoSettings): Metadata {
  const base = publicSiteUrl();
  const title = block.pageTitle.trim();
  const description = block.metaDescription.trim();
  const canonical = `${base}${path === "" ? "" : path}`;
  const ogImage = resolveOgImageUrl(seo);

  return {
    title: title ? { absolute: title } : undefined,
    description: description || undefined,
    alternates: { canonical },
    openGraph: {
      title: title || "HofPack",
      description: description || undefined,
      url: canonical,
      siteName: "HofPack",
      type: "website",
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "HofPack" }],
    },
    twitter: {
      card: "summary_large_image",
      title: title || "HofPack",
      description: description || undefined,
      images: [ogImage],
    },
  };
}
