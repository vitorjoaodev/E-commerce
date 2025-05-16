import React, { createContext, useState, useContext, useEffect } from 'react';

// Idiomas suportados
const LANGUAGES = ['pt-BR', 'en-US'];
// Language pode ser 'pt-BR' ou 'en-US'

// Traduções
const translations = {
  'pt-BR': {
    'banner.promo': 'Frete grátis para compras acima de R$350',
    'banner.discount': '15% OFF na primeira compra com o cupom PILOTO15',
    'search.placeholder': 'Buscar produtos...',
    'nav.aviador': 'Aviador',
    'nav.aviadora': 'Aviadora',
    'nav.accessories': 'Acessórios',
    'nav.blog': 'Blog',
    'nav.history': 'Nossa História',
    'hero.title': 'Vista-se como um Piloto',
    'hero.subtitle': 'Moda inspirada na aviação para o seu estilo aventureiro',
    'hero.shopNew': 'Nova Coleção',
    'hero.shopBestsellers': 'Mais Vendidos',
    'hero.badge1': 'Desde 2022',
    'hero.badge2': 'Envio Internacional',
    'hero.badge3': 'Alta Qualidade',
    'categories.title': 'Navegue por Categoria',
    'categories.aviador': 'Aviador',
    'categories.aviadorDesc': 'Jaquetas, camisas e acessórios para homem',
    'categories.aviadora': 'Aviadora',
    'categories.aviadoraDesc': 'Elegância e conforto para mulheres aventureiras',
    'categories.accessories': 'Acessórios',
    'categories.accessoriesDesc': 'Complementos exclusivos para completar seu visual',
    'categories.shopNow': 'Comprar',
    'featured.title': 'Produtos em Destaque',
    'featured.subtitle': 'Conheça nossas peças mais populares',
    'featured.new': 'Novo',
    'featured.bestseller': 'Mais Vendido',
    'featured.sale': 'Promoção',
    'featured.viewAll': 'Ver Todos',
    'story.title': 'Nossa História',
    'story.content': 'O Piloto Inteligente nasceu da paixão de Carlos Drummond pela aviação e pela moda. Como piloto profissional por mais de 15 anos, Carlos sempre sentiu falta de roupas que representassem o espírito aventureiro e a elegância da aviação no dia a dia.',
    'story.content2': 'Em 2022, ele decidiu criar uma marca que combinasse a funcionalidade das roupas de aviador com um design contemporâneo, permitindo que qualquer pessoa se sentisse como um piloto, mesmo com os pés no chão.',
    'story.readMore': 'Ler mais',
    'blog.title': 'O Piloto Inteligente Blog',
    'blog.subtitle': 'Dicas, histórias e novidades do mundo da aviação',
    'blog.readMore': 'Ler mais',
    'blog.viewAll': 'Ver todos os artigos',
    'newsletter.title': 'Fique por dentro',
    'newsletter.subtitle': 'Receba nossas novidades e promoções exclusivas',
    'newsletter.emailPlaceholder': 'Seu melhor e-mail',
    'newsletter.subscribe': 'Assinar',
    'newsletter.privacy': 'Respeitamos sua privacidade. Conheça nossa política de privacidade',
    'instagram.title': 'Nos siga no Instagram',
    'instagram.subtitle': '@pilotointeligente',
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
    'footer.copyright': '© 2023 Piloto Inteligente. Todos os direitos reservados.',
    'exitPopup.title': 'Não vá embora ainda!',
    'exitPopup.subtitle': 'Temos uma oferta especial para você',
    'exitPopup.discount': '10% OFF',
    'exitPopup.offer': 'na sua primeira compra',
    'exitPopup.emailPlaceholder': 'Seu melhor e-mail',
    'exitPopup.getDiscount': 'Obter desconto',
    'exitPopup.privacy': 'Respeitamos sua privacidade',
    'cart.title': 'Seu Carrinho',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Frete calculado no checkout',
    'cart.total': 'Total',
    'cart.checkout': 'Finalizar Compra',
    'cart.continueShopping': 'Continuar Comprando',
    'productDetail.addToCart': 'Adicionar ao Carrinho',
    'productDetail.description': 'Descrição',
    'productDetail.relatedProducts': 'Produtos Relacionados',
    'checkout.title': 'Finalizar Compra',
    'checkout.personalInfo': 'Informações Pessoais',
    'checkout.shippingInfo': 'Informações de Envio',
    'checkout.paymentInfo': 'Informações de Pagamento',
    'checkout.complete': 'Concluir Pedido',
    'error.404.title': 'Página não encontrada',
    'error.404.message': 'A página que você está procurando não existe.',
    'error.404.backToHome': 'Voltar para a página inicial'
  },
  'en-US': {
    'banner.promo': 'Free shipping on orders over $50',
    'banner.discount': '15% OFF your first purchase with code PILOT15',
    'search.placeholder': 'Search products...',
    'nav.aviador': 'Men',
    'nav.aviadora': 'Women',
    'nav.accessories': 'Accessories',
    'nav.blog': 'Blog',
    'nav.history': 'Our Story',
    'hero.title': 'Dress Like a Pilot',
    'hero.subtitle': 'Aviation-inspired fashion for your adventurous style',
    'hero.shopNew': 'New Collection',
    'hero.shopBestsellers': 'Bestsellers',
    'hero.badge1': 'Since 2022',
    'hero.badge2': 'Worldwide Shipping',
    'hero.badge3': 'Premium Quality',
    'categories.title': 'Shop by Category',
    'categories.aviador': 'Men',
    'categories.aviadorDesc': 'Jackets, shirts and accessories for men',
    'categories.aviadora': 'Women',
    'categories.aviadoraDesc': 'Elegance and comfort for adventurous women',
    'categories.accessories': 'Accessories',
    'categories.accessoriesDesc': 'Exclusive complements to complete your look',
    'categories.shopNow': 'Shop Now',
    'featured.title': 'Featured Products',
    'featured.subtitle': 'Discover our most popular items',
    'featured.new': 'New',
    'featured.bestseller': 'Bestseller',
    'featured.sale': 'Sale',
    'featured.viewAll': 'View All',
    'story.title': 'Our Story',
    'story.content': 'Piloto Inteligente was born from Carlos Drummond\'s passion for aviation and fashion. As a professional pilot for over 15 years, Carlos always felt the lack of clothing that represented the adventurous spirit and elegance of aviation in everyday life.',
    'story.content2': 'In 2022, he decided to create a brand that combined the functionality of aviator clothing with contemporary design, allowing anyone to feel like a pilot, even with their feet on the ground.',
    'story.readMore': 'Read more',
    'blog.title': 'The Piloto Inteligente Blog',
    'blog.subtitle': 'Tips, stories and news from the aviation world',
    'blog.readMore': 'Read more',
    'blog.viewAll': 'View all articles',
    'newsletter.title': 'Stay in the Loop',
    'newsletter.subtitle': 'Receive our news and exclusive promotions',
    'newsletter.emailPlaceholder': 'Your best email',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.privacy': 'We respect your privacy. Read our privacy policy',
    'instagram.title': 'Follow us on Instagram',
    'instagram.subtitle': '@pilotointeligente',
    'footer.about': 'About us',
    'footer.shop': 'Shop',
    'footer.shopMen': 'Men',
    'footer.shopWomen': 'Women',
    'footer.accessories': 'Accessories',
    'footer.bestsellers': 'Bestsellers',
    'footer.newArrivals': 'New Arrivals',
    'footer.sale': 'Sale',
    'footer.information': 'Information',
    'footer.ourStory': 'Our Story',
    'footer.blog': 'Blog',
    'footer.faq': 'FAQ',
    'footer.shipping': 'Shipping',
    'footer.returns': 'Returns & Exchanges',
    'footer.terms': 'Terms & Conditions',
    'footer.contact': 'Contact',
    'footer.address': '747 Aviation Ave - New York, NY',
    'footer.hours': 'Mon - Fri: 9am to 6pm',
    'footer.copyright': '© 2023 Piloto Inteligente. All rights reserved.',
    'exitPopup.title': 'Don\'t leave yet!',
    'exitPopup.subtitle': 'We have a special offer for you',
    'exitPopup.discount': '10% OFF',
    'exitPopup.offer': 'on your first purchase',
    'exitPopup.emailPlaceholder': 'Your best email',
    'exitPopup.getDiscount': 'Get discount',
    'exitPopup.privacy': 'We respect your privacy',
    'cart.title': 'Your Cart',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping calculated at checkout',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.continueShopping': 'Continue Shopping',
    'productDetail.addToCart': 'Add to Cart',
    'productDetail.description': 'Description',
    'productDetail.relatedProducts': 'Related Products',
    'checkout.title': 'Checkout',
    'checkout.personalInfo': 'Personal Information',
    'checkout.shippingInfo': 'Shipping Information',
    'checkout.paymentInfo': 'Payment Information',
    'checkout.complete': 'Complete Order',
    'error.404.title': 'Page not found',
    'error.404.message': 'The page you are looking for does not exist.',
    'error.404.backToHome': 'Back to home page'
  }
};

// Tipo do contexto
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Criação do contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provedor do contexto
export const LanguageProvider = ({ children }) => {
  // Estado para armazenar o idioma atual
  const [language, setLanguageState] = useState<Language>('pt-BR');

  // Efeito para carregar o idioma do localStorage ao iniciar
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && LANGUAGES.includes(savedLanguage)) {
      setLanguageState(savedLanguage as Language);
    }
  }, []);

  // Função para definir o idioma
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Função para obter tradução
  const t = (key: string): string => {
    if (!translations[language][key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[language][key];
  };

  // Provedor com os valores do contexto
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para usar o contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};