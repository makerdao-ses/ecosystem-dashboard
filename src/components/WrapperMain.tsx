import React from 'react';
import { styled, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Route, Routes } from 'react-router-dom';
import { EXAMPLE2_ROUTE, EXAMPLE_ROUTE, HOME_ROUTE } from '../config/routes';
import { Counter } from '../stories/containers/counter/counter';
import { Page } from '../stories/pages/page/Page';
import MenuNavigation from './Drawer/MenuNavigation';
import Header from './Header/Header';

const drawerWidth = 259;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#E4E4E4',
  },
}));

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
function WrapperMain({ open, setOpen }: Props) {
  const classes = useStyles();
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={classes.root}>
        <Header open={open} setOpen={setOpen} />
        <MenuNavigation open={open} />
        <Main open={open}>
          <div className={classes.drawerHeader} />
          <Routes>
            <Route path={HOME_ROUTE} element={<Home />} />
            <Route path={EXAMPLE_ROUTE} element={<Page />} />
            <Route path={EXAMPLE2_ROUTE} element={<Counter />} />
          </Routes>
        </Main>
      </div>
    </div>
  );
}

const Main = styled('main', {
  shouldForwardProp: (prop: string) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Home: () => JSX.Element = () => {
  return (
    <header className="App-header">
      MakerDao SES Dashboard
      <ul></ul>
    </header>
  );
};

export default WrapperMain;
