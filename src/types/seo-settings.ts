/** Stored in site_settings.key = "seo" */

export type SeoPageBlock = {
  pageTitle: string;
  metaDescription: string;
  /** Optional; used for editor hints only — not emitted as a meta tag */
  focusKeyword?: string;
};

export type SeoRobotsMode = "allow_all" | "custom";

export type SeoAdvanced = {
  googleSiteVerification: string;
  robotsMode: SeoRobotsMode;
  /** Public URL to default OG image (1200×630), or storage path starting with / */
  defaultOgImageUrl: string;
  /** Organization schema: brand/company name */
  orgName: string;
  /** Organization schema: absolute URL to logo image */
  orgLogoUrl: string;
  schemaOrganization: boolean;
  schemaBreadcrumb: boolean;
  schemaWebSiteSearch: boolean;
};

export type SeoSettings = {
  home: SeoPageBlock;
  about: SeoPageBlock;
  process: SeoPageBlock;
  portfolio: SeoPageBlock;
  advanced: SeoAdvanced;
};
