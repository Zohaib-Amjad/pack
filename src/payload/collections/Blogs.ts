import type { CollectionConfig } from "payload";

export const Blogs: CollectionConfig = {
  slug: "blogs",
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
      name: "excerpt",
      type: "textarea",
      required: true,
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "imageUrl",
      type: "text",
      admin: {
        description: "Fallback image URL",
      },
    },
    {
      name: "author",
      type: "text",
      defaultValue: "HOF Pack Editorial Team",
    },
    {
      name: "publishedDate",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
        },
      },
    },
    {
      name: "readTime",
      type: "text",
      defaultValue: "5 min read",
    },
    {
      name: "category",
      type: "text",
      defaultValue: "Packaging Guide",
    },
    {
      name: "content",
      type: "textarea",
      required: true,
    },
  ],
};
