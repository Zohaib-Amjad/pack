import type { CollectionConfig } from "payload";

export const QuoteRequests: CollectionConfig = {
  slug: "quote-requests",
  admin: {
    useAsTitle: "email",
    group: "Leads & Forms",
    defaultColumns: ["fullName", "email", "phone", "boxStyle", "quantity", "createdAt", "status"],
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "company",
      type: "text",
    },
    {
      name: "boxStyle",
      type: "text",
      required: true,
    },
    {
      name: "dimensions",
      type: "group",
      fields: [
        { name: "length", type: "text" },
        { name: "width", type: "text" },
        { name: "depth", type: "text" },
        { name: "unit", type: "select", defaultValue: "inches", options: ["inches", "cm", "mm"] },
      ],
    },
    {
      name: "quantity",
      type: "text",
      required: true,
    },
    {
      name: "material",
      type: "text",
    },
    {
      name: "printing",
      type: "text",
    },
    {
      name: "additionalNotes",
      type: "textarea",
    },
    {
      name: "artworkFile",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New Lead", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Quote Sent", value: "quoted" },
        { label: "In Production", value: "in-production" },
        { label: "Completed", value: "completed" },
        { label: "Closed / Lost", value: "closed" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};
