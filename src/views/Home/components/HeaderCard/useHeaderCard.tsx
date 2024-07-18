import { useCookiesContextTracking } from '@ses/core/context/CookiesContext';
import { useEffect, useState } from 'react';

const useHeaderCard = () => {
  const { isFunctionalTrackingAccepted } = useCookiesContextTracking();

  const [isExpandedFromLocalStorage] = useState(() => {
    if (typeof window !== 'undefined') {
      if (!isFunctionalTrackingAccepted) {
        window.localStorage.removeItem('home-header-card-expanded');
        return true;
      }
      const homeHeaderCardExpanded = window.localStorage.getItem('home-header-card-expanded');
      if (homeHeaderCardExpanded === '0') {
        return false;
      }
      return true;
    }
    return undefined;
  });

  const [isExpandedCopy, setIsExpandedCopy] = useState(isExpandedFromLocalStorage);
  const handleIsExpandedCopy = (expandedCopy: boolean | undefined) => {
    setIsExpandedCopy(expandedCopy);
  };

  const [isExpanded, setIsExpanded] = useState<boolean>();
  const handleIsExpanded = (expanded: boolean | undefined) => {
    setIsExpanded(expanded);
  };

  const [isMobileMenuExpanded, setIsMobileMenuExpanded] = useState(false);
  const handleIsMobileMenuExpanded = (mobileMenuExpanded: boolean) => {
    setIsMobileMenuExpanded(mobileMenuExpanded);
  };

  useEffect(() => {
    if (
      isFunctionalTrackingAccepted ||
      (document.cookie.includes('themeTracking=true') && document.cookie.includes('timestampTracking=true'))
    ) {
      window.localStorage.setItem('home-header-card-expanded', isExpandedCopy ? '1' : '0');
    }
    handleIsExpanded(isExpandedCopy);
  }, [isFunctionalTrackingAccepted, isExpandedFromLocalStorage, isExpandedCopy]);

  return {
    isExpanded,
    handleIsExpanded: handleIsExpandedCopy,
    isMobileMenuExpanded,
    handleIsMobileMenuExpanded,
  };
};

export default useHeaderCard;
