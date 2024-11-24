import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Разрешает все домены
      },
    ],
  },
};

export default nextConfig;
