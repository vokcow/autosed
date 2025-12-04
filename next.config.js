/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: Remove 'output: export' for Vercel deployment
  // Vercel handles Next.js deployments natively without static export
  images: {
    unoptimized: true,
  },
  // Explicitly set distDir to default .next (not 'out')
  distDir: '.next',
}

module.exports = nextConfig

