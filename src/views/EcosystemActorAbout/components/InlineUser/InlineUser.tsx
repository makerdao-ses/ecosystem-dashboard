import { styled } from '@mui/material';
import AvatarPlaceholder from 'public/assets/svg/avatar_placeholder.svg';
import React from 'react';

export type InlineUserProps = {
  username: string;
  className?: string;
};

const InlineUser: React.FC<InlineUserProps> = ({ username, className }) => (
  <User className={className}>
    <AvatarPlaceholder width={32} height={32} />

    <Username>{username}</Username>
  </User>
);

export default InlineUser;

const User = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,

  '& path': {
    fill: theme.palette.isLight ? '#6C7275' : theme.palette.colors.charcoal[500],
  },
  '& rect': {
    fill: theme.palette.isLight ? '#CED3DC' : theme.palette.colors.charcoal[700],
  },
  '& svg': {
    borderRadius: 20,
    boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : theme.fusionShadows.darkMode,
  },
}));

const Username = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 8,
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],
}));
