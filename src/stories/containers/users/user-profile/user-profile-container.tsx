import React from 'react';
import useThemeMode from '../../../../core/hooks/useThemeMode';
import { Wrapper } from '../../auth/login/login';
import UserProfile from './user-profile';

const UserProfileContainer = () => {
  const { isLight } = useThemeMode();
  return (
    <Wrapper isLight={isLight}>
      <UserProfile />
    </Wrapper>
  );
};

export default UserProfileContainer;
