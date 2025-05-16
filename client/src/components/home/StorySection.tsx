import { Link } from 'wouter';

export default function StorySection() {
  return (
    <section className="py-20 bg-[#121212] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFD700" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Vertical golden line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#FFD700] to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <div className="w-12 h-12 rounded-full border-2 border-[#FFD700] flex items-center justify-center mb-6">
              <span className="text-2xl text-[#FFD700]">✦</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">NOSSA HISTÓRIA</h2>
            <div className="w-24 h-1 bg-[#FFD700] mb-6"></div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 relative">
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#FFD700] opacity-40"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#FFD700] opacity-40"></div>
              
              <div className="relative z-10 p-4">
                <img 
                  src="https://images.squarespace-cdn.com/content/v1/607892d0460d6f7768d704ef/1627388148002-SRUB8FE3HF3H1ZBU06KK/The-Canadians14.jpg" 
                  alt="História do Piloto Inteligente" 
                  className="w-full h-[400px] object-cover rounded-md shadow-xl shadow-black/30"
                />
                
                {/* Decorative elements */}
                <div className="absolute -top-3 -right-3 w-24 h-24 border-t-2 border-r-2 border-[#FFD700] opacity-20 rounded-tr-md"></div>
                <div className="absolute -bottom-3 -left-3 w-24 h-24 border-b-2 border-l-2 border-[#FFD700] opacity-20 rounded-bl-md"></div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <p className="text-gray-300 mb-4 leading-relaxed">
                <span className="text-[#FFD700] text-2xl font-serif italic mr-1">O</span>
                <span className="text-[#FFD700] font-semibold">Piloto Inteligente</span> nasceu da paixão pela aviação e sua rica história. 
                Nossa jornada começou quando dois amigos pilotos decidiram unir o amor pelos céus com design 
                contemporâneo, criando peças que celebram o espírito aventureiro dos pioneiros da aviação.
              </p>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Cada item de nossa coleção conta uma história de coragem, inovação e exploração. Trabalhamos com 
                os melhores materiais e artesãos para criar produtos que não apenas carregam a nostalgia dos 
                tempos dourados da aviação, mas também atendem às necessidades do aventureiro moderno.
              </p>
              
              {/* Quote */}
              <blockquote className="border-l-4 border-[#FFD700] pl-4 my-6">
                <p className="text-gray-300 italic">
                  "Vestir uma peça da Piloto Inteligente é levar consigo um pouco do espírito de liberdade 
                  que só quem já cortou as nuvens pode entender."
                </p>
                <footer className="text-[#FFD700] mt-2">— João Vitor, Fundador</footer>
              </blockquote>
              
              <Link to="/nossa-historia">
                <button className="mt-4 px-6 py-3 bg-[#1e1e1e] text-[#FFD700] border-2 border-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors font-semibold uppercase flex items-center">
                  Conheça Nossa História Completa
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}