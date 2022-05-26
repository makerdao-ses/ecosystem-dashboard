import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import mainTheme from '../../../core/styling/main-theme';
import Header from '../../components/header/Header';
import menuItems from '../../components/header/menu-items';

interface HeaderWrapperProps {
  children?: JSX.Element | JSX.Element[]
}
export const HeaderWrapper = (props: HeaderWrapperProps) => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Header menuItems={menuItems} />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
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
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
