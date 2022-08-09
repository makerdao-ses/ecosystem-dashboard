import React from 'react';
import { Skeleton } from '@mui/material';
import styled from '@emotion/styled';

export const CategoriesSkeleton = () => {
  return <Container>
    <Skeleton
      variant="rectangular"
      width={260}
      height={28}
      style={{ borderRadius: '8px' }}
    />
  </Container>;
};

const Container = styled.div({
  display: 'none',
  alignItems: 'center',
  '@media (min-width: 684px)': {
    display: 'flex'
  }
});
