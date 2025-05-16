export type Currency = 'BRL' | 'USD' | 'EUR';

export interface CurrencyConfig {
  symbol: string;
  code: Currency;
  decimals: number;
  thousandSeparator: string;
  decimalSeparator: string;
  exchangeRate: number; // Relative to BRL (1 BRL = exchangeRate units of currency)
}

export const currencies: Record<Currency, CurrencyConfig> = {
  BRL: {
    symbol: 'R$',
    code: 'BRL',
    decimals: 2,
    thousandSeparator: '.',
    decimalSeparator: ',',
    exchangeRate: 1,
  },
  USD: {
    symbol: '$',
    code: 'USD',
    decimals: 2,
    thousandSeparator: ',',
    decimalSeparator: '.',
    exchangeRate: 0.2, // Example rate: 1 BRL = 0.2 USD
  },
  EUR: {
    symbol: '€',
    code: 'EUR',
    decimals: 2,
    thousandSeparator: '.',
    decimalSeparator: ',',
    exchangeRate: 0.18, // Example rate: 1 BRL = 0.18 EUR
  },
};

export function formatCurrency(amount: number | string, currency: Currency): string {
  const config = currencies[currency];
  
  // Convert to number if string
  let numericAmount = typeof amount === 'string' 
    ? parseFloat(amount.replace(',', '.')) 
    : amount;
  
  // Apply exchange rate
  numericAmount = numericAmount * config.exchangeRate;
  
  // Format number according to locale
  const formatter = new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'pt-BR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  });
  
  return formatter.format(numericAmount);
}

export function convertCurrency(amount: number | string, fromCurrency: Currency, toCurrency: Currency): number {
  // Convert to number if string
  const numericAmount = typeof amount === 'string' 
    ? parseFloat(amount.replace(',', '.')) 
    : amount;
  
  // Convert from source currency to BRL (base currency)
  const amountInBRL = numericAmount / currencies[fromCurrency].exchangeRate;
  
  // Convert from BRL to target currency
  return amountInBRL * currencies[toCurrency].exchangeRate;
}
