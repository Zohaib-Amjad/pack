import { createBrowserClient } from '@supabase/ssr'

let client: any = null;

export function createClient() {
  if (typeof window === 'undefined') {
    throw new Error("createClient() must be used in the browser. Use server client helpers on the server.");
  }

  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        isSingleton: true,
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        }
      }
    )
  }
  return client
}

/**
 * Destroys the browser singleton so the next call to createClient() creates
 * a fresh GoTrueClient. Use this to recover from a stuck/deadlocked auth
 * refresh that occurs after extended browser-tab idle time.
 */
export function resetClient() {
  client = null;
}
