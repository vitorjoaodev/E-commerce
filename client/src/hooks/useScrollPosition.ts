import { useState, useEffect } from 'react';

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const newDirection = position > lastScrollTop ? 'down' : 'up';
      
      setScrollPosition(position);
      setDirection(newDirection);
      setIsAtTop(position < 10);
      setLastScrollTop(position <= 0 ? 0 : position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return { scrollPosition, direction, isAtTop };
}
