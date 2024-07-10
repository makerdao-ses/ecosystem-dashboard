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
  padding: '14px 40px 14px 20px',
  borderTop: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '16px 16px 18px 20px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 80px 16px 20px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: '16px 80px 14px 20px',
  },

  '&:hover': {
    background: theme.palette.isLight ? theme.palette.colors.gray[100] : '#292E38',
  },
}));

const Title = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
}));

const Amount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'flex-end',
  gap: 4,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

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
