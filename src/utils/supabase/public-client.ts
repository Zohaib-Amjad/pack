import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

let browserPublicClient: SupabaseClient | null = null;

const publicClientOptions = {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
};

/**
 * Supabase client for public/frontend data requests.
 * Browser: singleton for reuse.
 * Server/prerender: fresh stateless client (no window dependency).
 */
export function createPublicClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (typeof window === "undefined") {
    return createClient(url, anonKey, publicClientOptions);
  }

  if (!browserPublicClient) {
    browserPublicClient = createClient(url, anonKey, publicClientOptions);
  }

  return browserPublicClient;
}
