import { Link } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Layers
} from 'lucide-react';
import { FaInstagram, FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-dark-gray border-t border-vintage-beige/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Column */}
          <div>
            <Link href="/" className="adventure-title text-3xl text-vintage-beige flex items-center mb-4">
              <span className="text-adventure-yellow">PILOTO</span>INTELIGENTE
              <span className="ml-2 text-aviation-blue">
                <Layers size={18} />
              </span>
            </Link>
            <p className="text-light-beige/70 mb-6">
              {t('footer.about')}
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/pilotointeligente" target="_blank" rel="noopener noreferrer" className="text-vintage-beige hover:text-adventure-yellow transition duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="https://facebook.com/pilotointeligente" target="_blank" rel="noopener noreferrer" className="text-vintage-beige hover:text-adventure-yellow transition duration-300">
                <FaFacebookF size={20} />
              </a>
              <a href="https://twitter.com/pilotointeligente" target="_blank" rel="noopener noreferrer" className="text-vintage-beige hover:text-adventure-yellow transition duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="https://pinterest.com/pilotointeligente" target="_blank" rel="noopener noreferrer" className="text-vintage-beige hover:text-adventure-yellow transition duration-300">
                <FaPinterestP size={20} />
              </a>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h3 className="adventure-title text-xl text-adventure-yellow mb-6">{t('footer.shop')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/categoria/aviador" className="text-light-beige hover:text-adventure-yellow transition duration-300">
                  {t('footer.shopMen')}
                </Link>
              </li>
              <li>
                <Link href="/categoria/aviadora" className="text-light-beige hover:text-adventure-yellow transition duration-300">
                  {t('footer.shopWomen')}
                </Link>
              </li>
              <li>
                <Link href="/categoria/acessorios" className="text-light-beige hover:text-adventure-yellow transition duration-300">
                  {t('footer.accessories')}
                </Link>
              </li>
              <li>
                <Link href="/categoria/mais-vendidos" className="text-light-beige hover:text-adventure-yellow transition duration-300">
                  {t('footer.bestsellers')}
                </Link>
              </li>
              <li>
                <Link href="/categoria/novidades" className="text-light-beige hover:text-adventure-yellow transition duration-300">
                  {t('footer.newArrivals')}
                </Link>
              </li>
              <li>
                <Link href="/categoria/promocoes" className="text-light-beige hover:text-adventure-yellow transition duration-300">
                  {t('footer.sale')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Info Links */}
          <div>
            <h3 className="adventure-title text-xl text-adventure-yellow mb-6">{t('footer.information')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/nossa-historia" className="text-light-beige hover:text-adventure-yellow transition duration-300">
                  {t('footer.ourStory')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-light-beige hover:text-adventure-yellow transition duration-300">
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-light-beige hover:text-adventure-yellow transition duration-300">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link href="/envio-e-entregas" className="text-light-beige hover:text-adventure-yellow transition duration-300">
                  {t('footer.shipping')}
                </Link>
              </li>
              <li>
                <Link href="/politica-de-trocas" className="text-light-beige hover:text-adventure-yellow transition duration-300">
                  {t('footer.returns')}
                </Link>
              </li>
              <li>
                <Link href="/termos-de-servico" className="text-light-beige hover:text-adventure-yellow transition duration-300">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="adventure-title text-xl text-adventure-yellow mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-adventure-yellow mt-1 mr-3" size={18} />
                <span className="text-light-beige">
                  {t('footer.address').split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index === 0 && <br />}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="text-adventure-yellow mr-3" size={18} />
                <a href="tel:+551199999999" className="text-light-beige hover:text-adventure-yellow transition duration-300">
                  +55 11 9999-9999
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="text-adventure-yellow mr-3" size={18} />
                <a href="mailto:contato@pilotointeligente.com.br" className="text-light-beige hover:text-adventure-yellow transition duration-300">
                  contato@pilotointeligente.com.br
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="text-adventure-yellow mr-3" size={18} />
                <span className="text-light-beige">{t('footer.hours')}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-vintage-beige/20 flex flex-col md:flex-row justify-between items-center">
          <div className="text-light-beige/50 text-sm mb-4 md:mb-0">
            {t('footer.copyright')}
          </div>
          <div className="flex items-center space-x-6">
            {/* Payment method icons */}
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" className="h-6 bg-white rounded" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" alt="Mastercard" className="h-6" />
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 576 512">
              <path fill="#FFFFFF" d="M186.3 258.2c0 12.2-9.7 21.5-22 21.5-9.2 0-16-5.2-16-15 0-12.2 9.5-22 21.7-22 9.3 0 16.3 5.7 16.3 15.5zM80.5 209.7h-4.7c-1.5 0-3 1-3.2 2.7l-4.3 26.7 8.2-.3c11 0 19.5-1.5 21.5-14.2 2.3-13.4-6.2-14.9-17.5-14.9zm284 0H360c-1.8 0-3 1-3.2 2.7l-4.2 26.7 8-.3c13 0 22-3 22-18-.1-10.6-9.6-11.1-18.1-11.1zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM128.3 215.4c0-21-16.2-28-34.7-28h-40c-2.5 0-5 2-5.2 4.7L32 294.2c-.3 2 1.2 4 3.2 4h19c2.7 0 5.2-2.9 5.5-5.7l4.5-26.6c1-7.2 13.2-4.7 18-4.7 28.6 0 46.1-17 46.1-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.2 8.2-5.8-8.5-14.2-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9 0 20.2-4.9 26.5-11.9-.5 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H200c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm40.5 97.9l63.7-92.6c.5-.5 .5-1 .5-1.7 0-1.7-1.5-3.5-3.2-3.5h-19.2c-1.7 0-3.5 1-4.5 2.5l-26.5 39-11-37.5c-.8-2.2-3-4-5.5-4h-18.5c-1.5 0-3 1.2-3 2.7 0 1.3 .5 2.3 1 3.2l29.2 83.5c0 .2 .2 .5 .2 .7 0 1.8-2.3 3.5-4.7 3.5h-10.5c-. as?2 .7-1.5 1.2-2.7 1.5-2.5 .5-3.7 .8-3.7 2.5 0 1 .5 1.8 1 2.2 .2 .2 .3 .5 .7 .5h36c1.2 0 2.2-1 3-2l9.2-13.4zM364 290.9c0-25.2-13.7-47.2-36.2-47.2-15.3 0-26 9.2-26 24 0 13.4 6.8 22.5 19.5 22.5h5.2c1.8 0 3.5-1.7 3.5-3.2 0-.3 0-.5-.3-.7-8-12.7 7.5-25.2-7.2-25.2-10.7 0-10.7 11.2-10.7 20.2 0 12.7 3.5 19.7 16.7 19.7 13.5 0 22.7-10.2 22.7-23.5 0-9.7-5.8-19.2-13.7-23.5 18.2-1.8 26.5 9 26.5 37zm61.7-7.7h-4.7c-1.8 0-3.2 1-3.2 2.7 0 1.8 1.5 3.2 3.2 3.2h4.7c1.8 0 3-1.5 3-3.2 .3-1.8-1.2-2.7-3-2.7z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 384 512">
              <path fill="#FFFFFF" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
              <path fill="#FFFFFF" d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C353.7 383.7 372.6 391.5 392.6 391.5H407.7L310.6 244.1C291.3 263.4 262.3 271.3 234.4 264.7C206.5 258.1 184.5 237.4 176.3 209.8L20.63 407.7H35.53C55.64 407.7 74.61 399.9 88.7 385.5L165.7 308.5C171.1 303.1 180.4 303.1 185.8 308.5L262.8 385.5C276.9 399.9 295.8 407.7 315.1 407.7H381.7C425.1 407.7 453.7 354.5 428.3 318.4L289.1 116.7C275.5 97.67 254.7 87.1 232.7 87.1C219.5 87.1 206.7 91.76 195.4 98.9C190.4 102.1 187.8 104.7 184.1 108.9L169.7 125.9L336.3 33.77C360.7 46.71 376.1 72.02 376.1 99.98L376.1 120.8C376.1 127.4 371.5 133.8 363.5 135.6C343.6 139.9 329.9 158.4 332.3 178.6C333 185.2 331.8 191.8 328.9 197.6L308.4 166.5L279.5 195.4L242.4 232.5C237.1 237.9 227.7 237.9 222.3 232.5C216.1 227.1 216.1 217.7 222.3 212.3L251.2 183.4L180.7 82.58L172.7 92.69C167.5 99.62 159.3 103.1 150.5 103.1C141.7 103.1 133.5 99.62 128.3 92.69L116.7 78.65C103.5 86.63 92.21 97.69 83.05 110.1L243.7 302.5C244.6 310.1 247.4 318 251.9 325.1L242.4 315.6C237.1 310.2 237.1 300.8 242.4 295.5V292.5zM328.1 202.8L383.6 282.9C391.8 294.7 384.8 310.7 370.2 310.7H336C329.7 310.7 323.9 308.4 319.7 304.2L271.9 256.4L292.9 235.5L328.1 202.8zM153.1 233.1C157.7 235.9 161.5 237.7 165.5 238.8C183.1 243.6 202.7 239.3 215.1 226L215.3 225.7L232.7 208.3C245.1 195.8 248.2 175.8 242.6 158.8C241.6 155.4 240.1 152.3 238.3 149.3C268.5 183.4 247.3 163.2 277.2 193.1L320.2 150.1C333.7 137.5 356.3 151.3 349.6 171.4C347.3 179.2 342.4 185.9 335.5 190.6C335.5 190.6 335.6 190.5 335.6 190.5L288.4 227.3L328.1 202.8C347.9 223.2 368.8 245 388.7 265.1C398.5 275.9 399 291.6 390.6 302.8C383.6 312 370.9 313.7 360.8 307.1C348.8 298.8 337.2 290.2 325.9 280.9L211.5 395.7C206.7 400.5 199.5 400.5 194.6 395.7L122.4 323.5C107.9 309 107.9 285.6 122.4 271.1L153.1 233.1z"/>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
