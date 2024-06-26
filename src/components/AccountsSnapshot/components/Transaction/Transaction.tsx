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
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('table_834'));
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
  gridTemplateColumns: '204px 15.7% max-content 1fr',
  padding: '16px 32px 13px 20px',

  [theme.breakpoints.up('desktop_1194')]: {
    gridTemplateColumns: '295px 16% max-content 1fr',
    padding: '16px 56px 14px 20px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gridTemplateColumns: '295px 16.1% max-content 1fr',
    padding: '16px 64px 14px 20px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    gridTemplateColumns: '295px 16.4% max-content 1fr',
    padding: '16px 80px 14px 20px',
  },

  '&:hover': {
    background: theme.palette.isLight ? '#F6F8F9' : '#1F2931',
  },
}));
