// Servidor para compatibilidade com Replit
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 5000;
const target = 'http://localhost:3000';

// Configura um middleware de proxy para redirecionar o tráfego para o Next.js
app.use('/', createProxyMiddleware({
  target,
  changeOrigin: true,
  ws: true, // suporte a WebSockets
  pathRewrite: {
    '^/': '/'
  }
}));

app.listen(port, '0.0.0.0', () => {
  console.log(`Proxy server running at http://0.0.0.0:${port}, redirecting to ${target}`);
});