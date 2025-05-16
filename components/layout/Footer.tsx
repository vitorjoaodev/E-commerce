import { Link } from 'wouter';
import { Logo } from '../ui/logo';
import { Compass, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0a0a0c] border-t border-[#333]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo & About */}
          <div className="space-y-4">
            <Logo size="sm" />
            <p className="text-gray-400 mt-4">
              Especialistas em roupas e acessórios inspirados na era dourada da aviação.
              Peças exclusivas para aventureiros dos céus.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-[#FFD700] hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-[#FFD700] hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-[#FFD700] hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Shop Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 uppercase">Loja</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categoria/aviador" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  Aviador
                </Link>
              </li>
              <li>
                <Link to="/categoria/aviadora" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  Aviadora
                </Link>
              </li>
              <li>
                <Link to="/categoria/acessorios" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  Acessórios
                </Link>
              </li>
              <li>
                <Link to="/produtos/mais-vendidos" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  Mais Vendidos
                </Link>
              </li>
              <li>
                <Link to="/produtos/novidades" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  Novidades
                </Link>
              </li>
              <li>
                <Link to="/produtos/promocoes" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  Promoções
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Information */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 uppercase">Informações</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/nossa-historia" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  Nossa História
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/perguntas-frequentes" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/envio" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  Envio e Entrega
                </Link>
              </li>
              <li>
                <Link to="/devolucoes" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  Devoluções
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  Termos e Condições
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 uppercase">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-[#FFD700] w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Aeroporto Internacional de São Paulo, Hangar 7, Rod. Hélio Smidt, s/nº - Cumbica, Guarulhos - SP, 07190-100
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="text-[#FFD700] w-5 h-5 mr-3 flex-shrink-0" />
                <span className="text-gray-400">(11) 1234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-[#FFD700] w-5 h-5 mr-3 flex-shrink-0" />
                <a href="mailto:contato@pilotointeligente.com" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  contato@pilotointeligente.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-[#333] py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Piloto Inteligente. Todos os direitos reservados.
          </div>
          <div className="flex space-x-6">
            <Link to="/privacidade" className="text-gray-500 hover:text-[#FFD700] text-sm transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/cookies" className="text-gray-500 hover:text-[#FFD700] text-sm transition-colors">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}