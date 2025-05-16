import React from 'react';
import Link from 'next/link';

// Definindo o tipo para um post do blog
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

// Dados de exemplo para desenvolvimento
const sampleBlogPosts = [
  {
    id: 1,
    title: 'Como se preparar para seu primeiro voo solo',
    slug: 'preparacao-primeiro-voo-solo',
    excerpt: 'Dicas essenciais para pilotos iniciantes que estão prestes a encarar seu primeiro voo solo.',
    imageUrl: '/images/blog/first-solo.jpg',
    author: 'Carlos Drummond',
    createdAt: '2025-04-10T10:00:00.000Z',
    category: 'Dicas de Pilotagem'
  },
  {
    id: 2,
    title: 'A evolução dos instrumentos de navegação',
    slug: 'evolucao-instrumentos-navegacao',
    excerpt: 'Uma jornada através do tempo mostrando como a tecnologia revolucionou a navegação aérea.',
    imageUrl: '/images/blog/navigation.jpg',
    author: 'Ana Cecília',
    createdAt: '2025-04-05T14:30:00.000Z',
    category: 'Tecnologia'
  },
  {
    id: 3,
    title: 'Destinos para aviadores: Pistas panorâmicas do Brasil',
    slug: 'destinos-aviadores-pistas-panoramicas',
    excerpt: 'Conheça as pistas de pouso mais impressionantes do Brasil, com vistas de tirar o fôlego.',
    imageUrl: '/images/blog/scenic-runways.jpg',
    author: 'Rafael Santos',
    createdAt: '2025-03-28T09:15:00.000Z',
    category: 'Destinos'
  }
];

const BlogPreview = ({ blogPosts = sampleBlogPosts }) => {
  // Garantindo que blogPosts seja um array
  const posts = Array.isArray(blogPosts) ? blogPosts : sampleBlogPosts;
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-3">Blog do Aviador</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Histórias e dicas do mundo da aviação para entusiastas e profissionais
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-background-secondary rounded-lg overflow-hidden hover-scale">
              <div className="h-48 bg-gray-800 flex items-center justify-center">
                {/* Placeholder para imagem */}
                <span className="text-primary font-bold">Imagem do Post</span>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-primary">{post.category}</span>
                  <span className="text-sm text-white/50">{formatDate(post.createdAt)}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3">
                  <Link href={`/blog/${post.slug}`} className="text-white hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-white/70 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Por {post.author}</span>
                  <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                    Ler mais →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/blog" className="btn-secondary">
            Ver Todos os Artigos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;