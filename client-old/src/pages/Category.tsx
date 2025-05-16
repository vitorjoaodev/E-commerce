import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';
import { Product, Category } from '@shared/schema';
import { formatCurrency } from '@/lib/currency';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Tag, Star, TrendingUp } from 'lucide-react';

export default function CategoryPage() {
  const { language, t } = useLanguage();
  const { currency } = useCurrency();
  const { addToCart } = useCart();
  const [, params] = useRoute('/categoria/:slug');
  const slug = params?.slug;
  
  // Filter states
  const [activeFilters, setActiveFilters] = useState<{
    new: boolean;
    sale: boolean;
    bestseller: boolean;
  }>({
    new: false,
    sale: false,
    bestseller: false
  });

  // Get category details
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const category = categories.find(c => c.slug === slug);

  // Get products for this category
  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/category/' + (category?.id || 0)],
    enabled: !!category?.id,
  });
  
  // Filter products based on active filters
  const products = allProducts.filter(product => {
    // If no filters are active, show all products
    if (!activeFilters.new && !activeFilters.sale && !activeFilters.bestseller) {
      return true;
    }
    
    // Apply filters
    if (activeFilters.new && product.isNew) {
      return true;
    }
    if (activeFilters.sale && product.discountPrice) {
      return true;
    }
    if (activeFilters.bestseller && product.isBestseller) {
      return true;
    }
    
    return false;
  });

  // Set page title when category is loaded
  useEffect(() => {
    if (category) {
      document.title = `${category.name} - Piloto Inteligente`;
    }
  }, [category]);
  
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

  if (!slug) {
    return <div>Categoria não encontrada</div>;
  }

  // Loading state
  if (isLoading || !category) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="h-10 w-1/3 bg-dark-gray/20 animate-pulse mb-8"></div>
        <div className="h-5 w-2/3 bg-dark-gray/20 animate-pulse mb-12"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-dark-gray/20 animate-pulse h-80 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${category.name} - Piloto Inteligente`}</title>
        <meta 
          name="description" 
          content={category.description || `Explore nossa coleção de ${category.name.toLowerCase()} com estética de aviação vintage.`} 
        />
        <meta property="og:title" content={`${category.name} - Piloto Inteligente`} />
        <meta property="og:description" content={category.description || `Explore nossa coleção de ${category.name.toLowerCase()} com estética de aviação vintage.`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={category.imageUrl || ''} />
      </Helmet>

      <div 
        className="relative bg-cover bg-center h-[40vh]" 
        style={{ backgroundImage: `url('${category.imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-dark-gray/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="adventure-title text-4xl md:text-6xl text-adventure-yellow mb-4">
              {category.name.toUpperCase()}
            </h1>
            {category.description && (
              <p className="text-lg md:text-xl text-light-beige max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            variant={activeFilters.new ? "default" : "outline"}
            className={`flex items-center gap-2 ${
              activeFilters.new 
                ? "bg-[#D6BD94] text-black hover:bg-[#c4aa80]" 
                : "border-[#D6BD94] text-[#D6BD94] hover:bg-[#D6BD94]/10"
            }`}
            onClick={() => setActiveFilters(prev => ({ ...prev, new: !prev.new }))}
          >
            <Tag size={16} />
            Novo
          </Button>
          
          <Button
            variant={activeFilters.sale ? "default" : "outline"}
            className={`flex items-center gap-2 ${
              activeFilters.sale 
                ? "bg-[#D6BD94] text-black hover:bg-[#c4aa80]" 
                : "border-[#D6BD94] text-[#D6BD94] hover:bg-[#D6BD94]/10"
            }`}
            onClick={() => setActiveFilters(prev => ({ ...prev, sale: !prev.sale }))}
          >
            <Star size={16} />
            Promoção
          </Button>
          
          <Button
            variant={activeFilters.bestseller ? "default" : "outline"}
            className={`flex items-center gap-2 ${
              activeFilters.bestseller 
                ? "bg-[#D6BD94] text-black hover:bg-[#c4aa80]" 
                : "border-[#D6BD94] text-[#D6BD94] hover:bg-[#D6BD94]/10"
            }`}
            onClick={() => setActiveFilters(prev => ({ ...prev, bestseller: !prev.bestseller }))}
          >
            <TrendingUp size={16} />
            Mais Vendidos
          </Button>
          
          {(activeFilters.new || activeFilters.sale || activeFilters.bestseller) && (
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white"
              onClick={() => setActiveFilters({ new: false, sale: false, bestseller: false })}
            >
              Limpar filtros
            </Button>
          )}
          
          {/* Count of products being shown */}
          <div className="ml-auto text-[#D6BD94]">
            {products.length} produto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-light-beige py-10">
              {activeFilters.new || activeFilters.sale || activeFilters.bestseller ? (
                <>
                  <p className="text-xl mb-4">Nenhum produto encontrado com os filtros selecionados.</p>
                  <Button 
                    variant="outline" 
                    className="border-[#D6BD94] text-[#D6BD94] hover:bg-[#D6BD94]/10"
                    onClick={() => setActiveFilters({ new: false, sale: false, bestseller: false })}
                  >
                    Limpar filtros
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-xl mb-4">Nenhum produto encontrado nesta categoria.</p>
                  <Link href="/">
                    <Button variant="outline" className="border-[#D6BD94] text-[#D6BD94] hover:bg-[#D6BD94]/10">
                      Voltar para a página inicial
                    </Button>
                  </Link>
                </>
              )}
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="group bg-dark-gray border border-vintage-beige/20 rounded-lg overflow-hidden hover:border-adventure-yellow transition duration-300">
                <Link href={`/produto/${product.slug}`}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      {product.isNew && (
                        <Badge className="bg-adventure-yellow text-dark-gray text-xs adventure-title">
                          {t('featured.new')}
                        </Badge>
                      )}
                      {product.isBestseller && (
                        <Badge className="bg-aviation-blue text-light-beige text-xs adventure-title ml-2">
                          {t('featured.bestseller')}
                        </Badge>
                      )}
                      {product.discountPrice && (
                        <Badge className="bg-vintage-beige text-dark-gray text-xs adventure-title ml-2">
                          {t('featured.sale')}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>
                <div className="p-5">
                  <Link href={`/produto/${product.slug}`}>
                    <h3 className="adventure-title text-xl text-vintage-beige group-hover:text-adventure-yellow transition duration-300">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-light-beige/70 mb-3 vintage-text">
                    {category.name}
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
            ))
          )}
        </div>
      </div>
    </>
  );
}
