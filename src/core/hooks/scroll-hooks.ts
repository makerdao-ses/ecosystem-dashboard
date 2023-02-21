import { useCallback } from 'react';
import { enablePageOverflow } from '../utils/dom';
export const useScrollLock = () => {
  const lockScroll = useCallback(() => {
    enablePageOverflow(false);
  }, []);

  const unlockScroll = useCallback(() => {
    enablePageOverflow(true);
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};
