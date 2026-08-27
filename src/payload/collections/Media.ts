import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "alt",
    group: "Content",
    defaultColumns: ["alt", "filename", "folder", "filesize", "createdAt"],
  },
  upload: {
    staticDir: "public/images",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 512,
        position: "centre",
      },
      {
        name: "hero",
        width: 1920,
        height: 1080,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*", "application/pdf"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "folder",
      type: "select",
      defaultValue: "general",
      options: [
        { label: "Products", value: "products" },
        { label: "Categories", value: "categories" },
        { label: "Blog", value: "blog" },
        { label: "Brand & Badges", value: "brand" },
        { label: "UI & Icons", value: "ui" },
        { label: "Hero Banners", value: "hero" },
        { label: "Case Studies", value: "case-studies" },
        { label: "Logistics", value: "logistics" },
        { label: "General", value: "general" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
