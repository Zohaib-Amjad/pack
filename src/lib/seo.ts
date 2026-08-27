import { DEFAULT_SEO_SETTINGS } from "@/data/seo-defaults";
import type { SeoSettings } from "@/types/seo-settings";
import { deepMerge } from "@/lib/cms-merge";

export const SEO_SETTING_KEY = "seo";

function cloneDefaults(): SeoSettings {
  return JSON.parse(JSON.stringify(DEFAULT_SEO_SETTINGS)) as SeoSettings;
}

export function mergeSeoSettings(raw: unknown): SeoSettings {
  return deepMerge(cloneDefaults(), raw ?? {}) as SeoSettings;
}
