import { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function ExitPopup() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um endereço de email válido.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          source: 'exit_popup',
          discount: true
        }),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao cadastrar email');
      }
      
      toast({
        title: "Sucesso!",
        description: "Seu código de desconto foi enviado para seu email.",
      });
      
      setIsVisible(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível cadastrar seu email. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleClose = () => {
    setIsVisible(false);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
      <div className="bg-dark-gray border-2 border-adventure-yellow max-w-md w-full rounded-lg overflow-hidden relative animate-in zoom-in-90">
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        {/* Content */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-2">{t('exitPopup.title')}</h2>
          <p className="text-xl text-gray-300 mb-6">{t('exitPopup.subtitle')}</p>
          
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-adventure-yellow">15%</div>
            <p className="text-white text-sm uppercase tracking-wide mt-1">{t('exitPopup.discount')}</p>
          </div>
          
          <p className="text-gray-300 mb-6 text-center">{t('exitPopup.offer')}</p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder={t('exitPopup.emailPlaceholder')}
                className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-adventure-yellow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              variant="secondary" 
              size="lg" 
              className="w-full"
              disabled={isSubmitting}
            >
              {t('exitPopup.getDiscount')}
            </Button>
            
            <p className="text-gray-400 text-xs text-center mt-4">{t('exitPopup.privacy')}</p>
          </form>
        </div>
      </div>
    </div>
  );
}