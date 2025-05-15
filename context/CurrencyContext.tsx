import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Currency = 'BRL' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with BRL (Brazilian Real) as default currency
  const [currency, setCurrencyState] = useState<Currency>('BRL');

  // Load currency preference from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCurrency = localStorage.getItem('currency') as Currency;
      if (savedCurrency && (savedCurrency === 'BRL' || savedCurrency === 'USD')) {
        setCurrencyState(savedCurrency);
      }
    }
  }, []);

  // Save currency preference to localStorage whenever it changes
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currency', newCurrency);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};