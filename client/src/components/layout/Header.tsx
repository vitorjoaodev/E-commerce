import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Logo } from '../ui/logo';
import { Compass, Search, ShoppingCart, Menu, X } from 'lucide-react';

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-[#121212] shadow-md border-b border-[#333]">
      {/* Top Banner */}
      <div className="bg-[#8B4513] text-white py-2 px-4 text-center text-xs md:text-sm">
        <span className="animate-pulse inline-block mr-2">✦</span>
        FRETE GRÁTIS PARA COMPRAS ACIMA DE R$150 | 15% DE DESCONTO NA PRIMEIRA COMPRA
        <span className="animate-pulse inline-block ml-2">✦</span>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          {isMobile && (
            <button 
              onClick={toggleMobileMenu}
              className="text-[#FFD700] p-2 hover:text-[#FFC000] transition-colors"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
          
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Logo size={isMobile ? "sm" : "md"} />
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/categoria/aviador" 
                className="text-white hover:text-[#FFD700] transition-colors duration-200 uppercase tracking-wide text-sm"
              >
                Aviador
              </Link>
              <Link 
                href="/categoria/aviadora" 
                className="text-white hover:text-[#FFD700] transition-colors duration-200 uppercase tracking-wide text-sm"
              >
                Aviadora
              </Link>
              <Link 
                href="/categoria/acessorios" 
                className="text-white hover:text-[#FFD700] transition-colors duration-200 uppercase tracking-wide text-sm"
              >
                Acessórios
              </Link>
              <Link 
                href="/blog" 
                className="text-white hover:text-[#FFD700] transition-colors duration-200 uppercase tracking-wide text-sm"
              >
                Blog
              </Link>
              <Link 
                href="/nossa-historia" 
                className="text-white hover:text-[#FFD700] transition-colors duration-200 uppercase tracking-wide text-sm"
              >
                Nossa História
              </Link>
            </nav>
          )}
          
          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSearch}
              className="text-[#FFD700] p-2 hover:text-[#FFC000] transition-colors"
            >
              <Search size={20} />
            </button>
            
            <button 
              className="text-[#FFD700] p-2 relative hover:text-[#FFC000] transition-colors"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-[#FFC000] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Search Bar (conditionally shown) */}
      {searchOpen && (
        <div className="bg-[#0a0a0c] py-4 px-4 absolute w-full border-b border-[#8B4513]">
          <div className="container mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full py-3 px-4 bg-black text-white rounded-lg border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#FFD700] shadow-inner shadow-black/50"
                autoFocus
              />
              <button 
                onClick={toggleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FFD700] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Menu (conditionally shown) */}
      {isMobile && mobileMenuOpen && (
        <div className="bg-[#0a0a0c] absolute w-full z-50 py-4 shadow-lg border-b border-[#8B4513]">
          <nav className="flex flex-col space-y-4 px-4">
            <Link 
              href="/categoria/aviador" 
              className="text-white hover:text-[#FFD700] transition-colors duration-200 py-2 border-b border-gray-800 uppercase tracking-wide text-sm flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-[#FFD700] mr-2">✦</span>
              Aviador
            </Link>
            <Link 
              href="/categoria/aviadora" 
              className="text-white hover:text-[#FFD700] transition-colors duration-200 py-2 border-b border-gray-800 uppercase tracking-wide text-sm flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-[#FFD700] mr-2">✦</span>
              Aviadora
            </Link>
            <Link 
              href="/categoria/acessorios" 
              className="text-white hover:text-[#FFD700] transition-colors duration-200 py-2 border-b border-gray-800 uppercase tracking-wide text-sm flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-[#FFD700] mr-2">✦</span>
              Acessórios
            </Link>
            <Link 
              href="/blog" 
              className="text-white hover:text-[#FFD700] transition-colors duration-200 py-2 border-b border-gray-800 uppercase tracking-wide text-sm flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-[#FFD700] mr-2">✦</span>
              Blog
            </Link>
            <Link 
              href="/nossa-historia" 
              className="text-white hover:text-[#FFD700] transition-colors duration-200 py-2 border-b border-gray-800 uppercase tracking-wide text-sm flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-[#FFD700] mr-2">✦</span>
              Nossa História
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}