import React, { createContext, ReactNode, useContext } from 'react';

import { useCookiesPolicyBannerMvvm } from '../../stories/containers/cookies-policy/cookies-policy-banner.mvvm';

export type CookiesContextValues = {
  isFunctionalTrackingAccepted: boolean;
  isShowBanner: boolean;
  setIsShowBanner: React.Dispatch<React.SetStateAction<boolean>>;
  setAnalyticsCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
  analyticsCheckbox: boolean;
  functionalCheckbox: boolean;
  handleAcceptCookies: () => void;
  handleRejectCookies: () => void;
  setFunctionalCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
  isThemeTrackingAccepted: boolean;
  isTimestampTrackingAccepted: boolean;
  isAnalyticsTrackingAccepted: boolean;
};

const CookiesContextTracking = createContext<CookiesContextValues>({} as CookiesContextValues);
const useCookiesContextTracking = () => useContext(CookiesContextTracking);

interface Props {
  timestampTracking: string;
  themeTracking: string;
  analyticsTracking: string;
  children: ReactNode;
}

const CookiesProviderTracking: React.FC<React.PropsWithChildren & Props> = ({
  analyticsTracking,
  children,
  themeTracking,
  timestampTracking,
}) => {
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
    isThemeTrackingAccepted,
    isTimestampTrackingAccepted,
    isAnalyticsTrackingAccepted,
  } = useCookiesPolicyBannerMvvm({
    themeTracking,
    timestampTracking,
    analyticsTracking,
  });
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
        isThemeTrackingAccepted,
        isTimestampTrackingAccepted,
        isAnalyticsTrackingAccepted,
      }}
    >
      {children}
    </CookiesContextTracking.Provider>
  );
};

export { useCookiesContextTracking, CookiesProviderTracking };
