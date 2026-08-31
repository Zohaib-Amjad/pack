import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";
import { leadInputSchema } from "@/lib/leads-schema";
import { saveLead } from "@/lib/leads-service";

export async function POST(req: Request) {
  // 1. IP Rate Limiting (Anti-spam / Anti-bot: max 5 submissions per 10 minutes per IP)
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(clientIp, { max: 5, windowMs: 10 * 60 * 1000 });

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        error: "Too Many Requests",
        message: "You have submitted too many requests. Please wait a few minutes before trying again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  try {
    const rawData = await req.json();

    // Map common input field synonyms
    const normalizedData = {
      name: rawData.name || rawData.fullName || `${rawData.firstName || ""} ${rawData.lastName || ""}`.trim(),
      email: rawData.email,
      phone: rawData.phone || "",
      message: rawData.message || rawData.comments || rawData.additionalNotes || "",
      source: rawData.source || "contact-form",
      website: rawData.website || "", // Honeypot field
    };

    // 2. Zod Schema Validation
    const validationResult = leadInputSchema.safeParse(normalizedData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          error: "Validation Failed",
          message: "Please check your form inputs and try again.",
          issues: fieldErrors,
        },
        { status: 400 }
      );
    }

    const leadData = validationResult.data;

    // 3. Honeypot check (Silent drop for automated spam bots)
    if (leadData.website && leadData.website.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: "Thank you for contacting HOF Pack. We will respond shortly.",
      });
    }

    // 4. Save into the "leads" table/collection
    const savedLead = await saveLead({
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone || "",
      message: leadData.message || "",
      source: leadData.source || "contact-form",
    });

    // 5. Also save in contact-submissions collection for backward compatibility in Payload Admin
    try {
      const payload = await getPayload({ config });
      await payload.create({
        collection: "contact-submissions",
        data: {
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone || "",
          subject: rawData.subject || "Contact Form Inquiry",
          message: leadData.message || "",
          status: "new",
        },
      });
    } catch (payloadErr) {
      console.warn("Payload contact-submissions sync warning:", payloadErr);
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for contacting HOF Pack. We will respond shortly.",
      leadId: savedLead.id,
    });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to process contact inquiry. Please try again later.",
      },
      { status: 500 }
    );
  }
}
