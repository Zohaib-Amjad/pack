import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const customPath = body.path;

    if (customPath) {
      revalidatePath(customPath);
    } else {
      // Revalidate main UI sections
      revalidatePath("/", "page");
      revalidatePath("/artwork-guidelines", "page");
      revalidatePath("/[categorySlug]", "page");
      revalidatePath("/product/[productSlug]", "page");
      revalidatePath("/about", "page");
      revalidatePath("/contact", "page");
      revalidatePath("/process", "page");
      revalidatePath("/track", "page");
      revalidatePath("/case-studies", "page");
      revalidatePath("/catalog", "page");
    }

    return NextResponse.json({
      success: true,
      message: "Frontend UI revalidated successfully.",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to revalidate" },
      { status: 500 }
    );
  }
}
