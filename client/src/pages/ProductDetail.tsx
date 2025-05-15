import { useState, useEffect } from 'react';
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
import { Minus, Plus, ShoppingCart } from 'lucide-react';

export default function ProductDetail() {
  const { language, t } = useLanguage();
  const { currency } = useCurrency();
  const { addToCart } = useCart();
  const [, params] = useRoute('/produto/:slug');
  const slug = params?.slug;

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('');

  // Get product details
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['/api/products/' + slug],
    enabled: !!slug,
  });

  // Get category details
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Get related products (same category)
  const { data: relatedProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products/category/' + (product?.categoryId || 0)],
    enabled: !!product?.categoryId,
  });

  // Set page title when product is loaded
  useEffect(() => {
    if (product) {
      document.title = `${product.name} - Piloto Inteligente`;
    }
  }, [product]);

  const category = categories.find(c => c.id === product?.categoryId);
  
  // Filter out current product from related products
  const filteredRelatedProducts = relatedProducts.filter(p => p.id !== product?.id).slice(0, 4);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.discountPrice || product.price,
      originalPrice: product.discountPrice ? product.price : undefined,
      imageUrl: product.imageUrl,
      quantity,
      variant: selectedVariant || undefined,
    });
  };

  if (isLoading || !product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-dark-gray/20 animate-pulse h-[500px] rounded-lg"></div>
          <div>
            <div className="h-10 w-3/4 bg-dark-gray/20 animate-pulse mb-4"></div>
            <div className="h-6 w-1/3 bg-dark-gray/20 animate-pulse mb-6"></div>
            <div className="h-6 w-1/4 bg-dark-gray/20 animate-pulse mb-8"></div>
            <div className="h-24 w-full bg-dark-gray/20 animate-pulse mb-8"></div>
            <div className="h-12 w-full bg-dark-gray/20 animate-pulse mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${product.name} - Piloto Inteligente`}</title>
        <meta name="description" content={product.description.substring(0, 160)} />
        <meta property="og:title" content={`${product.name} - Piloto Inteligente`} />
        <meta property="og:description" content={product.description.substring(0, 160)} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={product.imageUrl} />
        <meta property="product:price:amount" content={product.discountPrice || product.price} />
        <meta property="product:price:currency" content={currency} />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumbs */}
        <div className="text-vintage-beige/60 mb-6">
          <Link href="/" className="hover:text-adventure-yellow">Home</Link>
          <span className="mx-2">/</span>
          {category && (
            <>
              <Link href={`/categoria/${category.slug}`} className="hover:text-adventure-yellow">
                {category.name}
              </Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-adventure-yellow">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-auto object-cover"
            />
            <div className="absolute top-4 left-4 flex">
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

          {/* Product Info */}
          <div>
            <h1 className="adventure-title text-3xl md:text-4xl text-vintage-beige mb-2">
              {product.name}
            </h1>
            
            {category && (
              <Link href={`/categoria/${category.slug}`} className="text-adventure-yellow hover:underline">
                {category.name}
              </Link>
            )}
            
            <div className="mt-4 mb-6">
              <div className="flex items-baseline">
                <span className="text-adventure-yellow text-2xl font-bold">
                  {formatCurrency(Number(product.discountPrice || product.price), currency)}
                </span>
                {product.discountPrice && (
                  <span className="text-light-beige/50 text-lg line-through ml-3">
                    {formatCurrency(Number(product.price), currency)}
                  </span>
                )}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="adventure-title text-xl text-adventure-yellow mb-3">
                {t('productDetail.description')}
              </h3>
              <p className="text-light-beige/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Sample variants - for demonstration */}
            {(category?.name === 'Aviador' || category?.name === 'Aviadora') && (
              <div className="mb-6">
                <h3 className="text-vintage-beige mb-2">Tamanho</h3>
                <div className="flex space-x-2">
                  {['P', 'M', 'G', 'GG'].map((size) => (
                    <Button
                      key={size}
                      variant={selectedVariant === size ? "default" : "outline"}
                      className={`h-10 w-10 rounded-md ${
                        selectedVariant === size 
                          ? 'bg-adventure-yellow text-dark-gray' 
                          : 'border-vintage-beige/50 text-vintage-beige hover:bg-vintage-beige/10'
                      }`}
                      onClick={() => setSelectedVariant(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div className="flex items-center mb-6">
              <h3 className="text-vintage-beige mr-4">Quantidade</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border border-vintage-beige/50 text-vintage-beige hover:bg-vintage-beige hover:text-dark-gray"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <span className="mx-4 text-light-beige text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border border-vintage-beige/50 text-vintage-beige hover:bg-vintage-beige hover:text-dark-gray"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            {/* Add to Cart button */}
            <Button 
              className="adventure-title w-full py-6 bg-adventure-yellow text-dark-gray hover:bg-aviation-blue hover:text-light-beige transition duration-300 rounded-md"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2" size={18} />
              {t('productDetail.addToCart')}
            </Button>
          </div>
        </div>

        {/* Related Products */}
        {filteredRelatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="adventure-title text-2xl text-vintage-beige mb-8">
              {t('productDetail.relatedProducts')}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredRelatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="group bg-dark-gray border border-vintage-beige/20 rounded-lg overflow-hidden hover:border-adventure-yellow transition duration-300">
                  <Link href={`/produto/${relatedProduct.slug}`}>
                    <div className="relative overflow-hidden">
                      <img 
                        src={relatedProduct.imageUrl} 
                        alt={relatedProduct.name}
                        className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
                      />
                    </div>
                  </Link>
                  <div className="p-5">
                    <Link href={`/produto/${relatedProduct.slug}`}>
                      <h3 className="adventure-title text-xl text-vintage-beige group-hover:text-adventure-yellow transition duration-300">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="mt-2">
                      <p className="text-adventure-yellow font-bold">
                        {formatCurrency(Number(relatedProduct.discountPrice || relatedProduct.price), currency)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
