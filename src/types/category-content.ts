/**
 * Typed schema for the `category_content` JSONB column.
 * Mirrors ProductContent but scoped to category pages.
 */

export interface CategoryFeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface CategoryContentBlock {
  heading: string;
  body: string;
  image: string;
  alt: string;
  flipped?: boolean;
  linkLabel?: string;
}

export interface CategoryArticleSection {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "divider";
  text?: string;
}

export interface CategoryContent {
  feature_items?: CategoryFeatureItem[];
  content_blocks?: CategoryContentBlock[];
  article_sections?: CategoryArticleSection[];
  /** Material chips shown in the expandable why-section */
  material_items?: string[];
  /** Perks grid shown in the expandable why-section */
  perk_items?: string[];
  /** Main heading for the why-section card */
  why_heading?: string;
}
