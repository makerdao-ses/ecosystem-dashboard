import { useMediaQuery } from '@mui/material';
import { useMemo, useState, useLayoutEffect } from 'react';
import { ThemeType } from '../enums/theme.enum';

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';
const THEME_MODE = 'THEME_MODE';

const useThemeMode = () => {
  const isUserSystemThemePreferenceDark = useMediaQuery(DARK_SCHEME_QUERY);

  const defaultThemePreference = useMemo(() => {
    if (isUserSystemThemePreferenceDark) {
      return ThemeType.DARK;
    } else {
      return ThemeType.LIGHT;
    }
  }, [isUserSystemThemePreferenceDark]);

  const [currentTheme, setCurrentTheme] = useState<ThemeType>();

  useLayoutEffect(() => {
    const defaultThemeLocalStore = window.localStorage.getItem(THEME_MODE);
    setCurrentTheme((defaultThemeLocalStore as ThemeType) || defaultThemePreference);
  }, [defaultThemePreference]);

  const handleThemeMode = (val: ThemeType) => {
    if (typeof window !== 'undefined') {
      const hasTracking = window.localStorage.getItem('themeTracking');
      if (hasTracking) {
        window.localStorage.setItem(THEME_MODE, val);
      }
    }

    setCurrentTheme(val);
  };

  return {
    currentTheme,
    handleThemeMode,
  };
};

export default useThemeMode;
