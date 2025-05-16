import React, { createContext, useContext, useState, useEffect } from 'react';

// Definindo as moedas suportadas
export const currencies = {
  BRL: {
    symbol: 'R$',
    code: 'BRL',
    decimals: 2,
    thousandSeparator: '.',
    decimalSeparator: ',',
    exchangeRate: 1 // Base currency
  },
  USD: {
    symbol: '$',
    code: 'USD',
    decimals: 2,
    thousandSeparator: ',',
    decimalSeparator: '.',
    exchangeRate: 0.2 // 1 BRL = 0.2 USD
  },
  EUR: {
    symbol: '€',
    code: 'EUR',
    decimals: 2,
    thousandSeparator: '.',
    decimalSeparator: ',',
    exchangeRate: 0.18 // 1 BRL = 0.18 EUR
  }
};

// Funções de utilidade
export function formatCurrency(amount, currency = 'BRL') {
  const currencyConfig = currencies[currency];
  
  if (!currencyConfig) {
    return `${amount}`;
  }
  
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) {
    return `${currencyConfig.symbol} -`;
  }
  
  const formattedAmount = numericAmount.toFixed(currencyConfig.decimals);
  const [whole, decimal] = formattedAmount.split('.');
  
  const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, currencyConfig.thousandSeparator);
  
  return `${currencyConfig.symbol} ${formattedWhole}${currencyConfig.decimalSeparator}${decimal}`;
}

export function convertCurrency(amount, fromCurrency = 'BRL', toCurrency = 'BRL') {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) {
    return 0;
  }
  
  // Converter para BRL primeiro (moeda base)
  const amountInBRL = fromCurrency === 'BRL' 
    ? numericAmount 
    : numericAmount / currencies[fromCurrency].exchangeRate;
  
  // Converter de BRL para a moeda alvo
  return toCurrency === 'BRL' 
    ? amountInBRL 
    : amountInBRL * currencies[toCurrency].exchangeRate;
}

// Criando o contexto de moeda
const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('BRL');
  const [mounted, setMounted] = useState(false);
  
  // Only execute client-side code after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const value = {
    currency,
    setCurrency: mounted ? setCurrency : () => {},
    formatPrice: (amount) => formatCurrency(amount, currency),
    convert: (amount, fromCurrency) => convertCurrency(amount, fromCurrency, currency)
  };

  return (
    <CurrencyContext.Provider value={value}>
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