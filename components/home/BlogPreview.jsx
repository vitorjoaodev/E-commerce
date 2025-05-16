import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

// Função de formatação de data que respeita o idioma
const formatDate = (dateString, language) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(language, options);
};

// Dados de exemplo para desenvolvimento
const sampleBlogPosts = [
  {
    id: 1,
    title: 'Como se preparar para seu primeiro voo solo',
    titleEn: 'How to prepare for your first solo flight',
    slug: 'preparacao-primeiro-voo-solo',
    excerpt: 'Dicas essenciais para pilotos iniciantes que estão prestes a encarar seu primeiro voo solo.',
    excerptEn: 'Essential tips for beginner pilots who are about to face their first solo flight.',
    imageUrl: '/images/blog/first-solo.jpg',
    author: 'Carlos Drummond',
    createdAt: '2025-04-10T10:00:00.000Z',
    category: 'Dicas de Pilotagem',
    categoryEn: 'Piloting Tips'
  },
  {
    id: 2,
    title: 'A evolução dos instrumentos de navegação',
    titleEn: 'The evolution of navigation instruments',
    slug: 'evolucao-instrumentos-navegacao',
    excerpt: 'Uma jornada através do tempo mostrando como a tecnologia revolucionou a navegação aérea.',
    excerptEn: 'A journey through time showing how technology revolutionized air navigation.',
    imageUrl: '/images/blog/navigation.jpg',
    author: 'Ana Cecília',
    createdAt: '2025-04-05T14:30:00.000Z',
    category: 'Tecnologia',
    categoryEn: 'Technology'
  },
  {
    id: 3,
    title: 'Destinos para aviadores: Pistas panorâmicas do Brasil',
    titleEn: 'Destinations for aviators: Panoramic runways of Brazil',
    slug: 'destinos-aviadores-pistas-panoramicas',
    excerpt: 'Conheça as pistas de pouso mais impressionantes do Brasil, com vistas de tirar o fôlego.',
    excerptEn: 'Discover the most impressive landing strips in Brazil, with breathtaking views.',
    imageUrl: '/images/blog/scenic-runways.jpg',
    author: 'Rafael Santos',
    createdAt: '2025-03-28T09:15:00.000Z',
    category: 'Destinos',
    categoryEn: 'Destinations'
  }
];

const BlogPreview = ({ blogPosts = sampleBlogPosts }) => {
  const { t, language } = useLanguage();
  
  // Garantindo que blogPosts seja um array
  const posts = Array.isArray(blogPosts) ? blogPosts : sampleBlogPosts;
  
  // Função para obter o título e o excerpt com base no idioma
  const getLocalizedContent = (post) => {
    if (language === 'en-US') {
      return {
        title: post.titleEn || post.title,
        excerpt: post.excerptEn || post.excerpt,
        category: post.categoryEn || post.category
      };
    }
    
    return {
      title: post.title,
      excerpt: post.excerpt,
      category: post.category
    };
  };
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-3">{t('blog.title')}</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => {
            const localizedContent = getLocalizedContent(post);
            
            return (
              <article key={post.id} className="bg-background-secondary rounded-lg overflow-hidden hover-scale">
                <div className="h-48 bg-gray-800 flex items-center justify-center">
                  {/* Placeholder para imagem */}
                  <span className="text-primary font-bold">Imagem do Post</span>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-primary">{localizedContent.category}</span>
                    <span className="text-sm text-white/50">{formatDate(post.createdAt, language)}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">
                    <Link href={`/blog/${post.slug}`} className="text-white hover:text-primary transition-colors">
                      {localizedContent.title}
                    </Link>
                  </h3>
                  
                  <p className="text-white/70 mb-4">
                    {localizedContent.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/60">
                      {language === 'pt-BR' ? 'Por' : 'By'} {post.author}
                    </span>
                    <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                      {t('blog.readMore')} →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/blog" className="btn-secondary">
            {t('blog.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;