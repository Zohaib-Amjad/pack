import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Categories } from "./payload/collections/Categories";
import { Products } from "./payload/collections/Products";
import { Blogs } from "./payload/collections/Blogs";
import { Testimonials } from "./payload/collections/Testimonials";
import { FAQs } from "./payload/collections/FAQs";
import { QuoteRequests } from "./payload/collections/QuoteRequests";
import { ContactSubmissions } from "./payload/collections/ContactSubmissions";
import { Leads } from "./payload/collections/Leads";
import { Pages } from "./payload/collections/Pages";

import { HeaderSettings } from "./payload/globals/HeaderSettings";
import { FooterSettings } from "./payload/globals/FooterSettings";
import { SiteSEO } from "./payload/globals/SiteSEO";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const dbUri =
  process.env.DATABASE_URI ||
  "postgresql://postgres:postgres@localhost:5432/hofpack";

const needsSsl =
  dbUri.includes("supabase.co") ||
  dbUri.includes("pooler.supabase.com") ||
  dbUri.includes("neon.tech") ||
  dbUri.includes("sslmode=require");

export default buildConfig({
  sharp,
  routes: {
    admin: "/payload-admin",
  },
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "- HOF Pack CMS",
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    Products,
    Blogs,
    Testimonials,
    FAQs,
    QuoteRequests,
    ContactSubmissions,
    Leads,
    Pages,
  ],
  globals: [HeaderSettings, FooterSettings, SiteSEO],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "hofpack-super-secret-key-32-chars-long",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: dbUri,
      ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    },
  }),
});
