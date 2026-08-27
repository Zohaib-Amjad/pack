import {
  DEFAULT_CMS_ABOUT,
  DEFAULT_CMS_HOME,
  DEFAULT_CMS_LIBRARY,
  DEFAULT_CMS_PORTFOLIO,
  DEFAULT_CMS_PROCESS,
} from "@/data/cms-defaults";
import type {
  CmsAbout,
  CmsAboutCert,
  CmsAboutStat,
  CmsAboutTimelineItem,
  CmsAboutValue,
  CmsHome,
  CmsHomeAnnouncement,
  CmsHomeAnnouncementItem,
  CmsHomeHowItWorks,
  CmsHomeHowStep,
  CmsHomePackaging,
  CmsHomePackagingItem,
  CmsHomeSustainability,
  CmsHomeSustainabilityPoint,
  CmsHomeTestimonial,
  CmsHomeTestimonials,
  CmsHomeTrustBar,
  CmsHomeTrustBarMarqueeItem,
  CmsHomeWhyUs,
  CmsHomeWhyUsCard,
  CmsLibrary,
  CmsPortfolio,
  CmsProcess,
} from "@/types/cms";
import { deepMerge } from "@/lib/cms-merge";

function cloneDefaults<T>(x: T): T {
  return JSON.parse(JSON.stringify(x)) as T;
}

function annItemHash(text: string): string {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (Math.imul(31, h) + text.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
}

function normalizeAnnouncementItems(list: unknown[]): CmsHomeAnnouncementItem[] {
  return list.map((it, i) => {
    const row = it && typeof it === "object" ? (it as Record<string, unknown>) : {};
    const id = typeof row.id === "string" && row.id.length > 0 ? row.id : `ann-${i}`;
    const text = typeof row.text === "string" ? row.text : "";
    const active = row.active !== false;
    return { id, text, active };
  });
}

function normalizeMarqueeItems(list: unknown[]): CmsHomeTrustBarMarqueeItem[] {
  return list.map((it, i) => {
    const row = it && typeof it === "object" ? (it as Record<string, unknown>) : {};
    const id = typeof row.id === "string" && row.id.length > 0 ? row.id : `marq-${i}`;
    const text = typeof row.text === "string" ? row.text : "";
    const active = row.active !== false;
    const logoUrl =
      typeof row.logoUrl === "string" && row.logoUrl.trim().length > 0
        ? row.logoUrl.trim()
        : undefined;
    return { id, text, active, ...(logoUrl ? { logoUrl } : {}) };
  });
}

function announcementFromMerged(mergedAnn: unknown): CmsHomeAnnouncement {
  const box = mergedAnn && typeof mergedAnn === "object" ? (mergedAnn as Record<string, unknown>) : {};
  const segments = box.segments;
  if (Array.isArray(segments) && segments.length > 0) {
    const strings = segments.filter((s): s is string => typeof s === "string" && s.trim().length > 0);
    return {
      items: strings.map((text, i) => ({
        id: `ann-${i}-${annItemHash(text)}`,
        text,
        active: true,
      })),
    };
  }
  const items = box.items;
  if (Array.isArray(items)) {
    return {
      items: items.length > 0 ? normalizeAnnouncementItems(items) : [],
    };
  }
  return cloneDefaults(DEFAULT_CMS_HOME).announcement;
}

function trustBarFromMerged(mergedTb: unknown): CmsHomeTrustBar {
  const def = cloneDefaults(DEFAULT_CMS_HOME).trustBar;
  const box = mergedTb && typeof mergedTb === "object" ? (mergedTb as Record<string, unknown>) : {};

  const baseFields = {
    trustedPrefix: String(box.trustedPrefix ?? def.trustedPrefix),
    brandsCount: String(box.brandsCount ?? def.brandsCount),
    trustedSuffix: String(box.trustedSuffix ?? def.trustedSuffix),
    ratingText: String(box.ratingText ?? def.ratingText),
    usaBadge: String(box.usaBadge ?? def.usaBadge),
  };

  const legacy = box.brandMarquee;
  if (Array.isArray(legacy) && legacy.length > 0 && typeof legacy[0] === "string") {
    const strings = legacy.filter((s): s is string => typeof s === "string" && s.trim().length > 0);
    return {
      ...baseFields,
      brandMarqueeItems: strings.map((text, i) => ({
        id: `marq-${i}-${annItemHash(text)}`,
        text,
        active: true,
      })),
    };
  }

  const items = box.brandMarqueeItems;
  if (Array.isArray(items)) {
    return {
      ...baseFields,
      brandMarqueeItems: items.length > 0 ? normalizeMarqueeItems(items) : [],
    };
  }

  return def;
}

function normalizeWhyUsCard(it: unknown, index: number): CmsHomeWhyUsCard {
  const row = it && typeof it === "object" ? (it as Record<string, unknown>) : {};
  const title = String(row.title ?? "");
  const desc = String(row.desc ?? "");
  const stat = String(row.stat ?? "");
  const statLabel = String(row.statLabel ?? "");
  const featured = row.featured === true;
  const active = row.active !== false;
  const id =
    typeof row.id === "string" && row.id.length > 0
      ? row.id
      : `why-${index}-${annItemHash(`${title}|${stat}`)}`;
  return { id, title, desc, stat, statLabel, featured, active };
}

function whyUsFromMerged(mergedW: unknown): CmsHomeWhyUs {
  const def = cloneDefaults(DEFAULT_CMS_HOME).whyUs;
  const box = mergedW && typeof mergedW === "object" ? (mergedW as Record<string, unknown>) : {};
  const cardsRaw = box.cards;
  const cards = Array.isArray(cardsRaw)
    ? cardsRaw.map((c, i) => normalizeWhyUsCard(c, i))
    : def.cards;
  return {
    sectionLabel: String(box.sectionLabel ?? def.sectionLabel),
    titleLead: String(box.titleLead ?? def.titleLead),
    titleAccent: String(box.titleAccent ?? def.titleAccent),
    description: String(box.description ?? def.description),
    cards,
    ctaLabel: String(box.ctaLabel ?? def.ctaLabel),
    ctaHref: String(box.ctaHref ?? def.ctaHref),
  };
}

function relatedProductsFromMerged(mergedR: unknown): CmsHome["relatedProducts"] {
  const def = cloneDefaults(DEFAULT_CMS_HOME).relatedProducts;
  const box = mergedR && typeof mergedR === "object" ? (mergedR as Record<string, unknown>) : {};
  const idsRaw = box.selectedProductIds;
  const selectedProductIds = Array.isArray(idsRaw)
    ? idsRaw.filter((id): id is string => typeof id === "string" && id.trim().length > 0)
    : def.selectedProductIds;
  const parsedLimit = Number(box.limit);
  const limit = Number.isFinite(parsedLimit)
    ? Math.max(1, Math.min(24, Math.round(parsedLimit)))
    : def.limit;
  return {
    enabled: box.enabled !== false,
    sectionLabel: String(box.sectionLabel ?? def.sectionLabel),
    titleLead: String(box.titleLead ?? def.titleLead),
    titleAccent: String(box.titleAccent ?? def.titleAccent),
    viewAllLabel: String(box.viewAllLabel ?? def.viewAllLabel),
    viewAllHref: String(box.viewAllHref ?? def.viewAllHref),
    selectedProductIds,
    autoFillWhenEmpty: box.autoFillWhenEmpty !== false,
    limit,
  };
}

function moreProductsFromMerged(mergedM: unknown): CmsHome["moreProducts"] {
  const def = cloneDefaults(DEFAULT_CMS_HOME).moreProducts;
  const box = mergedM && typeof mergedM === "object" ? (mergedM as Record<string, unknown>) : {};
  const idsRaw = box.selectedProductIds;
  const selectedProductIds = Array.isArray(idsRaw)
    ? idsRaw.filter((id): id is string => typeof id === "string" && id.trim().length > 0)
    : def.selectedProductIds;
  const parsedLimit = Number(box.limit);
  const limit = Number.isFinite(parsedLimit)
    ? Math.max(1, Math.min(24, Math.round(parsedLimit)))
    : def.limit;

  return {
    enabled: box.enabled !== false,
    title: String(box.title ?? def.title),
    description: String(box.description ?? def.description),
    selectedProductIds,
    limit,
  };
}

const SUST_ICONS = ["leaf", "heart", "recycle", "tree"] as const;
function parseSustIcon(x: unknown): CmsHomeSustainabilityPoint["icon"] {
  const s = typeof x === "string" ? x : "";
  return (SUST_ICONS as readonly string[]).includes(s) ? (s as CmsHomeSustainabilityPoint["icon"]) : "leaf";
}

function normalizeSustainabilityPoint(it: unknown, index: number): CmsHomeSustainabilityPoint {
  const row = it && typeof it === "object" ? (it as Record<string, unknown>) : {};
  const id =
    typeof row.id === "string" && row.id.length > 0
      ? row.id
      : `sus-${index}-${annItemHash(String(row.title ?? ""))}`;
  return {
    id,
    icon: parseSustIcon(row.icon),
    title: String(row.title ?? ""),
    desc: String(row.desc ?? ""),
    active: row.active !== false,
  };
}

function sustainabilityFromMerged(merged: unknown): CmsHomeSustainability {
  const def = cloneDefaults(DEFAULT_CMS_HOME).sustainability;
  const box = merged && typeof merged === "object" ? (merged as Record<string, unknown>) : {};
  const pointsRaw = box.points;
  const points = Array.isArray(pointsRaw)
    ? pointsRaw.map((p, i) => normalizeSustainabilityPoint(p, i))
    : def.points;
  const statsRaw = box.stats;
  const stats =
    Array.isArray(statsRaw) && statsRaw.length > 0
      ? statsRaw.map((s: unknown) => {
          const r = s && typeof s === "object" ? (s as Record<string, unknown>) : {};
          return { value: String(r.value ?? ""), label: String(r.label ?? "") };
        })
      : def.stats;
  return {
    sectionLabel: String(box.sectionLabel ?? def.sectionLabel),
    titleLead: String(box.titleLead ?? def.titleLead),
    titleAccent: String(box.titleAccent ?? def.titleAccent),
    body: String(box.body ?? def.body),
    points,
    panelTitle: String(box.panelTitle ?? def.panelTitle),
    panelSubtitle: String(box.panelSubtitle ?? def.panelSubtitle),
    stats,
    ctaLabel: String(box.ctaLabel ?? def.ctaLabel),
    ctaHref: String(box.ctaHref ?? def.ctaHref),
  };
}

const HOW_ICONS = ["pen", "check", "factory", "truck"] as const;
function parseHowIcon(x: unknown): CmsHomeHowStep["icon"] {
  const s = typeof x === "string" ? x : "";
  return (HOW_ICONS as readonly string[]).includes(s) ? (s as CmsHomeHowStep["icon"]) : "pen";
}

function normalizeHowStep(it: unknown, index: number): CmsHomeHowStep {
  const row = it && typeof it === "object" ? (it as Record<string, unknown>) : {};
  const detailsRaw = row.details;
  const details = Array.isArray(detailsRaw)
    ? detailsRaw.filter((d): d is string => typeof d === "string")
    : [];
  const id =
    typeof row.id === "string" && row.id.length > 0
      ? row.id
      : `how-${index}-${annItemHash(String(row.title ?? ""))}`;
  return {
    id,
    title: String(row.title ?? ""),
    desc: String(row.desc ?? ""),
    details,
    icon: parseHowIcon(row.icon),
    imageUrl: typeof row.imageUrl === "string" ? row.imageUrl : "",
    active: row.active !== false,
  };
}

function howItWorksFromMerged(merged: unknown): CmsHomeHowItWorks {
  const def = cloneDefaults(DEFAULT_CMS_HOME).howItWorks;
  const box = merged && typeof merged === "object" ? (merged as Record<string, unknown>) : {};
  const stepsRaw = box.steps;
  const steps = Array.isArray(stepsRaw)
    ? stepsRaw.map((s, i) => normalizeHowStep(s, i))
    : def.steps;
  return {
    sectionLabel: String(box.sectionLabel ?? def.sectionLabel),
    titleLead: String(box.titleLead ?? def.titleLead),
    titleAccent: String(box.titleAccent ?? def.titleAccent),
    subtitle: String(box.subtitle ?? def.subtitle),
    steps,
    ctaLabel: String(box.ctaLabel ?? def.ctaLabel),
  };
}

const PKG_ICONS = ["box", "palette", "printer", "sparkles"] as const;
function parsePkgIcon(x: unknown): CmsHomePackagingItem["icon"] {
  const s = typeof x === "string" ? x : "";
  return (PKG_ICONS as readonly string[]).includes(s) ? (s as CmsHomePackagingItem["icon"]) : "box";
}

function normalizePackagingItem(it: unknown, index: number): CmsHomePackagingItem {
  const row = it && typeof it === "object" ? (it as Record<string, unknown>) : {};
  const id =
    typeof row.id === "string" && row.id.length > 0
      ? row.id
      : `pkg-${index}-${annItemHash(String(row.title ?? ""))}`;
  return {
    id,
    icon: parsePkgIcon(row.icon),
    title: String(row.title ?? ""),
    description: String(row.description ?? ""),
    active: row.active !== false,
  };
}

function packagingFromMerged(merged: unknown): CmsHomePackaging {
  const def = cloneDefaults(DEFAULT_CMS_HOME).packagingShowcase;
  const box = merged && typeof merged === "object" ? (merged as Record<string, unknown>) : {};
  const itemsRaw = box.items;
  const items = Array.isArray(itemsRaw)
    ? itemsRaw.map((it, i) => normalizePackagingItem(it, i))
    : def.items;
  return {
    sectionLabel: String(box.sectionLabel ?? def.sectionLabel),
    title: String(box.title ?? def.title),
    description: String(box.description ?? def.description),
    items,
    ctaLabel: String(box.ctaLabel ?? def.ctaLabel),
  };
}

function normalizeTestimonial(it: unknown, index: number): CmsHomeTestimonial {
  const row = it && typeof it === "object" ? (it as Record<string, unknown>) : {};
  const n = typeof row.rating === "number" ? row.rating : Number(row.rating);
  const rating = Number.isFinite(n) ? Math.max(0, Math.min(5, Math.round(n))) : 5;
  const id =
    typeof row.id === "string" && row.id.length > 0
      ? row.id
      : `tm-${index}-${annItemHash(`${String(row.name ?? "")}|${String(row.company ?? "")}`)}`;
  return {
    id,
    name: String(row.name ?? ""),
    company: String(row.company ?? ""),
    text: String(row.text ?? ""),
    initials: String(row.initials ?? ""),
    rating,
    highlight: String(row.highlight ?? ""),
    active: row.active !== false,
  };
}

function testimonialsFromMerged(merged: unknown): CmsHomeTestimonials {
  const def = cloneDefaults(DEFAULT_CMS_HOME).testimonials;
  const box = merged && typeof merged === "object" ? (merged as Record<string, unknown>) : {};
  const itemsRaw = box.items;
  const items = Array.isArray(itemsRaw)
    ? itemsRaw.map((it, i) => normalizeTestimonial(it, i))
    : def.items;
  const statsRaw = box.trustStats;
  const trustStats =
    Array.isArray(statsRaw) && statsRaw.length > 0
      ? statsRaw.map((s: unknown) => {
          const r = s && typeof s === "object" ? (s as Record<string, unknown>) : {};
          return { value: String(r.value ?? ""), label: String(r.label ?? "") };
        })
      : def.trustStats;
  return {
    sectionLabel: String(box.sectionLabel ?? def.sectionLabel),
    titleLead: String(box.titleLead ?? def.titleLead),
    titleAccent: String(box.titleAccent ?? def.titleAccent),
    description: String(box.description ?? def.description),
    items,
    trustStats,
  };
}

export function mergeCmsHome(raw: unknown): CmsHome {
  const defaults = cloneDefaults(DEFAULT_CMS_HOME);
  const merged = deepMerge(defaults, raw ?? {}) as CmsHome;
  merged.announcement = announcementFromMerged(merged.announcement as unknown);
  merged.trustBar = trustBarFromMerged(merged.trustBar as unknown);
  merged.relatedProducts = relatedProductsFromMerged(merged.relatedProducts as unknown);
  merged.moreProducts = moreProductsFromMerged(merged.moreProducts as unknown);
  merged.whyUs = whyUsFromMerged(merged.whyUs as unknown);
  merged.sustainability = sustainabilityFromMerged(merged.sustainability as unknown);
  merged.howItWorks = howItWorksFromMerged(merged.howItWorks as unknown);
  merged.testimonials = testimonialsFromMerged(merged.testimonials as unknown);
  merged.packagingShowcase = packagingFromMerged(merged.packagingShowcase as unknown);
  return merged;
}

function normalizeAboutCert(it: unknown, index: number): CmsAboutCert {
  const row = it && typeof it === "object" ? (it as Record<string, unknown>) : {};
  const title = String(row.title ?? "");
  const id =
    typeof row.id === "string" && row.id.length > 0 ? row.id : `cert-${index}-${annItemHash(title)}`;
  return {
    id,
    title,
    desc: String(row.desc ?? ""),
    rating: typeof row.rating === "string" && row.rating.trim().length > 0 ? row.rating : undefined,
    active: row.active !== false,
  };
}

const ABOUT_STATS_ICONS = ["users", "factory", "globe", "truck"] as const;
function parseAboutStatsIcon(x: unknown): CmsAboutStat["icon"] {
  const s = typeof x === "string" ? x : "";
  return (ABOUT_STATS_ICONS as readonly string[]).includes(s) ? (s as CmsAboutStat["icon"]) : "users";
}

function normalizeAboutStat(it: unknown, index: number): CmsAboutStat {
  const row = it && typeof it === "object" ? (it as Record<string, unknown>) : {};
  const id =
    typeof row.id === "string" && row.id.length > 0 ? row.id : `ab-stat-${index}-${annItemHash(String(row.label ?? ""))}`;
  return {
    id,
    value: String(row.value ?? ""),
    label: String(row.label ?? ""),
    icon: parseAboutStatsIcon(row.icon),
    active: row.active !== false,
  };
}

function normalizeAboutTimelineItem(it: unknown, index: number): CmsAboutTimelineItem {
  const row = it && typeof it === "object" ? (it as Record<string, unknown>) : {};
  const id =
    typeof row.id === "string" && row.id.length > 0 ? row.id : `ab-time-${index}-${annItemHash(String(row.year ?? ""))}`;
  return {
    id,
    year: String(row.year ?? ""),
    title: String(row.title ?? ""),
    desc: String(row.desc ?? ""),
    active: row.active !== false,
  };
}

function normalizeAboutValue(it: unknown, index: number): CmsAboutValue {
  const row = it && typeof it === "object" ? (it as Record<string, unknown>) : {};
  const id =
    typeof row.id === "string" && row.id.length > 0
      ? row.id
      : `ab-val-${index}-${annItemHash(`${String(row.icon ?? "")}|${String(row.title ?? "")}`)}`;
  return {
    id,
    icon: String(row.icon ?? ""),
    title: String(row.title ?? ""),
    desc: String(row.desc ?? ""),
    active: row.active !== false,
  };
}

export function mergeCmsAbout(raw: unknown): CmsAbout {
  const defaults = cloneDefaults(DEFAULT_CMS_ABOUT);
  const merged = deepMerge(defaults, raw ?? {}) as CmsAbout;
  merged.stats = Array.isArray(merged.stats)
    ? merged.stats.map((it, i) => normalizeAboutStat(it, i))
    : cloneDefaults(DEFAULT_CMS_ABOUT).stats;
  merged.timeline = {
    ...merged.timeline,
    items: Array.isArray(merged.timeline?.items)
      ? merged.timeline.items.map((it, i) => normalizeAboutTimelineItem(it, i))
      : cloneDefaults(DEFAULT_CMS_ABOUT).timeline.items,
  };
  merged.values = {
    ...merged.values,
    items: Array.isArray(merged.values?.items)
      ? merged.values.items.map((it, i) => normalizeAboutValue(it, i))
      : cloneDefaults(DEFAULT_CMS_ABOUT).values.items,
  };
  const certBox = merged.certifications as unknown;
  const box = certBox && typeof certBox === "object" ? (certBox as Record<string, unknown>) : {};
  const itemsRaw = box.items;
  merged.certifications = {
    ...merged.certifications,
    items: Array.isArray(itemsRaw)
      ? itemsRaw.map((it, i) => normalizeAboutCert(it, i))
      : cloneDefaults(DEFAULT_CMS_ABOUT).certifications.items,
  };
  return merged;
}

export function mergeCmsProcess(raw: unknown): CmsProcess {
  return deepMerge(cloneDefaults(DEFAULT_CMS_PROCESS), raw ?? {}) as CmsProcess;
}

export function mergeCmsPortfolio(raw: unknown): CmsPortfolio {
  return deepMerge(cloneDefaults(DEFAULT_CMS_PORTFOLIO), raw ?? {}) as CmsPortfolio;
}

export function mergeCmsLibrary(raw: unknown): CmsLibrary {
  return deepMerge(JSON.parse(JSON.stringify(DEFAULT_CMS_LIBRARY)), raw ?? {}) as CmsLibrary;
}

export const CMS_SETTING_KEYS = {
  home: "cms_home",
  about: "cms_about",
  process: "cms_process",
  portfolio: "cms_portfolio",
  library: "cms_library",
} as const;
