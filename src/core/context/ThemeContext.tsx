import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { createContext, ReactNode, useContext, useMemo } from 'react';
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

interface Props {
  children: ReactNode;
  isLightApp: boolean;
}

const ThemeProvider = ({ children, isLightApp }: Props) => {
  const { currentTheme: themeMode, handleThemeMode, isLight } = useThemeMode({ isLightApp });

  const toggleTheme = () => {
    if (themeMode) {
      handleThemeMode(toggleThemeValues[themeMode]);
    }
  };

  const theme = useMemo(() => (isLight ? lightTheme : darkTheme), [isLight]);
  return (
    <ThemeContext.Provider
      value={{
        themeMode: themeMode as ThemeMode,
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
