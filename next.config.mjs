/** @type {import('next').NextConfig} */
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    if (config.optimization.splitChunks) {
      // Set the minSize property for splitChunks
      config.optimization.splitChunks.cacheGroups.commons = {
        test: /[\\/]node_modules[\\/]/,
        chunks: "all",
      }; // size in bytes
    }
    return config;
  },
  ...bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  }),
};
export default nextConfig;
