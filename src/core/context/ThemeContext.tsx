import { createContext, ReactNode, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material';
import lightTheme from '../../../styles/theme/light';
import darkTheme from '../../../styles/theme/dark';
import useLocalStorage from '../hooks/useLocalStorage';
import menuItems from '../../stories/components/header/menu-items';
import { itemsWebSiteLinks } from '../../stories/components/header/select-link-website/menu-items';
import Header from '../../stories/components/header/Header';

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export type ThemeMode = 'light' | 'dark'
interface ThemeContextType {
  themeMode: ThemeMode
  toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const isDarkOS = useMediaQuery(DARK_SCHEME_QUERY);

  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>('themeMode', isDarkOS ? 'light' : 'dark');

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
    <ThemeContext.Provider value={{
      themeMode,
      toggleTheme
    }}>
      <MuiThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <Header menuItems={menuItems} links={itemsWebSiteLinks} themeMode={themeMode} toggleTheme={toggleTheme} />
        {children}

      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export {
  useThemeContext,
  ThemeProvider
};
