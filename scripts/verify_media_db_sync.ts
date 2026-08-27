import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";
import fs from "fs";
import path from "path";

const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
  ssl: { rejectUnauthorized: false },
});

async function run() {
  const mediaCount = await pool.query("SELECT count(*) FROM media");
  console.log("Total media records in PostgreSQL DB:", mediaCount.rows[0].count);

  const filenames = [
    "logo-green-orange.png",
    "hero-packaging.png",
    "cat-rigid.png",
    "cat-mailer.png",
    "cat-mylar.png",
    "cat-tuck.png",
    "cat-bakery.png",
    "cat-candle.png",
    "cat-soap.png",
    "rigid-unboxing-experience.jpg",
    "cat-mailer-boxes.jpg",
    "cat-mylar-bags.jpg",
    "cat-tuck-boxes.jpg",
    "cat-bakery-boxes.jpg",
    "cat-candle-boxes.jpg",
    "cat-soap-boxes.jpg",
  ];

  console.log("\n--- Custom Pages Image Audit (Local Storage & DB) ---");
  for (const fn of filenames) {
    const res = await pool.query(
      "SELECT id, filename, folder, mime_type, width, height FROM media WHERE filename = $1",
      [fn]
    );
    const inDb = res.rows.length > 0;

    let localPath = "";
    const possibleDirs = [
      "public/images/brand",
      "public/images/hero",
      "public/images/categories",
      "public/images/ui",
      "public/images/products",
    ];
    for (const d of possibleDirs) {
      const full = path.join(process.cwd(), d, fn);
      if (fs.existsSync(full)) {
        localPath = full;
        break;
      }
    }
    const onDisk = !!localPath;

    console.log(
      `[${inDb ? "✓ DB" : "✗ NO DB"}] [${onDisk ? "✓ DISK" : "✗ NO DISK"}] ${fn} -> Folder: ${
        res.rows[0]?.folder || "N/A"
      }`
    );
  }

  await pool.end();
}

run();
