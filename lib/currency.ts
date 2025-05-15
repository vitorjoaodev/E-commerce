import { Currency } from '@/context/CurrencyContext';

// Exchange rate from BRL to USD (example rate, should be updated with real data in production)
const USD_TO_BRL_RATE = 5.0;

/**
 * Format a value based on currency
 * @param value The value in BRL
 * @param targetCurrency The target currency to display
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, targetCurrency: Currency): string {
  // Convert value if needed
  const convertedValue = targetCurrency === 'USD' 
    ? value / USD_TO_BRL_RATE 
    : value;
  
  // Format based on currency
  return new Intl.NumberFormat(
    targetCurrency === 'BRL' ? 'pt-BR' : 'en-US', 
    { 
      style: 'currency', 
      currency: targetCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  ).format(convertedValue);
}

/**
 * Convert a price from one currency to another
 * @param value The price value
 * @param fromCurrency Source currency
 * @param toCurrency Target currency
 * @returns Converted price value
 */
export function convertCurrency(
  value: number, 
  fromCurrency: Currency, 
  toCurrency: Currency
): number {
  if (fromCurrency === toCurrency) return value;
  
  return fromCurrency === 'BRL' && toCurrency === 'USD'
    ? value / USD_TO_BRL_RATE
    : value * USD_TO_BRL_RATE;
}