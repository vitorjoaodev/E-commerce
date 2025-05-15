import { useState, useEffect } from 'react';

interface UseExitIntentOptions {
  sensitivity?: number;
  timeout?: number;
  cookieExpiration?: number;
  showOncePerSession?: boolean;
}

export function useExitIntent({
  sensitivity = 20,
  timeout = 1000,
  cookieExpiration = 30, // days
  showOncePerSession = true,
}: UseExitIntentOptions = {}) {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout>;
    let hasUserLeft = false;

    // Check if we've already shown the popup in this session
    if (showOncePerSession) {
      const hasShown = sessionStorage.getItem('exitPopupShown');
      if (hasShown === 'true') {
        setHasShownPopup(true);
      }
    }

    // Check if we've shown the popup in a previous session and still have a valid cookie
    const checkCookie = () => {
      const exitPopupShownCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('exitPopupShown='));
      
      if (exitPopupShownCookie) {
        return true;
      }
      return false;
    };

    if (checkCookie()) {
      setHasShownPopup(true);
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves through the top of the page with some sensitivity
      if (e.clientY <= sensitivity && !hasUserLeft && !hasShownPopup) {
        hasUserLeft = true;
        
        // Delay the popup to avoid false triggers
        delayTimer = setTimeout(() => {
          setShowExitPopup(true);
          setHasShownPopup(true);

          // Set session storage flag
          if (showOncePerSession) {
            sessionStorage.setItem('exitPopupShown', 'true');
          }

          // Set cookie for future sessions
          const date = new Date();
          date.setTime(date.getTime() + (cookieExpiration * 24 * 60 * 60 * 1000));
          document.cookie = `exitPopupShown=true; expires=${date.toUTCString()}; path=/`;
        }, timeout);
      }
    };

    const handleMouseEnter = () => {
      // Clear the timer if the user moves back into the page
      if (delayTimer) {
        clearTimeout(delayTimer);
        hasUserLeft = false;
      }
    };

    // For testing purposes, show the popup after 10 seconds
    const testTimer = setTimeout(() => {
      if (!hasShownPopup && process.env.NODE_ENV === 'development') {
        setShowExitPopup(true);
      }
    }, 10000);

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (testTimer) clearTimeout(testTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [hasShownPopup, sensitivity, timeout, cookieExpiration, showOncePerSession]);

  const closeExitPopup = () => {
    setShowExitPopup(false);
  };

  return { showExitPopup, closeExitPopup };
}
