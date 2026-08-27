import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "title",
    group: "Packaging",
  },
  access: {
    read: () => true,
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
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
    },
    {
      name: "shortDescription",
      type: "textarea",
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "startingPrice",
      type: "text",
    },
    {
      name: "moq",
      type: "text",
      defaultValue: "100",
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "specifications",
      type: "group",
      label: "Packaging Specifications",
      fields: [
        {
          name: "boxStyle",
          type: "text",
          label: "Box Style",
        },
        {
          name: "sizeInfo",
          type: "text",
          label: "Dimension (L + W + H)",
          defaultValue: "Fully Customizable (All dimensions available)",
        },
        {
          name: "minQuantity",
          type: "text",
          label: "Quantities / MOQ",
          defaultValue: "Starting from 100 Units",
        },
        {
          name: "stockInfo",
          type: "text",
          label: "Stock Options",
          defaultValue: "10pt to 28pt Kraft, Corrugated, Rigid, Cardstock",
        },
        {
          name: "printingOptions",
          type: "text",
          label: "Printing Options (comma-separated)",
          defaultValue: "CMYK, PMS, No Printing, Offset High Fidelity",
        },
        {
          name: "finishingOptions",
          type: "text",
          label: "Finishing Options (comma-separated)",
          defaultValue: "Gloss, Matte, Aqua Coating, Foil Stamping, Spot UV",
        },
        {
          name: "includedOptions",
          type: "text",
          label: "Included Options (comma-separated)",
          defaultValue: "Die Cutting, Gluing, Scored, Perforation",
        },
        {
          name: "additionalOptions",
          type: "text",
          label: "Additional Options (comma-separated)",
          defaultValue: "Eco-Friendly, Recycled Boxes, Biodegradable",
        },
        {
          name: "proofInfo",
          type: "text",
          label: "Proof Info",
          defaultValue: "2D Flat View, 3D Digital Mockup",
        },
        {
          name: "turnaroundTime",
          type: "text",
          label: "Turnaround Time",
          defaultValue: "8 to 12 Business Days",
        },
        {
          name: "rushAvailable",
          type: "checkbox",
          label: "Rush Available Badge",
          defaultValue: true,
        },
        {
          name: "showShippingPolicy",
          type: "checkbox",
          label: "Show Shipping Policy in Specifications Table",
          defaultValue: false,
          admin: {
            description: "Check this box to display the Shipping Policy row in the packaging specifications table.",
          },
        },
        {
          name: "shippingInfo",
          type: "text",
          label: "Shipping Policy Text",
          defaultValue: "FREE Shipping Worldwide",
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.showShippingPolicy),
          },
        },
      ],
    },
  ],
};
