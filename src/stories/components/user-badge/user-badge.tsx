import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CircleAvatar } from '../circle-avatar/circle-avatar';

interface Props {
  username?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default ({ onClick, username, style }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 834px)');
  const { isLight } = useThemeContext();

  return isDesktop ? (
    <Container isLight={isLight} className="no-select" style={style} onClick={onClick}>
      <CircleAvatar
        width="32px"
        height="32px"
        name={username ?? 'Username'}
        fontSize="14px"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          border: '2px solid #708390',
        }}
      />
      <UserName isLight={isLight}>{username ?? 'Username'}</UserName>
    </Container>
  ) : (
    <CircleAvatar
      width="35px"
      height="35px"
      name={username ?? 'Username'}
      fontSize="14px"
      onClick={onClick}
      style={{
        border: `1px solid ${isLight ? '#D4D9E1' : '#708390'}`,
        cursor: 'pointer',
        marginRight: 16,
        ...style,
      }}
    />
  );
};

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  background: isLight ? '#F6F8F9' : '#1E2C37',
  border: isLight ? '1px solid #D4D9E1' : '1px solid #343442',
  borderRadius: 22,
  padding: ' 7px 16px 7px 40px',
  position: 'relative',
  width: 'fit-content',
  height: 34,
  cursor: 'pointer',
}));

const UserName = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '18px',
}));
