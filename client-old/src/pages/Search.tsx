import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { Product } from '@shared/schema';
import { Search as SearchIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/currency';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { ShoppingCart } from 'lucide-react';

export default function SearchPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const { currency } = useCurrency();
  const { addToCart } = useCart();
  
  // Get query param from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
  }, []);
  
  // Get all products for searching
  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  // Filter products based on search query
  const searchResults = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    const newUrl = searchQuery ? `/pesquisa?q=${encodeURIComponent(searchQuery)}` : '/pesquisa';
    window.history.replaceState(null, '', newUrl);
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
    setLocation('/pesquisa');
  };
  
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.discountPrice || product.price,
      originalPrice: product.discountPrice ? product.price : undefined,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  };
  
  return (
    <>
      <Helmet>
        <title>Pesquisa | Piloto Inteligente</title>
        <meta 
          name="description" 
          content="Pesquise produtos na loja Piloto Inteligente - roupas e acessórios com estética de aviação vintage." 
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-[#D6BD94] mb-8">Pesquisar Produtos</h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Digite o que você procura..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 pl-12 pr-10 text-white bg-[#161618] border border-[#333] rounded-lg focus:outline-none focus:border-[#D6BD94] transition-colors"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D6BD94]">
              <SearchIcon size={20} />
            </div>
            {searchQuery && (
              <button 
                type="button" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                onClick={handleClearSearch}
              >
                <X size={18} />
              </button>
            )}
          </div>
          <div className="text-center mt-4">
            <Button 
              type="submit" 
              className="bg-[#D6BD94] text-black hover:bg-[#C4AA80] transition-colors"
            >
              Pesquisar
            </Button>
          </div>
        </form>
        
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-xl text-white mb-2">
              {searchResults.length === 0 
                ? "Nenhum resultado encontrado para" 
                : `${searchResults.length} resultado${searchResults.length !== 1 ? 's' : ''} para`
              }
              <span className="text-[#D6BD94] ml-2">"{searchQuery}"</span>
            </h2>
          </div>
        )}
        
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {searchResults.map((product) => (
              <div key={product.id} className="group bg-dark-gray border border-vintage-beige/20 rounded-lg overflow-hidden hover:border-adventure-yellow transition duration-300">
                <Link href={`/produto/${product.slug}`}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                </Link>
                <div className="p-5">
                  <Link href={`/produto/${product.slug}`}>
                    <h3 className="adventure-title text-xl text-vintage-beige group-hover:text-adventure-yellow transition duration-300">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-light-beige/70 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-adventure-yellow font-bold">
                        {formatCurrency(Number(product.discountPrice || product.price), currency)}
                      </p>
                      {product.discountPrice && (
                        <p className="text-sm text-light-beige/50 line-through">
                          {formatCurrency(Number(product.price), currency)}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-vintage-beige text-dark-gray p-2 rounded-full hover:bg-adventure-yellow transition duration-300"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">Tente pesquisar por outro termo ou navegue pelas categorias abaixo:</p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Link to="/categoria/aviador">
                  <Button variant="outline" className="border-[#D6BD94] text-[#D6BD94] hover:bg-[#D6BD94]/10">
                    Coleção Masculina
                  </Button>
                </Link>
                <Link to="/categoria/aviadora">
                  <Button variant="outline" className="border-[#D6BD94] text-[#D6BD94] hover:bg-[#D6BD94]/10">
                    Coleção Feminina
                  </Button>
                </Link>
                <Link to="/categoria/acessorios">
                  <Button variant="outline" className="border-[#D6BD94] text-[#D6BD94] hover:bg-[#D6BD94]/10">
                    Acessórios
                  </Button>
                </Link>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}