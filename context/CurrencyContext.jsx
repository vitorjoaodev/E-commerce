import React, { createContext, useState, useContext, useEffect } from 'react';

// Tipos de moedas suportadas
export type Currency = 'BRL' | 'USD' | 'EUR';

// Configuração de cada moeda
export interface CurrencyConfig {
  symbol: string;
  code: Currency;
  decimals: number;
  thousandSeparator: string;
  decimalSeparator: string;
  exchangeRate: number; // Relativo ao BRL (1 BRL = exchangeRate unidades da moeda)
}

// Definição das moedas suportadas
export const currencies = {
  BRL: {
    symbol: 'R$',
    code: 'BRL',
    decimals: 2,
    thousandSeparator: '.',
    decimalSeparator: ',',
    exchangeRate: 1
  },
  USD: {
    symbol: '$',
    code: 'USD',
    decimals: 2,
    thousandSeparator: ',',
    decimalSeparator: '.',
    exchangeRate: 0.2 // Exemplo: 1 BRL = 0.2 USD
  },
  EUR: {
    symbol: '€',
    code: 'EUR',
    decimals: 2,
    thousandSeparator: '.',
    decimalSeparator: ',',
    exchangeRate: 0.18 // Exemplo: 1 BRL = 0.18 EUR
  }
};

// Funções auxiliares para formatação e conversão de moedas
export function formatCurrency(amount: number | string, currency: Currency): string {
  const config = currencies[currency];
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  const parts = numAmount.toFixed(config.decimals).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandSeparator);
  
  return `${config.symbol} ${parts.join(config.decimalSeparator)}`;
}

export function convertCurrency(amount: number | string, fromCurrency: Currency, toCurrency: Currency): number {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  const fromRate = currencies[fromCurrency].exchangeRate;
  const toRate = currencies[toCurrency].exchangeRate;
  
  // Converter para BRL (moeda base) e então para a moeda alvo
  return (numAmount / fromRate) * toRate;
}

// Tipo do contexto
interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatValue: (amount: number | string) => string;
  convertValue: (amount: number | string, toCurrency: Currency) => number;
}

// Criação do contexto
const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Provedor do contexto
export const CurrencyProvider = ({ children }) => {
  // Estado para armazenar a moeda atual
  const [currency, setCurrencyState] = useState<Currency>('BRL');

  // Efeito para carregar a moeda do localStorage ao iniciar
  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency && Object.keys(currencies).includes(savedCurrency)) {
      setCurrencyState(savedCurrency as Currency);
    }
  }, []);

  // Função para definir a moeda
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('currency', newCurrency);
  };

  // Função para formatar valor na moeda atual
  const formatValue = (amount: number | string): string => {
    return formatCurrency(amount, currency);
  };

  // Função para converter valor para outra moeda
  const convertValue = (amount: number | string, toCurrency: Currency): number => {
    return convertCurrency(amount, currency, toCurrency);
  };

  // Provedor com os valores do contexto
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatValue, convertValue }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Hook para usar o contexto
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};