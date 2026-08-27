import { useState, useEffect, useCallback } from "react";
import { useAdminCmsHome } from "@/hooks/useAdminCms";
import type { CmsHome } from "@/types/cms";

export function useCmsHomeSection<K extends keyof CmsHome>(section: K) {
  const { data, isLoading, error, refetch, saveDocument, saving } = useAdminCmsHome();
  const [local, setLocal] = useState<CmsHome[K] | null>(null);

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
