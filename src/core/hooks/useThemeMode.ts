import { useMediaQuery } from '@mui/material';
import { useMemo, useState, useLayoutEffect } from 'react';

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';
const THEME_MODE = 'THEME_MODE';
const LIGHT = 'light';
const DARK = 'dark';

type ThemeMode = typeof DARK | typeof LIGHT;

const useThemeMode = () => {
  const isUserSystemThemePreferenceDark = useMediaQuery(DARK_SCHEME_QUERY);

  const defaultThemePreference = useMemo(() => {
    if (isUserSystemThemePreferenceDark) {
      return DARK;
    } else {
      return LIGHT;
    }
  }, [isUserSystemThemePreferenceDark]);

  const [currentTheme, setCurrentTheme] = useState<ThemeMode>();

  useLayoutEffect(() => {
    const defaultThemeLocalStore = window.localStorage.getItem(THEME_MODE);
    setCurrentTheme((defaultThemeLocalStore as ThemeMode) || defaultThemePreference);
  }, [defaultThemePreference]);

  const handleThemeMode = (val: ThemeMode) => {
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
