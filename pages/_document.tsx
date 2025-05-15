import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Piloto Inteligente - Roupas e acessórios inspirados na era de ouro da aviação" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pilotointeligente.com.br/" />
        <meta property="og:title" content="Piloto Inteligente | Moda Inspirada na Aviação" />
        <meta property="og:description" content="Descubra nossa coleção exclusiva de roupas e acessórios inspirados na era de ouro da aviação" />
        <meta property="og:image" content="https://pilotointeligente.com.br/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pilotointeligente.com.br/" />
        <meta property="twitter:title" content="Piloto Inteligente | Moda Inspirada na Aviação" />
        <meta property="twitter:description" content="Descubra nossa coleção exclusiva de roupas e acessórios inspirados na era de ouro da aviação" />
        <meta property="twitter:image" content="https://pilotointeligente.com.br/og-image.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}