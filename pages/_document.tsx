import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Loja online de roupas e acessórios com estética de aviação vintage. Produtos exclusivos para aviadores e aviadoras." />
        <meta property="og:title" content="Piloto Inteligente - Loja Online de Acessórios de Aviação Vintage" />
        <meta property="og:description" content="Descubra nossa coleção exclusiva de roupas e acessórios inspirados na era de ouro da aviação" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pilotointeligente.com.br" />
        <meta property="og:image" content="/og-image.jpg" />
      </Head>
      <body className="bg-dark-gray">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}