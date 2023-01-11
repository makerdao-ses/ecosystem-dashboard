import { IconButton, Tooltip } from '@mui/material';
import MoonWithCircle from '../../svg/moon-mode-circle';
import ToggleDarkMode from '../../svg/toggle-dark';
import type { ThemeMode } from '../../../../core/context/ThemeContext';
import type { IconButtonProps } from '@mui/material';

interface Props {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeSwitcherButton = ({ themeMode, toggleTheme, ...rest }: IconButtonProps & Props) => (
  <Tooltip title={themeMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
    <IconButton {...rest} onClick={toggleTheme}>
      {themeMode === 'light' ? <MoonWithCircle /> : <ToggleDarkMode />}
    </IconButton>
  </Tooltip>
);
export default ThemeSwitcherButton;
