import { useState, useEffect, useCallback } from "react";
import { useAdminCmsLibrary } from "@/hooks/useAdminCms";
import type { CmsLibrary } from "@/types/cms";
import { mergeCmsLibrary } from "@/lib/cms";

export function useCmsLibrarySection<K extends keyof CmsLibrary>(section: K) {
  const { data, isLoading, error, refetch, saveDocument, saving } = useAdminCmsLibrary();
  const [local, setLocal] = useState<CmsLibrary[K] | null>(null);

  useEffect(() => {
    if (data) setLocal(data[section]);
  }, [data, section]);

  const save = useCallback(
    async (explicitValue?: CmsLibrary[K]) => {
      const currentDoc = data || mergeCmsLibrary(null);
      const val = explicitValue !== undefined ? explicitValue : local;
      if (val === null) return;
      await saveDocument({ ...currentDoc, [section]: val });
    },
    [data, local, section, saveDocument]
  );

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
