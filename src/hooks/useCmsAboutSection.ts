import { useState, useEffect, useCallback } from "react";
import { useAdminCmsAbout } from "@/hooks/useAdminCms";
import type { CmsAbout } from "@/types/cms";
import { mergeCmsAbout } from "@/lib/cms";

export function useCmsAboutSection<K extends keyof CmsAbout>(section: K) {
  const { data, isLoading, error, refetch, saveDocument, saving } = useAdminCmsAbout();
  const [local, setLocal] = useState<CmsAbout[K] | null>(null);

  useEffect(() => {
    if (data) setLocal(data[section]);
  }, [data, section]);

  const save = useCallback(
    async (explicitValue?: CmsAbout[K]) => {
      const currentDoc = data || mergeCmsAbout(null);
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
