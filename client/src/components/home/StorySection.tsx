import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function StorySection() {
  const { t } = useLanguage();

  return (
    <section 
      className="py-16 bg-cover bg-center relative"
      style={{ backgroundImage: "url('https://pixabay.com/get/ge1f4194b0cb545c8a0297179a3c0784e82db1728256659ef3ab402af4feb14e0cc403b6811db33c0fbb386d4cdcbb4a4a73fa8e1c8c8e2e0443897c6a9e410a1_1280.jpg')" }}
    >
      <div className="absolute inset-0 bg-dark-gray/75"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="adventure-title text-4xl text-adventure-yellow mb-6">
            {t('story.title')}
          </h2>
          <p className="text-light-beige mb-8 leading-relaxed">
            {t('story.content')}
          </p>
          <p className="text-light-beige mb-8 leading-relaxed">
            {t('story.content2')}
          </p>
          <Link href="/nossa-historia">
            <Button 
              variant="outline"
              className="adventure-title inline-block px-6 py-3 border-2 border-adventure-yellow text-adventure-yellow hover:bg-adventure-yellow hover:text-dark-gray transition duration-300"
            >
              {t('story.readMore')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
