import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../svg/logo';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Toggle from '../svg/toggle';
import Divider from '@mui/material/Divider';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

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
        <Toggle fill={'white'}/>
      </IconButton>
    </Toolbar>
    <Divider/>
    <Typography sx={{ margin: '40px 32px 24px 32px' }}>
      MakerDAO
    </Typography>
    <List component="nav">
      <ListItemButton>
        <CustomListItemIcon>
          <DashboardIcon/>
        </CustomListItemIcon>
        <ListItemText primary="Core Units" sx={{ py: 2 }}/>
      </ListItemButton>
      <ListItemButton>
        <CustomListItemIcon>
          <BatchPredictionIcon/>
        </CustomListItemIcon>
        <ListItemText primary="Strategic Initiatives" sx={{ py: 2 }}/>
      </ListItemButton>
      <ListItemButton>
        <CustomListItemIcon>
          <PaidIcon/>
        </CustomListItemIcon>
        <ListItemText primary="Finances" sx={{ py: 2 }}/>
      </ListItemButton>
      <ListItemButton>
        <CustomListItemIcon>
          <PeopleIcon/>
        </CustomListItemIcon>
        <ListItemText primary="People" sx={{ py: 2 }}/>
      </ListItemButton>
    </List>
  </Drawer>);
};
