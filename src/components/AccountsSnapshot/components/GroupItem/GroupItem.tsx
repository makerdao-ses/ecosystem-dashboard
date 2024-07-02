import { alpha, styled } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import GreenArrowDown from '../SVG/GreenArrowDown';
import RedArrowUp from '../SVG/RedArrowUp';
import WalletInfo from '../WalletInfo/WalletInfo';
import type { Token } from '@ses/core/models/dto/snapshotAccountDTO';

interface GroupItemProps {
  name: string;
  address: string;
  initialBalance: number;
  inflow: number;
  outflow: number;
  newBalance: number;
  currency: Token;
}

const GroupItem: React.FC<GroupItemProps> = ({
  name,
  address,
  initialBalance,
  inflow,
  outflow,
  newBalance,
  currency,
}) => (
  <GroupItemContainer>
    <WalletContainer>
      <WalletInfo name={name} address={address} />
    </WalletContainer>
    <InitialBalance>
      <Label>Initial Balance</Label>
      <Value>
        {usLocalizedNumber(initialBalance)} <Currency>{currency}</Currency>
      </Value>
    </InitialBalance>
    <Inflow>
      <Label>
        <GreenArrowDown width={16} height={16} /> Inflow
      </Label>
      <ValueContainer>
        <GreenArrowDown width={16} height={16} />
        <Value>
          <Sign>{'+'}</Sign>
          {usLocalizedNumber(inflow)} <Currency>{currency}</Currency>
        </Value>
      </ValueContainer>
    </Inflow>
    <Outflow>
      <Label>
        <RedArrowUp width={16} height={16} />
        Outflow
      </Label>
      <ValueContainer>
        <RedArrowUp width={16} height={16} />
        <Value>
          <Sign>{'-'}</Sign>
          {usLocalizedNumber(Math.abs(outflow))} <Currency>{currency}</Currency>
        </Value>
      </ValueContainer>
    </Outflow>
    <NewBalance>
      <Label>New Balance</Label>
      <Value>
        <span>{usLocalizedNumber(Math.abs(newBalance))}</span> <Currency>{currency}</Currency>
      </Value>
    </NewBalance>
  </GroupItemContainer>
);

export default GroupItem;

const GroupItemContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 16px 24px',
  borderRadius: 6,
  overflow: 'hidden',
  background: theme.palette.isLight ? alpha('#ECEFF9', 0.5) : '#26313F',
  boxShadow: theme.palette.isLight
    ? '0px 4px 6px rgba(196, 196, 196, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',

  [theme.breakpoints.up('table_834')]: {
    background: theme.palette.isLight ? alpha('#ECEFF9', 0.5) : '#283341',
    flexDirection: 'row',
    padding: '20px 32px 16px 16px',
    borderRadius: 0,
    boxShadow: 'none',

    '&:hover': {
      background: theme.palette.isLight ? '#F6F8F9' : '#1F2931',
    },
  },

  [theme.breakpoints.up('desktop_1194')]: {
    padding: '19px 56px 16px 16px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '19px 64px 16px 16px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: '19px 80px 16px 16px',
  },
}));

const WalletContainer = styled('div')(({ theme }) => ({
  marginBottom: 24,

  [theme.breakpoints.up('table_834')]: {
    marginBottom: 0,
    width: 'calc(205px + 16.1%)',

    '& > div': {
      marginTop: 0,
    },
  },

  [theme.breakpoints.up('desktop_1194')]: {
    width: 'calc(295px + 16.4%)',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 'calc(295px + 16.7%)',
  },
}));

const InitialBalance = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',

  [theme.breakpoints.up('table_834')]: {
    display: 'none',
  },
}));

const Label = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 14,
  lineHeight: '17px',
  color: theme.palette.isLight ? '#708390' : '#708390',

  [theme.breakpoints.up('table_834')]: {
    fontSize: 11,
    lineHeight: '13px',

    '& > svg': {
      display: 'none',
    },
  },

  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 12,
    lineHeight: '15px',
  },
}));

const ValueContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 4,

  '& > svg': {
    display: 'none',
  },

  [theme.breakpoints.up('table_834')]: {
    '& > svg': {
      display: 'inline-block',
    },
  },
}));

const Value = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: 4,
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '17px',

  '&, & > span:first-of-type': {
    color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
    lineHeight: '19px',
  },
}));

const Sign = styled('span')({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '17px',
});

const Currency = styled('span')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: theme.palette.isLight ? '#9FAFB9' : '#9FAFB9',

  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 14,
    lineHeight: '17px',
  },
}));

const Inflow = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 16,
  marginBottom: 12,

  [theme.breakpoints.up('table_834')]: {
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'normal',
    gap: 8,
    minWidth: '19.2%',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    width: '19.9%',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: '20.6%',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: '22.5%',
  },
}));

const Outflow = styled(Inflow)(({ theme }) => ({
  marginTop: 12,
  marginBottom: 16,

  [theme.breakpoints.up('table_834')]: {
    margin: 0,
  },
}));

const NewBalance = styled(InitialBalance)(({ theme }) => ({
  [theme.breakpoints.up('table_834')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'normal',
    marginLeft: 'auto',
    alignItems: 'flex-end',
    gap: 8,
  },
}));
