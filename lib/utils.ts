import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type Language } from "./i18n"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, language: Language = 'pt-BR'): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  const locale = language === 'pt-BR' ? 'pt-BR' : 'en-US';
  
  return dateObj.toLocaleDateString(locale, options);
}