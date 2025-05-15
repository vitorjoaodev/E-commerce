import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section 
      className="relative h-[80vh] bg-cover bg-center" 
      style={{ backgroundImage: "url('https://pixabay.com/get/g176835e2976d36c034f9fead74f08b22a7b9c3b9a6c8c8460105da5a3634ecc7c90e22439178e35c6d5fbf22fced4386a367eab8debadba767a119b2b0cab075_1280.jpg')" }}
    >
      <div className="absolute inset-0 bg-dark-gray/60"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-4xl px-4">
          <h1 className="adventure-title text-5xl md:text-7xl text-adventure-yellow mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-light-beige mb-8 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/categoria/colecao-nova">
              <Button 
                className="adventure-title px-8 py-6 bg-adventure-yellow text-dark-gray hover:bg-aviation-blue hover:text-light-beige transition duration-300 text-lg rounded-md w-full sm:w-auto"
              >
                {t('hero.shopNew')}
              </Button>
            </Link>
            <Link href="/categoria/mais-vendidos">
              <Button 
                variant="outline"
                className="adventure-title px-8 py-6 border-2 border-vintage-beige text-vintage-beige hover:bg-vintage-beige hover:text-dark-gray transition duration-300 text-lg rounded-md w-full sm:w-auto"
              >
                {t('hero.shopBestsellers')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
