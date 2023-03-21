import styled from '@emotion/styled';
import React from 'react';
import MainWrapper from '../../../core/context/MainWrapper';
import Footer from '../../components/Footer/Footer';
import { developer, governesses, products } from '../../components/Footer/iconsData';
import Header from '../../components/Header/Header';

export type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => (
  <>
    <Header />
    <Container>
      <MainWrapper>{children}</MainWrapper>
    </Container>
    <Footer developer={developer} governesses={governesses} products={products} />
  </>
);

export default AppLayout;

const Container = styled.div({
  display: 'flex',
  minHeight: 'calc(100vh - 320px)',
});
