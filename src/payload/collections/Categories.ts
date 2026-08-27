import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    group: "Packaging",
  },
  fields: [
    {
      name: "name",
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
      name: "section",
      type: "select",
      options: [
        { label: "By Industry", value: "industry" },
        { label: "By Material", value: "material" },
        { label: "By Style", value: "style" },
      ],
      defaultValue: "style",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "tagline",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "badge",
      type: "text",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "imageUrl",
      type: "text",
      admin: {
        description: "Fallback external image URL if no media is uploaded",
      },
    },
    {
      name: "moq",
      type: "text",
      defaultValue: "100 Units",
    },
    {
      name: "turnaround",
      type: "text",
      defaultValue: "8-12 Days",
    },
    {
      name: "material",
      type: "text",
    },
    {
      name: "features",
      type: "array",
      fields: [
        {
          name: "feature",
          type: "text",
        },
      ],
    },
    {
      name: "specs",
      type: "group",
      fields: [
        {
          name: "dimensions",
          type: "text",
        },
        {
          name: "materials",
          type: "array",
          fields: [{ name: "item", type: "text" }],
        },
        {
          name: "thickness",
          type: "array",
          fields: [{ name: "item", type: "text" }],
        },
        {
          name: "printing",
          type: "array",
          fields: [{ name: "item", type: "text" }],
        },
        {
          name: "finishes",
          type: "array",
          fields: [{ name: "item", type: "text" }],
        },
      ],
    },
    {
      name: "faqs",
      type: "array",
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
      ],
    },
  ],
};
