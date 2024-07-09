import { styled, useMediaQuery } from '@mui/material';
import MobileTransaction from './MobileTransaction';
import TransactionAmount from './segments/TransactionAmount';
import TransactionCounterParty from './segments/TransactionCounterParty';
import TransactionHeader from './segments/TransactionHeader';
import type { Theme } from '@mui/material';

export interface TransactionProps {
  name: string;
  date: string;
  toDate?: string | null;
  txHash: string | null;
  counterPartyName: string;
  counterPartyAddress: string;
  amount: number;
  highlightPositiveAmounts?: boolean;
}

const Transaction: React.FC<TransactionProps> = ({
  name,
  date,
  toDate,
  txHash,
  counterPartyName,
  counterPartyAddress,
  amount,
  highlightPositiveAmounts = false,
}) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isIncomingTransaction = amount > 0;

  return isMobile ? (
    <MobileTransaction
      name={name}
      date={date}
      toDate={toDate}
      txHash={txHash}
      counterPartyName={counterPartyName}
      counterPartyAddress={counterPartyAddress}
      amount={amount}
      highlightPositiveAmounts={highlightPositiveAmounts}
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
      <TransactionAmount amount={amount} highlightPositiveAmounts={highlightPositiveAmounts} />
    </TransactionContainer>
  );
};

export default Transaction;

const TransactionContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '172px 15.7% max-content 1fr',
  padding: '6px 24px 5px 12px',

  '&:not(:first-of-type)': {
    borderTop: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
    }`,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    gridTemplateColumns: '218px 16% max-content 1fr',
    padding: '8px 24px 5px 20px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gridTemplateColumns: '305px 16.1% max-content 1fr',
    padding: '6px 40px 7px 20px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    gridTemplateColumns: '280px 16.4% max-content 1fr',
    padding: '8px 40px 5px 20px',
  },

  '&:hover': {
    background: theme.palette.isLight ? theme.palette.colors.gray[100] : '#292E38',
  },
}));
