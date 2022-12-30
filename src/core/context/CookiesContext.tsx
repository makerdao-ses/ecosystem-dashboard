import React, { createContext, ReactNode, useContext } from 'react';

import { useCookiesPolicyBannerMvvm } from '../../stories/containers/cookies-policy/cookies-policy-banner.mvvm';
import { CookiesInterface } from '../utils/types-utils';

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

interface Props extends React.PropsWithChildren {
  cookiesObject: CookiesInterface;
  children: ReactNode;
}

const CookiesProviderTracking = ({ cookiesObject, children }: Props) => {
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
    cookiesObject,
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
