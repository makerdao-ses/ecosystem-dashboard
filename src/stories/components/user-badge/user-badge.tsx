import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import React from 'react';
import { CircleAvatar } from '../circle-avatar/circle-avatar';

interface Props {
  username?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default ({ onClick, username, style }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 834px)');
  return isDesktop ? (
    <Container className="no-select" style={style} onClick={onClick}>
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
      <UserName>{username ?? 'Username'}</UserName>
    </Container>
  ) : (
    <CircleAvatar
      width="35px"
      height="35px"
      name={username ?? 'Username'}
      fontSize="14px"
      onClick={onClick}
      style={{
        border: '1px solid #D4D9E1',
        cursor: 'pointer',
        marginRight: 16,
        ...style,
      }}
    />
  );
};

const Container = styled.div({
  background: '#F6F8F9',
  border: '1px solid #D4D9E1',
  borderRadius: 22,
  padding: ' 7px 16px 7px 40px',
  position: 'relative',
  width: 'fit-content',
  height: 34,
  cursor: 'pointer',
});

const UserName = styled.div({
  color: '#231536',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '18px',
});
