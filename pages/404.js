import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Head>
        <title>Página Não Encontrada | Piloto Inteligente</title>
        <meta name="description" content="A página que você está procurando não foi encontrada." />
      </Head>

      <div className="text-center max-w-lg">
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Desvio de Rota</h2>
        <p className="text-white/70 mb-8">
          Parece que você entrou em uma zona de turbulência! Esta página não foi encontrada no mapa de rotas.
        </p>
        
        <div className="bg-background-secondary p-6 rounded-lg mb-8">
          <p className="text-white/70 italic mb-4">
            "Até mesmo os melhores pilotos desviam da rota ocasionalmente."
            <br />- Carlos Drummond, Fundador
          </p>
        </div>
        
        <Link href="/" className="btn-primary inline-block">
          Retornar ao Hangar Principal
        </Link>
      </div>
    </div>
  );
}