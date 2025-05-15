import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';

export default function FeaturedProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products/featured'],
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg animate-pulse h-[400px]"></div>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">PRODUTOS EM DESTAQUE</h2>
          <div className="w-24 h-1 bg-[#FFD700] mb-6"></div>
          <p className="text-gray-400 text-center max-w-2xl">
            Conheça nossas peças mais exclusivas, inspiradas na era dourada da aviação, 
            com qualidade premium e design atemporal.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <div key={product.id} className="group bg-[#121212] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
              {/* Sale badge if discounted */}
              {product.discountPrice && (
                <div className="absolute top-4 right-4 z-10 bg-[#FFD700] text-black px-3 py-1 rounded-sm font-bold text-sm uppercase transform rotate-3">
                  Oferta
                </div>
              )}
              
              {/* Product Image */}
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Quick action overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link to={`/produto/${product.slug}`}>
                    <button className="bg-[#FFD700] text-black px-6 py-2 rounded-sm font-bold uppercase text-sm transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Ver Detalhes
                    </button>
                  </Link>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-6 border-t border-[#333]">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#FFD700] transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    {product.discountPrice ? (
                      <>
                        <span className="text-[#FFD700] font-bold text-xl">
                          {product.discountPrice}
                        </span>
                        <span className="text-gray-500 line-through text-sm">
                          {product.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-[#FFD700] font-bold text-xl">
                        {product.price}
                      </span>
                    )}
                  </div>
                  
                  <button 
                    className="w-10 h-10 bg-[#333] hover:bg-[#FFD700] text-white hover:text-black rounded-full flex items-center justify-center transition-colors"
                    aria-label="Adicionar ao carrinho"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Decorative corner */}
              <div className="absolute bottom-0 left-0 w-12 h-12">
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#FFD700] opacity-30"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link to="/produtos" className="group relative">
            <button className="px-8 py-3 bg-transparent border-2 border-[#FFD700] text-[#FFD700] font-bold uppercase hover:bg-[#FFD700] hover:text-black transition-all duration-300 rounded-sm relative z-10">
              Ver Todos os Produtos
            </button>
            {/* Button glow effect */}
            <div className="absolute -inset-1 rounded-sm bg-[#FFD700]/20 blur opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}