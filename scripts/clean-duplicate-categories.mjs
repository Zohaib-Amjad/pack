import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.log("Supabase credentials not found.");
  process.exit(0);
}

const supabase = createClient(url, key);

async function clean() {
  // 1. Clean site_settings
  const { data: setRow } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "custom_categories_list")
    .maybeSingle();

  if (setRow?.value && Array.isArray(setRow.value)) {
    const map = new Map();
    setRow.value.forEach((cat) => {
      const canonicalSlug = cat.slug === "kraft-boxes" ? "custom-kraft-boxes" : cat.slug;
      const key = `${canonicalSlug}-${cat.name.toLowerCase().trim()}`;
      if (!map.has(key)) {
        map.set(key, { ...cat, slug: canonicalSlug });
      }
    });
    const cleaned = Array.from(map.values());
    const { error: err1 } = await supabase
      .from("site_settings")
      .upsert({
        key: "custom_categories_list",
        value: cleaned,
        updated_at: new Date().toISOString(),
      }, { onConflict: "key" });

    if (err1) {
      console.error("Error updating site_settings:", err1);
    } else {
      console.log(`Cleaned site_settings custom_categories_list: ${setRow.value.length} -> ${cleaned.length} categories.`);
    }
  }

  // 2. Delete any row with slug "kraft-boxes" from categories table if present
  try {
    const { error: err2 } = await supabase
      .from("categories")
      .delete()
      .eq("slug", "kraft-boxes");
    if (!err2) {
      console.log("Deleted old 'kraft-boxes' slug from categories table.");
    }
  } catch {
    // ignore
  }
}

clean();
