import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import UserBadge from '../../user-badge/user-badge';
import { MenuPaperStyle } from '../menu-theme/menu-theme';
import MenuItemUser from './menu-item-user';
import useMenuUser from './menu-user.mvvm';

interface Props {
  username: string;
  isAdmin: boolean;
  onClickLogOut: () => void;
  onClickProfile: () => void;
  onClickAccountManager: () => void;
}

const MenuUserOptions = ({ username, isAdmin, onClickLogOut, onClickProfile, onClickAccountManager }: Props) => {
  const { handleClick, handleClose, isLight, open, anchorEl } = useMenuUser();

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
          onMouseLeave={handleClose}
          onClick={handleClose}
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
            onClickProfile={onClickProfile}
            onClickAccountManager={onClickAccountManager}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuUserOptions;
