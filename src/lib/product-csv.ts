/**
 * CSV import/export helpers for products — including product_content.
 *
 * product_content sub-fields use simple encodings so they're editable in Excel:
 *
 *  pc_spec_dimension_info        plain text
 *  pc_spec_quantities_info       plain text
 *  pc_spec_turnaround_label      plain text
 *  pc_spec_rush_available        TRUE / FALSE
 *  pc_spec_printing_options      pipe-separated  e.g. "CMYK|PMS|No Printing"
 *  pc_spec_finishing_options     pipe-separated
 *  pc_spec_included_options      pipe-separated
 *  pc_spec_additional_options    pipe-separated
 *  pc_feature_items              JSON array  [{icon,title,description}, ...]
 *  pc_content_blocks             JSON array  [{heading,body,image,alt,flipped,linkLabel}, ...]
 *  pc_article_sections           JSON array  [{level,text}, ...]
 *  pc_material_items             pipe-separated
 *  pc_perk_items                 pipe-separated
 */

import type { ProductContent } from "@/types/product-content";

export const CSV_COLUMNS = [
  // ── Core fields ──────────────────────────────────────────────────────────
  "name",
  "slug",
  "category_name",
  "section",
  "box_style",
  "description",
  "min_quantity",
  "stock_info",
  "size_info",
  "printing_options",
  "finishing_options",
  "proof_info",
  "turnaround_time",
  "shipping_info",
  "price",
  "sku",
  "is_active",
  "meta_title",
  "meta_description",
  "meta_keywords",
  "images",
  // ── product_content ───────────────────────────────────────────────────────
  "pc_spec_dimension_info",
  "pc_spec_quantities_info",
  "pc_spec_turnaround_label",
  "pc_spec_rush_available",
  "pc_spec_printing_options",
  "pc_spec_finishing_options",
  "pc_spec_included_options",
  "pc_spec_additional_options",
  "pc_feature_items",
  "pc_content_blocks",
  "pc_article_sections",
  "pc_material_items",
  "pc_perk_items",
] as const;

export type CsvColumn = (typeof CSV_COLUMNS)[number];

// ── Helpers ──────────────────────────────────────────────────────────────────

function esc(v: unknown): string {
  const s = v == null ? "" : String(v);
  if (s.includes(",") || s.includes("\n") || s.includes('"')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function pipe(arr: string[] | undefined): string {
  return (arr ?? []).join("|");
}

function unpipe(s: string): string[] {
  return s ? s.split("|").map((x) => x.trim()).filter(Boolean) : [];
}

function safeJson(v: unknown): string {
  if (!v || (Array.isArray(v) && v.length === 0)) return "";
  try { return JSON.stringify(v); } catch { return ""; }
}

function parseJson<T>(s: string, fallback: T): T {
  if (!s?.trim()) return fallback;
  try { return JSON.parse(s) as T; } catch { return fallback; }
}

// ── Export ────────────────────────────────────────────────────────────────────

export function productsToCsv(products: any[]): string {
  const header = CSV_COLUMNS.join(",");
  const rows = products.map((p) => {
    const pc: ProductContent = p.product_content ?? {};
    const so = pc.spec_overrides ?? {};
    const images = Array.isArray(p.images) ? p.images.filter(Boolean).join("|") : "";
    const catName = p.categories?.name ?? p.category_name ?? "";

    return CSV_COLUMNS.map((col) => {
      switch (col) {
        case "images":                      return esc(images);
        case "category_name":               return esc(catName);
        case "is_active":                   return esc(p.is_active ? "TRUE" : "FALSE");
        case "pc_spec_dimension_info":      return esc(so.dimension_info ?? "");
        case "pc_spec_quantities_info":     return esc(so.quantities_info ?? "");
        case "pc_spec_turnaround_label":    return esc(so.turnaround_label ?? "");
        case "pc_spec_rush_available":      return esc(so.rush_available ? "TRUE" : "FALSE");
        case "pc_spec_printing_options":    return esc(pipe(so.printing_options_list));
        case "pc_spec_finishing_options":   return esc(pipe(so.finishing_options_list));
        case "pc_spec_included_options":    return esc(pipe(so.included_options));
        case "pc_spec_additional_options":  return esc(pipe(so.additional_options));
        case "pc_feature_items":            return esc(safeJson(pc.feature_items));
        case "pc_content_blocks":           return esc(safeJson(pc.content_blocks));
        case "pc_article_sections":         return esc(safeJson(pc.article_sections));
        case "pc_material_items":           return esc(pipe(pc.material_items));
        case "pc_perk_items":               return esc(pipe(pc.perk_items));
        default:                            return esc(p[col] ?? "");
      }
    }).join(",");
  });
  return [header, ...rows].join("\n");
}

// ── Import ────────────────────────────────────────────────────────────────────

export function parseCsv(raw: string): Record<string, string>[] {
  const lines = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];
  const headers = splitCsvLine(lines[0]).map((h) => h.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const cells = splitCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = (cells[i] ?? "").trim(); });
    return row;
  });
}

function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQ) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') { inQ = false; }
      else { cur += ch; }
    } else {
      if (ch === '"') { inQ = true; }
      else if (ch === ",") { result.push(cur); cur = ""; }
      else { cur += ch; }
    }
  }
  result.push(cur);
  return result;
}

export function validateRow(row: Record<string, string>, idx: number): string[] {
  const errors: string[] = [];
  const label = `Row ${idx + 2}`;
  if (!row.name?.trim()) errors.push(`${label}: "name" is required`);
  if (!row.slug?.trim()) errors.push(`${label}: "slug" is required`);
  if (row.slug && !/^[a-z0-9-]+$/.test(row.slug.trim()))
    errors.push(`${label}: slug "${row.slug}" must be lowercase letters, numbers and hyphens only`);
  return errors;
}

export function rowToProduct(row: Record<string, string>, categoryMap: Record<string, string>): any {
  const images = unpipe(row.images);
  const categoryId = row.category_name ? (categoryMap[row.category_name.toLowerCase()] ?? null) : null;

  // Build product_content from pc_* columns
  const specOverrides: Record<string, any> = {};
  if (row.pc_spec_dimension_info)     specOverrides.dimension_info = row.pc_spec_dimension_info;
  if (row.pc_spec_quantities_info)    specOverrides.quantities_info = row.pc_spec_quantities_info;
  if (row.pc_spec_turnaround_label)   specOverrides.turnaround_label = row.pc_spec_turnaround_label;
  if (row.pc_spec_rush_available)     specOverrides.rush_available = row.pc_spec_rush_available.toUpperCase() === "TRUE";
  if (row.pc_spec_printing_options)   specOverrides.printing_options_list = unpipe(row.pc_spec_printing_options);
  if (row.pc_spec_finishing_options)  specOverrides.finishing_options_list = unpipe(row.pc_spec_finishing_options);
  if (row.pc_spec_included_options)   specOverrides.included_options = unpipe(row.pc_spec_included_options);
  if (row.pc_spec_additional_options) specOverrides.additional_options = unpipe(row.pc_spec_additional_options);

  const productContent: ProductContent = {};
  if (Object.keys(specOverrides).length > 0) productContent.spec_overrides = specOverrides;
  const featureItems = parseJson(row.pc_feature_items, null);
  if (featureItems) productContent.feature_items = featureItems;
  const contentBlocks = parseJson(row.pc_content_blocks, null);
  if (contentBlocks) productContent.content_blocks = contentBlocks;
  const articleSections = parseJson(row.pc_article_sections, null);
  if (articleSections) productContent.article_sections = articleSections;
  const materialItems = unpipe(row.pc_material_items);
  if (materialItems.length) productContent.material_items = materialItems;
  const perkItems = unpipe(row.pc_perk_items);
  if (perkItems.length) productContent.perk_items = perkItems;

  return {
    name:               row.name?.trim() || "",
    slug:               row.slug?.trim() || "",
    category_id:        categoryId,
    section:            row.section?.trim() || "style",
    box_style:          row.box_style?.trim() || "",
    description:        row.description?.trim() || "",
    min_quantity:       row.min_quantity?.trim() || "Starting from 100 Units",
    stock_info:         row.stock_info?.trim() || "",
    size_info:          row.size_info?.trim() || "",
    printing_options:   row.printing_options?.trim() || "",
    finishing_options:  row.finishing_options?.trim() || "",
    proof_info:         row.proof_info?.trim() || "",
    turnaround_time:    row.turnaround_time?.trim() || "",
    shipping_info:      row.shipping_info?.trim() || "",
    price:              row.price?.trim() || null,
    sku:                row.sku?.trim() || "",
    is_active:          row.is_active?.trim().toUpperCase() !== "FALSE",
    meta_title:         row.meta_title?.trim() || "",
    meta_description:   row.meta_description?.trim() || "",
    meta_keywords:      row.meta_keywords?.trim() || "",
    images,
    product_content:    Object.keys(productContent).length > 0 ? productContent : {},
  };
}

// ── Template ──────────────────────────────────────────────────────────────────

export function buildTemplateCsv(): string {
  const header = CSV_COLUMNS.join(",");

  // Example feature_items JSON (compact, Excel-safe when quoted)
  const exampleFeatures = safeJson([
    { icon: "Palette", title: "Vivid Print Quality", description: "CMYK offset for sharp, accurate colours" },
    { icon: "Leaf",    title: "Eco-Friendly",         description: "FSC-certified kraft and recycled options" },
    { icon: "Truck",   title: "Fast Turnaround",      description: "8–12 business days, rush available" },
  ]);

  const exampleArticle = safeJson([
    { level: "h2", text: "Why Choose Custom Rigid Boxes?" },
    { level: "p",  text: "Rigid boxes offer unmatched structural strength and a premium unboxing experience." },
    { level: "divider", text: "" },
    { level: "h3", text: "Perfect for Luxury Retail" },
    { level: "p",  text: "From cosmetics to electronics, rigid boxes elevate your brand presentation." },
  ]);

  const row = [
    "Custom Rigid Box",                                   // name
    "custom-rigid-box",                                   // slug
    "Rigid Boxes",                                        // category_name
    "style",                                              // section
    "Two Piece",                                          // box_style
    "Premium rigid box for luxury products",              // description
    "Starting from 100 Units",                            // min_quantity
    "10pt to 28pt Rigid Board",                           // stock_info
    "Fully Customizable",                                 // size_info
    "CMYK, PMS, Offset",                                  // printing_options
    "Gloss, Matte, Foil Stamping",                        // finishing_options
    "2D Flat View, 3D Digital Mockup",                    // proof_info
    "8 to 12 Business Days",                              // turnaround_time
    "FREE Shipping Worldwide",                            // shipping_info
    "",                                                   // price
    "RB-001",                                             // sku
    "TRUE",                                               // is_active
    "",                                                   // meta_title
    "",                                                   // meta_description
    "",                                                   // meta_keywords
    "",                                                   // images
    "All Custom Sizes & Shapes",                          // pc_spec_dimension_info
    "No Minimum MOQ Required",                            // pc_spec_quantities_info
    "8–12 Business Days",                                 // pc_spec_turnaround_label
    "TRUE",                                               // pc_spec_rush_available
    "No Printing|CMYK|CMYK + 1 PMS color",               // pc_spec_printing_options
    "Gloss Lamination|Matte Lamination|Spot UV|Embossing",// pc_spec_finishing_options
    "Die Cutting|Gluing|Scored",                          // pc_spec_included_options
    "Eco-Friendly|Recycled Boxes",                        // pc_spec_additional_options
    exampleFeatures,                                      // pc_feature_items
    "",                                                   // pc_content_blocks
    exampleArticle,                                       // pc_article_sections
    "Natural Kraft Pulp|Recycled Fibres|PLA Bioplastics", // pc_material_items
    "Wholesale Pricing|Fast turnaround|Free design consultation|No Delays", // pc_perk_items
  ].map(esc).join(",");

  return [header, row].join("\n");
}

// ── Download ──────────────────────────────────────────────────────────────────

export function downloadCsv(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
