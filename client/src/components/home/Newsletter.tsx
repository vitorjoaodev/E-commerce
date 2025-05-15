import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const subscribeSchema = z.object({
  email: z.string().email('Email inválido'),
});

type SubscribeFormData = z.infer<typeof subscribeSchema>;

export default function Newsletter() {
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
        description: 'Você foi inscrito na nossa newsletter.',
        variant: 'default',
      });
      form.reset();
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
    <section 
      className="py-16 bg-cover bg-center relative" 
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=800')",
        backgroundColor: '#1E1E1E',
        backgroundBlendMode: 'overlay' 
      }}
    >
      <div className="absolute inset-0 bg-dark-gray/80"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="adventure-title text-4xl text-adventure-yellow mb-4">
            {t('newsletter.title')}
          </h2>
          <p className="text-light-beige mb-8 text-lg">
            {t('newsletter.subtitle')}
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubscribe)} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        placeholder={t('newsletter.emailPlaceholder')}
                        className="py-3 px-4 bg-dark-gray border border-vintage-beige/50 rounded-lg text-light-beige focus:outline-none focus:border-adventure-yellow w-full"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-adventure-yellow text-sm mt-1" />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="adventure-title px-6 py-3 bg-adventure-yellow text-dark-gray hover:bg-aviation-blue hover:text-light-beige transition duration-300 rounded-lg whitespace-nowrap"
              >
                {isSubmitting ? 'Enviando...' : t('newsletter.subscribe')}
              </Button>
            </form>
          </Form>
          
          <p className="text-light-beige/60 text-sm mt-4">
            {t('newsletter.privacy')}
          </p>
        </div>
      </div>
    </section>
  );
}
