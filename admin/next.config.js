// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "randomuser.me",
      "picsum.photos",
      "cloudflare-ipfs.com",
      "api.unsplash.com",
      "pexels.com",
    ],
  },
  experimental: {
    appDir: true,
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
