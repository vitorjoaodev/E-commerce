import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Efeito de scroll - only runs in browser
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  
  return (
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
            <Link href="/" className="text-white text-2xl font-bold">
              Piloto Inteligente
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
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? 'Fechar' : 'Menu'}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0a0c] border-t border-[#222] py-4 shadow-xl">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/categoria/aviador" className="text-white hover:text-[#D6BD94] py-2 border-b border-[#222] transition-colors">
                Aviador
              </Link>
              <Link href="/categoria/aviadora" className="text-white hover:text-[#D6BD94] py-2 border-b border-[#222] transition-colors">
                Aviadora
              </Link>
              <Link href="/categoria/acessorios" className="text-white hover:text-[#D6BD94] py-2 border-b border-[#222] transition-colors">
                Acessórios
              </Link>
              <Link href="/blog" className="text-white hover:text-[#D6BD94] py-2 border-b border-[#222] transition-colors">
                Blog
              </Link>
              <Link href="/nossa-historia" className="text-white hover:text-[#D6BD94] py-2 transition-colors">
                Nossa História
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}