import styled from '@emotion/styled';
import React from 'react';
import { useAuthContext } from '../../../src/core/context/AuthContext';
import { useThemeContext } from '../../../src/core/context/ThemeContext';
import { getSSRPropsDefaultAuth } from '../../../src/core/utils/common-get-ssr-props';
import DeleteAccount from '../../../src/stories/containers/users/delete-account/delete-account';
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
