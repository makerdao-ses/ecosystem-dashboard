import { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useScrollLock } from '../../../core/hooks/scroll-hooks';

interface Props {
  isShowBanner: boolean;
  setIsShowBanner: (isShowBanner: boolean) => void;
}

export const useCookiesPolicyBannerMvvm = ({ isShowBanner, setIsShowBanner }: Props) => {
  const { lockScroll, unlockScroll } = useScrollLock();
  const [functionalCookies, setFunctionalCookies] = useState(false);
  const [analyticsCookies, setAnalyticsCookies] = useState(false);
  const [cookies, setCookie] = useCookies(['darkMode', 'timestamp', 'analytics']);

  const handleRejectCookies = useCallback(() => {
    setCookie('darkMode', false);
    setCookie('timestamp', false);
    setCookie('analytics', false);
    unlockScroll();
    setIsShowBanner(false);
  }, [setCookie, setIsShowBanner, unlockScroll]);

  const handleAcceptCookies = useCallback(() => {
    unlockScroll();
    setIsShowBanner(false);
    setCookie('darkMode', functionalCookies);
    setCookie('timestamp', functionalCookies);
    setCookie('analytics', analyticsCookies);
  }, [analyticsCookies, functionalCookies, setCookie, setIsShowBanner, unlockScroll]);

  const handleSettings = useCallback(() => {
    window.scrollTo(0, 0);
    setIsShowBanner(true);
    lockScroll();
  }, [lockScroll, setIsShowBanner]);
  const handleFunctionalCookies = () => {
    setFunctionalCookies(!functionalCookies);
  };

  const handleAnalyticsCookies = () => {
    setAnalyticsCookies(!analyticsCookies);
  };

  return {
    isShowBanner,
    handleRejectCookies,
    handleAcceptCookies,
    handleSettings,
    handleFunctionalCookies,
    handleAnalyticsCookies,
    functionalCookies,
    analyticsCookies,
    setIsShowBanner,
    cookies,
  };
};
