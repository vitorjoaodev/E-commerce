/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'placehold.co'],
  },
  // Configuração otimizada para deploy na Vercel
  swcMinify: true,
};

module.exports = nextConfig;