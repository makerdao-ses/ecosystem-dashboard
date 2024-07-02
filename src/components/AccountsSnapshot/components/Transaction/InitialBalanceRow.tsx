import { styled } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';

interface InitialBalanceRow {
  initialBalance: number;
}

const InitialBalanceRow: React.FC<InitialBalanceRow> = ({ initialBalance }) => (
  <Wrapper>
    <Title>Initial Balance</Title>
    <Amount>
      {usLocalizedNumber(initialBalance)}
      <Currency>DAI</Currency>
    </Amount>
  </Wrapper>
);

export default InitialBalanceRow;

const Wrapper = styled('div')(({ theme }) => ({
  display: 'none',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'center',
  gap: 8,
  padding: '21px 32px 13px 20px',

  [theme.breakpoints.up('table_834')]: {
    display: 'flex',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    padding: '16px 56px 14px 20px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 64px 14px 20px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: '16px 80px 14px 20px',
  },

  '&:hover': {
    background: theme.palette.isLight ? '#F6F8F9' : '#1F2931',
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

const Amount = styled('div')(({ theme }) => ({
  fontWeight: 700,
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'flex-end',
  gap: 4,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',

  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
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
