import React, { createContext, useState, useContext, useEffect } from 'react';

// Contexto para o carrinho de compras
const CartContext = createContext();

// Provedor do contexto do carrinho
export function CartProvider({ children }) {
  // Estado para os itens do carrinho
  const [cartItems, setCartItems] = useState([]);
  // Estado para controlar se o carrinho está aberto/visível
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Carregar carrinho do localStorage quando o componente montar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Erro ao carregar carrinho do localStorage:', e);
      }
    }
  }, []);

  // Salvar carrinho no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Adicionar item ao carrinho
  const addToCart = (item) => {
    setCartItems(prev => {
      // Verificar se o item já existe no carrinho
      const existingItem = prev.find(cartItem => 
        cartItem.id === item.id && cartItem.variant === item.variant
      );
      
      if (existingItem) {
        // Aumentar a quantidade se o item já existe
        return prev.map(cartItem => 
          cartItem.id === item.id && cartItem.variant === item.variant
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Adicionar novo item se não existir
        return [...prev, item];
      }
    });
  };

  // Remover item do carrinho
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Atualizar quantidade de um item
  const updateCartItemQuantity = (id, quantity) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Limpar carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // Alternar visibilidade do carrinho
  const toggleCartOpen = () => {
    setIsCartOpen(prev => !prev);
  };

  // Calcular total do carrinho
  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  // Valores do contexto
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    isCartOpen,
    toggleCartOpen,
    calculateCartTotal
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Hook para usar o contexto do carrinho
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}