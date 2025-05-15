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
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <Compass 
          className="text-primary animate-pulse" 
          size={size === 'sm' ? 24 : size === 'md' ? 32 : 40} 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/3 h-1/3 rounded-full bg-background border border-primary"></div>
        </div>
      </div>
      <span className={`font-bold tracking-widest text-primary ${sizeClasses[size]}`}>
        PILOTO INTELIGENTE
      </span>
    </div>
  );
}