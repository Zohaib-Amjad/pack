import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/utils/supabase/public-client";
import {
  CMS_SETTING_KEYS,
  mergeCmsHome,
  mergeCmsAbout,
  mergeCmsProcess,
  mergeCmsPortfolio,
  mergeCmsLibrary,
} from "@/lib/cms";

export const fetchCmsHomeServer = unstable_cache(async () => {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("site_settings" as any)
      .select("value")
      .eq("key", CMS_SETTING_KEYS.home)
      .maybeSingle();
    return mergeCmsHome(data?.value ?? null);
  } catch {
    return mergeCmsHome(null);
  }
}, ["public-cms-home"], { revalidate: 300 });

export const fetchCmsAboutServer = unstable_cache(async () => {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("site_settings" as any)
      .select("value")
      .eq("key", CMS_SETTING_KEYS.about)
      .maybeSingle();
    return mergeCmsAbout(data?.value ?? null);
  } catch {
    return mergeCmsAbout(null);
  }
}, ["public-cms-about"], { revalidate: 300 });

export const fetchCmsProcessServer = unstable_cache(async () => {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("site_settings" as any)
      .select("value")
      .eq("key", CMS_SETTING_KEYS.process)
      .maybeSingle();
    return mergeCmsProcess(data?.value ?? null);
  } catch {
    return mergeCmsProcess(null);
  }
}, ["public-cms-process"], { revalidate: 300 });

export const fetchCmsPortfolioServer = unstable_cache(async () => {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("site_settings" as any)
      .select("value")
      .eq("key", CMS_SETTING_KEYS.portfolio)
      .maybeSingle();
    return mergeCmsPortfolio(data?.value ?? null);
  } catch {
    return mergeCmsPortfolio(null);
  }
}, ["public-cms-portfolio"], { revalidate: 300 });

export const fetchCmsLibraryServer = unstable_cache(async () => {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("site_settings" as any)
      .select("value")
      .eq("key", CMS_SETTING_KEYS.library)
      .maybeSingle();
    return mergeCmsLibrary(data?.value ?? null);
  } catch {
    return mergeCmsLibrary(null);
  }
}, ["public-cms-library"], { revalidate: 300 });
