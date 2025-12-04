/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Vercel deployment: use default Next.js build (not static export)
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Explicitly set distDir to default .next (not 'out')
  distDir: '.next',
}

module.exports = nextConfig

