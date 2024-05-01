/** @type {import('next').NextConfig} */
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    modern: true, // Enable modern mode for differential serving
  },
  ...bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  }),
};
export default nextConfig;
