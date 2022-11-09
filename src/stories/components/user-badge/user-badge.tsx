import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import React from 'react';
import { CircleAvatar } from '../circle-avatar/circle-avatar';

interface Props {
  username: string;
}
export default (props: Props) => {
  const isDesktop = useMediaQuery('(min-width: 834px)');
  return isDesktop ? (
    <Container className="no-select">
      <CircleAvatar
        width="32px"
        height="32px"
        name={props.username ?? 'Wouter Kampmann'}
        fontSize="14px"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          border: '2px solid #708390',
        }}
      />
      <UserName>{props.username ?? 'Wouter Kampmann'}</UserName>
    </Container>
  ) : (
    <CircleAvatar
      width="32px"
      height="32px"
      name={props.username ?? 'Wouter Kampmann'}
      fontSize="14px"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        border: '1px solid #D4D9E1',
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
});

const UserName = styled.div({
  color: '#231536',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '18px',
});
