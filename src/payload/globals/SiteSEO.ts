import type { GlobalConfig } from "payload";

export const SiteSEO: GlobalConfig = {
  slug: "site-seo",
  admin: {
    group: "Site Settings",
  },
  fields: [
    {
      name: "defaultTitle",
      type: "text",
      defaultValue: "HOF Pack | Custom Packaging Boxes & Mylar Bags | Low MOQ, Free Mockup",
    },
    {
      name: "defaultDescription",
      type: "textarea",
      defaultValue: "Get premium custom packaging boxes and mylar bags from HOF Pack. Enjoy low MOQs, free design support, free mockups, fast turnaround, competitive pricing, and nationwide shipping.",
    },
    {
      name: "ogImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "googleVerification",
      type: "text",
    },
  ],
};
