import { useState, useLayoutEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { ThemeType } from '../enums/theme.enum';
import { daysToExpire } from '../utils/date.utils';

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
          expires: daysToExpire,
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
