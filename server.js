// Servidor proxy para Next.js no Replit
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Porta do Replit (onde o servidor estará disponível)
const PORT = process.env.PORT || 5000;

// Configuração do proxy para redirecionar para o servidor Next.js
const nextJsProxy = createProxyMiddleware({
  target: 'http://localhost:3000', 
  changeOrigin: true,
  ws: true, // Suporte a WebSockets
  pathRewrite: { '^/': '/' },
  logLevel: 'debug'
});

// Configurar o proxy para todas as rotas
app.use('/', nextJsProxy);

// Iniciar o servidor proxy
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor proxy rodando em http://0.0.0.0:${PORT}`);
  console.log(`Redirecionando para o servidor Next.js em http://localhost:3000`);
});