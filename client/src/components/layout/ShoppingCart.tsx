import { X, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'wouter';

// Componente simples para o carrinho de compras
export default function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  // Efeito para detectar a tecla ESC para fechar o carrinho
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);
  
  // Função para calcular o total do carrinho
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  };
  
  // Função para formatar o preço em BRL
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };
  
  return (
    <>
      {/* Botão do carrinho */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed z-20 bottom-8 right-8 bg-[#D6BD94] text-black p-4 rounded-full shadow-lg hover:bg-[#C4AA80] transition-colors"
        aria-label="Abrir carrinho"
      >
        <ShoppingBag size={24} />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {cartItems.length}
          </span>
        )}
      </button>
      
      {/* Overlay do carrinho */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Background overlay */}
          <div 
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Conteúdo do carrinho */}
          <div className="absolute top-0 right-0 h-full w-full md:w-96 bg-[#121212] shadow-xl transform transition-transform ease-in-out duration-300">
            <div className="flex flex-col h-full">
              {/* Cabeçalho */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#333]">
                <h2 className="text-xl font-bold text-white">Seu Carrinho</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Lista de itens */}
              <div className="flex-grow overflow-y-auto py-4 px-6">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag size={64} className="text-[#333] mb-4" />
                    <p className="text-white/70 mb-2">Seu carrinho está vazio</p>
                    <p className="text-white/50 text-sm">Adicione alguns itens para continuar</p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex border-b border-[#333] pb-4">
                        <div className="w-20 h-20 bg-[#333] rounded overflow-hidden mr-4">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-white font-medium">{item.name}</h3>
                          {item.variant && <p className="text-white/60 text-sm">{item.variant}</p>}
                          <div className="flex items-center mt-2">
                            <button className="text-white/60 hover:text-[#D6BD94] border border-[#333] px-2">-</button>
                            <span className="mx-2 text-white">{item.quantity}</span>
                            <button className="text-white/60 hover:text-[#D6BD94] border border-[#333] px-2">+</button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-[#D6BD94] font-medium">{formatPrice(parseFloat(item.price))}</p>
                          <button className="text-white/60 hover:text-red-500 text-sm mt-4">
                            Remover
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              {/* Rodapé com resumo */}
              <div className="border-t border-[#333] px-6 py-4">
                {cartItems.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-white/70">Subtotal</span>
                      <span className="text-white">{formatPrice(calculateTotal())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Frete</span>
                      <span className="text-white">Calculado no checkout</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-[#D6BD94]">{formatPrice(calculateTotal())}</span>
                    </div>
                    <Link to="/checkout">
                      <button className="w-full bg-[#D6BD94] hover:bg-[#C4AA80] text-black font-bold py-3 rounded transition-colors">
                        Finalizar Compra
                      </button>
                    </Link>
                  </div>
                )}
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 w-full border border-[#D6BD94] text-[#D6BD94] hover:bg-[#D6BD94]/10 py-2 rounded transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}