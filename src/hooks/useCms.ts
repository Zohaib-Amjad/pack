import { useQuery } from "@tanstack/react-query";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import {
  CMS_SETTING_KEYS,
  mergeCmsAbout,
  mergeCmsHome,
  mergeCmsLibrary,
  mergeCmsPortfolio,
  mergeCmsProcess,
} from "@/lib/cms";

async function fetchCmsValue(key: string): Promise<unknown> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await withAbortableTimeout((signal) =>
      supabase.from("site_settings" as any).select("value").eq("key", key).abortSignal(signal).maybeSingle() as any
    );
    if (error) return null;
    return data?.value ?? null;
  } catch {
    return null;
  }
}

export function useCmsHome() {
  return useQuery({
    queryKey: ["public", "cms", CMS_SETTING_KEYS.home],
    queryFn: async () => mergeCmsHome(await fetchCmsValue(CMS_SETTING_KEYS.home)),
    placeholderData: mergeCmsHome(null),
    staleTime: 60_000,
  });
}

export function useCmsAbout() {
  return useQuery({
    queryKey: ["public", "cms", CMS_SETTING_KEYS.about],
    queryFn: async () => mergeCmsAbout(await fetchCmsValue(CMS_SETTING_KEYS.about)),
    placeholderData: mergeCmsAbout(null),
    staleTime: 60_000,
  });
}

export function useCmsProcess() {
  return useQuery({
    queryKey: ["public", "cms", CMS_SETTING_KEYS.process],
    queryFn: async () => mergeCmsProcess(await fetchCmsValue(CMS_SETTING_KEYS.process)),
    placeholderData: mergeCmsProcess(null),
    staleTime: 60_000,
  });
}

export function useCmsPortfolio() {
  return useQuery({
    queryKey: ["public", "cms", CMS_SETTING_KEYS.portfolio],
    queryFn: async () => mergeCmsPortfolio(await fetchCmsValue(CMS_SETTING_KEYS.portfolio)),
    placeholderData: mergeCmsPortfolio(null),
    staleTime: 60_000,
  });
}

export function useCmsLibrary() {
  return useQuery({
    queryKey: ["public", "cms", CMS_SETTING_KEYS.library],
    queryFn: async () => mergeCmsLibrary(await fetchCmsValue(CMS_SETTING_KEYS.library)),
    placeholderData: mergeCmsLibrary(null),
    staleTime: 60_000,
  });
}
