import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Product, Category } from '@/shared/schema';
import { storage } from '@/server/storage';
import ProductCard from '@/components/product/ProductCard';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

interface CategoryPageProps {
  products: Product[];
  category: Category;
}

export default function CategoryPage({ products, category }: CategoryPageProps) {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [sortOption, setSortOption] = useState('featuredFirst');
  
  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'priceAsc') {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortOption === 'priceDesc') {
      return parseFloat(b.price) - parseFloat(a.price);
    } else if (sortOption === 'newest') {
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    }
    // Default: Featured first
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      originalPrice: product.originalPrice,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  };

  return (
    <>
      <Head>
        <title>{category.name} - Piloto Inteligente</title>
        <meta name="description" content={category.description || `Produtos da categoria ${category.name} na Piloto Inteligente.`} />
      </Head>

      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="adventure-title text-4xl text-vintage-beige mb-8">{category.name}</h1>
          
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <p className="text-light-beige/80 mb-4 md:mb-0 max-w-xl">
              {category.description}
            </p>
            
            <div className="flex items-center">
              <span className="text-vintage-beige mr-2">Ordenar por:</span>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-dark-gray border border-aviation-blue/50 rounded text-vintage-beige p-2"
              >
                <option value="featuredFirst">Destaque</option>
                <option value="priceAsc">Menor preço</option>
                <option value="priceDesc">Maior preço</option>
                <option value="newest">Novidades</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => handleAddToCart(product)} 
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await storage.getAllCategories();
  
  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));
  
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const category = await storage.getCategoryBySlug(slug);
  
  if (!category) {
    return {
      notFound: true,
    };
  }
  
  const products = await storage.getProductsByCategory(category.id);
  
  return {
    props: {
      products,
      category,
    },
    revalidate: 3600, // Revalidate every hour
  };
};