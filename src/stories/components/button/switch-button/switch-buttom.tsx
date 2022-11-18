import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { ThemeMode } from '../../../../core/context/ThemeContext';
import MoonWithCircle from '../../svg/moon-mode-circle';
import ToggleDarkMode from '../../svg/toggle-dark';

interface Props {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeSwitcherButton = ({ themeMode, toggleTheme, ...rest }: IconButtonProps & Props) => {
  return (
    <Tooltip title={themeMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
      <IconButton {...rest} onClick={toggleTheme}>
        {themeMode === 'light' ? <MoonWithCircle /> : <ToggleDarkMode />}
      </IconButton>
    </Tooltip>
  );
};
export default ThemeSwitcherButton;
