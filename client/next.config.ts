import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: [
    "http://192.168.1.10:3000", // whichever device is connecting
    "http://localhost:3000",
  ],
  images: {
    // Enable dynamic image optimization in production to compress and format assets.
    unoptimized: false,
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.builder.io',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.usercontent.google.com",
      },
      {
        protocol: "https",
        hostname: "www.instagram.com",
      },
    ],
  },
};

export default nextConfig;
