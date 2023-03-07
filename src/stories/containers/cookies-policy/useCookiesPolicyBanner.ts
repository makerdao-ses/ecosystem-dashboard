import { daysToExpire } from '@ses/core/utils/date.utils';
import { useCallback, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useScrollLock } from '../../../core/hooks/scroll-hooks';
import type { CookiesInterface } from '../../../core/utils/types-helpers';
interface Props {
  cookiesObject: CookiesInterface;
}

export const useCookiesPolicyBanner = ({ cookiesObject }: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'themeTracking',
    'timestampTracking',
    'analyticsTracking',
    'themeModeCookie',
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
      setCookie('themeTracking', val, {
        expires: daysToExpire(),
        path: '/',
      });
      setCookie('timestampTracking', val, {
        expires: daysToExpire(),
        path: '/',
      });
    },
    [setCookie]
  );
  const setAnalyticsTracking = useCallback(
    (val: boolean) => {
      setCookie('analyticsTracking', val, {
        expires: daysToExpire(),
        path: '/',
      });
    },
    [setCookie]
  );

  const setThemeModeCookie = useCallback(() => {
    const newThemeMode = cookies.themeModeCookie ? cookies.themeModeCookie : 'light';
    setCookie('themeModeCookie', newThemeMode, {
      expires: daysToExpire(),
      path: '/',
    });
  }, [cookies.themeModeCookie, setCookie]);

  const deletedFunctionalTracking = useCallback(() => {
    if (cookies.themeTracking) {
      removeCookie('themeTracking', {
        path: '/',
      });
    }
    if (cookies.timestampTracking) {
      removeCookie('timestampTracking', {
        path: '/',
      });
    }
  }, [cookies.themeTracking, cookies.timestampTracking, removeCookie]);

  const deletedAnalyticsTracking = useCallback(() => {
    if (cookies.analyticsTracking) {
      removeCookie('analyticsTracking', {
        path: '/',
      });
    }
  }, [cookies.analyticsTracking, removeCookie]);

  const deletedThemeCookie = useCallback(() => {
    if (cookies.themeModeCookie) {
      removeCookie('themeModeCookie', {
        path: '/',
      });
    }
  }, [cookies.themeModeCookie, removeCookie]);

  const handleRejectCookies = useCallback(() => {
    setIsShowBanner(false);
    setAnalyticsCheckbox(false);
    setFunctionalCheckbox(false);
    deletedFunctionalTracking();
    deletedAnalyticsTracking();
    deletedThemeCookie();
    unlockScroll();
  }, [deletedFunctionalTracking, deletedAnalyticsTracking, deletedThemeCookie, unlockScroll]);

  const handleAcceptCookies = useCallback(() => {
    setIsShowBanner(false);
    if (functionalCheckbox) {
      setFunctionalTracking(true);
    }
    if (analyticsCheckbox) {
      setAnalyticsTracking(true);
    }
    setThemeModeCookie();
  }, [analyticsCheckbox, functionalCheckbox, setAnalyticsTracking, setFunctionalTracking, setThemeModeCookie]);

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
