import { cache } from "react";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/utils/supabase/public-client";
import { mergeSeoSettings, SEO_SETTING_KEY } from "@/lib/seo";

const SEO_REVALIDATE = 300;

/** Server-only: fetch contact + social settings from site_settings table. */
const getSiteContactAndSocialCached = unstable_cache(async (): Promise<{
  contact: { email?: string; phone?: string };
  social: { facebook?: string; instagram?: string; linkedin?: string; twitter?: string };
}> => {
  const supabase = createPublicClient();
  const { data } = await (supabase as any)
    .from("site_settings")
    .select("key, value")
    .in("key", ["contact", "social"]);

  const mapped = ((data as any[]) || []).reduce((acc: any, row: any) => {
    acc[row.key] = row.value;
    return acc;
  }, {});

  return {
    contact: mapped.contact || {},
    social: mapped.social || {},
  };
}, ["public-contact-social"], { revalidate: SEO_REVALIDATE });

export const getSiteContactAndSocial = cache(getSiteContactAndSocialCached);

/** Server-only: merged SEO settings for metadata + JSON-LD. Safe for public pages (RLS allows SELECT). */
const getSeoSettingsCached = unstable_cache(async () => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("site_settings" as any)
    .select("value")
    .eq("key", SEO_SETTING_KEY)
    .maybeSingle();

  if (error) {
    console.warn("[seo-server] fetch failed:", error.message);
    return mergeSeoSettings(null);
  }

  return mergeSeoSettings(data?.value ?? null);
}, ["public-seo-settings"], { revalidate: SEO_REVALIDATE });

export const getSeoSettings = cache(getSeoSettingsCached);
