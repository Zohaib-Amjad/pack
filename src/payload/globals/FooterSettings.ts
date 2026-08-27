import type { GlobalConfig } from "payload";

export const FooterSettings: GlobalConfig = {
  slug: "footer-settings",
  admin: {
    group: "Site Settings",
  },
  fields: [
    {
      name: "companyDescription",
      type: "textarea",
      defaultValue: "Premium custom packaging for growing brands. Eco-friendly, cruelty-free, and crafted to make a lasting impression.",
    },
    {
      name: "address",
      type: "text",
      defaultValue: "3700 W Tybolt Dr, Tucson, AZ 85746, USA",
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
      name: "copyrightText",
      type: "text",
      defaultValue: "© 2026 HOF Pack. All Rights Reserved.",
    },
  ],
};
