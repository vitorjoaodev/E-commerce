import { Helmet } from 'react-helmet';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { UserCircle, Package, Heart, Settings, LogOut } from 'lucide-react';

export default function AccountPage() {
  return (
    <>
      <Helmet>
        <title>Minha Conta | Piloto Inteligente</title>
        <meta 
          name="description" 
          content="Acesse sua conta na Piloto Inteligente - gerencie seus pedidos, favoritos e informações pessoais." 
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-[#D6BD94] mb-8">Minha Conta</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="col-span-1">
            <div className="bg-[#161618] rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-[#D6BD94] text-black rounded-full flex items-center justify-center">
                  <UserCircle size={40} />
                </div>
                <div>
                  <p className="text-white font-semibold">Usuário</p>
                  <p className="text-gray-400 text-sm">usuario@exemplo.com</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <Link to="/conta" className="flex items-center space-x-3 text-white hover:text-[#D6BD94] transition-colors p-2 bg-[#0a0a0c] rounded-lg w-full">
                  <UserCircle size={20} />
                  <span>Meu Perfil</span>
                </Link>
                <Link to="/conta/pedidos" className="flex items-center space-x-3 text-white hover:text-[#D6BD94] transition-colors p-2 w-full">
                  <Package size={20} />
                  <span>Meus Pedidos</span>
                </Link>
                <Link to="/conta/favoritos" className="flex items-center space-x-3 text-white hover:text-[#D6BD94] transition-colors p-2 w-full">
                  <Heart size={20} />
                  <span>Favoritos</span>
                </Link>
                <Link to="/conta/configuracoes" className="flex items-center space-x-3 text-white hover:text-[#D6BD94] transition-colors p-2 w-full">
                  <Settings size={20} />
                  <span>Configurações</span>
                </Link>
                <button className="flex items-center space-x-3 text-white hover:text-[#D6BD94] transition-colors p-2 w-full text-left">
                  <LogOut size={20} />
                  <span>Sair</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="col-span-1 md:col-span-2">
            <div className="bg-[#161618] rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-6">Informações Pessoais</h2>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Nome</label>
                  <p className="text-white">Usuário de Exemplo</p>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Email</label>
                  <p className="text-white">usuario@exemplo.com</p>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Telefone</label>
                  <p className="text-white">(11) 98765-4321</p>
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-6">Endereço de Entrega</h2>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Endereço</label>
                  <p className="text-white">Rua dos Aviadores, 123</p>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Cidade</label>
                  <p className="text-white">São Paulo</p>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-1">CEP</label>
                  <p className="text-white">01234-567</p>
                </div>
              </div>
              
              <Button 
                className="bg-[#D6BD94] text-black hover:bg-[#C4AA80] transition-colors"
              >
                Editar Informações
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}