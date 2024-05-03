/** @type {import('next').NextConfig} */
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig = {
  reactStrictMode: true,
  ...bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  }),
  webpack: (config, { isServer }) => {
    config.optimization.splitChunks = false; //
    return config;
  },
};
export default nextConfig;
