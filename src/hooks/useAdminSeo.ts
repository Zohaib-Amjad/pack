import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createDataClient } from "@/utils/supabase/data-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { mergeSeoSettings, SEO_SETTING_KEY } from "@/lib/seo";
import type { SeoSettings } from "@/types/seo-settings";

async function fetchSeoValue(): Promise<unknown> {
  const supabase = createDataClient();
  const { data, error } = await withAbortableTimeout((signal) =>
    supabase.from("site_settings" as any).select("value").eq("key", SEO_SETTING_KEY).abortSignal(signal).maybeSingle() as any
  );
  if (error) throw new Error(error.message);
  return data?.value ?? null;
}

async function upsertSeo(value: unknown) {
  const supabase = createDataClient();
  const { error } = await withAbortableTimeout((signal) =>
    supabase
      .from("site_settings" as any)
      .upsert(
        { key: SEO_SETTING_KEY, value, updated_at: new Date().toISOString() } as any,
        { onConflict: "key" }
      )
      .abortSignal(signal) as any
  );
  if (error) throw new Error(error.message);
}

export function useAdminSeoSettings() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["admin", "settings", SEO_SETTING_KEY],
    queryFn: async () => mergeSeoSettings(await fetchSeoValue()),
  });
  const save = useMutation({
    mutationFn: (value: SeoSettings) => upsertSeo(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "settings", SEO_SETTING_KEY] });
    },
  });
  return { ...query, saveDocument: save.mutateAsync, saving: save.isPending };
}
