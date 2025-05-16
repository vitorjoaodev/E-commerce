/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PORT: process.env.PORT || '5000'
  },
  experimental: {
    optimizeServerReact: true,
  },
  // Configuração para o Replit
  serverRuntimeConfig: {
    port: process.env.PORT || 5000,
    hostname: '0.0.0.0',
  },
  poweredByHeader: false,
};

module.exports = nextConfig;