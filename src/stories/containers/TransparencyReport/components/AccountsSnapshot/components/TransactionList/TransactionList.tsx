import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { isSnapshotAccount } from '../../utils/typesHelpers';
import GroupItem from '../GroupItem/GroupItem';
import InitialBalanceRow from '../Transaction/InitialBalanceRow';
import Transaction from '../Transaction/Transaction';
import type { SnapshotAccount, SnapshotAccountTransaction } from '@ses/core/models/dto/snapshotAccountDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
interface TransactionListProps {
  items?: (SnapshotAccountTransaction | SnapshotAccount)[];
  highlightPositiveAmounts?: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ items, highlightPositiveAmounts = false }) => {
  const { isLight } = useThemeContext();
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
    <TransactionListContainer isLight={isLight}>
      <TransactionCard isLight={isLight}>
        {!items?.length && <EmptyList isLight={isLight}>No transactions this month</EmptyList>}
        {items?.map((item: SnapshotAccountTransaction | SnapshotAccount) =>
          isSnapshotAccount(item) ? (
            <GroupContainer isLight={isLight} key={item.id}>
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

const TransactionListContainer = styled.div<WithIsLight>(({ isLight }) => ({
  padding: 0,
  position: 'relative',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '0 24px',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '0 32px',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '0 40px',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
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
    borderRadius: '0px 0px 6px 6px',
    background: isLight
      ? 'linear-gradient(0deg, rgba(219, 227, 237, 0.2), rgba(219, 227, 237, 0.2)), linear-gradient(180deg, rgba(190, 190, 190, 0.64) 0%, rgba(190, 190, 190, 0) 100%)'
      : 'linear-gradient(0deg, rgba(3, 16, 32, 0.2), rgba(3, 16, 32, 0.2)), linear-gradient(180deg, rgba(0, 32, 202, 0.64) 0%, rgba(64, 85, 200, 0) 100%)',
  },
}));

const TransactionCard = styled.div<WithIsLight>(({ isLight }) => ({
  borderRadius: '0 0 6px 6px',
  background: isLight ? '#ECEFF9' : '#38364D',
  overflow: 'hidden',
  padding: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [lightTheme.breakpoints.up('table_834')]: {
    padding: 0,
    background: isLight ? '#FBFBFB' : '#162530',
    boxShadow: isLight ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)' : 'none',
    gap: 0,
  },
}));

const GroupContainer = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [lightTheme.breakpoints.down('table_834')]: {
    '&:not(:first-of-type)::before': {
      display: 'block',
      content: '""',
      width: 'calc(100% + 16px)',
      marginLeft: -8,
      height: 1,
      background: isLight ? '#D4D9E1' : '#405361',
      marginBottom: -1,
    },
  },

  [lightTheme.breakpoints.up('table_834')]: {
    gap: 0,

    '&:not(:first-of-type)': {
      borderTop: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
    },
  },
}));

const EmptyList = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  justifyContent: 'center',
  color: isLight ? '#231536' : '#D2D4EF',
  padding: '48px 0',
}));
