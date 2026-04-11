import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: [
    "http://192.168.1.10:3000", // whichever device is connecting
    "http://localhost:3000",
  ],
  images: {
   
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
    ],
    
  },
};

export default nextConfig;
