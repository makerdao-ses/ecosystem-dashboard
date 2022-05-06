/* eslint-disable */
import { Divider, Drawer } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { useCallback, useState } from "react";
import ItemMenu from "./ItemMenu/ItemMenu";
import "./MenuNavigation.scss";

const drawerWidth = 259;

const useStyles = makeStyles((theme: Theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 10,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

type MenuItem = {
  title: string;
  expanded?: boolean;
  items?: MenuItem[];
  onClick?: () => void;
};

type Props = {
  open: boolean;
};
const MenuNavigation = ({ open }: Props) => {
  const menuItems: MenuItem[] = [
    {
      title: "Core Units",
      expanded: true,
    },
    {
      title: "Strategic Initiatives",
    },
    {
      title: "Finances",
    },
    {
      title: "People",
    },
  ];

  type MenuItemsViewProps = {
    menus: MenuItem;
    beforeLevel?: number;
  };
  const MenuItemsView = ({
    menus: { title, items = [], expanded = false, onClick },
    beforeLevel = 0,
  }: MenuItemsViewProps) => {
    const [exp, setExp] = useState(expanded);
    const toggle = useCallback(() => {
      setExp(!exp);
      console.log("exp", exp);
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
        {exp &&
          items.map((menu) => (
            <MenuItemsView
              menus={menu}
              key={Math.random()}
              beforeLevel={beforeLevel + 1}
            />
          ))}
      </ul>
    );
  };
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      elevation={0}
      hideBackdrop={true}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#E4E4E4",
        },
      }}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}></div>
      <Divider />
      <p className="titleBar">MakerDAO</p>
      <nav className="containerMenu">
        {menuItems.map((menu) => (
          <MenuItemsView menus={menu} key={Math.random()} />
        ))}
      </nav>
    </Drawer>
  );
};

export default MenuNavigation;
