import styled from '@emotion/styled';
import React from 'react';
import Footer from '@/components/Footer/Footer';
import MainWrapper from '../../../core/context/MainWrapper';
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
    <Footer />
  </>
);

export default AppLayout;

const Container = styled.div({
  display: 'flex',
  minHeight: 'calc(100vh - 320px)',
});
