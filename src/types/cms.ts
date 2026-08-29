export type CmsCta = { label: string; href: string };

export type CmsHomeHero = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  tagline: string;
  primaryCta: CmsCta;
  secondaryCta: CmsCta;
  /** Public URL; empty = use bundled fallback image */
  heroImageUrl: string;
  heroImageAlt: string;
  trustPoints: string[];
  bbbTitle: string;
  bbbSubtitle: string;
};

export type CmsHomeAnnouncementItem = {
  id: string;
  text: string;
  /** When false, hidden from the ticker but kept in the CMS for easy re-enable. */
  active: boolean;
};

export type CmsHomeAnnouncement = {
  items: CmsHomeAnnouncementItem[];
};

/** Row in the brand marquee strip — can show a logo image or fall back to text. */
export type CmsHomeTrustBarMarqueeItem = CmsHomeAnnouncementItem & {
  /** Optional Cloudinary (or any public) URL for the brand logo image. */
  logoUrl?: string;
};

export type CmsHomeTrustBar = {
  trustedPrefix: string;
  brandsCount: string;
  trustedSuffix: string;
  ratingText: string;
  usaBadge: string;
  brandMarqueeItems: CmsHomeTrustBarMarqueeItem[];
};

export type CmsHomeFeaturedCategories = {
  sectionLabel: string;
  titleLead?: string;
  titleBeforeAccent?: string;
  titleAccent: string;
  description: string;
};

export type CmsHomeRelatedProducts = {
  enabled: boolean;
  sectionLabel: string;
  titleLead: string;
  titleAccent: string;
  viewAllLabel: string;
  viewAllHref: string;
  selectedProductIds: string[];
  autoFillWhenEmpty: boolean;
  limit: number;
};

export type CmsHomeMoreProducts = {
  enabled: boolean;
  title: string;
  description: string;
  selectedProductIds: string[];
  limit: number;
};

export type CmsHomeWhyUsCard = {
  id: string;
  title: string;
  desc: string;
  stat: string;
  statLabel: string;
  featured?: boolean;
  /** When false, card is hidden on the homepage but kept in the CMS. */
  active: boolean;
};

export type CmsHomeWhyUs = {
  sectionLabel: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  cards: CmsHomeWhyUsCard[];
  ctaLabel: string;
  ctaHref: string;
};

export type CmsHomeSustainabilityPoint = {
  id: string;
  icon: "leaf" | "heart" | "recycle" | "tree";
  title: string;
  desc: string;
  active: boolean;
};

export type CmsHomeSustainability = {
  sectionLabel: string;
  titleLead: string;
  titleAccent: string;
  body: string;
  points: CmsHomeSustainabilityPoint[];
  panelTitle: string;
  panelSubtitle: string;
  stats: { value: string; label: string }[];
  ctaLabel: string;
  ctaHref: string;
};

export type CmsHomeHowStep = {
  id: string;
  title: string;
  desc: string;
  details: string[];
  icon: "pen" | "check" | "factory" | "truck";
  imageUrl: string;
  active: boolean;
};

export type CmsHomeHowItWorks = {
  sectionLabel: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  steps: CmsHomeHowStep[];
  ctaLabel: string;
};

export type CmsHomeTestimonial = {
  id: string;
  name: string;
  company: string;
  text: string;
  initials: string;
  rating: number;
  highlight: string;
  column?: "left" | "right" | "auto";
  active: boolean;
};

export type CmsHomeTestimonials = {
  sectionLabel: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  trustpilotLinkLabel?: string;
  trustpilotLinkHref?: string;
  leftColumnDirection?: "up" | "down";
  rightColumnDirection?: "up" | "down";
  scrollSpeed?: "slow" | "normal" | "fast";
  items: CmsHomeTestimonial[];
  trustStats: { value: string; label: string }[];
};

export type CmsHomeFaq = {
  titleLead: string;
  titleAccent: string;
};

export type CmsHomePackagingItem = {
  id: string;
  icon: "box" | "palette" | "printer" | "sparkles";
  title: string;
  description: string;
  active: boolean;
};

export type CmsHomePackaging = {
  sectionLabel: string;
  title: string;
  description: string;
  items: CmsHomePackagingItem[];
  ctaLabel: string;
};

export type CmsHomeCta = {
  title: string;
  subtitle: string;
  buttonLabel: string;
};

export type CmsHome = {
  hero: CmsHomeHero;
  announcement: CmsHomeAnnouncement;
  trustBar: CmsHomeTrustBar;
  featuredCategories: CmsHomeFeaturedCategories;
  relatedProducts: CmsHomeRelatedProducts;
  moreProducts: CmsHomeMoreProducts;
  sustainability: CmsHomeSustainability;
  whyUs: CmsHomeWhyUs;
  howItWorks: CmsHomeHowItWorks;
  testimonials: CmsHomeTestimonials;
  faq: CmsHomeFaq;
  packagingShowcase: CmsHomePackaging;
  cta: CmsHomeCta;
};

export type CmsAboutStat = {
  id: string;
  value: string;
  label: string;
  icon: "users" | "factory" | "globe" | "truck";
  active: boolean;
};

export type CmsAboutValue = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  active: boolean;
};

export type CmsAboutTimelineItem = {
  id: string;
  year: string;
  title: string;
  desc: string;
  active: boolean;
};

export type CmsAboutCert = {
  id: string;
  title: string;
  desc: string;
  rating?: string;
  /** When false, hidden on the About page but kept in the CMS. */
  active: boolean;
};

export type CmsAbout = {
  hero: {
    sectionLabel: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    ctaLabel: string;
    heroImageUrl: string;
    heroImageAlt: string;
  };
  stats: CmsAboutStat[];
  mission: {
    sectionLabel: string;
    titleLead: string;
    titleAccent: string;
    paragraph1: string;
    paragraph2: string;
    bullets: string[];
    teamImageUrl: string;
    teamImageAlt: string;
  };
  timeline: {
    sectionLabel: string;
    titleLead: string;
    titleAccent: string;
    items: CmsAboutTimelineItem[];
  };
  manufacturing: {
    sectionLabel: string;
    titleLead: string;
    titleAccent: string;
    body: string;
    highlights: string[];
    factoryImageUrl: string;
    factoryImageAlt: string;
  };
  values: {
    sectionLabel: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    items: CmsAboutValue[];
  };
  certifications: {
    sectionLabel: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    items: CmsAboutCert[];
  };
};

export type CmsProcessStat = { value: string; label: string; icon: "clock" | "sparkles" | "shield" | "globe" };

export type CmsProcessStep = {
  title: string;
  desc: string;
  details: string[];
  highlight: string;
  icon: "file" | "palette" | "package" | "truck";
  imageUrl: string;
};

export type CmsProcessPromiseCard = { title: string; desc: string };

export type CmsProcess = {
  hero: {
    sectionLabel: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    ctaLabel: string;
  };
  stats: CmsProcessStat[];
  steps: CmsProcessStep[];
  promise: {
    sectionLabel: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    cards: CmsProcessPromiseCard[];
  };
};

export type CmsAboutHero = CmsAbout["hero"];
export type CmsAboutMission = CmsAbout["mission"];
export type CmsAboutTimeline = CmsAbout["timeline"];
export type CmsAboutManufacturing = CmsAbout["manufacturing"];
export type CmsAboutValues = CmsAbout["values"];
export type CmsAboutCertifications = CmsAbout["certifications"];

export type CmsProcessHero = CmsProcess["hero"];
export type CmsProcessPromise = CmsProcess["promise"];
export type CmsPortfolioHeader = CmsPortfolio["header"];

export type CmsPortfolio = {
  header: {
    sectionLabel: string;
    titleLead: string;
    titleAccent: string;
    description: string;
  };
  filterLabels: string[];
};

export type CmsLibraryHero = {
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  heroImageUrl: string;
  heroImageAlt: string;
};

export type CmsLibrary = {
  hero: CmsLibraryHero;
};
