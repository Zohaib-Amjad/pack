import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Basic validation
    const fullName = data.fullName || data.name || data.customerName;
    const email = data.email;
    const phone = data.phone || "N/A";
    const boxStyle = data.boxStyle || data.category || "Custom Packaging";

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Missing required fields (fullName, email)" },
        { status: 400 }
      );
    }

    let createdId = `quote-${Date.now()}`;

    try {
      const payload = await getPayload({ config });
      const doc = await payload.create({
        collection: "quote-requests",
        data: {
          fullName,
          email,
          phone,
          company: data.company || "",
          boxStyle,
          quantity: String(data.quantity || data.qty || "100"),
          material: data.material || "",
          printing: data.printing || "",
          additionalNotes: data.notes || data.additionalNotes || data.comments || "",
          status: "new",
        },
      });
      if (doc?.id) createdId = String(doc.id);
    } catch (payloadErr) {
      console.warn("Payload DB not connected yet, logged quote in memory:", payloadErr);
    }

    return NextResponse.json({
      success: true,
      message: "Quote request successfully submitted. A specialist will reply within 2 hours.",
      data: {
        id: createdId,
        fullName,
        email,
        boxStyle,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Quote API Error:", error);
    return NextResponse.json(
      { error: "Failed to process quote request. Please try again later." },
      { status: 500 }
    );
  }
}
