import { styled } from '@mui/material';
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
  padding: '8px 16px 9px',
  borderRadius: 6,
  overflow: 'hidden',
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : '#21262F',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.modules : theme.fusionShadows.darkMode,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    padding: '6px 40px 5px 8px',
    borderRadius: 0,
    boxShadow: 'none',

    '&:hover': {
      background: theme.palette.isLight ? '#EEF0F2' : '#20252E',
    },
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '6px 16px 7px 16px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '6px 80px 8px 16px',
  },
}));

const WalletContainer = styled('div')(({ theme }) => ({
  marginBottom: 11,

  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: 0,
    width: 'calc(151px + 16.1%)',

    '& > div': {
      marginTop: 0,
    },
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 'calc(216px + 16.4%)',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 'calc(276px + 16.4%)',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 'calc(295px + 16.7%)',
  },
}));

const InitialBalance = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const Label = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '18px',

    '& > svg': {
      display: 'none',
    },
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

  [theme.breakpoints.up('tablet_768')]: {
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
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '19px',
  },
}));

const Sign = styled('span')({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
});

const Currency = styled('span')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  textTransform: 'uppercase',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    lineHeight: '22px',
  },
}));

const Inflow = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 8,
  marginBottom: 4,

  [theme.breakpoints.up('tablet_768')]: {
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'normal',
    gap: 6,
    width: '21.6%',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: '21%',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: '23%',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: '22%',
  },
}));

const Outflow = styled(Inflow)(({ theme }) => ({
  marginTop: 11,
  marginBottom: 8,

  [theme.breakpoints.up('tablet_768')]: {
    margin: 0,
  },
}));

const NewBalance = styled(InitialBalance)(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'normal',
    marginLeft: 'auto',
    alignItems: 'flex-end',
    gap: 6,
  },
}));
