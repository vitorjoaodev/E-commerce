import { ReactNode } from "react";
import { LanguageProvider } from "../../context/LanguageContext";
import { CurrencyProvider } from "../../context/CurrencyContext";
import { CartProvider } from "../../context/CartContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../lib/queryClient";
import { TooltipProvider } from "../../components/ui/tooltip";

interface RootProps {
  children: ReactNode;
}

export default function Root({ children }: RootProps) {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </QueryClientProvider>
        </CartProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}