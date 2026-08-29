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
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "cms_home")
    .maybeSingle();

  if (data?.value) {
    const val = data.value;
    if (val.testimonials) {
      val.testimonials.trustStats = [];
    }
    const { error } = await supabase
      .from("site_settings")
      .upsert({
        key: "cms_home",
        value: val,
        updated_at: new Date().toISOString(),
      }, { onConflict: "key" });
    
    if (error) {
      console.error("Error cleaning testimonials in Supabase:", error);
    } else {
      console.log("Successfully erased trustStats from Supabase cms_home!");
    }
  }
}

clean();
