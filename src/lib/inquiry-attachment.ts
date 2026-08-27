import {
  ARTWORK_MAX_BYTES,
  validateArtworkFile,
} from "@/lib/form-validation";

export type InquiryAttachment = {
  url: string;
  name: string;
  type: string;
};

/** Upload artwork via server API (service-role → Supabase Storage). */
export async function uploadInquiryAttachment(file: File): Promise<InquiryAttachment> {
  const validationError = validateArtworkFile(file);
  if (validationError) {
    throw new Error(validationError);
  }
  if (file.size > ARTWORK_MAX_BYTES) {
    throw new Error("File must be 50MB or smaller");
  }

  const body = new FormData();
  body.append("file", file);

  const res = await fetch("/api/inquiry-attachment", {
    method: "POST",
    body,
  });

  const data = (await res.json().catch(() => ({}))) as {
    error?: string;
    url?: string;
    name?: string;
    type?: string;
  };

  if (!res.ok || !data.url) {
    throw new Error(data.error || "Failed to upload artwork file");
  }

  return {
    url: data.url,
    name: data.name || file.name,
    type: data.type || file.type || "application/octet-stream",
  };
}
