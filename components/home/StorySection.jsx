import React from 'react';
import Link from 'next/link';

const StorySection = () => {
  return (
    <section className="py-16 bg-background-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Seção da imagem */}
          <div className="rounded-lg bg-gray-800 h-96 flex items-center justify-center">
            <span className="text-primary font-bold">Foto do Carlos Drummond pilotando</span>
          </div>
          
          {/* Seção de texto */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Nossa História</h2>
            <p className="text-white/80 mb-4">
              A Piloto Inteligente nasceu da paixão de Carlos Drummond pela aviação. 
              Após anos como piloto comercial, cruzando os céus do mundo, Carlos identificou 
              a falta de roupas e acessórios que combinassem estilo, conforto e funcionalidade 
              para entusiastas da aviação.
            </p>
            <p className="text-white/80 mb-8">
              Fundada em 2020, nossa marca se dedica a criar peças que honram a tradição da 
              aviação com um toque contemporâneo. Cada produto carrega um pedaço da nossa 
              paixão pelos céus e pela jornada de exploração que todo voo proporciona.
            </p>
            
            <blockquote className="border-l-4 border-primary pl-4 mb-8">
              <p className="italic text-white/70">
                "Voar é uma experiência que transforma nossa perspectiva do mundo. 
                Nossa missão é trazer esse espírito de aventura e liberdade para o dia a dia 
                através das roupas que vestimos."
              </p>
              <footer className="text-primary mt-2">— Carlos Drummond, Fundador</footer>
            </blockquote>
            
            <Link href="/nossa-historia" className="btn-secondary">
              Conheça Nossa Jornada
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;