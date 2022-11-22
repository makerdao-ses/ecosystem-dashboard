import * as React from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UserBadge from '../../user-badge/user-badge';
import MenuItemUser from './menu-item-user';
import { MenuPaperStyle } from '../menu-theme/menu-theme';
import { useThemeContext } from '../../../../core/context/ThemeContext';

interface Props {
  username: string;
  isAdmin: boolean;
  onClickLogOut: () => void;
  onClickProfile: () => void;
  onClickAccountManager: () => void;
}

const MenuUserOptions = ({ username, isAdmin, onClickLogOut, onClickProfile, onClickAccountManager }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { isLight } = useThemeContext();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div onClick={handleClick}>
        <UserBadge
          username={username}
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        />
      </div>
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
          style={{
            background: isLight ? '#FFFFFF' : ' #000A13',
          }}
        >
          <MenuItemUser
            isAdmin={isAdmin}
            onClickLogOut={onClickLogOut}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClickProfile={onClickProfile}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClickAccountManager={onClickAccountManager}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuUserOptions;
