import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import Tabs from '@/components/Tabs/Tabs';
import { ManagerTabs } from './managerTabsEnum';
import { useManagerAccountLayout } from './useManagerAccountLayout';

export interface UserManagerLayoutProps {
  children: React.ReactNode;
  tabIndex: ManagerTabs;
}

const UserManagerLayout: React.FC<UserManagerLayoutProps> = ({ children, tabIndex = ManagerTabs.PROFILE }) => {
  const { isLight } = useThemeContext();
  const { tabItems, hasToken, isAdmin } = useManagerAccountLayout();

  if (!hasToken) {
    return <Message>Loading...</Message>;
  }

  if (!isAdmin) {
    // TODO: Add a proper Forbidden page
    return <Message>You do not have permissions to see this page</Message>;
  }

  return (
    <MainWrapper isLight={isLight}>
      <Container>
        <Tabs
          tabs={tabItems}
          controlled={true}
          selectedTabId={tabIndex as unknown as string}
          styleForTab={{
            fontSize: 16,
          }}
        />
      </Container>
      {children}
    </MainWrapper>
  );
};

export default UserManagerLayout;

const Message = styled.div({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 30,
});

const MainWrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100vh',
  paddingTop: 64,
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
    marginBottom: 24,
  },
  '@media (min-width: 1280px)': {
    justifyContent: 'flex-start',
    width: 1184,
    marginBottom: 24,
  },
  '@media (min-width: 1440px)': {
    width: 1312,
    marginBottom: 40,
  },
  '@media (min-width: 1920px)': {
    width: 1312,
  },
});
