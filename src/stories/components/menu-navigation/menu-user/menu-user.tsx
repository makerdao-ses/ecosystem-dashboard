import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import UserBadge from '../../user-badge/user-badge';
import MenuItemUser from './menu-item-user';
import useMenuUser from './menu-user.mvvm';

interface Props {
  username: string;
  isAdmin: boolean;
  onClickLogOut: () => void;
  hrefAccountManager: string;
  hrefProfile: string;
}

export const MenuPaperStyle = (isLight: boolean) => ({
  background: isLight ? '#FFFFFF' : ' #000A13',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '6px',
});

const MenuUserOptions = ({ username, isAdmin, onClickLogOut, hrefAccountManager, hrefProfile }: Props) => {
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
            hrefProfile={hrefProfile}
            hrefAccountManager={hrefAccountManager}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuUserOptions;
