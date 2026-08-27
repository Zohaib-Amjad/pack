export async function triggerRevalidation(paths: Array<string | null | undefined>) {
  const uniquePaths = [...new Set(paths.filter((path): path is string => Boolean(path && path.startsWith("/"))))];

  if (uniquePaths.length === 0) {
    return { ok: true, paths: [] as string[] };
  }

  try {
    const response = await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ paths: uniquePaths }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      throw new Error(payload?.error || `Failed with status ${response.status}`);
    }

    return {
      ok: true,
      paths: uniquePaths,
    };
  } catch (error) {
    console.error("Failed to trigger on-demand revalidation", error);
    return {
      ok: false,
      paths: uniquePaths,
    };
  }
}
