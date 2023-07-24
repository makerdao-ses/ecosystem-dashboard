import MobileDetect from 'mobile-detect';
import { useMemo } from 'react';

const useMobileDetector = () => {
  const mobileDetector = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new MobileDetect(window.navigator?.userAgent);
    }
  }, []);

  return mobileDetector;
};

export default useMobileDetector;
