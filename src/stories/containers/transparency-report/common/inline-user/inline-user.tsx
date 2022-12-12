import React from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../../../core/context/ThemeContext';
import AvatarPlaceholder from '../../../../components/svg/avatar-placeholder';

export type InlineUserProps = {
  username: string;
};

const InlineUser: React.FC<InlineUserProps> = ({ username }) => {
  const { isLight } = useThemeContext();

  return (
    <User>
      <AvatarPlaceholder width={24} height={24} />
      <Username isLight={isLight}>{username}</Username>
    </User>
  );
};

export default InlineUser;

const User = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const Username = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  marginLeft: 8,
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19px',
  color: isLight ? '#231536' : '#D2D4EF',
}));
