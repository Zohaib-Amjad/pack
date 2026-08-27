import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "name",
    group: "Marketing",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "company",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
    },
    {
      name: "rating",
      type: "number",
      defaultValue: 5,
      min: 1,
      max: 5,
    },
    {
      name: "highlight",
      type: "text",
    },
    {
      name: "content",
      type: "textarea",
      required: true,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
