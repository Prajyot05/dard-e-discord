import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Wildcard to allow all domains
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;