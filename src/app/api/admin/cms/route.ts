import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "Setting key is required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("site_settings" as any)
      .select("value")
      .eq("key", key)
      .maybeSingle();

    if (error) {
      console.error(`[Admin CMS API] GET error for ${key}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, value: data?.value || null });
  } catch (err: any) {
    console.error("[Admin CMS API] GET Exception:", err);
    return NextResponse.json({ error: err?.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key, value } = body;

    if (!key) {
      return NextResponse.json({ error: "Setting key is required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from("site_settings" as any)
      .upsert(
        {
          key,
          value,
          updated_at: now,
        },
        { onConflict: "key" }
      )
      .select()
      .single();

    if (error) {
      console.error(`[Admin CMS API] POST error for ${key}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, setting: data });
  } catch (err: any) {
    console.error("[Admin CMS API] POST Exception:", err);
    return NextResponse.json({ error: err?.message || "Internal server error" }, { status: 500 });
  }
}
