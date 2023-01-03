// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["randomuser.me", "picsum.photos"],
  },
  experimental: { images: { layoutRaw: true } },
};

module.exports = nextConfig;
