import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { List } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../svg/logo';
import Toggle from '../svg/toggle';
import Drawer from './drawer';
import { menuItems } from './menu';
import ItemMenu from './menuItem';
import './sidebar.scss';
interface SidebarProps {
  toggleDrawer: () => void,
  open: boolean
}

export const Sidebar = (props: SidebarProps) => {
  const [stack, setStack] = useState<string[]>([]);
  const { hash } = useLocation();

  useEffect(() => {
    hash && setStack((hash.replace('#', '')).split('/').filter(Boolean));
  }, [hash]);

  return (<Drawer variant="permanent" open={props.open}>
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'primary.main',
        pl: 3,
        pr: 2,
      }}
    >
      <Logo style={{ marginLeft: '8px' }}/>
      <Typography sx={{ flexGrow: 1, ml: 2 }}/>
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
        <MenuItemsView menus={item} key={index} stack={stack} setStack={setStack} />
      ))}

    </List>
  </Drawer>);
};

type MenuType = {
  title: string,
  id: string,
  expanded?: boolean,
  icon?: JSX.Element,
  items?: MenuType[],
}

type MenuItemsViewProps = {
  menus: MenuType;
  beforeLevel?: number;
  stack: string[];
  setStack: (value: string[]) => void;
};

const MenuItemsView = ({
  menus: { title, items = [], icon, id },
  stack, setStack,
  beforeLevel = 0,
}: MenuItemsViewProps) => {
  const navigate = useNavigate();
  const toggle = useCallback(() => {
    const lastIndex = stack.indexOf(id);
    let newStack = [];
    if (stack.includes(id)) {
      newStack = [...stack].splice(0, lastIndex + 1);
    } else {
      newStack = [...stack, id];
    }
    // const newStack = stack.includes(id) ? stack.filter((item) => item !== id) : [...stack, id];
    setStack(newStack);
    navigate(`#${newStack.join('/')}`);
  }, [stack, id, navigate]);

  const isOpen = useMemo(() => {
    return stack.includes(id);
  }, [stack, id]);

  const isCurrent = useMemo(() => {
    return stack && stack[stack.length - 1] === id;
  }, [stack, id]);

  return (
    <ul>
      <div
        style={{
          marginLeft: `${beforeLevel * 10}px`,
          textDecoration: isCurrent ? 'underline' : 'none',
        }}
      >
        <ItemMenu
          title={title}
          id={id || '#'}
          icon={icon}
          onClick={toggle}
        />
      </div>
      {
        isOpen && !!items.length && items.map((menu) => (
          <MenuItemsView
            menus={menu}
            key={Math.random()}
            beforeLevel={beforeLevel + 1}
            stack={stack}
            setStack={setStack}
          />
        ))}
    </ul>
  );
};
