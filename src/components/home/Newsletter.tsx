import { useState } from 'react';
import { Compass } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    try {
      setStatus('loading');
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="py-16 bg-[#121212] relative">
      {/* Decorative grid lines - diagonal for maps/adventure look */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{ 
          backgroundImage: `repeating-linear-gradient(45deg, #FFD700, #FFD700 1px, transparent 1px, transparent 20px),
                            repeating-linear-gradient(135deg, #FFD700, #FFD700 1px, transparent 1px, transparent 20px)`
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto bg-[#0a0a0c] rounded-lg shadow-xl shadow-black/30 p-8 md:p-12 border border-[#333] relative overflow-hidden">
          {/* Top right decoration */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#FFD700] opacity-30 rounded-tr-2xl"></div>
          
          {/* Bottom left decoration */}
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#FFD700] opacity-30 rounded-bl-2xl"></div>
          
          {/* Content */}
          <div className="flex flex-col items-center text-center z-20 relative">
            <div className="w-16 h-16 rounded-full border-2 border-[#FFD700] flex items-center justify-center mb-6">
              <Compass className="text-[#FFD700] w-8 h-8" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-[#FFD700]">AVENTURE-SE</span> COM A GENTE
            </h2>
            
            <p className="text-gray-300 mb-8 max-w-lg">
              Assine nossa newsletter e receba em primeira mão novidades, 
              lançamentos exclusivos e cupons de desconto.
            </p>
            
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow py-3 px-4 bg-[#1e1e1e] border border-[#333] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                  required
                />
                
                <button 
                  type="submit" 
                  disabled={status === 'loading' || !email}
                  className="bg-[#FFD700] text-black font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Enviando...' : 'ASSINAR'}
                </button>
              </div>
              
              {status === 'success' && (
                <p className="mt-4 text-green-400 text-sm">
                  Obrigado por se inscrever! Em breve você receberá nossos emails.
                </p>
              )}
              
              {status === 'error' && (
                <p className="mt-4 text-red-400 text-sm">
                  Ocorreu um erro. Por favor, tente novamente.
                </p>
              )}
              
              <p className="mt-4 text-gray-500 text-xs">
                Ao assinar, você concorda com nossa <span className="underline cursor-pointer">Política de Privacidade</span>. 
                Nós respeitamos sua privacidade e nunca compartilharemos seus dados.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}