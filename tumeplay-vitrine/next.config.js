/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "backend-tumeplay.fabrique.social.",
      "backend-tumeplay-preprod.dev.fabrique.social.",
    ],
  },
};

module.exports = nextConfig;
