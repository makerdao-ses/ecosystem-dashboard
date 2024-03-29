import { useState, useLayoutEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { ThemeType } from '../enums/themeEnum';
import { daysToExpire } from '../utils/date';

interface Props {
  isLightApp: boolean;
}

const useThemeMode = ({ isLightApp }: Props) => {
  const [cookie, setCookie] = useCookies(['themeModeCookie', 'themeTracking']);
  const [isLight, setIsisLight] = useState<boolean>(isLightApp);
  const defaultThemePreference = isLight ? ThemeType.LIGHT : ThemeType.DARK;

  const [currentTheme, setCurrentTheme] = useState<ThemeType>(isLightApp ? ThemeType.LIGHT : ThemeType.DARK);
  useLayoutEffect(() => {
    const changeThemeFromCookie = isLight ? ThemeType.LIGHT : ThemeType.DARK;
    setCurrentTheme((changeThemeFromCookie as ThemeType) || defaultThemePreference);
  }, [defaultThemePreference, isLight, isLightApp, setCookie]);

  const handleThemeMode = useCallback(
    (val: ThemeType) => {
      if (cookie.themeTracking) {
        setCookie('themeModeCookie', val, {
          expires: daysToExpire(),
          path: '/',
        });
      }
      setCurrentTheme(val);
      setIsisLight(!isLight);
    },
    [cookie.themeTracking, isLight, setCookie]
  );

  return {
    currentTheme,
    handleThemeMode,
    isLight,
  };
};

export default useThemeMode;
