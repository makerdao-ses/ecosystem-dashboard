import styled from '@emotion/styled';
import ChangePassword from '@ses/containers/Auth/ChangePassword/ChangePassword';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
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

export const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  minHeight: '100vh',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/login-bg.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  paddingTop: 128,

  [lightTheme.breakpoints.up('table_834')]: {
    paddingTop: 104,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingTop: 128,
  },
}));
