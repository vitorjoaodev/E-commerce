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
  cookieExpiration = 30,
  showOncePerSession = true,
}: UseExitIntentOptions = {}) {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let hasMounted = true;

    const shouldShowExitIntent = () => {
      // Check for cookie if show once
      if (showOncePerSession) {
        try {
          const hasShown = sessionStorage.getItem('exitIntentShown');
          if (hasShown === 'true') {
            return false;
          }
        } catch (e) {
          // Session storage not available - continue anyway
        }
      }

      // Don't show on mobile since there's no mouse movement
      if (window.innerWidth <= 768) {
        return false;
      }

      return !hasShownExitIntent;
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= sensitivity &&
        e.relatedTarget === null &&
        shouldShowExitIntent()
      ) {
        // Clear any existing timeouts
        if (timeoutId) clearTimeout(timeoutId);

        // Set a timeout to prevent false triggers
        timeoutId = setTimeout(() => {
          if (hasMounted) {
            setShowExitIntent(true);
            setHasShownExitIntent(true);

            // Mark as shown in session storage
            try {
              sessionStorage.setItem('exitIntentShown', 'true');
            } catch (e) {
              // Session storage not available - continue anyway
            }
          }
        }, timeout);
      }
    };

    // Add the event listener
    document.addEventListener('mouseleave', handleMouseLeave);

    // Clean up
    return () => {
      hasMounted = false;
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [sensitivity, timeout, cookieExpiration, showOncePerSession, hasShownExitIntent]);

  const resetExitIntent = () => {
    setShowExitIntent(false);
  };

  return { showExitIntent, resetExitIntent };
}