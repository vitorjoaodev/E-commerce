import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import CategoryHighlights from '@/components/home/CategoryHighlights';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import StorySection from '@/components/home/StorySection';
import BlogPreview from '@/components/home/BlogPreview';
import Newsletter from '@/components/home/Newsletter';
import InstagramFeed from '@/components/home/InstagramFeed';
import { Category, Product, BlogPost } from '@/shared/schema';
import { storage } from '@/server/storage';

interface HomeProps {
  categories: Category[];
  featuredProducts: Product[];
  recentBlogs: BlogPost[];
}

export default function Home({ categories, featuredProducts, recentBlogs }: HomeProps) {
  return (
    <>
      <Head>
        <title>Piloto Inteligente - Loja Online de Acessórios de Aviação Vintage</title>
        <meta name="description" content="Loja online de roupas e acessórios com estética de aviação vintage. Produtos exclusivos para aviadores e aviadoras." />
      </Head>

      <Layout>
        <HeroSection />
        <CategoryHighlights categories={categories} />
        <FeaturedProducts products={featuredProducts} />
        <StorySection />
        <BlogPreview posts={recentBlogs} />
        <Newsletter />
        <InstagramFeed />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const categories = await storage.getAllCategories();
  const featuredProducts = await storage.getFeaturedProducts();
  const recentBlogs = await storage.getRecentBlogPosts(3);

  return {
    props: {
      categories,
      featuredProducts,
      recentBlogs,
    },
    // Revalidate every hour
    revalidate: 3600,
  };
};