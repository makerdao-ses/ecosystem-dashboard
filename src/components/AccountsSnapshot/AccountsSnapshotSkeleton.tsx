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

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  marginBottom: 64,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 64,
  },
}));
