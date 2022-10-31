import { createContext, ReactNode, useContext } from 'react';

import { useCookiesPolicyBannerMvvm } from '../../stories/containers/cookies-policy/cookies-policy-banner.mvvm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CookiesContextTracking = createContext<any>({} as any);
const useCookiesContextTracking = () => useContext(CookiesContextTracking);

const CookiesProviderTracking = ({ children }: { children: ReactNode }) => {
  const {
    isFunctionalTrackingAccepted,
    isShowBanner,
    setIsShowBanner,
    setAnalyticsCheckbox,
    analyticsCheckbox,
    functionalCheckbox,
    handleAcceptCookies,
    handleRejectCookies,
    setFunctionalCheckbox,
  } = useCookiesPolicyBannerMvvm();
  return (
    <CookiesContextTracking.Provider
      value={{
        isFunctionalTrackingAccepted,
        isShowBanner,
        setIsShowBanner,
        setAnalyticsCheckbox,
        analyticsCheckbox,
        functionalCheckbox,
        handleAcceptCookies,
        handleRejectCookies,
        setFunctionalCheckbox,
      }}
    >
      {children}
    </CookiesContextTracking.Provider>
  );
};

export { useCookiesContextTracking, CookiesProviderTracking };
