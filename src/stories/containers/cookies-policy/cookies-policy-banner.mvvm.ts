import { useCallback, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useScrollLock } from '../../../core/hooks/scroll-hooks';
import { useMediaQuery } from '@mui/material';

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export const useCookiesPolicyBannerMvvm = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['themeTracking', 'timestampTracking', 'analyticsTracking']);
  const { unlockScroll } = useScrollLock();
  const isUserSystemThemePreferenceDark = useMediaQuery(DARK_SCHEME_QUERY);

  const isThemeTrackingAccepted = useMemo(() => !!cookies?.themeTracking, [cookies]);
  const isTimestampTrackingAccepted = useMemo(() => !!cookies?.timestampTracking, [cookies]);
  const isAnalyticsTrackingAccepted = useMemo(() => !!cookies?.analyticsTracking, [cookies]);
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
      window.localStorage.setItem('themeTracking', `${val}`);
      window.localStorage.setItem('timestampTracking', `${val}`);
    },
    [setCookie]
  );
  const setAnalyticsTracking = useCallback(
    (val: boolean) => {
      setCookie('analyticsTracking', val);
      window.localStorage.setItem('analyticsTracking', `${val}`);
    },
    [setCookie]
  );

  const deletedFunctionalTracking = useCallback(() => {
    removeCookie('themeTracking');
    removeCookie('timestampTracking');
    window.localStorage.removeItem('themeTracking');
    window.localStorage.removeItem('timestampTracking');
  }, [removeCookie]);

  const deletedAnalyticsTracking = useCallback(() => {
    removeCookie('analyticsTracking');
    window.localStorage.removeItem('analyticsTracking');
    const keys = Object.keys(window.localStorage);
    keys.forEach((key) => {
      if (key.includes('activity-visit-')) window.localStorage.removeItem(key);
    });
  }, [removeCookie]);

  const handleRejectCookies = useCallback(() => {
    setIsShowBanner(false);
    setAnalyticsCheckbox(false);
    setFunctionalCheckbox(false);
    deletedFunctionalTracking();
    deletedAnalyticsTracking();
    window.localStorage.removeItem('THEME_MODE');
    unlockScroll();
    const newThemeMode = isUserSystemThemePreferenceDark ? 'light' : 'dark';
    window.localStorage.setItem('THEME_MODE', newThemeMode);
  }, [unlockScroll, deletedFunctionalTracking, deletedAnalyticsTracking, isUserSystemThemePreferenceDark]);

  const handleAcceptCookies = useCallback(() => {
    setIsShowBanner(false);
    if (functionalCheckbox) {
      setFunctionalTracking(true);
    }
    if (analyticsCheckbox) {
      setAnalyticsTracking(true);
    }
  }, [analyticsCheckbox, functionalCheckbox, setAnalyticsTracking, setFunctionalTracking]);

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
  };
};
