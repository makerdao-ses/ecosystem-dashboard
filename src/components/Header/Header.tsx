/* eslint-disable */
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";

import Toggle from "../Svg/Toggle";
import "./Header.scss";
import FeedBack from "../Svg/FeedBack";
import Language from "../Svg/Language";
import ThemeMode from "../Svg/ThemeMode";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
}));

type Props = {
  open: boolean;
  setOpen: (o: boolean) => void;
};

const Header = ({ open, setOpen }: Props) => {
  const classes = useStyles();

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <AppBar
    elevation={0}
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <div className="containerHeader">
        <div className="logoToggleContainer">
          <div className="logo">
            <p>SES Logo</p>
          </div>
          <div className="toggle">
            <Toggle onClick={handleToggleDrawer} />
          </div>
        </div>
        <div className="rightSideHeader">
          <div className="right">
            <p>Lorem Ipsum link</p>
          </div>
          <div className="right">
            <p>Lorem Ipsum link</p>
          </div>
          <div className="icons">
            <div>
              <FeedBack />
            </div>
            <div>
              <Language />
            </div>
            <div>
              <ThemeMode />
            </div>
          </div>
        </div>
      </div>
    </AppBar>
  );
};

export default Header;
