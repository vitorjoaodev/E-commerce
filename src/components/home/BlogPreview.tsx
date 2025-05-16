import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '../../lib/utils';

export default function BlogPreview() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['/api/blog/recent'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-[#0a0a0c]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-2 border-[#FFD700] flex items-center justify-center mb-6 animate-pulse">
              <span className="text-2xl text-[#FFD700]">✦</span>
            </div>
            <div className="h-8 w-60 bg-gray-800 rounded-md animate-pulse mb-6"></div>
            <div className="h-4 w-80 bg-gray-800 rounded-md animate-pulse mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg animate-pulse h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#0a0a0c]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <div className="w-12 h-12 rounded-full border-2 border-[#FFD700] flex items-center justify-center mb-6">
            <span className="text-2xl text-[#FFD700]">✦</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">BLOG DA AVIAÇÃO</h2>
          <div className="w-24 h-1 bg-[#FFD700] mb-6"></div>
          <p className="text-gray-400 text-center max-w-2xl">
            Histórias, curiosidades e novidades do mundo da aviação.
            Compartilhamos nossa paixão pelos céus com você.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <div key={post.id} className="group bg-[#121212] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
              {/* Blog Image */}
              <div className="h-48 overflow-hidden relative">
                {post.imageUrl ? (
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
                    <span className="text-gray-500">Sem imagem</span>
                  </div>
                )}
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000]/80"></div>
                
                {/* Date badge */}
                <div className="absolute top-4 left-4 z-10 bg-[#FFD700] text-black px-3 py-1 rounded-sm font-medium text-xs uppercase tracking-wider">
                  {formatDate(post.createdAt)}
                </div>
              </div>
              
              {/* Blog Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#FFD700] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.slug}`} className="text-[#FFD700] font-semibold flex items-center hover:text-white transition-colors">
                  Ler mais
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
              
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-12 h-12">
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#FFD700] opacity-30"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link to="/blog" className="group relative">
            <button className="px-8 py-3 bg-[#1e1e1e] text-[#FFD700] border-2 border-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all duration-300 rounded-sm uppercase font-semibold">
              Ver Todas as Publicações
            </button>
            {/* Button subtle glow effect */}
            <div className="absolute -inset-1 rounded-sm bg-[#FFD700]/20 blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}