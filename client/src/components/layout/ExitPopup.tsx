import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const subscribeSchema = z.object({
  email: z.string().email('Email inválido'),
});

type SubscribeFormData = z.infer<typeof subscribeSchema>;

interface ExitPopupProps {
  onClose?: () => void;
}

export default function ExitPopup({ onClose }: ExitPopupProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubscribe = async (data: SubscribeFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/newsletter/subscribe', data);
      toast({
        title: 'Sucesso!',
        description: 'Seu código de desconto será enviado para o seu email.',
        variant: 'default',
      });
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível se inscrever. Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-dark-gray/80 z-50 flex items-center justify-center">
      <div className="exit-popup bg-dark-gray border-2 border-adventure-yellow rounded-lg p-8 max-w-md mx-4 relative animate-fadeIn">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-vintage-beige hover:text-adventure-yellow"
          onClick={onClose}
        >
          <X size={20} />
        </Button>
        
        <div className="text-center mb-6">
          <div className="adventure-title text-4xl text-adventure-yellow mb-2">{t('exitPopup.title')}</div>
          <p className="text-xl text-light-beige">{t('exitPopup.subtitle')}</p>
        </div>
        
        <div className="mb-6">
          <div className="text-center mb-4">
            <span className="adventure-title text-6xl text-adventure-yellow">15%</span>
            <p className="text-vintage-beige">{t('exitPopup.discount')}</p>
          </div>
          <p className="text-light-beige text-center mb-4">
            {t('exitPopup.offer')}
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubscribe)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t('exitPopup.emailPlaceholder')}
                      className="w-full py-3 px-4 bg-dark-gray border border-vintage-beige/50 rounded-lg text-light-beige focus:outline-none focus:border-adventure-yellow"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-adventure-yellow text-sm mt-1" />
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="adventure-title w-full px-6 py-3 bg-adventure-yellow text-dark-gray hover:bg-aviation-blue hover:text-light-beige transition duration-300 rounded-lg"
            >
              {isSubmitting ? 'Enviando...' : t('exitPopup.getDiscount')}
            </Button>
          </form>
        </Form>
        
        <p className="text-light-beige/60 text-xs text-center mt-4">
          {t('exitPopup.privacy')}
        </p>
      </div>
    </div>
  );
}
