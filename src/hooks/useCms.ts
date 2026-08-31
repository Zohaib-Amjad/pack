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
import type { CmsHome, CmsAbout, CmsProcess, CmsPortfolio, CmsLibrary } from "@/types/cms";

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

export function useCmsHome(initialData?: CmsHome) {
  return useQuery({
    queryKey: ["public", "cms", CMS_SETTING_KEYS.home],
    queryFn: async () => mergeCmsHome(await fetchCmsValue(CMS_SETTING_KEYS.home)),
    initialData,
    staleTime: 60_000,
  });
}

export function useCmsAbout(initialData?: CmsAbout) {
  return useQuery({
    queryKey: ["public", "cms", CMS_SETTING_KEYS.about],
    queryFn: async () => mergeCmsAbout(await fetchCmsValue(CMS_SETTING_KEYS.about)),
    initialData,
    staleTime: 60_000,
  });
}

export function useCmsProcess(initialData?: CmsProcess) {
  return useQuery({
    queryKey: ["public", "cms", CMS_SETTING_KEYS.process],
    queryFn: async () => mergeCmsProcess(await fetchCmsValue(CMS_SETTING_KEYS.process)),
    initialData,
    staleTime: 60_000,
  });
}

export function useCmsPortfolio(initialData?: CmsPortfolio) {
  return useQuery({
    queryKey: ["public", "cms", CMS_SETTING_KEYS.portfolio],
    queryFn: async () => mergeCmsPortfolio(await fetchCmsValue(CMS_SETTING_KEYS.portfolio)),
    initialData,
    staleTime: 60_000,
  });
}

export function useCmsLibrary(initialData?: CmsLibrary) {
  return useQuery({
    queryKey: ["public", "cms", CMS_SETTING_KEYS.library],
    queryFn: async () => mergeCmsLibrary(await fetchCmsValue(CMS_SETTING_KEYS.library)),
    initialData,
    staleTime: 60_000,
  });
}
