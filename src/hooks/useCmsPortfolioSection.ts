import { useState, useEffect, useCallback } from "react";
import { useAdminCmsPortfolio } from "@/hooks/useAdminCms";
import type { CmsPortfolio } from "@/types/cms";
import { mergeCmsPortfolio } from "@/lib/cms";

export function useCmsPortfolioSection<K extends keyof CmsPortfolio>(section: K) {
  const { data, isLoading, error, refetch, saveDocument, saving } = useAdminCmsPortfolio();
  const [local, setLocal] = useState<CmsPortfolio[K] | null>(null);

  useEffect(() => {
    if (data) setLocal(data[section]);
  }, [data, section]);

  const save = useCallback(
    async (explicitValue?: CmsPortfolio[K]) => {
      const currentDoc = data || mergeCmsPortfolio(null);
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
