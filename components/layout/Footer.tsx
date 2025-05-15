import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-adventure-yellow mb-4">PILOTO INTELIGENTE</h3>
            <p className="text-gray-300 mb-4">{t('footer.about')}</p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-adventure-yellow transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-adventure-yellow transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-adventure-yellow transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h3 className="text-adventure-yellow font-bold mb-4">{t('footer.shop')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categoria/aviador" className="text-gray-300 hover:text-adventure-yellow transition-colors">
                  {t('footer.shopMen')}
                </Link>
              </li>
              <li>
                <Link href="/categoria/aviadora" className="text-gray-300 hover:text-adventure-yellow transition-colors">
                  {t('footer.shopWomen')}
                </Link>
              </li>
              <li>
                <Link href="/categoria/acessorios" className="text-gray-300 hover:text-adventure-yellow transition-colors">
                  {t('footer.accessories')}
                </Link>
              </li>
              <li>
                <Link href="/mais-vendidos" className="text-gray-300 hover:text-adventure-yellow transition-colors">
                  {t('footer.bestsellers')}
                </Link>
              </li>
              <li>
                <Link href="/novidades" className="text-gray-300 hover:text-adventure-yellow transition-colors">
                  {t('footer.newArrivals')}
                </Link>
              </li>
              <li>
                <Link href="/promocoes" className="text-gray-300 hover:text-adventure-yellow transition-colors">
                  {t('footer.sale')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Information Links */}
          <div>
            <h3 className="text-adventure-yellow font-bold mb-4">{t('footer.information')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/nossa-historia" className="text-gray-300 hover:text-adventure-yellow transition-colors">
                  {t('footer.ourStory')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-adventure-yellow transition-colors">
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-adventure-yellow transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link href="/envio-e-entregas" className="text-gray-300 hover:text-adventure-yellow transition-colors">
                  {t('footer.shipping')}
                </Link>
              </li>
              <li>
                <Link href="/politica-de-trocas" className="text-gray-300 hover:text-adventure-yellow transition-colors">
                  {t('footer.returns')}
                </Link>
              </li>
              <li>
                <Link href="/termos-de-servico" className="text-gray-300 hover:text-adventure-yellow transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-adventure-yellow font-bold mb-4">{t('footer.contact')}</h3>
            <address className="text-gray-300 not-italic mb-4 whitespace-pre-line">
              {t('footer.address')}
            </address>
            <p className="text-gray-300 mb-2">{t('footer.hours')}</p>
            <a href="mailto:contato@pilotointeligente.com.br" className="text-adventure-yellow hover:underline">
              contato@pilotointeligente.com.br
            </a>
          </div>
        </div>
        
        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-400 text-sm">
          <p>{t('footer.copyright').replace('2023', currentYear.toString())}</p>
        </div>
      </div>
    </footer>
  );
}