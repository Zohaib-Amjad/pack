import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createDataClient } from "@/utils/supabase/data-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import {
  CMS_SETTING_KEYS,
  mergeCmsAbout,
  mergeCmsHome,
  mergeCmsLibrary,
  mergeCmsPortfolio,
  mergeCmsProcess,
} from "@/lib/cms";
import type { CmsAbout, CmsHome, CmsLibrary, CmsPortfolio, CmsProcess } from "@/types/cms";

async function fetchSettingValue(key: string): Promise<unknown> {
  const supabase = createDataClient();
  const { data, error } = await withAbortableTimeout((signal) =>
    supabase.from("site_settings" as any).select("value").eq("key", key).abortSignal(signal).maybeSingle() as any
  );
  if (error) throw new Error(error.message);
  return data?.value ?? null;
}

async function upsertSetting(key: string, value: unknown) {
  const supabase = createDataClient();
  const { error } = await withAbortableTimeout((signal) =>
    supabase
      .from("site_settings" as any)
      .upsert(
        { key, value, updated_at: new Date().toISOString() } as any,
        { onConflict: "key" }
      )
      .abortSignal(signal) as any
  );
  if (error) throw new Error(error.message);
}

export function useAdminCmsHome() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["admin", "cms", CMS_SETTING_KEYS.home],
    queryFn: async () => mergeCmsHome(await fetchSettingValue(CMS_SETTING_KEYS.home)),
  });
  const save = useMutation({
    mutationFn: (value: CmsHome) => upsertSetting(CMS_SETTING_KEYS.home, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "cms", CMS_SETTING_KEYS.home] });
      queryClient.invalidateQueries({ queryKey: ["public", "cms", CMS_SETTING_KEYS.home] });
    },
  });
  return { ...query, saveDocument: save.mutateAsync, saving: save.isPending };
}

export function useAdminCmsAbout() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["admin", "cms", CMS_SETTING_KEYS.about],
    queryFn: async () => mergeCmsAbout(await fetchSettingValue(CMS_SETTING_KEYS.about)),
  });
  const save = useMutation({
    mutationFn: (value: CmsAbout) => upsertSetting(CMS_SETTING_KEYS.about, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "cms", CMS_SETTING_KEYS.about] });
      queryClient.invalidateQueries({ queryKey: ["public", "cms", CMS_SETTING_KEYS.about] });
    },
  });
  return { ...query, saveDocument: save.mutateAsync, saving: save.isPending };
}

export function useAdminCmsProcess() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["admin", "cms", CMS_SETTING_KEYS.process],
    queryFn: async () => mergeCmsProcess(await fetchSettingValue(CMS_SETTING_KEYS.process)),
  });
  const save = useMutation({
    mutationFn: (value: CmsProcess) => upsertSetting(CMS_SETTING_KEYS.process, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "cms", CMS_SETTING_KEYS.process] });
      queryClient.invalidateQueries({ queryKey: ["public", "cms", CMS_SETTING_KEYS.process] });
    },
  });
  return { ...query, saveDocument: save.mutateAsync, saving: save.isPending };
}

export function useAdminCmsPortfolio() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["admin", "cms", CMS_SETTING_KEYS.portfolio],
    queryFn: async () => mergeCmsPortfolio(await fetchSettingValue(CMS_SETTING_KEYS.portfolio)),
  });
  const save = useMutation({
    mutationFn: (value: CmsPortfolio) => upsertSetting(CMS_SETTING_KEYS.portfolio, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "cms", CMS_SETTING_KEYS.portfolio] });
      queryClient.invalidateQueries({ queryKey: ["public", "cms", CMS_SETTING_KEYS.portfolio] });
    },
  });
  return { ...query, saveDocument: save.mutateAsync, saving: save.isPending };
}

export function useAdminCmsLibrary() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["admin", "cms", CMS_SETTING_KEYS.library],
    queryFn: async () => mergeCmsLibrary(await fetchSettingValue(CMS_SETTING_KEYS.library)),
  });
  const save = useMutation({
    mutationFn: (value: CmsLibrary) => upsertSetting(CMS_SETTING_KEYS.library, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "cms", CMS_SETTING_KEYS.library] });
      queryClient.invalidateQueries({ queryKey: ["public", "cms", CMS_SETTING_KEYS.library] });
    },
  });
  return { ...query, saveDocument: save.mutateAsync, saving: save.isPending };
}
