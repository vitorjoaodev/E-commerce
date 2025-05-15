import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/context/LanguageContext';
import { BlogPost } from '@shared/schema';
import { formatDate } from '@/lib/utils';

export default function BlogPostPage() {
  const { language } = useLanguage();
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug;
  
  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: ['/api/blog/' + slug],
    enabled: !!slug,
  });

  // Get recent blog posts for sidebar
  const { data: recentPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/recent'],
  });

  // Set page title when post is loaded
  useEffect(() => {
    if (post) {
      document.title = `${post.title} - Piloto Inteligente`;
    }
  }, [post]);

  if (isLoading || !post) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="h-8 w-2/3 bg-dark-gray/20 animate-pulse mb-4"></div>
          <div className="h-6 w-1/3 bg-dark-gray/20 animate-pulse mb-8"></div>
          <div className="h-[300px] w-full bg-dark-gray/20 animate-pulse mb-8 rounded-lg"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 w-full bg-dark-gray/20 animate-pulse mb-3"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${post.title} - Piloto Inteligente`}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} - Piloto Inteligente`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.imageUrl || ''} />
        <meta property="article:published_time" content={new Date(post.createdAt).toISOString()} />
      </Helmet>

      <div 
        className="relative bg-cover bg-center h-[50vh]" 
        style={{ backgroundImage: `url('${post.imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-dark-gray/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl">
            <h1 className="adventure-title text-3xl md:text-5xl text-adventure-yellow mb-4">
              {post.title}
            </h1>
            <p className="text-vintage-beige mb-2">
              {formatDate(post.createdAt, language)}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-light-beige/90 mb-6 font-semibold">
                {post.excerpt}
              </p>
              <div className="text-light-beige/80 leading-relaxed space-y-6">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-dark-gray border border-vintage-beige/20 rounded-lg p-6">
              <h3 className="adventure-title text-xl text-adventure-yellow mb-4">
                Artigos Recentes
              </h3>
              <div className="space-y-4">
                {recentPosts
                  .filter(recentPost => recentPost.id !== post.id)
                  .slice(0, 3)
                  .map(recentPost => (
                    <div key={recentPost.id} className="flex border-b border-vintage-beige/10 pb-4">
                      <Link href={`/blog/${recentPost.slug}`}>
                        <img 
                          src={recentPost.imageUrl || ''} 
                          alt={recentPost.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </Link>
                      <div className="ml-4">
                        <Link href={`/blog/${recentPost.slug}`}>
                          <h4 className="text-vintage-beige hover:text-adventure-yellow transition duration-300">
                            {recentPost.title}
                          </h4>
                        </Link>
                        <p className="text-xs text-light-beige/60 mt-1">
                          {formatDate(recentPost.createdAt, language)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
