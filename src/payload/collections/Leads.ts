import type { CollectionConfig } from "payload";

export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "name",
    group: "Leads & CRM",
    defaultColumns: ["name", "email", "phone", "source", "status", "createdAt"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
      index: true,
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "message",
      type: "textarea",
    },
    {
      name: "source",
      type: "text",
      defaultValue: "website-contact",
      index: true,
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New Lead", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Qualified", value: "qualified" },
        { label: "Synced to CRM", value: "synced" },
        { label: "Archived", value: "archived" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};
