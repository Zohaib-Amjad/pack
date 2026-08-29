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

async function inspect() {
  // 1. site_settings
  const { data: setRow } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "custom_categories_list")
    .maybeSingle();

  console.log("--- site_settings custom_categories_list ---");
  if (setRow?.value && Array.isArray(setRow.value)) {
    console.log(setRow.value.map(c => ({ id: c.id, name: c.name, slug: c.slug, section: c.section })));
  } else {
    console.log("None or not array");
  }

  // 2. categories table
  const { data: catRows } = await supabase
    .from("categories")
    .select("*");

  console.log("--- categories table ---");
  if (catRows && Array.isArray(catRows)) {
    console.log(catRows.map(c => ({ id: c.id, name: c.name, slug: c.slug, section: c.section })));
  } else {
    console.log("None or empty");
  }
}

inspect();
