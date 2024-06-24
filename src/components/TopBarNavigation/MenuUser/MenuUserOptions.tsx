import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import UserBadge from '../../UserBadge/UserBadge';
import { MenuPaperStyle } from '../MenuTheme/MenuTheme';
import MenuItemUser from './MenuItemUser';
import useMenuUser from './useMenuUser';

interface Props {
  username: string;
  isAdmin: boolean;
  onClickLogOut: () => void;
  hrefAccountManager: string;
  hrefProfile: string;
}

const MenuUserOptions = ({ username, isAdmin, onClickLogOut, hrefAccountManager, hrefProfile }: Props) => {
  const { handleClick, handleClose, isLight, open, anchorEl } = useMenuUser();

  return (
    <>
      <div onClick={handleClick}>
        <UserBadge
          isOpen={open}
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
            hrefProfile={hrefProfile}
            hrefAccountManager={hrefAccountManager}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuUserOptions;
