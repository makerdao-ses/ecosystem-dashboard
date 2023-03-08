import styled from '@emotion/styled';
import ChangePassword from '@ses/containers/AuthChange/ChangePassword/ChangePassword';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { getSSRPropsDefaultAuth } from '@ses/core/utils/commonGetSSRProps';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { NextPage } from 'next';

const ChangePasswordPage: NextPage = () => {
  const { isLight } = useThemeContext();

  return (
    <Container isLight={isLight}>
      <ChangePassword />
    </Container>
  );
};

export default ChangePasswordPage;

export const getServerSideProps = getSSRPropsDefaultAuth;

export const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  minHeight: 'calc(100vh - 64px)',
  marginTop: 64,
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/login-bg.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  paddingTop: 64,

  [lightTheme.breakpoints.up('table_834')]: {
    paddingTop: 40,
  },

  [lightTheme.breakpoints.down('table_834')]: {
    paddingTop: 64,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingTop: 64,
  },
}));
