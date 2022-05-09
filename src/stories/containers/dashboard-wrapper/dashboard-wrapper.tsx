import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import FeedBack from '../../components/svg/feedback';
import Language from '../../components/svg/language';
import ThemeMode from '../../components/svg/theme-mode';
import Logo from '../../components/svg/logo';
import Toggle from '../../components/svg/toggle';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const drawerWidth = 260;

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

const mdTheme = createTheme();

interface DashboardWrapperProps {
  children?: JSX.Element | JSX.Element[]
}
export const DashboardWrapper = (props: DashboardWrapperProps) => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
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
              onClick={toggleDrawer}
              sx={{
                marginRight: '26px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon sx={{ color: '#1AAB9B' }}/>
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
            </Typography>
            <IconButton color="inherit" sx={{ marginRight: '24px' }}>
              <FeedBack />
            </IconButton>
            <IconButton color="inherit" sx={{ marginRight: '24px' }}>
              <Language />
            </IconButton>
            <IconButton color="inherit">
              <ThemeMode />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              backgroundColor: '#1AAB9B',
              px: [2],
            }}
          >
            <Logo />
            <Typography sx={{ flexGrow: 1, ml: 2 }}>
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <Toggle fill={'white'}/>
            </IconButton>
          </Toolbar>
          <Divider />
          <Typography sx={{ margin: '40px 32px 24px 32px', fontWeight: '400', fontSize: '16px', fontFamily: 'Inter, sans-serif' }}>
            MakerDao
          </Typography>
          <List component="nav">
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Core Units" sx={{ py: 2, fontWeight: '400', fontSize: '16px', fontFamily: 'Inter, sans-serif' }} />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <BatchPredictionIcon />
              </ListItemIcon>
              <ListItemText primary="Strategic Initiatives" sx={{ py: 2, fontWeight: '400', fontSize: '16px', fontFamily: 'Inter, sans-serif' }} />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <PaidIcon />
              </ListItemIcon>
              <ListItemText primary="Finances" sx={{ py: 2, fontWeight: '400', fontSize: '16px', fontFamily: 'Inter, sans-serif' }} />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="People" sx={{ py: 2, fontWeight: '400', fontSize: '16px', fontFamily: 'Inter, sans-serif' }} />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {props.children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
