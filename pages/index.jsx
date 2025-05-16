import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import StorySection from '../components/home/StorySection';
import BlogPreview from '../components/home/BlogPreview';
import { useLanguage } from '../context/LanguageContext';
import ClientOnly from '../components/ClientOnly';

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Head>
        <title>Piloto Inteligente | {t('hero.title')}</title>
        <meta name="description" content={t('hero.subtitle')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full p-4 border-b border-primary/20">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-primary text-2xl font-bold">Piloto Inteligente</h1>
          <nav className="hidden md:flex space-x-6">
            <Link href="/categoria/aviador" className="text-white hover:text-primary transition-colors">
              {t('nav.aviador')}
            </Link>
            <Link href="/categoria/aviadora" className="text-white hover:text-primary transition-colors">
              {t('nav.aviadora')}
            </Link>
            <Link href="/categoria/acessorios" className="text-white hover:text-primary transition-colors">
              {t('nav.accessories')}
            </Link>
            <Link href="/blog" className="text-white hover:text-primary transition-colors">
              {t('nav.blog')}
            </Link>
            <Link href="/nossa-historia" className="text-white hover:text-primary transition-colors">
              {t('nav.story')}
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-background text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">{t('hero.title')}</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/categoria/novidades" className="btn-primary">
                {t('hero.shop')}
              </Link>
              <Link href="/categoria/mais-vendidos" className="btn-secondary">
                {t('featured.shop')}
              </Link>
            </div>
            
            <div className="mt-16 flex flex-wrap justify-center gap-8">
              <div className="bg-background-secondary px-6 py-3 rounded-full text-white/90 flex items-center">
                <span className="mr-2">✓</span>
                <span>Frete Grátis Acima de R$ 300</span>
              </div>
              <div className="bg-background-secondary px-6 py-3 rounded-full text-white/90 flex items-center">
                <span className="mr-2">✓</span>
                <span>Garantia de 1 Ano</span>
              </div>
              <div className="bg-background-secondary px-6 py-3 rounded-full text-white/90 flex items-center">
                <span className="mr-2">✓</span>
                <span>Produção Sustentável</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">{t('categories.title')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background-secondary p-6 rounded-lg hover-scale">
                <h3 className="text-2xl font-bold text-primary mb-3">{t('categories.aviador')}</h3>
                <p className="text-white/70 mb-4">{t('categories.aviadorDesc')}</p>
                <Link href="/categoria/aviador" className="text-primary hover:underline">
                  {t('categories.shop')} →
                </Link>
              </div>
              
              <div className="bg-background-secondary p-6 rounded-lg hover-scale">
                <h3 className="text-2xl font-bold text-primary mb-3">{t('categories.aviadora')}</h3>
                <p className="text-white/70 mb-4">{t('categories.aviadoraDesc')}</p>
                <Link href="/categoria/aviadora" className="text-primary hover:underline">
                  {t('categories.shop')} →
                </Link>
              </div>
              
              <div className="bg-background-secondary p-6 rounded-lg hover-scale">
                <h3 className="text-2xl font-bold text-primary mb-3">{t('categories.accessories')}</h3>
                <p className="text-white/70 mb-4">{t('categories.accessoriesDesc')}</p>
                <Link href="/categoria/acessorios" className="text-primary hover:underline">
                  {t('categories.shop')} →
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Story Section */}
        <StorySection />
        
        {/* Featured Products (placeholder) */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary text-center mb-4">{t('featured.title')}</h2>
            <p className="text-white/70 text-center max-w-2xl mx-auto mb-12">
              {t('featured.subtitle')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-background-secondary rounded-lg overflow-hidden hover-scale">
                  <div className="h-64 bg-gray-800 flex items-center justify-center">
                    <span className="text-primary font-bold">Imagem do Produto {item}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold mb-2">Produto {item}</h3>
                    <p className="text-primary font-bold mb-2">R$ 199,90</p>
                    <button className="w-full btn-primary mt-2">{t('product.addToCart')}</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link href="/produtos" className="btn-secondary">
                {t('featured.shop')}
              </Link>
            </div>
          </div>
        </section>
        
        {/* Blog Preview */}
        <BlogPreview />
        
        {/* Newsletter Section */}
        <section className="py-16 bg-background-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary mb-4">{t('newsletter.title')}</h2>
              <p className="text-white/70 mb-8">
                {t('newsletter.subtitle')}
              </p>
              
              <form className="flex flex-col md:flex-row gap-3">
                <input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  className="flex-grow py-3 px-4 bg-background border border-border rounded-md text-white/90"
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  {t('newsletter.button')}
                </button>
              </form>
              
              <p className="text-white/50 text-sm mt-4">
                Ao se inscrever, você concorda com nossa Política de Privacidade. Você pode cancelar a qualquer momento.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold text-primary mb-4">Piloto Inteligente</h2>
              <p className="text-white/60 max-w-md">
                Criada por Carlos Drummond, um piloto apaixonado por viagens e aventuras ao redor do mundo.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">{t('footer.categories')}</h3>
                <ul className="space-y-2">
                  <li><Link href="/categoria/aviador" className="text-white/60 hover:text-primary">{t('nav.aviador')}</Link></li>
                  <li><Link href="/categoria/aviadora" className="text-white/60 hover:text-primary">{t('nav.aviadora')}</Link></li>
                  <li><Link href="/categoria/acessorios" className="text-white/60 hover:text-primary">{t('nav.accessories')}</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">{t('footer.info')}</h3>
                <ul className="space-y-2">
                  <li><Link href="/nossa-historia" className="text-white/60 hover:text-primary">{t('nav.story')}</Link></li>
                  <li><Link href="/blog" className="text-white/60 hover:text-primary">{t('nav.blog')}</Link></li>
                  <li><Link href="/faq" className="text-white/60 hover:text-primary">FAQ</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/40">
            <p>© {new Date().getFullYear()} Piloto Inteligente. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}