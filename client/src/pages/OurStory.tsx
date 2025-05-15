import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/context/LanguageContext';

export default function OurStory() {
  const { language, t } = useLanguage();

  // Set page title
  useEffect(() => {
    document.title = language === 'pt-BR' 
      ? 'Nossa História - Piloto Inteligente' 
      : 'Our Story - Piloto Inteligente';
  }, [language]);

  return (
    <>
      <Helmet>
        <title>{language === 'pt-BR' ? 'Nossa História - Piloto Inteligente' : 'Our Story - Piloto Inteligente'}</title>
        <meta 
          name="description" 
          content={language === 'pt-BR' 
            ? 'Conheça a história da Piloto Inteligente, nascida da paixão por aviação e aventura.' 
            : 'Discover the story of Piloto Inteligente, born from a passion for aviation and adventure.'}
        />
        <meta property="og:title" content={language === 'pt-BR' ? 'Nossa História - Piloto Inteligente' : 'Our Story - Piloto Inteligente'} />
        <meta property="og:description" content={language === 'pt-BR' 
          ? 'Conheça a história da Piloto Inteligente, nascida da paixão por aviação e aventura.' 
          : 'Discover the story of Piloto Inteligente, born from a passion for aviation and adventure.'} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://pixabay.com/get/ge1f4194b0cb545c8a0297179a3c0784e82db1728256659ef3ab402af4feb14e0cc403b6811db33c0fbb386d4cdcbb4a4a73fa8e1c8c8e2e0443897c6a9e410a1_1280.jpg" />
      </Helmet>

      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-[60vh]" 
        style={{ backgroundImage: "url('https://pixabay.com/get/ge1f4194b0cb545c8a0297179a3c0784e82db1728256659ef3ab402af4feb14e0cc403b6811db33c0fbb386d4cdcbb4a4a73fa8e1c8c8e2e0443897c6a9e410a1_1280.jpg')" }}
      >
        <div className="absolute inset-0 bg-dark-gray/70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="adventure-title text-4xl md:text-6xl text-adventure-yellow mb-4">
              {language === 'pt-BR' ? 'NOSSA HISTÓRIA' : 'OUR STORY'}
            </h1>
            <p className="text-lg md:text-xl text-light-beige max-w-2xl mx-auto">
              {language === 'pt-BR' 
                ? 'Conheça a jornada que nos trouxe até aqui' 
                : 'Discover the journey that brought us here'}
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <section className="mb-16">
            <h2 className="adventure-title text-3xl text-adventure-yellow mb-6">
              {language === 'pt-BR' ? 'O Início da Jornada' : 'The Beginning of the Journey'}
            </h2>
            <div className="prose prose-invert prose-lg">
              <p className="text-light-beige/80 leading-relaxed">
                {language === 'pt-BR' 
                  ? 'A Piloto Inteligente nasceu em 2018 a partir de um sonho compartilhado por dois amigos apaixonados por aviação e história. Fascinados pela estética e pelo espírito aventureiro da "era de ouro" da aviação, entre as décadas de 1920 e 1940, Carlos e Mariana decidiram transformar essa paixão em um projeto que pudesse resgatar e celebrar esse período tão marcante.'
                  : 'Piloto Inteligente was born in 2018 from a shared dream between two friends who were passionate about aviation and history. Fascinated by the aesthetics and adventurous spirit of the "golden age" of aviation, between the 1920s and 1940s, Carlos and Mariana decided to transform this passion into a project that could rescue and celebrate this remarkable period.'}
              </p>
              <p className="text-light-beige/80 leading-relaxed">
                {language === 'pt-BR' 
                  ? 'Em um pequeno estúdio em São Paulo, começamos a desenhar nossas primeiras peças, inspiradas nos aviadores pioneiros que desafiaram os céus quando voar ainda era considerado uma aventura extraordinária. Nossa visão era criar produtos que não fossem apenas bonitos, mas que contassem uma história e transmitissem aquela sensação de liberdade e ousadia que definia os primeiros anos da aviação.'
                  : 'In a small studio in São Paulo, we began designing our first pieces, inspired by the pioneering aviators who challenged the skies when flying was still considered an extraordinary adventure. Our vision was to create products that were not just beautiful, but that told a story and conveyed that sense of freedom and boldness that defined the early years of aviation.'}
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="adventure-title text-3xl text-adventure-yellow mb-6">
              {language === 'pt-BR' ? 'Nossa Filosofia' : 'Our Philosophy'}
            </h2>
            <div className="prose prose-invert prose-lg">
              <p className="text-light-beige/80 leading-relaxed">
                {language === 'pt-BR' 
                  ? 'Desde o início, estabelecemos três pilares fundamentais que continuam a guiar tudo o que fazemos na Piloto Inteligente:'
                  : 'From the beginning, we established three fundamental pillars that continue to guide everything we do at Piloto Inteligente:'}
              </p>
              <ul className="text-light-beige/80 list-disc pl-6 space-y-3">
                <li>
                  <strong className="text-adventure-yellow">
                    {language === 'pt-BR' ? 'Autenticidade:' : 'Authenticity:'}
                  </strong> {' '}
                  {language === 'pt-BR' 
                    ? 'Cada produto é resultado de extensa pesquisa histórica e atenção meticulosa aos detalhes, garantindo que nossas peças capturem verdadeiramente a essência da era que celebramos.'
                    : 'Each product is the result of extensive historical research and meticulous attention to detail, ensuring that our pieces truly capture the essence of the era we celebrate.'}
                </li>
                <li>
                  <strong className="text-adventure-yellow">
                    {language === 'pt-BR' ? 'Qualidade:' : 'Quality:'}
                  </strong> {' '}
                  {language === 'pt-BR' 
                    ? 'Trabalhamos apenas com materiais premium e artesãos experientes, criando produtos duráveis que ficam ainda melhores com o tempo, assim como as histórias que os inspiram.'
                    : 'We work only with premium materials and experienced craftsmen, creating durable products that get even better with time, just like the stories that inspire them.'}
                </li>
                <li>
                  <strong className="text-adventure-yellow">
                    {language === 'pt-BR' ? 'Aventura:' : 'Adventure:'}
                  </strong> {' '}
                  {language === 'pt-BR' 
                    ? 'Buscamos infundir cada criação com o espírito aventureiro que caracterizava aqueles primeiros aviadores, incentivando nossos clientes a abraçar sua própria jornada com audácia e determinação.'
                    : 'We seek to infuse each creation with the adventurous spirit that characterized those first aviators, encouraging our customers to embrace their own journey with boldness and determination.'}
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="adventure-title text-3xl text-adventure-yellow mb-6">
              {language === 'pt-BR' ? 'Crescimento e Evolução' : 'Growth and Evolution'}
            </h2>
            <div className="prose prose-invert prose-lg">
              <p className="text-light-beige/80 leading-relaxed">
                {language === 'pt-BR' 
                  ? 'O que começou como uma pequena coleção de jaquetas inspiradas em uniformes de aviadores rapidamente se expandiu para uma linha completa de roupas, acessórios e artigos de decoração. A cada nova coleção, exploramos diferentes capítulos da história da aviação, das aventuras dos irmãos Wright às heroínas menos conhecidas como Amelia Earhart e Bessie Coleman.'
                  : 'What began as a small collection of jackets inspired by aviator uniforms quickly expanded into a complete line of clothing, accessories, and decorative items. With each new collection, we explore different chapters in aviation history, from the adventures of the Wright brothers to lesser-known heroines like Amelia Earhart and Bessie Coleman.'}
              </p>
              <p className="text-light-beige/80 leading-relaxed">
                {language === 'pt-BR' 
                  ? 'Em 2021, demos um importante passo ao abrir nossa primeira loja física em São Paulo, um espaço cuidadosamente projetado para transportar os visitantes a um hangar vintage dos anos 1930. No ano seguinte, inauguramos nossa segunda loja no Rio de Janeiro, e hoje estamos presentes em revendedores selecionados em todo o Brasil.'
                  : 'In 2021, we took an important step by opening our first physical store in São Paulo, a space carefully designed to transport visitors to a vintage hangar from the 1930s. The following year, we inaugurated our second store in Rio de Janeiro, and today we are present in select retailers throughout Brazil.'}
              </p>
            </div>
          </section>

          <section>
            <h2 className="adventure-title text-3xl text-adventure-yellow mb-6">
              {language === 'pt-BR' ? 'Olhando para o Futuro' : 'Looking to the Future'}
            </h2>
            <div className="prose prose-invert prose-lg">
              <p className="text-light-beige/80 leading-relaxed">
                {language === 'pt-BR' 
                  ? 'Enquanto continuamos a crescer, permanecemos fiéis à nossa missão original: criar produtos excepcionais que honrem o legado dos pioneiros da aviação e inspirem um espírito de aventura em todos que os usam. Estamos constantemente explorando novas formas de contar essas histórias fascinantes e de conectar o passado ao presente através de design atemporal e qualidade incomparável.'
                  : 'As we continue to grow, we remain true to our original mission: to create exceptional products that honor the legacy of aviation pioneers and inspire a spirit of adventure in all who wear them. We are constantly exploring new ways to tell these fascinating stories and to connect the past to the present through timeless design and unparalleled quality.'}
              </p>
              <p className="text-light-beige/80 leading-relaxed">
                {language === 'pt-BR' 
                  ? 'Agradecemos a todos que embarcaram nesta jornada conosco até agora e convidamos você a se juntar à comunidade Piloto Inteligente. Juntos, continuaremos a celebrar o extraordinário espírito humano de exploração e aventura que nos impulsiona a alcançar novos horizontes.'
                  : 'We thank everyone who has embarked on this journey with us so far and invite you to join the Piloto Inteligente community. Together, we will continue to celebrate the extraordinary human spirit of exploration and adventure that drives us to reach new horizons.'}
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
