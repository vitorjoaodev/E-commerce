import { useEffect } from 'react';
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
import { ShoppingCart } from 'lucide-react';

export default function CategoryPage() {
  const { language, t } = useLanguage();
  const { currency } = useCurrency();
  const { addToCart } = useCart();
  const [, params] = useRoute('/categoria/:slug');
  const slug = params?.slug;

  // Get category details
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const category = categories.find(c => c.slug === slug);

  // Get products for this category
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/category/' + (category?.id || 0)],
    enabled: !!category?.id,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-light-beige py-10">
              <p className="text-xl mb-4">Nenhum produto encontrado nesta categoria.</p>
              <Link href="/">
                <Button variant="outline" className="adventure-title border-vintage-beige text-vintage-beige hover:bg-vintage-beige hover:text-dark-gray">
                  Voltar para a página inicial
                </Button>
              </Link>
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
