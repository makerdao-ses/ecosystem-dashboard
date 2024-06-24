import { styled } from '@mui/material';
import React from 'react';
import Footer from '@/components/Footer/Footer';
import TopBarNavigation from '@/components/TopBarNavigation/TopBarNavigation';
import MainWrapper from '../../../core/context/MainWrapper';

export type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => (
  <>
    <TopBarNavigation />
    <Container>
      <MainWrapper>{children}</MainWrapper>
    </Container>
    <Footer />
  </>
);

export default AppLayout;

const Container = styled('div')(() => ({
  display: 'flex',
  minHeight: 'calc(100vh - 320px)',
}));
