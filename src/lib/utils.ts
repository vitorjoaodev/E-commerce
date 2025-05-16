import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";

/**
 * Concatenate class names with Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date based on the user's language preference
 */
export function formatDate(date: string | Date, language: 'pt-BR' | 'en-US' = 'pt-BR'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const locale = language === 'pt-BR' ? ptBR : enUS;
  const formatStr = language === 'pt-BR' ? 'dd/MM/yyyy' : 'MM/dd/yyyy';
  
  return format(dateObj, formatStr, { locale });
}