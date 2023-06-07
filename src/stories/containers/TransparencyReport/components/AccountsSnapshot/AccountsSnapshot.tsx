import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import React from 'react';
import CUReserves from './components/CUReserves/CUReserves';
import ExpensesComparison from './components/ExpensesComparison/ExpensesComparison';
import FundingOverview from './components/FundingOverview/FundingOverview';
import useAccountsSnapshot from './useAccountsSnapshot';
import type { Snapshots } from '@ses/core/models/dto/snapshotAccountDTO';

interface AccountsSnapshotProps {
  snapshot: Snapshots;
}

const AccountsSnapshot: React.FC<AccountsSnapshotProps> = ({ snapshot }) => {
  const { expensesComparisonRows, includeOffChain, toggleIncludeOffChain } = useAccountsSnapshot(snapshot);

  return (
    <Container>
      <Wrapper>
        <FundingOverview coreUnitCode="SES" />
        <CUReserves
          coreUnitCode="SES"
          includeOffChain={includeOffChain}
          toggleIncludeOffChain={toggleIncludeOffChain}
        />
        <ExpensesComparison rows={expensesComparisonRows} />
      </Wrapper>
    </Container>
  );
};

export default AccountsSnapshot;

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 64,
  marginBottom: 64,
});
