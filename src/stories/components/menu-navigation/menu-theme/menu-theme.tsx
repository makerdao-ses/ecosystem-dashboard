import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { ThreeDots } from '../../svg/three-dots';
import styled from '@emotion/styled';
import { ThemeType } from '../../../../core/enums/theme.enum';
import MenuItemTheme from './menu-item-theme';

interface Props {
  themeMode: ThemeType;
  toggleTheme: () => void;
}

export const MenuPaperStyle = (isLight: boolean) => ({
  background: isLight ? '#FFFFFF' : ' #000A13',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '6px',
});

const MenuTheme = ({ themeMode, toggleTheme }: Props) => {
  const { isLight } = useThemeContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ThreeDotsButton
        isLight={isLight}
        onClick={handleClick}
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {<ThreeDots fill="#231536" fillDark="#EDEFFF" />}
      </ThreeDotsButton>
      <Menu
        PaperProps={{
          style: MenuPaperStyle(isLight),
        }}
        sx={{
          '& .MuiMenu-list': {
            paddingTop: '0px',
            paddingBottom: '0px',
          },
        }}
        disableScrollLock={true}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          disableTouchRipple={true}
          disableGutters={true}
          sx={{
            paddingBottom: '16px',
            paddingTop: '0px',
            '&:hover': {
              background: 'none',
              cursor: 'default',
            },
            '&:last-child': {
              paddingBottom: '0px',
            },
          }}
        >
          <MenuItemTheme themeMode={themeMode} toggleTheme={toggleTheme} />
        </MenuItem>
      </Menu>
    </>
  );
};

const ThreeDotsButton = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '35px',
  height: '35px',
  background: isLight ? 'white' : 'transparent',
  boxSizing: 'border-box',
  border: isLight ? '1px solid #D4D9E1' : '1px solid #31424E;',
  borderRadius: '50%',
  cursor: 'pointer',
  '@media (max-width: 635px)': {
    display: 'none',
  },
}));

export default MenuTheme;
