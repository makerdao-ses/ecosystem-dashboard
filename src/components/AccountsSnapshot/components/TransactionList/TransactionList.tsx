import { styled } from '@mui/material';
import { isSnapshotAccount } from '../../utils/typesHelpers';
import GroupItem from '../GroupItem/GroupItem';
import InitialBalanceRow from '../Transaction/InitialBalanceRow';
import Transaction from '../Transaction/Transaction';
import type { SnapshotAccount, SnapshotAccountTransaction } from '@ses/core/models/dto/snapshotAccountDTO';
interface TransactionListProps {
  items?: (SnapshotAccountTransaction | SnapshotAccount)[];
  highlightPositiveAmounts?: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ items, highlightPositiveAmounts = false }) => {
  const renderTransaction = (transaction: SnapshotAccountTransaction) => (
    <Transaction
      key={transaction.id}
      name={transaction.txLabel ?? 'N/A'}
      date={transaction.timestamp}
      toDate={null}
      txHash={transaction.txHash}
      counterPartyName={transaction.counterPartyName ?? 'N/A'}
      counterPartyAddress={transaction.counterParty}
      amount={transaction.amount}
      highlightPositiveAmounts={highlightPositiveAmounts}
    />
  );

  return (
    <TransactionListContainer>
      <TransactionCard>
        {!items?.length && <EmptyList>No transactions this month</EmptyList>}
        {items?.map((item: SnapshotAccountTransaction | SnapshotAccount) =>
          isSnapshotAccount(item) ? (
            <GroupContainer key={item.id}>
              <GroupItem
                name={item.accountLabel}
                address={item.accountAddress}
                initialBalance={item.snapshotAccountBalance?.[0]?.initialBalance}
                inflow={item.snapshotAccountBalance?.[0]?.inflow}
                outflow={item.snapshotAccountBalance?.[0]?.outflow}
                newBalance={item.snapshotAccountBalance?.[0]?.newBalance}
                currency={item.snapshotAccountBalance?.[0]?.token}
              />
              {item.snapshotAccountTransaction.map((transaction) => renderTransaction(transaction))}
              <InitialBalanceRow initialBalance={item.snapshotAccountBalance?.[0]?.initialBalance} />
            </GroupContainer>
          ) : (
            renderTransaction(item)
          )
        )}
      </TransactionCard>
    </TransactionListContainer>
  );
};

export default TransactionList;

const TransactionListContainer = styled('div')(({ theme }) => ({
  padding: 0,
  position: 'relative',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '0 24px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '0 32px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '0 40px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: '0 56px',
  },

  '&:before': {
    content: '""',
    display: 'block',
    width: '100%',
    height: 17,
    position: 'absolute',
    top: -7,
    left: 0,
    opacity: 0.6,
    filter: 'blur(7.5px)',
    borderRadius: '0px 0px 12px 12px',
    background: theme.palette.isLight
      ? 'linear-gradient(0deg, rgba(219, 227, 237, 0.20) 0%, rgba(219, 227, 237, 0.20) 100%), linear-gradient(180deg, rgba(190, 190, 190, 0.64) 0%, rgba(190, 190, 190, 0.00) 100%)'
      : 'transparent',
  },
}));

const TransactionCard = styled('div')(({ theme }) => ({
  borderRadius: '0 0 12px 12px',
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.slate[600],
  overflow: 'hidden',
  padding: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [theme.breakpoints.up('tablet_768')]: {
    padding: 0,
    background: theme.palette.isLight ? '#FBFBFB' : '#162530',
    boxShadow: theme.palette.isLight
      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : 'none',
    gap: 0,
  },
}));

const GroupContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [theme.breakpoints.down('tablet_768')]: {
    '&:not(:first-of-type)::before': {
      display: 'block',
      content: '""',
      width: 'calc(100% + 16px)',
      marginLeft: -8,
      height: 1,
      background: theme.palette.isLight ? '#D4D9E1' : '#405361',
      marginBottom: -1,
    },
  },

  [theme.breakpoints.up('tablet_768')]: {
    gap: 0,

    '&:not(:first-of-type)': {
      borderTop: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#405361'}`,
    },
  },
}));

const EmptyList = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  padding: '48px 0',
}));
