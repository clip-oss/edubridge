import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore ESLint during builds
  // @ts-expect-error - eslint config exists at runtime
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
