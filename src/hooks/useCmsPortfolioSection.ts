import { useState, useEffect, useCallback } from "react";
import { useAdminCmsPortfolio } from "@/hooks/useAdminCms";
import type { CmsPortfolio } from "@/types/cms";

export function useCmsPortfolioSection<K extends keyof CmsPortfolio>(section: K) {
  const { data, isLoading, error, refetch, saveDocument, saving } = useAdminCmsPortfolio();
  const [local, setLocal] = useState<CmsPortfolio[K] | null>(null);

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
