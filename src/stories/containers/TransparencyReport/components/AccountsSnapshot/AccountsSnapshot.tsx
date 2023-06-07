import styled from '@emotion/styled';
import React from 'react';
import CUReserves from './components/CUReserves/CUReserves';
import ExpensesComparison from './components/ExpensesComparison/ExpensesComparison';
import FundingOverview from './components/FundingOverview/FundingOverview';
import useAccountsSnapshot from './useAccountsSnapshot';

const AccountsSnapshot: React.FC = () => {
  const { expensesComparisonRows } = useAccountsSnapshot();

  return (
    <Wrapper>
      <FundingOverview coreUnitCode="SES" />
      <CUReserves coreUnitCode="SES" />
      <ExpensesComparison rows={expensesComparisonRows} />
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
