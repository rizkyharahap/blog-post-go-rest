const bundleAnalyzer = require("@next/bundle-analyzer");

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ["page.tsx"],
};

module.exports = withBundleAnalyzer(nextConfig);
