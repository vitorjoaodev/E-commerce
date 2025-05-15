import { Helmet } from 'react-helmet';

export default function OurStory() {
  return (
    <>
      <Helmet>
        <title>Nossa História | Piloto Inteligente</title>
        <meta name="description" content="Conheça a história da Piloto Inteligente, marca especializada em roupas e acessórios inspirados na aviação clássica." />
      </Helmet>
      
      <div className="bg-[#0a0a0c] text-white">
        {/* Hero section */}
        <div className="relative h-[60vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/607892d0460d6f7768d704ef/1627388148002-SRUB8FE3HF3H1ZBU06KK/The-Canadians14.jpg)',
              filter: 'brightness(0.6)' 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] to-transparent"></div>
          
          <div className="container mx-auto h-full flex items-end px-4 py-16 relative z-10">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Nossa História</h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                A história da paixão por aviação que se transformou em uma marca exclusiva
              </p>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#D6BD94]">Como tudo começou</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                A Piloto Inteligente nasceu da paixão pela aviação do seu fundador, João Vitor Belasque. 
                Piloto experiente e entusiasta da história aeronáutica, João sempre foi fascinado pela 
                era de ouro da aviação - um tempo de pioneiros e aventureiros que desbravavam os céus 
                com determinação e estilo.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Em 2018, após anos pilotando aeronaves comerciais e estudando a rica história da 
                aviação brasileira e mundial, João identificou uma oportunidade única: criar uma marca 
                que capturasse a essência daquela época e a transformasse em peças contemporâneas, 
                mantendo viva a memória e estética dos primeiros dias da aviação.
              </p>
              <p className="text-gray-300 leading-relaxed">
                A ideia era simples: desenvolver roupas e acessórios que não fossem apenas bonitos e 
                funcionais, mas que contassem histórias, prestassem homenagem a aeronaves lendárias e 
                transmitissem aquele espírito de aventura que define a aviação.
              </p>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.squarespace-cdn.com/content/v1/607892d0460d6f7768d704ef/1627388148002-SRUB8FE3HF3H1ZBU06KK/The-Canadians14.jpg" 
                alt="João Vitor Belasque, Fundador" 
                className="w-full h-full object-cover" 
              />
              <div className="bg-[#161618] p-4">
                <p className="text-center text-[#D6BD94]">João Vitor Belasque, Fundador</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#333] my-16"></div>
          
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-[#D6BD94]">Nossa Missão</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Na Piloto Inteligente, nossa missão é criar peças que unem a nostalgia da aviação 
              clássica com o conforto e estilo contemporâneos. Cada produto é pensado para contar 
              uma história, homenagear uma aeronave ou lembrar um momento da história da aviação.
            </p>
            
            <h2 className="text-3xl font-bold mb-6 text-[#D6BD94]">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-[#161618] p-6 rounded-lg">
                <div className="w-12 h-12 flex items-center justify-center bg-[#D6BD94] text-black rounded-full mb-4 font-bold">01</div>
                <h3 className="text-xl font-bold mb-2">Qualidade</h3>
                <p className="text-gray-400">Utilizamos os melhores materiais e processos, garantindo produtos duráveis e confortáveis.</p>
              </div>
              
              <div className="bg-[#161618] p-6 rounded-lg">
                <div className="w-12 h-12 flex items-center justify-center bg-[#D6BD94] text-black rounded-full mb-4 font-bold">02</div>
                <h3 className="text-xl font-bold mb-2">Autenticidade</h3>
                <p className="text-gray-400">Nossas peças são desenhadas com atenção aos detalhes históricos, prestando verdadeira homenagem à aviação.</p>
              </div>
              
              <div className="bg-[#161618] p-6 rounded-lg">
                <div className="w-12 h-12 flex items-center justify-center bg-[#D6BD94] text-black rounded-full mb-4 font-bold">03</div>
                <h3 className="text-xl font-bold mb-2">Sustentabilidade</h3>
                <p className="text-gray-400">Comprometidos em reduzir nosso impacto ambiental, adotando práticas mais responsáveis em toda nossa operação.</p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 text-[#D6BD94]">Nosso Compromisso</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Mais do que uma marca de roupas, a Piloto Inteligente é uma celebração do espírito aventureiro 
              e da rica história da aviação. Queremos que quando você vestir nossas peças, sinta-se conectado 
              a essa incrível jornada humana pelos céus.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Nosso compromisso é continuar trazendo essa herança para o presente, criando peças que possam 
              ser apreciadas tanto por entusiastas da aviação quanto por quem simplesmente valoriza produtos 
              únicos e de qualidade.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}