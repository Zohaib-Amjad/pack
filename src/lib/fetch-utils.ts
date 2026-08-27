/**
 * Wraps a Supabase query (or any promise) with a timeout.
 * If the query doesn't resolve within the given duration, it rejects.
 *
 * Single shared utility — replaces 8+ duplicated copies across admin pages.
 */
export const FETCH_TIMEOUT = 12_000; // 12 seconds

export function withTimeout<T>(promise: Promise<T> | PromiseLike<T>, ms: number = FETCH_TIMEOUT): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, ms);

    Promise.resolve(promise).then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

/**
 * Timeout-aware wrapper that actively aborts the underlying request.
 * Use this for Supabase queries by passing `.abortSignal(signal)` in `run`.
 */
export async function withAbortableTimeout<T = any>(
  run: (signal: AbortSignal) => PromiseLike<T> | Promise<T>,
  ms: number = FETCH_TIMEOUT
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);

  try {
    return await run(controller.signal);
  } catch (error: any) {
    if (controller.signal.aborted) {
      throw new Error("Request timed out", { cause: error });
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
