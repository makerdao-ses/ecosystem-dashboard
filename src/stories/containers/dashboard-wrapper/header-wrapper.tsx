import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import styled from '@emotion/styled';
import { ThemeMode } from '../../../core/context/ThemeContext';
import Header from '../../components/header/header';
import { itemsWebSiteLinks } from '../../components/header/select-link-website/menu-items';
import Footer from '../../components/footer/footer';
import { developer, governesses, products } from '../../components/footer/iconsData';

interface HeaderWrapperProps {
  children?: JSX.Element | JSX.Element[];
  themeMode: ThemeMode;
  toggleTheme: () => void;
}
export const HeaderWrapper = ({ children, themeMode, toggleTheme }: HeaderWrapperProps) => {
  return (
    <>
      <Header links={itemsWebSiteLinks} themeMode={themeMode} toggleTheme={toggleTheme} />
      <Container>
        <CssBaseline />
        {children}
      </Container>
      <Footer developer={developer} governesses={governesses} products={products} />
    </>
  );
};

const Container = styled.div({
  display: 'flex',
  background: 'white',
});
