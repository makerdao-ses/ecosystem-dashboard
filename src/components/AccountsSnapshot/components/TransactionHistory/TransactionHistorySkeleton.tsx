import { styled } from '@mui/material';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';

const TransactionHistorySkeleton: React.FC = () => (
  <Card>
    <Text />
  </Card>
);

export default TransactionHistorySkeleton;

const Card = styled('div')(({ theme }) => ({
  background: theme.palette.isLight ? '#fff' : '#10191F',
  borderRadius: 6,
  boxShadow: theme.palette.isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
  padding: '11px 16px',

  [theme.breakpoints.up('table_834')]: {
    padding: '11px 16px 10px 24px',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    padding: '12px 16px 12px 24px',
  },
}));

const Text = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 190,
  height: 12,

  [theme.breakpoints.up('table_834')]: {
    maxWidth: 250,
    height: 14,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    maxWidth: 310,
    height: 16,
  },
}));
