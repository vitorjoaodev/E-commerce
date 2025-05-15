import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="flex space-x-2 items-center">
      <button 
        onClick={() => setLanguage('pt-BR')}
        className={`text-sm ${language === 'pt-BR' ? 'font-bold text-adventure-yellow' : 'text-gray-300'}`}
      >
        PT
      </button>
      <span className="text-gray-500">|</span>
      <button 
        onClick={() => setLanguage('en-US')}
        className={`text-sm ${language === 'en-US' ? 'font-bold text-adventure-yellow' : 'text-gray-300'}`}
      >
        EN
      </button>
    </div>
  );
};

const CurrencySwitcher = () => {
  const { currency, setCurrency } = useCurrency();
  
  return (
    <div className="flex space-x-2 items-center ml-4">
      <button 
        onClick={() => setCurrency('BRL')}
        className={`text-sm ${currency === 'BRL' ? 'font-bold text-adventure-yellow' : 'text-gray-300'}`}
      >
        R$
      </button>
      <span className="text-gray-500">|</span>
      <button 
        onClick={() => setCurrency('USD')}
        className={`text-sm ${currency === 'USD' ? 'font-bold text-adventure-yellow' : 'text-gray-300'}`}
      >
        $
      </button>
    </div>
  );
};

export default function Header() {
  const { t } = useLanguage();
  const { cartItems, toggleCartOpen } = useCart();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };
  
  const toggleSearch = () => {
    setSearchOpen(prev => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-dark-gray/95 backdrop-blur-sm border-b border-gray-800">
      {/* Top Banner */}
      <div className="bg-adventure-yellow text-dark-gray py-2 px-4 text-center text-xs md:text-sm font-semibold">
        {t('banner.promo')} | {t('banner.discount')}
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          {isMobile && (
            <button 
              onClick={toggleMobileMenu}
              className="text-white p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-adventure-yellow tracking-widest">
            PILOTO INTELIGENTE
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/categoria/aviador" 
                className="text-white hover:text-adventure-yellow transition-colors duration-200"
              >
                {t('nav.aviador')}
              </Link>
              <Link 
                href="/categoria/aviadora" 
                className="text-white hover:text-adventure-yellow transition-colors duration-200"
              >
                {t('nav.aviadora')}
              </Link>
              <Link 
                href="/categoria/acessorios" 
                className="text-white hover:text-adventure-yellow transition-colors duration-200"
              >
                {t('nav.accessories')}
              </Link>
              <Link 
                href="/blog" 
                className="text-white hover:text-adventure-yellow transition-colors duration-200"
              >
                {t('nav.blog')}
              </Link>
              <Link 
                href="/nossa-historia" 
                className="text-white hover:text-adventure-yellow transition-colors duration-200"
              >
                {t('nav.history')}
              </Link>
            </nav>
          )}
          
          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {!isMobile && (
              <>
                <LanguageSwitcher />
                <CurrencySwitcher />
              </>
            )}
            
            <button 
              onClick={toggleSearch}
              className="text-white p-2"
            >
              <Search size={20} />
            </button>
            
            <button 
              onClick={toggleCartOpen}
              className="text-white p-2 relative"
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-aviation-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Search Bar (conditionally shown) */}
      {searchOpen && (
        <div className="bg-gray-900 py-4 px-4 absolute w-full">
          <div className="container mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder={t('search.placeholder')}
                className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-adventure-yellow"
              />
              <button 
                onClick={toggleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Menu (conditionally shown) */}
      {isMobile && mobileMenuOpen && (
        <div className="bg-gray-900 absolute w-full z-50 py-4 shadow-lg">
          <nav className="flex flex-col space-y-4 px-4">
            <Link 
              href="/categoria/aviador" 
              className="text-white hover:text-adventure-yellow transition-colors duration-200 py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.aviador')}
            </Link>
            <Link 
              href="/categoria/aviadora" 
              className="text-white hover:text-adventure-yellow transition-colors duration-200 py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.aviadora')}
            </Link>
            <Link 
              href="/categoria/acessorios" 
              className="text-white hover:text-adventure-yellow transition-colors duration-200 py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.accessories')}
            </Link>
            <Link 
              href="/blog" 
              className="text-white hover:text-adventure-yellow transition-colors duration-200 py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.blog')}
            </Link>
            <Link 
              href="/nossa-historia" 
              className="text-white hover:text-adventure-yellow transition-colors duration-200 py-2 border-b border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.history')}
            </Link>
            
            <div className="flex justify-between items-center py-4">
              <LanguageSwitcher />
              <CurrencySwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}