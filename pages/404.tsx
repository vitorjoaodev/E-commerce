import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();
  const { t } = useLanguage();
  
  // Auto redirect to home page after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-7xl md:text-9xl font-bold text-adventure-yellow">404</h1>
        <p className="text-2xl md:text-3xl mt-4 mb-8 text-white text-center">
          Oops! Esta página parece ter desaparecido nas nuvens.
        </p>
        <div className="max-w-md mx-auto text-center mb-8">
          <p className="text-gray-300 mb-2">
            Estamos redirecionando você para a página inicial em 10 segundos.
          </p>
          <p className="text-gray-400">
            Ou você pode navegar para algum destes destinos:
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/">
            <Button variant="secondary" size="lg">
              Página Inicial
            </Button>
          </Link>
          <Link href="/categoria/aviador">
            <Button variant="outline" size="lg">
              Coleção Aviador
            </Button>
          </Link>
          <Link href="/categoria/aviadora">
            <Button variant="outline" size="lg">
              Coleção Aviadora
            </Button>
          </Link>
          <Link href="/blog">
            <Button variant="outline" size="lg">
              Blog
            </Button>
          </Link>
        </div>
        
        <div className="mt-16 flex items-center">
          <div className="h-px w-12 bg-gray-700"></div>
          <span className="px-4 text-gray-500">Coordenadas perdidas</span>
          <div className="h-px w-12 bg-gray-700"></div>
        </div>
      </div>
    </Layout>
  );
}