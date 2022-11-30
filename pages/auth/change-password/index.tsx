import styled from '@emotion/styled';
import { NextPage } from 'next';
import React from 'react';
import { featureFlags } from '../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../src/config/endpoints';
import { useAuthContext } from '../../../src/core/context/AuthContext';
import { useThemeContext } from '../../../src/core/context/ThemeContext';
import ChangePassword from '../../../src/stories/containers/auth/change-password/change-password';
import lightTheme from '../../../styles/theme/light';
import NotFoundPage from '../../404';

const ChangePasswordPage: NextPage = () => {
  const { authToken } = useAuthContext();
  const { isLight } = useThemeContext();

  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH || !authToken) {
    return <NotFoundPage />;
  }

  return (
    <Container isLight={isLight}>
      <ChangePassword />
    </Container>
  );
};

export default ChangePasswordPage;

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/login-bg.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  paddingTop: 104,
  paddingBottom: 128,

  [lightTheme.breakpoints.up('table_834')]: {
    paddingTop: 100,
  },
}));
