import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import FeedBack from '../svg/feedback';
import Language from '../svg/language';
import ThemeMode from '../svg/theme-mode';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar/AppBar';

const drawerWidth = 260;

interface TopBarProps {
  toggleDrawer: () => void;
  open: boolean;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const TopBar = (props: TopBarProps) => {
  return (
    <AppBar position="absolute" open={props.open} style={{ backgroundColor: '#C4C4C4' }}>
      <Toolbar
        sx={{
          pr: '24px',
          backgroundColor: 'white',
        }}
        color={'White'}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={props.toggleDrawer}
          sx={{
            marginRight: '26px',
            ...(props.open && { display: 'none' }),
          }}
        >
          <MenuIcon sx={{ color: 'primary.main' }} />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}></Typography>
        <IconButton color="inherit" sx={{ marginRight: '24px' }}>
          <FeedBack width={22} height={22} fill="#898989" />
        </IconButton>
        <IconButton color="inherit" sx={{ marginRight: '24px' }}>
          <Language width={26.7} height={26.7} />
        </IconButton>
        <IconButton color="inherit">
          <ThemeMode width={26.7} height={26.7} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
