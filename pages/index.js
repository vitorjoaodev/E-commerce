import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Efeito de scroll para o header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <Head>
        <title>Piloto Inteligente | Moda Inspirada na Aviação</title>
        <meta name="description" content="Descubra moda exclusiva inspirada no mundo da aviação. Roupas para aviadores e aviadoras com design premium e materiais de alta qualidade." />
      </Head>
      
      {/* Header */}
      <header 
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0a0a0c]/95 backdrop-blur-sm py-2 shadow-lg' 
            : 'bg-[#0a0a0c] py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-[#D6BD94] font-bold text-2xl">PILOTO</span>
                <span className="text-white font-bold text-2xl ml-1">INTELIGENTE</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/categoria/aviador" className="text-white hover:text-[#D6BD94] transition-colors">
                Aviador
              </Link>
              <Link href="/categoria/aviadora" className="text-white hover:text-[#D6BD94] transition-colors">
                Aviadora
              </Link>
              <Link href="/categoria/acessorios" className="text-white hover:text-[#D6BD94] transition-colors">
                Acessórios
              </Link>
              <Link href="/blog" className="text-white hover:text-[#D6BD94] transition-colors">
                Blog
              </Link>
              <Link href="/nossa-historia" className="text-white hover:text-[#D6BD94] transition-colors">
                Nossa História
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white hover:text-[#D6BD94] transition-colors"
              onClick={() => {}}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative bg-gradient-to-b from-[#0a0a0c] to-[#141419]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Vista-se como um <span className="text-[#D6BD94]">verdadeiro piloto</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10">
                Roupas autênticas inspiradas na coragem e no espírito de aventura dos pioneiros da aviação.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-[#D6BD94] text-black font-medium rounded-lg hover:bg-[#c4aa82] transition-colors">
                  Novidades
                </button>
                <button className="px-8 py-3 border border-[#D6BD94] text-[#D6BD94] font-medium rounded-lg hover:bg-[#D6BD94]/10 transition-colors">
                  Mais Vendidos
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-[#0a0a0c]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nossas Categorias</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Category 1 */}
              <div className="bg-[#111115] rounded-lg overflow-hidden group">
                <div className="h-64 bg-[#161619] flex items-center justify-center">
                  <span className="text-5xl text-[#D6BD94]">✈️</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Aviador</h3>
                  <p className="text-gray-400 mb-4">Jaquetas, camisas e acessórios inspirados no estilo clássico da aviação masculina.</p>
                  <a href="#" className="text-[#D6BD94] hover:underline inline-flex items-center">
                    Ver coleção
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Category 2 */}
              <div className="bg-[#111115] rounded-lg overflow-hidden group">
                <div className="h-64 bg-[#161619] flex items-center justify-center">
                  <span className="text-5xl text-[#D6BD94]">👩‍✈️</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Aviadora</h3>
                  <p className="text-gray-400 mb-4">Peças femininas que combinam elegância e o espírito aventureiro das pioneiras na aviação.</p>
                  <a href="#" className="text-[#D6BD94] hover:underline inline-flex items-center">
                    Ver coleção
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Category 3 */}
              <div className="bg-[#111115] rounded-lg overflow-hidden group">
                <div className="h-64 bg-[#161619] flex items-center justify-center">
                  <span className="text-5xl text-[#D6BD94]">🧳</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Acessórios</h3>
                  <p className="text-gray-400 mb-4">Complementos essenciais para completar seu look de aviação com autenticidade.</p>
                  <a href="#" className="text-[#D6BD94] hover:underline inline-flex items-center">
                    Ver coleção
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Story Section */}
        <section className="py-16 bg-[#0c0c0f]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Nossa História</h2>
              <div className="bg-[#111115] p-8 rounded-lg">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  O Piloto Inteligente nasceu da paixão do piloto Carlos Drummond pela aviação e pela história dos corajosos pioneiros que desafiaram os céus. 
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Nossa missão é criar peças que não apenas homenageiam o espírito aventureiro desses heróis, mas também oferecem o conforto e a qualidade que os modernos viajantes do mundo merecem.
                </p>
                <div className="text-center">
                  <button className="px-6 py-2 border border-[#D6BD94] text-[#D6BD94] font-medium rounded-lg hover:bg-[#D6BD94]/10 transition-colors">
                    Saiba mais sobre nossa história
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0c] text-white border-t border-gray-800 pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#D6BD94]">Sobre nós</h3>
              <p className="text-gray-400">Criamos roupas autênticas inspiradas na história da aviação, combinando tradição e qualidade.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#D6BD94]">Loja</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#D6BD94]">Aviador</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D6BD94]">Aviadora</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D6BD94]">Acessórios</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D6BD94]">Mais Vendidos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D6BD94]">Novidades</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#D6BD94]">Informações</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#D6BD94]">Nossa História</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D6BD94]">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D6BD94]">Perguntas Frequentes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D6BD94]">Frete e Envio</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#D6BD94]">Termos e Condições</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#D6BD94]">Contato</h3>
              <p className="text-gray-400 mb-2">Av. Aviação, 747 - São Paulo, SP</p>
              <p className="text-gray-400 mb-2">contato@pilotointeligente.com</p>
              <p className="text-gray-400">Seg - Sex: 9h às 18h</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500">
            <p>© 2023 Piloto Inteligente. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}