import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import { Category } from '@shared/schema';
import { Button } from '@/components/ui/button';

export default function CategoryHighlights() {
  const { t } = useLanguage();
  
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  if (isLoading) {
    return (
      <section className="py-16 container mx-auto px-4">
        <h2 className="adventure-title text-4xl text-center text-vintage-beige mb-12">
          {t('categories.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-dark-gray/20 animate-pulse h-[500px] rounded-lg"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="adventure-title text-4xl text-center text-vintage-beige mb-12">
        {t('categories.title')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.slice(0, 3).map((category) => (
          <div key={category.id} className="group relative overflow-hidden rounded-lg">
            <img 
              src={category.imageUrl || 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=800'} 
              alt={category.name} 
              className="w-full h-[500px] object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-gray/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="adventure-title text-3xl text-adventure-yellow mb-2">
                {category.name === 'Aviador' ? t('categories.aviador') :
                 category.name === 'Aviadora' ? t('categories.aviadora') :
                 t('categories.accessories')}
              </h3>
              <p className="text-light-beige mb-4 max-w-xs">
                {category.description || (
                  category.name === 'Aviador' ? t('categories.aviadorDesc') :
                  category.name === 'Aviadora' ? t('categories.aviadoraDesc') :
                  t('categories.accessoriesDesc')
                )}
              </p>
              <Link href={`/categoria/${category.slug}`}>
                <Button 
                  variant="outline"
                  className="inline-block px-5 py-2 border-2 border-vintage-beige text-vintage-beige hover:bg-vintage-beige hover:text-dark-gray transition duration-300 adventure-title"
                >
                  {t('categories.shopNow')}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
