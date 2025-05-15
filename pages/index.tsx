import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Category, Product, BlogPost } from '@/shared/schema';

interface HomeProps {
  categories: Category[];
  featuredProducts: Product[];
  recentBlogs: BlogPost[];
}

export default function Home({ categories, featuredProducts, recentBlogs }: HomeProps) {
  const { t } = useLanguage();
  
  return (
    <>
      <Head>
        <title>Piloto Inteligente - Loja Online de Acessórios de Aviação Vintage</title>
        <meta name="description" content="Loja online de roupas e acessórios com estética de aviação vintage. Produtos exclusivos para aviadores e aviadoras." />
      </Head>

      <Layout>
        {/* Temporary Hero Section */}
        <div className="relative bg-dark-gray">
          <div className="absolute inset-0 bg-gradient-to-r from-dark-gray/90 to-dark-gray/60 z-10"></div>
          <div 
            className="h-[70vh] bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1474&auto=format&fit=crop')"
            }}
          ></div>
          
          <div className="container mx-auto px-4 absolute inset-0 z-20 flex flex-col justify-center items-start">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 max-w-2xl">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="lg">
                {t('hero.shopNew')}
              </Button>
              <Button variant="vintage" size="lg">
                {t('hero.shopBestsellers')}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Categories Preview */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-adventure-yellow">
              {t('categories.title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories && categories.map((category) => (
                <Link 
                  key={category.id}
                  href={`/categoria/${category.slug}`}
                  className="group relative overflow-hidden rounded-lg bg-gray-800 h-80 flex items-end"
                >
                  <div className="absolute inset-0 bg-dark-gray opacity-40 group-hover:opacity-20 transition-opacity z-0"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${category.imageUrl || 'https://placehold.co/600x400?text=Categoria'})`
                      }}
                    ></div>
                  </div>
                  
                  <div className="relative z-10 p-6 w-full">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <Button variant="vintage" size="sm">
                      {t('categories.shopNow')}
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-16 bg-dark-gray">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-adventure-yellow mb-2">
              {t('featured.title')}
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
              {t('featured.subtitle')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts && featuredProducts.map((product) => (
                <Link 
                  key={product.id}
                  href={`/produto/${product.slug}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-lg bg-gray-800 aspect-square mb-4 relative">
                    <div 
                      className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${product.imageUrl || 'https://placehold.co/600x400?text=Produto'})`
                      }}
                    ></div>
                    
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-aviation-blue text-white text-xs font-bold uppercase py-1 px-2 rounded">
                        {t('featured.new')}
                      </span>
                    )}
                    
                    {product.isBestseller && (
                      <span className="absolute top-3 left-3 bg-adventure-yellow text-dark-gray text-xs font-bold uppercase py-1 px-2 rounded">
                        {t('featured.bestseller')}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-white font-medium group-hover:text-adventure-yellow transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mt-2">
                    <span className="text-adventure-yellow font-semibold">
                      {`R$ ${parseFloat(product.price).toFixed(2).replace('.', ',')}`}
                    </span>
                    
                    {product.discountPrice && (
                      <span className="text-gray-400 text-sm line-through ml-2">
                        {`R$ ${parseFloat(product.discountPrice).toFixed(2).replace('.', ',')}`}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                {t('featured.viewAll')}
              </Button>
            </div>
          </div>
        </section>
        
        {/* Blog Preview */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-adventure-yellow mb-2">
              {t('blog.title')}
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
              {t('blog.subtitle')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentBlogs && recentBlogs.map((post) => (
                <Link 
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-lg bg-gray-800 aspect-video mb-4">
                    <div 
                      className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${post.imageUrl || 'https://placehold.co/600x400?text=Blog'})`
                      }}
                    ></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white group-hover:text-adventure-yellow transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-3 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <span className="text-adventure-yellow font-medium group-hover:underline transition-colors">
                    {t('blog.readMore')}
                  </span>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                {t('blog.viewAll')}
              </Button>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16 bg-dark-gray">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-adventure-yellow mb-4">
                {t('newsletter.title')}
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                {t('newsletter.subtitle')}
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t('newsletter.emailPlaceholder')}
                  className="flex-grow py-3 px-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-adventure-yellow"
                  required
                />
                <Button type="submit" variant="secondary">
                  {t('newsletter.subscribe')}
                </Button>
              </form>
              
              <p className="text-gray-500 text-sm mt-4">
                {t('newsletter.privacy')}
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from API
  const fetchCategories = fetch('http://localhost:5000/api/categories').then(res => res.json());
  const fetchProducts = fetch('http://localhost:5000/api/products/featured').then(res => res.json());
  const fetchBlogPosts = fetch('http://localhost:5000/api/blog/recent').then(res => res.json());
  
  const [categories, featuredProducts, recentBlogs] = await Promise.all([
    fetchCategories,
    fetchProducts,
    fetchBlogPosts
  ]);
  
  return {
    props: {
      categories,
      featuredProducts,
      recentBlogs,
    },
  };
};