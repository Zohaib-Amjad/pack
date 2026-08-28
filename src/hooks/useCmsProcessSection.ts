import { useState, useEffect, useCallback } from "react";
import { useAdminCmsProcess } from "@/hooks/useAdminCms";
import type { CmsProcess } from "@/types/cms";
import { mergeCmsProcess } from "@/lib/cms";

export function useCmsProcessSection<K extends keyof CmsProcess>(section: K) {
  const { data, isLoading, error, refetch, saveDocument, saving } = useAdminCmsProcess();
  const [local, setLocal] = useState<CmsProcess[K] | null>(null);

  useEffect(() => {
    if (data) setLocal(data[section]);
  }, [data, section]);

  const save = useCallback(
    async (explicitValue?: CmsProcess[K]) => {
      const currentDoc = data || mergeCmsProcess(null);
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
