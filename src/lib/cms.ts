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
    desc: String(row.desc ?? row.description ?? ""),
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
    titleLead: String(box.titleLead ?? (box as any).titleBeforeAccent ?? def.titleLead),
    titleAccent: String(box.titleAccent ?? (box as any).accentWords ?? def.titleAccent),
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
    sectionLabel: typeof box.sectionLabel === "string" ? box.sectionLabel : def.sectionLabel,
    titleLead: typeof box.titleLead === "string" ? box.titleLead : def.titleLead,
    titleAccent: typeof box.titleAccent === "string" ? box.titleAccent : def.titleAccent,
    subtitle: typeof box.subtitle === "string" ? box.subtitle : def.subtitle,
    steps,
    ctaLabel: typeof box.ctaLabel === "string" ? box.ctaLabel : def.ctaLabel,
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
  const name = String(row.name ?? "");
  const initials =
    typeof row.initials === "string" && row.initials.length > 0
      ? row.initials
      : name
        ? name.slice(0, 2).toUpperCase()
        : "HP";
  const id =
    typeof row.id === "string" && row.id.length > 0
      ? row.id
      : `tm-${index}-${annItemHash(`${name}|${String(row.company ?? "")}`)}`;
  const colRaw = row.column ?? (row as any).slider;
  const column = colRaw === "left" || colRaw === "right" ? colRaw : "auto";
  return {
    id,
    name,
    company: String(row.company ?? (row as any).location ?? ""),
    text: String(row.text ?? (row as any).quote ?? ""),
    initials,
    rating,
    highlight: String(row.highlight ?? (row as any).highlightPill ?? (row as any).title ?? ""),
    column,
    active: row.active !== false,
  };
}

function testimonialsFromMerged(merged: unknown): CmsHomeTestimonials {
  const def = cloneDefaults(DEFAULT_CMS_HOME).testimonials;
  const box = merged && typeof merged === "object" ? (merged as Record<string, unknown>) : {};
  const itemsRaw = box.items ?? (box as any).reviews;
  const items = Array.isArray(itemsRaw)
    ? itemsRaw.map((it, i) => normalizeTestimonial(it, i))
    : def.items;
  const statsRaw = box.trustStats ?? (box as any).stats;
  const trustStats =
    Array.isArray(statsRaw) && statsRaw.length > 0
      ? statsRaw.map((s: unknown) => {
        const r = s && typeof s === "object" ? (s as Record<string, unknown>) : {};
        return { value: String(r.value ?? ""), label: String(r.label ?? "") };
      })
      : def.trustStats;
  return {
    sectionLabel: typeof box.sectionLabel === "string" ? box.sectionLabel : def.sectionLabel,
    titleLead: typeof box.titleLead === "string" ? box.titleLead : def.titleLead,
    titleAccent: typeof box.titleAccent === "string" ? box.titleAccent : def.titleAccent,
    description: typeof box.description === "string" ? box.description : def.description,
    primaryCtaLabel: typeof box.primaryCtaLabel === "string" ? box.primaryCtaLabel : (def as any).primaryCtaLabel ?? "Customize now",
    secondaryCtaLabel: typeof box.secondaryCtaLabel === "string" ? box.secondaryCtaLabel : (def as any).secondaryCtaLabel ?? "Browse all products",
    secondaryCtaHref: typeof box.secondaryCtaHref === "string" ? box.secondaryCtaHref : (def as any).secondaryCtaHref ?? "/our-products",
    trustpilotLinkLabel: typeof box.trustpilotLinkLabel === "string" ? box.trustpilotLinkLabel : (def as any).trustpilotLinkLabel ?? "See all reviews on Trustpilot",
    trustpilotLinkHref: typeof box.trustpilotLinkHref === "string" ? box.trustpilotLinkHref : (def as any).trustpilotLinkHref ?? "https://www.trustpilot.com/review/hofpack.com",
    leftColumnDirection: box.leftColumnDirection === "down" ? "down" : "up",
    rightColumnDirection: box.rightColumnDirection === "up" ? "up" : "down",
    scrollSpeed: box.scrollSpeed === "fast" ? "fast" : box.scrollSpeed === "slow" ? "slow" : "normal",
    items,
    trustStats,
  };
}

function featuredCategoriesFromMerged(mergedFc: unknown): CmsHomeFeaturedCategories {
  const def = cloneDefaults(DEFAULT_CMS_HOME).featuredCategories;
  const box = mergedFc && typeof mergedFc === "object" ? (mergedFc as Record<string, unknown>) : {};
  return {
    sectionLabel: String(box.sectionLabel ?? def.sectionLabel),
    titleLead: String(box.titleLead ?? box.titleBeforeAccent ?? def.titleLead ?? def.titleBeforeAccent ?? ""),
    titleBeforeAccent: String(box.titleBeforeAccent ?? box.titleLead ?? def.titleBeforeAccent ?? def.titleLead ?? ""),
    titleAccent: String(box.titleAccent ?? def.titleAccent),
    description: String(box.description ?? def.description),
  };
}

export function mergeCmsHome(raw: unknown): CmsHome {
  const defaults = cloneDefaults(DEFAULT_CMS_HOME);
  const merged = deepMerge(defaults, raw ?? {}) as CmsHome;
  merged.announcement = announcementFromMerged(merged.announcement as unknown);
  merged.trustBar = trustBarFromMerged(merged.trustBar as unknown);
  merged.featuredCategories = featuredCategoriesFromMerged(merged.featuredCategories as unknown);
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

function aboutHeroFromMerged(mergedHero: unknown): CmsAboutHero {
  const def = cloneDefaults(DEFAULT_CMS_ABOUT).hero;
  const box = mergedHero && typeof mergedHero === "object" ? (mergedHero as Record<string, unknown>) : {};
  return {
    sectionLabel: typeof box.sectionLabel === "string" ? box.sectionLabel : def.sectionLabel,
    titleLead: typeof box.titleLead === "string" ? box.titleLead : def.titleLead,
    titleAccent: typeof box.titleAccent === "string" ? box.titleAccent : def.titleAccent,
    description: typeof box.description === "string" ? box.description : def.description,
    ctaLabel: typeof box.ctaLabel === "string" ? box.ctaLabel : def.ctaLabel,
    heroImageUrl: typeof box.heroImageUrl === "string" ? box.heroImageUrl : (def.heroImageUrl ?? ""),
    heroImageAlt: typeof box.heroImageAlt === "string" ? box.heroImageAlt : (def.heroImageAlt ?? ""),
  };
}

function aboutMissionFromMerged(mergedMission: unknown): CmsAboutMission {
  const def = cloneDefaults(DEFAULT_CMS_ABOUT).mission;
  const box = mergedMission && typeof mergedMission === "object" ? (mergedMission as Record<string, unknown>) : {};
  const bulletsRaw = box.bullets;
  const bullets = Array.isArray(bulletsRaw)
    ? bulletsRaw.map((b) => String(b ?? "")).filter((b) => b.length > 0)
    : def.bullets;
  return {
    sectionLabel: typeof box.sectionLabel === "string" ? box.sectionLabel : def.sectionLabel,
    titleLead: typeof box.titleLead === "string" ? box.titleLead : def.titleLead,
    titleAccent: typeof box.titleAccent === "string" ? box.titleAccent : def.titleAccent,
    paragraph1: typeof box.paragraph1 === "string" ? box.paragraph1 : def.paragraph1,
    paragraph2: typeof box.paragraph2 === "string" ? box.paragraph2 : def.paragraph2,
    bullets,
    teamImageUrl: typeof box.teamImageUrl === "string" ? box.teamImageUrl : (def.teamImageUrl ?? ""),
    teamImageAlt: typeof box.teamImageAlt === "string" ? box.teamImageAlt : (def.teamImageAlt ?? ""),
  };
}

function aboutTimelineFromMerged(mergedTimeline: unknown): CmsAboutTimeline {
  const def = cloneDefaults(DEFAULT_CMS_ABOUT).timeline;
  const box = mergedTimeline && typeof mergedTimeline === "object" ? (mergedTimeline as Record<string, unknown>) : {};
  const itemsRaw = box.items;
  const items = Array.isArray(itemsRaw)
    ? itemsRaw.map((it, i) => normalizeAboutTimelineItem(it, i))
    : def.items;
  return {
    sectionLabel: typeof box.sectionLabel === "string" ? box.sectionLabel : def.sectionLabel,
    titleLead: typeof box.titleLead === "string" ? box.titleLead : def.titleLead,
    titleAccent: typeof box.titleAccent === "string" ? box.titleAccent : def.titleAccent,
    items,
  };
}

function aboutManufacturingFromMerged(mergedManu: unknown): CmsAboutManufacturing {
  const def = cloneDefaults(DEFAULT_CMS_ABOUT).manufacturing;
  const box = mergedManu && typeof mergedManu === "object" ? (mergedManu as Record<string, unknown>) : {};
  const highlightsRaw = box.highlights;
  const highlights = Array.isArray(highlightsRaw)
    ? highlightsRaw.map((h) => String(h ?? "")).filter((h) => h.length > 0)
    : def.highlights;
  return {
    sectionLabel: typeof box.sectionLabel === "string" ? box.sectionLabel : def.sectionLabel,
    titleLead: typeof box.titleLead === "string" ? box.titleLead : def.titleLead,
    titleAccent: typeof box.titleAccent === "string" ? box.titleAccent : def.titleAccent,
    body: typeof box.body === "string" ? box.body : def.body,
    highlights,
    factoryImageUrl: typeof box.factoryImageUrl === "string" ? box.factoryImageUrl : (def.factoryImageUrl ?? ""),
    factoryImageAlt: typeof box.factoryImageAlt === "string" ? box.factoryImageAlt : (def.factoryImageAlt ?? ""),
  };
}

function aboutValuesFromMerged(mergedValues: unknown): CmsAboutValues {
  const def = cloneDefaults(DEFAULT_CMS_ABOUT).values;
  const box = mergedValues && typeof mergedValues === "object" ? (mergedValues as Record<string, unknown>) : {};
  const itemsRaw = box.items;
  const items = Array.isArray(itemsRaw)
    ? itemsRaw.map((it, i) => normalizeAboutValue(it, i))
    : def.items;
  return {
    sectionLabel: typeof box.sectionLabel === "string" ? box.sectionLabel : def.sectionLabel,
    titleLead: typeof box.titleLead === "string" ? box.titleLead : def.titleLead,
    titleAccent: typeof box.titleAccent === "string" ? box.titleAccent : def.titleAccent,
    description: typeof box.description === "string" ? box.description : def.description,
    items,
  };
}

function aboutCertificationsFromMerged(mergedCerts: unknown): CmsAboutCertifications {
  const def = cloneDefaults(DEFAULT_CMS_ABOUT).certifications;
  const box = mergedCerts && typeof mergedCerts === "object" ? (mergedCerts as Record<string, unknown>) : {};
  const itemsRaw = box.items;
  const items = Array.isArray(itemsRaw)
    ? itemsRaw.map((it, i) => normalizeAboutCert(it, i))
    : def.items;
  return {
    sectionLabel: typeof box.sectionLabel === "string" ? box.sectionLabel : def.sectionLabel,
    titleLead: typeof box.titleLead === "string" ? box.titleLead : def.titleLead,
    titleAccent: typeof box.titleAccent === "string" ? box.titleAccent : def.titleAccent,
    description: typeof box.description === "string" ? box.description : def.description,
    items,
  };
}

export function mergeCmsAbout(raw: unknown): CmsAbout {
  const defaults = cloneDefaults(DEFAULT_CMS_ABOUT);
  const merged = deepMerge(defaults, raw ?? {}) as CmsAbout;
  merged.hero = aboutHeroFromMerged(merged.hero as unknown);
  merged.mission = aboutMissionFromMerged(merged.mission as unknown);
  const rawObj = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : null;
  const statsRaw = rawObj && Array.isArray(rawObj.stats) ? rawObj.stats : merged.stats;
  merged.stats = Array.isArray(statsRaw)
    ? statsRaw.map((it, i) => normalizeAboutStat(it, i))
    : cloneDefaults(DEFAULT_CMS_ABOUT).stats;
  merged.timeline = aboutTimelineFromMerged(rawObj && rawObj.timeline !== undefined ? rawObj.timeline : merged.timeline);
  merged.manufacturing = aboutManufacturingFromMerged(rawObj && rawObj.manufacturing !== undefined ? rawObj.manufacturing : merged.manufacturing);
  merged.values = aboutValuesFromMerged(rawObj && rawObj.values !== undefined ? rawObj.values : merged.values);
  merged.certifications = aboutCertificationsFromMerged(rawObj && rawObj.certifications !== undefined ? rawObj.certifications : merged.certifications);
  return merged;
}

function processHeroFromMerged(mergedHero: unknown): CmsProcessHero {
  const def = cloneDefaults(DEFAULT_CMS_PROCESS).hero;
  const box = mergedHero && typeof mergedHero === "object" ? (mergedHero as Record<string, unknown>) : {};
  return {
    sectionLabel: typeof box.sectionLabel === "string" ? box.sectionLabel : def.sectionLabel,
    titleLead: typeof box.titleLead === "string" ? box.titleLead : def.titleLead,
    titleAccent: typeof box.titleAccent === "string" ? box.titleAccent : def.titleAccent,
    description: typeof box.description === "string" ? box.description : def.description,
    ctaLabel: typeof box.ctaLabel === "string" ? box.ctaLabel : def.ctaLabel,
  };
}

function parseProcessStatsIcon(val: unknown): CmsProcessStat["icon"] {
  const s = String(val ?? "").toLowerCase();
  if (s === "clock" || s === "sparkles" || s === "shield" || s === "globe") return s;
  return "clock";
}

function normalizeProcessStat(it: unknown): CmsProcessStat {
  const row = it && typeof it === "object" ? (it as Record<string, unknown>) : {};
  return {
    value: typeof row.value === "string" ? row.value : String(row.value ?? ""),
    label: typeof row.label === "string" ? row.label : String(row.label ?? ""),
    icon: parseProcessStatsIcon(row.icon),
  };
}

function parseProcessStepIcon(val: unknown): CmsProcessStep["icon"] {
  const s = String(val ?? "").toLowerCase();
  if (s === "file" || s === "palette" || s === "package" || s === "truck") return s;
  return "file";
}

function normalizeProcessStep(it: unknown): CmsProcessStep {
  const row = it && typeof it === "object" ? (it as Record<string, unknown>) : {};
  const detailsRaw = row.details;
  const details = Array.isArray(detailsRaw)
    ? detailsRaw.map((d) => String(d ?? "")).filter((d) => d.length > 0)
    : [];
  return {
    icon: parseProcessStepIcon(row.icon),
    title: typeof row.title === "string" ? row.title : String(row.title ?? ""),
    desc: typeof row.desc === "string" ? row.desc : String(row.desc ?? ""),
    details,
    imageUrl: typeof row.imageUrl === "string" ? row.imageUrl : "",
    highlight: typeof row.highlight === "string" ? row.highlight : "",
  };
}

function normalizeProcessPromiseCard(it: unknown): CmsProcessPromise["cards"][number] {
  const row = it && typeof it === "object" ? (it as Record<string, unknown>) : {};
  return {
    title: typeof row.title === "string" ? row.title : String(row.title ?? ""),
    desc: typeof row.desc === "string" ? row.desc : String(row.desc ?? ""),
  };
}

function processPromiseFromMerged(mergedPromise: unknown): CmsProcessPromise {
  const def = cloneDefaults(DEFAULT_CMS_PROCESS).promise;
  const box = mergedPromise && typeof mergedPromise === "object" ? (mergedPromise as Record<string, unknown>) : {};
  const cardsRaw = box.cards;
  const cards = Array.isArray(cardsRaw)
    ? cardsRaw.map((c) => normalizeProcessPromiseCard(c))
    : def.cards;
  return {
    sectionLabel: typeof box.sectionLabel === "string" ? box.sectionLabel : def.sectionLabel,
    titleLead: typeof box.titleLead === "string" ? box.titleLead : def.titleLead,
    titleAccent: typeof box.titleAccent === "string" ? box.titleAccent : def.titleAccent,
    description: typeof box.description === "string" ? box.description : def.description,
    cards,
  };
}

export function mergeCmsProcess(raw: unknown): CmsProcess {
  const defaults = cloneDefaults(DEFAULT_CMS_PROCESS);
  const merged = deepMerge(defaults, raw ?? {}) as CmsProcess;
  const rawObj = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : null;
  merged.hero = processHeroFromMerged(rawObj && rawObj.hero !== undefined ? rawObj.hero : merged.hero);
  const statsRaw = rawObj && Array.isArray(rawObj.stats) ? rawObj.stats : merged.stats;
  merged.stats = Array.isArray(statsRaw) ? statsRaw.map((it) => normalizeProcessStat(it)) : cloneDefaults(DEFAULT_CMS_PROCESS).stats;
  const stepsRaw = rawObj && Array.isArray(rawObj.steps) ? rawObj.steps : merged.steps;
  merged.steps = Array.isArray(stepsRaw) ? stepsRaw.map((it) => normalizeProcessStep(it)) : cloneDefaults(DEFAULT_CMS_PROCESS).steps;
  merged.promise = processPromiseFromMerged(rawObj && rawObj.promise !== undefined ? rawObj.promise : merged.promise);
  return merged;
}

function portfolioHeaderFromMerged(mergedHeader: unknown): CmsPortfolioHeader {
  const def = cloneDefaults(DEFAULT_CMS_PORTFOLIO).header;
  const box = mergedHeader && typeof mergedHeader === "object" ? (mergedHeader as Record<string, unknown>) : {};
  return {
    sectionLabel: typeof box.sectionLabel === "string" ? box.sectionLabel : def.sectionLabel,
    titleLead: typeof box.titleLead === "string" ? box.titleLead : def.titleLead,
    titleAccent: typeof box.titleAccent === "string" ? box.titleAccent : def.titleAccent,
    description: typeof box.description === "string" ? box.description : def.description,
  };
}

function portfolioFiltersFromMerged(mergedFilters: unknown): string[] {
  if (Array.isArray(mergedFilters)) {
    return mergedFilters
      .map((x) => String(x ?? "").trim())
      .filter((x) => x.length > 0);
  }
  return cloneDefaults(DEFAULT_CMS_PORTFOLIO).filterLabels;
}

export function mergeCmsPortfolio(raw: unknown): CmsPortfolio {
  const defaults = cloneDefaults(DEFAULT_CMS_PORTFOLIO);
  const merged = deepMerge(defaults, raw ?? {}) as CmsPortfolio;
  const rawObj = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : null;
  merged.header = portfolioHeaderFromMerged(rawObj && rawObj.header !== undefined ? rawObj.header : merged.header);
  const filtersRaw = rawObj && Array.isArray(rawObj.filterLabels) ? rawObj.filterLabels : merged.filterLabels;
  merged.filterLabels = portfolioFiltersFromMerged(filtersRaw);
  return merged;
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
