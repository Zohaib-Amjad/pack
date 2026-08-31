import { NextResponse } from "next/server";
import { getLeads, saveLead } from "@/lib/leads-service";
import { leadInputSchema } from "@/lib/leads-schema";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";

/**
 * Authenticates request using x-api-key header against CRM_API_KEY environment variable.
 */
function authenticateCrmKey(req: Request): boolean {
  const apiKey = req.headers.get("x-api-key") || req.headers.get("X-API-KEY");
  const configuredKey = process.env.CRM_API_KEY;

  if (!configuredKey || !apiKey) {
    return false;
  }

  // Constant-time length and equality comparison
  return apiKey === configuredKey;
}

/**
 * GET /api/leads
 * Secure endpoint for CRM developers to pull leads.
 * Header: x-api-key: <CRM_API_KEY>
 * Query Param: ?since=2026-08-31T00:00:00.000Z (Optional ISO 8601 string)
 * Returns: { "leads": [ { "id", "name", "email", "phone", "message", "created_at" } ] }
 */
export async function GET(req: Request) {
  // 1. Authenticate API Key
  if (!authenticateCrmKey(req)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Invalid or missing 'x-api-key' header.",
      },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const sinceParam = searchParams.get("since");
    let sinceDate: Date | undefined;

    if (sinceParam) {
      const parsed = new Date(sinceParam);
      if (isNaN(parsed.getTime())) {
        return NextResponse.json(
          {
            error: "Bad Request",
            message:
              "Invalid 'since' query parameter. Must be a valid ISO-8601 date string (e.g. 2026-08-31T00:00:00.000Z).",
          },
          { status: 400 }
        );
      }
      sinceDate = parsed;
    }

    // 2. Fetch leads from database
    const leads = await getLeads(sinceDate);

    // 3. Return exact JSON format requested
    return NextResponse.json({
      leads,
    });
  } catch (error: any) {
    console.error("GET /api/leads Error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to retrieve leads from the database.",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/leads
 * Allows authorized CRM systems or external integrations to submit leads directly.
 */
export async function POST(req: Request) {
  const clientIp = getClientIp(req);
  const isAuthorized = authenticateCrmKey(req);

  // Rate limit unauthorized or public hits (10 requests per 10 mins)
  if (!isAuthorized) {
    const rateLimit = checkRateLimit(clientIp, { max: 10, windowMs: 10 * 60 * 1000 });
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Too Many Requests",
          message: "Rate limit exceeded. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }
  }

  try {
    const body = await req.json();

    // Validate with Zod
    const parseResult = leadInputSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Validation Error",
          issues: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const leadData = parseResult.data;

    // Bot detection check
    if (leadData.website && leadData.website.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Lead recorded." });
    }

    const saved = await saveLead(leadData);

    return NextResponse.json(
      {
        success: true,
        message: "Lead created successfully",
        lead: {
          id: saved.id,
          name: saved.name,
          email: saved.email,
          phone: saved.phone || "",
          message: saved.message || "",
          created_at: saved.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/leads Error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to process lead submission.",
      },
      { status: 500 }
    );
  }
}
