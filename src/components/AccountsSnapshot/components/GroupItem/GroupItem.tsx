import styled from '@emotion/styled';
import { alpha } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import GreenArrowDown from '../SVG/GreenArrowDown';
import RedArrowUp from '../SVG/RedArrowUp';
import WalletInfo from '../WalletInfo/WalletInfo';
import type { Token } from '@ses/core/models/dto/snapshotAccountDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

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
}) => {
  const { isLight } = useThemeContext();

  return (
    <GroupItemContainer isLight={isLight}>
      <WalletContainer>
        <WalletInfo name={name} address={address} />
      </WalletContainer>
      <InitialBalance>
        <Label isLight={isLight}>Initial Balance</Label>
        <Value isLight={isLight}>
          {usLocalizedNumber(initialBalance)} <Currency isLight={isLight}>{currency}</Currency>
        </Value>
      </InitialBalance>
      <Inflow>
        <Label isLight={isLight}>
          <GreenArrowDown width={16} height={16} /> Inflow
        </Label>
        <ValueContainer>
          <GreenArrowDown width={16} height={16} />
          <Value isLight={isLight}>
            <Sign>{'+'}</Sign>
            {usLocalizedNumber(inflow)} <Currency isLight={isLight}>{currency}</Currency>
          </Value>
        </ValueContainer>
      </Inflow>
      <Outflow>
        <Label isLight={isLight}>
          <RedArrowUp width={16} height={16} />
          Outflow
        </Label>
        <ValueContainer>
          <RedArrowUp width={16} height={16} />
          <Value isLight={isLight}>
            <Sign>{'-'}</Sign>
            {usLocalizedNumber(Math.abs(outflow))} <Currency isLight={isLight}>{currency}</Currency>
          </Value>
        </ValueContainer>
      </Outflow>
      <NewBalance>
        <Label isLight={isLight}>New Balance</Label>
        <Value isLight={isLight}>
          <span>{usLocalizedNumber(Math.abs(newBalance))}</span> <Currency isLight={isLight}>{currency}</Currency>
        </Value>
      </NewBalance>
    </GroupItemContainer>
  );
};

export default GroupItem;

const GroupItemContainer = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 16px 24px',
  borderRadius: 6,
  overflow: 'hidden',
  background: isLight ? alpha('#ECEFF9', 0.5) : '#26313F',
  boxShadow: isLight
    ? '0px 4px 6px rgba(196, 196, 196, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',

  [lightTheme.breakpoints.up('table_834')]: {
    background: isLight ? alpha('#ECEFF9', 0.5) : '#283341',
    flexDirection: 'row',
    padding: '20px 32px 16px 16px',
    borderRadius: 0,
    boxShadow: 'none',

    '&:hover': {
      background: isLight ? '#F6F8F9' : '#1F2931',
    },
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '19px 56px 16px 16px',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '19px 64px 16px 16px',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '19px 80px 16px 16px',
  },
}));

const WalletContainer = styled.div({
  marginBottom: 24,

  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 0,
    width: 'calc(205px + 16.1%)',

    '& > div': {
      marginTop: 0,
    },
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 'calc(295px + 16.4%)',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 'calc(295px + 16.7%)',
  },
});

const InitialBalance = styled.div({
  display: 'flex',
  justifyContent: 'space-between',

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});

const Label = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 14,
  lineHeight: '17px',
  color: isLight ? '#708390' : '#708390',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 11,
    lineHeight: '13px',

    '& > svg': {
      display: 'none',
    },
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 12,
    lineHeight: '15px',
  },
}));

const ValueContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 4,

  '& > svg': {
    display: 'none',
  },

  [lightTheme.breakpoints.up('table_834')]: {
    '& > svg': {
      display: 'inline-block',
    },
  },
});

const Value = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: 4,
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '17px',

  '&, & > span:first-of-type': {
    color: isLight ? '#231536' : '#D2D4EF',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
    lineHeight: '19px',
  },
}));

const Sign = styled.span({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '17px',
});

const Currency = styled.span<WithIsLight>(({ isLight }) => ({
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: isLight ? '#9FAFB9' : '#9FAFB9',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 14,
    lineHeight: '17px',
  },
}));

const Inflow = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 16,
  marginBottom: 12,

  [lightTheme.breakpoints.up('table_834')]: {
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'normal',
    gap: 8,
    minWidth: '19.2%',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: '19.9%',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: '20.6%',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: '22.5%',
  },
});

const Outflow = styled(Inflow)({
  marginTop: 12,
  marginBottom: 16,

  [lightTheme.breakpoints.up('table_834')]: {
    margin: 0,
  },
});

const NewBalance = styled(InitialBalance)({
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'normal',
    marginLeft: 'auto',
    alignItems: 'flex-end',
    gap: 8,
  },
});
