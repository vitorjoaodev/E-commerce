import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';
import { type Currency } from '@/lib/currency';
import { type Language } from '@/lib/i18n';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { 
  Search, 
  ShoppingCart, 
  User, 
  ChevronDown, 
  Layers 
} from 'lucide-react';

export default function Header() {
  const [location, navigate] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const { cartItems, toggleCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setLanguageDropdownOpen(false);
  };

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    setCurrencyDropdownOpen(false);
  };

  return (
    <header className="bg-dark-gray border-b border-vintage-beige/30">
      {/* Top Banner */}
      <div className="bg-adventure-yellow text-dark-gray py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-bold vintage-text">
            <span>{t('banner.promo')}</span> | 
            <span>{t('banner.discount')}</span>
          </p>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 mb-4 md:mb-0">
            <Link href="/" className="adventure-title text-4xl text-vintage-beige flex items-center">
              <span className="text-adventure-yellow">PILOTO</span>INTELIGENTE
              <span className="ml-2 text-aviation-blue">
                <Layers size={24} />
              </span>
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder={t('search.placeholder')}
                className="w-full py-2 px-4 bg-dark-gray border border-vintage-beige/50 rounded-lg text-light-beige focus:outline-none focus:border-adventure-yellow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit"
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-vintage-beige hover:text-adventure-yellow"
              >
                <Search size={18} />
              </Button>
            </form>
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-6">
            {/* Language Switcher */}
            <div className="relative group">
              <Button
                variant="ghost"
                className="flex items-center text-light-beige hover:text-adventure-yellow"
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              >
                <span className="mr-1">{language === 'pt-BR' ? 'PT' : 'EN'}</span>
                <ChevronDown size={14} />
              </Button>
              {languageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-dark-gray border border-vintage-beige/30 rounded-lg shadow-lg z-50">
                  <button 
                    className="block w-full px-4 py-2 text-left text-light-beige hover:bg-vintage-beige/10"
                    onClick={() => handleLanguageChange('pt-BR')}
                  >
                    Português
                  </button>
                  <button 
                    className="block w-full px-4 py-2 text-left text-light-beige hover:bg-vintage-beige/10"
                    onClick={() => handleLanguageChange('en-US')}
                  >
                    English
                  </button>
                </div>
              )}
            </div>
            
            {/* Currency Switcher */}
            <div className="relative group">
              <Button
                variant="ghost"
                className="flex items-center text-light-beige hover:text-adventure-yellow"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              >
                <span className="mr-1">{currency}</span>
                <ChevronDown size={14} />
              </Button>
              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-dark-gray border border-vintage-beige/30 rounded-lg shadow-lg z-50">
                  <button 
                    className="block w-full px-4 py-2 text-left text-light-beige hover:bg-vintage-beige/10"
                    onClick={() => handleCurrencyChange('BRL')}
                  >
                    R$ BRL
                  </button>
                  <button 
                    className="block w-full px-4 py-2 text-left text-light-beige hover:bg-vintage-beige/10"
                    onClick={() => handleCurrencyChange('USD')}
                  >
                    $ USD
                  </button>
                  <button 
                    className="block w-full px-4 py-2 text-left text-light-beige hover:bg-vintage-beige/10"
                    onClick={() => handleCurrencyChange('EUR')}
                  >
                    € EUR
                  </button>
                </div>
              )}
            </div>
            
            {/* Account */}
            <Link href="/account" className="text-light-beige hover:text-adventure-yellow">
              <User size={20} />
            </Link>
            
            {/* Cart */}
            <div className="relative">
              <Button 
                variant="ghost" 
                className="text-light-beige hover:text-adventure-yellow p-0"
                onClick={toggleCartOpen}
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-adventure-yellow text-dark-gray rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Category Navigation */}
        <nav className="mt-6">
          <ul className="flex flex-wrap justify-center space-x-1 md:space-x-8">
            <li>
              <Link 
                href="/categoria/aviador" 
                className={`px-3 py-2 adventure-title text-lg ${location === '/categoria/aviador' ? 'text-adventure-yellow' : 'text-vintage-beige hover:text-adventure-yellow'}`}
              >
                {t('nav.aviador')}
              </Link>
            </li>
            <li>
              <Link 
                href="/categoria/aviadora" 
                className={`px-3 py-2 adventure-title text-lg ${location === '/categoria/aviadora' ? 'text-adventure-yellow' : 'text-vintage-beige hover:text-adventure-yellow'}`}
              >
                {t('nav.aviadora')}
              </Link>
            </li>
            <li>
              <Link 
                href="/categoria/acessorios" 
                className={`px-3 py-2 adventure-title text-lg ${location === '/categoria/acessorios' ? 'text-adventure-yellow' : 'text-vintage-beige hover:text-adventure-yellow'}`}
              >
                {t('nav.accessories')}
              </Link>
            </li>
            <li>
              <Link 
                href="/blog" 
                className={`px-3 py-2 adventure-title text-lg ${location === '/blog' ? 'text-adventure-yellow' : 'text-vintage-beige hover:text-adventure-yellow'}`}
              >
                {t('nav.blog')}
              </Link>
            </li>
            <li>
              <Link 
                href="/nossa-historia" 
                className={`px-3 py-2 adventure-title text-lg ${location === '/nossa-historia' ? 'text-adventure-yellow' : 'text-vintage-beige hover:text-adventure-yellow'}`}
              >
                {t('nav.history')}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
