import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Head>
        <title>Piloto Inteligente | Moda de Aviação</title>
        <meta name="description" content="Piloto Inteligente - Roupas e acessórios inspirados na aviação para entusiastas e viajantes globais." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full p-4 border-b border-primary/20">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-primary text-2xl font-bold">Piloto Inteligente</h1>
          <nav className="hidden md:flex space-x-6">
            <Link href="/categoria/aviador" className="text-white hover:text-primary transition-colors">
              Aviador
            </Link>
            <Link href="/categoria/aviadora" className="text-white hover:text-primary transition-colors">
              Aviadora
            </Link>
            <Link href="/categoria/acessorios" className="text-white hover:text-primary transition-colors">
              Acessórios
            </Link>
            <Link href="/blog" className="text-white hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/nossa-historia" className="text-white hover:text-primary transition-colors">
              Nossa História
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <section className="py-16 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">Aventuras nos Céus</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Roupas e acessórios inspirados na aviação para entusiastas e aventureiros globais. 
            Criada por Carlos Drummond, um piloto apaixonado.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="btn-primary">Comprar Novidades</button>
            <button className="btn-secondary">Mais Vendidos</button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div className="bg-background-secondary p-6 rounded-lg hover-scale">
            <h3 className="text-2xl font-bold text-primary mb-3">Coleção Aviador</h3>
            <p className="text-white/70 mb-4">Jaquetas, camisas e acessórios inspirados no estilo clássico dos pilotos.</p>
            <Link href="/categoria/aviador" className="text-primary hover:underline">
              Ver Coleção →
            </Link>
          </div>
          
          <div className="bg-background-secondary p-6 rounded-lg hover-scale">
            <h3 className="text-2xl font-bold text-primary mb-3">Coleção Aviadora</h3>
            <p className="text-white/70 mb-4">Peças femininas que combinam estilo e funcionalidade para aventureiras.</p>
            <Link href="/categoria/aviadora" className="text-primary hover:underline">
              Ver Coleção →
            </Link>
          </div>
          
          <div className="bg-background-secondary p-6 rounded-lg hover-scale">
            <h3 className="text-2xl font-bold text-primary mb-3">Acessórios</h3>
            <p className="text-white/70 mb-4">Relógios, óculos e outros acessórios inspirados no mundo da aviação.</p>
            <Link href="/categoria/acessorios" className="text-primary hover:underline">
              Ver Coleção →
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-background-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold text-primary mb-4">Piloto Inteligente</h2>
              <p className="text-white/60 max-w-md">
                Criada por Carlos Drummond, um piloto apaixonado por viagens e aventuras ao redor do mundo.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Comprar</h3>
                <ul className="space-y-2">
                  <li><Link href="/categoria/aviador" className="text-white/60 hover:text-primary">Aviador</Link></li>
                  <li><Link href="/categoria/aviadora" className="text-white/60 hover:text-primary">Aviadora</Link></li>
                  <li><Link href="/categoria/acessorios" className="text-white/60 hover:text-primary">Acessórios</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Informações</h3>
                <ul className="space-y-2">
                  <li><Link href="/nossa-historia" className="text-white/60 hover:text-primary">Nossa História</Link></li>
                  <li><Link href="/blog" className="text-white/60 hover:text-primary">Blog</Link></li>
                  <li><Link href="/faq" className="text-white/60 hover:text-primary">FAQ</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/40">
            <p>© {new Date().getFullYear()} Piloto Inteligente. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}