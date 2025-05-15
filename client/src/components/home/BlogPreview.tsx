import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import { BlogPost } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

export default function BlogPreview() {
  const { t, language } = useLanguage();
  
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/recent'],
  });

  if (isLoading) {
    return (
      <section className="py-16 container mx-auto px-4">
        <h2 className="adventure-title text-4xl text-center text-vintage-beige mb-4">
          {t('blog.title')}
        </h2>
        <p className="text-center text-light-beige mb-12 max-w-2xl mx-auto">
          {t('blog.subtitle')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-dark-gray/20 animate-pulse h-80 rounded-lg"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="adventure-title text-4xl text-center text-vintage-beige mb-4">
        {t('blog.title')}
      </h2>
      <p className="text-center text-light-beige mb-12 max-w-2xl mx-auto">
        {t('blog.subtitle')}
      </p>
      
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
      
      <div className="text-center mt-12">
        <Link href="/blog">
          <Button 
            variant="outline"
            className="adventure-title inline-block px-8 py-3 border-2 border-vintage-beige text-vintage-beige hover:bg-vintage-beige hover:text-dark-gray transition duration-300 rounded-md"
          >
            {t('blog.viewAll')}
          </Button>
        </Link>
      </div>
    </section>
  );
}
