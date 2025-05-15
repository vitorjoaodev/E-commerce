import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { ShoppingBag, Menu, X, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="flex space-x-2 items-center">
      <button 
        onClick={() => setLanguage('pt-BR')}
        className={`text-sm ${language === 'pt-BR' ? 'font-bold text-primary' : 'text-gray-400'} hover:text-primary transition-colors`}
      >
        PT
      </button>
      <span className="text-gray-700">|</span>
      <button 
        onClick={() => setLanguage('en-US')}
        className={`text-sm ${language === 'en-US' ? 'font-bold text-primary' : 'text-gray-400'} hover:text-primary transition-colors`}
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
        className={`text-sm ${currency === 'BRL' ? 'font-bold text-primary' : 'text-gray-400'} hover:text-primary transition-colors`}
      >
        R$
      </button>
      <span className="text-gray-700">|</span>
      <button 
        onClick={() => setCurrency('USD')}
        className={`text-sm ${currency === 'USD' ? 'font-bold text-primary' : 'text-gray-400'} hover:text-primary transition-colors`}
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
      <div className="bg-[#8B4513] text-foreground py-2 px-4 text-center text-xs md:text-sm font-semibold">
        <span className="animate-pulse inline-block mr-2">✦</span>
        {t('banner.promo')} | {t('banner.discount')}
        <span className="animate-pulse inline-block ml-2">✦</span>
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
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Logo size={isMobile ? "sm" : "md"} />
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/categoria/aviador" 
                className="text-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wide text-sm"
              >
                {t('nav.aviador')}
              </Link>
              <Link 
                href="/categoria/aviadora" 
                className="text-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wide text-sm"
              >
                {t('nav.aviadora')}
              </Link>
              <Link 
                href="/categoria/acessorios" 
                className="text-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wide text-sm"
              >
                {t('nav.accessories')}
              </Link>
              <Link 
                href="/blog" 
                className="text-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wide text-sm"
              >
                {t('nav.blog')}
              </Link>
              <Link 
                href="/nossa-historia" 
                className="text-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wide text-sm"
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
              className="text-primary p-2 hover:text-accent transition-colors"
            >
              <Search size={20} />
            </button>
            
            <button 
              onClick={toggleCartOpen}
              className="text-primary p-2 relative hover:text-accent transition-colors"
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
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
                placeholder={t('search.placeholder')}
                className="w-full py-3 px-4 bg-black text-foreground rounded-lg border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-primary shadow-inner shadow-black/50"
                autoFocus
              />
              <button 
                onClick={toggleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
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