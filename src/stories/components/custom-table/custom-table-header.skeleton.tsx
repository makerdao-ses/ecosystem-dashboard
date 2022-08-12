import React from 'react';
import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';

export const CustomTableHeaderSkeleton = () => {
  return (
    <Container>
      <Skeleton
        variant="rectangular"
        width={122}
        height={32}
        style={{
          borderRadius: '8px',
          background: '#ECF1F3',
          transform: 'matrix(1, 0, 0, -1, 0, 0)',
          marginRight: '121px',
        }}
      />
      <Skeleton
        variant="rectangular"
        width={122}
        height={32}
        style={{
          borderRadius: '8px',
          background: '#ECF1F3',
          transform: 'matrix(1, 0, 0, -1, 0, 0)',
          marginRight: '53px',
        }}
      />
      <Skeleton
        variant="rectangular"
        width={122}
        height={32}
        style={{
          borderRadius: '8px',
          background: '#ECF1F3',
          transform: 'matrix(1, 0, 0, -1, 0, 0)',
          marginRight: '82px',
        }}
      />
      <Skeleton
        variant="rectangular"
        width={122}
        height={32}
        style={{
          borderRadius: '8px',
          background: '#ECF1F3',
          transform: 'matrix(1, 0, 0, -1, 0, 0)',
          marginRight: '134px',
        }}
      />
      <Skeleton
        variant="rectangular"
        width={122}
        height={32}
        style={{
          borderRadius: '8px',
          background: '#ECF1F3',
          transform: 'matrix(1, 0, 0, -1, 0, 0)',
        }}
      />
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  padding: '10px 91px 10px 93px',
  background: '#FFFFFF',
  boxShadow:
    '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  width: '100%',
});
