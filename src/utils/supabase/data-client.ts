import { SupabaseClient } from "@supabase/supabase-js"
import { createClient } from "./client"

/**
 * Singleton Supabase client for data-only operations.
 * Now unified with the main browser client to prevent multiple GoTrueClient instances
 * and the "AbortError: Lock broken" race condition.
 */
export function createDataClient(): SupabaseClient {
  return createClient();
}
