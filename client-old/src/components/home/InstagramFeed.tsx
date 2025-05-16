import { Instagram } from 'lucide-react';

export default function InstagramFeed() {
  // Mock Instagram posts
  const instagramPosts = [
    {
      id: 1,
      imageUrl: 'https://redcanoebrands.com/wp-content/uploads/2024/10/M-LST-CREWBASE-SL_lifestyle-3.jpg',
      caption: 'Novos modelos da coleção Aviador já disponíveis! #PilotoInteligente #ModaAviação',
      likes: 124,
      comments: 18
    },
    {
      id: 2,
      imageUrl: 'https://redcanoebrands.com/wp-content/uploads/2024/10/M-LST-CREWBASE-WB_lifestyle2.jpg',
      caption: 'Estilo e conforto para suas viagens. Onde você vai decolar hoje? ✈️ #ModoViagem',
      likes: 97,
      comments: 12
    },
    {
      id: 3,
      imageUrl: 'https://redcanoebrands.com/wp-content/uploads/2023/03/U-BAG-VINTAGELOGOBP-KI_lifestyle1.jpg',
      caption: 'Acessórios que combinam estilo e funcionalidade para o dia a dia. #EstiloAviador',
      likes: 142,
      comments: 23
    },
    {
      id: 4,
      imageUrl: 'https://redcanoebrands.com/wp-content/uploads/2021/09/Boeing-Full-Zip_Lifestyle.jpg',
      caption: 'Nossa coleção Boeing traz o máximo em conforto e estilo para todas as ocasiões. #Boeing',
      likes: 189,
      comments: 31
    }
  ];

  return (
    <section className="bg-[#0a0a0c] py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[#D6BD94] text-sm uppercase tracking-widest mb-4 flex items-center justify-center">
            <Instagram size={16} className="mr-2" /> Instagram
          </h2>
          <h3 className="text-white text-3xl md:text-4xl font-bold">Siga nossas aventuras</h3>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Acompanhe a Piloto Inteligente no Instagram para novidades, lançamentos exclusivos e histórias de aviação.
          </p>
        </div>
        
        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {instagramPosts.map(post => (
            <div 
              key={post.id} 
              className="relative group overflow-hidden rounded-lg aspect-square"
            >
              <img 
                src={post.imageUrl} 
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-white">
                <p className="text-sm mb-4 text-center">{post.caption}</p>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">❤️ {post.likes}</span>
                  <span className="flex items-center">💬 {post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Follow Button */}
        <div className="text-center mt-12">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border-2 border-[#D6BD94] text-[#D6BD94] hover:bg-[#D6BD94]/10 transition-colors rounded-md font-medium"
          >
            <Instagram size={20} className="mr-2" />
            Seguir no Instagram
          </a>
        </div>
      </div>
    </section>
  );
}