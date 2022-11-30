import React from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import UserProfile from './user-profile';
import lightTheme from '../../../../../styles/theme/light';

const UserProfileContainer = () => {
  const { isLight } = useThemeContext();
  return (
    <Wrapper isLight={isLight}>
      <UserProfile />
    </Wrapper>
  );
};

export const Wrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
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

export default UserProfileContainer;
