import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Link } from 'wouter';
import { formatCurrency } from '@/lib/currency';
import { Button } from '@/components/ui/button';
import { X, Trash } from 'lucide-react';

export default function ShoppingCart() {
  const { t } = useLanguage();
  const { currency } = useCurrency();
  const { 
    cartItems, 
    removeFromCart, 
    updateCartItemQuantity, 
    isCartOpen, 
    toggleCartOpen,
    calculateCartTotal
  } = useCart();

  // Calculate shipping cost (free if total > 250)
  const cartTotal = calculateCartTotal();
  const shippingCost = cartTotal > 250 ? 0 : 20;
  const orderTotal = cartTotal + shippingCost;

  return (
    <div 
      className={`fixed inset-y-0 right-0 max-w-md w-full bg-dark-gray border-l border-vintage-beige/30 z-40 transform transition-transform duration-300 ease-in-out ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-vintage-beige/20 flex justify-between items-center">
          <h3 className="adventure-title text-2xl text-vintage-beige">{t('cart.title')}</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-vintage-beige hover:text-adventure-yellow"
            onClick={toggleCartOpen}
          >
            <X size={24} />
          </Button>
        </div>
        
        <div className="flex-grow overflow-y-auto py-6 px-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center text-light-beige/70 py-8">
              <p>Seu carrinho está vazio</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex border-b border-vintage-beige/10 pb-6">
                <Link href={`/produto/${item.slug}`}>
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded"
                  />
                </Link>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between">
                    <Link href={`/produto/${item.slug}`} className="text-vintage-beige adventure-title">
                      {item.name}
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-light-beige/50 hover:text-adventure-yellow"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                  {item.variant && (
                    <p className="text-light-beige/70 text-sm">{item.variant}</p>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="w-6 h-6 p-0 flex items-center justify-center border border-vintage-beige/50 text-vintage-beige hover:bg-vintage-beige hover:text-dark-gray"
                        onClick={() => updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </Button>
                      <span className="text-light-beige">{item.quantity}</span>
                      <Button 
                        variant="outline"
                        size="icon" 
                        className="w-6 h-6 p-0 flex items-center justify-center border border-vintage-beige/50 text-vintage-beige hover:bg-vintage-beige hover:text-dark-gray"
                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <span className="text-adventure-yellow font-bold">
                      {formatCurrency(Number(item.price) * item.quantity, currency)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="border-t border-vintage-beige/20 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-light-beige">{t('cart.subtotal')}</span>
              <span className="text-adventure-yellow font-bold">
                {formatCurrency(cartTotal, currency)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-light-beige">{t('cart.shipping')}</span>
              <span className="text-light-beige">
                {shippingCost === 0 
                  ? 'Grátis' 
                  : formatCurrency(shippingCost, currency)
                }
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-vintage-beige/10">
              <span className="text-light-beige font-bold">{t('cart.total')}</span>
              <span className="text-adventure-yellow font-bold text-xl">
                {formatCurrency(orderTotal, currency)}
              </span>
            </div>
            
            <Link href="/checkout">
              <Button 
                className="adventure-title w-full py-3 bg-adventure-yellow text-dark-gray hover:bg-aviation-blue hover:text-light-beige transition duration-300 rounded-lg"
              >
                {t('cart.checkout')}
              </Button>
            </Link>
            <Button
              variant="outline"
              className="adventure-title w-full py-3 border border-vintage-beige text-vintage-beige hover:bg-vintage-beige hover:text-dark-gray transition duration-300 rounded-lg"
              onClick={toggleCartOpen}
            >
              {t('cart.continueShopping')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
