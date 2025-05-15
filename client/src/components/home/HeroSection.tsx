import { Link } from 'wouter';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0c] min-h-[80vh] flex items-center">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1516222513604-f0ed6d09e8fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80)',
          filter: 'brightness(0.3) contrast(1.2)'
        }}
      />
      
      {/* Diagonal lines overlay for adventure/map feel */}
      <div className="absolute inset-0 z-10 opacity-10">
        <div className="w-full h-full" style={{ 
          backgroundImage: `repeating-linear-gradient(45deg, #FFD700, #FFD700 2px, transparent 2px, transparent 20px),
                            repeating-linear-gradient(135deg, #FFD700, #FFD700 2px, transparent 2px, transparent 20px)` 
        }}></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 relative z-20">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            <div className="text-white">DESCUBRA O ESPÍRITO DA</div>
            <div className="text-[#FFD700] mt-2">AVENTURA AÉREA</div>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
            Trajes e acessórios que transformam a nostalgia da aviação clássica em 
            estilo contemporâneo. Para quem leva a aventura no sangue.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/categoria/aviador" className="inline-block">
              <button 
                className="px-8 py-3 bg-[#FFD700] text-black font-bold text-lg rounded-md hover:bg-[#FFC000] transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.4)]"
              >
                COLEÇÃO MASCULINA
              </button>
            </Link>
            
            <Link to="/categoria/aviadora" className="inline-block">
              <button 
                className="px-8 py-3 border-2 border-[#FFD700] text-[#FFD700] font-bold text-lg rounded-md hover:bg-[#FFD700]/10 transition-all duration-300"
              >
                COLEÇÃO FEMININA
              </button>
            </Link>
          </div>
          
          {/* Adventure badges */}
          <div className="flex flex-wrap gap-8 items-center text-[#FFD700]">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full border-2 border-[#FFD700] flex items-center justify-center mr-3">
                <span className="text-2xl">✦</span>
              </div>
              <span className="uppercase text-sm font-bold">Peças Exclusivas</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full border-2 border-[#FFD700] flex items-center justify-center mr-3">
                <span className="text-2xl">✦</span>
              </div>
              <span className="uppercase text-sm font-bold">Alta Qualidade</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full border-2 border-[#FFD700] flex items-center justify-center mr-3">
                <span className="text-2xl">✦</span>
              </div>
              <span className="uppercase text-sm font-bold">Estilo Atemporal</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative compass element */}
      <div className="absolute right-10 bottom-10 hidden lg:block z-20 opacity-70">
        <div className="w-40 h-40 border-2 border-[#FFD700] rounded-full relative">
          <div className="absolute inset-0 border-2 border-[#FFD700] rounded-full animate-spin-slow" style={{ animationDuration: '20s' }}></div>
          <div className="w-full h-1 bg-[#FFD700] absolute top-1/2 left-0 transform -translate-y-1/2"></div>
          <div className="w-1 h-full bg-[#FFD700] absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          <div className="w-4 h-4 bg-[#FFD700] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </section>
  );
}