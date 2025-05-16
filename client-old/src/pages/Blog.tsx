import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/context/LanguageContext';
import { BlogPost } from '@shared/schema';
import { formatDate } from '@/lib/utils';

export default function Blog() {
  const { language, t } = useLanguage();
  
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  // Set page title
  useEffect(() => {
    document.title = language === 'pt-BR' 
      ? 'Blog - Piloto Inteligente' 
      : 'Blog - Piloto Inteligente';
  }, [language]);

  return (
    <>
      <Helmet>
        <title>{language === 'pt-BR' ? 'Blog - Piloto Inteligente' : 'Blog - Piloto Inteligente'}</title>
        <meta 
          name="description" 
          content={language === 'pt-BR' 
            ? 'Histórias e curiosidades sobre o mundo da aviação, aventuras e estilo vintage' 
            : 'Stories and curiosities about the world of aviation, adventures and vintage style'}
        />
        <meta property="og:title" content="Blog - Piloto Inteligente" />
        <meta property="og:description" content={language === 'pt-BR' 
          ? 'Histórias e curiosidades sobre o mundo da aviação, aventuras e estilo vintage' 
          : 'Stories and curiosities about the world of aviation, adventures and vintage style'} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div 
        className="relative bg-cover bg-center h-[40vh]" 
        style={{ backgroundImage: "url('https://pixabay.com/get/g74d8d70a88a4eba647cc02061c6ef2dfcdc913810b41af86e3cfa41a64dc0abd244218b07a39122377bde48ab86d2c695d29e8334b04547bd2798cbacce7a95f_1280.jpg')" }}
      >
        <div className="absolute inset-0 bg-dark-gray/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="adventure-title text-4xl md:text-6xl text-adventure-yellow mb-4">
              {t('blog.title')}
            </h1>
            <p className="text-lg md:text-xl text-light-beige max-w-2xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-dark-gray/20 animate-pulse h-80 rounded-lg"></div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-light-beige">
            <p className="text-xl mb-4">Nenhum artigo encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-dark-gray border border-vintage-beige/20 rounded-lg overflow-hidden group hover:border-adventure-yellow transition duration-300">
                <Link href={`/blog/${post.slug}`}>
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-48 object-cover transition duration-500 group-hover:scale-110"
                  />
                </Link>
                <div className="p-6">
                  <div className="vintage-text text-xs text-adventure-yellow mb-2">
                    {formatDate(post.createdAt, language)}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="adventure-title text-xl text-vintage-beige group-hover:text-adventure-yellow transition duration-300 mb-3">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-light-beige/70 text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="vintage-text text-adventure-yellow hover:underline">
                    {t('blog.readMore')}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
