import { styled } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';

interface TransactionAmountProps {
  amount: number;
  highlightPositiveAmounts?: boolean;
}

const TransactionAmount: React.FC<TransactionAmountProps> = ({ amount, highlightPositiveAmounts }) => (
  <Wrapper>
    <Title>Amount</Title>
    <Amount isGreen={amount > 0 && !!highlightPositiveAmounts}>
      <Sign>{amount < 0 ? '-' : '+'}</Sign>
      {usLocalizedNumber(Math.abs(amount))}
      <Currency>DAI</Currency>
    </Amount>
  </Wrapper>
);

export default TransactionAmount;

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 8,
    justifyContent: 'center',
  },
}));

const Title = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
}));

const Amount = styled('div')<{ isGreen: boolean }>(({ theme, isGreen }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'flex-end',
  gap: 4,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },

  '&, & > span:first-of-type': {
    color: isGreen
      ? theme.palette.isLight
        ? theme.palette.colors.green[700]
        : theme.palette.colors.green[900]
      : theme.palette.isLight
      ? theme.palette.colors.gray[900]
      : theme.palette.colors.gray[50],
  },
}));

const Sign = styled('span')(({ theme }) => ({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '17px',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const Currency = styled('span')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  textTransform: 'uppercase',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },
}));
