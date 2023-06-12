import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import MobileTransaction from './MobileTransaction';
import TransactionAmount from './segments/TransactionAmount';
import TransactionCounterParty from './segments/TransactionCounterParty';
import TransactionHeader from './segments/TransactionHeader';

export interface TransactionProps {
  name: string;
  date: string;
  toDate?: string | null;
  txHash: string;
  counterPartyName: string;
  counterPartyAddress: string;
  amount: number;
  isIncomingTransaction?: boolean;
}

const Transaction: React.FC<TransactionProps> = ({
  name,
  date,
  toDate,
  txHash,
  counterPartyName,
  counterPartyAddress,
  amount,
  isIncomingTransaction = true,
}) => {
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  return isMobile ? (
    <MobileTransaction
      isIncomingTransaction={isIncomingTransaction}
      name={name}
      date={date}
      toDate={toDate}
      txHash={txHash}
      counterPartyName={counterPartyName}
      counterPartyAddress={counterPartyAddress}
      amount={amount}
    />
  ) : (
    <TransactionContainer>
      <TransactionHeader
        isIncomingTransaction={isIncomingTransaction}
        name={name}
        date={date}
        toDate={toDate}
        txHash={txHash}
      />
      <TransactionCounterParty
        isIncomingTransaction={isIncomingTransaction}
        name={counterPartyName}
        address={counterPartyAddress}
      />
      <TransactionAmount amount={amount} />
    </TransactionContainer>
  );
};

export default Transaction;

const TransactionContainer = styled.div({
  display: 'grid',
  gridTemplateColumns: '1.35fr 1fr 1fr',
  padding: '16px 32px 13px 20px',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    gridTemplateColumns: '1.365fr 1fr 1fr',
    padding: '16px 56px 14px 20px',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    gridTemplateColumns: '1.296fr 1fr 1fr',
    padding: '16px 64px 14px 20px',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    gridTemplateColumns: '1.311fr 1fr 1fr',
    padding: '16px 80px 14px 20px',
  },
});
