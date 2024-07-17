import { styled } from '@mui/material';
import React from 'react';
import TransferRequestSection from './components/TransferRequestSection/TransferRequestSection';
import { useTransparencyTransferRequest } from './useBudgetStatementTransferRequest';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { ResourceType } from '@ses/core/models/interfaces/types';
import type { DateTime } from 'luxon';

interface TransparencyTransferRequestProps {
  currentMonth: DateTime;
  budgetStatements: BudgetStatement[];
  longCode: string;
  shortCode: string;
  headline: React.ReactNode;
  resource: ResourceType;
}

export const BudgetStatementTransferRequest: React.FC<TransparencyTransferRequestProps> = ({
  currentMonth,
  budgetStatements,
  longCode,
  shortCode,
  headline,
  resource,
}) => {
  const { mainTableColumns, mainTableItems } = useTransparencyTransferRequest(currentMonth, budgetStatements);
  console.log('mainTableItems', mainTableItems);
  return (
    <Container>
      {headline}
      <TransferRequestSection
        currentMonth={currentMonth}
        longCode={longCode}
        mainTableColumns={mainTableColumns}
        mainTableItems={mainTableItems}
        resource={resource}
        shortCode={shortCode}
      />
    </Container>
  );
};

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});
