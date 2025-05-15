import { useEffect, useState } from 'react';

interface UseExitIntentOptions {
  sensitivity?: number;
  timeout?: number;
  cookieExpiration?: number;
  showOncePerSession?: boolean;
}

// Function to get a cookie value
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  
  const cookieArray = document.cookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    const cookiePair = cookieArray[i].split('=');
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
};

// Function to set a cookie
const setCookie = (name: string, value: string, days: number): void => {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

// Helper to check if we're on the browser and not server-side
const isBrowser = typeof window !== 'undefined';

export function useExitIntent({
  sensitivity = 20,
  timeout = 1000,
  cookieExpiration = 30,
  showOncePerSession = true
}: UseExitIntentOptions = {}) {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [isExitIntentInitialized, setIsExitIntentInitialized] = useState(false);

  useEffect(() => {
    if (!isBrowser) return;

    // Check if exit intent was already shown
    const exitIntentShown = getCookie('exitIntentShown');
    if (exitIntentShown && showOncePerSession) {
      setIsExitIntentInitialized(true);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let delay = false;

    const resetTimeout = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        delay = false;
      }, timeout);
      delay = true;
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= sensitivity && !delay) {
        setShowExitIntent(true);
        if (showOncePerSession) {
          setCookie('exitIntentShown', 'true', cookieExpiration);
        }
      }
      resetTimeout();
    };

    // Initialize exit intent tracking
    if (!isExitIntentInitialized) {
      document.addEventListener('mouseleave', handleMouseLeave);
      setIsExitIntentInitialized(true);
    }

    return () => {
      if (isBrowser) {
        document.removeEventListener('mouseleave', handleMouseLeave);
        clearTimeout(timer);
      }
    };
  }, [sensitivity, timeout, cookieExpiration, showOncePerSession, isExitIntentInitialized]);

  return {
    showExitIntent,
    setShowExitIntent,
  };
}