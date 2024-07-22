import { styled } from '@mui/material';
import DelegateExpenseTrendItemSkeleton from '../../DelegateExpenseTrend/DelegateExpenseTrendItemSkeleton';

const ExpenseReportsItemsSkeleton = () => (
  <Container>
    {Array.from({ length: 10 }).map((_, index) => (
      <DelegateExpenseTrendItemSkeleton key={index} />
    ))}
  </Container>
);

export default ExpenseReportsItemsSkeleton;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },
}));
