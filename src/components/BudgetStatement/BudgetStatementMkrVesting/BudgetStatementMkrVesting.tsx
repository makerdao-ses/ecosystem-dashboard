import { styled } from '@mui/material';
import React from 'react';
import BudgetStatementMkrVestingTableSection from './BudgetStatementMkrVestingSection/BudgetStatementMkrVestingTableSection';
import { useTransparencyMkrVesting } from './useBudgetStatementMkrVesting';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { ResourceType } from '@ses/core/models/interfaces/types';
import type { DateTime } from 'luxon';

interface TransparencyMkrVestingProps {
  currentMonth: DateTime;
  budgetStatements: BudgetStatement[];
  longCode: string;
  shortCode: string;
  headline: React.ReactNode;
  resource: ResourceType;
}

export const BudgetStatementMkrVesting: React.FC<TransparencyMkrVestingProps> = ({
  currentMonth,
  budgetStatements,
  longCode,
  shortCode,
  headline,
  resource,
}) => {
  const { mainTableItems, mainTableColumns, fTEs } = useTransparencyMkrVesting(currentMonth, budgetStatements);

  return (
    <Container>
      {headline}
      <BudgetStatementMkrVestingTableSection
        fTEs={fTEs}
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
