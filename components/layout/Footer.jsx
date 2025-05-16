import React from 'react';
import Link from 'next/link';

export default function Footer() {
  // Função de tradução simplificada
  const t = (key) => {
    const translations = {
      'footer.about': 'Sobre nós',
      'footer.shop': 'Loja',
      'footer.shopMen': 'Aviador',
      'footer.shopWomen': 'Aviadora',
      'footer.accessories': 'Acessórios',
      'footer.bestsellers': 'Mais Vendidos',
      'footer.newArrivals': 'Novidades',
      'footer.sale': 'Promoções',
      'footer.information': 'Informações',
      'footer.ourStory': 'Nossa História',
      'footer.blog': 'Blog',
      'footer.faq': 'Perguntas Frequentes',
      'footer.shipping': 'Frete e Envio',
      'footer.returns': 'Trocas e Devoluções',
      'footer.terms': 'Termos e Condições',
      'footer.contact': 'Contato',
      'footer.address': 'Av. Aviação, 747 - São Paulo, SP',
      'footer.hours': 'Seg - Sex: 9h às 18h',
      'footer.copyright': '© 2023 Piloto Inteligente. Todos os direitos reservados.'
    };
    return translations[key] || key;
  };
  
  return (
    <footer className="bg-[#0a0a0c] text-white border-t border-gray-800 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Coluna 1 - Sobre */}
          <div>
            <h3 className="text-[#D6BD94] font-bold text-lg mb-4">{t('footer.about')}</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Piloto Inteligente é uma marca de roupas e acessórios inspirados na aviação,
              criada por Carlos Drummond para trazer elegância e espírito aventureiro ao seu dia a dia.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/pilotointeligente" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D6BD94]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://facebook.com/pilotointeligente" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D6BD94]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="https://youtube.com/pilotointeligente" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D6BD94]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Coluna 2 - Loja */}
          <div>
            <h3 className="text-[#D6BD94] font-bold text-lg mb-4">{t('footer.shop')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categoria/aviador" className="text-gray-400 hover:text-[#D6BD94] transition-colors">
                  {t('footer.shopMen')}
                </Link>
              </li>
              <li>
                <Link href="/categoria/aviadora" className="text-gray-400 hover:text-[#D6BD94] transition-colors">
                  {t('footer.shopWomen')}
                </Link>
              </li>
              <li>
                <Link href="/categoria/acessorios" className="text-gray-400 hover:text-[#D6BD94] transition-colors">
                  {t('footer.accessories')}
                </Link>
              </li>
              <li>
                <Link href="/produtos/mais-vendidos" className="text-gray-400 hover:text-[#D6BD94] transition-colors">
                  {t('footer.bestsellers')}
                </Link>
              </li>
              <li>
                <Link href="/produtos/novidades" className="text-gray-400 hover:text-[#D6BD94] transition-colors">
                  {t('footer.newArrivals')}
                </Link>
              </li>
              <li>
                <Link href="/produtos/promocoes" className="text-gray-400 hover:text-[#D6BD94] transition-colors">
                  {t('footer.sale')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Coluna 3 - Informações */}
          <div>
            <h3 className="text-[#D6BD94] font-bold text-lg mb-4">{t('footer.information')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/nossa-historia" className="text-gray-400 hover:text-[#D6BD94] transition-colors">
                  {t('footer.ourStory')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-[#D6BD94] transition-colors">
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-[#D6BD94] transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link href="/envio" className="text-gray-400 hover:text-[#D6BD94] transition-colors">
                  {t('footer.shipping')}
                </Link>
              </li>
              <li>
                <Link href="/trocas-devolucoes" className="text-gray-400 hover:text-[#D6BD94] transition-colors">
                  {t('footer.returns')}
                </Link>
              </li>
              <li>
                <Link href="/termos-condicoes" className="text-gray-400 hover:text-[#D6BD94] transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Coluna 4 - Contato */}
          <div>
            <h3 className="text-[#D6BD94] font-bold text-lg mb-4">{t('footer.contact')}</h3>
            <address className="not-italic text-sm text-gray-400 mb-4 leading-relaxed">
              {t('footer.address')}<br />
              contato@pilotointeligente.com<br />
              +55 11 98765-4321<br />
              {t('footer.hours')}
            </address>
            
            <form className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Assine nossa newsletter</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Seu e-mail" 
                  className="bg-gray-800 text-white text-sm px-3 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-[#D6BD94]"
                />
                <button className="bg-[#D6BD94] text-[#0a0a0c] px-3 py-2 rounded-r-md font-medium text-sm">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}