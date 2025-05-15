import { Link } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-[#0a0a0c] min-h-[80vh] flex items-center">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url(https://www.pgparks.com/wp-content/uploads/2023/02/CollegeParkAviationMuseum19-21_1200.jpg)',
          filter: 'brightness(0.3) contrast(1.2)'
        }}
      />
      
      {/* Overlay with slight vignette effect instead of lines */}
      <div className="absolute inset-0 z-10 opacity-30">
        <div className="w-full h-full bg-gradient-to-b from-black/50 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 relative z-20">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            <div className="text-white">{t('hero.title')}</div>
            <div className="text-[#D6BD94] mt-2">AVENTURA AÉREA</div>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/categoria/aviador" className="inline-block">
              <button 
                className="px-8 py-3 bg-[#D6BD94] text-black font-bold text-lg rounded-md hover:bg-[#C4AA80] transition-all duration-300 shadow-[0_0_15px_rgba(214,189,148,0.4)]"
              >
                {t('categories.aviador')}
              </button>
            </Link>
            
            <Link to="/categoria/aviadora" className="inline-block">
              <button 
                className="px-8 py-3 border-2 border-[#D6BD94] text-[#D6BD94] font-bold text-lg rounded-md hover:bg-[#D6BD94]/10 transition-all duration-300"
              >
                {t('categories.aviadora')}
              </button>
            </Link>
          </div>
          
          {/* Adventure badges */}
          <div className="flex flex-wrap gap-8 items-center text-[#D6BD94]">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full border-2 border-[#D6BD94] flex items-center justify-center mr-3">
                <span className="text-2xl">✦</span>
              </div>
              <span className="uppercase text-sm font-bold">{t('hero.badge1') || 'Peças Exclusivas'}</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full border-2 border-[#D6BD94] flex items-center justify-center mr-3">
                <span className="text-2xl">✦</span>
              </div>
              <span className="uppercase text-sm font-bold">{t('hero.badge2') || 'Alta Qualidade'}</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full border-2 border-[#D6BD94] flex items-center justify-center mr-3">
                <span className="text-2xl">✦</span>
              </div>
              <span className="uppercase text-sm font-bold">{t('hero.badge3') || 'Estilo Atemporal'}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative compass element */}
      <div className="absolute right-10 bottom-10 hidden lg:block z-20 opacity-70">
        <div className="w-40 h-40 border-2 border-[#D6BD94] rounded-full relative">
          <div className="absolute inset-0 border-2 border-[#D6BD94] rounded-full animate-spin-slow" style={{ animationDuration: '20s' }}></div>
          <div className="w-full h-1 bg-[#D6BD94] absolute top-1/2 left-0 transform -translate-y-1/2"></div>
          <div className="w-1 h-full bg-[#D6BD94] absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          <div className="w-4 h-4 bg-[#D6BD94] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </section>
  );
}