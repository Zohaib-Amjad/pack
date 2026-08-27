import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Wraps a promise with a timeout. If the promise doesn't resolve within
 * the given duration, it rejects with a timeout error.
 */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Request timed out after ${ms}ms`));
    }, ms);

    promise.then(
      (val) => { clearTimeout(timer); resolve(val); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

/**
 * A hook that provides a resilient data-fetching wrapper for Supabase queries.
 * - Adds a configurable timeout (default 10s) to prevent infinite loading
 * - Tracks component mount state to prevent state updates on unmounted components
 * - Provides retry capability
 * - Prevents race conditions from stale responses
 */
export function useSupabaseFetch<T>(
  fetchFn: (signal: { cancelled: boolean }) => Promise<T>,
  options: { timeout?: number; deps?: any[] } = {}
) {
  const { timeout = 10000, deps = [] } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const fetchIdRef = useRef(0);

  const fetchFnRef = useRef(fetchFn);
  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  const execute = useCallback(async () => {
    const currentFetchId = ++fetchIdRef.current;
    const signal = { cancelled: false };

    setLoading(true);
    setError(null);

    try {
      const result = await withTimeout(fetchFnRef.current(signal), timeout);

      // Only update state if this is still the latest fetch and component is mounted
      if (mountedRef.current && currentFetchId === fetchIdRef.current && !signal.cancelled) {
        setData(result);
        setLoading(false);
      }
    } catch (err: any) {
      if (mountedRef.current && currentFetchId === fetchIdRef.current && !signal.cancelled) {
        console.error("Fetch error:", err);
        setError(err?.message || "Failed to load data");
        setLoading(false);
      }
    }
  }, [timeout]);

  const depsKey = JSON.stringify(deps);

  useEffect(() => {
    mountedRef.current = true;
    execute();

    return () => {
      mountedRef.current = false;
    };
  }, [depsKey, execute]);

  return { data, loading, error, refetch: execute };
}
