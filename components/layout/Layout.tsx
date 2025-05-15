import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ShoppingCart from './ShoppingCart';
import { useExitIntent } from '@/hooks/useExitIntent';
import ExitPopup from './ExitPopup';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { showExitPopup } = useExitIntent();

  return (
    <div className="flex flex-col min-h-screen bg-dark-gray">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ShoppingCart />
      {showExitPopup && <ExitPopup />}
    </div>
  );
}