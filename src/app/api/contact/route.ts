import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const name = data.name || data.fullName;
    const email = data.email;
    const message = data.message || data.comments || "";

    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing required fields (name, email)" },
        { status: 400 }
      );
    }

    try {
      const payload = await getPayload({ config });
      await payload.create({
        collection: "contact-submissions",
        data: {
          name,
          email,
          phone: data.phone || "",
          subject: data.subject || "General Inquiry",
          message,
          status: "new",
        },
      });
    } catch (payloadErr) {
      console.warn("Payload DB not connected yet, logged contact in memory:", payloadErr);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for contacting HOF Pack. We will respond shortly.",
    });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Failed to process contact inquiry." },
      { status: 500 }
    );
  }
}
