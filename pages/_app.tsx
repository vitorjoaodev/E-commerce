import type { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { LanguageProvider } from '@/context/LanguageContext';
import { CurrencyProvider } from '@/context/CurrencyProvider';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <Toaster />
          </QueryClientProvider>
        </CartProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}