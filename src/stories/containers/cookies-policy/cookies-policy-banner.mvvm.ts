import { useCallback, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useScrollLock } from '../../../core/hooks/scroll-hooks';
import { CookiesInterface } from '../../../core/utils/types-helpers';
interface Props {
  cookiesObject: CookiesInterface;
}

export const useCookiesPolicyBannerMvvm = ({ cookiesObject }: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'themeTracking',
    'timestampTracking',
    'analyticsTracking',
    'THEME_MODE',
  ]);
  const { unlockScroll } = useScrollLock();

  const isThemeTrackingAccepted = useMemo(
    () => !!cookiesObject.allowsThemeTracking,
    [cookiesObject.allowsThemeTracking]
  );
  const isTimestampTrackingAccepted = useMemo(
    () => !!cookiesObject.allowsTimestampTracking,
    [cookiesObject.allowsTimestampTracking]
  );
  const isAnalyticsTrackingAccepted = useMemo(
    () => !!cookiesObject.allowsAnalyticsTracking,
    [cookiesObject.allowsAnalyticsTracking]
  );
  const isFunctionalTrackingAccepted = useMemo(
    () => isThemeTrackingAccepted && isTimestampTrackingAccepted,
    [isThemeTrackingAccepted, isTimestampTrackingAccepted]
  );

  // cookie setting
  const [settingCookies, setSettingCookies] = useState(false);

  const initialShowBanner = useMemo(
    () => settingCookies || (!isFunctionalTrackingAccepted && !isAnalyticsTrackingAccepted),
    [isAnalyticsTrackingAccepted, isFunctionalTrackingAccepted, settingCookies]
  );

  const [isShowBanner, setIsShowBanner] = useState(initialShowBanner);

  // checkbox
  const [functionalCheckbox, setFunctionalCheckbox] = useState(true);
  const [analyticsCheckbox, setAnalyticsCheckbox] = useState(true);

  const setFunctionalTracking = useCallback(
    (val: boolean) => {
      setCookie('themeTracking', val);
      setCookie('timestampTracking', val);
    },
    [setCookie]
  );
  const setAnalyticsTracking = useCallback(
    (val: boolean) => {
      setCookie('analyticsTracking', val);
    },
    [setCookie]
  );

  const deletedFunctionalTracking = useCallback(() => {
    removeCookie('themeTracking');
    removeCookie('timestampTracking');
  }, [removeCookie]);

  const deletedAnalyticsTracking = useCallback(() => {
    removeCookie('analyticsTracking');
  }, [removeCookie]);

  const handleRejectCookies = useCallback(() => {
    setIsShowBanner(false);
    setAnalyticsCheckbox(false);
    setFunctionalCheckbox(false);
    deletedFunctionalTracking();
    deletedAnalyticsTracking();
    if (cookies) {
      removeCookie('THEME_MODE');
    }

    unlockScroll();
  }, [deletedFunctionalTracking, deletedAnalyticsTracking, cookies, unlockScroll, removeCookie]);

  const handleAcceptCookies = useCallback(() => {
    setIsShowBanner(false);
    if (functionalCheckbox) {
      setFunctionalTracking(true);
    }
    if (analyticsCheckbox) {
      setAnalyticsTracking(true);
    }
    const newThemeMode = cookies.THEME_MODE ? cookies.THEME_MODE : 'light';
    setCookie('THEME_MODE', newThemeMode);
  }, [
    analyticsCheckbox,
    cookies.THEME_MODE,
    functionalCheckbox,
    setAnalyticsTracking,
    setCookie,
    setFunctionalTracking,
  ]);

  const handleSettings = useCallback((val: boolean) => {
    setSettingCookies(val);
  }, []);

  return {
    isFunctionalTrackingAccepted,
    isShowBanner,
    handleSettings,
    handleRejectCookies,
    handleAcceptCookies,
    functionalCheckbox,
    analyticsCheckbox,
    setFunctionalCheckbox,
    setAnalyticsCheckbox,
    setFunctionalTracking,
    settingCookies,
    setIsShowBanner,
    isThemeTrackingAccepted,
    isTimestampTrackingAccepted,
    isAnalyticsTrackingAccepted,
  };
};
