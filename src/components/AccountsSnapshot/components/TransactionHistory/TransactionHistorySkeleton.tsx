import { styled } from '@mui/material';
import Card from '@/components/Card/Card';
import AccordionArrow from '../AccordionArrow/AccordionArrow';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';

const TransactionHistorySkeleton: React.FC = () => (
  <HistoryCard>
    <Text />
    <AccordionArrow />
  </HistoryCard>
);

export default TransactionHistorySkeleton;

const HistoryCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 8,
  marginTop: -8,

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800],
  },

  [theme.breakpoints.up('tablet_768')]: {
    padding: '8px 24px',
    marginTop: 0,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '12px 16px 12px 24px',
  },
}));

const Text = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 168,
  height: 17,

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 310,
    height: 19,
  },
}));
