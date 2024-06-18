import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import TransactionWalletInfo from '../TransactionWalletInfo';

interface TransactionCounterPartyProps {
  isIncomingTransaction: boolean;
  name: string;
  address: string;
}

const TransactionCounterParty: React.FC<TransactionCounterPartyProps> = ({ isIncomingTransaction, name, address }) => {
  const { isLight } = useThemeContext();

  return (
    <Wrapper>
      <CounterPartyRole isLight={isLight}>
        {isIncomingTransaction ? 'Sender Address' : 'Recipient Address'}
      </CounterPartyRole>
      <TransactionWalletInfo name={name} address={address} />
    </Wrapper>
  );
};

export default TransactionCounterParty;

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  paddingRight: 10,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: -2,
  },
});

const CounterPartyRole = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontSize: 11,
  lineHeight: '13px',
  color: isLight ? '#546978' : '#708390',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 12,
    lineHeight: '15px',
  },
}));
