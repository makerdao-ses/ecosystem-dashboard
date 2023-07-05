import styled from '@emotion/styled';
import React from 'react';
import CUReserves from './components/CUReserves/CUReserves';
import ExpensesComparison from './components/ExpensesComparison/ExpensesComparison';
import FundingOverview from './components/FundingOverview/FundingOverview';
import useAccountsSnapshot from './useAccountsSnapshot';
import type { Snapshots } from '@ses/core/models/dto/snapshotAccountDTO';

interface AccountsSnapshotProps {
  snapshot: Snapshots;
  snapshotOwner?: string;
}

const AccountsSnapshot: React.FC<AccountsSnapshotProps> = ({ snapshot, snapshotOwner }) => {
  const {
    expensesComparisonRows,
    includeOffChain,
    toggleIncludeOffChain,
    startDate,
    endDate,
    rootBalance,
    transactionHistory,
    cuReservesBalance,
    onChainData,
    offChainData,
    hasOffChainData,
  } = useAccountsSnapshot(snapshot);

  return (
    <Wrapper>
      <FundingOverview
        snapshotOwner={snapshotOwner}
        startDate={startDate}
        endDate={endDate}
        balance={rootBalance}
        transactionHistory={transactionHistory}
      />
      <CUReserves
        snapshotOwner={snapshotOwner}
        includeOffChain={includeOffChain}
        toggleIncludeOffChain={toggleIncludeOffChain}
        startDate={startDate}
        endDate={endDate}
        balance={cuReservesBalance}
        onChainData={onChainData}
        offChainData={offChainData}
      />
      <ExpensesComparison rows={expensesComparisonRows} hasOffChainData={hasOffChainData} />
    </Wrapper>
  );
};

export default AccountsSnapshot;

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 64,
  marginBottom: 64,
});
