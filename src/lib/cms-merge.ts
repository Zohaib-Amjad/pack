/** Deep merge plain objects; arrays and primitives from `patch` replace. */
export function deepMerge<T extends Record<string, unknown>>(base: T, patch: unknown): T {
  if (patch === null || patch === undefined || typeof patch !== "object" || Array.isArray(patch)) {
    return base;
  }
  const out = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(patch as Record<string, unknown>)) {
    const pv = (patch as Record<string, unknown>)[key];
    const bv = out[key];
    if (
      pv !== null &&
      typeof pv === "object" &&
      !Array.isArray(pv) &&
      bv !== null &&
      typeof bv === "object" &&
      !Array.isArray(bv)
    ) {
      out[key] = deepMerge(bv as Record<string, unknown>, pv) as unknown;
    } else if (pv !== undefined) {
      out[key] = pv;
    }
  }
  return out as T;
}
