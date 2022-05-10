import React, { useCallback, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../svg/logo';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Toggle from '../svg/toggle';
import Divider from '@mui/material/Divider';
import { List, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ItemMenu from './menuItem';
import { menuItems } from './menu';

const drawerWidth = 260;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
        [theme.breakpoints.up('sm')]: {
          width: 0,
        },
      }),
    },
  }),
);

const CustomListItemIcon = styled(ListItemIcon)({
  minWidth: '24px',
  marginRight: '10px',
  marginLeft: '16px',
});

interface SidebarProps {
  toggleDrawer: () => void,
  open: boolean
}

export const Sidebar = (props: SidebarProps) => {
  type MenuType = {
    title: string,
    id?: string,
    expanded?: boolean,
    icon?: JSX.Element,
    items?: MenuType[],
  }

  type MenuItemsViewProps = {
    menus: MenuType;
    beforeLevel?: number;
  };

  const MenuItemsView = ({
    menus: { title, items = [], expanded = false, icon, id },
    beforeLevel = 0,
  }: MenuItemsViewProps) => {
    const [exp, setExp] = useState(expanded);
    const toggle = useCallback(() => {
      setExp(!exp);
      console.log('exp', exp);
    }, [exp]);

    return (
      <ul>
        <div
          style={{
            marginLeft: `${beforeLevel * 20}px`,
          }}
        >
          <ItemMenu
            title={title}
            href="#"
            onClick={toggle}
            beforeLevel={beforeLevel}
          />
        </div>
        {
          exp && !!items.length && items.map((menu) => (
            <MenuItemsView
              menus={menu}
              key={Math.random()}
              beforeLevel={beforeLevel + 1}
            />
          ))}
      </ul>
    );
  };

  return (<Drawer variant="permanent" open={props.open}>
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'primary.main',
        px: [2],
      }}
    >
      <Logo />
      <Typography sx={{ flexGrow: 1, ml: 2 }} />
      <IconButton onClick={props.toggleDrawer}>
        <Toggle fill={'white'} />
      </IconButton>
    </Toolbar>
    <Divider />
    <Typography sx={{ margin: '40px 32px 24px 32px' }}>
      MakerDAO
    </Typography>
    <List component="nav">
      {menuItems.map((item, index) => (
        <MenuItemsView menus={item} key={index}/>
      ))}

    </List>
  </Drawer>);
};
