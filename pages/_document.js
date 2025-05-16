import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* Movendo a meta tag viewport para _app.js conforme recomendação do Next.js */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}