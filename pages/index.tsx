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
        {/* Hero Section */}
        <div className="relative bg-dark-gray">
          <div className="absolute inset-0 bg-gradient-to-r from-dark-gray/95 to-dark-gray/80 z-10"></div>
          <div 
            className="h-[80vh] bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1474&auto=format&fit=crop')"
            }}
          ></div>
          
          <div className="container mx-auto px-4 absolute inset-0 z-20 flex flex-col justify-center items-start">
            <h1 className="text-5xl md:text-7xl font-bold text-adventure-yellow mb-6 max-w-2xl">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-adventure-yellow hover:bg-adventure-yellow/90 text-dark-gray font-bold"
              >
                {t('hero.shopNew')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-adventure-yellow text-adventure-yellow hover:bg-adventure-yellow/20"
              >
                {t('hero.shopBestsellers')}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Categories Preview */}
        <section className="py-20 bg-[#0a0a0c]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4 text-adventure-yellow">
              {t('categories.title')}
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
              Descubra nossa coleção exclusiva para aventureiros e aventureiras dos céus
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories && categories.map((category) => (
                <Link 
                  key={category.id}
                  href={`/categoria/${category.slug}`}
                  className="group relative overflow-hidden rounded-lg h-96 flex items-end"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
                  <div className="absolute inset-0">
                    <div className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${category.imageUrl || 'https://placehold.co/600x400?text=Categoria'})`
                      }}
                    ></div>
                  </div>
                  
                  <div className="relative z-20 p-6 w-full">
                    <h3 className="text-2xl font-bold text-adventure-yellow mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 mb-6 line-clamp-2">
                      {category.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-adventure-yellow text-adventure-yellow hover:bg-adventure-yellow hover:text-black transition-all duration-300"
                    >
                      {t('categories.shopNow')}
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-20 bg-[#0f0f12]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-adventure-yellow mb-4">
              {t('featured.title')}
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
              {t('featured.subtitle')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredProducts && featuredProducts.map((product) => (
                <Link 
                  key={product.id}
                  href={`/produto/${product.slug}`}
                  className="group bg-[#0a0a0c] rounded-xl overflow-hidden shadow-xl shadow-black/30 hover:shadow-adventure-yellow/10 transition-all duration-300"
                >
                  <div className="overflow-hidden aspect-square relative">
                    <div 
                      className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${product.imageUrl || 'https://placehold.co/600x400?text=Produto'})`
                      }}
                    ></div>
                    
                    {product.isNew && !product.isBestseller && (
                      <span className="absolute top-3 left-3 bg-aviation-blue text-white text-xs font-bold uppercase py-1 px-3 rounded-full">
                        {t('featured.new')}
                      </span>
                    )}
                    
                    {product.isBestseller && (
                      <span className="absolute top-3 left-3 bg-adventure-yellow text-dark-gray text-xs font-bold uppercase py-1 px-3 rounded-full">
                        {t('featured.bestseller')}
                      </span>
                    )}
                    
                    {product.discountPrice && (
                      <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold uppercase py-1 px-3 rounded-full">
                        {t('featured.sale')}
                      </span>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-white text-lg font-medium group-hover:text-adventure-yellow transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center mt-3">
                      <span className="text-adventure-yellow font-bold text-xl">
                        {`R$ ${parseFloat(product.price).toFixed(2).replace('.', ',')}`}
                      </span>
                      
                      {product.discountPrice && (
                        <span className="text-gray-400 text-sm line-through ml-2">
                          {`R$ ${parseFloat(product.discountPrice).toFixed(2).replace('.', ',')}`}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <span className="text-gray-400 text-sm inline-flex items-center group-hover:text-adventure-yellow">
                        Ver detalhes
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                variant="outline" 
                size="lg"
                className="border-adventure-yellow text-adventure-yellow hover:bg-adventure-yellow hover:text-dark-gray transition-all duration-300"
              >
                {t('featured.viewAll')}
              </Button>
            </div>
          </div>
        </section>
        
        {/* Blog Preview */}
        <section className="py-20 bg-[#0a0a0c]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-adventure-yellow mb-4">
              {t('blog.title')}
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
              {t('blog.subtitle')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentBlogs && recentBlogs.map((post) => (
                <Link 
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-[#0f0f12] rounded-xl overflow-hidden shadow-xl shadow-black/30 hover:shadow-adventure-yellow/10 transition-all duration-300"
                >
                  <div className="overflow-hidden aspect-video">
                    <div 
                      className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${post.imageUrl || 'https://placehold.co/600x400?text=Blog'})`
                      }}
                    ></div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center mb-3">
                      <span className="text-xs text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="w-1 h-1 bg-adventure-yellow rounded-full mx-2"></span>
                      <span className="text-xs text-adventure-yellow">Aviação</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white group-hover:text-adventure-yellow transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <span className="text-adventure-yellow font-medium group-hover:underline transition-colors inline-flex items-center">
                      {t('blog.readMore')}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                variant="outline" 
                size="lg"
                className="border-adventure-yellow text-adventure-yellow hover:bg-adventure-yellow hover:text-dark-gray transition-all duration-300"
              >
                {t('blog.viewAll')}
              </Button>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-24 bg-[#0f0f12] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"></div>
          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-adventure-yellow mb-6">
                {t('newsletter.title')}
              </h2>
              <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
                {t('newsletter.subtitle')}
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={t('newsletter.emailPlaceholder')}
                  className="flex-grow py-3 px-4 bg-[#0a0a0c] text-white rounded-lg border border-gray-800 focus:outline-none focus:border-adventure-yellow shadow-inner shadow-black/50"
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-adventure-yellow hover:bg-adventure-yellow/90 text-dark-gray font-bold"
                >
                  {t('newsletter.subscribe')}
                </Button>
              </form>
              
              <p className="text-gray-500 text-sm mt-6">
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