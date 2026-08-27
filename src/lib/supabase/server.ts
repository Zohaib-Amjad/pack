import { createClient as createSupabaseServerClient } from "@/utils/supabase/server";

export async function createClient() {
  return await createSupabaseServerClient();
}
