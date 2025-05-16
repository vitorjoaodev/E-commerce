import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

const Layout = ({ 
  children, 
  title = 'Piloto Inteligente - Loja Online de Acessórios de Aviação Vintage',
  description = 'Loja online de roupas e acessórios com estética de aviação vintage. Produtos exclusivos para aviadores e aviadoras.'
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className="sticky top-0 z-30 bg-[#0a0a0c] py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <a className="text-[#D6BD94] font-bold text-xl">Piloto Inteligente</a>
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/categoria/aviador">
                <a className="text-white hover:text-[#D6BD94] transition-colors">Aviador</a>
              </Link>
              <Link href="/categoria/aviadora">
                <a className="text-white hover:text-[#D6BD94] transition-colors">Aviadora</a>
              </Link>
              <Link href="/categoria/acessorios">
                <a className="text-white hover:text-[#D6BD94] transition-colors">Acessórios</a>
              </Link>
              <Link href="/blog">
                <a className="text-white hover:text-[#D6BD94] transition-colors">Blog</a>
              </Link>
              <Link href="/nossa-historia">
                <a className="text-white hover:text-[#D6BD94] transition-colors">Nossa História</a>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main>{children}</main>
      
      <footer className="bg-[#0a0a0c] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Piloto Inteligente. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;