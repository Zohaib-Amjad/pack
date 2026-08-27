import { useState, useEffect, useCallback } from "react";
import { useAdminCmsAbout } from "@/hooks/useAdminCms";
import type { CmsAbout } from "@/types/cms";

export function useCmsAboutSection<K extends keyof CmsAbout>(section: K) {
  const { data, isLoading, error, refetch, saveDocument, saving } = useAdminCmsAbout();
  const [local, setLocal] = useState<CmsAbout[K] | null>(null);

  useEffect(() => {
    if (data) setLocal(data[section]);
  }, [data, section]);

  const save = useCallback(async () => {
    if (!data || local === null) return;
    await saveDocument({ ...data, [section]: local });
  }, [data, local, section, saveDocument]);

  return {
    full: data,
    local,
    setLocal,
    save,
    saveDocument,
    saving,
    isLoading,
    error,
    refetch,
    ready: Boolean(data && local !== null),
  };
}
