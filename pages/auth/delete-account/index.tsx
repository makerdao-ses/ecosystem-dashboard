import styled from '@emotion/styled';
import React from 'react';
import { useAuthContext } from '../../../src/core/context/AuthContext';
import { useThemeContext } from '../../../src/core/context/ThemeContext';
import DeleteAccount from '../../../src/stories/containers/Users/DeleteAccount/DeleteAccount';
import lightTheme from '../../../styles/theme/light';
import type { NextPage } from 'next';

const CreateAccountPage: NextPage = () => {
  const { user } = useAuthContext();
  const { isLight } = useThemeContext();

  return (
    <Container isLight={isLight}>
      <DeleteAccount username={user?.username} />
    </Container>
  );
};

export default CreateAccountPage;

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
