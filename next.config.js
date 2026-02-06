/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "spoiled-stone.pockethost.io",
      },
    ],
    qualities: [75, 100],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
