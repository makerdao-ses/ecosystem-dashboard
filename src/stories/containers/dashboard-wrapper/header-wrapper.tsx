import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import mainTheme from '../../../core/styling/main-theme';
import Header from '../../components/header/Header';
import menuItems from '../../components/header/menu-items';
import { itemsWebSiteLinks } from '../../components/header/select-link-website/menu-items';

interface HeaderWrapperProps {
  children?: JSX.Element | JSX.Element[]
}
export const HeaderWrapper = (props: HeaderWrapperProps) => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Header menuItems={menuItems} links={itemsWebSiteLinks}/>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {props.children}
      </Box>
    </ThemeProvider>
  );
};
