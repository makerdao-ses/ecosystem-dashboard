import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { createContext, ReactNode, useContext, useMemo, useEffect } from 'react';
import darkTheme from '../../../styles/theme/dark';
import lightTheme from '../../../styles/theme/light';
import styled from '@emotion/styled';
import Footer from '../../stories/components/footer/footer';
import { developer, governesses, products } from '../../stories/components/footer/iconsData';
import Header from '../../stories/components/header/header';
import { itemsWebSiteLinks } from '../../stories/components/header/select-link-website/menu-items';
import useThemeMode from '../hooks/useThemeMode';
import MainWrapper from './MainWrapper';

const LIGHT = 'light';
const DARK = 'dark';
export type ThemeMode = typeof DARK | typeof LIGHT;

const toggleThemeValues = {
  light: DARK,
  dark: LIGHT,
} as Record<string, ThemeMode>;

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { currentTheme: themeMode, handleThemeMode } = useThemeMode();

  const toggleTheme = () => {
    if (themeMode) handleThemeMode(toggleThemeValues[themeMode]);
  };

  const theme = useMemo(() => (themeMode === 'light' ? lightTheme : darkTheme), [themeMode]);

  useEffect(() => {
    if (themeMode !== undefined) {
      handleThemeMode(toggleThemeValues[themeMode]);
    }
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        themeMode: themeMode as unknown as ThemeMode,
        toggleTheme,
      }}
    >
      <MuiThemeProvider theme={theme}>
        {themeMode !== undefined && <Header links={itemsWebSiteLinks} />}
        <Container>
          <CssBaseline />
          <MainWrapper>{children}</MainWrapper>
        </Container>
        {themeMode !== undefined && <Footer developer={developer} governesses={governesses} products={products} />}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { useThemeContext, ThemeProvider };

const Container = styled.div({
  display: 'flex',
  background: 'white',
  minHeight: 'calc(100vh - 320px)',
});
