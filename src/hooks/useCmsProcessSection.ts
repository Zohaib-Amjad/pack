import { useState, useEffect, useCallback } from "react";
import { useAdminCmsProcess } from "@/hooks/useAdminCms";
import type { CmsProcess } from "@/types/cms";

export function useCmsProcessSection<K extends keyof CmsProcess>(section: K) {
  const { data, isLoading, error, refetch, saveDocument, saving } = useAdminCmsProcess();
  const [local, setLocal] = useState<CmsProcess[K] | null>(null);

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
