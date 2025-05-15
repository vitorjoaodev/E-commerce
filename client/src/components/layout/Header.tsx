import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Logo } from '../ui/logo';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handle the search form submission
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (searchQuery.trim()) {
      setLocation(`/pesquisa?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchActive(false); // Hide search after submitting
    }
  };
  
  // Handle the escape key to close search
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchActive) {
        setIsSearchActive(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isSearchActive]);
  
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
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/categoria/aviador" className="text-white hover:text-[#D6BD94] transition-colors">
              Aviador
            </Link>
            <Link to="/categoria/aviadora" className="text-white hover:text-[#D6BD94] transition-colors">
              Aviadora
            </Link>
            <Link to="/categoria/acessorios" className="text-white hover:text-[#D6BD94] transition-colors">
              Acessórios
            </Link>
            <Link to="/blog" className="text-white hover:text-[#D6BD94] transition-colors">
              Blog
            </Link>
            <Link to="/nossa-historia" className="text-white hover:text-[#D6BD94] transition-colors">
              Nossa História
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6">
            {/* Search button and form */}
            <div className="relative">
              {isSearchActive ? (
                <form onSubmit={handleSearch} className="absolute right-0 top-0 w-64 flex">
                  <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#161618] border border-[#333] text-white rounded-l-lg px-3 py-1 w-full focus:outline-none focus:border-[#D6BD94]"
                    autoFocus
                  />
                  <button 
                    type="submit" 
                    className="bg-[#D6BD94] text-black px-3 py-1 rounded-r-lg hover:bg-[#C4AA80]"
                  >
                    <Search size={16} />
                  </button>
                </form>
              ) : (
                <button 
                  className="text-white hover:text-[#D6BD94] transition-colors"
                  onClick={() => setIsSearchActive(true)}
                  aria-label="Abrir pesquisa"
                >
                  <Search size={20} />
                </button>
              )}
            </div>
            
            {/* User account */}
            <Link to="/conta" className="hidden sm:block text-white hover:text-[#D6BD94] transition-colors">
              <User size={20} />
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white hover:text-[#D6BD94] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0a0c] border-t border-[#222] py-4 shadow-xl">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/categoria/aviador" className="text-white hover:text-[#D6BD94] py-2 border-b border-[#222] transition-colors">
                Aviador
              </Link>
              <Link to="/categoria/aviadora" className="text-white hover:text-[#D6BD94] py-2 border-b border-[#222] transition-colors">
                Aviadora
              </Link>
              <Link to="/categoria/acessorios" className="text-white hover:text-[#D6BD94] py-2 border-b border-[#222] transition-colors">
                Acessórios
              </Link>
              <Link to="/blog" className="text-white hover:text-[#D6BD94] py-2 border-b border-[#222] transition-colors">
                Blog
              </Link>
              <Link to="/nossa-historia" className="text-white hover:text-[#D6BD94] py-2 transition-colors">
                Nossa História
              </Link>
              <Link to="/conta" className="text-white hover:text-[#D6BD94] py-2 border-t border-[#222] transition-colors">
                Minha Conta
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}