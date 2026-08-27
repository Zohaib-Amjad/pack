import { useState, useEffect, useCallback } from "react";
import { useAdminCmsLibrary } from "@/hooks/useAdminCms";
import type { CmsLibrary } from "@/types/cms";

export function useCmsLibrarySection<K extends keyof CmsLibrary>(section: K) {
  const { data, isLoading, error, refetch, saveDocument, saving } = useAdminCmsLibrary();
  const [local, setLocal] = useState<CmsLibrary[K] | null>(null);

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
