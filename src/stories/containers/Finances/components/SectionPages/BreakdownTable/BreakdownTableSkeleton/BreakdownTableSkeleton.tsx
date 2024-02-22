import { styled } from '@mui/material';
import React from 'react';
import BreakdownTableBodySkeleton from './BreakdownTableBodySkeleton/BreakdownTableBodySkeleton';
import HeaderBreakdownTableSkeleton from './HeaderBreakdownTableSkeleton';

const BreakdownTableSkeleton = () => (
  <Container>
    <HeaderBreakdownTableSkeleton />
    <WrapperTable>
      <BreakdownTableBodySkeleton />
      <BreakdownTableBodySkeleton differentNumberOfRows={false} />
      <BreakdownTableBodySkeleton />
    </WrapperTable>
  </Container>
);

export default BreakdownTableSkeleton;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const WrapperTable = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});
