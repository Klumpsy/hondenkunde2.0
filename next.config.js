/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["127.0.0.1", "spoiled-stone.pockethost.io"],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig;

