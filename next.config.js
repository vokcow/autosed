/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: Remove 'output: export' for Vercel deployment
  // Vercel handles Next.js deployments natively without static export
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

