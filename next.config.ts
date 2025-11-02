import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    appDir: true,
  } as any, // cast to any to suppress type error,
};

export default nextConfig;
