import React from 'react';
import styled from '@emotion/styled';
import NotFoundPage from '../../../../../pages/404';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { Tabs } from '../../../components/tabs/tabs';
import { useManagerAccountLayoutViewModel } from './manager-account-layout.mvvm';
import { ManagerTabs } from './manager-tabs.enum';

export interface UserManagerLayoutProps {
  children: React.ReactNode;
  tabIndex: ManagerTabs;
}

const UserManagerLayout: React.FC<UserManagerLayoutProps> = ({ children, tabIndex = ManagerTabs.PROFILE }) => {
  const { isLight } = useThemeContext();
  const { tabItems, hasToken, authToken, isAdmin, FEATURE_AUTH } = useManagerAccountLayoutViewModel();

  if (!FEATURE_AUTH || !authToken || !isAdmin) {
    return <NotFoundPage />;
  }

  if (!hasToken) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 30,
        }}
      >
        Loading......
      </div>
    );
  }

  return (
    <MainWrapper isLight={isLight}>
      <Container>
        <Tabs
          currentIndex={tabIndex}
          items={tabItems}
          styleForTab={{
            fontSize: 16,
          }}
        />
      </Container>
      {children}
    </MainWrapper>
  );
};

const MainWrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100vh',
  marginTop: 64,
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/login-bg.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  paddingBottom: '128px',
}));

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  paddingTop: 24,
  marginBottom: 24,
  '@media (min-width: 375px)': {
    width: 343,
    margin: '0 auto',
    marginBottom: 24,
    justifyContent: 'center',
  },
  '@media (min-width: 834px)': {
    justifyContent: 'flex-start',
    width: 770,
  },
  '@media (min-width: 1194px)': {
    justifyContent: 'flex-start',
    width: 1130,
  },
  '@media (min-width: 1280px)': {
    justifyContent: 'flex-start',
    width: 1184,
  },
  '@media (min-width: 1440px)': {
    width: 1312,
    marginBottom: 40,
  },
  '@media (min-width: 1920px)': {
    width: 1312,
  },
});

export default UserManagerLayout;
