import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@shared/schema';
import { formatCurrency } from '@/lib/currency';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function FeaturedProducts() {
  const { t } = useLanguage();
  const { currency } = useCurrency();
  const { addToCart } = useCart();
  
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
  });

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

  if (isLoading) {
    return (
      <section className="py-16 bg-dark-gray/50">
        <div className="container mx-auto px-4">
          <h2 className="adventure-title text-4xl text-center text-vintage-beige mb-4">
            {t('featured.title')}
          </h2>
          <p className="text-center text-light-beige mb-12 max-w-2xl mx-auto">
            {t('featured.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-dark-gray/20 animate-pulse h-80 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-dark-gray/50">
      <div className="container mx-auto px-4">
        <h2 className="adventure-title text-4xl text-center text-vintage-beige mb-4">
          {t('featured.title')}
        </h2>
        <p className="text-center text-light-beige mb-12 max-w-2xl mx-auto">
          {t('featured.subtitle')}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
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
                  {/* Get category name */}
                  {product.categoryId === 1 ? 'Aviador' : 
                   product.categoryId === 2 ? 'Aviadora' : 'Acessórios'}
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
        
        <div className="text-center mt-12">
          <Link href="/produtos">
            <Button className="adventure-title inline-block px-8 py-3 bg-adventure-yellow text-dark-gray hover:bg-aviation-blue hover:text-light-beige transition duration-300 rounded-md">
              {t('featured.viewAll')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
