/** @type {import('next').NextConfig} */

const repo = "ami-beauty";
const nextConfig = {
  output: "export",
    reactStrictMode: true,

  experimental: {
    turbo: false,
  },
  images: {
    unoptimized: true
  },
  basePath: `/${repo}`, // ⚠️ nombre del repo
  assetPrefix: `/${repo}`,
};

export default nextConfig;
