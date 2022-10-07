import { useCallback } from 'react';
export const useScrollLock = () => {
  const lockScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflowY = 'hidden';
    }
  }, []);

  const unlockScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflowY = 'scroll';
    }
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};
