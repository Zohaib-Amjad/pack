import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
    qualities: [65, 70, 75, 80, 85, 90],
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
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
  async headers() {
    return [
      {
        source: "/email-preview",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
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
