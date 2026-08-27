import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import { Pool } from "pg";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
};

function formatAltText(filename: string, folder: string): string {
  const nameWithoutExt = path.parse(filename).name;
  const cleaned = nameWithoutExt
    .replace(/[-_]+/g, " ")
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, "")
    .trim();

  if (!cleaned) {
    return `HOF Pack ${folder.charAt(0).toUpperCase() + folder.slice(1)} Image`;
  }

  return (
    cleaned
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ") + " Packaging"
  );
}

interface ImageFileInfo {
  folder: string;
  filename: string;
  url: string;
  fullPath: string;
  filesize: number;
  mimeType: string;
}

function getAllImages(baseDir: string): ImageFileInfo[] {
  const images: ImageFileInfo[] = [];
  const folders = fs.readdirSync(baseDir);

  for (const folder of folders) {
    const folderPath = path.join(baseDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!MIME_TYPES[ext]) continue;

      const fullPath = path.join(folderPath, file);
      const stat = fs.statSync(fullPath);

      images.push({
        folder,
        filename: file,
        url: `/images/${folder}/${file}`,
        fullPath,
        filesize: stat.size,
        mimeType: MIME_TYPES[ext] || "image/jpeg",
      });
    }
  }

  return images;
}

export async function syncAllMedia() {
  console.log("🚀 Starting Full Media Catalog Sync into PostgreSQL / Payload CMS Database...\n");

  const dbUri = process.env.DATABASE_URI || "postgresql://postgres:postgres@localhost:5432/hofpack";
  const pool = new Pool({
    connectionString: dbUri,
    ssl: { rejectUnauthorized: false },
    max: 2,
  });

  const baseImagesDir = path.resolve(process.cwd(), "public/images");
  if (!fs.existsSync(baseImagesDir)) {
    console.error(`❌ Directory not found: ${baseImagesDir}`);
    process.exit(1);
  }

  const allImages = getAllImages(baseImagesDir);
  console.log(`📁 Found ${allImages.length} local images in public/images/ across ${new Set(allImages.map((i) => i.folder)).size} folders.\n`);

  // Ensure folder column exists in media table
  try {
    await pool.query(`
      ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "folder" varchar DEFAULT 'general';
    `);
  } catch (err: any) {
    console.log("ℹ️ Note on table check:", err.message);
  }

  // Fetch existing filenames in media table
  console.log("🔍 Querying existing media records in database...");
  const existingRes = await pool.query(`SELECT id, filename, url FROM "media"`);
  const existingFilenames = new Set(existingRes.rows.map((r: any) => r.filename));
  const existingUrls = new Set(existingRes.rows.map((r: any) => r.url));
  console.log(`✓ Currently ${existingRes.rows.length} media records exist in database.\n`);

  let insertedCount = 0;
  let skippedCount = 0;

  console.log("💾 Inserting missing media records into database...");
  for (const img of allImages) {
    if (existingFilenames.has(img.filename) || existingUrls.has(img.url)) {
      skippedCount++;
      continue;
    }

    const alt = formatAltText(img.filename, img.folder);
    const now = new Date().toISOString();

    try {
      await pool.query(
        `INSERT INTO "media" (alt, folder, filename, mime_type, filesize, url, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [alt, img.folder, img.filename, img.mimeType, img.filesize, img.url, now, now]
      );
      insertedCount++;
      existingFilenames.add(img.filename);
      existingUrls.add(img.url);
    } catch (err: any) {
      console.warn(`  ⚠️ Failed to insert ${img.filename}: ${err.message}`);
    }

    if ((insertedCount + skippedCount) % 300 === 0) {
      console.log(`  ⏳ Processed ${insertedCount + skippedCount} / ${allImages.length} images...`);
    }
  }

  const finalRes = await pool.query(`SELECT count(*) FROM "media"`);
  const totalInDb = finalRes.rows[0].count;

  console.log("\n══════════════════════════════════════════════");
  console.log("🎉 MEDIA CATALOG SYNC COMPLETED SUCCESSFULLY!");
  console.log(`✨ Total Local Files Scanned: ${allImages.length}`);
  console.log(`➕ Newly Cataloged in DB:     ${insertedCount}`);
  console.log(`⏭️ Already in DB:              ${skippedCount}`);
  console.log(`📊 Total Media in Payload DB:  ${totalInDb}`);
  console.log("══════════════════════════════════════════════\n");

  await pool.end();
  process.exit(0);
}

syncAllMedia().catch((err) => {
  console.error("❌ Fatal error during media sync:", err);
  process.exit(1);
});
