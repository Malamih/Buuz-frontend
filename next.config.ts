import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
      },
    ],
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.jsx",
        },
      },
    },
  },
  eslint: {
    ignoreDuringBuilds: true, // This will skip ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true, // This will skip TypeScript errors during builds
  },
};

export default nextConfig;
