import { ReactNode, useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ShoppingCart from './ShoppingCart';
import ExitPopup from './ExitPopup';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showExitIntent, setShowExitIntent] = useState(false);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 20 && e.relatedTarget === null) {
        // Set a timeout to prevent false triggers
        timeoutId = setTimeout(() => {
          setShowExitIntent(true);
        }, 1000);
      }
    };
    
    // Add the event listener
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Clean up
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
  
  const resetExitIntent = () => {
    setShowExitIntent(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0c]">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      
      {/* Exit Intent Popup */}
      {showExitIntent && <ExitPopup onClose={resetExitIntent} />}
    </div>
  );
}