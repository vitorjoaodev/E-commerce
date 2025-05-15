import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { BlogPost } from '@/shared/schema';
import { storage } from '@/server/storage';
import { useLanguage } from '@/context/LanguageContext';
import { formatDate } from '@/lib/utils';

interface BlogPageProps {
  posts: BlogPost[];
}

export default function Blog({ posts }: BlogPageProps) {
  const { language, t } = useLanguage();

  return (
    <>
      <Head>
        <title>Blog - Piloto Inteligente</title>
        <meta name="description" content="Artigos sobre a história da aviação, pilotos famosos e curiosidades do mundo aeronáutico. Blog da Piloto Inteligente, sua loja de roupas e acessórios de aviação vintage." />
      </Head>

      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="adventure-title text-4xl text-vintage-beige mb-2">{t('blog.title')}</h1>
          <p className="text-light-beige/70 mb-12 max-w-3xl">{t('blog.subtitle')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="group block bg-dark-gray border border-aviation-blue/30 rounded-lg overflow-hidden hover:border-aviation-blue transition-colors"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image 
                    src={post.imageUrl} 
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="text-aviation-blue text-sm block mb-2">
                    {formatDate(post.createdAt, language)}
                  </span>
                  <h3 className="text-xl text-vintage-beige mb-3 group-hover:text-adventure-yellow transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-light-beige/70 line-clamp-3">{post.summary}</p>
                  <div className="mt-4 text-aviation-blue group-hover:text-adventure-yellow transition-colors">
                    {t('blog.readMore')} →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const posts = await storage.getAllBlogPosts();
  
  return {
    props: {
      posts,
    },
    revalidate: 3600, // Revalidate every hour
  };
};