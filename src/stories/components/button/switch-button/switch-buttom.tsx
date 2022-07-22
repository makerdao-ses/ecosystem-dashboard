
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { ThemeMode } from '../../../../core/context/ThemeContext';

import MoonMode from '../../svg/theme-mode';
import ToggleDarkMode from '../../svg/toggle-dark';

interface Props {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  width: number;
  height: number;
}

const ThemeSwitcherButton = ({ themeMode, toggleTheme, width = 21, height = 21, ...rest }: IconButtonProps & Props) => {
  return (
    <Tooltip
      title={themeMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <IconButton
        {...rest}
        onClick={toggleTheme}
      >
        {themeMode === 'light' ? <MoonMode width={width} height={height} /> : <ToggleDarkMode width={width} height={height} />}
      </IconButton>
    </Tooltip>
  );
};
export default ThemeSwitcherButton;
