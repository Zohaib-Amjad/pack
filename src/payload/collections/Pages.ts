import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    group: "Content",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "badge", type: "text", defaultValue: "PREMIUM CUSTOM PACKAGING" },
        { name: "heading", type: "text", defaultValue: "Custom Packaging That Defines Your Brand!" },
        { name: "subheading", type: "textarea", defaultValue: "Flat 20% Off on Your First Order + Free Shipping. Fastest turnaround time. Ready at your door in 8 to 12 days." },
        { name: "primaryCtaText", type: "text", defaultValue: "Get Your FREE Quote" },
        { name: "primaryCtaLink", type: "text", defaultValue: "#quote" },
        { name: "secondaryCtaText", type: "text", defaultValue: "View All Products" },
        { name: "secondaryCtaLink", type: "text", defaultValue: "/catalog" },
      ],
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "metaTitle", type: "text" },
        { name: "metaDescription", type: "textarea" },
      ],
    },
  ],
};
