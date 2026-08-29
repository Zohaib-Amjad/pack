import { createPublicClient } from "@/utils/supabase/public-client";
import { createDataClient } from "@/utils/supabase/data-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import {
  DEFAULT_LIBRARY_ITEMS,
  type DefaultLibraryItem,
} from "@/data/library-defaults";

const SETTINGS_KEY = "library_items_list";

export interface LibraryItemRecord extends DefaultLibraryItem {
  tab?: string;
  section_name?: string;
  section_subtitle?: string;
  created_at?: string;
  updated_at?: string;
}

export async function fetchAllLibraryItems(): Promise<LibraryItemRecord[]> {
  const fallbackList = DEFAULT_LIBRARY_ITEMS.map((item) => ({
    ...item,
    tab: "Materials",
    section_name: item.category || "Paperboard",
    section_subtitle: "",
  }));

  let dbItems: LibraryItemRecord[] = [];

  // 1. Try fetching from library_items table
  try {
    const supabase = createPublicClient();
    const res = (await withAbortableTimeout((signal) =>
      (supabase
        .from("library_items" as any)
        .select("*")
        .abortSignal(signal) as any)
    )) as any;

    if (!res?.error && Array.isArray(res?.data) && res.data.length > 0) {
      dbItems = res.data.map((item: any, idx: number) => ({
        id: item.id || `lib-${idx}`,
        title: item.title || "Untitled Resource",
        category: item.category || item.section_name || "Paperboard",
        tab: item.tab || "Materials",
        section_name: item.section_name || item.category || "Paperboard",
        section_subtitle: item.section_subtitle || "",
        order: typeof item.order === "number" ? item.order : idx + 1,
        image: item.image || item.image_url || "/Pillow Gift Boxes.png",
        description: item.description || "",
        is_published: item.is_published !== false,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));
    }
  } catch {
    // Ignore table failure
  }

  // 2. Fetch from site_settings fallback
  try {
    const supabase = createPublicClient();
    const res = (await withAbortableTimeout((signal) =>
      (supabase
        .from("site_settings" as any)
        .select("value")
        .eq("key", SETTINGS_KEY)
        .abortSignal(signal)
        .maybeSingle() as any)
    )) as any;

    if (!res?.error && Array.isArray(res?.data?.value)) {
      const settingsItems: LibraryItemRecord[] = res.data.value;
      const existingIds = new Set(dbItems.map((i) => i.id));
      settingsItems.forEach((s) => {
        if (!existingIds.has(s.id)) {
          dbItems.push(s);
        }
      });
    }
  } catch {
    // Ignore settings failure
  }

  // 3. Merge with local storage in browser
  if (typeof window !== "undefined") {
    try {
      const localStr = localStorage.getItem("hof_custom_library_items");
      if (localStr) {
        const localItems: LibraryItemRecord[] = JSON.parse(localStr);
        const existingIds = new Set(dbItems.map((i) => i.id));
        localItems.forEach((l) => {
          if (!existingIds.has(l.id)) {
            dbItems.push(l);
          }
        });
      }
    } catch {
      // Ignore local storage error
    }
  }

  if (dbItems.length > 0) {
    dbItems.sort((a, b) => (a.order || 0) - (b.order || 0));
    const dbIds = new Set(dbItems.map((i) => i.id));
    const dbTitles = new Set(dbItems.map((i) => (i.title || "").toLowerCase().trim()));
    const remainingFallbacks = fallbackList.filter(
      (i) => !dbIds.has(i.id) && !dbTitles.has(i.title.toLowerCase().trim())
    );
    return [...dbItems, ...remainingFallbacks];
  }

  return fallbackList;
}

export async function saveLibraryItem(item: LibraryItemRecord): Promise<void> {
  // 1. Try inserting/updating library_items table
  try {
    const supabase = createDataClient();
    const payload = {
      id: item.id,
      title: item.title,
      description: item.description,
      image: item.image,
      category: item.category || item.section_name || "Paperboard",
      tab: item.tab || "Materials",
      section_name: item.section_name || item.category || "Paperboard",
      section_subtitle: item.section_subtitle || "",
      order: item.order,
      is_published: item.is_published,
      updated_at: new Date().toISOString(),
      created_at: item.created_at || new Date().toISOString(),
    };
    await (supabase.from("library_items" as any).upsert(payload as any, { onConflict: "id" }) as any);
  } catch {
    // Ignore
  }

  // 2. Persist in site_settings (Guaranteed to work)
  try {
    const supabase = createDataClient();
    const currentAll = await fetchAllLibraryItems();
    const filtered = currentAll.filter((i) => i.id !== item.id);
    const updated = [item, ...filtered];

    await (supabase
      .from("site_settings" as any)
      .upsert(
        { key: SETTINGS_KEY, value: updated, updated_at: new Date().toISOString() } as any,
        { onConflict: "key" }
      ) as any);
  } catch {
    // Ignore
  }

  // 3. Persist in localStorage
  if (typeof window !== "undefined") {
    try {
      const localStr = localStorage.getItem("hof_custom_library_items");
      const currentLocal: LibraryItemRecord[] = localStr ? JSON.parse(localStr) : [];
      const filteredLocal = currentLocal.filter((i) => i.id !== item.id);
      localStorage.setItem("hof_custom_library_items", JSON.stringify([item, ...filteredLocal]));
    } catch {
      // Ignore
    }
  }
}

export async function deleteLibraryItem(id: string): Promise<void> {
  // 1. Try table delete
  try {
    const supabase = createDataClient();
    await (supabase.from("library_items" as any).delete().eq("id", id) as any);
  } catch {
    // Ignore
  }

  // 2. Delete from site_settings
  try {
    const supabase = createDataClient();
    const currentAll = await fetchAllLibraryItems();
    const updated = currentAll.filter((i) => i.id !== id);
    await (supabase
      .from("site_settings" as any)
      .upsert(
        { key: SETTINGS_KEY, value: updated, updated_at: new Date().toISOString() } as any,
        { onConflict: "key" }
      ) as any);
  } catch {
    // Ignore
  }

  // 3. Delete from localStorage
  if (typeof window !== "undefined") {
    try {
      const localStr = localStorage.getItem("hof_custom_library_items");
      if (localStr) {
        const currentLocal: LibraryItemRecord[] = JSON.parse(localStr);
        const filteredLocal = currentLocal.filter((i) => i.id !== id);
        localStorage.setItem("hof_custom_library_items", JSON.stringify(filteredLocal));
      }
    } catch {
      // Ignore
    }
  }
}
