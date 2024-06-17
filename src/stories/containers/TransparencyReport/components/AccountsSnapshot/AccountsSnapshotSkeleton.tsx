import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import CUReservesSkeleton from './components/CUReserves/CUReservesSkeleton';
import ExpensesComparisonSkeleton from './components/ExpensesComparison/ExpensesComparisonSkeleton';
import FundingOverviewSkeleton from './components/FundingOverview/FundingOverviewSkeleton';

const AccountsSnapshotSkeleton: React.FC = () => (
  <Wrapper>
    <FundingOverviewSkeleton />
    <CUReservesSkeleton />
    <ExpensesComparisonSkeleton />
  </Wrapper>
);

export default AccountsSnapshotSkeleton;

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  marginBottom: 64,

  [lightTheme.breakpoints.up('table_834')]: {
    gap: 64,
  },
});
