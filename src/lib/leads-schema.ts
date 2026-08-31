import { z } from "zod";

// Schema for incoming lead submissions (Contact form & POST /api/leads)
export const leadInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .max(5000, "Message cannot exceed 5000 characters")
    .optional()
    .or(z.literal("")),
  source: z
    .string()
    .max(100, "Source cannot exceed 100 characters")
    .optional()
    .default("website-contact"),
  // Honeypot field for bot detection (must be empty for legitimate users)
  website: z.string().optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadInputSchema>;

// CRM Leads Response DTO shape
export interface LeadExportItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

export interface LeadsApiResponse {
  leads: LeadExportItem[];
}
