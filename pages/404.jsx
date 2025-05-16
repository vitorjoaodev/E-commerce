import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useLanguage } from '../context/LanguageContext';

const NotFound = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Head>
        <title>{t('404.title')} | Piloto Inteligente</title>
        <meta name="description" content={t('404.message')} />
      </Head>

      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary">404</h1>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl text-white mb-4">{t('404.title')}</h2>
          <p className="text-white/70">{t('404.message')}</p>
        </div>
        
        <div className="flex justify-center">
          <div className="relative w-64 h-64">
            {/* Imagem de um avião "perdido" com design simples */}
            <div className="absolute w-full h-full flex items-center justify-center">
              <div className="relative w-40 h-40">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-8 bg-primary rounded-full opacity-40 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-4 bg-primary rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-40 bg-primary rounded-full"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-primary rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Link href="/" className="btn-primary">
            {t('404.back')}
          </Link>
        </div>
        
        <div className="mt-8 flex justify-center gap-4">
          <button 
            onClick={() => setLanguage('pt-BR')} 
            className={`px-3 py-1 rounded-md transition-colors ${language === 'pt-BR' ? 'bg-primary text-background' : 'bg-background-secondary text-white/70'}`}
          >
            Português
          </button>
          <button 
            onClick={() => setLanguage('en-US')} 
            className={`px-3 py-1 rounded-md transition-colors ${language === 'en-US' ? 'bg-primary text-background' : 'bg-background-secondary text-white/70'}`}
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;