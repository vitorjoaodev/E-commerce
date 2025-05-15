import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, getTranslation, translations } from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations['pt-BR']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('pt-BR');

  // Load language preference from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language | null;
      if (savedLanguage && (savedLanguage === 'pt-BR' || savedLanguage === 'en-US')) {
        setLanguageState(savedLanguage);
      } else {
        // Try to detect browser language
        const browserLang = navigator.language;
        if (browserLang.startsWith('pt')) {
          setLanguageState('pt-BR');
        } else {
          setLanguageState('en-US');
        }
      }
    }
  }, []);

  // Save language preference to localStorage whenever it changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
      
      // Update HTML lang attribute for accessibility and SEO
      document.documentElement.lang = newLanguage === 'pt-BR' ? 'pt' : 'en';
    }
  };

  // Translation function
  const t = (key: keyof typeof translations['pt-BR']) => {
    return getTranslation(language, key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};