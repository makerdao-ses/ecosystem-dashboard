import { styled } from '@mui/material';
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

const Wrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  marginBottom: 24,
}));
