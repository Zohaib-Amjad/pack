import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/utils/supabase/public-client";
import { CMS_SETTING_KEYS, mergeCmsHome } from "@/lib/cms";

export const fetchCmsHomeServer = unstable_cache(async () => {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("site_settings" as any)
      .select("value")
      .eq("key", CMS_SETTING_KEYS.home)
      .maybeSingle();
    return mergeCmsHome(data?.value ?? null);
  } catch {
    return mergeCmsHome(null);
  }
}, ["public-cms-home"], { revalidate: 300 });
