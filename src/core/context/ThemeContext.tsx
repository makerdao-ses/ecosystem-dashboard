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

  const theme = useMemo(() => (isLight ? lightTheme : darkTheme), [themeMode]);

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
        isLight,
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
