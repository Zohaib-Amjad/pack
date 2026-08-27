import type { CollectionConfig } from "payload";

export const FAQs: CollectionConfig = {
  slug: "faqs",
  admin: {
    useAsTitle: "question",
    group: "Content",
    defaultColumns: ["question", "section", "categoryRef", "category", "order"],
  },
  fields: [
    {
      name: "question",
      type: "text",
      required: true,
    },
    {
      name: "answer",
      type: "textarea",
      required: true,
    },
    {
      name: "section",
      type: "select",
      defaultValue: "general",
      options: [
        { label: "Homepage FAQ", value: "homepage" },
        { label: "Category FAQ", value: "category" },
        { label: "Artwork & Guidelines", value: "artwork" },
        { label: "General Site FAQ", value: "general" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "categoryRef",
      type: "relationship",
      relationTo: "categories",
      admin: {
        position: "sidebar",
        condition: (data) => data?.section === "category",
      },
    },
    {
      name: "category",
      type: "select",
      defaultValue: "general",
      options: [
        { label: "General", value: "general" },
        { label: "Ordering & Pricing", value: "ordering" },
        { label: "Design & Proofs", value: "design" },
        { label: "Shipping & Delivery", value: "shipping" },
        { label: "Materials & Sustainability", value: "materials" },
      ],
    },
    {
      name: "is_published",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
