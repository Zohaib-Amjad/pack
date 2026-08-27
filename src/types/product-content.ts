/**
 * Typed schema for the `product_content` JSONB column.
 * All fields are optional — the renderer falls back gracefully when absent.
 */

export interface FeatureItem {
  /** lucide icon name, e.g. "Palette", "Leaf", "Feather" */
  icon: string;
  title: string;
  description: string;
}

export interface ContentBlock {
  heading: string;
  body: string;
  /** Full image URL */
  image: string;
  alt: string;
  /** When true the image appears on the left */
  flipped?: boolean;
  /** Optional CTA label that links to #quote */
  linkLabel?: string;
}

export interface ArticleSection {
  /** heading level, paragraph, or divider */
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "divider";
  text?: string;
}

export interface SpecOverrides {
  /** Replaces the comma-separated printing_options string with pill chips */
  printing_options_list?: string[];
  /** Replaces the comma-separated finishing_options string with pill chips */
  finishing_options_list?: string[];
  /** Shown as "Included Options" row */
  included_options?: string[];
  /** Shown as "Additional Options" row (gold pills) */
  additional_options?: string[];
  /** e.g. "4–8 Business Days" */
  turnaround_label?: string;
  rush_available?: boolean;
  /** Override the dimension row value */
  dimension_info?: string;
  /** Override the quantities row value */
  quantities_info?: string;
  /** Whether to display the Shipping Policy row (defaults to false / hidden) */
  show_shipping_policy?: boolean;
}

export interface ProductContent {
  feature_items?: FeatureItem[];
  content_blocks?: ContentBlock[];
  /** Flexible article body rendered below content blocks */
  article_sections?: ArticleSection[];
  /** Material chips shown in the expandable section */
  material_items?: string[];
  /** Perks grid shown in the expandable section */
  perk_items?: string[];
  spec_overrides?: SpecOverrides;
}

export interface ProductFeatureItemsResult {
  slug: string;
  name: string;
  featureItems: FeatureItem[];
}
