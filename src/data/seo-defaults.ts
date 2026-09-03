import type { SeoSettings } from "@/types/seo-settings";

export const DEFAULT_SEO_SETTINGS: SeoSettings = {
  home: {
    pageTitle: "HofPack – Premium Custom Packaging Solutions",
    metaDescription:
      "HofPack delivers premium custom packaging solutions including mylar bags, boxes, labels, and more. Get a free quote today.",
    focusKeyword: "custom packaging boxes",
  },
  about: {
    pageTitle: "About Us | HofPack",
    metaDescription:
      "Learn more about HofPack, your premier destination for high-quality custom packaging solutions. We combine innovation with quality.",
    focusKeyword: "HofPack about custom packaging",
  },
  process: {
    pageTitle: "Our Process | HofPack",
    metaDescription:
      "Learn about the HofPack journey from concept to delivery. Our streamlined process ensures perfect custom packaging every time.",
    focusKeyword: "custom packaging process",
  },
  portfolio: {
    pageTitle: "Our Portfolio | HofPack",
    metaDescription:
      "Browse our gallery of premium custom packaging projects and see how HofPack helps brands stand out with innovative designs.",
    focusKeyword: "custom packaging portfolio",
  },
  advanced: {
    googleSiteVerification: "",
    robotsMode: "allow_all",
    defaultOgImageUrl: "/og-image.png",
    orgName: "HofPack",
    orgLogoUrl: "/hofpack-logo.png",
    schemaOrganization: true,
    schemaBreadcrumb: true,
    schemaWebSiteSearch: false,
  },
};
