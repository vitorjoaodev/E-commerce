// Servidor para Replit - integração simples com Next.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Configuração básica
const app = express();
const PORT = process.env.PORT || 5000;

// Configuração de proxy
const proxy = createProxyMiddleware({
  target: 'http://127.0.0.1:3000',
  changeOrigin: true,
  ws: true,
  logLevel: 'debug'
});

// Usar o proxy para todas as requisições
app.use('/', proxy);

// Iniciar o proxy primeiro
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor proxy rodando em http://0.0.0.0:${PORT}`);
  console.log('Redirecionando para Next.js em http://127.0.0.1:3000');
  
  // Depois iniciar o Next.js
  const { spawn } = require('child_process');
  const nextjs = spawn('npx', ['next', 'dev'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: 3000
    }
  });
  
  // Tratamento de erros e encerramento
  nextjs.on('error', (error) => {
    console.error(`Erro ao iniciar Next.js: ${error}`);
    server.close();
    process.exit(1);
  });
  
  nextjs.on('close', (code) => {
    console.log(`Next.js encerrado com código ${code}`);
    server.close();
    process.exit(code || 0);
  });
  
  // Tratamento de encerramento do processo principal
  process.on('SIGINT', () => {
    console.log('Encerrando processos...');
    nextjs.kill();
    server.close();
    process.exit(0);
  });
});