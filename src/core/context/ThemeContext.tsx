import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { createContext, ReactNode, useContext, useMemo, useEffect } from 'react';
import darkTheme from '../../../styles/theme/dark';
import lightTheme from '../../../styles/theme/light';
import useThemeMode from '../hooks/useThemeMode';
import { ThemeType } from '../enums/theme.enum';

export type ThemeMode = ThemeType;

const toggleThemeValues = {
  light: ThemeType.DARK,
  dark: ThemeType.LIGHT,
} as Record<string, ThemeType>;

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  isLight: boolean;
}
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { currentTheme: themeMode, handleThemeMode, isLight } = useThemeMode();

  const toggleTheme = () => {
    if (themeMode) handleThemeMode(toggleThemeValues[themeMode]);
  };

  const theme = useMemo(() => (isLight ? lightTheme : darkTheme), [isLight]);

  useEffect(() => {
    if (themeMode !== undefined) {
      handleThemeMode(toggleThemeValues[themeMode]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        themeMode: themeMode as unknown as ThemeMode,
        toggleTheme,
        isLight,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { useThemeContext, ThemeProvider };
