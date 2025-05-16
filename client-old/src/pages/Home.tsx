import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/context/LanguageContext';
import HeroSection from '@/components/home/HeroSection';
import CategoryHighlights from '@/components/home/CategoryHighlights';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import StorySection from '@/components/home/StorySection';
import BlogPreview from '@/components/home/BlogPreview';
import Newsletter from '@/components/home/Newsletter';
import InstagramFeed from '@/components/home/InstagramFeed';

export default function Home() {
  const { language, t } = useLanguage();

  // Set initial page metadata
  useEffect(() => {
    document.title = language === 'pt-BR' 
      ? 'Piloto Inteligente - Loja Online de Acessórios de Aviação Vintage' 
      : 'Piloto Inteligente - Vintage Aviation Accessories Online Store';
  }, [language]);

  return (
    <>
      <Helmet>
        <title>
          {language === 'pt-BR' 
            ? 'Piloto Inteligente - Loja Online de Acessórios de Aviação Vintage' 
            : 'Piloto Inteligente - Vintage Aviation Accessories Online Store'}
        </title>
        <meta 
          name="description" 
          content={language === 'pt-BR' 
            ? 'Loja online de roupas e acessórios com estética de aviação vintage. Produtos exclusivos para aviadores e aviadoras.' 
            : 'Online store for vintage aviation-inspired clothing and accessories. Exclusive products for aviators.'}
        />
        <meta property="og:title" content={language === 'pt-BR' ? 'Piloto Inteligente - Acessórios de Aviação Vintage' : 'Piloto Inteligente - Vintage Aviation Accessories'} />
        <meta property="og:description" content={language === 'pt-BR' ? 'Descubra nossa coleção exclusiva de roupas e acessórios inspirados na era de ouro da aviação' : 'Discover our exclusive collection of clothing and accessories inspired by the golden age of aviation'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pilotointeligente.com" />
        <meta property="og:image" content="https://pixabay.com/get/g176835e2976d36c034f9fead74f08b22a7b9c3b9a6c8c8460105da5a3634ecc7c90e22439178e35c6d5fbf22fced4386a367eab8debadba767a119b2b0cab075_1280.jpg" />
      </Helmet>

      <HeroSection />
      <CategoryHighlights />
      <FeaturedProducts />
      <StorySection />
      <BlogPreview />
      <Newsletter />
      <InstagramFeed />
    </>
  );
}
