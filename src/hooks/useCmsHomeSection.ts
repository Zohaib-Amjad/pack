import { useState, useEffect, useCallback } from "react";
import { useAdminCmsHome } from "@/hooks/useAdminCms";
import type { CmsHome } from "@/types/cms";
import { mergeCmsHome } from "@/lib/cms";

export function useCmsHomeSection<K extends keyof CmsHome>(section: K) {
  const { data, isLoading, error, refetch, saveDocument, saving } = useAdminCmsHome();
  const [local, setLocal] = useState<CmsHome[K] | null>(null);

  useEffect(() => {
    if (data) setLocal(data[section]);
  }, [data, section]);

  const save = useCallback(
    async (explicitValue?: CmsHome[K]) => {
      const currentDoc = data || mergeCmsHome(null);
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
