import { useEffect, useState } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Only run this effect on the client
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Check on initial render
      checkIsMobile();
      
      // Add event listener for window resize
      window.addEventListener('resize', checkIsMobile);
      
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('resize', checkIsMobile);
      };
    }
  }, []);
  
  return isMobile;
}