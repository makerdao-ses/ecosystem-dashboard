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
  justifyContent: 'center',
  gap: 8,

  [theme.breakpoints.up('desktop_1194')]: {
    marginTop: -1,
  },
}));

const Title = styled('div')(({ theme }) => ({
  fontSize: 11,
  lineHeight: '13px',
  color: theme.palette.isLight ? '#546978' : '#708390',

  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 12,
    lineHeight: '15px',
  },
}));

const Amount = styled('div')<{ isGreen: boolean }>(({ theme, isGreen }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'flex-end',
  gap: 4,
  fontSize: 14,
  lineHeight: '22px',

  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
  },

  '&, & > span:first-of-type': {
    color: isGreen ? '#1AAB9B' : theme.palette.isLight ? '#231536' : '#D2D4EF',
  },
}));

const Sign = styled('span')(({ theme }) => ({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '17px',

  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
    lineHeight: '19px',
  },
}));

const Currency = styled('span')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: theme.palette.isLight ? '#9FAFB9' : '#546978',

  [theme.breakpoints.up('table_834')]: {
    color: '#9FAFB9',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 14,
    lineHeight: '17px',
  },
}));
