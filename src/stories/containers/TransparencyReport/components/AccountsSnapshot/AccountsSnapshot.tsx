import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import React from 'react';
import CUReserves from './components/CUReserves/CUReserves';
import ExpensesComparison from './components/ExpensesComparison/ExpensesComparison';
import FundingOverview from './components/FundingOverview/FundingOverview';
import useAccountsSnapshot from './useAccountsSnapshot';

const AccountsSnapshot: React.FC = () => {
  // TODO: use the values from the hook
  useAccountsSnapshot();

  return (
    <Container>
      <Wrapper>
        <FundingOverview coreUnitCode="SES" />
        <CUReserves coreUnitCode="SES" />
        <ExpensesComparison />
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
