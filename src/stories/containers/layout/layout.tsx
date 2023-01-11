import React from 'react';
import styled from '@emotion/styled';
import Header from '../../components/header/header';
import MainWrapper from '../../../core/context/MainWrapper';
import Footer from '../../components/footer/footer';
import { itemsWebSiteLinks } from '../../components/header/select-link-website/menu-items';
import { developer, governesses, products } from '../../components/footer/iconsData';

export type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Header links={itemsWebSiteLinks} />
      <Container>
        <MainWrapper>{children}</MainWrapper>
      </Container>
      <Footer developer={developer} governesses={governesses} products={products} />
    </>
  );
};

export default AppLayout;

const Container = styled.div({
  display: 'flex',
  background: 'white',
  minHeight: 'calc(100vh - 320px)',
});
