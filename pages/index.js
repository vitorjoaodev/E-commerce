import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <header className="sticky top-0 z-30 bg-[#0a0a0c] py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-[#D6BD94] font-bold text-xl">Piloto Inteligente</a>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/categoria/aviador" className="text-white hover:text-[#D6BD94] transition-colors">Aviador</a>
              <a href="/categoria/aviadora" className="text-white hover:text-[#D6BD94] transition-colors">Aviadora</a>
              <a href="/categoria/acessorios" className="text-white hover:text-[#D6BD94] transition-colors">Acessórios</a>
              <a href="/blog" className="text-white hover:text-[#D6BD94] transition-colors">Blog</a>
              <a href="/nossa-historia" className="text-white hover:text-[#D6BD94] transition-colors">Nossa História</a>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <div className="relative bg-[#0a0a0c]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/95 to-[#0a0a0c]/80 z-10"></div>
          <div 
            className="h-[80vh] bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1474&auto=format&fit=crop')"
            }}
          ></div>
          
          <div className="container mx-auto px-4 absolute inset-0 z-20 flex flex-col justify-center items-start">
            <h1 className="text-5xl md:text-7xl font-bold text-[#D6BD94] mb-6 max-w-2xl">
              Aventure-se com Estilo pelos Céus
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-xl">
              Descubra nossa coleção exclusiva inspirada nos pioneiros da aviação
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                className="bg-[#D6BD94] hover:bg-[#D6BD94]/90 text-[#0a0a0c] font-bold px-6 py-3 rounded-md"
              >
                Comprar Novidades
              </button>
              <button 
                className="border border-[#D6BD94] text-[#D6BD94] hover:bg-[#D6BD94]/20 px-6 py-3 rounded-md"
              >
                Ver Mais Vendidos
              </button>
            </div>
          </div>
        </div>
        
        {/* Categorias */}
        <section className="py-20 bg-[#0a0a0c]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4 text-[#D6BD94]">
              Nossas Categorias
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
              Descubra nossa coleção exclusiva para aventureiros e aventureiras dos céus
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#151515] p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-[#D6BD94] mb-4">Aviador</h3>
                <p className="text-gray-300 mb-6">Roupas e acessórios inspirados na estética clássica de aviação masculina</p>
              </div>
              <div className="bg-[#151515] p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-[#D6BD94] mb-4">Aviadora</h3>
                <p className="text-gray-300 mb-6">Coleção exclusiva para mulheres inspirada nas pioneiras da aviação</p>
              </div>
              <div className="bg-[#151515] p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-[#D6BD94] mb-4">Acessórios</h3>
                <p className="text-gray-300 mb-6">Complementos essenciais para o verdadeiro entusiasta de aviação</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-24 bg-[#151515] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"></div>
          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-[#D6BD94] mb-6">
                Fique por Dentro das Novidades
              </h2>
              <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
                Cadastre-se para receber ofertas exclusivas e conteúdo sobre aviação
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-grow py-3 px-4 bg-[#0a0a0c] text-white rounded-lg border border-gray-800 focus:outline-none focus:border-[#D6BD94] shadow-inner shadow-black/50"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-[#D6BD94] hover:bg-[#D6BD94]/90 text-[#0a0a0c] font-bold px-4 py-3 rounded-lg"
                >
                  Assinar Newsletter
                </button>
              </form>
              
              <p className="text-gray-500 text-sm mt-6">
                Respeitamos sua privacidade. Descadastre-se a qualquer momento.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0a0a0c] text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Piloto Inteligente. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}