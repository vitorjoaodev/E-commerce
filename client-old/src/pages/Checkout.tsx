import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/currency';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Truck, User, Check } from 'lucide-react';

// Form validation schema
const checkoutSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(2, 'Nome muito curto'),
    lastName: z.string().min(2, 'Sobrenome muito curto'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(10, 'Número de telefone inválido'),
  }),
  shippingInfo: z.object({
    address: z.string().min(5, 'Endereço muito curto'),
    city: z.string().min(2, 'Cidade muito curta'),
    state: z.string().min(2, 'Estado muito curto'),
    postalCode: z.string().min(5, 'CEP inválido'),
    country: z.string().min(2, 'País muito curto'),
  }),
  paymentInfo: z.object({
    cardNumber: z.string().regex(/^\d{16}$/, 'Número de cartão inválido'),
    cardholderName: z.string().min(3, 'Nome no cartão muito curto'),
    expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Data de validade inválida (MM/YY)'),
    cvv: z.string().regex(/^\d{3,4}$/, 'CVV inválido'),
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { language, t } = useLanguage();
  const { currency } = useCurrency();
  const { cartItems, clearCart, calculateCartTotal } = useCart();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('personalInfo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  // Calculate totals
  const cartTotal = calculateCartTotal();
  const shippingCost = cartTotal > 250 ? 0 : 20;
  const orderTotal = cartTotal + shippingCost;

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      shippingInfo: {
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Brasil',
      },
      paymentInfo: {
        cardNumber: '',
        cardholderName: '',
        expiryDate: '',
        cvv: '',
      },
    },
  });

  // Set page title
  useEffect(() => {
    document.title = language === 'pt-BR' 
      ? 'Finalizar Compra - Piloto Inteligente' 
      : 'Checkout - Piloto Inteligente';
  }, [language]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !isOrderComplete) {
      window.location.href = '/';
    }
  }, [cartItems, isOrderComplete]);

  const handleSubmit = (data: CheckoutFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Order successful
      clearCart();
      setIsOrderComplete(true);
      setIsSubmitting(false);
      toast({
        title: 'Pedido realizado com sucesso!',
        description: 'Você receberá um email com os detalhes do seu pedido.',
        variant: 'default',
      });
    }, 2000);
  };

  const handleTabChange = (value: string) => {
    // Validate current tab before proceeding
    if (value === 'shippingInfo' && activeTab === 'personalInfo') {
      const isPersonalInfoValid = form.trigger(['personalInfo.firstName', 'personalInfo.lastName', 'personalInfo.email', 'personalInfo.phone']);
      if (!isPersonalInfoValid) return;
    }
    
    if (value === 'paymentInfo' && activeTab === 'shippingInfo') {
      const isShippingInfoValid = form.trigger(['shippingInfo.address', 'shippingInfo.city', 'shippingInfo.state', 'shippingInfo.postalCode', 'shippingInfo.country']);
      if (!isShippingInfoValid) return;
    }
    
    setActiveTab(value);
  };

  if (isOrderComplete) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-adventure-yellow p-4">
              <Check className="h-12 w-12 text-dark-gray" />
            </div>
          </div>
          <h1 className="adventure-title text-3xl text-adventure-yellow mb-4">
            {language === 'pt-BR' ? 'Pedido Concluído!' : 'Order Complete!'}
          </h1>
          <p className="text-light-beige mb-8">
            {language === 'pt-BR' 
              ? 'Seu pedido foi processado com sucesso. Você receberá em breve um email com os detalhes da sua compra.' 
              : 'Your order has been successfully processed. You will soon receive an email with the details of your purchase.'}
          </p>
          <p className="text-light-beige mb-8">
            {language === 'pt-BR' 
              ? 'Obrigado por comprar na Piloto Inteligente!' 
              : 'Thank you for shopping at Piloto Inteligente!'}
          </p>
          <Link href="/">
            <Button className="adventure-title px-8 py-3 bg-adventure-yellow text-dark-gray hover:bg-aviation-blue hover:text-light-beige transition duration-300">
              {language === 'pt-BR' ? 'Voltar para a Loja' : 'Return to Shop'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{language === 'pt-BR' ? 'Finalizar Compra - Piloto Inteligente' : 'Checkout - Piloto Inteligente'}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <h1 className="adventure-title text-3xl text-center text-vintage-beige mb-8">
          {t('checkout.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Tabs value={activeTab} onValueChange={handleTabChange}>
                  <TabsList className="grid grid-cols-3 mb-8">
                    <TabsTrigger 
                      value="personalInfo" 
                      className="adventure-title data-[state=active]:text-adventure-yellow"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {t('checkout.personalInfo')}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="shippingInfo" 
                      className="adventure-title data-[state=active]:text-adventure-yellow"
                      disabled={form.formState.errors.personalInfo !== undefined}
                    >
                      <Truck className="h-4 w-4 mr-2" />
                      {t('checkout.shippingInfo')}
                    </TabsTrigger>
                    <TabsTrigger 
                      value="paymentInfo" 
                      className="adventure-title data-[state=active]:text-adventure-yellow"
                      disabled={
                        form.formState.errors.personalInfo !== undefined || 
                        form.formState.errors.shippingInfo !== undefined
                      }
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {t('checkout.paymentInfo')}
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Personal Information */}
                  <TabsContent value="personalInfo" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="personalInfo.firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Seu nome" 
                                className="bg-dark-gray border-vintage-beige/50 text-light-beige" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="personalInfo.lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sobrenome</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Seu sobrenome" 
                                className="bg-dark-gray border-vintage-beige/50 text-light-beige" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="personalInfo.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="seu@email.com" 
                              type="email"
                              className="bg-dark-gray border-vintage-beige/50 text-light-beige" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="personalInfo.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="(11) 99999-9999" 
                              className="bg-dark-gray border-vintage-beige/50 text-light-beige" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end mt-6">
                      <Button 
                        type="button" 
                        className="adventure-title bg-adventure-yellow text-dark-gray hover:bg-aviation-blue hover:text-light-beige"
                        onClick={() => handleTabChange('shippingInfo')}
                      >
                        Continuar
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {/* Shipping Information */}
                  <TabsContent value="shippingInfo" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="shippingInfo.address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Rua, número, complemento" 
                              className="bg-dark-gray border-vintage-beige/50 text-light-beige" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="shippingInfo.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Sua cidade" 
                                className="bg-dark-gray border-vintage-beige/50 text-light-beige" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="shippingInfo.state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Seu estado" 
                                className="bg-dark-gray border-vintage-beige/50 text-light-beige" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="shippingInfo.postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CEP</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="00000-000" 
                                className="bg-dark-gray border-vintage-beige/50 text-light-beige" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="shippingInfo.country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>País</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Seu país" 
                                className="bg-dark-gray border-vintage-beige/50 text-light-beige" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-between mt-6">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="adventure-title border-vintage-beige text-vintage-beige hover:bg-vintage-beige/10"
                        onClick={() => handleTabChange('personalInfo')}
                      >
                        Voltar
                      </Button>
                      <Button 
                        type="button" 
                        className="adventure-title bg-adventure-yellow text-dark-gray hover:bg-aviation-blue hover:text-light-beige"
                        onClick={() => handleTabChange('paymentInfo')}
                      >
                        Continuar
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {/* Payment Information */}
                  <TabsContent value="paymentInfo" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="paymentInfo.cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número do Cartão</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="0000 0000 0000 0000" 
                              className="bg-dark-gray border-vintage-beige/50 text-light-beige" 
                              {...field}
                              onChange={(e) => {
                                // Remove any non-digit characters
                                const value = e.target.value.replace(/\D/g, '');
                                field.onChange(value);
                              }}
                              maxLength={16}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="paymentInfo.cardholderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome no Cartão</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Nome como está no cartão" 
                              className="bg-dark-gray border-vintage-beige/50 text-light-beige" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="paymentInfo.expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Validade</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="MM/YY" 
                                className="bg-dark-gray border-vintage-beige/50 text-light-beige" 
                                {...field}
                                onChange={(e) => {
                                  let value = e.target.value.replace(/\D/g, '');
                                  if (value.length > 2) {
                                    value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                  }
                                  field.onChange(value);
                                }}
                                maxLength={5}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="paymentInfo.cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="123" 
                                className="bg-dark-gray border-vintage-beige/50 text-light-beige" 
                                {...field}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/\D/g, '');
                                  field.onChange(value);
                                }}
                                maxLength={4}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-between mt-6">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="adventure-title border-vintage-beige text-vintage-beige hover:bg-vintage-beige/10"
                        onClick={() => handleTabChange('shippingInfo')}
                      >
                        Voltar
                      </Button>
                      <Button 
                        type="submit" 
                        className="adventure-title bg-adventure-yellow text-dark-gray hover:bg-aviation-blue hover:text-light-beige"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Processando...' : t('checkout.complete')}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </form>
            </Form>
          </div>
          
          {/* Order Summary */}
          <div className="bg-dark-gray border border-vintage-beige/20 rounded-lg p-6 h-fit">
            <h2 className="adventure-title text-xl text-adventure-yellow mb-4">
              {language === 'pt-BR' ? 'Resumo do Pedido' : 'Order Summary'}
            </h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex items-start">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded mr-3"
                    />
                    <div>
                      <p className="text-vintage-beige">{item.name}</p>
                      <p className="text-light-beige/60 text-sm">
                        {item.variant && `${item.variant} • `}Qtd: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-adventure-yellow">
                    {formatCurrency(Number(item.price) * item.quantity, currency)}
                  </span>
                </div>
              ))}
            </div>
            
            <Separator className="bg-vintage-beige/20 mb-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-light-beige">
                  {language === 'pt-BR' ? 'Subtotal' : 'Subtotal'}
                </span>
                <span className="text-adventure-yellow">
                  {formatCurrency(cartTotal, currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-light-beige">
                  {language === 'pt-BR' ? 'Frete' : 'Shipping'}
                </span>
                <span className="text-light-beige">
                  {shippingCost === 0 
                    ? (language === 'pt-BR' ? 'Grátis' : 'Free') 
                    : formatCurrency(shippingCost, currency)
                  }
                </span>
              </div>
              <Separator className="bg-vintage-beige/20 my-2" />
              <div className="flex justify-between pt-2">
                <span className="text-light-beige font-bold">
                  {language === 'pt-BR' ? 'Total' : 'Total'}
                </span>
                <span className="text-adventure-yellow font-bold text-xl">
                  {formatCurrency(orderTotal, currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
