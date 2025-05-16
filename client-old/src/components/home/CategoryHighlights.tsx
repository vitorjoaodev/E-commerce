import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';

export default function CategoryHighlights() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['/api/categories'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-2 border-[#FFD700] flex items-center justify-center mb-6 animate-pulse">
              <span className="text-2xl text-[#FFD700]">✦</span>
            </div>
            <div className="h-8 w-60 bg-gray-800 rounded-md animate-pulse mb-6"></div>
            <div className="h-4 w-80 bg-gray-800 rounded-md animate-pulse mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="h-80 bg-gray-800 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <div className="w-12 h-12 rounded-full border-2 border-[#FFD700] flex items-center justify-center mb-6">
            <span className="text-2xl text-[#FFD700]">✦</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">NOSSAS COLEÇÕES</h2>
          <div className="w-24 h-1 bg-[#FFD700] mb-6"></div>
          <p className="text-gray-400 text-center max-w-2xl">
            Explore nossas coleções de roupas e acessórios inspirados na era dourada da aviação.
            Peças exclusivas para aviadores e aviadoras, com design atemporal e qualidade premium.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories?.map((category) => (
            <div key={category.id} className="group relative overflow-hidden rounded-lg h-80 shadow-lg shadow-black/60">
              {/* Category image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                style={{ 
                  backgroundImage: `url(${category.imageUrl})`,
                  filter: 'brightness(0.6)' 
                }}
              />
              
              {/* Gold gradient overlay effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000]/20 to-[#000]/80 group-hover:from-[#FFD700]/20 group-hover:to-[#000] transition-all duration-500"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#FFD700] transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-300 mb-4 text-sm md:text-base max-w-xs">
                  {category.description}
                </p>
                <Link to={`/categoria/${category.slug}`} className="w-fit">
                  <button className="px-6 py-2 border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all duration-300 uppercase font-semibold text-sm md:text-base flex items-center">
                    Explorar
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </Link>
              </div>
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#FFD700] opacity-50"></div>
                <div className="absolute top-3 right-3 w-3 h-3 border-2 border-[#FFD700] rounded-full opacity-80"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}