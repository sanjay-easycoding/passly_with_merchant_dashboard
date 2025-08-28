import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Don’t run ESLint checks during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Don’t block builds on type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
