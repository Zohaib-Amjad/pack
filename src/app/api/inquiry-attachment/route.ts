import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { ARTWORK_MAX_BYTES, validateArtworkFile } from "@/lib/form-validation";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded or invalid file format" },
        { status: 400 }
      );
    }

    const validationError = validateArtworkFile(file);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (file.size > ARTWORK_MAX_BYTES) {
      return NextResponse.json(
        { error: "File must be 50MB or smaller" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const supabase = createAdminClient();

    // Sanitize filename and create unique timestamped path
    const safeName = file.name
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .slice(0, 80);
    const filePath = `${Date.now()}-${safeName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("inquiry-attachments")
      .upload(filePath, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError);
      return NextResponse.json(
        { error: uploadError.message || "Failed to upload to storage" },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("inquiry-attachments")
      .getPublicUrl(uploadData.path);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      name: file.name,
      type: file.type,
      size: file.size,
    });
  } catch (error: any) {
    console.error("Inquiry attachment error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process attachment upload" },
      { status: 500 }
    );
  }
}
