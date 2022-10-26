import { createContext, ReactNode, useContext } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material';
import lightTheme from '../../../styles/theme/light';
import darkTheme from '../../../styles/theme/dark';

import { itemsWebSiteLinks } from '../../stories/components/header/select-link-website/menu-items';
import Header from '../../stories/components/header/header';
import Footer from '../../stories/components/footer/footer';
import { developer, governesses, products } from '../../stories/components/footer/iconsData';
import styled from '@emotion/styled';
import { useCookies } from 'react-cookie';
import useLocalStorage from '../hooks/useLocalStorage';

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export type ThemeMode = 'light' | 'dark';
interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [cookies] = useCookies(['darkMode']);
  const userSystemThemePreferenceDark = useMediaQuery(DARK_SCHEME_QUERY);

  const defaultInitialTheme = userSystemThemePreferenceDark && cookies.darkMode === 'true' ? 'dark' : 'light';

  const { state, handleStorageChange: setThemeMode } = useLocalStorage('themeMode', defaultInitialTheme);
  const themeMode = state as ThemeMode;
  const toggleTheme = () => {
    switch (themeMode) {
      case 'light':
        setThemeMode('dark');
        break;
      case 'dark':
        setThemeMode('light');
        break;
      default:
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        toggleTheme,
      }}
    >
      <MuiThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
        <Header links={itemsWebSiteLinks} themeMode={themeMode} toggleTheme={toggleTheme} />
        <Container>
          <CssBaseline />
          {children}
        </Container>
        <Footer developer={developer} governesses={governesses} products={products} />
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
