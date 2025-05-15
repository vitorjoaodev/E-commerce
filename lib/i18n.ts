// Translation strings for the application
export type Language = 'pt-BR' | 'en-US';

type TranslationKey = 
  | 'banner.promo'
  | 'banner.discount'
  | 'search.placeholder'
  | 'nav.aviador'
  | 'nav.aviadora'
  | 'nav.accessories'
  | 'nav.blog'
  | 'nav.history'
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.shopNew'
  | 'hero.shopBestsellers'
  | 'categories.title'
  | 'categories.aviador'
  | 'categories.aviadorDesc'
  | 'categories.aviadora'
  | 'categories.aviadoraDesc'
  | 'categories.accessories'
  | 'categories.accessoriesDesc'
  | 'categories.shopNow'
  | 'featured.title'
  | 'featured.subtitle'
  | 'featured.new'
  | 'featured.bestseller'
  | 'featured.sale'
  | 'featured.viewAll'
  | 'story.title'
  | 'story.content'
  | 'story.content2'
  | 'story.readMore'
  | 'blog.title'
  | 'blog.subtitle'
  | 'blog.readMore'
  | 'blog.viewAll'
  | 'newsletter.title'
  | 'newsletter.subtitle'
  | 'newsletter.emailPlaceholder'
  | 'newsletter.subscribe'
  | 'newsletter.privacy'
  | 'instagram.title'
  | 'instagram.subtitle'
  | 'footer.about'
  | 'footer.shop'
  | 'footer.shopMen'
  | 'footer.shopWomen'
  | 'footer.accessories'
  | 'footer.bestsellers'
  | 'footer.newArrivals'
  | 'footer.sale'
  | 'footer.information'
  | 'footer.ourStory'
  | 'footer.blog'
  | 'footer.faq'
  | 'footer.shipping'
  | 'footer.returns'
  | 'footer.terms'
  | 'footer.contact'
  | 'footer.address'
  | 'footer.hours'
  | 'footer.copyright'
  | 'exitPopup.title'
  | 'exitPopup.subtitle'
  | 'exitPopup.discount'
  | 'exitPopup.offer'
  | 'exitPopup.emailPlaceholder'
  | 'exitPopup.getDiscount'
  | 'exitPopup.privacy'
  | 'cart.title'
  | 'cart.subtotal'
  | 'cart.shipping'
  | 'cart.total'
  | 'cart.checkout'
  | 'cart.continueShopping'
  | 'productDetail.addToCart'
  | 'productDetail.description'
  | 'productDetail.relatedProducts'
  | 'checkout.title'
  | 'checkout.personalInfo'
  | 'checkout.shippingInfo'
  | 'checkout.paymentInfo'
  | 'checkout.complete';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  'pt-BR': {
    'banner.promo': 'FRETE GRÁTIS EM COMPRAS ACIMA DE R$250',
    'banner.discount': '10% DE DESCONTO NA PRIMEIRA COMPRA',
    'search.placeholder': 'Pesquisar produtos...',
    'nav.aviador': 'AVIADOR',
    'nav.aviadora': 'AVIADORA',
    'nav.accessories': 'ACESSÓRIOS',
    'nav.blog': 'BLOG',
    'nav.history': 'NOSSA HISTÓRIA',
    'hero.title': 'EMBARQUE NESTA AVENTURA',
    'hero.subtitle': 'Descubra nossa coleção exclusiva de roupas e acessórios inspirados na era de ouro da aviação',
    'hero.shopNew': 'VER NOVA COLEÇÃO',
    'hero.shopBestsellers': 'MAIS VENDIDOS',
    'categories.title': 'COLEÇÕES EM DESTAQUE',
    'categories.aviador': 'AVIADOR',
    'categories.aviadorDesc': 'Jaquetas, óculos e acessórios inspirados nos pilotos lendários',
    'categories.aviadora': 'AVIADORA',
    'categories.aviadoraDesc': 'Elegância e estilo para as mulheres que desafiam os céus',
    'categories.accessories': 'ACESSÓRIOS',
    'categories.accessoriesDesc': 'Complementos autênticos para completar seu estilo de aviação',
    'categories.shopNow': 'VER COLEÇÃO',
    'featured.title': 'PRODUTOS EM DESTAQUE',
    'featured.subtitle': 'Nossa seleção dos itens mais procurados, escolhidos a dedo para os verdadeiros entusiastas da aviação vintage',
    'featured.new': 'NOVO',
    'featured.bestseller': 'MAIS VENDIDO',
    'featured.sale': 'PROMOÇÃO',
    'featured.viewAll': 'VER TODOS OS PRODUTOS',
    'story.title': 'NOSSA HISTÓRIA',
    'story.content': 'A Piloto Inteligente nasceu da paixão por aviação e aventura. Inspirados pelos pioneiros que conquistaram os céus, criamos peças que capturam o espírito audacioso e elegante da era de ouro da aviação.',
    'story.content2': 'Cada produto é cuidadosamente desenhado para combinar autenticidade histórica com funcionalidade moderna, criando uma experiência única para os entusiastas da aviação vintage.',
    'story.readMore': 'CONHEÇA NOSSA TRAJETÓRIA',
    'blog.title': 'BLOG DE AVENTURAS',
    'blog.subtitle': 'Histórias e curiosidades sobre o mundo da aviação, aventuras e estilo vintage',
    'blog.readMore': 'Ler mais →',
    'blog.viewAll': 'VER TODOS OS ARTIGOS',
    'newsletter.title': 'EMBARQUE NESTA JORNADA',
    'newsletter.subtitle': 'Inscreva-se para receber novidades, promoções exclusivas e conteúdo sobre o mundo da aviação vintage',
    'newsletter.emailPlaceholder': 'Seu melhor e-mail',
    'newsletter.subscribe': 'RECEBER NOVIDADES',
    'newsletter.privacy': 'Respeitamos sua privacidade. Você pode cancelar a inscrição a qualquer momento.',
    'instagram.title': '@PILOTOINTELIGENTE',
    'instagram.subtitle': 'Siga-nos no Instagram e compartilhe suas aventuras usando #PilotoStyle',
    'footer.about': 'Revivendo o espírito da era de ouro da aviação através de produtos autênticos e de alta qualidade para os verdadeiros aventureiros.',
    'footer.shop': 'LOJA',
    'footer.shopMen': 'Aviador',
    'footer.shopWomen': 'Aviadora',
    'footer.accessories': 'Acessórios',
    'footer.bestsellers': 'Mais Vendidos',
    'footer.newArrivals': 'Novidades',
    'footer.sale': 'Promoções',
    'footer.information': 'INFORMAÇÕES',
    'footer.ourStory': 'Nossa História',
    'footer.blog': 'Blog',
    'footer.faq': 'Perguntas Frequentes',
    'footer.shipping': 'Envio e Entregas',
    'footer.returns': 'Política de Trocas',
    'footer.terms': 'Termos de Serviço',
    'footer.contact': 'CONTATO',
    'footer.address': 'Rua dos Aventureiros, 123\nSão Paulo, SP - Brasil',
    'footer.hours': 'Seg-Sex: 9h às 18h',
    'footer.copyright': '© 2023 Piloto Inteligente. Todos os direitos reservados.',
    'exitPopup.title': 'ESPERE!',
    'exitPopup.subtitle': 'Que tal um desconto exclusivo?',
    'exitPopup.discount': 'DE DESCONTO NA SUA PRIMEIRA COMPRA',
    'exitPopup.offer': 'Inscreva-se para receber nossa newsletter e ganhe 15% de desconto no seu primeiro pedido.',
    'exitPopup.emailPlaceholder': 'Seu melhor e-mail',
    'exitPopup.getDiscount': 'QUERO MEU DESCONTO!',
    'exitPopup.privacy': 'Respeitamos sua privacidade. Você pode cancelar a inscrição a qualquer momento.',
    'cart.title': 'CARRINHO',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Frete',
    'cart.total': 'Total',
    'cart.checkout': 'FINALIZAR COMPRA',
    'cart.continueShopping': 'CONTINUAR COMPRANDO',
    'productDetail.addToCart': 'ADICIONAR AO CARRINHO',
    'productDetail.description': 'Descrição',
    'productDetail.relatedProducts': 'Produtos Relacionados',
    'checkout.title': 'FINALIZAR COMPRA',
    'checkout.personalInfo': 'Informações Pessoais',
    'checkout.shippingInfo': 'Endereço de Entrega',
    'checkout.paymentInfo': 'Método de Pagamento',
    'checkout.complete': 'CONCLUIR PEDIDO',
  },
  'en-US': {
    'banner.promo': 'FREE SHIPPING ON ORDERS OVER $50',
    'banner.discount': '10% OFF YOUR FIRST PURCHASE',
    'search.placeholder': 'Search products...',
    'nav.aviador': 'AVIATOR MEN',
    'nav.aviadora': 'AVIATOR WOMEN',
    'nav.accessories': 'ACCESSORIES',
    'nav.blog': 'BLOG',
    'nav.history': 'OUR STORY',
    'hero.title': 'EMBARK ON THIS ADVENTURE',
    'hero.subtitle': 'Discover our exclusive collection of clothing and accessories inspired by the golden age of aviation',
    'hero.shopNew': 'VIEW NEW COLLECTION',
    'hero.shopBestsellers': 'BESTSELLERS',
    'categories.title': 'FEATURED COLLECTIONS',
    'categories.aviador': 'AVIATOR MEN',
    'categories.aviadorDesc': 'Jackets, goggles and accessories inspired by legendary pilots',
    'categories.aviadora': 'AVIATOR WOMEN',
    'categories.aviadoraDesc': 'Elegance and style for women who challenge the skies',
    'categories.accessories': 'ACCESSORIES',
    'categories.accessoriesDesc': 'Authentic complements to complete your aviation style',
    'categories.shopNow': 'VIEW COLLECTION',
    'featured.title': 'FEATURED PRODUCTS',
    'featured.subtitle': 'Our selection of the most sought-after items, handpicked for true vintage aviation enthusiasts',
    'featured.new': 'NEW',
    'featured.bestseller': 'BESTSELLER',
    'featured.sale': 'SALE',
    'featured.viewAll': 'VIEW ALL PRODUCTS',
    'story.title': 'OUR STORY',
    'story.content': 'Piloto Inteligente was born from a passion for aviation and adventure. Inspired by the pioneers who conquered the skies, we create pieces that capture the bold and elegant spirit of the golden age of aviation.',
    'story.content2': 'Each product is carefully designed to combine historical authenticity with modern functionality, creating a unique experience for vintage aviation enthusiasts.',
    'story.readMore': 'DISCOVER OUR JOURNEY',
    'blog.title': 'ADVENTURE BLOG',
    'blog.subtitle': 'Stories and curiosities about the world of aviation, adventures and vintage style',
    'blog.readMore': 'Read more →',
    'blog.viewAll': 'VIEW ALL ARTICLES',
    'newsletter.title': 'JOIN THIS JOURNEY',
    'newsletter.subtitle': 'Subscribe to receive news, exclusive promotions and content about the world of vintage aviation',
    'newsletter.emailPlaceholder': 'Your best email',
    'newsletter.subscribe': 'GET UPDATES',
    'newsletter.privacy': 'We respect your privacy. You can unsubscribe at any time.',
    'instagram.title': '@PILOTOINTELIGENTE',
    'instagram.subtitle': 'Follow us on Instagram and share your adventures using #PilotoStyle',
    'footer.about': 'Reviving the spirit of the golden age of aviation through authentic, high-quality products for true adventurers.',
    'footer.shop': 'SHOP',
    'footer.shopMen': 'Aviator Men',
    'footer.shopWomen': 'Aviator Women',
    'footer.accessories': 'Accessories',
    'footer.bestsellers': 'Bestsellers',
    'footer.newArrivals': 'New Arrivals',
    'footer.sale': 'Sale',
    'footer.information': 'INFORMATION',
    'footer.ourStory': 'Our Story',
    'footer.blog': 'Blog',
    'footer.faq': 'FAQ',
    'footer.shipping': 'Shipping & Delivery',
    'footer.returns': 'Returns Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'CONTACT',
    'footer.address': 'Adventurers Street, 123\nSão Paulo, SP - Brazil',
    'footer.hours': 'Mon-Fri: 9am to 6pm',
    'footer.copyright': '© 2023 Piloto Inteligente. All rights reserved.',
    'exitPopup.title': 'WAIT!',
    'exitPopup.subtitle': 'How about an exclusive discount?',
    'exitPopup.discount': 'OFF YOUR FIRST PURCHASE',
    'exitPopup.offer': 'Subscribe to our newsletter and get 15% off on your first order.',
    'exitPopup.emailPlaceholder': 'Your best email',
    'exitPopup.getDiscount': 'I WANT MY DISCOUNT!',
    'exitPopup.privacy': 'We respect your privacy. You can unsubscribe at any time.',
    'cart.title': 'CART',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.total': 'Total',
    'cart.checkout': 'CHECKOUT',
    'cart.continueShopping': 'CONTINUE SHOPPING',
    'productDetail.addToCart': 'ADD TO CART',
    'productDetail.description': 'Description',
    'productDetail.relatedProducts': 'Related Products',
    'checkout.title': 'CHECKOUT',
    'checkout.personalInfo': 'Personal Information',
    'checkout.shippingInfo': 'Shipping Address',
    'checkout.paymentInfo': 'Payment Method',
    'checkout.complete': 'COMPLETE ORDER',
  }
};

export function getTranslation(language: Language, key: TranslationKey): string {
  return translations[language][key] || key;
}