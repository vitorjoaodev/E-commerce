import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Product } from '@/shared/schema';
import { storage } from '@/server/storage';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/currency';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const { t } = useLanguage();
  const { currency } = useCurrency();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      originalPrice: product.originalPrice,
      imageUrl: product.imageUrl,
      quantity,
      variant: selectedVariant,
    });
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  return (
    <>
      <Head>
        <title>{product.name} - Piloto Inteligente</title>
        <meta name="description" content={product.description?.substring(0, 160) || product.name} />
        <meta property="og:title" content={`${product.name} - Piloto Inteligente`} />
        <meta property="og:description" content={product.description?.substring(0, 160) || product.name} />
        <meta property="og:image" content={product.imageUrl} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={product.price} />
        <meta property="product:price:currency" content={currency} />
      </Head>

      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative h-[500px] bg-dark-gray rounded-lg overflow-hidden border border-aviation-blue/30">
              <Image 
                src={product.imageUrl} 
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              {product.isNew && (
                <div className="absolute top-4 left-4 bg-aviation-blue text-vintage-beige px-3 py-1 rounded-md text-sm font-medium">
                  {t('featured.new')}
                </div>
              )}
              {product.isBestseller && (
                <div className="absolute top-4 right-4 bg-adventure-yellow text-dark-gray px-3 py-1 rounded-md text-sm font-medium">
                  {t('featured.bestseller')}
                </div>
              )}
              {product.isOnSale && (
                <div className="absolute bottom-4 left-4 bg-red-500 text-vintage-beige px-3 py-1 rounded-md text-sm font-medium">
                  {t('featured.sale')}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <h1 className="adventure-title text-3xl text-vintage-beige mb-4">{product.name}</h1>
              
              <div className="mb-6">
                <div className="flex items-center">
                  {product.originalPrice && (
                    <span className="text-light-beige/60 line-through mr-2">
                      {formatCurrency(parseFloat(product.originalPrice), currency)}
                    </span>
                  )}
                  <span className="text-2xl text-vintage-beige">
                    {formatCurrency(parseFloat(product.price), currency)}
                  </span>
                </div>
                
                {product.originalPrice && (
                  <div className="mt-1 text-red-400 text-sm">
                    {Math.round((1 - parseFloat(product.price) / parseFloat(product.originalPrice)) * 100)}% OFF
                  </div>
                )}
              </div>
              
              {product.variants && product.variants.length > 0 && (
                <div className="mb-6">
                  <label className="block text-vintage-beige mb-2">Tamanho:</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map(variant => (
                      <button
                        key={variant}
                        className={`w-12 h-12 rounded-md border flex items-center justify-center transition-colors ${
                          selectedVariant === variant
                            ? 'bg-aviation-blue text-vintage-beige border-aviation-blue'
                            : 'bg-dark-gray text-light-beige border-vintage-beige/30 hover:border-aviation-blue'
                        }`}
                        onClick={() => setSelectedVariant(variant)}
                      >
                        {variant}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-8">
                <label className="block text-vintage-beige mb-2">Quantidade:</label>
                <div className="flex items-center">
                  <button
                    className="w-10 h-10 rounded-l-md bg-dark-gray border border-vintage-beige/30 text-vintage-beige flex items-center justify-center hover:bg-aviation-blue/20"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
                    className="w-14 h-10 border-t border-b border-vintage-beige/30 bg-dark-gray text-vintage-beige text-center"
                  />
                  <button
                    className="w-10 h-10 rounded-r-md bg-dark-gray border border-vintage-beige/30 text-vintage-beige flex items-center justify-center hover:bg-aviation-blue/20"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <Button
                className="w-full bg-aviation-blue hover:bg-aviation-blue/80 text-vintage-beige py-3 rounded-md mb-8"
                onClick={handleAddToCart}
              >
                {t('productDetail.addToCart')}
              </Button>
              
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="border-b border-vintage-beige/20 mb-4">
                  <TabsTrigger value="description" className="text-vintage-beige pb-2">
                    {t('productDetail.description')}
                  </TabsTrigger>
                  <TabsTrigger value="shipping" className="text-vintage-beige pb-2">
                    Envio
                  </TabsTrigger>
                  <TabsTrigger value="returns" className="text-vintage-beige pb-2">
                    Devolução
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="text-light-beige/80 leading-relaxed">
                  <p>{product.description}</p>
                </TabsContent>
                <TabsContent value="shipping" className="text-light-beige/80 leading-relaxed">
                  <p>Envio para todo Brasil. Frete grátis para compras acima de R$ 250,00.</p>
                  <p className="mt-2">Prazo de entrega: 5-10 dias úteis</p>
                </TabsContent>
                <TabsContent value="returns" className="text-light-beige/80 leading-relaxed">
                  <p>Devolução gratuita em até 30 dias após a compra.</p>
                  <p className="mt-2">Entre em contato com nosso suporte para mais informações.</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="adventure-title text-2xl text-vintage-beige mb-8">{t('productDetail.relatedProducts')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard 
                    key={relatedProduct.id} 
                    product={relatedProduct} 
                    onAddToCart={() => {
                      addToCart({
                        id: relatedProduct.id,
                        name: relatedProduct.name,
                        slug: relatedProduct.slug,
                        price: relatedProduct.price,
                        originalPrice: relatedProduct.originalPrice,
                        imageUrl: relatedProduct.imageUrl,
                        quantity: 1,
                      });
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await storage.getAllProducts();
  
  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));
  
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<ProductDetailProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const product = await storage.getProductBySlug(slug);
  
  if (!product) {
    return {
      notFound: true,
    };
  }
  
  // Get related products from the same category
  const allProducts = await storage.getProductsByCategory(product.categoryId);
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  
  return {
    props: {
      product,
      relatedProducts,
    },
    revalidate: 3600, // Revalidate every hour
  };
};