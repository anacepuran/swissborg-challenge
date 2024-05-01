/** @type {import('next').NextConfig} */
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig = {
  reactStrictMode: true,
  ...bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  }),
};
export default nextConfig;
