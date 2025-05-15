import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/currency';
import { Button } from '@/components/ui/button';

export default function ShoppingCart() {
  const { cartItems, removeFromCart, updateCartItemQuantity, isCartOpen, toggleCartOpen, calculateCartTotal } = useCart();
  const { currency } = useCurrency();
  const { t } = useLanguage();
  
  // Close cart when pressing Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        toggleCartOpen();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isCartOpen, toggleCartOpen]);
  
  // Disable body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);
  
  if (!isCartOpen) return null;
  
  const cartTotal = calculateCartTotal();
  const shippingCost = cartTotal >= 250 ? 0 : 20; // Free shipping over R$250 or $50
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      {/* Cart Panel */}
      <div className="bg-dark-gray w-full max-w-md h-full flex flex-col overflow-hidden animate-in slide-in-from-right">
        {/* Cart Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{t('cart.title')}</h2>
          <button 
            onClick={toggleCartOpen}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Cart Content */}
        <div className="flex-grow overflow-y-auto py-4 px-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <ShoppingBag size={64} className="text-gray-500 mb-4" />
              <p className="text-gray-300 text-lg">Seu carrinho está vazio</p>
              <Button 
                variant="secondary" 
                className="mt-4"
                onClick={toggleCartOpen}
              >
                {t('cart.continueShopping')}
              </Button>
            </div>
          ) : (
            <ul className="space-y-6">
              {cartItems.map((item) => (
                <li key={`${item.id}-${item.variant || ''}`} className="flex gap-4 border-b border-gray-800 pb-4">
                  {/* Product Image */}
                  <div className="h-20 w-20 flex-shrink-0 bg-gray-800 relative rounded overflow-hidden">
                    {item.imageUrl && (
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name}
                        fill
                        sizes="(max-width: 80px) 100vw, 80px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-grow">
                    <Link href={`/produto/${item.slug}`} onClick={toggleCartOpen}>
                      <h3 className="text-white font-medium hover:text-adventure-yellow transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    
                    {item.variant && (
                      <p className="text-sm text-gray-400 mt-1">{item.variant}</p>
                    )}
                    
                    {/* Price */}
                    <div className="mt-1 flex items-center">
                      <span className="text-adventure-yellow font-medium">
                        {formatCurrency(parseFloat(item.price), currency)}
                      </span>
                      
                      {item.originalPrice && (
                        <span className="text-gray-400 text-sm line-through ml-2">
                          {formatCurrency(parseFloat(item.originalPrice), currency)}
                        </span>
                      )}
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-800 text-white h-6 w-6 rounded-full flex items-center justify-center"
                      >
                        <Minus size={14} />
                      </button>
                      
                      <span className="text-white w-6 text-center">{item.quantity}</span>
                      
                      <button 
                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-800 text-white h-6 w-6 rounded-full flex items-center justify-center"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-white transition-colors self-start"
                  >
                    <X size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Cart Footer - Summary and Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-800 bg-gray-900">
            {/* Subtotal */}
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">{t('cart.subtotal')}</span>
              <span className="text-white font-medium">
                {formatCurrency(cartTotal, currency)}
              </span>
            </div>
            
            {/* Shipping */}
            <div className="flex justify-between mb-4">
              <span className="text-gray-300">{t('cart.shipping')}</span>
              <span className="text-white font-medium">
                {shippingCost === 0 
                  ? 'Grátis' 
                  : formatCurrency(shippingCost, currency)
                }
              </span>
            </div>
            
            {/* Total */}
            <div className="flex justify-between mb-6 pt-2 border-t border-gray-800">
              <span className="text-white font-medium">{t('cart.total')}</span>
              <span className="text-adventure-yellow font-bold text-lg">
                {formatCurrency(cartTotal + shippingCost, currency)}
              </span>
            </div>
            
            {/* Checkout Button */}
            <div className="grid grid-cols-1 gap-4">
              <Link href="/checkout">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="w-full"
                  onClick={toggleCartOpen}
                >
                  {t('cart.checkout')}
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={toggleCartOpen}
              >
                {t('cart.continueShopping')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}