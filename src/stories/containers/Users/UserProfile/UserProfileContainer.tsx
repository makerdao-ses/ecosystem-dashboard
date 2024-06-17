import styled from '@emotion/styled';
import React from 'react';
import lightTheme from '../../../../../styles/theme/themes';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import UserProfile from './UserProfile';

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
  minHeight: '100vh',
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
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

export default UserProfileContainer;
