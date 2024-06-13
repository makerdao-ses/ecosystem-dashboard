import { styled, useMediaQuery } from '@mui/material';
import React from 'react';
import CircleAvatar from '@/components/CircleAvatar/CircleAvatar';

interface Props {
  username?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const UserBadge: React.FC<Props> = ({ onClick, username, style }) => {
  const isDesktop = useMediaQuery('(min-width: 834px)');

  return isDesktop ? (
    <Container className="no-select" style={style} onClick={onClick}>
      <CircleAvatarStyledWithName name={username ?? 'Username'} />
      <UserName>{username ?? 'Username'}</UserName>
    </Container>
  ) : (
    <CircleAvatarStyledWithoutName name={username ?? 'Username'} onClick={onClick} />
  );
};

export default UserBadge;

const Container = styled('div')(({ theme }) => ({
  background: theme.palette.isLight ? '#F6F8F9' : '#1E2C37',
  border: theme.palette.isLight ? '1px solid #D4D9E1' : '1px solid #343442',
  borderRadius: 22,
  padding: ' 7px 16px 7px 40px',
  position: 'relative',
  width: 'fit-content',
  height: 34,
  cursor: 'pointer',
}));

const UserName = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '18px',
}));

const CircleAvatarStyledWithName = styled(CircleAvatar)({
  width: 32,
  height: 32,
  minWidth: 32,
  minHeight: 32,
  position: 'absolute',
  left: 0,
  top: 0,
  border: '2px solid #708390',
  fontSize: 14,
});

const CircleAvatarStyledWithoutName = styled(CircleAvatar)(({ theme }) => ({
  width: 35,
  height: 35,
  minWidth: 35,
  minHeight: 35,
  border: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#708390'}`,
  cursor: 'pointer',
  marginRight: 16,
  fontSize: 14,
}));
