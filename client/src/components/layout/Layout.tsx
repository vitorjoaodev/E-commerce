import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useExitIntent } from '../../hooks/useExitIntent';
import ExitPopup from './ExitPopup';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { showExitIntent, resetExitIntent } = useExitIntent({
    sensitivity: 20,
    timeout: 1000,
    showOncePerSession: true,
  });

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