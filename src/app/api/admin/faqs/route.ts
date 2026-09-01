import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import type { FAQItem } from "@/lib/faq-service";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: rows, error } = await supabase
      .from("faqs" as any)
      .select("*, category:categories(id,name,slug), product:products(id,name,slug)")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Supabase FAQs GET error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const HOMEPAGE_FAQ_IDS = new Set([
      "ba1c9724-18f6-4901-9975-f68f502f9cc7",
      "f4920232-2897-483e-8263-a34e79c44e17",
      "bb81fb82-957c-4664-9c1d-652f04605f1f",
      "cbd4772c-cbcf-4a97-8e51-ed469b01002b",
      "2e25609f-2b4d-47e3-b30a-496cafeae0bd",
      "208e7843-9efa-4a54-9690-2fc08f86d9db",
      "1c70f11a-6030-4a0c-a7bc-14b6b5d11170",
      "7bee344a-60de-44ee-b843-accb94951e73",
      "a72cea8a-4e5b-44a5-95dc-ea2633e02334",
      "04c884c3-699a-4360-ab4d-f055d8873208",
      "59049f64-2acb-4a05-a975-4e8c48a1b5ce",
      "a15afe32-791e-418c-b956-57bf1e827ef4",
      "d485a455-3930-4f52-93f2-f8624886f2cc",
      "3cd59f05-28a5-4984-b0b5-371365d832f2",
      "b39ac32b-9cd0-46ac-8c53-d4830b67186c",
      "091a3e46-f280-44f8-918c-df5a744036f6",
      "c3ffe414-6014-4867-9d0c-3a54b52ba23f",
      "1d3c8e4c-8ff0-4523-b997-687f34edc53b",
    ]);

    const faqs: FAQItem[] = (rows || []).map((row: any) => {
      const rowId = String(row.id || "");
      let tab: "global" | "artwork" | "category" | "product" | "page" = "global";
      let section: "homepage" | "category" | "artwork" | "product" | "general" | "page" = "homepage";
      let page_slug: string | null = "home";
      let page_name: string | null = "Home Page";

      if (HOMEPAGE_FAQ_IDS.has(rowId)) {
        tab = "global";
        section = "homepage";
        page_slug = "home";
        page_name = "Home Page";
      } else if (row.artwork_section) {
        tab = "artwork";
        section = "artwork";
        page_slug = "artwork-guidelines";
        page_name = "Artwork Guidelines";
      } else if (row.product_id || row.product) {
        tab = "product";
        section = "product";
        page_slug = "product-detail-pages";
        page_name = row.product?.name ? `Product: ${row.product.name}` : "Product Detail";
      } else if (row.category_id || row.category) {
        tab = "category";
        section = "category";
        page_slug = row.category?.slug || "category";
        page_name = row.category?.name ? `Category: ${row.category.name}` : "Category Page";
      } else if (row.page_slug) {
        tab = (row.tab as any) || "page";
        section = (row.section as any) || "page";
        page_slug = row.page_slug;
        page_name = row.page_name || row.page_slug;
      }

      const categoryLabel =
        row.category?.name ||
        (row.product?.name ? `Product: ${row.product.name}` : undefined) ||
        (row.artwork_section ? `Artwork: ${row.artwork_section}` : undefined) ||
        (tab === "global" ? "Home: General" : "Global Support");

      return {
        id: String(row.id),
        question: row.question || "",
        answer: row.answer || "",
        category: categoryLabel,
        tab,
        section,
        page_slug,
        page_name,
        category_slug: row.category?.slug || row.category_slug || null,
        category_id: row.category_id || row.category?.id || null,
        product_slug: row.product?.slug || row.product_slug || null,
        product_id: row.product_id || row.product?.id || null,
        status: row.is_published === false ? "Draft" : "Published",
        order: row.display_order ?? 0,
        created_at: row.created_at,
        updated_at: row.updated_at,
      };
    });

    return NextResponse.json({ success: true, faqs });
  } catch (err: any) {
    console.error("Admin FAQs GET API Error:", err);
    return NextResponse.json({ error: err?.message || "Failed to fetch FAQs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id: rawId,
      question,
      answer,
      category_id,
      product_id,
      artwork_section,
      status,
      order,
      tab,
      page_name,
    } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and Answer are required" },
        { status: 400 }
      );
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const id = rawId && uuidRegex.test(rawId) ? rawId : crypto.randomUUID();
    const now = new Date().toISOString();

    const payload: any = {
      id,
      question: question.trim(),
      answer: answer.trim(),
      is_published: status !== "Draft",
      display_order: typeof order === "number" ? order : 0,
      category_id: category_id || null,
      product_id: product_id || null,
      artwork_section:
        artwork_section || (tab === "artwork" ? page_name || "General" : null),
      updated_at: now,
    };

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("faqs" as any)
      .upsert(payload, { onConflict: "id" })
      .select("*, category:categories(id,name,slug), product:products(id,name,slug)")
      .single();

    if (error) {
      console.error("Supabase FAQ save error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, faq: data });
  } catch (err: any) {
    console.error("Admin FAQs POST API Error:", err);
    return NextResponse.json({ error: err?.message || "Failed to save FAQ" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const items: Array<{ id: string; order: number }> = body.items || [];

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided for reorder" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const now = new Date().toISOString();

    for (const item of items) {
      if (item.id) {
        await supabase
          .from("faqs" as any)
          .update({ display_order: item.order, updated_at: now })
          .eq("id", item.id);
      }
    }

    return NextResponse.json({ success: true, message: `Reordered ${items.length} FAQs` });
  } catch (err: any) {
    console.error("Admin FAQs PUT API Error:", err);
    return NextResponse.json({ error: err?.message || "Failed to reorder FAQs" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    if (!id) {
      const body = await req.json().catch(() => ({}));
      id = body.id;
    }

    if (!id) {
      return NextResponse.json({ error: "FAQ id is required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("faqs" as any).delete().eq("id", id);

    if (error) {
      console.error("Supabase FAQ delete error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "FAQ deleted successfully" });
  } catch (err: any) {
    console.error("Admin FAQs DELETE API Error:", err);
    return NextResponse.json({ error: err?.message || "Failed to delete FAQ" }, { status: 500 });
  }
}
