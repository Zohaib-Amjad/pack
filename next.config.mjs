import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "hofpack.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/custom-bakery-boxes",
        destination: "/bakery-boxes",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/artwork-guidelines",
        permanent: true,
      },
      {
        source: "/custom-packing",
        destination: "/custompackaging",
        permanent: true,
      },
    ];
  },
  reactCompiler: false,
};

export default withPayload(nextConfig);
