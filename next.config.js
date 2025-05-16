/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removing swcMinify as it's flagged as unrecognized
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ];
  },
  // Fixes Replit compatibility issues
  webpack: (config, { isServer, dev }) => {
    // Fix server-side rendering issues
    if (isServer) {
      config.externals = [...config.externals, 'bufferutil', 'utf-8-validate'];
    }
    
    return config;
  },
}

module.exports = nextConfig