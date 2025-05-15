import { useLanguage } from '@/context/LanguageContext';
import { Instagram } from 'lucide-react';

interface InstagramPost {
  id: string;
  imageUrl: string;
  link: string;
}

export default function InstagramFeed() {
  const { t } = useLanguage();
  
  // Sample Instagram posts - in a real implementation this would come from Instagram API
  const instagramPosts: InstagramPost[] = [
    {
      id: '1',
      imageUrl: 'https://pixabay.com/get/g59a444e410bef42a074b2190e637386fac1f0c4668bc2dead35db9ba455bd3308ffb7966862b6db474bc6b8290f8ad7a224975e27dee13a9573c1a23abd52131_1280.jpg',
      link: 'https://instagram.com/pilotointeligente'
    },
    {
      id: '2',
      imageUrl: 'https://pixabay.com/get/gdfef790406fcb49a6a9981ae54881b78253380e98957800ca9466409d886f27afea35e541f4650e99d9ee909cc93525cbe70494104fdc81598de75b55b51e4bf_1280.jpg',
      link: 'https://instagram.com/pilotointeligente'
    },
    {
      id: '3',
      imageUrl: 'https://pixabay.com/get/gc6b732cc87c5f10ecaaec3a2f06730f59ebdaf7bdb77bdd66329f9f408951f7795d7468617f23604b3cb21516b445f3fb60d625769ba5815ba182ee195bf6fb5_1280.jpg',
      link: 'https://instagram.com/pilotointeligente'
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300',
      link: 'https://instagram.com/pilotointeligente'
    },
    {
      id: '5',
      imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300',
      link: 'https://instagram.com/pilotointeligente'
    },
    {
      id: '6',
      imageUrl: 'https://images.unsplash.com/photo-1502920514313-52581002a659?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300',
      link: 'https://instagram.com/pilotointeligente'
    }
  ];

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="adventure-title text-4xl text-center text-vintage-beige mb-4">
        {t('instagram.title')}
      </h2>
      <p className="text-center text-light-beige mb-12 max-w-2xl mx-auto">
        {t('instagram.subtitle')}
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {instagramPosts.map(post => (
          <a 
            key={post.id}
            href={post.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative group overflow-hidden rounded-lg aspect-square"
          >
            <img 
              src={post.imageUrl} 
              alt="Instagram post" 
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-dark-gray/0 group-hover:bg-dark-gray/60 transition duration-300 flex items-center justify-center">
              <Instagram className="text-transparent group-hover:text-light-beige transition duration-300" size={24} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
