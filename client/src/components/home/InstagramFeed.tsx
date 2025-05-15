import { Instagram } from 'lucide-react';

export default function InstagramFeed() {
  // Normalmente teríamos uma API para buscar o feed do Instagram,
  // mas vamos usar imagens estáticas para o propósito desta demonstração
  const instagramPosts = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1612212757136-6ffe5ad65734?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      likes: 234,
      comments: 12,
      link: 'https://instagram.com'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1521146544118-1e30188aa3d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      likes: 198,
      comments: 8,
      link: 'https://instagram.com'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1592477480376-7948d0a2629b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      likes: 342,
      comments: 27,
      link: 'https://instagram.com'
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1601749715242-3050d3819173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      likes: 156,
      comments: 5,
      link: 'https://instagram.com'
    },
    {
      id: 5,
      imageUrl: 'https://images.unsplash.com/photo-1548625361-58a9b86aa83b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      likes: 278,
      comments: 18,
      link: 'https://instagram.com'
    },
    {
      id: 6,
      imageUrl: 'https://images.unsplash.com/photo-1566677914817-56426959ae9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      likes: 312,
      comments: 24,
      link: 'https://instagram.com'
    }
  ];

  return (
    <section className="py-16 bg-[#0a0a0c]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <div className="w-12 h-12 rounded-full border-2 border-[#FFD700] flex items-center justify-center mb-6">
            <Instagram className="text-[#FFD700] w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">SIGA-NOS NO INSTAGRAM</h2>
          <div className="w-24 h-1 bg-[#FFD700] mb-6"></div>
          <p className="text-gray-400 text-center max-w-2xl">
            Compartilhe suas aventuras usando a hashtag <span className="text-[#FFD700] font-semibold">#PilotoInteligente</span> 
            e participe da nossa comunidade de entusiastas da aviação.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <a 
              key={post.id} 
              href={post.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden"
            >
              <img 
                src={post.imageUrl} 
                alt="Instagram post" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-sm">{post.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-sm">{post.comments}</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FFD700]"></div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-[#FFD700] font-semibold hover:text-white transition-colors"
          >
            <span>Ver mais no Instagram</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}