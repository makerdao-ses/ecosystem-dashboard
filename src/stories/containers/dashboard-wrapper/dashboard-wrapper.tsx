import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import mainTheme from '../../../core/styling/main-theme';
import { Sidebar } from '../../components/sidebar/sidebar';
import TopBar from '../../components/topbar/topbar';

interface DashboardWrapperProps {
  children?: JSX.Element | JSX.Element[]
}
export const DashboardWrapper = (props: DashboardWrapperProps) => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TopBar toggleDrawer={toggleDrawer} open={open}/>
        <Sidebar toggleDrawer={toggleDrawer} open={open} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? 'white'
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
            {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
