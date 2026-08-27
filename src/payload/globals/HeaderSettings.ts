import type { GlobalConfig } from "payload";

export const HeaderSettings: GlobalConfig = {
  slug: "header-settings",
  admin: {
    group: "Site Settings",
  },
  fields: [
    {
      name: "announcements",
      type: "array",
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
        },
        {
          name: "link",
          type: "text",
        },
      ],
    },
    {
      name: "phone",
      type: "text",
      defaultValue: "+1 (888) 429 4881",
    },
    {
      name: "email",
      type: "text",
      defaultValue: "info@hofpack.com",
    },
    {
      name: "ctaButtonText",
      type: "text",
      defaultValue: "Get a Quote",
    },
    {
      name: "navLinks",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        { name: "isMegaMenu", type: "checkbox", defaultValue: false },
      ],
    },
  ],
};
