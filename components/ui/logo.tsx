import { Compass } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <div style={{ 
          width: size === 'sm' ? '28px' : size === 'md' ? '36px' : '44px',
          height: size === 'sm' ? '28px' : size === 'md' ? '36px' : '44px',
          position: 'relative',
          borderRadius: '50%',
          border: '2px solid #FFD700'
        }}>
          <Compass 
            className="text-[#FFD700] absolute inset-0 z-10" 
            size={size === 'sm' ? 28 : size === 'md' ? 36 : 44} 
          />
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="w-1/3 h-1/3 rounded-full bg-[#121212] border border-[#FFD700]"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`font-bold tracking-widest text-[#FFD700] ${sizeClasses[size]}`}>
          PILOTO
        </span>
        <span className={`font-bold tracking-widest text-[#FFD700] ${
          size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'
        }`}>
          INTELIGENTE
        </span>
        <div className="w-full h-[2px] mt-1" style={{ background: 'linear-gradient(90deg, transparent, #FFD700, transparent)' }}></div>
      </div>
    </div>
  );
}