import React, { createContext, useContext, useState, useEffect } from 'react';

// Definindo os idiomas suportados
export const languages = ['pt-BR', 'en-US'];

// Objeto de traduções
export const translations = {
  'pt-BR': {
    // Cabeçalho e navegação
    'nav.aviador': 'Aviador',
    'nav.aviadora': 'Aviadora',
    'nav.accessories': 'Acessórios',
    'nav.blog': 'Blog',
    'nav.story': 'Nossa História',
    'search.placeholder': 'Pesquisar...',
    
    // Página inicial
    'hero.title': 'Vista-se para a aventura',
    'hero.subtitle': 'Descubra a coleção Piloto Inteligente inspirada na era de ouro da aviação',
    'hero.shop': 'Comprar agora',
    
    // Categorias
    'categories.title': 'Categorias em destaque',
    'categories.aviador': 'Aviador',
    'categories.aviadorDesc': 'Coleção inspirada nos pilotos da era de ouro da aviação',
    'categories.aviadora': 'Aviadora',
    'categories.aviadoraDesc': 'Estilo e conforto para as mulheres que fazem história',
    'categories.accessories': 'Acessórios',
    'categories.accessoriesDesc': 'Complementos essenciais para completar seu visual',
    'categories.shop': 'Ver coleção',
    
    // Produtos em destaque
    'featured.title': 'Em destaque',
    'featured.subtitle': 'Nossas peças mais populares',
    'featured.shop': 'Ver todos',
    
    // História
    'story.title': 'Nossa História',
    'story.content': 'Fundada por Carlos Drummond, um piloto apaixonado pela era de ouro da aviação, a Piloto Inteligente nasceu do desejo de unir estilo e história.',
    'story.readMore': 'Saiba mais',
    
    // Blog
    'blog.title': 'Do Blog',
    'blog.subtitle': 'Histórias de aventura e aviação',
    'blog.readMore': 'Ler mais',
    
    // Newsletter
    'newsletter.title': 'Inscreva-se',
    'newsletter.subtitle': 'Receba novidades e promoções exclusivas',
    'newsletter.placeholder': 'Seu e-mail',
    'newsletter.button': 'Inscrever',
    
    // Rodapé
    'footer.about': 'Sobre',
    'footer.categories': 'Categorias',
    'footer.info': 'Informações',
    'footer.contact': 'Contato',
    'footer.rights': 'Todos os direitos reservados',
    
    // Página 404
    '404.title': 'Página não encontrada',
    '404.message': 'Parece que você se perdeu em voo. Esta página não existe ou foi movida.',
    '404.back': 'Voltar para a página inicial',
    
    // Carrinho
    'cart.title': 'Seu carrinho',
    'cart.empty': 'Seu carrinho está vazio',
    'cart.subtotal': 'Subtotal',
    'cart.checkout': 'Finalizar compra',
    
    // Produto
    'product.addToCart': 'Adicionar ao carrinho',
    'product.description': 'Descrição',
    'product.related': 'Produtos relacionados',
    
    // Geral
    'general.new': 'Novo',
    'general.sale': 'Oferta',
    'general.bestseller': 'Mais vendido',
  },
  'en-US': {
    // Header and navigation
    'nav.aviador': 'Men',
    'nav.aviadora': 'Women',
    'nav.accessories': 'Accessories',
    'nav.blog': 'Blog',
    'nav.story': 'Our Story',
    'search.placeholder': 'Search...',
    
    // Home page
    'hero.title': 'Dress for adventure',
    'hero.subtitle': 'Discover the Piloto Inteligente collection inspired by the golden age of aviation',
    'hero.shop': 'Shop now',
    
    // Categories
    'categories.title': 'Featured Categories',
    'categories.aviador': 'Men',
    'categories.aviadorDesc': 'Collection inspired by the pilots of the golden age of aviation',
    'categories.aviadora': 'Women',
    'categories.aviadoraDesc': 'Style and comfort for women who make history',
    'categories.accessories': 'Accessories',
    'categories.accessoriesDesc': 'Essential complements to complete your look',
    'categories.shop': 'View collection',
    
    // Featured products
    'featured.title': 'Featured',
    'featured.subtitle': 'Our most popular pieces',
    'featured.shop': 'View all',
    
    // Story
    'story.title': 'Our Story',
    'story.content': 'Founded by Carlos Drummond, a pilot passionate about the golden age of aviation, Piloto Inteligente was born from the desire to unite style and history.',
    'story.readMore': 'Learn more',
    
    // Blog
    'blog.title': 'From the Blog',
    'blog.subtitle': 'Stories of adventure and aviation',
    'blog.readMore': 'Read more',
    
    // Newsletter
    'newsletter.title': 'Subscribe',
    'newsletter.subtitle': 'Receive news and exclusive promotions',
    'newsletter.placeholder': 'Your email',
    'newsletter.button': 'Subscribe',
    
    // Footer
    'footer.about': 'About',
    'footer.categories': 'Categories',
    'footer.info': 'Information',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved',
    
    // 404 page
    '404.title': 'Page not found',
    '404.message': 'Looks like you got lost in flight. This page doesn\'t exist or has been moved.',
    '404.back': 'Back to homepage',
    
    // Cart
    'cart.title': 'Your cart',
    'cart.empty': 'Your cart is empty',
    'cart.subtotal': 'Subtotal',
    'cart.checkout': 'Checkout',
    
    // Product
    'product.addToCart': 'Add to cart',
    'product.description': 'Description',
    'product.related': 'Related products',
    
    // General
    'general.new': 'New',
    'general.sale': 'Sale',
    'general.bestseller': 'Bestseller',
  }
};

// Função de tradução
export function getTranslation(language, key) {
  if (!translations[language]) {
    return key;
  }
  
  return translations[language][key] || key;
}

// Criando o contexto de idioma
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('pt-BR');
  const [mounted, setMounted] = useState(false);
  
  // Only execute client-side code after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const t = (key) => getTranslation(language, key);

  const value = {
    language,
    setLanguage: mounted ? setLanguage : () => {},
    t
  };

  return (
    <LanguageContext.Provider value={value}>
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