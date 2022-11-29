import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { Wrapper } from '../../auth/login/login';
import UserProfile from './user-profile';

const UserProfileContainer = () => {
  const { isLight } = useThemeContext();
  return (
    <Wrapper isLight={isLight}>
      <UserProfile />
    </Wrapper>
  );
};

export default UserProfileContainer;
