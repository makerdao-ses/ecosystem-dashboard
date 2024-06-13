import { styled } from '@mui/material';
import React from 'react';
import AvatarPlaceholder from '@/stories/components/svg/avatar-placeholder';

export type InlineUserProps = {
  username: string;
};

const InlineUser: React.FC<InlineUserProps> = ({ username }) => (
  <User>
    <AvatarPlaceholder width={32} height={32} />

    <Username>{username}</Username>
  </User>
);

export default InlineUser;

const User = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

const Username = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 8,
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],
}));
