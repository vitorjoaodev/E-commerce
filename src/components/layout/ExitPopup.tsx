import { useState } from 'react';
import { X } from 'lucide-react';

interface ExitPopupProps {
  onClose?: () => void;
}

export default function ExitPopup({ onClose }: ExitPopupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        setError('Ocorreu um erro. Por favor, tente novamente.');
      }
    } catch (error) {
      setError('Ocorreu um erro. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#121212] border border-[#333] rounded-lg shadow-2xl overflow-hidden">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white z-20"
          aria-label="Fechar"
        >
          <X size={24} />
        </button>
        
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/SpitfireIX611a.jpg/640px-SpitfireIX611a.jpg" 
            alt="Spitfire" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-[#121212]"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 p-8 pt-10">
          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-[#D6BD94] mb-2">ESPERE, PILOTO!</h2>
                <p className="text-white text-lg">Não perca essa oportunidade</p>
              </div>
              
              <div className="bg-black/40 p-4 rounded-lg border border-[#D6BD94]/30 mb-6">
                <div className="text-center">
                  <span className="text-5xl font-bold text-[#D6BD94] block mb-1">15% OFF</span>
                  <p className="text-white/80">em sua primeira compra</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail"
                    className="w-full p-3 bg-black/50 border border-[#333] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6BD94] focus:border-transparent"
                    disabled={isSubmitting}
                    required
                  />
                  {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#D6BD94] text-black font-bold rounded-md hover:bg-[#C4AA80] transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? 'Enviando...' : 'OBTER MEU DESCONTO'}
                </button>
              </form>
              
              <p className="text-white/50 text-xs text-center mt-4">
                Ao assinar, você concorda com nossa Política de Privacidade.
                Nós respeitamos sua privacidade e nunca compartilharemos seus dados.
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-[#D6BD94] mb-4">OBRIGADO!</h2>
              <p className="text-white text-lg mb-2">Seu código de desconto foi enviado</p>
              <p className="text-white/70">Verifique seu e-mail e aproveite!</p>
              
              <button
                onClick={onClose}
                className="mt-8 px-6 py-2 bg-[#D6BD94] text-black font-bold rounded-md hover:bg-[#C4AA80] transition-colors"
              >
                CONTINUAR NAVEGANDO
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}